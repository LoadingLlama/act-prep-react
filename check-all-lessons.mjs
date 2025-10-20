import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get ALL lessons to see the structure
const { data, error } = await supabase
  .from('lessons')
  .select('id, lesson_key, title')
  .order('lesson_key');

if (error) {
  console.error('Error:', error);
} else {
  console.log('All lessons in database:');
  data.forEach(lesson => {
    console.log(`  ${lesson.lesson_key}: ${lesson.title}`);
  });
  console.log(`\nTotal: ${data.length} lessons`);
}
