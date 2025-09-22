import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  toggleButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 20px rgba(66, 153, 225, 0.3)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    zIndex: 999,
    '&:hover': {
      backgroundColor: '#3182ce',
      transform: 'scale(1.1)',
      boxShadow: '0 6px 25px rgba(66, 153, 225, 0.4)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    },
    '@media (max-width: 768px)': {
      width: '50px',
      height: '50px',
      bottom: '20px',
      right: '20px',
      fontSize: '1.2rem'
    }
  },
  pulse: {
    animation: '$pulse 2s infinite'
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 4px 20px rgba(66, 153, 225, 0.3)'
    },
    '50%': {
      boxShadow: '0 4px 25px rgba(66, 153, 225, 0.6)'
    },
    '100%': {
      boxShadow: '0 4px 20px rgba(66, 153, 225, 0.3)'
    }
  },
  aiIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
});

const AIToggleButton = ({ onClick, isOpen, hasNewSuggestion = false }) => {
  const classes = useStyles();

  return (
    <button
      className={`${classes.toggleButton} ${hasNewSuggestion ? classes.pulse : ''}`}
      onClick={onClick}
      title={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
    >
      <div className={classes.aiIcon}>
        {isOpen ? '×' : 'AI'}
      </div>
    </button>
  );
};

export default AIToggleButton;