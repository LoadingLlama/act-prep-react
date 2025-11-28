/**
 * Custom hook for transforming learning path data from database into display format
 *
 * @param {Object} learningPathData - Raw learning path data from database
 * @param {Object} lessonProgress - Object mapping lesson IDs to their progress status
 * @param {Array} lessonStructure - Array of lesson objects with metadata
 * @returns {Array} Transformed learning path array grouped by weeks
 *
 * Edge cases:
 * - Handles missing or null learningPathData
 * - Handles items without scheduled dates (defaults to current date)
 * - Handles missing lessons in lessonStructure (logs warning and provides fallback)
 * - Filters out null items from transformation
 */

import React from 'react';
import { parseLocalDate, cleanLessonTitle } from '../../utils/calendar/dateHelpers';

const useLearningPathTransformation = (learningPathData, lessonProgress, lessonStructure) => {
  /**
   * Helper function to get lesson status from progress object
   * @param {string} itemId - Lesson ID to look up
   * @returns {string} Status of the lesson ('not-started', 'in-progress', 'completed')
   */
  const getLessonStatus = (itemId) => {
    return lessonProgress[itemId] || 'not-started';
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

  return learningPath;
};

export default useLearningPathTransformation;
