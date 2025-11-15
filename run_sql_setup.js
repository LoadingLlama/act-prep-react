const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSQL() {
  console.log('📋 Reading FINAL_COMPLETE_SETUP.sql...');

  const sql = fs.readFileSync('FINAL_COMPLETE_SETUP.sql', 'utf8');

  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];

    // Skip comment-only statements
    if (statement.startsWith('--')) continue;

    // Get first line for display
    const firstLine = statement.split('\n')[0].substring(0, 60);
    console.log(`[${i + 1}/${statements.length}] ${firstLine}...`);

    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: statement + ';'
      });

      if (error) {
        // Check if it's a "already exists" error - these are OK
        if (error.message.includes('already exists') ||
            error.message.includes('does not exist')) {
          console.log('  ⚠️  Skipped (already exists)');
          successCount++;
        } else {
          console.error('  ❌ Error:', error.message);
          errorCount++;
        }
      } else {
        console.log('  ✅ Success');
        successCount++;
      }
    } catch (err) {
      console.error('  ❌ Exception:', err.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(60) + '\n');

  if (errorCount === 0) {
    console.log('🎉 All tables created successfully!');
  } else {
    console.log('⚠️  Some errors occurred. Check the output above.');
  }
}

runSQL().catch(console.error);
