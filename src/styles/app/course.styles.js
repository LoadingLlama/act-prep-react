/**
 * Course Content Styles
 * Simplified, compact design matching Home page
 */

import { createUseStyles } from 'react-jss';

export const useCourseStyles = createUseStyles({
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '100%',
    margin: '0',
    padding: '1rem 2rem',
    minHeight: '100vh',
    background: 'transparent',
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
  },

  header: {
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f3f4f6'
  },

  statCard: {
    padding: '0.25rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem'
  },

  statLabel: {
    fontSize: '0.6875rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },

  statValue: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1a1a1a'
  },

  statDetail: {
    fontSize: '0.6875rem',
    color: '#9ca3af'
  },

  weeksContainer: {
    position: 'relative',
    paddingLeft: '2.5rem',
    '@media (max-width: 768px)': {
      paddingLeft: '2rem'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '0.5625rem',
      top: '1.5rem',
      bottom: '1.5rem',
      width: '2px',
      background: 'linear-gradient(180deg, #e9d5ff 0%, #c4b5fd 100%)',
      '@media (max-width: 768px)': {
        left: '0.4375rem'
      }
    }
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
    border: '1px solid #e9d5ff',
    borderTop: '2px solid #e9d5ff',
    borderRadius: '8px',
    padding: '1rem',
    position: 'relative',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderTopColor: '#c4b5fd',
      boxShadow: '0 2px 12px rgba(139, 92, 246, 0.08)'
    },
    '@media (max-width: 768px)': {
      padding: '0.75rem'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '-2.375rem',
      top: '1.25rem',
      width: '10px',
      height: '10px',
      background: '#ffffff',
      border: '2px solid #8b5cf6',
      borderRadius: '50%',
      zIndex: 2,
      transition: 'all 0.2s ease',
      '@media (max-width: 768px)': {
        left: '-2rem',
        width: '8px',
        height: '8px'
      }
    },
    '&.current::before': {
      left: '-2.4375rem',
      top: '1.125rem',
      width: '16px',
      height: '16px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      border: 'none',
      boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.15)',
      '@media (max-width: 768px)': {
        left: '-2.0625rem',
        width: '14px',
        height: '14px'
      }
    }
  },

  sectionHeader: {
    marginBottom: '0.5rem'
  },

  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6b7280',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },

  weekGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },

  weekCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 0.5rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #f3f4f6',
    borderLeft: '2px solid transparent',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    gap: '1rem',
    '&:last-child': {
      borderBottom: 'none'
    },
    '&:hover': {
      background: 'linear-gradient(90deg, #f5f3ff 0%, #faf5ff 100%)',
      borderLeftColor: '#8b5cf6',
      paddingLeft: '0.75rem',
      '& $weekCardArrow': {
        opacity: 1,
        transform: 'translateX(0)',
        color: '#8b5cf6'
      }
    },
    '&.completed': {
      '& $weekCardText': {
        color: '#9ca3af'
      }
    }
  },

  weekCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1
  },

  weekCardIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8b5cf6',
    fontSize: '1rem',
    '& svg': {
      width: '16px',
      height: '16px'
    }
  },

  weekCardText: {
    fontSize: '0.875rem',
    color: '#1a1a1a',
    fontWeight: '400',
    transition: 'color 0.2s ease'
  },

  weekCardArrow: {
    fontSize: '1rem',
    color: '#9ca3af',
    opacity: 0,
    transform: 'translateX(-8px)',
    transition: 'all 0.2s ease'
  },

});
