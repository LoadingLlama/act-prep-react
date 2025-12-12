/**
 * Get all English questions missing explanations
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getMissingExplanations() {
  console.log('🔍 Fetching English questions without explanations...\n');

  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('id, question_number, test_number, question_text, choices, correct_answer, explanation')
    .order('test_number', { ascending: true })
    .order('question_number', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  const missing = data.filter(q => !q.explanation || q.explanation.trim() === '');

  console.log(`📊 Total English questions: ${data.length}`);
  console.log(`❌ Missing explanations: ${missing.length}`);
  console.log(`✅ Have explanations: ${data.length - missing.length}\n`);

  // Group by test
  const byTest = {};
  missing.forEach(q => {
    if (!byTest[q.test_number]) byTest[q.test_number] = [];
    byTest[q.test_number].push(q);
  });

  console.log('📋 Breakdown by test:');
  Object.keys(byTest).sort((a, b) => a - b).forEach(testNum => {
    console.log(`  Test ${testNum}: ${byTest[testNum].length} questions need explanations`);
  });

  // Show first 5 questions from Test 1 as examples
  console.log('\n📝 First 5 questions from Test 1 needing explanations:\n');
  const test1 = missing.filter(q => q.test_number === 1).slice(0, 5);
  test1.forEach(q => {
    const choices = typeof q.choices === 'string' ? JSON.parse(q.choices) : q.choices;
    console.log(`Q${q.question_number}:`);
    console.log(`  Text: ${q.question_text?.substring(0, 100)}...`);
    if (choices) {
      console.log(`  A) ${choices.A || 'N/A'}`);
      console.log(`  B) ${choices.B || 'N/A'}`);
      console.log(`  C) ${choices.C || 'N/A'}`);
      console.log(`  D) ${choices.D || 'N/A'}`);
    }
    console.log(`  Correct: ${q.correct_answer}`);
    console.log(`  ID: ${q.id}\n`);
  });
}

getMissingExplanations()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
