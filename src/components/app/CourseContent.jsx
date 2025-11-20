/**
 * Course Content Component
 * Shows recommended learning path with stats, lessons, and tests in order
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HiPencilSquare, HiQuestionMarkCircle, HiCheckCircle } from 'react-icons/hi2';
import { useCourseStyles } from '../../styles/app/course.styles';
import { supabase } from '../../services/api/supabase.service';
import { useAuth } from '../../contexts/AuthContext';
import soundEffects from '../../services/soundEffects';
import LearningPathService from '../../services/api/learning-path.service';

const CourseContent = () => {
  const classes = useCourseStyles();
  const { user } = useAuth();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onLessonOpen,
    onTestOpen,
    setDiagnosticTestOpen,
    updateLessonProgress
  } = useOutletContext();

  // State for user goals and edit modal
  const [userGoals, setUserGoals] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showMockExamTooltipModal, setShowMockExamTooltipModal] = useState(false);
  const [showReviewTooltipModal, setShowReviewTooltipModal] = useState(false);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(false);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState(true);
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [learningPathData, setLearningPathData] = useState(null);
  const [savingGoals, setSavingGoals] = useState(false);
  const [viewMode, setViewMode] = useState('calendar'); // 'list' or 'calendar' - default to calendar
  const [calendarViewType, setCalendarViewType] = useState('month'); // 'month' or 'week'
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek); // Start on Sunday
    return weekStart;
  });
  const [previewItem, setPreviewItem] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [saveButtonShake, setSaveButtonShake] = useState(false);
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
      loadUserGoals();
      checkDiagnosticCompletion();
      loadDiagnosticResults();
      loadLearningPath();
    } else {
      setLoadingDiagnostic(false);
      setDiagnosticCompleted(false);
    }
  }, [user]);

  const checkDiagnosticCompletion = async () => {
    try {
      // Get the latest completed diagnostic session
      const { data: session, error: sessionError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true)
        .order('session_start', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sessionError) throw sessionError;

      if (session) {
        setDiagnosticCompleted(true);
        console.log('📊 Diagnostic test completed:', session);
      } else {
        setDiagnosticCompleted(false);
        console.log('📋 No diagnostic test completed yet');
      }
    } catch (error) {
      console.error('Error checking diagnostic completion:', error);
      setDiagnosticCompleted(false);
    } finally {
      setLoadingDiagnostic(false);
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

      // Get active learning path with items (no lesson join since using lessonStructure)
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
          examDate: path.exam_date,
          path
        });
        setLearningPathData(path);
      } else {
        console.log('⚠️ No learning path found for user');
        setLearningPathData(null);
      }
    } catch (error) {
      console.error('❌ Exception loading learning path:', error);
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
    } else {
      navigateWeek(direction);
    }
  };

  const goToToday = () => {
    if (calendarViewType === 'month') {
      setCurrentMonth(new Date());
    } else {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - dayOfWeek);
      setCurrentWeekStart(weekStart);
    }
  };

  // Loading state
  if (loadingDiagnostic) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>Learning Path</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', color: '#6b7280' }}>
          Loading...
        </div>
      </div>
    );
  }

  // Locked state - diagnostic not completed (show blurred content)
  const renderLockedContent = () => {
    return (
      <div className={classes.container} style={{ position: 'relative' }}>
        <div className={classes.header}>
          <h1 className={classes.title}>Learning Path</h1>
        </div>

        {/* Blurred background content */}
        <div style={{
          filter: 'blur(8px)',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.4
        }}>
          <div className={classes.content}>
            {/* Top Stats Grid */}
            <div className={classes.statsGrid}>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Test Date</div>
                <div className={classes.statValue}>Dec 15</div>
                <div className={classes.statDetail}>45 days left</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Completed</div>
                <div className={classes.statValue}>0 / {totalLessons}</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>English</div>
                <div className={classes.statValue}>--</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Math</div>
                <div className={classes.statValue}>--</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Reading</div>
                <div className={classes.statValue}>--</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Science</div>
                <div className={classes.statValue}>--</div>
              </div>
            </div>

            {/* Weekly Assignments */}
            <div className={classes.weeksContainer}>
              {learningPath.map((week, weekIndex) => (
                <div key={weekIndex} className={classes.section}>
                  <div className={classes.sectionHeader}>
                    <h2 className={classes.sectionTitle}>{week.week}</h2>
                  </div>
                  <div className={classes.weekGrid}>
                    {week.items.map((item, itemIndex) => {
                      const isCompleted = item.status === 'completed';
                      const isLesson = item.type === 'lesson';
                      const isPractice = item.type === 'practice' || item.type === 'practice_test';

                      // Color text instead of backgrounds
                      const textColor = item.isDiagnostic ? '#b91c1c'
                        : isPractice ? '#dc2626'
                        : isLesson ? '#6b7280'
                        : '#1a1a1a';

                      const handleCheckboxClick = (e) => {
                        e.stopPropagation();
                        // TODO: Toggle completion status
                        console.log('Checkbox clicked for:', item.title);
                      };

                      return (
                        <div
                          key={itemIndex}
                          className={`${classes.weekCard} ${isCompleted ? 'completed' : ''}`}
                        >
                          <div
                            className={classes.weekCardCheckbox}
                            onClick={handleCheckboxClick}
                          ></div>
                          <div className={classes.weekCardContent}>
                            <div className={classes.weekCardTextWrapper}>
                              <span
                                className={classes.weekCardText}
                                style={{
                                  color: textColor,
                                  fontWeight: item.isDiagnostic ? '600' : '400'
                                }}
                              >
                                {item.title}
                              </span>
                              <span className={classes.weekCardIcon}>
                                {getItemIcon(item.type)}
                              </span>
                            </div>
                            {item.description && (
                              <span style={{
                                fontSize: '0.8125rem',
                                color: '#9ca3af',
                                lineHeight: '1.4',
                                fontWeight: '400'
                              }}>
                                {item.description}
                              </span>
                            )}
                          </div>
                          <span className={classes.weekCardArrow}>→</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lock overlay */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',
          padding: '0 2rem'
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

  if (!diagnosticCompleted) {
    return renderLockedContent();
  }

  return (
    <div className={classes.container}>
      {/* Header */}
      <div className={classes.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 className={classes.title}>Learning Path</h1>
          {/* View Toggle */}
          <div style={{
            display: 'inline-flex',
            background: '#f1f5f9',
            borderRadius: '100px',
            padding: '0.25rem',
            gap: '0.25rem',
            border: '1px solid #e2e8f0'
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
                fontWeight: viewMode === 'calendar' ? '600' : '500',
                color: viewMode === 'calendar' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: viewMode === 'calendar' ? '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)' : 'none',
                whiteSpace: 'nowrap'
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
                fontWeight: viewMode === 'list' ? '600' : '500',
                color: viewMode === 'list' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: viewMode === 'list' ? '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)' : 'none',
                whiteSpace: 'nowrap'
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
        </div>
        <button
          onClick={() => setEditModalOpen(true)}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#1a1a1a'}
          onMouseLeave={(e) => e.target.style.color = '#6b7280'}
        >
          <HiPencilSquare style={{ width: '16px', height: '16px' }} />
          Edit Goals
        </button>
      </div>

      {/* Main Content */}
      <div className={classes.content}>
        {/* Top Stats Grid */}
        <div className={classes.statsGrid}>
          {/* Test Date */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Test Date</div>
            <div className={classes.statValue}>{testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div className={classes.statDetail}>{daysUntilTest} days left</div>
          </div>

          {/* Completed */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Completed</div>
            <div className={classes.statValue}>{completedLessons} / {totalLessons}</div>
          </div>

          {/* English */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>English</div>
            <div className={classes.statValue}>{sectionStrengths.English}%</div>
          </div>

          {/* Math */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Math</div>
            <div className={classes.statValue}>{sectionStrengths.Math}%</div>
          </div>

          {/* Reading */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Reading</div>
            <div className={classes.statValue}>{sectionStrengths.Reading}%</div>
          </div>

          {/* Science */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Science</div>
            <div className={classes.statValue}>{sectionStrengths.Science}%</div>
          </div>
        </div>

        {/* Weekly Assignments - List or Calendar View */}
        <div className={classes.weeksContainer}>
          {viewMode === 'calendar' && learningPath.length > 0 ? (
            // Apple Calendar View
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              {/* Month Header with Navigation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #e5e7eb',
                background: '#fafafa'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h2 style={{
                    fontSize: '1.375rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    {calendarViewType === 'month'
                      ? currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : `Week of ${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    }
                  </h2>
                  {/* Month/Week Toggle */}
                  <div style={{
                    display: 'inline-flex',
                    background: '#f1f5f9',
                    borderRadius: '100px',
                    padding: '0.25rem',
                    gap: '0.25rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setCalendarViewType('month');
                      }}
                      style={{
                        background: calendarViewType === 'month' ? '#08245b' : 'transparent',
                        border: 'none',
                        borderRadius: '100px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.75rem',
                        fontWeight: calendarViewType === 'month' ? '600' : '500',
                        color: calendarViewType === 'month' ? '#ffffff' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: calendarViewType === 'month' ? '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)' : 'none',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        if (calendarViewType !== 'month') {
                          e.target.style.color = '#1a1a1a';
                          e.target.style.background = '#e2e8f0';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (calendarViewType !== 'month') {
                          e.target.style.color = '#64748b';
                          e.target.style.background = 'transparent';
                        }
                      }}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setCalendarViewType('week');
                      }}
                      style={{
                        background: calendarViewType === 'week' ? '#08245b' : 'transparent',
                        border: 'none',
                        borderRadius: '100px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.75rem',
                        fontWeight: calendarViewType === 'week' ? '600' : '500',
                        color: calendarViewType === 'week' ? '#ffffff' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: calendarViewType === 'week' ? '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)' : 'none',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        if (calendarViewType !== 'week') {
                          e.target.style.color = '#1a1a1a';
                          e.target.style.background = '#e2e8f0';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (calendarViewType !== 'week') {
                          e.target.style.color = '#64748b';
                          e.target.style.background = 'transparent';
                        }
                      }}
                    >
                      Week
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      navigateCalendar(-1);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '1rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ffffff';
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      goToToday();
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      padding: '0 0.75rem',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '0.8125rem',
                      fontWeight: '500',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ffffff';
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      navigateCalendar(1);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '1rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ffffff';
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Day of Week Headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderBottom: '1px solid #d1d5db',
                borderLeft: '1px solid #d1d5db',
                borderRight: '1px solid #d1d5db',
                background: '#fafafa'
              }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
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

              {/* Calendar Grid - Month or Week View */}
              {calendarViewType === 'month' ? (
                // MONTH VIEW
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gridAutoRows: '90px',
                  borderLeft: '1px solid #d1d5db',
                  borderRight: '1px solid #d1d5db',
                  borderBottom: '1px solid #d1d5db'
                }}>
                  {(() => {
                    const { weeks } = generateAppleCalendarView();
                    const totalWeeks = weeks.length;
                    return weeks.map((week, weekIdx) => (
                      week.map((day, dayIdx) => (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        style={{
                          padding: '0.375rem',
                          borderRight: dayIdx < 6 ? '1px solid #d1d5db' : 'none',
                          borderBottom: weekIdx < totalWeeks - 1 ? '1px solid #d1d5db' : 'none',
                          background: day.isCurrentMonth ? '#ffffff' : '#fafafa',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '90px',
                          minHeight: '90px',
                          maxHeight: '90px',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Date Number */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '0.25rem',
                          flexShrink: 0
                        }}>
                          <div style={{
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: day.isToday ? '600' : '500',
                            color: day.isToday ? '#ffffff' : day.isCurrentMonth ? '#1a1a1a' : '#9ca3af',
                            background: day.isToday ? '#ef4444' : 'transparent',
                            borderRadius: '50%'
                          }}>
                            {day.dayNumber}
                          </div>
                        </div>

                        {/* Event Items */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.1875rem',
                          flex: 1,
                          minHeight: 0,
                          overflow: 'auto'
                        }}>
                          {day.items.slice(0, 3).map((item, itemIdx) => {
                            const isDiagnostic = item.isDiagnostic;
                            const isPractice = item.type === 'practice' || item.type === 'practice_test';
                            const isExamDay = item.type === 'exam_day';
                            const isReview = item.type === 'review';
                            const isMockExam = item.type === 'mock_exam';

                            const dotColor = isExamDay ? '#ffffff'
                              : isDiagnostic ? '#b91c1c'
                              : isPractice ? '#ef4444'
                              : isReview ? '#10b981'
                              : isMockExam ? '#3b82f6'
                              : '#64748b';

                            const textColor = isExamDay ? '#ffffff'
                              : isDiagnostic ? '#b91c1c'
                              : isPractice ? '#dc2626'
                              : isReview ? '#10b981'
                              : isMockExam ? '#3b82f6'
                              : '#6b7280';

                            // Exam day gets special treatment
                            if (isExamDay) {
                              return (
                                <div
                                  key={itemIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    padding: '0.25rem 0.375rem',
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    border: '1px solid #fca5a5',
                                    borderRadius: '4px',
                                    cursor: 'default',
                                    fontSize: '0.625rem',
                                    fontWeight: '700',
                                    color: '#ffffff',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)'
                                  }}
                                  title={item.title}
                                >
                                  <div
                                    style={{
                                      width: '4px',
                                      height: '4px',
                                      borderRadius: '50%',
                                      background: '#ffffff',
                                      flexShrink: 0
                                    }}
                                  />
                                  <span style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {item.title}
                                  </span>
                                </div>
                              );
                            }

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
                                  gap: '0.25rem',
                                  padding: '0.1875rem 0.3125rem',
                                  background: 'transparent',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                  fontSize: '0.625rem',
                                  fontWeight: isDiagnostic || isMockExam || isReview ? '600' : '400',
                                  color: textColor,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  transition: 'all 0.15s ease',
                                  border: 'none'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f3f4f6';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                }}
                                title={item.title}
                              >
                                <div
                                  style={{
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    background: dotColor,
                                    flexShrink: 0
                                  }}
                                />
                                <span style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {item.title}
                                </span>
                              </div>
                            );
                          })}
                          {day.items.length > 3 && (
                            <div style={{
                              padding: '0.25rem 0.375rem',
                              fontSize: '0.6875rem',
                              fontWeight: '500',
                              color: '#6b7280',
                              textAlign: 'center'
                            }}>
                              +{day.items.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )).flat();
                })()}
              </div>
            ) : (
              // WEEK VIEW
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: '0',
                background: '#d1d5db',
                borderLeft: '1px solid #d1d5db',
                borderRight: '1px solid #d1d5db',
                borderBottom: '1px solid #d1d5db'
              }}>
                {generateWeekView().map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: day.isToday ? '#eff6ff' : '#ffffff',
                      padding: '1rem',
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
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      minHeight: '400px',
                      maxHeight: '400px',
                      minWidth: 0,
                      overflowY: 'auto',
                      overflowX: 'hidden'
                    }}>
                      {day.items.length === 0 ? (
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#d1d5db',
                          textAlign: 'center',
                          marginTop: '1rem'
                        }}>
                          No events
                        </div>
                      ) : day.items.map((item, itemIdx) => {
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
                              key={itemIdx}
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

                        return (
                          <div
                            key={itemIdx}
                            onClick={() => handleItemClick(item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.375rem 0.5rem',
                              background: 'transparent',
                              border: 'none',
                              borderBottom: '1px solid #f3f4f6',
                              borderRadius: '0',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease',
                              minWidth: 0,
                              overflow: 'hidden'
                            }}
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
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px',
                                border: '2px solid #d1d5db',
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
                                  fontSize: '0.625rem',
                                  fontWeight: '700'
                                }}>
                                  ✓
                                </span>
                              )}
                            </div>

                            {/* Colored Dot */}
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: dotColor,
                                flexShrink: 0
                              }}
                            />

                            {/* Content */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                              flex: 1,
                              minWidth: 0
                            }}>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: isDiagnostic || isMockExam || isReview ? '600' : '400',
                                color: textColor,
                                lineHeight: '1.3',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1
                              }}>
                                {item.title}
                              </span>
                              <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#9ca3af',
                                fontSize: '0.75rem',
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
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '0',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb',
              padding: '2rem',
              color: '#1a1a1a'
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
                lineHeight: '1.2'
              }}>
                {previewItem.title}
              </h2>
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.875rem',
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  background: '#e5e7eb',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {previewItem.type === 'test' ? 'Practice Test' : previewItem.type === 'mock_exam' ? 'Mock Exam' : previewItem.type === 'review' ? 'Review Day' : previewItem.type === 'practice' ? 'Practice' : 'Lesson'}
                </span>
                <span>•</span>
                <span>{previewItem.duration} minutes</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>
              {previewItem.type === 'mock_exam' ? (
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
              ) : previewItem.type === 'test' ? (
                <div>
                  <div style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#1e40af',
                      marginBottom: '0.5rem'
                    }}>
                      Test Details
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>
                      {previewItem.section === 'full'
                        ? 'This is a full-length practice test covering all four sections: English, Math, Reading, and Science.'
                        : `This practice test focuses on the ${previewItem.section.charAt(0).toUpperCase() + previewItem.section.slice(1)} section.`
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

              {/* Status badge */}
              {previewItem.status && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: previewItem.status === 'completed' ? '#dcfce7' : '#fef3c7',
                  color: previewItem.status === 'completed' ? '#166534' : '#92400e',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: '500',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: previewItem.status === 'completed' ? '#16a34a' : '#f59e0b'
                  }} />
                  {previewItem.status === 'completed' ? 'Completed' : previewItem.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setPreviewItem(null)}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#374151',
                    fontSize: '0.9375rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    soundEffects.playSuccess();
                    handleItemClick(previewItem);
                    setPreviewItem(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: previewItem.type === 'test' || previewItem.type === 'mock_exam'
                      ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                      : previewItem.type === 'review'
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
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
                  {previewItem.type === 'review' ? 'Start Review' : previewItem.type === 'mock_exam' ? 'Start Mock Exam' : previewItem.type === 'test' ? 'Start Test' : 'Start Lesson'} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '900px',
              width: '100%',
              margin: '2rem auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#1a1a1a' }}>
                Edit Learning Path Goals
              </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Basic Info Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                {/* Target Exam Date */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Target Exam Date
                  </label>
                  <input
                    type="date"
                    value={editForm.target_exam_date}
                    onChange={(e) => setEditForm({ ...editForm, target_exam_date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Current Score */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Current ACT Score (Optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    placeholder="1-36"
                    value={editForm.current_score}
                    onChange={(e) => setEditForm({ ...editForm, current_score: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Target Score */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Target ACT Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    placeholder="1-36"
                    value={editForm.target_score}
                    onChange={(e) => setEditForm({ ...editForm, target_score: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>

              {/* Alternating Weeks Checkbox */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <input
                  type="checkbox"
                  id="use_alternating_weeks"
                  checked={editForm.use_alternating_weeks}
                  onChange={(e) => setEditForm({ ...editForm, use_alternating_weeks: e.target.checked })}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="use_alternating_weeks" style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  cursor: 'pointer'
                }}>
                  Use Alternating Weeks (Different schedule for Week 1 vs Week 2)
                </label>
              </div>

              {/* Week 1 Schedule */}
              <div style={{
                padding: '1.25rem',
                background: '#ffffff',
                borderRadius: '8px',
                border: hoursMismatch ? '1px solid #ef4444' : '1px solid #e5e7eb',
                borderLeft: hoursMismatch ? '3px solid #ef4444' : '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1a1a1a'
                  }}>
                    Week 1 Schedule - Daily Study Hours
                  </h3>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontWeight: '500',
                    padding: '0.25rem 0.5rem',
                    background: '#f3f4f6',
                    borderRadius: '4px'
                  }}>
                    {(() => {
                      const studyHoursTotal = Object.values(editForm.study_hours).reduce((sum, hours) => sum + (hours || 0), 0);
                      const practiceTestHours = 3; // Practice tests count as 3 hours
                      const reviewHours = 2; // Review day counts as 2 hours
                      return (studyHoursTotal + practiceTestHours + reviewHours).toFixed(1);
                    })()}h total (includes 3h practice test + 2h review)
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                    const isMockExamDay = day === (editForm.mock_exam_day || 'saturday');
                    const isReviewDay = day === (editForm.review_day || 'sunday');
                    return (
                    <div key={day}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: isMockExamDay ? '#3b82f6' : isReviewDay ? '#10b981' : '#6b7280',
                        marginBottom: '0.375rem',
                        textTransform: 'capitalize',
                        opacity: (isMockExamDay || isReviewDay) ? 0.6 : 1
                      }}>
                        {day.slice(0, 3)}
                        {isMockExamDay && ' 🎯'}
                        {isReviewDay && ' ✓'}
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
                          padding: '0.5rem',
                          border: `1px solid ${isMockExamDay ? '#3b82f6' : isReviewDay ? '#10b981' : '#d1d5db'}`,
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontFamily: 'inherit',
                          textAlign: 'center',
                          background: isMockExamDay ? '#eff6ff' : isReviewDay ? '#d1fae5' : 'white',
                          cursor: (isMockExamDay || isReviewDay) ? 'not-allowed' : 'text',
                          fontWeight: (isMockExamDay || isReviewDay) ? '700' : '400',
                          opacity: (isMockExamDay || isReviewDay) ? 0.6 : 1
                        }}
                      />
                      <div style={{
                        fontSize: '0.625rem',
                        color: isMockExamDay ? '#3b82f6' : isReviewDay ? '#10b981' : '#9ca3af',
                        marginTop: '0.25rem',
                        textAlign: 'center',
                        fontWeight: (isMockExamDay || isReviewDay) ? '700' : '400',
                        opacity: (isMockExamDay || isReviewDay) ? 0.6 : 1
                      }}>
                        {isMockExamDay ? '3h' : isReviewDay ? '2h' : `${editForm.study_hours[day] || 0}h`}
                      </div>
                    </div>
                  );
                  })}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#6b7280',
                  marginTop: '0.75rem',
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  💡 Recommended: Schedule your review day (✓) the day after taking practice tests (🎯)
                </div>
              </div>

              {/* Week 2 Schedule (only if alternating weeks is checked) */}
              {editForm.use_alternating_weeks && (
                <div style={{
                  padding: '1.25rem',
                  background: '#eff6ff',
                  borderRadius: '8px',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#1e40af'
                    }}>
                      Week 2 Schedule - Daily Study Hours
                    </h3>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#1e40af',
                      fontWeight: '500',
                      padding: '0.25rem 0.5rem',
                      background: '#eff6ff',
                      borderRadius: '4px'
                    }}>
                      {(() => {
                        const studyHoursTotal = Object.values(editForm.study_hours_week2).reduce((sum, hours) => sum + (hours || 0), 0);
                        const practiceTestHours = 3;
                        const reviewHours = 2;
                        return (studyHoursTotal + practiceTestHours + reviewHours).toFixed(1);
                      })()}h total (includes 3h practice test + 2h review)
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                      const isMockExamDay = day === (editForm.mock_exam_day || 'saturday');
                      const isReviewDay = day === (editForm.review_day || 'sunday');
                      return (
                        <div key={day}>
                          <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: isMockExamDay ? '#3b82f6' : isReviewDay ? '#10b981' : '#1e40af',
                            marginBottom: '0.375rem',
                            textTransform: 'capitalize',
                            opacity: (isMockExamDay || isReviewDay) ? 0.6 : 1
                          }}>
                            {day.slice(0, 3)}
                            {isMockExamDay && ' 🎯'}
                            {isReviewDay && ' ✓'}
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
                              padding: '0.5rem',
                              border: `1px solid ${isMockExamDay ? '#3b82f6' : isReviewDay ? '#10b981' : '#bfdbfe'}`,
                              borderRadius: '6px',
                              fontSize: '0.875rem',
                              fontFamily: 'inherit',
                              textAlign: 'center',
                              background: isMockExamDay ? '#eff6ff' : isReviewDay ? '#d1fae5' : '#ffffff',
                              cursor: (isMockExamDay || isReviewDay) ? 'not-allowed' : 'text',
                              fontWeight: (isMockExamDay || isReviewDay) ? '700' : '400',
                              opacity: (isMockExamDay || isReviewDay) ? 0.6 : 1
                            }}
                          />
                          <div style={{
                            fontSize: '0.625rem',
                            color: isMockExamDay ? '#3b82f6' : isReviewDay ? '#10b981' : '#1e40af',
                            marginTop: '0.25rem',
                            textAlign: 'center',
                            fontWeight: (isMockExamDay || isReviewDay) ? '700' : '400',
                            opacity: (isMockExamDay || isReviewDay) ? 0.6 : 1
                          }}>
                            {isMockExamDay ? '3h' : isReviewDay ? '2h' : `${editForm.study_hours_week2[day] || 0}h`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#6b7280',
                    marginTop: '0.75rem',
                    fontStyle: 'italic',
                    textAlign: 'center'
                  }}>
                    💡 Recommended: Schedule your review day (✓) the day after taking practice tests (🎯)
                  </div>
                </div>
              )}

              {/* Special Days Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {/* Mock Exam Day */}
                <div style={{ position: 'relative' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#3b82f6',
                    marginBottom: '0.5rem'
                  }}>
                    🎯 Mock Exam Day (3h)
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <HiQuestionMarkCircle
                        onMouseEnter={() => setShowMockExamTooltipModal(true)}
                        onMouseLeave={() => setShowMockExamTooltipModal(false)}
                        style={{
                          fontSize: '1rem',
                          color: '#6b7280',
                          cursor: 'help',
                          transition: 'color 0.2s'
                        }}
                      />
                      {showMockExamTooltipModal && (
                        <div style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginBottom: '0.5rem',
                          padding: '0.75rem',
                          backgroundColor: '#111827',
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          lineHeight: '1.5',
                          zIndex: 1000,
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          width: '280px',
                          whiteSpace: 'normal'
                        }}>
                          Choose a day when you have 3 uninterrupted hours to take a full practice test. Saturday is recommended as it mimics real ACT test day conditions.
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid #111827'
                          }} />
                        </div>
                      )}
                    </div>
                  </label>
                  <select
                    value={editForm.mock_exam_day}
                    onChange={(e) => setEditForm({ ...editForm, mock_exam_day: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: dayConflict ? '2px solid #ef4444' : '2px solid #3b82f6',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                      backgroundColor: '#eff6ff',
                      color: '#1e40af',
                      fontWeight: '400',
                      cursor: 'pointer'
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
                  <small style={{ fontSize: '0.75rem', color: '#2563eb', marginTop: '0.25rem', display: 'block', fontWeight: '400' }}>
                    Automatically set to 3 hours
                  </small>
                </div>

                {/* Review Day */}
                <div style={{ position: 'relative' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#10b981',
                    marginBottom: '0.5rem'
                  }}>
                    <HiCheckCircle style={{ display: 'inline' }} />
                    Weekly Review Day (2h)
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <HiQuestionMarkCircle
                        onMouseEnter={() => setShowReviewTooltipModal(true)}
                        onMouseLeave={() => setShowReviewTooltipModal(false)}
                        style={{
                          fontSize: '1rem',
                          color: '#6b7280',
                          cursor: 'help',
                          transition: 'color 0.2s'
                        }}
                      />
                      {showReviewTooltipModal && (
                        <div style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginBottom: '0.5rem',
                          padding: '0.75rem',
                          backgroundColor: '#111827',
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          lineHeight: '1.5',
                          zIndex: 1000,
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          width: '280px',
                          whiteSpace: 'normal'
                        }}>
                          💡 Schedule this the day after your practice test (🎯). This lets you review mistakes while fresh, turning weak areas into learning opportunities.
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid #111827'
                          }} />
                        </div>
                      )}
                    </div>
                  </label>
                  <select
                    value={editForm.review_day}
                    onChange={(e) => setEditForm({ ...editForm, review_day: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: dayConflict ? '2px solid #ef4444' : '2px solid #10b981',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      fontWeight: '400',
                      cursor: 'pointer'
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
                  <small style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', display: 'block', fontWeight: '400' }}>
                    Automatically set to 2 hours
                  </small>
                </div>
              </div>
              {dayConflict && (
                <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: '500' }}>
                  Review Day and Mock Exam Day cannot be the same day
                </p>
              )}

              {/* Weekly Hours Tier */}
              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Weekly Study Commitment
                </label>
                <select
                  value={editForm.weekly_hours_tier}
                  onChange={(e) => setEditForm({ ...editForm, weekly_hours_tier: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: hoursMismatch ? '1px solid #ef4444' : '1px solid #d1d5db',
                    borderLeft: hoursMismatch ? '3px solid #ef4444' : '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    background: 'white'
                  }}
                >
                  <option value="light" disabled={totalWeeklyHours > 5}>Light (1-5 hours/week)</option>
                  <option value="moderate" disabled={totalWeeklyHours < 5 || totalWeeklyHours > 10}>Moderate (5-10 hours/week)</option>
                  <option value="intensive" disabled={totalWeeklyHours < 10 || totalWeeklyHours > 15}>Intensive (10-15 hours/week)</option>
                  <option value="extreme" disabled={totalWeeklyHours < 15}>Extreme (15+ hours/week)</option>
                </select>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  {editForm.use_alternating_weeks
                    ? `Average: ${totalWeeklyHours.toFixed(1)}h/week (both weeks include 3h practice test + 2h review)`
                    : `Total: ${totalWeeklyHours.toFixed(1)}h/week (includes 3h practice test + 2h review)`
                  }
                </p>
                {hoursMismatch && (
                  <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: '500' }}>
                    Your {editForm.use_alternating_weeks ? 'average' : 'total'} hours ({totalWeeklyHours.toFixed(1)}h/week) don't match {selectedTier.toUpperCase()} ({range.label})
                  </p>
                )}
              </div>
            </div>

            {/* Save Error Display */}
            {validationError && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderLeft: '3px solid #ef4444',
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>❌</span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#991b1b',
                      marginBottom: '0.5rem'
                    }}>
                      {validationError.title}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.8125rem',
                      color: '#7f1d1d',
                      marginBottom: validationError.suggestions ? '0.75rem' : 0
                    }}>
                      {validationError.message}
                    </p>
                    {validationError.suggestions && (
                      <ul style={{
                        margin: 0,
                        paddingLeft: '1.25rem',
                        fontSize: '0.8125rem',
                        color: '#7f1d1d'
                      }}>
                        {validationError.suggestions.map((suggestion, idx) => (
                          <li key={idx} style={{ marginBottom: '0.25rem' }}>{suggestion}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={() => setValidationError(null)}
                    style={{
                      padding: '0.25rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#991b1b',
                      fontSize: '1.25rem',
                      lineHeight: 1
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button
                onClick={() => setEditModalOpen(false)}
                disabled={savingGoals}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  background: 'white',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: savingGoals ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                  opacity: savingGoals ? 0.5 : 1
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveUserGoals}
                disabled={savingGoals}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: savingGoals ? '#9ca3af' : '#1a1a1a',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: savingGoals ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                  opacity: savingGoals ? 0.7 : 1,
                  animation: saveButtonShake ? 'shake 0.5s' : 'none'
                }}
              >
                {savingGoals ? 'Saving...' : 'Save Changes'}
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

    </div>
  );
};

export default CourseContent;
