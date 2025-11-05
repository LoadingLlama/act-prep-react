/**
 * Practice Page Styles
 */

import { createUseStyles } from 'react-jss';

export const usePracticePageStyles = createUseStyles({
  practiceContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1200px'
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
    letterSpacing: '-0.04em'
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  filterBar: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    background: '#ffffff',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
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
    '&:hover': {
      background: '#f8fafc',
      color: '#1a1a1a'
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
  lessonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  lessonCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    '&:hover': {
      borderColor: '#3b82f6',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)',
      transform: 'translateY(-2px)'
    }
  },
  lessonNumber: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  lessonTitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.4',
    marginBottom: '0.5rem'
  },
  ratingSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 0',
    borderTop: '1px solid #f1f5f9',
    borderBottom: '1px solid #f1f5f9'
  },
  stars: {
    display: 'flex',
    gap: '0.25rem'
  },
  star: {
    fontSize: '1.5rem',
    transition: 'all 0.2s ease'
  },
  ratingLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  practiceButton: {
    background: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    '&:hover': {
      background: '#2563eb',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 6px rgba(59, 130, 246, 0.2)'
    }
  }
});
