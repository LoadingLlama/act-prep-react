/**
 * Check current practice test explanations
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mxnpxkosyfghfkbpqxtq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bnB4a29zeWZnaGZrYnBxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzkxMzA5OSwiZXhwIjoyMDQzNDg5MDk5fQ.vST0ILW-nA-a4fL2_1RRJkO5w0MlWJIFcPxLr4ozsKY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkExplanations() {
  console.log('📊 Checking practice test explanations...\n');

  // Check English questions
  const { data: englishQuestions, error: englishError } = await supabase
    .from('practice_english_questions')
    .select('question_number, test_number, question_text, explanation')
    .eq('test_number', 1)
    .order('question_number', { ascending: true })
    .limit(10);

  if (englishError) {
    console.error('❌ Error fetching English questions:', englishError);
    return;
  }

  console.log('📚 Sample English question explanations (Test 1, first 10):');
  englishQuestions.forEach(q => {
    console.log(`\nQ${q.question_number}:`);
    console.log(`  Question: ${q.question_text?.substring(0, 80)}...`);
    console.log(`  Explanation: ${q.explanation || 'NO EXPLANATION'}`);
  });

  // Check Math questions
  const { data: mathQuestions, error: mathError } = await supabase
    .from('practice_math_questions')
    .select('question_number, test_number, question_text, explanation')
    .eq('test_number', 1)
    .order('question_number', { ascending: true })
    .limit(5);

  if (mathError) {
    console.error('❌ Error fetching Math questions:', mathError);
    return;
  }

  console.log('\n\n📐 Sample Math question explanations (Test 1, first 5):');
  mathQuestions.forEach(q => {
    console.log(`\nQ${q.question_number}:`);
    console.log(`  Question: ${q.question_text?.substring(0, 80)}...`);
    console.log(`  Explanation: ${q.explanation || 'NO EXPLANATION'}`);
  });
}

checkExplanations().catch(console.error);
