#!/usr/bin/env node

/**
 * CHECK PRACTICE TEST 4 STATUS
 * See what Practice Test 4 data already exists in the database
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING PRACTICE TEST 4 STATUS');
console.log('='.repeat(50));

async function checkPracticeTest4Status() {
  console.log('\n📊 PRACTICE TEST 4 DATABASE STATUS:');

  // Check English passages
  const { data: englishPassages } = await supabase
    .from('act_english_passages')
    .select('*')
    .eq('test_number', 4)
    .order('passage_number');

  console.log(`\n📝 ENGLISH PASSAGES: ${englishPassages?.length || 0} found`);
  if (englishPassages && englishPassages.length > 0) {
    englishPassages.forEach(p => {
      console.log(`  • Passage ${p.passage_number}: "${p.title}"`);
    });
  }

  // Check English questions
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('question_number, passage_number, question_stem')
    .eq('test_number', 4)
    .order('question_number');

  console.log(`\n📝 ENGLISH QUESTIONS: ${englishQuestions?.length || 0} found`);
  if (englishQuestions && englishQuestions.length > 0) {
    console.log(`  • Questions ${englishQuestions[0].question_number}-${englishQuestions[englishQuestions.length - 1].question_number}`);
    console.log(`  • Sample: Q${englishQuestions[0].question_number}: "${englishQuestions[0].question_stem.substring(0, 50)}..."`);
  }

  // Check Math questions
  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('question_number, question_stem')
    .eq('test_number', 4)
    .order('question_number');

  console.log(`\n🔢 MATH QUESTIONS: ${mathQuestions?.length || 0} found`);
  if (mathQuestions && mathQuestions.length > 0) {
    console.log(`  • Questions ${mathQuestions[0].question_number}-${mathQuestions[mathQuestions.length - 1].question_number}`);
    console.log(`  • Sample: Q${mathQuestions[0].question_number}: "${mathQuestions[0].question_stem.substring(0, 50)}..."`);
  }

  // Check Reading passages
  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', 4)
    .order('passage_number');

  console.log(`\n📖 READING PASSAGES: ${readingPassages?.length || 0} found`);
  if (readingPassages && readingPassages.length > 0) {
    readingPassages.forEach(p => {
      console.log(`  • Passage ${p.passage_number}: "${p.title}"`);
    });
  }

  // Check Reading questions
  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('question_number, passage_number')
    .eq('test_number', 4)
    .order('question_number');

  console.log(`\n📖 READING QUESTIONS: ${readingQuestions?.length || 0} found`);

  // Check Science passages
  const { data: sciencePassages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', 4)
    .order('passage_number');

  console.log(`\n🔬 SCIENCE PASSAGES: ${sciencePassages?.length || 0} found`);
  if (sciencePassages && sciencePassages.length > 0) {
    sciencePassages.forEach(p => {
      console.log(`  • Passage ${p.passage_number}: "${p.title}"`);
    });
  }

  // Check Science questions
  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('question_number, passage_number')
    .eq('test_number', 4)
    .order('question_number');

  console.log(`\n🔬 SCIENCE QUESTIONS: ${scienceQuestions?.length || 0} found`);

  console.log('\n' + '='.repeat(50));
  console.log('📈 PRACTICE TEST 4 COMPLETION STATUS:');
  const englishComplete = (englishPassages?.length || 0) === 5 && (englishQuestions?.length || 0) === 75;
  const mathComplete = (mathQuestions?.length || 0) === 60;
  const readingComplete = (readingPassages?.length || 0) === 4 && (readingQuestions?.length || 0) === 40;
  const scienceComplete = (sciencePassages?.length || 0) === 6 && (scienceQuestions?.length || 0) === 40;

  console.log(`  📝 English: ${englishComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'} (${englishPassages?.length || 0}/5 passages, ${englishQuestions?.length || 0}/75 questions)`);
  console.log(`  🔢 Math: ${mathComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'} (${mathQuestions?.length || 0}/60 questions)`);
  console.log(`  📖 Reading: ${readingComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'} (${readingPassages?.length || 0}/4 passages, ${readingQuestions?.length || 0}/40 questions)`);
  console.log(`  🔬 Science: ${scienceComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'} (${sciencePassages?.length || 0}/6 passages, ${scienceQuestions?.length || 0}/40 questions)`);

  const overallComplete = englishComplete && mathComplete && readingComplete && scienceComplete;
  console.log(`\n🎯 OVERALL STATUS: ${overallComplete ? '✅ PRACTICE TEST 4 COMPLETE' : '❌ PRACTICE TEST 4 INCOMPLETE'}`);

  return {
    english: { passages: englishPassages?.length || 0, questions: englishQuestions?.length || 0 },
    math: { questions: mathQuestions?.length || 0 },
    reading: { passages: readingPassages?.length || 0, questions: readingQuestions?.length || 0 },
    science: { passages: sciencePassages?.length || 0, questions: scienceQuestions?.length || 0 },
    overallComplete
  };
}

checkPracticeTest4Status().catch(console.error);