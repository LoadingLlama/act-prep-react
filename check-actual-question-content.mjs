#!/usr/bin/env node

/**
 * CHECK ACTUAL QUESTION CONTENT
 * Verify whether we have real questions or just template data
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING ACTUAL QUESTION CONTENT');
console.log('Verifying if we have real questions or template data');
console.log('='.repeat(60));

async function checkEnglishQuestions() {
  console.log('\n📝 ENGLISH QUESTIONS SAMPLE:');

  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d')
    .eq('test_number', 4)
    .order('question_number')
    .limit(5);

  if (questions) {
    questions.forEach(q => {
      console.log(`\n  Q${q.question_number}:`);
      console.log(`    Stem: "${q.question_stem}"`);
      console.log(`    A: "${q.choice_a}"`);
      console.log(`    B: "${q.choice_b}"`);
      console.log(`    Template?: ${q.question_stem.includes('stem from Practice Test 4 PDF') ? '❌ YES' : '✅ NO'}`);
    });
  }
}

async function checkMathQuestions() {
  console.log('\n🔢 MATH QUESTIONS SAMPLE:');

  const { data: questions } = await supabase
    .from('act_math_questions')
    .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, choice_e')
    .eq('test_number', 4)
    .order('question_number')
    .limit(3);

  if (questions) {
    questions.forEach(q => {
      console.log(`\n  Q${q.question_number}:`);
      console.log(`    Stem: "${q.question_stem}"`);
      console.log(`    A: "${q.choice_a}"`);
      console.log(`    Template?: ${q.question_stem.includes('stem from Practice Test 4 PDF') ? '❌ YES' : '✅ NO'}`);
    });
  }
}

async function checkReadingQuestions() {
  console.log('\n📖 READING QUESTIONS SAMPLE:');

  const { data: questions } = await supabase
    .from('act_reading_questions')
    .select('question_number, question_stem, choice_a')
    .eq('test_number', 4)
    .order('question_number')
    .limit(3);

  if (questions) {
    questions.forEach(q => {
      console.log(`\n  Q${q.question_number}:`);
      console.log(`    Stem: "${q.question_stem}"`);
      console.log(`    Template?: ${q.question_stem.includes('stem from Practice Test 4 PDF') ? '❌ YES' : '✅ NO'}`);
    });
  }
}

async function checkScienceQuestions() {
  console.log('\n🔬 SCIENCE QUESTIONS SAMPLE:');

  const { data: questions } = await supabase
    .from('act_science_questions')
    .select('question_number, question_stem, choice_a')
    .eq('test_number', 4)
    .order('question_number')
    .limit(3);

  if (questions) {
    questions.forEach(q => {
      console.log(`\n  Q${q.question_number}:`);
      console.log(`    Stem: "${q.question_stem}"`);
      console.log(`    Template?: ${q.question_stem.includes('stem from Practice Test 4 PDF') ? '❌ YES' : '✅ NO'}`);
    });
  }
}

async function main() {
  await checkEnglishQuestions();
  await checkMathQuestions();
  await checkReadingQuestions();
  await checkScienceQuestions();

  console.log('\n' + '='.repeat(60));
  console.log('🎯 REALITY CHECK SUMMARY:');
  console.log('If questions contain "stem from Practice Test 4 PDF" = TEMPLATE DATA');
  console.log('If questions contain actual ACT content = REAL EXTRACTION');
  console.log('\n❌ NEED TO DELETE TEMPLATE DATA AND DO ACTUAL MANUAL EXTRACTION');
}

main().catch(console.error);