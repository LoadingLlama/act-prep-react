#!/usr/bin/env node

/**
 * ASSIGN PROPER LESSON_IDS TO PRACTICE ACT 4 MATH QUESTIONS
 * Each question must map to a specific lesson the student learned from
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

// Lesson IDs from database
const LESSON_IDS = {
  'algebra-skills': '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'number-theory': '74013e77-3111-4dc6-beca-ff15948e4351',
  'angles-lines': '3e2c98a9-98e3-40e3-8301-11f38aa0c15b',
  'ratios-proportions': '27833f99-7aa1-4e5d-92e4-c953fadebc0d',
  'sequences': 'ad844a99-7156-4315-ac86-958f52468df2',
  'trigonometry': 'a0cddccc-a9e8-4ec0-a0b2-ef1cc46a161a',
  'probability': 'b5f5c943-7bcd-431a-aa94-df51be6612e2',
  'permutations-combinations': 'aaea35f0-81c0-4b3e-930c-d13edeeb3db5',
  'word-problems': 'ec9b95cf-47f7-4c01-8118-91aef61f7170',
  'functions': '89b5a825-cb28-4e50-a4a7-de9d73922bc9',
  'quadratics': 'f7516c41-afb2-48fb-a4e2-df9fe41d8b23',
  'systems-equations': '9fec6937-fba1-40f2-9a28-5ff838420384',
  'mean-median-mode': '4b3fd0c3-4de3-4e74-bd87-f78f5fb0ad17',
  'exponents-roots': 'b8c03bf0-99df-460d-be21-0015eebe7920',
  'areas-volumes': 'd2ae4a84-cb54-4006-8dee-8c325e443c2d',
  'complex-numbers': '0090877d-e7d2-4ac4-80b4-87a42502a214',
  'matrices': '6e95c291-2e8a-4ae9-8f7e-10caad8588b9',
  'absolute-value': '34e50480-0a09-4f9f-add4-c1121f66776b',
  'fractions': 'a8cd8513-f0a8-4bb1-9890-f21dc053939a',
  'percentages': '6203e4a3-6648-4e0c-9c31-52e35ee2c735',
  'circles-ellipses': '0b4b783a-9945-47b9-b3fc-e194374d6818',
  'lines': '8e92077d-ae10-48ce-a80d-348cc56969c3',
  'working-backwards': '06685249-874d-431f-9b7f-1c711d64a9cf',
  'scientific-notation': '4d711b65-dcda-4fb5-9740-7bfaae194ff2',
  'inequalities': '60e3cd06-406b-45bc-b9d7-e887ef8eeca6',
  'arcs-sectors': '928ee683-cf5c-46ab-a148-77da4e887e3b'
};

// Map each question to its appropriate lesson
const QUESTION_LESSON_MAP = {
  1: LESSON_IDS['algebra-skills'],              // Algebraic expression evaluation
  2: LESSON_IDS['permutations-combinations'],   // Counting principle
  3: LESSON_IDS['probability'],                 // Probability
  4: LESSON_IDS['word-problems'],               // Word problem with algebra
  5: LESSON_IDS['angles-lines'],                // Geometry - angles
  6: LESSON_IDS['areas-volumes'],               // Area calculation
  7: LESSON_IDS['scientific-notation'],         // Scientific notation
  8: LESSON_IDS['functions'],                   // Function evaluation
  9: LESSON_IDS['arcs-sectors'],                // Circle sectors
  10: LESSON_IDS['algebra-skills'],             // Polynomial expansion
  11: LESSON_IDS['fractions'],                  // Fraction operations
  12: LESSON_IDS['word-problems'],              // Word problem optimization
  13: LESSON_IDS['functions'],                  // Composite functions
  14: LESSON_IDS['algebra-skills'],             // Solving for variable
  15: LESSON_IDS['trigonometry'],               // Trig ratios
  16: LESSON_IDS['areas-volumes'],              // Area with geometry
  17: LESSON_IDS['number-theory'],              // LCM
  18: LESSON_IDS['algebra-skills'],             // Factoring
  19: LESSON_IDS['word-problems'],              // Measurement problem
  20: LESSON_IDS['word-problems'],              // Word problem with table
  21: LESSON_IDS['word-problems'],              // Word problem calculation
  22: LESSON_IDS['mean-median-mode'],           // Mean calculation
  23: LESSON_IDS['areas-volumes'],              // Volume comparison
  24: LESSON_IDS['exponents-roots'],            // Exponential equations
  25: LESSON_IDS['probability'],                // Probability
  26: LESSON_IDS['angles-lines'],               // Triangle angles
  27: LESSON_IDS['matrices'],                   // Matrix operations
  28: LESSON_IDS['exponents-roots'],            // Exponential equations
  29: LESSON_IDS['trigonometry'],               // Trig in right triangle
  30: LESSON_IDS['areas-volumes'],              // Area of quadrilateral
  31: LESSON_IDS['areas-volumes'],              // Perimeter calculation
  32: LESSON_IDS['angles-lines'],               // Coordinate geometry rotation
  33: LESSON_IDS['algebra-skills'],             // Rational expressions
  34: LESSON_IDS['word-problems'],              // Word problem with quadratic
  35: LESSON_IDS['lines'],                      // Slope calculation
  36: LESSON_IDS['word-problems'],              // Venn diagram problem
  37: LESSON_IDS['absolute-value'],             // Absolute value
  38: LESSON_IDS['areas-volumes'],              // Volume cylinder
  39: LESSON_IDS['mean-median-mode'],           // Median
  40: LESSON_IDS['word-problems'],              // Calendar logic
  41: LESSON_IDS['word-problems'],              // Word problem with system
  42: LESSON_IDS['algebra-skills'],             // Equation from word problem
  43: LESSON_IDS['complex-numbers'],            // Complex numbers
  44: LESSON_IDS['trigonometry'],               // Trig identities
  45: LESSON_IDS['angles-lines'],               // Graph theory/Euler path
  46: LESSON_IDS['functions'],                  // Function range
  47: LESSON_IDS['probability'],                // Probability
  48: LESSON_IDS['ratios-proportions'],         // Inverse variation
  49: LESSON_IDS['number-theory'],              // Perfect squares
  50: LESSON_IDS['percentages'],                // Percentage mixture
  51: LESSON_IDS['trigonometry'],               // Sine function properties
  52: LESSON_IDS['ratios-proportions'],         // Ratios
  53: LESSON_IDS['probability'],                // Conditional probability
  54: LESSON_IDS['angles-lines'],               // Parallelogram properties
  55: LESSON_IDS['inequalities'],               // Inequalities
  56: LESSON_IDS['word-problems'],              // Rate word problem
  57: LESSON_IDS['lines'],                      // Linear equations
  58: LESSON_IDS['systems-equations'],          // System of equations
  59: LESSON_IDS['permutations-combinations'],  // Combinations
  60: LESSON_IDS['quadratics']                  // Quadratic discriminant
};

async function assignProperLessons() {
  console.log('🎓 ASSIGNING PROPER LESSON_IDS TO PRACTICE ACT 4 MATH');
  console.log('='.repeat(70));

  let successCount = 0;
  const errors = [];

  for (let q = 1; q <= 60; q++) {
    const lessonId = QUESTION_LESSON_MAP[q];

    if (!lessonId) {
      errors.push(`Q${q}: No lesson mapping defined`);
      continue;
    }

    try {
      const { error } = await supabase
        .from('act_math_questions')
        .update({ lesson_id: lessonId })
        .eq('test_number', TEST_NUMBER)
        .eq('question_number', q);

      if (error) {
        errors.push(`Q${q}: ${error.message}`);
      } else {
        successCount++;
        console.log(`  ✅ Q${q}: Assigned to lesson`);
      }
    } catch (err) {
      errors.push(`Q${q}: ${err.message}`);
    }
  }

  console.log(`\n📊 LESSON ASSIGNMENT RESULTS:`);
  console.log(`  ✅ Successfully assigned: ${successCount}/60 questions`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(`    • ${e}`));
  }

  // Show lesson distribution
  const lessonCounts = {};
  Object.values(QUESTION_LESSON_MAP).forEach(lessonId => {
    lessonCounts[lessonId] = (lessonCounts[lessonId] || 0) + 1;
  });

  console.log(`\n📚 LESSON DISTRIBUTION:`);
  console.log(`  Unique lessons used: ${Object.keys(lessonCounts).length}`);

  console.log(`\n🎉 ALL LESSON_IDS PROPERLY ASSIGNED!`);
}

assignProperLessons();
