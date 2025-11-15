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
   * NOTE: Diagnostic test is Practice Test #1 (test_number = 1)
   */
  async getDiagnosticQuestions(section = null) {
    logger.debug('DiagnosticService', 'getDiagnosticQuestions', { section });

    // Load all sections from practice test #1 (the diagnostic test)
    const sections = section ? [section] : ['english', 'math', 'reading', 'science'];
    const allQuestions = [];

    for (const sectionName of sections) {
      const questionsTableName = `practice_test_${sectionName}_questions`;
      const passagesTableName = `practice_test_${sectionName}_passages`;
      const hasPassages = ['english', 'reading', 'science'].includes(sectionName);

      console.log(`🔍 Loading ${sectionName} questions from ${questionsTableName}`);

      // Fetch questions
      const { data: questions, error: questionsError } = await supabase
        .from(questionsTableName)
        .select('*')
        .eq('test_number', 1) // Practice Test #1 is the Diagnostic Test
        .order('question_number', { ascending: true });

      if (questionsError) {
        console.error(`❌ Error loading ${sectionName} questions:`, questionsError);
        errorTracker.trackError('DiagnosticService', 'getDiagnosticQuestions', { section: sectionName }, questionsError);
        throw questionsError; // Throw instead of continue to fail fast
      }

      if (!questions || questions.length === 0) {
        console.warn(`⚠️ No questions found for ${sectionName}`);
        logger.warn('DiagnosticService', 'getDiagnosticQuestions', { section: sectionName, message: 'No questions found' });
        continue;
      }

      console.log(`✅ Loaded ${questions.length} ${sectionName} questions`);

      // If section has passages, fetch and merge them
      if (hasPassages) {
        const { data: passages, error: passagesError } = await supabase
          .from(passagesTableName)
          .select('*')
          .eq('test_number', 1)
          .order('passage_number', { ascending: true });

        if (passagesError) {
          errorTracker.trackError('DiagnosticService', 'getDiagnosticQuestions', { section: sectionName }, passagesError);
        } else if (passages) {
          // Create passage lookup map
          const passageMap = {};
          passages.forEach((passage) => {
            passageMap[passage.id] = passage;
          });

          // Merge passage text into questions
          questions.forEach((question) => {
            if (question.passage_id && passageMap[question.passage_id]) {
              const passage = passageMap[question.passage_id];
              question.passage = passage.passage_text;
              question.passage_type = passage.passage_type;
              question.passage_title = passage.passage_title;
              question.passage_number = passage.passage_number;

              // Collect all image URLs from image_url_1, image_url_2, etc.
              const imageUrls = {};
              for (let i = 1; i <= 5; i++) {
                const urlKey = `image_url_${i}`;
                if (passage[urlKey]) {
                  imageUrls[`image${i}`] = passage[urlKey];
                }
              }
              if (Object.keys(imageUrls).length > 0) {
                question.passage_image_urls = imageUrls;
              }
            }
          });
        }
      }

      // Transform questions to match practice test format
      const transformedQuestions = questions.map((q, index) => {
        try {
          const parsedChoices = typeof q.choices === 'string' ? JSON.parse(q.choices) : q.choices;

          // Convert choices array to answers object
          // ["A. Text", "B. Text"] => {A: "Text", B: "Text"}
          const answers = {};
          if (parsedChoices && Array.isArray(parsedChoices)) {
            parsedChoices.forEach(choice => {
              const match = choice.match(/^([A-K])\.\s*(.+)$/);
              if (match) {
                answers[match[1]] = match[2];
              }
            });
          }

          return {
            id: q.id,
            text: q.question_text,
            passage: q.passage,
            passage_title: q.passage_title,
            passage_image_urls: q.passage_image_urls,
            answers: answers,
            correctAnswer: String.fromCharCode(65 + q.correct_answer), // Convert 0->A, 1->B, etc.
            explanation: q.explanation,
            question_type: q.question_type,
            difficulty: q.difficulty,
            image_url: q.image_url,
            section: sectionName,
            question_number: q.question_number,
            chapter: q.chapter, // Include chapter for lesson mapping
            lesson_id: q.lesson_id // Include lesson_id if available
          };
        } catch (err) {
          console.error(`❌ Error transforming question ${index + 1} in ${sectionName}:`, err, q);
          throw new Error(`Failed to transform question ${index + 1} in ${sectionName}: ${err.message}`);
        }
      });

      console.log(`✅ Transformed ${transformedQuestions.length} ${sectionName} questions`);
      allQuestions.push(...transformedQuestions);
    }

    console.log(`🎉 Total questions loaded: ${allQuestions.length}`);
    logger.info('DiagnosticService', 'getDiagnosticQuestions', {
      section,
      count: allQuestions.length,
    });

    if (allQuestions.length === 0) {
      throw new Error('No questions found for diagnostic test (test_number = 1)');
    }

    return allQuestions;
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
   * @param {string} userId - User ID (UUID)
   * @param {string} sessionId - Session ID (UUID)
   * @param {string} questionId - Question ID (UUID from practice test tables)
   * @param {string} userAnswer - User's answer
   * @param {boolean} isCorrect - Whether the answer was correct
   * @param {number} timeSpent - Time spent in seconds
   */
  async saveDiagnosticAnswer(userId, sessionId, questionId, userAnswer, isCorrect, timeSpent) {
    console.log(`💾 Saving diagnostic answer - Question: ${questionId}, Answer: ${userAnswer}, Correct: ${isCorrect}`);

    logger.debug('DiagnosticService', 'saveDiagnosticAnswer', {
      userId,
      sessionId,
      questionId,
      isCorrect,
      timeSpent,
    });

    // Save to diagnostic_test_results table
    // Use upsert to prevent duplicates (in case same question is saved twice)
    const { data, error } = await supabase.from('diagnostic_test_results').upsert([
      {
        user_id: userId,
        diagnostic_session_id: sessionId,
        question_id: questionId,
        user_answer: userAnswer,
        is_correct: isCorrect,
        time_spent_seconds: timeSpent,
      },
    ], {
      onConflict: 'diagnostic_session_id,question_id',
      ignoreDuplicates: false // Update if exists
    }).select(); // Return inserted data for verification

    if (error) {
      console.error(`❌ FAILED TO SAVE DIAGNOSTIC ANSWER - Question ${questionId}:`, {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        userId,
        sessionId,
        questionId,
        questionIdType: typeof questionId
      });
      errorTracker.trackError(
        'DiagnosticService',
        'saveDiagnosticAnswer',
        { userId, sessionId, questionId },
        error
      );
      return null; // Return null on error
    }

    if (!data || data.length === 0) {
      console.error(`❌ SAVE RETURNED NO DATA - Question ${questionId}`);
      return null;
    }

    return data; // Return saved data on success
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
      console.error('❌ createDiagnosticSession error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        userId,
        section,
        totalQuestions
      });
      errorTracker.trackError(
        'DiagnosticService',
        'createDiagnosticSession',
        { userId, section },
        error
      );
      throw error;
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
      console.error('❌ completeDiagnosticSession error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        sessionId,
        correctAnswers,
        scorePercentage
      });
      errorTracker.trackError(
        'DiagnosticService',
        'completeDiagnosticSession',
        { sessionId },
        error
      );
      throw error;
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
