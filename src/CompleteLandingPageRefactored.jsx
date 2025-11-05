/**
 * Refactored Complete Landing Page
 * This is a cleaner, modular version of the landing page
 * All components are under 300 lines
 * Styles and data are separated into their own files
 */

import React, { useState, useEffect } from 'react';

// Import components
import Header from './components/landing/Header';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import StatsSection from './components/landing/StatsSection';
import CTASection from './components/landing/CTASection';

// Import data
import { recentSignups } from './data/landingPageData';

// Import styles
import { pageStyles } from './styles/landing/page.styles';

const CompleteLandingPageRefactored = ({ onGetStarted, onSignIn }) => {
  // State management
  const [currentDynamicText, setCurrentDynamicText] = useState(0);
  const [signupCount, setSignupCount] = useState(7567);
  const [currentSignupIndex, setCurrentSignupIndex] = useState(0);

  // Effects for animations and timers
  useEffect(() => {
    // Dynamic text rotation
    const interval = setInterval(() => {
      setCurrentDynamicText((prev) => (prev + 1) % 7);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Social proof rotation
    const interval = setInterval(() => {
      setCurrentSignupIndex((prev) => (prev + 1) % recentSignups.length);
      setSignupCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fade-in animation for sections
    const sections = document.querySelectorAll('section:not(.hero)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Handler functions
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={pageStyles.root}>
      {/* Navigation Header */}
      <Header
        onGetStarted={onGetStarted}
        onSignIn={onSignIn}
        handleNavClick={handleNavClick}
      />

      {/* Hero Section */}
      <HeroSection
        currentDynamicText={currentDynamicText}
        onGetStarted={onGetStarted}
        signupCount={signupCount}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Call to Action Section */}
      <CTASection onGetStarted={onGetStarted} />

      {/* Social Proof Notification */}
      <div style={pageStyles.socialProof}>
        {recentSignups[currentSignupIndex]}
      </div>

      {/* Footer */}
      <footer style={pageStyles.footer}>
        <div style={pageStyles.footerContent}>
          <p>&copy; 2024 Nomi Academy. All rights reserved.</p>
          <div style={pageStyles.footerLinks}>
            <a href="/privacy" style={pageStyles.footerLink}>Privacy Policy</a>
            <a href="/terms" style={pageStyles.footerLink}>Terms of Service</a>
            <a href="/contact" style={pageStyles.footerLink}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompleteLandingPageRefactored;