/**
 * Course Content Component
 * Shows recommended learning path with stats, lessons, and tests in order
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HiPencilSquare, HiQuestionMarkCircle, HiCheckCircle, HiChevronDown, HiChevronUp, HiFlag } from 'react-icons/hi2';
import { useCourseStyles } from '../../styles/app/course.styles';
import { supabase } from '../../services/api/supabase.service';
import { useAuth } from '../../contexts/AuthContext';
// import soundEffects from '../../services/soundEffects';
import LearningPathService from '../../services/api/learning-path.service';
import { getHolidays } from '../../utils/calendar/holidays';
import { parseLocalDate, formatLocalDate, cleanLessonTitle } from '../../utils/calendar/dateHelpers';
import EditGoalsModal from '../course/EditGoalsModal';
import AddEventModal from '../course/AddEventModal';
import PreviewItemModal from '../course/PreviewItemModal';
import ListViewContent from '../course/ListViewContent';
import MonthCalendarView from '../course/MonthCalendarView';
import WeekCalendarView from '../course/WeekCalendarView';
import DayCalendarView from '../course/DayCalendarView';
import YearCalendarView from '../course/YearCalendarView';
import CalendarHeader from '../course/CalendarHeader';
import { useCourseDataLoading } from '../../hooks/course/useCourseDataLoading';
import useLearningPathTransformation from '../../hooks/course/useLearningPathTransformation';

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
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [isRegeneratingPath, setIsRegeneratingPath] = useState(false);
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

  // Use custom hook for data loading
  const {
    checkDiagnosticCompletion,
    loadUserGoals,
    saveUserGoals,
    loadDiagnosticResults,
    loadLearningPath
  } = useCourseDataLoading(user, {
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
  }, editForm);

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
              // soundEffects.playClick();
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
              boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.1)';
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
            boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
          }}>
            <button
              onClick={() => {
                // soundEffects.playClick();
                setViewMode('calendar');
              }}
              style={{
                background: viewMode === 'calendar' ? '#b91c1c' : 'transparent',
                border: 'none',
                borderRadius: '100px',
                padding: '0.625rem 1.5rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: viewMode === 'calendar' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: viewMode === 'calendar' ? '0 2px 4px rgba(185, 28, 28, 0.25), 0 1px 2px rgba(185, 28, 28, 0.15)' : 'none'
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
                // soundEffects.playClick();
                setViewMode('list');
              }}
              style={{
                background: viewMode === 'list' ? '#b91c1c' : 'transparent',
                border: 'none',
                borderRadius: '100px',
                padding: '0.625rem 1.5rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: viewMode === 'list' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: viewMode === 'list' ? '0 2px 4px rgba(185, 28, 28, 0.25), 0 1px 2px rgba(185, 28, 28, 0.15)' : 'none'
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
              boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.1)';
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

  // Transform learning path data using custom hook
  const learningPath = useLearningPathTransformation(
    learningPathData,
    lessonProgress,
    lessonStructure
  );


  const handleItemClick = (item) => {
    // soundEffects.playClick();
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
    // soundEffects.playClick();

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

  const toggleWeek = (weekKey) => {
    // soundEffects.playToggle();
    setExpandedWeeks(prev => ({
      ...prev,
      [weekKey]: !prev[weekKey]
    }));
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
                  // soundEffects.playSuccess();
                  setDiagnosticTestOpen(true);
                }}
                style={{
                  background: '#b91c1c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 3px 0 0 rgba(185, 28, 28, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#991b1b';
                  e.target.style.boxShadow = '0 3px 0 0 rgba(153, 27, 27, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#b91c1c';
                  e.target.style.boxShadow = '0 3px 0 0 rgba(185, 28, 28, 0.4)';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'translateY(1px)';
                  e.target.style.boxShadow = '0 2px 0 0 rgba(29, 78, 216, 0.5)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 3px 0 0 rgba(29, 78, 216, 0.5)';
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
      <div className={classes.content} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 1.5rem' }}>
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
              margin: '0 auto',
              position: 'relative',
              opacity: isRegeneratingPath ? 0.6 : 1,
              transition: 'opacity 0.3s ease',
              pointerEvents: isRegeneratingPath ? 'none' : 'auto'
            }}>
              {/* Loading Overlay */}
              {isRegeneratingPath && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(2px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                  borderRadius: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '3px solid #f3f4f6',
                      borderTop: '3px solid #b91c1c',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}></div>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#1a1a1a',
                      textAlign: 'center'
                    }}>
                      Updating calendar...
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar Header with Navigation */}
              <CalendarHeader
                calendarViewType={calendarViewType}
                setCalendarViewType={setCalendarViewType}
                currentMonth={currentMonth}
                currentWeekStart={currentWeekStart}
                currentDay={currentDay}
                currentYear={currentYear}
                daysUntilTest={daysUntilTest}
                navigateCalendar={navigateCalendar}
                goToToday={goToToday}
                setAddEventModalOpen={setAddEventModalOpen}
                setCustomEventForm={setCustomEventForm}
                calendarDropdownOpen={calendarDropdownOpen}
                setCalendarDropdownOpen={setCalendarDropdownOpen}
              />

              {/* Calendar Grid - Day, Week, Month, or Year View */}
              {calendarViewType === 'day' ? (
                <DayCalendarView
                  generateDayView={generateDayView}
                  getHolidays={getHolidays}
                  getLessonStatus={getLessonStatus}
                  handleItemClick={handleItemClick}
                  setHoveredDayCell={setHoveredDayCell}
                  customEventForm={customEventForm}
                  setCustomEventForm={setCustomEventForm}
                  setAddEventModalOpen={setAddEventModalOpen}
                />
              ) : calendarViewType === 'year' ? (
                <YearCalendarView
                  generateYearView={generateYearView}
                  getHolidays={getHolidays}
                  setCurrentDay={setCurrentDay}
                  setCalendarViewType={setCalendarViewType}
                />
              ) : calendarViewType === 'month' ? (
                <MonthCalendarView
                  generateAppleCalendarView={generateAppleCalendarView}
                  hoveredDayCell={hoveredDayCell}
                  setHoveredDayCell={setHoveredDayCell}
                  customEventForm={customEventForm}
                  setCustomEventForm={setCustomEventForm}
                  setAddEventModalOpen={setAddEventModalOpen}
                  setPreviewItem={setPreviewItem}
                  getHolidays={getHolidays}
                />
              ) : (
              // WEEK VIEW
              <WeekCalendarView
                generateWeekView={generateWeekView}
                hoveredDayCell={hoveredDayCell}
                setHoveredDayCell={setHoveredDayCell}
                customEventForm={customEventForm}
                setCustomEventForm={setCustomEventForm}
                setAddEventModalOpen={setAddEventModalOpen}
                setPreviewItem={setPreviewItem}
                getLessonStatus={getLessonStatus}
              />
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
                  // soundEffects.playSuccess();
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
          ) : (
            // LIST VIEW - Collapsible Week Sections
            <ListViewContent
              learningPath={learningPath}
              expandedWeeks={expandedWeeks}
              toggleWeek={toggleWeek}
              getLessonStatus={getLessonStatus}
              handleItemClick={handleItemClick}
            />
          )}
        </div>
      </div>

      {/* Preview Item Modal */}
      <PreviewItemModal
        previewItem={previewItem}
        onClose={() => setPreviewItem(null)}
        handleItemClick={handleItemClick}
        lessonStructure={lessonStructure}
        learningPath={learningPath}
      />

      {/* Edit Goals Modal */}
      <EditGoalsModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        editForm={editForm}
        setEditForm={setEditForm}
        saveUserGoals={saveUserGoals}
        savingGoals={savingGoals}
        validationError={validationError}
        setValidationError={setValidationError}
        saveButtonShake={saveButtonShake}
      />

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={addEventModalOpen}
        onClose={() => setAddEventModalOpen(false)}
        customEventForm={customEventForm}
        setCustomEventForm={setCustomEventForm}
        user={user}
        loadLearningPath={loadLearningPath}
      />

    </div>
  );
};

export default CourseContent;
