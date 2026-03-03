'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Star,
  Search,
  Filter,
  Flame,
  Zap
} from 'lucide-react';
import { Task, COMMUNITY_CATEGORIES } from '@/types';
import { taskApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function SeekerDashboard() {
  const [urgentTasks, setUrgentTasks] = useState<Task[]>([]);
  const [topProviders, setTopProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load urgent tasks
      const tasksResponse = await taskApi.getTasks({
        urgency: 'URGENT',
        status: 'POSTED',
        limit: 6
      });

      if (tasksResponse.success && tasksResponse.data) {
        setUrgentTasks(tasksResponse.data.items);
      }

      // Load top providers (simulated for now)
      setTopProviders([
        {
          id: '1',
          fullName: 'Alex Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
          rating: 4.9,
          tasksCompleted: 156,
          hourlyRate: 25,
          skills: ['Delivery', 'Moving', 'General Labor'],
          trustLevel: 'EXCELLENT',
        },
        {
          id: '2',
          fullName: 'Sarah Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          rating: 4.8,
          tasksCompleted: 142,
          hourlyRate: 30,
          skills: ['Tutoring', 'Study Partner', 'Research'],
          trustLevel: 'EXCELLENT',
        },
        {
          id: '3',
          fullName: 'Mike Williams',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
          rating: 4.7,
          tasksCompleted: 128,
          hourlyRate: 22,
          skills: ['Photography', 'Video', 'Creative'],
          trustLevel: 'HIGH',
        },
      ]);

    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'ASAP':
        return (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-error-500/20 text-error-500 rounded-full">
            <Zap className="w-3 h-3" />
            ASAP
          </span>
        );
      case 'URGENT':
        return (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-warning-500/20 text-warning-500 rounded-full">
            <Flame className="w-3 h-3" />
            Urgent
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-dark-600 text-dark-400 rounded-full">
            Normal
          </span>
        );
    }
  };

  const getDistance = (lat: number, lng: number) => {
    // Simulated distance calculation
    return `${(Math.random() * 5 + 0.5).toFixed(1)} km`;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-seeker-600/20 to-seeker-400/10 border border-seeker-500/30 rounded-card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient-seeker">
              Find Your Perfect Provider
            </h1>
            <p className="text-dark-400 mt-1">
              Browse {urgentTasks.length}+ urgent tasks nearby
            </p>
          </div>
          <button className="btn btn-seeker">
            <Search className="w-4 h-4 mr-2" />
            Search Providers
          </button>
        </div>
      </motion.div>

      {/* Category Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-3">
          {COMMUNITY_CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              className={`flex flex-col items-center p-3 rounded-card transition-all ${
                selectedCategory === category.id
                  ? 'bg-seeker-500/20 border-seeker-500 border-2'
                  : 'bg-dark-700 border-dark-600 border hover:border-dark-500'
              }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs text-center leading-tight text-dark-400">
                {category.name.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Tasks Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Flame className="w-5 h-5 text-warning-500" />
              Urgent Tasks Nearby
            </h2>
            <span className="text-sm text-dark-400">
              {urgentTasks.length} tasks
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-dark-700 rounded-card animate-pulse" />
              ))}
            </div>
          ) : urgentTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-dark-400">No urgent tasks available right now</p>
            </div>
          ) : (
            <div className="space-y-3">
              {urgentTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1 line-clamp-1">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-dark-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {getDistance(task.locationLat, task.locationLng)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.duration ? `${task.duration} min` : 'Flexible'}
                        </span>
                      </div>
                    </div>
                    {getUrgencyBadge(task.urgency)}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-dark-600">
                    <span className="flex items-center gap-1 text-seeker-500 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      ${task.budgetMin} - ${task.budgetMax}
                    </span>
                    <button className="btn-outline px-3 py-1 text-xs">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Top Rated Providers Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-turquoise-500" />
              Top Rated Providers
            </h2>
            <span className="text-sm text-dark-400">
              {topProviders.length} available
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-dark-700 rounded-card animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {topProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={provider.avatar}
                      alt={provider.fullName}
                      className="w-12 h-12 rounded-full border-2 border-turquoise-500"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {provider.fullName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className="flex items-center gap-1 text-turquoise-500">
                          <Star className="w-3 h-3 fill-current" />
                          {provider.rating}
                        </span>
                        <span>•</span>
                        <span>{provider.tasksCompleted} tasks</span>
                        <span>•</span>
                        <span>${provider.hourlyRate}/hr</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {provider.trustLevel === 'EXCELLENT' && (
                        <span className="px-2 py-1 text-xs font-medium bg-turquoise-500/20 text-turquoise-500 rounded-full">
                          Trusted
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-seeker-500/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-seeker-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-seeker-500">12</p>
              <p className="text-xs text-dark-400">Tasks Posted</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-turquoise-500/20 rounded-full">
              <DollarSign className="w-6 h-6 text-turquoise-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-turquoise-500">$245</p>
              <p className="text-xs text-dark-400">Total Spent</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success-500/20 rounded-full">
              <Star className="w-6 h-6 text-success-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success-500">4.8</p>
              <p className="text-xs text-dark-400">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-warning-500/20 rounded-full">
              <Clock className="w-6 h-6 text-warning-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning-500">2h</p>
              <p className="text-xs text-dark-400">Avg Response</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}