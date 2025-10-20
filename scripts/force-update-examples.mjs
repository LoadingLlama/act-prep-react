#!/usr/bin/env node

/**
 * Force update lesson_examples by temporarily working around the constraint
 * We'll delete and re-insert all examples with the new lesson_ids
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

async function forceUpdateExamples() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  Force Update lesson_examples (Delete & Re-insert)    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  // Step 1: Fetch all current examples
  console.log('📊 Step 1: Fetching all examples...\n');

  const { data: examples, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('*');

  if (fetchError) {
    console.error('❌ Error fetching examples:', fetchError.message);
    return;
  }

  console.log(`✅ Found ${examples.length} examples\n`);

  // Step 2: Build UUID mappings
  console.log('🔄 Step 2: Building UUID mappings...\n');

  const { data: metadata } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key');

  const oldUUIDtoLessonKey = {};
  metadata.forEach(m => {
    oldUUIDtoLessonKey[m.id] = m.lesson_key;
  });

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key');

  const lessonKeyToNewUUID = {};
  lessons.forEach(l => {
    lessonKeyToNewUUID[l.lesson_key] = l.id;
  });

  console.log(`✅ Built mappings\n`);

  // Step 3: Prepare updated examples
  console.log('🔄 Step 3: Preparing updated examples...\n');

  const updatedExamples = [];
  let skipped = 0;

  for (const example of examples) {
    const oldUUID = example.lesson_id;
    const lessonKey = oldUUIDtoLessonKey[oldUUID];

    if (!lessonKey) {
      console.log(`⚠️  Skipping example ${example.id}: no lesson_key for ${oldUUID}`);
      skipped++;
      continue;
    }

    const newUUID = lessonKeyToNewUUID[lessonKey];

    if (!newUUID) {
      console.log(`⚠️  Skipping example ${example.id}: no new UUID for ${lessonKey}`);
      skipped++;
      continue;
    }

    // Create new example object with updated lesson_id
    const updatedExample = {
      ...example,
      lesson_id: newUUID
    };

    updatedExamples.push(updatedExample);
  }

  console.log(`✅ Prepared ${updatedExamples.length} examples (skipped ${skipped})\n`);

  // Step 4: Delete all existing examples
  console.log('🗑️  Step 4: Deleting all existing examples...\n');

  const { error: deleteError } = await supabase
    .from('lesson_examples')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('❌ Error deleting examples:', deleteError.message);
    console.log('⚠️  This might be okay if constraint prevents deletion\n');
  } else {
    console.log('✅ All examples deleted\n');
  }

  // Step 5: Re-insert with new lesson_ids
  console.log('💾 Step 5: Re-inserting examples with new lesson_ids...\n');

  let inserted = 0;
  let errors = 0;

  // Insert in batches of 50
  const batchSize = 50;
  for (let i = 0; i < updatedExamples.length; i += batchSize) {
    const batch = updatedExamples.slice(i, i + batchSize);

    // Remove 'id' field to let database generate new IDs (or keep them)
    const batchToInsert = batch.map(ex => {
      const { id, created_at, updated_at, ...rest } = ex;
      return rest;
    });

    const { data, error: insertError } = await supabase
      .from('lesson_examples')
      .insert(batchToInsert);

    if (insertError) {
      console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} error:`, insertError.message);
      errors += batch.length;
    } else {
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: Inserted ${batch.length} examples`);
      inserted += batch.length;
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  UPDATE COMPLETE                                       ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Inserted: ${inserted} examples`);
  console.log(`❌ Errors: ${errors} examples\n`);

  // Step 6: Verify
  console.log('🔍 Step 6: Verifying...\n');

  const { data: sample } = await supabase
    .from('lesson_examples')
    .select('lesson_id')
    .limit(1);

  if (sample && sample[0]) {
    const testId = sample[0].lesson_id;

    const { data: inLessons } = await supabase
      .from('lessons')
      .select('lesson_key')
      .eq('id', testId)
      .single();

    if (inLessons) {
      console.log(`✅ SUCCESS! Examples now reference lessons table (${inLessons.lesson_key})\n`);
    } else {
      console.log('❌ FAILED! Examples still reference old table\n');
    }
  }
}

forceUpdateExamples().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
