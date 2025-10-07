import { createUseStyles } from 'react-jss';

export const useProgressiveLessonStyles = createUseStyles({
  progressiveContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: 1.65,
    color: '#2d3748',
    background: '#ffffff',
    padding: '2rem 3rem',
    maxWidth: '850px',
    margin: '0 auto',
    textAlign: 'left',
    borderRadius: '0',
    fontSize: '15px',

    '& h1': {
      fontSize: '1.75rem',
      fontWeight: '600',
      color: '#1a202c',
      margin: '0 0 1rem 0',
      lineHeight: '1.3',
      letterSpacing: '-0.02em',
      borderBottom: 'none',
      paddingBottom: '0'
    },
    '& h2': {
      fontSize: '1.35rem',
      fontWeight: '600',
      color: '#1a202c',
      margin: '2.5rem 0 0.75rem 0',
      lineHeight: '1.35',
      letterSpacing: '-0.015em',
      borderBottom: '1px solid #e2e8f0',
      paddingBottom: '0.5rem'
    },
    '& h3': {
      fontSize: '1.15rem',
      fontWeight: '600',
      color: '#2d3748',
      margin: '1.5rem 0 0.65rem 0',
      lineHeight: '1.4',
      letterSpacing: '0'
    },
    '& h4': {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#4a5568',
      margin: '1.25rem 0 0.5rem 0',
      lineHeight: '1.5',
      textTransform: 'none',
      letterSpacing: '0'
    },
    '& p': {
      fontSize: '15px',
      marginBottom: '1rem',
      lineHeight: 1.65,
      color: '#2d3748'
    },
    '& strong': {
      color: '#111827',
      fontWeight: '600'
    },
    '& em': {
      fontStyle: 'italic',
      color: 'inherit'
    },
    '& a': {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: '500',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '& ul': {
      listStyle: 'disc',
      paddingLeft: '2.5rem',
      marginBottom: '1rem',
      marginLeft: '0',
      '& li': {
        marginBottom: '0.5rem',
        paddingLeft: '0.25rem',
        color: '#2d3748'
      },
      '& ul': {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        paddingLeft: '2rem',
        listStyle: 'circle'
      }
    },
    '& ol': {
      listStyle: 'decimal',
      paddingLeft: '2.5rem',
      marginBottom: '1rem',
      marginLeft: '0',
      '& li': {
        marginBottom: '0.5rem',
        paddingLeft: '0.25rem',
        color: '#2d3748'
      }
    },
    '& li': {
      fontSize: '15px',
      marginBottom: '0.5rem',
      color: '#2d3748',
      lineHeight: 1.65
    },

    '& hr': {
      border: 'none',
      borderTop: '1px solid #e2e8f0',
      margin: '2rem 0',
      height: '0'
    },

    // Box styles - NO backgrounds, NO borders, just clean typography
    '& .concept-box, & .tip-box, & .example-box, & .rules-box, & .key-takeaway': {
      background: 'transparent',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      margin: '1.25rem 0',
      boxShadow: 'none',
      '& h4': {
        color: '#1a202c',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        fontWeight: '600',
        textTransform: 'none',
        letterSpacing: '0'
      },
      '& p:last-child': {
        marginBottom: '0'
      }
    },

    '& .lesson-intro': {
      fontSize: '15px',
      color: '#2d3748',
      fontStyle: 'italic',
      marginBottom: '1.25rem',
      marginTop: '1.25rem',
      padding: '0',
      background: 'transparent',
      borderLeft: '2px solid #cbd5e0',
      paddingLeft: '0.875rem',
      lineHeight: '1.65'
    }
  },
  section: {
    marginBottom: '2rem',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all 0.4s ease-out',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '&.faded': {
      opacity: 0.5,
      transform: 'none'
    },
    '&.current': {
      opacity: 1,
      transform: 'none',
      borderRadius: '0',
      padding: '0',
      background: 'transparent'
    }
  },
  continuePrompt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '1rem 0 0 0',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    opacity: 0.3,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 0.6
    }
  },
  promptText: {
    color: '#9ca3af',
    fontSize: '0.75rem',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  enterKey: {
    background: 'linear-gradient(135deg, #1a73e8 0%, #2b77c9 100%)',
    border: '1px solid #1a73e8',
    borderRadius: '6px',
    padding: '0.2rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Monaco, Consolas, monospace',
    boxShadow: '0 2px 4px rgba(26, 115, 232, 0.2)',
    '.autoCompleteHint &': {
      background: 'rgba(156, 163, 175, 0.2)',
      border: '1px solid rgba(156, 163, 175, 0.3)',
      color: '#6b7280',
      fontSize: '0.65rem',
      padding: '0.15rem 0.4rem',
      boxShadow: 'none'
    },
    '.continuePrompt &': {
      background: 'rgba(156, 163, 175, 0.15)',
      border: '1px solid rgba(156, 163, 175, 0.25)',
      color: '#9ca3af',
      fontSize: '0.65rem',
      padding: '0.15rem 0.4rem',
      boxShadow: 'none'
    }
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: '#e2f8ff',
    zIndex: 1000
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3182ce 0%, #2b77c9 50%, #1a73e8 100%)',
    transition: 'width 0.3s ease',
    boxShadow: '0 0 15px rgba(26, 115, 232, 0.4)'
  },
  completed: {
    '& .continue-prompt': {
      display: 'none'
    }
  },
  autoCompleteHint: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '1rem 0 0 0',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    opacity: 0.4,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 0.7
    }
  },
  hintText: {
    color: '#9ca3af',
    fontSize: '0.8rem',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  quizLockNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    margin: '2rem 0',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0'
  },
  lockIcon: {
    fontSize: '1.5rem',
    color: '#718096'
  },
  lockText: {
    '& strong': {
      color: '#4a5568',
      fontSize: '0.95rem',
      fontWeight: '600',
      display: 'block',
      marginBottom: '0.3rem'
    },
    '& p': {
      color: '#718096',
      fontSize: '0.85rem',
      margin: 0,
      lineHeight: '1.4'
    }
  },
  aiIndicator: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 248, 255, 0.9) 100%)',
    backdropFilter: 'blur(12px)',
    border: '2px solid rgba(26, 115, 232, 0.15)',
    borderRadius: '25px',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#4a5568',
    fontWeight: '500',
    zIndex: 100,
    opacity: 0.8,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(26, 115, 232, 0.1)',
    '&:hover': {
      opacity: 1,
      transform: 'translateX(-50%) translateY(-2px)',
      boxShadow: '0 6px 20px rgba(26, 115, 232, 0.15)'
    }
  },
  aiLogo: {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    background: 'linear-gradient(135deg, #10a37f 0%, #1a73e8 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'Monaco, Consolas, monospace'
  },
  completeButton: {
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    margin: '2rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(72, 187, 120, 0.4)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)'
    },
    '&.completing': {
      animation: '$buttonComplete 0.6s ease forwards',
      pointerEvents: 'none'
    }
  },
  '@keyframes buttonComplete': {
    '0%': {
      transform: 'scale(1)'
    },
    '50%': {
      transform: 'scale(1.1)',
      background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.5)'
    },
    '100%': {
      transform: 'scale(1)',
      background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
    }
  },
});
