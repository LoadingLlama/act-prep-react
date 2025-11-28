require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkExistingResults() {
  console.log('\n🔍 Checking existing diagnostic_test_results\n');

  // Get your user ID
  const userId = 'dbcf3bc1-786c-4907-8ce6-4096f25cd5c6'; // From your error log
  const sessionId = '07fa2904-82c9-44bb-9779-faaad6adcefd'; // From your error log

  // Get all results for this session
  const { data, error, count } = await supabase
    .from('diagnostic_test_results')
    .select('question_id, user_answer, is_correct', { count: 'exact' })
    .eq('diagnostic_session_id', sessionId)
    .order('question_id', { ascending: true });

  if (error) {
    console.error('❌ Error querying results:', error);
    return;
  }

  console.log(`📊 Total results saved: ${count}`);

  if (data && data.length > 0) {
    console.log('\n📋 Question IDs saved:');
    const questionIds = data.map(r => r.question_id).sort((a, b) => a - b);
    console.log(questionIds.join(', '));

    // Group by ranges
    const english = questionIds.filter(id => id >= 1 && id <= 75);
    const math = questionIds.filter(id => id >= 301 && id <= 360);
    const reading = questionIds.filter(id => id >= 201 && id <= 240);
    const science = questionIds.filter(id => id >= 401 && id <= 440);

    console.log('\n📊 By Section:');
    console.log(`  English (1-75): ${english.length} saved`);
    console.log(`  Math (301-360): ${math.length} saved`);
    console.log(`  Reading (201-240): ${reading.length} saved`);
    console.log(`  Science (401-440): ${science.length} saved`);

    console.log('\n🔬 Science questions detail:');
    console.log(`  Science IDs: ${science.join(', ')}`);
    console.log(`  Highest science ID saved: ${Math.max(...science)}`);
    console.log(`  Missing: ${science.length < 40 ? '❌' : '✅'}`);

    if (science.length > 0 && science.length < 40) {
      const missing = [];
      for (let i = 401; i <= 440; i++) {
        if (!science.includes(i)) {
          missing.push(i);
        }
      }
      console.log(`  Missing science IDs: ${missing.join(', ')}`);
    }
  } else {
    console.log('⚠️  No results found for this session');
  }

  // Check if there's a constraint on question_id
  console.log('\n🔍 Checking constraints on diagnostic_test_results...\n');

  const { data: constraints } = await supabase.rpc('exec_sql', {
    sql: `
      SELECT
        conname as constraint_name,
        contype as constraint_type,
        pg_get_constraintdef(oid) as definition
      FROM pg_constraint
      WHERE conrelid = 'diagnostic_test_results'::regclass
      ORDER BY contype, conname;
    `
  });

  if (constraints) {
    console.table(constraints);
  }
}

checkExistingResults()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
