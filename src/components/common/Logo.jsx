/**
 * Logo Component
 * Reusable logo component for Nomi Academy
 * Used across landing page, sidebar, and authentication
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  logo: {
    fontWeight: '600',
    fontFamily: '"Times New Roman", Times, serif',
    color: '#ffffff',
    letterSpacing: '-0.05em',
    margin: 0,
    transition: 'opacity 0.2s ease',
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

  return (
    <div
      className={`${classes.logo} ${classes[size]} ${clickable ? classes.clickable : classes.notClickable}`}
      style={style}
      onClick={onClick}
    >
      NomiAcademy
    </div>
  );
};

export default Logo;
