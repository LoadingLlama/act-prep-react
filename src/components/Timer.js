import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  timer: {
    background: '#1a1a1a',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: 500,
    fontSize: '1rem',
    minWidth: '80px',
    textAlign: 'center'
  }
});

const Timer = ({ timeRemaining }) => {
  const classes = useStyles();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={classes.timer}>
      {formatTime(timeRemaining)}
    </div>
  );
};

export default Timer;