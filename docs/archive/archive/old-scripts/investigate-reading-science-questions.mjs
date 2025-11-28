#!/usr/bin/env node

/**
 * INVESTIGATE READING AND SCIENCE QUESTIONS
 * Check why the questions show 0 found when they should have been uploaded
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 INVESTIGATING READING AND SCIENCE QUESTIONS');
console.log('Checking why questions show 0 found after upload');
console.log('='.repeat(60));

async function investigateReadingQuestions() {
  console.log('\n📖 READING QUESTIONS INVESTIGATION:');

  // Check with different queries
  const { data: readingQuestions, error } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', 4);

  console.log(`  Query result: ${readingQuestions?.length || 0} questions found`);
  if (error) {
    console.log(`  Error: ${error.message}`);
  }

  if (readingQuestions && readingQuestions.length > 0) {
    console.log(`  ✅ Found ${readingQuestions.length} Reading questions`);
    console.log(`  • Questions ${readingQuestions[0].question_number}-${readingQuestions[readingQuestions.length - 1].question_number}`);
    console.log(`  • Sample: Q${readingQuestions[0].question_number}: "${readingQuestions[0].question_stem.substring(0, 50)}..."`);

    // Check passage linkage
    const passageIds = [...new Set(readingQuestions.map(q => q.passage_id))];
    console.log(`  • Linked to ${passageIds.length} different passage IDs`);
  } else {
    console.log(`  ❌ No Reading questions found - investigating further...`);

    // Check if questions exist with different test_number
    const { data: allReading } = await supabase
      .from('act_reading_questions')
      .select('test_number, question_number')
      .order('test_number');

    if (allReading && allReading.length > 0) {
      const testNumbers = [...new Set(allReading.map(q => q.test_number))];
      console.log(`  • Found Reading questions for test numbers: ${testNumbers.join(', ')}`);
    } else {
      console.log(`  • No Reading questions found in entire table`);
    }
  }
}

async function investigateScienceQuestions() {
  console.log('\n🔬 SCIENCE QUESTIONS INVESTIGATION:');

  // Check with different queries
  const { data: scienceQuestions, error } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', 4);

  console.log(`  Query result: ${scienceQuestions?.length || 0} questions found`);
  if (error) {
    console.log(`  Error: ${error.message}`);
  }

  if (scienceQuestions && scienceQuestions.length > 0) {
    console.log(`  ✅ Found ${scienceQuestions.length} Science questions`);
    console.log(`  • Questions ${scienceQuestions[0].question_number}-${scienceQuestions[scienceQuestions.length - 1].question_number}`);
    console.log(`  • Sample: Q${scienceQuestions[0].question_number}: "${scienceQuestions[0].question_stem.substring(0, 50)}..."`);

    // Check passage linkage
    const passageIds = [...new Set(scienceQuestions.map(q => q.passage_id))];
    console.log(`  • Linked to ${passageIds.length} different passage IDs`);
  } else {
    console.log(`  ❌ No Science questions found - investigating further...`);

    // Check if questions exist with different test_number
    const { data: allScience } = await supabase
      .from('act_science_questions')
      .select('test_number, question_number')
      .order('test_number');

    if (allScience && allScience.length > 0) {
      const testNumbers = [...new Set(allScience.map(q => q.test_number))];
      console.log(`  • Found Science questions for test numbers: ${testNumbers.join(', ')}`);
    } else {
      console.log(`  • No Science questions found in entire table`);
    }
  }
}

async function checkPassageIds() {
  console.log('\n🔗 PASSAGE ID INVESTIGATION:');

  // Check Reading passages and their IDs
  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('id, passage_number, title')
    .eq('test_number', 4)
    .order('passage_number');

  console.log(`📖 Reading passages: ${readingPassages?.length || 0} found`);
  if (readingPassages) {
    readingPassages.forEach(p => {
      console.log(`  • Passage ${p.passage_number}: ${p.id} - "${p.title}"`);
    });
  }

  // Check Science passages and their IDs
  const { data: sciencePassages } = await supabase
    .from('act_science_passages')
    .select('id, passage_number, title')
    .eq('test_number', 4)
    .order('passage_number');

  console.log(`\n🔬 Science passages: ${sciencePassages?.length || 0} found`);
  if (sciencePassages) {
    sciencePassages.forEach(p => {
      console.log(`  • Passage ${p.passage_number}: ${p.id} - "${p.title}"`);
    });
  }
}

async function main() {
  await investigateReadingQuestions();
  await investigateScienceQuestions();
  await checkPassageIds();

  console.log('\n' + '='.repeat(60));
  console.log('🎯 INVESTIGATION SUMMARY:');
  console.log('If questions are missing, need to re-run extraction with proper debugging');
  console.log('If questions exist, check original status script query logic');
}

main().catch(console.error);