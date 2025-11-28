require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyLearningPath() {
  console.log('\n🔍 Verifying Learning Path Generation\n');

  const userId = 'dbcf3bc1-786c-4907-8ce6-4096f25cd5c6'; // Your user ID from logs

  // 1. Check if learning path was created
  const { data: paths, error: pathsError } = await supabase
    .from('user_learning_paths')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true);

  if (pathsError) {
    console.error('❌ Error fetching learning paths:', pathsError);
    return;
  }

  if (!paths || paths.length === 0) {
    console.log('❌ No active learning path found!');
    return;
  }

  const path = paths[0];
  console.log('✅ Active Learning Path Found:');
  console.log(`   ID: ${path.id}`);
  console.log(`   Name: ${path.path_name}`);
  console.log(`   Target Score: ${path.target_score}`);
  console.log(`   Current Score: ${path.current_estimated_score}`);
  console.log(`   Daily Minutes: ${path.daily_study_minutes}`);
  console.log(`   Exam Date: ${path.exam_date}`);
  console.log(`   Completion: ${path.completion_percentage}%`);

  // 2. Check learning path items
  const { data: items, error: itemsError, count } = await supabase
    .from('learning_path_items')
    .select('*, lessons!inner(*)', { count: 'exact' })
    .eq('learning_path_id', path.id)
    .order('sequence_order', { ascending: true });

  if (itemsError) {
    console.error('\n❌ Error fetching learning path items:', itemsError);
    return;
  }

  console.log(`\n📚 Learning Path Items: ${count} total`);

  if (!items || items.length === 0) {
    console.log('❌ No learning path items found!');
    return;
  }

  // Group by section
  const bySectionMap = {};
  items.forEach(item => {
    const section = item.lessons?.section || 'unknown';
    if (!bySectionMap[section]) {
      bySectionMap[section] = [];
    }
    bySectionMap[section].push(item);
  });

  console.log('\n📊 Items by Section:');
  Object.keys(bySectionMap).sort().forEach(section => {
    const sectionItems = bySectionMap[section];
    const priorityCount = sectionItems.filter(i => i.is_priority).length;
    console.log(`   ${section}: ${sectionItems.length} lessons (${priorityCount} priority)`);
  });

  // Group by week
  const byWeekMap = {};
  items.forEach(item => {
    const week = item.week_number || 0;
    if (!byWeekMap[week]) {
      byWeekMap[week] = [];
    }
    byWeekMap[week].push(item);
  });

  console.log('\n📅 Items by Week:');
  Object.keys(byWeekMap).sort((a, b) => parseInt(a) - parseInt(b)).forEach(week => {
    const weekItems = byWeekMap[week];
    console.log(`   Week ${week}: ${weekItems.length} lessons`);
  });

  // Show first 5 lessons
  console.log('\n🎯 First 5 Lessons in Path:');
  items.slice(0, 5).forEach((item, idx) => {
    console.log(`   ${idx + 1}. ${item.lessons?.title || 'Unknown Lesson'}`);
    console.log(`      Section: ${item.lessons?.section || 'N/A'}`);
    console.log(`      Priority: ${item.is_priority ? '⭐ HIGH' : 'Normal'}`);
    console.log(`      Week ${item.week_number}, Day ${item.day_number}`);
    console.log(`      Status: ${item.status}`);
    console.log(`      Scheduled: ${item.scheduled_date}`);
  });

  // 3. Check diagnostic analysis results
  console.log('\n📊 Checking Diagnostic Analysis...\n');

  const { data: analysis, error: analysisError } = await supabase
    .from('diagnostic_test_analysis')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (analysisError) {
    console.error('❌ Error fetching analysis:', analysisError);
  } else if (analysis && analysis.length > 0) {
    const latest = analysis[0];
    console.log('✅ Latest Diagnostic Analysis:');
    console.log(`   Overall Score: ${latest.overall_score}`);
    console.log(`   Overall Accuracy: ${latest.overall_accuracy}%`);
    console.log(`   Created: ${new Date(latest.created_at).toLocaleString()}`);
  } else {
    console.log('⚠️  No diagnostic analysis found');
  }

  // 4. Check user_lesson_performance
  const { data: performance, error: perfError, count: perfCount } = await supabase
    .from('user_lesson_performance')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  if (perfError) {
    console.error('\n❌ Error fetching lesson performance:', perfError);
  } else {
    console.log(`\n📈 User Lesson Performance: ${perfCount} lessons tracked`);
    if (performance && performance.length > 0) {
      const weakCount = performance.filter(p => p.is_weak_area).length;
      console.log(`   Weak areas: ${weakCount}`);
      console.log(`   Strong areas: ${perfCount - weakCount}`);
    }
  }

  // 5. Check profile diagnostic_completed flag
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('diagnostic_completed, diagnostic_completed_at')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.error('\n❌ Error fetching profile:', profileError);
  } else {
    console.log(`\n👤 Profile Status:`);
    console.log(`   Diagnostic Completed: ${profile?.diagnostic_completed ? '✅ Yes' : '❌ No'}`);
    if (profile?.diagnostic_completed_at) {
      console.log(`   Completed At: ${new Date(profile.diagnostic_completed_at).toLocaleString()}`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('✅ Learning Path Verification Complete!');
  console.log('═══════════════════════════════════════════════════════\n');
}

verifyLearningPath()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
