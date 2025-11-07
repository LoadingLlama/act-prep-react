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
   * @returns {Promise<Object>} Analysis results with weak areas and recommendations
   */
  async analyzeDiagnosticResults(userId, diagnosticSessionId) {
    const startTime = Date.now();
    logger.debug('DiagnosticAnalysisService', 'analyzeDiagnosticResults', { userId, diagnosticSessionId });

    try {
      // 1. Get all results from the diagnostic session
      const { data: results, error: resultsError } = await supabase
        .from('diagnostic_test_results')
        .select('*, question:diagnostic_test_questions(lesson_id, section)')
        .eq('user_id', userId)
        .eq('diagnostic_session_id', diagnosticSessionId);

      if (resultsError) throw resultsError;

      // 2. Get session metadata
      const { data: session, error: sessionError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('id', diagnosticSessionId)
        .single();

      if (sessionError) throw sessionError;

      // 3. Group results by lesson
      const lessonPerformance = {};
      results.forEach(result => {
        const lessonId = result.question?.lesson_id;
        if (!lessonId) return;

        if (!lessonPerformance[lessonId]) {
          lessonPerformance[lessonId] = {
            lesson_id: lessonId,
            section: result.question.section,
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

      // 4. Calculate accuracy and identify weak areas
      const lessonBreakdown = [];
      const weakLessons = [];
      const priorityLessons = [];

      Object.values(lessonPerformance).forEach(perf => {
        const accuracy = (perf.correct / perf.questions_attempted) * 100;
        const avgTime = perf.total_time_spent / perf.questions_attempted;

        // Determine if this is a weak area (< 70% accuracy)
        const isWeak = accuracy < 70;

        // Calculate priority level (1-5, where 5 is highest priority)
        let priority = 0;
        if (isWeak) {
          if (accuracy < 40) priority = 5;
          else if (accuracy < 50) priority = 4;
          else if (accuracy < 60) priority = 3;
          else if (accuracy < 70) priority = 2;
          else priority = 1;
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
        }
      });

      // Sort by priority (highest first)
      lessonBreakdown.sort((a, b) => b.priority - a.priority);
      priorityLessons.sort((a, b) => b.priority - a.priority);

      // 5. Calculate section scores
      const sectionScores = {
        english: 0,
        math: 0,
        reading: 0,
        science: 0
      };

      results.forEach(result => {
        const section = result.question?.section;
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
        priority_lessons: priorityLessons,
        recommended_study_time_weeks: recommendedWeeks,
        estimated_improvement_potential: improvementPotential
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
