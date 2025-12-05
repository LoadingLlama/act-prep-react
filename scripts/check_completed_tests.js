/**
 * Check completed practice tests in database
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkCompletedTests() {
  console.log('🔍 Checking completed practice tests...\n');

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('❌ Not authenticated or error getting user:', userError);
    return;
  }

  console.log('👤 User ID:', user.id);

  // Check practice_test_sessions table
  const { data, error } = await supabase
    .from('practice_test_sessions')
    .select('id, test_number, is_completed, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error querying practice_test_sessions:', error.message);
    return;
  }

  console.log(`\n📊 Found ${data.length} total practice test sessions\n`);

  // Group by test_number
  const byTestNumber = {};
  data.forEach(session => {
    if (!byTestNumber[session.test_number]) {
      byTestNumber[session.test_number] = [];
    }
    byTestNumber[session.test_number].push(session);
  });

  // Display results
  Object.keys(byTestNumber).sort((a, b) => parseInt(a) - parseInt(b)).forEach(testNum => {
    const sessions = byTestNumber[testNum];
    const completedCount = sessions.filter(s => s.is_completed).length;
    const displayNum = parseInt(testNum) - 1; // Display number (Test 2 = Display 1)

    console.log(`\n📝 Test ${displayNum} (DB test_number: ${testNum})`);
    console.log(`   Total sessions: ${sessions.length}`);
    console.log(`   Completed: ${completedCount}`);
    console.log(`   Status: ${completedCount > 0 ? '✅ COMPLETED' : '❌ NOT COMPLETED'}`);

    sessions.forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.is_completed ? '✅' : '❌'} ${new Date(s.created_at).toLocaleString()} (ID: ${s.id.substring(0, 8)}...)`);
    });
  });

  // Show what the UI should display
  console.log('\n\n🎨 UI Display (what should show "Completed"):');
  const completedTestNumbers = new Set(
    data.filter(s => s.is_completed).map(s => s.test_number)
  );

  console.log('   Completed test_numbers:', Array.from(completedTestNumbers));

  for (let testNum = 2; testNum <= 7; testNum++) {
    const displayNum = testNum - 1;
    const isCompleted = completedTestNumbers.has(testNum);
    console.log(`   Test ${displayNum}: ${isCompleted ? '✅ Show "Completed" badge' : '❌ No badge'}`);
  }
}

checkCompletedTests().then(() => {
  console.log('\n✅ Check complete');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
