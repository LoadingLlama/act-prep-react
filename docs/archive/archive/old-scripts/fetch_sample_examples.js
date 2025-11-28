/**
 * Script to fetch sample examples from lesson_examples table
 * to understand the current format
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('Fetching sample examples...\n');

  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${examples.length} examples`);
  console.log('\n' + '='.repeat(80) + '\n');

  examples.forEach((example, index) => {
    console.log(`Example ${index + 1}:`);
    console.log(`ID: ${example.id}`);
    console.log(`Question: ${example.question_text}`);
    console.log(`Choices: ${JSON.stringify(example.choices, null, 2)}`);
    console.log(`Correct Answer: ${example.correct_answer}`);
    console.log(`Current Explanation:\n${example.answer_explanation}`);
    console.log('\n' + '='.repeat(80) + '\n');
  });

  // Count total examples
  const { count } = await supabase
    .from('lesson_examples')
    .select('*', { count: 'exact', head: true });

  console.log(`Total examples in database: ${count}`);
}

main();
