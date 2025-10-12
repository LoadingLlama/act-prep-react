import { createUseStyles } from 'react-jss';

export const useInteractiveQuizStyles = createUseStyles({
  interactiveQuiz: {
    border: '2px solid #dc2626',
    borderRadius: '12px',
    padding: '0',
    margin: '3rem auto 3rem auto',
    maxWidth: '1200px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    transition: 'box-shadow 0.2s ease',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    '& > h3': {
      marginTop: '0 !important'
    },
    '&.final-quiz': {
      border: '2px solid #dc2626',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      '&:hover': {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  quizProgress: {
    marginBottom: '1rem'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1a73e8',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  quizContainer: {
    marginBottom: '1.5rem',
    padding: '1.5rem 2rem'
  },
  quizQuestion: {
    marginBottom: '1rem'
  },
  questionText: {
    fontSize: '19px',
    color: '#111827',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
    fontWeight: '500',
    textAlign: 'left',
    padding: '0',
    letterSpacing: 'normal',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    '& u': {
      fontSize: '19px !important',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important',
      lineHeight: '1.6 !important',
      fontWeight: '500 !important',
      textDecoration: 'underline'
    }
  },
  quizOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    marginBottom: '1.5rem'
  },
  quizOption: {
    padding: '1rem 1.25rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    cursor: 'pointer',
    fontSize: '17px',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    lineHeight: '1.6',
    fontWeight: '400',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      transform: 'translateX(4px)'
    },
    '&.selected': {
      background: '#eff6ff',
      borderColor: '#3b82f6',
      color: '#1e40af'
    },
    '&.correct': {
      borderColor: '#48bb78',
      backgroundColor: '#f0fff4',
      color: '#2f855a',
      '&::before': {
        content: '"✓ "',
        color: '#48bb78',
        fontWeight: 'bold'
      }
    },
    '&.incorrect': {
      borderColor: '#f56565',
      backgroundColor: '#fffafa',
      color: '#c53030',
      '&::before': {
        content: '"✗ "',
        color: '#f56565',
        fontWeight: 'bold'
      }
    },
    '&.not-selected-correct': {
      borderColor: '#48bb78',
      backgroundColor: '#f0fff4',
      color: '#2f855a',
      opacity: 0.8,
      '&::before': {
        content: '"✓ "',
        color: '#48bb78',
        fontWeight: 'bold'
      }
    },
    '&:disabled': {
      cursor: 'not-allowed'
    }
  },
  quizFeedback: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0.75rem 0',
    marginTop: '0.75rem'
  },
  feedbackText: {
    color: '#6b7280',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  quizNavigation: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '0.75rem',
    borderTop: 'none',
    paddingTop: '0.75rem',
    padding: '0.75rem 2rem 1.5rem 2rem'
  },
  navButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    '&.prev': {
      backgroundColor: '#f7fafc',
      color: '#4a5568',
      border: '1px solid #e2e8f0',
      '&:hover': {
        backgroundColor: '#edf2f7'
      }
    },
    '&.next': {
      backgroundColor: '#dc2626',
      color: 'white',
      '&:hover': {
        backgroundColor: '#b91c1c'
      }
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  quizScoreInline: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#dc2626'
  },
  quizResults: {
    textAlign: 'center',
    padding: '1.5rem 2rem'
  },
  quizScore: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '1.5rem 0',
    marginBottom: '1rem',
    '&.final-score': {
      backgroundColor: 'transparent'
    }
  },
  finalScoreText: {
    fontSize: '1.5rem',
    color: '#1f2937',
    marginBottom: '1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '500',
    '& span': {
      color: '#dc2626',
      fontWeight: '700',
      fontSize: '1.8rem'
    }
  },
  scoreMessage: {
    padding: '1rem 0',
    borderRadius: '0',
    margin: '0.75rem 0',
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    '&.master': {
      backgroundColor: 'transparent',
      color: '#2f855a',
      border: 'none'
    },
    '&.proficient': {
      backgroundColor: 'transparent',
      color: '#dc2626',
      border: 'none'
    },
    '&.developing': {
      backgroundColor: 'transparent',
      color: '#d69e2e',
      border: 'none'
    },
    '&.needs-work': {
      backgroundColor: 'transparent',
      color: '#c53030',
      border: 'none'
    }
  },
  quizActions: {
    marginTop: '1rem'
  },
  resetQuiz: {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 2rem',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    '&:hover': {
      backgroundColor: '#b91c1c'
    }
  },
  masteryLevels: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '1.25rem 0',
    textAlign: 'left',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    '& h4': {
      color: '#1f2937',
      marginBottom: '1rem',
      fontWeight: '600',
      fontSize: '17px'
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    '& li': {
      padding: '0.5rem 0',
      color: '#6b7280',
      fontSize: '15px',
      lineHeight: '1.6',
      '& strong': {
        color: '#dc2626'
      },
      '& em': {
        color: '#1f2937',
        fontWeight: '600'
      }
    }
  },
  quizIntro: {
    color: '#6b7280',
    fontSize: '15px',
    marginBottom: '1rem',
    lineHeight: '1.6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
});
