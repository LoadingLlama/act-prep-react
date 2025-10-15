import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '260px',
    height: '100vh',
    background: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    padding: '1.5rem 1rem',
    overflowY: 'auto',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#d1d5db',
      borderRadius: '3px',
      '&:hover': {
        background: '#9ca3af'
      }
    }
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a73e8',
    marginBottom: '2rem',
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  navSection: {
    marginBottom: '1.5rem'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.65rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    marginBottom: '0.15rem',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    '&:hover': {
      background: '#f3f4f6',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#e8eaed',
      color: '#1a1a1a',
      fontWeight: '500'
    }
  },
  sectionTitle: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
    marginTop: '1rem',
    paddingLeft: '0.75rem'
  },
  spacer: {
    flex: 1
  },
  bottomSection: {
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb'
  }
});

const Sidebar = ({ activeView, onNavigate }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>
        Launch Prep
      </div>

      <div className={classes.navSection}>
        <button
          className={`${classes.navItem} ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <span>🏠</span>
          Home
        </button>
      </div>

      <div className={classes.sectionTitle}>ACT Prep</div>
      <div className={classes.navSection}>
        <button
          className={`${classes.navItem} ${activeView === 'tests' ? 'active' : ''}`}
          onClick={() => onNavigate('tests')}
        >
          <span>📝</span>
          Practice Tests
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'lessons' ? 'active' : ''}`}
          onClick={() => onNavigate('lessons')}
        >
          <span>📚</span>
          Lessons
        </button>
      </div>

      <div className={classes.spacer} />

      <div className={classes.bottomSection}>
        <button
          className={classes.navItem}
          onClick={() => {}}
        >
          <span>⚙️</span>
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
