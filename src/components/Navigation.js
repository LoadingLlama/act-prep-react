import React from 'react';
import { createUseStyles } from 'react-jss';
import { spacing, borderRadius } from '../utils/sharedStyles';

const useStyles = createUseStyles({
  navigation: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    background: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
    zIndex: 100
  },
  navButtons: {
    display: 'flex',
    gap: '0.5rem'
  },
  navButton: {
    background: '#f8f9fa',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover:not(:disabled)': {
      background: '#e5e7eb',
      borderColor: '#9ca3af'
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  }
});

const Navigation = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit
}) => {
  const classes = useStyles();
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className={classes.navigation}>
      <div className={classes.navButtons}>
        <button
          className={classes.navButton}
          onClick={onPrevious}
          disabled={currentQuestion === 1}
        >
          ← Previous
        </button>
        <button
          className={classes.navButton}
          onClick={isLastQuestion ? onSubmit : onNext}
        >
          {isLastQuestion ? 'Submit Test' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default Navigation;