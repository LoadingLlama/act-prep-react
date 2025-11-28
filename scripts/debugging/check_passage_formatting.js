/**
 * Check if passages have proper line break formatting
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPassages() {
  console.log('🔍 CHECKING PASSAGE FORMATTING\n');

  // Check Test 2 English passage 2 (the one showing in screenshot)
  const { data, error } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .eq('test_number', 2)
    .eq('passage_number', 2)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Test 2, English Passage 2:');
  console.log('Title:', data.passage_title);
  console.log('\nPassage text length:', data.passage_text.length);
  console.log('Contains \\n\\n:', data.passage_text.includes('\n\n'));
  console.log('Contains \\n:', data.passage_text.includes('\n'));
  console.log('Number of \\n\\n:', (data.passage_text.match(/\n\n/g) || []).length);
  console.log('Number of \\n:', (data.passage_text.match(/\n/g) || []).length);

  console.log('\nFirst 500 chars:');
  console.log(JSON.stringify(data.passage_text.substring(0, 500)));

  console.log('\n\nFull text (showing actual line breaks):');
  console.log('---START---');
  console.log(data.passage_text);
  console.log('---END---');
}

checkPassages().catch(console.error);
