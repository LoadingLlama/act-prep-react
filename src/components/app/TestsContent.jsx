/**
 * Tests Content Component
 * Displays the practice tests grid with compact professional design
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import { HiClipboardDocumentList, HiClipboardDocumentCheck, HiPencilSquare, HiCalculator, HiBookOpen, HiBeaker } from 'react-icons/hi2';

const useStyles = createUseStyles({
  testsContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1400px'
  },
  pageHeader: {
    padding: '0',
    marginBottom: '2rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000000',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  contentSection: {
    padding: '0'
  },
  sectionHeader: {
    marginBottom: '0.75rem'
  },
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.35rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  sectionDescription: {
    fontSize: '0.875rem',
    color: '#64748b'
  },
  testsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  },
  testCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      borderColor: '#08245b',
      boxShadow: '0 4px 12px rgba(0, 24, 69, 0.08)',
      transform: 'translateY(-2px)'
    },
    '&.disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      '&:hover': {
        transform: 'none',
        boxShadow: 'none',
        borderColor: '#e2e8f0'
      }
    }
  },
  testIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    background: '#08245b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
    color: '#ffffff',
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  testTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#08245b',
    marginBottom: '0.5rem'
  },
  testDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    lineHeight: '1.5'
  },
  diagnosticCard: {
    background: 'linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)',
    gridColumn: 'span 3',
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    gap: '1.25rem',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    '&:hover': {
      borderColor: '#fca5a5',
      boxShadow: '0 2px 12px rgba(220, 38, 38, 0.08)'
    }
  },
  diagnosticInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    flex: 1
  },
  diagnosticTextContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.25rem'
  },
  diagnosticIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    background: '#dc2626',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0,
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  diagnosticTitle: {
    fontSize: '1.15rem',
    fontWeight: '600',
    color: '#991b1b',
    marginBottom: '0'
  },
  diagnosticDescription: {
    fontSize: '0.85rem',
    color: '#6b7280',
    lineHeight: '1.4'
  },
  diagnosticButton: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.65rem 1.5rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
      background: '#b91c1c'
    }
  }
});

const TestsContent = ({ setDiagnosticTestOpen, setPracticeTestOpen }) => {
  const classes = useStyles();

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
