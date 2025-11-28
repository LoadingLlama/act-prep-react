/**
 * Debug why learning path isn't showing
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

const ACTIVE_PATH_ID = 'b1d15fd6-f6cc-4fda-9348-39984f8b6113';

async function debug() {
  console.log('🔍 Debugging learning path issue...\n');

  // 1. Check if learning path exists and is active
  console.log('1️⃣ Checking learning path...');
  const { data: path, error: pathError } = await supabase
    .from('user_learning_paths')
    .select('*')
    .eq('id', ACTIVE_PATH_ID)
    .single();

  if (pathError) {
    console.error('❌ Error fetching path:', pathError.message);
    return;
  }

  console.log(`   ID: ${path.id}`);
  console.log(`   User: ${path.user_id}`);
  console.log(`   Active: ${path.is_active}`);
  console.log(`   Created: ${path.created_at}\n`);

  if (!path.is_active) {
    console.log('⚠️  Path is NOT active! Need to activate it.');

    const { error: updateError } = await supabase
      .from('user_learning_paths')
      .update({ is_active: true })
      .eq('id', ACTIVE_PATH_ID);

    if (updateError) {
      console.error('❌ Failed to activate:', updateError.message);
    } else {
      console.log('✅ Activated learning path!\n');
    }
  }

  // 2. Check items count
  console.log('2️⃣ Checking learning path items...');
  const { data: items, error: itemsError } = await supabase
    .from('learning_path_items')
    .select('*')
    .eq('learning_path_id', ACTIVE_PATH_ID);

  if (itemsError) {
    console.error('❌ Error fetching items:', itemsError.message);
    return;
  }

  console.log(`   Total items: ${items.length}`);

  const lessons = items.filter(i => i.item_type === 'lesson');
  const tests = items.filter(i => i.item_type === 'test');

  console.log(`   Lessons: ${lessons.length}`);
  console.log(`   Tests: ${tests.length}\n`);

  if (items.length === 0) {
    console.log('❌ NO ITEMS in learning path!');
    console.log('   The populate script might have failed.');
    console.log('   Check for errors above.\n');
  } else {
    console.log('✅ Items exist in database\n');
  }

  // 3. Show sample items
  if (items.length > 0) {
    console.log('3️⃣ Sample items:');
    items.slice(0, 5).forEach(item => {
      console.log(`   Week ${item.week_number}: ${item.item_type} - ${item.lesson_id || 'test'}`);
    });
    console.log('');
  }

  // 4. Check if user can access via RLS
  console.log('4️⃣ Testing RLS access...');
  const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  const anonClient = createClient(supabaseUrl, anonKey);

  // Try to select with anon key (simulates user access)
  const { data: anonPath, error: anonError } = await anonClient
    .from('user_learning_paths')
    .select('*, items:learning_path_items(*)')
    .eq('user_id', path.user_id)
    .eq('is_active', true)
    .maybeSingle();

  if (anonError) {
    console.error('❌ RLS might be blocking access:', anonError.message);
  } else if (!anonPath) {
    console.log('⚠️  No path returned with anon key (RLS issue or wrong user)');
  } else {
    console.log(`✅ RLS allows access: ${anonPath.items?.length || 0} items loaded\n`);
  }

  console.log('🏁 Debug complete');
}

debug().catch(console.error);
