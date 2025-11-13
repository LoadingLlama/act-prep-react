/**
 * Check what tables exist in the database
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Checking database tables...\n');

  // Check for practice-related tables
  const { data, error } = await supabase
    .rpc('list_tables');

  if (error) {
    console.log('RPC not available, trying direct query...');

    // Try to query information_schema
    const { data: tables, error: err2 } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (err2) {
      console.error('❌ Error:', err2);
    } else {
      console.log('📚 Tables:');
      console.table(tables);
    }
  } else {
    console.log('📚 Tables:');
    console.table(data);
  }

  // Check specifically for lesson examples
  const { data: examples, error: exError } = await supabase
    .from('lesson_examples')
    .select('id, lesson_id, position, title')
    .eq('lesson_id', 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac')
    .order('position');

  if (exError) {
    console.error('❌ Error fetching examples:', exError);
  } else {
    console.log('\n📝 Sentence Structure Examples:');
    console.table(examples);
  }
}

checkTables();
