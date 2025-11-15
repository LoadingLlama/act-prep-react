/**
 * Diagnostic Analysis Service
 * Analyzes diagnostic test results to identify weak areas and generate personalized recommendations
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const DiagnosticAnalysisService = {
  /**
   * Analyze diagnostic test results by lesson
   * @param {string} userId - User ID
   * @param {string} diagnosticSessionId - Diagnostic session ID
   * @param {Array} questionResults - Optional array of question results (if not saved to DB)
   * @returns {Promise<Object>} Analysis results with weak areas and recommendations
   */
  async analyzeDiagnosticResults(userId, diagnosticSessionId, questionResults = null) {
    const startTime = Date.now();
    logger.debug('DiagnosticAnalysisService', 'analyzeDiagnosticResults', { userId, diagnosticSessionId, hasQuestionResults: !!questionResults });

    try {
      let results = questionResults;

      // If no results provided, load from database
      if (!results) {
        const { data: dbResults, error: resultsError } = await supabase
          .from('diagnostic_test_results')
          .select('*')
          .eq('user_id', userId)
          .eq('diagnostic_session_id', diagnosticSessionId);

        if (resultsError) throw resultsError;
        results = dbResults;
      }

      console.log('\n═══════════════════════════════════════════════════════');
      console.log('🔍 DIAGNOSTIC ANALYSIS - LOADING RESULTS');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`📊 Analyzing ${results?.length || 0} question results from diagnostic test`);
      console.log(`   Session ID: ${diagnosticSessionId}`);
      console.log(`   User ID: ${userId}\n`);

      // 1b. Fetch question details from practice test tables to get lesson_id mapping
      const questionIds = results.map(r => r.question_id);
      const sections = ['english', 'math', 'reading', 'science'];
      const questionDetails = new Map();

      console.log('📚 Fetching question details for lesson mapping...');

      const sectionQuestionCounts = {};

      for (const section of sections) {
        const tableName = `practice_test_${section}_questions`;
        const { data: sectionQuestions, error: questionsError } = await supabase
          .from(tableName)
          .select('id, lesson_id, chapter, question_number, question_type, difficulty')
          .in('id', questionIds);

        if (!questionsError && sectionQuestions) {
          const withLesson = sectionQuestions.filter(q => q.lesson_id).length;
          const withoutLesson = sectionQuestions.length - withLesson;

          sectionQuestionCounts[section] = {
            total: sectionQuestions.length,
            withLesson,
            withoutLesson
          };

          console.log(`  ${section}: ${sectionQuestions.length} questions (${withLesson} mapped to lessons, ${withoutLesson} unmapped)`);

          sectionQuestions.forEach(q => {
            questionDetails.set(q.id, {
              lesson_id: q.lesson_id,
              chapter: q.chapter,
              section: section,
              question_number: q.question_number,
              question_type: q.question_type,
              difficulty: q.difficulty
            });
          });
        }
      }

      console.log(`\n✅ Found lesson mapping for ${questionDetails.size} questions total`);

      // 2. Get session metadata
      const { data: session, error: sessionError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('id', diagnosticSessionId)
        .single();

      if (sessionError) throw sessionError;

      // 3. Group results by lesson using the fetched question details
      const lessonPerformance = {};
      let questionsWithoutLesson = 0;
      const unmappedQuestions = []; // Track which questions are unmapped

      results.forEach(result => {
        const questionInfo = questionDetails.get(result.question_id);
        if (!questionInfo || !questionInfo.lesson_id) {
          questionsWithoutLesson++;
          unmappedQuestions.push({
            question_id: result.question_id,
            section: questionInfo?.section || 'unknown',
            chapter: questionInfo?.chapter || 'unknown',
            question_number: questionInfo?.question_number || '?'
          });
          return;
        }

        const lessonId = questionInfo.lesson_id;

        if (!lessonPerformance[lessonId]) {
          lessonPerformance[lessonId] = {
            lesson_id: lessonId,
            section: questionInfo.section,
            questions_attempted: 0,
            correct: 0,
            incorrect: 0,
            total_time_spent: 0
          };
        }

        lessonPerformance[lessonId].questions_attempted++;
        if (result.is_correct) {
          lessonPerformance[lessonId].correct++;
        } else {
          lessonPerformance[lessonId].incorrect++;
        }
        lessonPerformance[lessonId].total_time_spent += result.time_spent_seconds || 0;
      });

      // Enhanced validation logging
      const unmappedPercentage = (questionsWithoutLesson / results.length) * 100;
      if (questionsWithoutLesson > 0) {
        console.warn(`⚠️ Validation: ${questionsWithoutLesson} questions (${unmappedPercentage.toFixed(1)}%) don't have lesson mapping yet`);
        console.warn('Unmapped questions by section:',
          unmappedQuestions.reduce((acc, q) => {
            acc[q.section] = (acc[q.section] || 0) + 1;
            return acc;
          }, {})
        );

        // Log critical warning if too many questions are unmapped
        if (unmappedPercentage > 20) {
          console.error(`🚨 CRITICAL: ${unmappedPercentage.toFixed(1)}% of questions lack lesson mapping - learning path quality will be degraded!`);
        }
      }

      console.log(`\n📈 Grouped results into ${Object.keys(lessonPerformance).length} unique lessons`);

      // Log lesson distribution by section
      const lessonsBySection = {
        english: [],
        math: [],
        reading: [],
        science: []
      };

      Object.values(lessonPerformance).forEach(perf => {
        if (perf.section && lessonsBySection[perf.section]) {
          lessonsBySection[perf.section].push(perf);
        }
      });

      console.log('\n📚 Lessons analyzed by section:');
      Object.keys(lessonsBySection).forEach(section => {
        const lessons = lessonsBySection[section];
        if (lessons.length > 0) {
          console.log(`  ${section}: ${lessons.length} lessons`);
        }
      });
      console.log();

      // 3b. Analyze by question type
      const questionTypePerformance = {};
      results.forEach(result => {
        const questionInfo = questionDetails.get(result.question_id);
        if (!questionInfo || !questionInfo.question_type) return;

        const qType = questionInfo.question_type;
        if (!questionTypePerformance[qType]) {
          questionTypePerformance[qType] = {
            question_type: qType,
            section: questionInfo.section,
            total: 0,
            correct: 0,
            incorrect: 0
          };
        }

        questionTypePerformance[qType].total++;
        if (result.is_correct) {
          questionTypePerformance[qType].correct++;
        } else {
          questionTypePerformance[qType].incorrect++;
        }
      });

      // Calculate question type accuracy
      const questionTypeBreakdown = Object.values(questionTypePerformance).map(qt => ({
        ...qt,
        accuracy: parseFloat(((qt.correct / qt.total) * 100).toFixed(2))
      })).sort((a, b) => a.accuracy - b.accuracy); // Sort by accuracy (weakest first)

      console.log(`📊 Analyzed ${questionTypeBreakdown.length} question types`);

      // 4. Calculate accuracy and identify weak and strong areas
      const lessonBreakdown = [];
      const weakLessons = [];
      const strongLessons = [];
      const priorityLessons = [];

      Object.values(lessonPerformance).forEach(perf => {
        const accuracy = (perf.correct / perf.questions_attempted) * 100;
        const avgTime = perf.total_time_spent / perf.questions_attempted;

        // Calculate average difficulty for this lesson's questions
        let avgDifficulty = 0;
        let difficultyCount = 0;
        results.forEach(result => {
          const questionInfo = questionDetails.get(result.question_id);
          if (questionInfo && questionInfo.lesson_id === perf.lesson_id && questionInfo.difficulty) {
            avgDifficulty += questionInfo.difficulty;
            difficultyCount++;
          }
        });
        avgDifficulty = difficultyCount > 0 ? avgDifficulty / difficultyCount : 3; // Default to medium difficulty

        // Determine if this is a weak area (< 70% accuracy)
        const isWeak = accuracy < 70;

        // Calculate difficulty-weighted priority level (1-5, where 5 is highest priority)
        // Lower difficulty + lower accuracy = higher priority (basic concepts are critical)
        let priority = 0;
        if (isWeak) {
          // Base priority on accuracy
          if (accuracy < 40) priority = 5;
          else if (accuracy < 50) priority = 4;
          else if (accuracy < 60) priority = 3;
          else if (accuracy < 70) priority = 2;
          else priority = 1;

          // Adjust priority based on difficulty
          // If questions are easy (difficulty < 2) and you're getting them wrong, increase priority
          // If questions are hard (difficulty > 4) and you're getting them wrong, that's more expected
          if (avgDifficulty < 2.5 && priority < 5) {
            priority += 1; // Boost priority for easy questions missed
          } else if (avgDifficulty > 4 && priority > 1) {
            priority -= 1; // Reduce priority slightly for hard questions missed
          }
        }

        const lessonData = {
          lesson_id: perf.lesson_id,
          section: perf.section,
          questions_attempted: perf.questions_attempted,
          correct: perf.correct,
          incorrect: perf.incorrect,
          accuracy: parseFloat(accuracy.toFixed(2)),
          average_time_seconds: parseFloat(avgTime.toFixed(2)),
          is_weak: isWeak,
          priority: priority
        };

        lessonBreakdown.push(lessonData);

        if (isWeak) {
          weakLessons.push(perf.lesson_id);
          if (priority > 0) {
            priorityLessons.push({
              lesson_id: perf.lesson_id,
              priority: priority,
              accuracy: accuracy
            });
          }
        } else if (accuracy >= 80) {
          // Identify strong areas (>=80% accuracy)
          strongLessons.push({
            lesson_id: perf.lesson_id,
            accuracy: accuracy,
            section: perf.section
          });
        }
      });

      // Sort by priority (highest first) and strong lessons by accuracy (highest first)
      lessonBreakdown.sort((a, b) => b.priority - a.priority);
      strongLessons.sort((a, b) => b.accuracy - a.accuracy);

      console.log('\n═══════════════════════════════════════════════════════');
      console.log('🎯 WEAK & STRONG LESSONS IDENTIFIED');
      console.log('═══════════════════════════════════════════════════════\n');

      console.log(`Total Lessons Analyzed: ${lessonBreakdown.length}`);
      console.log(`Weak Lessons (<70%):    ${weakLessons.length}`);
      console.log(`Strong Lessons (≥80%):  ${strongLessons.length}\n`);

      // Count weak lessons by section
      const weakBySection = lessonBreakdown.filter(l => l.is_weak).reduce((acc, l) => {
        acc[l.section] = (acc[l.section] || 0) + 1;
        return acc;
      }, {});

      console.log('Weak Lessons by Section:');
      Object.keys(weakBySection).forEach(section => {
        console.log(`  ${section}: ${weakBySection[section]} weak lessons`);
      });

      // Count strong lessons by section
      const strongBySection = strongLessons.reduce((acc, l) => {
        acc[l.section] = (acc[l.section] || 0) + 1;
        return acc;
      }, {});

      console.log('\nStrong Lessons by Section:');
      Object.keys(strongBySection).forEach(section => {
        console.log(`  ${section}: ${strongBySection[section]} strong lessons`);
      });

      console.log('\nPriority Distribution:');
      console.log(`  High Priority (4-5):   ${priorityLessons.filter(p => p.priority >= 4).length}`);
      console.log(`  Medium Priority (3):   ${priorityLessons.filter(p => p.priority === 3).length}`);
      console.log(`  Low Priority (1-2):    ${priorityLessons.filter(p => p.priority <= 2).length}`);
      console.log();

      priorityLessons.sort((a, b) => b.priority - a.priority);

      // 4b. Fetch lesson titles for strong and weak lessons
      const allLessonIds = [...weakLessons, ...strongLessons.map(l => l.lesson_id)];
      if (allLessonIds.length > 0) {
        const { data: lessonTitles } = await supabase
          .from('lessons')
          .select('id, title')
          .in('id', allLessonIds);

        if (lessonTitles) {
          const titleMap = {};
          lessonTitles.forEach(l => {
            titleMap[l.id] = l.title;
          });

          // Add titles to strong lessons
          strongLessons.forEach(lesson => {
            lesson.lesson_title = titleMap[lesson.lesson_id] || `Lesson ${lesson.lesson_id}`;
          });

          // Add titles to weak lessons (they're stored as lesson IDs, need to transform)
          const weakLessonsWithTitles = weakLessons.map(lessonId => {
            const lessonPerf = lessonBreakdown.find(l => l.lesson_id === lessonId);
            return {
              lesson_id: lessonId,
              lesson_title: titleMap[lessonId] || `Lesson ${lessonId}`,
              accuracy: lessonPerf?.accuracy || 0,
              section: lessonPerf?.section || 'unknown'
            };
          });

          // Replace weakLessons array with detailed version
          weakLessons.length = 0;
          weakLessons.push(...weakLessonsWithTitles);
        }
      }

      // 4c. FALLBACK: If no weak lessons identified, create recommendations based on sections
      // This ensures EVERY user gets a learning path, even with incomplete lesson mappings
      if (weakLessons.length === 0) {
        console.warn('⚠️  No weak lessons identified (unmapped: ' + unmappedPercentage.toFixed(1) + '%)');
        console.warn('📋 Creating fallback recommendations based on section performance...');

        // Analyze by section
        const sectionPerformance = {};
        results.forEach(result => {
          const questionInfo = questionDetails.get(result.question_id);
          const section = questionInfo?.section || 'unknown';

          if (!sectionPerformance[section]) {
            sectionPerformance[section] = { total: 0, correct: 0 };
          }

          sectionPerformance[section].total++;
          if (result.is_correct) {
            sectionPerformance[section].correct++;
          }
        });

        // Find weak sections (< 70% accuracy)
        const weakSections = Object.entries(sectionPerformance)
          .filter(([_, perf]) => {
            const accuracy = (perf.correct / perf.total) * 100;
            return accuracy < 70;
          })
          .map(([section, perf]) => ({
            section,
            accuracy: (perf.correct / perf.total) * 100,
            total: perf.total
          }))
          .sort((a, b) => a.accuracy - b.accuracy);

        console.log(`📊 Found ${weakSections.length} weak section(s):`, weakSections);

        // Get top 5 lessons from each weak section
        if (weakSections.length > 0) {
          for (const weakSection of weakSections) {
            const { data: sectionLessons } = await supabase
              .from('lessons')
              .select('id, title, lesson_key')
              .ilike('lesson_key', `${weakSection.section}%`)
              .limit(5);

            if (sectionLessons && sectionLessons.length > 0) {
              sectionLessons.forEach(lesson => {
                weakLessons.push({
                  lesson_id: lesson.id,
                  lesson_title: lesson.title,
                  lesson_key: lesson.lesson_key,
                  accuracy_percentage: weakSection.accuracy,
                  section: weakSection.section,
                  is_fallback: true // Mark as fallback recommendation
                });
              });
            }
          }

          console.log(`✅ Created ${weakLessons.length} fallback lesson recommendations`);
        }
      }

      // 4d. LAST RESORT: If still no weak lessons (user scored well on everything),
      // recommend foundational lessons from each section to ensure SOME learning path
      if (weakLessons.length === 0) {
        console.warn('⚠️  User performed well on all sections! Creating foundational learning path...');

        // Get 3 foundational lessons from each section (12 total)
        const sections = ['english', 'math', 'reading', 'science'];
        for (const section of sections) {
          const { data: foundationalLessons } = await supabase
            .from('lessons')
            .select('id, title, lesson_key')
            .ilike('lesson_key', `${section}%`)
            .order('lesson_key')
            .limit(3);

          if (foundationalLessons && foundationalLessons.length > 0) {
            foundationalLessons.forEach(lesson => {
              weakLessons.push({
                lesson_id: lesson.id,
                lesson_title: lesson.title,
                lesson_key: lesson.lesson_key,
                accuracy_percentage: 100, // Mark as mastered since they scored well
                section: section,
                is_fallback: true,
                is_foundational: true // Extra flag to indicate this is for strong performers
              });
            });
          }
        }

        console.log(`✅ Created ${weakLessons.length} foundational lesson recommendations for strong performer`);
      }

      // 5. Calculate section scores
      const sectionScores = {
        english: 0,
        math: 0,
        reading: 0,
        science: 0
      };

      results.forEach(result => {
        const questionInfo = questionDetails.get(result.question_id);
        const section = questionInfo?.section;
        if (section && result.is_correct) {
          sectionScores[section] = (sectionScores[section] || 0) + 1;
        }
      });

      // 6. Calculate overall metrics
      const totalQuestions = results.length;
      const totalCorrect = results.filter(r => r.is_correct).length;
      const overallAccuracy = (totalCorrect / totalQuestions) * 100;

      // Estimated ACT composite score (simplified calculation)
      const overallScore = Math.round((overallAccuracy / 100) * 36);

      // 7. Generate recommendations
      const weakAreasCount = weakLessons.length;
      const totalLessons = lessonBreakdown.length;
      const percentWeak = (weakAreasCount / totalLessons) * 100;

      // Estimate study time needed based on weak areas
      let recommendedWeeks = 4; // Base recommendation
      if (percentWeak > 50) recommendedWeeks = 8;
      else if (percentWeak > 30) recommendedWeeks = 6;

      // Estimate improvement potential
      const improvementPotential = Math.round((100 - overallAccuracy) * 0.7); // Can improve 70% of gap

      // 8. Create analysis record
      const analysisData = {
        user_id: userId,
        diagnostic_session_id: diagnosticSessionId,
        total_questions: totalQuestions,
        total_correct: totalCorrect,
        overall_accuracy: parseFloat(overallAccuracy.toFixed(2)),
        overall_score: overallScore,
        english_score: sectionScores.english || 0,
        math_score: sectionScores.math || 0,
        reading_score: sectionScores.reading || 0,
        science_score: sectionScores.science || 0,
        lesson_breakdown: lessonBreakdown,
        weak_lessons: weakLessons,
        strong_lessons: strongLessons,
        priority_lessons: priorityLessons,
        question_type_breakdown: questionTypeBreakdown,
        recommended_study_time_weeks: recommendedWeeks,
        estimated_improvement_potential: improvementPotential,
        validation_info: {
          unmapped_questions_count: questionsWithoutLesson,
          unmapped_percentage: parseFloat(unmappedPercentage.toFixed(2)),
          total_lessons_mapped: Object.keys(lessonPerformance).length,
          has_critical_mapping_issues: unmappedPercentage > 20
        }
      };

      const { data: analysis, error: insertError } = await supabase
        .from('diagnostic_analysis')
        .insert([analysisData])
        .select()
        .single();

      if (insertError) throw insertError;

      // 9. Update user_lesson_performance table
      await this._updateLessonPerformance(userId, lessonBreakdown, 'diagnostic');

      // 10. Log algorithm run
      const executionTime = Date.now() - startTime;
      await supabase.from('algorithm_runs').insert([{
        user_id: userId,
        algorithm_type: 'diagnostic_analysis',
        input_data: { diagnosticSessionId, totalQuestions },
        output_data: { weakLessonsCount: weakLessons.length, overallScore },
        execution_time_ms: executionTime,
        success: true
      }]);

      logger.info('DiagnosticAnalysisService', 'analyzeDiagnosticResults', {
        userId,
        overallAccuracy: overallAccuracy.toFixed(2),
        weakAreas: weakLessons.length,
        executionTime
      });

      return analysis;
    } catch (error) {
      errorTracker.trackError('DiagnosticAnalysisService', 'analyzeDiagnosticResults', { userId }, error);

      // Log failed algorithm run
      await supabase.from('algorithm_runs').insert([{
        user_id: userId,
        algorithm_type: 'diagnostic_analysis',
        input_data: { diagnosticSessionId },
        execution_time_ms: Date.now() - startTime,
        success: false,
        error_message: error.message
      }]);

      throw error;
    }
  },

  /**
   * Update user_lesson_performance table with diagnostic results
   * @private
   */
  async _updateLessonPerformance(userId, lessonBreakdown, source) {
    for (const lesson of lessonBreakdown) {
      const { data: existing } = await supabase
        .from('user_lesson_performance')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lesson.lesson_id)
        .single();

      const updateData = {
        user_id: userId,
        lesson_id: lesson.lesson_id,
        is_weak_area: lesson.is_weak,
        priority_level: lesson.priority,
        last_practiced_at: new Date().toISOString()
      };

      if (source === 'diagnostic') {
        updateData.diagnostic_questions = lesson.questions_attempted;
        updateData.diagnostic_correct = lesson.correct;
      }

      if (existing) {
        // Update existing record
        const newTotal = existing.total_questions_attempted + lesson.questions_attempted;
        const newCorrect = existing.correct_answers + lesson.correct;
        const newAccuracy = (newCorrect / newTotal) * 100;

        await supabase
          .from('user_lesson_performance')
          .update({
            ...updateData,
            total_questions_attempted: newTotal,
            correct_answers: newCorrect,
            accuracy_percentage: parseFloat(newAccuracy.toFixed(2))
          })
          .eq('id', existing.id);
      } else {
        // Create new record
        await supabase
          .from('user_lesson_performance')
          .insert([{
            ...updateData,
            total_questions_attempted: lesson.questions_attempted,
            correct_answers: lesson.correct,
            accuracy_percentage: lesson.accuracy
          }]);
      }
    }
  },

  /**
   * Get existing diagnostic analysis for a user
   */
  async getDiagnosticAnalysis(userId) {
    logger.debug('DiagnosticAnalysisService', 'getDiagnosticAnalysis', { userId });

    const { data, error } = await supabase
      .from('diagnostic_analysis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      errorTracker.trackError('DiagnosticAnalysisService', 'getDiagnosticAnalysis', { userId }, error);
      return null;
    }

    return data;
  }
};

export default DiagnosticAnalysisService;
