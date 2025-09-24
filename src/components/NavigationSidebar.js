import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navSidebar: {
    position: 'fixed',
    right: '1rem',
    bottom: '1rem',
    width: '160px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(3px)',
    border: '1px solid rgba(0, 0, 0, 0.03)',
    borderRadius: '6px',
    padding: '0.5rem',
    zIndex: 30,
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.03)',
    opacity: 0.6,
    '&:hover': {
      opacity: 0.9
    },
    '@media (max-width: 1200px)': {
      display: 'none' // Hide on smaller screens
    }
  },

  navHeader: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '0.5rem',
    paddingBottom: '0.3rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  },

  navButton: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    margin: '0.15rem 0',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '400',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.3rem',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      color: '#374151'
    },
    '&:active': {
      transform: 'none'
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderColor: 'rgba(0, 0, 0, 0.05)',
        transform: 'none'
      }
    }
  },

  primaryButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    borderColor: '#4299e1',
    '&:hover': {
      backgroundColor: '#3182ce',
      borderColor: '#3182ce'
    }
  },

  secondaryButton: {
    backgroundColor: 'rgba(113, 128, 150, 0.1)',
    color: '#4a5568',
    borderColor: '#cbd5e0',
    '&:hover': {
      backgroundColor: 'rgba(113, 128, 150, 0.2)',
      borderColor: '#a0aec0'
    }
  },

  dangerButton: {
    backgroundColor: 'rgba(245, 101, 101, 0.1)',
    color: '#c53030',
    borderColor: '#fed7d7',
    '&:hover': {
      backgroundColor: 'rgba(245, 101, 101, 0.2)',
      borderColor: '#feb2b2'
    }
  },

  statusSection: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },

  statusTitle: {
    fontSize: '0.7rem',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '0.3rem'
  },

  statusDropdown: {
    width: '100%',
    fontSize: '0.7rem',
    padding: '0.3rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
    color: '#4b5563',
    cursor: 'not-allowed',
    '&:disabled': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      opacity: 0.8
    }
  },

  progressText: {
    fontSize: '0.65rem',
    color: '#9ca3af',
    marginTop: '0.3rem',
    textAlign: 'center'
  },

});

const NavigationSidebar = ({
  currentSection = 0,
  totalSections = 0,
  isComplete = false,
  currentSectionComplete = false,
  canGoBack = false,
  onBack = null
}) => {
  const classes = useStyles();

  if (totalSections === 0) return null;

  const progressPercentage = Math.round(((currentSection + 1) / totalSections) * 100);

  return (
    <div className={classes.navSidebar}>
      <div className={classes.navHeader}>
        Navigation
      </div>

      {/* Navigation Buttons */}
      <div>
        {canGoBack && (
          <button
            className={`${classes.navButton} ${classes.secondaryButton}`}
            onClick={onBack}
            title="Go back to previous section"
          >
            ← Previous Section
          </button>
        )}


      </div>

      {/* Status Dropdown */}
      <div className={classes.statusSection}>
        <div className={classes.statusTitle}>
          Status
        </div>
        <select
          className={classes.statusDropdown}
          value={isComplete ? 'completed' : totalSections > 0 ? 'in-progress' : 'not-started'}
          onChange={(e) => {
            // Status is automatically updated based on lesson progress
            // This dropdown is read-only for display purposes
          }}
          disabled
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className={classes.progressText}>
          {currentSection + 1} of {totalSections} sections
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;