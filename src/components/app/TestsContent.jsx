/**
 * Tests Content Component
 * Displays the practice tests grid with compact professional design
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTestsContentStyles } from '../../styles/app/tests-content.styles';
import { HiClipboardDocumentList, HiPencilSquare, HiCalculator, HiBookOpen, HiBeaker, HiDocumentText, HiLockClosed } from 'react-icons/hi2';
import { getFeatureAccess } from '../../services/subscription.service';
import { supabase } from '../../supabaseClient';
import soundEffects from '../../services/soundEffects';
import DiagnosticTestCTA from '../DiagnosticTestCTA';

const TestsContent = () => {
  const classes = useTestsContentStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    setDiagnosticTestOpen,
    onTestOpen: setPracticeTestOpen
  } = useOutletContext();
  const [featureAccess, setFeatureAccess] = useState(null);
  const [previewTest, setPreviewTest] = useState(null);
  const [showDiagnosticWarning, setShowDiagnosticWarning] = useState(false);
  const [retakeButtonClicked, setRetakeButtonClicked] = useState(false);
  const [hasCompletedDiagnostic, setHasCompletedDiagnostic] = useState(() => {
    // Load from cache for instant rendering
    try {
      const cached = localStorage.getItem(`hasCompletedDiagnostic_${user?.id}`);
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });
  const [completedTests, setCompletedTests] = useState(() => {
    // Load from cache for instant rendering - cache persists for entire session
    try {
      const cached = sessionStorage.getItem(`completedTests_${user?.id}`);
      if (cached) {
        console.log('✅ Using cached completed tests from session');
        return new Set(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Error loading cached completed tests:', e);
    }
    return new Set();
  });

  const checkFeatureAccess = useCallback(async () => {
    try {
      const access = await getFeatureAccess(user.id);
      setFeatureAccess(access);
    } catch (error) {
      console.error('Error checking feature access:', error);
    }
  }, [user?.id]);

  const checkDiagnosticStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('diagnostic_test_sessions')
        .select('id, completed')
        .eq('user_id', user.id)
        .eq('completed', true)
        .limit(1);

      if (error) {
        console.error('Error checking diagnostic status:', error);
        return;
      }

      const hasCompleted = data && data.length > 0;
      setHasCompletedDiagnostic(hasCompleted);

      // Cache the result
      try {
        localStorage.setItem(`hasCompletedDiagnostic_${user.id}`, JSON.stringify(hasCompleted));
      } catch (e) {
        console.error('Error caching diagnostic status:', e);
      }
    } catch (error) {
      console.error('Error checking diagnostic status:', error);
    }
  }, [user?.id]);

  const checkCompletedTests = useCallback(async () => {
    try {
      const { data, error} = await supabase
        .from('practice_test_sessions')
        .select('test_name')
        .eq('user_id', user.id)
        .eq('is_completed', true);

      if (error) {
        console.error('Error checking completed tests:', error);
        return;
      }

      // Extract test numbers from test names (e.g., "Practice Test 1" -> 2, "Practice Test 2" -> 3)
      // Database test_number = display number + 1 (because test 1 is diagnostic)
      const completed = new Set(
        data
          .map(session => {
            // Extract number from "Practice Test X" -> X is display number
            const match = session.test_name?.match(/Practice Test (\d+)/i);
            if (match) {
              const displayNum = parseInt(match[1], 10);
              const dbTestNumber = displayNum + 1; // Convert display number to database test number
              return dbTestNumber;
            }
            return null;
          })
          .filter(num => num !== null)
      );

      console.log('✅ Completed practice tests (DB numbers):', Array.from(completed));
      setCompletedTests(completed);

      // Cache the results for the session
      try {
        sessionStorage.setItem(`completedTests_${user.id}`, JSON.stringify(Array.from(completed)));
        console.log('✅ Cached completed tests to sessionStorage');
      } catch (e) {
        console.error('Error caching completed tests:', e);
      }
    } catch (error) {
      console.error('Error checking completed tests:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      checkFeatureAccess();
      checkDiagnosticStatus();
      checkCompletedTests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Only re-run when user changes

  // Note: Test 1 in database is the Diagnostic Test, so practice tests start at 2
  // Memoized to prevent recreating array on every render
  const practiceTests = useMemo(() => [
    { number: 2, displayNumber: 1, title: 'Test 1', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 3, displayNumber: 2, title: 'Test 2', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 4, displayNumber: 3, title: 'Test 3', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 5, displayNumber: 4, title: 'Test 4', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 6, displayNumber: 5, title: 'Test 5', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 7, displayNumber: 6, title: 'Test 6', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' }
  ], []);

  const sectionTests = useMemo(() => [
    { title: 'English Practice', icon: <HiPencilSquare />, description: 'Coming soon', disabled: true },
    { title: 'Math Practice', icon: <HiCalculator />, description: 'Coming soon', disabled: true },
    { title: 'Reading Practice', icon: <HiBookOpen />, description: 'Coming soon', disabled: true },
    { title: 'Science Practice', icon: <HiBeaker />, description: 'Coming soon', disabled: true }
  ], []);

  const handleDiagnosticClick = () => {
    if (hasCompletedDiagnostic) {
      // Show warning modal if they've already completed it
      setShowDiagnosticWarning(true);
    } else {
      // Directly open diagnostic if not completed
      soundEffects.playSuccess();
      setDiagnosticTestOpen(true);
    }
  };

  const handleConfirmRetakeDiagnostic = () => {
    if (!retakeButtonClicked) {
      // First click - mark as clicked and wait for second click
      setRetakeButtonClicked(true);
      return;
    }

    // Second click - proceed with retake
    setShowDiagnosticWarning(false);
    setRetakeButtonClicked(false);
    soundEffects.playSuccess();
    setDiagnosticTestOpen(true);
  };

  return (
    <div className={classes.testsContainer}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Tests</h1>
      </div>

      {/* Diagnostic Test Section */}
      <div className={classes.contentSection}>
        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Diagnostic Test</h2>
        </div>
        <div className={classes.testsGrid}>
          <div
            className={classes.testCard}
            onClick={handleDiagnosticClick}
            style={{
              opacity: hasCompletedDiagnostic ? 0.7 : 1,
              position: 'relative',
              borderLeft: '3px solid #dc2626'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = '#dc2626'}
          >
            {/* Completed badge if diagnostic is done */}
            {hasCompletedDiagnostic && (
              <div style={{
                position: 'absolute',
                top: '0.875rem',
                right: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.6875rem',
                fontWeight: '600',
                color: '#10b981',
                background: '#f0fdf4',
                padding: '0.1875rem 0.5rem',
                borderRadius: '999px',
                border: '1px solid #86efac',
                zIndex: 1
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Completed
              </div>
            )}
            <div>
              <div className={classes.testIcon} style={{ background: '#dc2626' }}>
                <HiDocumentText />
              </div>
              <h3 className={classes.testTitle} style={{ color: '#dc2626' }}>
                Diagnostic Test
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Length Tests Section */}
      <div className={classes.contentSection}>
        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Full-Length Tests</h2>
        </div>
        <div className={classes.testsGrid}>
          {practiceTests.map(test => {
            // Use displayNumber for access check (Test 1 display = 1st practice test available)
            const isLocked = featureAccess && !featureAccess.isPro && test.displayNumber > featureAccess.practiceTests;
            const isCompleted = completedTests.has(test.number);

            return (
              <div
                key={test.number}
                className={`${classes.testCard} ${isLocked ? classes.lockedCard : ''}`}
                onClick={() => {
                  if (isLocked) {
                    soundEffects.playClick();
                    navigate('/app/upgrade');
                  } else {
                    soundEffects.playClick();
                    setPracticeTestOpen(test.number);
                  }
                }}
                style={{
                  ...(isLocked ? { opacity: 0.6, cursor: 'pointer' } : isCompleted ? { opacity: 0.7 } : {}),
                  position: 'relative'
                }}
              >
                {/* Completed badge - positioned absolutely */}
                {isCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '0.875rem',
                    right: '0.875rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.6875rem',
                    fontWeight: '600',
                    color: '#10b981',
                    background: '#f0fdf4',
                    padding: '0.1875rem 0.5rem',
                    borderRadius: '999px',
                    border: '1px solid #86efac',
                    zIndex: 1
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Completed
                  </div>
                )}
                <div>
                  <div className={classes.testIcon}>
                    {isLocked ? <HiLockClosed /> : test.icon}
                  </div>
                  <h3 className={classes.testTitle}>
                    {test.title}
                    {isLocked && <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#3b82f6' }}>Pro</span>}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Section-Specific Practice</h2>
        </div>
        <div className={classes.testsGrid}>
          {sectionTests.map((test, index) => (
            <div
              key={index}
              className={`${classes.testCard} ${test.disabled ? 'disabled' : ''}`}
            >
              <div>
                <div className={classes.testIcon}>{test.icon}</div>
                <h3 className={classes.testTitle}>{test.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Preview Modal */}
      {previewTest && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
        onClick={() => setPreviewTest(null)}
        >
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewTest(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: '#6b7280',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1
              }}
            >
              ×
            </button>

            <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', paddingRight: '2rem' }}>
              Full ACT Practice Test {previewTest.displayNumber}
            </h2>

            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              background: '#eff6ff',
              color: '#1e40af'
            }}>
              FULL LENGTH TEST
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                <strong>Format:</strong> Complete ACT simulation
              </p>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                <strong>Total Questions:</strong> 215 questions
              </p>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                <strong>Total Time:</strong> 175 minutes (2 hours 55 minutes)
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                Test Sections:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6b7280' }}>
                  <span>English</span>
                  <span>75 questions • 45 min</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6b7280' }}>
                  <span>Math</span>
                  <span>60 questions • 60 min</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6b7280' }}>
                  <span>Reading</span>
                  <span>40 questions • 35 min</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6b7280' }}>
                  <span>Science</span>
                  <span>40 questions • 35 min</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button
                onClick={() => setPreviewTest(null)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  background: 'white',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPreviewTest(null);
                  setPracticeTestOpen(previewTest.number);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Retake Warning Modal */}
      {showDiagnosticWarning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={() => setShowDiagnosticWarning(false)}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            animation: 'scaleIn 0.3s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDiagnosticWarning(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: '#6b7280',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1,
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1f2937'}
              onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              ×
            </button>

            {/* Warning Icon */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fef2f2',
              margin: '0 auto 1.5rem'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            <h2 style={{
              margin: '0 0 1rem',
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1a1a1a',
              textAlign: 'center',
              letterSpacing: '-0.01em'
            }}>
              Retake Diagnostic Test?
            </h2>

            <div style={{
              padding: '1rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                margin: '0 0 0.75rem',
                fontSize: '0.875rem',
                color: '#991b1b',
                fontWeight: '600',
                lineHeight: '1.5'
              }}>
                ⚠️ Warning: This will reset your learning path
              </p>
              <p style={{
                margin: 0,
                fontSize: '0.8125rem',
                color: '#7f1d1d',
                lineHeight: '1.5'
              }}>
                Retaking the diagnostic test will create a new personalized learning path based on your latest results. Your previous diagnostic results and current learning path will be replaced.
              </p>
            </div>

            <div style={{
              marginBottom: '1.5rem',
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{
                margin: '0 0 0.5rem',
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                What will happen:
              </p>
              <ul style={{
                margin: 0,
                paddingLeft: '1.25rem',
                fontSize: '0.8125rem',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                <li>Your new diagnostic results will replace the old ones</li>
                <li>A fresh learning path will be generated</li>
                <li>Course recommendations will be updated</li>
                <li>Progress on your current path will be saved separately</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button
                onClick={() => {
                  setShowDiagnosticWarning(false);
                  setRetakeButtonClicked(false);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRetakeDiagnostic}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: retakeButtonClicked ? '#16a34a' : '#dc2626',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = retakeButtonClicked ? '#15803d' : '#b91c1c';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = retakeButtonClicked ? '#16a34a' : '#dc2626';
                }}
              >
                {retakeButtonClicked ? 'Click Again to Confirm' : 'Continue & Retake'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsContent;
