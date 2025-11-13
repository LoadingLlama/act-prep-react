/**
 * Check practice_questions table structure
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPracticeTable() {
  console.log('🔍 Checking practice_questions table...\n');

  // Try to get any existing practice questions
  const { data, error } = await supabase
    .from('practice_questions')
    .select('*')
    .limit(5);

  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('📚 Sample Practice Questions:');
    console.table(data);
  }

  // Check for sentence-structure practice
  const { data: ssData, error: ssError } = await supabase
    .from('practice_questions')
    .select('*')
    .ilike('lesson_id', '%sentence%');

  if (ssError) {
    console.error('❌ Error:', ssError);
  } else {
    console.log('\n📝 Sentence Structure Practice Questions:');
    console.table(ssData);
  }
}

checkPracticeTable();
