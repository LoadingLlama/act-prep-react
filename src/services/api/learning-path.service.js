/**
 * Learning Path Service
 * Generates and manages personalized learning paths based on diagnostic analysis and user goals
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';
import { lessonStructure } from '../../data/lessonStructure';
import PracticeTestsService from './practiceTests.service';

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

      // Sort lessons within each subject - will be reorganized after time pressure calculation
      // For now, just sort by order_index
      Object.keys(lessonsBySubject).forEach(subject => {
        lessonsBySubject[subject].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
      });

      // DEBUG: Log lesson counts by subject
      console.log('📊 LESSONS BY SUBJECT:', {
        english: lessonsBySubject.english?.length || 0,
        math: lessonsBySubject.math?.length || 0,
        reading: lessonsBySubject.reading?.length || 0,
        science: lessonsBySubject.science?.length || 0,
        total: Object.values(lessonsBySubject).flat().length
      });

      // 8. Calculate days until exam and maximum weeks available
      // Parse exam date in local timezone to avoid timezone shift issues
      const examDate = goals.exam_date ? (() => {
        const [year, month, day] = goals.exam_date.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        console.log('📅 PARSING EXAM DATE:', {
          goalExamDate: goals.exam_date,
          parsedYear: year,
          parsedMonth: month,
          parsedDay: day,
          createdDate: date,
          dateISO: date.toISOString(),
          dateLocal: date.toLocaleDateString()
        });
        return date;
      })() : null;
      const today = new Date();
      let maxWeeks = 12; // Default if no exam date specified (reduced from 50 to prevent crashes)
      let daysUntilExam = null;

      if (examDate) {
        daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
        if (daysUntilExam > 0) {
          // Calculate weeks - should extend all the way to exam date (use Math.ceil to fill the entire timeline)
          maxWeeks = Math.ceil(daysUntilExam / 7);

          // CRITICAL: Cap at 52 weeks (1 year) to prevent browser crashes from too many items
          if (maxWeeks > 52) {
            maxWeeks = 52;
            logger.warn('LearningPathService', 'examDateTooFar', {
              examDate: goals.exam_date,
              daysUntilExam,
              originalWeeks: Math.floor(daysUntilExam / 7),
              cappedWeeks: 52,
              message: `Exam date is ${Math.floor(daysUntilExam / 7)} weeks away. Capping at 52 weeks to prevent performance issues.`
            });
          }

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

      // 9. Calculate practice test intensity based on 3 factors
      const weeklyHoursTier = goals.weekly_hours_tier || 'moderate';
      const currentScore = goals.current_score || 18; // Default to low score if not provided
      const targetScore = goals.target_score || 28;

      // ACT scoring: 33+ is excellent/mastery, 20 is low, 36 is perfect
      const ACT_MASTERY_SCORE = 33;
      const scoreGapFromMastery = ACT_MASTERY_SCORE - currentScore;

      // Factor 1: Urgency based on weeks left
      let urgencyMultiplier = 1.0;
      if (maxWeeks <= 2) {
        urgencyMultiplier = 3.0; // CRITICAL - cram practice tests
      } else if (maxWeeks <= 4) {
        urgencyMultiplier = 2.0; // HIGH - more practice
      } else if (maxWeeks <= 6) {
        urgencyMultiplier = 1.5; // MEDIUM - balanced
      } else {
        urgencyMultiplier = 1.0; // LOW - can build foundation
      }

      // Factor 2: Score level analysis (how far from mastery)
      // ACT scale: 33+ = mastery, 25-32 = good, 20-24 = average, <20 = needs work
      let practiceTestRatio = 0.3; // Default: 30% practice tests, 70% lessons
      if (currentScore >= 33) {
        // Already at mastery - ALL practice!
        practiceTestRatio = 0.95; // 95% practice, 5% advanced lessons
      } else if (currentScore >= 30) {
        // Very good - mostly practice to polish
        practiceTestRatio = 0.75; // 75% practice, 25% lessons
      } else if (currentScore >= 25) {
        // Good - balanced approach
        practiceTestRatio = 0.50; // 50/50
      } else if (currentScore >= 20) {
        // Average - more lessons needed
        practiceTestRatio = 0.35; // 35% practice, 65% lessons
      } else {
        // Below average - need fundamentals
        practiceTestRatio = 0.25; // 25% practice, 75% lessons
      }

      // Factor 3: Weekly hours tier - extreme tier gets MORE practice
      const tierMultiplier = {
        'light': 0.8,      // Less practice (limited time)
        'moderate': 1.0,   // Standard
        'intensive': 1.3,  // More practice
        'extreme': 1.6     // LOTS of practice (have time for it)
      }[weeklyHoursTier] || 1.0;

      // Combine all factors
      practiceTestRatio = Math.min(0.95, practiceTestRatio * urgencyMultiplier * tierMultiplier);

      logger.info('LearningPathService', 'practiceTestStrategy', {
        weeklyHoursTier,
        maxWeeks,
        currentScore,
        targetScore,
        scoreGapFromMastery,
        urgencyMultiplier,
        tierMultiplier,
        practiceTestRatio: Math.round(practiceTestRatio * 100) + '%',
        message: `Score ${currentScore} (${scoreGapFromMastery} from mastery) → ${Math.round(practiceTestRatio * 100)}% practice tests, ${Math.round((1 - practiceTestRatio) * 100)}% lessons`
      });

      // 10. Fetch available practice tests from database
      const availableTestsCount = await PracticeTestsService.getAvailablePracticeTestsCount();

      // TEMPORARY: If no tests in database, default to 5 practice tests
      const testCount = availableTestsCount > 0 ? availableTestsCount : 5;

      const availablePracticeTests = Array.from({ length: testCount }, (_, i) => ({
        testNumber: i + 1,
        sections: ['english', 'math', 'reading', 'science']
      }));

      logger.info('LearningPathService', 'practiceTestsAvailable', {
        count: availablePracticeTests.length,
        fromDatabase: availableTestsCount > 0,
        message: `${availablePracticeTests.length} practice tests available ${availableTestsCount > 0 ? 'from database' : '(hardcoded default)'}`
      });

      // 11. Build structured curriculum that fills ALL available weeks until exam
      const curriculum = this._buildCurriculum(lessonsBySubject, goals, maxWeeks, practiceTestRatio, availablePracticeTests);

      logger.info('LearningPathService', 'curriculumBuilt', {
        totalWeeks: curriculum.length,
        totalLessons: curriculum.reduce((sum, week) => sum + week.lessons.length, 0),
        practiceTestWeeks: curriculum.filter(w => w.practiceTest).length,
        practiceTestSections: curriculum.reduce((sum, week) => {
          return sum + (week.practiceTest ? week.practiceTest.sections.length : 0);
        }, 0),
        reviewDaysCount: curriculum.reduce((sum, week) => sum + (week.reviewDay ? 1 : 0), 0),
        mockExamsCount: curriculum.reduce((sum, week) => sum + (week.mockExam ? 1 : 0), 0)
      });

      // 10. Schedule lessons with dates using actual per-day study hours
      const pathItems = this._scheduleLessons(
        curriculum,
        learningPath.id,
        lessonsBySubject,
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
   * - Integrates practice tests based on practiceTestRatio
   * @private
   */
  _buildCurriculum(lessonsBySubject, goals, maxWeeks = 52, practiceTestRatio = 0.3, availablePracticeTests = []) {
    const curriculum = [];
    let weekNumber = 1;
    let practiceTestsScheduled = 0;
    let practiceTestIndex = 0; // Track which test to schedule next

    const reviewDay = goals.review_day || 'sunday';
    const mockExamDay = goals.mock_exam_day || 'saturday';

    // PRIORITY: Schedule practice tests for LATER weeks, not earlier weeks
    // Calculate how many weeks to SKIP at the beginning before assigning practice tests
    const weeksToSkipForPracticeTests = Math.max(0, maxWeeks - availablePracticeTests.length);

    // Calculate total weekly hours to determine study intensity
    const studyHours = goals.study_hours || {};
    const totalWeeklyHours = Object.values(studyHours).reduce((sum, hours) => sum + (hours || 0), 0);

    // Get weekly hours tier (light, moderate, intensive, extreme)
    let weeklyHoursTier = goals.weekly_hours_tier || 'moderate';

    // CRITICAL: Validate that daily hours match the weekly tier
    const tierRanges = {
      'light': { min: 1, max: 5 },
      'moderate': { min: 5, max: 10 },
      'intensive': { min: 10, max: 15 },
      'extreme': { min: 15, max: 100 }
    };

    // Auto-correct tier based on actual weekly hours if mismatch detected
    const actualTier =
      totalWeeklyHours >= 15 ? 'extreme' :
      totalWeeklyHours >= 10 ? 'intensive' :
      totalWeeklyHours >= 5 ? 'moderate' : 'light';

    if (actualTier !== weeklyHoursTier) {
      logger.warn('LearningPathService', 'tierMismatch', {
        selectedTier: weeklyHoursTier,
        actualWeeklyHours: totalWeeklyHours,
        correctedTier: actualTier,
        message: `User selected ${weeklyHoursTier} (${tierRanges[weeklyHoursTier].min}+ hrs) but only allocated ${totalWeeklyHours} hrs/week. Auto-correcting to ${actualTier}.`
      });
      weeklyHoursTier = actualTier; // Use actual tier based on hours entered
    }

    // DRASTICALLY adjust lessons per week based on weekly hours tier
    const lessonsPerWeekByTier = {
      'light': 2,      // 1-5 hours/week: Very slow pace, 2 lessons/week
      'moderate': 4,   // 5-10 hours/week: Standard pace, 4 lessons/week
      'intensive': 7,  // 10-15 hours/week: Fast pace, 7 lessons/week
      'extreme': 12    // 15+ hours/week: Maximum pace, 12 lessons/week
    };

    // CRITICAL FIX: Count how many days have study hours allocated
    // Ensure we have AT LEAST one lesson per study day to prevent empty days
    const daysWithStudyHours = Object.values(studyHours).filter(hours => hours > 0).length;
    const baseLessonsPerWeek = lessonsPerWeekByTier[weeklyHoursTier] || 4;
    const lessonsPerWeek = Math.max(baseLessonsPerWeek, daysWithStudyHours);

    logger.info('LearningPathService', 'lessonsPerWeekCalculation', {
      weeklyHoursTier,
      baseLessonsPerWeek,
      daysWithStudyHours,
      finalLessonsPerWeek: lessonsPerWeek,
      message: `Adjusted from ${baseLessonsPerWeek} to ${lessonsPerWeek} lessons/week to fill ${daysWithStudyHours} study days`
    });

    // Calculate time pressure: ratio of weeks available to total lessons
    // More weeks = comprehensive foundation (sequential order)
    // Fewer weeks = targeted improvement (prioritize weaknesses)
    const totalLessons = Object.values(lessonsBySubject).flat().length;
    const weeksNeededForAll = Math.ceil(totalLessons / lessonsPerWeek);
    const timePressureRatio = maxWeeks / weeksNeededForAll; // > 1 = plenty of time, < 1 = tight schedule

    logger.info('LearningPathService', 'timePressureAnalysis', {
      totalLessons,
      lessonsPerWeek,
      maxWeeks,
      weeksNeededForAll,
      timePressureRatio,
      approach: timePressureRatio >= 0.8 ? 'comprehensive (sequential)' : 'targeted (prioritize weaknesses)'
    });

    // Re-sort lessons within each subject based on time pressure
    Object.keys(lessonsBySubject).forEach(subject => {
      lessonsBySubject[subject].sort((a, b) => {
        // If plenty of time (ratio >= 0.8): Go through all material sequentially
        if (timePressureRatio >= 0.8) {
          // Comprehensive foundation: Start from lesson 1, cover everything
          return (a.order_index || 0) - (b.order_index || 0);
        } else {
          // Tight schedule: Prioritize weaknesses, then fundamentals
          // 1. Weak lessons come first (regardless of order)
          if (a.isWeak && !b.isWeak) return -1;
          if (!a.isWeak && b.isWeak) return 1;
          // 2. Within same weakness level, sort by priority score
          if (a.priority !== b.priority) return (b.priority || 0) - (a.priority || 0);
          // 3. Finally, sort by order_index for fundamentals
          return (a.order_index || 0) - (b.order_index || 0);
        }
      });
    });

    // NEW: Assign mock exams strategically based on timeline
    // CRITICAL: Only assign mock exams to weeks where the pinned day (mockExamDay) will actually occur
    const mockExamWeeks = new Set();

    // For short timelines (2 weeks or less), prioritize getting 1-2 mock exams in early
    // For longer timelines, space them out with foundation building first
    let mockExamStartWeek;
    if (maxWeeks <= 2) {
      mockExamStartWeek = 1; // Start immediately - aim for Week 1 mock exam
    } else if (maxWeeks <= 4) {
      mockExamStartWeek = 1; // Start Week 1 for 2-4 week timelines
    } else if (maxWeeks <= 8) {
      mockExamStartWeek = 2; // 1 week foundation for 5-8 week timelines
    } else {
      mockExamStartWeek = 3; // 2 weeks foundation for longer timelines
    }

    // Strategy: Assign mock exams every other week starting from mockExamStartWeek
    // This gives time to learn, practice, test, review, repeat
    for (let week = mockExamStartWeek; week <= maxWeeks; week += 2) {
      mockExamWeeks.add(week);
    }

    // For very short timelines, ensure we have at least one mock exam in Week 1
    if (maxWeeks <= 2 && !mockExamWeeks.has(1)) {
      mockExamWeeks.add(1);
    }

    // Fallback: ALWAYS have at least 1 mock exam somewhere
    if (mockExamWeeks.size === 0) {
      mockExamWeeks.add(Math.max(1, maxWeeks - 1)); // Second-to-last week
    }

    const targetMockExams = mockExamWeeks.size;

    logger.info('LearningPathService', 'curriculumPacing', {
      maxWeeks,
      totalWeeklyHours,
      weeklyHoursTier,
      lessonsPerWeek,
      targetMockExams,
      actualMockExams: mockExamWeeks.size,
      mockExamWeeks: Array.from(mockExamWeeks).sort((a, b) => a - b),
      message: `${weeklyHoursTier.toUpperCase()} tier: ${lessonsPerWeek} lessons/week, ${mockExamWeeks.size} mock exams on weeks ${Array.from(mockExamWeeks).sort((a, b) => a - b).join(', ')}`
    });

    // Helper function to determine if this week should have a mock exam
    const shouldHaveMockExam = (currentWeekNum) => {
      return mockExamWeeks.has(currentWeekNum);
    };

    // ONLY start with ACT Test Basics if there's plenty of time (comprehensive approach)
    // When time is tight, skip intro and jump straight to targeted weaknesses
    const introLesson = timePressureRatio >= 0.8
      ? lessonsBySubject.english.find(l => l.title.toLowerCase().includes('act test basics'))
      : null;

    // Track which lessons have been used
    const usedLessons = new Set(introLesson ? [introLesson.id] : []);

    logger.info('LearningPathService', 'introLessonDecision', {
      timePressureRatio,
      hasIntroLesson: !!introLesson,
      message: timePressureRatio >= 0.8
        ? 'Comprehensive approach: Starting with ACT Test Basics'
        : 'Targeted approach: Skipping intro, focusing on diagnostic weaknesses'
    });

    // Helper to get next N lessons from a subject
    const getNextLessonsForInit = (subject, count) => {
      const lessons = [];
      for (const lesson of lessonsBySubject[subject]) {
        if (!usedLessons.has(lesson.id) && lessons.length < count) {
          lessons.push(lesson);
          usedLessons.add(lesson.id);
        }
      }
      return lessons;
    };

    // FILL Week 1 with same amount of content as other weeks
    // If no intro (time pressure), fill with top-priority lessons from diagnostic
    const week1Lessons = [];
    if (introLesson) {
      week1Lessons.push(introLesson);
      // Add more English lessons to Week 1 (aim for 60% of lessonsPerWeek)
      const additionalEnglish = getNextLessonsForInit('english', Math.ceil(lessonsPerWeek * 0.6) - 1);
      week1Lessons.push(...additionalEnglish);
    } else {
      // Time pressure: Get top-priority lessons (already sorted by weakness/priority)
      const priorityEnglish = getNextLessonsForInit('english', Math.ceil(lessonsPerWeek * 0.6));
      week1Lessons.push(...priorityEnglish);
    }

    // Add Math lessons to Week 1 (aim for 40% of lessonsPerWeek)
    const mathLessons = getNextLessonsForInit('math', Math.floor(lessonsPerWeek * 0.4));
    week1Lessons.push(...mathLessons);

    // Add practice test to Week 1 ONLY if we're not skipping early weeks for practice tests
    let week1PracticeTest = null;
    if (1 > weeksToSkipForPracticeTests && practiceTestIndex < availablePracticeTests.length) {
      week1PracticeTest = {
        testNumber: availablePracticeTests[practiceTestIndex].testNumber,
        sections: ['english', 'math', 'reading', 'science'],
        isFull: true
      };
      practiceTestIndex++; // Increment so Week 2+ get the next test
    }

    const week1Title = introLesson
      ? (week1PracticeTest ? `Introduction - English & Math + Practice Test ${week1PracticeTest.testNumber}` : 'Introduction - English & Math')
      : (week1PracticeTest ? `Targeted Review - English & Math + Practice Test ${week1PracticeTest.testNumber}` : 'Targeted Review - English & Math');

    curriculum.push({
      weekNumber: weekNumber++,
      focus: week1Title,
      lessons: week1Lessons,
      practiceTest: week1PracticeTest,
      reviewDay: reviewDay,
      mockExam: null // Mock exams removed - only use practice tests
    });

    logger.info('LearningPathService', 'week1Created', {
      lessonsAdded: week1Lessons.length,
      targetLessons: lessonsPerWeek,
      lessons: week1Lessons.map(l => l.id)
    });

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

    // Fill ALL weeks with content - no empty exam week
    const lastContentWeek = maxWeeks;

    logger.info('LearningPathService', 'curriculumConstraints', {
      maxWeeks,
      lastContentWeek,
      currentWeekNumber: weekNumber,
      availablePracticeTests: availablePracticeTests.length,
      weeksToSkipForPracticeTests,
      message: `Will build content for ALL ${maxWeeks} weeks until exam. Practice tests assigned to weeks ${weeksToSkipForPracticeTests + 1}-${lastContentWeek} (skipping first ${weeksToSkipForPracticeTests} weeks)`
    });

    // Fill ALL remaining weeks until exam with rotating subjects
    // This ensures no gaps in the schedule regardless of timeline
    let subjectIndex = 0;
    const subjectRotation = ['english', 'reading', 'science', 'english', 'math']; // Varied rotation
    // totalLessons already declared at line 499

    logger.info('LearningPathService', 'fillingAllWeeks', {
      maxWeeks,
      lastContentWeek,
      currentWeekNumber: weekNumber,
      totalLessons,
      lessonsPerWeek,
      message: `Filling weeks ${weekNumber} through ${lastContentWeek} with ${lessonsPerWeek} lessons each`
    });

    // NEW APPROACH: Build lessons for EVERY week, then add practice tests/mock exams on top
    while (weekNumber <= lastContentWeek) {
      const subject = subjectRotation[subjectIndex % subjectRotation.length];
      const primaryLessons = getNextLessons(subject, Math.ceil(lessonsPerWeek * 0.6));
      const mathLessons = getNextLessons('math', Math.floor(lessonsPerWeek * 0.4));

      // DEBUG: Log what we got
      console.log(`📝 Week ${weekNumber}: Requested ${Math.ceil(lessonsPerWeek * 0.6)} ${subject} + ${Math.floor(lessonsPerWeek * 0.4)} math lessons, Got ${primaryLessons.length} + ${mathLessons.length} = ${primaryLessons.length + mathLessons.length} total`);

      // Combine lessons for this week
      const weekLessons = [...primaryLessons, ...mathLessons];

      // If we're out of lessons from both subjects, try to get ANY remaining lessons
      if (weekLessons.length === 0) {
        // Try to get lessons from any subject
        const anyLessons = [];
        for (const subj of ['english', 'math', 'reading', 'science']) {
          const remaining = getNextLessons(subj, lessonsPerWeek);
          anyLessons.push(...remaining);
          if (anyLessons.length >= lessonsPerWeek) break;
        }

        if (anyLessons.length === 0) {
          // Truly out of lessons - fill remaining weeks with practice tests or review
          logger.warn('LearningPathService', 'outOfLessons', {
            usedLessons: usedLessons.size,
            totalLessons,
            currentWeek: weekNumber,
            lastContentWeek,
            weeksRemaining: lastContentWeek - weekNumber + 1,
            practiceTestsRemaining: availablePracticeTests.length - practiceTestIndex,
            message: `OUT OF LESSONS at week ${weekNumber}! Filling weeks ${weekNumber}-${lastContentWeek} with practice tests/review`
          });

          // Fill remaining weeks with practice tests if available, otherwise review
          while (weekNumber <= lastContentWeek) {
            logger.debug('LearningPathService', 'fillingRemainingWeek', { weekNumber, lastContentWeek });
            if (practiceTestIndex < availablePracticeTests.length) {
              const practiceTest = availablePracticeTests[practiceTestIndex];
              curriculum.push({
                weekNumber: weekNumber++,
                focus: `Practice Test ${practiceTest.testNumber}`,
                lessons: [],
                practiceTest: {
                  testNumber: practiceTest.testNumber,
                  sections: ['english', 'math', 'reading', 'science'],
                  isFull: true
                },
                reviewDay: reviewDay,
                mockExam: null
              });
              practiceTestsScheduled++;
              practiceTestIndex++;
            } else {
              curriculum.push({
                weekNumber: weekNumber++,
                focus: 'Review & Practice',
                lessons: [],
                reviewDay: reviewDay,
                mockExam: null, // Mock exams removed - only use practice tests
                isReviewWeek: true
              });
            }
          }
          break;
        }

        // Use whatever lessons we found
        curriculum.push({
          weekNumber: weekNumber++,
          focus: 'Mixed Review',
          lessons: anyLessons,
          reviewDay: reviewDay,
          mockExam: null // Mock exams removed - only use practice tests
        });
        subjectIndex++;
        continue;
      }

      // Add practice tests (mock exams are disabled)
      let practiceTest = null;

      // Add practice test if available AND we're past the weeks to skip
      // Priority: Later weeks get practice tests first
      if (weekNumber > weeksToSkipForPracticeTests && practiceTestIndex < availablePracticeTests.length) {
        const test = availablePracticeTests[practiceTestIndex];
        practiceTest = {
          testNumber: test.testNumber,
          sections: ['english', 'math', 'reading', 'science'],
          isFull: true
        };
        practiceTestIndex++;
      }

      logger.debug('LearningPathService', 'creatingWeek', {
        weekNumber,
        subject,
        lessonCount: weekLessons.length,
        hasPracticeTest: !!practiceTest,
        practiceTestNum: practiceTest?.testNumber
      });

      curriculum.push({
        weekNumber: weekNumber++,
        focus: practiceTest
          ? `${subject.charAt(0).toUpperCase() + subject.slice(1)} + Math + Practice Test ${practiceTest.testNumber}`
          : `${subject.charAt(0).toUpperCase() + subject.slice(1)} + Math`,
        lessons: weekLessons,
        practiceTest: practiceTest,
        reviewDay: reviewDay,
        mockExam: null // Mock exams removed - only use practice tests
      });

      subjectIndex++;
    }

    logger.info('LearningPathService', 'curriculumBuildingComplete', {
      finalWeekNumber: weekNumber - 1,
      expectedLastWeek: lastContentWeek,
      curriculumLength: curriculum.filter(w => !w.isExamWeek).length,
      weeksCreated: curriculum.filter(w => !w.isExamWeek).map(w => w.weekNumber),
      message: `Curriculum building loop ended. Created ${curriculum.filter(w => !w.isExamWeek).length} content weeks (expected ${lastContentWeek})`
    });

    // SAFEGUARD: Ensure we have exactly lastContentWeek weeks (excluding exam week)
    // Fill any missing weeks with review weeks
    const contentWeeks = curriculum.filter(w => !w.isExamWeek);
    const highestWeekNumber = contentWeeks.length > 0 ? Math.max(...contentWeeks.map(w => w.weekNumber)) : 0;

    logger.info('LearningPathService', 'safeguardCheck', {
      contentWeeksCount: contentWeeks.length,
      weekNumbers: contentWeeks.map(w => w.weekNumber),
      highestWeekNumber,
      lastContentWeek,
      needsGapFill: highestWeekNumber < lastContentWeek,
      message: `Safeguard: Found ${contentWeeks.length} content weeks (highest: ${highestWeekNumber}, expected: ${lastContentWeek})`
    });

    if (highestWeekNumber < lastContentWeek) {
      logger.warn('LearningPathService', 'fillingMissingWeeks', {
        expected: lastContentWeek,
        actual: highestWeekNumber,
        missing: lastContentWeek - highestWeekNumber,
        weekRange: `${highestWeekNumber + 1}-${lastContentWeek}`,
        message: `SAFEGUARD ACTIVATED: Filling ${lastContentWeek - highestWeekNumber} missing weeks!`
      });

      for (let i = highestWeekNumber + 1; i <= lastContentWeek; i++) {
        curriculum.push({
          weekNumber: i,
          focus: 'Review & Practice',
          lessons: [],
          reviewDay: reviewDay,
          mockExam: null,
          isReviewWeek: true
        });
        logger.info('LearningPathService', 'addedMissingWeek', { weekNumber: i, focus: 'Review & Practice' });
      }
    }

    logger.info('LearningPathService', 'curriculumComplete', {
      totalWeeks: curriculum.length,
      lessonsUsed: usedLessons.size,
      totalLessons: totalLessons,
      practiceTestsScheduled: Math.floor(practiceTestsScheduled),
      practiceTestWeeks: curriculum.filter(w => w.practiceTest).length,
      maxWeeks: maxWeeks,
      reviewWeeks: curriculum.filter(w => w.isReviewWeek).length,
      weekNumbers: curriculum.map(w => ({ week: w.weekNumber, focus: w.focus, lessonCount: w.lessons?.length || 0 })),
      message: `Built ${curriculum.length} weeks (expected ${maxWeeks}): ${curriculum.map(w => `W${w.weekNumber}`).join(', ')}`
    });

    return curriculum;
  },

  /**
   * Schedule lessons with actual dates using per-day study hours
   * COMPLETELY REWRITTEN for continuous daily scheduling with NO GAPS
   * @private
   */
  _scheduleLessons(curriculum, learningPathId, lessonsBySubject, goals, examDate = null) {
    const pathItems = [];

    //Helper functions for date handling
    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const dayNumberToName = {
      0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday',
      4: 'thursday', 5: 'friday', 6: 'saturday'
    };

    // Parse study hours and review day from goals
    const useAlternatingWeeks = goals.use_alternating_weeks || false;
    const studyHoursWeek1 = goals.study_hours || {
      monday: 0.75, tuesday: 1, wednesday: 0, thursday: 0.75,
      friday: 1, saturday: 2, sunday: 2
    };
    // CRITICAL: If alternating weeks is OFF, use Week 1 schedule for all weeks
    // Don't use database's study_hours_week2 which may have old/incorrect values
    const studyHoursWeek2 = useAlternatingWeeks
      ? (goals.study_hours_week2 || studyHoursWeek1)
      : studyHoursWeek1;
    const reviewDay = goals.review_day || 'sunday';

    logger.info('LearningPathService', 'studyHoursConfig', {
      useAlternatingWeeks,
      studyHoursWeek1,
      studyHoursWeek2,
      reviewDay,
      totalHoursWeek1: Object.values(studyHoursWeek1).reduce((sum, h) => sum + h, 0),
      totalHoursWeek2: Object.values(studyHoursWeek2).reduce((sum, h) => sum + h, 0),
      week2MatchesWeek1: JSON.stringify(studyHoursWeek1) === JSON.stringify(studyHoursWeek2),
      message: useAlternatingWeeks
        ? 'Using alternating weeks - Week 1 and Week 2 schedules differ'
        : 'Alternating weeks OFF - Week 2 should match Week 1'
    });

    // Helper to get study minutes for a specific day
    const getStudyMinutesForDay = (dayName, weekNumber) => {
      const isWeek2 = useAlternatingWeeks && (weekNumber % 2 === 0);
      const schedule = isWeek2 ? studyHoursWeek2 : studyHoursWeek1;
      const hours = schedule[dayName] || 0;
      const minutes = Math.round(hours * 60);

      // DEBUG: Log every single day calculation
      if (dayName === 'friday' || dayName === 'saturday') {
        console.log('🔍 getStudyMinutesForDay:', {
          dayName,
          weekNumber,
          isWeek2,
          useAlternatingWeeks,
          schedule,
          hours,
          minutes,
          studyHoursWeek1,
          studyHoursWeek2
        });
      }

      return minutes;
    };

    // CHANGED: Schedule week-by-week instead of flattening everything
    // CRITICAL: Strip time component from currentDate to prevent false date comparisons
    // Set to midnight (00:00:00) so date comparisons work correctly
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let sequenceOrder = 1;
    let dayNumber = 1;
    let totalDaysProcessed = 0;

    logger.info('LearningPathService', 'schedulingStart', {
      startDate: formatLocalDate(currentDate),
      examDate: examDate ? formatLocalDate(examDate) : 'none',
      totalWeeks: curriculum.length,
      message: `Starting week-by-week scheduling from ${formatLocalDate(currentDate)}`
    });

    // Step 1: Schedule each week's items across that week's 7 days
    // CRITICAL: Reviews and mock exams must be pinned to specific days of the week
    // Track completed lessons to enable practice scheduling
    // SEED with:
    // 1. Intro lesson so Week 1 can have practice
    // 2. Strong lessons (non-weak lessons from all subjects)
    const allLessonsFlat = Object.values(lessonsBySubject).flat();
    const strongLessons = allLessonsFlat
      .filter(l => !l.isWeak && !l.priority) // Not marked as weak or priority
      .map(l => l.id)
      .slice(0, 5); // Top 5 strong lessons for practice rotation

    const completedLessons = ['getting-started', ...strongLessons];

    logger.info('LearningPathService', 'practicePool', {
      completedCount: completedLessons.length,
      strongLessons: strongLessons.length,
      message: `Practice pool initialized with ${completedLessons.length} lessons (intro + ${strongLessons.length} strong lessons)`
    });

    curriculum.forEach((week, weekIndex) => {
      // CRITICAL: Stop scheduling if we've reached or passed the exam date
      if (examDate && currentDate >= examDate) {
        logger.warn('LearningPathService', 'reachedExamDate', {
          currentDate: formatLocalDate(currentDate),
          examDate: formatLocalDate(examDate),
          weekNumber: week.weekNumber,
          message: `Stopping scheduling - reached exam date`
        });
        return; // Exit this iteration
      }

      // ALIGN to week boundary: Each week should end on reviewDay
      // If reviewDay is 'sunday' (0), week should span Monday(1) - Sunday(0)
      // If reviewDay is 'saturday' (6), week should span Sunday(0) - Saturday(6)
      const dayNameToNumber = {
        'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
        'thursday': 4, 'friday': 5, 'saturday': 6
      };
      const reviewDayNumber = dayNameToNumber[reviewDay];
      const weekStartDay = (reviewDayNumber + 1) % 7; // Day after review = start of next week

      // Advance currentDate to the correct week start day
      while (currentDate.getDay() !== weekStartDay) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      logger.debug('LearningPathService', 'weekAlignment', {
        weekNumber: week.weekNumber,
        alignedStartDate: formatLocalDate(currentDate),
        startDayName: Object.keys(dayNameToNumber).find(k => dayNameToNumber[k] === weekStartDay),
        reviewDay: reviewDay
      });

      // Separate items into pinned (review/mock) and flexible (lessons/practice tests)
      const lessonItems = [];
      const practiceTestItems = [];
      let reviewItem = null;
      let mockExamItem = null;

      // Add all lessons to flexible queue AND to practice pool for this week
      const weekLessonsForPractice = [];
      week.lessons?.forEach(lesson => {
        let duration = 30;
        if (lesson.duration) {
          if (typeof lesson.duration === 'number') {
            duration = lesson.duration;
          } else if (typeof lesson.duration === 'string') {
            duration = parseInt(lesson.duration) || 30;
          }
        }

        lessonItems.push({
          type: 'lesson',
          lesson_key: lesson.id,
          is_priority: lesson.isWeak || false,
          estimated_minutes: duration,
          week_number: week.weekNumber
        });

        // Add to this week's practice pool
        weekLessonsForPractice.push(lesson.id);
      });

      logger.info('LearningPathService', 'weekLessonsForPractice', {
        weekNumber: week.weekNumber,
        lessonsInWeek: weekLessonsForPractice,
        lessonCount: weekLessonsForPractice.length
      });

      // Store review for pinning to specific day
      if (week.reviewDay) {
        reviewItem = {
          type: 'review',
          estimated_minutes: 60,
          week_number: week.weekNumber,
          pinnedDay: week.reviewDay // e.g., 'sunday'
        };
      }

      // Mock exams disabled - only use practice tests
      // (week.mockExam is always null now)

      // Add practice test as ONE FULL TEST (not split into sections)
      // Practice tests should be taken in one sitting like the real ACT
      if (week.practiceTest) {
        const { testNumber } = week.practiceTest;

        console.log(`✅ ADDING PRACTICE TEST to Week ${week.weekNumber}:`, {
          testNumber,
          weekFocus: week.focus,
          pinnedDay: 'saturday'
        });

        practiceTestItems.push({
          type: 'practice_test',
          practice_test_number: testNumber,
          practice_test_section: 'full', // Full test, not individual sections
          estimated_minutes: 175, // Total: English(45) + Math(60) + Reading(35) + Science(35)
          week_number: week.weekNumber,
          pinnedDay: 'saturday' // Pin to Saturday (day before Sunday review)
        });
      } else {
        console.log(`❌ NO PRACTICE TEST for Week ${week.weekNumber}:`, {
          weekFocus: week.focus,
          hasPracticeTest: !!week.practiceTest
        });
      }

      logger.debug('LearningPathService', 'schedulingWeek', {
        weekNumber: week.weekNumber,
        focus: week.focus,
        lessonCount: lessonItems.length,
        practiceTestCount: practiceTestItems.length,
        hasReview: !!reviewItem,
        hasMockExam: !!mockExamItem,
        startDate: formatLocalDate(currentDate)
      });

      // ============================================================
      // SIMPLE ROUND-ROBIN DISTRIBUTION - GUARANTEED TO FILL ALL DAYS
      // ============================================================
      // Create a simple queue and rotate through days
      const lessonQueue = [...lessonItems];
      const dayLessonMap = {}; // Map of dayIndex -> lessons[]

      // Identify days with study hours
      // EXCLUDE practice test days AND review days - those are reserved for special activities only, no lessons
      const practiceTestDay = practiceTestItems.length > 0 ? practiceTestItems[0].pinnedDay : null;
      const reviewDayName = reviewItem ? reviewItem.pinnedDay : null;

      console.log('🎯 Special days check:', {
        weekNumber: week.weekNumber,
        practiceTestDay: practiceTestDay || 'NONE',
        reviewDay: reviewDayName || 'NONE',
        message: `Week ${week.weekNumber} - Practice test: ${practiceTestDay || 'NONE'}, Review: ${reviewDayName || 'NONE'}`
      });

      const availableDayIndices = [];
      for (let i = 0; i < 7; i++) {
        const tempDate = new Date(currentDate);
        tempDate.setDate(tempDate.getDate() + i);
        const dayName = dayNumberToName[tempDate.getDay()];
        const minutes = getStudyMinutesForDay(dayName, week.weekNumber);

        // Skip this day if it's a special day (practice test or review - no lessons on those days)
        const isPracticeTestDay = practiceTestDay && dayName === practiceTestDay;
        const isReviewDay = reviewDayName && dayName === reviewDayName;
        const isSpecialDay = isPracticeTestDay || isReviewDay;

        console.log(`  Day ${i} (${dayName}): ${minutes} minutes, isPracticeTest: ${isPracticeTestDay}, isReview: ${isReviewDay}, willInclude: ${minutes > 0 && !isSpecialDay}`);

        if (minutes > 0 && !isSpecialDay) {
          availableDayIndices.push(i);
          dayLessonMap[i] = [];
        }
      }

      // Round-robin distribute ALL lessons across available days
      let currentDayIdx = 0;
      while (lessonQueue.length > 0 && availableDayIndices.length > 0) {
        const dayIndex = availableDayIndices[currentDayIdx % availableDayIndices.length];
        const lesson = lessonQueue.shift();
        dayLessonMap[dayIndex].push(lesson);
        currentDayIdx++;
      }

      console.log('📊 LESSON DISTRIBUTION:', {
        weekNumber: week.weekNumber,
        totalLessons: lessonItems.length,
        availableDays: availableDayIndices.length,
        distribution: Object.entries(dayLessonMap).map(([idx, lessons]) => ({
          dayIndex: idx,
          lessonCount: lessons.length,
          lessons: lessons.map(l => l.lesson_key)
        }))
      });

      // Schedule items across the next 7 days
      let practiceTestItem = practiceTestItems.length > 0 ? practiceTestItems[0] : null;
      let daysInWeek = 0;
      const lessonsScheduledThisWeek = []; // Track lessons already scheduled this week

      while (daysInWeek < 7) {
        const dayOfWeek = currentDate.getDay();
        const dayName = dayNumberToName[dayOfWeek];
        const availableMinutes = getStudyMinutesForDay(dayName, week.weekNumber);
        const itemsScheduledToday = [];

        logger.info('LearningPathService', 'processingDay', {
          weekNumber: week.weekNumber,
          daysInWeek,
          dayName,
          date: formatLocalDate(currentDate),
          availableMinutes,
          currentDateFull: currentDate.toISOString(),
          examDateFull: examDate ? examDate.toISOString() : null,
          willStopNext: examDate && currentDate > examDate,
          message: `Processing day ${daysInWeek + 1}/7: ${dayName} ${formatLocalDate(currentDate)} (${availableMinutes} minutes)`
        });

        // CRITICAL: Stop scheduling if we've REACHED the day before exam date
        // The day before exam is reserved for final review ONLY (added separately)
        // The exam date itself is reserved for the actual exam
        const dayBeforeExam = examDate ? new Date(examDate) : null;
        if (dayBeforeExam) {
          dayBeforeExam.setDate(dayBeforeExam.getDate() - 1);
        }

        if (examDate && currentDate >= dayBeforeExam) {
          logger.warn('LearningPathService', 'reachedDayBeforeExam', {
            currentDate: formatLocalDate(currentDate),
            dayBeforeExam: formatLocalDate(dayBeforeExam),
            examDate: formatLocalDate(examDate),
            weekNumber: week.weekNumber,
            daysInWeek,
            message: `Stopping day-by-day scheduling - reached day before exam (final review will be added separately)`
          });
          break; // Exit the day loop
        }

        // Check if this is a pinned day
        const isReviewDay = reviewItem && reviewItem.pinnedDay === dayName;
        // CRITICAL: Never schedule mock exam ON the actual exam date
        // Mock exams should be practice, not on the real exam day
        const isExamDate = examDate &&
          currentDate.getFullYear() === examDate.getFullYear() &&
          currentDate.getMonth() === examDate.getMonth() &&
          currentDate.getDate() === examDate.getDate();
        const isMockExamDay = mockExamItem && mockExamItem.pinnedDay === dayName && !isExamDate;
        const isPracticeTestDay = practiceTestItem && practiceTestItem.pinnedDay === dayName;

        // Get today's pre-distributed lessons from the map
        const todaysLessons = dayLessonMap[daysInWeek] || [];

        // CRITICAL: Always process practice test days, even if study hours are 0
        // Practice tests take 175 minutes and don't use regular study time
        if (availableMinutes > 0 || isPracticeTestDay) {
          let minutesUsed = 0;

          // FIRST: Schedule pinned items if this is their day
          // Mock exams disabled - only practice tests scheduled

          if (isPracticeTestDay && practiceTestItem) {
            itemsScheduledToday.push(practiceTestItem);
            minutesUsed += practiceTestItem.estimated_minutes;
            practiceTestItem = null;
          }

          if (isReviewDay) {
            itemsScheduledToday.push(reviewItem);
            minutesUsed += reviewItem.estimated_minutes;
            reviewItem = null;
          }

          // SECOND: Schedule ALL pre-distributed lessons for this day
          for (const lesson of todaysLessons) {
            itemsScheduledToday.push(lesson);
            minutesUsed += lesson.estimated_minutes;
            // Track this lesson as scheduled (for practice eligibility)
            lessonsScheduledThisWeek.push(lesson.lesson_key);
          }

          // THIRD: Add ONE practice activity if there's a lesson today
          // Practice reinforces lessons, so only add if at least 1 lesson is scheduled
          // Practice should include:
          // 1. Lessons taught TODAY (same day practice for immediate reinforcement)
          // 2. Lessons already taught this week (on previous days)
          // 3. Previously completed lessons from earlier weeks
          // NEVER include lessons not yet taught (scheduled for future days)
          const practiceItemDuration = 30; // Practice activities are ~30 minutes each

          // Check if at least 1 lesson was scheduled today
          const hasLessonToday = itemsScheduledToday.some(item => item.type === 'lesson');
          const remainingMinutes = availableMinutes - minutesUsed;

          // ALWAYS add practice if at least 1 lesson is scheduled today
          // Practice is critical for retention and test preparation
          // NOTE: We add practice even if it exceeds available minutes - it's that important!
          if (hasLessonToday) {
            // Build practice pool: Include TODAY'S lessons + lessons from previous days this week + completed lessons
            // This allows same-day practice for immediate reinforcement
            const practiceLessonPool = [...lessonsScheduledThisWeek, ...completedLessons];
            // Remove duplicates while preserving order
            const uniquePracticePool = [...new Set(practiceLessonPool)];

            logger.debug('LearningPathService', 'buildingPracticePool', {
              weekNumber: week.weekNumber,
              dayName,
              lessonsScheduledThisWeek,
              completedLessons,
              uniquePracticePool,
              poolSize: uniquePracticePool.length,
              message: `Practice pool: ${lessonsScheduledThisWeek.length} from this week (including today) + ${completedLessons.length} completed = ${uniquePracticePool.length} total`
            });

            if (uniquePracticePool.length > 0) {
              // PRIORITIZE: Practice lessons taught TODAY for immediate reinforcement
              // Get lesson keys from today's lessons
              const todaysLessonKeys = todaysLessons.map(l => l.lesson_key);

              // Find lessons taught today that are in the practice pool
              const todaysLessonsInPool = uniquePracticePool.filter(key => todaysLessonKeys.includes(key));

              let lessonToPractice;
              if (todaysLessonsInPool.length > 0) {
                // Practice one of today's lessons (randomly select if multiple)
                const randomIndex = Math.floor(Math.random() * todaysLessonsInPool.length);
                lessonToPractice = todaysLessonsInPool[randomIndex];
                logger.debug('LearningPathService', 'schedulingPractice', {
                  dayNumber,
                  todaysLessonsInPool,
                  lessonToPractice,
                  message: 'Practicing lesson taught TODAY for immediate reinforcement'
                });
              } else {
                // No lessons taught today, rotate through older lessons
                const practiceIndex = dayNumber % uniquePracticePool.length;
                lessonToPractice = uniquePracticePool[practiceIndex];
                logger.debug('LearningPathService', 'schedulingPractice', {
                  dayNumber,
                  practiceIndex,
                  lessonToPractice,
                  message: 'Practicing older lesson (no new lessons taught today)'
                });
              }

              // Practice gets at least 15 minutes, ideally 30 minutes
              // Use available time if it exists, otherwise just allocate 30 minutes
              const practiceMinutes = remainingMinutes > 0
                ? Math.max(15, Math.min(practiceItemDuration, remainingMinutes))
                : practiceItemDuration;

              itemsScheduledToday.push({
                type: 'practice',
                lesson_key: lessonToPractice,
                estimated_minutes: practiceMinutes,
                week_number: week.weekNumber,
                is_priority: false
              });

              minutesUsed += practiceMinutes;
            }
          }

          // CRITICAL: Sort items so lessons come BEFORE practice
          // Order: practice_test → review → lesson → practice
          const typePriority = {
            'practice_test': 1,
            'review': 2,
            'lesson': 3,
            'practice': 4
          };
          itemsScheduledToday.sort((a, b) => {
            const priorityA = typePriority[a.type] || 99;
            const priorityB = typePriority[b.type] || 99;
            return priorityA - priorityB;
          });

          // Schedule all items for this day (now in correct order)
          itemsScheduledToday.forEach(item => {
            const pathItem = {
              learning_path_id: learningPathId,
              lesson_id: null,
              sequence_order: sequenceOrder++,
              week_number: item.week_number,
              day_number: dayNumber++,
              is_priority: item.is_priority || false,
              estimated_minutes: item.estimated_minutes,
              scheduled_date: formatLocalDate(currentDate),
              status: 'pending',
              item_type: item.type
            };

            if (item.type === 'lesson') {
              pathItem.lesson_key = item.lesson_key;
              // Track this lesson as completed for future practice
              if (!completedLessons.includes(item.lesson_key)) {
                completedLessons.push(item.lesson_key);
              }
            } else if (item.type === 'practice') {
              // Practice item - references a previously completed lesson
              pathItem.lesson_key = item.lesson_key;
              pathItem.is_practice = true;
            } else if (item.type === 'practice_test') {
              pathItem.practice_test_number = item.practice_test_number;
              pathItem.practice_test_section = item.practice_test_section;
            }

            // DEBUG: Log Friday/Saturday items
            if (dayName === 'friday' || dayName === 'saturday') {
              console.log(`🎯 SCHEDULED ITEM for ${dayName}:`, {
                date: formatLocalDate(currentDate),
                dayName,
                itemType: item.type,
                lessonKey: item.lesson_key,
                minutes: item.estimated_minutes,
                pathItem
              });
            }

            pathItems.push(pathItem);
          });
        } else if (dayName === 'friday' || dayName === 'saturday') {
          // DEBUG: Log when Friday/Saturday has no items scheduled
          console.log(`⚠️ NO ITEMS SCHEDULED for ${dayName}:`, {
            date: formatLocalDate(currentDate),
            dayName,
            availableMinutes,
            distributedLessons: todaysLessons.length,
            hasReviewItem: !!reviewItem,
            hasMockExamItem: !!mockExamItem,
            hasPracticeTestItem: !!practiceTestItem
          });
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
        daysInWeek++;
        totalDaysProcessed++;
      }

      // Mock exam fallback removed - only use practice tests

      // Add all lessons from this week to completedLessons for future practice scheduling
      // These lessons can now be practiced in subsequent weeks
      if (week.lessons && week.lessons.length > 0) {
        week.lessons.forEach(lesson => {
          if (!completedLessons.includes(lesson.id)) {
            completedLessons.push(lesson.id);
          }
        });
        logger.debug('LearningPathService', 'completedLessonsUpdated', {
          weekNumber: week.weekNumber,
          addedLessons: week.lessons.map(l => l.id),
          totalCompletedLessons: completedLessons.length
        });
      }

      // Check if all lessons were distributed
      const totalDistributedLessons = Object.values(dayLessonMap).reduce((sum, lessons) => sum + lessons.length, 0);
      if (totalDistributedLessons < lessonItems.length) {
        logger.warn('LearningPathService', 'weekItemsRemaining', {
          weekNumber: week.weekNumber,
          totalLessons: lessonItems.length,
          distributedLessons: totalDistributedLessons,
          unscheduled: lessonItems.length - totalDistributedLessons,
          message: `Week ${week.weekNumber} has ${lessonItems.length - totalDistributedLessons} lessons that couldn't be distributed`
        });
      }

      // If pinned items weren't scheduled, log error
      if (reviewItem) {
        logger.error('LearningPathService', 'reviewNotScheduled', {
          weekNumber: week.weekNumber,
          pinnedDay: reviewItem.pinnedDay,
          message: `Review for week ${week.weekNumber} could not be scheduled on ${reviewItem.pinnedDay}`
        });
      }
    });

    logger.info('LearningPathService', 'schedulingLoopEnded', {
      totalDaysProcessed,
      totalWeeks: curriculum.length,
      itemsScheduled: pathItems.length,
      message: `Scheduled ${pathItems.length} items across ${totalDaysProcessed} days`
    });

    // Step 3: Add final review day BEFORE exam, then add exam day
    if (examDate) {
      // Add review day (day before exam) - 2 hours of comprehensive review
      const dayBeforeExam = new Date(examDate);
      dayBeforeExam.setDate(dayBeforeExam.getDate() - 1);

      pathItems.push({
        learning_path_id: learningPathId,
        lesson_id: null,
        sequence_order: sequenceOrder++,
        week_number: curriculum.length,
        day_number: 1,
        is_priority: true,
        estimated_minutes: 120, // 2 hours for final review
        scheduled_date: formatLocalDate(dayBeforeExam),
        status: 'pending',
        item_type: 'review',
        item_metadata: {
          title: 'Final Exam Review',
          description: 'Comprehensive review of all material before your ACT exam. Focus on key concepts and test-taking strategies.'
        }
      });

      logger.info('LearningPathService', 'finalReviewAdded', {
        reviewDate: formatLocalDate(dayBeforeExam),
        examDate: formatLocalDate(examDate),
        message: `Added 2-hour final review on ${formatLocalDate(dayBeforeExam)} (day before exam)`
      });

      // Add exam day
      pathItems.push({
        learning_path_id: learningPathId,
        lesson_id: null,
        sequence_order: sequenceOrder++,
        week_number: curriculum.length,
        day_number: 2,
        is_priority: false,
        estimated_minutes: 0,
        scheduled_date: formatLocalDate(examDate),
        status: 'pending',
        item_type: 'exam_day'
      });
    }

    logger.info('LearningPathService', 'schedulingComplete', {
      itemsScheduled: pathItems.length,
      message: `Scheduled ${pathItems.length} items total`
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
