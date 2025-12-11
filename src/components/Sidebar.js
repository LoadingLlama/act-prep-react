import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { HiHome, HiDocumentText, HiBookOpen, HiChartBar, HiUser, HiCog6Tooth, HiArrowRightOnRectangle, HiArrowLeftOnRectangle, HiXMark, HiLockClosed, HiBolt, HiAcademicCap, HiSquares2X2 } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
// import soundEffects from '../services/soundEffects';
import AppLogo from './common/AppLogo';

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
    background: '#08245b',
    padding: '0',
    overflow: 'hidden',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'none',
    transition: 'transform 0.3s ease',
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
      color: 'rgba(255, 255, 255, 0.7)',
      transition: 'color 0.15s ease',
      zIndex: 10,
      '&:hover': {
        color: '#ffffff'
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
    color: '#ffffff',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    margin: 0,
    whiteSpace: 'nowrap',
    '@media (max-width: 1024px)': {
      fontSize: '0.7rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.65rem'
    }
  },
  navSection: {
    padding: '0.5rem 0',
    '@media (max-width: 1024px)': {
      padding: '0.15rem 0'
    }
  },
  navSectionTitle: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '0 1.25rem',
    marginBottom: '0.5rem',
    marginTop: '0.75rem',
    '@media (max-width: 1024px)': {
      fontSize: '0.65rem',
      marginTop: '0.35rem',
      marginBottom: '0.25rem'
    }
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 0.75rem',
    fontSize: '0.9rem',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.12s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'transparent',
    border: 'none',
    width: 'calc(100% - 1rem)',
    textAlign: 'left',
    fontWeight: '700',
    position: 'relative',
    minHeight: '44px',
    borderRadius: '22px',
    margin: '0 0.5rem',
    zIndex: 1,
    '@media (max-width: 1024px)': {
      padding: '0.5rem 0.75rem',
      fontSize: '0.85rem',
      minHeight: '36px'
    },
    '&:hover:not(.active)': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff'
    },
    '&:active': {
      transform: 'scale(0.98)'
    }
  },
  activeIndicator: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '22px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    zIndex: 0
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
    borderTop: 'none',
    marginTop: 'auto',
    '@media (max-width: 1024px)': {
      padding: '0.25rem 0'
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
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    color: '#b91c1c',
    border: '1px solid #fca5a5'
  },
  lockedBadge: {
    background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
    color: '#991b1b',
    border: '1px solid #f87171'
  },
  lockIcon: {
    marginLeft: 'auto',
    fontSize: '0.8rem',
    color: '#fca5a5',
    opacity: 0.9
  },
});

