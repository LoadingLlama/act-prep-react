/**
 * Home Component Styles
 * Simplified, compact design
 */

import { createUseStyles } from 'react-jss';

export const useHomeStyles = createUseStyles({
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: '100vh',
    background: '#ffffff',
    '@media (max-width: 768px)': {
      padding: '1rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem'
    }
  },

  header: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #f3f4f6',
    '@media (max-width: 768px)': {
      marginBottom: '1.5rem',
      paddingBottom: '0.75rem'
    },
    '@media (max-width: 480px)': {
      marginBottom: '1rem',
      paddingBottom: '0.5rem'
    }
  },

  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
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
    gap: '2rem',
    '@media (max-width: 768px)': {
      gap: '1.5rem'
    },
    '@media (max-width: 480px)': {
      gap: '1rem'
    }
  },

  section: {
    display: 'flex',
    flexDirection: 'column'
  },

  sectionHeader: {
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e5e7eb'
  },

  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0
  },

  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 0.5rem',
    borderBottom: '1px solid #f3f4f6',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    gap: '1rem',
    '@media (max-width: 768px)': {
      padding: '0.625rem 0.5rem',
      gap: '0.75rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem 0.375rem',
      gap: '0.5rem'
    },
    '&:hover': {
      background: '#f9fafb'
    },
    '&:last-child': {
      borderBottom: 'none'
    }
  },

  listText: {
    fontSize: '0.875rem',
    color: '#374151',
    flex: 1,
    fontWeight: '400',
    '@media (max-width: 480px)': {
      fontSize: '0.8125rem'
    }
  },

  listValue: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  },

  listButton: {
    background: '#08245b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.375rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.15s ease',
    '@media (max-width: 480px)': {
      padding: '0.3125rem 0.625rem',
      fontSize: '0.6875rem'
    },
    '&:hover': {
      background: '#0a2f73'
    }
  }
});
