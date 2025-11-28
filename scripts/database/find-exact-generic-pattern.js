const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findExactGenericPattern() {
  console.log('Finding questions with the EXACT generic template...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'parallel-structure')
    .single();

  const { data: questions } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position');

  let count = 0;

  for (const q of questions) {
    const choices = q.choices || [];

    // Check for the EXACT pattern the user showed:
    // "This breaks parallel structure by mixing different grammatical forms (e.g., switching from nouns to verbs"
    const hasExactPattern = choices.some(choice => {
      const exp = choice.explanation || '';
      return exp.includes('mixing different grammatical forms (e.g., switching from nouns to verbs');
    });

    if (hasExactPattern) {
      count++;
      console.log(`Position ${q.position}: ${q.title}`);
      console.log(`  This still has the exact generic pattern!\n`);
    }
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`Found ${count} questions with the EXACT generic template`);
  console.log(`${'='.repeat(80)}`);

  if (count === 0) {
    console.log('\n✓ All generic templates have been replaced with specific explanations!');
  }
}

findExactGenericPattern();
