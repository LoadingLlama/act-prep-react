/**
 * Practice Test Result Processor Service
 * Handles processing of practice test results including saving answers and analyzing performance
 * Similar to diagnostic processor but WITHOUT learning path generation
 */

import PracticeTestsService from '../api/practiceTests.service';
import { supabase } from '../api/supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

/**
 * Process practice test results in background
 * @param {Array} allSections - All test sections with questions and answers
 * @param {number} testNumber - Practice test number
 * @param {string} userId - User ID
 * @param {object} callbacks - State setter callbacks
 * @param {function} callbacks.setProcessingStep - Set processing step message
 * @param {function} callbacks.setProcessingProgress - Set processing progress (0-100)
 * @param {function} callbacks.setProcessing - Set processing state
 * @param {function} callbacks.setShowResults - Set show results state
 * @returns {Promise<{sessionId: string, results: object}>}
 */
export async function processPracticeTestResults(
  allSections,
  testNumber,
  userId,
  callbacks
) {
  const {
    setProcessingStep,
    setProcessingProgress,
    setProcessing,
    setShowResults
  } = callbacks;

  try {
    console.log('\n' + '='.repeat(80));
    console.log('🔄 PRACTICE TEST RESULT PROCESSOR STARTED');
    console.log('='.repeat(80));
    console.log('Test Number:', testNumber);
    console.log('User ID:', userId);
    console.log('Sections Received:', allSections.length);

    setProcessingStep('Saving your answers...');
    setProcessingProgress(10);

    // Flatten all question results from all sections
    const allQuestionResults = [];
    allSections.forEach((sectionResult, idx) => {
      console.log(`\n📦 Processing section ${idx + 1}/${allSections.length}: ${sectionResult.section}`);
      console.log(`   Questions in section: ${sectionResult.questions.length}`);

      sectionResult.questions.forEach(q => {
        allQuestionResults.push({
          ...q,
          section: sectionResult.section
        });
      });
    });

    // Verify we have results
    if (allQuestionResults.length === 0) {
      throw new Error('No question results found');
    }

    console.log(`\n✅ FLATTENED RESULTS:`);
    console.log(`   Total answers: ${allQuestionResults.length}`);
    console.log(`   Sections: ${allSections.length}`);

    // Validate data structure
    const sampleQuestion = allQuestionResults[0];
    console.log(`\n🔍 SAMPLE QUESTION VALIDATION:`);
    console.log(`   Has questionId: ${!!sampleQuestion.questionId}`);
    console.log(`   Has userAnswer: ${'userAnswer' in sampleQuestion}`);
    console.log(`   Has isCorrect: ${'isCorrect' in sampleQuestion}`);
    console.log(`   Has section: ${!!sampleQuestion.section}`);
    console.log(`   Sample:`, {
      questionId: sampleQuestion.questionId,
      section: sampleQuestion.section,
      userAnswer: sampleQuestion.userAnswer,
      isCorrect: sampleQuestion.isCorrect
    });

    setProcessingProgress(20);
    setProcessingStep('Creating test session...');

    // Create practice test session
    const totalQuestions = allQuestionResults.length;
    const correctAnswers = allQuestionResults.filter(q => q.isCorrect).length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    console.log(`\n📝 CREATING SESSION:`);
    console.log(`   User ID: ${userId}`);
    console.log(`   Test Number: ${testNumber}`);
    console.log(`   Total Questions: ${totalQuestions}`);
    console.log(`   Correct Answers: ${correctAnswers}`);
    console.log(`   Score: ${scorePercentage.toFixed(2)}%`);

    const session = await PracticeTestsService.createPracticeTestSession(
      userId,
      testNumber,
      'full', // full test (all sections)
      totalQuestions
    );

    if (!session) {
      console.error('❌ SESSION CREATION FAILED!');
      throw new Error('Failed to create practice test session');
    }

    const sessionId = session.id;
    console.log(`✅ Session created successfully: ${sessionId}`);

    setProcessingProgress(40);
    setProcessingStep('Saving your answers...');

    // Save all answers to database in BATCH (like diagnostic)
    console.log(`\n💾 PREPARING BATCH INSERT FOR ALL ANSWERS:`);

    const answersToSave = allQuestionResults.map(question => ({
      practice_session_id: sessionId,
      user_id: userId,
      question_id: question.questionId,
      section: question.section,
      user_answer: question.userAnswer,
      correct_answer: question.correctAnswer,
      is_correct: question.isCorrect,
      time_spent: question.timeSpent || 0,
      created_at: new Date().toISOString()
    }));

    console.log(`   Total answers to save: ${answersToSave.length}`);
    console.log(`   Sample answer:`, answersToSave[0]);

    setProcessingStep('Saving all answers in batch...');

    const { data: savedAnswers, error: batchError } = await supabase
      .from('practice_test_results')
      .upsert(answersToSave, {
        onConflict: 'practice_session_id,question_id',
        ignoreDuplicates: false
      })
      .select('id');

    if (batchError) {
      console.error('❌ Batch insert failed:', batchError);
      throw new Error(`Failed to save answers: ${batchError.message}`);
    }

    const savedCount = savedAnswers?.length || 0;
    const failedCount = answersToSave.length - savedCount;

    console.log(`\n📊 BATCH SAVE RESULTS:`);
    console.log(`   ✅ Saved: ${savedCount}/${answersToSave.length}`);
    console.log(`   ❌ Failed: ${failedCount}`);

    if (savedCount !== answersToSave.length) {
      console.warn(`⚠️ WARNING: Expected ${answersToSave.length} saves but got ${savedCount}`);
    } else {
      console.log(`✅✅✅ SUCCESS: ALL ${savedCount} ANSWERS SAVED! ✅✅✅`);
    }

    setProcessingProgress(75);
    setProcessingStep('Calculating your scores...');

    // Complete the session with final scores
    await PracticeTestsService.completePracticeTestSession(
      sessionId,
      correctAnswers,
      scorePercentage
    );

    console.log(`✅ Session completed - Score: ${scorePercentage.toFixed(1)}%`);

    setProcessingProgress(90);
    setProcessingStep('Analyzing your performance...');

    // Calculate section-specific scores for insights
    const sectionScores = {};
    allSections.forEach(sectionResult => {
      const sectionTotal = sectionResult.questions.length;
      const sectionCorrect = sectionResult.questions.filter(q => q.isCorrect).length;
      sectionScores[sectionResult.section] = {
        correct: sectionCorrect,
        total: sectionTotal,
        percentage: (sectionCorrect / sectionTotal) * 100
      };
    });

    const results = {
      sessionId,
      testNumber,
      totalQuestions,
      correctAnswers,
      scorePercentage,
      sectionScores,
      allSections // Keep for review mode
    };

    // Store results for review mode
    sessionStorage.setItem(`practiceTestSession_${sessionId}`, JSON.stringify(results));

    // CRITICAL: Clear insights cache so practice test appears in list
    console.log('\n🗑️ CLEARING CACHE:');
    let clearedCount = 0;
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('practice_tests_') ||
          key.startsWith('insights_') ||
          key.startsWith('weak_areas_')) {
        sessionStorage.removeItem(key);
        console.log(`   Cleared: ${key}`);
        clearedCount++;
      }
    });
    console.log(`   Total cache keys cleared: ${clearedCount}`);

    setProcessingProgress(100);
    setProcessingStep('Complete!');

    console.log('\n' + '='.repeat(80));
    console.log('✅ PRACTICE TEST PROCESSING COMPLETE');
    console.log('='.repeat(80));
    console.log('Session ID:', sessionId);
    console.log('Test Number:', testNumber);
    console.log('Score:', scorePercentage.toFixed(2) + '%');
    console.log('Total Answers:', savedCount);
    console.log('Failed:', failedCount);
    console.log('Cache Cleared:', clearedCount, 'keys');
    console.log('='.repeat(80) + '\n');

    // Small delay before showing results
    await new Promise(resolve => setTimeout(resolve, 500));

    setProcessing(false);
    setShowResults(true);

    logger.info('PracticeTestResultProcessor', 'processingComplete', {
      sessionId,
      testNumber,
      scorePercentage: scorePercentage.toFixed(2)
    });

    return results;

  } catch (error) {
    console.error('❌ Error processing practice test results:', error);
    errorTracker.trackError('PracticeTestResultProcessor', 'processPracticeTestResults', {
      testNumber,
      userId
    }, error);

    setProcessing(false);
    throw error;
  }
}
