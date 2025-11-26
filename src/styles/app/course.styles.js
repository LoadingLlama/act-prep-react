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
    padding: '0',
    minHeight: '100vh',
    background: '#ffffff',
    '@media (max-width: 768px)': {
      padding: '0'
    },
    '@media (max-width: 480px)': {
      padding: '0'
    }
  },

  header: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
      marginBottom: '0.75rem'
    },
    '@media (max-width: 480px)': {
      marginBottom: '0.5rem'
    }
  },

  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
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
    borderBottom: '1px solid #f3f4f6',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
      gap: '0.375rem'
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.25rem'
    }
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
    color: '#1a1a1a',
    '@media (max-width: 768px)': {
      fontSize: '0.95rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.875rem'
    }
  },

  statDetail: {
    fontSize: '0.6875rem',
    color: '#9ca3af'
  },

  weeksContainer: {
    position: 'relative',
    paddingLeft: '0',
    '@media (max-width: 768px)': {
      paddingLeft: '0'
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
      padding: '0.625rem',
      marginBottom: '0.75rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      marginBottom: '0.5rem'
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
    padding: '0.65rem 0.75rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #f3f4f6',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    gap: '0.875rem',
    margin: '0 0 4px 0',
    '&:last-child': {
      borderBottom: 'none'
    },
    '&:hover': {
      background: '#fafbfc',
      '& $weekCardCheckbox': {
        borderColor: '#14b8a6',
        transform: 'scale(1.08)'
      },
      '& $weekCardArrow': {
        opacity: 1,
        transform: 'translateX(0)',
        color: '#14b8a6'
      }
    },
    '&.completed': {
      '& $weekCardText': {
        color: '#9ca3af',
        textDecoration: 'line-through'
      },
      '& $weekCardCheckbox': {
        background: '#14b8a6',
        borderColor: '#14b8a6',
        '&::after': {
          content: '"✓"',
          position: 'absolute',
          color: '#ffffff',
          fontSize: '0.7rem',
          fontWeight: '700',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      }
    }
  },

  weekCardCheckbox: {
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    border: '2.5px solid #d1d5db',
    flexShrink: 0,
    transition: 'all 0.2s ease',
    position: 'relative',
    background: '#ffffff',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#14b8a6'
    }
  },

  weekCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    flex: 1
  },

  weekCardTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: 1
  },

  weekCardIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: '0.875rem',
    flexShrink: 0,
    '& svg': {
      width: '14px',
      height: '14px'
    }
  },

  weekCardText: {
    fontSize: '0.875rem',
    color: '#1a1a1a',
    fontWeight: '400',
    transition: 'all 0.2s ease'
  },

  weekCardArrow: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    opacity: 0,
    transform: 'translateX(-4px)',
    transition: 'all 0.15s ease',
    flexShrink: 0
  },

});
