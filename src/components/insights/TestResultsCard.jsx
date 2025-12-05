/**
 * Test Results Card Component
 * Unified display for both Diagnostic and Practice Test results
 * Shows ACT composite score and section breakdown in consistent format
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import { convertToACTScore, calculateComposite } from '../../utils/actScoreConversion';

const useStyles = createUseStyles({
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem 0.875rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    maxWidth: '500px',
    '@media (max-width: 640px)': {
      padding: '0.625rem 0.75rem',
      borderRadius: '5px'
    },
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#cbd5e1',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
    }
  },
  header: {
    marginBottom: '0.5rem'
  },
  title: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.125rem',
    '@media (max-width: 640px)': {
      fontSize: '0.6875rem'
    }
  },
  meta: {
    fontSize: '0.625rem',
    color: '#9ca3af',
    marginBottom: '0',
    '@media (max-width: 640px)': {
      fontSize: '0.6rem'
    }
  },
  compositeSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '0.5rem',
    borderTop: '1px solid #f1f5f9',
    '@media (max-width: 640px)': {
      paddingTop: '0.4rem'
    }
  },
  compositeLabel: {
    fontSize: '0.625rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    '@media (max-width: 640px)': {
      fontSize: '0.6rem'
    }
  },
  compositeScore: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#08245b',
    lineHeight: '1',
    '@media (max-width: 640px)': {
      fontSize: '1rem'
    }
  },
  compositeSubtext: {
    fontSize: '0.625rem',
    color: '#94a3b8',
    marginTop: '0.125rem',
    '@media (max-width: 640px)': {
      fontSize: '0.6rem'
    }
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
    '@media (max-width: 640px)': {
      gap: '0.4rem'
    }
  },
  sectionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 640px)': {
      gap: '0.5rem'
    }
  },
  sectionName: {
    fontSize: '0.6875rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'capitalize',
    '@media (max-width: 640px)': {
      fontSize: '0.65rem'
    }
  },
  sectionScore: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#08245b',
    lineHeight: '1',
    '@media (max-width: 640px)': {
      fontSize: '0.9375rem'
    }
  },
  sectionDetails: {
    fontSize: '0.6rem',
    color: '#94a3b8',
    marginTop: '0.0625rem',
    '@media (max-width: 640px)': {
      fontSize: '0.5625rem'
    }
  },
  sectionLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem'
  },
  sectionRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.125rem'
  },
  diagnosticBadge: {
    display: 'inline-block',
    padding: '0.125rem 0.4rem',
    borderRadius: '3px',
    fontSize: '0.5625rem',
    fontWeight: '600',
    background: '#fef2f2',
    color: '#b91c1c',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem'
  },
  practiceTestBadge: {
    display: 'inline-block',
    padding: '0.125rem 0.4rem',
    borderRadius: '3px',
    fontSize: '0.5625rem',
    fontWeight: '600',
    background: '#eff6ff',
    color: '#1e40af',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem'
  }
});

/**
 * Calculate section scores from practice test session data
 * @param {Object} sessionData - Practice test session with correct_answers count or full results
 * @returns {Array} Array of {section, correct, total, actScore, percentage}
 */
function calculatePracticeTestSections(sessionData) {
  // For practice tests, we need to calculate scores for each section
  // The session data should have the breakdown

  const sections = [
    { name: 'english', total: 75 },
    { name: 'math', total: 60 },
    { name: 'reading', total: 40 },
    { name: 'science', total: 40 }
  ];

  // If we have section_scores object with breakdown
  if (sessionData.section_scores) {
    return sections.map(({ name, total }) => {
      const sectionData = sessionData.section_scores[name] || {};
      const correct = sectionData.correct || 0;
      const actScore = convertToACTScore(name, correct);
      return {
        section: name,
        correct,
        total,
        actScore,
        percentage: ((correct / total) * 100).toFixed(1)
      };
    });
  }

  // Fallback: distribute total score evenly (not ideal but better than nothing)
  // This assumes we only have overall correct_answers
  const overallPercentage = sessionData.score_percentage || 0;

  return sections.map(({ name, total }) => {
    const correct = Math.round((overallPercentage / 100) * total);
    const actScore = convertToACTScore(name, correct);
    return {
      section: name,
      correct,
      total,
      actScore,
      percentage: ((correct / total) * 100).toFixed(1)
    };
  });
}

