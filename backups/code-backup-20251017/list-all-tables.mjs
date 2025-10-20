import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listTables() {
  console.log('🔍 Listing all tables in database...\n');

  // Query the information schema to list all tables
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`
  });

  if (error) {
    console.error('❌ Error:', error.message);
    console.log('\nTrying alternative method...\n');

    // Try to list known tables
    const tables = [
      'lessons',
      'lessons_backup',
      'lesson_metadata',
      'lesson_sections',
      'section_content',
      'examples',
      'quizzes',
      'quiz_questions'
    ];

    for (const table of tables) {
      const { error: checkError } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (!checkError) {
        console.log(`✅ ${table} - EXISTS`);
      } else {
        console.log(`❌ ${table} - ${checkError.message}`);
      }
    }
    return;
  }

  console.log('Tables found:');
  data.forEach(row => console.log(`  - ${row.table_name}`));
}

listTables().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
