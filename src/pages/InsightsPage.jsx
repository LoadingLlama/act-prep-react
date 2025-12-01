/**
 * Insights Page
 * Displays comprehensive test results and performance insights
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { HiChartBar, HiAcademicCap, HiTrophy, HiExclamationTriangle, HiArrowTrendingUp, HiClipboardDocumentCheck, HiLockClosed, HiRocketLaunch, HiClipboardDocumentList } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import InsightsService from '../services/api/insights.service';
import PracticeTestsService from '../services/api/practiceTests.service';
import { supabase } from '../services/api/supabase.service';
import { getFeatureAccess } from '../services/subscription.service';
import logger from '../services/logging/logger';
import DiagnosticTestCTA from '../components/DiagnosticTestCTA';
import DiagnosticTestReview from '../components/DiagnosticTestReview';
import PracticeTestReview from '../components/PracticeTestReview';
import { lessonStructure } from '../data/lessonStructure';

const useStyles = createUseStyles({
  container: {
    maxWidth: '700px',
    margin: '0',
    padding: '1.5rem 1.5rem 0 1.5rem',
    width: '100%',
    '@media (max-width: 768px)': {
      padding: '1.5rem 1rem 0 1rem'
    },
    '@media (max-width: 480px)': {
      padding: '1rem 0.75rem 0 0.75rem'
    }
  },
  header: {
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
    }
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    lineHeight: '1.5',
    '@media (max-width: 640px)': {
      fontSize: '0.875rem'
    }
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
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    '@media (max-width: 640px)': {
      padding: '2.5rem 1rem',
      borderRadius: '8px'
    }
  },
  emptyStateIcon: {
    fontSize: '4rem',
    color: '#d1d5db',
    marginBottom: '1rem',
    '@media (max-width: 640px)': {
      fontSize: '3rem'
    }
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '1.25rem'
    }
  },
  emptyStateText: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2rem',
    '@media (max-width: 640px)': {
      fontSize: '0.875rem',
      marginBottom: '1.5rem'
    }
  },
  section: {
    marginBottom: '2rem',
    '@media (max-width: 640px)': {
      marginBottom: '1.5rem'
    }
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '1.1rem',
      marginBottom: '0.875rem'
    }
  },
  sectionIcon: {
    fontSize: '1.5rem',
    color: '#08245b',
    '@media (max-width: 640px)': {
      fontSize: '1.25rem'
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    },
    '@media (max-width: 640px)': {
      gap: '1rem'
    }
  },
  card: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    border: 'none',
    transition: 'all 0.2s ease',
    '@media (max-width: 640px)': {
      padding: '1rem',
      borderRadius: '8px'
    },
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-2px)'
    }
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    '@media (max-width: 640px)': {
      marginBottom: '0.75rem'
    }
  },
  cardTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    '@media (max-width: 640px)': {
      fontSize: '0.75rem'
    }
  },
  cardValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#08245b',
    lineHeight: '1',
    '@media (max-width: 640px)': {
      fontSize: '2rem'
    }
  },
  cardSubtext: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem'
    }
  },
  diagnosticSection: {
    maxWidth: '400px', // Compact width like a test card
    marginBottom: '2rem',
    '@media (max-width: 640px)': {
      maxWidth: '100%',
      marginBottom: '1.5rem'
    }
  },
  diagnosticCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.875rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '@media (max-width: 640px)': {
      padding: '0.75rem 0.875rem',
      borderRadius: '6px'
    },
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#cbd5e1'
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
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.25rem',
    '@media (max-width: 640px)': {
      fontSize: '0.8125rem'
    }
  },
  diagnosticMeta: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginBottom: '0.75rem',
    '@media (max-width: 640px)': {
      fontSize: '0.7rem',
      marginBottom: '0.625rem'
    }
  },
  diagnosticScore: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#b91c1c',
    lineHeight: '1',
    marginBottom: '0.25rem',
    '@media (max-width: 640px)': {
      fontSize: '1.25rem'
    }
  },
  diagnosticScoreLabel: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginBottom: 0,
    '@media (max-width: 640px)': {
      fontSize: '0.7rem'
    }
  },
  diagnosticButton: {
    width: '100%',
    padding: '0.75rem 1.5rem',
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 3px 0 0 rgba(37, 99, 235, 0.4)',
    minHeight: '44px',
    '@media (max-width: 640px)': {
      fontSize: '0.875rem',
      padding: '0.75rem 1.25rem',
      borderRadius: '8px'
    },
    '&:hover': {
      background: '#1d4ed8',
      boxShadow: '0 3px 0 0 rgba(29, 78, 216, 0.5)'
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 0 0 rgba(29, 78, 216, 0.5)'
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
    marginTop: '1.5rem',
    '@media (max-width: 640px)': {
      gap: '0.75rem',
      marginTop: '1rem'
    }
  },
  sectionItem: {
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    '@media (max-width: 640px)': {
      padding: '0.875rem',
      borderRadius: '6px'
    }
  },
  sectionName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
    marginBottom: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem'
    }
  },
  sectionScore: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#08245b',
    '@media (max-width: 640px)': {
      fontSize: '1.5rem'
    }
  },
  sectionDetails: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.25rem',
    '@media (max-width: 640px)': {
      fontSize: '0.7rem'
    }
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
    gap: '0.75rem',
    '@media (max-width: 640px)': {
      gap: '0.6rem'
    }
  },
  weakAreaItem: {
    padding: '1rem',
    background: '#fef2f2',
    borderRadius: '8px',
    border: '1px solid #fee2e2',
    transition: 'all 0.2s ease',
    '@media (max-width: 640px)': {
      padding: '0.875rem',
      borderRadius: '6px'
    },
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
    color: '#374151',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem'
    }
  },
  weakAreaAccuracy: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#dc2626',
    padding: '0.25rem 0.75rem',
    background: '#ffffff',
    borderRadius: '6px',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem',
      padding: '0.2rem 0.6rem'
    }
  },
  strengthsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    '@media (max-width: 640px)': {
      gap: '0.6rem'
    }
  },
  strengthItem: {
    padding: '1rem',
    background: '#f0fdf4',
    borderRadius: '8px',
    border: '1px solid #bbf7d0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 640px)': {
      padding: '0.875rem',
      borderRadius: '6px'
    }
  },
  strengthName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem'
    }
  },
  strengthAccuracy: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#16a34a',
    padding: '0.25rem 0.75rem',
    background: '#ffffff',
    borderRadius: '6px',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem',
      padding: '0.2rem 0.6rem'
    }
  },
  learningPathCard: {
    gridColumn: '1 / -1'
  },
  pathStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '0.75rem',
      marginTop: '0.875rem'
    }
  },
  pathStatItem: {
    padding: '1.25rem',
    background: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    '@media (max-width: 640px)': {
      padding: '1rem',
      borderRadius: '6px'
    }
  },
  pathStatValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#08245b',
    marginBottom: '0.25rem',
    '@media (max-width: 640px)': {
      fontSize: '1.75rem'
    }
  },
  pathStatLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem'
    }
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
    },
    '@media (max-width: 640px)': {
      padding: '1.25rem',
      marginBottom: '1.5rem',
      gap: '1rem',
      borderRadius: '8px'
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
    gap: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '1rem',
      justifyContent: 'center'
    }
  },
  upgradePromptText: {
    fontSize: '0.875rem',
    color: '#1e40af',
    lineHeight: '1.5',
    '@media (max-width: 640px)': {
      fontSize: '0.8rem'
    }
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
    minHeight: '44px',
    '@media (max-width: 640px)': {
      fontSize: '0.875rem',
      padding: '0.75rem 1.25rem',
      width: '100%'
    },
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
  const [searchParams] = useSearchParams();
  const outletContext = useOutletContext();
  const { setDiagnosticTestOpen } = outletContext || {};

  // Check cache immediately to avoid loading state
  const getCachedInsights = () => {
    if (!user) return null;
    const cacheKey = `insights_${user.id}`;
    const cached = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();

    if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 600000) { // 10 minutes
      return JSON.parse(cached);
    }
    return null;
  };

  const getCachedWeakAreas = () => {
    if (!user) return [];
    const weakAreasCacheKey = `weak_areas_${user.id}`;
    const cached = localStorage.getItem(weakAreasCacheKey);
    return cached ? JSON.parse(cached) : [];
  };

  const [insights, setInsights] = useState(getCachedInsights());
  const [weakAreas, setWeakAreas] = useState(getCachedWeakAreas());
  const [strengths, setStrengths] = useState([]);
  const [featureAccess, setFeatureAccess] = useState(null);
  const [viewingDiagnosticReview, setViewingDiagnosticReview] = useState(false);
  const [viewingPracticeTestReview, setViewingPracticeTestReview] = useState(null);
  const [lessonMetadataMap, setLessonMetadataMap] = useState({});
  const [isLoading, setIsLoading] = useState(!getCachedInsights());
  const [practiceTests, setPracticeTests] = useState([]);

  // Check URL params to restore diagnostic review state
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      console.log('📍 URL has section param, opening diagnostic review:', section);
      setViewingDiagnosticReview(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      loadInsights();
      checkFeatureAccess();
      loadPracticeTests();
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

  const loadPracticeTests = async () => {
    try {
      logger.info('InsightsPage', 'loadPracticeTests', { userId: user.id });

      // Fetch all completed practice test sessions for the user
      const sessions = await PracticeTestsService.getUserPracticeTestHistory(user.id);

      if (sessions) {
        // Filter for completed full tests and group by test number (keep only latest)
        const completedFullTests = sessions.filter(s => s.completed && s.section === 'full');

        // Group by test_number and keep only the latest session for each test
        const latestByTestNumber = {};
        completedFullTests.forEach(session => {
          const testNum = session.test_number;
          if (!latestByTestNumber[testNum] ||
              new Date(session.session_start) > new Date(latestByTestNumber[testNum].session_start)) {
            latestByTestNumber[testNum] = session;
          }
        });

        // Convert to array and sort by test number
        const practiceTestsArray = Object.values(latestByTestNumber)
          .sort((a, b) => a.test_number - b.test_number);

        setPracticeTests(practiceTestsArray);
        logger.info('InsightsPage', 'loadPracticeTests', { count: practiceTestsArray.length });
      }
    } catch (error) {
      logger.error('InsightsPage', 'loadPracticeTests', { error });
      console.error('Failed to load practice tests:', error);
    }
  };

  const loadInsights = async () => {
    try {
      logger.info('InsightsPage', 'loadInsights', { userId: user.id });

      // Check cache first
      const cacheKey = `insights_${user.id}`;
      const weakAreasCacheKey = `weak_areas_${user.id}`;
      const cached = localStorage.getItem(cacheKey);
      const cachedWeakAreas = localStorage.getItem(weakAreasCacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const now = Date.now();

      // Use cache if less than 10 minutes old
      if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 600000) {
        const cachedData = JSON.parse(cached);
        setInsights(cachedData);
        setIsLoading(false);
        console.log('📊 Using cached insights data');

        // Load cached weak areas if available
        if (cachedWeakAreas) {
          setWeakAreas(JSON.parse(cachedWeakAreas));
        }

        // Still refresh in background but don't await
        refreshInsightsInBackground(cacheKey, weakAreasCacheKey);
        return;
      }

      // Set loading false immediately to show UI - we'll populate data as it loads
      setIsLoading(false);

      // Load insights data
      const insightsData = await InsightsService.getUserInsights(user.id);
      setInsights(insightsData);

      // Cache the basic insights immediately
      localStorage.setItem(cacheKey, JSON.stringify(insightsData));
      localStorage.setItem(`${cacheKey}_timestamp`, String(Date.now()));

      // Get the diagnostic session to analyze
      const diagnosticSession = insightsData.diagnostic?.latestSession;

      if (diagnosticSession) {
        // Load weak areas asynchronously in background
        loadWeakAreasAsync(diagnosticSession.id, weakAreasCacheKey);
      }

      logger.info('InsightsPage', 'loadInsightsComplete', {
        hasDiagnostic: insightsData.diagnostic.hasCompletedDiagnostic
      });
    } catch (error) {
      logger.error('InsightsPage', 'loadInsightsFailed', { error });
      console.error('Failed to load insights:', error);
      setIsLoading(false);
    }
  };

  const loadWeakAreasAsync = async (diagnosticSessionId, cacheKey) => {
    try {
      console.log('📊 Analyzing diagnostic test results for weak areas...');

      // Run all database queries in parallel for maximum performance
      const [resultsResponse, ...sectionResponses] = await Promise.all([
        supabase
          .from('diagnostic_test_results')
          .select('*')
          .eq('diagnostic_session_id', diagnosticSessionId),
        supabase
          .from('practice_test_english_questions')
          .select('id, lesson_id, chapter'),
        supabase
          .from('practice_test_math_questions')
          .select('id, lesson_id, chapter'),
        supabase
          .from('practice_test_reading_questions')
          .select('id, lesson_id, chapter'),
        supabase
          .from('practice_test_science_questions')
          .select('id, lesson_id, chapter')
      ]);

      const { data: questionResults, error: resultsError } = resultsResponse;

      if (resultsError || !questionResults) {
        console.error('Error fetching question results:', resultsError);
        return;
      }

      console.log(`   Found ${questionResults.length} question results`);

      // Build question map from all sections in parallel
      const questionIds = new Set(questionResults.map(r => r.question_id));
      const questionMap = new Map();
      const sections = ['english', 'math', 'reading', 'science'];

      sectionResponses.forEach((response, index) => {
        if (response.data) {
          const section = sections[index];
          response.data
            .filter(q => questionIds.has(q.id))
            .forEach(q => {
              questionMap.set(q.id, { lesson_id: q.lesson_id, chapter: q.chapter, section });
            });
        }
      });

      // Fetch lesson titles in one query
      const uniqueLessonIds = [...new Set(
        Array.from(questionMap.values())
          .map(q => q.lesson_id)
          .filter(Boolean)
      )];

      const lessonIdToTitleMap = new Map();

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

      // Cache weak areas separately
      localStorage.setItem(cacheKey, JSON.stringify(weakAreasFromDiagnostic));

      setStrengths([]); // We'll compute strengths later if needed
    } catch (error) {
      console.error('Error loading weak areas:', error);
    }
  };

  const refreshInsightsInBackground = async (cacheKey, weakAreasCacheKey) => {
    try {
      const insightsData = await InsightsService.getUserInsights(user.id);

      // Update cache
      localStorage.setItem(cacheKey, JSON.stringify(insightsData));
      localStorage.setItem(`${cacheKey}_timestamp`, String(Date.now()));

      // Update state
      setInsights(insightsData);
      console.log('📊 Refreshed insights in background');

      // Refresh weak areas in background if we have a diagnostic session
      const diagnosticSession = insightsData.diagnostic?.latestSession;
      if (diagnosticSession) {
        loadWeakAreasAsync(diagnosticSession.id, weakAreasCacheKey);
      }
    } catch (error) {
      console.error('Background insights refresh error:', error);
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

  // Only show loading if we have no data AND we're still loading
  if (isLoading && !insights) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>Test Insights</h1>
        </div>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner}></div>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Loading your insights...</p>
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

      {/* Practice Test Review Modal */}
      {viewingPracticeTestReview && (
        <PracticeTestReview
          sessionId={viewingPracticeTestReview.id}
          testNumber={viewingPracticeTestReview.test_number}
          onClose={() => setViewingPracticeTestReview(null)}
        />
      )}

      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>Test Insights</h1>
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
            </div>
          )}
        </div>
      )}

      {/* Practice Tests Section */}
      {practiceTests.length > 0 && (
        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            <HiClipboardDocumentList className={classes.sectionIcon} />
            Practice Tests
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '400px' }}>
            {practiceTests.map((test) => {
              const displayNumber = test.test_number - 1; // Test 2 = Practice Test 1
              return (
                <div
                  key={test.id}
                  className={classes.diagnosticCard}
                  onClick={() => {
                    console.log('🔍 Opening practice test review:', test);
                    setViewingPracticeTestReview(test);
                  }}
                >
                  <h3 className={classes.diagnosticTitle}>
                    Practice Test {displayNumber}
                  </h3>
                  <p className={classes.diagnosticMeta}>
                    {test.total_questions} questions • Completed {formatDate(test.session_start)}
                  </p>
                  <div className={classes.diagnosticScore} style={{ color: '#08245b' }}>
                    {test.score_percentage?.toFixed(1)}%
                  </div>
                  <div className={classes.diagnosticScoreLabel}>
                    {test.correct_answers} out of {test.total_questions} questions correct
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* Weak Areas and Strengths */}
      <div className={classes.section}>
        <div className={classes.grid}>
          {/* Weak Areas */}
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
