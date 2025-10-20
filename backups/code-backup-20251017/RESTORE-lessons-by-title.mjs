/**
 * RESTORATION SCRIPT - Restore damaged math lessons from backup table
 * Maps old lesson keys to new ones using title matching
 */

import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function restoreLessons() {
  console.log('🚨 RESTORING DAMAGED LESSONS FROM BACKUP TABLE');
  console.log('='.repeat(70));
  console.log('Mapping strategy: Match by title\n');

  // Get all backup lessons
  const { data: backupLessons, error: backupError } = await supabase
    .from('lessons-backup DO NOT USE')
    .select('*')
    .eq('subject', 'math');

  if (backupError) {
    console.error('❌ Failed to read backup table:', backupError.message);
    process.exit(1);
  }

  // Get all current lessons
  const { data: currentLessons, error: currentError } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'math');

  if (currentError) {
    console.error('❌ Failed to read current lessons:', currentError.message);
    process.exit(1);
  }

  console.log(`✅ Found ${backupLessons.length} backup lessons`);
  console.log(`✅ Found ${currentLessons.length} current lessons\n`);

  let restored = 0;
  let skipped = 0;
  let notMatched = 0;
  let errors = 0;

  for (const backup of backupLessons) {
    console.log(`\n📝 ${backup.lesson_key}: "${backup.title}"`);

    try {
      // Find current lesson by title match
      let current = currentLessons.find(c =>
        c.title.toLowerCase() === backup.title.toLowerCase()
      );

      // Try fuzzy match
      if (!current) {
        current = currentLessons.find(c => {
          const bTitle = backup.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          const cTitle = c.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          return bTitle.includes(cTitle.substring(0, 10)) ||
                 cTitle.includes(bTitle.substring(0, 10));
        });
      }

      if (!current) {
        console.log(`  ❌ NO MATCH - Could not find current lesson`);
        notMatched++;
        continue;
      }

      console.log(`  ✅ Matched to: ${current.lesson_key}`);

      // Get first section
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', current.id)
        .order('order_index')
        .limit(1);

      if (!sections || sections.length === 0) {
        console.log(`  ⏭️  SKIPPED - No sections found`);
        skipped++;
        continue;
      }

      // Get first content block
      const { data: contentBlocks } = await supabase
        .from('section_content')
        .select('id, content')
        .eq('section_id', sections[0].id)
        .order('position')
        .limit(1);

      if (!contentBlocks || contentBlocks.length === 0) {
        console.log(`  ⏭️  SKIPPED - No content blocks found`);
        skipped++;
        continue;
      }

      const currentContent = contentBlocks[0].content;
      const backupContent = backup.content;
      const blockId = contentBlocks[0].id;

      // Check if restoration needed
      if (currentContent.length >= 5000) {
        console.log(`  ✅ OK - Already good (${currentContent.length} chars)`);
        skipped++;
        continue;
      }

      if (!backupContent || backupContent.length < 1000) {
        console.log(`  ⚠️  WARNING - Backup too short (${backupContent?.length || 0} chars)`);
        skipped++;
        continue;
      }

      // RESTORE
      const { error: updateError } = await supabase
        .from('section_content')
        .update({ content: backupContent })
        .eq('id', blockId);

      if (updateError) {
        console.log(`  ❌ ERROR: ${updateError.message}`);
        errors++;
      } else {
        console.log(`  🎉 RESTORED: ${currentContent.length} → ${backupContent.length} chars`);
        restored++;
      }

    } catch (err) {
      console.log(`  ❌ ERROR: ${err.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 RESTORATION SUMMARY:');
  console.log(`  🎉 Restored: ${restored} lessons`);
  console.log(`  ✅ Skipped (already good): ${skipped} lessons`);
  console.log(`  ❌ Not matched: ${notMatched} lessons`);
  console.log(`  ❌ Errors: ${errors}`);
  console.log('='.repeat(70));

  if (restored > 0) {
    console.log('\n✅ RESTORATION COMPLETE!');
    console.log('Run check-damaged-lessons.mjs to verify\n');
  }
}

restoreLessons().catch(err => {
  console.error('❌ RESTORATION FAILED:', err);
  process.exit(1);
});
