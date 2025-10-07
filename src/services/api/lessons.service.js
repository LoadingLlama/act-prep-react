/**
 * Lessons Service
 * Handles all lesson-related database operations
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const LessonsService = {
  /**
   * Fetch all lessons
   */
  async getAllLessons() {
    logger.debug('LessonsService', 'getAllLessons', { action: 'start' });

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      errorTracker.trackError('LessonsService', 'getAllLessons', {}, error);
      return null;
    }

    logger.info('LessonsService', 'getAllLessons', { count: data?.length });
    return data;
  },

  /**
   * Fetch lessons by subject
   */
  async getLessonsBySubject(subject) {
    logger.debug('LessonsService', 'getLessonsBySubject', { subject });

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('subject', subject)
      .order('order_index', { ascending: true });

    if (error) {
      errorTracker.trackError('LessonsService', 'getLessonsBySubject', { subject }, error);
      return null;
    }

    logger.info('LessonsService', 'getLessonsBySubject', {
      subject,
      count: data?.length,
    });
    return data;
  },

  /**
   * Fetch a single lesson by ID
   */
  async getLessonById(lessonId) {
    logger.debug('LessonsService', 'getLessonById', { lessonId });

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single();

    if (error) {
      errorTracker.trackError('LessonsService', 'getLessonById', { lessonId }, error);
      return null;
    }

    logger.info('LessonsService', 'getLessonById', {
      lessonId,
      found: !!data,
    });
    return data;
  },

  /**
   * Fetch a single lesson by lesson_key
   */
  async getLessonByKey(lessonKey) {
    logger.debug('LessonsService', 'getLessonByKey', { lessonKey });

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('lesson_key', lessonKey)
      .single();

    if (error) {
      errorTracker.trackError('LessonsService', 'getLessonByKey', { lessonKey }, error);
      return null;
    }

    logger.info('LessonsService', 'getLessonByKey', {
      lessonKey,
      found: !!data,
    });
    return data;
  },

  /**
   * Fetch all lessons and convert to object format (backward compatibility)
   */
  async fetchLessonsAsObject() {
    logger.debug('LessonsService', 'fetchLessonsAsObject', { action: 'start' });

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      errorTracker.trackError('LessonsService', 'fetchLessonsAsObject', {}, error);
      return null;
    }

    // Convert array to object format
    const lessonsObject = {};
    data.forEach((lesson) => {
      lessonsObject[lesson.lesson_key] = {
        title: lesson.title,
        duration: lesson.duration,
        content: lesson.content,
        category: lesson.category,
      };
    });

    logger.info('LessonsService', 'fetchLessonsAsObject', {
      count: data.length,
    });
    return lessonsObject;
  },

  /**
   * Save user progress
   */
  async saveUserProgress(userId, lessonId, completed, scorePercentage, timeSpent) {
    logger.debug('LessonsService', 'saveUserProgress', {
      userId,
      lessonId,
      completed,
      scorePercentage,
      timeSpent,
    });

    const { data, error } = await supabase
      .from('user_lesson_progress')
      .upsert(
        [
          {
            user_id: userId,
            lesson_id: lessonId,
            completed: completed,
            score_percentage: scorePercentage,
            time_spent_minutes: timeSpent,
            last_accessed: new Date().toISOString(),
          },
        ],
        { onConflict: 'user_id,lesson_id' }
      );

    if (error) {
      errorTracker.trackError(
        'LessonsService',
        'saveUserProgress',
        { userId, lessonId },
        error
      );
      return null;
    }

    logger.info('LessonsService', 'saveUserProgress', {
      userId,
      lessonId,
      completed,
      scorePercentage,
    });
    return data;
  },

  /**
   * Get user progress for a specific lesson
   */
  async getUserLessonProgress(userId, lessonId) {
    logger.debug('LessonsService', 'getUserLessonProgress', { userId, lessonId });

    const { data, error } = await supabase
      .from('user_lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();

    if (error) {
      errorTracker.trackError(
        'LessonsService',
        'getUserLessonProgress',
        { userId, lessonId },
        error
      );
      return null;
    }

    logger.info('LessonsService', 'getUserLessonProgress', {
      userId,
      lessonId,
      found: !!data,
    });
    return data;
  },

  /**
   * Get all user progress
   */
  async getAllUserProgress(userId) {
    logger.debug('LessonsService', 'getAllUserProgress', { userId });

    const { data, error } = await supabase
      .from('user_lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false });

    if (error) {
      errorTracker.trackError('LessonsService', 'getAllUserProgress', { userId }, error);
      return null;
    }

    logger.info('LessonsService', 'getAllUserProgress', {
      userId,
      count: data?.length,
    });
    return data;
  },

  /**
   * Get user progress with lesson details
   */
  async getUserProgressWithLessons(userId) {
    logger.debug('LessonsService', 'getUserProgressWithLessons', { userId });

    const { data, error } = await supabase
      .from('user_lesson_progress')
      .select('*, lessons(*)')
      .eq('user_id', userId);

    if (error) {
      errorTracker.trackError(
        'LessonsService',
        'getUserProgressWithLessons',
        { userId },
        error
      );
      return null;
    }

    logger.info('LessonsService', 'getUserProgressWithLessons', {
      userId,
      count: data?.length,
    });
    return data;
  },
};

export default LessonsService;
