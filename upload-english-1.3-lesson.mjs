import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('Uploading Topic 1.3 - Punctuation lesson...\n');

// Read the HTML content
const htmlContent = fs.readFileSync('restructured-english-1.3-v1.html', 'utf-8');

// CRITICAL: Must clear content_json and set migrated_to_json = false
// Otherwise app will read old content from content_json instead of content!
const { error: lessonError } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    content_json: null,
    migrated_to_json: false
  })
  .eq('lesson_key', 'punctuation');

if (lessonError) {
  console.error('Error updating lesson:', lessonError);
  process.exit(1);
}

console.log('✓ Lesson content uploaded and content_json cleared');
console.log('✅ Topic 1.3 - Punctuation lesson upload complete!');
