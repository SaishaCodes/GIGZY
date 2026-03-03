'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Star,
  CheckCircle2,
  Circle,
  Play,
  Calendar,
  Filter,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Task, COMMUNITY_CATEGORIES } from '@/types';
import { taskApi } from '@/lib/api';
import toast from 'react-hot-toast';

type TaskStatusType = 'POSTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED';

export default function ProviderDashboard() {
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(5);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [selectedSkills, maxDistance]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load available tasks
      const tasksResponse = await taskApi.getTasks({
        status: 'POSTED',
        limit: 10
      });

      if (tasksResponse.success && tasksResponse.data) {
        setAvailableTasks(tasksResponse.data.items);
      }

      // Load my tasks (simulated)
      setMyTasks([
        {
          id: '1',
          title: 'Study Partner for Calculus Exam',
          description: 'Need help preparing for calculus final exam. We can meet at the library.',
          category: 'TUTORING',
          urgency: 'URGENT',
          status: 'IN_PROGRESS',
          seekerId: 'user1',
          providerId: 'me',
          locationLat: 40.7128,
          locationLng: -74.0060,
          locationAddress: 'University Library',
          scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
          duration: 120,
          budgetMin: 30,
          budgetMax: 40,
          instantHire: false,
          escrowHeld: true,
          escrowAmount: 35,
          platformFee: 5.25,
          views: 15,
          bidsCount: 3,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          acceptedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          startedAt: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: '2',
          title: 'Deliver Books from Library',
          description: 'Pick up reserved books from library and deliver to dorm.',
          category: 'DELIVERY',
          urgency: 'NORMAL',
          status: 'ACCEPTED',
          seekerId: 'user2',
          providerId: 'me',
          locationLat: 40.7128,
          locationLng: -74.0060,
          locationAddress: 'Dorm B',
          scheduledAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
          duration: 30,
          budgetMin: 10,
          budgetMax: 15,
          instantHire: true,
          escrowHeld: true,
          escrowAmount: 12,
          platformFee: 1.8,
          views: 8,
          bidsCount: 1,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          acceptedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
        {
          id: '3',
          title: 'Gym Partner Needed',
          description: 'Looking for a gym buddy for evening workouts.',
          category: 'FITNESS',
          urgency: 'NORMAL',
          status: 'COMPLETED',
          seekerId: 'user3',
          providerId: 'me',
          locationLat: 40.7128,
          locationLng: -74.0060,
          locationAddress: 'Campus Gym',
          scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          duration: 60,
          budgetMin: 20,
          budgetMax: 25,
          instantHire: false,
          escrowHeld: false,
          finalPrice: 22,
          platformFee: 3.3,
          views: 20,
          bidsCount: 5,
          createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          acceptedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
          startedAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
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
            <Zap className="w-3 h-3" />
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

  const getStatusIcon = (status: TaskStatusType) => {
    switch (status) {
      case 'POSTED':
        return <Circle className="w-4 h-4 text-dark-400" />;
      case 'ACCEPTED':
        return <CheckCircle2 className="w-4 h-4 text-turquoise-500" />;
      case 'IN_PROGRESS':
        return <Play className="w-4 h-4 text-provider-500" />;
      case 'COMPLETED':
        return <CheckCircle2 className="w-4 h-4 text-success-500" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const handleStartTask = async (taskId: string) => {
    try {
      const response = await taskApi.startTask(taskId);
      if (response.success) {
        toast.success('Task started successfully');
        loadDashboardData();
      }
    } catch (error) {
      toast.error('Failed to start task');
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const response = await taskApi.completeTask(taskId);
      if (response.success) {
        toast.success('Task completed. Waiting for confirmation.');
        loadDashboardData();
      }
    } catch (error) {
      toast.error('Failed to complete task');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-provider-600/20 to-provider-400/10 border border-provider-500/30 rounded-card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient-provider">
              Find Gigs & Track Tasks
            </h1>
            <p className="text-dark-400 mt-1">
              {availableTasks.length} gigs available nearby
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button className="btn btn-provider">
              <Zap className="w-4 h-4 mr-2" />
              Quick Apply
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="card"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-dark-400">
                Max Distance
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">{maxDistance} km</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-dark-400">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {['Delivery', 'Tutoring', 'Photography', 'Fitness', 'Tech'].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setSelectedSkills(prev =>
                        prev.includes(skill)
                          ? prev.filter(s => s !== skill)
                          : [...prev, skill]
                      );
                    }}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-provider-500 text-dark-900'
                        : 'bg-dark-600 text-dark-400 hover:bg-dark-500'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-dark-400">
                Minimum Budget
              </label>
              <input
                type="number"
                placeholder="$10"
                className="input-field"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Gigs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-provider-500" />
              Available Gigs
            </h2>
            <span className="text-sm text-dark-400">
              {availableTasks.length} gigs
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-dark-700 rounded-card animate-pulse" />
              ))}
            </div>
          ) : availableTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-dark-400">No gigs available right now</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {availableTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card-hover cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">
                        {task.title}
                      </h3>
                      <p className="text-xs text-dark-400 line-clamp-1 mb-2">
                        {task.description}
                      </p>
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
                    <div>
                      <span className="flex items-center gap-1 text-provider-500 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        ${task.budgetMin}
                      </span>
                      {task.budgetMax !== task.budgetMin && (
                        <span className="text-dark-400 text-sm">
                          - ${task.budgetMax}
                        </span>
                      )}
                    </div>
                    <button className="btn-outline px-3 py-1 text-xs">
                      <ArrowRight className="w-3 h-3 mr-1" />
                      Apply
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Task Tracker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-turquoise-500" />
              Task Tracker
            </h2>
            <span className="text-sm text-dark-400">
              {myTasks.length} active
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {myTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="space-y-4">
                  {/* Task Info */}
                  <div>
                    <h3 className="font-medium text-sm mb-2">{task.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-dark-400">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${task.finalPrice || `${task.budgetMin}-${task.budgetMax}`}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.locationAddress}
                      </span>
                    </div>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pl-6 space-y-4">
                    <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-dark-500" />

                    <div className="relative flex items-start gap-3">
                      <div className="absolute left-0 w-4 h-4 rounded-full bg-turquoise-500 border-2 border-dark-800" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-turquoise-500">Posted</p>
                        <p className="text-xs text-dark-400">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-3">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <p className={`text-xs font-medium ${
                          task.status === 'ACCEPTED' || 
                          task.status === 'IN_PROGRESS' || 
                          task.status === 'COMPLETED'
                            ? 'text-turquoise-500'
                            : 'text-dark-400'
                        }`}>
                          Accepted
                        </p>
                        <p className="text-xs text-dark-400">
                          {task.acceptedAt 
                            ? new Date(task.acceptedAt).toLocaleString()
                            : 'Pending'
                          }
                        </p>
                      </div>
                    </div>

                    {task.status === 'IN_PROGRESS' || task.status === 'COMPLETED' && (
                      <div className="relative flex items-start gap-3">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${
                            task.status === 'IN_PROGRESS' || 
                            task.status === 'COMPLETED'
                              ? 'text-provider-500'
                              : 'text-dark-400'
                          }`}>
                            Started
                          </p>
                          <p className="text-xs text-dark-400">
                            {task.startedAt 
                              ? new Date(task.startedAt).toLocaleString()
                              : 'Pending'
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    {task.status === 'COMPLETED' && (
                      <div className="relative flex items-start gap-3">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <p className="text-xs font-medium text-success-500">Completed</p>
                          <p className="text-xs text-dark-400">
                            {task.completedAt 
                              ? new Date(task.completedAt).toLocaleString()
                              : 'Pending'
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {task.status === 'ACCEPTED' && (
                    <button
                      onClick={() => handleStartTask(task.id)}
                      className="w-full btn btn-provider"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Task
                    </button>
                  )}

                  {task.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="w-full btn btn-primary"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Completed
                    </button>
                  )}

                  {task.status === 'COMPLETED' && (
                    <div className="text-center text-xs text-dark-400">
                      ✓ Payment pending confirmation
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Provider Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-provider-500/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-provider-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-provider-500">$1,245</p>
              <p className="text-xs text-dark-400">Total Earned</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-turquoise-500/20 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-turquoise-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-turquoise-500">48</p>
              <p className="text-xs text-dark-400">Tasks Done</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success-500/20 rounded-full">
              <Star className="w-6 h-6 text-success-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success-500">4.9</p>
              <p className="text-xs text-dark-400">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-warning-500/20 rounded-full">
              <Zap className="w-6 h-6 text-warning-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning-500">15min</p>
              <p className="text-xs text-dark-400">Response Time</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}