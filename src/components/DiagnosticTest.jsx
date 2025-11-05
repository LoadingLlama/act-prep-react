/**
 * Diagnostic Test Component
 * Displays the diagnostic test using the same interface as practice tests
 */

import React, { useState, useEffect } from 'react';
import { usePracticeTestStyles } from '../styles/pages/practice-test.styles';
import DiagnosticService from '../services/api/diagnostic.service';
import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

const DiagnosticTest = ({ onClose }) => {
  const classes = usePracticeTestStyles();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [testStarted, setTestStarted] = useState(false);

  // Load all diagnostic questions on mount
  useEffect(() => {
    loadDiagnosticQuestions();
  }, []);

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
        id: q.question_id,
        section: q.section,
        passage_id: q.passage_id,
        question_number: q.question_number,
        question_text: q.question_text,
        choices: q.choices,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        tags: q.tags,
        lesson_id: q.lesson_id
      }));

      setQuestions(transformedQuestions);
      logger.info('DiagnosticTest', 'loadDiagnosticQuestions', {
        count: transformedQuestions.length
      });

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
   */
  const startTest = () => {
    // Store questions in sessionStorage for the test to access
    sessionStorage.setItem('practiceTestQuestions', JSON.stringify(questions));
    sessionStorage.setItem('practiceTestSection', 'diagnostic');
    sessionStorage.setItem('practiceTestNumber', 'diagnostic');
    sessionStorage.setItem('practiceTestDuration', 175); // Full test duration

    console.log('📦 React: Storing diagnostic test in sessionStorage:', {
      section: 'diagnostic',
      questionsCount: questions.length,
      duration: 175
    });

    setTestStarted(true);
  };

  // Listen for test completion message from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      console.log('📨 Diagnostic Test Message received:', event.data);

      if (event.data?.type === 'PRACTICE_TEST_COMPLETE') {
        console.log('✅ Diagnostic test complete - closing');
        if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

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
        ✕ Close
      </button>
      <div className={classes.sectionSelector}>
        <h1 className={classes.sectionTitle}>ACT Diagnostic Test</h1>
        <p className={classes.sectionDescription}>
          Full diagnostic test with {questions.length} questions across all four sections.
          This test will help identify your strengths and areas for improvement.
        </p>

        <div className={classes.testInfo}>
          <div className={classes.testInfoItem}>
            <span className={classes.testInfoIcon}>📝</span>
            <div>
              <div className={classes.testInfoLabel}>Questions</div>
              <div className={classes.testInfoValue}>{questions.length} total</div>
            </div>
          </div>
          <div className={classes.testInfoItem}>
            <span className={classes.testInfoIcon}>⏱️</span>
            <div>
              <div className={classes.testInfoLabel}>Duration</div>
              <div className={classes.testInfoValue}>175 minutes</div>
            </div>
          </div>
          <div className={classes.testInfoItem}>
            <span className={classes.testInfoIcon}>📊</span>
            <div>
              <div className={classes.testInfoLabel}>Sections</div>
              <div className={classes.testInfoValue}>English, Math, Reading, Science</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={startTest} className={classes.fullTestButton}>
            Begin Diagnostic Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTest;
