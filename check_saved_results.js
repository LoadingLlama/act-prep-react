/**
 * Check the 75 saved results to understand the issue
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkResults() {
  const sessionId = 'cdefcca4-ead0-4b45-83c2-4fe788a0a879';

  console.log('🔍 Checking diagnostic results for session:', sessionId);
  console.log('');

  // Get all results
  const { data: results, error } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .eq('diagnostic_session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`📝 Total results: ${results.length}`);
  console.log(`   Correct: ${results.filter(r => r.is_correct).length}`);
  console.log(`   Incorrect: ${results.filter(r => !r.is_correct).length}\n`);

  // Check question IDs
  const questionIds = results.map(r => r.question_id);
  console.log(`🔢 Question ID range: ${Math.min(...questionIds)} - ${Math.max(...questionIds)}`);
  console.log(`   Unique questions: ${new Set(questionIds).size}\n`);

  // Check which sections these questions are from
  const sections = ['english', 'math', 'reading', 'science'];
  console.log('📊 Checking which sections these questions belong to:\n');

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;

    const { data: matchedQuestions, error: qError } = await supabase
      .from(tableName)
      .select('id, question_number, lesson_id, question_type')
      .in('id', questionIds);

    if (!qError && matchedQuestions && matchedQuestions.length > 0) {
      const withLesson = matchedQuestions.filter(q => q.lesson_id).length;
      const withoutLesson = matchedQuestions.filter(q => !q.lesson_id).length;

      console.log(`${section.toUpperCase()}:`);
      console.log(`  Total: ${matchedQuestions.length}`);
      console.log(`  With lesson_id: ${withLesson}`);
      console.log(`  Without lesson_id: ${withoutLesson}`);

      if (matchedQuestions.length > 0) {
        console.log(`  Sample IDs: ${matchedQuestions.slice(0, 5).map(q => q.id).join(', ')}`);
      }
      console.log('');
    }
  }

  // Show first 10 results
  console.log('📋 First 10 results:');
  results.slice(0, 10).forEach((r, i) => {
    console.log(`${i + 1}. Q${r.question_id}: Answer=${r.user_answer}, Correct=${r.is_correct ? '✅' : '❌'}`);
  });

  console.log('\n' + '='.repeat(60));
  console.log('ANALYSIS:');
  console.log('='.repeat(60));

  if (results.every(r => !r.is_correct)) {
    console.log('❌ ALL 75 results marked as INCORRECT!');
    console.log('   This is likely a bug - user probably answered some correctly');
    console.log('   Check how isCorrect is calculated in DiagnosticTest.jsx\n');
  }

  if (results.length < 215) {
    console.log(`⚠️  Only ${results.length}/215 questions saved`);
    console.log('   140 questions are missing (likely no lesson_id mapping)');
    console.log('   Need to ensure ALL questions are saved, not just mapped ones\n');
  }
}

checkResults().catch(console.error);
