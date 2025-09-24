import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  controlsSidebar: {
    position: 'fixed',
    right: '0.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '180px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 248, 255, 0.9) 100%)',
    backdropFilter: 'blur(12px)',
    border: '2px solid rgba(26, 115, 232, 0.15)',
    borderRadius: '12px',
    padding: '0.8rem',
    zIndex: 50,
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(26, 115, 232, 0.15)',
    opacity: 0.9,
    '&:hover': {
      opacity: 1,
      transform: 'translateY(-50%) scale(1.02)'
    }
  },

  controlsHeader: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#1a73e8',
    marginBottom: '0.6rem',
    paddingBottom: '0.4rem',
    borderBottom: '2px solid rgba(26, 115, 232, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  controlSection: {
    marginBottom: '1rem',
    '&:last-child': {
      marginBottom: 0
    }
  },

  controlLabel: {
    fontSize: '0.75rem',
    color: '#4a5568',
    fontWeight: '600',
    marginBottom: '0.4rem',
    display: 'block'
  },

  dropdown: {
    width: '100%',
    padding: '0.6rem',
    border: '2px solid rgba(26, 115, 232, 0.15)',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 248, 255, 0.9) 100%)',
    backdropFilter: 'blur(8px)',
    color: '#4a5568',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#1a73e8',
      backgroundColor: 'rgba(237, 242, 247, 0.8)',
      transform: 'translateY(-1px)'
    },
    '&:focus': {
      outline: 'none',
      borderColor: 'rgba(26, 115, 232, 0.4)',
      boxShadow: 'none'
    }
  },

  statusActive: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    color: '#d97706',
    fontWeight: '700'
  },

  statusCompleted: {
    background: 'rgba(76, 175, 80, 0.08)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
    color: '#4caf50',
    fontWeight: '600'
  },

  speedInfo: {
    fontSize: '0.65rem',
    color: '#718096',
    marginTop: '0.2rem',
    fontStyle: 'italic'
  },

  sliderContainer: {
    width: '100%',
    padding: '0.5rem 0'
  },

  speedSlider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'linear-gradient(90deg, #2c5aa0 0%, #1a73e8 50%, #10a37f 100%)',
    outline: 'none',
    opacity: 0.9,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
      opacity: 1
    },
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: '#1a73e8',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(26, 115, 232, 0.3)',
      border: '2px solid white',
      '&:hover': {
        background: '#2c5aa0',
        transform: 'scale(1.15)',
        boxShadow: '0 0 0 8px rgba(26, 115, 232, 0.2)'
      }
    },
    '&::-moz-range-thumb': {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: '#1a73e8',
      cursor: 'pointer',
      border: '2px solid white',
      boxShadow: '0 2px 4px rgba(26, 115, 232, 0.3)'
    }
  },

  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
    fontSize: '0.6rem',
    color: '#718096',
    fontWeight: '500',
    '& span': {
      fontSize: '0.6rem'
    }
  }
});

const ControlsSidebar = ({
  currentSection,
  maxLoadedSection,
  sectionStatus = 'pending',
  onStatusChange,
  typingSpeed = 25,
  onSpeedChange
}) => {
  const classes = useStyles();

  const getStatusClass = () => {
    let className = classes.dropdown;
    if (sectionStatus === 'in_progress') {
      className += ` ${classes.statusActive}`;
    } else if (sectionStatus === 'completed') {
      className += ` ${classes.statusCompleted}`;
    }
    return className;
  };

  const getSpeedLabel = (speed) => {
    if (speed <= 15) return 'Very Fast';
    if (speed <= 20) return 'Fast';
    if (speed <= 25) return 'Normal';
    if (speed <= 50) return 'Slow';
    return 'Very Slow';
  };

  return (
    <div className={classes.controlsSidebar}>
      <div className={classes.controlsHeader}>
        Controls
      </div>

      <div className={classes.controlSection}>
        <label className={classes.controlLabel}>
          Section Status
        </label>
        <select
          className={getStatusClass()}
          value={sectionStatus}
          onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed ✓</option>
        </select>
      </div>

      <div className={classes.controlSection}>
        <label className={classes.controlLabel}>
          Typing Speed
        </label>
        <div className={classes.sliderContainer}>
          <input
            type="range"
            min={15}
            max={75}
            value={90 - typingSpeed}
            onChange={(e) => onSpeedChange && onSpeedChange(90 - parseInt(e.target.value))}
            className={classes.speedSlider}
          />
          <div className={classes.sliderLabels}>
            <span>Very Slow</span>
            <span>Very Fast</span>
          </div>
        </div>
        <div className={classes.speedInfo}>
          Currently: {getSpeedLabel(typingSpeed)}
        </div>
      </div>
    </div>
  );
};

export default ControlsSidebar;