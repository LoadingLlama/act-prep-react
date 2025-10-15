/**
 * Refactored Complete Landing Page
 * This is a cleaner, modular version of the landing page
 * All components are under 300 lines
 * Styles and data are separated into their own files
 */

import React, { useState, useEffect, useRef } from 'react';

// Import components
import Header from './components/landing/Header';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import StatsSection from './components/landing/StatsSection';
import CTASection from './components/landing/CTASection';
import SignupModal from './components/landing/SignupModal';

// Import data
import { recentSignups } from './data/landingPageData';

// Import styles
import { pageStyles } from './styles/landing/page.styles';

const CompleteLandingPageRefactored = () => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (formData) => {
    // TODO: Send to Supabase instead of console.log
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    setShowSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div style={pageStyles.root}>
      {/* Navigation Header */}
      <Header
        openModal={openModal}
        handleNavClick={handleNavClick}
      />

      {/* Hero Section */}
      <HeroSection
        currentDynamicText={currentDynamicText}
        openModal={openModal}
        signupCount={signupCount}
      />

      {/* Other sections would go here - TimelineSection, LearningProgressSection, DemoSection */}
      {/* For now, showing the main sections */}

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Call to Action Section */}
      <CTASection openModal={openModal} />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSubmit={handleFormSubmit}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <div style={pageStyles.successMessage}>
          <div style={pageStyles.successContent}>
            ✓ Successfully joined the waitlist! Check your email for next steps.
          </div>
        </div>
      )}

      {/* Social Proof Notification */}
      <div style={pageStyles.socialProof}>
        {recentSignups[currentSignupIndex]}
      </div>

      {/* Footer */}
      <footer style={pageStyles.footer}>
        <div style={pageStyles.footerContent}>
          <p>&copy; 2024 Launch Prep. All rights reserved.</p>
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