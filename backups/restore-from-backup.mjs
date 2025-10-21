import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// RESTORE SCRIPT - Use this to restore backup to a Supabase instance
// Usage: node restore-from-backup.mjs <SUPABASE_URL> <SUPABASE_SERVICE_KEY>

const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('Usage: node restore-from-backup.mjs <SUPABASE_URL> <SUPABASE_SERVICE_KEY>');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function restore() {
  console.log('🔄 Restoring database from backup...');

  const backup = JSON.parse(fs.readFileSync('backups/database-backup-2025-10-21.json', 'utf8'));

  console.log(`📊 Backup contains ${backup.lessons.length} lessons and ${backup.examples.length} examples`);
  console.log(`📅 Backup created: ${backup.created_at}`);

  // Restore lessons
  console.log('\n📚 Restoring lessons...');
  for (const lesson of backup.lessons) {
    const { id, created_at, updated_at, ...lessonData } = lesson;
    const { error } = await supabase
      .from('lessons')
      .upsert(lessonData, { onConflict: 'lesson_key' });

    if (error) {
      console.error(`  ❌ Error restoring ${lesson.lesson_key}: ${error.message}`);
    } else {
      console.log(`  ✓ Restored: ${lesson.lesson_key}`);
    }
  }

  console.log('\n✅ Restore complete!');
  console.log('Note: Examples must be re-uploaded using lesson-specific scripts due to ID mapping.');
}

restore();
