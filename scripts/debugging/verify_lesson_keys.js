/**
 * Verify that lessons in learning path have lesson_key
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

const ACTIVE_PATH_ID = 'b1d15fd6-f6cc-4fda-9348-39984f8b6113';

async function verify() {
  console.log('🔍 Verifying lesson_key in learning path items...\n');

  const { data: items, error } = await supabase
    .from('learning_path_items')
    .select(`
      *,
      lesson:lessons(id, lesson_key, title)
    `)
    .eq('learning_path_id', ACTIVE_PATH_ID)
    .order('sequence_order')
    .limit(10);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`Found ${items.length} items (showing first 10)\n`);

  items.forEach((item, idx) => {
    console.log(`${idx + 1}. Week ${item.week_number}:`);
    console.log(`   Title: ${item.lesson?.title || 'N/A'}`);
    console.log(`   Lesson Key: ${item.lesson?.lesson_key || '❌ MISSING'}`);
    console.log(`   Lesson ID: ${item.lesson?.id || 'N/A'}`);
    console.log('');
  });

  const missingKeys = items.filter(item => !item.lesson?.lesson_key);
  if (missingKeys.length > 0) {
    console.log(`⚠️  ${missingKeys.length} items missing lesson_key!`);
  } else {
    console.log('✅ All items have lesson_key');
  }
}

verify().catch(console.error);
