/**
 * Practice Questions Service
 * Handles fetching practice questions from the practice_questions table
 * Separate from lesson_examples (which are for teaching)
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';
import { cache } from '../../utils/cache';

class PracticeService {
  /**
   * Get all practice questions for a lesson
   * @param {string} lessonId - UUID of the lesson
   * @returns {Promise<Array>} Array of practice question objects
   */
  async getPracticeQuestionsByLessonId(lessonId) {
    const CACHE_VERSION = 'v3_full_migration_complete';
    const cacheKey = `practice:lesson:${lessonId}:${CACHE_VERSION}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      logger.debug('PracticeService', 'getPracticeQuestionsByLessonId', { lessonId, source: 'cache' });
      return cached;
    }

    try {
      logger.debug('PracticeService', 'getPracticeQuestionsByLessonId', { lessonId });

      const { data, error } = await supabase
        .from('practice_questions')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('position', { ascending: true });

      if (error) {
        console.error('❌ Error fetching practice questions:', error);
        errorTracker.trackError(
          'PracticeService',
          'getPracticeQuestionsByLessonId',
          { lessonId },
          error
        );
        return [];
      }

      logger.info('PracticeService', 'getPracticeQuestionsByLessonId', {
        lessonId,
        questionsCount: data?.length || 0
      });

      const result = data || [];
      cache.set(cacheKey, result, 15 * 60 * 1000); // Cache for 15 minutes
      return result;
    } catch (error) {
      console.error('❌ Exception fetching practice questions:', error);
      errorTracker.trackError(
        'PracticeService',
        'getPracticeQuestionsByLessonId',
        { lessonId },
        error
      );
      return [];
    }
  }

  /**
   * Get practice questions by subject
   * @param {string} subject - 'english', 'math', 'reading', or 'science'
   * @param {number} limit - Optional limit
   * @returns {Promise<Array>} Array of practice question objects
   */
  async getPracticeQuestionsBySubject(subject, limit = null) {
    try {
      logger.debug('PracticeService', 'getPracticeQuestionsBySubject', { subject, limit });

      let query = supabase
        .from('practice_questions')
        .select('*')
        .eq('subject', subject)
        .order('position', { ascending: true });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        errorTracker.trackError(
          'PracticeService',
          'getPracticeQuestionsBySubject',
          { subject, limit },
          error
        );
        return [];
      }

      return data || [];
    } catch (error) {
      errorTracker.trackError(
        'PracticeService',
        'getPracticeQuestionsBySubject',
        { subject, limit },
        error
      );
      return [];
    }
  }

  /**
   * Get practice questions by difficulty
   * @param {string} difficulty - 'easy', 'medium', or 'hard'
   * @returns {Promise<Array>} Array of practice question objects
   */
  async getPracticeQuestionsByDifficulty(difficulty) {
    try {
      logger.debug('PracticeService', 'getPracticeQuestionsByDifficulty', { difficulty });

      const { data, error } = await supabase
        .from('practice_questions')
        .select('*')
        .eq('difficulty', difficulty)
        .order('position', { ascending: true });

      if (error) {
        errorTracker.trackError(
          'PracticeService',
          'getPracticeQuestionsByDifficulty',
          { difficulty },
          error
        );
        return [];
      }

      return data || [];
    } catch (error) {
      errorTracker.trackError(
        'PracticeService',
        'getPracticeQuestionsByDifficulty',
        { difficulty },
        error
      );
      return [];
    }
  }

  /**
   * Get a single practice question by ID
   * @param {string} questionId - UUID of the practice question
   * @returns {Promise<Object|null>} Practice question object or null
   */
  async getPracticeQuestionById(questionId) {
    try {
      logger.debug('PracticeService', 'getPracticeQuestionById', { questionId });

      const { data, error } = await supabase
        .from('practice_questions')
        .select('*')
        .eq('id', questionId)
        .single();

      if (error) {
        errorTracker.trackError(
          'PracticeService',
          'getPracticeQuestionById',
          { questionId },
          error
        );
        return null;
      }

      return data;
    } catch (error) {
      errorTracker.trackError(
        'PracticeService',
        'getPracticeQuestionById',
        { questionId },
        error
      );
      return null;
    }
  }
}

export default new PracticeService();
