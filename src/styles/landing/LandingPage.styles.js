/**
 * Landing Page Styles
 * Premium Apple-inspired glassmorphism design
 */

import { createUseStyles } from 'react-jss';

export const useLandingPageStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden',
    background: '#f9fafb',
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
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(24px) saturate(200%)',
    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.4)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    zIndex: 1000,
    padding: '12px 0',
    boxSizing: 'border-box',
    overflowX: 'hidden',
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
    '@media (max-width: 768px)': {
      padding: '0 16px',
    },
    '@media (max-width: 480px)': {
      padding: '0 12px',
    },
  },

  navLogo: {
    fontSize: '24px',
    fontWeight: '800',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e3a8a',
    letterSpacing: '-0.02em',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      fontSize: '20px',
    },
    '&:hover': {
      transform: 'scale(1.02)',
      opacity: 0.9,
    },
  },

  navLinks: {
    display: 'flex',
    gap: '28px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },

  navLink: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '0',
    '&:hover': {
      color: '#1e3a8a',
    },
  },

  navRight: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  signInButton: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1F2937',
    background: 'rgba(243, 244, 246, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(229, 231, 235, 0.8)',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '8px',
    '@media (max-width: 768px)': {
      padding: '7px 14px',
      fontSize: '13px',
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
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(30, 58, 138, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    '@media (max-width: 768px)': {
      padding: '7px 14px',
      fontSize: '13px',
    },
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 16px rgba(30, 58, 138, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
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
    maxWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    padding: '80px 32px 40px',
    position: 'relative',
    zIndex: 1,
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '70px 20px 30px',
    },
    '@media (max-width: 480px)': {
      padding: '60px 16px 24px',
    },
  },

  heroSection: {
    textAlign: 'center',
    maxWidth: '650px',
    width: '100%',
  },

  productDemoContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 32px',
    display: 'block',
    '@media (max-width: 768px)': {
      marginBottom: '24px',
      maxWidth: '100%',
      padding: '0',
      display: 'block',
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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    background: 'rgba(239, 246, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(147, 197, 253, 0.3)',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      fontSize: '10px',
      padding: '5px 12px',
      marginBottom: '16px',
    },
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    },
  },

  headline: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#0f172a',
    marginTop: '0',
    marginBottom: '20px',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    maxWidth: '700px',
    margin: '0 auto 20px auto',
    '@media (max-width: 768px)': {
      fontSize: '28px',
      marginBottom: '20px',
    },
    '@media (max-width: 480px)': {
      fontSize: '24px',
      marginBottom: '18px',
      lineHeight: '1.2',
    },
  },

  highlightText: {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '800',
  },

  subheadline: {
    fontSize: '16px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '36px',
    fontWeight: '400',
    maxWidth: '700px',
    margin: '0 auto 36px auto',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '32px',
      lineHeight: '1.5',
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
      marginBottom: '28px',
    },
  },

  ctaSubtext: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '20px',
    marginTop: '12px',
    lineHeight: '1.5',
    '@media (max-width: 768px)': {
      fontSize: '15px',
      marginBottom: '20px',
      marginTop: '16px',
      fontWeight: '500',
      color: '#4b5563',
    },
    '@media (max-width: 480px)': {
      fontSize: '14px',
      marginBottom: '18px',
    },
  },

  ctaButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '0',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '12px',
      width: '100%',
    },
  },

  ctaButton: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 16px rgba(30, 58, 138, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    marginBottom: '0',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    '@media (max-width: 768px)': {
      width: '100%',
      fontSize: '14px',
      padding: '12px 24px',
      display: 'block',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(30, 58, 138, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      '&::before': {
        left: '100%',
      },
    },
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
    },
  },

  discordButton: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    padding: '16px 32px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    marginBottom: '0',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    textDecoration: 'none',
    '@media (max-width: 768px)': {
      width: '100%',
      fontSize: '14px',
      padding: '12px 24px',
      display: 'block',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.03), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
      borderColor: '#d1d5db',
      '&::before': {
        left: '100%',
      },
    },
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
    },
  },

  trustNote: {
    fontSize: '13px',
    color: '#94a3b8',
    marginTop: '10px',
    fontWeight: '500',
  },

  // Features - Glassy Cards
  featuresSection: {
    marginTop: '56px',
    width: '100%',
    '@media (max-width: 768px)': {
      marginTop: '48px',
    },
    '@media (max-width: 480px)': {
      marginTop: '40px',
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
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: '16px',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
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
      background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
      borderColor: 'rgba(147, 197, 253, 0.6)',
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
    color: '#475569',
    fontWeight: '500',
    lineHeight: '1.5',
  },

  // Testimonials Section
  testimonialsSection: {
    marginTop: '48px',
    width: '100%',
    position: 'relative',
    '@media (max-width: 768px)': {
      marginTop: '48px',
    },
    '@media (max-width: 480px)': {
      marginTop: '40px',
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
      flexDirection: 'column',
      gap: '16px',
    },
  },

  testimonialCard: {
    flex: '1 1 0',
    minWidth: 0,
    padding: '24px 20px',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: '14px',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      padding: '18px 16px',
      flex: 'none',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
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
    background: 'rgba(30, 58, 138, 0.2)',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(30, 58, 138, 0.4)',
    },
    '&.active': {
      background: '#1e3a8a',
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
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '14px',
    fontStyle: 'italic',
    '@media (max-width: 768px)': {
      fontSize: '13px',
      lineHeight: '1.5',
      marginBottom: '12px',
    },
  },

  testimonialAuthor: {
    fontSize: '13px',
    color: '#111827',
    fontWeight: '600',
    marginBottom: '4px',
    '@media (max-width: 768px)': {
      fontSize: '12px',
    },
  },

  testimonialScore: {
    fontSize: '12px',
    color: '#10b981',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '11px',
    },
  },

  // Universities Section
  universitiesSection: {
    marginTop: '48px',
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      marginTop: '48px',
    },
    '@media (max-width: 480px)': {
      marginTop: '40px',
    },
  },

  universitiesLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      fontSize: '10px',
      marginBottom: '16px',
    },
  },

  universitiesScroller: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  },

  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
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
    opacity: 0.5,
    filter: 'grayscale(100%)',
    transition: 'all 0.3s ease',
    flexShrink: 0,
    objectFit: 'contain',
    '@media (max-width: 768px)': {
      height: '32px',
    },
    '&:hover': {
      opacity: 0.8,
      filter: 'grayscale(0%)',
    },
  },

  // Statistics Section
  statisticsSection: {
    marginTop: '48px',
    width: '100%',
    paddingTop: '48px',
    borderTop: '1px solid rgba(226, 232, 240, 0.5)',
    '@media (max-width: 768px)': {
      marginTop: '48px',
      paddingTop: '40px',
    },
    '@media (max-width: 480px)': {
      marginTop: '40px',
      paddingTop: '36px',
    },
  },

  statisticsLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      fontSize: '10px',
    },
  },

  statisticsDescription: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.5',
    marginBottom: '24px',
    textAlign: 'center',
    maxWidth: '550px',
    margin: '0 auto 24px',
    '@media (max-width: 768px)': {
      fontSize: '12px',
      marginBottom: '20px',
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
    borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
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
    color: '#374151',
    fontWeight: '500',
    lineHeight: '1.4',
    marginBottom: '8px',
    '@media (max-width: 768px)': {
      fontSize: '13px',
      marginBottom: '6px',
    },
  },

  statNumber: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#1e3a8a',
    lineHeight: '1',
    letterSpacing: '-0.02em',
    transition: 'transform 0.2s ease',
    '@media (max-width: 768px)': {
      fontSize: '32px',
    },
  },

  // FAQ Section
  faqSection: {
    marginTop: '64px',
    padding: '0 24px',
    '@media (max-width: 768px)': {
      marginTop: '56px',
      padding: '0 20px',
    },
    '@media (max-width: 480px)': {
      marginTop: '48px',
      padding: '0 16px',
    },
  },

  faqHeadline: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '32px',
    textAlign: 'center',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '24px',
      marginBottom: '28px',
    },
    '@media (max-width: 480px)': {
      fontSize: '22px',
      marginBottom: '24px',
    },
  },

  faqContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  faqItem: {
    background: 'transparent',
    borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
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
    color: '#111827',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    '&:hover': {
      color: '#1e3a8a',
    },
    '@media (max-width: 768px)': {
      padding: '18px 0',
      fontSize: '15px',
    },
  },

  faqIcon: {
    fontSize: '24px',
    fontWeight: '300',
    color: '#1e3a8a',
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
    color: '#6b7280',
    animation: '$fadeIn 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '0 0 18px 0',
      fontSize: '13px',
      lineHeight: '1.6',
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
    '@media (max-width: 768px)': {
      marginTop: '64px',
      marginBottom: '32px',
      padding: '0 20px',
    },
    '@media (max-width: 480px)': {
      marginTop: '56px',
      padding: '0 16px',
    },
  },

  bottomCtaHeadline: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
    '@media (max-width: 768px)': {
      fontSize: '28px',
      marginBottom: '14px',
    },
    '@media (max-width: 480px)': {
      fontSize: '24px',
    },
  },

  bottomCtaSubtext: {
    fontSize: '18px',
    color: '#6B7280',
    marginBottom: '32px',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 32px auto',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '24px',
      lineHeight: '1.5',
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
      marginBottom: '20px',
    },
  },

  bottomCtaButton: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    padding: '16px 40px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 16px rgba(30, 58, 138, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    display: 'inline-block',
    '@media (max-width: 768px)': {
      width: '100%',
      fontSize: '14px',
      padding: '12px 24px',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(30, 58, 138, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
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
      padding: '14px 16px',
      gap: '12px',
      width: 'calc(100% - 32px)',
    },
    '@media (max-width: 768px)': {
      padding: '16px 12px',
      gap: '10px',
      width: 'calc(100% - 24px)',
    },
    '@media (max-width: 480px)': {
      padding: '14px 12px',
      gap: '8px',
      width: 'calc(100% - 16px)',
      borderRadius: '8px 8px 0 0',
    },
  },

  stickyBarText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e3a8a',
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
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    '@media (max-width: 1024px)': {
      fontSize: '12px',
      padding: '11px 18px',
    },
    '@media (max-width: 768px)': {
      fontSize: '12px',
      padding: '10px 16px',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(30, 58, 138, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
    },
  },

  // Footer - Minimal and Clean
  footer: {
    width: '100%',
    padding: '32px 32px 70px',
    borderTop: '1px solid rgba(226, 232, 240, 0.5)',
    textAlign: 'center',
    background: 'rgba(249, 250, 251, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 768px)': {
      padding: '24px 20px 65px',
    },
  },

  footerText: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '6px',
    fontWeight: '400',
  },
});
