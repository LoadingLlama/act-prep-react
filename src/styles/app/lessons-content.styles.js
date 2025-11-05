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
    marginBottom: '2rem'
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
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
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
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    minWidth: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: '#f8fafc',
      color: '#1a1a1a'
    },
    '&:active': {
      transform: 'scale(0.97)'
    },
    '&.active': {
      color: '#ffffff',
      '&.getting-started': {
        background: '#6366f1'
      },
      '&.english': {
        background: '#08245b'
      },
      '&.math': {
        background: '#dc2626'
      },
      '&.reading': {
        background: '#08245b'
      },
      '&.science': {
        background: '#16a34a'
      }
    }
  },
  viewToggle: {
    display: 'flex',
    gap: '0.25rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.25rem'
  },
  viewButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    padding: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '44px',
    minHeight: '44px',
    '&:hover': {
      background: '#f8fafc'
    },
    '&:active': {
      transform: 'scale(0.95)'
    },
    '&.active': {
      background: '#08245b',
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
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    minHeight: '95px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    '&:hover': {
      borderColor: '#08245b',
      boxShadow: '0 2px 8px rgba(0, 24, 69, 0.08)',
      transform: 'translateY(-1px)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 1px 4px rgba(0, 24, 69, 0.06)'
    },
    '&.completed': {
      borderColor: '#3b82f6',
      background: '#f0f9ff'
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
    '&:hover': {
      borderColor: '#08245b',
      transform: 'translateX(4px)'
    },
    '&:active': {
      transform: 'translateX(2px)',
      background: '#f8fafc'
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
  lessonActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: 'auto'
  },
  practiceButton: {
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#64748b',
    background: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    minHeight: '44px',
    '&:hover': {
      background: '#f8fafc',
      borderColor: '#cbd5e1',
      color: '#1a1a1a'
    },
    '&:active': {
      transform: 'scale(0.98)',
      background: '#f1f5f9'
    }
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
