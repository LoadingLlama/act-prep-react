#!/usr/bin/env node
/**
 * Sync lesson durations from database to lessonStructure.js file (FIXED VERSION)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('📊 Fetching lesson durations from database...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('lesson_key, duration')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  // Create duration map
  const durationMap = {};
  lessons.forEach(lesson => {
    durationMap[lesson.lesson_key] = lesson.duration;
  });

  console.log(`✅ Found ${lessons.length} lessons with durations\n`);

  // Read lessonStructure.js file
  const structurePath = resolve(__dirname, '../src/data/lessonStructure.js');
  let fileContent = fs.readFileSync(structurePath, 'utf-8');

  console.log('📝 Updating lessonStructure.js...\n');

  let updatedCount = 0;

  // For each lesson in the duration map, add or update the duration field
  for (const [lessonKey, duration] of Object.entries(durationMap)) {
    // Escape special regex characters in lessonKey
    const escapedKey = lessonKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match the entire lesson object - handle both with and without keyTerms
    const lessonPattern = new RegExp(
      `(\\{\\s*id:\\s*'${escapedKey}'[^}]*?)(\\s*\\})`,
      'g'
    );

    fileContent = fileContent.replace(lessonPattern, (match, objectContent, closingBrace) => {
      // Check if duration already exists
      if (objectContent.includes('duration:')) {
        // Replace existing duration
        const updated = objectContent.replace(/,?\s*duration:\s*'[^']*'/, `, duration: '${duration}'`);
        updatedCount++;
        return updated + closingBrace;
      } else {
        // Add duration before the closing brace
        updatedCount++;
        return objectContent + `, duration: '${duration}'` + closingBrace;
      }
    });
  }

  // Write updated content
  fs.writeFileSync(structurePath, fileContent, 'utf-8');

  console.log(`✅ Updated ${updatedCount} lessons in lessonStructure.js\n`);
  console.log('🎉 Sync complete!\n');
}

main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
