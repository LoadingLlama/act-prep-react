/**
 * Learning Path Service
 * Generates and manages personalized learning paths based on diagnostic analysis and user goals
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const LearningPathService = {
  /**
   * Generate a personalized learning path for a user
   * @param {string} userId - User ID
   * @param {Object} goals - User goals (exam date, daily minutes, target score, etc.)
   * @param {Object} diagnosticAnalysis - Results from diagnostic test
   * @returns {Promise<Object>} Generated learning path
   */
  async generateLearningPath(userId, goals, diagnosticAnalysis) {
    const startTime = Date.now();
    logger.debug('LearningPathService', 'generateLearningPath', { userId });

    try {
      // 1. Deactivate any existing active paths
      await supabase
        .from('user_learning_paths')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('is_active', true);

      // 2. Create new learning path
      const pathData = {
        user_id: userId,
        path_name: `ACT Prep - ${goals.exam_date ? new Date(goals.exam_date).toLocaleDateString() : 'Custom'}`,
        exam_date: goals.exam_date,
        daily_study_minutes: goals.daily_study_minutes || 30,
        target_score: goals.target_score,
        current_estimated_score: diagnosticAnalysis?.overall_score || 0,
        is_active: true,
        completion_percentage: 0
      };

      const { data: learningPath, error: pathError } = await supabase
        .from('user_learning_paths')
        .insert([pathData])
        .select()
        .single();

      if (pathError) throw pathError;

      // 3. Get priority lessons from diagnostic analysis
      const priorityLessons = diagnosticAnalysis?.priority_lessons || [];
      const weakLessons = diagnosticAnalysis?.weak_lessons || [];

      // 4. Fetch lesson details for weak areas
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .in('id', weakLessons);

      if (lessonsError) throw lessonsError;

      // 5. Calculate timeline
      const daysUntilExam = goals.exam_date
        ? Math.floor((new Date(goals.exam_date) - new Date()) / (1000 * 60 * 60 * 24))
        : 90; // Default 90 days

      const dailyMinutes = goals.daily_study_minutes || 30;
      const studyDaysPerWeek = goals.study_days_per_week || 5;

      // 6. Sort lessons by priority
      const sortedLessons = lessons.sort((a, b) => {
        const aPriority = priorityLessons.find(p => p.lesson_id === a.id)?.priority || 0;
        const bPriority = priorityLessons.find(p => p.lesson_id === b.id)?.priority || 0;
        return bPriority - aPriority;
      });

      // 7. Create learning path items with scheduling
      const pathItems = [];
      let currentDay = 0;
      let currentWeek = 1;

      for (let i = 0; i < sortedLessons.length; i++) {
        const lesson = sortedLessons[i];
        const priority = priorityLessons.find(p => p.lesson_id === lesson.id);

        // Estimate time needed based on priority and lesson complexity
        const estimatedMinutes = this._estimateLessonTime(lesson, priority);

        // Schedule the lesson
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + currentDay);

        pathItems.push({
          learning_path_id: learningPath.id,
          lesson_id: lesson.id,
          sequence_order: i + 1,
          week_number: currentWeek,
          day_number: currentDay + 1,
          is_priority: priority && priority.priority >= 3,
          estimated_minutes: estimatedMinutes,
          scheduled_date: scheduledDate.toISOString().split('T')[0],
          status: 'pending'
        });

        // Update scheduling counters
        currentDay++;
        if (currentDay % studyDaysPerWeek === 0) {
          currentDay += (7 - studyDaysPerWeek); // Skip non-study days
          currentWeek++;
        }
      }

      // 8. Insert path items
      const { error: itemsError } = await supabase
        .from('learning_path_items')
        .insert(pathItems);

      if (itemsError) throw itemsError;

      // 9. Log algorithm run
      const executionTime = Date.now() - startTime;
      await supabase.from('algorithm_runs').insert([{
        user_id: userId,
        algorithm_type: 'path_generation',
        input_data: { weakLessonsCount: weakLessons.length, daysUntilExam },
        output_data: { pathId: learningPath.id, itemsCount: pathItems.length },
        execution_time_ms: executionTime,
        success: true
      }]);

      logger.info('LearningPathService', 'generateLearningPath', {
        userId,
        pathId: learningPath.id,
        itemsCount: pathItems.length,
        executionTime
      });

      return {
        ...learningPath,
        items: pathItems
      };
    } catch (error) {
      errorTracker.trackError('LearningPathService', 'generateLearningPath', { userId }, error);

      // Log failed algorithm run
      await supabase.from('algorithm_runs').insert([{
        user_id: userId,
        algorithm_type: 'path_generation',
        execution_time_ms: Date.now() - startTime,
        success: false,
        error_message: error.message
      }]);

      throw error;
    }
  },

  /**
   * Estimate time needed for a lesson based on priority and complexity
   * @private
   */
  _estimateLessonTime(lesson, priority) {
    const baseTimes = {
      beginner: 20,
      intermediate: 30,
      advanced: 40
    };

    const baseTime = baseTimes[lesson.difficulty] || 30;

    // Add extra time for high-priority weak areas
    const priorityMultiplier = priority ? (1 + (priority.priority / 10)) : 1;

    return Math.round(baseTime * priorityMultiplier);
  },

  /**
   * Get active learning path for a user
   */
  async getActiveLearningPath(userId) {
    logger.debug('LearningPathService', 'getActiveLearningPath', { userId });

    const { data, error } = await supabase
      .from('user_learning_paths')
      .select(`
        *,
        items:learning_path_items(
          *,
          lesson:lessons(*)
        )
      `)
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      errorTracker.trackError('LearningPathService', 'getActiveLearningPath', { userId }, error);
      return null;
    }

    return data;
  },

  /**
   * Update learning path item status
   * Enforces 5-star mastery requirement before marking as complete
   */
  async updatePathItemStatus(itemId, status, completionData = {}) {
    logger.debug('LearningPathService', 'updatePathItemStatus', { itemId, status });

    // Get the path item with user and lesson info
    const { data: pathItem, error: fetchError } = await supabase
      .from('learning_path_items')
      .select('*, learning_path:user_learning_paths(user_id)')
      .eq('id', itemId)
      .single();

    if (fetchError) {
      errorTracker.trackError('LearningPathService', 'updatePathItemStatus', { itemId }, fetchError);
      throw fetchError;
    }

    const userId = pathItem.learning_path.user_id;
    const lessonId = pathItem.lesson_id;

    // If trying to mark as completed, check mastery level
    if (status === 'completed') {
      const { data: performance } = await supabase
        .from('user_lesson_performance')
        .select('mastery_level, accuracy_percentage')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      const masteryLevel = performance?.mastery_level || 0;
      const accuracy = performance?.accuracy_percentage || 0;

      // CRITICAL: Only allow completion if mastery_level >= 5 OR accuracy >= 90%
      if (masteryLevel < 5 && accuracy < 90) {
        logger.warn('LearningPathService', 'masteryNotAchieved', {
          itemId,
          lessonId,
          masteryLevel,
          accuracy,
          message: 'Cannot complete lesson - must achieve 5-star mastery (90%+ accuracy)'
        });

        // Mark as in_progress instead, requiring more practice
        status = 'in_progress';
        completionData.mastery_achieved = masteryLevel;
        completionData.requires_more_practice = true;
      } else {
        // Mastery achieved! Mark as truly complete
        completionData.completed_at = new Date().toISOString();
        completionData.mastery_achieved = 5;
      }
    }

    const updateData = {
      status,
      ...completionData
    };

    const { data, error } = await supabase
      .from('learning_path_items')
      .update(updateData)
      .eq('id', itemId)
      .select()
      .single();

    if (error) {
      errorTracker.trackError('LearningPathService', 'updatePathItemStatus', { itemId }, error);
      throw error;
    }

    // Recalculate path completion percentage
    await this._recalculatePathCompletion(data.learning_path_id);

    logger.info('LearningPathService', 'pathItemUpdated', {
      itemId,
      status: data.status,
      masteryAchieved: data.mastery_achieved
    });

    return data;
  },

  /**
   * Recalculate learning path completion percentage
   * @private
   */
  async _recalculatePathCompletion(pathId) {
    const { data: items } = await supabase
      .from('learning_path_items')
      .select('status')
      .eq('learning_path_id', pathId);

    if (!items || items.length === 0) return;

    const completedCount = items.filter(i => i.status === 'completed').length;
    const completionPercentage = (completedCount / items.length) * 100;

    await supabase
      .from('user_learning_paths')
      .update({ completion_percentage: parseFloat(completionPercentage.toFixed(2)) })
      .eq('id', pathId);
  }
};

export default LearningPathService;
