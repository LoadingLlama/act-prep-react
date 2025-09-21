import React from 'react';
import { createUseStyles } from 'react-jss';
import Timer from './Timer';
import { spacing, borderRadius } from '../utils/sharedStyles';

const useStyles = createUseStyles({
  header: {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.75rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '0'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  logo: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1a1a',
    textDecoration: 'none',
    letterSpacing: '-0.02em'
  },
  testTitle: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#1a1a1a',
    margin: 0,
    textAlign: 'center',
    flex: 1
  },
  timerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  submitButton: {
    margin: 0,
    padding: `${spacing.sm} ${spacing.lg}`,
    fontSize: '0.85rem',
    borderRadius: borderRadius.md,
    minWidth: '80px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    '&:hover': {
      background: '#c82333'
    }
  }
});

const Header = ({
  title = "ACT Prep Course",
  showTimer = false,
  timeRemaining = 0,
  onSubmit = null,
  showLogo = true
}) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerContent}>
        {showLogo && (
          <a href="#" className={classes.logo}>
            actcourse.org
          </a>
        )}

        <h1 className={classes.testTitle}>{title}</h1>

        {showTimer && (
          <div className={classes.timerSection}>
            <Timer timeRemaining={timeRemaining} />
            {onSubmit && (
              <button className={classes.submitButton} onClick={onSubmit}>
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;