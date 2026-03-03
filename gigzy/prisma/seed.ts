import { PrismaClient, TaskCategory, TaskUrgency, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create demo user with both profiles
  const user = await prisma.user.upsert({
    where: { email: 'demo@gigzy.app' },
    update: {},
    create: {
      email: 'demo@gigzy.app',
      username: 'demo_user',
      passwordHash: '$2a$10$dummyHashForDemoPurposesOnly', // Not for production
      role: UserRole.HYBRID,
      emailVerified: true,
      verificationStatus: 'VERIFIED',
      trustScore: 85.5,
      trustLevel: 'HIGH',
      seekerProfile: {
        create: {
          fullName: 'Demo User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
          bio: 'Computer Science student at State University',
          phone: '+1-555-0123',
          locationLat: 40.7128,
          locationLng: -74.0060,
          locationAddress: 'State University Campus',
          college: 'State University',
          major: 'Computer Science',
          tasksPosted: 15,
          tasksCompleted: 12,
          totalSpent: 450,
          avgRating: 4.8,
          totalRatings: 10,
          preferredCategories: ['TUTORING', 'TECH_SUPPORT', 'STUDY_PRODUCTIVITY'],
        },
      },
      providerProfile: {
        create: {
          fullName: 'Demo User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
          bio: 'Experienced tutor and tech enthusiast. Happy to help with coding, math, and more!',
          phone: '+1-555-0123',
          locationLat: 40.7128,
          locationLng: -74.0060,
          locationAddress: 'State University Campus',
          skills: ['Programming', 'Math', 'Physics', 'Web Development'],
          hourlyRate: 25,
          availability: true,
          idVerifiedAt: new Date(),
          tasksCompleted: 48,
          totalEarned: 1245,
          avgRating: 4.9,
          totalRatings: 42,
          responseRate: 98,
          responseTime: 15,
          xpPoints: 2450,
          level: 12,
          gigzyPro: false,
          workingRadius: 5,
          preferredCategories: ['TUTORING', 'TECH_SUPPORT', 'STUDY_PRODUCTIVITY'],
        },
      },
      wallet: {
        create: {
          balance: 150,
          pendingBalance: 35,
          totalEarned: 1245,
          totalSpent: 450,
        },
      },
    },
    include: {
      seekerProfile: true,
      providerProfile: true,
      wallet: true,
    },
  });

  console.log('Created user:', user.email);

  // Create additional demo providers
  const providers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alex@gigzy.app' },
      update: {},
      create: {
        email: 'alex@gigzy.app',
        username: 'alex_chen',
        passwordHash: '$2a$10$dummyHashForDemoPurposesOnly',
        role: UserRole.PROVIDER,
        emailVerified: true,
        verificationStatus: 'VERIFIED',
        trustScore: 92.3,
        trustLevel: 'EXCELLENT',
        providerProfile: {
          create: {
            fullName: 'Alex Chen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
            bio: 'Professional photographer and videographer. 5 years experience.',
            locationLat: 40.7138,
            locationLng: -74.0050,
            skills: ['Photography', 'Videography', 'Video Editing', 'Creative'],
            hourlyRate: 35,
            availability: true,
            tasksCompleted: 156,
            totalEarned: 4500,
            avgRating: 4.9,
            totalRatings: 120,
            xpPoints: 4500,
            level: 18,
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah@gigzy.app' },
      update: {},
      create: {
        email: 'sarah@gigzy.app',
        username: 'sarah_miller',
        passwordHash: '$2a$10$dummyHashForDemoPurposesOnly',
        role: UserRole.PROVIDER,
        emailVerified: true,
        verificationStatus: 'VERIFIED',
        trustScore: 88.7,
        trustLevel: 'EXCELLENT',
        providerProfile: {
          create: {
            fullName: 'Sarah Miller',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            bio: 'Math and Physics tutor. Graduate student with teaching experience.',
            locationLat: 40.7148,
            locationLng: -74.0040,
            skills: ['Math', 'Physics', 'Tutoring', 'Calculus'],
            hourlyRate: 30,
            availability: true,
            tasksCompleted: 142,
            totalEarned: 3800,
            avgRating: 4.8,
            totalRatings: 95,
            xpPoints: 4200,
            level: 16,
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike@gigzy.app' },
      update: {},
      create: {
        email: 'mike@gigzy.app',
        username: 'mike_johnson',
        passwordHash: '$2a$10$dummyHashForDemoPurposesOnly',
        role: UserRole.PROVIDER,
        emailVerified: true,
        verificationStatus: 'VERIFIED',
        trustScore: 84.2,
        trustLevel: 'HIGH',
        providerProfile: {
          create: {
            fullName: 'Mike Johnson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
            bio: 'Fitness enthusiast and gym buddy. Certified personal trainer.',
            locationLat: 40.7158,
            locationLng: -74.0030,
            skills: ['Fitness', 'Gym', 'Training', 'Sports'],
            hourlyRate: 22,
            availability: true,
            tasksCompleted: 128,
            totalEarned: 2800,
            avgRating: 4.7,
            totalRatings: 85,
            xpPoints: 3800,
            level: 15,
          },
        },
      },
    }),
  ]);

  console.log('Created', providers.length, 'additional providers');

  // Create sample tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Need help with Calculus homework',
        description: 'I need someone to help me understand derivatives and integrals. Can meet at the library or online.',
        category: TaskCategory.TUTORING,
        urgency: TaskUrgency.URGENT,
        seekerId: user.id,
        locationLat: 40.7128,
        locationLng: -74.0060,
        locationAddress: 'University Library, Room 204',
        duration: 90,
        budgetMin: 25,
        budgetMax: 35,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Photography for my portfolio',
        description: 'Need professional photos for my LinkedIn and portfolio. Outdoor shoot preferred.',
        category: TaskCategory.CREATIVE,
        urgency: TaskUrgency.NORMAL,
        seekerId: user.id,
        locationLat: 40.7128,
        locationLng: -74.0060,
        locationAddress: 'Campus Park',
        duration: 120,
        budgetMin: 40,
        budgetMax: 60,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Deliver package to dorm',
        description: 'Need someone to pick up a package from the mail center and deliver to my dorm room.',
        category: TaskCategory.DELIVERY,
        urgency: TaskUrgency.ASAP,
        seekerId: user.id,
        locationLat: 40.7128,
        locationLng: -74.0060,
        locationAddress: 'Mail Center to Dorm B',
        duration: 30,
        budgetMin: 10,
        budgetMax: 15,
        instantHire: true,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Gym partner for evening workout',
        description: 'Looking for a workout partner for strength training. Evenings around 6 PM.',
        category: TaskCategory.FITNESS,
        urgency: TaskUrgency.NORMAL,
        seekerId: user.id,
        locationLat: 40.7128,
        locationLng: -74.0060,
        locationAddress: 'Campus Recreation Center',
        duration: 60,
        budgetMin: 15,
        budgetMax: 20,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Study partner for finals week',
        description: 'Looking for a study partner for Computer Science finals. Focus on algorithms and data structures.',
        category: TaskCategory.STUDY_PRODUCTIVITY,
        urgency: TaskUrgency.NORMAL,
        seekerId: user.id,
        locationLat: 40.7128,
        locationLng: -74.0060,
        locationAddress: 'Engineering Building, Study Hall',
        scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        duration: 180,
        budgetMin: 20,
        budgetMax: 30,
      },
    }),
  ]);

  console.log('Created', tasks.length, 'sample tasks');

  // Create achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'First Task',
        description: 'Complete your first task',
        type: 'FIRST_TASK',
        icon: '🎯',
        xpReward: 100,
        requirements: { tasksCompleted: 1 },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Rising Star',
        description: 'Complete 10 tasks with 4.5+ rating',
        type: 'RATED_EXCELLENT',
        icon: '⭐',
        xpReward: 500,
        requirements: { tasksCompleted: 10, avgRating: 4.5 },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Local Legend',
        description: 'Be top 3 in your area for a week',
        type: 'LOCAL_LEGEND',
        icon: '👑',
        xpReward: 1000,
        requirements: { leaderboardPosition: 3 },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Gigzy Pro',
        description: 'Complete 50 tasks and earn $500',
        type: 'GIGZY_PRO',
        icon: '🚀',
        xpReward: 2000,
        requirements: { tasksCompleted: 50, totalEarned: 500 },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Trusted Provider',
        description: 'Maintain 98% completion rate',
        type: 'TRUSTED_PROVIDER',
        icon: '🛡️',
        xpReward: 750,
        requirements: { completionRate: 98 },
      },
    }),
  ]);

  console.log('Created', achievements.length, 'achievements');

  // Create sample resource listings
  const resources = await Promise.all([
    prisma.resourceListing.create({
      data: {
        ownerId: user.id,
        title: 'TI-84 Plus Calculator',
        description: 'Graphing calculator, perfect for calculus and statistics. Battery included.',
        type: 'CALCULATOR',
        dailyRate: 5,
        weeklyRate: 25,
        deposit: 50,
        locationLat: 40.7128,
        locationLng: -74.0060,
        locationAddress: 'Dorm A, Room 204',
        status: 'AVAILABLE',
        condition: 'EXCELLENT',
        totalRentals: 25,
        rating: 4.8,
        reviews: 15,
      },
    }),
    prisma.resourceListing.create({
      data: {
        ownerId: user.id,
        title: 'Canon EOS R5 Camera',
        description: 'Professional mirrorless camera. Great for photography projects.',
        type: 'CAMERA',
        dailyRate: 35,
        weeklyRate: 200,
        deposit: 100,
        locationLat: 40.7128,
        locationLng: -74.0060,
        locationAddress: 'Art Building, Studio 3',
        status: 'AVAILABLE',
        condition: 'EXCELLENT',
        totalRentals: 12,
        rating: 4.9,
        reviews: 8,
      },
    }),
  ]);

  console.log('Created', resources.length, 'resource listings');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });