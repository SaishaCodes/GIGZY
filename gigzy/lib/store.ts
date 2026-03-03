import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppMode, User, Notification } from '@/types';

interface AppState {
  // Mode Management
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  
  // User Management
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  // Location
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  
  // Loading States
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Mode Management
      mode: 'SEEKER',
      setMode: (mode) => set({ mode }),
      toggleMode: () => set((state) => ({
        mode: state.mode === 'SEEKER' ? 'PROVIDER' : 'SEEKER'
      })),
      
      // User Management
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      clearUser: () => set({ user: null, notifications: [] }),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications]
      })),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        )
      })),
      markAllNotificationsAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      clearNotifications: () => set({ notifications: [] }),
      
      // UI State
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
      })),
      
      // Location
      userLocation: null,
      setUserLocation: (location) => set({ userLocation: location }),
      
      // Loading States
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'gigzy-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mode: state.mode,
        user: state.user,
        notifications: state.notifications,
        userLocation: state.userLocation,
      }),
    }
  )
);

// Selector hooks for optimized re-renders
export const useMode = () => useAppStore((state) => state.mode);
export const useUser = () => useAppStore((state) => state.user);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useUserLocation = () => useAppStore((state) => state.userLocation);
export const useUnreadNotifications = () =>
  useAppStore((state) => state.notifications.filter(n => !n.read).length);