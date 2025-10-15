import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

// Get all math lesson_keys
async function getAllMathLessonKeys() {
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n' + '='.repeat(60));
  console.log('ALL MATH LESSON KEYS IN DATABASE');
  console.log('='.repeat(60) + '\n');

  data.forEach((lesson, index) => {
    console.log(`${index + 1}. ${lesson.lesson_key} - "${lesson.title}"`);
  });

  console.log(`\nTotal: ${data.length} math lessons\n`);
}

// Check a specific lesson content
async function checkLessonContent(lessonKey) {
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, content')
    .eq('lesson_key', lessonKey)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`LESSON: ${data.lesson_key}`);
  console.log('='.repeat(60));
  console.log(`Title: ${data.title}`);
  console.log(`Content length: ${data.content.length} characters`);
  console.log('\nFirst 1000 characters of content:');
  console.log('-'.repeat(60));
  console.log(data.content.substring(0, 1000));
  console.log('-'.repeat(60));
}

async function main() {
  await getAllMathLessonKeys();
  console.log('\nChecking sample lesson (backsolving):\n');
  await checkLessonContent('backsolving');
}

main();
