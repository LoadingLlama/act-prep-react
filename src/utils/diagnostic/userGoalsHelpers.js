/**
 * User Goals Helpers for Diagnostic Test
 * Transforms onboarding data to user goals format and retrieves goals from database
 */

import { supabase } from '../../services/api/supabase.service';
import logger from '../../services/logging/logger';

/**
 * Transform onboarding answers to user goals format for learning path
 * @param {object} onboardingData - Onboarding data from profile
 * @returns {object} Transformed goals object
 */
export const transformOnboardingToGoals = (onboardingData) => {
  const defaults = {
    exam_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    daily_study_minutes: 30,
    target_score: 28,
    current_score: null,
    study_days_per_week: 5,
    study_hours_per_week: 6,
    preferred_study_time: '',
    focus_sections: [],
    weak_areas: [],
    learning_pace: 'moderate',
    reminder_frequency: 'daily',
    grade: '',
    study_experience: 'never',
    review_day: 'sunday',
    mock_exam_day: 'saturday'
  };

  if (!onboardingData) return defaults;

  console.log('🔄 Transforming onboarding data:', onboardingData);

  // Handle exam date - support both new (target_exam_date) and old (testDate) formats
  let exam_date = defaults.exam_date;
  if (onboardingData.target_exam_date) {
    // New format: direct date string
    exam_date = new Date(onboardingData.target_exam_date).toISOString();
  } else if (onboardingData.testDate && onboardingData.testDate !== 'not-scheduled') {
    // Old format: testDate field
    exam_date = new Date(onboardingData.testDate).toISOString();
  }

  // Handle current score - support both new and old formats
  let current_score = null;
  if (onboardingData.current_score) {
    // New format: direct number
    current_score = parseInt(onboardingData.current_score) || null;
  } else if (onboardingData.currentScore && onboardingData.currentScore !== 'not-taken') {
    // Old format: score ranges
    const scoreRanges = {
      '1-15': 13,
      '16-20': 18,
      '21-25': 23,
      '26-30': 28,
      '31-36': 33
    };
    current_score = scoreRanges[onboardingData.currentScore] || null;
  }

  // Handle target score - support both formats
  let target_score = defaults.target_score;
  if (onboardingData.target_score) {
    // New format: direct number
    target_score = parseInt(onboardingData.target_score) || 28;
  } else if (onboardingData.targetScore) {
    // Old format: score ranges
    const scoreRanges = {
      '20-24': 22,
      '25-29': 27,
      '30-33': 31,
      '34-36': 35
    };
    target_score = scoreRanges[onboardingData.targetScore] || 28;
  }

  // Handle study hours - NEW format with per-day breakdown
  let study_hours_per_week = defaults.study_hours_per_week;
  let study_days_per_week = defaults.study_days_per_week;
  let daily_study_minutes = defaults.daily_study_minutes;

  if (onboardingData.study_hours) {
    // New format: study_hours object with days
    const hoursPerDay = onboardingData.study_hours;
    study_hours_per_week = Object.values(hoursPerDay).reduce((sum, hours) => sum + (parseFloat(hours) || 0), 0);
    study_days_per_week = Object.values(hoursPerDay).filter(hours => (parseFloat(hours) || 0) > 0).length;
    daily_study_minutes = study_days_per_week > 0 ? Math.round((study_hours_per_week * 60) / study_days_per_week) : 30;
  } else if (onboardingData.studyTimePerWeek) {
    // Old format: studyTimePerWeek ranges
    const hoursPerWeek = {
      '2-4': 3,
      '5-7': 6,
      '8-10': 9,
      '10+': 12
    }[onboardingData.studyTimePerWeek] || 6;
    study_hours_per_week = hoursPerWeek;
    study_days_per_week = onboardingData.studyDaysPerWeek ? parseInt(onboardingData.studyDaysPerWeek) : 5;
    daily_study_minutes = Math.round((study_hours_per_week * 60) / study_days_per_week);
  }

  // Review day and mock exam day - NEW fields
  const review_day = onboardingData.review_day || defaults.review_day;
  const mock_exam_day = onboardingData.mock_exam_day || defaults.mock_exam_day;

  const transformed = {
    exam_date,
    current_score,
    daily_study_minutes,
    target_score,
    study_days_per_week,
    study_hours_per_week,
    preferred_study_time: onboardingData.preferredStudyTime || '',
    focus_sections: onboardingData.concernedSections || [],
    weak_areas: onboardingData.concernedSections || [],
    learning_pace: onboardingData.learningPace || 'moderate',
    reminder_frequency: onboardingData.reminderFrequency || 'daily',
    grade: onboardingData.grade || '',
    study_experience: onboardingData.studyExperience || 'never',
    review_day,
    mock_exam_day,
    // Pass through new fields
    study_hours: onboardingData.study_hours,
    study_hours_week2: onboardingData.study_hours_week2,
    use_alternating_weeks: onboardingData.use_alternating_weeks || false
  };

  console.log('✅ Transformed goals:', transformed);
  return transformed;
};

/**
 * Get user goals from profile onboarding data or user_goals table
 * @param {string} userId - User ID
 * @returns {Promise<object>} User goals object
 */
export const getUserGoals = async (userId) => {
  try {
    // Try to get from user_goals table first
    const { data: existingGoals } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingGoals) {
      return {
        exam_date: existingGoals.target_exam_date || null, // Ensure null instead of undefined
        current_score: existingGoals.current_score,
        daily_study_minutes: existingGoals.daily_study_minutes,
        target_score: existingGoals.target_score,
        study_days_per_week: existingGoals.study_days_per_week || 5,
        study_hours_per_week: existingGoals.study_hours_per_week || 6,
        preferred_study_time: existingGoals.preferred_study_time || '',
        focus_sections: existingGoals.focus_sections || [],
        weak_areas: existingGoals.weak_areas || [],
        learning_pace: existingGoals.learning_pace || 'moderate',
        reminder_frequency: existingGoals.reminder_frequency || 'daily',
        grade: existingGoals.grade || '',
        study_experience: existingGoals.study_experience || 'never',
        review_day: existingGoals.review_day,
        mock_exam_day: existingGoals.mock_exam_day
      };
    }

    // If not in user_goals, get from profile onboarding_data
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_data')
      .eq('id', userId)
      .single();

    const goals = transformOnboardingToGoals(profile?.onboarding_data);

    // Save to user_goals table for future use
    await supabase.from('user_goals').upsert({
      user_id: userId,
      target_exam_date: goals.exam_date,
      current_score: goals.current_score,
      daily_study_minutes: goals.daily_study_minutes,
      target_score: goals.target_score,
      study_days_per_week: goals.study_days_per_week,
      study_hours_per_week: goals.study_hours_per_week,
      preferred_study_time: goals.preferred_study_time,
      focus_sections: goals.focus_sections,
      weak_areas: goals.weak_areas,
      learning_pace: goals.learning_pace,
      reminder_frequency: goals.reminder_frequency,
      grade: goals.grade,
      study_experience: goals.study_experience
    });

    logger.info('DiagnosticTest', 'getUserGoals', { userId, goals });
    return goals;
  } catch (error) {
    logger.warn('DiagnosticTest', 'getUserGoalsFailed', { userId, error });
    // Return defaults if anything fails
    return {
      exam_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      daily_study_minutes: 30,
      target_score: 28,
      study_days_per_week: 5
    };
  }
};
