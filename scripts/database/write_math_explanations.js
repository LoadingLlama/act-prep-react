const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// Generate a simple math explanation
function generateMathExplanation(question) {
  const { question_text, choices, correct_answer } = question;

  // For now, create a generic but structured template
  // This will be improved with specific calculations
  const correctChoice = choices.find(c => c.startsWith(correct_answer + '.'));
  const wrongChoices = choices.filter(c => !c.startsWith(correct_answer + '.'));

  const mainExplanation = `Solve step-by-step to find the answer is ${correct_answer}.`;

  const wrongAnswers = wrongChoices.map(choice => {
    const letter = choice.charAt(0);
    return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> Incorrect calculation or approach.</div>`;
  }).join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${mainExplanation}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongAnswers}
</div>
</div>`;
}

async function writeMathExplanations() {
  console.log('🔢 Writing Math explanations...\n');

  const { data: questions } = await supabase
    .from('practice_test_math_questions')
    .select('id, question_text, choices, correct_answer, explanation')
    .order('id');

  console.log(`Found ${questions.length} math questions\n`);

  let updated = 0;

  for (const q of questions) {
    // Only update if no explanation exists or it's generic
    if (!q.explanation || q.explanation.length < 200 ||
        q.explanation.includes('provides the most grammatically sound')) {

      const newExplanation = generateMathExplanation(q);

      await supabase
        .from('practice_test_math_questions')
        .update({ explanation: newExplanation })
        .eq('id', q.id);

      updated++;

      if (updated % 15 === 0) {
        console.log(`✅ Updated ${updated}/${questions.length}`);
      }
    }
  }

  console.log(`\n✅ Created ${updated} math explanations!`);
  console.log('\n📝 Note: These are templates. They will be improved with specific calculations.');
}

writeMathExplanations().catch(console.error);
