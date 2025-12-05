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
    console.log('🔄 Processing practice test results...');
    setProcessingStep('Saving your answers...');
    setProcessingProgress(10);

    // Flatten all question results from all sections
    const allQuestionResults = [];
    allSections.forEach(sectionResult => {
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

    console.log(`📊 Processing ${allQuestionResults.length} total answers across ${allSections.length} sections`);

    setProcessingProgress(20);
    setProcessingStep('Creating test session...');

    // Create practice test session
    const totalQuestions = allQuestionResults.length;
    const correctAnswers = allQuestionResults.filter(q => q.isCorrect).length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    const session = await PracticeTestsService.createPracticeTestSession(
      userId,
      testNumber,
      'full', // full test (all sections)
      totalQuestions
    );

    if (!session) {
      throw new Error('Failed to create practice test session');
    }

    const sessionId = session.id;
    console.log(`✅ Created session: ${sessionId}`);

    setProcessingProgress(40);
    setProcessingStep('Saving your answers...');

    // Save all answers to database
    let savedCount = 0;
    for (const question of allQuestionResults) {
      await PracticeTestsService.savePracticeTestAnswer(
        userId,
        sessionId,
        question.section,
        question.questionId,
        question.selectedAnswer,
        question.isCorrect,
        question.timeSpent || 0
      );
      savedCount++;

      // Update progress periodically
      if (savedCount % 20 === 0) {
        const progress = 40 + Math.floor((savedCount / allQuestionResults.length) * 30);
        setProcessingProgress(progress);
      }
    }

    console.log(`✅ Saved ${savedCount} answers`);

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

    setProcessingProgress(100);
    setProcessingStep('Complete!');

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
