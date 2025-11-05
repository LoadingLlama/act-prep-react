/**
 * Lesson Modal Styles
 * Styles for lesson modal, sidebar, navigation, and content area
 */

export const modalStyles = {
  lessonModal: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 1000,
    overflow: 'hidden',
    '&.active': {
      display: 'flex'
    }
  },
  lessonContent: {
    background: '#ffffff',
    width: '100%',
    height: '100vh',
    display: 'flex',
    lineHeight: '1.6',
    fontSize: '15px',
    color: '#6d6e75',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif'
  },
  lessonSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderRight: '1px solid #e9ecef',
    padding: '1.5rem',
    overflowY: 'auto',
    flexShrink: 0
  },
  lessonMain: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  lessonHeader: {
    padding: '1.5rem 2.5rem 1rem',
    background: 'white',
    borderBottom: '1px solid #e9ecef',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lessonTitle: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0',
    letterSpacing: '-0.01em',
    lineHeight: '1.3',
    flex: 1
  },
  lessonModeToggle: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    marginRight: '3rem'
  },
  modeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    background: 'white',
    color: '#6b7280',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#1a1a1a',
      color: 'white',
      borderColor: '#1a1a1a'
    }
  },
  lessonClose: {
    position: 'absolute',
    top: '1.25rem',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#999',
    padding: '0.25rem',
    '&:hover': {
      color: '#333'
    }
  },
  lessonRightSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderLeft: '1px solid #e9ecef',
    padding: '1.5rem',
    overflowY: 'auto',
    flexShrink: 0
  },
  lessonBody: {
    padding: '2rem 2.5rem 4rem',
    maxWidth: '900px',
    lineHeight: 1.6,
    fontSize: '15px',
    color: '#6d6e75',
    '& h1, & h2, & h3, & h4': {
      color: '#000000 !important',
      fontWeight: '800 !important',
      marginTop: '2rem',
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    '& h1': {
      fontSize: '1.875rem',
      borderBottom: '2px solid #e9ecef',
      paddingBottom: '0.5rem',
      fontWeight: '900 !important'
    },
    '& h2': {
      fontSize: '1.5rem',
      color: '#000000 !important',
      fontWeight: '900 !important'
    },
    '& h3': {
      fontSize: '1.25rem',
      color: '#000000 !important',
      fontWeight: '800 !important'
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.6'
    },
    '& ul, & ol': {
      margin: '1rem 0',
      paddingLeft: '1.5rem'
    },
    '& li': {
      marginBottom: '0.5rem',
      lineHeight: '1.6'
    },
    '& blockquote': {
      borderLeft: '3px solid #cbd5e0',
      paddingLeft: '1rem',
      margin: '1.5rem 0',
      fontStyle: 'italic',
      color: '#4a5568',
      background: '#f7fafc',
      padding: '1rem 1rem',
      borderRadius: '0 4px 4px 0'
    },
    '& code': {
      backgroundColor: '#f0f0f0',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '0.9em',
      fontFamily: 'Monaco, Consolas, monospace',
      color: '#1a1a1a'
    },
    '& .lesson-intro': {
      fontSize: '1rem',
      color: '#718096',
      fontStyle: 'italic',
      marginBottom: '2rem',
      marginTop: '0rem',
      padding: '1rem 1.25rem 1rem 2rem',
      background: '#f8f9fa',
      borderLeft: '4px solid #1a1a1a',
      borderRadius: '0 4px 4px 0'
    },
    '& .concept-box, & .tip-box, & .example-box, & .rules-box, & .key-takeaway': {
      background: 'transparent',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      margin: '1.5rem 0',
      '& h4': {
        color: '#000000 !important',
        marginBottom: '1rem',
        fontSize: '1.3rem !important',
        fontWeight: '800 !important',
        borderBottom: '1px solid #d1d5db',
        paddingBottom: '0.5rem'
      }
    }
  },
  floatingControls: {
    display: 'none'
  },
  sidebarBackButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    marginBottom: '1.5rem',
    color: '#6b7280',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    '&:hover': {
      color: '#1a1a1a'
    }
  },
  sidebarNav: {
    '& h3': {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: '1rem'
    }
  },
  sidebarNavItem: {
    padding: '0.5rem 0.75rem',
    marginBottom: '0.25rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': {
      background: '#f3f4f6',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#e0e7ff',
      color: '#4f46e5',
      fontWeight: 500
    }
  },
  sidebarSection: {
    marginBottom: '2rem',
    '& h4': {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#9ca3af',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },
  sidebarProgressBox: {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem'
  },
  keyTerms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    '& .term': {
      padding: '0.35rem 0.5rem',
      background: 'white',
      borderRadius: '4px',
      fontSize: '0.8rem',
      color: '#374151',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.15s',
      '&:hover': {
        background: '#f9fafb',
        borderColor: '#d1d5db'
      }
    }
  },
  progressBar: {
    width: '100%',
    height: '4px',
    background: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden',
    '& .fill': {
      height: '100%',
      background: 'linear-gradient(90deg, #22c55e, #16a34a)',
      borderRadius: '2px',
      transition: 'width 0.3s ease'
    }
  }
};
