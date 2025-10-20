/**
 * FINAL RESTORATION SCRIPT
 * Restores damaged math lessons by INSERTING backup content into section_content table
 */

import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function restoreAllLessons() {
  console.log('🚨 FINAL RESTORATION - INSERTING BACKUP CONTENT');
  console.log('='.repeat(70));

  // Get all backup lessons
  const { data: backupLessons } = await supabase
    .from('lessons-backup DO NOT USE')
    .select('*')
    .eq('subject', 'math');

  // Get all current lessons
  const { data: currentLessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'math');

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
        c.title.toLowerCase().trim() === backup.title.toLowerCase().trim()
      );

      // Fuzzy match
      if (!current) {
        current = currentLessons.find(c => {
          const bTitle = backup.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          const cTitle = c.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          return bTitle.includes(cTitle.substring(0, Math.min(10, cTitle.length))) ||
                 cTitle.includes(bTitle.substring(0, Math.min(10, bTitle.length)));
        });
      }

      if (!current) {
        console.log(`  ❌ NO MATCH`);
        notMatched++;
        continue;
      }

      console.log(`  ✅ Matched to: ${current.lesson_key}`);

      // Get sections for this lesson
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', current.id)
        .order('order_index')
        .limit(1);

      if (!sections || sections.length === 0) {
        console.log(`  ❌ No sections found`);
        skipped++;
        continue;
      }

      const sectionId = sections[0].id;

      // Check existing content
      const { data: existingContent } = await supabase
        .from('lesson_section_content')
        .select('id, content')
        .eq('section_id', sectionId)
        .order('order_index');

      const backupContent = backup.content || '';

      if (backupContent.length < 1000) {
        console.log(`  ⚠️  Backup too short (${backupContent.length} chars)`);
        skipped++;
        continue;
      }

      // If content exists and is damaged, UPDATE it
      if (existingContent && existingContent.length > 0) {
        const currentLength = existingContent[0].content?.length || 0;

        if (currentLength >= 5000) {
          console.log(`  ✅ Already good (${currentLength} chars)`);
          skipped++;
          continue;
        }

        // UPDATE existing content
        const { error: updateError } = await supabase
          .from('lesson_section_content')
          .update({ content: backupContent })
          .eq('id', existingContent[0].id);

        if (updateError) {
          console.log(`  ❌ UPDATE ERROR: ${updateError.message}`);
          errors++;
        } else {
          console.log(`  🎉 UPDATED: ${currentLength} → ${backupContent.length} chars`);
          restored++;
        }
      } else {
        // INSERT new content block
        const { error: insertError } = await supabase
          .from('lesson_section_content')
          .insert({
            section_id: sectionId,
            content_type: 'html',
            content: backupContent,
            order_index: 0
          });

        if (insertError) {
          console.log(`  ❌ INSERT ERROR: ${insertError.message}`);
          errors++;
        } else {
          console.log(`  🎉 INSERTED: ${backupContent.length} chars`);
          restored++;
        }
      }

    } catch (err) {
      console.log(`  ❌ ERROR: ${err.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 RESTORATION SUMMARY:');
  console.log(`  🎉 Restored: ${restored} lessons`);
  console.log(`  ⏭️  Skipped: ${skipped} lessons`);
  console.log(`  ❌ Not matched: ${notMatched} lessons`);
  console.log(`  ❌ Errors: ${errors}`);
  console.log('='.repeat(70));

  if (restored > 0) {
    console.log('\n✅ RESTORATION COMPLETE!');
    console.log('🔍 Run check-damaged-lessons.mjs to verify\n');
  }
}

restoreAllLessons().catch(err => {
  console.error('❌ RESTORATION FAILED:', err);
  process.exit(1);
});
