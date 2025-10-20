import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkBackupTable() {
  console.log('🔍 Checking lessons_backup table...\n');

  // Get all records from lessons_backup
  const { data, error } = await supabase
    .from('lessons_backup')
    .select('*')
    .eq('subject', 'math')
    .limit(5);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`Found ${data.length} records (showing first 5)\n`);

  data.forEach(lesson => {
    console.log(`Lesson: ${lesson.lesson_key}`);
    console.log(`Title: ${lesson.title}`);
    console.log(`Content length: ${lesson.content?.length || 0} chars`);
    console.log(`Has full content: ${lesson.content?.length > 5000 ? '✅ YES' : '⚠️ NO'}`);
    console.log('---');
  });

  // Count total math lessons in backup
  const { count } = await supabase
    .from('lessons_backup')
    .select('*', { count: 'exact', head: true })
    .eq('subject', 'math');

  console.log(`\nTotal math lessons in backup: ${count}`);
}

checkBackupTable().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
