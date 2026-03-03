'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Crown, 
  Flame, 
  Zap, 
  Award, 
  Target,
  TrendingUp,
  Medal,
  Gift,
  Lock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  xpReward: number;
  badgeUrl?: string;
  earned?: boolean;
  earnedAt?: Date;
  progress?: number;
  total?: number;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  xpPoints: number;
  level: number;
  tasksCompleted: number;
  badge?: string;
}

export default function RewardsHub() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard'>('achievements');
  const [loading, setLoading] = useState(true);
  const [userXpStats, setUserXpStats] = useState({
    currentLevel: 12,
    currentXp: 2450,
    xpToNextLevel: 3000,
    totalXp: 2450,
    tasksCompleted: 48,
    rating: 4.9,
    streak: 7,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Simulated data - in production, this would be API calls
    setAchievements([
      {
        id: '1',
        name: 'First Task',
        description: 'Complete your first task',
        type: 'FIRST_TASK',
        icon: '🎯',
        xpReward: 100,
        earned: true,
        earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        progress: 1,
        total: 1,
      },
      {
        id: '2',
        name: 'Rising Star',
        description: 'Complete 10 tasks with 4.5+ rating',
        type: 'RATED_EXCELLENT',
        icon: '⭐',
        xpReward: 500,
        earned: true,
        earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        progress: 10,
        total: 10,
      },
      {
        id: '3',
        name: 'Local Legend',
        description: 'Be top 3 in your area for a week',
        type: 'LOCAL_LEGEND',
        icon: '👑',
        xpReward: 1000,
        earned: false,
        progress: 2,
        total: 3,
      },
      {
        id: '4',
        name: 'Gigzy Pro',
        description: 'Complete 50 tasks and earn $500',
        type: 'GIGZY_PRO',
        icon: '🚀',
        xpReward: 2000,
        earned: false,
        progress: 48,
        total: 50,
      },
      {
        id: '5',
        name: 'Trusted Provider',
        description: 'Maintain 98% completion rate',
        type: 'TRUSTED_PROVIDER',
        icon: '🛡️',
        xpReward: 750,
        earned: true,
        earnedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        progress: 98,
        total: 98,
      },
      {
        id: '6',
        name: 'Community Helper',
        description: 'Help 25 seekers complete tasks',
        type: 'COMMUNITY_HELPER',
        icon: '🤝',
        xpReward: 600,
        earned: false,
        progress: 20,
        total: 25,
      },
      {
        id: '7',
        name: 'Power Seeker',
        description: 'Post and complete 20 tasks',
        type: 'POWER_SEEKER',
        icon: '💪',
        xpReward: 400,
        earned: false,
        progress: 15,
        total: 20,
      },
    ]);

    setLeaderboard([
      {
        rank: 1,
        userId: 'user1',
        name: 'Alex Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        xpPoints: 4500,
        level: 18,
        tasksCompleted: 156,
        badge: '👑',
      },
      {
        rank: 2,
        userId: 'user2',
        name: 'Sarah Miller',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        xpPoints: 4200,
        level: 16,
        tasksCompleted: 142,
        badge: '🥈',
      },
      {
        rank: 3,
        userId: 'user3',
        name: 'Mike Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        xpPoints: 3800,
        level: 15,
        tasksCompleted: 128,
        badge: '🥉',
      },
      {
        rank: 4,
        userId: 'me',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        xpPoints: 2450,
        level: 12,
        tasksCompleted: 48,
        badge: null,
      },
      {
        rank: 5,
        userId: 'user5',
        name: 'Emily Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        xpPoints: 2100,
        level: 10,
        tasksCompleted: 65,
        badge: null,
      },
    ]);

    setLoading(false);
  };

  const getLevelTitle = (level: number) => {
    if (level >= 20) return 'Legend';
    if (level >= 15) return 'Master';
    if (level >= 10) return 'Expert';
    if (level >= 5) return 'Pro';
    return 'Rookie';
  };

  const getXpProgress = () => {
    const current = userXpStats.currentXp;
    const target = userXpStats.xpToNextLevel;
    return Math.round((current / target) * 100);
  };

  return (
    <div className="space-y-6">
      {/* XP Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-turquoise-600/20 via-turquoise-500/10 to-provider-600/20 border border-turquoise-500/30 rounded-card p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Level Badge */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-turquoise-500 to-turquoise-600 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-dark-900">{userXpStats.currentLevel}</span>
                <p className="text-xs text-dark-900/70">{getLevelTitle(userXpStats.currentLevel)}</p>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-dark-800 rounded-full p-1">
              <Crown className="w-6 h-6 text-warning-500" />
            </div>
          </div>

          {/* XP Progress */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Experience Points</h3>
              <span className="text-sm text-dark-400">
                {userXpStats.currentXp} / {userXpStats.xpToNextLevel} XP
              </span>
            </div>
            <div className="w-full h-4 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getXpProgress()}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-turquoise-500 to-turquoise-400 rounded-full"
              />
            </div>
            <p className="text-xs text-dark-400 mt-2">
              {userXpStats.xpToNextLevel - userXpStats.currentXp} XP to Level {userXpStats.currentLevel + 1}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-turquoise-500">
                <Flame className="w-6 h-6" />
                {userXpStats.streak}
              </div>
              <p className="text-xs text-dark-400">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-success-500">
                <CheckCircle2 className="w-6 h-6" />
                {userXpStats.tasksCompleted}
              </div>
              <p className="text-xs text-dark-400">Tasks Done</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-warning-500">
                <Star className="w-6 h-6 fill-current" />
                {userXpStats.rating}
              </div>
              <p className="text-xs text-dark-400">Rating</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'achievements'
              ? 'bg-turquoise-500 text-dark-900'
              : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-turquoise-500 text-dark-900'
              : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
          }`}
        >
          <Medal className="w-4 h-4" />
          Leaderboard
        </button>
      </div>

      {/* Content */}
      {activeTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Earned Achievements */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-turquoise-500" />
              Earned Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.filter(a => a.earned).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card border-turquoise-500/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-turquoise-500/20 flex items-center justify-center text-2xl">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        {achievement.name}
                        <CheckCircle2 className="w-4 h-4 text-turquoise-500" />
                      </h4>
                      <p className="text-sm text-dark-400">{achievement.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-turquoise-500 font-medium">
                          +{achievement.xpReward} XP
                        </span>
                        {achievement.earnedAt && (
                          <span className="text-xs text-dark-500">
                            Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-warning-500" />
              In Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.filter(a => !a.earned).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card border-dark-500"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-dark-600 flex items-center justify-center text-2xl opacity-60">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        {achievement.name}
                        <Lock className="w-4 h-4 text-dark-500" />
                      </h4>
                      <p className="text-sm text-dark-400">{achievement.description}</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-dark-400 mb-1">
                          <span>{achievement.progress} / {achievement.total}</span>
                          <span>+{achievement.xpReward} XP</span>
                        </div>
                        <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-warning-500 rounded-full transition-all"
                            style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'leaderboard' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card text-center ${
                  entry.rank === 1
                    ? 'order-2 bg-warning-500/10 border-warning-500/30'
                    : entry.rank === 2
                    ? 'order-1 bg-dark-500 border-dark-400'
                    : 'order-3 bg-orange-500/10 border-orange-500/30'
                }`}
              >
                <div className="text-3xl mb-2">{entry.badge}</div>
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className={`w-16 h-16 rounded-full mx-auto border-2 ${
                    entry.rank === 1
                      ? 'border-warning-500'
                      : entry.rank === 2
                      ? 'border-dark-400'
                      : 'border-orange-500'
                  }`}
                />
                <h4 className="font-medium mt-2">{entry.name}</h4>
                <p className="text-xs text-dark-400">Level {entry.level}</p>
                <p className="text-sm font-medium text-turquoise-500 mt-1">
                  {entry.xpPoints} XP
                </p>
              </motion.div>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="card space-y-2">
            {leaderboard.slice(3).map((entry, index) => (
              <div
                key={entry.userId}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  entry.userId === 'me' ? 'bg-turquoise-500/10 border border-turquoise-500/30' : ''
                }`}
              >
                <span className="w-8 text-center font-medium text-dark-400">
                  {entry.rank}
                </span>
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full border border-dark-500"
                />
                <div className="flex-1">
                  <h4 className="font-medium">
                    {entry.name}
                    {entry.userId === 'me' && (
                      <span className="ml-2 text-xs text-turquoise-500">(You)</span>
                    )}
                  </h4>
                  <p className="text-xs text-dark-400">
                    Level {entry.level} • {entry.tasksCompleted} tasks
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-turquoise-500">{entry.xpPoints} XP</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gigzy Pro Upsell */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-provider-600/20 to-provider-400/10 border border-provider-500/30 rounded-card p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-provider-500/20 rounded-full">
              <Crown className="w-8 h-8 text-provider-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gradient-provider">
                Unlock Gigzy Pro
              </h3>
              <p className="text-dark-400 text-sm">
                Get priority listings, reduced fees, and exclusive rewards
              </p>
            </div>
          </div>
          <button className="btn btn-provider">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}