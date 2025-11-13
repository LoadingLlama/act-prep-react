/**
 * Try to find or reconstruct UUID to TEXT ID mapping
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  console.log('🔍 Searching for UUID to TEXT ID mapping...\n');

  // Check for backup tables
  const tablesToCheck = [
    'lessons_backup',
    'lessons_old',
    '_lessons',
    'lessons_uuid'
  ];

  for (const table of tablesToCheck) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);

    if (!error) {
      console.log(`✅ Found table: ${table}`);
      const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      console.log(`   Records: ${count}\n`);
    }
  }

  // Check if we can find the mapping via lesson_examples metadata
  console.log('📋 Analyzing lesson_examples to infer mapping...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(10);

  if (examples && examples.length > 0) {
    console.log('Sample lesson_example record:');
    console.log(JSON.stringify(examples[0], null, 2));
  }

  // Count unique UUID lesson IDs
  const { data: allExamples } = await supabase
    .from('lesson_examples')
    .select('lesson_id');

  if (allExamples) {
    const uniqueUUIDs = [...new Set(allExamples.map(e => e.lesson_id))];
    console.log(`\n📊 Found ${uniqueUUIDs.length} unique UUID lesson IDs in examples`);
    console.log(`📚 Have ${93} TEXT lesson IDs in lessons table`);

    if (uniqueUUIDs.length <= 100) {
      console.log('\nAll unique UUIDs:');
      uniqueUUIDs.forEach((uuid, i) => {
        console.log(`   ${i + 1}. ${uuid}`);
      });
    }
  }

  console.log('\n💡 Recommendation:');
  console.log('   Since we don\'t have a direct mapping, we have two options:');
  console.log('   1. Delete all lesson_examples and rebuild them');
  console.log('   2. Find a backup file that contains the UUID→TEXT mapping');
  console.log('   3. Check Supabase backups/point-in-time recovery\n');
}

main();
