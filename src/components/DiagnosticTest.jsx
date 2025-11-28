/**
 * Diagnostic Test Component
 * Displays the diagnostic test using the same interface as practice tests
 * Integrates with adaptive learning algorithm for personalized recommendations
 */

import React, { useState, useEffect, useRef } from 'react';
import { HiXMark, HiArrowRight } from 'react-icons/hi2';
import { usePracticeTestStyles } from '../styles/pages/practice-test.styles';
import DiagnosticService from '../services/api/diagnostic.service';
import DiagnosticAnalysisService from '../services/api/diagnostic-analysis.service';
import LearningPathService from '../services/api/learning-path.service';
import { supabase } from '../services/api/supabase.service';
import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';
import { convertDiagnosticToACT, getPerformanceLevel } from '../utils/actScoreConversion';
import { transformOnboardingToGoals, getUserGoals } from '../utils/diagnostic/userGoalsHelpers';
import DiagnosticInsightsModal from './diagnostic/DiagnosticInsightsModal';

const DiagnosticTest = ({ onClose }) => {
  const classes = usePracticeTestStyles();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]); // Current section questions
  const [testStarted, setTestStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentSection, setCurrentSection] = useState('english'); // Track current section
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [userGoalsData, setUserGoalsData] = useState(null);
  const [learningPathData, setLearningPathData] = useState(null);
  const [onboardingData, setOnboardingData] = useState({
    target_exam_date: '',
    current_score: '',
    target_score: 34,
    use_alternating_weeks: false,
    study_hours: {
      monday: 1,
      tuesday: 1,
      wednesday: 1,
      thursday: 1,
      friday: 1,
      saturday: 3,
      sunday: 2
    },
    study_hours_week2: {
      monday: 1,
      tuesday: 1,
      wednesday: 1,
      thursday: 1,
      friday: 1,
      saturday: 3,
      sunday: 2
    },
    weakest_section: '',
    review_day: 'sunday',
    mock_exam_day: 'saturday',
    weekly_hours_tier: 'moderate'
  });
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const [confirmStart, setConfirmStart] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showInsights, setShowInsights] = useState(false);
  const [insightsData, setInsightsData] = useState(null);

  // Ref for iframe to send messages
  const iframeRef = useRef(null);

  // Countdown timer effect
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      // Hide countdown and start the test
      setShowCountdown(false);
      if (!testStarted) {
        beginDiagnosticTest();
      }
    }
  }, [showCountdown, countdown, testStarted]);

  // Section configurations
  const sectionConfig = {
    english: {
      name: 'English',
      emoji: '📝',
      timeMinutes: 45,
      description: '75 questions covering grammar, punctuation, and rhetorical skills',
      nextSection: 'math'
    },
    math: {
      name: 'Mathematics',
      emoji: '🔢',
      timeMinutes: 60,
      description: '60 questions covering algebra, geometry, and trigonometry',
      nextSection: 'reading'
    },
    reading: {
      name: 'Reading',
      emoji: '📖',
      timeMinutes: 35,
      description: '40 questions across 4 passages',
      nextSection: 'science'
    },
    science: {
      name: 'Science',
      emoji: '🔬',
      timeMinutes: 35,
      description: '40 questions testing scientific reasoning',
      nextSection: null // Last section
    }
  };

  // Verify user on mount only
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        setError('You must be logged in to take the diagnostic test.');
      }
      setLoading(false);
    };
    getCurrentUser();
  }, []);

  /**
   * Load questions for a specific section
   */
  const loadSectionQuestions = async (section) => {
    try {
      setLoading(true);
      setError(null);

      logger.info('DiagnosticTest', 'loadSectionQuestions', { section });

      const sectionQuestions = await DiagnosticService.getDiagnosticQuestions(section);

      if (!sectionQuestions || sectionQuestions.length === 0) {
        throw new Error(`No ${section} questions found`);
      }

      console.log(`✅ Loaded ${section} section:`, {
        count: sectionQuestions.length,
        questionNumbers: sectionQuestions.map(q => q.question_number).join(', '),
        fromTest: 'Practice Test #1 (Diagnostic)'
      });

      // Questions are already in the correct format from the service
      setQuestions(sectionQuestions);
      setCurrentSection(section);

      logger.info('DiagnosticTest', 'loadSectionQuestions', {
        section,
        count: sectionQuestions.length
      });

    } catch (err) {
      console.error(`Error loading ${section} questions:`, err);
      errorTracker.trackError(
        'DiagnosticTest',
        'loadSectionQuestions',
        { section },
        err
      );
      setError(`Failed to load ${section} section. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Start the diagnostic test
   * Creates a diagnostic session before loading the test
   */
  /**
   * Save onboarding data - just move to intro screen without persisting
   * Data will be saved when test is completed
   */
  const saveOnboardingData = async () => {
    try {
      console.log('📝 Onboarding data collected (will save after test completion)');
      setHasCompletedOnboarding(true);
      setShowOnboarding(false);

      // Show intro screen before starting test
      setShowIntro(true);
    } catch (error) {
      console.error('Error processing onboarding:', error);
      logger.error('DiagnosticTest', 'saveOnboardingDataFailed', { error: error.message });
      setError(`Failed to process your information: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

  /**
   * Begin diagnostic test - starts with English section
   */
  const beginDiagnosticTest = async () => {
    try {
      logger.info('DiagnosticTest', 'beginDiagnosticTest', { userId });

      console.log('📝 Creating diagnostic session in database...');

      // Create actual diagnostic session in database to get proper UUID
      const session = await DiagnosticService.createDiagnosticSession(
        userId,
        'full', // All sections
        215 // Total questions (75 English + 60 Math + 40 Reading + 40 Science)
      );

      if (!session || !session.id) {
        throw new Error('Failed to create diagnostic session');
      }

      console.log('✅ Diagnostic session created:', session.id);
      setSessionId(session.id);
      sessionStorage.setItem('diagnosticSessionId', session.id);

      // Load English section first
      await loadSectionQuestions('english');
      setTestStarted(true);

      logger.info('DiagnosticTest', 'testStarted', { sessionId: session.id, section: 'english' });

    } catch (error) {
      logger.error('DiagnosticTest', 'beginDiagnosticTestFailed', { error });
      setError(error.message || 'Failed to start the diagnostic test');
    }
  };

  /**
   * Store current section questions in sessionStorage when they change
   */
  useEffect(() => {
    if (testStarted && questions.length > 0 && currentSection) {
      const duration = sectionConfig[currentSection]?.timeMinutes || 45;

      sessionStorage.setItem('practiceTestQuestions', JSON.stringify(questions));
      sessionStorage.setItem('practiceTestSection', currentSection);
      sessionStorage.setItem('practiceTestNumber', 'diagnostic');
      sessionStorage.setItem('practiceTestDuration', duration);

      console.log('📦 Storing section in sessionStorage:', {
        section: currentSection,
        questionsCount: questions.length,
        duration
      });

      // Tell iframe to reload questions from sessionStorage
      // (Skip for initial English load - iframe will load on its own)
      if (currentSection !== 'english' && iframeRef.current?.contentWindow) {
        console.log('📤 Sending LOAD_NEXT_SECTION message to iframe:', {
          section: currentSection,
          questionsCount: questions.length,
          iframeExists: !!iframeRef.current,
          contentWindowExists: !!iframeRef.current?.contentWindow
        });

        // Add small delay to ensure sessionStorage is fully written
        setTimeout(() => {
          iframeRef.current.contentWindow.postMessage({
            type: 'LOAD_NEXT_SECTION'
          }, '*');
          console.log('✅ LOAD_NEXT_SECTION message sent');
        }, 100);
      } else {
        console.log('⏭️ Skipping LOAD_NEXT_SECTION (English section or iframe not ready):', {
          currentSection,
          isEnglish: currentSection === 'english',
          iframeExists: !!iframeRef.current,
          contentWindowExists: !!iframeRef.current?.contentWindow
        });
      }
    }
  }, [testStarted, questions, currentSection]);

  /**
   * Handle "Begin Diagnostic Test" button click
   */
  const startTest = async () => {
    // Check if user needs to complete onboarding first
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
      return;
    }

    // Otherwise, start test directly
    await beginDiagnosticTest();
  };

  // Listen for section completion and test completion messages from iframe
  useEffect(() => {
    const handleMessage = async (event) => {
      console.log('📨 Diagnostic Test Message received:', event.data);

      if (event.data?.type === 'PRACTICE_TEST_NEXT_SECTION') {
        // Move to next section
        const nextSection = sectionConfig[currentSection]?.nextSection;
        console.log(`🔄 Moving to next section: ${currentSection} → ${nextSection}`);

        if (nextSection) {
          logger.info('DiagnosticTest', 'loadingNextSection', { nextSection });
          await loadSectionQuestions(nextSection);
        } else {
          console.log('✅ All sections complete - processing results');
          await handleTestCompletion();
        }
      } else if (event.data?.type === 'PRACTICE_TEST_COMPLETE') {
        console.log('✅ Diagnostic test complete - processing results');
        await handleTestCompletion();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose, sessionId, userId, questions, currentSection]);

  /**
   * Check onboarding and auto-show it if not completed
   */
  useEffect(() => {
    if (userId && !testStarted && !loading) {
      const checkOnboarding = async () => {
        const { data: goals } = await supabase
          .from('user_goals')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (goals) {
          // User has completed onboarding before
          setHasCompletedOnboarding(true);
          // Pre-fill onboarding data if it exists
          setOnboardingData({
            target_exam_date: goals.target_exam_date || '',
            current_score: goals.current_score || '',
            target_score: goals.target_score || 28,
            use_alternating_weeks: false,
            study_hours: onboardingData.study_hours,
            study_hours_week2: onboardingData.study_hours_week2,
            weakest_section: goals.weakest_section || '',
            review_day: goals.review_day || 'sunday',
            mock_exam_day: goals.mock_exam_day || 'saturday'
          });
          // Show intro screen directly since they've done onboarding
          setShowIntro(true);
        } else {
          // No onboarding completed - show it immediately
          setHasCompletedOnboarding(false);
          setShowOnboarding(true);
        }
      };
      checkOnboarding();
    }
  }, [userId, testStarted, loading]);

  /**
   * Prevent scrolling on intro and onboarding screens
   */
  useEffect(() => {
    if (showIntro || showOnboarding) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [showIntro, showOnboarding]);

  /**
   * Process test results with progress updates
   */
  const processTestResultsInBackground = async (allSections) => {
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

      logger.info('DiagnosticTest', 'savingAnswers', {
        totalAnswers: allQuestionResults.length
      });

      setProcessingProgress(25);

      // Calculate final scores
      setProcessingProgress(45);
      setProcessingStep('Calculating your scores...');

      const totalQuestions = allQuestionResults.length;
      const correctAnswers = allQuestionResults.filter(q => q.isCorrect).length;
      const scorePercentage = (correctAnswers / totalQuestions) * 100;

      logger.info('DiagnosticTest', 'completingSession', {
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
      logger.info('DiagnosticTest', 'savingUserGoals', { userId });

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

      logger.info('DiagnosticTest', 'userGoalsSaved', { userId });

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
      logger.info('DiagnosticTest', 'savingResults', { sessionId, resultsCount: uniqueResults.length, duplicatesRemoved: allQuestionResults.length - uniqueResults.length });

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
      logger.info('DiagnosticTest', 'analyzingResults', { sessionId });
      const analysis = await DiagnosticAnalysisService.analyzeDiagnosticResults(
        userId,
        sessionId
        // No third parameter - let it load from diagnostic_test_results table
      );

      setProcessingProgress(75);
      setProcessingStep('Identifying your strengths and weaknesses...');

      logger.info('DiagnosticTest', 'analysisComplete', {
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
      logger.info('DiagnosticTest', 'generatingLearningPath', { userId });
      const learningPath = await LearningPathService.generateLearningPath(
        userId,
        mergedGoals,
        analysis
      );

      logger.info('DiagnosticTest', 'learningPathComplete', {
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
      errorTracker.trackError('DiagnosticTest', 'processTestResultsInBackground', { sessionId }, err);

      // Clear processing flag and caches even on error
      localStorage.removeItem('diagnosticProcessing');
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('diagnostic_completed_') || key.startsWith('insights_') || key.startsWith('learning_path_')) {
          sessionStorage.removeItem(key);
        }
      });
      // Don't set error state since user has already navigated away
    }
  };

  /**
   * Handle test completion
   * Keep modal open and process results with progress updates
   */
  const handleTestCompletion = async () => {
    try {
      logger.info('DiagnosticTest', 'handleTestCompletion', { sessionId, userId });

      // Get results from sessionStorage (set by practice-test.html)
      const resultsData = sessionStorage.getItem('practiceTestResults');
      if (!resultsData) {
        throw new Error('No test results found');
      }

      const results = JSON.parse(resultsData);
      const allSections = results.allSections || [];

      console.log('📊 Test complete! Processing results...');
      console.log('📦 Raw results from sessionStorage:', {
        hasAllSections: !!results.allSections,
        allSectionsCount: allSections.length,
        allSections: allSections.map(s => ({
          section: s.section,
          questionsCount: s.questions?.length || 0,
          correct: s.correct,
          total: s.total
        })),
        totalCorrect: results.totalCorrect,
        totalQuestions: results.totalQuestions
      });

      // Set localStorage flag to indicate processing has started
      localStorage.setItem('diagnosticProcessing', 'true');

      // Keep modal open and show processing screen
      setProcessing(true);
      setProcessingStep('Starting analysis...');
      setProcessingProgress(0);

      // Process results (NOT in background - keep modal open)
      await processTestResultsInBackground(allSections);

    } catch (err) {
      console.error('❌ Error processing test:', err);
      errorTracker.trackError('DiagnosticTest', 'handleTestCompletion', { sessionId }, err);
      setError(`Failed to process test results: ${err.message}`);
      setProcessing(false);
      localStorage.removeItem('diagnosticProcessing');
    }
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className={classes.container}>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner} />
          <div className={classes.loadingText}>Loading Diagnostic Test...</div>
        </div>
      </div>
    );
  }

  /**
   * Render processing screen with progress bar
   */
  if (processing) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'transparent'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '4px solid #fee2e2',
            borderTop: '4px solid #dc2626',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '2rem'
          }} />

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Analyzing Your Results
          </h2>

          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            {processingStep}
          </p>

          {/* Progress bar */}
          <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '8px',
            background: '#f3f4f6',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)',
              width: `${processingProgress}%`,
              transition: 'width 0.5s ease'
            }} />
          </div>

          <p style={{
            fontSize: '0.875rem',
            color: '#9ca3af',
            marginTop: '2rem',
            fontStyle: 'italic'
          }}>
            Please don't close this window...
          </p>
        </div>
      </div>
    );
  }

  /**
   * Render results screen with personalized learning path explanation
   */
  if (showResults && analysisData) {
    const weeksUntilExam = userGoalsData?.target_exam_date
      ? Math.ceil((new Date(userGoalsData.target_exam_date) - new Date()) / (1000 * 60 * 60 * 24 * 7))
      : 12; // Default to 12 weeks

    const isDefaultTimeline = !onboardingData?.target_exam_date;

    return (
      <div className={classes.container}>
        <div style={{
          padding: '2rem 1.5rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Success Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 1rem',
              background: '#dcfce7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '0.5rem'
            }}>
              Your Personalized Learning Path is Ready!
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              We've created a custom study plan based on your diagnostic test results.
            </p>
          </div>

          {/* Score Overview */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '1rem'
            }}>
              Your Performance
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.75rem'
            }}>
              <div style={{
                background: 'white',
                padding: '0.875rem',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#b91c1c' }}>
                  {analysisData.overall_score || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Overall
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '0.875rem',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>
                  {analysisData.english_score || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  English
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '0.875rem',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>
                  {analysisData.math_score || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Math
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '0.875rem',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>
                  {analysisData.reading_score || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Reading
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '0.875rem',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>
                  {analysisData.science_score || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Science
                </div>
              </div>
            </div>
          </div>

          {/* Learning Path Schedule Preview */}
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
            border: '2px solid #fee2e2',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '0.75rem'
            }}>
              Your Learning Plan
            </h3>

            {learningPathData && learningPathData.items && learningPathData.items.length > 0 ? (
              <div style={{
                fontSize: '0.95rem',
                color: '#374151',
                lineHeight: '1.6'
              }}>
                <p style={{ marginBottom: '1rem' }}>
                  We've created a <strong>{weeksUntilExam}-week personalized plan</strong> with <strong>{learningPathData.items.length} lessons and activities</strong>{isDefaultTimeline ? ' to help you master the material at your own pace.' : ` to reach your target score of ${userGoalsData?.target_score || 28}.`}
                </p>

                {analysisData.weak_lessons?.length > 0 && (
                  <div style={{
                    background: 'white',
                    border: '1px solid #fee2e2',
                    borderRadius: '6px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#b91c1c',
                      marginBottom: '0.5rem'
                    }}>
                      Areas for Improvement ({analysisData.weak_lessons.length})
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                      Your plan prioritizes {analysisData.weak_lessons.slice(0, 3).map(l => l.lesson_title || l.lesson_id).join(', ')}{analysisData.weak_lessons.length > 3 && ` and ${analysisData.weak_lessons.length - 3} more`}
                    </div>
                  </div>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  marginTop: '1rem'
                }}>
                  <div style={{
                    background: 'white',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #fee2e2',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#b91c1c' }}>
                      {learningPathData.items.filter(i => i.type === 'lesson').length}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      Lessons
                    </div>
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #fee2e2',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#b91c1c' }}>
                      {learningPathData.items.filter(i => i.type === 'practice').length}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      Practice
                    </div>
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #fee2e2',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#b91c1c' }}>
                      {learningPathData.items.filter(i => i.type === 'practice_test').length}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      Tests
                    </div>
                  </div>
                </div>

                <p style={{
                  marginTop: '1rem',
                  marginBottom: '0',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontStyle: 'italic'
                }}>
                  Your complete schedule with dates and times is ready in your Learning Path
                </p>
              </div>
            ) : (
              <div style={{
                fontSize: '0.95rem',
                color: '#374151',
                lineHeight: '1.6'
              }}>
                {analysisData.weak_lessons?.length > 0 ? (
                  <>
                    <p style={{ marginBottom: '0.75rem' }}>
                      We identified <strong>{analysisData.weak_lessons.length} areas</strong> for improvement. Your {weeksUntilExam}-week study plan focuses on:
                    </p>

                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0.75rem 0'
                    }}>
                      {analysisData.weak_lessons.slice(0, 5).map((lesson, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'start',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem'
                        }}>
                          <span style={{
                            background: '#b91c1c',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            marginRight: '0.5rem',
                            flexShrink: 0,
                            marginTop: '1px'
                          }}>
                            {index + 1}
                          </span>
                          <span>
                            <strong>{lesson.lesson_title || lesson.lesson_id}</strong> ({((lesson.accuracy || 0)).toFixed(0)}% accuracy)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p style={{ marginBottom: '0.75rem' }}>
                    Your {weeksUntilExam}-week personalized study plan is ready! Start with the recommended lessons to build your skills.
                  </p>
                )}

                <p style={{ marginTop: '1rem', marginBottom: '0' }}>
                  {isDefaultTimeline ? (
                    <>We've created a <strong>12-week plan</strong> to help you master the material at your own pace.</>
                  ) : (
                    <>With <strong>{weeksUntilExam} weeks</strong> until your test, your plan is optimized to reach your target score of <strong>{userGoalsData?.target_score || 28}</strong>.</>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={() => {
                setShowResults(false);
                if (onClose) onClose();
              }}
              style={{
                background: '#b91c1c',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.875rem 1.75rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.target.style.background = '#991b1b'}
              onMouseLeave={(e) => e.target.style.background = '#b91c1c'}
            >
              Start Learning
              <HiArrowRight style={{ fontSize: '1.125rem' }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render insights modal
   */
  return <DiagnosticInsightsModal
    insightsData={insightsData}
    onClose={onClose}
    show={showInsights}
  />;

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className={classes.container}>
        <div className={classes.errorContainer}>
          <div className={classes.errorTitle}>Error</div>
          <div className={classes.errorMessage}>{error}</div>
          <button onClick={onClose} className={classes.backButton}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /**
   * Tooltip component
   */
  const Tooltip = ({ text, id }) => (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '0.5rem'
      }}
      onMouseEnter={() => setHoveredTooltip(id)}
      onMouseLeave={() => setHoveredTooltip(null)}
    >
      <div style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#3b82f6',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        cursor: 'help'
      }}>
        ?
      </div>
      {hoveredTooltip === id && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '0.5rem',
          padding: '0.5rem 0.75rem',
          background: '#3b82f6',
          color: 'white',
          borderRadius: '6px',
          fontSize: '0.75rem',
          lineHeight: '1.3',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
          zIndex: 1000
        }}>
          {text}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #3b82f6'
          }} />
        </div>
      )}
    </div>
  );

  /**
   * Render onboarding quiz
   */
  if (showOnboarding) {
    return (
      <div className={classes.container} style={{ overflow: 'hidden', height: '100vh' }}>
        <button onClick={onClose} className={classes.closeButton}>
          <HiXMark style={{ fontSize: '1.125rem' }} />
          Close
        </button>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          height: '100vh',
          overflow: 'auto'
        }}>
          <div style={{
            width: '100%',
            background: 'transparent'
          }}>
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em'
              }}>
                Personalize Your Study Plan
              </h1>
              <p style={{
                fontSize: '0.95rem',
                color: '#6b7280',
                lineHeight: '1.5',
                maxWidth: '600px',
                margin: '0 0 0.5rem'
              }}>
                Build a flexible study schedule that works for your life.
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: '#9ca3af',
                fontStyle: 'italic'
              }}>
                These settings are flexible and can be adjusted anytime from your profile.
              </p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem 2rem', marginBottom: '1.5rem' }}>
                {/* Target Test Date */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Test Date
                  </label>
                  <input
                    type="date"
                    value={onboardingData.target_exam_date}
                    onChange={(e) => setOnboardingData({ ...onboardingData, target_exam_date: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Current Score */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Current ACT Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    placeholder="Leave blank if not taken"
                    value={onboardingData.current_score}
                    onChange={(e) => setOnboardingData({ ...onboardingData, current_score: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Target Score */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Target ACT Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={onboardingData.target_score}
                    onChange={(e) => setOnboardingData({ ...onboardingData, target_score: parseInt(e.target.value) || 28 })}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                  />
                </div>
              </div>

            {/* Daily Study Hours - Full Width */}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Daily Study Hours
                  <Tooltip id="daily-study-hours" text="Customize your study schedule—set different hours for each day, rest days, or alternate weeks." />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={onboardingData.use_alternating_weeks}
                    onChange={(e) => setOnboardingData({ ...onboardingData, use_alternating_weeks: e.target.checked })}
                    style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                  />
                  Use alternating weeks
                </label>
              </div>

              {/* Week 1 Schedule */}
              <div style={{ marginBottom: onboardingData.use_alternating_weeks ? '1rem' : '0' }}>
                {onboardingData.use_alternating_weeks && (
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Week 1 Schedule
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <div key={day}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', display: 'block', textTransform: 'capitalize' }}>
                        {day.slice(0, 3)}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="8"
                        step="0.25"
                        value={onboardingData.study_hours?.[day] || 0}
                        onChange={(e) => setOnboardingData({
                          ...onboardingData,
                          study_hours: { ...(onboardingData.study_hours || {}), [day]: parseFloat(e.target.value) || 0 }
                        })}
                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Week 2 Schedule (only shown if alternating weeks is enabled) */}
              {onboardingData.use_alternating_weeks && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Week 2 Schedule
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                      <div key={day}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', display: 'block', textTransform: 'capitalize' }}>
                          {day.slice(0, 3)}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="8"
                          step="0.25"
                          value={onboardingData.study_hours_week2?.[day] || 0}
                          onChange={(e) => setOnboardingData({
                            ...onboardingData,
                            study_hours_week2: { ...(onboardingData.study_hours_week2 || {}), [day]: parseFloat(e.target.value) || 0 }
                          })}
                          style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem 2rem', marginTop: '1.5rem' }}>
              {/* Weekly Review Day */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Weekly Review Day
                  <Tooltip id="review-day" text="Day you'll review your full practice exam results and mistakes." />
                </label>
                <select
                  value={onboardingData.review_day}
                  onChange={(e) => setOnboardingData({ ...onboardingData, review_day: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', background: 'white' }}
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>

              {/* Mock Exam Day */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Mock Exam Day
                  <Tooltip id="mock-exam-day" text="Day you'll take a full-length practice test each week." />
                </label>
                <select
                  value={onboardingData.mock_exam_day}
                  onChange={(e) => setOnboardingData({ ...onboardingData, mock_exam_day: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', background: 'white' }}
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            </div>

            {/* Weekly Study Commitment */}
            {(() => {
              const practiceTestHours = 3;
              const reviewHours = 2;
              const regularStudyHours = Object.values(onboardingData.study_hours).reduce((sum, hours) => sum + (hours || 0), 0);
              const week1TotalHours = regularStudyHours + practiceTestHours + reviewHours;

              let totalWeeklyHours = week1TotalHours;
              if (onboardingData.use_alternating_weeks) {
                const studyHoursWeek2 = onboardingData.study_hours_week2 || {};
                const regularStudyHoursWeek2 = Object.values(studyHoursWeek2).reduce((sum, hours) => sum + (hours || 0), 0);
                const week2TotalHours = regularStudyHoursWeek2 + practiceTestHours + reviewHours;
                totalWeeklyHours = (week1TotalHours + week2TotalHours) / 2;
              }

              const selectedTier = onboardingData.weekly_hours_tier || 'moderate';
              const tierRanges = {
                'light': { min: 1, max: 5, label: '1-5 hours/week' },
                'moderate': { min: 5, max: 10, label: '5-10 hours/week' },
                'intensive': { min: 10, max: 15, label: '10-15 hours/week' },
                'extreme': { min: 15, max: 100, label: '15+ hours/week' }
              };

              const range = tierRanges[selectedTier];
              const hoursMismatch = totalWeeklyHours < range.min || totalWeeklyHours > range.max;

              return (
                <div style={{ marginTop: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Weekly Study Commitment
                  </label>
                  <select
                    value={onboardingData.weekly_hours_tier}
                    onChange={(e) => setOnboardingData({ ...onboardingData, weekly_hours_tier: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      border: hoursMismatch ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderLeft: hoursMismatch ? '3px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      background: 'white'
                    }}
                  >
                    <option value="light" disabled={totalWeeklyHours > 8}>Light (5-8 hours/week)</option>
                    <option value="moderate" disabled={totalWeeklyHours < 8 || totalWeeklyHours > 12}>Moderate (8-12 hours/week)</option>
                    <option value="intensive" disabled={totalWeeklyHours < 12 || totalWeeklyHours > 17}>Intensive (12-17 hours/week)</option>
                    <option value="extreme" disabled={totalWeeklyHours < 17}>Extreme (17+ hours/week)</option>
                  </select>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    {onboardingData.use_alternating_weeks
                      ? `Average: ${totalWeeklyHours.toFixed(1)}h/week (both weeks include 3h practice test + 2h review)`
                      : `Total: ${totalWeeklyHours.toFixed(1)}h/week (includes 3h practice test + 2h review)`
                    }
                  </p>
                  {hoursMismatch && (
                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: '500' }}>
                      Your {onboardingData.use_alternating_weeks ? 'average' : 'total'} hours ({totalWeeklyHours.toFixed(1)}h/week) don't match {selectedTier.toUpperCase()} ({range.label})
                    </p>
                  )}
                </div>
              );
            })()}

          </div>

          <div style={{ textAlign: 'right', marginTop: '2.5rem' }}>
            <button
              onClick={saveOnboardingData}
              style={{
                background: '#b91c1c',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#991b1b';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#b91c1c';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Continue to Diagnostic Test
                <HiArrowRight style={{ fontSize: '1rem' }} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }

  /**
   * Render test in progress (with countdown or actual test)
   */
  if (testStarted || showCountdown) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        zIndex: 2000
      }}>
        <iframe
          ref={iframeRef}
          key="diagnostic-test"
          src="/tests/practice-test.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'white'
          }}
          title="ACT Diagnostic Test"
        />
        {showCountdown && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            zIndex: 2001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '8rem',
                fontWeight: '700',
                color: '#08245b',
                marginBottom: '1rem'
              }}>
                {countdown}
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#6b7280',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Starting Test...
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * Render intro screen after onboarding
   */
  if (showIntro) {
    return (
      <div className={classes.container} style={{ overflow: 'hidden', height: '100vh' }}>
        <button onClick={onClose} className={classes.closeButton}>
          <HiXMark style={{ fontSize: '1.125rem' }} />
          Close
        </button>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '1.5rem 1.5rem',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              ACT Diagnostic Test
            </h1>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              lineHeight: '1.5',
              margin: 0
            }}>
              Complete diagnostic assessment with 215 questions covering all four ACT sections to identify your strengths and areas for improvement.
            </p>
          </div>

          {/* Environment Warning */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '6px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#92400e', marginBottom: '0.125rem' }}>
                Before You Begin
              </div>
              <div style={{ fontSize: '0.75rem', color: '#78350f', lineHeight: '1.3' }}>
                Ensure you're in a quiet environment with 3 hours available. Test must be completed in one sitting.
              </div>
            </div>
          </div>

          {/* Section Details */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📝</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>English</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Grammar, punctuation, rhetorical skills</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>75 questions</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>45 minutes</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🔢</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>Mathematics</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Algebra, geometry, trigonometry</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>60 questions</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>60 minutes</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📖</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>Reading</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Comprehension across 4 passages</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>40 questions</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>35 minutes</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🔬</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>Science</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Scientific reasoning, data interpretation</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>40 questions</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>35 minutes</div>
              </div>
            </div>
          </div>

          {/* Total Time */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#08245b',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Total Test Time</div>
            <div style={{ fontSize: '1.125rem', fontWeight: '700' }}>2 hours 55 minutes</div>
          </div>

          {/* Begin Button - Double Click Required */}
          <button
            onClick={() => {
              if (!confirmStart) {
                setConfirmStart(true);
              } else {
                setCountdown(3);
                setShowCountdown(true);
              }
            }}
            style={{
              background: confirmStart ? '#b91c1c' : '#08245b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = confirmStart ? '#991b1b' : '#061a3d';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = confirmStart ? '#b91c1c' : '#08245b';
            }}
          >
            {confirmStart ? (
              <>
                Click Again to Start Test
                <HiArrowRight style={{ fontSize: '1rem' }} />
              </>
            ) : (
              <>
                I'm Ready - Begin Test
                <HiArrowRight style={{ fontSize: '1rem' }} />
              </>
            )}
          </button>
          {confirmStart && (
            <p style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              color: '#6b7280',
              marginTop: '0.75rem',
              marginBottom: 0
            }}>
              Click the button again to confirm and start the test
            </p>
          )}
        </div>
      </div>
    );
  }

  /**
   * Default loading state (while checking onboarding status)
   */
  return (
    <div className={classes.container}>
      <button onClick={onClose} className={classes.closeButton}>
        <HiXMark style={{ fontSize: '1.125rem' }} />
        Close
      </button>
      <div className={classes.loadingContainer}>
        <div className={classes.loadingSpinner} />
        <div className={classes.loadingText}>Loading...</div>
      </div>
    </div>
  );
};

export default DiagnosticTest;
