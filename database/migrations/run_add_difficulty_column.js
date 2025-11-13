/**
 * Run SQL to add difficulty column
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addColumn() {
  console.log('🚀 Adding difficulty column to lesson_examples table...\n');

  try {
    // Execute raw SQL to add column
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE lesson_examples
        ADD COLUMN IF NOT EXISTS difficulty TEXT;
      `
    });

    if (error) {
      // If rpc doesn't exist, try direct approach
      console.log('⚠️  RPC method not available, using alternative approach...');
      console.log('📝 Please add the difficulty column manually in Supabase dashboard:');
      console.log('   Table: lesson_examples');
      console.log('   Column name: difficulty');
      console.log('   Type: text');
      console.log('\nOr run this SQL in the SQL Editor:');
      console.log('ALTER TABLE lesson_examples ADD COLUMN IF NOT EXISTS difficulty TEXT;');
      console.log('\nOnce done, run: node database/migrations/add_difficulty_field.js');
    } else {
      console.log('✅ Column added successfully!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📝 Manual steps required:');
    console.log('1. Go to Supabase Dashboard → SQL Editor');
    console.log('2. Run: ALTER TABLE lesson_examples ADD COLUMN IF NOT EXISTS difficulty TEXT;');
    console.log('3. Then run: node database/migrations/add_difficulty_field.js');
  }
}

addColumn();
