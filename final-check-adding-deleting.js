const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

async function finalCheck() {
  const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', 'adding-deleting').single();
  const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).order('position');

  console.log(`Checking all ${questions.length} remaining adding-deleting questions:\n`);

  let allGood = true;
  for (const q of questions) {
    const hasUnderline = q.problem_text.includes('<u>');
    const len = q.problem_text.length;
    const hasContext = len > 250 || hasUnderline;

    if (hasContext === false) {
      console.log(`⚠️  Position ${q.position}: May be missing context (length: ${len})`);
      console.log(`   Preview: ${q.problem_text.substring(0, 80)}...\n`);
      allGood = false;
    }
  }

  if (allGood) {
    console.log('✓ All remaining adding-deleting questions have complete context!');
  }
}

finalCheck();
