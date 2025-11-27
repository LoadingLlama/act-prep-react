const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function sampleCheck() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'parallel-structure')
    .single();

  // Check positions 1, 25, 49 (beginning, middle, end)
  const positions = [1, 25, 49];

  for (const pos of positions) {
    const { data: q } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .eq('position', pos)
      .single();

    console.log(`\n${'='.repeat(80)}`);
    console.log(`Position ${pos}: ${q.title}`);
    console.log(`${'='.repeat(80)}`);
    console.log(`Problem: ${q.problem_text}\n`);

    q.choices.forEach(c => {
      const marker = c.letter === q.correct_answer ? '✓' : ' ';
      console.log(`${marker} ${c.letter}. ${c.text}`);
      console.log(`   ${c.explanation}\n`);
    });
  }
}

sampleCheck();
