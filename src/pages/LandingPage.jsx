/**
 * Landing Page
 * Simple, clean landing page with navy theme
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #08245b 0%, #0a2f73 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  content: {
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },

  logo: {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '48px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '48px',
    letterSpacing: '0.02em',
  },

  headline: {
    fontSize: '52px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '24px',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '36px',
    },
  },

  subheadline: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
    marginBottom: '48px',
    fontWeight: '400',
    '@media (max-width: 768px)': {
      fontSize: '18px',
    },
  },

  ctaButton: {
    display: 'inline-block',
    padding: '18px 48px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#08245b',
    background: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },

  footer: {
    marginTop: '64px',
    paddingTop: '32px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  footerText: {
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.7)',
  },

  signInButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '15px',
    fontWeight: '600',
    padding: '0',
    marginLeft: '8px',
    '&:hover': {
      opacity: '0.8',
    },
  },
});

const LandingPage = ({ onGetStarted, onSignIn }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.logo}>Nomi Academy</div>

        <h1 className={classes.headline}>
          Ace Your ACT
        </h1>

        <p className={classes.subheadline}>
          Personalized prep, expert guidance, and practice tests designed to help you reach your target score.
        </p>

        <button className={classes.ctaButton} onClick={onGetStarted}>
          Get Started Free
        </button>

        <div className={classes.footer}>
          <p className={classes.footerText}>
            Already have an account?
            <button className={classes.signInButton} onClick={onSignIn}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
