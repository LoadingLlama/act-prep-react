/**
 * Check Supabase data with admin/service role access (bypasses RLS)
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkAdmin() {
  console.log('🔑 Checking Supabase with SERVICE ROLE (bypasses RLS)...\n');

  // 1. Check diagnostic sessions
  console.log('1️⃣ Diagnostic Sessions:');
  const { data: sessions, error: sessionsError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (sessionsError) {
    console.error('❌ Error:', sessionsError.message);
  } else {
    console.log(`   Found ${sessions.length} session(s)\n`);
    sessions.forEach(s => {
      console.log(`   ID: ${s.id}`);
      console.log(`   User: ${s.user_id}`);
      console.log(`   Status: ${s.status}`);
      console.log(`   Completed: ${s.completed}`);
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
    .limit(10);

  if (pathsError) {
    console.error('❌ Error:', pathsError.message);
  } else {
    console.log(`   Found ${paths.length} path(s)\n`);
    paths.forEach(p => {
      console.log(`   ID: ${p.id}`);
      console.log(`   User: ${p.user_id}`);
      console.log(`   Session: ${p.diagnostic_session_id}`);
      console.log(`   Active: ${p.is_active}`);
      console.log(`   Exam Date: ${p.target_exam_date}`);
      console.log(`   Created: ${p.created_at}\n`);
    });
  }

  // 3. Check learning path items
  console.log('3️⃣ Learning Path Items:');
  const { data: items, error: itemsError } = await supabase
    .from('learning_path_items')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (itemsError) {
    console.error('❌ Error:', itemsError.message);
  } else {
    console.log(`   Found ${items.length} item(s)\n`);

    if (items.length > 0) {
      // Group by learning path
      const byPath = {};
      items.forEach(item => {
        const pathId = item.learning_path_id;
        if (!byPath[pathId]) byPath[pathId] = [];
        byPath[pathId].push(item);
      });

      Object.entries(byPath).forEach(([pathId, pathItems]) => {
        console.log(`   Path ${pathId}: ${pathItems.length} items`);
        pathItems.slice(0, 3).forEach(item => {
          console.log(`     - Week ${item.week_number}, Day ${item.day_number}: Lesson ${item.lesson_id}`);
        });
        if (pathItems.length > 3) {
          console.log(`     ... and ${pathItems.length - 3} more`);
        }
        console.log('');
      });
    }
  }

  // 4. Check diagnostic results
  console.log('4️⃣ Diagnostic Test Results:');
  const { count, error: countError } = await supabase
    .from('diagnostic_test_results')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('❌ Error:', countError.message);
  } else {
    console.log(`   Total results: ${count}\n`);
  }

  // 5. If we have data, show details
  if (paths && paths.length > 0) {
    const latestPath = paths[0];
    console.log('5️⃣ Latest Learning Path Details:');
    console.log(`   Path ID: ${latestPath.id}`);
    console.log(`   User ID: ${latestPath.user_id}`);

    const { data: pathItems } = await supabase
      .from('learning_path_items')
      .select(`
        *,
        lesson:lessons(id, title, lesson_key)
      `)
      .eq('learning_path_id', latestPath.id)
      .order('sequence_order');

    console.log(`   Items: ${pathItems?.length || 0}`);

    if (pathItems && pathItems.length > 0) {
      console.log('\n   Sample items:');
      pathItems.slice(0, 5).forEach(item => {
        console.log(`     Week ${item.week_number}: ${item.lesson?.title || 'Unknown'}`);
      });
    }
  }

  console.log('\n🏁 Admin check complete');
}

checkAdmin().catch(console.error);
