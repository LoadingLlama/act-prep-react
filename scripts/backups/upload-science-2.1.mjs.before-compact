import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadScienceChapter2_1() {
  const lessonContent = fs.readFileSync('restructured-science-2.1-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'specific-data-point');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }

  console.log('✓ Lesson content uploaded for specific-data-point');
  console.log('✓ Chapter 2.1 "Specific Data Point Questions" upload complete!');
}

uploadScienceChapter2_1();
