#!/usr/bin/env node

/**
 * Efficient Batch Processor for All 116 Lessons
 *
 * This script processes all lessons by launching Task agents
 * one subject at a time for better management.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const workDir = path.join(__dirname, '../restructuring-work');
const restructuredDir = path.join(workDir, 'restructured');

console.log('\n╔═══════════════════════════════════════════════════╗');
console.log('║    Processing All 116 Lessons                     ║');
console.log('║    Applying Golden Template Structure             ║');
console.log('╚═══════════════════════════════════════════════════╝\n');

console.log('This script will update the database with restructured content.');
console.log('It assumes all lessons have been restructured by Task agents.\n');

async function updateDatabaseWithRestructuredLessons() {
  // Get all restructured files
  const restructuredFiles = fs.readdirSync(restructuredDir)
    .filter(f => f.endsWith('.html'));

  console.log(`Found ${restructuredFiles.length} restructured lessons\n`);

  let updated = 0;
  let errors = 0;

  for (const file of restructuredFiles) {
    try {
      // Extract lesson key from filename (e.g., "math-absolute-value.html" -> "absolute-value")
      const lessonKey = file.replace(/^(math|science|english|reading)-/, '').replace('.html', '');

      console.log(`Processing: ${lessonKey}...`);

      // Get lesson from database
      const { data: lesson } = await supabase
        .from('lesson_metadata')
        .select('id')
        .eq('lesson_key', lessonKey)
        .single();

      if (!lesson) {
        console.log(`  ⚠️  Lesson not found in database: ${lessonKey}`);
        errors++;
        continue;
      }

      // Get section
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id)
        .limit(1);

      if (!sections || sections.length === 0) {
        console.log(`  ⚠️  No sections found for: ${lessonKey}`);
        errors++;
        continue;
      }

      // Read restructured content
      const restructuredHTML = fs.readFileSync(path.join(restructuredDir, file), 'utf8');

      // Update database
      const { error } = await supabase
        .from('lesson_section_content')
        .update({ content: restructuredHTML })
        .eq('section_id', sections[0].id);

      if (error) {
        console.log(`  ❌ Error updating: ${error.message}`);
        errors++;
      } else {
        console.log(`  ✅ Updated (${restructuredHTML.length} chars)`);
        updated++;
      }

    } catch (err) {
      console.log(`  ❌ Exception: ${err.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Successfully updated: ${updated} lessons`);
  console.log(`❌ Errors: ${errors} lessons`);
  console.log(`📊 Total: ${restructuredFiles.length} lessons processed\n`);
}

// Check if we should run
const args = process.argv.slice(2);
if (args.includes('--update-db')) {
  console.log('⚠️  WARNING: This will update the database!');
  console.log('   Make sure all lessons are restructured first.\n');
  updateDatabaseWithRestructuredLessons();
} else {
  console.log('📋 To update the database with restructured lessons, run:');
  console.log('   node scripts/process-all-lessons-efficiently.mjs --update-db\n');
  console.log('⚠️  First, ensure all lessons are restructured using Task agents.\n');
}
