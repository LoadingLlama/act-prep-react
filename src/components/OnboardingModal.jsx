/**
 * Onboarding Modal
 * Guides new users through the app with step-by-step instructions
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingModal = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Nomi Academy!",
      description: "Let's get you started on your journey to a perfect ACT score. We'll walk you through the key features in just a few steps.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#3b82f6"/>
        </svg>
      ),
      buttonText: "Get Started"
    },
    {
      title: "Step 1: Take the Diagnostic Test",
      description: "Start by taking our comprehensive diagnostic test. This helps us understand your current skill level and identify areas for improvement.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      buttonText: "Next",
      highlight: "Takes about 60 minutes • Covers all four ACT sections"
    },
    {
      title: "Step 2: Review Your Insights",
      description: "After completing the diagnostic, review your detailed performance insights. See exactly where you're strong and where you need to focus.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      buttonText: "Next",
      highlight: "Personalized breakdown by topic and question type"
    },
    {
      title: "Step 3: Generate Your Learning Path",
      description: "Based on your diagnostic results, we'll create a personalized study plan tailored to your goals, schedule, and target score.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      buttonText: "Next",
      highlight: "Set your exam date, study hours, and target score"
    },
    {
      title: "You're All Set!",
      description: "That's it! You're ready to start improving your ACT score. Remember, consistency is key to success.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      buttonText: "Start Learning",
      isLast: true
    }
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Mark onboarding as complete
      localStorage.setItem('onboarding_completed', 'true');
      if (onComplete) {
        onComplete();
      }
      // Navigate to diagnostic test
      navigate('/diagnostic');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    if (onComplete) {
      onComplete();
    }
  };

  const step = steps[currentStep];

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Progress Indicator */}
        <div style={styles.progressContainer}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.progressDot,
                ...(index === currentStep ? styles.progressDotActive : {}),
                ...(index < currentStep ? styles.progressDotCompleted : {})
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Icon */}
          <div style={styles.iconContainer}>
            {step.icon}
          </div>

          {/* Text Content */}
          <div style={styles.textContent}>
            <h2 style={styles.title}>{step.title}</h2>
            <p style={styles.description}>{step.description}</p>
            {step.highlight && (
              <div style={styles.highlight}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={styles.highlightIcon}>
                  <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/>
                  <path d="M12 8v4m0 4h.01" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {step.highlight}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          {!step.isLast && (
            <button style={styles.skipButton} onClick={handleSkip}>
              Skip Tutorial
            </button>
          )}
          <button style={styles.nextButton} onClick={handleNext}>
            {step.buttonText}
          </button>
        </div>

        {/* Step Counter */}
        <div style={styles.stepCounter}>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
  },

  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    maxWidth: '560px',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },

  progressContainer: {
    display: 'flex',
    gap: '8px',
    padding: '32px 40px 24px',
    justifyContent: 'center',
  },

  progressDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  progressDotActive: {
    backgroundColor: '#3b82f6',
    width: '32px',
    borderRadius: '4px',
  },

  progressDotCompleted: {
    backgroundColor: '#10b981',
  },

  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 40px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  iconContainer: {
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContent: {
    textAlign: 'center',
    maxWidth: '460px',
  },

  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    letterSpacing: '-0.02em',
  },

  description: {
    fontSize: '15px',
    color: '#64748b',
    lineHeight: '1.65',
    marginBottom: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  highlight: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#eff6ff',
    borderRadius: '100px',
    fontSize: '13px',
    color: '#1e40af',
    fontWeight: '500',
    marginTop: '4px',
  },

  highlightIcon: {
    flexShrink: 0,
  },

  actions: {
    display: 'flex',
    gap: '12px',
    padding: '28px 40px 32px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  skipButton: {
    padding: '0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  nextButton: {
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  stepCounter: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },
};

export default OnboardingModal;
