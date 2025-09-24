import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  quizContainer: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '2rem',
    margin: '2rem 0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },

  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },

  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '0.5rem'
  },

  progressBadge: {
    display: 'inline-block',
    backgroundColor: '#f7fafc',
    color: '#4a5568',
    padding: '0.25rem 0.75rem',
    borderRadius: '16px',
    fontSize: '0.85rem',
    fontWeight: '500'
  },

  questionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem'
  },

  questionText: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },

  answersGrid: {
    display: 'grid',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  },

  answerOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#cbd5e0',
      backgroundColor: '#f7fafc'
    }
  },

  answerOptionSelected: {
    borderColor: '#3182ce',
    backgroundColor: '#ebf8ff'
  },

  answerOptionCorrect: {
    borderColor: '#38a169',
    backgroundColor: '#f0fff4',
    '&:hover': {
      borderColor: '#38a169',
      backgroundColor: '#f0fff4'
    }
  },

  answerOptionIncorrect: {
    borderColor: '#e53e3e',
    backgroundColor: '#fed7d7',
    '&:hover': {
      borderColor: '#e53e3e',
      backgroundColor: '#fed7d7'
    }
  },

  answerLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: '#edf2f7',
    borderRadius: '50%',
    fontWeight: '600',
    color: '#4a5568',
    marginRight: '1rem',
    flexShrink: 0
  },

  answerText: {
    flex: 1,
    color: '#2d3748'
  },

  actionButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem'
  },

  submitButton: {
    backgroundColor: '#3182ce',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2c5282'
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed'
    }
  },

  navigationButton: {
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#e2e8f0'
    }
  },

  feedback: {
    padding: '1rem',
    borderRadius: '8px',
    margin: '1rem 0',
    fontSize: '0.9rem'
  },

  feedbackCorrect: {
    backgroundColor: '#f0fff4',
    color: '#22543d',
    border: '1px solid #9ae6b4'
  },

  feedbackIncorrect: {
    backgroundColor: '#fed7d7',
    color: '#742a2a',
    border: '1px solid #fc8181'
  },

  completionMessage: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f0fff4',
    border: '2px solid #38a169',
    borderRadius: '12px',
    fontSize: '1.1rem',
    color: '#22543d',
    fontWeight: '500'
  }
});

const CompactQuizSection = ({ title, description, questions, onComplete }) => {
  const classes = useStyles();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState(new Set());

  const totalQuestions = questions.length;
  const answeredQuestions = submittedQuestions.size;
  const allCompleted = answeredQuestions === totalQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionSubmitted = submittedQuestions.has(currentQuestionIndex);
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  // Notify parent of completion status
  useEffect(() => {
    if (onComplete && allCompleted) {
      onComplete();
    }
  }, [allCompleted, onComplete]);

  const handleAnswerSelect = (answerKey) => {
    if (!currentQuestionSubmitted) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answerKey
      }));
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && currentQuestion) {
      setSubmittedQuestions(prev => new Set([...prev, currentQuestionIndex]));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getAnswerClassName = (answerKey) => {
    let className = classes.answerOption;

    if (selectedAnswer === answerKey) {
      className += ` ${classes.answerOptionSelected}`;
    }

    if (currentQuestionSubmitted && currentQuestion) {
      if (answerKey === currentQuestion.correct) {
        className += ` ${classes.answerOptionCorrect}`;
      } else if (selectedAnswer === answerKey && answerKey !== currentQuestion.correct) {
        className += ` ${classes.answerOptionIncorrect}`;
      }
    }

    return className;
  };

  if (allCompleted) {
    const correctCount = Array.from(submittedQuestions).filter(index => {
      const question = questions[index];
      const answer = selectedAnswers[index];
      return answer === question.correct;
    }).length;

    return (
      <div className={classes.quizContainer}>
        <div className={classes.completionMessage}>
          🎉 Quiz Complete! You answered {correctCount} out of {totalQuestions} questions correctly.
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  const isCorrect = selectedAnswer === currentQuestion.correct;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className={classes.quizContainer}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        <div className={classes.progressBadge}>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
      </div>

      <div className={classes.questionCard}>
        <div
          className={classes.questionText}
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />

        <div className={classes.answersGrid}>
          {currentQuestion.choices.map((choice, index) => {
            const answerKey = index;
            return (
              <div
                key={answerKey}
                className={getAnswerClassName(answerKey)}
                onClick={() => handleAnswerSelect(answerKey)}
              >
                <span className={classes.answerLabel}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={classes.answerText}>
                  {choice}
                </span>
              </div>
            );
          })}
        </div>

        {currentQuestionSubmitted && (
          <div className={`${classes.feedback} ${isCorrect ? classes.feedbackCorrect : classes.feedbackIncorrect}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect.'} {currentQuestion.explanation}
          </div>
        )}

        <div className={classes.actionButtons}>
          <div>
            {currentQuestionIndex > 0 && (
              <button
                className={classes.navigationButton}
                onClick={handlePrevious}
              >
                ← Previous
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!currentQuestionSubmitted ? (
              <button
                className={classes.submitButton}
                onClick={handleSubmit}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </button>
            ) : (
              currentQuestionIndex < totalQuestions - 1 && (
                <button
                  className={classes.submitButton}
                  onClick={handleNext}
                >
                  Next Question →
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactQuizSection;