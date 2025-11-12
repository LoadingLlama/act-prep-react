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
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #f3f4f6'
  },

  statCard: {
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#cbd5e1',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transform: 'translateY(-1px)'
    }
  },

  statLabel: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },

  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.1rem'
  },

  statDetail: {
    fontSize: '0.7rem',
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
      background: '#e5e7eb',
      '@media (max-width: 768px)': {
        left: '0.4375rem'
      }
    }
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
    border: '1px solid #e5e7eb',
    borderTop: '2px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    position: 'relative',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderTopColor: '#cbd5e1',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
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
      border: '2px solid #08245b',
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
      background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
      border: 'none',
      boxShadow: '0 0 0 4px rgba(8, 36, 91, 0.15)',
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
      background: 'linear-gradient(90deg, #f0f9ff 0%, #f9fafb 100%)',
      borderLeftColor: '#08245b',
      paddingLeft: '0.75rem',
      '& $weekCardArrow': {
        opacity: 1,
        transform: 'translateX(0)',
        color: '#08245b'
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
    color: '#6b7280',
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
