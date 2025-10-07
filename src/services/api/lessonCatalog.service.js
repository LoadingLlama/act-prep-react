/**
 * Lesson Catalog Service
 *
 * Purpose: Fetch lesson catalog from database (replaces hardcoded lessonStructure array)
 * This handles the LARGE dataset (~50+ lessons) that shouldn't be hardcoded
 *
 * Note: Small arrays (social proof, features, etc.) remain hardcoded in components
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const LessonCatalogService = {
  /**
   * Get all lessons from catalog
   * @param {string|null} section - Optional section filter ('english', 'math', 'reading', 'science', 'all')
   * @returns {Promise<Array>} Array of lesson catalog items
   */
  async getLessonCatalog(section = null) {
    logger.debug('LessonCatalogService', 'getLessonCatalog', { section });

    let query = supabase
      .from('lesson_catalog')
      .select('*')
      .eq('is_active', true);

    if (section && section !== 'all') {
      query = query.eq('section', section);
    }

    query = query.order('display_order', { ascending: true });

    const { data, error } = await query;

    if (error) {
      errorTracker.trackError('LessonCatalogService', 'getLessonCatalog', { section }, error);
      logger.error('LessonCatalogService', 'getLessonCatalog', { section }, error);
      return [];
    }

    logger.info('LessonCatalogService', 'getLessonCatalog', {
      section,
      count: data?.length || 0,
    });

    return data || [];
  },

  /**
   * Get a single lesson by key
   * @param {string} lessonKey - The lesson key (e.g., 'sentence-structure')
   * @returns {Promise<Object|null>} Lesson object or null
   */
  async getLessonByKey(lessonKey) {
    logger.debug('LessonCatalogService', 'getLessonByKey', { lessonKey });

    const { data, error } = await supabase
      .from('lesson_catalog')
      .select('*')
      .eq('lesson_key', lessonKey)
      .eq('is_active', true)
      .single();

    if (error) {
      errorTracker.trackError('LessonCatalogService', 'getLessonByKey', { lessonKey }, error);
      logger.warn('LessonCatalogService', 'getLessonByKey', {
        lessonKey,
        error: error.message,
      });
      return null;
    }

    logger.info('LessonCatalogService', 'getLessonByKey', { lessonKey, found: !!data });
    return data;
  },

  /**
   * Get lessons by difficulty level
   * @param {string} difficulty - 'beginner', 'intermediate', or 'advanced'
   * @returns {Promise<Array>} Array of lessons
   */
  async getLessonsByDifficulty(difficulty) {
    logger.debug('LessonCatalogService', 'getLessonsByDifficulty', { difficulty });

    const { data, error } = await supabase
      .from('lesson_catalog')
      .select('*')
      .eq('difficulty_level', difficulty)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      errorTracker.trackError('LessonCatalogService', 'getLessonsByDifficulty', { difficulty }, error);
      logger.error('LessonCatalogService', 'getLessonsByDifficulty', { difficulty }, error);
      return [];
    }

    logger.info('LessonCatalogService', 'getLessonsByDifficulty', {
      difficulty,
      count: data?.length || 0,
    });

    return data || [];
  },

  /**
   * Get lesson count by section
   * @returns {Promise<Object>} Object with section counts
   */
  async getLessonCounts() {
    logger.debug('LessonCatalogService', 'getLessonCounts', {});

    const { data, error } = await supabase
      .from('lesson_catalog')
      .select('section')
      .eq('is_active', true);

    if (error) {
      errorTracker.trackError('LessonCatalogService', 'getLessonCounts', {}, error);
      logger.error('LessonCatalogService', 'getLessonCounts', {}, error);
      return {};
    }

    // Count lessons by section
    const counts = data.reduce((acc, lesson) => {
      acc[lesson.section] = (acc[lesson.section] || 0) + 1;
      return acc;
    }, {});

    logger.info('LessonCatalogService', 'getLessonCounts', { counts });
    return counts;
  },
};

export default LessonCatalogService;
