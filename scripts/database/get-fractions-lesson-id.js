const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function getFractionsLessonId() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\nMath Lessons:\n');
  console.log('First lesson structure:', data[0]);
  console.log('\n');
  data.forEach((lesson, idx) => {
    console.log(`${idx + 1}. ${lesson.title}`);
    console.log(`   ID: ${lesson.id}\n`);
  });
}

getFractionsLessonId().catch(console.error);
