/**
 * Practice Test Page
 * Displays a full practice test using DiagnosticTestUI component
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import DiagnosticTestUI from '../components/DiagnosticTestUI';
import PracticeTestsService from '../services/api/practiceTests.service';
import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

const useStyles = createUseStyles({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: '#f7fafc'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem'
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #4299e1',
    borderRadius: '50%',
    animation: '$spin 1s linear infinite'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  loadingText: {
    fontSize: '1.2rem',
    color: '#4a5568',
    fontWeight: '600'
  },
  errorContainer: {
    backgroundColor: '#fff5f5',
    border: '2px solid #fc8181',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    margin: '2rem 0'
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#c53030',
    marginBottom: '1rem'
  },
  errorMessage: {
    fontSize: '1.1rem',
    color: '#742a2a',
    marginBottom: '1.5rem'
  },
  backButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#3182ce'
    }
  },
  sectionSelector: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  sectionDescription: {
    color: '#4a5568',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    textAlign: 'center',
    lineHeight: '1.6'
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  sectionCard: {
    backgroundColor: '#f7fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#4299e1',
      backgroundColor: '#edf2f7',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  sectionCardTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  sectionCardQuestions: {
    fontSize: '1rem',
    color: '#718096',
    marginBottom: '0.5rem'
  },
  sectionCardTime: {
    fontSize: '0.9rem',
    color: '#a0aec0',
    fontStyle: 'italic'
  },
  fullTestButton: {
    backgroundColor: '#48bb78',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '1.25rem 2rem',
    fontSize: '1.2rem',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#38a169',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    }
  },
  closeButton: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    zIndex: 3000,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#c53030'
    }
  }
});

const PracticeTestPage = ({ testId, onClose }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testStructure, setTestStructure] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [questions, setQuestions] = useState([]);

  const testNumber = parseInt(testId, 10);

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

  useEffect(() => {
    loadTestStructure();
  }, [testNumber]);

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
   * Load questions for a specific section
   */
  const loadSectionQuestions = async (section) => {
    try {
      setLoading(true);
      setError(null);

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
   * Handle back to section selection
   */
  const handleBackToSelection = () => {
    setSelectedSection(null);
    setQuestions([]);
  };

  /**
   * Render loading state
   */
  if (loading && !testStructure) {
    return (
      <div className={classes.container}>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner} />
          <div className={classes.loadingText}>Loading Practice Test {testNumber}...</div>
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
    const sectionName =
      selectedSection === 'full'
        ? 'Full Practice Test'
        : sectionConfig[selectedSection]?.name || selectedSection;

    return (
      <DiagnosticTestUI
        title={`Practice Test ${testNumber} - ${sectionName}`}
        section={selectedSection === 'full' ? 'Full' : sectionConfig[selectedSection]?.name}
        questions={questions}
        duration={
          selectedSection === 'full'
            ? 175
            : sectionConfig[selectedSection]?.timeMinutes || null
        }
        onComplete={handleBackToSelection}
        onClose={onClose}
      />
    );
  }

  /**
   * Render section selection
   */
  return (
    <div className={classes.container}>
      <button onClick={onClose} className={classes.closeButton}>
        ✕ Close
      </button>
      <div className={classes.sectionSelector}>
        <h1 className={classes.sectionTitle}>Practice Test {testNumber}</h1>
        <p className={classes.sectionDescription}>
          Choose a section to practice, or take the full test with 215 questions across all
          sections.
        </p>

        <div className={classes.sectionGrid}>
          {Object.entries(sectionConfig).map(([key, config]) => {
            const questionCount = testStructure?.[key] || 0;
            return (
              <div
                key={key}
                className={classes.sectionCard}
                onClick={() => loadSectionQuestions(key)}
              >
                <div className={classes.sectionCardTitle}>
                  {config.emoji} {config.name}
                </div>
                <div className={classes.sectionCardQuestions}>
                  {questionCount} questions
                </div>
                <div className={classes.sectionCardTime}>
                  {config.timeMinutes} minutes
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={loadFullTest} className={classes.fullTestButton}>
          🎯 Take Full Practice Test (215 questions, 175 minutes)
        </button>
      </div>
    </div>
  );
};

export default PracticeTestPage;
