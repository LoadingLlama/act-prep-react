/**
 * Practice Test Page Styles
 * Updated to match modern website theme
 */

import { createUseStyles } from 'react-jss';

export const usePracticeTestStyles = createUseStyles({
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '3rem 2rem',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    '@media (max-width: 768px)': {
      padding: '2rem 1rem'
    }
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1.5rem'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5e7eb',
    borderTop: '3px solid #1a1a1a',
    borderRadius: '50%',
    animation: '$spin 0.8s linear infinite'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  loadingText: {
    fontSize: '1rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  errorContainer: {
    backgroundColor: '#ffffff',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    margin: '2rem 0'
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: '0.75rem'
  },
  errorMessage: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  backButton: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9375rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      backgroundColor: '#374151',
      transform: 'translateY(-1px)'
    }
  },
  sectionSelector: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '3rem 2.5rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    '@media (max-width: 768px)': {
      padding: '2rem 1.5rem'
    }
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.75rem',
    textAlign: 'center',
    letterSpacing: '-0.02em'
  },
  sectionDescription: {
    color: '#6b7280',
    fontSize: '1rem',
    marginBottom: '2.5rem',
    textAlign: 'center',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 2.5rem'
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      borderColor: '#1a1a1a',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-2px)'
    }
  },
  sectionCardTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  sectionCardQuestions: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.25rem'
  },
  sectionCardTime: {
    fontSize: '0.8125rem',
    color: '#9ca3af'
  },
  fullTestButton: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    display: 'block',
    transition: 'all 0.15s ease',
    '&:hover': {
      backgroundColor: '#374151',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  closeButton: {
    position: 'fixed',
    top: '1.5rem',
    right: '1.5rem',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.625rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    zIndex: 3000,
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#f9fafb',
      borderColor: '#1a1a1a'
    }
  },
  testInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginBottom: '2.5rem',
    marginTop: '2rem'
  },
  testInfoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  testInfoIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
    marginTop: '0.125rem'
  },
  testInfoLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.375rem'
  },
  testInfoValue: {
    fontSize: '0.9375rem',
    color: '#1a1a1a',
    fontWeight: '600',
    lineHeight: '1.4'
  }
});
