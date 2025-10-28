#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 SAMPLE QUESTION CHECK\n');
console.log('='.repeat(80) + '\n');

// Check Q43 in detail
const { data: q43, error } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 6)
  .eq('question_number', 43)
  .single();

if (error) {
  console.error('❌ Error:', error.message);
} else {
  console.log('Question 43 Details:');
  console.log('-------------------');
  console.log('Test:', q43.test_number);
  console.log('Passage:', q43.passage_number);
  console.log('Question:', q43.question_number);
  console.log('\nStem:', q43.question_stem);
  console.log('\nUnderlined:', q43.underlined_text);
  console.log('\nChoices:');
  console.log('  A:', q43.choice_a);
  console.log('  B:', q43.choice_b);
  console.log('  C:', q43.choice_c);
  console.log('  D:', q43.choice_d);
  console.log('\nCorrect Answer:', q43.correct_answer);
  console.log('Question Type:', q43.question_type);
  console.log('Category:', q43.question_category);
}

console.log('\n' + '='.repeat(80) + '\n');
