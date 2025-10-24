#!/usr/bin/env node

/**
 * CHECK TEST 2 PASSAGE 1 QUESTIONS
 * See what's actually in the first 15 English questions
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING TEST 2 PASSAGE 1 QUESTIONS (1-15)\n');
console.log('='.repeat(70));

const { data: questions, error } = await supabase
  .from('act_english_questions')
  .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, correct_answer')
  .eq('test_number', 2)
  .gte('question_number', 1)
  .lte('question_number', 15)
  .order('question_number');

if (error) {
  console.error('❌ Error:', error.message);
} else {
  console.log(`Found ${questions.length} questions for Passage 1:\n`);

  for (const q of questions) {
    console.log(`📝 Question ${q.question_number}:`);
    console.log(`   Stem: "${q.question_stem?.substring(0, 80)}..."`);
    console.log(`   A: "${q.choice_a}"`);
    console.log(`   B: "${q.choice_b}"`);
    console.log(`   C: "${q.choice_c}"`);
    console.log(`   D: "${q.choice_d}"`);
    console.log(`   Correct: ${q.correct_answer}`);
    console.log('');
  }
}

console.log('❌ ISSUE: These are placeholder questions, NOT the actual content from the PDF!');
console.log('🔧 NEED: Extract real questions from the PDF source files\n');