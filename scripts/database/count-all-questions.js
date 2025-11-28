const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Counting all practice questions across all lessons...\n');

  // Get all lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('subject', 'english')
    .order('title');

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`Found ${lessons.length} English lessons\n`);

  let totalQuestions = 0;
  const lessonQuestionCounts = [];

  for (const lesson of lessons) {
    const { data: examples, error } = await supabase
      .from('lesson_examples')
      .select('id, problem_text')
      .eq('lesson_id', lesson.id);

    if (!error && examples) {
      totalQuestions += examples.length;
      lessonQuestionCounts.push({
        lesson: lesson.title,
        count: examples.length
      });
      console.log(`${lesson.title}: ${examples.length} questions`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`TOTAL QUESTIONS TO REFORMAT: ${totalQuestions}`);
  console.log('='.repeat(80));
})();
