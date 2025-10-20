#!/usr/bin/env node

/**
 * Delete duplicate math lessons from database
 * Keep only the lesson_keys that are referenced in lessonStructure.js
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Canonical list from lessonStructure.js - these are the ONLY ones we should keep
const VALID_MATH_LESSON_KEYS = [
  'introduction-to-act-math',
  'backsolving',
  'substitution',
  'geometry-angles',
  '2.2',
  '2.3',
  '2.4',
  '2.5',
  '3.1',
  '3.2',
  '3.3',
  '3.4',
  '3.5',
  '3.6',
  'systems-equations',
  'quadratics',
  'functions',
  'transforming-functions',
  'exponential-growth',
  'sequences',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '6.1',
  '6.2',
  '6.3',
  '6.4',
  'trigonometry',
  'complex-numbers',
  'matrices',
  'vectors',
  'word-problems',
  'miscellaneous-topics',
  // Practice lessons
  'backsolving-practice',
  'substitution-practice',
  'geometry-angles-practice',
  'geometry-shapes-practice'
];

async function deleteDuplicateMathLessons() {
  try {
    console.log('\n🔍 Finding all math lessons in database...');

    // Get all math lessons
    const { data: allLessons, error: fetchError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('subject', 'math');

    if (fetchError) throw fetchError;

    console.log(`📊 Found ${allLessons.length} math lessons in database`);
    console.log(`✅ Expected ${VALID_MATH_LESSON_KEYS.length} math lessons\n`);

    // Identify duplicates
    const lessonsToDelete = allLessons.filter(
      lesson => !VALID_MATH_LESSON_KEYS.includes(lesson.lesson_key)
    );

    console.log(`🗑️  Will delete ${lessonsToDelete.length} duplicate/invalid lessons:\n`);

    lessonsToDelete.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.lesson_key} - ${lesson.title}`);
    });

    if (lessonsToDelete.length === 0) {
      console.log('\n✅ No duplicates found! Database is clean.');
      return;
    }

    console.log('\n⚠️  DELETION PREVIEW - These lessons will be permanently deleted!');
    console.log('Press Ctrl+C to cancel or wait 5 seconds to continue...\n');

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🚀 Starting deletion...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const lesson of lessonsToDelete) {
      try {
        // Delete from lesson_metadata (cascade should handle sections and content)
        const { error: deleteError } = await supabase
          .from('lesson_metadata')
          .delete()
          .eq('id', lesson.id);

        if (deleteError) {
          console.error(`❌ Failed to delete ${lesson.lesson_key}: ${deleteError.message}`);
          errorCount++;
        } else {
          console.log(`✓ Deleted: ${lesson.lesson_key} - ${lesson.title}`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Error deleting ${lesson.lesson_key}:`, err.message);
        errorCount++;
      }
    }

    console.log(`\n📊 Deletion Summary:`);
    console.log(`  ✅ Successfully deleted: ${successCount}`);
    console.log(`  ❌ Failed: ${errorCount}`);
    console.log(`  📉 Reduced from ${allLessons.length} to ${allLessons.length - successCount} lessons\n`);

    // Verify final count
    const { data: finalLessons, error: finalError } = await supabase
      .from('lesson_metadata')
      .select('lesson_key')
      .eq('subject', 'math');

    if (!finalError) {
      console.log(`✅ Final math lesson count: ${finalLessons.length}`);
      console.log(`   Expected: ${VALID_MATH_LESSON_KEYS.length}\n`);

      if (finalLessons.length === VALID_MATH_LESSON_KEYS.length) {
        console.log('🎉 SUCCESS! Database now has exactly the expected number of math lessons.\n');
      } else {
        console.log('⚠️  WARNING: Final count does not match expected count. Manual review needed.\n');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteDuplicateMathLessons();
