/**
 * Diagnostic Processing Screen Component
 * Shows progress while analyzing test results
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * Diagnostic Processing Screen
 * @param {boolean} show - Whether to show this screen
 * @param {string} processingStep - Current processing step message
 * @param {number} processingProgress - Progress percentage (0-100)
 */
const DiagnosticProcessingScreen = ({
  show,
  processingStep,
  processingProgress
}) => {
  // Smoothly animated progress value
  const [displayProgress, setDisplayProgress] = useState(0);
  const animationRef = useRef(null);

  // Real-time countdown state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startTimeRef = useRef(null);

  // Real-time timer that updates every second
  useEffect(() => {
    if (!show) {
      setElapsedSeconds(0);
      startTimeRef.current = null;
      return;
    }

    // Initialize start time when first shown
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    // Update elapsed time every second
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);

  // Prevent navigation during processing
  useEffect(() => {
    if (!show) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Your diagnostic test is still being processed. If you leave now, your results may be lost. Are you sure you want to leave?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [show]);

  // Smoothly animate progress changes
  useEffect(() => {
    if (!show) {
      setDisplayProgress(0);
      return;
    }

    const startProgress = displayProgress;
    const targetProgress = processingProgress;
    const diff = targetProgress - startProgress;

    if (diff === 0) return;

    // Animation duration based on progress jump size (200-800ms)
    const duration = Math.min(800, Math.max(200, Math.abs(diff) * 20));
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentProgress = startProgress + (diff * easeProgress);

      setDisplayProgress(currentProgress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayProgress(targetProgress);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [processingProgress, show]);

  if (!show) return null;

  // Calculate estimated time remaining based on elapsed time and progress
  // Reduced from 90s to 30s due to batch insert optimization
  const totalEstimatedSeconds = 30;

  // Use a combination of elapsed time and progress to estimate remaining time
  // This provides a smooth, continuously updating countdown
  let estimatedSecondsRemaining;

  if (processingProgress >= 95) {
    // Near completion - show minimal time
    estimatedSecondsRemaining = Math.max(0, totalEstimatedSeconds - elapsedSeconds);
  } else if (processingProgress > 0) {
    // Calculate rate of progress and project remaining time
    const estimatedTotalTime = (elapsedSeconds / processingProgress) * 100;
    estimatedSecondsRemaining = Math.ceil(estimatedTotalTime - elapsedSeconds);
    // Cap at reasonable bounds
    estimatedSecondsRemaining = Math.max(5, Math.min(estimatedSecondsRemaining, totalEstimatedSeconds - elapsedSeconds));
  } else {
    // Just started - use total estimate minus elapsed
    estimatedSecondsRemaining = Math.max(0, totalEstimatedSeconds - elapsedSeconds);
  }

  // Format time estimate
  const formatTimeEstimate = (seconds) => {
    if (seconds <= 0) return 'Almost done...';
    if (seconds < 60) return `About ${seconds} second${seconds !== 1 ? 's' : ''} remaining`;
    const minutes = Math.ceil(seconds / 60);
    return `About ${minutes} minute${minutes !== 1 ? 's' : ''} remaining`;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'transparent'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '4px solid #fee2e2',
          borderTop: '4px solid #dc2626',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '2rem'
        }} />

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1a1a1a',
          marginBottom: '0.5rem'
        }}>
          Analyzing Your Results
        </h2>

        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          marginBottom: '2rem',
          maxWidth: '500px'
        }}>
          {processingStep}
        </p>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          maxWidth: '400px',
          height: '8px',
          background: '#f3f4f6',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)',
            width: `${displayProgress}%`,
            transition: 'none' // Animation handled by JavaScript
          }} />
        </div>

        {/* Estimated time remaining */}
        <p style={{
          fontSize: '0.95rem',
          color: '#374151',
          marginTop: '1rem',
          fontWeight: '500'
        }}>
          {formatTimeEstimate(estimatedSecondsRemaining)}
        </p>

        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          marginTop: '1rem',
          fontStyle: 'italic'
        }}>
          Please don't close this window...
        </p>
      </div>
    </div>
  );
};

export default DiagnosticProcessingScreen;
