const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkDiagnosticData() {
  console.log('=== DIAGNOSTIC TEST SESSIONS ===\n');

  const { data: sessions, error: sessionsError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .order('created_at', { ascending: false });

  if (sessionsError) {
    console.error('Error fetching sessions:', sessionsError);
  } else {
    console.log(`Found ${sessions?.length || 0} diagnostic test sessions:`);
    sessions?.forEach(session => {
      console.log(`\nSession ID: ${session.id}`);
      console.log(`  User ID: ${session.user_id}`);
      console.log(`  Completed: ${session.completed}`);
      console.log(`  Score: ${session.score_percentage}%`);
      console.log(`  Correct: ${session.correct_answers}/${session.total_questions}`);
      console.log(`  Created: ${session.created_at}`);
      console.log(`  Ended: ${session.session_end}`);
    });
  }

  console.log('\n\n=== DIAGNOSTIC TEST RESULTS ===\n');

  if (sessions && sessions.length > 0) {
    const latestSession = sessions[0];
    const { data: results, error: resultsError } = await supabase
      .from('diagnostic_test_results')
      .select('*')
      .eq('diagnostic_session_id', latestSession.id)
      .limit(10);

    if (resultsError) {
      console.error('Error fetching results:', resultsError);
    } else {
      console.log(`Found ${results?.length || 0} results for latest session (showing first 10):`);
      results?.forEach(result => {
        console.log(`\n  Question ID: ${result.question_id}`);
        console.log(`    User Answer: ${result.user_answer}`);
        console.log(`    Is Correct: ${result.is_correct}`);
      });
    }

    // Get total count
    const { count } = await supabase
      .from('diagnostic_test_results')
      .select('*', { count: 'exact', head: true })
      .eq('diagnostic_session_id', latestSession.id);

    console.log(`\n  Total results for this session: ${count}`);
  }

  console.log('\n\n=== LEARNING PATHS ===\n');

  const { data: paths, error: pathsError } = await supabase
    .from('user_learning_paths')
    .select('*')
    .order('created_at', { ascending: false });

  if (pathsError) {
    console.error('Error fetching learning paths:', pathsError);
  } else {
    console.log(`Found ${paths?.length || 0} learning paths:`);
    paths?.forEach(path => {
      console.log(`\nPath ID: ${path.id}`);
      console.log(`  User ID: ${path.user_id}`);
      console.log(`  Active: ${path.is_active}`);
      console.log(`  Diagnostic Session: ${path.diagnostic_session_id}`);
      console.log(`  Created: ${path.created_at}`);
    });
  }

  console.log('\n\n=== LEARNING PATH ITEMS ===\n');

  if (paths && paths.length > 0) {
    const latestPath = paths[0];
    const { data: items, error: itemsError } = await supabase
      .from('learning_path_items')
      .select('*')
      .eq('learning_path_id', latestPath.id)
      .order('sequence_order', { ascending: true })
      .limit(10);

    if (itemsError) {
      console.error('Error fetching learning path items:', itemsError);
    } else {
      console.log(`Found ${items?.length || 0} items for latest path (showing first 10):`);
      items?.forEach(item => {
        console.log(`\n  Order: ${item.sequence_order}`);
        console.log(`    Lesson ID: ${item.lesson_id}`);
        console.log(`    Status: ${item.status}`);
        console.log(`    Reason: ${item.reason}`);
      });
    }

    // Get total count
    const { count } = await supabase
      .from('learning_path_items')
      .select('*', { count: 'exact', head: true })
      .eq('learning_path_id', latestPath.id);

    console.log(`\n  Total items for this path: ${count}`);
  }

  console.log('\n\n=== USER LESSON PERFORMANCE ===\n');

  const { data: performance, error: perfError } = await supabase
    .from('user_lesson_performance')
    .select('*')
    .order('last_practiced', { ascending: false })
    .limit(10);

  if (perfError) {
    console.error('Error fetching lesson performance:', perfError);
  } else {
    console.log(`Found ${performance?.length || 0} lesson performance records (showing first 10):`);
    performance?.forEach(perf => {
      console.log(`\n  Lesson ID: ${perf.lesson_id}`);
      console.log(`    User ID: ${perf.user_id}`);
      console.log(`    Accuracy: ${perf.accuracy_percentage}%`);
      console.log(`    Mastery: ${perf.mastery_level}`);
      console.log(`    Weak Area: ${perf.is_weak_area}`);
      console.log(`    Last Practiced: ${perf.last_practiced}`);
    });
  }
}

checkDiagnosticData().then(() => process.exit(0));
