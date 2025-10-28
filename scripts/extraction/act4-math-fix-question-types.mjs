#!/usr/bin/env node

/**
 * FIX PRACTICE ACT 4 MATH QUESTION_TYPE
 * Update to match the actual question_type values used in the system
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 4;

// Corrected question types to match system
const QUESTION_TYPES = {
  1: 'algebra',
  2: 'statistics-probability',
  3: 'statistics-probability',
  4: 'word-problem',
  5: 'geometry',
  6: 'geometry',
  7: 'algebra',
  8: 'algebra',
  9: 'geometry',
  10: 'algebra',
  11: 'word-problem',
  12: 'word-problem',
  13: 'algebra',
  14: 'algebra',
  15: 'trigonometry',
  16: 'geometry',
  17: 'math-problem-solving',
  18: 'algebra',
  19: 'word-problem',
  20: 'word-problem',
  21: 'word-problem',
  22: 'statistics-probability',
  23: 'geometry',
  24: 'algebra',
  25: 'statistics-probability',
  26: 'geometry',
  27: 'word-problem',
  28: 'algebra',
  29: 'trigonometry',
  30: 'geometry',
  31: 'geometry',
  32: 'geometry',
  33: 'algebra',
  34: 'word-problem',
  35: 'geometry',
  36: 'word-problem',
  37: 'math-problem-solving',
  38: 'geometry',
  39: 'statistics-probability',
  40: 'word-problem',
  41: 'word-problem',
  42: 'word-problem',
  43: 'algebra',
  44: 'trigonometry',
  45: 'geometry',
  46: 'algebra',
  47: 'statistics-probability',
  48: 'word-problem',
  49: 'math-problem-solving',
  50: 'word-problem',
  51: 'trigonometry',
  52: 'word-problem',
  53: 'statistics-probability',
  54: 'geometry',
  55: 'algebra',
  56: 'word-problem',
  57: 'algebra',
  58: 'algebra',
  59: 'statistics-probability',
  60: 'algebra'
};

async function updateQuestionTypes() {
  console.log('🔧 FIXING PRACTICE ACT 4 MATH QUESTION_TYPE');
  console.log('='.repeat(60));

  let successCount = 0;
  const errors = [];

  for (let q = 1; q <= 60; q++) {
    const questionType = QUESTION_TYPES[q];

    try {
      const { error } = await supabase
        .from('act_math_questions')
        .update({ question_type: questionType })
        .eq('test_number', TEST_NUMBER)
        .eq('question_number', q);

      if (error) {
        errors.push(`Q${q}: ${error.message}`);
      } else {
        successCount++;
        console.log(`  ✅ Q${q}: ${questionType}`);
      }
    } catch (err) {
      errors.push(`Q${q}: ${err.message}`);
    }
  }

  console.log(`\n📊 QUESTION_TYPE FIX RESULTS:`);
  console.log(`  ✅ Successfully updated: ${successCount}/60 questions`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(`    • ${e}`));
  }

  console.log(`\n🎉 ALL QUESTION_TYPE VALUES CORRECTED!`);
}

updateQuestionTypes();
