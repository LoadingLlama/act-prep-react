#!/usr/bin/env node

/**
 * FINAL TEST 2 VERIFICATION
 * Comprehensive check to ensure Test 2 matches Test 1 format and quality
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 FINAL TEST 2 VERIFICATION\n');
console.log('='.repeat(70));

async function verifyTest(testNumber, testName) {
  console.log(`\n📊 ${testName.toUpperCase()} VERIFICATION:\n`);

  // Check questions
  const questionTables = [
    ['act_english_questions', 'English', 75],
    ['act_math_questions', 'Math', 60],
    ['act_reading_questions', 'Reading', 40],
    ['act_science_questions', 'Science', 40]
  ];

  let totalQuestions = 0;
  let goodQuestions = 0;

  for (const [tableName, sectionName, expectedCount] of questionTables) {
    const { data: questions, error } = await supabase
      .from(tableName)
      .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, correct_answer')
      .eq('test_number', testNumber);

    if (error) {
      console.error(`❌ Error fetching ${sectionName} questions:`, error.message);
      continue;
    }

    const actualCount = questions?.length || 0;
    totalQuestions += actualCount;

    let sectionGood = 0;
    for (const q of questions || []) {
      const hasGoodStem = q.question_stem &&
                         !q.question_stem.includes('[Question') &&
                         q.question_stem.length > 10;
      const hasChoices = q.choice_a && q.choice_b && q.choice_c && q.choice_d;
      const hasAnswer = q.correct_answer && q.correct_answer !== 'Z';

      if (hasGoodStem && hasChoices && hasAnswer) {
        sectionGood++;
        goodQuestions++;
      }
    }

    console.log(`${sectionName}: ${sectionGood}/${actualCount} questions (expected ${expectedCount}) ${sectionGood === expectedCount ? '✅' : '❌'}`);
  }

  // Check passages
  const passageTables = [
    ['act_english_passages', 'English', 5],
    ['act_reading_passages', 'Reading', 4],
    ['act_science_passages', 'Science', 6]
  ];

  let totalPassages = 0;
  let goodPassages = 0;

  for (const [tableName, sectionName, expectedCount] of passageTables) {
    const { data: passages, error } = await supabase
      .from(tableName)
      .select('passage_number, title, passage_text')
      .eq('test_number', testNumber);

    if (error) {
      console.error(`❌ Error fetching ${sectionName} passages:`, error.message);
      continue;
    }

    const actualCount = passages?.length || 0;
    totalPassages += actualCount;

    let sectionGood = 0;
    for (const p of passages || []) {
      const hasGoodTitle = p.title && !p.title.includes('[') && !p.title.includes('Passage');
      const hasGoodText = p.passage_text &&
                         !p.passage_text.includes('[') &&
                         !p.passage_text.includes('manual') &&
                         p.passage_text.length > 200;

      if (hasGoodTitle && hasGoodText) {
        sectionGood++;
        goodPassages++;
      }
    }

    console.log(`${sectionName} Passages: ${sectionGood}/${actualCount} passages (expected ${expectedCount}) ${sectionGood === expectedCount ? '✅' : '❌'}`);
  }

  console.log(`\n📈 ${testName} SUMMARY:`);
  console.log(`Questions: ${goodQuestions}/${totalQuestions} complete (${(goodQuestions/215*100).toFixed(1)}%)`);
  console.log(`Passages: ${goodPassages}/${totalPassages} complete (${(goodPassages/15*100).toFixed(1)}%)`);

  const isComplete = goodQuestions === 215 && goodPassages === 15;
  console.log(`Overall Status: ${isComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);

  return { questions: goodQuestions, passages: goodPassages, complete: isComplete };
}

// Verify both tests
const test1Results = await verifyTest(1, 'Test 1');
const test2Results = await verifyTest(2, 'Test 2');

console.log('\n' + '='.repeat(50));
console.log('🏆 FINAL COMPARISON');
console.log('='.repeat(50));

console.log('\n📊 QUESTIONS:');
console.log(`Test 1: ${test1Results.questions}/215 (${(test1Results.questions/215*100).toFixed(1)}%)`);
console.log(`Test 2: ${test2Results.questions}/215 (${(test2Results.questions/215*100).toFixed(1)}%)`);

console.log('\n📚 PASSAGES:');
console.log(`Test 1: ${test1Results.passages}/15 (${(test1Results.passages/15*100).toFixed(1)}%)`);
console.log(`Test 2: ${test2Results.passages}/15 (${(test2Results.passages/15*100).toFixed(1)}%)`);

console.log('\n🎯 COMPLETENESS:');
console.log(`Test 1: ${test1Results.complete ? '✅ Complete' : '❌ Incomplete'}`);
console.log(`Test 2: ${test2Results.complete ? '✅ Complete' : '❌ Incomplete'}`);

if (test1Results.complete && test2Results.complete) {
  console.log('\n🎉 SUCCESS! Both Test 1 and Test 2 are 100% complete and match format!');
} else {
  console.log('\n⚠️  Action needed: Some data is still incomplete');
}

console.log('\n='.repeat(70));