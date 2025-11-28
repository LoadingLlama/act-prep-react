const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findGenericParallelExplanations() {
  console.log('Finding parallel-structure questions with generic explanations...\n');
  console.log('='.repeat(80));

  // Get parallel-structure lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'parallel-structure')
    .single();

  if (!lesson) {
    console.log('Parallel-structure lesson not found');
    return;
  }

  // Get all questions
  const { data: questions } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position');

  console.log(`\nFound ${questions.length} parallel-structure questions\n`);

  let genericCount = 0;

  for (const q of questions) {
    const choices = q.choices || [];

    // Check if any choice has generic parallel structure explanation
    const hasGeneric = choices.some(choice => {
      const exp = (choice.explanation || '').toLowerCase();
      return exp.includes('mixing different grammatical forms') ||
             exp.includes('(e.g., switching from nouns to verbs') ||
             exp.includes('maintains parallel structure - all items in the list');
    });

    if (hasGeneric) {
      genericCount++;
      console.log(`Position ${q.position}: ${q.title}`);
      console.log(`  Problem text preview: ${q.problem_text.substring(0, 100)}...`);
      console.log(`  Choices:`);
      choices.forEach(c => {
        const marker = c.letter === q.correct_answer ? '✓' : ' ';
        console.log(`    ${marker} ${c.letter}. ${c.text.substring(0, 60)}`);
        console.log(`       ${c.explanation.substring(0, 80)}...`);
      });
      console.log();
    }
  }

  console.log('='.repeat(80));
  console.log(`Found ${genericCount} questions with generic explanations`);
  console.log('='.repeat(80));
}

findGenericParallelExplanations();
