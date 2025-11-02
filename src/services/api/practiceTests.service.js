/**
 * Practice Tests Service
 * Handles all practice test-related database operations
 * Updated to use separated tables for each section
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const PracticeTestsService = {
  /**
   * Get table names for a specific section
   * @param {string} section - Section name
   * @returns {Object} Table names for questions and passages
   */
  _getTableNames(section) {
    const tableMap = {
      english: {
        questions: 'practice_test_english_questions',
        passages: 'practice_test_english_passages'
      },
      math: {
        questions: 'practice_test_math_questions',
        passages: null
      },
      reading: {
        questions: 'practice_test_reading_questions',
        passages: 'practice_test_reading_passages'
      },
      science: {
        questions: 'practice_test_science_questions',
        passages: 'practice_test_science_passages'
      }
    };
    return tableMap[section] || null;
  },

  /**
   * Fetch questions for a specific section with passages
   * @param {number} testNumber - Test number
   * @param {string} section - Section name
   * @returns {Promise<Array|null>} Questions with passage data
   */
  async getPracticeTestSection(testNumber, section) {
    logger.debug('PracticeTestsService', 'getPracticeTestSection', { testNumber, section });

    const tables = this._getTableNames(section);
    if (!tables) {
      errorTracker.trackError(
        'PracticeTestsService',
        'getPracticeTestSection',
        { testNumber, section },
        new Error(`Invalid section: ${section}`)
      );
      return null;
    }

    try {
      // Fetch questions
      const { data: questions, error: questionsError } = await supabase
        .from(tables.questions)
        .select('*')
        .eq('test_number', testNumber)
        .order('question_number', { ascending: true });

      if (questionsError) {
        errorTracker.trackError(
          'PracticeTestsService',
          'getPracticeTestSection',
          { testNumber, section },
          questionsError
        );
        return null;
      }

      // If section has passages, fetch and merge them
      if (tables.passages) {
        const { data: passages, error: passagesError } = await supabase
          .from(tables.passages)
          .select('*')
          .eq('test_number', testNumber)
          .order('passage_number', { ascending: true });

        if (passagesError) {
          errorTracker.trackError(
            'PracticeTestsService',
            'getPracticeTestSection',
            { testNumber, section },
            passagesError
          );
          return null;
        }

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

      // Transform questions to match SequentialTest expected format
      const transformedQuestions = questions.map((q) => {
        const parsedChoices = typeof q.choices === 'string' ? JSON.parse(q.choices) : q.choices;

        // Convert choices array to answers object for InteractiveQuestion
        // ["A. Text", "B. Text"] => {A: "Text", B: "Text"}
        const answers = {};
        parsedChoices.forEach(choice => {
          const match = choice.match(/^([A-E])\.\s*(.+)$/);
          if (match) {
            answers[match[1]] = match[2];
          }
        });

        return {
          id: q.id,
          text: q.question_text, // SequentialTest expects 'text'
          passage: q.passage,
          passage_title: q.passage_title, // Include passage title
          passage_image_urls: q.passage_image_urls, // Include passage image URLs for placeholder replacement
          answers: answers, // SequentialTest expects 'answers' as object
          correctAnswer: String.fromCharCode(65 + q.correct_answer), // Convert 0->A, 1->B, etc.
          explanation: q.explanation,
          question_type: q.question_type,
          difficulty: q.difficulty,
          image_url: q.image_url // Include image URL for questions with diagrams
        };
      });

      logger.info('PracticeTestsService', 'getPracticeTestSection', {
        testNumber,
        section,
        count: transformedQuestions.length
      });

      return transformedQuestions;
    } catch (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'getPracticeTestSection',
        { testNumber, section },
        error
      );
      return null;
    }
  },

  /**
   * Fetch all questions for a test (all sections)
   * @param {number} testNumber - Test number
   * @returns {Promise<Array|null>} All questions from all sections
   */
  async getPracticeTestQuestions(testNumber) {
    logger.debug('PracticeTestsService', 'getPracticeTestQuestions', { testNumber });

    try {
      const allQuestions = [];
      const sections = ['english', 'math', 'reading', 'science'];

      for (const section of sections) {
        const sectionQuestions = await this.getPracticeTestSection(testNumber, section);
        if (sectionQuestions) {
          // Add section identifier to each question
          sectionQuestions.forEach((q) => {
            q.section = section;
          });
          allQuestions.push(...sectionQuestions);
        }
      }

      logger.info('PracticeTestsService', 'getPracticeTestQuestions', {
        testNumber,
        totalCount: allQuestions.length
      });

      return allQuestions.length > 0 ? allQuestions : null;
    } catch (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'getPracticeTestQuestions',
        { testNumber },
        error
      );
      return null;
    }
  },

  /**
   * Get test structure (question counts by section)
   * @param {number} testNumber - Test number
   * @returns {Promise<Object|null>} Object with counts by section
   */
  async getTestStructure(testNumber) {
    logger.debug('PracticeTestsService', 'getTestStructure', { testNumber });

    try {
      const structure = {};
      const sections = ['english', 'math', 'reading', 'science'];

      for (const section of sections) {
        const tables = this._getTableNames(section);
        if (!tables) continue;

        const { count, error } = await supabase
          .from(tables.questions)
          .select('*', { count: 'exact', head: true })
          .eq('test_number', testNumber);

        if (error) {
          console.error(`Error getting count for ${section}:`, error);
          continue;
        }

        structure[section] = count || 0;
      }

      logger.info('PracticeTestsService', 'getTestStructure', {
        testNumber,
        structure
      });

      return structure;
    } catch (error) {
      errorTracker.trackError('PracticeTestsService', 'getTestStructure', { testNumber }, error);
      return null;
    }
  },

  /**
   * Get passages for a specific section
   * @param {number} testNumber - Test number
   * @param {string} section - Section name ('english', 'reading', 'science')
   * @returns {Promise<Array|null>} Array of passages
   */
  async getPassages(testNumber, section) {
    logger.debug('PracticeTestsService', 'getPassages', { testNumber, section });

    const tables = this._getTableNames(section);
    if (!tables || !tables.passages) {
      return null; // Section doesn't have passages
    }

    try {
      const { data, error } = await supabase
        .from(tables.passages)
        .select('*')
        .eq('test_number', testNumber)
        .order('passage_number', { ascending: true });

      if (error) {
        errorTracker.trackError(
          'PracticeTestsService',
          'getPassages',
          { testNumber, section },
          error
        );
        return null;
      }

      logger.info('PracticeTestsService', 'getPassages', {
        testNumber,
        section,
        count: data?.length
      });

      return data;
    } catch (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'getPassages',
        { testNumber, section },
        error
      );
      return null;
    }
  },

  /**
   * Save user's answer to a practice test question
   * @param {string} userId - User ID
   * @param {number} testNumber - Test number
   * @param {string} section - Section name
   * @param {number} questionId - Question ID from database
   * @param {number} userAnswer - User's answer (0-based index)
   * @param {boolean} isCorrect - Whether answer was correct
   * @param {number} timeSpent - Time spent in seconds
   * @returns {Promise<Object|null>} Inserted data or null on error
   */
  async savePracticeTestAnswer(
    userId,
    testNumber,
    section,
    questionId,
    userAnswer,
    isCorrect,
    timeSpent
  ) {
    logger.debug('PracticeTestsService', 'savePracticeTestAnswer', {
      userId,
      testNumber,
      section,
      questionId,
      isCorrect,
      timeSpent
    });

    const { data, error } = await supabase.from('practice_test_results').insert([
      {
        user_id: userId,
        test_number: testNumber,
        section: section,
        question_id: questionId,
        user_answer: userAnswer,
        is_correct: isCorrect,
        time_spent_seconds: timeSpent
      }
    ]);

    if (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'savePracticeTestAnswer',
        { userId, testNumber, section, questionId },
        error
      );
      return null;
    }

    logger.info('PracticeTestsService', 'savePracticeTestAnswer', {
      userId,
      testNumber,
      section,
      questionId,
      isCorrect
    });
    return data;
  },

  /**
   * Create a new practice test session
   * @param {string} userId - User ID
   * @param {number} testNumber - Test number
   * @param {string} section - Section name or 'full'
   * @param {number} totalQuestions - Total questions in section
   * @returns {Promise<Object|null>} Created session or null on error
   */
  async createPracticeTestSession(userId, testNumber, section, totalQuestions) {
    logger.debug('PracticeTestsService', 'createPracticeTestSession', {
      userId,
      testNumber,
      section,
      totalQuestions
    });

    const { data, error } = await supabase
      .from('practice_test_sessions')
      .insert([
        {
          user_id: userId,
          test_number: testNumber,
          section: section,
          total_questions: totalQuestions
        }
      ])
      .select();

    if (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'createPracticeTestSession',
        { userId, testNumber, section },
        error
      );
      return null;
    }

    logger.info('PracticeTestsService', 'createPracticeTestSession', {
      userId,
      testNumber,
      section,
      sessionId: data[0]?.id
    });
    return data[0];
  },

  /**
   * Complete a practice test session
   * @param {string} sessionId - Session ID
   * @param {number} correctAnswers - Number of correct answers
   * @param {number} scorePercentage - Score as percentage
   * @returns {Promise<Object|null>} Updated session or null on error
   */
  async completePracticeTestSession(sessionId, correctAnswers, scorePercentage) {
    logger.debug('PracticeTestsService', 'completePracticeTestSession', {
      sessionId,
      correctAnswers,
      scorePercentage
    });

    const { data, error } = await supabase
      .from('practice_test_sessions')
      .update({
        session_end: new Date().toISOString(),
        correct_answers: correctAnswers,
        score_percentage: scorePercentage,
        completed: true
      })
      .eq('id', sessionId);

    if (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'completePracticeTestSession',
        { sessionId },
        error
      );
      return null;
    }

    logger.info('PracticeTestsService', 'completePracticeTestSession', {
      sessionId,
      scorePercentage
    });
    return data;
  },

  /**
   * Get user's practice test history for a specific test number
   * @param {string} userId - User ID
   * @param {number} testNumber - Optional test number filter
   * @returns {Promise<Array|null>} Array of sessions or null on error
   */
  async getUserPracticeTestHistory(userId, testNumber = null) {
    logger.debug('PracticeTestsService', 'getUserPracticeTestHistory', { userId, testNumber });

    let query = supabase
      .from('practice_test_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('session_start', { ascending: false });

    if (testNumber) {
      query = query.eq('test_number', testNumber);
    }

    const { data, error } = await query;

    if (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'getUserPracticeTestHistory',
        { userId, testNumber },
        error
      );
      return null;
    }

    logger.info('PracticeTestsService', 'getUserPracticeTestHistory', {
      userId,
      testNumber,
      count: data?.length
    });
    return data;
  },

  /**
   * Get user's performance by section for a specific test
   * @param {string} userId - User ID
   * @param {number} testNumber - Test number
   * @returns {Promise<Object|null>} Performance by section or null on error
   */
  async getUserPerformanceBySection(userId, testNumber) {
    logger.debug('PracticeTestsService', 'getUserPerformanceBySection', { userId, testNumber });

    const { data, error } = await supabase
      .from('practice_test_sessions')
      .select('section, score_percentage, correct_answers, total_questions')
      .eq('user_id', userId)
      .eq('test_number', testNumber)
      .eq('completed', true)
      .order('session_start', { ascending: false });

    if (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'getUserPerformanceBySection',
        { userId, testNumber },
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

    logger.info('PracticeTestsService', 'getUserPerformanceBySection', {
      userId,
      testNumber,
      sections: Object.keys(sectionPerformance).length
    });
    return sectionPerformance;
  },

  /**
   * Get the total count of available practice tests
   * @returns {Promise<number|null>} Count of unique test numbers or null on error
   */
  async getAvailablePracticeTestsCount() {
    logger.debug('PracticeTestsService', 'getAvailablePracticeTestsCount', {});

    // Check english questions table to get available test numbers
    const { data, error } = await supabase
      .from('practice_test_english_questions')
      .select('test_number')
      .order('test_number', { ascending: true });

    if (error) {
      errorTracker.trackError(
        'PracticeTestsService',
        'getAvailablePracticeTestsCount',
        {},
        error
      );
      return null;
    }

    // Get unique test numbers
    const uniqueTests = [...new Set(data.map((q) => q.test_number))];

    logger.info('PracticeTestsService', 'getAvailablePracticeTestsCount', {
      count: uniqueTests.length
    });
    return uniqueTests.length;
  }
};

export default PracticeTestsService;
