/**
 * COMPREHENSIVE RESTORATION
 * Restores from BOTH backup table AND local JSON files
 */

import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function comprehensiveRestore() {
  console.log('🚨 COMPREHENSIVE RESTORATION FROM ALL SOURCES');
  console.log('='.repeat(70));

  // SOURCE 1: Backup table
  const { data: backupTableLessons } = await supabase
    .from('lessons-backup DO NOT USE')
    .select('*')
    .eq('subject', 'math');

  // SOURCE 2: Local JSON files
  const backupsDir = path.join(__dirname, '../backups/lessons');
  const jsonFiles = fs.readdirSync(backupsDir).filter(f => f.endsWith('.json'));

  const localBackups = [];
  for (const file of jsonFiles) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(backupsDir, file), 'utf8'));
      localBackups.push(content);
    } catch (err) {
      // Skip invalid files
    }
  }

  console.log(`✅ Backup table: ${backupTableLessons.length} lessons`);
  console.log(`✅ Local JSON files: ${localBackups.length} lessons`);

  // Get all current lessons
  const { data: currentLessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'math');

  console.log(`✅ Current database: ${currentLessons.length} lessons\n`);

  let restored = 0;
  let skipped = 0;
  let errors = 0;

  // Combine all backup sources
  const allBackups = [
    ...backupTableLessons.map(l => ({ source: 'table', ...l })),
    ...localBackups.map(l => ({ source: 'json', ...l }))
  ];

  for (const backup of allBackups) {
    const backupKey = backup.lesson_key;

    // Try to find matching current lesson by key
    let current = currentLessons.find(c => c.lesson_key === backupKey);

    // Try by title match
    if (!current) {
      current = currentLessons.find(c =>
        c.title.toLowerCase().replace(/[^a-z0-9]/g, '') ===
        backup.title?.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
    }

    // Try fuzzy title match
    if (!current && backup.title) {
      current = currentLessons.find(c => {
        const bTitle = backup.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cTitle = c.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        return bTitle.includes(cTitle.substring(0, Math.min(10, cTitle.length))) ||
               cTitle.includes(bTitle.substring(0, Math.min(10, bTitle.length)));
      });
    }

    if (!current) continue;

    try {
      // Get sections
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', current.id)
        .order('order_index')
        .limit(1);

      if (!sections || sections.length === 0) continue;

      // Check existing content
      const { data: existingContent } = await supabase
        .from('section_content')
        .select('id, content')
        .eq('section_id', sections[0].id)
        .order('order_index');

      const backupContent = backup.content || '';
      if (backupContent.length < 1000) continue;

      const currentLength = existingContent?.[0]?.content?.length || 0;

      // Only restore if damaged
      if (currentLength >= 5000) {
        skipped++;
        continue;
      }

      // Check if backup is actually better
      if (backupContent.length <= currentLength) {
        skipped++;
        continue;
      }

      if (existingContent && existingContent.length > 0) {
        // UPDATE
        const { error } = await supabase
          .from('section_content')
          .update({ content: backupContent })
          .eq('id', existingContent[0].id);

        if (!error) {
          console.log(`✅ ${current.lesson_key}: ${currentLength} → ${backupContent.length} chars (${backup.source})`);
          restored++;
        } else {
          errors++;
        }
      } else {
        // INSERT
        const { error } = await supabase
          .from('section_content')
          .insert({
            section_id: sections[0].id,
            content_type: 'html',
            content: backupContent,
            order_index: 0
          });

        if (!error) {
          console.log(`✅ ${current.lesson_key}: INSERTED ${backupContent.length} chars (${backup.source})`);
          restored++;
        } else {
          errors++;
        }
      }
    } catch (err) {
      errors++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 Restored: ${restored} lessons`);
  console.log(`⏭️  Skipped: ${skipped} lessons`);
  console.log(`❌ Errors: ${errors}`);
  console.log('='.repeat(70));
}

comprehensiveRestore().catch(err => {
  console.error('❌ FAILED:', err);
  process.exit(1);
});
