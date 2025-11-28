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

  // Store section questions in sessionStorage
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
          setShowIntro(true);
        } else {
          setHasCompletedOnboarding(false);
          setShowOnboarding(true);
        }
      };
      checkOnboarding();
    }
  }, [userId, testStarted, loading]);

  // Prevent scrolling on intro/onboarding
  useEffect(() => {
    if (showIntro || showOnboarding) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [showIntro, showOnboarding]);

  // Functions
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

      setQuestions(sectionQuestions);
      setCurrentSection(section);

      logger.info('DiagnosticTest', 'loadSectionQuestions', {
        section,
        count: sectionQuestions.length
      });

    } catch (err) {
      console.error(`Error loading ${section} questions:`, err);
      errorTracker.trackError('DiagnosticTest', 'loadSectionQuestions', { section }, err);
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
      setShowIntro(true);
    } catch (error) {
      console.error('Error processing onboarding:', error);
      logger.error('DiagnosticTest', 'saveOnboardingDataFailed', { error: error.message });
      setError(`Failed to process your information: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

  const beginDiagnosticTest = async () => {
    try {
      logger.info('DiagnosticTest', 'beginDiagnosticTest', { userId });

      console.log('📝 Creating diagnostic session in database...');

      const session = await DiagnosticService.createDiagnosticSession(
        userId,
        'full',
        215
      );

      if (!session || !session.id) {
        throw new Error('Failed to create diagnostic session');
      }

      console.log('✅ Diagnostic session created:', session.id);
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
        setShowResults
      }
    );
  };

  const handleTestCompletion = async () => {
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
    }
  };

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = async (event) => {
      console.log('📨 Diagnostic Test Message received:', event.data);

      if (event.data?.type === 'PRACTICE_TEST_NEXT_SECTION') {
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
  }, [sessionId, userId, questions, currentSection]);

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
    insightsData,
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
