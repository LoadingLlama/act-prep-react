/**
 * Subscription Service
 * Manages user subscription status and feature access
 */

import { supabase } from './api/supabase.service';

/**
 * Free trial configuration
 */
export const FREE_TRIAL_LIMITS = {
  TRIAL_DAYS: 3,
  LESSONS_PER_SECTION: 5,
  PRACTICE_TESTS: 1,
  PRACTICE_QUESTIONS_PER_LESSON: 10,
  HAS_INSIGHTS: false,
  HAS_LEARNING_PATH: false,
  HAS_ADVANCED_ANALYTICS: false
};

/**
 * Fallback Pro user emails (for admin access)
 * These emails will always have Pro access regardless of subscription status
 */
const ADMIN_PRO_USERS = [
  'cadenchiangjunk@gmail.com'
];

/**
 * Check if user has an active Pro subscription
 *
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} True if user has Pro subscription
 */
export async function hasProSubscription(userId) {
  try {
    // Get user email from Supabase
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.email) {
      return false;
    }

    // Check if user is an admin (fallback/override)
    if (ADMIN_PRO_USERS.includes(userData.user.email)) {
      return true;
    }

    // Check subscription status in database
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('subscription_status, current_period_end')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error checking subscription:', error);
      return false;
    }

    // User has no subscription record
    if (!subscription) {
      return false;
    }

    // Check if subscription is active and not expired
    const isActive = subscription.subscription_status === 'active';
    const notExpired = subscription.current_period_end
      ? new Date(subscription.current_period_end) > new Date()
      : false;

    return isActive && notExpired;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

/**
 * Check if user is on free trial
 *
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} True if user is on free trial
 */
export async function isFreeTrial(userId) {
  const isPro = await hasProSubscription(userId);
  return !isPro;
}

/**
 * Get trial info for user
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Trial info object
 */
export async function getTrialInfo(userId) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.created_at) {
      return { daysRemaining: 3, isExpired: false };
    }

    const createdAt = new Date(userData.user.created_at);
    const now = new Date();
    const daysSinceCreation = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, FREE_TRIAL_LIMITS.TRIAL_DAYS - daysSinceCreation);

    return {
      daysRemaining,
      isExpired: daysRemaining === 0
    };
  } catch (error) {
    console.error('Error getting trial info:', error);
    return { daysRemaining: 3, isExpired: false };
  }
}

/**
 * Get feature access for user
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Feature access object
 */
export async function getFeatureAccess(userId) {
  const isPro = await hasProSubscription(userId);

  if (isPro) {
    return {
      lessonsPerSection: Infinity,
      practiceTests: Infinity,
      practiceQuestionsPerLesson: Infinity,
      hasInsights: true,
      hasLearningPath: true,
      hasAdvancedAnalytics: true,
      isPro: true,
      trialDaysRemaining: null,
      isTrialExpired: false
    };
  }

  // Free users (trial or expired) get the same restricted access
  const trialInfo = await getTrialInfo(userId);

  return {
    lessonsPerSection: FREE_TRIAL_LIMITS.LESSONS_PER_SECTION,
    practiceTests: FREE_TRIAL_LIMITS.PRACTICE_TESTS,
    practiceQuestionsPerLesson: FREE_TRIAL_LIMITS.PRACTICE_QUESTIONS_PER_LESSON,
    hasInsights: FREE_TRIAL_LIMITS.HAS_INSIGHTS,
    hasLearningPath: FREE_TRIAL_LIMITS.HAS_LEARNING_PATH,
    hasAdvancedAnalytics: FREE_TRIAL_LIMITS.HAS_ADVANCED_ANALYTICS,
    isPro: false,
    trialDaysRemaining: trialInfo.daysRemaining,
    isTrialExpired: trialInfo.isExpired
  };
}

export default {
  hasProSubscription,
  isFreeTrial,
  getFeatureAccess,
  getTrialInfo,
  FREE_TRIAL_LIMITS
};
