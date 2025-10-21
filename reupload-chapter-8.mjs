import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function reuploadChapter8() {
  // Read the HTML file
  const lessonContent = fs.readFileSync('restructured-english-1.8-v1.html', 'utf8');

  console.log('Content length:', lessonContent.length);
  console.log('First 200 chars:', lessonContent.substring(0, 200));

  // Update the lesson
  const { error } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'misc-topics');

  if (error) {
    console.error('Error updating:', error);
    process.exit(1);
  }

  console.log('\n✓ Chapter 8 content re-uploaded successfully!');

  // Verify the update
  const { data: verify, error: verifyError } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'misc-topics')
    .single();

  if (verifyError) {
    console.error('Error verifying:', verifyError);
    process.exit(1);
  }

  const hasAffectVsEffect = verify.content.includes('Commonly Confused Words');
  const hasThanVsThen = verify.content.includes('Than vs. Then');
  console.log('\nVerification:');
  console.log('  - Has "Commonly Confused Words":', hasAffectVsEffect ? '✓' : '✗');
  console.log('  - Has "Than vs. Then":', hasThanVsThen ? '✓' : '✗');
}

reuploadChapter8();
