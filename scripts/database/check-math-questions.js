const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// All math lessons
const mathLessons = [
  'introduction-to-act-math',
  'backsolving',
  'substitution',
  'geometry-angles',
  '2.2',
  '2.3',
  '2.4',
  '2.5',
  '3.1',
  '3.2',
  '3.3',
  '3.4',
  '3.5',
  '3.6',
  'systems-equations',
  'quadratics',
  'functions',
  'transforming-functions',
  'exponential-growth',
  'sequences',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '6.1',
  '6.2',
  '6.3'
];

(async () => {
  const lessonsWithoutQuestions = [];
  const lessonsWithQuestions = [];

  for (const lessonId of mathLessons) {
    const { count, error } = await supabase
      .from('practice_questions')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lessonId);

    if (error) {
      console.log(`${lessonId} - ERROR: ${error.message}`);
    } else {
      if (count === 0) {
        lessonsWithoutQuestions.push(lessonId);
        console.log(`${lessonId} - NO QUESTIONS`);
      } else {
        lessonsWithQuestions.push(lessonId);
        console.log(`${lessonId} - ${count} questions`);
      }
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Lessons with questions: ${lessonsWithQuestions.length}`);
  console.log(`Lessons without questions: ${lessonsWithoutQuestions.length}`);
  console.log('\nLessons needing questions:');
  lessonsWithoutQuestions.forEach(l => console.log(`  - ${l}`));
})();
