/**
 * Lessons Service
 * Handles all lesson-related database operations
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const LessonsService = {
  /**
   * Fetch all lessons from modular structure
   * Reconstructs lessons from lesson_metadata, lesson_sections, and section_content
   */
  async getAllLessons() {
    logger.debug('LessonsService', 'getAllLessons', { action: 'start' });

    try {
      // Fetch all lesson metadata
      const { data: metadata, error: metaError } = await supabase
        .from('lesson_metadata')
        .select('*')
        .order('order_index', { ascending: true });

      if (metaError) {
        logger.warn('LessonsService', 'Falling back to old lessons table', { error: metaError.message });
        // Fallback to old table if modular doesn't work
        const { data: oldData, error: oldError } = await supabase
          .from('lessons')
          .select('*')
          .order('order_index', { ascending: true });

        if (oldError) {
          errorTracker.trackError('LessonsService', 'getAllLessons', {}, oldError);
          return null;
        }
        return oldData;
      }

      // For each lesson, fetch sections and content
      const lessons = await Promise.all(
        metadata.map(async (lesson) => {
          // Fetch sections for this lesson
          const { data: sections, error: sectionsError } = await supabase
            .from('lesson_sections')
            .select('id, section_key, title, section_type, order_index')
            .eq('lesson_id', lesson.id)
            .order('order_index', { ascending: true });

          if (sectionsError || !sections) {
            return {
              ...lesson,
              content: ''
            };
          }

          // Fetch content for all sections
          const sectionContents = await Promise.all(
            sections.map(async (section) => {
              const { data: content, error: contentError } = await supabase
                .from('section_content')
                .select('content, order_index')
                .eq('section_id', section.id)
                .order('order_index', { ascending: true });

              if (contentError || !content) {
                return '';
              }

              // Join all content blocks for this section
              return content.map(c => c.content).join('\n');
            })
          );

          // Reconstruct full lesson content
          const fullContent = sectionContents.join('\n\n');

          return {
            id: lesson.id,
            lesson_key: lesson.lesson_key,
            title: lesson.title,
            subject: lesson.subject,
            category: lesson.category,
            difficulty: lesson.difficulty_level,
            duration: lesson.duration_minutes,
            order_index: lesson.order_index,
            content: fullContent,
            created_at: lesson.created_at,
            updated_at: lesson.updated_at
          };
        })
      );

      logger.info('LessonsService', 'getAllLessons from modular', { count: lessons.length });
      return lessons;

    } catch (err) {
      errorTracker.trackError('LessonsService', 'getAllLessons', {}, err);
      return null;
    }
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
   * Fetch a single lesson by lesson_key from modular structure
   */
  async getLessonByKey(lessonKey) {
    logger.debug('LessonsService', 'getLessonByKey', { lessonKey });

    try {
      // Try lessons table first (where quizzes are linked)
      const { data: oldData, error: oldError } = await supabase
        .from('lessons')
        .select('*')
        .eq('lesson_key', lessonKey)
        .single();

      if (!oldError && oldData) {
        logger.info('LessonsService', 'getLessonByKey from lessons table', { lessonKey });
        return oldData;
      }

      // Fallback to lesson_metadata if lessons table doesn't have it
      logger.warn('LessonsService', 'Falling back to lesson_metadata table', { lessonKey });
      const { data: lesson, error: metaError } = await supabase
        .from('lesson_metadata')
        .select('*')
        .eq('lesson_key', lessonKey)
        .single();

      if (metaError) {
        errorTracker.trackError('LessonsService', 'getLessonByKey', { lessonKey }, metaError);
        return null;
      }

      // Fetch sections for this lesson
      const { data: sections, error: sectionsError } = await supabase
        .from('lesson_sections')
        .select('id, section_key, title, section_type, order_index')
        .eq('lesson_id', lesson.id)
        .order('order_index', { ascending: true });

      if (sectionsError || !sections) {
        return {
          ...lesson,
          lesson_key: lesson.lesson_key,
          difficulty: lesson.difficulty_level,
          duration: lesson.duration_minutes,
          content: ''
        };
      }

      // Fetch content for all sections
      const sectionContents = await Promise.all(
        sections.map(async (section) => {
          const { data: content, error: contentError } = await supabase
            .from('section_content')
            .select('content, order_index')
            .eq('section_id', section.id)
            .order('order_index', { ascending: true });

          if (contentError || !content) {
            return '';
          }

          return content.map(c => c.content).join('\n');
        })
      );

      // Reconstruct full content
      const fullContent = sectionContents.join('\n\n');

      const reconstructedLesson = {
        id: lesson.id,
        lesson_key: lesson.lesson_key,
        title: lesson.title,
        subject: lesson.subject,
        category: lesson.category,
        difficulty: lesson.difficulty_level,
        duration: lesson.duration_minutes,
        order_index: lesson.order_index,
        content: fullContent,
        created_at: lesson.created_at,
        updated_at: lesson.updated_at
      };

      logger.info('LessonsService', 'getLessonByKey from modular', { lessonKey, found: true });
      return reconstructedLesson;

    } catch (err) {
      errorTracker.trackError('LessonsService', 'getLessonByKey', { lessonKey }, err);
      return null;
    }
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
