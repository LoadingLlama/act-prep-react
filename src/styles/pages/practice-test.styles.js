/**
 * Practice Test Page Styles
 * Extracted from PracticeTestPage.jsx
 */

import { createUseStyles } from 'react-jss';

export const usePracticeTestStyles = createUseStyles({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: '#f7fafc'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem'
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #4299e1',
    borderRadius: '50%',
    animation: '$spin 1s linear infinite'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  loadingText: {
    fontSize: '1.2rem',
    color: '#4a5568',
    fontWeight: '600'
  },
  errorContainer: {
    backgroundColor: '#fff5f5',
    border: '2px solid #fc8181',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    margin: '2rem 0'
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#c53030',
    marginBottom: '1rem'
  },
  errorMessage: {
    fontSize: '1.1rem',
    color: '#742a2a',
    marginBottom: '1.5rem'
  },
  backButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#3182ce'
    }
  },
  sectionSelector: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  sectionDescription: {
    color: '#4a5568',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    textAlign: 'center',
    lineHeight: '1.6'
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  sectionCard: {
    backgroundColor: '#f7fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#4299e1',
      backgroundColor: '#edf2f7',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  sectionCardTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  sectionCardQuestions: {
    fontSize: '1rem',
    color: '#718096',
    marginBottom: '0.5rem'
  },
  sectionCardTime: {
    fontSize: '0.9rem',
    color: '#a0aec0',
    fontStyle: 'italic'
  },
  fullTestButton: {
    backgroundColor: '#48bb78',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '1.25rem 2rem',
    fontSize: '1.2rem',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#38a169',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    }
  },
  closeButton: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    zIndex: 3000,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#c53030'
    }
  }
});
