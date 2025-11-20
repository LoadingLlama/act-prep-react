import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { HiHome, HiDocumentText, HiBookOpen, HiChartBar, HiUser, HiCog6Tooth, HiArrowRightOnRectangle, HiArrowLeftOnRectangle, HiXMark, HiLockClosed } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import soundEffects from '../services/soundEffects';
import Logo from './common/Logo';

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
      top: '1rem',
      right: '1rem',
      background: 'transparent',
      border: 'none',
      padding: '0.5rem',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'color 0.15s ease',
      zIndex: 10,
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
    padding: '0.75rem 1rem',
    '@media (max-width: 1024px)': {
      padding: '0.5rem 1rem',
      paddingRight: '3.5rem'
    }
  },
  logo: {
    fontSize: '1.15rem',
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    margin: 0,
    whiteSpace: 'nowrap',
    '@media (max-width: 1024px)': {
      fontSize: '0.95rem'
    }
  },
  navSection: {
    padding: '0.5rem 0',
    '@media (max-width: 1024px)': {
      padding: '0.25rem 0'
    }
  },
  navSectionTitle: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '0 1.25rem',
    marginBottom: '0.5rem',
    marginTop: '0.75rem',
    '@media (max-width: 1024px)': {
      fontSize: '0.65rem',
      marginTop: '0.5rem',
      marginBottom: '0.35rem'
    }
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
    '@media (max-width: 1024px)': {
      padding: '0.6rem 1.25rem',
      fontSize: '0.85rem',
      minHeight: '38px'
    },
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
    marginTop: 'auto',
    '@media (max-width: 1024px)': {
      padding: '0.35rem 0'
    }
  },
  statusBadge: {
    fontSize: '0.6rem',
    fontWeight: '600',
    padding: '0.2rem 0.4rem',
    borderRadius: '3px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap',
    marginLeft: 'auto',
    '@media (max-width: 1024px)': {
      fontSize: '0.55rem',
      padding: '0.15rem 0.35rem'
    }
  },
  proBadge: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
    color: '#64748b',
    boxShadow: '0 2px 12px rgba(100, 116, 139, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(148, 163, 184, 0.2)',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  trialBadge: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    color: '#1e40af',
    border: '1px solid #93c5fd'
  },
  lockedBadge: {
    background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
    color: '#991b1b',
    border: '1px solid #f87171'
  },
  lockIcon: {
    marginLeft: 'auto',
    fontSize: '0.8rem',
    color: '#ef4444',
    opacity: 0.7
  }
});

const Sidebar = ({ activeView, onNavigate, isOpen, onClose, isPro, trialDaysLeft, isTrialExpired }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    // Clear trial session data
    sessionStorage.clear();
    // Stay on current page - InlineAuth will show automatically
  };

  const handleLogin = () => {
    // Just navigate to profile which will show the inline auth
    soundEffects.playNavigation();
    onNavigate('home');
    if (onClose) {
      onClose();
    }
  };

  const handleLogoClick = () => {
    soundEffects.playNavigation();
    navigate('/');
    if (onClose) {
      onClose();
    }
  };

  const handleNavigate = (view) => {
    // Allow navigation to profile, settings, and upgrade even if trial expired
    const allowedViews = ['profile', 'settings', 'upgrade'];
    if (isTrialExpired && !isPro && !allowedViews.includes(view)) {
      // Redirect to upgrade page if trying to access locked content
      soundEffects.playNavigation();
      onNavigate('upgrade');
      if (onClose) {
        onClose();
      }
      return;
    }

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
          <Logo size="large" clickable onClick={handleLogoClick} />
        </div>

      <div className={classes.navSection}>
        <button
          className={`${classes.navItem} ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigate('home')}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiHome /></span>
          Home
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
      </div>

      <div className={classes.navSection}>
        <div className={classes.navSectionTitle}>ACT PREP</div>
        <button
          className={`${classes.navItem} ${activeView === 'lessons' ? 'active' : ''}`}
          onClick={() => handleNavigate('lessons')}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiBookOpen /></span>
          Lessons
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'tests' ? 'active' : ''}`}
          onClick={() => handleNavigate('tests')}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiDocumentText /></span>
          Tests
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
        <button
          className={`${classes.navItem} ${activeView === 'insights' ? 'active' : ''}`}
          onClick={() => handleNavigate('insights')}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiChartBar /></span>
          Insights
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
      </div>

      <div className={classes.spacer} />

      <div className={classes.bottomSection}>
        {user && (
          <button
            className={`${classes.navItem} ${activeView === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavigate('profile')}
          >
            <span className={classes.icon}><HiUser /></span>
            Profile
            <span className={`${classes.statusBadge} ${isPro ? classes.proBadge : isTrialExpired ? classes.lockedBadge : classes.trialBadge}`}>
              {isPro ? 'Pro' : isTrialExpired ? 'Locked' : `${trialDaysLeft}d left`}
            </span>
          </button>
        )}
        {user && (
          <button
            className={`${classes.navItem} ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavigate('settings')}
          >
            <span className={classes.icon}><HiCog6Tooth /></span>
            Settings
          </button>
        )}
        {user ? (
          <button className={classes.navItem} onClick={handleLogout}>
            <span className={classes.icon}><HiArrowRightOnRectangle /></span>
            Logout
          </button>
        ) : (
          <button className={classes.navItem} onClick={handleLogin}>
            <span className={classes.icon}><HiArrowLeftOnRectangle /></span>
            Login
          </button>
        )}
      </div>
      </div>
    </>
  );
};

export default Sidebar;
