/**
 * Diagnostic Test UI Component
 * Matches the exact UI of the diagnostic test HTML version
 * Reusable for all ACT test sections
 */

import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import ImageUploadSection from './ImageUploadSection';

const useStyles = createUseStyles({
  testContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    overflow: 'hidden'
  },
  testHeader: {
    background: '#f8f9fa',
    borderBottom: '1px solid #e9ecef',
    padding: '0.5rem 1rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  logo: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1a1a1a',
    textDecoration: 'none',
    '&:hover': {
      color: '#374151'
    }
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  questionCounter: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: 500
  },
  endSectionButton: {
    background: 'transparent',
    color: '#6b7280',
    border: 'none',
    padding: '0.25rem 0.5rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.2s',
    '&:hover': {
      background: '#f3f4f6',
      color: '#1f2937'
    }
  },
  timer: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#1f2937',
    padding: '0.25rem 0.75rem',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '4px'
  },
  testMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    overflow: 'hidden'
  },
  testContent: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: (props) => props.hasPassages ? '1fr 1fr 60px' : '1fr 60px',
    gap: 0,
    padding: 0,
    minHeight: 0,
    margin: 0,
    overflow: 'hidden'
  },
  flagBar: {
    background: '#f8f9fa',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    minHeight: '3rem',
    fontSize: '0.85rem',
    gridColumn: (props) => props.hasPassages ? '1 / 3' : '1 / 2',
    zIndex: 5
  },
  itemNumber: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: 500
  },
  flagButton: {
    background: 'transparent',
    color: '#9ca3af',
    border: 'none',
    borderRadius: '4px',
    padding: '0.3rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
      color: '#6b7280'
    }
  },
  flagButtonActive: {
    color: '#dc3545',
    opacity: 1
  },
  passageSection: {
    gridColumn: 1,
    overflowY: 'auto',
    padding: '2rem 1.5rem',
    background: 'white',
    borderRight: '1px solid #e5e7eb'
  },
  passageContent: {
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#1f2937',
    '& p': {
      marginBottom: '1rem'
    }
  },
  passageTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: '#1f2937'
  },
  questionSection: {
    gridColumn: (props) => props.hasPassages ? 2 : 1,
    overflowY: 'auto',
    padding: '2rem 1.5rem',
    background: 'white'
  },
  question: {
    marginBottom: '2rem'
  },
  questionText: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#1f2937',
    marginBottom: '1.5rem',
    fontWeight: 400
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  choice: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'white',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db'
    }
  },
  choiceSelected: {
    background: '#eff6ff',
    borderColor: '#3b82f6',
    '&:hover': {
      background: '#eff6ff'
    }
  },
  choiceLetter: {
    fontWeight: 700,
    color: '#374151',
    marginRight: '1rem',
    minWidth: '1.5rem',
    fontSize: '0.9rem'
  },
  choiceText: {
    flex: 1,
    color: '#1f2937',
    lineHeight: 1.5
  },
  questionSidebar: {
    background: '#f8f9fa',
    padding: '0.75rem 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gridColumn: (props) => props.hasPassages ? 3 : 2,
    borderLeft: '1px solid #e5e7eb'
  },
  sidebarIcon: {
    fontSize: '1.5rem',
    marginBottom: '0.25rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'all 0.2s',
    '&:hover': {
      background: '#e5e7eb'
    }
  },
  sidebarText: {
    fontSize: '0.7rem',
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: 500,
    cursor: 'pointer'
  },
  navigation: {
    background: 'white',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '1rem',
    borderTop: '1px solid #e5e7eb',
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10
  },
  navButton: {
    padding: '0.625rem 1.25rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    background: 'white',
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover:not(:disabled)': {
      background: '#f9fafb',
      borderColor: '#6b7280'
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  },
  navButtonPrimary: {
    background: '#1f2937',
    color: 'white',
    borderColor: '#1f2937',
    '&:hover:not(:disabled)': {
      background: '#111827'
    }
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'white',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalClose: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '0.25rem',
    lineHeight: 1,
    '&:hover': {
      color: '#1f2937'
    }
  },
  questionGrid: {
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
    gap: '0.5rem'
  },
  questionGridItem: {
    padding: '0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s',
    background: 'white',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db'
    }
  },
  questionGridItemAnswered: {
    background: '#d1fae5',
    borderColor: '#10b981'
  },
  questionGridItemFlagged: {
    background: '#fee2e2',
    borderColor: '#ef4444'
  },
  questionGridItemCurrent: {
    background: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  }
});

