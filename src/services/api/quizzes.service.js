/**
 * Quizzes Service
 * Handles all quiz-related database operations
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const QuizzesService = {
  /**
   * Fetch all quizzes for a specific lesson
   */
  async getQuizzesByLessonId(lessonId) {
    logger.debug('QuizzesService', 'getQuizzesByLessonId', { lessonId });

    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_questions (
          *,
          quiz_options (*)
        )
      `)
      .eq('lesson_id', lessonId)
      .order('position', { ascending: true });

    if (error) {
      errorTracker.trackError('QuizzesService', 'getQuizzesByLessonId', { lessonId }, error);
      return null;
    }

    // Transform data to match the format expected by InteractiveQuiz component
    const transformedData = data?.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      intro: quiz.intro,
      type: quiz.quiz_type,
      position: quiz.position,
      isRequired: quiz.is_required,
      isFinal: quiz.quiz_type === 'final',
      questions: quiz.quiz_questions
        ?.sort((a, b) => a.question_order - b.question_order)
        .map(question => ({
          text: question.question_text,
          options: question.quiz_options
            ?.sort((a, b) => a.option_order - b.option_order)
            .map(option => ({
              text: option.option_text,
              isCorrect: option.is_correct,
              explanation: option.explanation
            })) || []
        })) || []
    }));

    logger.info('QuizzesService', 'getQuizzesByLessonId', {
      lessonId,
      count: transformedData?.length
    });

    return transformedData;
  },

  /**
   * Fetch a single quiz by ID
   */
  async getQuizById(quizId) {
    logger.debug('QuizzesService', 'getQuizById', { quizId });

    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_questions (
          *,
          quiz_options (*)
        )
      `)
      .eq('id', quizId)
      .single();

    if (error) {
      errorTracker.trackError('QuizzesService', 'getQuizById', { quizId }, error);
      return null;
    }

    // Transform to component format
    const transformed = {
      id: data.id,
      title: data.title,
      intro: data.intro,
      type: data.quiz_type,
      position: data.position,
      isRequired: data.is_required,
      isFinal: data.quiz_type === 'final',
      questions: data.quiz_questions
        ?.sort((a, b) => a.question_order - b.question_order)
        .map(question => ({
          text: question.question_text,
          options: question.quiz_options
            ?.sort((a, b) => a.option_order - b.option_order)
            .map(option => ({
              text: option.option_text,
              isCorrect: option.is_correct,
              explanation: option.explanation
            })) || []
        })) || []
    };

    logger.info('QuizzesService', 'getQuizById', {
      quizId,
      found: !!data
    });

    return transformed;
  },

  /**
   * Save user's quiz progress
   */
  async saveQuizProgress(userId, quizId, score, totalQuestions, answers, completed = true) {
    logger.debug('QuizzesService', 'saveQuizProgress', {
      userId,
      quizId,
      score,
      totalQuestions,
      completed
    });

    const { data, error } = await supabase
      .from('user_quiz_progress')
      .upsert(
        {
          user_id: userId,
          quiz_id: quizId,
          score: score,
          total_questions: totalQuestions,
          answers: answers,
          completed: completed,
          completed_at: completed ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id,quiz_id' }
      )
      .select()
      .single();

    if (error) {
      errorTracker.trackError('QuizzesService', 'saveQuizProgress', { userId, quizId }, error);
      return null;
    }

    logger.info('QuizzesService', 'saveQuizProgress', {
      userId,
      quizId,
      score,
      completed
    });

    return data;
  },

  /**
   * Get user's progress for a specific quiz
   */
  async getUserQuizProgress(userId, quizId) {
    logger.debug('QuizzesService', 'getUserQuizProgress', { userId, quizId });

    const { data, error } = await supabase
      .from('user_quiz_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      errorTracker.trackError('QuizzesService', 'getUserQuizProgress', { userId, quizId }, error);
      return null;
    }

    logger.info('QuizzesService', 'getUserQuizProgress', {
      userId,
      quizId,
      found: !!data
    });

    return data;
  },

  /**
   * Get all quiz progress for a user
   */
  async getAllUserQuizProgress(userId) {
    logger.debug('QuizzesService', 'getAllUserQuizProgress', { userId });

    const { data, error } = await supabase
      .from('user_quiz_progress')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      errorTracker.trackError('QuizzesService', 'getAllUserQuizProgress', { userId }, error);
      return null;
    }

    logger.info('QuizzesService', 'getAllUserQuizProgress', {
      userId,
      count: data?.length
    });

    return data;
  },

  /**
   * Check if user has completed all required quizzes for a lesson
   */
  async hasCompletedRequiredQuizzes(userId, lessonId) {
    logger.debug('QuizzesService', 'hasCompletedRequiredQuizzes', { userId, lessonId });

    // Get all required quizzes for the lesson
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', lessonId)
      .eq('is_required', true);

    if (quizzesError) {
      errorTracker.trackError('QuizzesService', 'hasCompletedRequiredQuizzes', { userId, lessonId }, quizzesError);
      return false;
    }

    if (!quizzes || quizzes.length === 0) {
      return true; // No required quizzes
    }

    // Get user's completed quizzes
    const { data: progress, error: progressError } = await supabase
      .from('user_quiz_progress')
      .select('quiz_id')
      .eq('user_id', userId)
      .eq('completed', true)
      .in('quiz_id', quizzes.map(q => q.id));

    if (progressError) {
      errorTracker.trackError('QuizzesService', 'hasCompletedRequiredQuizzes', { userId, lessonId }, progressError);
      return false;
    }

    const completed = progress?.length === quizzes.length;

    logger.info('QuizzesService', 'hasCompletedRequiredQuizzes', {
      userId,
      lessonId,
      required: quizzes.length,
      completed: progress?.length || 0,
      allCompleted: completed
    });

    return completed;
  }
};

export default QuizzesService;
