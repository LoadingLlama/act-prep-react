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

      // If loading English (first section), clear all previous test results
      if (section === 'english') {
        console.log('🔄 Starting fresh test - clearing previous results');
        sessionStorage.removeItem('practiceTestAllResults');
        sessionStorage.removeItem('practiceTestResults');
      }

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

  // Get current user and clear old test data
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();

    // Clear any stale test results from previous attempts
    console.log('🧹 Clearing stale test data on component mount');
    sessionStorage.removeItem('practiceTestAllResults');
    sessionStorage.removeItem('practiceTestResults');
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
  const handleTestCompletion = useCallback(async () => {
    try {
      logger.info('PracticeTestPage', 'handleTestCompletion', { testNumber, userId });

      const resultsData = sessionStorage.getItem('practiceTestResults');
      if (!resultsData) {
        throw new Error('No test results found');
      }

      const results = JSON.parse(resultsData);
      const allSections = results.allSections || [];

      console.log(`📊 Found ${allSections.length} section results to process`);

      // Filter and validate sections - skip invalid old data but DON'T throw errors
      const validSections = [];
      for (const section of allSections) {
        if (!section.questions || section.questions.length === 0) {
          console.warn(`⚠️ Skipping section ${section.section} - no questions`);
          continue;
        }

        // Check first question has required fields
        const firstQ = section.questions[0];

        // Log what fields we have for debugging
        console.log(`🔍 Section ${section.section} first question fields:`, Object.keys(firstQ));

        if (!firstQ.questionId) {
          console.warn(`⚠️ Skipping section ${section.section} - missing questionId (old format, can't save to DB)`);
          continue;
        }

        // Accept both old (userAnswer) and new (selectedAnswer) field names for backward compatibility
        if (firstQ.selectedAnswer === undefined && firstQ.userAnswer === undefined) {
          console.warn(`⚠️ Skipping section ${section.section} - missing answer field (old format, can't save to DB)`);
          continue;
        }

        // Normalize old results to new format
        section.questions.forEach(q => {
          if (q.userAnswer !== undefined && q.selectedAnswer === undefined) {
            q.selectedAnswer = q.userAnswer;
          }
        });

        validSections.push(section);
      }

      console.log(`✅ Using ${validSections.length} valid sections out of ${allSections.length} total`);

      // If NO valid sections, skip database save but still show insights
      if (validSections.length === 0) {
        console.warn('⚠️ No valid sections to save to database (old data format)');
        console.log('✅ Completing test without database save and showing insights');

        // Navigate to insights immediately
        setTimeout(() => {
          if (onShowInsights) {
            onShowInsights();
          } else {
            onClose();
          }
        }, 500);
        return;
      }

      // Replace allSections with filtered valid sections
      allSections.length = 0;
      allSections.push(...validSections);

      console.log('📊 Practice test complete! Processing results...');
      console.log('📦 Raw results:', {
        hasAllSections: !!results.allSections,
        allSectionsCount: allSections.length,
        totalCorrect: results.totalCorrect,
        totalQuestions: results.totalQuestions,
        firstSectionSample: allSections[0]?.questions?.[0]
      });

      setProcessing(true);
      setProcessingStep('Starting analysis...');
      setProcessingProgress(0);

      // Process results - wrap in try-catch to ensure we navigate even if processing fails
      try {
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
        console.log('✅ Results processed successfully');
      } catch (processingError) {
        console.error('⚠️ Error during results processing:', processingError);
        console.log('✅ Continuing to insights despite processing error');
        // Don't throw - still navigate to insights
      }

      // ALWAYS navigate to insights after processing (success or failure)
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

      // Even if there's an error, still navigate to insights
      console.log('✅ Navigating to insights despite error');
      setProcessing(false);

      setTimeout(() => {
        if (onShowInsights) {
          onShowInsights();
        } else {
          onClose();
        }
      }, 1000);
    }
  }, [testNumber, userId, onShowInsights, onClose]);

  // Listen for test completion message from iframe
  useEffect(() => {
    const handleMessage = async (event) => {
      // Ignore messages from other sources
      if (event.origin !== window.location.origin) {
        return;
      }

      console.log('📨 React: Message received from iframe:', {
        type: event.data?.type,
        fullData: event.data,
        origin: event.origin
      });

      try {
        if (event.data?.type === 'PRACTICE_TEST_COMPLETE') {
          console.log('✅ React: Test complete message received - calling handleTestCompletion');
          await handleTestCompletion();
        } else if (event.data?.type === 'PRACTICE_TEST_NEXT_SECTION') {
          // Load next section
          const nextSection = event.data.nextSection;
          if (!nextSection) {
            console.error('❌ React: NEXT_SECTION message missing nextSection field');
            return;
          }
          console.log('🔄 React: Loading next section:', nextSection);
          logger.info('PracticeTestPage', 'loadingNextSection', { nextSection });
          await loadSectionQuestions(nextSection);
        } else if (event.data?.type === 'IFRAME_READY') {
          // Iframe loaded and ready
          console.log('✅ React: Iframe ready');
        } else {
          console.log('⚠️ React: Unknown message type:', event.data?.type);
        }
      } catch (error) {
        console.error('❌ React: Error handling message:', error);
        errorTracker.trackError('PracticeTestPage', 'handleMessage', {
          messageType: event.data?.type
        }, error);
        setError(`Error processing test: ${error.message}`);
      }
    };

    console.log('🎧 React: Message listener attached');
    window.addEventListener('message', handleMessage);
    return () => {
      console.log('🔌 React: Message listener removed');
      window.removeEventListener('message', handleMessage);
    };
  }, [loadSectionQuestions, handleTestCompletion]);

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
