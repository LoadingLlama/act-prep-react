#!/usr/bin/env node

/**
 * FIX TEST 2 ENGLISH QUESTIONS - UNDERLINED TEXT BREAKDOWN
 * Extract underlined_text, context_before, and context_after from question_stem
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

console.log('🔧 FIXING TEST 2 ENGLISH QUESTIONS - UNDERLINED TEXT BREAKDOWN\n');
console.log('='.repeat(70));

/**
 * Parse question stem to extract underlined text and context
 */
function parseQuestionStem(questionStem) {
  // Match pattern: text<u>underlined</u>text
  const match = questionStem.match(/^(.*?)<u>(.*?)<\/u>(.*)$/);

  if (!match) {
    console.warn(`⚠️  No underlined portion found in: ${questionStem.substring(0, 80)}...`);
    return {
      underlined_text: '',
      context_before: questionStem,
      context_after: ''
    };
  }

  return {
    underlined_text: match[2],
    context_before: match[1],
    context_after: match[3]
  };
}

// First, get all Test 2 English questions
console.log('📝 Fetching all Test 2 English questions...');

const { data: questions, error: fetchError } = await supabase
  .from('act_english_questions')
  .select('id, question_number, question_stem')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (fetchError) {
  console.error('❌ Error fetching questions:', fetchError.message);
  process.exit(1);
}

console.log(`📋 Found ${questions.length} English questions to process\n`);

let successCount = 0;

for (const question of questions) {
  console.log(`\nQ${question.question_number}: Processing underlined breakdown...`);
  console.log(`Stem: ${question.question_stem.substring(0, 80)}...`);

  // Parse the question stem
  const parsed = parseQuestionStem(question.question_stem);

  console.log(`  Underlined: "${parsed.underlined_text}"`);
  console.log(`  Before: "${parsed.context_before.substring(0, 40)}..."`);
  console.log(`  After: "${parsed.context_after.substring(0, 40)}..."`);

  // Update in database
  const { error } = await supabase
    .from('act_english_questions')
    .update({
      underlined_text: parsed.underlined_text,
      context_before: parsed.context_before,
      context_after: parsed.context_after
    })
    .eq('id', question.id);

  if (error) {
    console.error(`❌ Error updating Q${question.question_number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Q${question.question_number} with breakdown`);
  }
}

console.log(`\n🎉 Successfully processed ${successCount}/${questions.length} English questions!`);
console.log('✅ All English questions now have proper underlined_text, context_before, and context_after');
console.log('\n📝 Example format:');
console.log('  question_stem: "Sugarhill Records signed numerous rap artists<u>;</u> Grandmaster Flash and the Furious Five were among them."');
console.log('  underlined_text: ";"');
console.log('  context_before: "Sugarhill Records signed numerous rap artists"');
console.log('  context_after: " Grandmaster Flash and the Furious Five were among them."');
console.log('\n📋 NEXT: Continue with remaining Math questions extraction\n');