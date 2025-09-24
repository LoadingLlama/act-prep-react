import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  practiceContainer: {
    marginTop: '2rem',
    marginBottom: '4rem',
    maxWidth: '900px',
    margin: '2rem auto',
    minHeight: '80vh',
    padding: '0 1rem'
  },

  // Header styles
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  },
  headerLeft: {
    flex: 1
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  description: {
    color: '#4a5568',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '0'
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
    marginLeft: '2rem'
  },
  progressInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.85rem',
    color: '#4a5568',
    fontWeight: '500'
  },
  progressBar: {
    backgroundColor: '#e2e8f0',
    borderRadius: '6px',
    height: '6px',
    width: '120px',
    overflow: 'hidden'
  },
  progressFill: {
    backgroundColor: '#48bb78',
    height: '100%',
    borderRadius: '6px',
    transition: 'width 0.3s ease'
  },
  questionCounter: {
    fontSize: '0.8rem',
    color: '#718096',
    fontWeight: '500'
  },

  // Question container styles
  questionContainer: {
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e2e8f0'
  },
  questionNumber: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#4a5568'
  },
  questionBadge: {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  questionText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#2d3748',
    marginBottom: '1.5rem',
    fontWeight: '500',
    flex: 1,
    '& u': {
      textDecoration: 'underline',
      fontWeight: '600'
    }
  },

  // Answer options styles
  answersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem'
  },
  answerOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    backgroundColor: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '1rem',
    '&:hover': {
      borderColor: '#cbd5e0',
      backgroundColor: '#edf2f7',
      transform: 'translateY(-1px)'
    }
  },
  answerOptionSelected: {
    borderColor: '#4299e1',
    backgroundColor: '#ebf8ff',
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.1)'
  },
  answerOptionCorrect: {
    borderColor: '#48bb78',
    backgroundColor: '#f0fff4',
    boxShadow: '0 0 0 3px rgba(72, 187, 120, 0.1)',
    '&:hover': {
      borderColor: '#48bb78',
      backgroundColor: '#f0fff4',
      transform: 'none'
    }
  },
  answerOptionIncorrect: {
    borderColor: '#f56565',
    backgroundColor: '#fed7d7',
    boxShadow: '0 0 0 3px rgba(245, 101, 101, 0.1)',
    '&:hover': {
      borderColor: '#f56565',
      backgroundColor: '#fed7d7',
      transform: 'none'
    }
  },
  answerLabel: {
    fontWeight: '700',
    color: '#4a5568',
    marginRight: '1rem',
    minWidth: '2rem',
    fontSize: '1rem'
  },
  answerText: {
    flex: 1,
    color: '#2d3748',
    '& u': {
      textDecoration: 'underline',
      fontWeight: '600'
    }
  },

  // Action buttons styles
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e2e8f0'
  },
  leftActions: {
    display: 'flex',
    gap: '0.75rem'
  },
  rightActions: {
    display: 'flex',
    gap: '0.75rem'
  },
  navButton: {
    backgroundColor: 'transparent',
    color: '#718096',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
      borderColor: '#cbd5e0',
      color: '#4a5568'
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: '#e2e8f0',
        color: '#718096'
      }
    }
  },
  resetButton: {
    backgroundColor: 'transparent',
    color: '#e53e3e',
    border: '1px solid #fed7d7',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#fed7d7',
      borderColor: '#feb2b2'
    }
  },
  submitButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#3182ce',
      transform: 'translateY(-1px)'
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: '#a0aec0',
        transform: 'none'
      }
    }
  },
  nextButton: {
    backgroundColor: '#48bb78',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#38a169',
      transform: 'translateY(-1px)'
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: '#a0aec0',
        transform: 'none'
      }
    }
  },

  // Feedback styles
  feedback: {
    marginTop: '1.5rem',
    padding: '1.25rem',
    borderRadius: '12px',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  },
  feedbackCorrect: {
    backgroundColor: '#f0fff4',
    border: '2px solid #9ae6b4',
    color: '#2f855a'
  },
  feedbackIncorrect: {
    backgroundColor: '#fed7d7',
    border: '2px solid #feb2b2',
    color: '#c53030'
  },
  explanation: {
    marginTop: '0.75rem',
    fontSize: '0.9rem',
    color: '#4a5568',
    lineHeight: '1.6'
  },

  // Completion screen styles
  completionContainer: {
    textAlign: 'center',
    padding: '3rem 2rem',
    backgroundColor: '#f0fff4',
    border: '2px solid #9ae6b4',
    borderRadius: '16px',
    margin: '2rem 0'
  },
  completionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#2f855a',
    marginBottom: '1rem'
  },
  completionStats: {
    fontSize: '1.1rem',
    color: '#4a5568',
    marginBottom: '2rem'
  },
  restartButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#3182ce',
      transform: 'translateY(-1px)'
    }
  }
});

