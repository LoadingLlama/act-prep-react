const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkSpecificQuestion() {
  const { data, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('id', '458b63bc-3505-4f22-9884-42d3d47b3944')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Question Details:');
  console.log('ID:', data.id);
  console.log('Title:', data.title);
  console.log('Problem:', data.problem_text);
  console.log('Choices type:', Array.isArray(data.choices) ? 'array' : typeof data.choices);
  console.log('Choices count:', Array.isArray(data.choices) ? data.choices.length : 'N/A');
  console.log('Choices:', JSON.stringify(data.choices, null, 2));
  console.log('Correct answer:', data.correct_answer);
}

checkSpecificQuestion().catch(console.error);
