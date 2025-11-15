/**
 * Check database with raw queries - no RLS filtering
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRawData() {
  console.log('🔍 Checking database with broader query...\n');

  // Try to get sessions without user filter
  console.log('📊 All Diagnostic Sessions:');
  const { data: sessions, error: sessError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*');

  console.log('Sessions result:', {
    count: sessions?.length || 0,
    error: sessError?.message,
    data: sessions
  });

  // Check auth users
  console.log('\n👤 Auth Users:');
  const { data: authData, error: authError } = await supabase.auth.admin.listUsers();

  if (authError) {
    console.log('Cannot access auth.users directly:', authError.message);
  } else {
    console.log('Users:', authData);
  }

  // Try profiles table
  console.log('\n📋 Profiles:');
  const { data: profiles, error: profError } = await supabase
    .from('profiles')
    .select('*');

  console.log('Profiles result:', {
    count: profiles?.length || 0,
    error: profError?.message,
    data: profiles
  });

  // Check diagnostic results
  console.log('\n📝 Diagnostic Results:');
  const { data: results, error: resError } = await supabase
    .from('diagnostic_test_results')
    .select('*');

  console.log('Results:', {
    count: results?.length || 0,
    error: resError?.message,
    sample: results?.[0]
  });

  // Check analysis
  console.log('\n📊 Diagnostic Analysis:');
  const { data: analysis, error: anaError } = await supabase
    .from('diagnostic_analysis')
    .select('*');

  console.log('Analysis:', {
    count: analysis?.length || 0,
    error: anaError?.message,
    sample: analysis?.[0]
  });

  // Check learning paths
  console.log('\n🛤️  Learning Paths:');
  const { data: paths, error: pathError } = await supabase
    .from('user_learning_paths')
    .select('*');

  console.log('Paths:', {
    count: paths?.length || 0,
    error: pathError?.message,
    sample: paths?.[0]
  });
}

checkRawData().catch(console.error);
