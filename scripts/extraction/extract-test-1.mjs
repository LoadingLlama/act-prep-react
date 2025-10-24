#!/usr/bin/env node

/**
 * Extract Test 1 Questions Directly into Supabase
 * Reads from Practice ACT 1.txt and inserts into database
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Extracting Test 1 into Supabase Database\n');

// Read source file
const sourceFile = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 1.txt';
console.log(`📖 Reading: ${sourceFile}`);

const fileContent = readFileSync(sourceFile, 'utf-8');
const lines = fileContent.split('\n');

console.log(`✅ Loaded ${lines.length} lines\n`);

// Answer keys (extracted from file lines ~6140-6400)
const answerKeys = {
  english: {
    1: 'C', 2: 'G', 3: 'A', 4: 'J', 5: 'A', 6: 'F', 7: 'C', 8: 'H', 9: 'C', 10: 'J',
    11: 'B', 12: 'F', 13: 'C', 14: 'H', 15: 'D',
    // ... We'll add more as we extract
  }
};

// Extract English Section
console.log('📝 ENGLISH SECTION (75 questions)');
console.log('================================\n');

const englishQuestions = [];

// English Question 1
englishQuestions.push({
  test_number: 1,
  section: 'E',
  question_number: 1,
  passage_id: null,
  question_stem: 'There are thousands of new animal species identified each year, the vast majority are small or geographically isolated.',
  choice_a: 'NO CHANGE',
  choice_b: 'Scientists say thousands of new animal species are',
  choice_c: 'Of the thousands of new animal species',
  choice_d: 'Thousands of new animal species are',
  choice_e: null,
  correct_answer: 'C',
  has_figure: false,
  figure_url: null,
  figure_reference: null,
  difficulty_level: 'medium',
  notes: 'Passage I: Double the Manta Rays - Sentence structure'
});

// English Question 2
englishQuestions.push({
  test_number: 1,
  section: 'E',
  question_number: 2,
  passage_id: null,
  question_stem: 'Mantas, which are plankton-eating relatives of stingrays',
  choice_f: 'NO CHANGE',
  choice_g: 'Mantas are',
  choice_h: 'Mantas,',
  choice_j: 'DELETE the underlined portion (adjusting the capitalization as needed).',
  choice_e: null,
  correct_answer: 'G',
  has_figure: false,
  difficulty_level: 'medium',
  notes: 'Passage I - Sentence structure'
});

// Insert first question to test
console.log('Testing database insertion...\n');

const { data: testInsert, error: testError } = await supabase
  .from('act_questions')
  .insert([englishQuestions[0]])
  .select();

if (testError) {
  console.error('❌ Error inserting question:', testError.message);
  console.log('\n📌 The table "act_questions" may not exist yet.');
  console.log('   Please run this SQL in Supabase Dashboard > SQL Editor:\n');
  console.log('   File: scripts/setup/create-tables.sql\n');
  console.log('   Or manually create the table with these columns:');
  console.log('   - id (uuid, primary key)');
  console.log('   - test_number (int4)');
  console.log('   - section (text)');
  console.log('   - question_number (int4)');
  console.log('   - question_stem (text)');
  console.log('   - choice_a, choice_b, choice_c, choice_d, choice_e (text)');
  console.log('   - correct_answer (text)');
  console.log('   - has_figure (bool)');
  console.log('   - difficulty_level (text)');
  console.log('   - notes (text)');
  process.exit(1);
} else {
  console.log(`✅ Successfully inserted question 1`);
  console.log(`   ID: ${testInsert[0].id}`);
  console.log(`   Question: "${testInsert[0].question_stem.substring(0, 60)}..."`);
  console.log('\n📊 Database is ready! Continuing extraction...\n');
}

// Now insert the rest
for (let i = 1; i < englishQuestions.length; i++) {
  const question = englishQuestions[i];

  const { data, error } = await supabase
    .from('act_questions')
    .insert([question])
    .select();

  if (error) {
    console.error(`❌ Error inserting question ${question.question_number}:`, error.message);
  } else {
    console.log(`✅ Inserted question ${question.question_number}`);
  }
}

console.log(`\n✅ Extracted ${englishQuestions.length} English questions into database`);
console.log('\n📌 Next steps:');
console.log('   1. Continue extracting remaining English questions (3-75)');
console.log('   2. Extract Math section (60 questions)');
console.log('   3. Extract Reading section (40 questions)');
console.log('   4. Extract Science section (40 questions)');
console.log('\n   Total progress: 2/215 questions (1%)');
