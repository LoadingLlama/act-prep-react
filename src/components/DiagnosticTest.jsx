/**
 * Diagnostic Test Component
 * Displays the diagnostic test using the same interface as practice tests
 * Integrates with adaptive learning algorithm for personalized recommendations
 */

import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import { usePracticeTestStyles } from '../styles/pages/practice-test.styles';
import { useDiagnosticTest } from '../hooks/useDiagnosticTest';
import DiagnosticTestReview from './DiagnosticTestReview';
import DiagnosticResultsView from './diagnostic/DiagnosticResultsView';
import DiagnosticOnboardingForm from './diagnostic/DiagnosticOnboardingForm';
import DiagnosticIntroScreen from './diagnostic/DiagnosticIntroScreen';
import DiagnosticProcessingScreen from './diagnostic/DiagnosticProcessingScreen';
import DiagnosticTestView from './diagnostic/DiagnosticTestView';

const DiagnosticTest = ({ onClose }) => {
  const classes = usePracticeTestStyles();

  // Use custom hook for all diagnostic test logic
  const {
    loading,
    error,
    testStarted,
    sessionId,
    showOnboarding,
    showIntro,
    processing,
    processingStep,
    processingProgress,
    showResults,
    analysisData,
    userGoalsData,
    onboardingData,
    confirmStart,
    showCountdown,
    countdown,
    showInsights,
    iframeRef,
    setOnboardingData,
    setShowInsights,
    setConfirmStart,
    setCountdown,
    setShowCountdown,
    saveOnboardingData
  } = useDiagnosticTest();

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className={classes.container}>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner} />
          <div className={classes.loadingText}>Loading Diagnostic Test...</div>
        </div>
      </div>
    );
  }

  /**
   * Render processing screen
   */
  if (processing) {
    return <DiagnosticProcessingScreen
      show={processing}
      processingStep={processingStep}
      processingProgress={processingProgress}
    />;
  }

  /**
   * Render results view
   */
  if (showResults && analysisData) {
    return <DiagnosticResultsView
      analysisData={analysisData}
      userGoalsData={userGoalsData}
      onboardingData={onboardingData}
      setShowInsights={setShowInsights}
      show={showResults}
    />;
  }

  /**
   * Render diagnostic test review modal (same as insights page)
   */
  if (showInsights) {
    return <DiagnosticTestReview
      show={showInsights}
      onClose={onClose}
      sessionId={sessionId}
    />;
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className={classes.container}>
        <div className={classes.errorContainer}>
          <div className={classes.errorTitle}>Error</div>
          <div className={classes.errorMessage}>{error}</div>
          <button onClick={onClose} className={classes.backButton}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /**
   * Render onboarding form
   */
  if (showOnboarding) {
    return <DiagnosticOnboardingForm
      onboardingData={onboardingData}
      setOnboardingData={setOnboardingData}
      saveOnboardingData={saveOnboardingData}
      onClose={onClose}
      show={showOnboarding}
    />;
  }

  /**
   * Render test in progress
   */
  if (testStarted || showCountdown) {
    return <DiagnosticTestView
      iframeRef={iframeRef}
      showCountdown={showCountdown}
      countdown={countdown}
      show={testStarted || showCountdown}
    />;
  }

  /**
   * Render intro screen
   */
  if (showIntro) {
    return <DiagnosticIntroScreen
      show={showIntro}
      onClose={onClose}
      confirmStart={confirmStart}
      setConfirmStart={setConfirmStart}
      setCountdown={setCountdown}
      setShowCountdown={setShowCountdown}
    />;
  }

  /**
   * Default loading state (while checking onboarding status)
   */
  return (
    <div className={classes.container}>
      <button onClick={onClose} className={classes.closeButton}>
        <HiXMark style={{ fontSize: '1.125rem' }} />
        Close
      </button>
      <div className={classes.loadingContainer}>
        <div className={classes.loadingSpinner} />
        <div className={classes.loadingText}>Loading...</div>
      </div>
    </div>
  );
};

export default DiagnosticTest;
