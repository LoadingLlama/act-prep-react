/**
 * Diagnostic Result Processor Service
 * Handles processing of diagnostic test results including saving answers,
 * analyzing performance, and generating personalized learning paths
 */

import DiagnosticService from '../api/diagnostic.service';
import DiagnosticAnalysisService from '../api/diagnostic-analysis.service';
import LearningPathService from '../api/learning-path.service';
import { supabase } from '../api/supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';
import { getUserGoals } from '../../utils/diagnostic/userGoalsHelpers';

/**
 * Process diagnostic test results in background
 * @param {Array} allSections - All test sections with questions and answers
 * @param {string} sessionId - Diagnostic session ID
 * @param {string} userId - User ID
 * @param {object} onboardingData - User's onboarding data
 * @param {object} callbacks - State setter callbacks
 * @param {function} callbacks.setProcessingStep - Set processing step message
 * @param {function} callbacks.setProcessingProgress - Set processing progress (0-100)
 * @param {function} callbacks.setAnalysisData - Set analysis data
 * @param {function} callbacks.setUserGoalsData - Set user goals data
 * @param {function} callbacks.setLearningPathData - Set learning path data
 * @param {function} callbacks.setProcessing - Set processing state
 * @param {function} callbacks.setShowResults - Set show results state
 * @returns {Promise<void>}
 */
