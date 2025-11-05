/**
 * Tests Content Component
 * Displays the practice tests grid with compact professional design
 */

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTestsContentStyles } from '../../styles/app/tests-content.styles';
import { HiClipboardDocumentList, HiClipboardDocumentCheck, HiPencilSquare, HiCalculator, HiBookOpen, HiBeaker } from 'react-icons/hi2';

const TestsContent = () => {
  const classes = useTestsContentStyles();
  const {
    setDiagnosticTestOpen,
    onTestOpen: setPracticeTestOpen
  } = useOutletContext();

  const practiceTests = [
    { number: 1, title: 'Practice Test 1', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 2, title: 'Practice Test 2', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 3, title: 'Practice Test 3', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 4, title: 'Practice Test 4', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 5, title: 'Practice Test 5', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 6, title: 'Practice Test 6', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' },
    { number: 7, title: 'Practice Test 7', icon: <HiClipboardDocumentList />, description: '215 questions • 175 minutes' }
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
        <h1 className={classes.pageTitle}>Practice Tests</h1>
        <p className={classes.subtitle}>Take full-length tests and track your progress</p>
      </div>
      <div className={classes.contentSection}>
        <div className={classes.testsGrid}>
          <div className={`${classes.testCard} ${classes.diagnosticCard}`} onClick={() => setDiagnosticTestOpen(true)}>
            <div className={classes.diagnosticInfo}>
              <div className={classes.diagnosticIcon}>
                <HiClipboardDocumentCheck />
              </div>
              <div className={classes.diagnosticTextContent}>
                <h2 className={classes.diagnosticTitle}>Diagnostic</h2>
                <p className={classes.diagnosticDescription}>Find your strengths</p>
              </div>
            </div>
            <button className={classes.diagnosticButton} onClick={(e) => { e.stopPropagation(); setDiagnosticTestOpen(true); }}>
              Start
            </button>
          </div>
        </div>

        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Full-Length Practice Tests</h2>
          <p className={classes.sectionDescription}>
            Complete ACT practice tests with all four sections
          </p>
        </div>
        <div className={classes.testsGrid}>
          {practiceTests.map(test => (
            <div
              key={test.number}
              className={classes.testCard}
              onClick={() => setPracticeTestOpen(test.number)}
            >
              <div>
                <div className={classes.testIcon}>{test.icon}</div>
                <h3 className={classes.testTitle}>{test.title}</h3>
              </div>
              <p className={classes.testDescription}>{test.description}</p>
            </div>
          ))}
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
