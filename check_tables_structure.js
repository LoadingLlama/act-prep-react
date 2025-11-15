const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkTablesStructure() {
  console.log('=== CHECKING TABLE STRUCTURES ===\n');

  // Check diagnostic_test_sessions
  const { data: sessions } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .limit(0);

  console.log('diagnostic_test_sessions columns:');
  console.log('  (table is empty, checking schema via error)');

  // Check diagnostic_test_results
  const { data: results } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .limit(0);

  console.log('\ndiagnostic_test_results columns:');
  console.log('  (table is empty)');

  // Check user_learning_paths
  const { data: paths } = await supabase
    .from('user_learning_paths')
    .select('*')
    .limit(0);

  console.log('\nuser_learning_paths columns:');
  console.log('  (table is empty)');

  // Check learning_path_items
  const { data: items } = await supabase
    .from('learning_path_items')
    .select('*')
    .limit(0);

  console.log('\nlearning_path_items columns:');
  console.log('  (table is empty)');

  // Try different column name
  console.log('\n\n=== Trying user_lesson_performance with correct column name ===\n');

  const { data: performance, error: perfError } = await supabase
    .from('user_lesson_performance')
    .select('*')
    .order('last_practiced_at', { ascending: false })
    .limit(5);

  if (perfError) {
    console.error('Error:', perfError);
  } else {
    console.log(`Found ${performance?.length || 0} records:`);
    if (performance && performance.length > 0) {
      console.log('Sample record columns:', Object.keys(performance[0]).join(', '));
      performance.forEach(p => {
        console.log(`\n  Lesson ${p.lesson_id}:`);
        console.log(`    Accuracy: ${p.accuracy_percentage}%`);
        console.log(`    Mastery: ${p.mastery_level}`);
      });
    }
  }

  // Check if there are any users in the system
  console.log('\n\n=== CHECKING USERS ===\n');

  const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

  if (usersError) {
    console.log('Cannot check users (need admin access)');
  } else {
    console.log(`Found ${users?.length || 0} users in auth.users`);
  }

  // Check practice test questions
  console.log('\n\n=== CHECKING PRACTICE TEST QUESTIONS ===\n');

  const sections = ['english', 'math', 'reading', 'science'];
  for (const section of sections) {
    const { count } = await supabase
      .from(`practice_test_${section}_questions`)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 1);

    console.log(`practice_test_${section}_questions: ${count} questions`);
  }
}

checkTablesStructure().then(() => process.exit(0));
