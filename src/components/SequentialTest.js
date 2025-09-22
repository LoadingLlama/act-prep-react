import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import InteractiveQuestion from './InteractiveQuestion';

const useStyles = createUseStyles({
  testContainer: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  testHeader: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  testDescription: {
    color: '#4a5568',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    lineHeight: '1.6',
    textAlign: 'center'
  },
  progressContainer: {
    marginBottom: '2rem'
  },
  progressBar: {
    backgroundColor: '#e2e8f0',
    borderRadius: '6px',
    height: '12px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    backgroundColor: '#48bb78',
    height: '100%',
    borderRadius: '6px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '1rem',
    color: '#4a5568',
    textAlign: 'center',
    fontWeight: '600'
  },
  questionContainer: {
    marginBottom: '2rem'
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e2e8f0'
  },
  navButton: {
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
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed'
    }
  },
  nextButton: {
    backgroundColor: '#48bb78',
    '&:hover': {
      backgroundColor: '#38a169'
    },
    '&:disabled': {
      backgroundColor: '#a0aec0'
    }
  },
  resultsContainer: {
    textAlign: 'center',
    padding: '2rem'
  },
  resultsTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1rem'
  },
  scoreDisplay: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem'
  },
  scoreGood: {
    color: '#48bb78'
  },
  scoreOkay: {
    color: '#ed8936'
  },
  scorePoor: {
    color: '#e53e3e'
  },
  scoreMessage: {
    fontSize: '1.2rem',
    color: '#4a5568',
    marginBottom: '2rem'
  },
  restartButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#3182ce'
    }
  }
});

const SequentialTest = ({
  title = "Practice Test",
  description = "Complete all questions to see your results:",
  questions = []
}) => {
  const classes = useStyles();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState({});
  const [showResults, setShowResults] = useState(false);

  const updateQuestionState = (questionIndex, state) => {
    setQuestionStates(prev => ({
      ...prev,
      [questionIndex]: state
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setQuestionStates({});
    setShowResults(false);
  };

  const currentQuestionState = questionStates[currentQuestionIndex];
  const canProceed = currentQuestionState && currentQuestionState.selectedAnswer;

  // Calculate results
  const totalQuestions = questions.length;
  const correctAnswers = Object.values(questionStates).filter(state => state.isCorrect).length;
  const progressPercentage = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  const scorePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const getScoreClass = () => {
    if (scorePercentage >= 80) return classes.scoreGood;
    if (scorePercentage >= 60) return classes.scoreOkay;
    return classes.scorePoor;
  };

  const getScoreMessage = () => {
    if (scorePercentage >= 80) return "Excellent work! You've mastered backsolving!";
    if (scorePercentage >= 60) return "Good job! Keep practicing to improve further.";
    return "Keep studying and try again. You'll get better with practice!";
  };

  if (showResults) {
    return (
      <div className={classes.testContainer}>
        <div className={classes.resultsContainer}>
          <h2 className={classes.resultsTitle}>Test Complete!</h2>
          <div className={`${classes.scoreDisplay} ${getScoreClass()}`}>
            {correctAnswers}/{totalQuestions}
          </div>
          <div className={`${classes.scoreDisplay} ${getScoreClass()}`}>
            {Math.round(scorePercentage)}%
          </div>
          <p className={classes.scoreMessage}>
            {getScoreMessage()}
          </p>
          <button
            className={classes.restartButton}
            onClick={restartTest}
          >
            Take Test Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={classes.testContainer}>
        <p>No questions available for this test.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={classes.testContainer}>
      <h2 className={classes.testHeader}>{title}</h2>
      <p className={classes.testDescription}>{description}</p>

      <div className={classes.progressContainer}>
        <div className={classes.progressText}>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className={classes.progressBar}>
          <div
            className={classes.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className={classes.questionContainer}>
        <InteractiveQuestion
          key={currentQuestionIndex}
          questionNumber={currentQuestionIndex + 1}
          questionText={currentQuestion.text}
          answers={currentQuestion.answers}
          correctAnswer={currentQuestion.correctAnswer}
          explanation={currentQuestion.explanation}
          hint={currentQuestion.hint}
          onStateChange={(state) => updateQuestionState(currentQuestionIndex, state)}
        />
      </div>

      <div className={classes.navigationButtons}>
        <button
          className={classes.navButton}
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <button
          className={`${classes.navButton} ${classes.nextButton}`}
          onClick={goToNextQuestion}
          disabled={!canProceed}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default SequentialTest;