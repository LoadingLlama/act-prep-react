/**
 * Check all diagnostic-related tables for any data
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable(tableName, selectFields = '*', limit = 5) {
  try {
    const { data, error, count } = await supabase
      .from(tableName)
      .select(selectFields, { count: 'exact' })
      .limit(limit);

    if (error) {
      if (error.code === '42P01') {
        return { exists: false, error: 'Table does not exist' };
      }
      return { exists: true, count: 0, error: error.message };
    }

    return { exists: true, count: count || 0, data: data || [] };
  } catch (err) {
    return { exists: false, error: err.message };
  }
}

async function main() {
  console.log('🔍 Checking all diagnostic tables...\n');

  const tables = [
    'diagnostic_test_sessions',
    'diagnostic_test_results',
    'diagnostic_analysis',
    'user_learning_paths',
    'learning_path_items',
    'user_lesson_performance',
    'lesson_progress',
    'algorithm_runs'
  ];

  for (const table of tables) {
    const result = await checkTable(table);

    console.log(`📋 ${table}:`);
    if (!result.exists) {
      console.log(`   ❌ Does not exist: ${result.error}`);
    } else if (result.error) {
      console.log(`   ⚠️  Error: ${result.error}`);
    } else {
      console.log(`   ✅ Exists - ${result.count} row(s)`);
      if (result.count > 0 && result.data.length > 0) {
        console.log(`   First row ID: ${result.data[0].id}`);
      }
    }
    console.log('');
  }

  // Special check: See if there are ANY users at all
  console.log('👤 Checking users (auth.users):');
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .limit(5);

  if (profileError) {
    console.log('   ⚠️  Could not check profiles:', profileError.message);
  } else if (profiles && profiles.length > 0) {
    console.log(`   ✅ Found ${profiles.length} profile(s)`);
    console.log(`   First user: ${profiles[0].id}`);
  } else {
    console.log('   ⚠️  No profiles found');
  }
}

main().catch(console.error);
