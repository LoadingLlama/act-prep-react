/**
 * Course Content Component
 * Shows recommended learning path with stats, lessons, and tests in order
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { HiBookOpen, HiDocumentText, HiPencilSquare, HiAcademicCap, HiUserCircle, HiSparkles } from 'react-icons/hi2';
import { useCourseStyles } from '../../styles/app/course.styles';
import { supabase } from '../../services/api/supabase.service';
import { useAuth } from '../../contexts/AuthContext';
import soundEffects from '../../services/soundEffects';
import LearningPathService from '../../services/api/learning-path.service';

const CourseContent = () => {
  const classes = useCourseStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onLessonOpen,
    onTestOpen,
    setDiagnosticTestOpen
  } = useOutletContext();

  // State for user goals and edit modal
  const [userGoals, setUserGoals] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(false);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState(true);
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [learningPathData, setLearningPathData] = useState(null);
  const [savingGoals, setSavingGoals] = useState(false);
  const [viewMode, setViewMode] = useState('calendar'); // 'list' or 'calendar' - default to calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [previewItem, setPreviewItem] = useState(null);
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
        setUserGoals(goals);
        setEditForm({
          target_exam_date: goals.target_exam_date || '',
          current_score: goals.current_score || '',
          target_score: goals.target_score || 28,
          study_hours: goals.study_hours || {
            monday: 0.75, tuesday: 1, wednesday: 0, thursday: 0.75,
            friday: 1, saturday: 2, sunday: 2
          },
          study_hours_week2: goals.study_hours_week2 || {
            monday: 0.75, tuesday: 1, wednesday: 0, thursday: 0.75,
            friday: 1, saturday: 2, sunday: 2
          },
          use_alternating_weeks: goals.use_alternating_weeks || false,
          review_day: goals.review_day || 'sunday',
          mock_exam_day: goals.mock_exam_day || 'saturday',
          weekly_hours_tier: goals.weekly_hours_tier || 'moderate'
        });
      }
    } catch (error) {
      console.error('Error loading user goals:', error);
    }
  };

  const saveUserGoals = async () => {
    try {
      setSavingGoals(true);
      console.log('💾 Saving user goals...', editForm);

      // Parse numeric values properly
      const currentScore = editForm.current_score ? parseInt(editForm.current_score) : null;
      const targetScore = editForm.target_score ? parseInt(editForm.target_score) : 28;

      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: user.id,
          target_exam_date: editForm.target_exam_date || null,
          current_score: currentScore,
          target_score: targetScore,
          study_hours: editForm.study_hours,
          study_hours_week2: editForm.study_hours_week2,
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
        alert(`Error saving goals: ${error.message}`);
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

      await LearningPathService.generateLearningPath(
        user.id,
        {
          exam_date: editForm.target_exam_date,
          study_hours: editForm.study_hours,
          study_hours_week2: editForm.study_hours_week2,
          use_alternating_weeks: editForm.use_alternating_weeks,
          review_day: editForm.review_day,
          mock_exam_day: editForm.mock_exam_day,
          weekly_hours_tier: editForm.weekly_hours_tier
        },
        diagnosticResults?.analysis || null
      );

      // Reload learning path to update UI
      console.log('🔄 Reloading learning path from database...');
      await loadLearningPath();
      console.log('✅ Learning path regenerated and reloaded!');

      // Close modal first
      setEditModalOpen(false);
      setSavingGoals(false);

      // Show success message after modal closes
      setTimeout(() => {
        alert('Learning path updated successfully! The calendar now reflects your new schedule.');
      }, 100);
    } catch (error) {
      console.error('❌ Exception saving user goals:', error);
      setSavingGoals(false);
      alert(`Error saving goals: ${error.message}`);
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
  const inProgressLessons = Object.values(lessonProgress).filter(s => s === 'in-progress').length;

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

  // Helper to format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

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

    // Group items by week number
    const weekGroups = {};
    learningPathData.items.forEach(item => {
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

        // Get subjects for this week from item metadata
        const weekSubjects = firstItem.item_metadata?.week_subjects || [];
        const subjectLabels = weekSubjects
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
              return {
                id: `exam-day-${item.week_number}`,
                type: 'exam_day',
                title: '🎯 OFFICIAL ACT EXAM DAY',
                description: 'This is your official ACT test date. Good luck!',
                duration: '0 min',
                dueDate: item.scheduled_date ? parseLocalDate(item.scheduled_date) : new Date(),
                status: 'pending',
                isPriority: true,
                isExamDay: true
              };
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
    } else if (item.type === 'test') {
      if (item.id === 'diagnostic') {
        setDiagnosticTestOpen(true);
      } else {
        // Extract test number from id (e.g., "test-1-english" -> 1)
        const testNumber = item.testNumber || parseInt(item.id.split('-')[1]);
        onTestOpen(testNumber, item.section);
      }
    }
  };

  const getItemIcon = (type) => {
    if (type === 'exam_day') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" fill="currentColor"/>
          <path d="M12 6v6l4 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
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

      itemsByDate[date].push(calendarItem);
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
      currentWeek.push({
        date,
        dateString: formatLocalDate(date),
        dayNumber: day,
        isCurrentMonth: false,
        isToday: false,
        items: []
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
        currentWeek.push({
          date,
          dateString: formatLocalDate(date),
          dayNumber: nextMonthDay,
          isCurrentMonth: false,
          isToday: false,
          items: []
        });
        nextMonthDay++;
      }
      weeks.push(currentWeek);
    }

    return { weeks, itemsByDate };
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
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
                    {week.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={classes.weekCard} style={item.isDiagnostic ? {
                        borderLeft: '3px solid #b91c1c',
                        paddingLeft: '0.75rem',
                        background: 'linear-gradient(90deg, #fef2f2 0%, #ffffff 100%)'
                      } : {}}>
                        <div className={classes.weekCardContent}>
                          <span className={classes.weekCardIcon} style={item.isDiagnostic ? { color: '#b91c1c' } : {}}>{getItemIcon(item.type)}</span>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '0.5rem', flex: 1, flexWrap: 'wrap' }}>
                            <span className={classes.weekCardText} style={item.isDiagnostic ? { fontWeight: '600', color: '#b91c1c' } : {}}>{item.title}</span>
                            {item.description && (
                              <span style={{
                                fontSize: '0.8125rem',
                                color: '#6b7280',
                                lineHeight: '1.4',
                                fontWeight: '400',
                                flex: '1 1 100%'
                              }}>
                                {item.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={classes.weekCardArrow} style={item.isDiagnostic ? { color: '#b91c1c' } : {}}>→</span>
                      </div>
                    ))}
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
            display: 'flex',
            background: '#f1f5f9',
            borderRadius: '6px',
            padding: '0.25rem'
          }}>
            <button
              onClick={() => {
                soundEffects.playClick();
                setViewMode('calendar');
              }}
              style={{
                background: viewMode === 'calendar' ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                padding: '0.375rem 0.75rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: viewMode === 'calendar' ? '#1e40af' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: viewMode === 'calendar' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
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
                background: viewMode === 'list' ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                padding: '0.375rem 0.75rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: viewMode === 'list' ? '#1e40af' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: viewMode === 'list' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
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
                <h2 style={{
                  fontSize: '1.375rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  margin: 0
                }}>
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      navigateMonth(-1);
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
                      setCurrentMonth(new Date());
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
                      navigateMonth(1);
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

              {/* Calendar Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: '120px',
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
                          padding: '0.5rem',
                          borderRight: dayIdx < 6 ? '1px solid #d1d5db' : 'none',
                          borderBottom: weekIdx < totalWeeks - 1 ? '1px solid #d1d5db' : 'none',
                          background: day.isCurrentMonth ? '#ffffff' : '#fafafa',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Date Number */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '0.375rem',
                          flexShrink: 0
                        }}>
                          <div style={{
                            width: '26px',
                            height: '26px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8125rem',
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
                          gap: '0.25rem',
                          flex: 1,
                          overflow: 'hidden'
                        }}>
                          {day.items.slice(0, 3).map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                soundEffects.playClick();
                                setPreviewItem({ ...item, date: day.date });
                              }}
                              style={{
                                padding: '0.25rem 0.375rem',
                                background: item.type === 'exam_day'
                                  ? '#dc2626'
                                  : item.type === 'test' || item.type === 'mock_exam'
                                  ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                                  : item.type === 'review'
                                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                  : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                borderRadius: '4px',
                                cursor: item.type === 'exam_day' ? 'default' : 'pointer',
                                fontSize: '0.6875rem',
                                fontWeight: item.type === 'exam_day' ? '700' : '500',
                                color: '#ffffff',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease',
                                boxShadow: item.type === 'exam_day'
                                  ? '0 4px 8px rgba(220,38,38,0.4)'
                                  : item.type === 'mock_exam'
                                  ? '0 2px 4px rgba(59,130,246,0.3)'
                                  : '0 1px 2px rgba(0,0,0,0.1)',
                                border: item.type === 'exam_day' ? '2px solid #fca5a5' : 'none'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
                              }}
                              title={item.title}
                            >
                              {item.title}
                            </div>
                          ))}
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
                <div className={classes.weekGrid} style={{ padding: '1rem 1.5rem' }}>
                  {week.items.map((item, itemIndex) => {
                    const status = getLessonStatus(item.id);
                    const isCompleted = status === 'completed';
                    const lessonData = lessonStructure.find(l => l.id === item.id);
                    const chapterNum = lessonData?.chapterNum;
                    const isTest = item.type === 'test' || item.type === 'mock_exam';
                    const isReview = item.type === 'review';
                    const isMockExam = item.type === 'mock_exam';
                    const isExamDay = item.type === 'exam_day';
                    const isDiagnostic = item.isDiagnostic;

                    // Style for different item types
                    let cardStyle = {};
                    if (isExamDay) {
                      cardStyle = {
                        borderLeft: '4px solid #dc2626',
                        paddingLeft: '0.75rem',
                        background: '#dc2626', // Solid red color for exam day
                        border: '2px solid #dc2626',
                        cursor: 'default' // Change cursor to indicate it's not clickable
                      };
                    } else if (isDiagnostic) {
                      cardStyle = {
                        borderLeft: '3px solid #b91c1c',
                        paddingLeft: '0.75rem',
                        background: 'linear-gradient(90deg, #fef2f2 0%, #ffffff 100%)'
                      };
                    } else if (isMockExam) {
                      cardStyle = {
                        borderLeft: '3px solid #f59e0b',
                        paddingLeft: '0.75rem',
                        background: 'linear-gradient(90deg, #fef3c7 0%, #ffffff 100%)'
                      };
                    } else if (isTest) {
                      cardStyle = {
                        borderLeft: '3px solid #2563eb',
                        paddingLeft: '0.75rem',
                        background: 'linear-gradient(90deg, #eff6ff 0%, #ffffff 100%)'
                      };
                    } else if (isReview) {
                      cardStyle = {
                        borderLeft: '3px solid #10b981',
                        paddingLeft: '0.75rem',
                        background: 'linear-gradient(90deg, #d1fae5 0%, #ffffff 100%)'
                      };
                    }

                    return (
                      <div
                        key={itemIndex}
                        className={`${classes.weekCard} ${isCompleted ? 'completed' : ''}`}
                        onClick={() => !isExamDay && handleItemClick(item)}
                        style={cardStyle}
                      >
                        <div className={classes.weekCardContent}>
                          <span
                            className={classes.weekCardIcon}
                            style={isExamDay ? { color: '#ffffff' } : isDiagnostic ? { color: '#b91c1c' } : isMockExam ? { color: '#f59e0b' } : isTest ? { color: '#2563eb' } : isReview ? { color: '#10b981' } : {}}
                          >
                            {getItemIcon(item.type)}
                          </span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span
                                className={classes.weekCardText}
                                style={isExamDay ? { fontWeight: '800', color: '#ffffff', fontSize: '1rem' } : isDiagnostic ? { fontWeight: '600', color: '#b91c1c' } : isMockExam ? { fontWeight: '700', color: '#f59e0b' } : isTest ? { fontWeight: '600', color: '#2563eb' } : isReview ? { fontWeight: '600', color: '#10b981' } : {}}
                              >
                                {item.title}
                                {chapterNum && (
                                  <span style={{
                                    marginLeft: '0.5rem',
                                    color: '#9ca3af',
                                    fontSize: '0.8125rem',
                                    fontWeight: '400'
                                  }}>
                                    {chapterNum}
                                  </span>
                                )}
                              </span>
                              {item.dueDate && (
                                <span style={{
                                  fontSize: '0.75rem',
                                  color: isExamDay ? 'rgba(255,255,255,0.8)' : '#9ca3af',
                                  fontWeight: '400',
                                  fontStyle: 'italic'
                                }}>
                                  Due {item.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <span style={{
                                fontSize: '0.8125rem',
                                color: isExamDay ? '#ffffff' : '#6b7280',
                                lineHeight: '1.4',
                                fontWeight: '400'
                              }}>
                                {item.description}
                              </span>
                            )}
                          </div>
                        </div>
                        {!isExamDay && (
                          <span
                            className={classes.weekCardArrow}
                            style={isDiagnostic ? { color: '#b91c1c' } : isMockExam ? { color: '#f59e0b' } : isTest ? { color: '#2563eb' } : isReview ? { color: '#10b981' } : {}}
                          >
                            →
                          </span>
                        )}
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
            {/* Header with gradient */}
            <div style={{
              background: previewItem.type === 'test' || previewItem.type === 'mock_exam'
                ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                : previewItem.type === 'review'
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              padding: '2rem',
              color: '#ffffff'
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
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontWeight: '500'
                }}>
                  {previewItem.type === 'test' ? 'Practice Test' : previewItem.type === 'mock_exam' ? 'Mock Exam' : previewItem.type === 'review' ? 'Review Day' : 'Lesson'}
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
              ) : (
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
                      Lesson Overview
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>
                      This lesson will help you master key concepts and strategies for the ACT.
                    </div>
                  </div>

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
                </div>
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
      {editModalOpen && (
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
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  margin: '0 0 1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1a1a1a'
                }}>
                  Week 1 Schedule - Daily Study Hours
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <div key={day}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        marginBottom: '0.375rem',
                        textTransform: 'capitalize'
                      }}>
                        {day.slice(0, 3)}
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="12"
                        value={editForm.study_hours[day]}
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
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontFamily: 'inherit',
                          textAlign: 'center'
                        }}
                      />
                      <div style={{
                        fontSize: '0.625rem',
                        color: '#9ca3af',
                        marginTop: '0.25rem',
                        textAlign: 'center'
                      }}>
                        {editForm.study_hours[day]}h
                      </div>
                    </div>
                  ))}
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
                  <h3 style={{
                    margin: '0 0 1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1e40af'
                  }}>
                    Week 2 Schedule - Daily Study Hours
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                      <div key={day}>
                        <label style={{
                          display: 'block',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#1e40af',
                          marginBottom: '0.375rem',
                          textTransform: 'capitalize'
                        }}>
                          {day.slice(0, 3)}
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max="12"
                          value={editForm.study_hours_week2[day]}
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
                            border: '1px solid #bfdbfe',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            fontFamily: 'inherit',
                            textAlign: 'center',
                            background: '#ffffff'
                          }}
                        />
                        <div style={{
                          fontSize: '0.625rem',
                          color: '#1e40af',
                          marginTop: '0.25rem',
                          textAlign: 'center'
                        }}>
                          {editForm.study_hours_week2[day]}h
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Days Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {/* Review Day */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Weekly Review Day
                  </label>
                  <select
                    value={editForm.review_day}
                    onChange={(e) => setEditForm({ ...editForm, review_day: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                      background: 'white'
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

                {/* Mock Exam Day */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Mock Exam Day
                  </label>
                  <select
                    value={editForm.mock_exam_day}
                    onChange={(e) => setEditForm({ ...editForm, mock_exam_day: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                      background: 'white'
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
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    background: 'white'
                  }}
                >
                  <option value="light">Light (1-5 hours/week)</option>
                  <option value="moderate">Moderate (5-10 hours/week)</option>
                  <option value="intensive">Intensive (10-15 hours/week)</option>
                  <option value="extreme">Extreme (15+ hours/week)</option>
                </select>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  This helps optimize your mock exam frequency and lesson pacing
                </p>
              </div>
            </div>

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
                  opacity: savingGoals ? 0.7 : 1
                }}
              >
                {savingGoals ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseContent;
