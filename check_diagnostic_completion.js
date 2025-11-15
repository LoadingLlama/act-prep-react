/**
 * Check what happened during diagnostic completion
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDiagnosticCompletion() {
  console.log('🔍 Checking diagnostic completion status...\n');

  // Get latest session
  const { data: sessions, error: sessError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .eq('completed', true)
    .order('created_at', { ascending: false })
    .limit(1);

  if (sessError) {
    console.error('❌ Error fetching sessions:', sessError.message);
    return;
  }

  if (!sessions || sessions.length === 0) {
    console.log('⚠️  No completed diagnostic sessions found');
    return;
  }

  const session = sessions[0];
  console.log('✅ Found completed session:');
  console.log(`   ID: ${session.id}`);
  console.log(`   User: ${session.user_id}`);
  console.log(`   Score: ${session.score_percentage}%`);
  console.log(`   Completed: ${session.completed}`);
  console.log(`   Created: ${session.created_at}\n`);

  // Check results
  const { data: results, error: resError } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .eq('diagnostic_session_id', session.id);

  if (resError) {
    console.error('❌ Error fetching results:', resError.message);
  } else {
    console.log(`📝 Diagnostic Results: ${results.length} question(s)`);
    if (results.length > 0) {
      const correct = results.filter(r => r.is_correct).length;
      console.log(`   Correct: ${correct}/${results.length}`);
      console.log(`   Accuracy: ${((correct / results.length) * 100).toFixed(1)}%\n`);
    }
  }

  // Check analysis
  const { data: analysis, error: anaError } = await supabase
    .from('diagnostic_analysis')
    .select('*')
    .eq('diagnostic_session_id', session.id);

  if (anaError) {
    console.error('❌ Error fetching analysis:', anaError.message);
  } else if (!analysis || analysis.length === 0) {
    console.log('❌ NO ANALYSIS FOUND - This is the problem!');
    console.log('   Analysis should have been created automatically\n');
  } else {
    const a = analysis[0];
    console.log('✅ Diagnostic Analysis found:');
    console.log(`   ID: ${a.id}`);
    console.log(`   Overall Score: ${a.overall_score}`);
    console.log(`   Accuracy: ${a.overall_accuracy}%`);
    console.log(`   Weak Lessons: ${a.weak_lessons?.length || 0}`);
    console.log(`   Strong Lessons: ${a.strong_lessons?.length || 0}\n`);

    if (a.weak_lessons && a.weak_lessons.length > 0) {
      console.log('   Weak Lessons Details:');
      a.weak_lessons.slice(0, 5).forEach((wl, i) => {
        console.log(`   ${i + 1}. ${wl.lesson_title || wl.lesson_key || wl.lesson_id}`);
        console.log(`      Accuracy: ${wl.accuracy_percentage || wl.accuracy}%`);
      });
      console.log('');
    }
  }

  // Check learning paths
  const { data: paths, error: pathError } = await supabase
    .from('user_learning_paths')
    .select('*')
    .eq('user_id', session.user_id)
    .order('created_at', { ascending: false });

  if (pathError) {
    console.error('❌ Error fetching learning paths:', pathError.message);
  } else if (!paths || paths.length === 0) {
    console.log('❌ NO LEARNING PATH FOUND - This is why nothing shows!');
    console.log('   Learning path should have been created automatically\n');
  } else {
    console.log(`🛤️  Learning Paths: ${paths.length} found`);
    paths.forEach((p, i) => {
      console.log(`\n${i + 1}. ${p.path_name}`);
      console.log(`   ID: ${p.id}`);
      console.log(`   Active: ${p.is_active ? '✅' : '❌'}`);
      console.log(`   Created: ${p.created_at}`);
    });

    // Check items for active path
    const activePath = paths.find(p => p.is_active);
    if (activePath) {
      const { data: items } = await supabase
        .from('learning_path_items')
        .select('*')
        .eq('learning_path_id', activePath.id);

      console.log(`\n   Path Items: ${items?.length || 0}`);
      if (!items || items.length === 0) {
        console.log('   ⚠️  Path exists but has NO ITEMS!');
      }
    }
  }

  // Check algorithm runs
  const { data: algRuns } = await supabase
    .from('algorithm_runs')
    .select('*')
    .eq('user_id', session.user_id)
    .order('created_at', { ascending: false })
    .limit(5);

  if (algRuns && algRuns.length > 0) {
    console.log('\n📊 Recent Algorithm Runs:');
    algRuns.forEach((run, i) => {
      console.log(`\n${i + 1}. ${run.algorithm_type}`);
      console.log(`   Success: ${run.success ? '✅' : '❌'}`);
      if (!run.success) {
        console.log(`   Error: ${run.error_message}`);
      }
      console.log(`   Time: ${run.execution_time_ms}ms`);
      console.log(`   Created: ${run.created_at}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('DIAGNOSIS:');
  console.log('='.repeat(60));

  if (!analysis || analysis.length === 0) {
    console.log('❌ Analysis was not created - check browser console for errors');
  } else if (!paths || paths.length === 0) {
    console.log('❌ Learning path was not created - check browser console for errors');
  } else if (paths.some(p => p.is_active)) {
    const activePath = paths.find(p => p.is_active);
    const { data: items } = await supabase
      .from('learning_path_items')
      .select('*')
      .eq('learning_path_id', activePath.id);

    if (!items || items.length === 0) {
      console.log('❌ Learning path exists but has NO ITEMS');
      console.log('   This means weak_lessons was empty or generation failed');
    } else {
      console.log('✅ Everything looks good! Try refreshing the page.');
    }
  } else {
    console.log('⚠️  Learning path exists but is_active = false');
  }
}

checkDiagnosticCompletion().catch(console.error);