/**
 * Calculate section scores from diagnostic test data
 * @param {Object} diagnosticData - Diagnostic test data with section results
 * @returns {Array} Array of {section, correct, total, actScore, percentage}
 */
function calculateDiagnosticSections(diagnosticData) {
  // Diagnostic data already has section breakdown
  if (!diagnosticData.sectionResults || diagnosticData.sectionResults.length === 0) {
    console.warn('⚠️ No sectionResults found in diagnostic data, returning empty array');
    console.log('   Available fields:', Object.keys(diagnosticData));
    return [];
  }

  return diagnosticData.sectionResults.map(section => {
    const actScore = convertToACTScore(section.section, section.correct);
    return {
      section: section.section,
      correct: section.correct,
      total: section.total,
      actScore,
      percentage: ((section.correct / section.total) * 100).toFixed(1)
    };
  });
}

/**
 * TestResultsCard Component
 * @param {string} type - 'diagnostic' or 'practice'
 * @param {Object} testData - Test data object
 * @param {Function} onClick - Click handler to view detailed results
 */
const TestResultsCard = ({ type, testData, onClick }) => {
  const classes = useStyles();

  if (!testData) return null;

  console.log('🎴 TestResultsCard rendering:', {
    type,
    testData: {
      sectionResults: testData.sectionResults,
      totalQuestions: testData.totalQuestions,
      correctAnswers: testData.correctAnswers,
      completedAt: testData.completedAt
    }
  });

  // Calculate section scores based on test type
  const sections = type === 'diagnostic'
    ? calculateDiagnosticSections(testData)
    : calculatePracticeTestSections(testData);

  console.log('📊 Calculated sections:', sections);

  // Calculate composite ACT score
  const actScores = {};
  sections.forEach(s => {
    actScores[s.section] = s.actScore;
  });
  const compositeScore = calculateComposite(actScores);

  // Calculate totals
  let totalCorrect = sections.reduce((sum, s) => sum + s.correct, 0);
  let totalQuestions = sections.reduce((sum, s) => sum + s.total, 0);

  // Fallback: If sections are empty but we have totalQuestions/correctAnswers in testData, use those
  if (totalQuestions === 0 && type === 'diagnostic' && testData.totalQuestions) {
    console.warn('⚠️ Using fallback totalQuestions from testData');
    totalQuestions = testData.totalQuestions || 0;
    totalCorrect = testData.correctAnswers || 0;
  }

  const overallPercentage = totalQuestions > 0
    ? ((totalCorrect / totalQuestions) * 100).toFixed(1)
    : '0.0';

  console.log('📈 Score calculation:', {
    totalCorrect,
    totalQuestions,
    overallPercentage,
    compositeScore,
    isNaN: isNaN(compositeScore)
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get test title
  const testTitle = type === 'diagnostic'
    ? 'Diagnostic Test'
    : testData.test_name || `Practice Test ${testData.test_number - 1}`;

  const completedDate = type === 'diagnostic'
    ? testData.completedAt
    : testData.created_at || testData.completed_at;

  return (
    <div className={classes.card} onClick={onClick}>
      {/* Badge */}
      <div className={type === 'diagnostic' ? classes.diagnosticBadge : classes.practiceTestBadge}>
        {type === 'diagnostic' ? 'DIAGNOSTIC' : 'PRACTICE TEST'}
      </div>

      {/* Header */}
      <div className={classes.header}>
        <h3 className={classes.title}>{testTitle}</h3>
        <p className={classes.meta}>
          Completed {formatDate(completedDate)}
        </p>
      </div>

      {/* Composite Score - Compact */}
      <div className={classes.compositeSection}>
        <div>
          <div className={classes.compositeLabel}>Score</div>
          <div className={classes.compositeSubtext}>
            {totalCorrect}/{totalQuestions}
          </div>
        </div>
        <div className={classes.compositeScore}>{compositeScore}</div>
      </div>
    </div>
  );
};

export default TestResultsCard;
