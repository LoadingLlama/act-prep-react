import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  console.log('🔍 Checking section_content table schema\n');

  // Get one record to see what columns exist
  const { data, error } = await supabase
    .from('section_content')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log('✅ Columns in section_content table:');
    Object.keys(data[0]).forEach(col => {
      console.log(`  - ${col}: ${typeof data[0][col]}`);
    });

    console.log('\n📋 Sample record:');
    console.log(JSON.stringify(data[0], null, 2));
  } else {
    console.log('⚠️  No records found in section_content table');
  }
}

checkSchema().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
