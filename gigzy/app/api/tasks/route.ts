import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

/**
 * GET /api/tasks
 * List tasks with filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'POSTED';
    const urgency = searchParams.get('urgency');
    const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : null;
    const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : null;
    const radius = searchParams.get('radius') ? parseFloat(searchParams.get('radius')!) : 10;
    const minBudget = searchParams.get('minBudget') ? parseFloat(searchParams.get('minBudget')!) : undefined;
    const maxBudget = searchParams.get('maxBudget') ? parseFloat(searchParams.get('maxBudget')!) : undefined;
    const showInstantHire = searchParams.get('showInstantHire') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build where clause
    const where: any = {};
    
    if (category) where.category = category;
    if (status) where.status = status;
    if (urgency) where.urgency = urgency;
    if (minBudget !== undefined || maxBudget !== undefined) {
      where.budgetMin = {};
      if (minBudget !== undefined) where.budgetMin.gte = minBudget;
      if (maxBudget !== undefined) where.budgetMax = { lte: maxBudget };
    }
    if (showInstantHire) where.instantHire = true;

    // Execute queries
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          seeker: {
            include: {
              seekerProfile: true,
            },
          },
          provider: {
            include: {
              providerProfile: true,
            },
          },
          acceptedBid: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.task.count({ where }),
    ]);

    // Calculate distance if location provided
    let processedTasks = tasks;
    if (lat && lng) {
      processedTasks = tasks.map(task => ({
        ...task,
        distance: calculateDistance(lat, lng, task.locationLat, task.locationLng),
      })).filter(task => task.distance <= radius);
    }

    return NextResponse.json({
      success: true,
      data: {
        items: processedTasks,
        total,
        page,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Create a new task
 */
export async function POST(request: NextRequest) {
  try {
    // In production, you would get the user from session
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const {
      title,
      description,
      category,
      urgency = 'NORMAL',
      locationLat,
      locationLng,
      locationAddress,
      scheduledAt,
      duration,
      budgetMin,
      budgetMax,
      instantHire = false,
      instantHirePrice,
    } = body;

    // Validation
    if (!title || !description || !category || !locationLat || !locationLng || !budgetMin || !budgetMax) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        category,
        urgency,
        seekerId: 'demo-user-id', // In production: session.user.id
        locationLat,
        locationLng,
        locationAddress,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        duration,
        budgetMin,
        budgetMax,
        instantHire,
      },
      include: {
        seeker: {
          include: {
            seekerProfile: true,
          },
        },
      },
    });

    // Create timeline entry
    await prisma.taskTimeline.create({
      data: {
        taskId: task.id,
        status: 'POSTED',
        message: 'Task posted successfully',
      },
    });

    // If instant hire with price, create escrow
    if (instantHire && instantHirePrice) {
      const platformFee = instantHirePrice * 0.15; // 15% platform fee
      
      await prisma.escrowAccount.create({
        data: {
          userId: 'demo-user-id',
          taskId: task.id,
          amount: instantHirePrice,
          platformFee,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}