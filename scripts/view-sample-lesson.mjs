import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function viewSampleLesson() {
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, content')
    .eq('lesson_key', 'algebra-skills')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n' + '='.repeat(70));
  console.log(`LESSON: ${data.lesson_key}`);
  console.log(`TITLE: ${data.title}`);
  console.log('='.repeat(70));
  console.log('\nFULL CONTENT:\n');
  console.log(data.content);
  console.log('\n' + '='.repeat(70));
}

viewSampleLesson();
