#!/usr/bin/env node

/**
 * FIX PRACTICE ACT 4 MATH METADATA
 * Add missing has_figure, difficulty_level, proper question_type and question_category
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

// Questions with figures/diagrams
const QUESTIONS_WITH_FIGURES = [5, 6, 9, 12, 16, 23, 26, 27, 29, 30, 39, 45, 56];

// Question type categorization based on content
const QUESTION_TYPES = {
  1: 'algebra',
  2: 'counting_probability',
  3: 'counting_probability',
  4: 'algebra',
  5: 'geometry',
  6: 'geometry',
  7: 'number_properties',
  8: 'functions',
  9: 'geometry',
  10: 'algebra',
  11: 'number_properties',
  12: 'algebra',
  13: 'functions',
  14: 'algebra',
  15: 'trigonometry',
  16: 'geometry',
  17: 'number_properties',
  18: 'algebra',
  19: 'measurement',
  20: 'algebra',
  21: 'algebra',
  22: 'statistics',
  23: 'geometry',
  24: 'algebra',
  25: 'counting_probability',
  26: 'geometry',
  27: 'algebra',
  28: 'algebra',
  29: 'trigonometry',
  30: 'geometry',
  31: 'geometry',
  32: 'geometry',
  33: 'algebra',
  34: 'algebra',
  35: 'geometry',
  36: 'algebra',
  37: 'number_properties',
  38: 'geometry',
  39: 'statistics',
  40: 'number_properties',
  41: 'algebra',
  42: 'algebra',
  43: 'algebra',
  44: 'trigonometry',
  45: 'geometry',
  46: 'functions',
  47: 'counting_probability',
  48: 'algebra',
  49: 'number_properties',
  50: 'algebra',
  51: 'trigonometry',
  52: 'algebra',
  53: 'counting_probability',
  54: 'geometry',
  55: 'algebra',
  56: 'algebra',
  57: 'algebra',
  58: 'algebra',
  59: 'counting_probability',
  60: 'algebra'
};

// Question categories (ACT content areas)
const QUESTION_CATEGORIES = {
  1: 'PHM-A',   // Preparing for Higher Math - Algebra
  2: 'PHM-N',   // PHM - Number & Quantity
  3: 'PHM-N',
  4: 'PHM-A',
  5: 'PHM-G',   // PHM - Geometry
  6: 'PHM-G',
  7: 'PHM-N',
  8: 'PHM-F',   // PHM - Functions
  9: 'PHM-G',
  10: 'PHM-A',
  11: 'PHM-N',
  12: 'PHM-A',
  13: 'PHM-F',
  14: 'PHM-A',
  15: 'PHM-G',
  16: 'PHM-G',
  17: 'PHM-N',
  18: 'PHM-A',
  19: 'IM',     // Integrating Essential Skills - Modeling
  20: 'PHM-A',
  21: 'PHM-A',
  22: 'PHM-S',  // PHM - Statistics & Probability
  23: 'PHM-G',
  24: 'PHM-A',
  25: 'PHM-S',
  26: 'PHM-G',
  27: 'PHM-A',
  28: 'PHM-A',
  29: 'PHM-G',
  30: 'PHM-G',
  31: 'PHM-G',
  32: 'PHM-G',
  33: 'PHM-A',
  34: 'PHM-A',
  35: 'PHM-G',
  36: 'PHM-A',
  37: 'PHM-N',
  38: 'PHM-G',
  39: 'PHM-S',
  40: 'PHM-N',
  41: 'PHM-A',
  42: 'PHM-A',
  43: 'PHM-N',
  44: 'PHM-G',
  45: 'PHM-G',
  46: 'PHM-F',
  47: 'PHM-S',
  48: 'PHM-A',
  49: 'PHM-N',
  50: 'PHM-A',
  51: 'PHM-G',
  52: 'PHM-A',
  53: 'PHM-S',
  54: 'PHM-G',
  55: 'PHM-A',
  56: 'IM',
  57: 'PHM-A',
  58: 'PHM-A',
  59: 'PHM-S',
  60: 'PHM-A'
};

// Difficulty levels (estimated based on question complexity)
const DIFFICULTY_LEVELS = {
  1: 'easy',
  2: 'easy',
  3: 'easy',
  4: 'medium',
  5: 'medium',
  6: 'medium',
  7: 'medium',
  8: 'easy',
  9: 'medium',
  10: 'easy',
  11: 'easy',
  12: 'medium',
  13: 'medium',
  14: 'easy',
  15: 'medium',
  16: 'hard',
  17: 'easy',
  18: 'medium',
  19: 'easy',
  20: 'medium',
  21: 'easy',
  22: 'easy',
  23: 'medium',
  24: 'medium',
  25: 'hard',
  26: 'medium',
  27: 'hard',
  28: 'medium',
  29: 'medium',
  30: 'easy',
  31: 'medium',
  32: 'easy',
  33: 'medium',
  34: 'medium',
  35: 'easy',
  36: 'medium',
  37: 'easy',
  38: 'hard',
  39: 'medium',
  40: 'medium',
  41: 'hard',
  42: 'medium',
  43: 'medium',
  44: 'hard',
  45: 'hard',
  46: 'hard',
  47: 'medium',
  48: 'medium',
  49: 'medium',
  50: 'easy',
  51: 'hard',
  52: 'medium',
  53: 'hard',
  54: 'easy',
  55: 'medium',
  56: 'hard',
  57: 'medium',
  58: 'hard',
  59: 'medium',
  60: 'hard'
};

async function updateMathMetadata() {
  console.log('🔧 UPDATING PRACTICE ACT 4 MATH METADATA');
  console.log('='.repeat(60));

  let successCount = 0;
  const errors = [];

  for (let q = 1; q <= 60; q++) {
    const updates = {
      has_figure: QUESTIONS_WITH_FIGURES.includes(q),
      question_type: QUESTION_TYPES[q],
      question_category: QUESTION_CATEGORIES[q],
      difficulty_level: DIFFICULTY_LEVELS[q],
      notes: `Practice Test 4 Math Question ${q}`
    };

    try {
      const { error } = await supabase
        .from('act_math_questions')
        .update(updates)
        .eq('test_number', TEST_NUMBER)
        .eq('question_number', q);

      if (error) {
        errors.push(`Q${q}: ${error.message}`);
      } else {
        successCount++;
        console.log(`  ✅ Q${q}: ${updates.question_type} (${updates.question_category}) - ${updates.difficulty_level}${updates.has_figure ? ' [has figure]' : ''}`);
      }
    } catch (err) {
      errors.push(`Q${q}: ${err.message}`);
    }
  }

  console.log(`\n📊 METADATA UPDATE RESULTS:`);
  console.log(`  ✅ Successfully updated: ${successCount}/60 questions`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(`    • ${e}`));
  }

  console.log(`\n🎉 ALL MATH METADATA UPDATED!`);
}

updateMathMetadata();