export async function processTestResultsInBackground(
  allSections,
  sessionId,
  userId,
  onboardingData,
  callbacks
) {
  const {
    setProcessingStep,
    setProcessingProgress,
    setAnalysisData,
    setUserGoalsData,
    setLearningPathData,
    setProcessing,
    setShowResults
  } = callbacks;

  try {
    console.log('🔄 Processing started...');
    setProcessingStep('Loading your test questions...');
    setProcessingProgress(5);

    // Load all questions from all sections for review
    console.log('📚 Loading all questions from all sections for review...');
    const allDiagnosticQuestions = await DiagnosticService.getDiagnosticQuestions(); // Gets all sections
    console.log('✅ Loaded all diagnostic questions:', allDiagnosticQuestions.length);
    setProcessingProgress(20);
    setProcessingStep('Preparing to save your answers...');

    // Flatten all question results from all sections
    // CRITICAL: Preserve section information for each question
    const allQuestionResults = [];
    allSections.forEach(sectionResult => {
      sectionResult.questions.forEach(q => {
        allQuestionResults.push({
          ...q,
          section: sectionResult.section  // Add section to each question
        });
      });
    });

    // Verify section distribution
    const questionsBySection = allQuestionResults.reduce((acc, q) => {
      acc[q.section] = (acc[q.section] || 0) + 1;
      return acc;
    }, {});
    console.log('📊 Questions by section before saving:', questionsBySection);

    logger.info('DiagnosticResultProcessor', 'savingAnswers', {
      totalAnswers: allQuestionResults.length
    });

    setProcessingProgress(25);

    // Calculate final scores
    setProcessingProgress(45);
    setProcessingStep('Calculating your scores...');

    const totalQuestions = allQuestionResults.length;
    const correctAnswers = allQuestionResults.filter(q => q.isCorrect).length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    logger.info('DiagnosticResultProcessor', 'completingSession', {
      correctAnswers,
      totalQuestions,
      scorePercentage: scorePercentage.toFixed(2)
    });

    console.log('✅ Question results saved. Completing session...');
    setProcessingProgress(55);

    // Complete diagnostic session
    await DiagnosticService.completeDiagnosticSession(
      sessionId,
      correctAnswers,
      scorePercentage
    );

    console.log('✅ Session completed. Saving user goals...');
    setProcessingStep('Saving your study preferences...');
    setProcessingProgress(65);

    // Save user goals from onboarding data
    logger.info('DiagnosticResultProcessor', 'savingUserGoals', { userId });

    // Calculate study metrics from individual day hours
    let totalWeeklyHours, studyDaysCount, avgDailyMinutes;

    if (onboardingData.use_alternating_weeks) {
      // Calculate average across both weeks
      const week1Hours = Object.values(onboardingData.study_hours);
      const week2Hours = Object.values(onboardingData.study_hours_week2);
      const totalWeek1 = week1Hours.reduce((sum, hours) => sum + hours, 0);
      const totalWeek2 = week2Hours.reduce((sum, hours) => sum + hours, 0);
      totalWeeklyHours = (totalWeek1 + totalWeek2) / 2; // Average of two weeks

      const week1Days = week1Hours.filter(hours => hours > 0).length;
      const week2Days = week2Hours.filter(hours => hours > 0).length;
      studyDaysCount = Math.round((week1Days + week2Days) / 2);

      avgDailyMinutes = studyDaysCount > 0 ? Math.round((totalWeeklyHours / studyDaysCount) * 60) : 0;
    } else {
      // Single week schedule
      const studyHours = Object.values(onboardingData.study_hours);
      totalWeeklyHours = studyHours.reduce((sum, hours) => sum + hours, 0);
      studyDaysCount = studyHours.filter(hours => hours > 0).length;
      avgDailyMinutes = studyDaysCount > 0 ? Math.round((totalWeeklyHours / studyDaysCount) * 60) : 0;
    }

    // Default to 12 weeks (84 days) if no exam date is set
    const defaultExamDate = new Date();
    defaultExamDate.setDate(defaultExamDate.getDate() + 84); // 12 weeks = 84 days

    const userGoalsData = {
      user_id: userId,
      target_exam_date: onboardingData.target_exam_date || defaultExamDate.toISOString().split('T')[0],
      current_score: onboardingData.current_score ? parseInt(onboardingData.current_score) : null,
      target_score: onboardingData.target_score,
      daily_study_minutes: avgDailyMinutes,
      study_days_per_week: studyDaysCount,
      study_hours: onboardingData.study_hours,
      study_hours_week2: onboardingData.study_hours_week2,
      use_alternating_weeks: onboardingData.use_alternating_weeks || false,
      review_day: onboardingData.review_day,
      mock_exam_day: onboardingData.mock_exam_day,
      weekly_hours_tier: onboardingData.weekly_hours_tier || 'moderate',
      updated_at: new Date().toISOString()
    };

    console.log('💾 Saving user goals from onboarding:', {
      target_exam_date: userGoalsData.target_exam_date,
      target_score: userGoalsData.target_score,
      daily_study_minutes: userGoalsData.daily_study_minutes,
      study_days_per_week: userGoalsData.study_days_per_week,
      study_hours: userGoalsData.study_hours,
      study_hours_week2: userGoalsData.study_hours_week2,
      use_alternating_weeks: userGoalsData.use_alternating_weeks,
      review_day: userGoalsData.review_day,
      mock_exam_day: userGoalsData.mock_exam_day
    });

    await supabase
      .from('user_goals')
      .upsert(userGoalsData, {
        onConflict: 'user_id'
      });

    logger.info('DiagnosticResultProcessor', 'userGoalsSaved', { userId });

    setProcessingStep('Saving your test results...');
    setProcessingProgress(70);

    // Save each question result to diagnostic_test_results table (deduplicated)
    // Remove duplicates by section + question number (e.g., "english:1", "math:1")
    const uniqueResults = [];
    const seenQuestions = new Set();

    allQuestionResults.forEach(result => {
      const uniqueKey = `${result.section}:${result.questionNum}`;
      if (!seenQuestions.has(uniqueKey)) {
        seenQuestions.add(uniqueKey);
        uniqueResults.push(result);
      }
    });

    console.log('💾 Saving', uniqueResults.length, 'unique question results to database (removed', allQuestionResults.length - uniqueResults.length, 'duplicates)');
    logger.info('DiagnosticResultProcessor', 'savingResults', { sessionId, resultsCount: uniqueResults.length, duplicatesRemoved: allQuestionResults.length - uniqueResults.length });

    // VALIDATION: Count expected questions per section
    const expectedCounts = {
      english: uniqueResults.filter(r => r.section === 'english').length,
      math: uniqueResults.filter(r => r.section === 'math').length,
      reading: uniqueResults.filter(r => r.section === 'reading').length,
      science: uniqueResults.filter(r => r.section === 'science').length
    };

    console.log('\n📋 EXPECTED QUESTION COUNTS BY SECTION:');
    console.log(`  English:  ${expectedCounts.english} questions (should be ~75)`);
    console.log(`  Math:     ${expectedCounts.math} questions (should be ~60)`);
    console.log(`  Reading:  ${expectedCounts.reading} questions (should be ~40)`);
    console.log(`  Science:  ${expectedCounts.science} questions (should be ~40)`);
    console.log(`  TOTAL:    ${uniqueResults.length} questions (should be 215)\n`);

    if (uniqueResults.length !== 215) {
      console.warn(`⚠️  WARNING: Expected 215 questions but got ${uniqueResults.length}!`);
    }

    // Create efficient lookup map: section:questionNum -> question
    const questionLookup = new Map();
    allDiagnosticQuestions.forEach(q => {
      const key = `${q.section}:${q.question_number}`;
      questionLookup.set(key, q);
    });

    console.log(`📚 Question lookup map created: ${questionLookup.size} entries`);
    console.log('📋 Sample lookup keys:', Array.from(questionLookup.keys()).slice(0, 10).join(', '));

    // Track saving statistics by section
    const saveStats = {
      english: { attempted: 0, saved: 0, failed: 0, questionNumbers: [] },
      math: { attempted: 0, saved: 0, failed: 0, questionNumbers: [] },
      reading: { attempted: 0, saved: 0, failed: 0, questionNumbers: [] },
      science: { attempted: 0, saved: 0, failed: 0, questionNumbers: [] }
    };

    // Save each question result
    console.log('\n💾 Starting to save answers to database...\n');

    let progressCounter = 0;
    for (const result of uniqueResults) {
      const section = result.section;

      if (!section) {
        console.error('❌ CRITICAL: Result missing section!', result);
        continue;
      }

      saveStats[section].attempted++;

      // Look up question using section:questionNum key
      const lookupKey = `${section}:${result.questionNum}`;
      const question = questionLookup.get(lookupKey);

      if (!question?.id) {
        console.error(`❌ Question not found - Key: ${lookupKey}`, result);
        saveStats[section].failed++;
        continue;
      }

      try {
        const saveResult = await DiagnosticService.saveDiagnosticAnswer(
          userId,
          sessionId,
          question.id,
          result.userAnswer,
          result.isCorrect,
          result.timeSpent || 0
        );

        if (saveResult === null) {
          console.error(`❌ Failed to save answer for ${lookupKey}`);
          saveStats[section].failed++;
        } else {
          saveStats[section].saved++;
          saveStats[section].questionNumbers.push(result.questionNum);
        }
      } catch (error) {
        console.error(`❌ Exception saving answer for ${lookupKey}:`, error);
        saveStats[section].failed++;
      }

      // Progress logging every 50 questions
      progressCounter++;
      if (progressCounter % 50 === 0) {
        const totalSoFar = Object.values(saveStats).reduce((sum, s) => sum + s.saved, 0);
        console.log(`📊 Progress: ${totalSoFar}/${uniqueResults.length} questions saved (${((totalSoFar/uniqueResults.length)*100).toFixed(1)}%)`);
      }
    }

    // Log final statistics
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📊 FINAL SAVE STATISTICS BY SECTION');
    console.log('═══════════════════════════════════════════════════════\n');

    Object.keys(saveStats).forEach(section => {
      const stats = saveStats[section];
      if (stats.attempted > 0) {
        const sectionName = section.toUpperCase();
        const percentage = ((stats.saved / stats.attempted) * 100).toFixed(1);
        console.log(`${sectionName}:`);
        console.log(`  Attempted: ${stats.attempted}`);
        console.log(`  Saved:     ${stats.saved} (${percentage}%)`);
        console.log(`  Failed:    ${stats.failed}`);

        // Show question number ranges
        if (stats.questionNumbers.length > 0) {
          const sortedQs = stats.questionNumbers.sort((a, b) => a - b);
          const ranges = [];
          let rangeStart = sortedQs[0];
          let rangeEnd = sortedQs[0];

          for (let i = 1; i < sortedQs.length; i++) {
            if (sortedQs[i] === rangeEnd + 1) {
              rangeEnd = sortedQs[i];
            } else {
              ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
              rangeStart = sortedQs[i];
              rangeEnd = sortedQs[i];
            }
          }
          ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);

          console.log(`  Questions: ${ranges.join(', ')}`);
        }
        console.log();
      }
    });

    const totalSaved = Object.values(saveStats).reduce((sum, s) => sum + s.saved, 0);
    const totalFailed = Object.values(saveStats).reduce((sum, s) => sum + s.failed, 0);
    const totalPercentage = ((totalSaved / uniqueResults.length) * 100).toFixed(1);

    console.log('═══════════════════════════════════════════════════════');
    console.log(`TOTAL: ${totalSaved}/${uniqueResults.length} saved (${totalPercentage}%)`);
    console.log('═══════════════════════════════════════════════════════\n');

    if (totalSaved === 215) {
      console.log('✅✅✅ SUCCESS: ALL 215 QUESTIONS SAVED TO DATABASE! ✅✅✅\n');
    } else if (totalSaved >= 200) {
      console.log(`✅ GOOD: ${totalSaved} questions saved (${215 - totalSaved} missing)\n`);
    } else {
      console.warn(`⚠️  WARNING: Only ${totalSaved}/215 questions saved!\n`);
    }

    if (totalFailed > 0) {
      console.error(`❌ CRITICAL: ${totalFailed} answers failed to save!`);
      throw new Error(`Failed to save ${totalFailed} diagnostic answers`);
    }

    console.log('✅ All question results saved to database successfully\n');

    setProcessingStep('Analyzing your performance across all sections...');
    setProcessingProgress(73);

    // Trigger diagnostic analysis algorithm (it will load results from DB)
    logger.info('DiagnosticResultProcessor', 'analyzingResults', { sessionId });
    const analysis = await DiagnosticAnalysisService.analyzeDiagnosticResults(
      userId,
      sessionId
      // No third parameter - let it load from diagnostic_test_results table
    );

    setProcessingProgress(75);
    setProcessingStep('Identifying your strengths and weaknesses...');

    logger.info('DiagnosticResultProcessor', 'analysisComplete', {
      weakLessons: analysis.weak_lessons?.length || 0,
      overallScore: analysis.overall_score
    });

    setProcessingProgress(80);

    // Get user goals from onboarding data
    const userGoals = await getUserGoals(userId);

    // Merge onboarding data with user goals to ensure all new fields are included
    const mergedGoals = {
      ...userGoals,
      review_day: userGoals.review_day || onboardingData.review_day,
      mock_exam_day: userGoals.mock_exam_day || onboardingData.mock_exam_day,
      study_hours: userGoals.study_hours || onboardingData.study_hours,
      study_hours_week2: userGoals.study_hours_week2 || onboardingData.study_hours_week2,
      use_alternating_weeks: userGoals.use_alternating_weeks || onboardingData.use_alternating_weeks
    };

    console.log('🎯 User goals for learning path generation:', {
      target_score: mergedGoals.target_score,
      daily_study_minutes: mergedGoals.daily_study_minutes,
      study_days_per_week: mergedGoals.study_days_per_week,
      exam_date: mergedGoals.exam_date,
      review_day: mergedGoals.review_day,
      mock_exam_day: mergedGoals.mock_exam_day,
      study_hours: mergedGoals.study_hours,
      use_alternating_weeks: mergedGoals.use_alternating_weeks
    });

    console.log('📊 Diagnostic analysis for learning path:', {
      overall_score: analysis.overall_score,
      weak_lessons_count: analysis.weak_lessons?.length || 0,
      strong_lessons_count: analysis.strong_lessons?.length || 0,
      weak_sections: analysis.weak_sections || []
    });

    setProcessingStep('Creating your personalized learning path...');
    setProcessingProgress(85);

    // Generate personalized learning path
    logger.info('DiagnosticResultProcessor', 'generatingLearningPath', { userId });
    const learningPath = await LearningPathService.generateLearningPath(
      userId,
      mergedGoals,
      analysis
    );

    logger.info('DiagnosticResultProcessor', 'learningPathComplete', {
      pathId: learningPath.id,
      itemsCount: learningPath.items?.length || 0
    });

    console.log('✨ Learning path generated successfully:', {
      pathId: learningPath.id,
      totalItems: learningPath.items?.length || 0,
      schedule: learningPath.schedule
    });

    // Mark diagnostic as completed in profile to unlock learning path
    console.log('🔓 Marking diagnostic test as completed to unlock learning path...');
    await supabase
      .from('profiles')
      .update({
        diagnostic_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    console.log('✅ Diagnostic test completed - Learning path is now unlocked!');

    setProcessingStep('Finalizing your results...');
    setProcessingProgress(95);

    // Store insights data with full question details
    console.log('📊 Processing complete. Preparing results...');

    console.log('📚 Learning path generated with items:', {
      pathId: learningPath.id,
      itemsCount: learningPath.items?.length || 0,
      hasItems: !!learningPath.items
    });

    // Store analysis, user goals, and learning path data for results screen
    setAnalysisData(analysis);
    setUserGoalsData(mergedGoals);
    setLearningPathData(learningPath);

    // Clean up sessionStorage
    sessionStorage.removeItem('diagnosticSessionId');
    sessionStorage.removeItem('practiceTestQuestions');
    sessionStorage.removeItem('practiceTestResults');

    console.log('✅ All processing completed successfully!');

    // Clear processing flag and show results
    localStorage.removeItem('diagnosticProcessing');

    // Clear session storage caches to force data refresh
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('diagnostic_completed_') || key.startsWith('insights_') || key.startsWith('learning_path_')) {
        sessionStorage.removeItem(key);
        console.log('🗑️ Cleared cache:', key);
      }
    });

    setProcessingProgress(100);
    setProcessing(false);
    setShowResults(true);
  } catch (err) {
    console.error('❌ Error in background processing:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      sessionId,
      userId
    });
    errorTracker.trackError('DiagnosticResultProcessor', 'processTestResultsInBackground', { sessionId }, err);

    // Clear processing flag and caches even on error
    localStorage.removeItem('diagnosticProcessing');
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('diagnostic_completed_') || key.startsWith('insights_') || key.startsWith('learning_path_')) {
        sessionStorage.removeItem(key);
      }
    });
    // Don't set error state since user has already navigated away
  }
}
