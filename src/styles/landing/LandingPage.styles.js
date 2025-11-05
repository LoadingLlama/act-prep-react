/**
 * Landing Page Styles
 * Extracted from LandingPage.jsx for better maintainability
 */

import { createUseStyles } from 'react-jss';

export const useLandingPageStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    background: '#0f1e3d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  // Sticky Navigation Bar - Transparent & Minimal
  navbar: {
    position: 'sticky',
    top: 0,
    width: '100%',
    background: 'rgba(15, 30, 61, 0.75)',
    backdropFilter: 'blur(30px)',
    borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
    zIndex: 100,
    padding: '16px 0',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
  },

  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    '@media (max-width: 968px)': {
      gap: '12px',
    },
  },

  navLink: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '15px',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    padding: '12px 16px',
    borderRadius: '6px',
    background: 'none',
    border: 'none',
    whiteSpace: 'nowrap',
    letterSpacing: '0.5px',
    minHeight: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      color: '#d4af37',
      background: 'rgba(212, 175, 55, 0.1)',
    },
    '&:active': {
      background: 'rgba(212, 175, 55, 0.15)',
      transform: 'scale(0.97)'
    },
    '@media (max-width: 968px)': {
      fontSize: '13px',
      padding: '12px 14px',
    },
  },

  // Hero Section with Campus Background - Extended
  hero: {
    width: '100%',
    padding: '120px 20px 200px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    backgroundImage: 'url(/images/campuspicture.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(15, 30, 61, 0.82) 0%, rgba(20, 40, 80, 0.88) 100%)',
      zIndex: -1,
    },
    '@media (max-width: 768px)': {
      padding: '60px 20px 80px',
      minHeight: '75vh',
    },
    '@media (max-width: 640px)': {
      padding: '40px 16px 60px',
      minHeight: 'auto',
    },
  },

  logo: {
    height: '100px',
    width: 'auto',
    marginBottom: '48px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.4))',
    '@media (max-width: 768px)': {
      height: '80px',
      marginBottom: '36px',
    },
  },

  headline: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '76px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '32px',
    lineHeight: '1.25',
    letterSpacing: '0.01em',
    maxWidth: '900px',
    margin: '0 auto 32px',
    textTransform: 'none',
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.4)',
    '@media (max-width: 968px)': {
      fontSize: '54px',
      lineHeight: '1.3',
    },
    '@media (max-width: 768px)': {
      fontSize: '42px',
      lineHeight: '1.35',
      marginBottom: '24px',
    },
  },

  improveText: {
    textDecoration: 'underline',
    textDecorationColor: '#ffffff',
    textDecorationThickness: '2px',
    textUnderlineOffset: '4px',
    fontWeight: '400',
  },

  actScoreText: {
    fontStyle: 'normal',
  },

  subheadline: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.5',
    marginBottom: '48px',
    fontWeight: '300',
    maxWidth: '800px',
    margin: '0 auto 48px',
    textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)',
    letterSpacing: '0.3px',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      marginBottom: '36px',
    },
  },

  ctaButton: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '18px 48px',
    fontSize: '18px',
    fontWeight: '500',
    color: '#0f1e3d',
    background: '#d4af37',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 6px 20px rgba(212, 175, 55, 0.3)',
    marginBottom: '0px',
    textTransform: 'none',
    letterSpacing: '0.5px',
    minHeight: '56px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 28px rgba(212, 175, 55, 0.4)',
      background: '#e6c245',
    },
    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
    },
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '400px',
      padding: '20px 48px',
      fontSize: '18px',
      minHeight: '60px',
    },
  },

  trustBadge: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: '20px',
    fontWeight: '500',
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
    display: 'none', // Hide trust badge for cleaner look
  },

  // Statistics Section
  statsSection: {
    width: '100%',
    padding: '80px 20px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
    borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
    '@media (max-width: 768px)': {
      padding: '50px 20px',
    },
  },

  // School Logos Section
  schoolsSection: {
    width: '100%',
    padding: '60px 20px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      padding: '40px 20px',
    },
  },

  schoolsTitle: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '38px',
    fontWeight: '400',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '56px',
    letterSpacing: '0.01em',
    '@media (max-width: 768px)': {
      fontSize: '30px',
      marginBottom: '40px',
    },
  },

  schoolsScroller: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '100px',
      background: 'linear-gradient(to right, rgba(15, 30, 61, 1), transparent)',
      zIndex: 2,
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '100px',
      background: 'linear-gradient(to left, rgba(15, 30, 61, 1), transparent)',
      zIndex: 2,
      pointerEvents: 'none',
    },
  },

  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-50%)',
    },
  },

  schoolsTrack: {
    display: 'flex',
    gap: '60px',
    padding: '20px 0',
    animation: '$scroll 40s linear infinite',
    '@media (max-width: 768px)': {
      gap: '40px',
    },
  },

  schoolLogo: {
    height: '80px',
    width: 'auto',
    opacity: 0.85,
    transition: 'all 0.3s ease',
    flexShrink: 0,
    filter: 'grayscale(100%) brightness(1.2)',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.05)',
      filter: 'grayscale(0%) brightness(1)',
    },
    '@media (max-width: 768px)': {
      height: '60px',
    },
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 968px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
  },

  statCard: {
    textAlign: 'center',
    padding: '20px',
  },

  statNumber: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '52px',
    fontWeight: '500',
    color: '#d4af37',
    marginBottom: '12px',
    letterSpacing: '-0.01em',
    '@media (max-width: 768px)': {
      fontSize: '42px',
    },
  },

  statLabel: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.5',
    fontWeight: '400',
    letterSpacing: '0.3px',
  },

  // Testimonials Section
  testimonialsSection: {
    width: '100%',
    padding: '80px 20px',
    '@media (max-width: 768px)': {
      padding: '60px 20px',
    },
  },

  sectionTitle: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '44px',
    fontWeight: '400',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '56px',
    letterSpacing: '0.01em',
    '@media (max-width: 768px)': {
      fontSize: '34px',
      marginBottom: '36px',
    },
  },

  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
  },

  testimonialCard: {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    borderRadius: '12px',
    padding: '32px',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      background: 'rgba(255, 255, 255, 0.06)',
      borderColor: 'rgba(212, 175, 55, 0.4)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
    },
    '@media (max-width: 768px)': {
      padding: '24px',
    },
  },

  testimonialQuote: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: '1.6',
    marginBottom: '20px',
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: '0.3px',
  },

  testimonialAuthor: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '15px',
    color: '#d4af37',
    fontWeight: '500',
    marginBottom: '4px',
  },

  testimonialScore: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.65)',
    fontWeight: '400',
  },

  // Score Improvements Section
  improvementsSection: {
    width: '100%',
    padding: '60px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    '@media (max-width: 768px)': {
      padding: '40px 20px',
    },
  },

  improvementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    maxWidth: '800px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },

  improvementCard: {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: 'rgba(212, 175, 55, 0.4)',
      background: 'rgba(255, 255, 255, 0.06)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
    },
  },

  improvementIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },

  improvementTitle: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '24px',
    fontWeight: '400',
    color: '#d4af37',
    marginBottom: '12px',
    letterSpacing: '0.01em',
  },

  improvementText: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: '1.6',
    fontWeight: '400',
    letterSpacing: '0.3px',
  },

  // Features Section
  featuresSection: {
    width: '100%',
    padding: '80px 20px',
    '@media (max-width: 768px)': {
      padding: '60px 20px',
    },
  },

  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
    },
  },

  feature: {
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.06)',
      borderColor: 'rgba(212, 175, 55, 0.4)',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    },
  },

  featureIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },

  featureTitle: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '20px',
    fontWeight: '400',
    color: '#d4af37',
    marginBottom: '12px',
    letterSpacing: '0.01em',
  },

  featureDescription: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: '1.6',
    fontWeight: '400',
    letterSpacing: '0.3px',
  },

  // Final CTA Section
  finalCTA: {
    width: '100%',
    padding: '80px 20px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    '@media (max-width: 768px)': {
      padding: '60px 20px',
    },
  },

  finalCTATitle: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '48px',
    fontWeight: '400',
    color: '#ffffff',
    marginBottom: '24px',
    letterSpacing: '0.01em',
    '@media (max-width: 768px)': {
      fontSize: '38px',
    },
  },

  finalCTASubtitle: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '22px',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: '32px',
    letterSpacing: '0.3px',
    '@media (max-width: 768px)': {
      fontSize: '20px',
    },
  },

  // Footer
  footer: {
    width: '100%',
    padding: '40px 20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },

  footerText: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '12px',
  },

  signInButton: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    background: 'none',
    border: 'none',
    color: '#d4af37',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    padding: '0',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    textDecorationColor: 'rgba(212, 175, 55, 0.5)',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#e6c245',
      textDecorationColor: 'rgba(212, 175, 55, 0.8)',
    },
  },
});
