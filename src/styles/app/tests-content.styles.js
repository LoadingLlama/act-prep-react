/**
 * Tests Content Styles
 * Extracted from TestsContent.jsx
 */

import { createUseStyles } from 'react-jss';

export const useTestsContentStyles = createUseStyles({
  testsContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '1.5rem 1.5rem 0 1.5rem',
    margin: '0',
    background: '#ffffff',
    maxWidth: '700px',
    width: '100%',
    '@media (max-width: 768px)': {
      padding: '1.5rem 1rem 0 1rem'
    },
    '@media (max-width: 480px)': {
      padding: '1rem 0.75rem 0 0.75rem'
    }
  },
  pageHeader: {
    padding: '0',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      marginBottom: '0.75rem'
    },
    '@media (max-width: 480px)': {
      marginBottom: '0.5rem'
    }
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#000000',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
    }
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  contentSection: {
    padding: '0'
  },
  sectionHeader: {
    marginBottom: '0.75rem'
  },
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.35rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  sectionDescription: {
    fontSize: '0.875rem',
    color: '#64748b'
  },
  testsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  testCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderLeft: '3px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      padding: '0.75rem',
      minHeight: '100px'
    },
    '@media (max-width: 480px)': {
      padding: '0.625rem',
      minHeight: '90px'
    },
    '&:hover': {
      borderColor: '#cbd5e1',
      borderLeftColor: '#08245b',
      boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.15)',
      transform: 'none'
    },
    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
    },
    '&.disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        transform: 'none',
        boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.05)',
        borderColor: '#e2e8f0'
      },
      '&:active': {
        transform: 'none'
      }
    }
  },
  testIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#08245b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
    color: '#ffffff',
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  testTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#08245b',
    marginBottom: '0.5rem'
  },
  testDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    lineHeight: '1.5'
  }
});
