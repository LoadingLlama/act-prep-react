import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLesson() {
  console.log('Checking for substitution lesson...\n');
  
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'substitution')
    .single();

  if (error) {
    console.log('❌ Lesson not found:', error.message);
    console.log('Need to check lessonStructure.js for correct lesson_key\n');
  } else {
    console.log('✅ Lesson found!');
    console.log('ID:', data.id);
    console.log('Key:', data.lesson_key);
    console.log('Title:', data.title);
  }
}

checkLesson();
