/**
 * Insights Page
 * Displays comprehensive test results and performance insights
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { HiChartBar, HiAcademicCap, HiTrophy, HiExclamationTriangle, HiArrowTrendingUp, HiClipboardDocumentCheck } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import InsightsService from '../services/api/insights.service';
import logger from '../services/logging/logger';

const useStyles = createUseStyles({
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    lineHeight: '1.5'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '1rem'
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #08245b',
    borderRadius: '50%',
    animation: '$spin 0.8s linear infinite'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  emptyStateIcon: {
    fontSize: '4rem',
    color: '#d1d5db',
    marginBottom: '1rem'
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  emptyStateText: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2rem'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  sectionIcon: {
    fontSize: '1.5rem',
    color: '#08245b'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  card: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-2px)'
    }
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  cardTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  cardValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#08245b',
    lineHeight: '1'
  },
  cardSubtext: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.5rem'
  },
  diagnosticCard: {
    background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
    border: '1px solid #fee2e2',
    padding: '2rem'
  },
  diagnosticScore: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#b91c1c',
    lineHeight: '1',
    marginBottom: '0.5rem'
  },
  diagnosticLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  diagnosticDate: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    marginTop: '0.5rem'
  },
  sectionBreakdown: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  sectionItem: {
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  sectionName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
    marginBottom: '0.5rem'
  },
  sectionScore: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#08245b'
  },
  sectionDetails: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.25rem'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.75rem'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #08245b 0%, #3b82f6 100%)',
    transition: 'width 0.3s ease'
  },
  weakAreasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  weakAreaItem: {
    padding: '1rem',
    background: '#fef2f2',
    borderRadius: '8px',
    border: '1px solid #fee2e2',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weakAreaName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  weakAreaAccuracy: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#dc2626',
    padding: '0.25rem 0.75rem',
    background: '#ffffff',
    borderRadius: '6px'
  },
  strengthsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  strengthItem: {
    padding: '1rem',
    background: '#f0fdf4',
    borderRadius: '8px',
    border: '1px solid #bbf7d0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  strengthName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  strengthAccuracy: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#16a34a',
    padding: '0.25rem 0.75rem',
    background: '#ffffff',
    borderRadius: '6px'
  },
  learningPathCard: {
    gridColumn: '1 / -1'
  },
  pathStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  pathStatItem: {
    padding: '1.25rem',
    background: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  pathStatValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#08245b',
    marginBottom: '0.25rem'
  },
  pathStatLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  }
});

const InsightsPage = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [strengths, setStrengths] = useState([]);

  useEffect(() => {
    if (user) {
      loadInsights();
    }
  }, [user]);

  const loadInsights = async () => {
    try {
      setLoading(true);
      logger.info('InsightsPage', 'loadInsights', { userId: user.id });

      const [insightsData, weakAreasData, strengthsData] = await Promise.all([
        InsightsService.getUserInsights(user.id),
        InsightsService.getWeakAreas(user.id),
        InsightsService.getStrengths(user.id)
      ]);

      setInsights(insightsData);
      setWeakAreas(weakAreasData);
      setStrengths(strengthsData);

      logger.info('InsightsPage', 'loadInsightsComplete', {
        hasDiagnostic: insightsData.diagnostic.hasCompletedDiagnostic,
        lessonPerformanceCount: insightsData.lessonPerformance.length,
        weakAreasCount: weakAreasData.length
      });
    } catch (error) {
      logger.error('InsightsPage', 'loadInsightsFailed', { error });
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return '#16a34a';
    if (accuracy >= 60) return '#f59e0b';
    return '#dc2626';
  };

  if (loading) {
    return (
      <div className={classes.container}>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner} />
          <div style={{ color: '#6b7280', fontSize: '1rem' }}>Loading your insights...</div>
        </div>
      </div>
    );
  }

  const hasAnyData = insights?.diagnostic?.hasCompletedDiagnostic ||
    insights?.lessonPerformance?.length > 0 ||
    insights?.learningPath?.hasLearningPath;

  if (!hasAnyData) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>Test Insights</h1>
          <p className={classes.subtitle}>Track your progress and identify areas for improvement</p>
        </div>
        <div className={classes.emptyState}>
          <div className={classes.emptyStateIcon}>
            <HiChartBar />
          </div>
          <h2 className={classes.emptyStateTitle}>No insights yet</h2>
          <p className={classes.emptyStateText}>
            Complete the diagnostic test or practice some lessons to see your insights here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>Test Insights</h1>
        <p className={classes.subtitle}>Track your progress and identify areas for improvement</p>
      </div>

      {/* Diagnostic Test Results */}
      {insights.diagnostic.hasCompletedDiagnostic && (
        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            <HiClipboardDocumentCheck className={classes.sectionIcon} />
            Diagnostic Test Results
          </h2>
          <div className={classes.grid}>
            <div className={`${classes.card} ${classes.diagnosticCard}`}>
              <div className={classes.diagnosticScore}>
                {insights.diagnostic.latestScore?.toFixed(1)}%
              </div>
              <div className={classes.diagnosticLabel}>Overall Score</div>
              <div className={classes.diagnosticDate}>
                Completed {formatDate(insights.diagnostic.completedAt)}
              </div>
              <div className={classes.cardSubtext}>
                {insights.diagnostic.correctAnswers} out of {insights.diagnostic.totalQuestions} questions correct
              </div>
            </div>

            <div className={classes.card}>
              <div className={classes.cardHeader}>
                <div className={classes.cardTitle}>Section Breakdown</div>
              </div>
              <div className={classes.sectionBreakdown}>
                {insights.diagnostic.sectionBreakdown?.map((section) => (
                  <div key={section.section} className={classes.sectionItem}>
                    <div className={classes.sectionName}>{section.section}</div>
                    <div className={classes.sectionScore} style={{ color: getAccuracyColor(section.accuracy) }}>
                      {section.accuracy.toFixed(0)}%
                    </div>
                    <div className={classes.sectionDetails}>
                      {section.correct}/{section.total} correct
                    </div>
                    <div className={classes.progressBar}>
                      <div
                        className={classes.progressFill}
                        style={{
                          width: `${section.accuracy}%`,
                          background: getAccuracyColor(section.accuracy)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Path Progress */}
      {insights.learningPath.hasLearningPath && (
        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            <HiArrowTrendingUp className={classes.sectionIcon} />
            Learning Path Progress
          </h2>
          <div className={classes.grid}>
            <div className={`${classes.card} ${classes.learningPathCard}`}>
              <div className={classes.cardTitle}>Your Study Plan</div>
              <div className={classes.pathStats}>
                <div className={classes.pathStatItem}>
                  <div className={classes.pathStatValue}>
                    {insights.learningPath.stats.completionPercentage.toFixed(0)}%
                  </div>
                  <div className={classes.pathStatLabel}>Complete</div>
                </div>
                <div className={classes.pathStatItem}>
                  <div className={classes.pathStatValue}>
                    {insights.learningPath.stats.completed}
                  </div>
                  <div className={classes.pathStatLabel}>Lessons Completed</div>
                </div>
                <div className={classes.pathStatItem}>
                  <div className={classes.pathStatValue}>
                    {insights.learningPath.stats.inProgress}
                  </div>
                  <div className={classes.pathStatLabel}>In Progress</div>
                </div>
                <div className={classes.pathStatItem}>
                  <div className={classes.pathStatValue}>
                    {insights.learningPath.stats.pending}
                  </div>
                  <div className={classes.pathStatLabel}>Remaining</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weak Areas and Strengths */}
      <div className={classes.section}>
        <div className={classes.grid}>
          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <div className={classes.card}>
              <h3 className={classes.sectionTitle}>
                <HiExclamationTriangle className={classes.sectionIcon} style={{ color: '#dc2626' }} />
                Areas to Improve
              </h3>
              <div className={classes.weakAreasList}>
                {weakAreas.slice(0, 5).map((area) => (
                  <div key={area.id} className={classes.weakAreaItem}>
                    <div className={classes.weakAreaName}>
                      {area.lesson_id.replace(/-/g, ' ')}
                    </div>
                    <div className={classes.weakAreaAccuracy}>
                      {area.accuracy_percentage?.toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {strengths.length > 0 && (
            <div className={classes.card}>
              <h3 className={classes.sectionTitle}>
                <HiTrophy className={classes.sectionIcon} style={{ color: '#16a34a' }} />
                Your Strengths
              </h3>
              <div className={classes.strengthsList}>
                {strengths.slice(0, 5).map((strength) => (
                  <div key={strength.id} className={classes.strengthItem}>
                    <div className={classes.strengthName}>
                      {strength.lesson_id.replace(/-/g, ' ')}
                    </div>
                    <div className={classes.strengthAccuracy}>
                      {strength.accuracy_percentage?.toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overall Stats */}
      {insights.lessonPerformance.length > 0 && (
        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            <HiAcademicCap className={classes.sectionIcon} />
            Overall Performance
          </h2>
          <div className={classes.grid}>
            <div className={classes.card}>
              <div className={classes.cardTitle}>Total Questions</div>
              <div className={classes.cardValue}>
                {insights.lessonPerformance.reduce((sum, perf) => sum + perf.total_questions_attempted, 0)}
              </div>
              <div className={classes.cardSubtext}>
                Across all lessons
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes.cardTitle}>Average Accuracy</div>
              <div className={classes.cardValue}>
                {(insights.lessonPerformance.reduce((sum, perf) => sum + perf.accuracy_percentage, 0) /
                  insights.lessonPerformance.length).toFixed(0)}%
              </div>
              <div className={classes.cardSubtext}>
                Across {insights.lessonPerformance.length} lessons
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes.cardTitle}>Study Time</div>
              <div className={classes.cardValue}>
                {Math.floor(
                  insights.lessonPerformance.reduce((sum, perf) => sum + perf.total_time_spent_seconds, 0) / 3600
                )}h
              </div>
              <div className={classes.cardSubtext}>
                Total time invested
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
