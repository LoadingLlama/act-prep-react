import React from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { createUseStyles } from 'react-jss';
import Logo from './common/Logo';
import soundEffects from '../services/soundEffects';

const useStyles = createUseStyles({
  navigator: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '240px',
    height: '100vh',
    background: '#08245b',
    padding: '0',
    overflowY: 'auto',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      width: '2px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#08245b'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '2px',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  logoSection: {
    padding: '0.75rem 1rem',
    '@media (max-width: 1024px)': {
      padding: '0.5rem 1rem',
      paddingRight: '3.5rem'
    }
  },
  navSection: {
    flex: 1,
    padding: '0.5rem 0',
    overflowY: 'auto'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    margin: '0 1rem 0.5rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateX(-2px)'
    },
    '& svg': {
      width: '16px',
      height: '16px'
    }
  }
});

const AllLessonsNavigator = ({ onBackClick }) => {
  const classes = useStyles();

  const handleBackClick = () => {
    soundEffects.playClick();
    if (onBackClick) {
      onBackClick();
    }
  };

  return (
    <div className={classes.navigator}>
      {/* Logo */}
      <div className={classes.logoSection}>
        <Logo size="large" style={{ color: '#ffffff', textTransform: 'lowercase' }} />
      </div>

      {/* Back Button */}
      <div className={classes.navSection}>
        <button className={classes.backButton} onClick={handleBackClick}>
          <HiArrowLeft />
          <span>Back to Lessons</span>
        </button>
      </div>
    </div>
  );
};

export default AllLessonsNavigator;
