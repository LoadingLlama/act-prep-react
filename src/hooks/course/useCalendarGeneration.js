import { formatLocalDate, cleanLessonTitle } from '../../utils/calendar/dateHelpers';

/**
 * Custom hook for generating calendar views for learning path data.
 *
 * @param {Object} params - Hook parameters
 * @param {Object} params.learningPathData - Learning path data containing scheduled items
 * @param {Array} params.learningPathData.items - Array of scheduled learning items
 * @param {Array} params.lessonStructure - Array of lesson definitions with metadata
 * @param {Date} params.currentMonth - Current month date for month view
 * @param {Date} params.currentWeekStart - Start date of current week for week view
 * @param {Date} params.currentDay - Current day date for day view
 * @param {number} params.currentYear - Current year for year view
 * @param {Function} params.getLessonStatus - Function to retrieve lesson completion status
 *
 * @returns {Object} Object containing four calendar generation functions:
 *   - generateAppleCalendarView: Generates Apple-style month calendar with weeks grid
 *   - generateWeekView: Generates week view with daily items
 *   - generateDayView: Generates single day view with all items
 *   - generateYearView: Generates year view with all months
 *
 * @example
 * const { generateAppleCalendarView, generateWeekView, generateDayView, generateYearView } = useCalendarGeneration({
 *   learningPathData,
 *   lessonStructure,
 *   currentMonth,
 *   currentWeekStart,
 *   currentDay,
 *   currentYear,
 *   getLessonStatus
 * });
 *
 * Edge cases:
 * - Returns empty/null values when learningPathData is null or undefined
 * - Handles missing lesson_key by logging warnings and using fallback data
 * - Supports multiple item types: lesson, practice, practice_test, review, mock_exam, exam_day
 * - Correctly handles month boundaries and displays prev/next month days
 * - Handles practice items that reference lessons from lessonStructure
 */
const useCalendarGeneration = ({
  learningPathData,
  lessonStructure,
  currentMonth,
  currentWeekStart,
  currentDay,
  currentYear,
  getLessonStatus
}) => {
  /**
   * Generates an Apple Calendar-style month view with weeks grid.
   *
   * @returns {Object} Object containing:
   *   - weeks: Array of week arrays, each containing 7 day objects
   *   - itemsByDate: Object mapping date strings to arrays of calendar items
   *
   * Edge cases:
   * - Returns { weeks: [], itemsByDate: {} } when learningPathData is null/undefined
   * - Includes days from previous and next months to complete calendar grid
   * - Marks days as isCurrentMonth: false for prev/next month days
   * - Identifies today with isToday flag
   */
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

  /**
   * Generates a week view with 7 days starting from currentWeekStart.
   *
   * @returns {Array} Array of 7 day objects, each containing:
   *   - date: Date object
   *   - dateString: Formatted date string
   *   - dayNumber: Day of month
   *   - dayName: Short day name (e.g., "Mon")
   *   - fullDayName: Full day name (e.g., "Monday")
   *   - isToday: Boolean indicating if this is today
   *   - items: Array of transformed calendar items for this day
   *
   * Edge cases:
   * - Returns empty array when learningPathData is null/undefined
   * - Filters and transforms items by type (lesson, practice_test, review, etc.)
   * - Returns null for unrecognized item types
   */
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

  /**
   * Generates a single day view for currentDay.
   *
   * @returns {Object|null} Day object containing:
   *   - date: Date object
   *   - dateString: Formatted date string
   *   - dayNumber: Day of month
   *   - dayName: Short day name
   *   - fullDayName: Full day name
   *   - monthName: Full month name
   *   - year: Year number
   *   - isToday: Boolean indicating if this is today
   *   - items: Array of transformed calendar items
   *
   * Edge cases:
   * - Returns null when learningPathData is null/undefined
   * - Uses same transformation logic as week view
   * - Filters items for the specific day only
   */
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

  /**
   * Generates a year view showing all 12 months of currentYear.
   *
   * @returns {Array} Array of 12 month objects, each containing:
   *   - monthNumber: Month index (0-11)
   *   - monthName: Short month name (e.g., "Jan")
   *   - monthDate: Date object for first day of month
   *   - days: Array of day objects (includes null for empty slots before month starts)
   *     - dayNumber: Day of month
   *     - date: Date object
   *     - dateString: Formatted date string
   *     - isToday: Boolean
   *     - hasItems: Boolean indicating if items are scheduled
   *
   * Edge cases:
   * - Returns empty array when learningPathData is null/undefined
   * - Pads days array with null values for alignment (days before month starts)
   * - Only tracks whether items exist (hasItems), not the items themselves
   */
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

  return {
    generateAppleCalendarView,
    generateWeekView,
    generateDayView,
    generateYearView
  };
};

export default useCalendarGeneration;
