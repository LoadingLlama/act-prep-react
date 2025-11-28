const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkPosition49() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'parallel-structure')
    .single();

  const { data: question } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id)
    .eq('position', 49)
    .single();

  console.log('Position 49: Advanced Comparison Parallelism');
  console.log('Problem:', question.problem_text);
  console.log('\nChoices and explanations:');
  question.choices.forEach(c => {
    const marker = c.letter === question.correct_answer ? '✓' : ' ';
    console.log(`\n${marker} ${c.letter}. ${c.text}`);
    console.log(`   Explanation: ${c.explanation}`);
  });
}

checkPosition49();
