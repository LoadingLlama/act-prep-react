/**
 * Landing Page
 * High-converting, mobile-first design with statistics and testimonials
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
