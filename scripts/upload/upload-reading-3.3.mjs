import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadReadingChapter3_3() {
  const lessonContent = fs.readFileSync('restructured-reading-3.3-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'practice-passages');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }

  console.log('✓ Lesson content uploaded for practice-passages');
  console.log('✓ No examples needed for this Reading lesson (strategy-focused)');
  console.log('\n✓ Chapter 3.3 upload complete!');
  console.log('\n🎉 ALL 13 READING CHAPTERS SUCCESSFULLY UPLOADED! 🎉');
}

uploadReadingChapter3_3();
