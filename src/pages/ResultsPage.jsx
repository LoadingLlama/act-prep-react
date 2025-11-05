/**
 * Results Dashboard Page
 * Displays test scores, progress trends, and weak areas analysis
 * Mobile-first design with responsive charts
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useAuth } from '../contexts/AuthContext';
import { HiTrophy, HiChartBar, HiClipboardDocumentCheck, HiArrowTrendingUp } from 'react-icons/hi2';
import { supabase } from '../supabaseClient';

const useStyles = createUseStyles({
  resultsContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1400px',
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
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
    letterSpacing: '-0.04em',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#08245b',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.08)',
      transform: 'translateY(-2px)'
    }
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: '20px',
      height: '20px'
    },
    '&.score': {
      background: '#eff6ff',
      color: '#08245b'
    },
    '&.progress': {
      background: '#f0fdf4',
      color: '#16a34a'
    },
    '&.tests': {
      background: '#fef2f2',
      color: '#dc2626'
    },
    '&.trend': {
      background: '#fefce8',
      color: '#ca8a04'
    }
  },
  statLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  },
  statChange: {
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    '&.positive': {
      color: '#16a34a'
    },
    '&.negative': {
      color: '#dc2626'
    },
    '&.neutral': {
      color: '#64748b'
    }
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1rem',
    marginBottom: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    }
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  scoreHistory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  scoreEntry: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#08245b',
      background: '#ffffff'
    },
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  scoreInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  scoreTestName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  scoreDate: {
    fontSize: '0.8rem',
    color: '#64748b'
  },
  scoreValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#08245b',
    '@media (max-width: 640px)': {
      fontSize: '1.5rem'
    }
  },
  scoreBreakdown: {
    display: 'flex',
    gap: '0.5rem',
    '@media (max-width: 640px)': {
      width: '100%',
      flexWrap: 'wrap'
    }
  },
  sectionScore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    minWidth: '60px'
  },
  sectionLabel: {
    fontSize: '0.7rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  sectionValue: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a1a'
  },
  weakAreasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  weakAreaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px'
  },
  weakAreaInfo: {
    flex: 1
  },
  weakAreaTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#991b1b',
    marginBottom: '0.25rem'
  },
  weakAreaStats: {
    fontSize: '0.75rem',
    color: '#64748b'
  },
  weakAreaButton: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: '#b91c1c',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(220, 38, 38, 0.2)'
    },
    '&:active': {
      transform: 'scale(0.97)',
      boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)'
    }
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#64748b'
  },
  emptyStateIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: 0.5
  },
  emptyStateTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  emptyStateText: {
    fontSize: '0.95rem',
    marginBottom: '1.5rem'
  },
  ctaButton: {
    background: '#08245b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.875rem 1.75rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '48px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: '#0a2f73',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.2)'
    },
    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: '0 2px 6px rgba(8, 36, 91, 0.2)'
    }
  }
});

const ResultsPage = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState([]);
  const [stats, setStats] = useState({
    averageScore: 0,
    testsCompleted: 0,
    improvement: 0,
    completionRate: 0
  });

  useEffect(() => {
    loadResults();
  }, [user]);

  const loadResults = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // TODO: Load actual test results from database
      // For now, showing mock data
      const mockResults = [
        {
          id: 1,
          testName: 'Practice Test 1',
          date: '2025-11-01',
          composite: 28,
          sections: { english: 29, math: 27, reading: 28, science: 28 }
        },
        {
          id: 2,
          testName: 'Practice Test 2',
          date: '2025-11-03',
          composite: 30,
          sections: { english: 31, math: 29, reading: 30, science: 30 }
        },
        {
          id: 3,
          testName: 'Diagnostic Test',
          date: '2025-10-28',
          composite: 26,
          sections: { english: 27, math: 25, reading: 26, science: 26 }
        }
      ];

      setTestResults(mockResults);

      // Calculate stats
      const avg = mockResults.reduce((sum, r) => sum + r.composite, 0) / mockResults.length;
      const first = mockResults[mockResults.length - 1].composite;
      const last = mockResults[0].composite;
      const improvement = ((last - first) / first * 100).toFixed(1);

      setStats({
        averageScore: avg.toFixed(1),
        testsCompleted: mockResults.length,
        improvement: improvement,
        completionRate: 85 // Mock data
      });
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const weakAreas = [
    { topic: 'Math - Geometry', accuracy: '65%', questions: 12 },
    { topic: 'Reading - Inference Questions', accuracy: '70%', questions: 8 },
    { topic: 'Science - Data Interpretation', accuracy: '68%', questions: 10 }
  ];

  if (loading) {
    return (
      <div className={classes.resultsContainer}>
        <div className={classes.emptyState}>
          <div className={classes.emptyStateTitle}>Loading results...</div>
        </div>
      </div>
    );
  }

  if (testResults.length === 0) {
    return (
      <div className={classes.resultsContainer}>
        <div className={classes.pageHeader}>
          <h1 className={classes.pageTitle}>Results</h1>
          <p className={classes.pageSubtitle}>Track your progress and identify areas for improvement</p>
        </div>

        <div className={classes.card}>
          <div className={classes.emptyState}>
            <div className={classes.emptyStateIcon}>📊</div>
            <h2 className={classes.emptyStateTitle}>No Test Results Yet</h2>
            <p className={classes.emptyStateText}>
              Complete your first practice test to see your results and track your progress!
            </p>
            <button className={classes.ctaButton} onClick={() => window.location.href = '/app/tests'}>
              Take a Practice Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.resultsContainer}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Results</h1>
        <p className={classes.pageSubtitle}>Track your progress and identify areas for improvement</p>
      </div>

      {/* Stats Overview */}
      <div className={classes.statsGrid}>
        <div className={classes.statCard}>
          <div className={classes.statHeader}>
            <div className={`${classes.statIcon} score`}>
              <HiTrophy />
            </div>
            <div className={classes.statLabel}>Average Score</div>
          </div>
          <div className={classes.statValue}>{stats.averageScore}</div>
          <div className={`${classes.statChange} positive`}>
            ↑ +{stats.improvement}% improvement
          </div>
        </div>

        <div className={classes.statCard}>
          <div className={classes.statHeader}>
            <div className={`${classes.statIcon} progress`}>
              <HiChartBar />
            </div>
            <div className={classes.statLabel}>Completion Rate</div>
          </div>
          <div className={classes.statValue}>{stats.completionRate}%</div>
          <div className={`${classes.statChange} positive`}>
            Above average
          </div>
        </div>

        <div className={classes.statCard}>
          <div className={classes.statHeader}>
            <div className={`${classes.statIcon} tests`}>
              <HiClipboardDocumentCheck />
            </div>
            <div className={classes.statLabel}>Tests Completed</div>
          </div>
          <div className={classes.statValue}>{stats.testsCompleted}</div>
          <div className={`${classes.statChange} neutral`}>
            Full-length tests
          </div>
        </div>

        <div className={classes.statCard}>
          <div className={classes.statHeader}>
            <div className={`${classes.statIcon} trend`}>
              <HiArrowTrendingUp />
            </div>
            <div className={classes.statLabel}>Latest Score</div>
          </div>
          <div className={classes.statValue}>{testResults[0].composite}</div>
          <div className={`${classes.statChange} positive`}>
            +2 from previous
          </div>
        </div>
      </div>

      {/* Score History & Weak Areas */}
      <div className={classes.contentGrid}>
        {/* Score History */}
        <div className={classes.card}>
          <h2 className={classes.cardTitle}>Score History</h2>
          <div className={classes.scoreHistory}>
            {testResults.map((result) => (
              <div key={result.id} className={classes.scoreEntry}>
                <div className={classes.scoreInfo}>
                  <div className={classes.scoreTestName}>{result.testName}</div>
                  <div className={classes.scoreDate}>
                    {new Date(result.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className={classes.scoreValue}>{result.composite}</div>
                <div className={classes.scoreBreakdown}>
                  <div className={classes.sectionScore}>
                    <div className={classes.sectionLabel}>Eng</div>
                    <div className={classes.sectionValue}>{result.sections.english}</div>
                  </div>
                  <div className={classes.sectionScore}>
                    <div className={classes.sectionLabel}>Math</div>
                    <div className={classes.sectionValue}>{result.sections.math}</div>
                  </div>
                  <div className={classes.sectionScore}>
                    <div className={classes.sectionLabel}>Read</div>
                    <div className={classes.sectionValue}>{result.sections.reading}</div>
                  </div>
                  <div className={classes.sectionScore}>
                    <div className={classes.sectionLabel}>Sci</div>
                    <div className={classes.sectionValue}>{result.sections.science}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className={classes.card}>
          <h2 className={classes.cardTitle}>Focus Areas</h2>
          <div className={classes.weakAreasList}>
            {weakAreas.map((area, index) => (
              <div key={index} className={classes.weakAreaItem}>
                <div className={classes.weakAreaInfo}>
                  <div className={classes.weakAreaTitle}>{area.topic}</div>
                  <div className={classes.weakAreaStats}>
                    {area.accuracy} accuracy • {area.questions} questions
                  </div>
                </div>
                <button className={classes.weakAreaButton}>Practice</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
