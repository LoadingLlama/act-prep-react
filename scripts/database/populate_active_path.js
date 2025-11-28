/**
 * Populate the ACTIVE learning path with lessons AND practice tests across 12 weeks
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

const ACTIVE_PATH_ID = 'b1d15fd6-f6cc-4fda-9348-39984f8b6113';

async function populate() {
  console.log('🔄 Populating active learning path with lessons AND practice tests...\n');

  // Step 1: Get learning path info to find user and exam date
  console.log('1️⃣ Getting learning path info...');
  const { data: pathInfo, error: pathError } = await supabase
    .from('user_learning_paths')
    .select('user_id, exam_date')
    .eq('id', ACTIVE_PATH_ID)
    .single();

  if (pathError) {
    console.error('❌ Error fetching path:', pathError.message);
    return;
  }
  console.log(`   User: ${pathInfo.user_id}`);
  console.log(`   Exam Date: ${pathInfo.exam_date}\n`);

  // Step 2: Get user's study schedule and preferences from goals
  const { data: userGoals } = await supabase
    .from('user_goals')
    .select('study_days_per_week, study_hours_per_week, learning_pace, focus_sections, weak_areas, study_experience')
    .eq('user_id', pathInfo.user_id)
    .maybeSingle();

  // Generate study days based on days per week (Mon-Sat, avoiding Sunday)
  const daysPerWeek = userGoals?.study_days_per_week || 5;
  const studyDays = daysPerWeek === 7
    ? [0, 1, 2, 3, 4, 5, 6] // All days
    : daysPerWeek === 6
    ? [1, 2, 3, 4, 5, 6] // Mon-Sat
    : daysPerWeek === 5
    ? [1, 3, 4, 5, 6] // Mon, Wed, Thu, Fri, Sat
    : daysPerWeek === 4
    ? [1, 3, 5, 6] // Mon, Wed, Fri, Sat
    : [1, 3, 5]; // Mon, Wed, Fri (3 days)

  const hoursPerWeek = userGoals?.study_hours_per_week || 6;
  const learningPace = userGoals?.learning_pace || 'moderate';
  const focusSections = userGoals?.focus_sections || [];
  const weakAreas = userGoals?.weak_areas || [];
  const studyExperience = userGoals?.study_experience || 'never';

  console.log(`   Study Days: ${studyDays.map(d => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]).join(', ')}`);
  console.log(`   Hours Per Week: ${hoursPerWeek} hours`);
  console.log(`   Learning Pace: ${learningPace}`);
  console.log(`   Focus Sections: ${focusSections.join(', ') || 'all'}`);
  console.log(`   Weak Areas: ${weakAreas.join(', ') || 'none'}`);
  console.log(`   Experience: ${studyExperience}\n`);

  // Step 3: Clear existing items
  console.log('2️⃣ Clearing existing items...');
  const { error: deleteError } = await supabase
    .from('learning_path_items')
    .delete()
    .eq('learning_path_id', ACTIVE_PATH_ID);

  if (deleteError) {
    console.error('❌ Error deleting items:', deleteError.message);
    return;
  }
  console.log('✅ Cleared existing items\n');

  // Step 4: Get lessons organized by section
  console.log('3️⃣ Fetching lessons by section...');

  // Fetch all lessons first
  const { data: allLessons, error: allError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .order('lesson_key');

  if (allError) {
    console.error('❌ Error fetching lessons:', allError.message);
    return;
  }

  // Helper to check if lesson is foundational
  const isFoundational = (lesson) => {
    const key = lesson.lesson_key.toLowerCase();
    const title = lesson.title?.toLowerCase() || '';

    return key.includes('fundamental') || key.includes('basics') || key.includes('overview') ||
           key.includes('introduction') || key.includes('intro') ||
           title.includes('fundamental') || title.includes('basics') || title.includes('overview') ||
           title.includes('introduction');
  };

  // Helper to get priority order (lower = higher priority)
  const getLessonPriority = (lesson) => {
    const key = lesson.lesson_key.toLowerCase();
    const title = lesson.title?.toLowerCase() || '';

    // ACT Test Basics should ALWAYS be first
    if (key === 'getting-started' || title.includes('act test basics')) return 0;

    // Section fundamentals should be next
    if (key === 'english-intro' || (title.includes('english') && title.includes('fundamental'))) return 1;
    if (key === 'introduction-to-act-math' || (title.includes('math') && title.includes('overview'))) return 2;
    if (key === 'reading-intro' || (title.includes('reading') && title.includes('fundamental'))) return 3;
    if (key === 'science-introduction' || (title.includes('science') && title.includes('basics'))) return 4;

    // Other introductory lessons
    if (isFoundational(lesson)) return 5;

    // Regular lessons
    return 10;
  };

  // Categorize lessons by key patterns
  const lessonsBySection = {
    english: [],
    math: [],
    reading: [],
    science: [],
    general: [] // For ACT basics and overview
  };

  // English lessons have keys like: commas, verbs, pronouns, sentence-structure, etc.
  // Math lessons have keys like: 2.2, 3.1, backsolving, etc.
  // Reading lessons have keys like: core-principles, reading-intro, etc.
  // Science lessons have keys like: science-introduction, passage-approach, etc.

  allLessons.forEach(lesson => {
    const key = lesson.lesson_key.toLowerCase();

    // Check for general ACT overview lessons
    if (key === 'getting-started' || key.includes('act-overview')) {
      lessonsBySection.general.push(lesson);
    }
    // Categorize by pattern
    else if (key.includes('english') || key.includes('comma') || key.includes('verb') ||
        key.includes('pronoun') || key.includes('sentence') || key.includes('punctuation') ||
        key.includes('modifier') || key.includes('parallel') || key.includes('redundancy') ||
        key.includes('word-choice') || key.includes('transition') || key.includes('grammar') ||
        key.includes('adding-deleting') || key.includes('logical-placement')) {
      lessonsBySection.english.push(lesson);
    } else if (key.match(/^\d+\.\d+$/) || key.includes('math') || key.includes('backsolving') ||
               key.includes('substitution') || key.includes('geometry') || key.includes('algebra') ||
               key.includes('quadratic') || key.includes('function') || key.includes('exponential') ||
               key.includes('trigonometry') || key.includes('matrix') || key.includes('vector')) {
      lessonsBySection.math.push(lesson);
    } else if (key.includes('reading') || key.includes('passage') || key.includes('core-principle') ||
               key.includes('correct-vs-incorrect') || key.includes('word-in-context') ||
               key.includes('comparing-passage') || key.includes('working-backward') ||
               key.includes('maximizing-score') || key.includes('practice-passage')) {
      lessonsBySection.reading.push(lesson);
    } else if (key.includes('science') || key.includes('conflicting') || key.includes('experimental') ||
               key.includes('water-knowledge') || key.includes('outside-knowledge') ||
               key.includes('specific-data') || key.includes('trend') || key.includes('figure') ||
               key.includes('scatter') || key.includes('approximation') || key.includes('cannot-be-determined') ||
               key.includes('equation-as-answer') || key.includes('breaking-down') ||
               key.includes('answer-choice')) {
      lessonsBySection.science.push(lesson);
    }
  });

  // Sort each section by priority (fundamentals first)
  Object.keys(lessonsBySection).forEach(section => {
    lessonsBySection[section].sort((a, b) => {
      const priorityA = getLessonPriority(a);
      const priorityB = getLessonPriority(b);
      return priorityA - priorityB;
    });
  });

  // Log counts
  console.log(`   General: ${lessonsBySection.general.length} lessons`);
  console.log(`   English: ${lessonsBySection.english.length} lessons`);
  console.log(`   Math: ${lessonsBySection.math.length} lessons`);
  console.log(`   Reading: ${lessonsBySection.reading.length} lessons`);
  console.log(`   Science: ${lessonsBySection.science.length} lessons`);
  console.log('');

  // Step 4: Define weekly structure
  // Math EVERY week + rotating second subject
  console.log('4️⃣ Creating structured learning path...');

  const weeklyStructure = [
    { week: 1, subjects: ['english', 'math'], title: 'English & Math' },
    { week: 2, subjects: ['english', 'math'], title: 'English & Math', test: { section: 'english', number: 1 } },
    { week: 3, subjects: ['english', 'math'], title: 'English & Math' },
    { week: 4, subjects: ['english', 'math'], title: 'English & Math', test: { section: 'math', number: 1 } },
    { week: 5, subjects: ['reading', 'math'], title: 'Reading & Math' },
    { week: 6, subjects: ['science', 'math'], title: 'Science & Math', test: { section: 'reading', number: 1 } },
    { week: 7, subjects: ['english', 'math'], title: 'English & Math' },
    { week: 8, subjects: ['english', 'math'], title: 'English & Math', test: { section: 'science', number: 1 } },
    { week: 9, subjects: ['reading', 'math'], title: 'Reading & Math' },
    { week: 10, subjects: ['science', 'math'], title: 'Science & Math', test: { section: 'full', number: 2 } },
    { week: 11, subjects: ['english', 'math'], title: 'English & Math' },
    { week: 12, subjects: ['english', 'math'], title: 'English & Math', test: { section: 'full', number: 3 } }
  ];

  const items = [];
  const lessonIndexes = { general: 0, english: 0, math: 0, reading: 0, science: 0 };
  let isFirstLesson = true; // Track if this is the very first lesson

  // Helper to get next study day
  const getNextStudyDate = (currentDate, studyDays, daysToSkip = 0) => {
    const date = new Date(currentDate);
    let skippedCount = 0;

    while (true) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();

      if (studyDays.includes(dayOfWeek)) {
        if (skippedCount >= daysToSkip) {
          return date;
        }
        skippedCount++;
      }
    }
  };

  let currentDate = new Date(); // Start from today
  currentDate.setHours(0, 0, 0, 0);

  // Calculate base lessons per week based on hours and pace
  const paceMultiplier = learningPace === 'fast' ? 1.3 : learningPace === 'slow' ? 0.7 : 1.0;
  const baseLessonsPerWeek = Math.round((hoursPerWeek / 1.5) * paceMultiplier); // ~1.5 hours per lesson

  // Build each week
  for (const weekPlan of weeklyStructure) {
    const { week, subjects, test } = weekPlan;
    const weekStartDate = new Date(currentDate);

    // Calculate how many lesson days this week (reserve 1 day for test if exists, 1 for review)
    const hasTest = !!test;
    const lessonDays = hasTest ? studyDays.length - 2 : studyDays.length - 1; // Reserve 1 day for review, 1 for test if applicable
    const lessonsThisWeek = Math.min(lessonDays, baseLessonsPerWeek, 8); // Max based on available days and study plan

    // Distribute lessons between the two subjects
    const lessonsPerSubject = Math.floor(lessonsThisWeek / 2);
    const extraLesson = lessonsThisWeek % 2; // Give extra lesson to first subject

    let itemsThisWeek = 0;

    // Add lessons from each subject
    for (let subjectIdx = 0; subjectIdx < subjects.length; subjectIdx++) {
      const subject = subjects[subjectIdx];
      const subjectLessons = lessonsBySection[subject] || [];
      const numLessons = lessonsPerSubject + (subjectIdx === 0 ? extraLesson : 0);

      for (let i = 0; i < numLessons; i++) {
        let lesson = null;

        // VERY FIRST LESSON: Always use ACT Test Basics & Overview
        if (isFirstLesson && lessonsBySection.general.length > 0) {
          lesson = lessonsBySection.general[0];
          isFirstLesson = false;
          console.log(`   ✨ Starting with: ${lesson.title}`);
        } else {
          const lessonIdx = lessonIndexes[subject];
          if (lessonIdx >= subjectLessons.length) {
            // Wrap around if we run out of lessons
            lessonIndexes[subject] = 0;
          }

          lesson = subjectLessons[lessonIndexes[subject]];
          if (!lesson) continue;

          lessonIndexes[subject]++;
        }

        // Schedule on next study day
        currentDate = getNextStudyDate(currentDate, studyDays, 0);

        const sequenceOrder = items.length + 1;

        items.push({
          learning_path_id: ACTIVE_PATH_ID,
          lesson_id: lesson.id,
          item_type: 'lesson',
          item_metadata: { week_subjects: subjects },
          sequence_order: sequenceOrder,
          week_number: week,
          day_number: itemsThisWeek + 1,
          is_priority: sequenceOrder <= 20,
          estimated_minutes: 30,
          scheduled_date: currentDate.toISOString().split('T')[0],
          status: 'pending'
        });

        itemsThisWeek++;
      }
    }

    // Add review day
    currentDate = getNextStudyDate(currentDate, studyDays, 0);
    items.push({
      learning_path_id: ACTIVE_PATH_ID,
      lesson_id: null,
      item_type: 'review',
      item_metadata: {
        title: `Week ${week} Review`,
        week_subjects: subjects,
        description: 'Review and practice problems from this week'
      },
      sequence_order: items.length + 1,
      week_number: week,
      day_number: itemsThisWeek + 1,
      is_priority: false,
      estimated_minutes: 45,
      scheduled_date: currentDate.toISOString().split('T')[0],
      status: 'pending'
    });
    itemsThisWeek++;

    // Add practice test if scheduled
    if (test) {
      currentDate = getNextStudyDate(currentDate, studyDays, 0);
      const sequenceOrder = items.length + 1;

      const testTitle = test.section === 'full'
        ? `Practice Test ${test.number} - Full Test`
        : `Practice Test ${test.number} - ${test.section.charAt(0).toUpperCase() + test.section.slice(1)}`;

      items.push({
        learning_path_id: ACTIVE_PATH_ID,
        lesson_id: null,
        item_type: 'test',
        item_metadata: {
          test_number: test.number,
          section: test.section,
          title: testTitle,
          week_subjects: subjects
        },
        sequence_order: sequenceOrder,
        week_number: week,
        day_number: itemsThisWeek + 1,
        is_priority: false,
        estimated_minutes: test.section === 'full' ? 180 : 45,
        scheduled_date: currentDate.toISOString().split('T')[0],
        status: 'pending'
      });
      itemsThisWeek++;
    }

    // Move to start of next week (find the next occurrence of the first study day)
    currentDate = getNextStudyDate(currentDate, studyDays, 0);
  }

  // Add final mock exam on the specified exam date
  if (pathInfo.exam_date) {
    items.push({
      learning_path_id: ACTIVE_PATH_ID,
      lesson_id: null,
      item_type: 'mock_exam',
      item_metadata: {
        title: 'Full ACT Mock Exam',
        description: 'Final full-length timed mock exam before your test day',
        is_final: true
      },
      sequence_order: items.length + 1,
      week_number: 13,
      day_number: 1,
      is_priority: true,
      estimated_minutes: 180,
      scheduled_date: pathInfo.exam_date,
      status: 'pending'
    });
  }

  const { data: insertedItems, error: insertError } = await supabase
    .from('learning_path_items')
    .insert(items)
    .select();

  if (insertError) {
    console.error('❌ Error inserting items:', insertError.message);
    console.error('   Details:', insertError);
    return;
  }

  console.log(`✅ Inserted ${insertedItems.length} items (${items.filter(i => i.item_type === 'lesson').length} lessons + ${items.filter(i => i.item_type === 'test').length} tests)\n`);

  // Step 4: Verify and show summary
  console.log('4️⃣ Verification:');

  const { data: verifyItems } = await supabase
    .from('learning_path_items')
    .select('week_number')
    .eq('learning_path_id', ACTIVE_PATH_ID);

  const weekCounts = {};
  verifyItems.forEach(item => {
    const week = item.week_number;
    weekCounts[week] = (weekCounts[week] || 0) + 1;
  });

  console.log('\n📊 Distribution by week:');
  Object.entries(weekCounts)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .forEach(([week, count]) => {
      console.log(`   Week ${week}: ${count} lessons`);
    });

  console.log(`\n✅ Total items: ${verifyItems.length}`);
  console.log(`✅ Total weeks: ${Object.keys(weekCounts).length}`);
  console.log('\n🎉 Active learning path populated successfully!');
  console.log('   Refresh your browser to see all 12 weeks!');
}

populate().catch(console.error);
