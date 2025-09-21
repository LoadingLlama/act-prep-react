import React from 'react';
import { createUseStyles } from 'react-jss';
import { statusStyles, iconStyles } from '../utils/sharedStyles';

const useStyles = createUseStyles({
  icon: {
    ...iconStyles.base,
    '&.completed': statusStyles.completed,
    '&.in-progress': statusStyles.inProgress,
    '&.not-started': statusStyles.notStarted
  }
});

const StatusIcon = ({ status }) => {
  const classes = useStyles();

  const getIconContent = () => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '⏱';
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