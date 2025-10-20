/**
 * EMERGENCY RESTORATION SCRIPT
 * Restores full lesson content from backups/lessons/ JSON files
 * Run this IMMEDIATELY to fix the content deletion from cleanup script
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use the service key directly for emergency restoration
const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const backupsDir = path.join(__dirname, '../backups/lessons');

async function restoreLessons() {
  console.log('🚨 EMERGENCY LESSON RESTORATION');
  console.log('=====================================\n');
  console.log('This script will restore lesson content from backups/lessons/\n');

  // Get all backup JSON files
  const files = fs.readdirSync(backupsDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} backup lesson files\n`);

  let restored = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    try {
      const filePath = path.join(backupsDir, file);
      const lessonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const lessonKey = lessonData.lesson_key;
      const fullContent = lessonData.content;

      console.log(`Processing: ${lessonKey}`);

      // Find the lesson in the database
      const { data: lesson, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id')
        .eq('lesson_key', lessonKey)
        .single();

      if (lessonError || !lesson) {
        console.log(`  ⏭️  Skipping ${lessonKey} - not in modular structure`);
        skipped++;
        continue;
      }

      // Get the lesson sections
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id, position')
        .eq('lesson_id', lesson.id)
        .order('position');

      if (!sections || sections.length === 0) {
        console.log(`  ⏭️  Skipping ${lessonKey} - no sections found`);
        skipped++;
        continue;
      }

      // For now, restore the FIRST section with full content
      // (The cleanup script damaged the first section of each lesson)
      const firstSection = sections[0];

      const { data: contentBlocks } = await supabase
        .from('lesson_section_content')
        .select('id, content')
        .eq('section_id', firstSection.id)
        .order('position')
        .limit(1);

      if (!contentBlocks || contentBlocks.length === 0) {
        console.log(`  ⏭️  Skipping ${lessonKey} - no content blocks found`);
        skipped++;
        continue;
      }

      const blockId = contentBlocks[0].id;
      const currentLength = contentBlocks[0].content.length;

      // Only restore if content is suspiciously short (likely damaged)
      if (currentLength > 5000) {
        console.log(`  ✅ ${lessonKey} - content looks OK (${currentLength} chars)`);
        skipped++;
        continue;
      }

      // Restore the full content
      const { error: updateError } = await supabase
        .from('lesson_section_content')
        .update({ content: fullContent })
        .eq('id', blockId);

      if (updateError) {
        console.log(`  ❌ ${lessonKey}: ${updateError.message}`);
        errors++;
      } else {
        console.log(`  ✅ ${lessonKey}: ${currentLength} → ${fullContent.length} chars (RESTORED)`);
        restored++;
      }

    } catch (err) {
      console.log(`  ❌ ${file}: ${err.message}`);
      errors++;
    }
  }

  console.log('\n=====================================');
  console.log(`✅ Restored: ${restored} lessons`);
  console.log(`⏭️  Skipped: ${skipped} lessons (already good or not found)`);
  console.log(`❌ Errors: ${errors}`);
  console.log('\n🎉 RESTORATION COMPLETE!');
}

restoreLessons().catch(err => {
  console.error('❌ RESTORATION FAILED:', err);
  process.exit(1);
});
