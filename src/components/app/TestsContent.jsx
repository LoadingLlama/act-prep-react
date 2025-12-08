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
    // Load from cache for instant rendering
    try {
      const cached = localStorage.getItem(`completedTests_${user?.id}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Cache valid for 5 minutes
        if (Date.now() - timestamp < 300000) {
          console.log('✅ Using cached completed tests');
          return new Set(data);
        }
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

      // Cache the results
      try {
        localStorage.setItem(`completedTests_${user.id}`, JSON.stringify({
          data: Array.from(completed),
          timestamp: Date.now()
        }));
        console.log('✅ Cached completed tests to localStorage');
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
  }, [user, checkFeatureAccess, checkDiagnosticStatus, checkCompletedTests]);

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

  return (
    <div className={classes.testsContainer}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Tests</h1>
      </div>
      <div className={classes.contentSection}>
        {/* Only show diagnostic CTA if user hasn't completed it (and status is loaded) */}
        {hasCompletedDiagnostic === false && !localStorage.getItem('diagnosticProcessing') && (
          <DiagnosticTestCTA onClick={() => {
            soundEffects.playSuccess();
            setDiagnosticTestOpen(true);
          }} />
        )}

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
    </div>
  );
};

export default TestsContent;
