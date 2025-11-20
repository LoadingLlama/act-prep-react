/**
 * About Us Page
 * Information about the founders and mission
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Logo from '../components/common/Logo';

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    width: '100%',
    background: '#f9fafb',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(24px) saturate(200%)',
    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.4)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
    zIndex: 1000,
    padding: '12px 0',
  },
  navContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      padding: '0 16px',
    },
  },
  backButton: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 8px rgba(30, 58, 138, 0.25)',
    '@media (max-width: 768px)': {
      padding: '7px 14px',
      fontSize: '13px',
    },
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 16px rgba(30, 58, 138, 0.35)',
    },
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '120px 32px 64px',
    '@media (max-width: 768px)': {
      padding: '100px 20px 48px',
    },
    '@media (max-width: 480px)': {
      padding: '90px 16px 40px',
    },
  },
  section: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '48px 40px',
    marginBottom: '32px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e2e8f0',
    '@media (max-width: 768px)': {
      padding: '32px 24px',
      marginBottom: '24px',
      borderRadius: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '24px 16px',
      marginBottom: '20px',
    },
  },
  title: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '24px',
    letterSpacing: '-0.03em',
    lineHeight: '1.2',
    '@media (max-width: 768px)': {
      fontSize: '32px',
      marginBottom: '20px',
    },
    '@media (max-width: 480px)': {
      fontSize: '28px',
      marginBottom: '16px',
    },
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '20px',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      marginBottom: '16px',
    },
    '@media (max-width: 480px)': {
      fontSize: '18px',
    },
  },
  paragraph: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.8',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      fontSize: '15px',
      lineHeight: '1.7',
      marginBottom: '16px',
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
      lineHeight: '1.6',
      marginBottom: '14px',
    },
  },
  foundersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    marginTop: '32px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '28px',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '24px',
      marginTop: '24px',
    },
  },
  founderCard: {
    background: 'rgba(239, 246, 255, 0.5)',
    borderRadius: '12px',
    padding: '32px 28px',
    border: '1px solid rgba(147, 197, 253, 0.3)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      padding: '24px 20px',
    },
    '@media (max-width: 480px)': {
      padding: '20px 16px',
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(30, 58, 138, 0.12)',
      borderColor: 'rgba(59, 130, 246, 0.5)',
    },
  },
  founderImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 20px',
    border: '3px solid rgba(30, 58, 138, 0.2)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      width: '100px',
      height: '100px',
      marginBottom: '16px',
    },
    '@media (max-width: 480px)': {
      width: '80px',
      height: '80px',
      marginBottom: '12px',
    },
  },
  founderName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '4px',
    '@media (max-width: 768px)': {
      fontSize: '20px',
    },
    '@media (max-width: 480px)': {
      fontSize: '18px',
    },
  },
  founderRole: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  founderDetails: {
    fontSize: '15px',
    color: '#64748b',
    lineHeight: '1.6',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      lineHeight: '1.5',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
      lineHeight: '1.4',
    },
  },
  highlight: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '100px',
    padding: '6px 14px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#15803d',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
    '@media (max-width: 1024px)': {
      fontSize: '12px',
      padding: '5px 11px',
    },
    '@media (max-width: 768px)': {
      fontSize: '13px',
      padding: '6px 14px',
    },
    '@media (max-width: 480px)': {
      fontSize: '11px',
      padding: '4px 10px',
    },
  },
  schoolInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '16px',
    '@media (max-width: 768px)': {
      gap: '8px',
      marginBottom: '12px',
    },
    '@media (max-width: 480px)': {
      gap: '6px',
      marginBottom: '10px',
    },
  },
  schoolLogo: {
    width: '32px',
    height: '32px',
    objectFit: 'contain',
    '@media (max-width: 768px)': {
      width: '28px',
      height: '28px',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
    },
  },
  schoolName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e3a8a',
    '@media (max-width: 768px)': {
      fontSize: '15px',
    },
    '@media (max-width: 480px)': {
      fontSize: '14px',
    },
  },
});

const AboutUs = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      {/* Navigation */}
      <nav className={classes.navbar}>
        <div className={classes.navContent}>
          <Logo size="medium" clickable onClick={handleBack} />
          <button className={classes.backButton} onClick={handleBack}>
            Back to Home
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className={classes.content}>
        {/* Our Mission */}
        <div className={classes.section}>
          <h1 className={classes.title}>About Nomi Academy</h1>
          <p className={classes.paragraph}>
            We believe that <span className={classes.highlight}>achieving a top ACT score shouldn't require overpaying for expensive tutoring</span> or navigating complicated study programs. Test prep has become unnecessarily expensive and overcomplicated, keeping quality education out of reach for many students who need it most.
          </p>
          <p className={classes.paragraph}>
            That's why we built Nomi Academy — to make elite test prep accessible to everyone. Our platform is designed with one simple principle: <strong>don't overcomplicate studying for the exam</strong>. We focus on what actually works, cutting through the noise to deliver proven strategies that help you improve your score efficiently.
          </p>
          <p className={classes.paragraph}>
            You don't need to spend thousands of dollars to get a great ACT score. With the right approach, clear explanations, and targeted practice, any motivated student can achieve their goals. We're here to show you how.
          </p>
        </div>

        {/* Meet the Team */}
        <div className={classes.section}>
          <h2 className={classes.subtitle}>Meet the Team</h2>
          <p className={classes.paragraph}>
            Nomi Academy was founded by UC Berkeley students who know firsthand what it takes to excel on the ACT. Our team of perfect scorers has been in your shoes, and we built this platform using the exact strategies that helped us succeed.
          </p>

          <div className={classes.foundersGrid}>
            <div className={classes.founderCard}>
              <img
                src={`${process.env.PUBLIC_URL}/cadenchiangheadshot.jpeg`}
                alt="Caden Chiang"
                className={classes.founderImage}
              />
              <div className={classes.badge}>Perfect 36 ACT Score</div>
              <h3 className={classes.founderName}>Caden Chiang</h3>
              <div className={classes.founderRole}>Co-Founder</div>
              <div className={classes.schoolInfo}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/schools/uc-berkeley.png`}
                  alt="UC Berkeley"
                  className={classes.schoolLogo}
                />
                <span className={classes.schoolName}>UC Berkeley</span>
              </div>
              <p className={classes.founderDetails}>
                Caden achieved a perfect 36 on the ACT and is passionate about making test prep accessible to all students. He developed the core curriculum and learning methodology that powers Nomi Academy's lessons.
              </p>
            </div>

            <div className={classes.founderCard}>
              <img
                src={`${process.env.PUBLIC_URL}/willisyangheadshot.jpeg`}
                alt="Willis Yang"
                className={classes.founderImage}
              />
              <div className={classes.badge}>Perfect 36 ACT Score</div>
              <h3 className={classes.founderName}>Willis Yang</h3>
              <div className={classes.founderRole}>Co-Founder</div>
              <div className={classes.schoolInfo}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/schools/uc-berkeley.png`}
                  alt="UC Berkeley"
                  className={classes.schoolLogo}
                />
                <span className={classes.schoolName}>UC Berkeley</span>
              </div>
              <p className={classes.founderDetails}>
                Willis also scored a perfect 36 on the ACT and brings expertise in creating effective practice questions and study plans. He designed the platform's personalized learning features and analytics.
              </p>
            </div>

            <div className={classes.founderCard}>
              <img
                src={`${process.env.PUBLIC_URL}/jonathanheadshot.jpeg`}
                alt="Jonathan"
                className={classes.founderImage}
              />
              <div className={classes.badge}>Perfect 36 ACT Score</div>
              <h3 className={classes.founderName}>Jonathan</h3>
              <div className={classes.founderRole}>Advisor</div>
              <div className={classes.schoolInfo}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/schools/brown.png`}
                  alt="Brown University"
                  className={classes.schoolLogo}
                />
                <span className={classes.schoolName}>Brown University</span>
              </div>
              <p className={classes.founderDetails}>
                Jonathan achieved a perfect 36 on the ACT and serves as an advisor to Nomi Academy. He provides strategic guidance and helps ensure our curriculum stays aligned with the latest ACT testing strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className={classes.section}>
          <h2 className={classes.subtitle}>Our Approach</h2>
          <p className={classes.paragraph}>
            We're not just test prep experts — we're students who recently navigated the college admissions process ourselves. We understand the pressure, the time constraints, and the importance of every single point on your ACT score.
          </p>
          <p className={classes.paragraph}>
            Our platform strips away the unnecessary complexity that plagues traditional test prep. Instead, we focus on:
          </p>
          <p className={classes.paragraph}>
            <strong>✓ Clear, concise lessons</strong> that teach you exactly what you need to know<br />
            <strong>✓ Targeted practice</strong> that focuses on your specific weaknesses<br />
            <strong>✓ Proven strategies</strong> that helped us achieve perfect scores<br />
            <strong>✓ Affordable pricing</strong> that makes elite test prep accessible to everyone
          </p>
          <p className={classes.paragraph}>
            We believe that with the right tools and guidance, any student can dramatically improve their ACT score — without breaking the bank or getting lost in overly complicated study programs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
