import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function compareKeys() {
  console.log('🔍 Comparing lesson keys between backup and current structure\n');

  // Get backup lesson keys
  const { data: backupLessons } = await supabase
    .from('lessons-backup DO NOT USE')
    .select('lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  // Get current lesson keys
  const { data: currentLessons } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  console.log('BACKUP TABLE KEYS (35 lessons):');
  backupLessons.slice(0, 10).forEach(l => {
    console.log(`  ${l.lesson_key}`);
  });

  console.log('\n\nCURRENT DATABASE KEYS (69 lessons):');
  currentLessons.slice(0, 10).forEach(l => {
    console.log(`  ${l.lesson_key}`);
  });

  console.log('\n\n🔍 Sample lesson with sections:');
  const sampleLesson = currentLessons[0];
  console.log(`Checking: ${sampleLesson.lesson_key}`);

  const { data: metadata } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', sampleLesson.lesson_key)
    .single();

  if (metadata) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', metadata.id);

    console.log(`  Lesson ID: ${metadata.id}`);
    console.log(`  Sections found: ${sections?.length || 0}`);
    if (sections && sections.length > 0) {
      console.log(`  First section:`, sections[0]);
    }
  }
}

compareKeys().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
