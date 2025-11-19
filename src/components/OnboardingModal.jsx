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
      image: "/onboarding/welcome.png",
      buttonText: "Get Started"
    },
    {
      title: "Step 1: Take the Diagnostic Test",
      description: "Start by taking our comprehensive diagnostic test. This helps us understand your current skill level and identify areas for improvement.",
      image: "/onboarding/diagnostic.png",
      buttonText: "Next",
      highlight: "This takes about 60 minutes and covers all four ACT sections."
    },
    {
      title: "Step 2: Review Your Insights",
      description: "After completing the diagnostic, review your detailed performance insights. See exactly where you're strong and where you need to focus.",
      image: "/onboarding/insights.png",
      buttonText: "Next",
      highlight: "Your personalized breakdown shows strengths and weaknesses by topic."
    },
    {
      title: "Step 3: Generate Your Learning Path",
      description: "Based on your diagnostic results, we'll create a personalized study plan tailored to your goals, schedule, and target score.",
      image: "/onboarding/learning-path.png",
      buttonText: "Next",
      highlight: "Set your exam date, study commitment, and target score to get started."
    },
    {
      title: "You're All Set!",
      description: "That's it! You're ready to start improving your ACT score. Remember, consistency is key to success.",
      image: "/onboarding/ready.png",
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
          {/* Image/Screenshot */}
          <div style={styles.imageContainer}>
            <div style={styles.imagePlaceholder}>
              {step.image ? (
                <img
                  src={step.image}
                  alt={step.title}
                  style={styles.image}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}
              {/* Placeholder icon if no image */}
              {!step.image && (
                <div style={styles.placeholderIcon}>
                  {currentStep === 0 && '👋'}
                  {currentStep === 1 && '📝'}
                  {currentStep === 2 && '📊'}
                  {currentStep === 3 && '🎯'}
                  {currentStep === 4 && '🚀'}
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div style={styles.textContent}>
            <h2 style={styles.title}>{step.title}</h2>
            <p style={styles.description}>{step.description}</p>
            {step.highlight && (
              <div style={styles.highlight}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={styles.highlightIcon}>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#3b82f6"/>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
  },

  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },

  progressContainer: {
    display: 'flex',
    gap: '8px',
    padding: '24px 32px 16px',
    justifyContent: 'center',
  },

  progressDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    transition: 'all 0.3s ease',
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
    padding: '0 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  imageContainer: {
    width: '100%',
    marginBottom: '24px',
  },

  imagePlaceholder: {
    width: '100%',
    height: '300px',
    backgroundColor: '#f3f4f6',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '2px solid #e5e7eb',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  placeholderIcon: {
    fontSize: '80px',
  },

  textContent: {
    textAlign: 'center',
    maxWidth: '500px',
  },

  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  description: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  highlight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1e40af',
    fontWeight: '500',
    marginTop: '8px',
  },

  highlightIcon: {
    flexShrink: 0,
  },

  actions: {
    display: 'flex',
    gap: '12px',
    padding: '24px 32px',
    justifyContent: 'flex-end',
    borderTop: '1px solid #e5e7eb',
  },

  skipButton: {
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  nextButton: {
    padding: '12px 32px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  stepCounter: {
    position: 'absolute',
    bottom: '32px',
    left: '32px',
    fontSize: '13px',
    color: '#9ca3af',
    fontWeight: '500',
  },
};

export default OnboardingModal;
