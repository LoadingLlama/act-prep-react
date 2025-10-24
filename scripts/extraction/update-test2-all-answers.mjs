#!/usr/bin/env node

/**
 * UPDATE TEST 2 WITH ALL CORRECT ANSWERS
 * Replace all placeholder 'Z' answers with correct answers from official answer key
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔄 UPDATING TEST 2 WITH ALL CORRECT ANSWERS\n');
console.log('='.repeat(70));

// Load the complete answer key
const answerKeyPath = join(__dirname, '../../answer-keys/test2-answers-complete.json');
const answerKey = JSON.parse(readFileSync(answerKeyPath, 'utf-8'));

// Update functions for each section
async function updateSection(tableName, answers, sectionName) {
  console.log(`\n📝 Updating ${sectionName} answers...`);

  let successCount = 0;
  let errorCount = 0;

  for (const [qNum, correctAnswer] of Object.entries(answers)) {
    const questionNumber = parseInt(qNum);

    const { error } = await supabase
      .from(tableName)
      .update({ correct_answer: correctAnswer })
      .eq('test_number', TEST_NUMBER)
      .eq('question_number', questionNumber);

    if (error) {
      console.error(`❌ Error updating ${sectionName} Q${questionNumber}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`✅ ${sectionName}: ${successCount} updated, ${errorCount} errors`);
  return { successCount, errorCount };
}

// Update all sections
const results = {};

try {
  results.english = await updateSection('act_english_questions', answerKey.english, 'English');
  results.math = await updateSection('act_math_questions', answerKey.math, 'Math');
  results.reading = await updateSection('act_reading_questions', answerKey.reading, 'Reading');
  results.science = await updateSection('act_science_questions', answerKey.science, 'Science');

  // Calculate totals
  const totalSuccess = Object.values(results).reduce((sum, r) => sum + r.successCount, 0);
  const totalErrors = Object.values(results).reduce((sum, r) => sum + r.errorCount, 0);

  console.log('\n📊 FINAL RESULTS:');
  console.log('='.repeat(50));
  console.log(`Total questions updated: ${totalSuccess}/215`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Success rate: ${(totalSuccess/215*100).toFixed(1)}%`);

  if (totalSuccess === 215 && totalErrors === 0) {
    console.log('\n🎉 SUCCESS! All 215 Test 2 questions now have correct answers!');
  } else {
    console.log('\n⚠️  Some updates failed. Please check the error messages above.');
  }

  // Verify the updates
  console.log('\n🔍 VERIFICATION:');
  console.log('Checking a few random questions...\n');

  // Check English Q1
  const { data: englishQ1 } = await supabase
    .from('act_english_questions')
    .select('question_number, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', 1)
    .single();
  console.log(`English Q1: Expected C, Got ${englishQ1?.correct_answer} ${englishQ1?.correct_answer === 'C' ? '✅' : '❌'}`);

  // Check Math Q60
  const { data: mathQ60 } = await supabase
    .from('act_math_questions')
    .select('question_number, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', 60)
    .single();
  console.log(`Math Q60: Expected F, Got ${mathQ60?.correct_answer} ${mathQ60?.correct_answer === 'F' ? '✅' : '❌'}`);

  // Check Reading Q40
  const { data: readingQ40 } = await supabase
    .from('act_reading_questions')
    .select('question_number, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', 40)
    .single();
  console.log(`Reading Q40: Expected J, Got ${readingQ40?.correct_answer} ${readingQ40?.correct_answer === 'J' ? '✅' : '❌'}`);

  // Check Science Q40
  const { data: scienceQ40 } = await supabase
    .from('act_science_questions')
    .select('question_number, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', 40)
    .single();
  console.log(`Science Q40: Expected F, Got ${scienceQ40?.correct_answer} ${scienceQ40?.correct_answer === 'F' ? '✅' : '❌'}`);

} catch (error) {
  console.error('❌ Fatal error during update:', error.message);
}

console.log('\n✅ Test 2 answer update complete!\n');