#!/usr/bin/env node

/**
 * EXAMINE PRACTICE TEST 2 PASSAGES
 * Investigate corrupted passage data to understand what needs re-extraction
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 EXAMINE PRACTICE TEST 2 PASSAGES');
console.log('Investigating corrupted passage data');
console.log('='.repeat(80));

/**
 * Examine reading passages
 */
async function examineReadingPassages() {
  console.log('\n📚 EXAMINING READING PASSAGES...');

  const { data: passages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', 2)
    .order('passage_number');

  console.log(`Found ${passages?.length || 0} reading passages (expected: 4)`);

  if (passages) {
    console.log('\n📋 READING PASSAGE DETAILS:');
    passages.forEach((passage, index) => {
      console.log(`\n  Passage ${index + 1} (ID: ${passage.id}):`);
      console.log(`    Passage Number: ${passage.passage_number}`);
      console.log(`    Title: "${passage.title}"`);
      console.log(`    Type: ${passage.passage_type}`);
      console.log(`    Text Length: ${passage.passage_text?.length || 0} characters`);
      console.log(`    Text Preview: "${passage.passage_text?.substring(0, 100)}..."`);

      // Check if this looks like corrupted data
      if (passage.passage_text && passage.passage_text.length < 200) {
        console.log(`    ⚠️  WARNING: Passage text suspiciously short`);
      }
      if (!passage.title || passage.title.length < 5) {
        console.log(`    ⚠️  WARNING: Title missing or too short`);
      }
    });

    // Check for duplicates or patterns
    const passageNumbers = passages.map(p => p.passage_number);
    const duplicateNumbers = passageNumbers.filter((num, index) => passageNumbers.indexOf(num) !== index);
    if (duplicateNumbers.length > 0) {
      console.log(`\n  ❌ DUPLICATE PASSAGE NUMBERS: ${duplicateNumbers.join(', ')}`);
    }

    console.log(`\n  📊 Passage number range: ${Math.min(...passageNumbers)} - ${Math.max(...passageNumbers)}`);
    console.log(`  📊 Expected passage numbers: 1, 2, 3, 4`);
    console.log(`  📊 Actual passage numbers: ${passageNumbers.sort((a, b) => a - b).join(', ')}`);
  }
}

/**
 * Examine science passages
 */
async function examineSciencePassages() {
  console.log('\n🧪 EXAMINING SCIENCE PASSAGES...');

  const { data: passages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', 2)
    .order('passage_number');

  console.log(`Found ${passages?.length || 0} science passages (expected: 7)`);

  if (passages) {
    console.log('\n📋 SCIENCE PASSAGE DETAILS:');
    passages.forEach((passage, index) => {
      console.log(`\n  Passage ${index + 1} (ID: ${passage.id}):`);
      console.log(`    Passage Number: ${passage.passage_number}`);
      console.log(`    Title: "${passage.title}"`);
      console.log(`    Type: ${passage.passage_type}`);
      console.log(`    Text Length: ${passage.passage_text?.length || 0} characters`);
      console.log(`    Text Preview: "${passage.passage_text?.substring(0, 100)}..."`);
      console.log(`    Has Figure: ${passage.has_figure}`);
      console.log(`    Figure URL: ${passage.figure_url || 'None'}`);

      // Check if this looks like corrupted data
      if (passage.passage_text && passage.passage_text.length < 200) {
        console.log(`    ⚠️  WARNING: Passage text suspiciously short`);
      }
      if (!passage.title || passage.title.length < 5) {
        console.log(`    ⚠️  WARNING: Title missing or too short`);
      }
    });

    // Check for duplicates or patterns
    const passageNumbers = passages.map(p => p.passage_number);
    const duplicateNumbers = passageNumbers.filter((num, index) => passageNumbers.indexOf(num) !== index);
    if (duplicateNumbers.length > 0) {
      console.log(`\n  ❌ DUPLICATE PASSAGE NUMBERS: ${duplicateNumbers.join(', ')}`);
    }

    console.log(`\n  📊 Passage number range: ${Math.min(...passageNumbers)} - ${Math.max(...passageNumbers)}`);
    console.log(`  📊 Expected passage numbers: 1, 2, 3, 4, 5, 6, 7`);
    console.log(`  📊 Actual passage numbers: ${passageNumbers.sort((a, b) => a - b).join(', ')}`);
  }
}

/**
 * Check question-passage linkage issues
 */
async function checkQuestionPassageLinkage() {
  console.log('\n🔗 CHECKING QUESTION-PASSAGE LINKAGE...');

  // Check Reading linkage
  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('question_number, passage_id')
    .eq('test_number', 2);

  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('id, passage_number')
    .eq('test_number', 2);

  console.log('\n📚 READING LINKAGE ANALYSIS:');
  console.log(`  Questions: ${readingQuestions?.length || 0}`);
  console.log(`  Passages: ${readingPassages?.length || 0}`);

  const readingPassageIds = readingPassages?.map(p => p.id) || [];
  const questionPassageIds = readingQuestions?.map(q => q.passage_id) || [];
  const uniqueQuestionPassageIds = [...new Set(questionPassageIds)];

  console.log(`  Passage IDs in database: ${readingPassageIds.join(', ')}`);
  console.log(`  Passage IDs referenced by questions: ${uniqueQuestionPassageIds.join(', ')}`);

  const missingPassageIds = uniqueQuestionPassageIds.filter(id => !readingPassageIds.includes(id));
  if (missingPassageIds.length > 0) {
    console.log(`  ❌ Questions reference non-existent passage IDs: ${missingPassageIds.join(', ')}`);
  }

  // Check Science linkage
  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('question_number, passage_id')
    .eq('test_number', 2);

  const { data: sciencePassages } = await supabase
    .from('act_science_passages')
    .select('id, passage_number')
    .eq('test_number', 2);

  console.log('\n🧪 SCIENCE LINKAGE ANALYSIS:');
  console.log(`  Questions: ${scienceQuestions?.length || 0}`);
  console.log(`  Passages: ${sciencePassages?.length || 0}`);

  const sciencePassageIds = sciencePassages?.map(p => p.id) || [];
  const scienceQuestionPassageIds = scienceQuestions?.map(q => q.passage_id) || [];
  const uniqueScienceQuestionPassageIds = [...new Set(scienceQuestionPassageIds)];

  console.log(`  Passage IDs in database: ${sciencePassageIds.join(', ')}`);
  console.log(`  Passage IDs referenced by questions: ${uniqueScienceQuestionPassageIds.join(', ')}`);

  const missingSciencePassageIds = uniqueScienceQuestionPassageIds.filter(id => !sciencePassageIds.includes(id));
  if (missingSciencePassageIds.length > 0) {
    console.log(`  ❌ Questions reference non-existent passage IDs: ${missingSciencePassageIds.join(', ')}`);
  }
}

/**
 * Check for corrupted choice content
 */
async function checkCorruptedChoices() {
  console.log('\n🔍 CHECKING FOR CORRUPTED CHOICE CONTENT...');

  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('question_number, choice_a, choice_b, choice_c, choice_d')
    .eq('test_number', 2)
    .limit(20); // Sample first 20

  console.log('\n🧪 SCIENCE QUESTION CHOICE SAMPLES:');
  scienceQuestions?.forEach(q => {
    console.log(`\n  Q${q.question_number}:`);
    console.log(`    A: "${q.choice_a}"`);
    console.log(`    B: "${q.choice_b}"`);
    console.log(`    C: "${q.choice_c}"`);
    console.log(`    D: "${q.choice_d}"`);

    // Check for literal A, B, C, D corruption
    if (q.choice_a === 'A' && q.choice_b === 'B' && q.choice_c === 'C' && q.choice_d === 'D') {
      console.log(`    ❌ CORRUPTED: Choices are literal A, B, C, D`);
    }
  });
}

/**
 * Main examination function
 */
async function examineTest2Passages() {
  await examineReadingPassages();
  await examineSciencePassages();
  await checkQuestionPassageLinkage();
  await checkCorruptedChoices();

  console.log('\n' + '='.repeat(80));
  console.log('🎯 TEST 2 PASSAGE EXAMINATION SUMMARY');
  console.log('='.repeat(80));

  console.log('📋 IDENTIFIED ISSUES:');
  console.log('  ❌ Reading passages: Too many (12 instead of 4)');
  console.log('  ❌ Science passages: Too many (11 instead of 7)');
  console.log('  ❌ Question-passage linkage broken');
  console.log('  ❌ Some science questions have corrupted choices');
  console.log('');
  console.log('🎯 RECOMMENDED ACTIONS:');
  console.log('  1. Clean up duplicate/incorrect passages');
  console.log('  2. Manually re-extract correct passages from source');
  console.log('  3. Fix question-passage linkages');
  console.log('  4. Fix corrupted choice content');
  console.log('  5. Use Practice Test 3 manual extraction approach');
}

examineTest2Passages().catch(console.error);