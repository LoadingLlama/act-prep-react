/**
 * Diagnostic Test CTA Component
 * Shared component used in Tests and Insights pages
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import { HiClipboardDocumentCheck, HiArrowRight } from 'react-icons/hi2';

const useStyles = createUseStyles({
  diagnosticCTA: {
    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    border: '1.5px solid #fca5a5',
    borderRadius: '12px',
    padding: '1.75rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#f87171',
      boxShadow: '0 8px 20px rgba(220, 38, 38, 0.2)',
      transform: 'translateY(-2px)'
    },
    '&:active': {
      transform: 'scale(0.99)',
      boxShadow: '0 1px 6px rgba(220, 38, 38, 0.06)'
    },
    '@media (max-width: 768px)': {
      padding: '1.5rem 1rem'
    }
  },
  diagnosticInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1rem'
    }
  },
  diagnosticIcon: {
    fontSize: '3rem',
    color: '#dc2626',
    flexShrink: 0
  },
  diagnosticContent: {
    flex: 1
  },
  diagnosticTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.4rem',
    letterSpacing: '-0.02em'
  },
  diagnosticDescription: {
    fontSize: '0.9rem',
    color: '#6b7280',
    lineHeight: '1.5',
    marginBottom: '0'
  },
  diagnosticButton: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '0.75rem 1.75rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    boxShadow: '0 3px 0 0 rgba(220, 38, 38, 0.4)',
    '&:hover': {
      background: '#b91c1c',
      boxShadow: '0 3px 0 0 rgba(185, 28, 28, 0.5)'
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 0 0 rgba(185, 28, 28, 0.5)'
    },
    '@media (max-width: 640px)': {
      width: '100%'
    }
  }
});

const DiagnosticTestCTA = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.diagnosticCTA}>
      <div className={classes.diagnosticInfo}>
        <HiClipboardDocumentCheck className={classes.diagnosticIcon} />
        <div className={classes.diagnosticContent}>
          <h2 className={classes.diagnosticTitle}>Take Your Diagnostic Test</h2>
          <p className={classes.diagnosticDescription}>
            Get personalized insights and recommendations by completing your diagnostic test.
            We'll analyze your strengths and weaknesses across all ACT sections to create a custom learning path.
          </p>
        </div>
      </div>
      <button
        className={classes.diagnosticButton}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Start Diagnostic Test
        <HiArrowRight style={{ fontSize: '1.25rem' }} />
      </button>
    </div>
  );
};

export default DiagnosticTestCTA;
