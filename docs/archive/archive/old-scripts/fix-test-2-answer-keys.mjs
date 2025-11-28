#!/usr/bin/env node

/**
 * FIX PRACTICE TEST 2 ANSWER KEYS
 * Convert F/G/H/J answers to A/B/C/D format
 * Based on ACT test pattern analysis from verification
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIX PRACTICE TEST 2 ANSWER KEYS');
console.log('Converting F/G/H/J answers to A/B/C/D format');
console.log('='.repeat(80));

// Answer key mapping for ACT tests
const ANSWER_MAPPING = {
  'F': 'A',
  'G': 'B',
  'H': 'C',
  'J': 'D',
  'K': 'E' // Just in case
};

/**
 * Fix answer keys for all sections
 */
async function fixAnswerKeys() {
  const sections = [
    { name: 'English', table: 'act_english_questions' },
    { name: 'Math', table: 'act_math_questions' },
    { name: 'Reading', table: 'act_reading_questions' },
    { name: 'Science', table: 'act_science_questions' }
  ];

  let totalFixed = 0;
  const errors = [];

  for (const section of sections) {
    console.log(`\n📝 FIXING ${section.name.toUpperCase()} ANSWER KEYS...`);

    try {
      // Get all questions with F/G/H/J answers
      const { data: questions } = await supabase
        .from(section.table)
        .select('*')
        .eq('test_number', 2)
        .in('correct_answer', ['F', 'G', 'H', 'J', 'K']);

      console.log(`  🔍 Found ${questions?.length || 0} questions with F/G/H/J answers`);

      if (!questions || questions.length === 0) {
        console.log(`  ✅ No ${section.name} questions need answer key fixes`);
        continue;
      }

      // Fix each question
      for (const question of questions) {
        const oldAnswer = question.correct_answer;
        const newAnswer = ANSWER_MAPPING[oldAnswer];

        if (newAnswer) {
          const { error } = await supabase
            .from(section.table)
            .update({ correct_answer: newAnswer })
            .eq('id', question.id);

          if (error) {
            errors.push(`${section.name} Q${question.question_number}: ${error.message}`);
          } else {
            totalFixed++;
            console.log(`    ✅ Q${question.question_number}: ${oldAnswer} → ${newAnswer}`);
          }
        } else {
          errors.push(`${section.name} Q${question.question_number}: Unknown answer ${oldAnswer}`);
        }
      }

    } catch (err) {
      errors.push(`${section.name}: ${err.message}`);
      console.log(`  ❌ Error fixing ${section.name}: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('🎯 ANSWER KEY FIX RESULTS');
  console.log('='.repeat(80));

  if (errors.length === 0) {
    console.log('🎉 ✅ ALL ANSWER KEYS FIXED SUCCESSFULLY!');
    console.log(`✅ Total questions fixed: ${totalFixed}`);
    console.log('✅ All Practice Test 2 questions now use A/B/C/D/E format');
  } else {
    console.log('❌ ANSWER KEY FIX ISSUES:');
    console.log(`✅ Successfully fixed: ${totalFixed} questions`);
    console.log(`❌ Errors encountered: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return {
    success: errors.length === 0,
    totalFixed,
    errors
  };
}

/**
 * Verify the fix worked
 */
async function verifyAnswerKeyFix() {
  console.log('\n🔍 VERIFYING ANSWER KEY FIXES...');

  const sections = [
    { name: 'English', table: 'act_english_questions' },
    { name: 'Math', table: 'act_math_questions' },
    { name: 'Reading', table: 'act_reading_questions' },
    { name: 'Science', table: 'act_science_questions' }
  ];

  let allGood = true;

  for (const section of sections) {
    // Count questions with invalid answers
    const { count: invalidCount } = await supabase
      .from(section.table)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 2)
      .in('correct_answer', ['F', 'G', 'H', 'J', 'K']);

    // Count questions with valid answers
    const validAnswers = section.name === 'Math' ? ['A', 'B', 'C', 'D', 'E'] : ['A', 'B', 'C', 'D'];
    const { count: validCount } = await supabase
      .from(section.table)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 2)
      .in('correct_answer', validAnswers);

    // Count total questions
    const { count: totalCount } = await supabase
      .from(section.table)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 2);

    const status = (invalidCount === 0 && validCount === totalCount) ? '✅' : '❌';
    console.log(`  ${status} ${section.name}: ${validCount}/${totalCount} valid, ${invalidCount} invalid remaining`);

    if (invalidCount > 0 || validCount !== totalCount) {
      allGood = false;
    }
  }

  return allGood;
}

/**
 * Main function
 */
async function fixTest2AnswerKeys() {
  const fixResults = await fixAnswerKeys();
  const verificationPassed = await verifyAnswerKeyFix();

  console.log('\n🏆 FINAL ANSWER KEY FIX STATUS:');
  if (fixResults.success && verificationPassed) {
    console.log('🎉 ✅ ANSWER KEY FIX COMPLETE AND VERIFIED!');
    console.log('🎯 All Practice Test 2 questions now have proper A/B/C/D/E answers');
  } else {
    console.log('❌ ANSWER KEY FIX INCOMPLETE - manual review needed');
  }

  return fixResults.success && verificationPassed;
}

fixTest2AnswerKeys().catch(console.error);