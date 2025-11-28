/**
 * Check diagnostic sessions and learning paths
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('🔍 Checking diagnostic data...\n');

  // 1. Check diagnostic sessions
  console.log('1️⃣ Diagnostic Sessions:');
  const { data: sessions, error: sessionsError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (sessionsError) {
    console.error('❌ Error:', sessionsError.message);
  } else if (sessions.length === 0) {
    console.log('   No sessions found');
  } else {
    sessions.forEach(s => {
      console.log(`   ID: ${s.id}`);
      console.log(`   User: ${s.user_id}`);
      console.log(`   Status: ${s.status}`);
      console.log(`   Score: ${s.total_score}/${s.total_questions}`);
      console.log(`   Created: ${s.created_at}\n`);
    });
  }

  // 2. Check learning paths
  console.log('2️⃣ Learning Paths:');
  const { data: paths, error: pathsError } = await supabase
    .from('user_learning_paths')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (pathsError) {
    console.error('❌ Error:', pathsError.message);
  } else if (paths.length === 0) {
    console.log('   No learning paths found');
  } else {
    paths.forEach(p => {
      console.log(`   ID: ${p.id}`);
      console.log(`   User: ${p.user_id}`);
      console.log(`   Session: ${p.diagnostic_session_id}`);
      console.log(`   Exam Date: ${p.target_exam_date}`);
      console.log(`   Created: ${p.created_at}\n`);
    });
  }

  // 3. Check results count
  console.log('3️⃣ Diagnostic Results:');
  const { count, error: countError } = await supabase
    .from('diagnostic_test_results')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('❌ Error:', countError.message);
  } else {
    console.log(`   Total results: ${count}\n`);
  }

  // 4. If we have a recent session, show its info
  if (sessions && sessions.length > 0) {
    const latestSession = sessions[0];
    console.log('4️⃣ Latest Session Details:');

    const { data: results } = await supabase
      .from('diagnostic_test_results')
      .select('*')
      .eq('diagnostic_session_id', latestSession.id);

    console.log(`   Session ID: ${latestSession.id}`);
    console.log(`   Results count: ${results?.length || 0}`);
    console.log(`   Expected: 215\n`);

    // Check if learning path exists for this session
    const { data: sessionPath } = await supabase
      .from('user_learning_paths')
      .select('id')
      .eq('diagnostic_session_id', latestSession.id)
      .maybeSingle();

    if (sessionPath) {
      console.log(`   ✅ Learning path exists: ${sessionPath.id}`);
    } else {
      console.log(`   ❌ No learning path created for this session!`);
      console.log(`   Need to create learning path for session ${latestSession.id}`);
    }
  }

  console.log('\n🏁 Check complete');
}

check().catch(console.error);
