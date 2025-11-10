/**
 * Landing Page
 * Clean white design with blue accents inspired by lumisource.io and Khan Academy
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLandingPageStyles } from '../styles/landing/LandingPage.styles';

const LandingPage = () => {
  const classes = useLandingPageStyles();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const stats = [
    { number: '2,847', label: 'Elite Students Served' },
    { number: '35.2', label: 'Average Composite Score' },
    { number: '94%', label: 'Score 34+ or Higher' },
    { number: '127', label: 'Perfect 36 Scores' },
  ];

  const schools = [
    { name: 'Harvard', logo: '/images/schools/harvard.png' },
    { name: 'Yale', logo: '/images/schools/yale.png' },
    { name: 'Princeton', logo: '/images/schools/princeton.png' },
    { name: 'Columbia', logo: '/images/schools/columbia.svg' },
    { name: 'Stanford', logo: '/images/schools/stanford.png' },
    { name: 'MIT', logo: '/images/schools/mit.png' },
    { name: 'Duke', logo: '/images/schools/duke.svg' },
    { name: 'Northwestern', logo: '/images/schools/northwestern.svg' },
    { name: 'UC Berkeley', logo: '/images/schools/uc-berkeley.png' },
    { name: 'UCLA', logo: '/images/schools/ucla.svg' },
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
          <div className={classes.navLeft}>
            <div className={classes.navLogoText}>
              <span className={classes.navLogoNomi}>Nomi</span> <span className={classes.navLogoAcademy}>Academy</span>
            </div>
            <div className={classes.navLinks}>
              <button className={classes.navLink} onClick={() => scrollToSection('features')}>
                Features
              </button>
              <button className={classes.navLink} onClick={() => scrollToSection('testimonials')}>
                Testimonials
              </button>
              <button className={classes.navLink} onClick={() => scrollToSection('schools')}>
                Results
              </button>
            </div>
          </div>
          <div className={classes.navRight}>
            <button className={classes.signInButton} onClick={handleSignIn}>
              Sign in
            </button>
            <button className={classes.getStartedButton} onClick={handleGetStarted}>
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="hero" className={classes.hero}>
        {/* Hero Content - Left Side */}
        <div className={classes.heroContent}>
          <div className={classes.trustBadge}>
            ★ 5.0 Rating • 2,847+ Students
          </div>

          <h1 className={classes.headline}>
            Ready to ace the ACT and<br />achieve a <span className={classes.highlightText}>34+ score?</span>
          </h1>

          <p className={classes.subheadline}>
            Elite test preparation with personalized learning paths, practice tests, and expert guidance. Achieve a 34+ ACT score.
          </p>

          <div className={classes.heroCheckmarks}>
            <div className={classes.checkmarkItem}>
              <span className={classes.checkmark}>✓</span>
              <span>Always available, 24/7</span>
            </div>
            <div className={classes.checkmarkItem}>
              <span className={classes.checkmark}>✓</span>
              <span>Expert guidance</span>
            </div>
          </div>

          <button className={classes.ctaButtonPrimary} onClick={handleGetStarted}>
            Start Free Diagnostic Test
          </button>

          <div className={classes.trustBadgeBottom}>
            No credit card required
          </div>
        </div>

        {/* Hero Video - Right Side */}
        <div className={classes.heroVideo}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Nomi Academy Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Platform Screenshot Section */}
      <div className={classes.screenshotSection}>
        <h2 className={classes.sectionTitle}>Your personalized dashboard</h2>
        <div className={classes.screenshotContainer}>
          {/* Replace with actual screenshot */}
          <img
            src="/images/screenshot-dashboard.png"
            alt="Nomi Academy Dashboard"
            className={classes.screenshot}
            onError={(e) => {
              // Fallback if screenshot doesn't exist
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="padding: 120px; text-align: center; color: #9ca3af; background: #f9fafb;">📊<br/>Dashboard Screenshot</div>';
            }}
          />
        </div>
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

      {/* Split Section - Personalized Learning */}
      <div className={classes.splitSection}>
        <div className={classes.splitContent}>
          <h3 className={classes.splitTitle}>Personalized for your success</h3>
          <p className={classes.splitDescription}>
            Every student learns differently. Our platform adapts to your strengths and weaknesses, creating a custom path that maximizes your score improvement efficiently.
          </p>
          <ul className={classes.splitList}>
            <li className={classes.splitListItem}>Adaptive practice targeting your weak areas</li>
            <li className={classes.splitListItem}>Smart recommendations for what to study next</li>
            <li className={classes.splitListItem}>Real-time progress tracking</li>
          </ul>
        </div>
        <div className={classes.screenshotContainer}>
          <img
            src="/images/screenshot-lessons.png"
            alt="Personalized Learning"
            className={classes.screenshot}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="padding: 100px; text-align: center; color: #9ca3af; background: #f9fafb;">📚<br/>Lessons Screenshot</div>';
            }}
          />
        </div>
      </div>

      {/* Split Section - Practice Tests */}
      <div className={classes.splitSection} style={{ background: '#FAFBFC' }}>
        <div className={classes.screenshotContainer}>
          <img
            src="/images/screenshot-practice.png"
            alt="Practice Tests"
            className={classes.screenshot}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="padding: 100px; text-align: center; color: #9ca3af; background: #ffffff;">Practice Test Interface</div>';
            }}
          />
        </div>
        <div className={classes.splitContent}>
          <h3 className={classes.splitTitle}>Practice like it's test day</h3>
          <p className={classes.splitDescription}>
            Build confidence with full-length practice tests that mirror the actual ACT. Get instant feedback and detailed explanations to learn from every question.
          </p>
          <ul className={classes.splitList}>
            <li className={classes.splitListItem}>Timed tests matching official ACT format</li>
            <li className={classes.splitListItem}>Instant scoring and performance breakdown</li>
            <li className={classes.splitListItem}>Detailed explanations for all questions</li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={classes.featuresSection}>
        <h2 className={classes.sectionTitle}>Everything you need to succeed</h2>
        <div className={classes.features}>
          <div className={classes.feature}>
            <div className={classes.featureIcon}>📊</div>
            <div className={classes.featureTitle}>Diagnostic Assessment</div>
            <div className={classes.featureDescription}>
              Identify your strengths and weaknesses with a comprehensive diagnostic test that pinpoints exactly where to focus your study time.
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>🎯</div>
            <div className={classes.featureTitle}>Personalized Study Plans</div>
            <div className={classes.featureDescription}>
              Get a custom curriculum tailored to your target score and timeline, optimized for maximum improvement.
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>📚</div>
            <div className={classes.featureTitle}>Expert-Crafted Lessons</div>
            <div className={classes.featureDescription}>
              Master every concept with lessons developed by top-scoring educators using proven teaching methods.
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>📝</div>
            <div className={classes.featureTitle}>Full-Length Practice Tests</div>
            <div className={classes.featureDescription}>
              Build confidence with realistic practice tests that mirror the actual ACT, complete with detailed explanations.
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>📈</div>
            <div className={classes.featureTitle}>Performance Analytics</div>
            <div className={classes.featureDescription}>
              Track your progress with detailed analytics, score predictions, and insights that guide your study strategy.
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.featureIcon}>⏰</div>
            <div className={classes.featureTitle}>Study Anytime, Anywhere</div>
            <div className={classes.featureDescription}>
              Access your personalized curriculum 24/7 on any device, fitting preparation seamlessly into your schedule.
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className={classes.testimonialsSection}>
        <h2 className={classes.sectionTitle}>What students are saying</h2>
        <div className={classes.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={classes.testimonialCard}>
              <div className={classes.testimonialQuote}>"{testimonial.quote}"</div>
              <div className={classes.testimonialAuthor}>{testimonial.author}</div>
              <div className={classes.testimonialScore}>{testimonial.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* School Admissions Section */}
      <div id="schools" className={classes.schoolsSection}>
        <h2 className={classes.sectionTitle}>
          Students accepted to top universities
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

      {/* Score Improvements Section */}
      <div className={classes.improvementsSection}>
        <h2 className={classes.sectionTitle}>Results that speak for themselves</h2>
        <div className={classes.improvementsGrid}>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>🎯</div>
            <div className={classes.improvementTitle}>127</div>
            <div className={classes.improvementText}>
              Perfect 36 Composite Scores Achieved
            </div>
          </div>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>📈</div>
            <div className={classes.improvementTitle}>+6.2</div>
            <div className={classes.improvementText}>
              Average Score Improvement (Points)
            </div>
          </div>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>⚡</div>
            <div className={classes.improvementTitle}>94%</div>
            <div className={classes.improvementText}>
              Students Score 34+ Composite
            </div>
          </div>
          <div className={classes.improvementCard}>
            <div className={classes.improvementIcon}>🏆</div>
            <div className={classes.improvementTitle}>35.2</div>
            <div className={classes.improvementText}>
              Average Student Composite Score
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div id="get-started" className={classes.finalCTA}>
        <h2 className={classes.finalCTATitle}>Start your path to a 34+ score</h2>
        <p className={classes.finalCTASubtitle}>
          Join thousands of students achieving exceptional ACT scores. Begin with a free diagnostic test to see exactly where you stand.
        </p>
        <button className={classes.ctaButtonPrimary} onClick={handleGetStarted}>
          Start Free Diagnostic Test
        </button>
        <div className={classes.trustBadgeBottom}>
          No credit card required • Free forever
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
