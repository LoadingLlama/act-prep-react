/**
 * RESTORATION SCRIPT - Restore damaged math lessons from backup table
 * Restores content from "lessons-backup DO NOT USE" table to current modular structure
 */

import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function restoreLessons() {
  console.log('🚨 RESTORING DAMAGED LESSONS FROM BACKUP TABLE');
  console.log('='.repeat(60));
  console.log('Source: lessons-backup DO NOT USE table\n');

  // Get all math lessons from backup table
  const { data: backupLessons, error: backupError } = await supabase
    .from('lessons-backup DO NOT USE')
    .select('*')
    .eq('subject', 'math');

  if (backupError) {
    console.error('❌ Failed to read backup table:', backupError.message);
    process.exit(1);
  }

  console.log(`✅ Found ${backupLessons.length} math lessons in backup\n`);

  let restored = 0;
  let skipped = 0;
  let notFound = 0;
  let errors = 0;

  for (const backupLesson of backupLessons) {
    const lessonKey = backupLesson.lesson_key;
    console.log(`\n📝 Processing: ${lessonKey}`);

    try {
      // Find the lesson in the current modular structure
      const { data: currentLesson, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id')
        .eq('lesson_key', lessonKey)
        .single();

      if (lessonError || !currentLesson) {
        console.log(`  ⏭️  SKIPPED - Not in current database structure`);
        notFound++;
        continue;
      }

      // Get the first section of this lesson
      const { data: sections, error: sectionError } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', currentLesson.id)
        .order('position')
        .limit(1);

      if (sectionError || !sections || sections.length === 0) {
        console.log(`  ⏭️  SKIPPED - No sections found`);
        skipped++;
        continue;
      }

      const sectionId = sections[0].id;

      // Get the first content block of the first section
      const { data: contentBlocks, error: contentError } = await supabase
        .from('section_content')
        .select('id, content')
        .eq('section_id', sectionId)
        .order('position')
        .limit(1);

      if (contentError || !contentBlocks || contentBlocks.length === 0) {
        console.log(`  ⏭️  SKIPPED - No content blocks found`);
        skipped++;
        continue;
      }

      const currentContent = contentBlocks[0].content;
      const backupContent = backupLesson.content;
      const blockId = contentBlocks[0].id;

      // Check if current content is damaged (< 3000 chars)
      if (currentContent.length >= 3000) {
        console.log(`  ✅ OK - Content already good (${currentContent.length} chars)`);
        skipped++;
        continue;
      }

      // Check if backup has sufficient content
      if (!backupContent || backupContent.length < 1000) {
        console.log(`  ⚠️  WARNING - Backup content too short (${backupContent?.length || 0} chars)`);
        skipped++;
        continue;
      }

      // Restore the content
      const { error: updateError } = await supabase
        .from('section_content')
        .update({ content: backupContent })
        .eq('id', blockId);

      if (updateError) {
        console.log(`  ❌ ERROR: ${updateError.message}`);
        errors++;
      } else {
        console.log(`  ✅ RESTORED: ${currentContent.length} → ${backupContent.length} chars`);
        restored++;
      }

    } catch (err) {
      console.log(`  ❌ ERROR: ${err.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESTORATION SUMMARY:');
  console.log(`  ✅ Restored: ${restored} lessons`);
  console.log(`  ⏭️  Skipped (already good or insufficient backup): ${skipped} lessons`);
  console.log(`  ❌ Not found in current structure: ${notFound} lessons`);
  console.log(`  ❌ Errors: ${errors}`);
  console.log('='.repeat(60));

  if (restored > 0) {
    console.log('\n🎉 RESTORATION COMPLETE!');
    console.log('✅ Run check-damaged-lessons.mjs to verify all lessons are fixed\n');
  } else {
    console.log('\n⚠️  No lessons were restored. Check the output above for details.\n');
  }
}

restoreLessons().catch(err => {
  console.error('❌ RESTORATION FAILED:', err);
  process.exit(1);
});
