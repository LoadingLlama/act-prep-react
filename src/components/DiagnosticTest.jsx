/**
 * Diagnostic Test Component
 * Displays the diagnostic test using the same interface as practice tests
 * Integrates with adaptive learning algorithm for personalized recommendations
 */

import React, { useState, useEffect } from 'react';
import { HiXMark, HiArrowRight } from 'react-icons/hi2';
import { usePracticeTestStyles } from '../styles/pages/practice-test.styles';
import DiagnosticService from '../services/api/diagnostic.service';
import DiagnosticAnalysisService from '../services/api/diagnostic-analysis.service';
import LearningPathService from '../services/api/learning-path.service';
import { supabase } from '../services/api/supabase.service';
import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

/**
 * Transform onboarding answers to user goals format for learning path
 */
const transformOnboardingToGoals = (onboardingData) => {
  const defaults = {
    exam_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    daily_study_minutes: 30,
    target_score: 28,
    study_days_per_week: 5
  };

  if (!onboardingData) return defaults;

  // Transform exam date
  let exam_date = defaults.exam_date;
  if (onboardingData.testDate && onboardingData.testDate !== 'not-scheduled') {
    exam_date = new Date(onboardingData.testDate).toISOString();
  }

  // Transform study time (hours/week → minutes/day)
  let daily_study_minutes = defaults.daily_study_minutes;
  if (onboardingData.studyTimePerWeek) {
    const hoursPerWeek = {
      '2-4': 3,
      '5-7': 6,
      '8-10': 9,
      '10+': 12
    }[onboardingData.studyTimePerWeek] || 6;

    // Convert to daily minutes (assuming 5 study days/week)
    daily_study_minutes = Math.round((hoursPerWeek * 60) / 5);
  }

  // Transform target score
  let target_score = defaults.target_score;
  if (onboardingData.targetScore) {
    const scoreRanges = {
      '20-24': 22,
      '25-29': 27,
      '30-33': 31,
      '34-36': 35
    };
    target_score = scoreRanges[onboardingData.targetScore] || 28;
  }

  return {
    exam_date,
    daily_study_minutes,
    target_score,
    study_days_per_week: 5,
    focus_sections: onboardingData.concernedSections || [],
    study_experience: onboardingData.studyExperience || 'never'
  };
};

/**
 * Get user goals from profile onboarding data or user_goals table
 */
const getUserGoals = async (userId) => {
  try {
    // Try to get from user_goals table first
    const { data: existingGoals } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingGoals) {
      return {
        exam_date: existingGoals.target_exam_date,
        daily_study_minutes: existingGoals.daily_study_minutes,
        target_score: existingGoals.target_score,
        study_days_per_week: existingGoals.study_days_per_week || 5,
        focus_sections: existingGoals.focus_sections || [],
        study_experience: 'never'
      };
    }

    // If not in user_goals, get from profile onboarding_data
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_data')
      .eq('id', userId)
      .single();

    const goals = transformOnboardingToGoals(profile?.onboarding_data);

    // Save to user_goals table for future use
    await supabase.from('user_goals').upsert({
      user_id: userId,
      target_exam_date: goals.exam_date,
      daily_study_minutes: goals.daily_study_minutes,
      target_score: goals.target_score,
      study_days_per_week: goals.study_days_per_week,
      focus_sections: goals.focus_sections
    });

    logger.info('DiagnosticTest', 'getUserGoals', { userId, goals });
    return goals;
  } catch (error) {
    logger.warn('DiagnosticTest', 'getUserGoalsFailed', { userId, error });
    // Return defaults if anything fails
    return {
      exam_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      daily_study_minutes: 30,
      target_score: 28,
      study_days_per_week: 5
    };
  }
};

