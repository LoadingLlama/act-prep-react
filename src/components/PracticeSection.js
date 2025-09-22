import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import InteractiveQuestion from './InteractiveQuestion';
import SequentialTest from './SequentialTest';

const useStyles = createUseStyles({
  practiceContainer: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  sectionHeader: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0'
  },
  sectionDescription: {
    color: '#4a5568',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  progressBar: {
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    height: '8px',
    marginBottom: '1.5rem',
    overflow: 'hidden'
  },
  progressFill: {
    backgroundColor: '#48bb78',
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '0.9rem',
    color: '#4a5568',
    marginBottom: '0.5rem',
    textAlign: 'center'
  },
  resetAllButton: {
    backgroundColor: '#f7fafc',
    color: '#4a5568',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '1.5rem',
    '&:hover': {
      backgroundColor: '#edf2f7',
      borderColor: '#cbd5e0'
    }
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
});

const PracticeSection = ({
  title = "Practice Questions",
  description = "Try these problems using the techniques you've learned:",
  questions = [],
  isTest = false
}) => {
  const classes = useStyles();
  const [questionStates, setQuestionStates] = useState({});

  const updateQuestionState = (questionIndex, state) => {
    setQuestionStates(prev => ({
      ...prev,
      [questionIndex]: state
    }));
  };

  const resetAllQuestions = () => {
    setQuestionStates({});
  };

  // If this is a test format, use the SequentialTest component
  if (isTest) {
    return (
      <SequentialTest
        title={title}
        description={description}
        questions={questions}
      />
    );
  }

  // Calculate progress
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(questionStates).length;
  const correctAnswers = Object.values(questionStates).filter(state => state.isCorrect).length;
  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  return (
    <div className={classes.practiceContainer}>
      <h3 className={classes.sectionHeader}>{title}</h3>

      <p className={classes.sectionDescription}>{description}</p>

      {totalQuestions > 0 && (
        <>
          <div className={classes.progressText}>
            Progress: {answeredQuestions}/{totalQuestions} questions completed
            {answeredQuestions > 0 && ` (${correctAnswers} correct)`}
          </div>
          <div className={classes.progressBar}>
            <div
              className={classes.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {answeredQuestions > 0 && (
            <button
              className={classes.resetAllButton}
              onClick={resetAllQuestions}
            >
              Reset All Questions
            </button>
          )}
        </>
      )}

      <div className={classes.questionsContainer}>
        {questions.map((question, index) => (
          <InteractiveQuestion
            key={index}
            questionNumber={index + 1}
            questionText={question.text}
            answers={question.answers}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
            hint={question.hint}
            onStateChange={(state) => updateQuestionState(index, state)}
          />
        ))}
      </div>
    </div>
  );
};

export default PracticeSection;