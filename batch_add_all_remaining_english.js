/**
 * Batch add ALL remaining English explanations for Tests 3-7
 * This script will add placeholder explanations that need to be filled in
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getAllRemainingQuestions() {
  console.log('🔍 Fetching all questions from Tests 3-7...\n');

  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .in('test_number', [3, 4, 5, 6, 7])
    .order('test_number', { ascending: true })
    .order('question_number', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`📊 Found ${data.length} questions without explanations\n`);

  // Save to JSON for reference
  fs.writeFileSync(
    'remaining_english_questions.json',
    JSON.stringify(data, null, 2)
  );
  console.log('✅ Saved to remaining_english_questions.json');

  // Show breakdown
  const byTest = {};
  data.forEach(q => {
    byTest[q.test_number] = (byTest[q.test_number] || 0) + 1;
  });

  console.log('\nBreakdown by test:');
  Object.keys(byTest).sort().forEach(testNum => {
    console.log(`  Test ${testNum}: ${byTest[testNum]} questions`);
  });
}

getAllRemainingQuestions()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
