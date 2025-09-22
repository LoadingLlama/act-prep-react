import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  questionContainer: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  questionNumber: {
    color: '#4a5568',
    fontWeight: '600',
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  },
  questionText: {
    color: '#2d3748',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    fontWeight: '500'
  },
  answersContainer: {
    display: 'grid',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  answerOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.95rem',
    '&:hover': {
      borderColor: '#cbd5e0',
      backgroundColor: '#f7fafc'
    }
  },
  answerOptionSelected: {
    borderColor: '#4299e1',
    backgroundColor: '#ebf8ff'
  },
  answerOptionCorrect: {
    borderColor: '#48bb78',
    backgroundColor: '#f0fff4',
    '&:hover': {
      borderColor: '#48bb78',
      backgroundColor: '#f0fff4'
    }
  },
  answerOptionIncorrect: {
    borderColor: '#f56565',
    backgroundColor: '#fed7d7',
    '&:hover': {
      borderColor: '#f56565',
      backgroundColor: '#fed7d7'
    }
  },
  answerLabel: {
    fontWeight: '600',
    color: '#4a5568',
    marginRight: '0.75rem',
    minWidth: '1.5rem'
  },
  answerText: {
    flex: 1,
    color: '#2d3748'
  },
  submitButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginRight: '0.75rem',
    '&:hover': {
      backgroundColor: '#3182ce'
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed'
    }
  },
  resetButton: {
    backgroundColor: 'transparent',
    color: '#4a5568',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
      borderColor: '#cbd5e0'
    }
  },
  feedback: {
    marginTop: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    lineHeight: '1.5'
  },
  feedbackCorrect: {
    backgroundColor: '#f0fff4',
    border: '1px solid #9ae6b4',
    color: '#2f855a'
  },
  feedbackIncorrect: {
    backgroundColor: '#fed7d7',
    border: '1px solid #feb2b2',
    color: '#c53030'
  },
  explanation: {
    marginTop: '0.75rem',
    fontSize: '0.85rem',
    color: '#4a5568',
    lineHeight: '1.5'
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

const InteractiveQuestion = ({
  questionNumber,
  questionText,
  answers,
  correctAnswer,
  explanation,
  hint,
  onStateChange
}) => {
  const classes = useStyles();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answerKey) => {
    if (!isSubmitted) {
      setSelectedAnswer(answerKey);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
      setShowFeedback(true);

      // Call the callback to update parent state
      if (onStateChange) {
        onStateChange({
          isCorrect: selectedAnswer === correctAnswer,
          selectedAnswer,
          isSubmitted: true
        });
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowFeedback(false);

    // Call the callback to clear parent state
    if (onStateChange) {
      onStateChange({
        isCorrect: false,
        selectedAnswer: null,
        isSubmitted: false
      });
    }
  };

  const getAnswerClassName = (answerKey) => {
    let className = classes.answerOption;

    if (selectedAnswer === answerKey) {
      className += ` ${classes.answerOptionSelected}`;
    }

    if (isSubmitted) {
      if (answerKey === correctAnswer) {
        className += ` ${classes.answerOptionCorrect}`;
      } else if (selectedAnswer === answerKey && answerKey !== correctAnswer) {
        className += ` ${classes.answerOptionIncorrect}`;
      }
    }

    return className;
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className={classes.questionContainer}>
      <div className={classes.questionNumber}>
        Question {questionNumber}
      </div>

      <div className={classes.questionText}>
        {questionText}
      </div>

      <div className={classes.answersContainer}>
        {Object.entries(answers).map(([key, text]) => (
          <div
            key={key}
            className={getAnswerClassName(key)}
            onClick={() => handleAnswerSelect(key)}
          >
            <span className={classes.answerLabel}>{key}.</span>
            <span className={classes.answerText}>{text}</span>
          </div>
        ))}
      </div>

      <div className={classes.buttonsContainer}>
        <button
          className={classes.submitButton}
          onClick={handleSubmit}
          disabled={!selectedAnswer || isSubmitted}
        >
          {isSubmitted ? 'Submitted' : 'Submit Answer'}
        </button>

        {isSubmitted && (
          <button
            className={classes.resetButton}
            onClick={handleReset}
          >
            Try Again
          </button>
        )}
      </div>

      {showFeedback && (
        <div className={`${classes.feedback} ${isCorrect ? classes.feedbackCorrect : classes.feedbackIncorrect}`}>
          <strong>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </strong>
          {isCorrect
            ? ' Great job using backsolving!'
            : ` The correct answer is ${correctAnswer}.`
          }

          {explanation && (
            <div className={classes.explanation}>
              <strong>Explanation:</strong> {explanation}
            </div>
          )}

          {hint && !isCorrect && (
            <div className={classes.explanation}>
              <strong>Hint:</strong> {hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveQuestion;