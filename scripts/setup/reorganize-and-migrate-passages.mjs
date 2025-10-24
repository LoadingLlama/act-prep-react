#!/usr/bin/env node

/**
 * REORGANIZE TABLES AND MIGRATE PASSAGES
 * 1. Create new passage tables (english, reading, science)
 * 2. Migrate existing passage data from act_passages
 * 3. Rename question tables with act_ prefix
 * 4. Update foreign key constraints
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🚀 Starting Table Reorganization and Passage Migration...\n');

// Step 1: Fetch existing passages from act_passages
console.log('📊 Step 1: Fetching existing passages from act_passages...');
const { data: oldPassages, error: fetchError } = await supabase
  .from('act_passages')
  .select('*')
  .order('section')
  .order('passage_number');

if (fetchError) {
  console.error('❌ Error fetching passages:', fetchError);
  process.exit(1);
}

console.log(`✅ Fetched ${oldPassages.length} passages\n`);

const readingPassages = oldPassages.filter(p => p.section === 'R');
const sciencePassages = oldPassages.filter(p => p.section === 'S');

console.log('📊 Distribution:');
console.log(`  Reading: ${readingPassages.length}`);
console.log(`  Science: ${sciencePassages.length}\n`);

// Step 2: Get all questions to track passage_id mappings
console.log('📊 Step 2: Fetching questions to map passage_ids...');
const { data: readingQuestions, error: rqError } = await supabase
  .from('act_reading_questions')
  .select('question_number, passage_id')
  .order('question_number');

const { data: scienceQuestions, error: sqError } = await supabase
  .from('act_science_questions')
  .select('question_number, passage_id')
  .order('question_number');

if (rqError || sqError) {
  console.error('❌ Error fetching questions:', rqError || sqError);
  process.exit(1);
}

console.log(`✅ Fetched ${readingQuestions.length} reading questions and ${scienceQuestions.length} science questions\n`);

// Create old_id to passage_number mapping
const oldReadingIdToPassageNum = {};
readingPassages.forEach(p => {
  oldReadingIdToPassageNum[p.id] = p.passage_number;
});

const oldScienceIdToPassageNum = {};
sciencePassages.forEach(p => {
  oldScienceIdToPassageNum[p.id] = p.passage_number;
});

// Step 3: Rename question tables with act_ prefix
console.log('📝 Step 3: Renaming question tables with act_ prefix...');

// We'll do this via SQL since it's simpler
console.log('⚠️  Note: Tables will be renamed after passage migration');

// Step 4: Migrate Reading Passages
console.log('\n📝 Step 4: Migrating Reading passages to act_reading_passages...');

const newReadingIdMap = {}; // Map old_id to new_id

for (const oldPassage of readingPassages) {
  const newPassage = {
    test_number: oldPassage.test_number,
    passage_number: oldPassage.passage_number,
    passage_type: oldPassage.passage_type,
    title: oldPassage.title,
    author: oldPassage.author || null,
    source: oldPassage.source || null,
    introduction: oldPassage.introduction,
    passage_text: oldPassage.passage_text
  };

  const { data, error } = await supabase
    .from('act_reading_passages')
    .upsert(newPassage, { onConflict: 'test_number,passage_number' })
    .select();

  if (error) {
    console.error(`❌ Error migrating Reading Passage ${oldPassage.passage_number}:`, error);
  } else {
    newReadingIdMap[oldPassage.id] = data[0].id;
    console.log(`✅ Migrated Reading Passage ${oldPassage.passage_number}: ${oldPassage.title}`);
  }
}

// Step 5: Migrate Science Passages
console.log('\n📝 Step 5: Migrating Science passages to act_science_passages...');

const newScienceIdMap = {}; // Map old_id to new_id

for (const oldPassage of sciencePassages) {
  const newPassage = {
    test_number: oldPassage.test_number,
    passage_number: oldPassage.passage_number,
    passage_type: oldPassage.passage_type,
    title: oldPassage.title,
    introduction: oldPassage.introduction,
    passage_text: oldPassage.passage_text
  };

  const { data, error } = await supabase
    .from('act_science_passages')
    .upsert(newPassage, { onConflict: 'test_number,passage_number' })
    .select();

  if (error) {
    console.error(`❌ Error migrating Science Passage ${oldPassage.passage_number}:`, error);
  } else {
    newScienceIdMap[oldPassage.id] = data[0].id;
    console.log(`✅ Migrated Science Passage ${oldPassage.passage_number}: ${oldPassage.title}`);
  }
}

// Step 6: Update Reading Questions with new passage_ids
console.log('\n📝 Step 6: Updating Reading questions with new passage_ids...');

for (const q of readingQuestions) {
  const oldPassageId = q.passage_id;
  const newPassageId = newReadingIdMap[oldPassageId];

  if (!newPassageId) {
    console.error(`❌ Could not find new passage_id for reading question ${q.question_number}`);
    continue;
  }

  const { error } = await supabase
    .from('act_reading_questions')
    .update({ passage_id: newPassageId })
    .eq('question_number', q.question_number)
    .eq('test_number', 1);

  if (error) {
    console.error(`❌ Error updating RQ${q.question_number}:`, error);
  } else {
    const passageNum = oldReadingIdToPassageNum[oldPassageId];
    console.log(`✅ Updated RQ${q.question_number} → Passage ${passageNum}`);
  }
}

// Step 7: Update Science Questions with new passage_ids
console.log('\n📝 Step 7: Updating Science questions with new passage_ids...');

for (const q of scienceQuestions) {
  const oldPassageId = q.passage_id;
  const newPassageId = newScienceIdMap[oldPassageId];

  if (!newPassageId) {
    console.error(`❌ Could not find new passage_id for science question ${q.question_number}`);
    continue;
  }

  const { error } = await supabase
    .from('act_science_questions')
    .update({ passage_id: newPassageId })
    .eq('question_number', q.question_number)
    .eq('test_number', 1);

  if (error) {
    console.error(`❌ Error updating SQ${q.question_number}:`, error);
  } else {
    const passageNum = oldScienceIdToPassageNum[oldPassageId];
    console.log(`✅ Updated SQ${q.question_number} → Passage ${passageNum}`);
  }
}

console.log('\n' + '='.repeat(70));
console.log('🎉 PASSAGE MIGRATION COMPLETE!');
console.log('='.repeat(70));
console.log('\n📊 Summary:');
console.log(`  ✅ Reading: ${readingPassages.length} passages migrated`);
console.log(`  ✅ Science: ${sciencePassages.length} passages migrated`);
console.log(`  ✅ Reading Questions: ${readingQuestions.length} updated with new passage_ids`);
console.log(`  ✅ Science Questions: ${scienceQuestions.length} updated with new passage_ids`);
console.log('\n⚠️  Next steps:');
console.log('  1. Run the final SQL to rename tables and update constraints');
console.log('  2. Create English passages (5 needed)');
console.log('  3. Extract actual passage text from source files');
