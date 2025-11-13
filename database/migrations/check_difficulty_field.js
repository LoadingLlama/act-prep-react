/**
 * Check if difficulty field exists in lesson_examples
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDifficulty() {
  console.log('🔍 Checking difficulty field...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  const { data, error } = await supabase
    .from('lesson_examples')
    .select('id, position, title, difficulty')
    .eq('lesson_id', lessonId)
    .order('position')
    .limit(5);

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('📋 Sample records:');
    console.table(data);
  }
}

checkDifficulty();
