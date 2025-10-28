/**
 * Examples Service
 * Handles fetching example data from Supabase
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

class ExamplesService {
  /**
   * Get all examples for a lesson
   * @param {string} lessonId - UUID of the lesson
   * @returns {Promise<Array>} Array of example objects
   */
  async getExamplesByLessonId(lessonId) {
    try {
      console.log('🔍 ExamplesService.getExamplesByLessonId called with:', lessonId);
      logger.debug('ExamplesService', 'getExamplesByLessonId', { lessonId });

      const { data, error } = await supabase
        .from('lesson_examples')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('position', { ascending: true });

      console.log('🔍 Supabase response - data:', data, 'error:', error);

      if (error) {
        console.error('❌ Error fetching examples:', error);
        console.error('❌ Error details:', JSON.stringify(error, null, 2));
        errorTracker.trackError(
          'ExamplesService',
          'getExamplesByLessonId',
          { lessonId },
          error
        );
        return [];
      }

      console.log('✅ Fetched examples from database:', data);
      console.log('✅ Number of examples fetched:', data?.length || 0);
      logger.info('ExamplesService', 'getExamplesByLessonId', {
        lessonId,
        examplesCount: data?.length || 0
      });

      return data || [];
    } catch (error) {
      console.error('❌ Exception fetching examples:', error);
      console.error('❌ Exception details:', error.message, error.stack);
      errorTracker.trackError(
        'ExamplesService',
        'getExamplesByLessonId',
        { lessonId },
        error
      );
      return [];
    }
  }

  /**
   * Get a single example by ID
   * @param {string} exampleId - UUID of the example
   * @returns {Promise<Object|null>} Example object or null
   */
  async getExampleById(exampleId) {
    try {
      logger.debug('ExamplesService', 'getExampleById', { exampleId });

      const { data, error } = await supabase
        .from('lesson_examples')
        .select('*')
        .eq('id', exampleId)
        .single();

      if (error) {
        errorTracker.trackError(
          'ExamplesService',
          'getExampleById',
          { exampleId },
          error
        );
        return null;
      }

      return data;
    } catch (error) {
      errorTracker.trackError(
        'ExamplesService',
        'getExampleById',
        { exampleId },
        error
      );
      return null;
    }
  }
}

export default new ExamplesService();
