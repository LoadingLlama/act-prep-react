/**
 * Logo Component
 * Reusable logo component for Nomi Academy
 * Used across landing page, sidebar, and authentication
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'opacity 0.2s ease',
  },
  logoImage: {
    height: '32px',
    width: 'auto',
    '@media (max-width: 768px)': {
      height: '24px',
    },
    '@media (max-width: 480px)': {
      height: '20px',
    },
  },
  logoImageSmall: {
    height: '24px',
  },
  logoImageMedium: {
    height: '32px',
  },
  logoImageLarge: {
    height: '40px',
  },
  logo: {
    fontWeight: '600',
    fontFamily: '"Times New Roman", Times, serif',
    color: '#ffffff',
    letterSpacing: '-0.05em',
    margin: 0,
  },
  small: {
    fontSize: '20px',
    '@media (max-width: 768px)': {
      fontSize: '9px',
    },
    '@media (max-width: 480px)': {
      fontSize: '8px',
    },
  },
  medium: {
    fontSize: '24px',
    '@media (max-width: 768px)': {
      fontSize: '10px',
    },
    '@media (max-width: 480px)': {
      fontSize: '9px',
    },
  },
  large: {
    fontSize: '28px',
    '@media (max-width: 768px)': {
      fontSize: '12px',
    },
    '@media (max-width: 480px)': {
      fontSize: '11px',
    },
  },
  clickable: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
  notClickable: {
    cursor: 'default',
  },
});

const Logo = ({ size = 'medium', style = {}, onClick, clickable = false }) => {
  const classes = useStyles();

  // Determine image size based on text size
  const imageClass = `logoImage${size.charAt(0).toUpperCase() + size.slice(1)}`;

  return (
    <div
      className={`${classes.logoContainer} ${clickable ? classes.clickable : classes.notClickable}`}
      style={style}
      onClick={onClick}
    >
      <img
        src="/images/nomilogo.png"
        alt="Nomi Academy Logo"
        className={`${classes.logoImage} ${classes[imageClass]}`}
      />
      <div className={`${classes.logo} ${classes[size]}`}>
        NomiAcademy
      </div>
    </div>
  );
};

export default Logo;
