#!/usr/bin/env node

/**
 * CHECK SPECIFIC QUESTIONS
 * Verify what's actually in the database after extraction
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

console.log('🔍 CHECKING SPECIFIC TEST 2 QUESTIONS\n');
console.log('='.repeat(70));

async function checkQuestion(tableName, qNum, sectionName) {
  console.log(`\n📊 ${sectionName} Question ${qNum}:`);

  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', qNum)
    .single();

  if (error) {
    console.error(`❌ Error:`, error.message);
    return;
  }

  if (!data) {
    console.log('❌ Question not found');
    return;
  }

  console.log(`Question Stem: "${data.question_stem?.substring(0, 100)}${data.question_stem?.length > 100 ? '...' : ''}"`);
  console.log(`Choice A: "${data.choice_a}"`);
  console.log(`Choice B: "${data.choice_b}"`);
  console.log(`Choice C: "${data.choice_c}"`);
  console.log(`Choice D: "${data.choice_d}"`);
  if (data.choice_e !== undefined) console.log(`Choice E: "${data.choice_e}"`);
  console.log(`Correct Answer: ${data.correct_answer}`);

  const hasContent = data.question_stem &&
                     !data.question_stem.includes('[Question') &&
                     data.question_stem.length > 20 &&
                     data.choice_a && data.choice_b && data.choice_c && data.choice_d;

  console.log(`Status: ${hasContent ? '✅ Complete' : '❌ Missing content'}`);
}

// Check one question from each section
await checkQuestion('act_english_questions', 1, 'English');
await checkQuestion('act_math_questions', 1, 'Math');
await checkQuestion('act_reading_questions', 1, 'Reading');
await checkQuestion('act_science_questions', 1, 'Science');

// Check the missing English Q71
await checkQuestion('act_english_questions', 71, 'English');

console.log('\n✅ Specific question check complete!\n');