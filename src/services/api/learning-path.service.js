/**
 * Learning Path Service
 * Generates and manages personalized learning paths based on diagnostic analysis and user goals
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';
import { lessonStructure } from '../../data/lessonStructure';

const LearningPathService = {
  /**
   * Generate a personalized learning path for a user
   * STRUCTURE:
   * - Always starts with "ACT Test Basics & Overview"
   * - Week 1-2: English + Math (fundamentals first)
   * - Week 3+: Alternates Reading + Math, then Science + Math
   * - Includes review days (from user_goals.review_day)
   * - Includes mock exams (from user_goals.mock_exam_day)
   * - Prioritizes weak areas from diagnostic within each subject
   *
   * @param {string} userId - User ID
   * @param {Object} goals - User goals (exam_date, daily_study_minutes, study_days_per_week, review_day, mock_exam_day, etc.)
   * @param {Object} diagnosticAnalysis - Results from diagnostic test
   * @returns {Promise<Object>} Generated learning path
   */
  async generateLearningPath(userId, goals, diagnosticAnalysis) {
    const startTime = Date.now();
    const TIMEOUT_MS = 30000; // 30 second hard timeout

    logger.info('LearningPathService', 'generateLearningPath:START', { userId });

    try {
      // Wrap entire generation in a timeout
      const generationPromise = this._generateLearningPathInternal(userId, goals, diagnosticAnalysis, startTime);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Learning path generation timeout after 30s')), TIMEOUT_MS)
      );

      return await Promise.race([generationPromise, timeoutPromise]);
    } catch (error) {
      errorTracker.trackError('LearningPathService', 'generateLearningPath', { userId }, error);

      // Log failed algorithm run
      await supabase.from('algorithm_runs').insert([{
        user_id: userId,
        algorithm_type: 'path_generation',
        execution_time_ms: Date.now() - startTime,
        success: false,
        error_message: error.message
      }]);

      throw error;
    }
  },

  /**
   * Internal implementation of learning path generation
   * @private
   */
  async _generateLearningPathInternal(userId, goals, diagnosticAnalysis, startTime) {
    try {
      // 1. Get existing active paths to delete their items
      const { data: existingPaths, error: fetchError } = await supabase
        .from('user_learning_paths')
        .select('id')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (fetchError) {
        logger.error('LearningPathService', 'fetchExistingPathsError', { userId, error: fetchError });
      }

      // 2. Delete old learning_path_items from existing paths
      if (existingPaths && existingPaths.length > 0) {
        const pathIds = existingPaths.map(p => p.id);

        logger.info('LearningPathService', 'deletingOldItems', {
          pathIds,
          pathCount: pathIds.length
        });

        const { error: deleteError } = await supabase
          .from('learning_path_items')
          .delete()
          .in('learning_path_id', pathIds);

        if (deleteError) {
          logger.error('LearningPathService', 'deleteOldItemsError', { pathIds, error: deleteError });
        } else {
          logger.info('LearningPathService', 'deletedOldItems', { pathIds });
        }
      }

      // 3. Deactivate any existing active paths
      await supabase
        .from('user_learning_paths')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('is_active', true);

      // 4. Create new learning path
      const pathData = {
        user_id: userId,
        path_name: `ACT Prep - ${goals.exam_date ? new Date(goals.exam_date).toLocaleDateString() : 'Custom'}`,
        exam_date: goals.exam_date,
        daily_study_minutes: goals.daily_study_minutes || 30,
        target_score: goals.target_score,
        current_estimated_score: diagnosticAnalysis?.overall_score || 0,
        is_active: true,
        completion_percentage: 0
      };

      const { data: learningPath, error: pathError } = await supabase
        .from('user_learning_paths')
        .insert([pathData])
        .select()
        .single();

      if (pathError) throw pathError;

      // 5. Use lessons from lessonStructure data file (same source as Lessons tab)
      console.log('📚 Using lessons from lessonStructure data file (total:', lessonStructure.length, 'lessons)');

      // Transform lessonStructure format to match what the algorithm expects
      const allLessons = lessonStructure.map((lesson, index) => {
        // Map section to subject format
        // Keep getting-started as is since intro lesson is searched by title later
        let subject = lesson.section;

        // For intro lessons without a specific section, map to 'english' so they can be found
        if (lesson.section === 'getting-started') {
          subject = 'english'; // Intro lesson searched in english array
        }

        // Calculate order_index from chapterNum or use array index
        let order_index = index;
        if (lesson.chapterNum) {
          // Parse chapter numbers like "1.1", "2.3", etc. into sortable index
          const parts = lesson.chapterNum.split('.');
          if (parts.length === 2) {
            order_index = parseInt(parts[0]) * 100 + parseInt(parts[1]);
          }
        }

        // Assign default duration (45 minutes for most lessons)
        const duration = 45;

        return {
          id: lesson.id,
          subject: subject,
          title: lesson.title,
          order_index: order_index,
          topic_number: lesson.chapterNum || null,
          topic_title: lesson.category || null,
          duration: duration
        };
      });

      // 6. Get priority/weak areas from diagnostic
      const priorityLessons = diagnosticAnalysis?.priority_lessons || [];
      const weakLessons = diagnosticAnalysis?.weak_lessons || [];

      // Create priority map for quick lookups
      const priorityMap = new Map();
      priorityLessons.forEach(p => {
        priorityMap.set(p.lesson_id, p.priority);
      });

      const weakLessonIds = new Set(weakLessons.map(l =>
        typeof l === 'object' ? l.lesson_id : l
      ));

      // 7. Organize lessons by subject and prioritize weak areas within each subject
      const lessonsBySubject = {
        english: [],
        math: [],
        reading: [],
        science: []
      };

      allLessons.forEach(lesson => {
        const subject = lesson.subject?.toLowerCase();
        if (lessonsBySubject[subject]) {
          lesson.isWeak = weakLessonIds.has(lesson.id);
          lesson.priority = priorityMap.get(lesson.id) || 0;
          lessonsBySubject[subject].push(lesson);
        }
      });

      // Within each subject, ALWAYS sort by order_index (fundamentals first)
      // Weak areas are marked but don't change the order - always teach base first
      Object.keys(lessonsBySubject).forEach(subject => {
        lessonsBySubject[subject].sort((a, b) => {
          // ALWAYS sort by order_index - fundamentals first regardless of weakness
          return (a.order_index || 0) - (b.order_index || 0);
        });
      });

      // 8. Calculate days until exam and maximum weeks available
      // Parse exam date in local timezone to avoid timezone shift issues
      const examDate = goals.exam_date ? (() => {
        const [year, month, day] = goals.exam_date.split('-').map(Number);
        return new Date(year, month - 1, day);
      })() : null;
      const today = new Date();
      let maxWeeks = 50; // Default if no exam date specified
      let daysUntilExam = null;

      if (examDate) {
        daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
        if (daysUntilExam > 0) {
          // Calculate weeks - should extend all the way to exam date
          maxWeeks = Math.floor(daysUntilExam / 7);

          // If very close to exam (< 2 weeks), set minimum
          if (maxWeeks < 2) maxWeeks = 2;

          logger.info('LearningPathService', 'examDateCalculated', {
            examDate: goals.exam_date,
            daysUntilExam,
            maxWeeks,
            message: `Learning path will extend ${maxWeeks} weeks until exam`
          });
        } else {
          logger.warn('LearningPathService', 'examDateInPast', {
            examDate: goals.exam_date,
            daysUntilExam
          });
          maxWeeks = 4; // Give at least 4 weeks if exam is in the past
        }
      }

      // 9. Build structured curriculum that fills ALL available weeks until exam
      const curriculum = this._buildCurriculum(lessonsBySubject, goals, maxWeeks);

      logger.info('LearningPathService', 'curriculumBuilt', {
        totalWeeks: curriculum.length,
        totalLessons: curriculum.reduce((sum, week) => sum + week.lessons.length, 0),
        reviewDaysCount: curriculum.reduce((sum, week) => sum + (week.reviewDay ? 1 : 0), 0),
        mockExamsCount: curriculum.reduce((sum, week) => sum + (week.mockExam ? 1 : 0), 0)
      });

      // 10. Schedule lessons with dates using actual per-day study hours
      const pathItems = this._scheduleLessons(
        curriculum,
        learningPath.id,
        goals, // Pass entire goals object with study_hours
        examDate
      );

      // 11. Insert path items in parallel batches (FAST!)
      if (pathItems.length > 0) {
        const BATCH_SIZE = 50; // Larger batches for speed
        const batches = [];

        for (let i = 0; i < pathItems.length; i += BATCH_SIZE) {
          batches.push(pathItems.slice(i, i + BATCH_SIZE));
        }

        logger.info('LearningPathService', 'insertingPathItems', {
          totalItems: pathItems.length,
          batchCount: batches.length
        });

        // Insert ALL batches in PARALLEL for maximum speed
        const insertPromises = batches.map((batch, index) =>
          supabase
            .from('learning_path_items')
            .insert(batch)
            .then(({ error }) => {
              if (error) {
                logger.error('LearningPathService', 'batchFailed', { batchIndex: index, error });
                throw error;
              }
              return { batchIndex: index, count: batch.length };
            })
        );

        // Wait for all inserts to complete
        await Promise.all(insertPromises);

        logger.info('LearningPathService', 'allBatchesInserted', {
          totalItems: pathItems.length
        });
      }

      // 12. Log algorithm run
      const executionTime = Date.now() - startTime;
      await supabase.from('algorithm_runs').insert([{
        user_id: userId,
        algorithm_type: 'path_generation',
        input_data: {
          weakLessonsCount: weakLessons.length,
          daysUntilExam: goals.exam_date
            ? Math.floor((new Date(goals.exam_date) - new Date()) / (1000 * 60 * 60 * 24))
            : 90
        },
        output_data: {
          pathId: learningPath.id,
          itemsCount: pathItems.length,
          weeksCount: curriculum.length
        },
        execution_time_ms: executionTime,
        success: true
      }]);

      logger.info('LearningPathService', 'generateLearningPath:SUCCESS', {
        userId,
        pathId: learningPath.id,
        itemsCount: pathItems.length,
        weeksCount: curriculum.length,
        executionTime
      });

      return {
        ...learningPath,
        items: pathItems
      };
    } catch (error) {
      // Re-throw to be caught by outer try-catch with timeout
      throw error;
    }
  },

  /**
   * Build structured curriculum following the pattern:
   * - Week 1-2: Intro + English + Math
   * - Week 3-4: Reading + Math
   * - Week 5-6: Science + Math
   * - Repeats with more advanced topics
   * - Includes review days and mock exams
   * @private
   */
  _buildCurriculum(lessonsBySubject, goals, maxWeeks = 52) {
    const curriculum = [];
    let weekNumber = 1;

    const reviewDay = goals.review_day || 'sunday';
    const mockExamDay = goals.mock_exam_day || 'saturday';
    const learningPace = goals.learning_pace || 'moderate';

    // Lessons per week based on pace
    const lessonsPerWeek = {
      'relaxed': 3,
      'moderate': 4,
      'intensive': 6
    }[learningPace] || 4;

    // Always start with ACT Test Basics
    const introLesson = lessonsBySubject.english.find(l =>
      l.title.toLowerCase().includes('act test basics')
    );

    if (introLesson) {
      curriculum.push({
        weekNumber: weekNumber++,
        focus: 'Introduction',
        lessons: [introLesson],
        reviewDay: reviewDay,
        mockExam: null
      });
    }

    // Track which lessons have been used
    const usedLessons = new Set(introLesson ? [introLesson.id] : []);

    // Helper to get next N lessons from a subject
    const getNextLessons = (subject, count) => {
      const lessons = [];
      for (const lesson of lessonsBySubject[subject]) {
        if (!usedLessons.has(lesson.id) && lessons.length < count) {
          lessons.push(lesson);
          usedLessons.add(lesson.id);
        }
      }
      return lessons;
    };

    // Reserve last week for exam, so stop at maxWeeks - 1
    const lastContentWeek = maxWeeks > 0 ? maxWeeks - 1 : maxWeeks;

    logger.info('LearningPathService', 'curriculumConstraints', {
      maxWeeks,
      lastContentWeek,
      currentWeekNumber: weekNumber,
      message: `Will build content until week ${lastContentWeek}, then EXAM WEEK at week ${maxWeeks}`
    });

    // Week 2-3 (if space): English + Math (fundamentals)
    for (let i = 0; i < 2 && weekNumber <= lastContentWeek; i++) {
      const englishLessons = getNextLessons('english', Math.ceil(lessonsPerWeek * 0.5));
      const mathLessons = getNextLessons('math', Math.floor(lessonsPerWeek * 0.5));

      if (englishLessons.length > 0 || mathLessons.length > 0) {
        curriculum.push({
          weekNumber: weekNumber++,
          focus: 'English + Math Fundamentals',
          lessons: [...englishLessons, ...mathLessons],
          reviewDay: reviewDay,
          mockExam: i === 1 ? mockExamDay : null // Mock exam at end of week 2
        });
      }
    }

    // Week 4-5 (if space): Reading + Math
    for (let i = 0; i < 2 && weekNumber <= lastContentWeek; i++) {
      const readingLessons = getNextLessons('reading', Math.ceil(lessonsPerWeek * 0.5));
      const mathLessons = getNextLessons('math', Math.floor(lessonsPerWeek * 0.5));

      if (readingLessons.length > 0 || mathLessons.length > 0) {
        curriculum.push({
          weekNumber: weekNumber++,
          focus: 'Reading + Math',
          lessons: [...readingLessons, ...mathLessons],
          reviewDay: reviewDay,
          mockExam: i === 1 ? mockExamDay : null // Mock exam every 2 weeks
        });
      }
    }

    // Week 6-7 (if space): Science + Math
    for (let i = 0; i < 2 && weekNumber <= lastContentWeek; i++) {
      const scienceLessons = getNextLessons('science', Math.ceil(lessonsPerWeek * 0.5));
      const mathLessons = getNextLessons('math', Math.floor(lessonsPerWeek * 0.5));

      if (scienceLessons.length > 0 || mathLessons.length > 0) {
        curriculum.push({
          weekNumber: weekNumber++,
          focus: 'Science + Math',
          lessons: [...scienceLessons, ...mathLessons],
          reviewDay: reviewDay,
          mockExam: i === 1 ? mockExamDay : null
        });
      }
    }

    // Continue rotating through subjects until we run out of time (must stop BEFORE exam week)
    let subjectIndex = 0;
    const subjectRotation = ['english', 'reading', 'science']; // Always pair with math
    const totalLessons = Object.values(lessonsBySubject).flat().length;

    logger.info('LearningPathService', 'continuingCurriculum', {
      maxWeeks,
      lastContentWeek,
      currentWeekNumber: weekNumber,
      totalLessons,
      message: `Continuing from week ${weekNumber} to week ${lastContentWeek}`
    });

    while (usedLessons.size < totalLessons && weekNumber <= lastContentWeek) {
      const subject = subjectRotation[subjectIndex % subjectRotation.length];
      const primaryLessons = getNextLessons(subject, Math.ceil(lessonsPerWeek * 0.5));
      const mathLessons = getNextLessons('math', Math.floor(lessonsPerWeek * 0.5));

      if (primaryLessons.length === 0 && mathLessons.length === 0) {
        // No more lessons available - fill remaining time with review weeks
        logger.info('LearningPathService', 'allLessonsCompleted', {
          usedLessons: usedLessons.size,
          totalLessons: totalLessons,
          weekNumber: weekNumber,
          weeksRemaining: lastContentWeek - weekNumber + 1
        });
        break;
      }

      curriculum.push({
        weekNumber: weekNumber++,
        focus: `${subject.charAt(0).toUpperCase() + subject.slice(1)} + Math`,
        lessons: [...primaryLessons, ...mathLessons],
        reviewDay: reviewDay,
        mockExam: (weekNumber % 2 === 0) ? mockExamDay : null // Mock exam every 2 weeks
      });

      subjectIndex++;
    }

    // Fill remaining weeks with comprehensive review until exam week
    while (weekNumber <= lastContentWeek) {
      curriculum.push({
        weekNumber: weekNumber++,
        focus: 'Comprehensive Review & Practice',
        lessons: [], // No new lessons, just review
        reviewDay: reviewDay,
        mockExam: (weekNumber % 2 === 0) ? mockExamDay : null,
        isReviewWeek: true
      });
    }

    // Add final EXAM WEEK (always the last week before exam date)
    if (maxWeeks > 0) {
      curriculum.push({
        weekNumber: maxWeeks,
        focus: 'EXAM WEEK',
        lessons: [],
        reviewDay: null,
        mockExam: null,
        isExamWeek: true
      });

      logger.info('LearningPathService', 'examWeekAdded', {
        examWeekNumber: maxWeeks,
        totalWeeks: curriculum.length,
        message: `EXAM WEEK scheduled as week ${maxWeeks}`
      });
    }

    logger.info('LearningPathService', 'curriculumComplete', {
      totalWeeks: curriculum.length,
      lessonsUsed: usedLessons.size,
      totalLessons: totalLessons,
      maxWeeks: maxWeeks,
      reviewWeeks: curriculum.filter(w => w.isReviewWeek).length
    });

    return curriculum;
  },

  /**
   * Schedule lessons with actual dates using per-day study hours
   * @private
   */
  _scheduleLessons(curriculum, learningPathId, goals, examDate = null) {
    const pathItems = [];
    let sequenceOrder = 1;
    let currentDate = new Date();
    let weekIndex = 0; // Track which week we're on for alternating schedules

    // Map day names to numbers (0 = Sunday, 6 = Saturday)
    const dayNameToNumber = {
      'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
      'thursday': 4, 'friday': 5, 'saturday': 6
    };

    const dayNumberToName = {
      0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday',
      4: 'thursday', 5: 'friday', 6: 'saturday'
    };

    // Helper functions to handle dates in local timezone (no UTC conversion)
    const parseLocalDate = (dateString) => {
      // Parse YYYY-MM-DD as local date, not UTC
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    const formatLocalDate = (date) => {
      // Format as YYYY-MM-DD in local timezone
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Parse study hours from goals
    const useAlternatingWeeks = goals.use_alternating_weeks || false;
    const studyHoursWeek1 = goals.study_hours || {
      monday: 0.75, tuesday: 1, wednesday: 0, thursday: 0.75,
      friday: 1, saturday: 2, sunday: 2
    };
    const studyHoursWeek2 = goals.study_hours_week2 || studyHoursWeek1;

    // Helper to get study minutes for a specific day
    const getStudyMinutesForDay = (dayName, isWeek2) => {
      const schedule = (useAlternatingWeeks && isWeek2) ? studyHoursWeek2 : studyHoursWeek1;
      const hours = schedule[dayName] || 0;
      return Math.round(hours * 60); // Convert hours to minutes
    };

    // Helper to check if current date is before exam date
    const isBeforeExam = () => {
      if (!examDate) return true; // No exam date constraint
      return currentDate < examDate;
    };

    curriculum.forEach(week => {
      // Determine if this is week 2 in alternating schedule
      const isWeek2 = useAlternatingWeeks && (weekIndex % 2 === 1);

      // Stop scheduling if we've reached or passed the exam date (unless it's exam week)
      if (!isBeforeExam() && !week.isExamWeek) {
        logger.warn('LearningPathService', 'stoppedAtExamDate', {
          currentDate: formatLocalDate(currentDate),
          examDate: examDate ? formatLocalDate(examDate) : null,
          weekNumber: week.weekNumber
        });
        return;
      }

      // Handle EXAM WEEK specially - schedule it on the actual exam date
      if (week.isExamWeek && examDate) {
        pathItems.push({
          learning_path_id: learningPathId,
          lesson_id: null,
          sequence_order: sequenceOrder++,
          week_number: week.weekNumber,
          day_number: 1,
          is_priority: false,
          estimated_minutes: 0,
          scheduled_date: formatLocalDate(examDate),
          status: 'pending',
          item_type: 'exam_day'
        });
        weekIndex++;
        return;
      }

      // Handle review weeks (no new lessons, just review days and mock exams)
      if (week.isReviewWeek) {
        // Schedule review day
        if (week.reviewDay && isBeforeExam()) {
          const reviewDayNum = dayNameToNumber[week.reviewDay.toLowerCase()];
          const reviewDayName = dayNumberToName[reviewDayNum];

          // Move to review day
          while (currentDate.getDay() !== reviewDayNum && isBeforeExam()) {
            currentDate.setDate(currentDate.getDate() + 1);
          }

          if (isBeforeExam()) {
            const reviewMinutes = getStudyMinutesForDay(reviewDayName, isWeek2) * 2; // Double time for review
            pathItems.push({
              learning_path_id: learningPathId,
              lesson_id: null,
              sequence_order: sequenceOrder++,
              week_number: week.weekNumber,
              day_number: 1,
              is_priority: false,
              estimated_minutes: reviewMinutes,
              scheduled_date: formatLocalDate(currentDate),
              status: 'pending',
              item_type: 'review'
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }

        // Schedule mock exam if this week
        if (week.mockExam && isBeforeExam()) {
          const mockExamDayNum = dayNameToNumber[week.mockExam.toLowerCase()];

          while (currentDate.getDay() !== mockExamDayNum && isBeforeExam()) {
            currentDate.setDate(currentDate.getDate() + 1);
          }

          if (isBeforeExam()) {
            pathItems.push({
              learning_path_id: learningPathId,
              lesson_id: null,
              sequence_order: sequenceOrder++,
              week_number: week.weekNumber,
              day_number: 2,
              is_priority: false,
              estimated_minutes: 180, // 3 hours for full mock exam
              scheduled_date: formatLocalDate(currentDate),
              status: 'pending',
              item_type: 'mock_exam'
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }

        // Move to start of next week
        while (currentDate.getDay() !== 1 && isBeforeExam()) {
          currentDate.setDate(currentDate.getDate() + 1);
        }
        weekIndex++;
        return;
      }

      // Schedule regular lessons for this week
      let lessonQueue = [...week.lessons];
      let dayNumber = 1;
      const weekStartDate = new Date(currentDate);

      // Go through each day of the week
      for (let dayOffset = 0; dayOffset < 7 && lessonQueue.length > 0 && isBeforeExam(); dayOffset++) {
        const checkDate = new Date(weekStartDate);
        checkDate.setDate(checkDate.getDate() + dayOffset);

        if (checkDate >= examDate && examDate) break; // Don't schedule past exam

        const dayOfWeek = checkDate.getDay();
        const dayName = dayNumberToName[dayOfWeek];
        const availableMinutes = getStudyMinutesForDay(dayName, isWeek2);

        // Skip days with no study time
        if (availableMinutes <= 0) continue;

        // Schedule as many lessons as fit in this day
        let dayMinutesUsed = 0;
        const lessonsForDay = [];

        while (lessonQueue.length > 0 && dayMinutesUsed < availableMinutes) {
          const lesson = lessonQueue[0];

          // Parse lesson duration
          let lessonMinutes = 30;
          if (lesson.duration) {
            if (typeof lesson.duration === 'number') {
              lessonMinutes = lesson.duration;
            } else if (typeof lesson.duration === 'string') {
              const parsed = parseInt(lesson.duration);
              lessonMinutes = isNaN(parsed) ? 30 : parsed;
            }
          }

          // Check if lesson fits in remaining time (allow some flexibility)
          if (dayMinutesUsed + lessonMinutes <= availableMinutes + 15) {
            lessonsForDay.push(lessonQueue.shift());
            dayMinutesUsed += lessonMinutes;
          } else {
            break; // Move to next day
          }
        }

        // Schedule all lessons for this day
        lessonsForDay.forEach(lesson => {
          let lessonMinutes = 30;
          if (lesson.duration) {
            if (typeof lesson.duration === 'number') {
              lessonMinutes = lesson.duration;
            } else if (typeof lesson.duration === 'string') {
              const parsed = parseInt(lesson.duration);
              lessonMinutes = isNaN(parsed) ? 30 : parsed;
            }
          }

          pathItems.push({
            learning_path_id: learningPathId,
            lesson_id: null, // Set to null since using lessonStructure IDs
            lesson_key: lesson.id, // Store lessonStructure ID (e.g., "getting-started")
            sequence_order: sequenceOrder++,
            week_number: week.weekNumber,
            day_number: dayNumber++,
            is_priority: lesson.isWeak || false,
            estimated_minutes: lessonMinutes,
            scheduled_date: formatLocalDate(checkDate),
            status: 'pending',
            item_type: 'lesson'
          });
        });

        currentDate = checkDate;
      }

      // Move currentDate to next day after last scheduled lesson
      currentDate.setDate(currentDate.getDate() + 1);

      // Schedule review day for this week
      if (week.reviewDay && isBeforeExam()) {
        const reviewDayNum = dayNameToNumber[week.reviewDay.toLowerCase()];
        const reviewDayName = dayNumberToName[reviewDayNum];

        // Move to review day (must be after lessons)
        while (currentDate.getDay() !== reviewDayNum && isBeforeExam()) {
          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (isBeforeExam()) {
          const reviewMinutes = getStudyMinutesForDay(reviewDayName, isWeek2);
          if (reviewMinutes > 0) {
            pathItems.push({
              learning_path_id: learningPathId,
              lesson_id: null,
              sequence_order: sequenceOrder++,
              week_number: week.weekNumber,
              day_number: dayNumber++,
              is_priority: false,
              estimated_minutes: reviewMinutes,
              scheduled_date: formatLocalDate(currentDate),
              status: 'pending',
              item_type: 'review'
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }

      // Schedule mock exam if designated for this week
      if (week.mockExam && isBeforeExam()) {
        const mockExamDayNum = dayNameToNumber[week.mockExam.toLowerCase()];

        while (currentDate.getDay() !== mockExamDayNum && isBeforeExam()) {
          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (isBeforeExam()) {
          pathItems.push({
            learning_path_id: learningPathId,
            lesson_id: null,
            sequence_order: sequenceOrder++,
            week_number: week.weekNumber,
            day_number: dayNumber++,
            is_priority: false,
            estimated_minutes: 180,
            scheduled_date: formatLocalDate(currentDate),
            status: 'pending',
            item_type: 'mock_exam'
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }

      // Move to start of next week
      while (currentDate.getDay() !== 1 && isBeforeExam()) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      weekIndex++;
    });

    return pathItems;
  },


  /**
   * Estimate time needed for a lesson based on priority and complexity
   * @private
   */
  _estimateLessonTime(lesson, priority) {
    const baseTimes = {
      beginner: 20,
      intermediate: 30,
      advanced: 40
    };

    const baseTime = baseTimes[lesson.difficulty] || 30;

    // Add extra time for high-priority weak areas
    const priorityMultiplier = priority ? (1 + (priority.priority / 10)) : 1;

    return Math.round(baseTime * priorityMultiplier);
  },

  /**
   * Get active learning path for a user
   */
  async getActiveLearningPath(userId) {
    logger.debug('LearningPathService', 'getActiveLearningPath', { userId });

    const { data, error } = await supabase
      .from('user_learning_paths')
      .select(`
        *,
        items:learning_path_items(
          *,
          lesson:lessons(*)
        )
      `)
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      errorTracker.trackError('LearningPathService', 'getActiveLearningPath', { userId }, error);
      return null;
    }

    return data;
  },

  /**
   * Update learning path item status
   * Enforces 5-star mastery requirement before marking as complete
   */
  async updatePathItemStatus(itemId, status, completionData = {}) {
    logger.debug('LearningPathService', 'updatePathItemStatus', { itemId, status });

    // Get the path item with user and lesson info
    const { data: pathItem, error: fetchError } = await supabase
      .from('learning_path_items')
      .select('*, learning_path:user_learning_paths(user_id)')
      .eq('id', itemId)
      .single();

    if (fetchError) {
      errorTracker.trackError('LearningPathService', 'updatePathItemStatus', { itemId }, fetchError);
      throw fetchError;
    }

    const userId = pathItem.learning_path.user_id;
    const lessonId = pathItem.lesson_id;

    // If trying to mark as completed, check mastery level
    if (status === 'completed') {
      const { data: performance } = await supabase
        .from('user_lesson_performance')
        .select('mastery_level, accuracy_percentage')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      const masteryLevel = performance?.mastery_level || 0;
      const accuracy = performance?.accuracy_percentage || 0;

      // CRITICAL: Only allow completion if mastery_level >= 5 OR accuracy >= 90%
      if (masteryLevel < 5 && accuracy < 90) {
        logger.warn('LearningPathService', 'masteryNotAchieved', {
          itemId,
          lessonId,
          masteryLevel,
          accuracy,
          message: 'Cannot complete lesson - must achieve 5-star mastery (90%+ accuracy)'
        });

        // Mark as in_progress instead, requiring more practice
        status = 'in_progress';
        completionData.mastery_achieved = masteryLevel;
        completionData.requires_more_practice = true;
      } else {
        // Mastery achieved! Mark as truly complete
        completionData.completed_at = new Date().toISOString();
        completionData.mastery_achieved = 5;
      }
    }

    const updateData = {
      status,
      ...completionData
    };

    const { data, error } = await supabase
      .from('learning_path_items')
      .update(updateData)
      .eq('id', itemId)
      .select()
      .single();

    if (error) {
      errorTracker.trackError('LearningPathService', 'updatePathItemStatus', { itemId }, error);
      throw error;
    }

    // Recalculate path completion percentage
    await this._recalculatePathCompletion(data.learning_path_id);

    logger.info('LearningPathService', 'pathItemUpdated', {
      itemId,
      status: data.status,
      masteryAchieved: data.mastery_achieved
    });

    return data;
  },

  /**
   * Recalculate learning path completion percentage
   * @private
   */
  async _recalculatePathCompletion(pathId) {
    const { data: items } = await supabase
      .from('learning_path_items')
      .select('status')
      .eq('learning_path_id', pathId);

    if (!items || items.length === 0) return;

    const completedCount = items.filter(i => i.status === 'completed').length;
    const completionPercentage = (completedCount / items.length) * 100;

    await supabase
      .from('user_learning_paths')
      .update({ completion_percentage: parseFloat(completionPercentage.toFixed(2)) })
      .eq('id', pathId);
  }
};

export default LearningPathService;
