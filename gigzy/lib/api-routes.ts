/**
 * Gigzy API Route Definitions
 * 
 * This file documents all API endpoints available in the Gigzy application.
 * Each route is organized by resource and includes request/response types.
 */

// ============================================
// AUTHENTICATION ROUTES
// ============================================

/**
 * POST /api/auth/register
 * Register a new user
 * 
 * Request:
 * {
 *   email: string,
 *   username: string,
 *   password: string,
 *   role?: 'SEEKER' | 'PROVIDER' | 'HYBRID'
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: { user: User, token: string },
 *   error?: string
 * }
 */

/**
 * POST /api/auth/login
 * Login user
 * 
 * Request:
 * {
 *   email: string,
 *   password: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: { user: User, token: string },
 *   error?: string
 * }
 */

/**
 * POST /api/auth/logout
 * Logout user
 * 
 * Response:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */

/**
 * POST /api/auth/refresh
 * Refresh access token
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: { token: string },
 *   error?: string
 * }
 */

// ============================================
// USER ROUTES
// ============================================

/**
 * GET /api/user/me
 * Get current authenticated user
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: User & { seekerProfile?, providerProfile? },
 *   error?: string
 * }
 */

/**
 * PATCH /api/user/profile
 * Update user profile
 * 
 * Request:
 * {
 *   fullName?: string,
 *   bio?: string,
 *   phone?: string,
 *   locationLat?: number,
 *   locationLng?: number,
 *   locationAddress?: string,
 *   college?: string,
 *   major?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: User,
 *   error?: string
 * }
 */

/**
 * POST /api/user/location
 * Update user location
 * 
 * Request:
 * {
 *   lat: number,
 *   lng: number,
 *   address?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: { locationLat: number, locationLng: number },
 *   error?: string
 * }
 */

/**
 * POST /api/user/verify
 * Submit identity verification
 * 
 * Request: FormData
 * {
 *   documentType: string,
 *   documentImage: File,
 *   selfieImage: File
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: { verificationStatus: 'PENDING' },
 *   error?: string
 * }
 */

/**
 * GET /api/users/:id/provider
 * Get provider profile
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: ProviderProfile & { user: User, reviews: Review[] },
 *   error?: string
 * }
 */

/**
 * GET /api/users/:id/seeker
 * Get seeker profile
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: SeekerProfile & { user: User },
 *   error?: string
 * }
 */

// ============================================
// TASK ROUTES
// ============================================

/**
 * GET /api/tasks
 * List tasks with filters
 * 
 * Query Parameters:
 * - category?: TaskCategory
 * - status?: TaskStatus
 * - urgency?: TaskUrgency
 * - lat?: number
 * - lng?: number
 * - radius?: number (km)
 * - minBudget?: number
 * - maxBudget?: number
 * - showInstantHire?: boolean
 * - page?: number
 * - limit?: number
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     items: Task[],
 *     total: number,
 *     page: number,
 *     pageSize: number,
 *     totalPages: number
 *   },
 *   error?: string
 * }
 */

/**
 * GET /api/tasks/:id
 * Get task details
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task & {
 *     seeker: User,
 *     provider?: User,
 *     bids: Bid[],
 *     timeline: TaskTimeline[]
 *   },
 *   error?: string
 * }
 */

/**
 * POST /api/tasks
 * Create a new task
 * 
 * Request:
 * {
 *   title: string,
 *   description: string,
 *   category: TaskCategory,
 *   urgency?: TaskUrgency,
 *   locationLat: number,
 *   locationLng: number,
 *   locationAddress: string,
 *   scheduledAt?: string,
 *   duration?: number,
 *   budgetMin: number,
 *   budgetMax: number,
 *   instantHire?: boolean,
 *   instantHirePrice?: number
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task,
 *   error?: string
 * }
 */

/**
 * PATCH /api/tasks/:id
 * Update task
 * 
 * Request:
 * {
 *   title?: string,
 *   description?: string,
 *   category?: TaskCategory,
 *   urgency?: TaskUrgency,
 *   budgetMin?: number,
 *   budgetMax?: number,
 *   status?: TaskStatus
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task,
 *   error?: string
 * }
 */

/**
 * DELETE /api/tasks/:id
 * Delete task (seeker only, only if status is POSTED)
 * 
 * Response:
 * {
 *   success: boolean,
 *   message?: string,
 *   error?: string
 * }
 */

/**
 * POST /api/tasks/:id/accept-bid
 * Accept a bid for a task
 * 
 * Request:
 * {
 *   bidId: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task,
 *   error?: string
 * }
 */

/**
 * POST /api/tasks/:id/start
 * Start working on a task (provider only)
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task,
 *   error?: string
 * }
 */

/**
 * POST /api/tasks/:id/complete
 * Mark task as completed by provider
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task,
 *   error?: string
 * }
 */

