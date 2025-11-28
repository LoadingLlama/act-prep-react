require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testSaveScienceQuestion() {
  console.log('\n🧪 Testing Science Question Save\n');

  // Get a test user
  const { data: { users } } = await supabase.auth.admin.listUsers();
  const userId = users[0]?.id;

  if (!userId) {
    console.error('❌ No users found');
    return;
  }

  console.log('✅ Using user ID:', userId);

  // Create a test session
  const sessionId = 'test-session-' + Date.now();
  console.log('✅ Using session ID:', sessionId);

  // Try to save science question 17 (ID 417)
  console.log('\n📝 Attempting to save Science Q17 (ID=417)...\n');

  const { data, error } = await supabase
    .from('diagnostic_test_results')
    .upsert([{
      user_id: userId,
      diagnostic_session_id: sessionId,
      question_id: 417,  // Science Q17
      user_answer: 'A',
      is_correct: true,
      time_spent_seconds: 30
    }], {
      onConflict: 'diagnostic_session_id,question_id',
      ignoreDuplicates: false
    })
    .select();

  if (error) {
    console.error('❌ FAILED TO SAVE:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
  } else {
    console.log('✅ SUCCESS! Saved:', data);
  }

  // Try science question 16 (which worked)
  console.log('\n📝 Attempting to save Science Q16 (ID=416) for comparison...\n');

  const { data: data16, error: error16 } = await supabase
    .from('diagnostic_test_results')
    .upsert([{
      user_id: userId,
      diagnostic_session_id: sessionId + '-q16',
      question_id: 416,  // Science Q16
      user_answer: 'B',
      is_correct: false,
      time_spent_seconds: 45
    }], {
      onConflict: 'diagnostic_session_id,question_id',
      ignoreDuplicates: false
    })
    .select();

  if (error16) {
    console.error('❌ FAILED TO SAVE Q16:', {
      message: error16.message,
      code: error16.code
    });
  } else {
    console.log('✅ SUCCESS! Saved Q16:', data16);
  }
}

testSaveScienceQuestion()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
