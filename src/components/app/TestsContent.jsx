/**
 * Tests Content Component
 * Displays the practice tests grid with compact professional design
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTestsContentStyles } from '../../styles/app/tests-content.styles';
import { HiClipboardDocumentList, HiPencilSquare, HiCalculator, HiBookOpen, HiBeaker, HiDocumentText, HiLockClosed } from 'react-icons/hi2';
import { getFeatureAccess } from '../../services/subscription.service';
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

  useEffect(() => {
    if (user) {
      checkFeatureAccess();
    }
  }, [user]);

  const checkFeatureAccess = async () => {
    try {
      const access = await getFeatureAccess(user.id);
      setFeatureAccess(access);
    } catch (error) {
      console.error('Error checking feature access:', error);
    }
  };

  // Note: Test 1 in database is the Diagnostic Test, so practice tests start at 2
  const practiceTests = [
    { number: 2, displayNumber: 1, title: 'Test 1', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 3, displayNumber: 2, title: 'Test 2', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 4, displayNumber: 3, title: 'Test 3', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 5, displayNumber: 4, title: 'Test 4', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 6, displayNumber: 5, title: 'Test 5', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 7, displayNumber: 6, title: 'Test 6', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' }
  ];

  const sectionTests = [
    { title: 'English Practice', icon: <HiPencilSquare />, description: 'Coming soon', disabled: true },
    { title: 'Math Practice', icon: <HiCalculator />, description: 'Coming soon', disabled: true },
    { title: 'Reading Practice', icon: <HiBookOpen />, description: 'Coming soon', disabled: true },
    { title: 'Science Practice', icon: <HiBeaker />, description: 'Coming soon', disabled: true }
  ];

  return (
    <div className={classes.testsContainer}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Tests</h1>
        <p className={classes.subtitle}>Take full-length tests and track your progress</p>
      </div>
      <div className={classes.contentSection}>
        <DiagnosticTestCTA onClick={() => {
          soundEffects.playSuccess();
          setDiagnosticTestOpen(true);
        }} />

        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Full-Length Tests</h2>
          <p className={classes.sectionDescription}>
            Complete ACT tests with all four sections
          </p>
        </div>
        <div className={classes.testsGrid}>
          {practiceTests.map(test => {
            // Use displayNumber for access check (Test 1 display = 1st practice test available)
            const isLocked = featureAccess && !featureAccess.isPro && test.displayNumber > featureAccess.practiceTests;

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
                    setPracticeTestOpen(test.number); // Pass actual DB test number (2-7)
                  }
                }}
                style={isLocked ? { opacity: 0.6, cursor: 'pointer' } : {}}
              >
                <div>
                  <div className={classes.testIcon}>
                    {isLocked ? <HiLockClosed /> : test.icon}
                  </div>
                  <h3 className={classes.testTitle}>
                    {test.title}
                    {isLocked && <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#3b82f6' }}>Pro</span>}
                  </h3>
                </div>
                <p className={classes.testDescription}>
                  {isLocked ? 'Upgrade to unlock' : test.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Section-Specific Practice</h2>
          <p className={classes.sectionDescription}>
            Focus on individual sections to target your practice
          </p>
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
              <p className={classes.testDescription}>{test.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestsContent;
