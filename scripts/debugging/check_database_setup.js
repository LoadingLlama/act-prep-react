const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkSetup() {
  console.log('=== CHECKING DATABASE SETUP ===\n');

  // Try to create a test session
  const testUserId = 'test-' + Date.now();

  console.log('1. Testing if diagnostic_test_sessions table exists...');
  const { data: sessionTest, error: sessionError } = await supabase
    .from('diagnostic_test_sessions')
    .insert([{
      user_id: testUserId,
      section: 'test',
      total_questions: 1
    }])
    .select();

  if (sessionError) {
    console.log('❌ Cannot create session:');
    console.log('   Error:', sessionError.message);
    console.log('   Code:', sessionError.code);
    console.log('   Hint:', sessionError.hint);
    return;
  }

  console.log('✅ Session table works\n');

  const sessionId = sessionTest[0].id;

  // Try to insert a test result WITHOUT the constraint (should fail if constraint exists)
  console.log('2. Testing if unique constraint exists...');

  const testQuestionId = '00000000-0000-0000-0000-000000000001';

  // First insert
  const { error: insert1Error } = await supabase
    .from('diagnostic_test_results')
    .insert([{
      user_id: testUserId,
      diagnostic_session_id: sessionId,
      question_id: testQuestionId,
      user_answer: 'A',
      is_correct: true
    }]);

  if (insert1Error) {
    console.log('❌ First insert failed:', insert1Error.message);
  } else {
    console.log('✅ First result inserted');
  }

  // Try to insert duplicate (should fail if constraint exists)
  const { error: insert2Error } = await supabase
    .from('diagnostic_test_results')
    .insert([{
      user_id: testUserId,
      diagnostic_session_id: sessionId,
      question_id: testQuestionId,
      user_answer: 'B',
      is_correct: false
    }]);

  if (insert2Error) {
    if (insert2Error.code === '23505') {
      console.log('✅ Unique constraint EXISTS (duplicate rejected)\n');
    } else {
      console.log('❌ Insert failed with different error:', insert2Error.message);
    }
  } else {
    console.log('❌ PROBLEM: Unique constraint MISSING (duplicate allowed)!\n');
    console.log('The COMPLETE_DIAGNOSTIC_FIX.sql was NOT run successfully.');
  }

  // Test upsert
  console.log('3. Testing upsert functionality...');
  const { data: upsertData, error: upsertError } = await supabase
    .from('diagnostic_test_results')
    .upsert([{
      user_id: testUserId,
      diagnostic_session_id: sessionId,
      question_id: testQuestionId,
      user_answer: 'C',
      is_correct: true
    }], {
      onConflict: 'diagnostic_session_id,question_id'
    })
    .select();

  if (upsertError) {
    console.log('❌ Upsert failed:', upsertError.message);
    console.log('   This is why answers are not saving!\n');
  } else {
    console.log('✅ Upsert works correctly\n');
  }

  // Clean up test data
  await supabase.from('diagnostic_test_results').delete().eq('user_id', testUserId);
  await supabase.from('diagnostic_test_sessions').delete().eq('user_id', testUserId);

  console.log('4. Checking English question lesson mapping...');
  const { data: englishQuestions } = await supabase
    .from('practice_test_english_questions')
    .select('id, question_number, lesson_id')
    .eq('test_number', 1)
    .limit(10);

  if (englishQuestions) {
    const mapped = englishQuestions.filter(q => q.lesson_id).length;
    console.log(`   Sample of 10 English questions: ${mapped}/10 have lesson_id`);

    if (mapped === 0) {
      console.log('❌ NO English questions are mapped to lessons!');
      console.log('   The COMPLETE_DIAGNOSTIC_FIX.sql was NOT run successfully.\n');
    } else if (mapped === 10) {
      console.log('✅ English questions are mapped to lessons\n');
    } else {
      console.log(`⚠️  Only ${mapped}/10 sample questions are mapped\n`);
    }
  }

  console.log('═══════════════════════════════════════════════════════');
  console.log('RECOMMENDATION:');
  console.log('═══════════════════════════════════════════════════════');
  console.log('Go to Supabase → SQL Editor');
  console.log('Run: COMPLETE_DIAGNOSTIC_FIX.sql');
  console.log('Make sure you see: "✅✅✅ ALL QUESTIONS MAPPED! ✅✅✅"');
}

checkSetup().then(() => process.exit(0));
