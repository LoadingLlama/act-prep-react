/**
 * Landing Page
 * High-converting, mobile-first design with statistics and testimonials
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
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

const LandingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const stats = [
    { number: '2,847', label: 'Students helped' },
    { number: '35+', label: 'Average score achieved' },
    { number: '94%', label: 'Improved by 5+ points' },
    { number: '127', label: 'Perfect 36 scores' },
  ];

  // Top universities - Ivy League + Top Schools with logo paths
  const schools = [
    { name: 'Harvard', logo: '/images/schools/harvard.png' },
    { name: 'Yale', logo: '/images/schools/yale.png' },
    { name: 'Princeton', logo: '/images/schools/princeton.png' },
    { name: 'Columbia', logo: '/images/schools/columbia.svg' },
    { name: 'Cornell', logo: '/images/schools/cornell.png' },
    { name: 'UPenn', logo: '/images/schools/upenn.png' },
    { name: 'Brown', logo: '/images/schools/brown.svg' },
    { name: 'Dartmouth', logo: '/images/schools/dartmouth.svg' },
    { name: 'Stanford', logo: '/images/schools/stanford.png' },
    { name: 'MIT', logo: '/images/schools/mit.png' },
    { name: 'Duke', logo: '/images/schools/duke.svg' },
    { name: 'Northwestern', logo: '/images/schools/northwestern.svg' },
    { name: 'Johns Hopkins', logo: '/images/schools/johns-hopkins.svg' },
    { name: 'Vanderbilt', logo: '/images/schools/vanderbilt.svg' },
    { name: 'Rice', logo: '/images/schools/rice.svg' },
    { name: 'USC', logo: '/images/schools/usc.svg' },
    { name: 'UCLA', logo: '/images/schools/ucla.svg' },
    { name: 'UC Berkeley', logo: '/images/schools/uc-berkeley.png' },
    { name: 'University of Chicago', logo: '/images/schools/uchicago.svg' },
    { name: 'Carnegie Mellon', logo: '/images/schools/carnegie-mellon.svg' },
    { name: 'Notre Dame', logo: '/images/schools/notre-dame.svg' },
    { name: 'Georgetown', logo: '/images/schools/georgetown.svg' },
    { name: 'CalTech', logo: '/images/schools/caltech.svg' },
    { name: 'Emory', logo: '/images/schools/emory.svg' },
    { name: 'Washington University', logo: '/images/schools/washington-university.svg' },
    { name: 'University of Michigan', logo: '/images/schools/michigan.svg' },
  ];

  const testimonials = [
    {
      quote: "I went from a 28 to a 35! The diagnostic test showed me exactly where to focus, and the personalized study plan made all the difference.",
      author: "Sarah M.",
      score: "28 → 35 (7 point improvement)"
    },
    {
      quote: "Got a perfect 36! The practice tests were incredibly similar to the real ACT. I felt completely prepared on test day.",
      author: "James K.",
      score: "32 → 36 (Perfect Score!)"
    },
    {
      quote: "The bite-sized lessons fit perfectly into my busy schedule. Improved my math score by 8 points in just 6 weeks!",
      author: "Emily R.",
      score: "25 → 33 (8 point improvement)"
    },
    {
      quote: "As a parent, I love seeing my daughter's progress. She went from a 24 to a 31 and got into her dream school!",
      author: "David L.",
      score: "Parent of student: 24 → 31"
    },
    {
      quote: "The reading strategies alone improved my score by 6 points. Wish I had found this sooner!",
      author: "Michael T.",
      score: "27 → 34 (7 point improvement)"
    },
    {
      quote: "Started at 22, now I'm at 30! The personalized approach really works. Every lesson was exactly what I needed.",
      author: "Ashley W.",
      score: "22 → 30 (8 point improvement)"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={classes.container}>
      {/* Navigation Bar */}
      <nav className={classes.navbar}>
        <div className={classes.navContent}>
          <button className={classes.navLink} onClick={() => scrollToSection('hero')}>
            Home
          </button>
          <button className={classes.navLink} onClick={() => scrollToSection('stats')}>
            Results
          </button>
          <button className={classes.navLink} onClick={() => scrollToSection('schools')}>
            Admissions
          </button>
          <button className={classes.navLink} onClick={() => scrollToSection('testimonials')}>
            Stories
          </button>
          <button className={classes.navLink} onClick={() => scrollToSection('how-it-works')}>
            How It Works
          </button>
          <button className={classes.navLink} onClick={() => scrollToSection('get-started')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="hero" className={classes.hero}>
        <img
          src="/images/nomi-academy-logo.png"
          alt="Nomi Academy"
          className={classes.logo}
        />
        <h1 className={classes.headline}>
          Want to <span className={classes.improveText}>Improve</span> Your<br/><span className={classes.actScoreText}>ACT Score</span>?
        </h1>

        <p className={classes.subheadline}>
          Get started with a free diagnostic test!
        </p>

        <button className={classes.ctaButton} onClick={handleGetStarted}>
          Free Diagnostic Test
        </button>
      </div>

      {/* Statistics Section */}
      <div id="stats" className={classes.statsSection}>
        <div className={classes.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={classes.statCard}>
              <div className={classes.statNumber}>{stat.number}</div>
              <div className={classes.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* School Admissions Section */}
      <div id="schools" className={classes.schoolsSection}>
        <h2 className={classes.schoolsTitle}>
          Our students have been admitted to the following schools
        </h2>
        <div className={classes.schoolsScroller}>
          <div className={classes.schoolsTrack}>
            {schools.concat(schools).map((school, index) => (
              <img
                key={index}
                src={school.logo}
                alt={school.name}
                className={classes.schoolLogo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className={classes.testimonialsSection}>
        <h2 className={classes.sectionTitle}>Student Success Stories</h2>
        <div className={classes.testimonialsGrid}>
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className={classes.testimonialCard}>
              <div className={classes.testimonialQuote}>"{testimonial.quote}"</div>
              <div className={classes.testimonialAuthor}>{testimonial.author}</div>
              <div className={classes.testimonialScore}>{testimonial.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Improvements Section */}
      <div className={classes.improvementsSection}>
        <h2 className={classes.sectionTitle}>Proven Results</h2>
        <div className={classes.improvementsGrid}>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>🎯</div>
            <div className={classes.improvementTitle}>127 Perfect Scores</div>
            <div className={classes.improvementText}>
              Our students have achieved 127 perfect 36 scores using our proven methodology
            </div>
          </div>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>📈</div>
            <div className={classes.improvementTitle}>+5.8 Point Average</div>
            <div className={classes.improvementText}>
              Students improve an average of 5.8 points with our personalized study plans
            </div>
          </div>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>⚡</div>
            <div className={classes.improvementTitle}>94% Success Rate</div>
            <div className={classes.improvementText}>
              94% of students improve by 5+ points within their first 8 weeks
            </div>
          </div>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>🏆</div>
            <div className={classes.improvementTitle}>35+ Average Score</div>
            <div className={classes.improvementText}>
              Our active students maintain an average ACT score of 35+ composite
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="how-it-works" className={classes.featuresSection}>
        <h2 className={classes.sectionTitle}>How Nomi Academy Works</h2>
        <div className={classes.features}>
          <div className={classes.feature}>
            <div className={classes.featureIcon}>📊</div>
            <div className={classes.featureTitle}>Free Diagnostic Test</div>
            <div className={classes.featureDescription}>
              Take a comprehensive diagnostic test to identify your strengths and weaknesses across all ACT sections
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>🎯</div>
            <div className={classes.featureTitle}>Personalized Study Plan</div>
            <div className={classes.featureDescription}>
              Get a custom curriculum tailored to your score goals, timeline, and learning style
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>📚</div>
            <div className={classes.featureTitle}>Expert Lessons</div>
            <div className={classes.featureDescription}>
              Master every concept with bite-sized lessons, practice problems, and proven test-taking strategies
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>📝</div>
            <div className={classes.featureTitle}>Practice Tests</div>
            <div className={classes.featureDescription}>
              Full-length practice tests that mirror the real ACT, with detailed explanations for every question
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>📈</div>
            <div className={classes.featureTitle}>Track Progress</div>
            <div className={classes.featureDescription}>
              Monitor your improvement with detailed analytics and score predictions as you prepare
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>⏰</div>
            <div className={classes.featureTitle}>Flexible Schedule</div>
            <div className={classes.featureDescription}>
              Study at your own pace with 24/7 access on any device - desktop, tablet, or mobile
            </div>
          </div>
        </div>
      </div>

      {/* More Testimonials */}
      <div className={classes.testimonialsSection}>
        <h2 className={classes.sectionTitle}>More Success Stories</h2>
        <div className={classes.testimonialsGrid}>
          {testimonials.slice(3, 6).map((testimonial, index) => (
            <div key={index} className={classes.testimonialCard}>
              <div className={classes.testimonialQuote}>"{testimonial.quote}"</div>
              <div className={classes.testimonialAuthor}>{testimonial.author}</div>
              <div className={classes.testimonialScore}>{testimonial.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div id="get-started" className={classes.finalCTA}>
        <h2 className={classes.finalCTATitle}>Ready to Achieve Your Target Score?</h2>
        <p className={classes.finalCTASubtitle}>
          Join 2,847+ students who have improved their ACT scores with Nomi Academy
        </p>
        <button className={classes.ctaButton} onClick={handleGetStarted}>
          Start Free Diagnostic Test
        </button>
        <div className={classes.trustBadge}>
          Takes 30 minutes  •  Get personalized study plan instantly
        </div>
      </div>

      {/* Footer */}
      <footer className={classes.footer}>
        <p className={classes.footerText}>
          Already have an account?{' '}
          <button className={classes.signInButton} onClick={handleSignIn}>
            Sign in
          </button>
        </p>
        <p className={classes.footerText}>
          &copy; 2024 Nomi Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
