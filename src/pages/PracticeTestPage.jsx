/**
 * Practice Test Page
 * Displays a full practice test using the diagnostic test HTML interface
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { usePracticeTestStyles } from '../styles/pages/practice-test.styles';
import PracticeTestsService from '../services/api/practiceTests.service';
import { supabase } from '../services/api/supabase.service';
import { processPracticeTestResults } from '../services/practice/practiceTestResultProcessor';
import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

const PracticeTestPage = ({ testId, onClose, onShowInsights }) => {
  const classes = usePracticeTestStyles();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testStructure, setTestStructure] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const testNumber = parseInt(testId, 10); // Actual DB test number (2-7)
  const displayTestNumber = testNumber - 1; // Display number to user (1-6)

  // Section configurations
  const sectionConfig = {
    english: {
      name: 'English',
      emoji: '📝',
      timeMinutes: 45,
      description: '75 questions covering grammar, punctuation, and rhetorical skills'
    },
    math: {
      name: 'Mathematics',
      emoji: '🔢',
      timeMinutes: 60,
      description: '60 questions covering algebra, geometry, and trigonometry'
    },
    reading: {
      name: 'Reading',
      emoji: '📖',
      timeMinutes: 35,
      description: '40 questions across 4 passages (literary, social science, humanities, natural science)'
    },
    science: {
      name: 'Science',
      emoji: '🔬',
      timeMinutes: 35,
      description: '40 questions testing scientific reasoning and data interpretation'
    }
  };

  /**
   * Handle back to section selection
   */
  const handleBackToSelection = useCallback(() => {
    setSelectedSection(null);
    setQuestions([]);
  }, []);

  /**
   * Load questions for a specific section
   */
  const loadSectionQuestions = useCallback(async (section) => {
    try {
      setLoading(true);
      setError(null);

      // Clear saved question position when loading a new section
      sessionStorage.removeItem('currentQuestion');

      logger.info('PracticeTestPage', 'loadSectionQuestions', { testNumber, section });

      const sectionQuestions = await PracticeTestsService.getPracticeTestSection(
        testNumber,
        section
      );

      if (!sectionQuestions || sectionQuestions.length === 0) {
        throw new Error(`No questions found for ${section} section`);
      }

      // Questions are already transformed by the service
      const transformedQuestions = sectionQuestions;

      setQuestions(transformedQuestions);
      setSelectedSection(section);
      logger.info('PracticeTestPage', 'loadSectionQuestions', {
        section,
        count: transformedQuestions.length
      });

    } catch (err) {
      console.error('Error loading section questions:', err);
      errorTracker.trackError(
        'PracticeTestPage',
        'loadSectionQuestions',
        { testNumber, section },
        err
      );
      setError(`Failed to load ${section} questions. Please try again.`);
    } finally {
      setLoading(false);
    }
  }, [testNumber]);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    loadTestStructure();
  }, [testNumber]);

  // Auto-start the test when component mounts
  useEffect(() => {
    loadSectionQuestions('english');
  }, [testNumber, loadSectionQuestions]);

  /**
   * Handle test completion and process results
   */
  const handleTestCompletion = async () => {
    try {
      logger.info('PracticeTestPage', 'handleTestCompletion', { testNumber, userId });

      const resultsData = sessionStorage.getItem('practiceTestResults');
      if (!resultsData) {
        throw new Error('No test results found');
      }

      const results = JSON.parse(resultsData);
      const allSections = results.allSections || [];

      console.log('📊 Practice test complete! Processing results...');
      console.log('📦 Raw results:', {
        hasAllSections: !!results.allSections,
        allSectionsCount: allSections.length,
        totalCorrect: results.totalCorrect,
        totalQuestions: results.totalQuestions
      });

      setProcessing(true);
      setProcessingStep('Starting analysis...');
      setProcessingProgress(0);

      // Process results
      const processedResults = await processPracticeTestResults(
        allSections,
        testNumber,
        userId,
        {
          setProcessingStep,
          setProcessingProgress,
          setProcessing,
          setShowResults
        }
      );

      setTestResults(processedResults);

      // Navigate to insights after a brief delay
      setTimeout(() => {
        if (onShowInsights) {
          onShowInsights();
        } else {
          onClose();
        }
      }, 2000);

    } catch (err) {
      console.error('❌ Error processing practice test:', err);
      errorTracker.trackError('PracticeTestPage', 'handleTestCompletion', { testNumber }, err);
      setError(`Failed to process test results: ${err.message}`);
      setProcessing(false);
    }
  };

  // Listen for test completion message from iframe
  useEffect(() => {
    const handleMessage = async (event) => {
      console.log('📨 Message received:', event.data);

      if (event.data?.type === 'PRACTICE_TEST_COMPLETE') {
        console.log('✅ Test complete - processing results');
        await handleTestCompletion();
      } else if (event.data?.type === 'PRACTICE_TEST_NEXT_SECTION') {
        // Load next section
        const nextSection = event.data.nextSection;
        console.log('🔄 Loading next section:', nextSection);
        logger.info('PracticeTestPage', 'loadingNextSection', { nextSection });
        loadSectionQuestions(nextSection);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [loadSectionQuestions, testNumber, userId]);

  /**
   * Load the test structure (question counts by section)
   */
  const loadTestStructure = async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info('PracticeTestPage', 'loadTestStructure', { testNumber });

      const structure = await PracticeTestsService.getTestStructure(testNumber);

      if (!structure) {
        throw new Error('Failed to load test structure');
      }

      setTestStructure(structure);
      logger.info('PracticeTestPage', 'loadTestStructure', { structure });

    } catch (err) {
      console.error('Error loading test structure:', err);
      errorTracker.trackError('PracticeTestPage', 'loadTestStructure', { testNumber }, err);
      setError('Failed to load practice test. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load all questions for full test
   */
  const loadFullTest = async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info('PracticeTestPage', 'loadFullTest', { testNumber });

      const allQuestions = await PracticeTestsService.getPracticeTestQuestions(testNumber);

      if (!allQuestions || allQuestions.length === 0) {
        throw new Error('No questions found for this test');
      }

      // Questions are already transformed by the service
      const transformedQuestions = allQuestions;

      setQuestions(transformedQuestions);
      setSelectedSection('full');
      logger.info('PracticeTestPage', 'loadFullTest', {
        count: transformedQuestions.length
      });

    } catch (err) {
      console.error('Error loading full test:', err);
      errorTracker.trackError('PracticeTestPage', 'loadFullTest', { testNumber }, err);
      setError('Failed to load full test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Render processing screen
   */
  if (processing) {
    return (
      <div className={classes.container}>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner} />
          <div className={classes.loadingText}>{processingStep}</div>
          <div style={{ width: '80%', maxWidth: '400px', marginTop: '1rem' }}>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${processingProgress}%`,
                height: '100%',
                background: '#08245b',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }} />
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              {processingProgress}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render loading state
   */
  if (loading && !testStructure) {
    return (
      <div className={classes.container}>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner} />
          <div className={classes.loadingText}>Loading Practice Test {displayTestNumber}...</div>
        </div>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error && !testStructure) {
    return (
      <div className={classes.container}>
        <div className={classes.errorContainer}>
          <div className={classes.errorTitle}>Error</div>
          <div className={classes.errorMessage}>{error}</div>
          <button onClick={onClose} className={classes.backButton}>
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  /**
   * Render test in progress
   */
  if (selectedSection && questions.length > 0) {
    // Store questions in sessionStorage for the test to access
    const duration = selectedSection === 'full' ? 175 : sectionConfig[selectedSection]?.timeMinutes || 45;

    sessionStorage.setItem('practiceTestQuestions', JSON.stringify(questions));
    sessionStorage.setItem('practiceTestSection', selectedSection);
    sessionStorage.setItem('practiceTestNumber', testNumber);
    sessionStorage.setItem('practiceTestDuration', duration);

    console.log('📦 React: Storing in sessionStorage:', {
      section: selectedSection,
      questionsCount: questions.length,
      duration: duration,
      testNumber: testNumber
    });

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
          key={`${testNumber}-${selectedSection}`}
          src="/tests/practice-test.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'white'
          }}
          title={`Practice Test ${displayTestNumber} - ${selectedSection}`}
        />
      </div>
    );
  }

  /**
   * Render section selection - Auto-start full test
   */
  return (
    <div className={classes.container}>
      <button onClick={onClose} className={classes.closeButton}>
        <HiXMark style={{ fontSize: '1.125rem' }} />
        Close
      </button>
      <div className={classes.sectionSelector}>
        <h1 className={classes.sectionTitle}>Practice Test {displayTestNumber}</h1>
        <p className={classes.sectionDescription}>
          Full simulated ACT test with 215 questions across all four sections.
        </p>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => loadSectionQuestions('english')} className={classes.fullTestButton}>
            Begin Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeTestPage;
