/**
 * Insights Service
 * Fetches and aggregates test results and performance data for insights display
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const InsightsService = {
  /**
   * Get comprehensive insights for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Comprehensive insights data
   */
  async getUserInsights(userId) {
    try {
      logger.info('InsightsService', 'getUserInsights', { userId });

      // Fetch all diagnostic sessions
      const diagnosticData = await this.getDiagnosticInsights(userId);

      // Fetch lesson performance data
      const lessonPerformance = await this.getLessonPerformance(userId);

      // Fetch learning path data
      const learningPath = await this.getLearningPathInsights(userId);

      return {
        diagnostic: diagnosticData,
        lessonPerformance,
        learningPath,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getUserInsights', { userId }, error);
      throw error;
    }
  },

  /**
   * Get diagnostic test insights
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Diagnostic test data
   */
  async getDiagnosticInsights(userId) {
    try {
      // Get all completed diagnostic sessions
      const { data: sessions, error: sessionsError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('completed', true)
        .order('created_at', { ascending: false });

      if (sessionsError) throw sessionsError;

      if (!sessions || sessions.length === 0) {
        return {
          hasCompletedDiagnostic: false,
          sessions: [],
          latestScore: null,
          sectionBreakdown: null
        };
      }

      // Get latest diagnostic session details with question-level results
      const latestSession = sessions[0];
      const { data: results, error: resultsError } = await supabase
        .from('diagnostic_test_results')
        .select(`
          *,
          question:diagnostic_test_questions(
            section,
            lesson_id,
            difficulty
          )
        `)
        .eq('diagnostic_session_id', latestSession.id);

      if (resultsError) throw resultsError;

      // Calculate section breakdown
      const sectionBreakdown = this._calculateSectionBreakdown(results);

      // Calculate difficulty breakdown
      const difficultyBreakdown = this._calculateDifficultyBreakdown(results);

      return {
        hasCompletedDiagnostic: true,
        sessions,
        latestSession,
        latestScore: latestSession.score_percentage,
        totalQuestions: latestSession.total_questions,
        correctAnswers: latestSession.correct_answers,
        sectionBreakdown,
        difficultyBreakdown,
        completedAt: latestSession.session_end
      };
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getDiagnosticInsights', { userId }, error);
      throw error;
    }
  },

  /**
   * Calculate section breakdown from results
   * @private
   */
  _calculateSectionBreakdown(results) {
    const sections = { english: [], math: [], reading: [], science: [] };

    results.forEach(result => {
      const section = result.question?.section;
      if (section && sections[section]) {
        sections[section].push(result);
      }
    });

    return Object.keys(sections).map(sectionName => {
      const sectionResults = sections[sectionName];
      const total = sectionResults.length;
      const correct = sectionResults.filter(r => r.is_correct).length;
      const accuracy = total > 0 ? (correct / total) * 100 : 0;

      return {
        section: sectionName,
        total,
        correct,
        incorrect: total - correct,
        accuracy: parseFloat(accuracy.toFixed(2))
      };
    }).filter(s => s.total > 0);
  },

  /**
   * Calculate difficulty breakdown from results
   * @private
   */
  _calculateDifficultyBreakdown(results) {
    const difficulties = { easy: [], medium: [], hard: [] };

    results.forEach(result => {
      const difficulty = result.question?.difficulty;
      if (difficulty && difficulties[difficulty]) {
        difficulties[difficulty].push(result);
      }
    });

    return Object.keys(difficulties).map(level => {
      const levelResults = difficulties[level];
      const total = levelResults.length;
      const correct = levelResults.filter(r => r.is_correct).length;
      const accuracy = total > 0 ? (correct / total) * 100 : 0;

      return {
        difficulty: level,
        total,
        correct,
        accuracy: parseFloat(accuracy.toFixed(2))
      };
    }).filter(d => d.total > 0);
  },

  /**
   * Get lesson performance insights
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Lesson performance data
   */
  async getLessonPerformance(userId) {
    try {
      const { data, error } = await supabase
        .from('user_lesson_performance')
        .select('*')
        .eq('user_id', userId)
        .order('accuracy_percentage', { ascending: true });

      if (error) throw error;

      return data || [];
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getLessonPerformance', { userId }, error);
      throw error;
    }
  },

  /**
   * Get learning path insights
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Learning path data
   */
  async getLearningPathInsights(userId) {
    try {
      // Get active learning path
      const { data: paths, error: pathsError } = await supabase
        .from('user_learning_paths')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();

      if (pathsError && pathsError.code !== 'PGRST116') throw pathsError;

      if (!paths) {
        return {
          hasLearningPath: false,
          path: null,
          items: []
        };
      }

      // Get learning path items
      const { data: items, error: itemsError } = await supabase
        .from('learning_path_items')
        .select('*')
        .eq('learning_path_id', paths.id)
        .order('sequence_order', { ascending: true });

      if (itemsError) throw itemsError;

      // Calculate progress statistics
      const totalItems = items.length;
      const completedItems = items.filter(item => item.status === 'completed').length;
      const inProgressItems = items.filter(item => item.status === 'in_progress').length;

      return {
        hasLearningPath: true,
        path: paths,
        items: items || [],
        stats: {
          totalLessons: totalItems,
          completed: completedItems,
          inProgress: inProgressItems,
          pending: totalItems - completedItems - inProgressItems,
          completionPercentage: totalItems > 0 ? (completedItems / totalItems) * 100 : 0
        }
      };
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getLearningPathInsights', { userId }, error);
      throw error;
    }
  },

  /**
   * Get weak areas summary
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Weak areas with recommendations
   */
  async getWeakAreas(userId) {
    try {
      const { data, error } = await supabase
        .from('user_lesson_performance')
        .select('*')
        .eq('user_id', userId)
        .eq('is_weak_area', true)
        .order('priority_level', { ascending: false })
        .limit(10);

      if (error) throw error;

      return data || [];
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getWeakAreas', { userId }, error);
      throw error;
    }
  },

  /**
   * Get strengths summary
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Strong areas
   */
  async getStrengths(userId) {
    try {
      const { data, error } = await supabase
        .from('user_lesson_performance')
        .select('*')
        .eq('user_id', userId)
        .gte('accuracy_percentage', 80)
        .gte('mastery_level', 3)
        .order('accuracy_percentage', { ascending: false })
        .limit(10);

      if (error) throw error;

      return data || [];
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getStrengths', { userId }, error);
      throw error;
    }
  }
};

export default InsightsService;
