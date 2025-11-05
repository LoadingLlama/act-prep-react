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
    borderRadius: '4px',
    padding: '2px',
    gap: '2px'
  },
  modeButton: {
    padding: '0.5rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    background: 'transparent',
    color: '#64748b',
    '&:hover': {
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#ffffff',
      color: '#1a1a1a',
      fontWeight: '600',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000000',
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
    background: '#ffffff',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '0.75rem'
    }
  },
  filterButtons: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap'
  },
  filterButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '3px',
    padding: '0.65rem 0.95rem',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: '#f8fafc',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#1a1a1a',
      color: '#ffffff',
      fontWeight: '600'
    }
  },
  viewToggle: {
    display: 'flex',
    gap: '0.25rem',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '3px',
    padding: '0.25rem'
  },
  viewButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '2px',
    padding: '0.6rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    minHeight: '36px',
    '&:hover': {
      background: '#f8fafc'
    },
    '&.active': {
      background: '#1a1a1a',
      color: '#ffffff'
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
    borderRadius: '4px',
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
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transform: 'translateY(-1px)'
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&.completed': {
      borderColor: '#10b981',
      background: '#d1fae5',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)',
      '&:hover': {
        borderColor: '#059669',
        boxShadow: '0 3px 6px rgba(16, 185, 129, 0.15)',
        transform: 'translateY(-2px)'
      }
    },
    '&.in-progress': {
      borderColor: '#f59e0b',
      background: '#fef3c7',
      boxShadow: '0 2px 4px rgba(245, 158, 11, 0.1)',
      '&:hover': {
        borderColor: '#d97706',
        boxShadow: '0 3px 6px rgba(245, 158, 11, 0.15)',
        transform: 'translateY(-2px)'
      }
    },
    '&.golden': {
      borderColor: '#f59e0b',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      boxShadow: '0 4px 8px rgba(245, 158, 11, 0.2)',
      '&:hover': {
        borderColor: '#d97706',
        boxShadow: '0 6px 12px rgba(245, 158, 11, 0.3)',
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
    right: '0.75rem'
  },
  lessonInfo: {
    flex: 1
  },
  lessonChapter: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: '#64748b',
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
    padding: '1.5rem 1rem 0.75rem',
    marginTop: '1.5rem',
    '&:first-child': {
      marginTop: 0
    }
  },
  unitTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    margin: 0
  },
  unitDivider: {
    height: '1px',
    background: '#e2e8f0',
    marginTop: '0.75rem'
  }
});
