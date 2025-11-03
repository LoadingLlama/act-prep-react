import React from 'react';
import { createUseStyles } from 'react-jss';
import { HiHome, HiAcademicCap, HiDocumentText, HiBookOpen, HiUser, HiCog6Tooth, HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';

const useStyles = createUseStyles({
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '240px',
    height: '100vh',
    background: '#ffffff',
    padding: '0',
    overflowY: 'auto',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e5e7eb',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '2px',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.12)'
      }
    }
  },
  logoSection: {
    padding: '1.5rem 1.25rem',
    borderBottom: '1px solid #f3f4f6'
  },
  logo: {
    fontSize: '1.35rem',
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: '-0.01em',
    lineHeight: '1.1',
    margin: 0
  },
  navSection: {
    padding: '0.5rem 0'
  },
  navSectionTitle: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '0 1.25rem',
    marginBottom: '0.5rem',
    marginTop: '0.75rem'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.65rem 1.25rem',
    fontSize: '0.9rem',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontWeight: '500',
    position: 'relative',
    '&:hover': {
      background: '#f9fafb',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#f3f4f6',
      color: '#1a1a1a',
      fontWeight: '600'
    }
  },
  icon: {
    width: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: '18px',
      height: '18px'
    }
  },
  spacer: {
    flex: 1
  },
  bottomSection: {
    padding: '0.5rem 0',
    borderTop: '1px solid #f3f4f6',
    marginTop: 'auto'
  }
});

const Sidebar = ({ activeView, onNavigate }) => {
  const classes = useStyles();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.logoSection}>
        <div className={classes.logo}>Nomi Academy</div>
      </div>

      <div className={classes.navSection}>
        <button
          className={`${classes.navItem} ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <span className={classes.icon}><HiHome /></span>
          Home
        </button>
      </div>

      <div className={classes.navSection}>
        <div className={classes.navSectionTitle}>ACT PREP</div>
        <button
          className={`${classes.navItem} ${activeView === 'course' ? 'active' : ''}`}
          onClick={() => onNavigate('course')}
        >
          <span className={classes.icon}><HiAcademicCap /></span>
          Learning Path
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'tests' ? 'active' : ''}`}
          onClick={() => onNavigate('tests')}
        >
          <span className={classes.icon}><HiDocumentText /></span>
          Practice Tests
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'lessons' ? 'active' : ''}`}
          onClick={() => onNavigate('lessons')}
        >
          <span className={classes.icon}><HiBookOpen /></span>
          Lessons
        </button>
      </div>

      <div className={classes.spacer} />

      <div className={classes.bottomSection}>
        <button
          className={`${classes.navItem} ${activeView === 'profile' ? 'active' : ''}`}
          onClick={() => onNavigate('profile')}
        >
          <span className={classes.icon}><HiUser /></span>
          Profile
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => onNavigate('settings')}
        >
          <span className={classes.icon}><HiCog6Tooth /></span>
          Settings
        </button>
        <button className={classes.navItem} onClick={handleLogout}>
          <span className={classes.icon}><HiArrowRightOnRectangle /></span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