const Sidebar = ({ activeView, onNavigate, isOpen, onClose, isPro, trialDaysLeft, isTrialExpired }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();

  // Refs for nav items
  const navRefs = useRef({});
  const navSectionRef = useRef(null);
  const bottomSectionRef = useRef(null);

  // State for sliding indicator
  const [indicatorStyle, setIndicatorStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0
  });
  const [activeSection, setActiveSection] = useState(null); // 'nav' or 'bottom'

  // Check if we're in drills mode
  const isDrillsMode = location.pathname === '/app/lessons' && new URLSearchParams(location.search).get('mode') === 'drills';

  // Update indicator position when activeView changes
  useEffect(() => {
    // If we're in drills mode, highlight the drills button instead of lessons
    const effectiveView = isDrillsMode ? 'drills' : activeView;
    const activeRef = navRefs.current[effectiveView];
    if (activeRef && (navSectionRef.current || bottomSectionRef.current)) {
      const rect = activeRef.getBoundingClientRect();
      const parentRect = activeRef.closest('[data-nav-section]')?.getBoundingClientRect();

      if (parentRect) {
        // Determine which section this is
        const isNavSection = navSectionRef.current?.contains(activeRef);
        const isBottomSection = bottomSectionRef.current?.contains(activeRef);

        setActiveSection(isNavSection ? 'nav' : isBottomSection ? 'bottom' : null);

        setIndicatorStyle({
          top: rect.top - parentRect.top,
          left: rect.left - parentRect.left,
          width: rect.width,
          height: rect.height,
          opacity: 1
        });
      }
    }
  }, [activeView, isOpen, isDrillsMode]);

  const handleLogout = async () => {
    await signOut();
    // Clear trial session data
    sessionStorage.clear();
    // Stay on current page - InlineAuth will show automatically
  };

  const handleLogin = () => {
    // Just navigate to profile which will show the inline auth
    // soundEffects.playNavigation();
    onNavigate('home');
    if (onClose) {
      onClose();
    }
  };

  const handleLogoClick = () => {
    // soundEffects.playNavigation();
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
      // soundEffects.playNavigation();
      onNavigate('upgrade');
      if (onClose) {
        onClose();
      }
      return;
    }

    // soundEffects.playNavigation();
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
          <AppLogo size="small" clickable onClick={handleLogoClick} style={{ color: '#ffffff' }} />
        </div>

      <div className={classes.navSection} data-nav-section ref={navSectionRef} style={{ position: 'relative' }}>
        {/* Sliding indicator */}
        <div
          className={classes.activeIndicator}
          style={{
            ...indicatorStyle,
            opacity: activeSection === 'nav' ? indicatorStyle.opacity : 0
          }}
        />

        <button
          ref={el => navRefs.current['home'] = el}
          className={`${classes.navItem} ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigate('home')}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiAcademicCap /></span>
          Study plan
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
        <button
          ref={el => navRefs.current['lessons'] = el}
          className={`${classes.navItem} ${activeView === 'lessons' && !isDrillsMode ? 'active' : ''}`}
          onClick={() => {
            if (isTrialExpired && !isPro) {
              // soundEffects.playNavigation();
              onNavigate('upgrade');
              if (onClose) {
                onClose();
              }
              return;
            }
            // soundEffects.playNavigation();
            navigate('/app/lessons');
            if (onClose) {
              onClose();
            }
          }}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiSquares2X2 /></span>
          Courses
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
        <button
          ref={el => navRefs.current['drills'] = el}
          className={`${classes.navItem} ${isDrillsMode ? 'active' : ''}`}
          onClick={() => {
            if (isTrialExpired && !isPro) {
              // soundEffects.playNavigation();
              onNavigate('upgrade');
              if (onClose) {
                onClose();
              }
              return;
            }
            // soundEffects.playNavigation();
            navigate('/app/lessons?mode=drills');
            if (onClose) {
              onClose();
            }
          }}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiBolt /></span>
          Drills
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
        <button
          ref={el => navRefs.current['tests'] = el}
          className={`${classes.navItem} ${activeView === 'tests' ? 'active' : ''}`}
          onClick={() => handleNavigate('tests')}
          style={{ opacity: isTrialExpired && !isPro ? 0.5 : 1 }}
        >
          <span className={classes.icon}><HiDocumentText /></span>
          Mock tests
          {isTrialExpired && !isPro && <HiLockClosed className={classes.lockIcon} />}
        </button>
        <button
          ref={el => navRefs.current['insights'] = el}
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

      <div className={classes.bottomSection} data-nav-section ref={bottomSectionRef} style={{ position: 'relative' }}>
        {/* Sliding indicator */}
        <div
          className={classes.activeIndicator}
          style={{
            ...indicatorStyle,
            opacity: activeSection === 'bottom' ? indicatorStyle.opacity : 0
          }}
        />

        {user && (
          <button
            ref={el => navRefs.current['profile'] = el}
            className={`${classes.navItem} ${activeView === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavigate('profile')}
          >
            <span className={classes.icon}><HiUser /></span>
            Profile
          </button>
        )}
        {user && (
          <button
            ref={el => navRefs.current['settings'] = el}
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
