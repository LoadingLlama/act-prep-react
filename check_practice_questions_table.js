const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkPracticeQuestionsTable() {
  console.log('Checking practice_questions table...\n');

  // Get total count
  const { count: totalCount, error: countError } = await supabase
    .from('practice_questions')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error getting count:', countError);
    return;
  }

  console.log(`Total questions in practice_questions table: ${totalCount}\n`);

  // Get a sample of questions to understand structure
  const { data: sample, error } = await supabase
    .from('practice_questions')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Sample questions structure:');
  console.log('='.repeat(100));
  sample.forEach((q, idx) => {
    console.log(`\nQuestion ${idx + 1}:`);
    console.log('  ID:', q.id);
    console.log('  Columns:', Object.keys(q).join(', '));
    if (q.question) console.log('  Question:', q.question.substring(0, 100));
    if (q.problem_text) console.log('  Problem:', q.problem_text.substring(0, 100));
    if (q.choices) console.log('  Choices type:', Array.isArray(q.choices) ? `array (${q.choices.length})` : typeof q.choices);
    if (q.explanation) console.log('  Has explanation:', q.explanation ? 'Yes' : 'No');
    if (q.answer_explanation) console.log('  Has answer_explanation:', q.answer_explanation ? 'Yes' : 'No');
  });

  console.log('\n' + '='.repeat(100));
}

checkPracticeQuestionsTable().catch(console.error);
