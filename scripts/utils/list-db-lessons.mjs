import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4ODYyODksImV4cCI6MjA1MjQ2MjI4OX0.mHtorganismCQ7Dq0KKxJ5nY9v-vZLPxqHqCqX5wZ4Jk8';
const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase
  .from('lesson_metadata')
  .select('lesson_key, title')
  .order('lesson_key');

if (error) {
  console.error('Error:', error);
} else {
  console.log(`Found ${data.length} lessons in database:\n`);
  data.forEach(lesson => {
    console.log(`  ${lesson.lesson_key}: ${lesson.title}`);
  });
}
