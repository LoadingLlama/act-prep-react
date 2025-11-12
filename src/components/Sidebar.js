import React from 'react';
import { createUseStyles } from 'react-jss';
import { HiHome, HiDocumentText, HiBookOpen, HiChartBar, HiUser, HiCog6Tooth, HiArrowRightOnRectangle, HiXMark } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import soundEffects from '../services/soundEffects';

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'none',
    '@media (max-width: 1024px)': {
      '&.open': {
        display: 'block'
      }
    }
  },
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '240px',
    height: '100vh',
    background: '#ffffff',
    padding: '0',
    overflowY: 'auto',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e5e7eb',
    transition: 'transform 0.3s ease',
    '&::-webkit-scrollbar': {
      width: '2px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#ffffff'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '2px',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.12)'
      }
    },
    '@media (max-width: 1024px)': {
      transform: 'translateX(-100%)',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
      '&.open': {
        transform: 'translateX(0)'
      }
    }
  },
  closeButton: {
    display: 'none',
    '@media (max-width: 1024px)': {
      display: 'block',
      position: 'absolute',
      top: '1.5rem',
      right: '1rem',
      background: 'transparent',
      border: 'none',
      padding: '0.5rem',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'color 0.15s ease',
      '&:hover': {
        color: '#1a1a1a'
      },
      '& svg': {
        width: '24px',
        height: '24px'
      }
    }
  },
  logoSection: {
    padding: '0.75rem 1rem'
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
    padding: '0.75rem 1.25rem',
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
    minHeight: '44px',
    '&:hover': {
      background: '#f9fafb',
      color: '#1a1a1a'
    },
    '&:active': {
      background: '#e5e7eb',
      transform: 'scale(0.98)'
    },
    '&.active': {
      background: '#f1f5f9',
      color: '#08245b',
      fontWeight: '600',
      '&:hover': {
        background: '#e2e8f0',
        color: '#08245b'
      }
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

const Sidebar = ({ activeView, onNavigate, isOpen, onClose }) => {
  const classes = useStyles();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const handleNavigate = (view) => {
    soundEffects.playNavigation();
    onNavigate(view);
    // Close sidebar on mobile after navigation
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`${classes.overlay} ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`${classes.sidebar} ${isOpen ? 'open' : ''}`}>
        {/* Close button for mobile */}
        <button className={classes.closeButton} onClick={onClose}>
          <HiXMark />
        </button>

        <div className={classes.logoSection}>
          <img
            src="/images/nomi-academy-logo.png"
            alt="Nomi Academy"
            style={{
              height: '64px',
              objectFit: 'contain'
            }}
          />
        </div>

      <div className={classes.navSection}>
        <button
          className={`${classes.navItem} ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigate('home')}
        >
          <span className={classes.icon}><HiHome /></span>
          Home
        </button>
      </div>

      <div className={classes.navSection}>
        <div className={classes.navSectionTitle}>ACT PREP</div>
        <button
          className={`${classes.navItem} ${activeView === 'lessons' ? 'active' : ''}`}
          onClick={() => handleNavigate('lessons')}
        >
          <span className={classes.icon}><HiBookOpen /></span>
          Lessons
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'tests' ? 'active' : ''}`}
          onClick={() => handleNavigate('tests')}
        >
          <span className={classes.icon}><HiDocumentText /></span>
          Tests
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'insights' ? 'active' : ''}`}
          onClick={() => handleNavigate('insights')}
        >
          <span className={classes.icon}><HiChartBar /></span>
          Insights
        </button>
      </div>

      <div className={classes.spacer} />

      <div className={classes.bottomSection}>
        <button
          className={`${classes.navItem} ${activeView === 'profile' ? 'active' : ''}`}
          onClick={() => handleNavigate('profile')}
        >
          <span className={classes.icon}><HiUser /></span>
          Profile
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => handleNavigate('settings')}
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
    </>
  );
};

export default Sidebar;
