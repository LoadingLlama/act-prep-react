/**
 * Get all Test 2 English questions for explanation creation
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getTest2Questions() {
  console.log('🔍 Fetching Test 2 English questions...\n');

  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 2)
    .order('question_number', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`📊 Found ${data.length} questions in Test 2\n`);

  // Save to JSON file for easier reference
  fs.writeFileSync(
    'test2_questions.json',
    JSON.stringify(data, null, 2)
  );
  console.log('✅ Saved to test2_questions.json\n');

  // Display first 3 questions as examples
  console.log('📝 First 3 questions:\n');
  data.slice(0, 3).forEach(q => {
    const choices = typeof q.choices === 'string' ? JSON.parse(q.choices) : q.choices;
    console.log(`Q${q.question_number}:`);
    console.log(`  Passage: ${q.passage ? 'Yes' : 'No'}`);
    console.log(`  Text: ${q.question_text}`);
    if (choices) {
      Object.entries(choices).forEach(([key, value]) => {
        console.log(`  ${key}) ${value}`);
      });
    }
    console.log(`  Correct: ${q.correct_answer}`);
    console.log(`  Has explanation: ${q.explanation ? 'Yes' : 'No'}`);
    console.log('');
  });
}

getTest2Questions()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
