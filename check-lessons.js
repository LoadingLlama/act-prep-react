const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  // Get all math lessons
  const { data: mathLessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`Found ${mathLessons.length} math lessons\n`);

  const lessonsWithoutQuestions = [];
  const lessonsWithQuestions = [];

  for (const lesson of mathLessons) {
    const { count, error } = await supabase
      .from('practice_questions')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lesson.id);

    if (error) {
      console.log(`${lesson.lesson_key} (${lesson.title}) - ERROR: ${error.message}`);
    } else {
      if (count === 0) {
        lessonsWithoutQuestions.push(lesson);
        console.log(`${lesson.lesson_key} (${lesson.title}) - NO QUESTIONS`);
      } else {
        lessonsWithQuestions.push(lesson);
        console.log(`${lesson.lesson_key} (${lesson.title}) - ${count} questions`);
      }
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Lessons with questions: ${lessonsWithQuestions.length}`);
  console.log(`Lessons without questions: ${lessonsWithoutQuestions.length}`);

  if (lessonsWithoutQuestions.length > 0) {
    console.log('\n=== Lessons needing 30 questions each: ===');
    lessonsWithoutQuestions.forEach(l => console.log(`  - ${l.lesson_key}: ${l.title}`));
  }
})();