/**
 * POST /api/tasks/:id/mark-completed
 * Mark task as completed by seeker (releases escrow)
 * 
 * Request:
 * {
 *   rating?: number (1-5),
 *   review?: string,
 *   communication?: number,
 *   professionalism?: number,
 *   timeliness?: number,
 *   quality?: number
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task & { review?: Review },
 *   error?: string
 * }
 */

/**
 * POST /api/tasks/:id/cancel
 * Cancel a task
 * 
 * Request:
 * {
 *   reason?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Task,
 *   error?: string
 * }
 */

// ============================================
// BID ROUTES
// ============================================

/**
 * GET /api/tasks/:taskId/bids
 * Get bids for a task
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Bid[] & { provider: User }[],
 *   error?: string
 * }
 */

/**
 * POST /api/bids
 * Create a bid
 * 
 * Request:
 * {
 *   taskId: string,
 *   amount: number,
 *   message?: string,
 *   estimatedDuration?: number
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Bid,
 *   error?: string
 * }
 */

/**
 * POST /api/bids/:id/withdraw
 * Withdraw a bid
 * 
 * Response:
 * {
 *   success: boolean,
 *   message?: string,
 *   error?: string
 * }
 */

/**
 * GET /api/bids/my-bids
 * Get current user's bids
 * 
 * Query Parameters:
 * - status?: string
 * - page?: number
 * - limit?: number
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     items: Bid[] & { task: Task }[],
 *     total: number,
 *     page: number
 *   },
 *   error?: string
 * }
 */

// ============================================
// WALLET ROUTES
// ============================================

/**
 * GET /api/wallet
 * Get wallet balance
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Wallet,
 *   error?: string
 * }
 */

/**
 * GET /api/wallet/transactions
 * Get transaction history
 * 
 * Query Parameters:
 * - page?: number
 * - limit?: number
 * - type?: TransactionType
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     items: Transaction[],
 *     total: number,
 *     page: number
 *   },
 *   error?: string
 * }
 */

/**
 * POST /api/wallet/deposit
 * Deposit funds
 * 
 * Request:
 * {
 *   amount: number,
 *   paymentMethodId?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: { clientSecret?: string, transaction?: Transaction },
 *   error?: string
 * }
 */

/**
 * POST /api/wallet/withdraw
 * Withdraw funds
 * 
 * Request:
 * {
 *   amount: number,
 *   withdrawalMethod?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Transaction,
 *   error?: string
 * }
 */

// ============================================
// RESOURCE ROUTES
// ============================================

/**
 * GET /api/resources
 * List resource listings
 * 
 * Query Parameters:
 * - type?: ResourceType
 * - lat?: number
 * - lng?: number
 * - radius?: number
 * - status?: ResourceStatus
 * - page?: number
 * - limit?: number
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     items: ResourceListing[],
 *     total: number,
 *     page: number
 *   },
 *   error?: string
 * }
 */

/**
 * GET /api/resources/:id
 * Get resource details
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: ResourceListing & { owner: User, rentals: ResourceRental[] },
 *   error?: string
 * }
 */

/**
 * POST /api/resources
 * Create resource listing
 * 
 * Request:
 * {
 *   title: string,
 *   description?: string,
 *   type: ResourceType,
 *   category?: string,
 *   dailyRate: number,
 *   weeklyRate?: number,
 *   deposit?: number,
 *   locationLat?: number,
 *   locationLng?: number,
 *   locationAddress?: string,
 *   images?: string[],
 *   condition?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: ResourceListing,
 *   error?: string
 * }
 */

/**
 * PATCH /api/resources/:id
 * Update resource listing
 * 
 * Request: (partial ResourceListing fields)
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: ResourceListing,
 *   error?: string
 * }
 */

/**
 * DELETE /api/resources/:id
 * Delete resource listing
 * 
 * Response:
 * {
 *   success: boolean,
 *   message?: string,
 *   error?: string
 * }
 */

/**
 * POST /api/resources/:id/book
 * Book a resource
 * 
 * Request:
 * {
 *   startDate: string,
 *   endDate: string,
 *   notes?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: ResourceRental,
 *   error?: string
 * }
 */

/**
 * POST /api/resources/rentals/:id/complete
 * Complete a rental
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: ResourceRental,
 *   error?: string
 * }
 */

// ============================================
// GAMIFICATION ROUTES
// ============================================

/**
 * GET /api/achievements
 * Get all achievements with user progress
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: (Achievement & { earned?: boolean, progress?: number })[],
 *   error?: string
 * }
 */

/**
 * GET /api/gamification/leaderboard
 * Get leaderboard
 * 
 * Query Parameters:
 * - type?: 'local' | 'global'
 * - lat?: number
 * - lng?: number
 * - limit?: number
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     rank: number,
 *     user: User,
 *     xpPoints: number,
 *     level: number,
 *     tasksCompleted: number
 *   }[],
 *   error?: string
 * }
 */

/**
 * GET /api/gamification/xp
 * Get XP statistics
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     currentLevel: number,
 *     currentXp: number,
 *     xpToNextLevel: number,
 *     totalXp: number,
 *     tasksCompleted: number,
 *     rating: number,
 *     streak: number
 *   },
 *   error?: string
 * }
 */

// ============================================
// NOTIFICATION ROUTES
// ============================================

/**
 * GET /api/notifications
 * Get notifications
 * 
 * Query Parameters:
 * - page?: number
 * - limit?: number
 * - unreadOnly?: boolean
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     items: Notification[],
 *     total: number,
 *     page: number
 *   },
 *   error?: string
 * }
 */

/**
 * POST /api/notifications/:id/read
 * Mark notification as read
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Notification,
 *   error?: string
 * }
 */

/**
 * POST /api/notifications/read-all
 * Mark all notifications as read
 * 
 * Response:
 * {
 *   success: boolean,
 *   message?: string,
 *   error?: string
 * }
 */

// ============================================
// DISPUTE ROUTES
// ============================================

/**
 * GET /api/disputes
 * Get disputes (admin or involved parties)
 * 
 * Query Parameters:
 * - status?: DisputeStatus
 * - page?: number
 * - limit?: number
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     items: Dispute[],
 *     total: number,
 *     page: number
 *   },
 *   error?: string
 * }
 */

/**
 * POST /api/disputes
 * Create a dispute
 * 
 * Request:
 * {
 *   taskId: string,
 *   reason: DisputeReason,
 *   description: string,
 *   evidence?: string[]
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Dispute,
 *   error?: string
 * }
 */

/**
 * POST /api/disputes/:id/resolve
 * Resolve a dispute (admin only)
 * 
 * Request:
 * {
 *   resolution: string,
 *   refundSeeker?: boolean,
 *   releaseProvider?: boolean
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: Dispute,
 *   error?: string
 * }
 */

// ============================================
// SEARCH ROUTES
// ============================================

/**
 * GET /api/search
 * Global search
 * 
 * Query Parameters:
 * - q: string (search query)
 * - type?: 'tasks' | 'providers' | 'resources' | 'all'
 * - lat?: number
 * - lng?: number
 * - limit?: number
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     tasks?: Task[],
 *     providers?: User[],
 *     resources?: ResourceListing[]
 *   },
 *   error?: string
 * }
 */

export const API_ROUTES = {
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },
  user: {
    me: '/api/user/me',
    profile: '/api/user/profile',
    location: '/api/user/location',
    verify: '/api/user/verify',
    provider: (id: string) => `/api/users/${id}/provider`,
    seeker: (id: string) => `/api/users/${id}/seeker`,
  },
  tasks: {
    list: '/api/tasks',
    get: (id: string) => `/api/tasks/${id}`,
    create: '/api/tasks',
    update: (id: string) => `/api/tasks/${id}`,
    delete: (id: string) => `/api/tasks/${id}`,
    acceptBid: (id: string) => `/api/tasks/${id}/accept-bid`,
    start: (id: string) => `/api/tasks/${id}/start`,
    complete: (id: string) => `/api/tasks/${id}/complete`,
    markCompleted: (id: string) => `/api/tasks/${id}/mark-completed`,
    cancel: (id: string) => `/api/tasks/${id}/cancel`,
    bids: (taskId: string) => `/api/tasks/${taskId}/bids`,
  },
  bids: {
    create: '/api/bids',
    withdraw: (id: string) => `/api/bids/${id}/withdraw`,
    myBids: '/api/bids/my-bids',
  },
  wallet: {
    get: '/api/wallet',
    transactions: '/api/wallet/transactions',
    deposit: '/api/wallet/deposit',
    withdraw: '/api/wallet/withdraw',
  },
  resources: {
    list: '/api/resources',
    get: (id: string) => `/api/resources/${id}`,
    create: '/api/resources',
    update: (id: string) => `/api/resources/${id}`,
    delete: (id: string) => `/api/resources/${id}`,
    book: (id: string) => `/api/resources/${id}/book`,
    completeRental: (id: string) => `/api/resources/rentals/${id}/complete`,
  },
  gamification: {
    achievements: '/api/achievements',
    leaderboard: '/api/gamification/leaderboard',
    xp: '/api/gamification/xp',
  },
  notifications: {
    list: '/api/notifications',
    read: (id: string) => `/api/notifications/${id}/read`,
    readAll: '/api/notifications/read-all',
  },
  disputes: {
    list: '/api/disputes',
    create: '/api/disputes',
    resolve: (id: string) => `/api/disputes/${id}/resolve`,
  },
  search: '/api/search',
};