const DiagnosticTestUI = ({
  title = 'Practice Test',
  section = 'English',
  questions = [],
  duration = null,
  onComplete,
  onClose
}) => {
  const hasPassages = questions.some((q) => q.passage);
  const showLeftPanel = hasPassages || section === 'Math' || section === 'Science';
  const classes = useStyles({ hasPassages: showLeftPanel });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration ? duration * 60 : null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;

  // Timer
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEndSection();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    if (seconds === null) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answerLetter) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answerLetter
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowModal(false);
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleEndSection = useCallback(() => {
    if (onComplete) {
      // Calculate score
      const correctCount = questions.reduce((count, question, index) => {
        const userAnswer = answers[index];
        return userAnswer === question.correctAnswer ? count + 1 : count;
      }, 0);

      onComplete({
        answers,
        correctCount,
        totalQuestions: questions.length,
        percentage: (correctCount / questions.length) * 100
      });
    }
  }, [answers, questions, onComplete]);

  if (!currentQuestion) {
    return <div className={classes.testContainer}>Loading...</div>;
  }

  return (
    <div className={classes.testContainer}>
      {/* Header */}
      <div className={classes.testHeader}>
        <div className={classes.headerContent}>
          <a href="/" className={classes.logo}>
            actcourse.org
          </a>
          <div className={classes.headerRight}>
            <span className={classes.questionCounter}>
              Question {currentQuestionNumber} of {questions.length}
            </span>
            <button className={classes.endSectionButton} onClick={onClose || handleEndSection}>
              ⏹️ End Section
            </button>
            {timeLeft !== null && <div className={classes.timer}>{formatTime(timeLeft)}</div>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={classes.testMain}>
        <div className={classes.testContent}>
          {/* Flag Bar */}
          <div className={classes.flagBar}>
            <span className={classes.itemNumber}>Item {currentQuestionNumber}</span>
            <button
              className={`${classes.flagButton} ${
                flaggedQuestions.has(currentQuestionIndex) ? classes.flagButtonActive : ''
              }`}
              onClick={toggleFlag}
            >
              🏳️ Flag
            </button>
          </div>

          {/* Passage Section (if applicable) */}
          {hasPassages && currentQuestion.passage && (
            <div className={classes.passageSection}>
              <div className={classes.passageContent}>
                {currentQuestion.passage.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload Section for Math and Science (when no passages) */}
          {!hasPassages && (section === 'Math' || section === 'Science') && (
            <div className={classes.passageSection}>
              <ImageUploadSection
                onImagesChange={(images) => setUploadedImages(images)}
                maxImages={5}
              />
            </div>
          )}

          {/* Question Section */}
          <div className={classes.questionSection}>
            <div className={classes.question}>
              <div className={classes.questionText}>{currentQuestion.text}</div>

              <div className={classes.choicesContainer}>
                {Object.entries(currentQuestion.answers).map(([letter, text]) => (
                  <div
                    key={letter}
                    className={`${classes.choice} ${
                      answers[currentQuestionIndex] === letter ? classes.choiceSelected : ''
                    }`}
                    onClick={() => handleAnswer(letter)}
                  >
                    <span className={classes.choiceLetter}>{letter}.</span>
                    <span className={classes.choiceText}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Sidebar */}
          <div className={classes.questionSidebar}>
            <div className={classes.sidebarIcon} onClick={() => setShowModal(true)}>
              📋
            </div>
            <div className={classes.sidebarText} onClick={() => setShowModal(true)}>
              Questions
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className={classes.navigation}>
          <button
            className={classes.navButton}
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </button>
          <button
            className={`${classes.navButton} ${classes.navButtonPrimary}`}
            onClick={goToNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Question Navigator Modal */}
      {showModal && (
        <div className={classes.modal} onClick={() => setShowModal(false)}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modalHeader}>
              <h2>Question Navigator</h2>
              <button className={classes.modalClose} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className={classes.questionGrid}>
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isFlagged = flaggedQuestions.has(index);
                const isCurrent = index === currentQuestionIndex;

                let className = classes.questionGridItem;
                if (isCurrent) className += ` ${classes.questionGridItemCurrent}`;
                else if (isFlagged) className += ` ${classes.questionGridItemFlagged}`;
                else if (isAnswered) className += ` ${classes.questionGridItemAnswered}`;

                return (
                  <div key={index} className={className} onClick={() => goToQuestion(index)}>
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticTestUI;
