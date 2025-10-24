#!/usr/bin/env node

/**
 * CHECK TEST 2 DATABASE STATUS
 * Verify what question content is currently in the database
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔍 CHECKING TEST 2 DATABASE STATUS\n');
console.log('='.repeat(70));

async function checkQuestionContent(tableName, sectionName, expectedCount) {
  console.log(`\n📊 ${sectionName} Questions:`);

  const { data: questions, error } = await supabase
    .from(tableName)
    .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .order('question_number')
    .limit(5); // Just check first 5

  if (error) {
    console.error(`❌ Error fetching ${sectionName} questions:`, error.message);
    return false;
  }

  console.log(`Found ${questions?.length || 0} questions (showing first 5):`);

  let hasContent = true;
  for (const q of questions || []) {
    const hasQuestionStem = q.question_stem && !q.question_stem.includes('[Question') && q.question_stem.length > 20;
    const hasChoices = q.choice_a && q.choice_b && q.choice_c && q.choice_d;
    const hasAnswer = q.correct_answer && q.correct_answer !== 'Z';

    const status = hasQuestionStem && hasChoices && hasAnswer ? '✅' : '❌';
    console.log(`   Q${q.question_number}: ${status} Stem: ${hasQuestionStem ? 'Yes' : 'No'}, Choices: ${hasChoices ? 'Yes' : 'No'}, Answer: ${hasAnswer ? q.correct_answer : 'Missing'}`);

    if (!hasQuestionStem || !hasChoices) {
      hasContent = false;
    }
  }

  // Count total questions
  const { count } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
    .eq('test_number', TEST_NUMBER);

  console.log(`Total: ${count}/${expectedCount} questions in database`);

  return hasContent && count === expectedCount;
}

// Check all sections
const englishOK = await checkQuestionContent('act_english_questions', 'English', 75);
const mathOK = await checkQuestionContent('act_math_questions', 'Math', 60);
const readingOK = await checkQuestionContent('act_reading_questions', 'Reading', 40);
const scienceOK = await checkQuestionContent('act_science_questions', 'Science', 40);

console.log('\n' + '='.repeat(50));
console.log('📊 SUMMARY:');
console.log(`English: ${englishOK ? '✅ Complete' : '❌ Missing content'}`);
console.log(`Math: ${mathOK ? '✅ Complete' : '❌ Missing content'}`);
console.log(`Reading: ${readingOK ? '✅ Complete' : '❌ Missing content'}`);
console.log(`Science: ${scienceOK ? '✅ Complete' : '❌ Missing content'}`);

if (!mathOK || !readingOK) {
  console.log('\n⚠️  ACTION NEEDED: Math and/or Reading questions need full extraction');
  console.log('Run the automated extraction script to populate question content');
}

console.log('');