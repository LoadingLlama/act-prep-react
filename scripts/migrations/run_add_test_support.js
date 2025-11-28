/**
 * Run SQL to add test support to learning_path_items table
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runSQL() {
  console.log('🔧 Adding test support to learning_path_items table...\n');

  // Read SQL file
  const sql = fs.readFileSync('./add_test_support_to_learning_path.sql', 'utf8');

  // Split by semicolons and run each statement
  const statements = sql.split(';').filter(s => s.trim() && !s.trim().startsWith('--'));

  for (const statement of statements) {
    const trimmed = statement.trim();
    if (!trimmed) continue;

    console.log(`Running: ${trimmed.substring(0, 60)}...`);

    const { data, error } = await supabase.rpc('exec_sql', { sql_query: trimmed });

    if (error) {
      console.error('❌ Error:', error.message);

      // Try using raw query instead
      try {
        const { data: rawData, error: rawError } = await supabase
          .from('learning_path_items')
          .select('*')
          .limit(0);

        console.log('Trying alternative approach...');
      } catch (e) {
        console.error('Alternative failed too');
      }
    } else {
      console.log('✅ Success\n');
    }
  }

  console.log('🏁 Done! Now run: node populate_active_path.js');
}

runSQL().catch(console.error);