const DiagnosticTest = ({ onClose }) => {
  const classes = usePracticeTestStyles();

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
  const [onboardingData, setOnboardingData] = useState({
    target_exam_date: '',
    current_score: '',
    target_score: 28,
    use_alternating_weeks: false,
    study_hours: {
      monday: 0.75,
      tuesday: 1,
      wednesday: 0,
      thursday: 0.75,
      friday: 1,
      saturday: 2,
      sunday: 2
    },
    study_hours_week2: {
      monday: 0.75,
      tuesday: 1,
      wednesday: 0,
      thursday: 0.75,
      friday: 1,
      saturday: 2,
      sunday: 2
    },
    weakest_section: '',
    review_day: 'sunday',
    mock_exam_day: 'saturday'
  });
  const [hoveredTooltip, setHoveredTooltip] = useState(null);

  // Get current user and check onboarding status on mount
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);

        // Check if user has completed onboarding (has user_goals)
        const { data: goals } = await supabase
          .from('user_goals')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        setHasCompletedOnboarding(!!goals);

        // Pre-fill onboarding data if it exists
        if (goals) {
          setOnboardingData({
            target_exam_date: goals.target_exam_date || '',
            current_score: goals.current_score || '',
            target_score: goals.target_score || 28,
            use_alternating_weeks: false,
            study_hours: {
              monday: 0.75,
              tuesday: 1,
              wednesday: 0,
              thursday: 0.75,
              friday: 1,
              saturday: 2,
              sunday: 2
            },
            study_hours_week2: {
              monday: 0.75,
              tuesday: 1,
              wednesday: 0,
              thursday: 0.75,
              friday: 1,
              saturday: 2,
              sunday: 2
            },
            weakest_section: goals.weakest_section || '',
            review_day: goals.review_day || 'sunday',
            mock_exam_day: goals.mock_exam_day || 'saturday'
          });
        }
      } else {
        setError('You must be logged in to take the diagnostic test.');
      }
    };
    getCurrentUser();
  }, []);

  // Load all diagnostic questions on mount
  useEffect(() => {
    if (userId) {
      loadDiagnosticQuestions();
    }
  }, [userId]);

  /**
   * Load all diagnostic questions from database
   */
  const loadDiagnosticQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info('DiagnosticTest', 'loadDiagnosticQuestions', {});

      const diagnosticQuestions = await DiagnosticService.getDiagnosticQuestions();

      if (!diagnosticQuestions || diagnosticQuestions.length === 0) {
        throw new Error('No diagnostic questions found');
      }

      // Transform questions to match practice test format
      const transformedQuestions = diagnosticQuestions.map(q => ({
        id: q.id, // UUID from database - CRITICAL for saving answers
        question_id: q.question_id, // Integer question number
        section: q.section,
        passage_id: q.passage_id,
        question_number: q.question_number,
        question_text: q.question_text,
        choices: q.choices,
        correct_answer: q.correct_answer,
        correctAnswer: q.correct_answer, // Alias for practice test format
        explanation: q.explanation,
        difficulty: q.difficulty,
        tags: q.tags,
        lesson_id: q.lesson_id
      }));

      setQuestions(transformedQuestions);
      logger.info('DiagnosticTest', 'loadDiagnosticQuestions', {
        count: transformedQuestions.length
      });

      // Automatically show onboarding if user hasn't completed it
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      } else {
        setShowIntro(true);
      }

    } catch (err) {
      console.error('Error loading diagnostic questions:', err);
      errorTracker.trackError(
        'DiagnosticTest',
        'loadDiagnosticQuestions',
        {},
        err
      );
      setError('Failed to load diagnostic test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Start the diagnostic test
   * Creates a diagnostic session before loading the test
   */
  /**
   * Save onboarding data to user_goals table
   */
  const saveOnboardingData = async () => {
    try {
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

      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: userId,
          target_exam_date: onboardingData.target_exam_date || null,
          current_score: onboardingData.current_score ? parseInt(onboardingData.current_score) : null,
          target_score: onboardingData.target_score,
          daily_study_minutes: avgDailyMinutes,
          study_days_per_week: studyDaysCount,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Onboarding data saved successfully');
      setHasCompletedOnboarding(true);
      setShowOnboarding(false);

      // Show intro screen before starting test
      setShowIntro(true);
    } catch (error) {
      console.error('Full error details:', error);
      logger.error('DiagnosticTest', 'saveOnboardingDataFailed', { error: error.message, details: error });
      setError(`Failed to save your information: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

  /**
   * Begin diagnostic test (called after onboarding if needed)
   */
  const beginDiagnosticTest = async () => {
    try {
      logger.info('DiagnosticTest', 'beginDiagnosticTest', { userId, questionsCount: questions.length });

      // Create diagnostic session
      const session = await DiagnosticService.createDiagnosticSession(
        userId,
        'full', // Full diagnostic test covering all sections
        questions.length
      );

      if (!session) {
        throw new Error('Failed to create diagnostic session');
      }

      setSessionId(session.id);

      // Store session ID and questions in sessionStorage
      sessionStorage.setItem('diagnosticSessionId', session.id);
      sessionStorage.setItem('practiceTestQuestions', JSON.stringify(questions));
      sessionStorage.setItem('practiceTestSection', 'diagnostic');
      sessionStorage.setItem('practiceTestNumber', 'diagnostic');
      sessionStorage.setItem('practiceTestDuration', 175); // Full test duration

      logger.info('DiagnosticTest', 'sessionCreated', {
        sessionId: session.id,
        questionsCount: questions.length
      });

      setTestStarted(true);
    } catch (error) {
      logger.error('DiagnosticTest', 'beginDiagnosticTestFailed', { error });
      setError(error.message || 'Failed to start the diagnostic test');
    }
  };

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

  // Listen for test completion message from iframe
  useEffect(() => {
    const handleMessage = async (event) => {
      console.log('📨 Diagnostic Test Message received:', event.data);

      if (event.data?.type === 'PRACTICE_TEST_COMPLETE') {
        console.log('✅ Diagnostic test complete - processing results');
        await handleTestCompletion();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose, sessionId, userId, questions]);

  /**
   * Handle test completion
   * Saves all answers, completes session, triggers analysis, and generates learning path
   */
  const handleTestCompletion = async () => {
    try {
      setAnalyzing(true);
      logger.info('DiagnosticTest', 'handleTestCompletion', { sessionId, userId });

      // Get results from sessionStorage (set by practice-test.html)
      const resultsData = sessionStorage.getItem('practiceTestResults');
      if (!resultsData) {
        throw new Error('No test results found');
      }

      const results = JSON.parse(resultsData);
      const allSections = results.allSections || [];

      // Flatten all question results from all sections
      const allQuestionResults = [];
      allSections.forEach(sectionResult => {
        sectionResult.questions.forEach(q => {
          allQuestionResults.push(q);
        });
      });

      logger.info('DiagnosticTest', 'savingAnswers', {
        totalAnswers: allQuestionResults.length
      });

      // Save each answer to diagnostic_test_results
      for (const questionResult of allQuestionResults) {
        const question = questions.find(q => q.question_number === questionResult.questionNum);
        if (!question || !question.id) {
          console.warn('Question not found for number:', questionResult.questionNum);
          continue;
        }

        await DiagnosticService.saveDiagnosticAnswer(
          userId,
          sessionId,
          question.id, // question UUID from database
          questionResult.userAnswer,
          questionResult.isCorrect,
          0 // Time spent - not tracked in current implementation
        );
      }

      // Calculate final scores
      const correctAnswers = allQuestionResults.filter(q => q.isCorrect).length;
      const totalQuestions = allQuestionResults.length;
      const scorePercentage = (correctAnswers / totalQuestions) * 100;

      logger.info('DiagnosticTest', 'completingSession', {
        correctAnswers,
        totalQuestions,
        scorePercentage: scorePercentage.toFixed(2)
      });

      // Complete diagnostic session
      await DiagnosticService.completeDiagnosticSession(
        sessionId,
        correctAnswers,
        scorePercentage
      );

      // Trigger diagnostic analysis algorithm
      logger.info('DiagnosticTest', 'analyzingResults', { sessionId });
      const analysis = await DiagnosticAnalysisService.analyzeDiagnosticResults(
        userId,
        sessionId
      );

      logger.info('DiagnosticTest', 'analysisComplete', {
        weakLessons: analysis.weak_lessons?.length || 0,
        overallScore: analysis.overall_score
      });

      // Get user goals from onboarding data
      const userGoals = await getUserGoals(userId);

      // Generate personalized learning path
      logger.info('DiagnosticTest', 'generatingLearningPath', { userId });
      const learningPath = await LearningPathService.generateLearningPath(
        userId,
        userGoals,
        analysis
      );

      logger.info('DiagnosticTest', 'learningPathComplete', {
        pathId: learningPath.id,
        itemsCount: learningPath.items?.length || 0
      });

      // Clean up sessionStorage
      sessionStorage.removeItem('diagnosticSessionId');
      sessionStorage.removeItem('practiceTestQuestions');
      sessionStorage.removeItem('practiceTestResults');

      // Close diagnostic test
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('Error processing diagnostic completion:', err);
      errorTracker.trackError('DiagnosticTest', 'handleTestCompletion', { sessionId }, err);
      setError('Failed to process test results. Please contact support.');
    } finally {
      setAnalyzing(false);
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
   * Render analyzing state
   */
  if (analyzing) {
    return (
      <div className={classes.container}>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner} />
          <div className={classes.loadingText}>Analyzing your results...</div>
          <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Identifying your strengths and areas for improvement
          </p>
        </div>
      </div>
    );
  }

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
      <div className={classes.container}>
        <button onClick={onClose} className={classes.closeButton}>
          <HiXMark style={{ fontSize: '1.125rem' }} />
          Close
        </button>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          minHeight: '90vh'
        }}>
          <div style={{
            width: '100%',
            background: 'transparent'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
                margin: '0 auto 0.5rem'
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

          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={saveOnboardingData}
              style={{
                background: '#b91c1c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.875rem 2.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#991b1b';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(185, 28, 28, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Continue to Diagnostic Test
                <HiArrowRight style={{ fontSize: '1.1rem' }} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }

  /**
   * Render intro screen after onboarding
   */
  if (showIntro) {
    return (
      <div className={classes.container}>
        <button onClick={onClose} className={classes.closeButton}>
          <HiXMark style={{ fontSize: '1.125rem' }} />
          Close
        </button>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '4rem 2rem',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              ACT Diagnostic Test
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Complete diagnostic assessment with {questions.length} questions covering all four ACT sections to identify your strengths and areas for improvement.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginBottom: '3rem',
            width: '100%',
            maxWidth: '600px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
              borderRadius: '12px',
              border: '1px solid #fee2e2'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#b91c1c',
                marginBottom: '0.5rem'
              }}>
                {questions.length}
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Questions
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
              borderRadius: '12px',
              border: '1px solid #fee2e2'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#b91c1c',
                marginBottom: '0.5rem'
              }}>
                175
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Minutes
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
              borderRadius: '12px',
              border: '1px solid #fee2e2'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#b91c1c',
                marginBottom: '0.5rem'
              }}>
                4
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Sections
              </div>
            </div>
          </div>

          {/* Begin Button */}
          <button
            onClick={async () => {
              setShowIntro(false);
              await beginDiagnosticTest();
            }}
            style={{
              background: '#b91c1c',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1.25rem 3.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 12px rgba(185, 28, 28, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#991b1b';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(185, 28, 28, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#b91c1c';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(185, 28, 28, 0.3)';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Begin Diagnostic Test
              <HiArrowRight style={{ fontSize: '1.25rem' }} />
            </span>
          </button>
        </div>
      </div>
    );
  }

  /**
   * Render test in progress
   */
  if (testStarted) {
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
      </div>
    );
  }

  /**
   * Render start screen
   */
  return (
    <div className={classes.container}>
      <button onClick={onClose} className={classes.closeButton}>
        <HiXMark style={{ fontSize: '1.125rem' }} />
        Close
      </button>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '560px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            ACT Diagnostic Test
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: '#6b7280',
            lineHeight: '1.7',
            marginBottom: '2.5rem',
            maxWidth: '480px',
            margin: '0 auto 2.5rem'
          }}>
            Complete diagnostic assessment with {questions.length} questions covering all four ACT sections to identify your strengths and areas for improvement.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
            padding: '2rem',
            background: '#f9fafb',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div>
              <div style={{ fontWeight: '700', color: '#08245b', fontSize: '2rem', marginBottom: '0.5rem' }}>{questions.length}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Questions</div>
            </div>
            <div>
              <div style={{ fontWeight: '700', color: '#08245b', fontSize: '2rem', marginBottom: '0.5rem' }}>175</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Minutes</div>
            </div>
            <div>
              <div style={{ fontWeight: '700', color: '#08245b', fontSize: '2rem', marginBottom: '0.5rem' }}>4</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Sections</div>
            </div>
          </div>

          <button onClick={startTest} style={{
            background: '#08245b',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '1.125rem 3rem',
            fontSize: '1.05rem',
            fontWeight: '600',
            cursor: 'pointer',
          transition: 'all 0.15s ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#061a3d';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 16px rgba(8, 36, 91, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#08245b';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }}>
          Begin Diagnostic Test
        </button>
      </div>
    </div>
    </div>
  );
};

export default DiagnosticTest;
