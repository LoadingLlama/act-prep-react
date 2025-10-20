#!/usr/bin/env node

/**
 * Fix lesson_examples table to reference the new lessons table UUIDs
 * instead of the old lesson_metadata table UUIDs
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixExamplesReferences() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  Fixing lesson_examples to reference lessons table    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  // Step 1: Get all examples with their current lesson_ids
  console.log('📊 Step 1: Fetching all examples...\n');

  const { data: examples, error: examplesError } = await supabase
    .from('lesson_examples')
    .select('*');

  if (examplesError) {
    console.error('❌ Error fetching examples:', examplesError.message);
    return;
  }

  console.log(`✅ Found ${examples.length} examples\n`);

  // Step 2: Build mapping from old metadata UUIDs to lesson_keys
  console.log('🔄 Step 2: Building UUID mapping from lesson_metadata...\n');

  const { data: metadata, error: metaError } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key');

  if (metaError) {
    console.error('❌ Error fetching metadata:', metaError.message);
    return;
  }

  const oldUUIDtoLessonKey = {};
  metadata.forEach(m => {
    oldUUIDtoLessonKey[m.id] = m.lesson_key;
  });

  console.log(`✅ Mapped ${Object.keys(oldUUIDtoLessonKey).length} lesson_metadata UUIDs\n`);

  // Step 3: Get new lessons table UUIDs by lesson_key
  console.log('🔄 Step 3: Getting new lessons table UUIDs...\n');

  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, lesson_key');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError.message);
    return;
  }

  const lessonKeyToNewUUID = {};
  lessons.forEach(l => {
    lessonKeyToNewUUID[l.lesson_key] = l.id;
  });

  console.log(`✅ Mapped ${Object.keys(lessonKeyToNewUUID).length} lessons table UUIDs\n`);

  // Step 4: Update each example's lesson_id
  console.log('💾 Step 4: Updating examples with new lesson_ids...\n');

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const example of examples) {
    const oldUUID = example.lesson_id;
    const lessonKey = oldUUIDtoLessonKey[oldUUID];

    if (!lessonKey) {
      console.log(`⚠️  Example ${example.id}: Could not find lesson_key for old UUID ${oldUUID}`);
      skipped++;
      continue;
    }

    const newUUID = lessonKeyToNewUUID[lessonKey];

    if (!newUUID) {
      console.log(`⚠️  Example ${example.id}: Could not find new UUID for lesson_key ${lessonKey}`);
      skipped++;
      continue;
    }

    // Update the example
    const { error: updateError } = await supabase
      .from('lesson_examples')
      .update({ lesson_id: newUUID })
      .eq('id', example.id);

    if (updateError) {
      console.error(`❌ Error updating example ${example.id}:`, updateError.message);
      errors++;
    } else {
      console.log(`✅ Updated example for lesson ${lessonKey}: ${oldUUID} → ${newUUID}`);
      updated++;
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  UPDATE COMPLETE                                       ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Updated: ${updated} examples`);
  console.log(`⚠️  Skipped: ${skipped} examples`);
  console.log(`❌ Errors: ${errors} examples\n`);

  // Step 5: Verify the fix
  console.log('🔍 Step 5: Verifying the fix...\n');

  const { data: sampleExample } = await supabase
    .from('lesson_examples')
    .select('lesson_id')
    .limit(1);

  if (sampleExample && sampleExample[0]) {
    const testId = sampleExample[0].lesson_id;

    const { data: inLessons } = await supabase
      .from('lessons')
      .select('lesson_key')
      .eq('id', testId)
      .single();

    if (inLessons) {
      console.log(`✅ Verification passed! Example now references lessons table (${inLessons.lesson_key})\n`);
    } else {
      console.log('❌ Verification failed! Examples still reference old table\n');
    }
  }
}

fixExamplesReferences().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
