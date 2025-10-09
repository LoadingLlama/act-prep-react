import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  icon: {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    '&.completed': {
      color: '#10b981'
    },
    '&.in-progress': {
      color: '#f59e0b'
    },
    '&.not-started': {
      color: '#d1d5db'
    }
  }
});

const StatusIcon = ({ status }) => {
  const classes = useStyles();

  const getIconContent = () => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '●';
      case 'not-started':
      default:
        return '○';
    }
  };

  return (
    <div className={`${classes.icon} ${status}`}>
      {getIconContent()}
    </div>
  );
};

export default StatusIcon;