const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkActualState() {
  // Get a fresh sample of questions
  const { data, error } = await supabase
    .from('lesson_examples')
    .select('title, problem_text, choices, correct_answer, answer_explanation')
    .in('title', [
      'Fraction Operations in Context',
      'Exponent Rules Application',
      'Prime Factorization Application',
      'Fixing Comma Splices',
      'Identifying Context'
    ]);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('='.repeat(90));
  console.log('VERIFICATION - CHECKING ACTUAL DATABASE STATE');
  console.log('='.repeat(90));

  data.forEach(q => {
    console.log(`\n${q.title}`);
    console.log(`  Problem: ${q.problem_text.substring(0, 80)}...`);
    console.log(`  Choices type: ${Array.isArray(q.choices) ? 'array' : typeof q.choices}`);
    console.log(`  Choices count: ${Array.isArray(q.choices) ? q.choices.length : 'N/A'}`);
    console.log(`  Correct answer: ${q.correct_answer}`);
    console.log(`  Has explanation: ${q.answer_explanation ? 'Yes (' + q.answer_explanation.length + ' chars)' : 'No'}`);

    if (Array.isArray(q.choices)) {
      q.choices.forEach(c => {
        console.log(`    ${c.letter}: ${c.text}`);
      });
    }
  });

  console.log('\n' + '='.repeat(90));
  const allValid = data.every(q => Array.isArray(q.choices) && q.choices.length === 4);
  const allHaveExpl = data.every(q => q.answer_explanation && q.answer_explanation.length > 30);

  console.log(allValid ? '✅ ALL SAMPLED QUESTIONS HAVE VALID CHOICES' : '⚠️  SOME QUESTIONS STILL HAVE ISSUES');
  console.log(allHaveExpl ? '✅ ALL SAMPLED QUESTIONS HAVE EXPLANATIONS' : '⚠️  SOME QUESTIONS MISSING EXPLANATIONS');
  console.log('='.repeat(90));
}

checkActualState().catch(console.error);
