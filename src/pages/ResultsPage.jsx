/**
 * Results Dashboard Page
 * Displays test scores, progress trends, and weak areas analysis
 * Mobile-first design with responsive charts
 */

import React, { useState, useEffect } from 'react';
import { useResultsStyles } from '../styles/pages/results.styles';
import { useAuth } from '../contexts/AuthContext';
import { HiTrophy, HiChartBar, HiClipboardDocumentCheck, HiArrowTrendingUp } from 'react-icons/hi2';
import { supabase } from '../supabaseClient';

const ResultsPage = () => {
  const classes = useResultsStyles();
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
