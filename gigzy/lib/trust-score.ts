import { User, Task, Review } from '@prisma/client';

/**
 * Trust Score Algorithm
 * 
 * The trust score is calculated based on multiple factors:
 * 1. Completion Rate (30%): Ratio of completed tasks to total tasks
 * 2. Average Rating (25%): Weighted average of all ratings
 * 3. Response Time (15%): How quickly provider responds to bids
 * 4. Verification Status (15%): Whether ID is verified
 * 5. Account Age (10%): How long the account has been active
 * 6. Dispute History (5%): Number of disputes vs resolved in favor
 */

interface TrustScoreFactors {
  completionRate: number;
  avgRating: number;
  responseTime: number;
  verificationStatus: boolean;
  accountAgeDays: number;
  disputeScore: number;
}

/**
 * Calculate completion rate (0-100)
 */
export function calculateCompletionRate(
  tasksCompleted: number,
  tasksStarted: number
): number {
  if (tasksStarted === 0) return 50; // Default for new users
  return Math.min(100, (tasksCompleted / tasksStarted) * 100);
}

/**
 * Calculate rating score (0-100)
 */
export function calculateRatingScore(avgRating: number): number {
  // Rating is 1-5, normalize to 0-100
  if (avgRating === 0) return 50; // Default for new users
  return Math.max(0, Math.min(100, ((avgRating - 1) / 4) * 100));
}

/**
 * Calculate response time score (0-100)
 */
export function calculateResponseTimeScore(
  avgResponseTimeMinutes: number | null
): number {
  if (avgResponseTimeMinutes === null) return 50; // Default for new users
  
  // Score decreases as response time increases
  // < 15 min = 100, < 30 min = 80, < 1 hour = 60, < 3 hours = 40, > 3 hours = 20
  if (avgResponseTimeMinutes < 15) return 100;
  if (avgResponseTimeMinutes < 30) return 80;
  if (avgResponseTimeMinutes < 60) return 60;
  if (avgResponseTimeMinutes < 180) return 40;
  return 20;
}

/**
 * Calculate verification score (0 or 100)
 */
export function calculateVerificationScore(isVerified: boolean): number {
  return isVerified ? 100 : 30;
}

/**
 * Calculate account age score (0-100)
 */
export function calculateAccountAgeScore(accountAgeDays: number): number {
  // Score increases with account age, caps at 365 days
  // 0 days = 20, 30 days = 50, 90 days = 70, 365+ days = 100
  if (accountAgeDays >= 365) return 100;
  if (accountAgeDays >= 90) return 70;
  if (accountAgeDays >= 30) return 50;
  return 20;
}

/**
 * Calculate dispute score (0-100)
 */
export function calculateDisputeScore(
  totalDisputes: number,
  resolvedInFavor: number
): number {
  if (totalDisputes === 0) return 100;
  
  const resolutionRate = resolvedInFavor / totalDisputes;
  // Penalty for having disputes, bonus for resolving in favor
  return Math.max(0, Math.min(100, resolutionRate * 80 - (totalDisputes * 5)));
}

/**
 * Calculate overall trust score (0-100)
 */
export function calculateTrustScore(factors: TrustScoreFactors): number {
  const weights = {
    completionRate: 0.30,
    avgRating: 0.25,
    responseTime: 0.15,
    verificationStatus: 0.15,
    accountAge: 0.10,
    disputeScore: 0.05,
  };

  const weightedScore =
    factors.completionRate * weights.completionRate +
    factors.avgRating * weights.avgRating +
    factors.responseTime * weights.responseTime +
    factors.verificationStatus * weights.verificationStatus +
    factors.accountAge * weights.accountAge +
    factors.disputeScore * weights.disputeScore;

  return Math.round(weightedScore * 10) / 10;
}

/**
 * Determine trust level based on score
 */
export function getTrustLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'EXCELLENT' {
  if (score >= 80) return 'EXCELLENT';
  if (score >= 60) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
}

/**
 * Calculate trust score for a user
 */
export async function calculateUserTrustScore(
  user: User & {
    seekerProfile?: any;
    providerProfile?: any;
  }
): Promise<number> {
  const now = new Date();
  const accountAgeDays = Math.floor(
    (now.getTime() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const factors: TrustScoreFactors = {
    completionRate: calculateCompletionRate(
      user.providerProfile?.tasksCompleted || 0,
      (user.providerProfile?.tasksCompleted || 0) + 0 // Add cancelled/incomplete tasks
    ),
    avgRating: calculateRatingScore(
      user.providerProfile?.avgRating || user.seekerProfile?.avgRating || 0
    ),
    responseTime: calculateResponseTimeScore(
      user.providerProfile?.responseTime || null
    ),
    verificationStatus: user.verificationStatus === 'VERIFIED',
    accountAge: calculateAccountAgeScore(accountAgeDays),
    disputeScore: 100, // Default, should be calculated from actual disputes
  };

  return calculateTrustScore(factors);
}

/**
 * Get trust badge color
 */
export function getTrustBadgeColor(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXCELLENT'): string {
  switch (level) {
    case 'EXCELLENT':
      return '#00d4a8'; // Turquoise
    case 'HIGH':
      return '#10b981'; // Green
    case 'MEDIUM':
      return '#f59e0b'; // Yellow
    case 'LOW':
      return '#ef4444'; // Red
  }
}

/**
 * Get trust badge label
 */
export function getTrustBadgeLabel(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXCELLENT'): string {
  switch (level) {
    case 'EXCELLENT':
      return 'Trusted Expert';
    case 'HIGH':
      return 'Reliable';
    case 'MEDIUM':
      return 'Building Trust';
    case 'LOW':
      return 'New User';
  }
}