/**
 * Check what lessons exist in the database
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLessons() {
  console.log('🔍 Checking lessons table...\n');

  // Check lessons table
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, subject')
    .eq('subject', 'english')
    .eq('lesson_key', 'sentence-structure');

  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('📚 Sentence Structure Lessons:');
    console.table(lessons);
  }

  // Check all English lessons
  const { data: allLessons, error: error2 } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .eq('subject', 'english')
    .order('order_index');

  if (error2) {
    console.error('❌ Error:', error2);
  } else {
    console.log('\n📚 All English Lessons:');
    console.table(allLessons);
  }
}

checkLessons();
