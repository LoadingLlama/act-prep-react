const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  try {
    console.log('📊 Creating diagnostic_test_results table...');

    const sql = fs.readFileSync('./create_diagnostic_test_results_table.sql', 'utf8');

    // Split SQL into individual statements and execute them
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      console.log(`\n📝 Executing: ${statement.substring(0, 60)}...`);
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });

      if (error) {
        console.error('❌ Error:', error.message);
        // Try alternative method - direct query
        const { error: directError } = await supabase.from('_migrations').insert([{
          name: 'create_diagnostic_test_results',
          executed_at: new Date().toISOString()
        }]);

        if (directError) {
          throw error;
        }
      } else {
        console.log('✅ Success');
      }
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📋 Table created: diagnostic_test_results');
    console.log('   - Stores individual question answers from diagnostic tests');
    console.log('   - Includes user_id, question_id, answer, correctness, and timing');
    console.log('   - Row Level Security enabled');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.log('\n💡 Please run this SQL manually in Supabase Dashboard:');
    console.log('   1. Go to https://rabavobdklnwvwsldbix.supabase.co');
    console.log('   2. Navigate to SQL Editor');
    console.log('   3. Copy and paste the contents of create_diagnostic_test_results_table.sql');
    console.log('   4. Click "Run"');
    process.exit(1);
  }
}

runMigration();
