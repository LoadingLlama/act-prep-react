/**
 * Custom Hook for Diagnostic Test Logic
 * Manages all state, effects, and handlers for the diagnostic test
 */

import { useState, useEffect, useRef } from 'react';
import DiagnosticService from '../services/api/diagnostic.service';
import { supabase } from '../services/api/supabase.service';
import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';
import { processTestResultsInBackground as processResults } from '../services/diagnostic/diagnosticResultProcessor';

export const useDiagnosticTest = () => {
  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentSection, setCurrentSection] = useState('english');
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

  const iframeRef = useRef(null);
  const processingRef = useRef(false); // Prevent duplicate submissions

  // Refs to avoid race conditions in message handler
  const currentSectionRef = useRef(currentSection);
  const questionsRef = useRef(questions);
  const sessionIdRef = useRef(sessionId);
  const userIdRef = useRef(userId);

  // Keep refs in sync with state
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

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
      nextSection: null
    }
  };

  // Get current user on mount
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

  // Countdown timer
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      setShowCountdown(false);
      if (!testStarted) {
        beginDiagnosticTest();
      }
    }
  }, [showCountdown, countdown, testStarted]);

  // Store lightweight question data in sessionStorage
  useEffect(() => {
    if (testStarted && questions.length > 0 && currentSection) {
      const duration = sectionConfig[currentSection]?.timeMinutes || 45;

      // Create lightweight version of questions (remove heavy content to avoid QuotaExceededError)
      // IMPORTANT: Keep field names that match what practice-test.html expects!
      const lightweightQuestions = questions.map(q => ({
        id: q.id,
        question_number: q.question_number,
        section: q.section,
        text: q.text, // HTML expects 'text', not 'question_text'
        answers: q.answers, // HTML expects 'answers' object, not 'choices' array
        correctAnswer: q.correctAnswer, // HTML expects 'correctAnswer'
        difficulty: q.difficulty,
        lesson_id: q.lesson_id,
        question_type: q.question_type,
        // Include passage if it's short (< 2000 chars), otherwise truncate
        passage: q.passage && q.passage.length < 2000 ? q.passage : (q.passage ? q.passage.substring(0, 2000) + '...' : null),
        passage_title: q.passage_title,
        // Include image_url for Math/Science questions (needed for rendering)
        image_url: q.image_url,
        passage_image_urls: q.passage_image_urls,
        // Don't include: explanation (heavy and not needed for test taking)
      }));

      try {
        sessionStorage.setItem('practiceTestQuestions', JSON.stringify(lightweightQuestions));
        sessionStorage.setItem('practiceTestSection', currentSection);
        sessionStorage.setItem('practiceTestNumber', 'diagnostic');
        sessionStorage.setItem('practiceTestDuration', duration);

        console.log('📦 Storing lightweight questions in sessionStorage:', {
          section: currentSection,
          questionsCount: lightweightQuestions.length,
          duration,
          dataSize: (JSON.stringify(lightweightQuestions).length / 1024).toFixed(2) + ' KB'
        });
      } catch (e) {
        console.error('❌ Failed to store questions in sessionStorage:', e);
        // If still too large, store even more minimal data (no passages, truncated text)
        const minimalQuestions = questions.map(q => ({
          id: q.id,
          question_number: q.question_number,
          section: q.section,
          text: q.text?.substring(0, 200) || '', // HTML expects 'text'
          answers: q.answers, // HTML expects 'answers' object
          correctAnswer: q.correctAnswer, // HTML expects 'correctAnswer'
          image_url: q.image_url // Keep images for Math/Science
        }));
        sessionStorage.setItem('practiceTestQuestions', JSON.stringify(minimalQuestions));
        console.log('⚠️ Stored ultra-minimal questions due to quota');
      }

      if (currentSection !== 'english' && iframeRef.current?.contentWindow) {
        console.log('📤 Sending LOAD_NEXT_SECTION message to iframe');
        setTimeout(() => {
          iframeRef.current.contentWindow.postMessage({
            type: 'LOAD_NEXT_SECTION'
          }, '*');
        }, 100);
      }
    }
  }, [testStarted, questions, currentSection]);

  // Check onboarding status
  useEffect(() => {
    if (userId && !testStarted && !loading) {
      const checkOnboarding = async () => {
        const { data: goals } = await supabase
          .from('user_goals')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (goals) {
          setHasCompletedOnboarding(true);
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
          // Skip intro screen - start countdown immediately
          setCountdown(3);
          setShowCountdown(true);
        } else {
          setHasCompletedOnboarding(false);
          setShowOnboarding(true);
        }
      };
      checkOnboarding();
    }
  }, [userId, testStarted, loading]);

  // Prevent scrolling on onboarding
  useEffect(() => {
    if (showOnboarding) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [showOnboarding]);

  // Functions
  const loadSectionQuestions = async (section) => {
    try {
      setLoading(true);
      setError(null);

      logger.info('DiagnosticTest', 'loadSectionQuestions', { section });

      // Clear old section data BEFORE loading new section to prevent stale data
      console.log(`🗑️ Clearing old section data before loading ${section}`);
      sessionStorage.removeItem('practiceTestQuestions');
      sessionStorage.removeItem('practiceTestSection');

      const sectionQuestions = await DiagnosticService.getDiagnosticQuestions(section);

      if (!sectionQuestions || sectionQuestions.length === 0) {
        // Don't leave stale data if load fails
        sessionStorage.removeItem('practiceTestQuestions');
        sessionStorage.removeItem('practiceTestSection');
        throw new Error(`No ${section} questions found`);
      }

      console.log(`✅ Loaded ${section} section:`, {
        count: sectionQuestions.length,
        questionNumbers: sectionQuestions.map(q => q.question_number).join(', '),
        fromTest: 'Practice Test #1 (Diagnostic)'
      });

      setQuestions(sectionQuestions);
      setCurrentSection(section);

      logger.info('DiagnosticTest', 'loadSectionQuestions', {
        section,
        count: sectionQuestions.length
      });

    } catch (err) {
      console.error(`Error loading ${section} questions:`, err);
      errorTracker.trackError('DiagnosticTest', 'loadSectionQuestions', { section }, err);
      // Clear any partial data on error
      sessionStorage.removeItem('practiceTestQuestions');
      sessionStorage.removeItem('practiceTestSection');
      setError(`Failed to load ${section} section. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const saveOnboardingData = async () => {
    try {
      console.log('📝 Onboarding data collected (will save after test completion)');
      setHasCompletedOnboarding(true);
      setShowOnboarding(false);
      // Skip intro screen - start countdown immediately
      setCountdown(3);
      setShowCountdown(true);
    } catch (error) {
      console.error('Error processing onboarding:', error);
      logger.error('DiagnosticTest', 'saveOnboardingDataFailed', { error: error.message });
      setError(`Failed to process your information: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

  const beginDiagnosticTest = async () => {
    try {
      logger.info('DiagnosticTest', 'beginDiagnosticTest', { userId });

      // Clear any previous test results from sessionStorage
      console.log('🗑️ Clearing previous test data from sessionStorage');
      sessionStorage.removeItem('practiceTestAllResults');
      sessionStorage.removeItem('practiceTestResults');
      sessionStorage.removeItem('practiceTestQuestions');

      // Check for existing incomplete session to prevent duplicates
      console.log('🔍 Checking for existing incomplete diagnostic session...');
      const { data: existingSessions } = await supabase
        .from('diagnostic_test_sessions')
        .select('id, created_at')
        .eq('user_id', userId)
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1);

      let session;

      if (existingSessions && existingSessions.length > 0) {
        const existingSession = existingSessions[0];
        const sessionAge = Date.now() - new Date(existingSession.created_at).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours

        if (sessionAge < maxAge) {
          // Resume existing session if less than 24 hours old
          console.log('♻️ Resuming existing incomplete session:', existingSession.id);
          session = existingSession;
        } else {
          // Session too old, mark as abandoned and create new one
          console.log('🗑️ Marking old session as abandoned, creating new session');
          await supabase
            .from('diagnostic_test_sessions')
            .update({ completed: false, abandoned: true })
            .eq('id', existingSession.id);

          console.log('📝 Creating new diagnostic session in database...');
          session = await DiagnosticService.createDiagnosticSession(
            userId,
            'full',
            215
          );
        }
      } else {
        // No existing session, create new one
        console.log('📝 Creating diagnostic session in database...');
        session = await DiagnosticService.createDiagnosticSession(
          userId,
          'full',
          215
        );
      }

      if (!session || !session.id) {
        throw new Error('Failed to create diagnostic session');
      }

      console.log('✅ Diagnostic session ready:', session.id);
      setSessionId(session.id);
      sessionStorage.setItem('diagnosticSessionId', session.id);

      await loadSectionQuestions('english');
      setTestStarted(true);

      logger.info('DiagnosticTest', 'testStarted', { sessionId: session.id, section: 'english' });

    } catch (error) {
      logger.error('DiagnosticTest', 'beginDiagnosticTestFailed', { error });
      setError(error.message || 'Failed to start the diagnostic test');
    }
  };

  const startTest = async () => {
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
      return;
    }
    await beginDiagnosticTest();
  };

  const processTestResultsInBackground = async (allSections) => {
    await processResults(
      allSections,
      sessionId,
      userId,
      onboardingData,
      {
        setProcessingStep,
        setProcessingProgress,
        setAnalysisData,
        setUserGoalsData,
        setLearningPathData,
        setProcessing,
        setShowInsights
      }
    );
  };

  const handleTestCompletion = async () => {
    // Prevent duplicate submissions
    if (processingRef.current) {
      console.log('⚠️ Already processing test completion, ignoring duplicate call');
      return;
    }

    processingRef.current = true;

    try {
      logger.info('DiagnosticTest', 'handleTestCompletion', { sessionId, userId });

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
        totalCorrect: results.totalCorrect,
        totalQuestions: results.totalQuestions
      });

      // Validate we have all 4 sections
      if (allSections.length !== 4) {
        console.warn(`⚠️ Expected 4 sections, got ${allSections.length}`);
      }

      localStorage.setItem('diagnosticProcessing', 'true');

      setProcessing(true);
      setProcessingStep('Starting analysis...');
      setProcessingProgress(0);

      await processTestResultsInBackground(allSections);

    } catch (err) {
      console.error('❌ Error processing test:', err);
      errorTracker.trackError('DiagnosticTest', 'handleTestCompletion', { sessionId }, err);
      setError(`Failed to process test results: ${err.message}`);
      setProcessing(false);
      localStorage.removeItem('diagnosticProcessing');
      processingRef.current = false; // Reset flag on error
    }
  };

  // Listen for messages from iframe (using refs to avoid race conditions)
  useEffect(() => {
    const handleMessage = async (event) => {
      // SECURITY: Validate message origin to prevent XSS attacks
      if (event.origin !== window.location.origin) {
        console.warn('⚠️ Rejected message from untrusted origin:', event.origin);
        return;
      }

      // Filter out browser extension messages (PANELOS, etc.)
      if (event.data?.posdMessageId === 'PANELOS_MESSAGE' || event.data?.from === 'detector') {
        return; // Ignore extension messages
      }

      console.log('📨 Diagnostic Test Message received:', event.data);

      // Use refs instead of closure variables to always get current values
      const currentSessionId = sessionIdRef.current;
      const currentUserId = userIdRef.current;
      const currentSectionValue = currentSectionRef.current;

      if (event.data?.type === 'PRACTICE_TEST_NEXT_SECTION') {
        const nextSection = sectionConfig[currentSectionValue]?.nextSection;
        console.log(`🔄 Moving to next section: ${currentSectionValue} → ${nextSection}`);

        if (nextSection) {
          logger.info('DiagnosticTest', 'loadingNextSection', {
            currentSection: currentSectionValue,
            nextSection,
            sessionId: currentSessionId
          });
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
  }, []); // Empty dependency array - handler uses refs for current values

  // No need to load insights data - DiagnosticTestReview will fetch it from the database using sessionId

  return {
    // State
    loading,
    error,
    questions,
    testStarted,
    sessionId,
    userId,
    analyzing,
    showOnboarding,
    hasCompletedOnboarding,
    showIntro,
    currentSection,
    processing,
    processingStep,
    processingProgress,
    showResults,
    analysisData,
    userGoalsData,
    learningPathData,
    onboardingData,
    hoveredTooltip,
    confirmStart,
    showCountdown,
    countdown,
    showInsights,
    iframeRef,
    sectionConfig,

    // Setters
    setOnboardingData,
    setShowInsights,
    setConfirmStart,
    setCountdown,
    setShowCountdown,

    // Functions
    saveOnboardingData,
    startTest,
    handleTestCompletion
  };
};
