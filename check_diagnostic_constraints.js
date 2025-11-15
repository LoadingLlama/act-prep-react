const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkConstraints() {
  console.log('=== TESTING DIAGNOSTIC DATA SAVE ===\n');

  // Get the current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error('❌ Not authenticated:', authError);
    console.log('\nYou need to be logged in. Please log in to the app first.');
    return;
  }

  console.log('✅ Authenticated as:', user.id);
  console.log('   Email:', user.email);

  // Try to create a test session
  console.log('\n=== Testing Session Creation ===\n');

  const { data: sessionData, error: sessionError } = await supabase
    .from('diagnostic_test_sessions')
    .insert([{
      user_id: user.id,
      section: 'test',
      total_questions: 1
    }])
    .select();

  if (sessionError) {
    console.error('❌ Session creation failed:', {
      message: sessionError.message,
      details: sessionError.details,
      hint: sessionError.hint,
      code: sessionError.code
    });
  } else {
    console.log('✅ Session created successfully:', sessionData[0].id);

    // Try to save a test result
    console.log('\n=== Testing Result Save ===\n');

    const { data: resultData, error: resultError } = await supabase
      .from('diagnostic_test_results')
      .upsert([{
        user_id: user.id,
        diagnostic_session_id: sessionData[0].id,
        question_id: '00000000-0000-0000-0000-000000000001', // Fake UUID
        user_answer: 'A',
        is_correct: true,
        time_spent_seconds: 10
      }], {
        onConflict: 'diagnostic_session_id,question_id'
      })
      .select();

    if (resultError) {
      console.error('❌ Result save failed:', {
        message: resultError.message,
        details: resultError.details,
        hint: resultError.hint,
        code: resultError.code
      });

      // Try without upsert
      console.log('\n=== Trying with INSERT instead of UPSERT ===\n');

      const { data: insertData, error: insertError } = await supabase
        .from('diagnostic_test_results')
        .insert([{
          user_id: user.id,
          diagnostic_session_id: sessionData[0].id,
          question_id: '00000000-0000-0000-0000-000000000002', // Different UUID
          user_answer: 'B',
          is_correct: false,
          time_spent_seconds: 15
        }])
        .select();

      if (insertError) {
        console.error('❌ INSERT also failed:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
      } else {
        console.log('✅ INSERT worked! Result saved:', insertData[0].id);
        console.log('\n⚠️  ISSUE: UPSERT fails but INSERT works');
        console.log('   This means the onConflict constraint does not exist');
      }
    } else {
      console.log('✅ Result saved with UPSERT:', resultData[0].id);
    }

    // Clean up test data
    console.log('\n=== Cleaning up test data ===\n');
    await supabase.from('diagnostic_test_results').delete().eq('diagnostic_session_id', sessionData[0].id);
    await supabase.from('diagnostic_test_sessions').delete().eq('id', sessionData[0].id);
    console.log('✅ Test data cleaned up');
  }
}

checkConstraints().then(() => process.exit(0));
