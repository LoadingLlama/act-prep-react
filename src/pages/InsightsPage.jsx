/**
 * Insights Page
 * Displays comprehensive test results and performance insights
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { HiChartBar, HiAcademicCap, HiTrophy, HiExclamationTriangle, HiArrowTrendingUp, HiClipboardDocumentCheck, HiLockClosed, HiRocketLaunch, HiClipboardDocumentList } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import InsightsService from '../services/api/insights.service';
import { supabase } from '../services/api/supabase.service';
import { getFeatureAccess } from '../services/subscription.service';
import logger from '../services/logging/logger';
import DiagnosticTestCTA from '../components/DiagnosticTestCTA';
import DiagnosticTestReview from '../components/DiagnosticTestReview';
import { lessonStructure } from '../data/lessonStructure';

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
  diagnosticSection: {
    maxWidth: '400px', // Compact width like a test card
    marginBottom: '2rem'
  },
  diagnosticCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderLeft: '3px solid #fee2e2',
    borderRadius: '8px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#cbd5e1',
      borderLeftColor: '#b91c1c',
      boxShadow: '0 6px 16px rgba(185, 28, 28, 0.15)',
      transform: 'translateY(-3px)'
    }
  },
  diagnosticBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.7rem',
    fontWeight: '700',
    background: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fee2e2',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  diagnosticCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  diagnosticIcon: {
    fontSize: '1.75rem',
    color: '#b91c1c'
  },
  diagnosticTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.35rem'
  },
  diagnosticMeta: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginBottom: '1rem'
  },
  diagnosticScore: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#b91c1c',
    lineHeight: '1',
    marginBottom: '0.5rem'
  },
  diagnosticScoreLabel: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginBottom: '1rem'
  },
  diagnosticButton: {
    width: '100%',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(185, 28, 28, 0.2)'
    }
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
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#fee2e2',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
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
  },
  lockedCard: {
    position: 'relative',
    opacity: 0.6,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '12px',
      pointerEvents: 'none'
    }
  },
  lockBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#3b82f6',
    color: '#ffffff',
    padding: '0.35rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    zIndex: 1,
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
  },
  upgradePrompt: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '2px solid #3b82f6',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center'
    }
  },
  upgradePromptContent: {
    flex: 1
  },
  upgradePromptTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '0.35rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  upgradePromptText: {
    fontSize: '0.875rem',
    color: '#1e40af',
    lineHeight: '1.5'
  },
  upgradeButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'linear-gradient(135deg, #08245b 0%, #3b82f6 100%)',
    color: '#ffffff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(8, 36, 91, 0.3)'
    }
  }
});

const InsightsPage = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const { setDiagnosticTestOpen } = outletContext || {};
  const [insights, setInsights] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [featureAccess, setFeatureAccess] = useState(null);
  const [viewingDiagnosticReview, setViewingDiagnosticReview] = useState(false);
  const [lessonMetadataMap, setLessonMetadataMap] = useState({});

  useEffect(() => {
    if (user) {
      loadInsights();
      checkFeatureAccess();
    }
  }, [user]);

  // Poll for diagnostic completion when processing
  useEffect(() => {
    if (user && localStorage.getItem('diagnosticProcessing')) {
      const pollInterval = setInterval(async () => {
        console.log('🔄 Polling for diagnostic completion...');
        await loadInsights();

        // Check if processing is complete
        if (insights?.diagnostic?.hasCompletedDiagnostic) {
          console.log('✅ Diagnostic processing complete!');
          localStorage.removeItem('diagnosticProcessing');
          clearInterval(pollInterval);
        }
      }, 3000);

      return () => clearInterval(pollInterval);
    }
  }, [user, insights?.diagnostic?.hasCompletedDiagnostic]);

  const checkFeatureAccess = async () => {
    try {
      const access = await getFeatureAccess(user.id);
      setFeatureAccess(access);
    } catch (error) {
      logger.error('InsightsPage', 'checkFeatureAccess', { error: error.message });
    }
  };

  const loadInsights = async () => {
    try {
      logger.info('InsightsPage', 'loadInsights', { userId: user.id });

      // Load insights data
      const insightsData = await InsightsService.getUserInsights(user.id);

      // Get the diagnostic session to analyze
      const diagnosticSession = insightsData.diagnostic?.latestSession;

      if (diagnosticSession) {
        console.log('📊 Analyzing diagnostic test results for weak areas...');

        // Get all question results from the diagnostic
        const { data: questionResults, error: resultsError } = await supabase
          .from('diagnostic_test_results')
          .select('*')
          .eq('diagnostic_session_id', diagnosticSession.id);

        if (!resultsError && questionResults) {
          console.log(`   Found ${questionResults.length} question results`);

          // Get question details to map to lessons
          const questionIds = questionResults.map(r => r.question_id);
          const sections = ['english', 'math', 'reading', 'science'];
          const questionMap = new Map();
          const lessonIdToTitleMap = new Map();

          // Fetch question details from all sections
          for (const section of sections) {
            const { data: questions } = await supabase
              .from(`practice_test_${section}_questions`)
              .select('id, lesson_id, chapter')
              .in('id', questionIds);

            if (questions) {
              questions.forEach(q => {
                questionMap.set(q.id, { lesson_id: q.lesson_id, chapter: q.chapter, section });
              });
            }
          }

          // Fetch lesson titles from the lessons table
          const uniqueLessonIds = [...new Set(
            Array.from(questionMap.values())
              .map(q => q.lesson_id)
              .filter(Boolean)
          )];

          if (uniqueLessonIds.length > 0) {
            const { data: lessons } = await supabase
              .from('lessons')
              .select('id, title, lesson_key, subject')
              .in('id', uniqueLessonIds);

            if (lessons) {
              lessons.forEach(lesson => {
                lessonIdToTitleMap.set(lesson.id, {
                  title: lesson.title,
                  lesson_key: lesson.lesson_key,
                  subject: lesson.subject
                });
              });
            }
          }

          console.log(`   Built mapping for ${lessonIdToTitleMap.size} lesson IDs to titles`);

          // Group results by lesson and calculate performance
          const lessonStats = {};

          questionResults.forEach(result => {
            const questionInfo = questionMap.get(result.question_id);
            if (!questionInfo?.lesson_id) return;

            const lessonId = questionInfo.lesson_id;
            if (!lessonStats[lessonId]) {
              const lessonInfo = lessonIdToTitleMap.get(lessonId);
              lessonStats[lessonId] = {
                lesson_id: lessonId,
                chapter: questionInfo.chapter,
                section: questionInfo.section,
                lesson_title: lessonInfo?.title,
                lesson_key: lessonInfo?.lesson_key,
                subject: lessonInfo?.subject,
                correct: 0,
                total: 0
              };
            }

            lessonStats[lessonId].total++;
            if (result.is_correct) {
              lessonStats[lessonId].correct++;
            }
          });

          // Calculate accuracy and find weak areas (< 60%)
          const weakAreasFromDiagnostic = Object.values(lessonStats)
            .map(stat => ({
              ...stat,
              accuracy: (stat.correct / stat.total) * 100
            }))
            .filter(stat => stat.accuracy < 60 && stat.total >= 2) // At least 2 questions
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 10);

          console.log(`   Found ${weakAreasFromDiagnostic.length} weak areas (< 60% accuracy)`);
          weakAreasFromDiagnostic.forEach(area => {
            console.log(`     - ${area.lesson_title || area.chapter}: ${area.accuracy.toFixed(0)}%`);
          });

          setWeakAreas(weakAreasFromDiagnostic);
          setStrengths([]); // We'll compute strengths later if needed
        }
      }

      setInsights(insightsData);

      logger.info('InsightsPage', 'loadInsightsComplete', {
        hasDiagnostic: insightsData.diagnostic.hasCompletedDiagnostic
      });
    } catch (error) {
      logger.error('InsightsPage', 'loadInsightsFailed', { error });
      console.error('Failed to load insights:', error);
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

  const getLessonTitle = (weakArea) => {
    // weakArea now has { lesson_id, chapter, section, accuracy, lesson_title }
    if (!weakArea) return 'Unknown Lesson';

    // First priority: use lesson_title from the database if available
    if (weakArea.lesson_title) {
      // Remove "Topic X.X - " prefix
      return weakArea.lesson_title.replace(/^Topic \d+\.\d+ - /, '');
    }

    // Second priority: try to map using chapter number
    const chapter = weakArea.chapter;
    if (!chapter) return 'Unknown Lesson';

    const chapterStr = chapter.toString().trim();

    // Try exact match on chapterNum
    let lesson = lessonStructure.find(l => l.chapterNum === chapterStr);

    // Try matching id
    if (!lesson) {
      lesson = lessonStructure.find(l => l.id === chapterStr);
    }

    // Handle "2, 3" format -> "2.3"
    if (!lesson && chapterStr.includes(',')) {
      const normalized = chapterStr.replace(/,\s*/g, '.');
      lesson = lessonStructure.find(l => l.chapterNum === normalized || l.id === normalized);
    }

    // Return lesson title if found
    if (lesson) {
      return lesson.title;
    }

    // Enhanced fallback: try to find category for broad chapter numbers
    if (weakArea.section === 'english') {
      const chapterNum = parseInt(chapterStr);
      if (!isNaN(chapterNum)) {
        // Find lessons that start with this chapter number
        const categoryLessons = lessonStructure.filter(l =>
          l.section === 'english' &&
          l.chapterNum &&
          l.chapterNum.startsWith(chapterNum + '.')
        );

        if (categoryLessons.length > 0) {
          // Return the category name
          return categoryLessons[0].category;
        }
      }
    }

    // Fallback: show section + chapter
    return `${weakArea.section} - Chapter ${chapter}`.replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleUpgradeClick = () => {
    navigate('/app/upgrade');
  };

  const handleStartDiagnostic = () => {
    if (setDiagnosticTestOpen) {
      setDiagnosticTestOpen(true);
    }
  };

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

        {/* Diagnostic Test CTA */}
        <DiagnosticTestCTA onClick={handleStartDiagnostic} />

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

  // Show blur overlay if user doesn't have access to insights
  const showBlurOverlay = false; // Removed Pro gatekeeping for insights

  return (
    <>
      {/* Diagnostic Test Review Modal */}
      {viewingDiagnosticReview && insights?.diagnostic?.latestSession && (
        <DiagnosticTestReview
          sessionId={insights.diagnostic.latestSession.id}
          onClose={() => setViewingDiagnosticReview(false)}
        />
      )}

      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>Test Insights</h1>
          <p className={classes.subtitle}>Track your progress and identify areas for improvement</p>
        </div>

        {/* Upgrade Prompt Banner */}
        {showBlurOverlay && (
          <div className={classes.upgradePrompt}>
            <div className={classes.upgradePromptContent}>
              <div className={classes.upgradePromptTitle}>
                <HiLockClosed />
                Unlock Detailed Insights
              </div>
              <p className={classes.upgradePromptText}>
                Upgrade to Pro for full performance analytics and progress tracking
              </p>
            </div>
            <button className={classes.upgradeButton} onClick={handleUpgradeClick}>
              <HiRocketLaunch />
              Upgrade to Pro
            </button>
          </div>
        )}

      {/* Diagnostic Test CTA - Show if not completed and not processing */}
      {!insights.diagnostic.hasCompletedDiagnostic && !localStorage.getItem('diagnosticProcessing') && (
        <DiagnosticTestCTA onClick={handleStartDiagnostic} />
      )}

      {/* Diagnostic Test Results or Loading Card */}
      {(insights.diagnostic.hasCompletedDiagnostic || localStorage.getItem('diagnosticProcessing')) && (
        <div className={classes.diagnosticSection}>
          <h2 className={classes.sectionTitle}>
            <HiClipboardDocumentCheck className={classes.sectionIcon} />
            Diagnostic Test
          </h2>
          {/* Loading Card */}
          {!insights.diagnostic.hasCompletedDiagnostic && localStorage.getItem('diagnosticProcessing') ? (
            <div className={classes.diagnosticCard}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 0'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #fee2e2',
                  borderTop: '3px solid #dc2626',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1rem'
                }} />
                <div className={classes.diagnosticLabel} style={{ marginBottom: '0.35rem' }}>
                  Analyzing Your Test
                </div>
                <div className={classes.cardSubtext} style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  Processing your results and generating insights...
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: '#fee2e2',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  marginTop: '0.35rem'
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)',
                    width: '100%',
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                </div>
              </div>
            </div>
          ) : (
            /* Diagnostic Test Card - Clickable */
            <div
              className={classes.diagnosticCard}
              onClick={() => {
                console.log('🔍 Opening diagnostic review with session:', insights.diagnostic.latestSession);
                console.log('Session ID:', insights.diagnostic.latestSession?.id);
                setViewingDiagnosticReview(true);
              }}
            >
              <div className={classes.diagnosticCardHeader}>
                <div className={classes.diagnosticBadge}>
                  DIAGNOSTIC TEST
                </div>
                <HiClipboardDocumentList className={classes.diagnosticIcon} />
              </div>
              <h3 className={classes.diagnosticTitle}>
                Diagnostic Test
              </h3>
              <p className={classes.diagnosticMeta}>
                {insights.diagnostic.totalQuestions} questions • Completed {formatDate(insights.diagnostic.completedAt)}
              </p>
              <div className={classes.diagnosticScore}>
                {insights.diagnostic.latestScore?.toFixed(1)}%
              </div>
              <div className={classes.diagnosticScoreLabel}>
                {insights.diagnostic.correctAnswers} out of {insights.diagnostic.totalQuestions} questions correct
              </div>
              <button className={classes.diagnosticButton}>
                View Results
              </button>
            </div>
          )}
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
            <div className={`${classes.card} ${classes.learningPathCard} ${showBlurOverlay ? classes.lockedCard : ''}`}>
              {showBlurOverlay && (
                <div className={classes.lockBadge}>
                  <HiLockClosed style={{ fontSize: '0.875rem' }} />
                  Pro
                </div>
              )}
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
            <div className={`${classes.card} ${showBlurOverlay ? classes.lockedCard : ''}`}>
              {showBlurOverlay && (
                <div className={classes.lockBadge}>
                  <HiLockClosed style={{ fontSize: '0.875rem' }} />
                  Pro
                </div>
              )}
              <h3 className={classes.sectionTitle}>
                <HiExclamationTriangle className={classes.sectionIcon} style={{ color: '#dc2626' }} />
                Areas to Improve
              </h3>
              <div className={classes.weakAreasList}>
                {weakAreas.slice(0, 5).map((area, idx) => (
                  <div
                    key={area.lesson_id || idx}
                    className={classes.weakAreaItem}
                    onClick={() => {
                      if (area.lesson_key && area.subject) {
                        navigate(`/app/lessons/${area.subject}/${area.lesson_key}`);
                      }
                    }}
                    style={{ cursor: area.lesson_key ? 'pointer' : 'default' }}
                  >
                    <div className={classes.weakAreaName}>
                      {getLessonTitle(area)}
                    </div>
                    <div className={classes.weakAreaAccuracy}>
                      {area.accuracy?.toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {strengths.length > 0 && (
            <div className={`${classes.card} ${showBlurOverlay ? classes.lockedCard : ''}`}>
              {showBlurOverlay && (
                <div className={classes.lockBadge}>
                  <HiLockClosed style={{ fontSize: '0.875rem' }} />
                  Pro
                </div>
              )}
              <h3 className={classes.sectionTitle}>
                <HiTrophy className={classes.sectionIcon} style={{ color: '#16a34a' }} />
                Your Strengths
              </h3>
              <div className={classes.strengthsList}>
                {strengths.slice(0, 5).map((strength) => (
                  <div key={strength.id} className={classes.strengthItem}>
                    <div className={classes.strengthName}>
                      {getLessonTitle(strength.lesson_id)}
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
            <div className={`${classes.card} ${showBlurOverlay ? classes.lockedCard : ''}`}>
              {showBlurOverlay && (
                <div className={classes.lockBadge}>
                  <HiLockClosed style={{ fontSize: '0.875rem' }} />
                  Pro
                </div>
              )}
              <div className={classes.cardTitle}>Total Questions</div>
              <div className={classes.cardValue}>
                {insights.lessonPerformance.reduce((sum, perf) => sum + perf.total_questions_attempted, 0)}
              </div>
              <div className={classes.cardSubtext}>
                Across all lessons
              </div>
            </div>
            <div className={`${classes.card} ${showBlurOverlay ? classes.lockedCard : ''}`}>
              {showBlurOverlay && (
                <div className={classes.lockBadge}>
                  <HiLockClosed style={{ fontSize: '0.875rem' }} />
                  Pro
                </div>
              )}
              <div className={classes.cardTitle}>Average Accuracy</div>
              <div className={classes.cardValue}>
                {(insights.lessonPerformance.reduce((sum, perf) => sum + perf.accuracy_percentage, 0) /
                  insights.lessonPerformance.length).toFixed(0)}%
              </div>
              <div className={classes.cardSubtext}>
                Across {insights.lessonPerformance.length} lessons
              </div>
            </div>
            <div className={`${classes.card} ${showBlurOverlay ? classes.lockedCard : ''}`}>
              {showBlurOverlay && (
                <div className={classes.lockBadge}>
                  <HiLockClosed style={{ fontSize: '0.875rem' }} />
                  Pro
                </div>
              )}
              <div className={classes.cardTitle}>Study Time</div>
              <div className={classes.cardValue}>
                {(() => {
                  const totalSeconds = insights.lessonPerformance.reduce((sum, perf) => sum + (perf.total_time_spent_seconds || 0), 0);
                  const hours = Math.floor(totalSeconds / 3600);
                  return hours > 0 ? `${hours}h` : '0h';
                })()}
              </div>
              <div className={classes.cardSubtext}>
                Total time invested
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Diagnostic Test Review Modal */}
      {viewingDiagnosticReview && insights?.diagnostic?.latestSession?.id && (
        <DiagnosticTestReview
          sessionId={insights.diagnostic.latestSession.id}
          onClose={() => setViewingDiagnosticReview(false)}
        />
      )}
    </>
  );
};

export default InsightsPage;
