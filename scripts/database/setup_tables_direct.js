/**
 * Setup diagnostic tables by checking and reporting status
 * Provides instructions if tables need to be created manually
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const requiredTables = [
  'user_learning_paths',
  'learning_path_items',
  'user_lesson_performance',
  'lesson_progress',
  'algorithm_runs'
];

async function checkTables() {
  console.log('🔍 Checking for required tables...\n');

  const results = {};

  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(1);

      if (error) {
        if (error.message.includes('does not exist') || error.code === '42P01') {
          console.log(`❌ ${table} - MISSING`);
          results[table] = false;
        } else {
          console.log(`⚠️  ${table} - Error: ${error.message}`);
          results[table] = 'error';
        }
      } else {
        console.log(`✅ ${table} - EXISTS`);
        results[table] = true;
      }
    } catch (err) {
      console.log(`❌ ${table} - Exception: ${err.message}`);
      results[table] = false;
    }
  }

  const missingTables = Object.entries(results).filter(([_, exists]) => !exists);

  if (missingTables.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('⚠️  MISSING TABLES DETECTED');
    console.log('='.repeat(60));
    console.log('\nPlease run the following SQL in Supabase Dashboard:\n');
    console.log('📍 URL: https://rabavobdklnwvwsldbix.supabase.co/project/_/sql/new\n');
    console.log('📋 File: FINAL_COMPLETE_SETUP.sql');
    console.log('\nSteps:');
    console.log('  1. Open the URL above');
    console.log('  2. Copy contents of FINAL_COMPLETE_SETUP.sql');
    console.log('  3. Paste into SQL Editor');
    console.log('  4. Click "Run"');
    console.log('  5. Re-run this script to verify\n');
    return false;
  } else {
    console.log('\n✅ All required tables exist!');
    return true;
  }
}

async function checkDiagnosticData() {
  console.log('\n🔍 Checking for diagnostic test data...\n');

  try {
    const { data: sessions, error } = await supabase
      .from('diagnostic_test_sessions')
      .select('*')
      .eq('completed', true)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('❌ Error fetching diagnostic sessions:', error.message);
      return null;
    }

    if (!sessions || sessions.length === 0) {
      console.log('⚠️  No completed diagnostic tests found');
      return null;
    }

    const session = sessions[0];
    console.log(`✅ Found diagnostic session: ${session.id}`);
    console.log(`   User: ${session.user_id}`);
    console.log(`   Score: ${session.score_percentage}%`);
    console.log(`   Questions: ${session.correct_answers}/${session.total_questions}`);

    return session;
  } catch (err) {
    console.error('❌ Exception:', err.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Diagnostic System Setup Check\n');

  const tablesExist = await checkTables();

  if (tablesExist) {
    const diagnosticData = await checkDiagnosticData();

    if (diagnosticData) {
      console.log('\n✅ Ready to generate learning path!');
      console.log('   Run: node generate_learning_path.js');
    } else {
      console.log('\n⚠️  Complete a diagnostic test first to generate learning path');
    }
  }
}

main().catch(console.error);
