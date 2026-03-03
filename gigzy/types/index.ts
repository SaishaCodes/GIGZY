import { UserRole, TaskStatus, TaskCategory, TaskUrgency, TrustLevel } from '@prisma/client';

// ============================================
// USER TYPES
// ============================================

export type UserRoleType = UserRole | 'HYBRID';
export type TaskStatusType = TaskStatus;
export type TaskCategoryType = TaskCategory;
export type TaskUrgencyType = TaskUrgency;
export type TrustLevelType = TrustLevel;

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRoleType;
  trustScore: number;
  trustLevel: TrustLevelType;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
  seekerProfile?: SeekerProfile;
  providerProfile?: ProviderProfile;
}

export interface SeekerProfile {
  id: string;
  userId: string;
  fullName?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  locationLat?: number;
  locationLng?: number;
  locationAddress?: string;
  college?: string;
  major?: string;
  tasksPosted: number;
  tasksCompleted: number;
  totalSpent: number;
  avgRating: number;
  totalRatings: number;
  preferredCategories: string[];
}

export interface ProviderProfile {
  id: string;
  userId: string;
  fullName?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  locationLat?: number;
  locationLng?: number;
  locationAddress?: string;
  skills: string[];
  hourlyRate?: number;
  availability: boolean;
  idVerifiedAt?: Date;
  tasksCompleted: number;
  totalEarned: number;
  avgRating: number;
  totalRatings: number;
  responseRate: number;
  responseTime?: number;
  xpPoints: number;
  level: number;
  gigzyPro: boolean;
  workingRadius: number;
  preferredCategories: string[];
}

// ============================================
// TASK TYPES
// ============================================

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategoryType;
  urgency: TaskUrgencyType;
  status: TaskStatusType;
  seekerId: string;
  providerId?: string;
  locationLat: number;
  locationLng: number;
  locationAddress: string;
  scheduledAt?: Date;
  duration?: number;
  budgetMin: number;
  budgetMax: number;
  finalPrice?: number;
  instantHire: boolean;
  escrowHeld: boolean;
  escrowAmount?: number;
  platformFee?: number;
  views: number;
  bidsCount: number;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  seeker?: User;
  provider?: User;
  acceptedBid?: Bid;
}

export interface Bid {
  id: string;
  taskId: string;
  providerId: string;
  amount: number;
  message?: string;
  estimatedDuration?: number;
  status: string;
  createdAt: Date;
  provider?: User;
}

export interface TaskTimeline {
  id: string;
  taskId: string;
  status: TaskStatusType;
  message?: string;
  createdAt: Date;
}

// ============================================
// TASK CREATION TYPES
// ============================================

export interface CreateTaskInput {
  title: string;
  description: string;
  category: TaskCategoryType;
  urgency: TaskUrgencyType;
  locationLat: number;
  locationLng: number;
  locationAddress: string;
  scheduledAt?: Date;
  duration?: number;
  budgetMin: number;
  budgetMax: number;
  instantHire: boolean;
  instantHirePrice?: number;
}

export interface CreateBidInput {
  taskId: string;
  amount: number;
  message?: string;
  estimatedDuration?: number;
}

// ============================================
// CATEGORY & COMMUNITY TYPES
// ============================================

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  tasksCount: number;
  avgBudget: number;
}

export const COMMUNITY_CATEGORIES: Category[] = [
  {
    id: 'STUDY_PRODUCTIVITY',
    name: 'Study & Productivity',
    icon: '📚',
    description: 'Study partners, tutoring, homework help',
    color: '#0066ff',
    tasksCount: 0,
    avgBudget: 25,
  },
  {
    id: 'ERRANDS',
    name: 'Errands',
    icon: '🏃',
    description: 'Quick errands, shopping, deliveries',
    color: '#00d4a8',
    tasksCount: 0,
    avgBudget: 15,
  },
  {
    id: 'FITNESS',
    name: 'Fitness',
    icon: '💪',
    description: 'Gym buddies, workout partners',
    color: '#ff6b6b',
    tasksCount: 0,
    avgBudget: 20,
  },
  {
    id: 'CREATIVE',
    name: 'Creative',
    icon: '🎨',
    description: 'Photo shoots, video creation, design',
    color: '#9b59b6',
    tasksCount: 0,
    avgBudget: 35,
  },
  {
    id: 'FUN_SOCIAL',
    name: 'Fun & Social',
    icon: '🎉',
    description: 'Event companions, activity partners',
    color: '#f39c12',
    tasksCount: 0,
    avgBudget: 18,
  },
  {
    id: 'ENTREPRENEURSHIP',
    name: 'Entrepreneurship',
    icon: '🚀',
    description: 'Pitch feedback, business help',
    color: '#1abc9c',
    tasksCount: 0,
    avgBudget: 50,
  },
  {
    id: 'TECH_SUPPORT',
    name: 'Tech Support',
    icon: '💻',
    description: 'Computer help, software assistance',
    color: '#3498db',
    tasksCount: 0,
    avgBudget: 30,
  },
  {
    id: 'EVENT_ASSISTANCE',
    name: 'Event Assistance',
    icon: '🎪',
    description: 'Event setup, venue help',
    color: '#e74c3c',
    tasksCount: 0,
    avgBudget: 40,
  },
  {
    id: 'DELIVERY',
    name: 'Delivery',
    icon: '📦',
    description: 'Package delivery, food delivery',
    color: '#00d4a8',
    tasksCount: 0,
    avgBudget: 12,
  },
  {
    id: 'LABOR',
    name: 'Labor',
    icon: '🔨',
    description: 'Moving, cleaning, physical tasks',
    color: '#7f8c8d',
    tasksCount: 0,
    avgBudget: 25,
  },
  {
    id: 'TUTORING',
    name: 'Tutoring',
    icon: '🎓',
    description: 'Academic help, subject tutoring',
    color: '#0066ff',
    tasksCount: 0,
    avgBudget: 35,
  },
  {
    id: 'OTHER',
    name: 'Other',
    icon: '✨',
    description: 'Custom tasks and requests',
    color: '#95a5a6',
    tasksCount: 0,
    avgBudget: 20,
  },
];

