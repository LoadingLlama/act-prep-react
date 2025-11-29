const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function testUpdate() {
  console.log('Testing update on a single question...\n');

  const update = {
    title: "Fraction Operations in Context",
    problem_text: "A recipe calls for 2/3 cup of flour and 3/4 cup of sugar. If Emily wants to make 1.5 times the recipe, how many total cups of flour and sugar combined will she need?",
    choices: [
      { letter: "A", text: "1 5/12" },
      { letter: "B", text: "1 17/24" },
      { letter: "C", text: "2 1/8" },
      { letter: "D", text: "2 7/24" }
    ],
    correct_answer: "C",
    answer_explanation: "First, multiply each ingredient by 1.5: Flour = (2/3) × 1.5 = (2/3) × (3/2) = 1 cup. Sugar = (3/4) × 1.5 = (3/4) × (3/2) = 9/8 cups. Total = 1 + 9/8 = 8/8 + 9/8 = 17/8 = 2 1/8 cups."
  };

  // Try update and get detailed response
  const { data, error, count, status, statusText } = await supabase
    .from('lesson_examples')
    .update(update)
    .eq('id', '62527519-09c4-4201-af4d-6b425064d7f3')
    .select();

  console.log('Update Response:');
  console.log('  Status:', status, statusText);
  console.log('  Error:', error);
  console.log('  Count:', count);
  console.log('  Data returned:', data);
  console.log();

  if (data && data.length > 0) {
    console.log('Updated record:');
    console.log('  Title:', data[0].title);
    console.log('  Choices type:', Array.isArray(data[0].choices) ? 'array' : typeof data[0].choices);
    console.log('  Choices count:', Array.isArray(data[0].choices) ? data[0].choices.length : 'N/A');
  }
}

testUpdate().catch(console.error);
