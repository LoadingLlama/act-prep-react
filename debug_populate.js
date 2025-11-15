/**
 * Debug why populate SQL isn't working
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
  console.log('🔍 Debugging populate issue...\n');

  const pathId = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2';

  // 1. Check if learning path exists
  console.log('1️⃣ Checking if learning path exists...');
  const { data: path, error: pathError } = await supabase
    .from('user_learning_paths')
    .select('*')
    .eq('id', pathId)
    .single();

  if (pathError) {
    console.error('❌ Learning path does not exist!');
    console.error('   Error:', pathError.message);

    // Check what paths DO exist
    const { data: allPaths } = await supabase
      .from('user_learning_paths')
      .select('id, user_id, created_at');

    console.log('\n📋 Existing learning paths:');
    if (allPaths && allPaths.length > 0) {
      allPaths.forEach(p => {
        console.log(`   ID: ${p.id}`);
        console.log(`   User: ${p.user_id}`);
        console.log(`   Created: ${p.created_at}\n`);
      });
    } else {
      console.log('   None found!\n');
    }
    return;
  }

  console.log('✅ Learning path exists');
  console.log(`   User: ${path.user_id}`);
  console.log(`   Created: ${path.created_at}\n`);

  // 2. Check how many lessons exist with the pattern
  console.log('2️⃣ Checking lessons with pattern...');
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .or('lesson_key.like.english_%,lesson_key.like.math_%,lesson_key.like.reading_%,lesson_key.like.science_%');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError.message);
    return;
  }

  console.log(`✅ Found ${lessons.length} lessons matching pattern\n`);

  if (lessons.length > 0) {
    console.log('📚 Sample lessons:');
    lessons.slice(0, 5).forEach(l => {
      console.log(`   ${l.lesson_key}: ${l.title}`);
    });
    console.log('');
  }

  // 3. Try to insert ONE item manually to see what error we get
  console.log('3️⃣ Attempting to insert ONE test item...');

  if (lessons.length > 0) {
    const testLesson = lessons[0];

    const { data: insertData, error: insertError } = await supabase
      .from('learning_path_items')
      .insert({
        learning_path_id: pathId,
        lesson_id: testLesson.id,
        sequence_order: 1,
        week_number: 1,
        day_number: 1,
        is_priority: true,
        estimated_minutes: 30,
        scheduled_date: new Date().toISOString().split('T')[0],
        status: 'pending'
      })
      .select();

    if (insertError) {
      console.error('❌ Insert failed!');
      console.error('   Error:', insertError.message);
      console.error('   Code:', insertError.code);
      console.error('   Details:', insertError.details);
    } else {
      console.log('✅ Test insert succeeded!');
      console.log('   Inserted item:', insertData);

      // Clean up
      await supabase
        .from('learning_path_items')
        .delete()
        .eq('learning_path_id', pathId)
        .eq('lesson_id', testLesson.id);

      console.log('   (Cleaned up test item)');
    }
  }

  console.log('\n🏁 Debug complete');
}

debug().catch(console.error);
