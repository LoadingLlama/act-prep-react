/**
 * Manually generate learning path from diagnostic data
 * Standalone script - no service dependencies
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('🔍 Checking for diagnostic data in Supabase...\n');
  console.log(`📍 URL: ${supabaseUrl}\n`);
  console.log('='.repeat(60) + '\n');

  // Check sessions
  console.log('📊 Checking diagnostic_test_sessions...');
  const { data: sessions, error: sessError, count } = await supabase
    .from('diagnostic_test_sessions')
    .select('*', { count: 'exact' });

  if (sessError) {
    console.log(`❌ Error: ${sessError.message}`);
    console.log(`   Code: ${sessError.code}`);
    console.log(`   Details: ${JSON.stringify(sessError.details)}`);
  } else {
    console.log(`✅ Query successful`);
    console.log(`   Total rows (may be filtered by RLS): ${sessions.length}`);
    console.log(`   Count: ${count}`);

    if (sessions.length > 0) {
      console.log('\n📋 Session data:');
      sessions.forEach((s, i) => {
        console.log(`\n${i + 1}. Session ${s.id}:`);
        console.log(`   User ID: ${s.user_id}`);
        console.log(`   Completed: ${s.completed}`);
        console.log(`   Score: ${s.score_percentage}%`);
        console.log(`   Questions: ${s.correct_answers}/${s.total_questions}`);
        console.log(`   Created: ${s.created_at}`);
      });
    }
  }

  // Check results
  console.log('\n\n📝 Checking diagnostic_test_results...');
  const { data: results, error: resError } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .limit(10);

  if (resError) {
    console.log(`❌ Error: ${resError.message}`);
  } else {
    console.log(`✅ Found ${results.length} result(s)`);
    if (results.length > 0) {
      console.log(`   Sample: ${JSON.stringify(results[0], null, 2)}`);
    }
  }

  // Check analysis
  console.log('\n\n📊 Checking diagnostic_analysis...');
  const { data: analysis, error: anaError } = await supabase
    .from('diagnostic_analysis')
    .select('*');

  if (anaError) {
    console.log(`❌ Error: ${anaError.message}`);
  } else {
    console.log(`✅ Found ${analysis.length} analysis record(s)`);
    if (analysis.length > 0) {
      const a = analysis[0];
      console.log(`\n   Analysis ${a.id}:`);
      console.log(`   User ID: ${a.user_id}`);
      console.log(`   Accuracy: ${a.overall_accuracy}%`);
      console.log(`   Weak Lessons: ${a.weak_lessons?.length || 0}`);
      console.log(`   Strong Lessons: ${a.strong_lessons?.length || 0}`);

      if (a.weak_lessons && a.weak_lessons.length > 0) {
        console.log(`\n   Weak Lessons Details:`);
        a.weak_lessons.forEach((wl, i) => {
          console.log(`   ${i + 1}. ${wl.lesson_title || wl.lesson_key}`);
          console.log(`      Accuracy: ${wl.accuracy_percentage}%`);
          console.log(`      Lesson ID: ${wl.lesson_id}`);
        });
      }
    }
  }

  // Check learning paths
  console.log('\n\n🛤️  Checking user_learning_paths...');
  const { data: paths, error: pathError } = await supabase
    .from('user_learning_paths')
    .select(`
      *,
      learning_path_items(*)
    `);

  if (pathError) {
    console.log(`❌ Error: ${pathError.message}`);
  } else {
    console.log(`✅ Found ${paths.length} learning path(s)`);
    if (paths.length > 0) {
      paths.forEach((p, i) => {
        console.log(`\n${i + 1}. Path: ${p.path_name}`);
        console.log(`   ID: ${p.id}`);
        console.log(`   User ID: ${p.user_id}`);
        console.log(`   Active: ${p.is_active}`);
        console.log(`   Items: ${p.learning_path_items?.length || 0}`);
      });
    }
  }

  console.log('\n\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Sessions: ${sessions?.length || 0}`);
  console.log(`Results: ${results?.length || 0}`);
  console.log(`Analysis: ${analysis?.length || 0}`);
  console.log(`Learning Paths: ${paths?.length || 0}`);

  if ((sessions?.length === 0 && results?.length === 0) || sessions === undefined) {
    console.log('\n⚠️  NOTE: If you know data exists but queries return 0:');
    console.log('   - RLS policies might be blocking access (not authenticated)');
    console.log('   - Run this SQL in Supabase Dashboard to check:');
    console.log('\n   SELECT COUNT(*) FROM diagnostic_test_sessions;');
    console.log('   SELECT COUNT(*) FROM diagnostic_test_results;');
    console.log('   SELECT COUNT(*) FROM diagnostic_analysis;');
    console.log('\n   Dashboard URL: https://rabavobdklnwvwsldbix.supabase.co/project/_/sql/new');
  }

  if (analysis && analysis.length > 0 && (!paths || paths.length === 0)) {
    console.log('\n✅ Analysis exists but no learning path!');
    console.log('   To generate, open the app and it should create automatically.');
    console.log('   Or run: node generate_path_from_browser.html');
  }
}

main().catch(err => {
  console.error('\n❌ Fatal Error:', err.message);
  console.error(err.stack);
});
