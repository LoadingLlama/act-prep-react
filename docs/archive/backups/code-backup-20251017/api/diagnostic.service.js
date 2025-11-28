/**
 * Diagnostic Service
 * Handles all diagnostic test-related database operations
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const DiagnosticService = {
  /**
   * Fetch all diagnostic test questions (optionally filtered by section)
   */
  async getDiagnosticQuestions(section = null) {
    logger.debug('DiagnosticService', 'getDiagnosticQuestions', { section });

    let query = supabase
      .from('diagnostic_test_questions')
      .select('*')
      .order('lesson_id', { ascending: true })
      .order('question_id', { ascending: true });

    if (section) {
      query = query.eq('section', section);
    }

    const { data, error } = await query;

    if (error) {
      errorTracker.trackError('DiagnosticService', 'getDiagnosticQuestions', { section }, error);
      return null;
    }

    logger.info('DiagnosticService', 'getDiagnosticQuestions', {
      section,
      count: data?.length,
    });
    return data;
  },

  /**
   * Fetch questions for a specific lesson
   */
  async getDiagnosticQuestionsByLesson(lessonId) {
    logger.debug('DiagnosticService', 'getDiagnosticQuestionsByLesson', { lessonId });

    const { data, error } = await supabase
      .from('diagnostic_test_questions')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('question_id', { ascending: true });

    if (error) {
      errorTracker.trackError(
        'DiagnosticService',
        'getDiagnosticQuestionsByLesson',
        { lessonId },
        error
      );
      return null;
    }

    logger.info('DiagnosticService', 'getDiagnosticQuestionsByLesson', {
      lessonId,
      count: data?.length,
    });
    return data;
  },

  /**
   * Save user's answer to a diagnostic question
   */
  async saveDiagnosticAnswer(userId, questionId, userAnswer, isCorrect, timeSpent) {
    logger.debug('DiagnosticService', 'saveDiagnosticAnswer', {
      userId,
      questionId,
      isCorrect,
      timeSpent,
    });

    const { data, error } = await supabase.from('diagnostic_test_results').insert([
      {
        user_id: userId,
        question_id: questionId,
        user_answer: userAnswer,
        is_correct: isCorrect,
        time_spent_seconds: timeSpent,
      },
    ]);

    if (error) {
      errorTracker.trackError(
        'DiagnosticService',
        'saveDiagnosticAnswer',
        { userId, questionId },
        error
      );
      return null;
    }

    logger.info('DiagnosticService', 'saveDiagnosticAnswer', {
      userId,
      questionId,
      isCorrect,
    });
    return data;
  },

  /**
   * Create a new diagnostic test session
   */
  async createDiagnosticSession(userId, section, totalQuestions) {
    logger.debug('DiagnosticService', 'createDiagnosticSession', {
      userId,
      section,
      totalQuestions,
    });

    const { data, error } = await supabase
      .from('diagnostic_test_sessions')
      .insert([
        {
          user_id: userId,
          section: section,
          total_questions: totalQuestions,
        },
      ])
      .select();

    if (error) {
      errorTracker.trackError(
        'DiagnosticService',
        'createDiagnosticSession',
        { userId, section },
        error
      );
      return null;
    }

    logger.info('DiagnosticService', 'createDiagnosticSession', {
      userId,
      section,
      sessionId: data[0]?.id,
    });
    return data[0];
  },

  /**
   * Complete a diagnostic test session
   */
  async completeDiagnosticSession(sessionId, correctAnswers, scorePercentage) {
    logger.debug('DiagnosticService', 'completeDiagnosticSession', {
      sessionId,
      correctAnswers,
      scorePercentage,
    });

    const { data, error } = await supabase
      .from('diagnostic_test_sessions')
      .update({
        session_end: new Date().toISOString(),
        correct_answers: correctAnswers,
        score_percentage: scorePercentage,
        completed: true,
      })
      .eq('id', sessionId);

    if (error) {
      errorTracker.trackError(
        'DiagnosticService',
        'completeDiagnosticSession',
        { sessionId },
        error
      );
      return null;
    }

    logger.info('DiagnosticService', 'completeDiagnosticSession', {
      sessionId,
      scorePercentage,
    });
    return data;
  },

  /**
   * Get user's diagnostic test history
   */
  async getUserDiagnosticHistory(userId) {
    logger.debug('DiagnosticService', 'getUserDiagnosticHistory', { userId });

    const { data, error } = await supabase
      .from('diagnostic_test_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('session_start', { ascending: false });

    if (error) {
      errorTracker.trackError('DiagnosticService', 'getUserDiagnosticHistory', { userId }, error);
      return null;
    }

    logger.info('DiagnosticService', 'getUserDiagnosticHistory', {
      userId,
      count: data?.length,
    });
    return data;
  },

  /**
   * Get user's performance by section
   */
  async getUserPerformanceBySection(userId) {
    logger.debug('DiagnosticService', 'getUserPerformanceBySection', { userId });

    const { data, error } = await supabase
      .from('diagnostic_test_sessions')
      .select('section, score_percentage, correct_answers, total_questions')
      .eq('user_id', userId)
      .eq('completed', true)
      .order('session_start', { ascending: false });

    if (error) {
      errorTracker.trackError(
        'DiagnosticService',
        'getUserPerformanceBySection',
        { userId },
        error
      );
      return null;
    }

    // Group by section and get the latest score for each
    const sectionPerformance = {};
    data.forEach((session) => {
      if (!sectionPerformance[session.section]) {
        sectionPerformance[session.section] = session;
      }
    });

    logger.info('DiagnosticService', 'getUserPerformanceBySection', {
      userId,
      sections: Object.keys(sectionPerformance).length,
    });
    return sectionPerformance;
  },

  /**
   * Bulk insert diagnostic questions (for migration from existing data)
   */
  async bulkInsertDiagnosticQuestions(questions) {
    logger.debug('DiagnosticService', 'bulkInsertDiagnosticQuestions', {
      count: questions?.length,
    });

    const { data, error } = await supabase.from('diagnostic_test_questions').insert(questions);

    if (error) {
      errorTracker.trackError(
        'DiagnosticService',
        'bulkInsertDiagnosticQuestions',
        { count: questions?.length },
        error
      );
      return null;
    }

    logger.info('DiagnosticService', 'bulkInsertDiagnosticQuestions', {
      count: questions?.length,
    });
    return data;
  },
};

export default DiagnosticService;
