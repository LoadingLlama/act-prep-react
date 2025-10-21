import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function checkReadingLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, topic_number, content, content_json')
    .eq('subject', 'reading')
    .order('topic_number');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n='.repeat(80));
  console.log('READING LESSONS IN DATABASE');
  console.log('='.repeat(80));
  console.log(`\nFound ${data.length} Reading lessons:\n`);

  data.forEach(lesson => {
    const hasContent = lesson.content !== null;
    const hasContentJson = lesson.content_json !== null;
    const contentLength = lesson.content?.length || 0;

    console.log(`${lesson.topic_number} - ${lesson.title}`);
    console.log(`  Lesson Key: ${lesson.lesson_key}`);
    console.log(`  Content: ${hasContent ? `${contentLength} chars` : 'NULL'}`);
    console.log(`  Content JSON: ${hasContentJson ? 'EXISTS' : 'NULL'}`);
    console.log('');
  });

  console.log('='.repeat(80));
}

checkReadingLessons();
