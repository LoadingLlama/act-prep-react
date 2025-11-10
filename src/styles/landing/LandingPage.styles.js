/**
 * Landing Page Styles
 * Premium UI/UX Design - World-Class Landing Page
 */

import { createUseStyles } from 'react-jss';

export const useLandingPageStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  // Navigation - Minimal and Clean
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #E5E7EB',
    zIndex: 1000,
    padding: '20px 0',
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '16px 0',
    },
  },

  navContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      padding: '0 24px',
    },
  },

  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '48px',
  },

  navLogo: {
    height: '32px',
    width: 'auto',
    objectFit: 'contain',
  },

  navLogoText: {
    fontSize: '24px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
  },

  navLogoNomi: {
    color: '#1e3a8a',
    fontWeight: '700',
  },

  navLogoAcademy: {
    color: '#000000',
    fontWeight: '400',
  },

  navLinks: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    '@media (max-width: 968px)': {
      display: 'none',
    },
  },

  navLink: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#4B5563',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '0',
    background: 'none',
    border: 'none',
    '&:hover': {
      color: '#1F2937',
    },
  },

  navRight: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },

  signInButton: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1F2937',
    background: 'none',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderRadius: '8px',
    '&:hover': {
      background: '#F3F4F6',
    },
  },

  getStartedButton: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    background: '#1e3a8a',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      background: '#1e40af',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },

  // Hero Section - Large and Impactful
  hero: {
    width: '100%',
    maxWidth: '1100px',
    padding: '140px 48px 60px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'start',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      padding: '110px 32px 40px',
      gap: '32px',
    },
    '@media (max-width: 640px)': {
      padding: '90px 24px 32px',
      gap: '24px',
    },
  },

  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    '@media (max-width: 968px)': {
      alignItems: 'center',
      textAlign: 'center',
    },
  },

  heroVideo: {
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    border: '1px solid #E5E7EB',
    aspectRatio: '16 / 9',
    background: '#F9FAFB',
    '@media (max-width: 968px)': {
      order: -1,
    },
    '& iframe': {
      width: '100%',
      height: '100%',
      border: 'none',
    },
  },

  logoText: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '24px',
    fontFamily: '"Times New Roman", Times, serif',
    '@media (max-width: 968px)': {
      fontSize: '32px',
      marginBottom: '20px',
    },
    '@media (max-width: 640px)': {
      fontSize: '28px',
      marginBottom: '16px',
    },
  },

  logoNomi: {
    color: '#1e3a8a',
    fontWeight: '700',
  },

  logoAcademy: {
    color: '#000000',
    fontWeight: '400',
  },

  trustBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#f0f9ff',
    border: '1px solid #bae6fd',
    padding: '6px 12px',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: '12px',
  },

  headline: {
    fontSize: '44px',
    fontWeight: '700',
    color: '#111827',
    marginTop: '0',
    marginBottom: '14px',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    maxWidth: '500px',
    '@media (max-width: 968px)': {
      fontSize: '40px',
      maxWidth: '100%',
    },
    '@media (max-width: 640px)': {
      fontSize: '32px',
    },
  },

  highlightText: {
    color: '#1e3a8a',
    fontWeight: '700',
  },

  subheadline: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.6',
    marginBottom: '14px',
    fontWeight: '400',
    maxWidth: '480px',
    '@media (max-width: 968px)': {
      maxWidth: '100%',
    },
    '@media (max-width: 640px)': {
      fontSize: '15px',
    },
  },

  heroCheckmarks: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    marginBottom: '18px',
    flexWrap: 'wrap',
  },

  checkmarkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#374151',
    fontWeight: '400',
  },

  checkmark: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#1e3a8a',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '11px',
  },

  ctaButtonPrimary: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: '#1e3a8a',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(30, 58, 138, 0.2)',
    marginBottom: '10px',
    '&:hover': {
      background: '#1e40af',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
    },
    '@media (max-width: 640px)': {
      width: '100%',
      fontSize: '14px',
      padding: '13px 24px',
    },
  },

  trustBadgeBottom: {
    fontSize: '13px',
    color: '#9CA3AF',
    marginTop: '8px',
  },

  // Statistics Section - Clean and Minimal
  statsSection: {
    width: '100%',
    maxWidth: '1100px',
    padding: '32px 48px',
    '@media (max-width: 968px)': {
      padding: '28px 32px',
    },
    '@media (max-width: 640px)': {
      padding: '24px 24px',
    },
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    '@media (max-width: 968px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
  },

  statCard: {
    textAlign: 'center',
  },

  statNumber: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '4px',
    letterSpacing: '-0.02em',
    lineHeight: '1',
    '@media (max-width: 640px)': {
      fontSize: '34px',
    },
  },

  statLabel: {
    fontSize: '13px',
    color: '#6B7280',
    fontWeight: '500',
    lineHeight: '1.4',
  },

  // Video Section
  videoSection: {
    width: '100%',
    maxWidth: '1100px',
    padding: '0 48px 32px',
    '@media (max-width: 968px)': {
      padding: '0 32px 28px',
    },
    '@media (max-width: 640px)': {
      padding: '0 24px 24px',
    },
  },

  videoContainer: {
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    border: '1px solid #E5E7EB',
    aspectRatio: '16 / 9',
    background: '#F9FAFB',
  },

  videoEmbed: {
    width: '100%',
    height: '100%',
    border: 'none',
  },

  // Section Title
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: '24px',
    letterSpacing: '-0.02em',
    '@media (max-width: 968px)': {
      fontSize: '28px',
      marginBottom: '20px',
    },
    '@media (max-width: 640px)': {
      fontSize: '26px',
      marginBottom: '18px',
    },
  },

  // Features Section - Card Grid with Generous White Space
  featuresSection: {
    width: '100%',
    padding: '32px 48px',
    background: '#ffffff',
    '@media (max-width: 968px)': {
      padding: '28px 32px',
    },
    '@media (max-width: 640px)': {
      padding: '24px 24px',
    },
  },

  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    maxWidth: '1100px',
    margin: '0 auto',
    '@media (max-width: 968px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '14px',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '12px',
    },
  },

  feature: {
    padding: '20px 18px',
    background: '#FAFBFC',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
      borderColor: '#bae6fd',
    },
  },

  featureIcon: {
    display: 'none',
  },

  featureTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '6px',
    lineHeight: '1.3',
  },

  featureDescription: {
    fontSize: '13px',
    color: '#6B7280',
    lineHeight: '1.5',
    fontWeight: '400',
  },

  // Screenshot Sections - Large Images with Context
  screenshotSection: {
    width: '100%',
    maxWidth: '1100px',
    padding: '32px 48px',
    '@media (max-width: 968px)': {
      padding: '28px 32px',
    },
    '@media (max-width: 640px)': {
      padding: '24px 24px',
    },
  },

  screenshotContainer: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    border: '1px solid #E5E7EB',
    background: '#FAFBFC',
    aspectRatio: '16 / 9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenshot: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  // Split Section - Asymmetric Layout
  splitSection: {
    width: '100%',
    maxWidth: '1100px',
    padding: '32px 48px',
    display: 'grid',
    gridTemplateColumns: '5fr 7fr',
    gap: '36px',
    alignItems: 'center',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      padding: '28px 32px',
      gap: '28px',
    },
    '@media (max-width: 640px)': {
      padding: '24px 24px',
      gap: '20px',
    },
  },

  splitContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  splitTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    marginBottom: '0',
    '@media (max-width: 640px)': {
      fontSize: '24px',
    },
  },

  splitDescription: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: '1.5',
    fontWeight: '400',
  },

  splitList: {
    listStyle: 'none',
    padding: 0,
    margin: '8px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  splitListItem: {
    fontSize: '13px',
    color: '#374151',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    lineHeight: '1.5',
    '&::before': {
      content: '"✓"',
      color: '#10B981',
      fontWeight: '700',
      fontSize: '14px',
      flexShrink: 0,
      marginTop: '2px',
    },
  },

  // Testimonials - Clean Cards
  testimonialsSection: {
    width: '100%',
    padding: '32px 48px',
    background: '#FAFBFC',
    '@media (max-width: 968px)': {
      padding: '28px 32px',
    },
    '@media (max-width: 640px)': {
      padding: '24px 24px',
    },
  },

  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    maxWidth: '1100px',
    margin: '0 auto',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: '14px',
    },
  },

  testimonialCard: {
    background: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    border: '1px solid #E5E7EB',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
    },
  },

  testimonialQuote: {
    fontSize: '13px',
    color: '#374151',
    lineHeight: '1.5',
    marginBottom: '14px',
    fontStyle: 'normal',
  },

  testimonialAuthor: {
    fontSize: '12px',
    color: '#111827',
    fontWeight: '600',
    marginBottom: '3px',
  },

  testimonialScore: {
    fontSize: '11px',
    color: '#10B981',
    fontWeight: '600',
  },

  // Schools Section - Subtle Logo Display
  schoolsSection: {
    width: '100%',
    padding: '32px 48px',
    background: '#ffffff',
    '@media (max-width: 968px)': {
      padding: '28px 32px',
    },
    '@media (max-width: 640px)': {
      padding: '24px 24px',
    },
  },

  schoolsScroller: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  },

  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },

  schoolsTrack: {
    display: 'flex',
    gap: '48px',
    padding: '10px 0',
    animation: '$scroll 40s linear infinite',
    '@media (max-width: 640px)': {
      gap: '36px',
    },
  },

  schoolLogo: {
    height: '32px',
    width: 'auto',
    opacity: 0.4,
    transition: 'opacity 0.3s ease',
    flexShrink: 0,
    filter: 'grayscale(100%)',
    '&:hover': {
      opacity: 0.7,
    },
  },

  // Improvements Section - Large Numbers
  improvementsSection: {
    width: '100%',
    padding: '32px 48px',
    background: '#FAFBFC',
    '@media (max-width: 968px)': {
      padding: '28px 32px',
    },
    '@media (max-width: 640px)': {
      padding: '24px 24px',
    },
  },

  improvementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
    '@media (max-width: 968px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
  },

  improvementCard: {
    textAlign: 'center',
  },

  improvementIcon: {
    display: 'none',
  },

  improvementTitle: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '4px',
    letterSpacing: '-0.02em',
    lineHeight: '1',
    '@media (max-width: 640px)': {
      fontSize: '34px',
    },
  },

  improvementText: {
    fontSize: '13px',
    color: '#6B7280',
    lineHeight: '1.4',
    fontWeight: '500',
  },

  // Final CTA - Bold and Clear
  finalCTA: {
    width: '100%',
    padding: '48px 48px',
    textAlign: 'center',
    background: '#F9FAFB',
    '@media (max-width: 968px)': {
      padding: '40px 32px',
    },
    '@media (max-width: 640px)': {
      padding: '36px 24px',
    },
  },

  finalCTATitle: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
    '@media (max-width: 968px)': {
      fontSize: '34px',
    },
    '@media (max-width: 640px)': {
      fontSize: '26px',
    },
  },

  finalCTASubtitle: {
    fontSize: '17px',
    color: '#6B7280',
    marginBottom: '24px',
    maxWidth: '600px',
    margin: '0 auto 24px',
    lineHeight: '1.5',
    '@media (max-width: 640px)': {
      fontSize: '15px',
    },
  },

  // Footer
  footer: {
    width: '100%',
    padding: '32px 48px',
    borderTop: '1px solid #E5E7EB',
    textAlign: 'center',
    background: '#FAFBFC',
    '@media (max-width: 640px)': {
      padding: '28px 24px',
    },
  },

  footerText: {
    fontSize: '13px',
    color: '#9CA3AF',
    marginBottom: '4px',
  },

  // Premium Elements
  ratingStars: {
    display: 'flex',
    gap: '4px',
    fontSize: '20px',
    color: '#FBBF24',
    marginBottom: '12px',
    justifyContent: 'center',
  },

  qualityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ECFDF5',
    border: '1px solid #D1FAE5',
    padding: '10px 20px',
    borderRadius: '100px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#065F46',
    marginTop: '24px',
  },

  scorePromise: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#059669',
    background: '#D1FAE5',
    padding: '12px 24px',
    borderRadius: '8px',
    marginTop: '16px',
    border: '1px solid #059669',
  },
});
