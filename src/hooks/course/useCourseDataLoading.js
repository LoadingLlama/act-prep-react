/**
 * Custom hook for course data loading functions
 * Extracted from CourseContent.jsx to improve modularity
 *
 * @param {Object} user - The authenticated user object
 * @param {Object} setters - Object containing all state setter functions
 * @param {Object} editForm - The current edit form state
 * @returns {Object} Object containing all data loading functions
 */

import { supabase } from '../../services/api/supabase.service';
import LearningPathService from '../../services/api/learning-path.service';

export const useCourseDataLoading = (user, setters, editForm) => {
  const {
    setDiagnosticCompleted,
    setLoadingDiagnostic,
    setUserGoals,
    setEditForm,
    setDiagnosticResults,
    setLearningPathData,
    setSavingGoals,
    setEditModalOpen,
    setSaveButtonShake,
    setValidationError,
    setIsRegeneratingPath
  } = setters;

  /**
   * Checks if the diagnostic test has been completed
   * Uses session storage cache for instant load, then verifies in background
   */
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

  /**
   * Verifies diagnostic completion status in the background
   * Updates cache and state if changed
   *
   * @param {string} cacheKey - The session storage cache key
   */
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

  /**
   * Loads user goals from the database
   * Ensures all days are present in study_hours and handles alternating weeks
   */
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

  /**
   * Saves user goals to the database and regenerates learning path
   * Validates daily hours match weekly tier and prevents review/mock exam day conflicts
   *
   * @returns {Promise<void>}
   */
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

      // Set loading state for calendar
      if (setIsRegeneratingPath) {
        setIsRegeneratingPath(true);
      }

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

        // Clear loading state after a brief delay to show the new calendar
        setTimeout(() => {
          if (setIsRegeneratingPath) {
            setIsRegeneratingPath(false);
          }
        }, 300);
      } catch (genError) {
        console.error('❌ Learning path generation failed:', genError);
        setSavingGoals(false);
        if (setIsRegeneratingPath) {
          setIsRegeneratingPath(false);
        }
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
      if (setIsRegeneratingPath) {
        setIsRegeneratingPath(false);
      }
      setValidationError({
        title: 'Unexpected Error',
        message: `An error occurred while saving: ${error.message}`,
        suggestions: ['Please try again', 'If the problem persists, contact support']
      });
    }
  };

  /**
   * Loads diagnostic test results and analysis
   *
   * @returns {Promise<Object|null>} Diagnostic results object or null
   */
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

  /**
   * Loads the user's learning path from the database
   * Uses session storage cache for instant load, then verifies in background
   */
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

  /**
   * Verifies learning path in the background
   * Updates cache and state if changed
   *
   * @param {string} cacheKey - The session storage cache key
   */
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

  return {
    checkDiagnosticCompletion,
    verifyDiagnosticInBackground,
    loadUserGoals,
    saveUserGoals,
    loadDiagnosticResults,
    loadLearningPath,
    verifyLearningPathInBackground
  };
};
