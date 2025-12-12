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
      console.log('\n🔍 INSIGHTS SERVICE - FETCHING DIAGNOSTIC DATA:');
      console.log(`  User ID: ${userId}`);
      console.log(`  Querying diagnostic_test_sessions table...`);

      // Get all completed diagnostic sessions
      const { data: sessions, error: sessionsError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('completed', true)
        .order('created_at', { ascending: false });

      if (sessionsError) {
        console.error('❌ Error fetching diagnostic sessions:', sessionsError);
        throw sessionsError;
      }

      console.log(`  Found ${sessions?.length || 0} completed diagnostic session(s)`);
      if (sessions && sessions.length > 0) {
        console.log(`  Latest session ID: ${sessions[0].id}`);
        console.log(`  Session completed at: ${sessions[0].session_end}`);
        console.log(`  Session score: ${sessions[0].score_percentage}%`);
      }

      if (!sessions || sessions.length === 0) {
        console.log('⚠️ No completed diagnostic sessions found for this user');
        return {
          hasCompletedDiagnostic: false,
          sessions: [],
          latestScore: null,
          sectionBreakdown: null
        };
      }

      // Get latest diagnostic session details with question-level results
      const latestSession = sessions[0];
      console.log(`\n📋 FETCHING RESULTS FOR SESSION: ${latestSession.id}`);
      console.log(`  Querying diagnostic_test_results table...`);

      const { data: results, error: resultsError } = await supabase
        .from('diagnostic_test_results')
        .select('*')
        .eq('diagnostic_session_id', latestSession.id);

      console.log(`  Found ${results?.length || 0} answer records in database`);

      if (resultsError) throw resultsError;

      // Fetch question details from practice test tables (diagnostic test is test_number = 1)
      const questionIds = results.map(r => r.question_id);
      const sections = ['english', 'math', 'reading', 'science'];
      const questionDetails = new Map();

      for (const section of sections) {
        const tableName = `practice_test_${section}_questions`;
        const { data: sectionQuestions, error: questionsError } = await supabase
          .from(tableName)
          .select('id, lesson_id, difficulty, question_type')
          .in('id', questionIds);

        if (!questionsError && sectionQuestions) {
          sectionQuestions.forEach(q => {
            questionDetails.set(q.id, {
              lesson_id: q.lesson_id,
              section: section, // Use section from loop, not from database
              difficulty: q.difficulty,
              question_type: q.question_type
            });
          });
        }
      }

      // Merge question details into results
      results.forEach(result => {
        const details = questionDetails.get(result.question_id);
        if (details) {
          result.question = details;
        }
      });

      // Calculate section breakdown
      const sectionBreakdown = this._calculateSectionBreakdown(results);

      // Calculate difficulty breakdown
      const difficultyBreakdown = this._calculateDifficultyBreakdown(results);

      console.log('📊 InsightsService.getDiagnosticInsights - Returning data:');
      console.log('   Session ID:', latestSession.id);
      console.log('   Total Questions:', latestSession.total_questions);
      console.log('   Correct Answers:', latestSession.correct_answers);
      console.log('   Results count:', results.length);
      console.log('   Section breakdown:', sectionBreakdown);
      console.log('   Difficulty breakdown:', difficultyBreakdown);

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
    console.log('🔍 _calculateSectionBreakdown called with', results.length, 'results');

    const sections = { english: [], math: [], reading: [], science: [] };

    results.forEach(result => {
      const section = result.question?.section;
      if (section && sections[section]) {
        sections[section].push(result);
      } else {
        console.warn('⚠️ Result missing section or invalid section:', {
          questionId: result.question_id,
          section,
          hasQuestion: !!result.question
        });
      }
    });

    console.log('📊 Results grouped by section:');
    console.log('   English:', sections.english.length);
    console.log('   Math:', sections.math.length);
    console.log('   Reading:', sections.reading.length);
    console.log('   Science:', sections.science.length);

    const breakdown = Object.keys(sections).map(sectionName => {
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

    console.log('✅ Section breakdown calculated:', breakdown);

    return breakdown;
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
        .order('accuracy_percentage', { ascending: false})
        .limit(10);

      if (error) throw error;

      return data || [];
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getStrengths', { userId }, error);
      throw error;
    }
  },

  /**
   * Get detailed diagnostic test results with all questions and answers
   * @param {string} sessionId - Diagnostic test session ID
   * @returns {Promise<Object>} Complete diagnostic test data with questions
   */
  async getDiagnosticTestDetails(sessionId) {
    try {
      logger.info('InsightsService', 'getDiagnosticTestDetails', { sessionId });

      // Get session details
      const { data: session, error: sessionError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionError) throw sessionError;

      console.log('🔍 Diagnostic session:', session);

      // Get all question results for this session
      const { data: results, error: resultsError } = await supabase
        .from('diagnostic_test_results')
        .select('*')
        .eq('diagnostic_session_id', sessionId)
        .order('created_at', { ascending: true });

      if (resultsError) throw resultsError;

      console.log(`🔍 Found ${results?.length || 0} results in diagnostic_test_results table`);
      console.log('Expected: 215 questions (75 English + 60 Math + 40 Reading + 40 Science)');

      if (results && results.length < 215) {
        console.warn(`⚠️  WARNING: Only ${results.length} results found, expected 215!`);
        console.warn('This means not all questions were saved during the diagnostic test.');
      }

      // Fetch full question details from practice test tables
      const sections = ['english', 'math', 'reading', 'science'];
      const questionIds = results.map(r => r.question_id);
      console.log(`🔍 Fetching details for ${questionIds.length} question IDs`);

      const questionsMap = new Map();
      let totalQuestionsFound = 0;

      for (const section of sections) {
        const tableName = `practice_test_${section}_questions`;
        const { data: sectionQuestions, error: questionsError} = await supabase
          .from(tableName)
          .select('id, test_number, question_number, passage_id, question_text, question_prompt, choices, correct_answer, explanation, question_type, difficulty, image_url, created_at, updated_at, chapter, lesson_id')
          .in('id', questionIds);

        if (questionsError) {
          console.error(`❌ Error fetching ${section} questions:`, questionsError);
        } else if (sectionQuestions) {
          console.log(`✅ Found ${sectionQuestions.length} ${section} questions`);

          // Debug: Log first question structure
          if (sectionQuestions.length > 0) {
            const firstQ = sectionQuestions[0];
            console.log(`📊 First ${section} question from DB:`, {
              id: firstQ.id,
              question_number: firstQ.question_number,
              correct_answer: firstQ.correct_answer,
              correct_answer_type: typeof firstQ.correct_answer,
              hasExplanation: !!firstQ.explanation,
              explanation_length: firstQ.explanation?.length || 0,
              allKeys: Object.keys(firstQ)
            });
          }

          totalQuestionsFound += sectionQuestions.length;

          // Load passages for sections that have them
          const hasPassages = ['english', 'reading', 'science'].includes(section);
          if (hasPassages) {
            const passagesTableName = `practice_test_${section}_passages`;
            const { data: passages, error: passagesError } = await supabase
              .from(passagesTableName)
              .select('*')
              .eq('test_number', 1);

            if (!passagesError && passages) {
              const passageMap = {};
              passages.forEach(passage => {
                passageMap[passage.id] = passage;
              });

              // Merge passage text into questions
              sectionQuestions.forEach(question => {
                if (question.passage_id && passageMap[question.passage_id]) {
                  const passage = passageMap[question.passage_id];
                  question.passage = passage.passage_text;
                  question.passage_type = passage.passage_type;
                  question.passage_title = passage.passage_title;
                  question.passage_number = passage.passage_number;

                  // Collect all image URLs
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

          sectionQuestions.forEach(q => {
            questionsMap.set(q.id, {
              ...q,
              section: section
            });
          });
        }
      }

      console.log(`📊 Total question details fetched: ${totalQuestionsFound} out of ${questionIds.length}`);

      // Merge question details with results
      const questionsWithResults = results.map(result => {
        const question = questionsMap.get(result.question_id);
        if (!question) {
          console.warn(`⚠️  No question details found for question ID: ${result.question_id}`);
        }
        return {
          ...result,
          question: question || null
        };
      });

      // Group questions by section
      const questionsBySection = {
        english: questionsWithResults.filter(q => q.question?.section === 'english'),
        math: questionsWithResults.filter(q => q.question?.section === 'math'),
        reading: questionsWithResults.filter(q => q.question?.section === 'reading'),
        science: questionsWithResults.filter(q => q.question?.section === 'science')
      };

      console.log('📊 Questions by section:');
      console.log(`   English: ${questionsBySection.english.length}`);
      console.log(`   Math: ${questionsBySection.math.length}`);
      console.log(`   Reading: ${questionsBySection.reading.length}`);
      console.log(`   Science: ${questionsBySection.science.length}`);

      return {
        session,
        results: questionsWithResults,
        questionsBySection,
        totalQuestions: results.length,
        correctAnswers: results.filter(r => r.is_correct).length,
        scorePercentage: session.score_percentage
      };
    } catch (error) {
      errorTracker.trackError('InsightsService', 'getDiagnosticTestDetails', { sessionId }, error);
      console.error('❌ Error in getDiagnosticTestDetails:', error);
      throw error;
    }
  }
};

export default InsightsService;
