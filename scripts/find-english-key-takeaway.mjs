import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function findEnglishKeyTakeaway() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, subject, content')
    .eq('subject', 'english');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`\nSearching ${lessons.length} English lessons for the key takeaway...\n`);

  const searchText = 'Master the fundamental building blocks of sentences';

  for (const lesson of lessons) {
    if (lesson.content.includes(searchText)) {
      console.log('✅ FOUND IT!');
      console.log(`Lesson: ${lesson.lesson_key}`);
      console.log(`Title: ${lesson.title}`);
      console.log(`Subject: ${lesson.subject}`);
      console.log('\nThis English lesson content is somehow appearing in the Math lesson.');
      console.log('This is a React component rendering bug.');
      return;
    }
  }

  console.log('❌ Key takeaway not found in any English lesson.');
}

findEnglishKeyTakeaway();
