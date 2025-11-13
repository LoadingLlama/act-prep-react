/**
 * Subscription Service
 * Manages user subscription status and feature access
 */

import { supabase } from './api/supabase.service';

/**
 * Free trial limits
 */
export const FREE_TRIAL_LIMITS = {
  LESSONS_PER_SECTION: 5,
  PRACTICE_TESTS: 1,
  PRACTICE_QUESTIONS_PER_LESSON: 10,
  HAS_INSIGHTS: false,
  HAS_LEARNING_PATH: false,
  HAS_ADVANCED_ANALYTICS: false
};

/**
 * List of Pro user emails
 * TODO: Replace with database table when payment integration is ready
 */
const PRO_USERS = [
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

    // Check if user email is in Pro users list
    return PRO_USERS.includes(userData.user.email);
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
      isPro: true
    };
  }

  // Free trial limits
  return {
    lessonsPerSection: FREE_TRIAL_LIMITS.LESSONS_PER_SECTION,
    practiceTests: FREE_TRIAL_LIMITS.PRACTICE_TESTS,
    practiceQuestionsPerLesson: FREE_TRIAL_LIMITS.PRACTICE_QUESTIONS_PER_LESSON,
    hasInsights: FREE_TRIAL_LIMITS.HAS_INSIGHTS,
    hasLearningPath: FREE_TRIAL_LIMITS.HAS_LEARNING_PATH,
    hasAdvancedAnalytics: FREE_TRIAL_LIMITS.HAS_ADVANCED_ANALYTICS,
    isPro: false
  };
}

export default {
  hasProSubscription,
  isFreeTrial,
  getFeatureAccess,
  FREE_TRIAL_LIMITS
};
