import { createUseStyles } from 'react-jss';

export const useLessonStyles = createUseStyles({
  lessonModal: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 1000,
    overflow: 'auto',
    '&.active': {
      display: 'flex'
    }
  },
  lessonContent: {
    background: 'white',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    lineHeight: '1.6',
    fontSize: '15px',
    color: '#2d3748'
  },
  lessonSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderRight: '1px solid #e2e8f0',
    padding: '2rem 1.5rem',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  lessonMain: {
    flex: 1,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0'
  },
  lessonHeader: {
    padding: '1rem 2rem 0.75rem',
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    textAlign: 'left'
  },
  lessonTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1a202c',
    margin: '0',
    letterSpacing: '-0.01em'
  },
  lessonClose: {
    display: 'none'
  },
  lessonBody: {
    padding: '0 1rem 4rem',
    lineHeight: 1.65,
    fontSize: '15px',
    maxWidth: '2000px',
    '& h1, & h2, & h3, & h4': {
      color: '#1a1a1a',
      fontWeight: '600',
      marginTop: '2rem',
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    '& h1': {
      fontSize: '1.75rem',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '0.5rem'
    },
    '& h2': {
      fontSize: '1.5rem'
    },
    '& h3': {
      fontSize: '1.25rem'
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.65',
      '& .emphasis': {
        background: 'rgba(255, 235, 59, 0.3)',
        padding: '1px 2px',
        borderRadius: '2px'
      },
      '& .highlight': {
        background: 'rgba(34, 197, 94, 0.25)',
        padding: '1px 2px',
        borderRadius: '2px'
      }
    },
    '& ul, & ol': {
      margin: '1rem 0',
      paddingLeft: '1.5rem'
    },
    '& li': {
      marginBottom: '0.5rem',
      lineHeight: '1.6',
      '& .definition, & .key-term': {
        fontStyle: 'italic',
        fontWeight: '500'
      }
    },
    '& blockquote': {
      borderLeft: '3px solid #cbd5e0',
      paddingLeft: '1rem',
      margin: '1.25rem 0',
      fontStyle: 'italic',
      color: '#4a5568',
      background: '#f7fafc',
      padding: '0.75rem 1rem',
      borderRadius: '0 6px 6px 0'
    },
    '& code': {
      backgroundColor: '#edf2f7',
      padding: '2px 4px',
      borderRadius: '3px',
      fontSize: '0.9em',
      fontFamily: 'Monaco, Consolas, monospace'
    },
    '& .definition, & .key-term': {
      fontStyle: 'italic',
      fontWeight: '500',
      background: 'rgba(59, 130, 246, 0.2)',
      padding: '1px 3px',
      borderRadius: '2px'
    },
    '& .clause-highlight': {
      background: 'rgba(59, 130, 246, 0.25)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .phrase-highlight': {
      background: 'rgba(251, 191, 36, 0.3)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .independent-highlight': {
      background: 'rgba(34, 197, 94, 0.25)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .dependent-highlight': {
      background: 'rgba(239, 68, 68, 0.25)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .lesson-intro': {
      fontSize: '1rem',
      color: '#d73502',
      fontStyle: 'italic',
      marginBottom: '2rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderLeft: '4px solid #d73502',
      borderRadius: '0 4px 4px 0'
    },
    '& .concept-box': {
      background: '#fafbfc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.1rem'
      }
    },
    '& .tip-box': {
      background: '#f7fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.1rem',
        fontWeight: '600'
      },
      '& strong, & .highlight': {
        background: 'rgba(255, 235, 59, 0.4)',
        padding: '1px 3px',
        borderRadius: '2px'
      }
    },
    '& .example-box': {
      background: '#f8f9fa',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& em, & .definition': {
        fontStyle: 'italic',
        fontWeight: '500'
      },
      '& .highlight': {
        background: 'rgba(16, 185, 129, 0.3)',
        padding: '1px 3px',
        borderRadius: '2px'
      }
    },
    '& .rules-box': {
      background: '#fff',
      border: '2px solid #1a1a1a',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.2rem'
      }
    }
  },
  floatingControlsRemoved: {
    position: 'fixed',
    bottom: '35vh',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    padding: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(200, 200, 200, 0.3)',
    opacity: 0.6,
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: '180px',
    marginTop: '40px'
  },
  sidebarSection: {
    '& h4': {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },
  keyTerms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '& .term': {
      padding: '0.5rem 0.75rem',
      background: 'white',
      borderRadius: '6px',
      fontSize: '0.85rem',
      color: '#2d3748',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        background: '#f7fafc',
        borderColor: '#cbd5e0'
      }
    }
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
    '& .fill': {
      height: '100%',
      background: 'linear-gradient(90deg, #48bb78, #38a169)',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    }
  }
});
