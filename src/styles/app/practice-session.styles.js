/**
 * Practice Session Styles
 * Gamified practice interface with 5-star capability rating
 */

import { createUseStyles } from 'react-jss';

export const usePracticeSessionStyles = createUseStyles({
  practiceContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '900px',
    '@media (max-width: 768px)': {
      padding: '1rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem'
    }
  },
  practiceHeader: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.25rem',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      padding: '1rem',
      marginBottom: '1rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem',
      marginBottom: '0.75rem'
    }
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  backButton: {
    background: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f8fafc',
      color: '#1a1a1a'
    }
  },
  masteryBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: '#f0fdf4',
    border: '2px solid #10b981',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#10b981'
  },
  lessonTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
    lineHeight: '1.3',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem'
    }
  },
  practiceSubtitle: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '1rem'
  },
  progressBar: {
    height: '8px',
    background: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
    transition: 'width 0.3s ease',
    borderRadius: '4px'
  },
  progressText: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600'
  },
  questionCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      padding: '1rem',
      marginBottom: '1rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem',
      marginBottom: '0.75rem'
    }
  },
  questionNumber: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem'
  },
  questionText: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      marginBottom: '1rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.95rem',
      marginBottom: '0.75rem'
    }
  },
  choicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  choiceButton: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem 1.25rem',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#1a1a1a',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      padding: '0.75rem 1rem',
      fontSize: '0.9rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.625rem 0.75rem',
      fontSize: '0.85rem'
    },
    '&:hover': {
      borderColor: '#cbd5e1',
      boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.15)',
      transform: 'none'
    },
    '&.selected': {
      borderColor: '#0f172a',
      background: '#eff6ff',
      fontWeight: '600',
      boxShadow: '0 3px 0 0 rgba(15, 23, 42, 0.25)'
    },
    '&.correct': {
      borderColor: '#10b981',
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
      color: '#10b981',
      fontWeight: '600',
      boxShadow: '0 3px 0 0 rgba(16, 185, 129, 0.3)'
    },
    '&.incorrect': {
      borderColor: '#ef4444',
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(239, 68, 68, 0.06) 100%)',
      color: '#ef4444',
      fontWeight: '600',
      boxShadow: '0 3px 0 0 rgba(239, 68, 68, 0.2)'
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  choiceLabel: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#64748b',
    flexShrink: 0
  },
  explanation: {
    background: '#f0f9ff',
    border: '2px solid #3b82f6',
    borderRadius: '8px',
    padding: '1.25rem',
    marginTop: '1rem'
  },
  explanationLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  },
  explanationText: {
    fontSize: '0.95rem',
    color: '#1e40af',
    lineHeight: '1.6'
  },
  actionButtons: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.5rem',
    justifyContent: 'flex-end'
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&.primary': {
      background: '#3b82f6',
      color: '#ffffff',
      boxShadow: '0 3px 0 0 rgba(59, 130, 246, 0.25)',
      '&:hover': {
        background: '#2563eb',
        transform: 'none',
        boxShadow: '0 3px 0 0 rgba(37, 99, 235, 0.3)'
      },
      '&:disabled': {
        background: '#cbd5e1',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.05)'
      }
    },
    '&.secondary': {
      background: '#ffffff',
      color: '#64748b',
      border: '1px solid #e2e8f0',
      boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)',
      '&:hover': {
        background: '#f8fafc',
        borderColor: '#cbd5e1',
        boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.15)'
      }
    }
  },
  ratingSection: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      padding: '1.5rem'
    },
    '@media (max-width: 480px)': {
      padding: '1rem'
    }
  },
  ratingTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem'
    }
  },
  ratingSubtitle: {
    fontSize: '0.95rem',
    color: '#64748b',
    marginBottom: '2rem'
  },
  starRating: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  star: {
    fontSize: '3rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#e2e8f0',
    '@media (max-width: 768px)': {
      fontSize: '2.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem'
    },
    '&.filled': {
      color: '#fbbf24'
    },
    '&:hover': {
      transform: 'scale(1.15)',
      filter: 'drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3))'
    }
  },
  ratingLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '400px',
    margin: '0 auto 2rem',
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  performanceStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    background: '#f8fafc',
    borderRadius: '8px',
    '@media (max-width: 768px)': {
      padding: '1rem',
      gap: '0.75rem'
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      padding: '0.75rem',
      gap: '0.5rem'
    }
  },
  stat: {
    textAlign: 'center'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
    }
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '600',
    marginTop: '0.5rem'
  },
  completeButton: {
    background: '#10b981',
    color: '#ffffff',
    padding: '0.875rem 2rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#059669',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)'
    }
  },
  masteryLevel: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: '1rem',
    fontWeight: '500'
  }
});
