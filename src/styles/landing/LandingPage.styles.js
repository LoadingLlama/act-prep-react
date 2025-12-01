/**
 * Landing Page Styles
 * Ultra-bold MasterClass-inspired design
 */

import { createUseStyles } from 'react-jss';

export const useLandingPageStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden',
    background: '#000000',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    position: 'relative',
    boxSizing: 'border-box',
  },

  // Navigation - Glassy and floating
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    maxWidth: '100%',
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(24px) saturate(200%)',
    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
    zIndex: 9999,
    padding: '12px 0',
    boxSizing: 'border-box',
    overflowX: 'visible',
    overflow: 'visible',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      padding: '10px 0',
    },
  },

  navContent: {
    maxWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    boxSizing: 'border-box',
    overflow: 'visible',
    '@media (max-width: 768px)': {
      padding: '0 12px',
    },
    '@media (max-width: 480px)': {
      padding: '0 10px',
    },
  },

  navLogo: {
    fontSize: '24px',
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#ffffff',
    letterSpacing: '-0.02em',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      fontSize: '14px',
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
    },
    '&:hover': {
      transform: 'scale(1.02)',
      opacity: 0.9,
    },
  },

  navRight: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginLeft: 'auto',
    overflow: 'visible',
    position: 'relative',
    zIndex: 10001,
  },

  coursesDropdown: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 10002,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },

  coursesDropdownButton: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'none',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '0',
  },

  coursesDropdownButtonActive: {
    color: '#ffffff !important',
    background: 'none !important',
  },

  dropdownArrow: {
    transition: 'transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  coursesDropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    minWidth: '120px',
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: 'none',
    borderRadius: '0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    padding: '4px 0',
    zIndex: 99999,
    animation: '$fadeIn 0.2s ease',
  },

  coursesDropdownItem: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: '400',
    color: '#ffffff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'none',
  },

  coursesDropdownItemDisabled: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: '400',
    color: '#ffffff',
    background: 'none',
    border: 'none',
    cursor: 'default',
    textAlign: 'left',
    transition: 'none',
    opacity: 0.3,
  },

  signInButton: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#000000',
    background: 'rgba(243, 244, 246, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(229, 231, 235, 0.8)',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '8px',
    '@media (max-width: 768px)': {
      padding: '5px 10px',
      fontSize: '11px',
      borderRadius: '6px',
    },
    '@media (max-width: 480px)': {
      padding: '4px 8px',
      fontSize: '10px',
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.9)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },

  getStartedButton: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    background: '#b91c1c',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 3px 0 0 rgba(185, 28, 28, 0.4)',
    '@media (max-width: 768px)': {
      padding: '5px 10px',
      fontSize: '11px',
      borderRadius: '6px',
      boxShadow: '0 2px 0 0 rgba(185, 28, 28, 0.4)',
    },
    '@media (max-width: 480px)': {
      padding: '4px 8px',
      fontSize: '10px',
    },
    '&:hover': {
      background: '#991b1b',
      boxShadow: '0 3px 0 0 rgba(153, 27, 27, 0.5)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },

  // Main Content - Centered and Premium
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '0 32px 40px',
    position: 'relative',
    zIndex: 1,
    boxSizing: 'border-box',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      padding: '0 12px 20px',
    },
    '@media (max-width: 480px)': {
      padding: '0 10px 16px',
    },
  },

  heroSection: {
    textAlign: 'center',
    maxWidth: '100vw',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    marginTop: '60px',
    padding: '155px 32px 140px 32px',
    position: 'relative',
    backgroundImage: 'url(/assets/studentpic.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: 'auto',
    '@media (max-width: 768px)': {
      marginTop: '44px',
      padding: '50px 12px 50px 12px',
    },
    '@media (max-width: 480px)': {
      marginTop: '42px',
      padding: '30px 10px 30px 10px',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 0.75) 70%, rgba(0, 0, 0, 0.9) 90%, rgba(0, 0, 0, 1) 100%)',
      zIndex: 0,
    },
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
  },

  productDemoContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 32px',
    display: 'block',
    '@media (max-width: 768px)': {
      marginBottom: '16px',
      maxWidth: '100%',
      padding: '0 8px',
      display: 'block',
    },
    '@media (max-width: 480px)': {
      marginBottom: '12px',
      padding: '0 4px',
    },
  },

  productDemoImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '12px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    '@media (max-width: 768px)': {
      display: 'block',
      width: '100%',
      maxWidth: '100%',
      borderRadius: '8px',
    },
    '&:hover': {
      transform: 'translateY(-2px) scale(1.01)',
      boxShadow: '0 16px 50px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
    },
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: '10px',
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: '16px',
    margin: '0 auto 16px auto',
    maxWidth: '700px',
    cursor: 'default',
    pointerEvents: 'none',
    '@media (max-width: 768px)': {
      fontSize: '8px',
      padding: '3px 8px',
      marginTop: '0',
      marginBottom: '8px',
      gap: '4px',
    },
    '@media (max-width: 480px)': {
      fontSize: '7px',
      marginTop: '0',
      marginBottom: '6px',
      padding: '2px 6px',
      gap: '3px',
    },
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(185, 28, 28, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    },
  },

  badgeAvatars: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '2px',
    '@media (max-width: 480px)': {
      marginRight: '0',
    },
  },

  badgeAvatar: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '1.5px solid #ffffff',
    marginLeft: '-6px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover',
    flexShrink: 0,
    '&:first-child': {
      marginLeft: '-2px',
    },
    '@media (max-width: 768px)': {
      width: '16px',
      height: '16px',
      border: '1.2px solid #ffffff',
      marginLeft: '-5px',
      '&:first-child': {
        marginLeft: '-2px',
      },
    },
    '@media (max-width: 480px)': {
      width: '14px',
      height: '14px',
      border: '1px solid #ffffff',
      marginLeft: '-4px',
      '&:first-child': {
        marginLeft: '-1px',
      },
    },
  },

  badgeText: {
    display: 'inline-block',
    textAlign: 'center',
    '@media (max-width: 480px)': {
      lineHeight: '1.3',
    },
  },

  headline: {
    fontSize: '64px',
    fontWeight: '900',
    fontFamily: 'Impact, "Anton", "Oswald", -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#ffffff',
    marginTop: '0',
    marginBottom: '24px',
    lineHeight: '1.05',
    letterSpacing: '-0.02em',
    maxWidth: '700px',
    margin: '0 auto 24px auto',
    textAlign: 'center',
    textTransform: 'uppercase',
    '@media (max-width: 768px)': {
      fontSize: '26px',
      marginBottom: '10px',
      lineHeight: '1.1',
      maxWidth: '100%',
      padding: '0 6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '22px',
      marginBottom: '8px',
      lineHeight: '1.15',
      padding: '0 4px',
    },
  },

  highlightText: {
    background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '900',
    textDecoration: 'underline',
    textDecorationColor: '#b91c1c',
    textDecorationThickness: '3px',
    textUnderlineOffset: '4px',
  },

  subheadline: {
    fontSize: '16px',
    color: '#ffffff',
    lineHeight: '1.6',
    marginBottom: '36px',
    fontWeight: '400',
    maxWidth: '550px',
    margin: '0 auto 36px auto',
    '@media (max-width: 768px)': {
      fontSize: '11px',
      marginBottom: '12px',
      lineHeight: '1.5',
      maxWidth: '100%',
      padding: '0 6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '10px',
      marginBottom: '10px',
      padding: '0 4px',
      lineHeight: '1.4',
    },
  },

  ctaSubtext: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: '32px',
    marginTop: '0',
    lineHeight: '1.5',
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 32px auto',
    '@media (max-width: 768px)': {
      fontSize: '12px',
      marginBottom: '12px',
      marginTop: '0',
      fontWeight: '500',
      color: '#ffffff',
      lineHeight: '1.4',
      maxWidth: '100%',
      padding: '0 6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '11px',
      marginBottom: '10px',
      marginTop: '0',
      lineHeight: '1.4',
      padding: '0 4px',
    },
  },

  ctaButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '60px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '5px',
      width: '100%',
      maxWidth: '260px',
      margin: '0 auto 16px auto',
    },
    '@media (max-width: 480px)': {
      maxWidth: '220px',
      marginBottom: '12px',
      gap: '4px',
    },
  },

  ctaButton: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    background: '#b91c1c',
    border: 'none',
    padding: '16px 28px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 3px 0 0 rgba(185, 28, 28, 0.4)',
    marginBottom: '0',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '100%',
      fontSize: '11px',
      padding: '9px 14px',
      display: 'block',
      borderRadius: '7px',
      boxShadow: '0 2px 0 0 rgba(185, 28, 28, 0.4)',
    },
    '@media (max-width: 480px)': {
      fontSize: '10px',
      padding: '7px 12px',
      borderRadius: '6px',
    },
    '&:hover': {
      background: '#991b1b',
      boxShadow: '0 3px 0 0 rgba(153, 27, 27, 0.5)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 0 0 rgba(153, 27, 27, 0.5)',
    },
  },

  discordButton: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#000000',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    padding: '16px 28px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)',
    marginBottom: '0',
    display: 'inline-block',
    textDecoration: 'none',
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '100%',
      fontSize: '11px',
      padding: '9px 14px',
      display: 'block',
      margin: '0 auto',
      borderRadius: '7px',
      boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.1)',
    },
    '@media (max-width: 480px)': {
      fontSize: '10px',
      padding: '7px 12px',
      borderRadius: '6px',
    },
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      boxShadow: '0 4px 0 0 rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.1)',
    },
  },

  trustNote: {
    fontSize: '13px',
    color: '#ffffff',
    marginTop: '10px',
    fontWeight: '500',
  },

  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
      boxShadow: '0 0 8px 2px rgba(0, 255, 159, 0.9), 0 0 0 0 rgba(0, 255, 159, 0.7)',
    },
    '50%': {
      opacity: 1,
      boxShadow: '0 0 16px 4px rgba(0, 255, 159, 1), 0 0 0 6px rgba(0, 255, 159, 0)',
    },
  },

  spotsRemaining: {
    fontSize: '12px',
    color: '#ffffff',
    marginTop: '20px',
    fontWeight: '600',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '100px',
    padding: '10px 20px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    margin: '20px auto 0 auto',
    position: 'relative',
    '&::before': {
      content: '""',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#00ff9f',
      display: 'inline-block',
      flexShrink: 0,
      animation: '$pulse 2s ease-in-out infinite',
    },
    '@media (max-width: 768px)': {
      fontSize: '11px',
      padding: '9px 18px',
      gap: '7px',
      marginTop: '16px',
      '&::before': {
        width: '7px',
        height: '7px',
      },
    },
    '@media (max-width: 480px)': {
      fontSize: '10px',
      padding: '8px 16px',
      gap: '6px',
      marginTop: '12px',
      '&::before': {
        width: '6px',
        height: '6px',
      },
    },
  },

  // Features - Glassy Cards
  featuresSection: {
    marginTop: '56px',
    width: '100%',
    '@media (max-width: 768px)': {
      marginTop: '56px',
    },
    '@media (max-width: 480px)': {
      marginTop: '72px',
    },
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
  },

  feature: {
    textAlign: 'center',
    padding: '24px 20px',
    background: 'rgba(20, 20, 20, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: '16px',
    border: '1px solid rgba(185, 28, 28, 0.3)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      padding: '18px 16px',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(185, 28, 28, 0.5), transparent)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 12px 32px rgba(185, 28, 28, 0.2)',
      borderColor: 'rgba(185, 28, 28, 0.6)',
      '&::before': {
        opacity: 1,
      },
    },
  },

  featureIcon: {
    fontSize: '32px',
    marginBottom: '12px',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-block',
    '$feature:hover &': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },

  featureText: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '500',
    lineHeight: '1.5',
  },

  // Testimonials Section
  testimonialsSection: {
    marginTop: '48px',
    width: '100%',
    maxWidth: '800px',
    margin: '48px auto 0 auto',
    position: 'relative',
    '@media (max-width: 768px)': {
      marginTop: '56px',
    },
    '@media (max-width: 480px)': {
      marginTop: '72px',
    },
  },

  testimonialsContainer: {
    overflow: 'hidden',
    width: '100%',
  },

  testimonialsTrack: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
  },

  testimonialsSlide: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    minWidth: '100%',
    flexShrink: 0,
    '@media (max-width: 768px)': {
      flexDirection: 'row',
      gap: '12px',
    },
  },

  testimonialCard: {
    flex: '1 1 0',
    minWidth: 0,
    padding: '24px 20px',
    background: 'rgba(20, 20, 20, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: '14px',
    border: '1px solid rgba(185, 28, 28, 0.3)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      padding: '16px 14px',
      flex: '1 1 0',
      minWidth: '45%',
      '&:nth-child(3)': {
        display: 'none',
      },
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(185, 28, 28, 0.2)',
    },
  },

  testimonialDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '24px',
  },

  testimonialDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(185, 28, 28, 0.3)',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(185, 28, 28, 0.5)',
    },
    '&.active': {
      background: '#b91c1c',
      width: '24px',
      borderRadius: '4px',
    },
  },

  testimonialStars: {
    display: 'flex',
    gap: '4px',
    marginBottom: '12px',
    fontSize: '16px',
    color: '#fbbf24',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '10px',
    },
  },

  testimonialQuote: {
    fontSize: '14px',
    color: '#ffffff',
    lineHeight: '1.6',
    marginBottom: '14px',
    fontStyle: 'italic',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      lineHeight: '1.6',
      marginBottom: '12px',
    },
  },

  testimonialAuthor: {
    fontSize: '13px',
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: '4px',
    '@media (max-width: 768px)': {
      fontSize: '14px',
    },
  },

  testimonialScore: {
    fontSize: '12px',
    color: '#14bf96',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '13px',
    },
  },

  // Universities Section
  universitiesSection: {
    marginTop: '48px',
    width: '100%',
    maxWidth: '800px',
    margin: '48px auto 0 auto',
    textAlign: 'center',
    overflow: 'hidden',
    paddingTop: '48px',
    paddingBottom: '48px',
    '@media (max-width: 768px)': {
      marginTop: '56px',
      paddingTop: '52px',
      paddingBottom: '52px',
    },
    '@media (max-width: 480px)': {
      marginTop: '68px',
      paddingTop: '56px',
      paddingBottom: '56px',
    },
  },

  universitiesLabel: {
    fontSize: '12px',
    color: '#ffffff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '20px',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '20px',
      fontWeight: '700',
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
      fontWeight: '700',
    },
  },

  universitiesScroller: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
  },

  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-25%)' },
  },

  universitiesTrack: {
    display: 'flex',
    gap: '48px',
    padding: '10px 0',
    animation: '$scroll 30s linear infinite',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      gap: '36px',
    },
  },

  universityLogo: {
    height: '40px',
    width: 'auto',
    opacity: 0.6,
    filter: 'grayscale(100%)',
    transition: 'all 0.3s ease',
    flexShrink: 0,
    objectFit: 'contain',
    '@media (max-width: 768px)': {
      height: '32px',
    },
    '&:hover': {
      opacity: 1,
      filter: 'grayscale(0%)',
    },
  },

  // Video Section
  videoSection: {
    width: '100%',
    maxWidth: '900px',
    margin: '-55px auto 0 auto',
    padding: '0 32px 80px 32px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      margin: '-35px auto 0 auto',
      padding: '0 16px 60px 16px',
    },
    '@media (max-width: 480px)': {
      margin: '-15px auto 0 auto',
      padding: '0 12px 40px 12px',
    },
  },

  videoContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    background: '#000000',
  },

  videoIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },

  // Statistics Section
  statisticsSection: {
    marginTop: '0',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    paddingTop: '48px',
    paddingBottom: '80px',
    '@media (max-width: 768px)': {
      paddingTop: '48px',
      paddingBottom: '60px',
    },
    '@media (max-width: 480px)': {
      paddingTop: '52px',
      paddingBottom: '48px',
    },
  },

  statisticsLabel: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '900',
    fontFamily: 'Impact, "Anton", "Oswald", -apple-system, BlinkMacSystemFont, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      fontSize: '16px',
    },
  },

  statisticsDescription: {
    fontSize: '12px',
    color: '#ffffff',
    lineHeight: '1.5',
    marginBottom: '24px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto 24px',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '20px',
      lineHeight: '1.6',
    },
  },

  statisticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px 24px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '24px',
    },
  },

  statCard: {
    padding: '12px 0',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderBottom: '1px solid rgba(185, 28, 28, 0.3)',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '10px 0',
    },
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      '& $statNumber': {
        transform: 'scale(1.05)',
      },
    },
  },

  statLabel: {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '500',
    lineHeight: '1.4',
    marginBottom: '8px',
    '@media (max-width: 768px)': {
      fontSize: '16px',
      marginBottom: '8px',
    },
  },

  statNumber: {
    fontSize: '36px',
    fontWeight: '900',
    fontFamily: 'Impact, "Anton", "Oswald", -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#b91c1c',
    lineHeight: '1',
    letterSpacing: '-0.02em',
    transition: 'transform 0.2s ease',
    '@media (max-width: 768px)': {
      fontSize: '48px',
    },
  },

  // FAQ Section
  faqSection: {
    marginTop: '64px',
    padding: '0 24px',
    maxWidth: '800px',
    margin: '64px auto 0 auto',
    '@media (max-width: 768px)': {
      marginTop: '64px',
      padding: '0 24px',
    },
    '@media (max-width: 480px)': {
      marginTop: '68px',
      padding: '0 20px',
    },
  },

  faqHeadline: {
    fontSize: '32px',
    fontWeight: '900',
    fontFamily: 'Impact, "Anton", "Oswald", -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#ffffff',
    marginBottom: '32px',
    textAlign: 'center',
    lineHeight: '1.1',
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
    '@media (max-width: 768px)': {
      fontSize: '32px',
      marginBottom: '28px',
    },
    '@media (max-width: 480px)': {
      fontSize: '28px',
      marginBottom: '24px',
    },
  },

  faqContainer: {
    width: '900px',
    maxWidth: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  faqItem: {
    background: 'transparent',
    borderBottom: '1px solid rgba(185, 28, 28, 0.3)',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
  },

  faqQuestion: {
    width: '100%',
    padding: '24px 0',
    background: 'transparent',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '17px',
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    '&:hover': {
      color: '#b91c1c',
    },
    '@media (max-width: 768px)': {
      padding: '20px 0',
      fontSize: '17px',
    },
  },

  faqIcon: {
    fontSize: '24px',
    fontWeight: '300',
    color: '#b91c1c',
    marginLeft: '16px',
    flexShrink: 0,
    lineHeight: '1',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      marginLeft: '12px',
    },
  },

  faqAnswer: {
    padding: '0 0 24px 0',
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#ffffff',
    animation: '$fadeIn 0.3s ease',
    opacity: 0.9,
    '@media (max-width: 768px)': {
      padding: '0 0 20px 0',
      fontSize: '15px',
      lineHeight: '1.7',
    },
  },

  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  // Bottom CTA Section
  bottomCtaSection: {
    marginTop: '80px',
    marginBottom: '40px',
    padding: '0 32px',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '80px auto 40px auto',
    '@media (max-width: 768px)': {
      marginTop: '72px',
      marginBottom: '32px',
      padding: '0 24px',
    },
    '@media (max-width: 480px)': {
      marginTop: '76px',
      padding: '0 20px',
    },
  },

  bottomCtaHeadline: {
    fontSize: '40px',
    fontWeight: '900',
    fontFamily: 'Impact, "Anton", "Oswald", -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#ffffff',
    marginBottom: '16px',
    lineHeight: '1.05',
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
    '@media (max-width: 768px)': {
      fontSize: '32px',
      marginBottom: '16px',
      lineHeight: '1.1',
    },
    '@media (max-width: 480px)': {
      fontSize: '28px',
    },
  },

  bottomCtaSubtext: {
    fontSize: '16px',
    color: '#ffffff',
    marginBottom: '32px',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto 32px auto',
    '@media (max-width: 768px)': {
      fontSize: '16px',
      marginBottom: '24px',
      lineHeight: '1.6',
    },
    '@media (max-width: 480px)': {
      fontSize: '15px',
      marginBottom: '20px',
    },
  },

  bottomCtaButton: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    background: '#b91c1c',
    border: 'none',
    padding: '16px 40px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 3px 0 0 rgba(185, 28, 28, 0.4)',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    '@media (max-width: 768px)': {
      width: '100%',
      fontSize: '16px',
      padding: '16px 32px',
    },
    '&:hover': {
      background: '#991b1b',
      boxShadow: '0 3px 0 0 rgba(153, 27, 27, 0.5)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 0 0 rgba(153, 27, 27, 0.5)',
    },
  },

  // Sticky Bottom CTA Bar
  stickyBottomBar: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '1000px',
    width: 'calc(100% - 64px)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    borderRadius: '12px 12px 0 0',
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
    padding: '16px 24px',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    boxSizing: 'border-box',
    '@media (max-width: 1024px)': {
      padding: '14px 20px',
      gap: '12px',
      width: 'calc(100% - 48px)',
    },
    '@media (max-width: 768px)': {
      padding: '16px 20px',
      gap: '12px',
      width: 'calc(100% - 48px)',
    },
    '@media (max-width: 480px)': {
      padding: '14px 16px',
      gap: '10px',
      width: 'calc(100% - 32px)',
      borderRadius: '8px 8px 0 0',
    },
  },

  stickyBarText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#000000',
    letterSpacing: '-0.01em',
    lineHeight: '1.3',
    '@media (max-width: 1024px)': {
      fontSize: '13px',
    },
    '@media (max-width: 768px)': {
      fontSize: '11px',
    },
  },

  stickyBarButton: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#ffffff',
    background: '#b91c1c',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 3px 0 0 rgba(185, 28, 28, 0.4)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    '@media (max-width: 1024px)': {
      fontSize: '12px',
      padding: '11px 18px',
    },
    '@media (max-width: 768px)': {
      fontSize: '12px',
      padding: '10px 16px',
    },
    '&:hover': {
      background: '#991b1b',
      boxShadow: '0 3px 0 0 rgba(153, 27, 27, 0.5)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 0 0 rgba(153, 27, 27, 0.5)',
    },
  },

  // Footer - Ultra Simple and Minimal
  footer: {
    width: '100%',
    padding: '24px 32px 70px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'transparent',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      padding: '20px 20px 65px',
    },
  },

  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: 'left',
    flex: 1,
  },

  footerLearnLink: {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.3)',
    textDecoration: 'none',
    fontWeight: '300',
    transition: 'color 0.2s ease',
    alignSelf: 'flex-start',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
    '@media (max-width: 768px)': {
      fontSize: '9px',
    },
  },

  footerTitle: {
    fontSize: '11px',
    fontWeight: '400',
    fontFamily: '"Times New Roman", Times, serif',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '-0.05em',
    marginBottom: '4px',
    '@media (max-width: 768px)': {
      fontSize: '10px',
    },
  },

  footerText: {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '300',
    lineHeight: '1.5',
    '@media (max-width: 768px)': {
      fontSize: '9px',
    },
  },

  footerEmail: {
    fontSize: '10px',
    '& a': {
      color: 'rgba(255, 255, 255, 0.4)',
      textDecoration: 'none',
      fontWeight: '300',
      transition: 'color 0.2s ease',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    },
    '@media (max-width: 768px)': {
      fontSize: '9px',
    },
  },

  footerDisclaimer: {
    fontSize: '9px',
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: '300',
    lineHeight: '1.4',
    maxWidth: '600px',
    marginTop: '8px',
    '@media (max-width: 768px)': {
      fontSize: '8px',
    },
  },

  footerSocial: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },

  socialIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.6)',
    },
    '& svg': {
      width: '16px',
      height: '16px',
      fill: 'currentColor',
    },
  },

  // Mobile Menu
  hamburgerButton: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      fontSize: '24px',
      color: '#ffffff',
      transition: 'color 0.2s ease',
      '&:hover': {
        color: '#b91c1c',
      },
    },
  },

  mobileMenuOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1999,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    '&.open': {
      opacity: 1,
      visibility: 'visible',
    },
  },

  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '280px',
    maxWidth: '80vw',
    background: '#000000',
    zIndex: 2000,
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    '&.open': {
      transform: 'translateX(0)',
    },
  },

  mobileMenuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(185, 28, 28, 0.3)',
  },

  mobileMenuClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    fontSize: '24px',
    color: '#b91c1c',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#ffffff',
    },
  },

  mobileMenuLinks: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0',
  },

  mobileMenuLink: {
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background 0.2s ease, color 0.2s ease',
    '&:hover': {
      background: 'rgba(185, 28, 28, 0.1)',
      color: '#b91c1c',
    },
  },

  mobileMenuLinkDisabled: {
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'default',
    opacity: 0.3,
  },

  mobileMenuButton: {
    margin: '16px 24px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    background: '#b91c1c',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(185, 28, 28, 0.4)',
    '&:active': {
      transform: 'scale(0.98)',
    },
  },

  mobileCoursesSection: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '8px',
  },

  mobileCoursesHeader: {
    padding: '12px 24px 8px 24px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#b91c1c',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
});