// ============================================
// WALLET & TRANSACTION TYPES
// ============================================

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  pendingBalance: number;
  totalEarned: number;
  totalSpent: number;
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'TASK_PAYMENT' | 'ESCROW_DEPOSIT' | 'ESCROW_RELEASE' | 'WITHDRAWAL' | 'REFUND' | 'PLATFORM_FEE' | 'REWARD_BONUS';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  amount: number;
  fee: number;
  description?: string;
  createdAt: Date;
  completedAt?: Date;
}

// ============================================
// RESOURCE SHARING TYPES
// ============================================

export interface ResourceListing {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  type: 'CALCULATOR' | 'CAMERA' | 'LAB_EQUIPMENT' | 'BOOKS' | 'TOOLS' | 'OTHER';
  dailyRate: number;
  weeklyRate?: number;
  deposit?: number;
  locationLat?: number;
  locationLng?: number;
  locationAddress?: string;
  images: string[];
  status: 'AVAILABLE' | 'RENTED' | 'UNAVAILABLE';
  condition?: string;
  totalRentals: number;
  rating: number;
  reviews: number;
  owner?: User;
}

export interface ResourceRental {
  id: string;
  listingId: string;
  renterId: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  deposit?: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

// ============================================
// GAMIFICATION TYPES
// ============================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: 'FIRST_TASK' | 'RATED_EXCELLENT' | 'LOCAL_LEGEND' | 'GIGZY_PRO' | 'TRUSTED_PROVIDER' | 'COMMUNITY_HELPER' | 'POWER_SEEKER';
  icon?: string;
  xpReward: number;
  badgeUrl?: string;
  requirements: any;
  earnedAt?: Date;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: Date;
  achievement?: Achievement;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  xpPoints: number;
  level: number;
  tasksCompleted: number;
  badge?: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: 'TASK_POSTED' | 'BID_RECEIVED' | 'BID_ACCEPTED' | 'TASK_STARTED' | 'TASK_COMPLETED' | 'PAYMENT_RELEASED' | 'NEW_REVIEW' | 'DISPUTE_CREATED' | 'RESOURCE_AVAILABLE' | 'ACHIEVEMENT_UNLOCKED' | 'NUDGE_SEEK_TO_PROVIDE' | 'NUDGE_PROVIDE_TO_SEEK';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// ============================================
// UI STATE TYPES
// ============================================

export type AppMode = 'SEEKER' | 'PROVIDER';

export interface AppState {
  mode: AppMode;
  user?: User;
  notifications: Notification[];
  unreadNotifications: number;
  setMode: (mode: AppMode) => void;
  setUser: (user: User | undefined) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// FORM & INPUT TYPES
// ============================================

export interface TaskFilters {
  category?: TaskCategoryType;
  urgency?: TaskUrgencyType;
  minBudget?: number;
  maxBudget?: number;
  maxDistance?: number;
  showInstantHire?: boolean;
  status?: TaskStatusType;
}

export interface ProviderFilters {
  skills?: string[];
  minRating?: number;
  maxDistance?: number;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  availability?: boolean;
}

// ============================================
// LOCATION TYPES
// ============================================

export interface Location {
  lat: number;
  lng: number;
  address: string;
  distance?: number;
}

export interface NearbyTask extends Task {
  distance: number;
}

export interface NearbyProvider extends User {
  distance: number;
  providerProfile?: ProviderProfile;
}

// ============================================
// DISPUTE TYPES
// ============================================

export interface Dispute {
  id: string;
  taskId: string;
  reporterId: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED';
  reason: 'QUALITY_ISSUES' | 'TIMELINE_DELAY' | 'PAYMENT_DISAGREEMENT' | 'BEHAVIOR_ISSUES' | 'SAFETY_CONCERNS' | 'OTHER';
  description: string;
  evidence: string[];
  resolution?: string;
  refundSeeker?: boolean;
  releaseProvider?: boolean;
  createdAt: Date;
  resolvedAt?: Date;
  reporter?: User;
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  id: string;
  taskId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  title?: string;
  comment?: string;
  communication?: number;
  professionalism?: number;
  timeliness?: number;
  quality?: number;
  createdAt: Date;
  reviewer?: User;
  reviewee?: User;
}