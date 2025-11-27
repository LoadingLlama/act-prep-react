/**
 * Course Content Component
 * Shows recommended learning path with stats, lessons, and tests in order
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HiPencilSquare, HiQuestionMarkCircle, HiCheckCircle, HiChevronDown, HiFlag } from 'react-icons/hi2';
import { useCourseStyles } from '../../styles/app/course.styles';
import { supabase } from '../../services/api/supabase.service';
import { useAuth } from '../../contexts/AuthContext';
import soundEffects from '../../services/soundEffects';
import LearningPathService from '../../services/api/learning-path.service';

// Helper function to get holidays for a given year
const getHolidays = (year) => {
  // Helper to get nth weekday of month (e.g., 3rd Monday)
  const getNthWeekdayOfMonth = (year, month, weekday, n) => {
    const date = new Date(year, month, 1);
    let count = 0;
    while (date.getMonth() === month) {
      if (date.getDay() === weekday) {
        count++;
        if (count === n) return new Date(date);
      }
      date.setDate(date.getDate() + 1);
    }
    return null;
  };

  // Helper to get last weekday of month
  const getLastWeekdayOfMonth = (year, month, weekday) => {
    const date = new Date(year, month + 1, 0); // Last day of month
    while (date.getDay() !== weekday) {
      date.setDate(date.getDate() - 1);
    }
    return date;
  };

  return {
    [`${year}-01-01`]: { name: "New Year's Day", emoji: '🎉', color: '#3b82f6' },
    [`${year}-02-14`]: { name: "Valentine's Day", emoji: '❤️', color: '#ec4899' },
    [getNthWeekdayOfMonth(year, 0, 1, 3).toISOString().split('T')[0]]: { name: 'MLK Jr. Day', emoji: '✊', color: '#6366f1' },
    [getNthWeekdayOfMonth(year, 1, 1, 3).toISOString().split('T')[0]]: { name: "Presidents' Day", emoji: '🇺🇸', color: '#dc2626' },
    [getLastWeekdayOfMonth(year, 4, 1).toISOString().split('T')[0]]: { name: 'Memorial Day', emoji: '🇺🇸', color: '#dc2626' },
    [`${year}-07-04`]: { name: 'Independence Day', emoji: '🎆', color: '#dc2626' },
    [getNthWeekdayOfMonth(year, 8, 1, 1).toISOString().split('T')[0]]: { name: 'Labor Day', emoji: '⚒️', color: '#f59e0b' },
    [`${year}-10-31`]: { name: 'Halloween', emoji: '🎃', color: '#f97316' },
    [getNthWeekdayOfMonth(year, 10, 4, 4).toISOString().split('T')[0]]: { name: 'Thanksgiving', emoji: '🦃', color: '#f59e0b' },
    [`${year}-12-25`]: { name: 'Christmas', emoji: '🎄', color: '#22c55e' },
    [`${year}-12-31`]: { name: "New Year's Eve", emoji: '🎊', color: '#3b82f6' }
  };
};

const CourseContent = () => {
  const classes = useCourseStyles();
  const { user } = useAuth();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onLessonOpen,
    onTestOpen,
    setDiagnosticTestOpen,
    updateLessonProgress,
    setHeaderControls
  } = useOutletContext();

  // State for user goals and edit modal
  const [userGoals, setUserGoals] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showMockExamTooltipModal, setShowMockExamTooltipModal] = useState(false);
  const [showReviewTooltipModal, setShowReviewTooltipModal] = useState(false);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(null);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState(true);
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [learningPathData, setLearningPathData] = useState(null);
  const [savingGoals, setSavingGoals] = useState(false);
  const [viewMode, setViewMode] = useState('calendar'); // 'list' or 'calendar' - default to calendar
  const [calendarViewType, setCalendarViewType] = useState('month'); // 'day', 'week', 'month', or 'year'
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek); // Start on Sunday
    return weekStart;
  });
  const [currentDay, setCurrentDay] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [previewItem, setPreviewItem] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [saveButtonShake, setSaveButtonShake] = useState(false);
  const [calendarDropdownOpen, setCalendarDropdownOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [hoveredDayCell, setHoveredDayCell] = useState(null); // Track which day cell is hovered for add event
  const [customEventForm, setCustomEventForm] = useState({
    title: '',
    date: '',
    type: 'lesson', // lesson, practice, practice_test, or custom
    description: '',
    duration: 30,
    customColor: '#6b7280'
  });
  const [editForm, setEditForm] = useState({
    target_exam_date: '',
    current_score: '',
    target_score: 28,
    study_hours: {
      monday: 0.75,
      tuesday: 1,
      wednesday: 0,
      thursday: 0.75,
      friday: 1,
      saturday: 2,
      sunday: 2
    },
    study_hours_week2: {
      monday: 0.75,
      tuesday: 1,
      wednesday: 0,
      thursday: 0.75,
      friday: 1,
      saturday: 2,
      sunday: 2
    },
    use_alternating_weeks: false,
    review_day: 'sunday',
    mock_exam_day: 'saturday',
    weekly_hours_tier: 'moderate'
  });

  // Load user goals and check diagnostic completion on mount
  useEffect(() => {
    if (user) {
      // Run all data loading in parallel for faster initial load
      Promise.all([
        loadUserGoals(),
        checkDiagnosticCompletion(),
        loadDiagnosticResults(),
        loadLearningPath()
      ]).catch(error => {
        console.error('Error loading course data:', error);
      });
    } else {
      setLoadingDiagnostic(false);
      setDiagnosticCompleted(null);
    }
  }, [user]);

  // Register header controls with parent AppLayout
  useEffect(() => {
    if (setHeaderControls) {
      const goToToday = () => {
        setCurrentMonth(new Date());
        const today = new Date();
        const dayOfWeek = today.getDay();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - dayOfWeek);
        setCurrentWeekStart(weekStart);
      };

      const controls = (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginLeft: '-2rem'
        }}>
          {/* Today Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              goToToday();
            }}
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '100px',
              padding: '0.625rem 1.5rem',
              fontSize: '0.8125rem',
              fontWeight: '500',
              color: '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            Today
          </button>

          {/* View Toggle - Calendar/List */}
          <div style={{
            display: 'inline-flex',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '100px',
            padding: '0.25rem',
            gap: '0.25rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <button
              onClick={() => {
                soundEffects.playClick();
                setViewMode('calendar');
              }}
              style={{
                background: viewMode === 'calendar' ? '#08245b' : 'transparent',
                border: 'none',
                borderRadius: '100px',
                padding: '0.625rem 1.5rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: viewMode === 'calendar' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: viewMode === 'calendar' ? '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'calendar') {
                  e.target.style.color = '#1a1a1a';
                  e.target.style.background = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'calendar') {
                  e.target.style.color = '#64748b';
                  e.target.style.background = 'transparent';
                }
              }}
            >
              Calendar
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setViewMode('list');
              }}
              style={{
                background: viewMode === 'list' ? '#08245b' : 'transparent',
                border: 'none',
                borderRadius: '100px',
                padding: '0.625rem 1.5rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: viewMode === 'list' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: viewMode === 'list' ? '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'list') {
                  e.target.style.color = '#1a1a1a';
                  e.target.style.background = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'list') {
                  e.target.style.color = '#64748b';
                  e.target.style.background = 'transparent';
                }
              }}
            >
              List
            </button>
          </div>

          {/* Edit Goals Button */}
          <button
            onClick={() => setEditModalOpen(true)}
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: '500',
              transition: 'all 0.15s ease',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <HiFlag style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      );

      setHeaderControls(controls);
    }

    // Clean up on unmount
    return () => {
      if (setHeaderControls) {
        setHeaderControls(null);
      }
    };
  }, [viewMode, setHeaderControls]);

  const checkDiagnosticCompletion = async () => {
    try {
      // Check cache first for instant load
      const cacheKey = `diagnostic_completed_${user.id}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached !== null) {
        const isCompleted = cached === 'true';
        setDiagnosticCompleted(isCompleted);
        setLoadingDiagnostic(false);
        console.log('📊 Using cached diagnostic status:', isCompleted);

        // Still verify in background and update cache if changed
        verifyDiagnosticInBackground(cacheKey);
        return;
      }

      // No cache - fetch from database
      const { data: session, error: sessionError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true)
        .order('session_start', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sessionError) throw sessionError;

      const isCompleted = !!session;
      setDiagnosticCompleted(isCompleted);
      sessionStorage.setItem(cacheKey, String(isCompleted));
      console.log('📊 Diagnostic test status:', isCompleted);
    } catch (error) {
      console.error('Error checking diagnostic completion:', error);
      setDiagnosticCompleted(false);
    } finally {
      setLoadingDiagnostic(false);
    }
  };

  const verifyDiagnosticInBackground = async (cacheKey) => {
    try {
      const { data: session } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true)
        .order('session_start', { ascending: false })
        .limit(1)
        .maybeSingle();

      const isCompleted = !!session;
      const cachedValue = sessionStorage.getItem(cacheKey);

      // Update cache and state if changed
      if (String(isCompleted) !== cachedValue) {
        sessionStorage.setItem(cacheKey, String(isCompleted));
        setDiagnosticCompleted(isCompleted);
        console.log('📊 Updated diagnostic status from background check:', isCompleted);
      }
    } catch (error) {
      console.error('Background diagnostic check error:', error);
    }
  };

  const loadUserGoals = async () => {
    try {
      const { data: goals } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (goals) {
        // Ensure all days are present in study_hours (fill missing days with 1 hour)
        const defaultHours = {
          monday: 1, tuesday: 1, wednesday: 1, thursday: 1,
          friday: 1, saturday: 1, sunday: 1
        };

        const completeStudyHours = {
          ...defaultHours,
          ...(goals.study_hours || {})
        };

        // CRITICAL: Mock exam day should ALWAYS be 0 hours (practice test takes 3 hours on that day)
        const mockExamDay = goals.mock_exam_day || 'saturday';
        completeStudyHours[mockExamDay] = 0;

        // CRITICAL: If alternating weeks is OFF, use Week 1 schedule for Week 2
        // Don't load old database values that might have 0 hours for some days
        const useAlternatingWeeks = goals.use_alternating_weeks || false;
        const completeStudyHoursWeek2 = useAlternatingWeeks
          ? { ...defaultHours, ...(goals.study_hours_week2 || goals.study_hours || {}) }
          : completeStudyHours; // Copy Week 1 when alternating is OFF

        // Also set mock exam day to 0 in Week 2
        completeStudyHoursWeek2[mockExamDay] = 0;

        setUserGoals(goals);
        setEditForm({
          target_exam_date: goals.target_exam_date || '',
          current_score: goals.current_score || '',
          target_score: goals.target_score || 28,
          study_hours: completeStudyHours,
          study_hours_week2: completeStudyHoursWeek2,
          use_alternating_weeks: useAlternatingWeeks,
          review_day: goals.review_day || 'sunday',
          mock_exam_day: mockExamDay,
          weekly_hours_tier: goals.weekly_hours_tier || 'moderate'
        });

        console.log('📥 Loaded goals with study_hours:', completeStudyHours);
        console.log('📥 use_alternating_weeks:', useAlternatingWeeks);
        console.log('📥 study_hours_week2:', completeStudyHoursWeek2);
      }
    } catch (error) {
      console.error('Error loading user goals:', error);
    }
  };

  const saveUserGoals = async () => {
    try {
      setSavingGoals(true);
      console.log('💾 Saving user goals...', editForm);

      // VALIDATION 1: Ensure daily hours match weekly tier
      const studyHours = editForm.study_hours || {};
      const regularStudyHours = Object.values(studyHours).reduce((sum, hours) => sum + (hours || 0), 0);
      const practiceTestHours = 3; // Guaranteed 3 hours for practice test
      const reviewHours = 2; // Guaranteed 2 hours for review

      // Calculate total including guaranteed hours
      let totalWeeklyHours = regularStudyHours + practiceTestHours + reviewHours;

      // If alternating weeks, calculate average of both weeks
      if (editForm.use_alternating_weeks) {
        const studyHoursWeek2 = editForm.study_hours_week2 || {};
        const regularStudyHoursWeek2 = Object.values(studyHoursWeek2).reduce((sum, hours) => sum + (hours || 0), 0);
        const week2TotalHours = regularStudyHoursWeek2 + practiceTestHours + reviewHours;
        totalWeeklyHours = (totalWeeklyHours + week2TotalHours) / 2;
      }

      const selectedTier = editForm.weekly_hours_tier || 'moderate';

      const tierRanges = {
        'light': { min: 1, max: 5, label: '1-5 hours/week' },
        'moderate': { min: 5, max: 10, label: '5-10 hours/week' },
        'intensive': { min: 10, max: 15, label: '10-15 hours/week' },
        'extreme': { min: 15, max: 100, label: '15+ hours/week' }
      };

      const range = tierRanges[selectedTier];
      if (totalWeeklyHours < range.min || totalWeeklyHours > range.max) {
        setSavingGoals(false);
        // Trigger shake animation
        setSaveButtonShake(true);
        setTimeout(() => setSaveButtonShake(false), 500);
        return; // Prevent save - error is already shown inline
      }

      // VALIDATION 2: Ensure Review Day and Mock Exam Day don't conflict
      const reviewDay = editForm.review_day || 'sunday';
      const mockExamDay = editForm.mock_exam_day || 'saturday';

      if (reviewDay === mockExamDay) {
        setSavingGoals(false);
        // Trigger shake animation
        setSaveButtonShake(true);
        setTimeout(() => setSaveButtonShake(false), 500);
        return; // Prevent save - error is already shown inline
      }

      // Parse numeric values properly
      const currentScore = editForm.current_score ? parseInt(editForm.current_score) : null;
      const targetScore = editForm.target_score ? parseInt(editForm.target_score) : 28;

      // CRITICAL: Ensure all days are present in study_hours before saving
      // This prevents database from having incomplete data
      const defaultHours = {
        monday: 1, tuesday: 1, wednesday: 1, thursday: 1,
        friday: 1, saturday: 1, sunday: 1
      };

      const completeStudyHours = {
        ...defaultHours,
        ...(editForm.study_hours || {})
      };

      // CRITICAL: Mock exam day should ALWAYS be 0 hours (practice test takes 3 hours on that day)
      // mockExamDay is already declared above at line 203
      completeStudyHours[mockExamDay] = 0;

      // CRITICAL: If alternating weeks is OFF, Week 2 should be IDENTICAL to Week 1
      // This prevents old Week 2 values from being used
      const completeStudyHoursWeek2 = editForm.use_alternating_weeks
        ? { ...defaultHours, ...(editForm.study_hours_week2 || {}) }
        : completeStudyHours; // Copy Week 1 when alternating is OFF

      // Also set mock exam day to 0 in Week 2
      completeStudyHoursWeek2[mockExamDay] = 0;

      console.log('💾 Saving user goals with study_hours:', completeStudyHours);
      console.log('💾 Mock exam day set to 0 hours:', mockExamDay);

      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: user.id,
          target_exam_date: editForm.target_exam_date || null,
          current_score: currentScore,
          target_score: targetScore,
          study_hours: completeStudyHours,
          study_hours_week2: completeStudyHoursWeek2,
          use_alternating_weeks: editForm.use_alternating_weeks,
          review_day: editForm.review_day,
          mock_exam_day: editForm.mock_exam_day,
          weekly_hours_tier: editForm.weekly_hours_tier,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('❌ Error saving user goals:', error);
        setSavingGoals(false);
        setValidationError({
          title: 'Save Failed',
          message: `Unable to save your goals: ${error.message}`,
          suggestions: ['Please try again', 'Check your internet connection']
        });
        return;
      }

      console.log('✅ Saved user goals, regenerating learning path...');
      await loadUserGoals();

      // Always regenerate learning path with new goals (diagnostic results are optional)
      console.log('🔄 Regenerating learning path with new settings...');
      console.log('📋 Using settings:', {
        exam_date: editForm.target_exam_date,
        study_hours: editForm.study_hours,
        study_hours_week2: editForm.study_hours_week2,
        use_alternating_weeks: editForm.use_alternating_weeks,
        review_day: editForm.review_day,
        mock_exam_day: editForm.mock_exam_day,
        weekly_hours_tier: editForm.weekly_hours_tier
      });

      // Get diagnostic results (optional - used for prioritization)
      const diagnosticResults = await loadDiagnosticResults();

      // Wrap learning path generation with timeout to prevent browser freeze
      const GENERATION_TIMEOUT = 25000; // 25 seconds (less than backend timeout)

      try {
        const generationPromise = LearningPathService.generateLearningPath(
          user.id,
          {
            exam_date: editForm.target_exam_date,
            current_score: currentScore,
            target_score: targetScore,
            study_hours: editForm.study_hours,
            study_hours_week2: editForm.study_hours_week2,
            use_alternating_weeks: editForm.use_alternating_weeks,
            review_day: editForm.review_day,
            mock_exam_day: editForm.mock_exam_day,
            weekly_hours_tier: editForm.weekly_hours_tier
          },
          diagnosticResults?.analysis || null
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Learning path generation timed out. Please try with a shorter time frame or fewer study hours.')), GENERATION_TIMEOUT)
        );

        await Promise.race([generationPromise, timeoutPromise]);

        // Reload learning path to update UI
        console.log('🔄 Reloading learning path from database...');
        await loadLearningPath();
        console.log('✅ Learning path regenerated and reloaded!');

        // Close modal
        setEditModalOpen(false);
        setSavingGoals(false);
      } catch (genError) {
        console.error('❌ Learning path generation failed:', genError);
        setSavingGoals(false);
        setValidationError({
          title: 'Learning Path Generation Failed',
          message: genError.message || 'The algorithm took too long to complete.',
          suggestions: [
            'Try setting a closer exam date',
            'Reduce weekly study hours',
            'Try again in a moment'
          ]
        });
        return;
      }
    } catch (error) {
      console.error('❌ Exception saving user goals:', error);
      setSavingGoals(false);
      setValidationError({
        title: 'Unexpected Error',
        message: `An error occurred while saving: ${error.message}`,
        suggestions: ['Please try again', 'If the problem persists, contact support']
      });
    }
  };

  const loadDiagnosticResults = async () => {
    try {
      // Get latest completed diagnostic session with answers
      const { data: session, error: sessionError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true)
        .order('session_start', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sessionError) throw sessionError;
      if (!session) return null;

      // Get diagnostic analysis
      const { data: analysis, error: analysisError } = await supabase
        .from('diagnostic_analysis')
        .select('*')
        .eq('diagnostic_session_id', session.id)
        .maybeSingle();

      if (analysisError) throw analysisError;

      const results = {
        session,
        analysis
      };

      setDiagnosticResults(results);

      console.log('📊 Loaded diagnostic results:', results);

      return results; // RETURN THE VALUE!
    } catch (error) {
      console.error('Error loading diagnostic results:', error);
      return null;
    }
  };

  const loadLearningPath = async () => {
    try {
      console.log('📚 Loading learning path for user:', user.id);

      // Check cache first for instant load
      const cacheKey = `learning_path_${user.id}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const cachedPath = JSON.parse(cached);
        setLearningPathData(cachedPath);
        console.log('📚 Using cached learning path:', cachedPath?.items?.length || 0, 'items');

        // Verify in background
        verifyLearningPathInBackground(cacheKey);
        return;
      }

      // No cache - fetch from database
      const { data: path, error: pathError } = await supabase
        .from('user_learning_paths')
        .select(`
          *,
          items:learning_path_items(*)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (pathError) {
        console.error('❌ Error loading learning path:', pathError);
        throw pathError;
      }

      if (path) {
        console.log('✅ Loaded learning path:', {
          pathId: path.id,
          itemsCount: path.items?.length || 0,
          examDate: path.exam_date
        });
        setLearningPathData(path);
        sessionStorage.setItem(cacheKey, JSON.stringify(path));
      } else {
        console.log('⚠️ No learning path found for user');
        setLearningPathData(null);
        sessionStorage.setItem(cacheKey, JSON.stringify(null));
      }
    } catch (error) {
      console.error('❌ Exception loading learning path:', error);
    }
  };

  const verifyLearningPathInBackground = async (cacheKey) => {
    try {
      const { data: path } = await supabase
        .from('user_learning_paths')
        .select(`
          *,
          items:learning_path_items(*)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      // Update cache
      sessionStorage.setItem(cacheKey, JSON.stringify(path));

      // Update state if changed
      const cached = sessionStorage.getItem(cacheKey);
      if (JSON.stringify(path) !== cached) {
        setLearningPathData(path);
        console.log('📚 Updated learning path from background check');
      }
    } catch (error) {
      console.error('Background learning path check error:', error);
    }
  };

  // Calculate statistics
  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(s => s === 'completed').length;

  // Calculate section strengths from diagnostic results
  const sectionStrengths = {
    'English': diagnosticResults?.session?.section_scores?.english || 0,
    'Math': diagnosticResults?.session?.section_scores?.math || 0,
    'Reading': diagnosticResults?.session?.section_scores?.reading || 0,
    'Science': diagnosticResults?.session?.section_scores?.science || 0
  };

  // Parse exam date in local timezone (avoid UTC conversion)
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Use user's target exam date or learning path exam date
  const testDate = userGoals?.target_exam_date
    ? parseLocalDate(userGoals.target_exam_date)
    : learningPathData?.exam_date
    ? parseLocalDate(learningPathData.exam_date)
    : new Date(Date.now() + 84 * 24 * 60 * 60 * 1000); // Default 12 weeks

  const daysUntilTest = Math.max(0, Math.ceil((testDate - new Date()) / (1000 * 60 * 60 * 24)));

  const getLessonStatus = (itemId) => {
    return lessonProgress[itemId] || 'not-started';
  };

  // Helper to clean lesson titles
  const cleanLessonTitle = (title) => {
    if (!title) return 'Lesson';
    // Remove "Topic X.X - " prefix for consistent formatting
    return title.replace(/^Topic\s+[\d.]+\s+-\s+/, '');
  };

  // Transform learning path data from database into display format
  const learningPath = React.useMemo(() => {
    console.log('🔄 Transforming learning path data:', learningPathData);

    if (!learningPathData || !learningPathData.items) {
      console.log('⚠️ No learning path data to transform');
      return [];
    }

    console.log('📊 Learning path items:', learningPathData.items);

    // FIRST: Sort ALL items by scheduled_date chronologically
    const sortedItems = [...learningPathData.items].sort((a, b) => {
      const dateA = a.scheduled_date ? new Date(a.scheduled_date) : new Date();
      const dateB = b.scheduled_date ? new Date(b.scheduled_date) : new Date();
      return dateA - dateB;
    });

    // Group items by week number (now in chronological order)
    const weekGroups = {};
    sortedItems.forEach(item => {
      const weekNum = item.week_number || 1;
      if (!weekGroups[weekNum]) {
        weekGroups[weekNum] = [];
      }
      weekGroups[weekNum].push(item);
    });

    console.log('📅 Week groups:', weekGroups);

    // Transform into week objects
    const transformed = Object.entries(weekGroups)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([weekNum, items]) => {
        // Calculate week start/end dates
        const firstItem = items[0];
        const lastItem = items[items.length - 1];
        const startDate = firstItem.scheduled_date ? new Date(firstItem.scheduled_date) : new Date();
        const endDate = lastItem.scheduled_date ? new Date(lastItem.scheduled_date) : new Date();

        // Detect subjects for this week by analyzing lessons
        const weekSubjects = new Set();
        items.forEach(item => {
          if (item.item_type === 'lesson' && item.lesson_key) {
            // Find lesson in lessonStructure to get its section
            const lesson = lessonStructure.find(l => l.id === item.lesson_key);
            if (lesson && lesson.section) {
              const section = lesson.section === 'getting-started' ? 'intro' : lesson.section;
              weekSubjects.add(section);
            }
          }
        });

        const subjectLabels = Array.from(weekSubjects)
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join(' & ');
        const weekTitle = subjectLabels
          ? `Week ${weekNum} - ${subjectLabels}`
          : `Week ${weekNum}`;

        return {
          week: weekTitle,
          startDate,
          endDate,
          items: items.map(item => {
            // Check item type
            const itemType = item.item_type;
            const metadata = item.item_metadata || {};

            if (itemType === 'test') {
              return {
                id: `test-${metadata.test_number || 1}-${metadata.section || 'full'}`,
                type: 'test',
                title: metadata.title || `Practice Test ${metadata.test_number}`,
                testNumber: metadata.test_number,
                section: metadata.section,
                duration: `${item.estimated_minutes || 45} min`,
                dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                status: item.status,
                isPriority: false
              };
            } else if (itemType === 'review') {
              return {
                id: `review-${item.week_number}`,
                type: 'review',
                title: metadata.title || `Week ${item.week_number} Review`,
                description: metadata.description,
                duration: `${item.estimated_minutes || 45} min`,
                dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                status: item.status,
                isPriority: false
              };
            } else if (itemType === 'mock_exam') {
              return {
                id: `mock-exam-final`,
                type: 'mock_exam',
                title: metadata.title || 'Full ACT Mock Exam',
                description: metadata.description,
                duration: `${item.estimated_minutes || 180} min`,
                dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                status: item.status,
                isPriority: true,
                isFinal: true
              };
            } else if (itemType === 'exam_day') {
              const examDateObj = item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date();
              const formattedExamDate = examDateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              });

              return {
                id: `exam-day-${item.week_number}`,
                type: 'exam_day',
                title: 'OFFICIAL ACT EXAM',
                description: formattedExamDate,
                duration: '0 min',
                dueDate: examDateObj,
                status: 'pending',
                isPriority: true,
                isExamDay: true
              };
            } else if (itemType === 'practice_test') {
              const testNumber = item.practice_test_number;
              const section = item.practice_test_section;

              // Full test = all 4 sections in one sitting
              const isFullTest = section === 'full';

              return {
                id: `practice-test-${testNumber}-full`,
                type: 'practice_test',
                title: `Practice Test ${testNumber}${isFullTest ? ' (Full Test)' : ''}`,
                testNumber: testNumber,
                section: section,
                description: isFullTest
                  ? 'Complete all 4 sections: English, Math, Reading, Science'
                  : null,
                duration: `${item.estimated_minutes || 175} min`,
                dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                status: item.status,
                isPriority: true
              };
            } else if (itemType === 'practice') {
              // Practice activity - look up the lesson being practiced
              const lessonKey = item.lesson_key;
              const lesson = lessonStructure.find(l => l.id === lessonKey);

              if (lesson) {
                return {
                  id: `practice-${lessonKey}-${item.id}`,
                  type: 'practice',
                  title: cleanLessonTitle(lesson.title),
                  skills: 'Practice',
                  duration: `${item.estimated_minutes || 30} min`,
                  dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                  status: 'not-started', // Practice is always fresh
                  isPriority: false,
                  lessonKey: lessonKey, // Store reference to original lesson
                  isPractice: true // Flag for styling
                };
              } else {
                console.warn('⚠️ Practice lesson not found:', lessonKey);
                return null;
              }
            } else {
              // Regular lesson - look up from lessonStructure using lesson_key
              const lessonKey = item.lesson_key;
              const lesson = lessonStructure.find(l => l.id === lessonKey);

              if (lesson) {
                const actualStatus = getLessonStatus(lessonKey);

                return {
                  id: lessonKey,  // Use lessonStructure ID
                  type: 'lesson',
                  title: cleanLessonTitle(lesson.title),
                  skills: lesson.category || 'General',
                  duration: `${item.estimated_minutes || 30} min`,
                  dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                  status: actualStatus,
                  isPriority: item.is_priority
                };
              } else {
                // Fallback if lesson not found
                console.warn('⚠️ Lesson not found in lessonStructure:', lessonKey);
                return {
                  id: lessonKey || `unknown-${item.id}`,
                  type: 'lesson',
                  title: 'Unknown Lesson',
                  skills: 'General',
                  duration: `${item.estimated_minutes || 30} min`,
                  dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                  status: 'not-started',
                  isPriority: item.is_priority
                };
              }
            }
          }).filter(Boolean) // Remove nulls
          .sort((a, b) => {
            // Sort by dueDate chronologically (already pre-sorted from database)
            // Special case: exam_day should always be last in its week
            if (a.type === 'exam_day' && b.type !== 'exam_day') return 1;
            if (a.type !== 'exam_day' && b.type === 'exam_day') return -1;
            return a.dueDate - b.dueDate;
          })
        };
      });

    console.log('✅ Transformed learning path:', transformed);
    return transformed;
  }, [learningPathData, lessonProgress]);

  const handleItemClick = (item) => {
    soundEffects.playClick();
    if (item.type === 'lesson') {
      onLessonOpen(item.id, 'review');
    } else if (item.type === 'practice') {
      // Open the lesson in practice mode
      onLessonOpen(item.lessonKey, 'practice');
    } else if (item.type === 'test') {
      if (item.id === 'diagnostic') {
        setDiagnosticTestOpen(true);
      } else {
        // Extract test number from id (e.g., "test-1-english" -> 1)
        const testNumber = item.testNumber || parseInt(item.id.split('-')[1]);
        onTestOpen(testNumber, item.section);
      }
    } else if (item.type === 'practice_test') {
      // Navigate to practice test page with the specific test number and section
      const testNumber = item.testNumber;
      const section = item.section;
      // Use onTestOpen to open the practice test
      onTestOpen(testNumber, section);
    }
  };

  const toggleItemCompletion = async (itemId) => {
    if (!updateLessonProgress || !itemId) return;

    const currentStatus = lessonProgress[itemId] || 'not-started';
    const newStatus = currentStatus === 'completed' ? 'not-started' : 'completed';

    console.log(`Toggle completion for ${itemId}: ${currentStatus} → ${newStatus}`);
    soundEffects.playClick();

    try {
      await updateLessonProgress(itemId, newStatus);
    } catch (error) {
      console.error('Failed to toggle completion:', error);
    }
  };

  const getItemIcon = (type) => {
    if (type === 'exam_day') {
      return null; // No icon for exam day
    }
    if (type === 'practice') {
      // Distinct icon for practice activities - pencil/writing
      return <HiPencilSquare style={{ width: '16px', height: '16px' }} />;
    }
    if (type === 'practice_test') {
      // Distinct icon for practice tests - clipboard with checkmark
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"></path>
          <rect x="9" y="3" width="6" height="4" rx="1"></rect>
          <path d="M9 14l2 2 4-4"></path>
        </svg>
      );
    }
    if (type === 'test' || type === 'mock_exam') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    }
    if (type === 'review') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    );
  };

  // Helper to format date as YYYY-MM-DD in local timezone (no UTC conversion)
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generate Apple-style calendar view data
  const generateAppleCalendarView = () => {
    if (!learningPathData || !learningPathData.items) return { weeks: [], itemsByDate: {} };

    // Group items by date
    const itemsByDate = {};
    learningPathData.items.forEach(item => {
      const date = item.scheduled_date;
      if (!itemsByDate[date]) {
        itemsByDate[date] = [];
      }

      const itemType = item.item_type;
      const metadata = item.item_metadata || {};

      let calendarItem;
      if (itemType === 'test') {
        calendarItem = {
          id: `test-${metadata.test_number}-${metadata.section}`,
          type: 'test',
          title: metadata.title || `Practice Test ${metadata.test_number}`,
          duration: item.estimated_minutes,
          status: item.status,
          testNumber: metadata.test_number,
          section: metadata.section
        };
      } else if (itemType === 'practice_test') {
        const isFullTest = item.practice_test_section === 'full';
        calendarItem = {
          id: `practice-test-${item.practice_test_number}-full`,
          type: 'practice_test',
          title: `Practice Test ${item.practice_test_number}${isFullTest ? ' (Full Test)' : ''}`,
          testNumber: item.practice_test_number,
          section: item.practice_test_section,
          duration: item.estimated_minutes,
          status: item.status,
          isPriority: true
        };
      } else if (itemType === 'review') {
        calendarItem = {
          id: `review-${item.week_number}`,
          type: 'review',
          title: metadata.title || `Week ${item.week_number} Review`,
          description: metadata.description,
          duration: item.estimated_minutes,
          status: item.status
        };
      } else if (itemType === 'mock_exam') {
        calendarItem = {
          id: `mock-exam-final`,
          type: 'mock_exam',
          title: metadata.title || 'Full ACT Mock Exam',
          description: metadata.description,
          duration: item.estimated_minutes,
          status: item.status,
          isPriority: true,
          isFinal: true
        };
      } else if (itemType === 'exam_day') {
        calendarItem = {
          id: `exam-day-${item.week_number}`,
          type: 'exam_day',
          title: '🎯 OFFICIAL ACT EXAM DAY',
          description: 'This is your official ACT test date. Good luck! 🎯',
          duration: 0,
          status: 'pending',
          isPriority: true,
          isExamDay: true
        };
      } else if (itemType === 'practice') {
        // Practice activity - look up the lesson being practiced
        const lessonKey = item.lesson_key;
        const lesson = lessonStructure.find(l => l.id === lessonKey);

        if (lesson) {
          calendarItem = {
            id: `practice-${lessonKey}-${item.id}`,
            type: 'practice',
            title: cleanLessonTitle(lesson.title),
            duration: item.estimated_minutes,
            status: 'not-started',
            isPractice: true
          };
        } else {
          console.warn('⚠️ Practice lesson not found:', lessonKey);
          calendarItem = null;
        }
      } else {
        // For lessons, look up from lessonStructure using lesson_key
        const lessonKey = item.lesson_key;
        const lesson = lessonStructure.find(l => l.id === lessonKey);

        if (lesson) {
          const actualStatus = getLessonStatus(lessonKey);

          calendarItem = {
            id: lessonKey,  // Use lessonStructure ID (e.g., "getting-started")
            type: 'lesson',
            title: cleanLessonTitle(lesson.title),
            duration: item.estimated_minutes,
            status: actualStatus,
            isPriority: item.is_priority
          };
        } else {
          // Fallback if lesson not found in lessonStructure
          console.warn('⚠️ Lesson not found in lessonStructure:', lessonKey);
          calendarItem = {
            id: lessonKey || `unknown-${item.id}`,
            type: 'lesson',
            title: 'Unknown Lesson',
            duration: item.estimated_minutes,
            status: 'not-started',
            isPriority: item.is_priority
          };
        }
      }

      if (calendarItem) {
        itemsByDate[date].push(calendarItem);
      }
    });

    // Generate calendar grid for current month
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for first day (0 = Sunday)
    const startingDayOfWeek = firstDay.getDay();

    // Calculate how many days to show from previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = prevMonthLastDay.getDate();

    // Build calendar grid
    const weeks = [];
    let currentWeek = [];

    // Add days from previous month (grayed out)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(year, month - 1, day);
      const dateString = formatLocalDate(date);
      currentWeek.push({
        date,
        dateString,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: false,
        items: itemsByDate[dateString] || []
      });
    }

    // Add days from current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = formatLocalDate(date);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();

      currentWeek.push({
        date,
        dateString,
        dayNumber: day,
        isCurrentMonth: true,
        isToday,
        items: itemsByDate[dateString] || []
      });

      // If week is complete (7 days), start new week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add days from next month to complete the last week
    if (currentWeek.length > 0) {
      let nextMonthDay = 1;
      while (currentWeek.length < 7) {
        const date = new Date(year, month + 1, nextMonthDay);
        const dateString = formatLocalDate(date);
        currentWeek.push({
          date,
          dateString,
          dayNumber: nextMonthDay,
          isCurrentMonth: false,
          isToday: false,
          items: itemsByDate[dateString] || []
        });
        nextMonthDay++;
      }
      weeks.push(currentWeek);
    }

    return { weeks, itemsByDate };
  };

  const generateWeekView = () => {
    if (!learningPathData || !learningPathData.items) return [];

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      const dateString = formatLocalDate(date);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();

      // Get items for this date
      const dayItems = learningPathData.items.filter(item => item.scheduled_date === dateString);

      // Transform items for display
      const transformedItems = dayItems.map(item => {
        const itemType = item.item_type;

        if (itemType === 'lesson' && item.lesson_key) {
          const lesson = lessonStructure.find(l => l.id === item.lesson_key);
          if (lesson) {
            const actualStatus = getLessonStatus(item.lesson_key);
            return {
              id: item.lesson_key,
              type: 'lesson',
              title: cleanLessonTitle(lesson.title),
              category: lesson.category || 'General',
              section: lesson.section,
              duration: item.estimated_minutes || 30,
              status: actualStatus,
              isPriority: item.is_priority
            };
          }
        } else if (itemType === 'practice_test') {
          const isFullTest = item.practice_test_section === 'full';
          return {
            id: `practice-test-${item.practice_test_number}-full`,
            type: 'practice_test',
            title: `Practice Test ${item.practice_test_number}${isFullTest ? ' (Full)' : ''}`,
            testNumber: item.practice_test_number,
            section: item.practice_test_section,
            duration: item.estimated_minutes,
            status: item.status,
            isPriority: true
          };
        } else if (itemType === 'review') {
          return {
            id: `review-${item.week_number}`,
            type: 'review',
            title: `Week ${item.week_number} Review`,
            duration: item.estimated_minutes,
            status: item.status
          };
        } else if (itemType === 'mock_exam') {
          return {
            id: `mock-exam-${item.week_number}`,
            type: 'mock_exam',
            title: 'Full ACT Mock Exam',
            duration: item.estimated_minutes,
            status: item.status,
            isPriority: true
          };
        } else if (itemType === 'exam_day') {
          return {
            id: `exam-day-${item.week_number}`,
            type: 'exam_day',
            title: 'OFFICIAL ACT EXAM DAY',
            duration: 0,
            status: 'pending',
            isExamDay: true
          };
        } else if (itemType === 'practice') {
          // Practice activity for month view
          const lessonKey = item.lesson_key;
          const lesson = lessonStructure.find(l => l.id === lessonKey);

          if (lesson) {
            return {
              id: `practice-${lessonKey}-${item.id}`,
              type: 'practice',
              title: cleanLessonTitle(lesson.title),
              category: 'Practice',
              duration: item.estimated_minutes || 30,
              status: 'not-started',
              lessonKey: lessonKey,
              isPractice: true
            };
          }
        }

        return null;
      }).filter(Boolean);

      weekDays.push({
        date,
        dateString,
        dayNumber: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
        isToday,
        items: transformedItems
      });
    }

    return weekDays;
  };

  const generateDayView = () => {
    if (!learningPathData || !learningPathData.items) return null;

    const dateString = formatLocalDate(currentDay);
    const today = new Date();
    const isToday = currentDay.toDateString() === today.toDateString();

    // Get items for this date
    const dayItems = learningPathData.items.filter(item => item.scheduled_date === dateString);

    // Transform items for display (reuse same logic as week view)
    const transformedItems = dayItems.map(item => {
      const itemType = item.item_type;

      if (itemType === 'lesson' && item.lesson_key) {
        const lesson = lessonStructure.find(l => l.id === item.lesson_key);
        if (lesson) {
          const actualStatus = getLessonStatus(item.lesson_key);
          return {
            id: item.lesson_key,
            type: 'lesson',
            title: cleanLessonTitle(lesson.title),
            category: lesson.category || 'General',
            section: lesson.section,
            duration: item.estimated_minutes || 30,
            status: actualStatus,
            isPriority: item.is_priority
          };
        }
      } else if (itemType === 'practice_test') {
        const isFullTest = item.practice_test_section === 'full';
        return {
          id: `practice-test-${item.practice_test_number}-full`,
          type: 'practice_test',
          title: `Practice Test ${item.practice_test_number}${isFullTest ? ' (Full)' : ''}`,
          testNumber: item.practice_test_number,
          section: item.practice_test_section,
          duration: item.estimated_minutes,
          status: item.status,
          isPriority: true
        };
      } else if (itemType === 'review') {
        return {
          id: `review-${item.week_number}`,
          type: 'review',
          title: `Week ${item.week_number} Review`,
          duration: item.estimated_minutes,
          status: item.status
        };
      } else if (itemType === 'mock_exam') {
        return {
          id: `mock-exam-${item.week_number}`,
          type: 'mock_exam',
          title: 'Full ACT Mock Exam',
          duration: item.estimated_minutes,
          status: item.status,
          isPriority: true
        };
      } else if (itemType === 'exam_day') {
        return {
          id: `exam-day-${item.week_number}`,
          type: 'exam_day',
          title: 'OFFICIAL ACT EXAM DAY',
          duration: 0,
          status: 'pending',
          isExamDay: true
        };
      } else if (itemType === 'practice') {
        const lessonKey = item.lesson_key;
        const lesson = lessonStructure.find(l => l.id === lessonKey);
        if (lesson) {
          return {
            id: `practice-${lessonKey}-${item.id}`,
            type: 'practice',
            title: cleanLessonTitle(lesson.title),
            category: 'Practice',
            duration: item.estimated_minutes || 30,
            status: 'not-started',
            lessonKey: lessonKey,
            isPractice: true
          };
        }
      }

      return null;
    }).filter(Boolean);

    return {
      date: currentDay,
      dateString,
      dayNumber: currentDay.getDate(),
      dayName: currentDay.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDayName: currentDay.toLocaleDateString('en-US', { weekday: 'long' }),
      monthName: currentDay.toLocaleDateString('en-US', { month: 'long' }),
      year: currentDay.getFullYear(),
      isToday,
      items: transformedItems
    };
  };

  const generateYearView = () => {
    if (!learningPathData || !learningPathData.items) return [];

    const months = [];
    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(currentYear, month, 1);
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'short' });
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(currentYear, month, 1).getDay();

      // Build days array for this month
      const days = [];

      // Add empty slots for days before month starts
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
      }

      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day);
        const dateString = formatLocalDate(date);
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();

        // Check if there are items on this day
        const dayItems = learningPathData.items.filter(item => item.scheduled_date === dateString);
        const hasItems = dayItems.length > 0;

        days.push({
          dayNumber: day,
          date,
          dateString,
          isToday,
          hasItems
        });
      }

      months.push({
        monthNumber: month,
        monthName,
        monthDate,
        days
      });
    }

    return months;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const navigateWeek = (direction) => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    setCurrentWeekStart(newWeekStart);
  };

  const navigateCalendar = (direction) => {
    if (calendarViewType === 'month') {
      navigateMonth(direction);
    } else if (calendarViewType === 'week') {
      navigateWeek(direction);
    } else if (calendarViewType === 'day') {
      const newDay = new Date(currentDay);
      newDay.setDate(currentDay.getDate() + direction);
      setCurrentDay(newDay);
    } else if (calendarViewType === 'year') {
      setCurrentYear(currentYear + direction);
    }
  };

  const goToToday = () => {
    const today = new Date();
    if (calendarViewType === 'month') {
      setCurrentMonth(today);
    } else if (calendarViewType === 'week') {
      const dayOfWeek = today.getDay();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - dayOfWeek);
      setCurrentWeekStart(weekStart);
    } else if (calendarViewType === 'day') {
      setCurrentDay(today);
    } else if (calendarViewType === 'year') {
      setCurrentYear(today.getFullYear());
    }
  };

  // Loading state - show while checking diagnostic status
  if (loadingDiagnostic || diagnosticCompleted === null) {
    return (
      <div className={classes.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', color: '#6b7280' }}>
          Loading...
        </div>
      </div>
    );
  }

  // Locked state - diagnostic not completed
  const renderLockedContent = () => {
    return (
      <div className={classes.container} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '2rem'
      }}>
        {/* Lock overlay */}
        <div style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '3rem 2rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: '#fef2f2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>
              Start with a Free Diagnostic Test
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Take our diagnostic test to pinpoint exactly where you excel and where you need practice—so you know your starting point from day one.
            </p>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => {
                  soundEffects.playSuccess();
                  setDiagnosticTestOpen(true);
                }}
                style={{
                  background: '#b91c1c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#991b1b';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#b91c1c';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  Start the Diagnostic Test
                  <span style={{ fontSize: '1rem' }}>→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (diagnosticCompleted === false) {
    return renderLockedContent();
  }

  return (
    <div className={classes.container} style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Main Content */}
      <div className={classes.content} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Weekly Assignments - List or Calendar View */}
        <div className={classes.weeksContainer} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, paddingTop: '1rem' }}>
          {viewMode === 'calendar' && learningPath.length > 0 ? (
            // Apple Calendar View
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
              maxHeight: 'calc(100vh - 100px)',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {/* Month Header with Navigation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4rem 1.5rem',
                borderBottom: '1px solid #e5e7eb',
                background: '#ffffff',
                flexShrink: 0
              }}>
                {/* Left: Days until exam */}
                <div style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  fontWeight: '500'
                }}>
                  {daysUntilTest} days until exam
                </div>

                {/* Center: Month/Week title with arrows */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      navigateCalendar(-1);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '1.25rem',
                      transition: 'all 0.15s ease',
                      borderRadius: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    ‹
                  </button>
                  <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    {calendarViewType === 'day'
                      ? currentDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                      : calendarViewType === 'week'
                      ? `Week of ${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                      : calendarViewType === 'month'
                      ? currentMonth.toLocaleDateString('en-US', { month: 'long' })
                      : currentYear}
                  </h2>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      navigateCalendar(1);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '1.25rem',
                      transition: 'all 0.15s ease',
                      borderRadius: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    ›
                  </button>
                </div>

                {/* Right: Add Event Button and Month/Week Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* Add Event Button */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setAddEventModalOpen(true);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '20px',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#1a1a1a',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      height: '32px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.backdropFilter = 'blur(10px)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.backdropFilter = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ fontSize: '1rem', lineHeight: '1' }}>+</span>
                    Add Event
                  </button>

                  {/* Month/Week Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setCalendarDropdownOpen(!calendarDropdownOpen);
                      }}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '20px',
                        padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#1a1a1a',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.backdropFilter = 'blur(10px)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.backdropFilter = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {calendarViewType === 'day' ? 'Day' : calendarViewType === 'week' ? 'Week' : calendarViewType === 'month' ? 'Month' : 'Year'}
                    <HiChevronDown style={{
                      width: '14px',
                      height: '14px',
                      transition: 'transform 0.2s ease',
                      transform: calendarDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} />
                  </button>

                  {calendarDropdownOpen && (
                    <>
                      {/* Invisible backdrop to close dropdown */}
                      <div
                        onClick={() => setCalendarDropdownOpen(false)}
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 999
                        }}
                      />
                      {/* Dropdown menu */}
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        right: 0,
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        minWidth: '120px',
                        overflow: 'hidden'
                      }}>
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            setCalendarViewType('day');
                            setCalendarDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.65rem 1rem',
                            background: calendarViewType === 'day' ? '#f9fafb' : 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: calendarViewType === 'day' ? '#08245b' : '#1a1a1a',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = calendarViewType === 'day' ? '#f9fafb' : 'transparent';
                          }}
                        >
                          Day
                        </button>
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            setCalendarViewType('week');
                            setCalendarDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.65rem 1rem',
                            background: calendarViewType === 'week' ? '#f9fafb' : 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: calendarViewType === 'week' ? '#08245b' : '#1a1a1a',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = calendarViewType === 'week' ? '#f9fafb' : 'transparent';
                          }}
                        >
                          Week
                        </button>
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            setCalendarViewType('month');
                            setCalendarDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.65rem 1rem',
                            background: calendarViewType === 'month' ? '#f9fafb' : 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: calendarViewType === 'month' ? '#08245b' : '#1a1a1a',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = calendarViewType === 'month' ? '#f9fafb' : 'transparent';
                          }}
                        >
                          Month
                        </button>
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            setCalendarViewType('year');
                            setCalendarDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.65rem 1rem',
                            background: calendarViewType === 'year' ? '#f9fafb' : 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: calendarViewType === 'year' ? '#08245b' : '#1a1a1a',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = calendarViewType === 'year' ? '#f9fafb' : 'transparent';
                          }}
                        >
                          Year
                        </button>
                      </div>
                    </>
                  )}
                  </div>
                </div>
              </div>

              {/* Day of Week Headers - Only for Week and Month views */}
              {(calendarViewType === 'week' || calendarViewType === 'month') && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  borderBottom: '1px solid #d1d5db',
                  background: '#fafafa',
                  flexShrink: 0
                }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.25rem',
                        fontSize: '0.6rem',
                        fontWeight: '700',
                        color: '#6b7280',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderRight: idx < 6 ? '1px solid #d1d5db' : 'none'
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              )}

              {/* Calendar Grid - Day, Week, Month, or Year View */}
              {calendarViewType === 'day' ? (
                // DAY VIEW
                (() => {
                  const dayData = generateDayView();
                  if (!dayData) return null;

                  return (
                    <div style={{
                      background: '#ffffff',
                      padding: '2.5rem',
                      overflowY: 'auto',
                      flex: 1
                    }}>
                      <div style={{
                        maxWidth: '750px',
                        margin: '0 auto'
                      }}>
                        {/* Day header with holiday */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '0.5rem'
                        }}>
                          <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1a1a1a',
                            margin: 0
                          }}>
                            {dayData.fullDayName}, {dayData.monthName} {dayData.dayNumber}, {dayData.year}
                          </h2>
                          {(() => {
                            const holidays = getHolidays(dayData.year);
                            const holiday = holidays[dayData.dateString];
                            if (holiday) {
                              return (
                                <span style={{
                                  fontSize: '0.875rem',
                                  opacity: 0.5,
                                  fontWeight: '400',
                                  color: '#6b7280'
                                }} title={holiday.name}>
                                  {holiday.emoji} {holiday.name}
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>

                        {/* Items list */}
                        <div style={{
                          marginTop: '1.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem'
                        }}>
                          {dayData.items.map((item, idx) => {
                            const status = getLessonStatus(item.id);
                            const isCompleted = status === 'completed';
                            const isExamDay = item.type === 'exam_day';
                            const isDiagnostic = item.isDiagnostic;
                            const isPracticeTest = item.type === 'practice_test';
                            const isPractice = item.type === 'practice';
                            const isReview = item.type === 'review';
                            const isMockExam = item.type === 'mock_exam';

                            const bgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.1)'
                              : isMockExam ? 'rgba(220, 38, 38, 0.1)'
                              : isDiagnostic ? 'rgba(185, 28, 28, 0.1)'
                              : isPractice ? 'rgba(245, 158, 11, 0.1)'
                              : isReview ? 'rgba(16, 185, 129, 0.1)'
                              : 'rgba(59, 130, 246, 0.1)';

                            const hoverBgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.15)'
                              : isMockExam ? 'rgba(220, 38, 38, 0.15)'
                              : isDiagnostic ? 'rgba(185, 28, 28, 0.15)'
                              : isPractice ? 'rgba(245, 158, 11, 0.15)'
                              : isReview ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(59, 130, 246, 0.15)';

                            const textColorMatch = isPracticeTest ? '#dc2626'
                              : isMockExam ? '#dc2626'
                              : isDiagnostic ? '#b91c1c'
                              : isPractice ? '#f59e0b'
                              : isReview ? '#10b981'
                              : '#3b82f6';

                            if (isExamDay) {
                              return (
                                <div
                                  key={idx}
                                  style={{
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    border: '1px solid #fca5a5',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontWeight: '700'
                                  }}
                                >
                                  {item.title}
                                </div>
                              );
                            }

                            return (
                              <div
                                key={idx}
                                onClick={() => handleItemClick(item)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '1rem',
                                  padding: '1rem',
                                  background: bgColor,
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  transition: 'background 0.15s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setHoveredDayCell(null);
                                  e.currentTarget.style.background = hoverBgColor;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = bgColor;
                                }}
                              >
                                <span style={{
                                  fontSize: '0.875rem',
                                  fontWeight: '700',
                                  color: textColorMatch,
                                  flex: 1,
                                  textDecoration: item.status === 'completed' ? 'line-through' : 'none'
                                }}>
                                  {item.title}
                                </span>
                                {item.duration && (
                                  <span style={{
                                    fontSize: '0.75rem',
                                    color: '#6b7280'
                                  }}>
                                    {item.duration} min
                                  </span>
                                )}
                              </div>
                            );
                          })}

                          {/* Add Event Card */}
                          <div
                            onClick={() => {
                              soundEffects.playClick();
                              setCustomEventForm({
                                ...customEventForm,
                                date: dayData.dateString
                              });
                              setAddEventModalOpen(true);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              padding: '1rem',
                              background: '#f9fafb',
                              border: '2px dashed #d1d5db',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              marginTop: dayData.items.length > 0 ? '0.5rem' : '0'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#f3f4f6';
                              e.currentTarget.style.borderColor = '#9ca3af';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#f9fafb';
                              e.currentTarget.style.borderColor = '#d1d5db';
                            }}
                          >
                            <span style={{
                              fontSize: '1.25rem',
                              color: '#6b7280'
                            }}>+</span>
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: '#6b7280'
                            }}>
                              Add Event
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : calendarViewType === 'year' ? (
                // YEAR VIEW
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '2rem',
                  padding: '2.5rem',
                  background: '#ffffff',
                  overflowY: 'auto',
                  flex: 1
                }}>
                  {generateYearView().map((month, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        padding: '0',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Month name - left aligned and full name */}
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '0.5rem',
                        textAlign: 'left'
                      }}>
                        {month.monthDate.toLocaleDateString('en-US', { month: 'long' })}
                      </div>

                      {/* Day headers */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        marginBottom: '0.25rem'
                      }}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: '0.625rem',
                              fontWeight: '600',
                              color: '#9ca3af',
                              textAlign: 'center',
                              padding: '0.125rem'
                            }}
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Days grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '0.125rem'
                      }}>
                        {month.days.map((day, dayIdx) => {
                          if (!day) {
                            return <div key={dayIdx} style={{ padding: '0.375rem' }} />;
                          }

                          return (
                            <div
                              key={dayIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                soundEffects.playClick();
                                setCurrentDay(day.date);
                                setCalendarViewType('day');
                              }}
                              style={{
                                position: 'relative',
                                padding: '0.375rem',
                                fontSize: '0.7rem',
                                fontWeight: day.isToday ? '700' : '500',
                                color: day.isToday ? '#ffffff' : '#1a1a1a',
                                background: day.isToday ? '#3b82f6' : 'transparent',
                                borderRadius: '4px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (!day.isToday) {
                                  e.currentTarget.style.background = '#f3f4f6';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!day.isToday) {
                                  e.currentTarget.style.background = 'transparent';
                                }
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.15rem',
                                justifyContent: 'center'
                              }}>
                                <span>{day.dayNumber}</span>
                                {(() => {
                                  const dateStr = day.date.toISOString().split('T')[0];
                                  const holidays = getHolidays(day.date.getFullYear());
                                  const holiday = holidays[dateStr];
                                  if (holiday) {
                                    return (
                                      <span style={{
                                        fontSize: '0.45rem',
                                        opacity: 0.6,
                                        lineHeight: '1'
                                      }} title={holiday.name}>
                                        {holiday.emoji}
                                      </span>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                              {day.hasItems && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: '2px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: '3px',
                                  height: '3px',
                                  borderRadius: '50%',
                                  background: day.isToday ? '#ffffff' : '#3b82f6'
                                }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : calendarViewType === 'month' ? (
                // MONTH VIEW
                (() => {
                  const { weeks } = generateAppleCalendarView();
                  const totalWeeks = weeks.length;
                  return (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      flex: 1,
                      gridTemplateRows: `repeat(${totalWeeks}, 1fr)`,
                      overflow: 'hidden'
                    }}>
                    {weeks.map((week, weekIdx) => (
                      week.map((day, dayIdx) => (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        style={{
                          padding: '0.25rem',
                          borderRight: dayIdx < 6 ? '1px solid #d1d5db' : 'none',
                          borderBottom: weekIdx < totalWeeks - 1 ? '1px solid #d1d5db' : 'none',
                          background: day.isCurrentMonth ? '#ffffff' : '#fafafa',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Date Number with Holiday */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginBottom: '0.15rem',
                          flexShrink: 0,
                          gap: '0.2rem'
                        }}>
                          <div style={{
                            width: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            fontWeight: '700',
                            color: day.isToday ? '#ffffff' : day.isCurrentMonth ? '#1a1a1a' : '#9ca3af',
                            background: day.isToday ? '#ef4444' : 'transparent',
                            borderRadius: '50%'
                          }}>
                            {day.dayNumber}
                          </div>
                          {(() => {
                            const holidays = getHolidays(new Date(day.dateString).getFullYear());
                            const holiday = holidays[day.dateString];
                            if (holiday) {
                              return (
                                <span style={{
                                  fontSize: '0.55rem',
                                  opacity: 0.6
                                }} title={holiday.name}>
                                  {holiday.emoji}
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>


                        {/* Event Items */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: day.items.length <= 2 ? '0.1rem' : '0.075rem',
                            flex: 1,
                            minHeight: 0,
                            overflow: 'auto',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={() => setHoveredDayCell(day.dateString)}
                          onMouseLeave={() => setHoveredDayCell(null)}
                          onClick={(e) => {
                            // Only trigger if clicking on empty space
                            if (e.target === e.currentTarget || e.target.closest('[data-placeholder]')) {
                              e.stopPropagation();
                              soundEffects.playClick();
                              setCustomEventForm({
                                ...customEventForm,
                                date: day.dateString
                              });
                              setAddEventModalOpen(true);
                              setHoveredDayCell(null);
                            }
                          }}
                        >
                          {day.items.slice(0, day.items.length <= 2 ? 3 : 4).map((item, itemIdx) => {
                            const isDiagnostic = item.isDiagnostic;
                            const isPracticeTest = item.type === 'practice_test';
                            const isPractice = item.type === 'practice';
                            const isExamDay = item.type === 'exam_day';
                            const isReview = item.type === 'review';
                            const isMockExam = item.type === 'mock_exam';

                            // Adjust line clamp based on number of items
                            const lineClamp = day.items.length <= 2 ? 2 : 1;

                            const dotColor = isExamDay ? '#ffffff'
                              : isDiagnostic ? '#b91c1c'
                              : isPracticeTest ? '#dc2626'
                              : isMockExam ? '#dc2626'
                              : isPractice ? '#f59e0b'
                              : isReview ? '#10b981'
                              : '#3b82f6';

                            const textColor = isExamDay ? '#ffffff'
                              : isDiagnostic ? '#b91c1c'
                              : isPracticeTest ? '#dc2626'
                              : isMockExam ? '#dc2626'
                              : isPractice ? '#f59e0b'
                              : isReview ? '#10b981'
                              : '#3b82f6';

                            // Exam day gets special treatment
                            if (isExamDay) {
                              return (
                                <div
                                  key={itemIdx}
                                  onMouseEnter={(e) => {
                                    e.stopPropagation();
                                    setHoveredDayCell(null);
                                  }}
                                  style={{
                                    display: 'block',
                                    padding: day.items.length <= 2 ? '0.15rem 0.25rem' : '0.1rem 0.2rem',
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    border: '1px solid #fca5a5',
                                    borderRadius: '3px',
                                    cursor: 'default',
                                    fontSize: '0.55rem',
                                    fontWeight: '700',
                                    color: '#ffffff',
                                    boxShadow: '0 1px 3px rgba(220, 38, 38, 0.3)',
                                    lineHeight: day.items.length <= 2 ? '1.2' : '1.15'
                                  }}
                                  title={item.title}
                                >
                                  <span style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: lineClamp,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    wordBreak: 'break-word'
                                  }}>
                                    {item.title}
                                  </span>
                                </div>
                              );
                            }

                            // Determine background color based on item type
                            const bgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.1)'
                              : isMockExam ? 'rgba(220, 38, 38, 0.1)'
                              : isDiagnostic ? 'rgba(185, 28, 28, 0.1)'
                              : isPractice ? 'rgba(245, 158, 11, 0.1)'
                              : isReview ? 'rgba(16, 185, 129, 0.1)'
                              : 'rgba(59, 130, 246, 0.1)';

                            const hoverBgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.15)'
                              : isMockExam ? 'rgba(220, 38, 38, 0.15)'
                              : isDiagnostic ? 'rgba(185, 28, 28, 0.15)'
                              : isPractice ? 'rgba(245, 158, 11, 0.15)'
                              : isReview ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(59, 130, 246, 0.15)';

                            const textColorMatch = isPracticeTest ? '#dc2626'
                              : isMockExam ? '#dc2626'
                              : isDiagnostic ? '#b91c1c'
                              : isPractice ? '#f59e0b'
                              : isReview ? '#10b981'
                              : '#3b82f6';

                            return (
                              <div
                                key={itemIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundEffects.playClick();
                                  setPreviewItem({ ...item, date: day.date });
                                }}
                                style={{
                                  display: 'block',
                                  padding: day.items.length <= 2 ? '0.125rem 0.2rem' : '0.1rem 0.2rem',
                                  background: bgColor,
                                  borderRadius: '2px',
                                  cursor: 'pointer',
                                  fontSize: '0.55rem',
                                  fontWeight: '700',
                                  color: textColorMatch,
                                  transition: 'all 0.15s ease',
                                  border: 'none',
                                  lineHeight: day.items.length <= 2 ? '1.2' : '1.15'
                                }}
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setHoveredDayCell(null);
                                  e.currentTarget.style.background = hoverBgColor;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = bgColor;
                                }}
                                title={item.title}
                              >
                                <span style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: lineClamp,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  textDecoration: item.status === 'completed' ? 'line-through' : 'none',
                                  wordBreak: 'break-word'
                                }}>
                                  {item.title}
                                </span>
                              </div>
                            );
                          })}

                          {/* Placeholder for adding new event on hover */}
                          {hoveredDayCell === day.dateString && (
                            <div
                              data-placeholder="true"
                              style={{
                                padding: '0.125rem 0.2rem',
                                background: 'rgba(59, 130, 246, 0.05)',
                                border: '1px dashed rgba(59, 130, 246, 0.3)',
                                borderRadius: '2px',
                                fontSize: '0.55rem',
                                fontWeight: '700',
                                color: '#9ca3af',
                                textAlign: 'center',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              + Add Event
                            </div>
                          )}

                          {day.items.length > (day.items.length <= 2 ? 3 : 4) && (
                            <div style={{
                              padding: '0.15rem 0.25rem',
                              fontSize: '0.55rem',
                              fontWeight: '500',
                              color: '#6b7280',
                              textAlign: 'center'
                            }}>
                              +{day.items.length - (day.items.length <= 2 ? 3 : 4)} more
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )).flat()}
                    </div>
                  );
                })()
              ) : (
              // WEEK VIEW
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: '0',
                background: '#d1d5db'
              }}>
                {generateWeekView().map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: day.isToday ? '#eff6ff' : '#ffffff',
                      padding: '1rem 0.125rem',
                      height: '500px',
                      minHeight: '500px',
                      maxHeight: '500px',
                      width: '100%',
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      borderRight: idx < 6 ? '1px solid #d1d5db' : 'none'
                    }}
                  >
                    {/* Day Header - Just the date number */}
                    <div style={{ marginBottom: '1rem', flexShrink: 0, textAlign: 'center' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        fontSize: '1.125rem',
                        fontWeight: day.isToday ? '700' : '600',
                        color: day.isToday ? '#ffffff' : '#1a1a1a',
                        background: day.isToday ? '#3b82f6' : 'transparent',
                        borderRadius: '50%'
                      }}>
                        {day.dayNumber}
                      </div>
                    </div>

                    {/* Day Items */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.125rem',
                        minHeight: '400px',
                        maxHeight: '400px',
                        minWidth: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        padding: '0 0.125rem',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setHoveredDayCell(day.dateString)}
                      onMouseLeave={() => setHoveredDayCell(null)}
                      onClick={(e) => {
                        // Only trigger if clicking on empty space
                        if (e.target === e.currentTarget || e.target.closest('[data-placeholder]')) {
                          e.stopPropagation();
                          soundEffects.playClick();
                          setCustomEventForm({
                            ...customEventForm,
                            date: day.dateString
                          });
                          setAddEventModalOpen(true);
                          setHoveredDayCell(null);
                        }
                      }}
                    >
                      {day.items.map((item, itemIdx) => {
                        const status = getLessonStatus(item.id);
                        const isCompleted = status === 'completed';
                        const isExamDay = item.type === 'exam_day';
                        const isDiagnostic = item.isDiagnostic;
                        const isPracticeTest = item.type === 'practice_test';
                        const isPractice = item.type === 'practice';
                        const isReview = item.type === 'review';
                        const isMockExam = item.type === 'mock_exam';

                        // Determine dot color and text color based on item type
                        const dotColor = isExamDay ? '#dc2626'
                          : isDiagnostic ? '#b91c1c'
                          : isPracticeTest ? '#dc2626'
                          : isMockExam ? '#dc2626'
                          : isPractice ? '#f59e0b'
                          : isReview ? '#10b981'
                          : '#3b82f6';

                        const textColor = isExamDay ? '#dc2626'
                          : isDiagnostic ? '#b91c1c'
                          : isPracticeTest ? '#dc2626'
                          : isMockExam ? '#dc2626'
                          : isPractice ? '#f59e0b'
                          : isReview ? '#10b981'
                          : '#3b82f6';

                        const handleCheckboxClick = async (e) => {
                          e.stopPropagation();
                          await toggleItemCompletion(item.id);
                        };

                        // Exam day gets special treatment
                        if (isExamDay) {
                          return (
                            <div
                              key={itemIdx}
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                setHoveredDayCell(null);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.5rem',
                                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                border: '1px solid #fca5a5',
                                borderRadius: '6px',
                                cursor: 'default',
                                margin: '0.125rem 0',
                                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                              }}
                            >
                              {/* White Dot */}
                              <div
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: '#ffffff',
                                  flexShrink: 0,
                                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3)'
                                }}
                              />

                              {/* Content */}
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: '#ffffff',
                                lineHeight: '1.3',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1
                              }}>
                                {item.title}
                              </span>
                            </div>
                          );
                        }

                        // Determine background color based on item type
                        const bgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.1)'
                          : isMockExam ? 'rgba(220, 38, 38, 0.1)'
                          : isDiagnostic ? 'rgba(185, 28, 28, 0.1)'
                          : isPractice ? 'rgba(245, 158, 11, 0.1)'
                          : isReview ? 'rgba(16, 185, 129, 0.1)'
                          : 'rgba(59, 130, 246, 0.1)';

                        const hoverBgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.15)'
                          : isMockExam ? 'rgba(220, 38, 38, 0.15)'
                          : isDiagnostic ? 'rgba(185, 28, 28, 0.15)'
                          : isPractice ? 'rgba(245, 158, 11, 0.15)'
                          : isReview ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(59, 130, 246, 0.15)';

                        const textColorMatch = isPracticeTest ? '#dc2626'
                          : isMockExam ? '#dc2626'
                          : isDiagnostic ? '#b91c1c'
                          : isPractice ? '#f59e0b'
                          : isReview ? '#10b981'
                          : '#3b82f6';

                        return (
                          <div
                            key={itemIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              soundEffects.playClick();
                              setPreviewItem({ ...item, date: day.date });
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              padding: '0.5rem 0.75rem',
                              background: bgColor,
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease',
                              minWidth: 0,
                              marginBottom: '0.25rem',
                              width: '100%'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = hoverBgColor;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = bgColor;
                            }}
                          >
                            {/* Content */}
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              color: textColorMatch,
                              lineHeight: '1.4',
                              textAlign: 'left',
                              textDecoration: item.status === 'completed' ? 'line-through' : 'none'
                            }}>
                              {item.title}
                            </span>
                          </div>
                        );
                      })}

                      {/* Placeholder for adding new event on hover */}
                      {hoveredDayCell === day.dateString && (
                        <div
                          data-placeholder="true"
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: 'rgba(59, 130, 246, 0.05)',
                            border: '1px dashed rgba(59, 130, 246, 0.3)',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: '#9ca3af',
                            textAlign: 'center',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          + Add Event
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          ) : learningPath.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>
                No Learning Path Yet
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                Complete the diagnostic test to generate your personalized learning path based on your strengths and weaknesses.
              </p>
              <button
                onClick={() => {
                  soundEffects.playSuccess();
                  setDiagnosticTestOpen(true);
                }}
                style={{
                  background: '#b91c1c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#991b1b';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#b91c1c';
                }}
              >
                Start Diagnostic Test
              </button>
            </div>
          ) : learningPath.map((week, weekIndex) => {
            // Determine if this is the current week
            const now = new Date();
            const isCurrentWeek = now >= week.startDate && now <= week.endDate;

            return (
              <div key={weekIndex} className={`${classes.section} ${isCurrentWeek ? 'current' : ''}`} style={{ padding: 0 }}>
                <div
                  className={classes.sectionHeader}
                  style={{
                    background: 'linear-gradient(to right, #1e3a8a, #1e40af)',
                    borderBottom: '1px solid #1e40af',
                    padding: '0.5rem 1.5rem',
                    margin: 0,
                    borderRadius: '0'
                  }}
                >
                  <h2
                    className={classes.sectionTitle}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#ffffff',
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {week.week}
                  </h2>
                </div>
                <div className={classes.weekGrid} style={{ padding: '0.5rem 1rem' }}>
                  {week.items.map((item, itemIndex) => {
                    const status = getLessonStatus(item.id);
                    const isCompleted = status === 'completed';
                    const isExamDay = item.type === 'exam_day';
                    const isDiagnostic = item.isDiagnostic;
                    const isPractice = item.type === 'practice' || item.type === 'practice_test';
                    const isReview = item.type === 'review';
                    const isMockExam = item.type === 'mock_exam';

                    // Determine dot color and text color based on item type
                    const dotColor = isExamDay ? '#dc2626'
                      : isDiagnostic ? '#b91c1c'
                      : isPractice ? '#ef4444'
                      : isReview ? '#10b981'
                      : isMockExam ? '#3b82f6'
                      : '#64748b';

                    const textColor = isExamDay ? '#dc2626'
                      : isDiagnostic ? '#b91c1c'
                      : isPractice ? '#dc2626'
                      : isReview ? '#10b981'
                      : isMockExam ? '#3b82f6'
                      : '#6b7280';

                    const handleCheckboxClick = async (e) => {
                      e.stopPropagation();
                      await toggleItemCompletion(item.id);
                    };

                    // Exam day gets special treatment
                    if (isExamDay) {
                      return (
                        <div
                          key={itemIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.875rem',
                            padding: '0.85rem 0.75rem',
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            border: '2px solid #fca5a5',
                            borderRadius: '8px',
                            cursor: 'default',
                            margin: '0.25rem 0',
                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                          }}
                        >
                          {/* Dot */}
                          <div
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: '#ffffff',
                              flexShrink: 0,
                              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)'
                            }}
                          />

                          {/* Content */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                            <span
                              style={{
                                fontSize: '0.95rem',
                                color: '#ffffff',
                                fontWeight: '700',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {item.title}
                            </span>
                            <span style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffffff',
                              fontSize: '0.875rem',
                              flexShrink: 0
                            }}>
                              {getItemIcon(item.type)}
                            </span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={itemIndex}
                        className={`${classes.weekCard} ${isCompleted ? 'completed' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.875rem',
                          padding: '0.65rem 0.75rem',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          borderRadius: '0',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                          margin: '0 0 2px 0'
                        }}
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fafbfc';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {/* Checkbox */}
                        <div
                          onClick={handleCheckboxClick}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '5px',
                            border: '2.5px solid #d1d5db',
                            flexShrink: 0,
                            transition: 'border-color 0.2s ease',
                            position: 'relative',
                            background: isCompleted ? '#14b8a6' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {isCompleted && (
                            <span style={{
                              color: '#ffffff',
                              fontSize: '0.7rem',
                              fontWeight: '700'
                            }}>
                              ✓
                            </span>
                          )}
                        </div>

                        {/* Colored Dot */}
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: dotColor,
                            flexShrink: 0
                          }}
                        />

                        {/* Content */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                          <span
                            style={{
                              fontSize: '0.875rem',
                              color: textColor,
                              fontWeight: isDiagnostic || isMockExam || isReview ? '600' : '400',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {item.title}
                          </span>
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9ca3af',
                            fontSize: '0.875rem',
                            flexShrink: 0
                          }}>
                            {getItemIcon(item.type)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Item Modal */}
      {previewItem && (() => {
        // Determine colors based on item type
        const isPracticeTest = previewItem.type === 'practice_test' || previewItem.type === 'test';
        const isPractice = previewItem.type === 'practice';
        const isReview = previewItem.type === 'review';
        const isMockExam = previewItem.type === 'mock_exam';

        const headerBg = isPracticeTest ? '#fee2e2' : // Red for practice tests
                         isPractice ? '#fef3c7' :      // Yellow for practice
                         isReview ? '#dcfce7' :         // Green for review
                         isMockExam ? '#fef3c7' :       // Yellow for mock exams
                         '#dbeafe';                      // Blue for lessons

        const headerBorder = isPracticeTest ? '#fecaca' :
                            isPractice ? '#fde68a' :
                            isReview ? '#bbf7d0' :
                            isMockExam ? '#fde68a' :
                            '#bfdbfe';

        return (
          <div
            onClick={() => setPreviewItem(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: '2rem'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                padding: '0',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setPreviewItem(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 1001,
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  color: '#6b7280',
                  transition: 'all 0.15s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.color = '#1a1a1a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                ×
              </button>

              {/* Header */}
              <div style={{
                background: headerBg,
                borderBottom: `1px solid ${headerBorder}`,
                padding: '1.5rem 2.5rem 1rem',
                color: '#1a1a1a',
                flexShrink: 0
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  opacity: 0.9,
                  marginBottom: '0.5rem'
                }}>
                  {previewItem.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  lineHeight: '1.2',
                  color: '#3b82f6'
                }}>
                  {previewItem.title}
                </h2>
              </div>

            {/* Content */}
            <div style={{ padding: '2rem 2.5rem 2.5rem', overflowY: 'auto', flex: 1 }}>
              {false && previewItem.type === 'mock_exam' ? (
                <div>
                  <div style={{
                    background: '#fef3c7',
                    border: '2px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: '#92400e',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>🎯</span>
                      Final Mock Exam
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: '1.5' }}>
                      This is your final full-length practice exam before test day. Take it seriously and simulate real testing conditions.
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#374151' }}>Important:</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Find a quiet space with no distractions</li>
                      <li>Use a timer to enforce strict time limits</li>
                      <li>Review your performance thoroughly after</li>
                      <li>Identify last-minute areas to focus on</li>
                    </ul>
                  </div>
                </div>
              ) : previewItem.type === 'review' ? (
                <div>
                  <div style={{
                    background: '#d1fae5',
                    border: '1px solid #6ee7b7',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#065f46',
                      marginBottom: '0.5rem'
                    }}>
                      Weekly Review Session
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#047857', lineHeight: '1.5' }}>
                      {previewItem.description || 'Review and practice problems from this week to reinforce what you learned.'}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#374151' }}>Review activities:</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Review notes from this week's lessons</li>
                      <li>Redo practice problems you got wrong</li>
                      <li>Practice applying strategies you learned</li>
                      <li>Identify areas that need more focus</li>
                    </ul>
                  </div>
                </div>
              ) : isPracticeTest ? (
                <div>
                  <div style={{
                    background: '#fee2e2',
                    border: '2px solid #fca5a5',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: '#991b1b',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>📝</span>
                      Practice Test
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#7f1d1d', lineHeight: '1.5' }}>
                      {previewItem.section === 'full'
                        ? 'This is a full-length practice test covering all four sections: English, Math, Reading, and Science. Simulate real test conditions for the best practice.'
                        : `This practice test focuses on the ${previewItem.section?.charAt(0).toUpperCase() + previewItem.section?.slice(1)} section. Master this section with realistic practice questions.`
                      }
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#374151' }}>What to expect:</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Timed test simulation</li>
                      <li>Real ACT question format</li>
                      <li>Detailed score report after completion</li>
                      <li>Personalized recommendations</li>
                    </ul>
                  </div>
                </div>
              ) : previewItem.type === 'practice' ? (
                (() => {
                  // For practice items, show what lessons they'll be practicing
                  const practiceDate = previewItem.date;
                  // Find all lessons scheduled on the same day
                  const lessonsOnSameDay = learningPath
                    .flatMap(week => week.days)
                    .find(day => day.date === practiceDate)
                    ?.items.filter(item => item.type === 'lesson') || [];

                  const lessonTitles = lessonsOnSameDay.map(lesson => {
                    const lessonData = lessonStructure.find(l => l.id === (lesson.id || lesson.lessonKey));
                    return lessonData?.title || lesson.title || 'Lesson';
                  });

                  return (
                    <div>
                      <div style={{
                        background: '#fef3c7',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#92400e',
                          marginBottom: '0.5rem'
                        }}>
                          Practice Session
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: '1.5' }}>
                          {lessonTitles.length > 0
                            ? `Reinforce what you learned today with practice problems covering: ${lessonTitles.join(', ')}`
                            : 'Practice problems to reinforce concepts you\'ve learned recently.'}
                        </div>
                      </div>

                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginBottom: '1.5rem',
                        lineHeight: '1.6'
                      }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong style={{ color: '#374151' }}>What you'll do:</strong>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                          <li>Apply concepts from today's lessons</li>
                          <li>Work through practice problems</li>
                          <li>Get immediate feedback</li>
                          <li>Strengthen your understanding</li>
                        </ul>
                      </div>
                    </div>
                  );
                })()
              ) : (
                (() => {
                  // Look up lesson details from lessonStructure
                  const lessonId = previewItem.id || previewItem.lessonKey;
                  const lessonData = lessonStructure.find(l => l.id === lessonId);
                  const lessonDesc = lessonData?.desc || 'This lesson will help you master key concepts and strategies for the ACT.';
                  const lessonCategory = lessonData?.category || 'ACT Preparation';
                  const keyTerms = lessonData?.keyTerms || [];

                  return (
                    <div>
                      <div style={{
                        background: '#f5f3ff',
                        border: '1px solid #ddd6fe',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#6d28d9',
                          marginBottom: '0.5rem'
                        }}>
                          {lessonCategory}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>
                          {lessonDesc}
                        </div>
                      </div>

                      {keyTerms.length > 0 && (
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          marginBottom: '1.5rem',
                          lineHeight: '1.6'
                        }}>
                          <div style={{ marginBottom: '0.5rem' }}>
                            <strong style={{ color: '#374151' }}>Key concepts covered:</strong>
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            {keyTerms.slice(0, 4).map((term, idx) => (
                              <li key={idx}>{term}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {keyTerms.length === 0 && (
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          marginBottom: '1.5rem',
                          lineHeight: '1.6'
                        }}>
                          <div style={{ marginBottom: '0.5rem' }}>
                            <strong style={{ color: '#374151' }}>What you'll learn:</strong>
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            <li>Core concepts and strategies</li>
                            <li>Step-by-step examples</li>
                            <li>Practice problems</li>
                            <li>Expert tips and tricks</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}

              {/* Description - Show if available */}
              {previewItem.description && (
                <div style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Description
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {previewItem.description}
                  </div>
                </div>
              )}

              {/* Status badge */}
              {previewItem.status && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: previewItem.status === 'completed' ? '#dcfce7' :
                             previewItem.status === 'in-progress' ? '#fef3c7' :
                             '#f3f4f6',
                  color: previewItem.status === 'completed' ? '#166534' :
                         previewItem.status === 'in-progress' ? '#92400e' :
                         '#6b7280',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: previewItem.status === 'completed' ? '#16a34a' :
                               previewItem.status === 'in-progress' ? '#f59e0b' :
                               '#9ca3af'
                  }} />
                  {previewItem.status === 'completed' ? 'Completed' : previewItem.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                </div>
              )}

              {/* Action buttons */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                padding: '1.5rem 2.5rem',
                borderTop: '1px solid #e9ecef',
                background: '#fafbfc',
                flexShrink: 0
              }}>
                <button
                  onClick={() => {
                    soundEffects.playSuccess();
                    handleItemClick(previewItem);
                    setPreviewItem(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: isPracticeTest
                      ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                      : previewItem.type === 'mock_exam'
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : previewItem.type === 'review'
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : isPractice
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
                    color: 'white',
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  {previewItem.type === 'review' ? 'Start Review' : previewItem.type === 'mock_exam' ? 'Start Mock Exam' : isPracticeTest ? 'Start Test' : isPractice ? 'Start Practice' : 'Start Lesson'} →
                </button>
              </div>
            </div>
          </div>
        </div>
        );
      })()}

      {/* Edit Goals Modal */}
      {editModalOpen && (() => {
        // Real-time validation calculations
        const studyHours = editForm.study_hours || {};
        const regularStudyHours = Object.values(studyHours).reduce((sum, hours) => sum + (hours || 0), 0);
        const practiceTestHours = 3; // Guaranteed 3 hours for practice test
        const reviewHours = 2; // Guaranteed 2 hours for review
        const week1TotalHours = regularStudyHours + practiceTestHours + reviewHours;

        // Calculate Week 2 hours if alternating weeks is enabled
        let totalWeeklyHours = week1TotalHours;
        if (editForm.use_alternating_weeks) {
          const studyHoursWeek2 = editForm.study_hours_week2 || {};
          const regularStudyHoursWeek2 = Object.values(studyHoursWeek2).reduce((sum, hours) => sum + (hours || 0), 0);
          const week2TotalHours = regularStudyHoursWeek2 + practiceTestHours + reviewHours;
          // Average of both weeks
          totalWeeklyHours = (week1TotalHours + week2TotalHours) / 2;
        }

        const selectedTier = editForm.weekly_hours_tier || 'moderate';

        const tierRanges = {
          'light': { min: 1, max: 5, label: '1-5 hours/week' },
          'moderate': { min: 5, max: 10, label: '5-10 hours/week' },
          'intensive': { min: 10, max: 15, label: '10-15 hours/week' },
          'extreme': { min: 15, max: 100, label: '15+ hours/week' }
        };

        const range = tierRanges[selectedTier];
        const hoursMismatch = totalWeeklyHours < range.min || totalWeeklyHours > range.max;

        const reviewDay = editForm.review_day || 'sunday';
        const mockExamDay = editForm.mock_exam_day || 'saturday';
        const dayConflict = reviewDay === mockExamDay;

        return (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '1.5rem',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: '600', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Edit Study Plan
              </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Exam Date
                  </label>
                  <input
                    type="date"
                    value={editForm.target_exam_date}
                    onChange={(e) => setEditForm({ ...editForm, target_exam_date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: 'none',
                      borderBottom: '1px solid #e0e0e0',
                      fontSize: '0.8125rem',
                      outline: 'none',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: '#111'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Current Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    placeholder="Optional"
                    value={editForm.current_score}
                    onChange={(e) => setEditForm({ ...editForm, current_score: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: 'none',
                      borderBottom: '1px solid #e0e0e0',
                      fontSize: '0.8125rem',
                      outline: 'none',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: '#111'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Target Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={editForm.target_score}
                    onChange={(e) => setEditForm({ ...editForm, target_score: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: 'none',
                      borderBottom: '1px solid #e0e0e0',
                      fontSize: '0.8125rem',
                      outline: 'none',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: '#111'
                    }}
                  />
                </div>
              </div>

              {/* Alternating Weeks */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                <input
                  type="checkbox"
                  checked={editForm.use_alternating_weeks}
                  onChange={(e) => setEditForm({ ...editForm, use_alternating_weeks: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                <span>Alternating Weeks</span>
              </label>

              {/* Week 1 Schedule */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Week 1
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    {(() => {
                      const studyHoursTotal = Object.values(editForm.study_hours).reduce((sum, hours) => sum + (hours || 0), 0);
                      return (studyHoursTotal + 5).toFixed(1);
                    })()}h total
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                    const isMockExamDay = day === (editForm.mock_exam_day || 'saturday');
                    const isReviewDay = day === (editForm.review_day || 'sunday');
                    return (
                    <div key={day}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.6875rem',
                        fontWeight: '500',
                        color: '#111',
                        marginBottom: '0.25rem',
                        textTransform: 'capitalize',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        {day.slice(0, 3)}
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="12"
                        value={isMockExamDay ? 3 : isReviewDay ? 2 : (editForm.study_hours[day] || 0)}
                        disabled={isMockExamDay || isReviewDay}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          study_hours: {
                            ...editForm.study_hours,
                            [day]: parseFloat(e.target.value) || 0
                          }
                        })}
                        style={{
                          width: '100%',
                          padding: '0.375rem',
                          border: 'none',
                          borderBottom: '1px solid #e0e0e0',
                          fontSize: '0.8125rem',
                          textAlign: 'center',
                          background: 'transparent',
                          outline: 'none',
                          cursor: (isMockExamDay || isReviewDay) ? 'not-allowed' : 'text',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          color: '#111'
                        }}
                      />
                    </div>
                  );
                  })}
                </div>
              </div>

              {/* Week 2 Schedule (only if alternating weeks is checked) */}
              {editForm.use_alternating_weeks && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Week 2
                    </label>
                    <span style={{ fontSize: '0.75rem', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      {(() => {
                        const studyHoursTotal = Object.values(editForm.study_hours_week2).reduce((sum, hours) => sum + (hours || 0), 0);
                        return (studyHoursTotal + 5).toFixed(1);
                      })()}h total
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                      const isMockExamDay = day === (editForm.mock_exam_day || 'saturday');
                      const isReviewDay = day === (editForm.review_day || 'sunday');
                      return (
                        <div key={day}>
                          <label style={{
                            display: 'block',
                            fontSize: '0.6875rem',
                            fontWeight: '500',
                            color: '#111',
                            marginBottom: '0.25rem',
                            textTransform: 'capitalize',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                          }}>
                            {day.slice(0, 3)}
                          </label>
                          <input
                            type="number"
                            step="0.25"
                            min="0"
                            max="12"
                            value={isMockExamDay ? 3 : isReviewDay ? 2 : (editForm.study_hours_week2[day] || 0)}
                            disabled={isMockExamDay || isReviewDay}
                            onChange={(e) => setEditForm({
                              ...editForm,
                              study_hours_week2: {
                                ...editForm.study_hours_week2,
                                [day]: parseFloat(e.target.value) || 0
                              }
                            })}
                            style={{
                              width: '100%',
                              padding: '0.375rem',
                              border: 'none',
                              borderBottom: '1px solid #e0e0e0',
                              fontSize: '0.8125rem',
                              textAlign: 'center',
                              background: 'transparent',
                              outline: 'none',
                              cursor: (isMockExamDay || isReviewDay) ? 'not-allowed' : 'text',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              color: '#111'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Days Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {/* Mock Exam Day */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Mock Exam Day
                  </label>
                  <select
                    value={editForm.mock_exam_day}
                    onChange={(e) => setEditForm({ ...editForm, mock_exam_day: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: 'none',
                      borderBottom: '1px solid #e0e0e0',
                      fontSize: '0.8125rem',
                      background: 'transparent',
                      outline: 'none',
                      cursor: 'pointer',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: '#111'
                    }}
                  >
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                </div>

                {/* Review Day */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Review Day
                  </label>
                  <select
                    value={editForm.review_day}
                    onChange={(e) => setEditForm({ ...editForm, review_day: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: 'none',
                      borderBottom: '1px solid #e0e0e0',
                      fontSize: '0.8125rem',
                      background: 'transparent',
                      outline: 'none',
                      cursor: 'pointer',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: '#111'
                    }}
                  >
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                </div>
              </div>
              {dayConflict && (
                <p style={{ fontSize: '0.6875rem', color: '#ef4444', marginTop: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  Days cannot be the same
                </p>
              )}

              {/* Weekly Hours Tier */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  Study Commitment
                </label>
                <select
                  value={editForm.weekly_hours_tier}
                  onChange={(e) => setEditForm({ ...editForm, weekly_hours_tier: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    fontSize: '0.8125rem',
                    background: 'transparent',
                    outline: 'none',
                    cursor: 'pointer',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    color: '#111'
                  }}
                >
                  <option value="light" disabled={totalWeeklyHours > 5}>Light (1-5h/week)</option>
                  <option value="moderate" disabled={totalWeeklyHours < 5 || totalWeeklyHours > 10}>Moderate (5-10h/week)</option>
                  <option value="intensive" disabled={totalWeeklyHours < 10 || totalWeeklyHours > 15}>Intensive (10-15h/week)</option>
                  <option value="extreme" disabled={totalWeeklyHours < 15}>Extreme (15+h/week)</option>
                </select>
                {hoursMismatch && (
                  <p style={{ fontSize: '0.6875rem', color: '#ef4444', marginTop: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Hours mismatch ({totalWeeklyHours.toFixed(1)}h)
                  </p>
                )}
              </div>
            </div>

            {/* Save Error Display */}
            {validationError && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#fef2f2',
                borderRadius: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '500', color: '#dc2626', marginBottom: '0.25rem' }}>
                      {validationError.title}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.6875rem', color: '#991b1b' }}>
                      {validationError.message}
                    </p>
                    {validationError.suggestions && (
                      <ul style={{ margin: '0.25rem 0 0 1rem', paddingLeft: 0, fontSize: '0.6875rem', color: '#991b1b' }}>
                        {validationError.suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={() => setValidationError(null)}
                    style={{
                      padding: '0.125rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#991b1b',
                      fontSize: '1rem',
                      lineHeight: 1
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button
                onClick={() => setEditModalOpen(false)}
                disabled={savingGoals}
                style={{
                  flex: 1,
                  padding: '0.625rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  background: 'white',
                  color: '#111',
                  fontSize: '0.8125rem',
                  fontWeight: '500',
                  cursor: savingGoals ? 'not-allowed' : 'pointer',
                  opacity: savingGoals ? 0.5 : 1,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveUserGoals}
                disabled={savingGoals}
                style={{
                  flex: 1,
                  padding: '0.625rem',
                  border: 'none',
                  borderRadius: '4px',
                  background: savingGoals ? '#9ca3af' : '#1a1a1a',
                  color: 'white',
                  fontSize: '0.8125rem',
                  fontWeight: '500',
                  cursor: savingGoals ? 'not-allowed' : 'pointer',
                  opacity: savingGoals ? 0.7 : 1,
                  animation: saveButtonShake ? 'shake 0.5s' : 'none',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                {savingGoals ? 'Saving...' : 'Save'}
              </button>
            </div>

            <style>{`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
              }
            `}</style>
          </div>
        </div>
        );
      })()}

      {/* Add Event Modal */}
      {addEventModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
        onClick={() => setAddEventModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '1.5rem'
            }}>
              Add Custom Event
            </h2>

            {/* Event Title */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Event Title *
              </label>
              <input
                type="text"
                value={customEventForm.title}
                onChange={(e) => setCustomEventForm({ ...customEventForm, title: e.target.value })}
                placeholder="e.g., Study Session, Practice Problems"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#08245b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Date */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Date *
              </label>
              <input
                type="date"
                value={customEventForm.date}
                onChange={(e) => setCustomEventForm({ ...customEventForm, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#08245b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Event Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Event Type *
              </label>
              <select
                value={customEventForm.type}
                onChange={(e) => setCustomEventForm({ ...customEventForm, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                  background: '#ffffff',
                  cursor: 'pointer'
                }}
                onFocus={(e) => e.target.style.borderColor = '#08245b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              >
                <option value="lesson">Lesson</option>
                <option value="practice">Practice</option>
                <option value="practice_test">Practice Test</option>
                <option value="custom">Other</option>
              </select>
            </div>

            {/* Custom Color Picker - Only show if type is "custom" */}
            {customEventForm.type === 'custom' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  marginBottom: '0.5rem'
                }}>
                  Color
                </label>
                <input
                  type="color"
                  value={customEventForm.customColor}
                  onChange={(e) => setCustomEventForm({ ...customEventForm, customColor: e.target.value })}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0.25rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#08245b'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            )}

            {/* Duration */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Duration (minutes)
              </label>
              <input
                type="number"
                value={customEventForm.duration}
                onChange={(e) => setCustomEventForm({ ...customEventForm, duration: parseInt(e.target.value) || 30 })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#08245b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Description (Optional)
              </label>
              <textarea
                value={customEventForm.description}
                onChange={(e) => setCustomEventForm({ ...customEventForm, description: e.target.value })}
                placeholder="Add any notes or details..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#08245b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setAddEventModalOpen(false);
                  setCustomEventForm({
                    title: '',
                    date: '',
                    type: 'lesson',
                    description: '',
                    duration: 30,
                    customColor: '#6b7280'
                  });
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!customEventForm.title || !customEventForm.date) {
                    alert('Please fill in all required fields');
                    return;
                  }

                  try {
                    soundEffects.playClick();

                    // Save to Supabase
                    const { data, error } = await supabase
                      .from('custom_events')
                      .insert([{
                        user_id: user.id,
                        title: customEventForm.title,
                        scheduled_date: customEventForm.date,
                        duration: customEventForm.duration,
                        description: customEventForm.description,
                        event_type: customEventForm.type,
                        custom_color: customEventForm.type === 'custom' ? customEventForm.customColor : null
                      }]);

                    if (error) throw error;

                    soundEffects.playSuccess();
                    setAddEventModalOpen(false);
                    setCustomEventForm({
                      title: '',
                      date: '',
                      type: 'lesson',
                      description: '',
                      duration: 30,
                      customColor: '#6b7280'
                    });

                    // Reload learning path to include custom events
                    loadLearningPath();
                  } catch (error) {
                    console.error('Error saving custom event:', error);
                    alert('Failed to save event. Please try again.');
                  }
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#08245b',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0a2d75';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#08245b';
                }}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseContent;
