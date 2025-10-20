import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadLesson() {
  console.log('Reading restructured Math 2.2 lesson...');
  const newContent = fs.readFileSync('restructured-math-2.2-v1.html', 'utf8');
  console.log('New content length:', newContent.length, 'characters\n');

  console.log('Updating lesson in database...');
  const { data, error } = await supabase
    .from('lessons')
    .update({
      content: newContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', '2.2')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('✅ Lesson updated successfully!');
    console.log('Lesson ID:', data[0].id);
    console.log('Lesson Key:', data[0].lesson_key);
    console.log('Title:', data[0].title);
    console.log('Updated At:', data[0].updated_at);
  } else {
    console.log('⚠️  No rows updated. Check if lesson_key "2.2" exists.');
  }
}

uploadLesson();
