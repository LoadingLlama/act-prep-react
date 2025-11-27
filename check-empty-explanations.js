const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkEmptyExplanations() {
  console.log('Investigating questions with empty choice explanations...\n');

  // Get a sample of questions with empty choice explanations
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'adding-deleting')
    .single();

  const { data: questions } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position');

  // Find questions with empty choice explanations
  const questionsWithEmpty = questions.filter(q => {
    return q.choices && q.choices.some(c => !c.explanation || c.explanation.trim() === '');
  });

  console.log(`Total questions in adding-deleting: ${questions.length}`);
  console.log(`Questions with empty choice explanations: ${questionsWithEmpty.length}\n`);

  // Sample a few
  console.log('Sample questions with empty choice explanations:\n');
  for (let i = 0; i < Math.min(3, questionsWithEmpty.length); i++) {
    const q = questionsWithEmpty[i];
    console.log('='.repeat(80));
    console.log(`Position: ${q.position}`);
    console.log(`Title: ${q.title}`);
    console.log(`Problem text: ${q.problem_text ? q.problem_text.substring(0, 200) : 'null'}...`);
    console.log(`\nMain explanation present: ${q.answer_explanation ? 'YES' : 'NO'}`);
    if (q.answer_explanation) {
      console.log(`Main explanation preview: ${q.answer_explanation.substring(0, 150)}...`);
    }
    console.log(`\nChoices:`);
    q.choices.forEach(c => {
      const hasExp = c.explanation && c.explanation.trim() !== '';
      console.log(`  ${c.letter}: ${c.text.substring(0, 50)}... - Explanation: ${hasExp ? 'YES' : 'EMPTY'}`);
    });
    console.log();
  }

  // Check if these are all later questions (positions > 4)
  const positions = questionsWithEmpty.map(q => q.position);
  const minPos = Math.min(...positions);
  const maxPos = Math.max(...positions);
  console.log('='.repeat(80));
  console.log(`Position range of questions with empty explanations: ${minPos} to ${maxPos}`);
  console.log(`\nPattern: Questions 1-4 have explanations, questions 5-50 have empty choice explanations`);
}

checkEmptyExplanations();
