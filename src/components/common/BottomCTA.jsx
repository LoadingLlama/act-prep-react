/**
 * Bottom CTA Component
 * Reusable CTA for diagnostic test with consistent styling across pages
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  bottomCtaSection: {
    marginTop: '80px',
    marginBottom: '40px',
    padding: '0 32px',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      marginTop: '72px',
      marginBottom: '32px',
      padding: '0 20px',
    },
    '@media (max-width: 480px)': {
      marginTop: '76px',
      padding: '0 16px',
    },
  },

  bottomCtaHeadline: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
    '@media (max-width: 768px)': {
      fontSize: '28px',
      marginBottom: '14px',
    },
    '@media (max-width: 480px)': {
      fontSize: '24px',
    },
  },

  bottomCtaSubtext: {
    fontSize: '18px',
    color: '#6B7280',
    marginBottom: '32px',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 32px auto',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '24px',
      lineHeight: '1.5',
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
      marginBottom: '20px',
    },
  },

  bottomCtaButton: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    background: '#1e3a8a',
    border: 'none',
    padding: '16px 40px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 3px 0 0 rgba(30, 58, 138, 0.4)',
    display: 'inline-block',
    '@media (max-width: 768px)': {
      width: '100%',
      fontSize: '14px',
      padding: '12px 24px',
    },
    '&:hover': {
      background: '#1e40af',
      boxShadow: '0 3px 0 0 rgba(30, 64, 175, 0.5)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 0 0 rgba(30, 64, 175, 0.5)',
    },
  },

  highlightText: {
    display: 'inline',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
});

const BottomCTA = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.bottomCtaSection}>
      <h2 className={classes.bottomCtaHeadline}>
        Let's get you started with a <span className={classes.highlightText}>free diagnostic test.</span>
      </h2>
      <p className={classes.bottomCtaSubtext}>
        Click below to claim your test before resources run out!
      </p>
      <button className={classes.bottomCtaButton} onClick={onClick}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          Free Diagnostic Test
          <svg width="20" height="14" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8h24M20 2l6 6-6 6"/>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default BottomCTA;
