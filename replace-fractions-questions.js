const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const FRACTIONS_LESSON_ID = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';

async function replaceQuestions() {
  console.log('\n========================================');
  console.log('DELETING OLD FRACTIONS QUESTIONS');
  console.log('========================================\n');

  const { error: deleteError } = await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', FRACTIONS_LESSON_ID);

  if (deleteError) {
    console.error('❌ Delete failed:', deleteError);
    return;
  }

  console.log('✅ Old questions deleted\n');
  console.log('Now run insert-fractions-50.js to add new questions');
}

replaceQuestions().catch(console.error);
