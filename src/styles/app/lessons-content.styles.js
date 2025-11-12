/**
 * Lessons Content Styles
 * Extracted from LessonsContent.jsx
 */

import { createUseStyles } from 'react-jss';

export const useLessonsContentStyles = createUseStyles({
  lessonsContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1200px',
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
  },
  pageHeader: {
    padding: '0',
    marginBottom: '1.5rem'
  },
  modeToggle: {
    display: 'inline-flex',
    background: '#f1f5f9',
    borderRadius: '100px',
    padding: '0.25rem',
    gap: '0.25rem',
    border: '1px solid #e2e8f0'
  },
  modeButton: {
    padding: '0.625rem 1.5rem',
    fontSize: '0.8125rem',
    fontWeight: '500',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'transparent',
    color: '#64748b',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: '#1a1a1a',
      background: '#e2e8f0'
    },
    '&.active': {
      background: '#08245b',
      color: '#ffffff',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)'
    }
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  contentSection: {
    padding: '0'
  },
  controlsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '0.75rem'
    }
  },
  filterButtons: {
    display: 'flex',
    position: 'relative',
    background: '#f1f5f9',
    borderRadius: '100px',
    padding: '0.25rem',
    gap: '0.25rem',
    width: 'fit-content',
    border: '1px solid #e2e8f0'
  },
  filterButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '100px',
    padding: '0.625rem 1.25rem',
    fontSize: '0.8125rem',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'color 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    whiteSpace: 'nowrap',
    '&:hover:not(.active)': {
      color: '#1a1a1a'
    },
    '&.active': {
      color: '#ffffff',
      fontWeight: '600'
    }
  },
  filterSlider: {
    position: 'absolute',
    top: '0.25rem',
    height: 'calc(100% - 0.5rem)',
    borderRadius: '100px',
    background: '#08245b',
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 0,
    boxShadow: '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)',
    willChange: 'left, width',
    '&.science': {
      background: '#10b981',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.25), 0 1px 2px rgba(16, 185, 129, 0.15)'
    }
  },
  viewToggle: {
    display: 'flex',
    gap: '0.25rem',
    background: '#f1f5f9',
    borderRadius: '100px',
    padding: '0.25rem',
    border: '1px solid #e2e8f0'
  },
  viewButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '100px',
    padding: '0.6rem',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    minHeight: '36px',
    '&:hover': {
      color: '#1a1a1a',
      background: '#e2e8f0'
    },
    '&.active': {
      background: '#08245b',
      color: '#ffffff',
      boxShadow: '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)'
    }
  },
  lessonsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  lessonsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    padding: '1rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  lessonsListView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  lessonCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderLeft: '3px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    position: 'relative',
    minHeight: '95px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    '&:hover': {
      borderColor: '#cbd5e1',
      borderLeftColor: '#08245b',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.12)',
      transform: 'translateY(-2px)'
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&.completed': {
      borderColor: '#86efac',
      borderLeftColor: '#10b981',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      '&:hover': {
        borderColor: '#6ee7b7',
        borderLeftColor: '#059669',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
        transform: 'translateY(-2px)'
      }
    },
    '&.in-progress': {
      borderColor: '#fcd34d',
      borderLeftColor: '#f59e0b',
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      '&:hover': {
        borderColor: '#fbbf24',
        borderLeftColor: '#d97706',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
        transform: 'translateY(-2px)'
      }
    },
    '&.golden': {
      borderColor: '#fcd34d',
      borderLeftColor: '#f59e0b',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)',
      '&:hover': {
        borderColor: '#fbbf24',
        borderLeftColor: '#d97706',
        boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
        transform: 'translateY(-2px)'
      }
    }
  },
  lessonCardListView: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem 1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    minHeight: '60px',
    position: 'relative',
    '&:hover': {
      borderColor: '#cbd5e1',
      transform: 'translateX(4px)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    '&:active': {
      transform: 'translateX(2px)'
    },
    '&.completed': {
      borderColor: '#10b981',
      background: '#d1fae5',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)',
      '&:hover': {
        borderColor: '#059669',
        boxShadow: '0 3px 6px rgba(16, 185, 129, 0.15)'
      }
    },
    '&.in-progress': {
      borderColor: '#f59e0b',
      background: '#fef3c7',
      boxShadow: '0 2px 4px rgba(245, 158, 11, 0.1)',
      '&:hover': {
        borderColor: '#d97706',
        boxShadow: '0 3px 6px rgba(245, 158, 11, 0.15)'
      }
    },
    '&.golden': {
      borderColor: '#f59e0b',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      boxShadow: '0 4px 8px rgba(245, 158, 11, 0.2)',
      '&:hover': {
        borderColor: '#d97706',
        boxShadow: '0 6px 12px rgba(245, 158, 11, 0.3)'
      }
    }
  },
  lessonStatus: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    zIndex: 1,
    pointerEvents: 'none'
  },
  lessonInfo: {
    flex: 1,
    paddingRight: '2.5rem'
  },
  lessonChapter: {
    fontSize: '0.65rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.3rem'
  },
  lessonTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.25',
    marginBottom: '0.3rem'
  },
  keyTermsTags: {
    marginTop: '0.35rem',
    fontSize: '0.65rem',
    color: '#94a3b8',
    fontWeight: '400',
    lineHeight: '1.3',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  unitHeader: {
    padding: '1rem 1.25rem',
    background: '#f8fafc',
    borderRadius: '8px 8px 0 0',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  unitTitle: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: '-0.01em',
    margin: 0
  },
  unitBox: {
    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
    border: '1px solid #e5e7eb',
    borderTop: '3px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderTopColor: '#08245b',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
    },
    '&:first-child': {
      marginTop: 0
    }
  },
  unitContent: {
    padding: '0'
  }
});
