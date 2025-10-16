const { supabase } = require('./generate-and-insert-lesson');

async function checkLessons() {
  console.log('Checking lessons in database...\n');

  const { data, error } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title')
    .in('lesson_key', ['2.2', '2.3', '2.4', '2.5'])
    .order('lesson_key');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('Lessons found in database:');
  console.log('='.repeat(60));
  data.forEach(lesson => {
    console.log(`✓ ${lesson.lesson_key}: ${lesson.title}`);
  });
  console.log('='.repeat(60));
  console.log(`Total: ${data.length} lessons\n`);

  const missing = ['2.2', '2.3', '2.4', '2.5'].filter(
    key => !data.find(l => l.lesson_key === key)
  );

  if (missing.length > 0) {
    console.log('Missing lessons:', missing.join(', '));
  }
}

checkLessons();
