/**
 * Check what's in the learning path
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPath() {
  console.log('🔍 Checking learning path items...\n');

  const pathId = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2';

  const { data: items, error } = await supabase
    .from('learning_path_items')
    .select(`
      *,
      lesson:lessons(title, lesson_key)
    `)
    .eq('learning_path_id', pathId)
    .order('sequence_order');

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`📊 Total items: ${items.length}\n`);

  // Group by week
  const byWeek = {};
  items.forEach(item => {
    const week = item.week_number || 1;
    if (!byWeek[week]) byWeek[week] = [];
    byWeek[week].push(item);
  });

  console.log(`📅 Weeks: ${Object.keys(byWeek).length}\n`);

  Object.entries(byWeek).forEach(([week, weekItems]) => {
    console.log(`Week ${week}: ${weekItems.length} item(s)`);
    weekItems.forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.lesson?.title || 'Unknown'}`);
      console.log(`     Lesson Key: ${item.lesson?.lesson_key || 'N/A'}`);
      console.log(`     Week: ${item.week_number}, Day: ${item.day_number}`);
      console.log(`     Scheduled: ${item.scheduled_date}`);
    });
    console.log('');
  });

  if (items.length < 12) {
    console.log('⚠️  Learning path has very few items!');
    console.log('   This was created before the fixes.');
    console.log('   Options:');
    console.log('   1. Run populate_learning_path.sql to add more lessons');
    console.log('   2. Retake diagnostic to generate proper 12-week path\n');
  }
}

checkPath().catch(console.error);
