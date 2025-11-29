const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function inspectQuestion() {
  const { data, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('id', '62527519-09c4-4201-af4d-6b425064d7f3')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Full Question Data:');
  console.log('='.repeat(90));
  console.log('ID:', data.id);
  console.log('Title:', data.title);
  console.log('Problem Text:', data.problem_text);
  console.log('\nChoices:');
  console.log('  Type:', typeof data.choices);
  console.log('  Is Array:', Array.isArray(data.choices));
  console.log('  Raw value:', JSON.stringify(data.choices, null, 2));
  console.log('\nCorrect Answer:', data.correct_answer);
  console.log('Explanation:', data.answer_explanation);
}

inspectQuestion().catch(console.error);
