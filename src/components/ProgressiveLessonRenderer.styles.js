import { createUseStyles } from 'react-jss';

export const useProgressiveLessonStyles = createUseStyles({
  progressiveContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: 1.7,
    color: '#1a202c',
    background: '#ffffff',
    padding: '0 4rem 2.5rem 4rem',
    maxWidth: '900px',
    margin: '0 auto',
    marginLeft: '320px',
    marginRight: 'auto',
    textAlign: 'left',
    borderRadius: '0',
    fontSize: '16px',
    // counterReset: 'h3-counter h4-counter', // REMOVED: No automatic numbering
    minHeight: '100vh',
    paddingTop: '2rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    'body.sidebar-collapsed &': {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '1000px'
    },

    '& h1': {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: '#000000',
      margin: '0 0 1.5rem 0',
      lineHeight: '1.2',
      letterSpacing: '-0.04em',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '1rem'
    },
    '& h2': {
      fontSize: '2rem',
      fontWeight: '900',
      color: '#000000',
      margin: '0 0 2rem 0',
      lineHeight: '1.3',
      letterSpacing: '-0.035em',
      borderBottom: 'none',
      paddingBottom: '0'
    },
    '& h3': {
      fontSize: '1.5rem',
      fontWeight: '700', // Bold like H4
      color: '#000000',
      margin: '7rem 0 1rem 0',
      lineHeight: '1.35',
      letterSpacing: '-0.025em',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '0.75rem',
      marginBottom: '1rem',
      // counterIncrement: 'h3-counter', // REMOVED: No automatic numbering
      // '&:before': { // REMOVED: No automatic numbering
      //   content: 'counter(h3-counter) ". "',
      //   color: '#000000',
      //   fontWeight: '800'
      // },
      '&:first-child': {
        marginTop: '2rem'
      }
    },
    '& h4': {
      fontSize: '1.15rem !important', // Slightly bigger
      fontWeight: '700 !important', // Bolder (was 600)
      color: '#000000', // Removed !important to allow inline styles
      margin: '5rem 0 0rem 0',
      lineHeight: '1.4',
      textTransform: 'none',
      letterSpacing: '-0.02em',
      borderBottom: 'none', // No underline on H4s
      paddingBottom: '0rem',
      // counterIncrement: 'h4-counter', // REMOVED: No automatic numbering
      // '&:before': { // REMOVED: No automatic numbering
      //   content: 'counter(h4-counter, lower-alpha) ". "',
      //   color: '#000000',
      //   fontWeight: '800',
      //   fontSize: '1.1rem'
      // }
    },
    '& p': {
      fontSize: '16px',
      marginBottom: '1.25rem',
      lineHeight: 1.7,
      color: '#1a202c'
    },
    '& h3 + p, & h3 + div, & h2 + p, & h3 + ul, & h3 + ol': {
      marginTop: '0.5rem',
      marginLeft: '0.75rem'
    },
    '& h4 + p, & h4 + div, & h4 + ul, & h4 + ol': {
      marginTop: '0.1rem',
      marginLeft: '0.75rem'
    },
    '& h3 ~ p, & h3 ~ div:not(.section), & h3 ~ ul, & h3 ~ ol, & h4 ~ p, & h4 ~ div:not(.section), & h4 ~ ul, & h4 ~ ol': {
      marginLeft: '0.75rem'
    },
    '& strong': {
      color: '#111827',
      fontWeight: '600'
    },
    // Blue underlined terms (key terms) - bold text with faded underline
    '& strong[style*="2563eb"][style*="underline"]': {
      cursor: 'help',
      fontWeight: '700 !important',
      color: '#2563eb !important',
      textDecorationColor: 'rgba(37, 99, 235, 0.35) !important',
      transition: 'all 0.25s ease',
      '&:hover': {
        color: '#1d4ed8 !important',
        textDecorationColor: '#1d4ed8 !important'
      }
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
      paddingLeft: '3rem',
      marginBottom: '1.5rem',
      marginLeft: '0',
      marginTop: '0.75rem',
      '& li': {
        marginBottom: '0.75rem',
        paddingLeft: '0.5rem',
        color: '#1a202c',
        lineHeight: 1.7
      },
      '& ul': {
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        paddingLeft: '2.5rem',
        listStyle: 'circle',
        '& li': {
          marginBottom: '0.25rem',
          lineHeight: 1.5
        }
      }
    },
    '& ol': {
      listStyle: 'decimal',
      paddingLeft: '3rem',
      marginBottom: '1.5rem',
      marginLeft: '0',
      marginTop: '0.75rem',
      '& li': {
        marginBottom: '0.75rem',
        paddingLeft: '0.5rem',
        color: '#1a202c',
        lineHeight: 1.7
      }
    },
    '& li': {
      fontSize: '16px',
      marginBottom: '0.75rem',
      color: '#1a202c',
      lineHeight: 1.7
    },

    '& hr': {
      border: 'none',
      borderTop: '1px solid #e5e7eb',
      margin: '2.5rem 0',
      height: '0'
    },

    // Box styles - NO backgrounds, NO borders, just clean typography
    '& .concept-box, & .tip-box, & .example-box, & .rules-box, & .key-takeaway': {
      background: 'transparent',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      margin: '2rem 0',
      boxShadow: 'none',
      '& h4': {
        color: '#000000 !important',
        marginBottom: '0rem',
        fontSize: '1.15rem !important', // Slightly bigger
        fontWeight: '700 !important', // Bolder (was 600)
        textTransform: 'none',
        letterSpacing: '-0.02em',
        borderBottom: 'none', // No underline
        paddingBottom: '0rem'
      },
      '& p:last-child': {
        marginBottom: '0'
      }
    },

    '& .lesson-intro': {
      fontSize: '16px',
      color: '#1a202c',
      fontStyle: 'normal',
      marginBottom: '2.5rem',
      marginTop: '1.5rem',
      padding: '0 !important',
      background: 'transparent !important',
      borderLeft: 'none',
      paddingLeft: '0',
      lineHeight: '1.7'
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
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(156, 163, 175, 0.2)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    opacity: 0.9,
    transition: 'opacity 0.3s ease',
    zIndex: 100,
    '&:hover': {
      opacity: 1
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
    top: '0',
    left: '320px',
    right: 0,
    height: '3px',
    backgroundColor: '#e5e7eb',
    zIndex: 1050,
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    'body.sidebar-collapsed &': {
      left: '0',
      right: '0'
    }
  },
  progressFill: {
    height: '100%',
    background: '#3b82f6',
    transition: 'width 0.3s ease',
    boxShadow: 'none'
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
  keyTakeawaysBox: {
    background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8f1 100%)',
    border: '2px solid #4caf50',
    borderRadius: '12px',
    padding: '2rem',
    margin: '3rem 0',
    '& h3': {
      color: '#2e7d32',
      fontSize: '1.6rem',
      fontWeight: '800',
      margin: '0 0 1.5rem 0',
      borderBottom: '2px solid #4caf50',
      paddingBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    '& ul': {
      listStyle: 'none',
      paddingLeft: '0',
      margin: '0',
      '& li': {
        paddingLeft: '2rem',
        marginBottom: '1rem',
        position: 'relative',
        color: '#1b5e20',
        fontSize: '16px',
        lineHeight: '1.7',
        '&:before': {
          content: '"✓"',
          position: 'absolute',
          left: '0',
          color: '#4caf50',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }
      }
    }
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    margin: '3rem 0 2rem 0'
  },
  navButton: {
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)'
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      '&:hover': {
        background: '#ffffff',
        borderColor: '#e5e7eb',
        transform: 'none',
        boxShadow: 'none'
      }
    }
  },
  nextButton: {
    marginLeft: 'auto',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderColor: '#2563eb',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      borderColor: '#1d4ed8',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      '&:hover': {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        borderColor: '#2563eb',
        transform: 'none',
        boxShadow: 'none'
      }
    }
  },
  lessonTitleSection: {
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    'body.sidebar-collapsed &': {
      marginLeft: '-50px'
    }
  }
});
