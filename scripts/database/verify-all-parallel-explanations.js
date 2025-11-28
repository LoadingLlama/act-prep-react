const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyAllParallelExplanations() {
  console.log('Verifying ALL parallel-structure question explanations...\n');
  console.log('='.repeat(80));

  // Get parallel-structure lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'parallel-structure')
    .single();

  // Get all questions
  const { data: questions } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position');

  let genericCount = 0;
  let tooShortCount = 0;
  const problematicQuestions = [];

  for (const q of questions) {
    const choices = q.choices || [];
    let hasIssue = false;
    let issueType = '';

    for (const choice of choices) {
      const exp = choice.explanation || '';
      const expLower = exp.toLowerCase();

      // Check for generic patterns
      const isGeneric =
        expLower.includes('mixing different grammatical forms') ||
        expLower.includes('(e.g., switching from nouns to verbs') ||
        (expLower.includes('maintains parallel structure') && expLower.includes('all items in the list'));

      // Check for too-short explanations (less than 80 chars usually means template)
      const isTooShort = exp.length < 80;

      // Check for vague words without specifics
      const hasVaguePattern =
        (expLower.includes('parallel structure') && !expLower.includes('noun') && !expLower.includes('verb') && !expLower.includes('gerund') && !expLower.includes('infinitive'));

      if (isGeneric) {
        hasIssue = true;
        issueType = 'generic';
      } else if (isTooShort && choice.letter !== q.correct_answer) {
        hasIssue = true;
        issueType = 'too short';
      } else if (hasVaguePattern) {
        hasIssue = true;
        issueType = 'vague';
      }
    }

    if (hasIssue) {
      problematicQuestions.push({ position: q.position, title: q.title, issueType });
      if (issueType === 'generic') genericCount++;
      if (issueType === 'too short') tooShortCount++;

      console.log(`Position ${q.position}: ${q.title} [${issueType}]`);
      choices.forEach(c => {
        const marker = c.letter === q.correct_answer ? '✓' : ' ';
        console.log(`  ${marker} ${c.letter}. ${c.explanation}`);
      });
      console.log();
    }
  }

  console.log('='.repeat(80));
  console.log(`Total questions checked: ${questions.length}`);
  console.log(`Questions with generic patterns: ${genericCount}`);
  console.log(`Questions with too-short explanations: ${tooShortCount}`);
  console.log(`Total problematic questions: ${problematicQuestions.length}`);

  if (problematicQuestions.length === 0) {
    console.log('\n✓ All explanations are specific and detailed!');
  }
  console.log('='.repeat(80));
}

verifyAllParallelExplanations();