const SequentialPracticeSection = ({
  title = "Practice Questions",
  description = "Answer each question to continue. You must complete all questions.",
  questions = [],
  onAnswerChange = null,
  showCompletionMessage = false,
  preventProgression = false
}) => {
  const classes = useStyles();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
  const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
  const isCompleted = answeredQuestions === totalQuestions;

  const handleAnswerSelect = (answerKey) => {
    if (!isSubmitted) {
      setSelectedAnswer(answerKey);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && currentQuestion) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setIsSubmitted(true);
      setShowFeedback(true);

      const answerData = {
        selectedAnswer,
        isCorrect,
        questionId: currentQuestion.id
      };

      setAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answerData
      }));

      // Notify parent of answer change
      if (onAnswerChange) {
        onAnswerChange(currentQuestionIndex, answerData);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowFeedback(false);

      // Removed automatic scrolling
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowFeedback(false);

      // Removed automatic scrolling
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowFeedback(false);
  };

  const getAnswerClassName = (answerKey) => {
    let className = classes.answerOption;

    if (selectedAnswer === answerKey) {
      className += ` ${classes.answerOptionSelected}`;
    }

    if (isSubmitted && currentQuestion) {
      if (answerKey === currentQuestion.correctAnswer) {
        className += ` ${classes.answerOptionCorrect}`;
      } else if (selectedAnswer === answerKey && answerKey !== currentQuestion.correctAnswer) {
        className += ` ${classes.answerOptionIncorrect}`;
      }
    }

    return className;
  };

  if (isCompleted) {
    return (
      <div className={classes.practiceContainer}>
        <div className={classes.completionContainer}>
          <div className={classes.completionTitle}>
            🎉 Practice Complete!
          </div>
          <div className={classes.completionStats}>
            You answered {correctAnswers} out of {totalQuestions} questions correctly
            <br />
            Score: {Math.round((correctAnswers / totalQuestions) * 100)}%
          </div>
          <button className={classes.restartButton} onClick={handleRestart}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const canProceed = isSubmitted;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className={classes.practiceContainer}>
      {/* Header with progress */}
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{description}</div>
        </div>
        <div className={classes.headerRight}>
          <div className={classes.questionCounter}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div className={classes.progressInfo}>
            <div className={classes.progressBar}>
              <div
                className={classes.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span>{answeredQuestions} completed</span>
          </div>
        </div>
      </div>

      {/* Question container */}
      <div className={classes.questionContainer}>
        <div className={classes.questionHeader}>
          <div className={classes.questionNumber}>
            Question {currentQuestionIndex + 1}
          </div>
          <div className={classes.questionBadge}>
            {currentQuestion.prompt || "Choose the best answer"}
          </div>
        </div>

        <div
          className={classes.questionText}
          dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
        />

        <div className={classes.answersContainer}>
          {Object.entries(currentQuestion.answers).map(([key, text]) => (
            <div
              key={key}
              className={getAnswerClassName(key)}
              onClick={() => handleAnswerSelect(key)}
            >
              <span className={classes.answerLabel}>{key}</span>
              <span
                className={classes.answerText}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          ))}
        </div>

        {showFeedback && (
          <div className={`${classes.feedback} ${isCorrect ? classes.feedbackCorrect : classes.feedbackIncorrect}`}>
            <strong>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </strong>
            {isCorrect
              ? ' Well done!'
              : ` The correct answer is ${currentQuestion.correctAnswer}.`
            }

            {currentQuestion.explanation && (
              <div className={classes.explanation}>
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </div>
            )}

            {currentQuestion.hint && !isCorrect && (
              <div className={classes.explanation}>
                <strong>Hint:</strong> {currentQuestion.hint}
              </div>
            )}
          </div>
        )}

        <div className={classes.actionsContainer}>
          <div className={classes.leftActions}>
            <button
              className={classes.navButton}
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
          </div>

          <div className={classes.rightActions}>
            {!isSubmitted ? (
              <button
                className={classes.submitButton}
                onClick={handleSubmit}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </button>
            ) : (
              <>
                <button
                  className={classes.resetButton}
                  onClick={handleRestart}
                >
                  Restart Quiz
                </button>
                {!isLastQuestion && (
                  <button
                    className={classes.nextButton}
                    onClick={handleNext}
                  >
                    Next Question →
                  </button>
                )}
                {isLastQuestion && (
                  <button
                    className={classes.submitButton}
                    onClick={handleNext}
                  >
                    View Results
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequentialPracticeSection;