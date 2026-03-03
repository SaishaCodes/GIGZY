import { ApiResponse, PaginatedResponse } from '@/types';

const API_BASE = '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'An error occurred',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Task API
 */
export const taskApi = {
  // Get all tasks with filters
  getTasks: async (params?: {
    category?: string;
    status?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    return fetchApi<PaginatedResponse<any>>(`/tasks?${searchParams.toString()}`);
  },

  // Get single task
  getTask: async (id: string) => {
    return fetchApi<any>(`/tasks/${id}`);
  },

  // Create task
  createTask: async (data: any) => {
    return fetchApi<any>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update task
  updateTask: async (id: string, data: any) => {
    return fetchApi<any>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Accept bid
  acceptBid: async (taskId: string, bidId: string) => {
    return fetchApi<any>(`/tasks/${taskId}/accept-bid`, {
      method: 'POST',
      body: JSON.stringify({ bidId }),
    });
  },

  // Start task (provider)
  startTask: async (taskId: string) => {
    return fetchApi<any>(`/tasks/${taskId}/start`, {
      method: 'POST',
    });
  },

  // Complete task (provider)
  completeTask: async (taskId: string) => {
    return fetchApi<any>(`/tasks/${taskId}/complete`, {
      method: 'POST',
    });
  },

  // Mark as completed by seeker (releases escrow)
  markCompleted: async (taskId: string, rating?: number, review?: string) => {
    return fetchApi<any>(`/tasks/${taskId}/mark-completed`, {
      method: 'POST',
      body: JSON.stringify({ rating, review }),
    });
  },
};

/**
 * Bid API
 */
export const bidApi = {
  // Create bid
  createBid: async (data: { taskId: string; amount: number; message?: string }) => {
    return fetchApi<any>('/bids', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get bids for task
  getTaskBids: async (taskId: string) => {
    return fetchApi<any[]>(`/tasks/${taskId}/bids`);
  },

  // Withdraw bid
  withdrawBid: async (bidId: string) => {
    return fetchApi<any>(`/bids/${bidId}/withdraw`, {
      method: 'POST',
    });
  },
};

/**
 * User API
 */
export const userApi = {
  // Get current user
  getCurrentUser: async () => {
    return fetchApi<any>('/user/me');
  },

  // Update profile
  updateProfile: async (data: any) => {
    return fetchApi<any>('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Get provider profile
  getProviderProfile: async (userId: string) => {
    return fetchApi<any>(`/users/${userId}/provider`);
  },

  // Get seeker profile
  getSeekerProfile: async (userId: string) => {
    return fetchApi<any>(`/users/${userId}/seeker`);
  },

  // Update location
  updateLocation: async (lat: number, lng: number, address?: string) => {
    return fetchApi<any>('/user/location', {
      method: 'POST',
      body: JSON.stringify({ lat, lng, address }),
    });
  },
};

/**
 * Wallet API
 */
export const walletApi = {
  // Get wallet
  getWallet: async () => {
    return fetchApi<any>('/wallet');
  },

  // Get transactions
  getTransactions: async (page = 1, limit = 10) => {
    return fetchApi<PaginatedResponse<any>>(`/wallet/transactions?page=${page}&limit=${limit}`);
  },

  // Deposit funds
  deposit: async (amount: number) => {
    return fetchApi<any>('/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },

  // Withdraw funds
  withdraw: async (amount: number) => {
    return fetchApi<any>('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },
};

/**
 * Resource API
 */
export const resourceApi = {
  // Get resources
  getResources: async (params?: {
    type?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    return fetchApi<PaginatedResponse<any>>(`/resources?${searchParams.toString()}`);
  },

  // Create resource listing
  createResource: async (data: any) => {
    return fetchApi<any>('/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Book resource
  bookResource: async (resourceId: string, data: { startDate: string; endDate: string }) => {
    return fetchApi<any>(`/resources/${resourceId}/book`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Gamification API
 */
export const gamificationApi = {
  // Get achievements
  getAchievements: async () => {
    return fetchApi<any[]>('/achievements');
  },

  // Get leaderboard
  getLeaderboard: async (type: 'local' | 'global' = 'local') => {
    return fetchApi<any[]>(`/gamification/leaderboard?type=${type}`);
  },

  // Get XP stats
  getXpStats: async () => {
    return fetchApi<any>('/gamification/xp');
  },
};

/**
 * Notification API
 */
export const notificationApi = {
  // Get notifications
  getNotifications: async (page = 1, limit = 20) => {
    return fetchApi<PaginatedResponse<any>>(`/notifications?page=${page}&limit=${limit}`);
  },

  // Mark as read
  markAsRead: async (id: string) => {
    return fetchApi<any>(`/notifications/${id}/read`, { method: 'POST' });
  },

  // Mark all as read
  markAllAsRead: async () => {
    return fetchApi<any>('/notifications/read-all', { method: 'POST' });
  },
};