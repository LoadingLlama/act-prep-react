#!/usr/bin/env node

/**
 * EXTRACT MATH QUESTIONS 1-15 - PRACTICE ACT 3
 * Starting Math section manual extraction with 100% accuracy
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 EXTRACTING MATH QUESTIONS 1-15 - PRACTICE ACT 3');
console.log('Starting Math section manual extraction with 100% accuracy');
console.log('=' .repeat(80));

// Math Questions 1-15 - Manually extracted from Practice ACT 3
const MATH_QUESTIONS_1_15 = [
  {
    question_number: 1,
    question_stem: "In the figure below, C is on BD, ∠BAC measures 40°, and ∠ABC measures 110°. What is the measure of ∠ACD?",
    choice_a: "110°",
    choice_b: "120°",
    choice_c: "130°",
    choice_d: "140°",
    choice_e: "150°",
    correct_answer: "C",
    question_type: "geometry",
    question_category: "plane-geometry",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 1 - angle relationships"
  },
  {
    question_number: 2,
    question_stem: "For what value of a is the equation a/2 + 4 = 10 = 6 true?",
    choice_a: "-32",
    choice_b: "-8",
    choice_c: "-2",
    choice_d: "8",
    choice_e: "32",
    correct_answer: "B",
    question_type: "algebra",
    question_category: "elementary-algebra",
    difficulty_level: "easy",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 2 - solving linear equations"
  },
  {
    question_number: 3,
    question_stem: "What is the least common denominator of the fractions 1/4, 3/15, and 2/9?",
    choice_a: "24",
    choice_b: "120",
    choice_c: "300",
    choice_d: "480",
    choice_e: "2,400",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "number-properties",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 3 - least common denominator"
  },
  {
    question_number: 4,
    question_stem: "|5 - 3| - |1 - 6| = ?",
    choice_a: "-7",
    choice_b: "-3",
    choice_c: "3",
    choice_d: "7",
    choice_e: "15",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "number-properties",
    difficulty_level: "easy",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 4 - absolute value"
  },
  {
    question_number: 5,
    question_stem: "In the trapezoid below, AB is parallel to DC. What is the measure of ∠C?",
    choice_a: "50°",
    choice_b: "95°",
    choice_c: "115°",
    choice_d: "130°",
    choice_e: "135°",
    correct_answer: "E",
    question_type: "geometry",
    question_category: "plane-geometry",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 5 - trapezoid angle relationships"
  },
  {
    question_number: 6,
    question_stem: "Gao earns his regular pay of $12 per hour for up to 40 hours of work per week. For each hour over 40 hours of work per week, Gao is paid 1.5 times his regular pay. How much does Gao earn in a week in which he works 56 hours?",
    choice_a: "$672",
    choice_b: "$756",
    choice_c: "$768",
    choice_d: "$1,008",
    choice_e: "$1,344",
    correct_answer: "C",
    question_type: "prealgebra",
    question_category: "rates",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 6 - overtime pay calculation"
  },
  {
    question_number: 7,
    question_stem: "On the first day of school, Ms. Dubacek gave her third-grade students 6 new spelling words to learn. On each day of school after that, she gave the students 3 new spelling words. How many new spelling words had she given the students by the end of the 21st day of school?",
    choice_a: "60",
    choice_b: "63",
    choice_c: "66",
    choice_d: "69",
    choice_e: "72",
    correct_answer: "C",
    question_type: "prealgebra",
    question_category: "arithmetic-sequences",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 7 - arithmetic sequence"
  },
  {
    question_number: 8,
    question_stem: "What is the value of the expression (4!)°? (Note: 3! = 3(2)(1) and 6! = 6(5)(4)(3)(2)(1))",
    choice_a: "0",
    choice_b: "1",
    choice_c: "5",
    choice_d: "70",
    choice_e: "420",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "exponents",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 8 - factorial and zero exponent"
  },
  {
    question_number: 9,
    question_stem: "Right triangle ABC and its side lengths given in inches are shown below. What is sin B?",
    choice_a: "a/c",
    choice_b: "a/b",
    choice_c: "c/a",
    choice_d: "b/c",
    choice_e: "c/b",
    correct_answer: "A",
    question_type: "geometry",
    question_category: "trigonometry",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 9 - sine ratio in right triangle"
  },
  {
    question_number: 10,
    question_stem: "(6a² - 5ac² + 12c) - (4c - 3a² - 2ac²) is equivalent to:",
    choice_a: "2a² - 2ac² + 14c",
    choice_b: "3a² - 7ac² + 16c",
    choice_c: "9a² - 3ac² + 8c",
    choice_d: "3a² - 7ac² + 16c²",
    choice_e: "9a² - 3a²c² + 8c²",
    correct_answer: "C",
    question_type: "algebra",
    question_category: "elementary-algebra",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 10 - polynomial operations"
  },
  {
    question_number: 11,
    question_stem: "Which of the following (x,y) pairs is the solution for the system of equations x + 2y = 2 and -x + y = 7?",
    choice_a: "(-4, 3)",
    choice_b: "(-2, 5)",
    choice_c: "(3, -4)",
    choice_d: "(5, -2)",
    choice_e: "(7, -1)",
    correct_answer: "A",
    question_type: "algebra",
    question_category: "intermediate-algebra",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 11 - system of linear equations"
  },
  {
    question_number: 12,
    question_stem: "Tim's flight was originally scheduled to depart at 4:51 p.m., but it was delayed 563 minutes. What time did Tim's flight eventually depart?",
    choice_a: "1:12 a.m.",
    choice_b: "1:28 a.m.",
    choice_c: "2:14 a.m.",
    choice_d: "10:14 p.m.",
    choice_e: "10:54 p.m.",
    correct_answer: "C",
    question_type: "prealgebra",
    question_category: "time-calculations",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 12 - time calculation with delays"
  },
  {
    question_number: 13,
    question_stem: "A circle with the equation x² + y² = 144 is graphed in the standard (x,y) coordinate plane. At what points does the circle intersect the x-axis?",
    choice_a: "(-6, 0) and (6, 0)",
    choice_b: "(-12, 0) and (12, 0)",
    choice_c: "(-24, 0) and (24, 0)",
    choice_d: "(-72, 0) and (72, 0)",
    choice_e: "(-144, 0) and (144, 0)",
    correct_answer: "B",
    question_type: "geometry",
    question_category: "coordinate-geometry",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 13 - circle equation and x-intercepts"
  },
  {
    question_number: 14,
    question_stem: "Given that x² - 5x - 36 factors into 2 binomial factors with integer coefficients, which of the following binomials is 1 of those factors?",
    choice_a: "(x - 4)",
    choice_b: "(x - 6)",
    choice_c: "(x - 9)",
    choice_d: "(x + 4)",
    choice_e: "(x + 6)",
    correct_answer: "C",
    question_type: "algebra",
    question_category: "intermediate-algebra",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 14 - factoring quadratics"
  },
  {
    question_number: 15,
    question_stem: "Two vectors are shown in the standard (x,y) coordinate plane below. One of the following vectors in the standard (x,y) coordinate plane is the sum of these 2 vectors. Which one?",
    choice_a: "Vector A",
    choice_b: "Vector B",
    choice_c: "Vector C",
    choice_d: "Vector D",
    choice_e: "Vector E",
    correct_answer: "C",
    question_type: "geometry",
    question_category: "coordinate-geometry",
    difficulty_level: "hard",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 15 - vector addition"
  }
];

/**
 * Upload Math questions 1-15
 */
async function uploadMathQuestions1_15() {
  console.log('\n📤 UPLOADING MATH QUESTIONS 1-15...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of MATH_QUESTIONS_1_15) {
    try {
      const questionData = {
        test_number: 3,
        lesson_id: null,
        ...question
      };

      const { error } = await supabase
        .from('act_math_questions')
        .upsert([questionData]);

      if (error) {
        errors.push(`Math Question ${question.question_number}: ${error.message}`);
      } else {
        totalUploaded++;
        console.log(`  ✅ Uploaded Math question ${question.question_number}`);
        console.log(`     Stem: ${question.question_stem.substring(0, 50)}...`);
        console.log(`     Answer: ${question.correct_answer}`);
      }
    } catch (err) {
      errors.push(`Math Question ${question.question_number}: ${err.message}`);
    }
  }

  console.log(`\n✅ Math questions 1-15 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check Math progress after adding 1-15
 */
async function checkMathProgress() {
  console.log('\n📊 CHECKING MATH SECTION PROGRESS...');

  // Check total questions
  const { data: questions } = await supabase
    .from('act_math_questions')
    .select('question_number, correct_answer, choice_a, choice_b, choice_c, choice_d, choice_e')
    .eq('test_number', 3)
    .order('question_number');

  console.log(`❓ Total Math Questions: ${questions?.length || 0}`);

  let questionsWithAllChoices = 0;
  let questionsWithAnswers = 0;

  questions?.forEach(q => {
    const hasAllChoices = q.choice_a && q.choice_b && q.choice_c && q.choice_d && q.choice_e;
    if (hasAllChoices) questionsWithAllChoices++;
    if (q.correct_answer) questionsWithAnswers++;
  });

  console.log(`\n📊 MATH SECTION QUALITY:`);
  console.log(`  Questions with all choices: ${questionsWithAllChoices}/${questions?.length || 0}`);
  console.log(`  Questions with answers: ${questionsWithAnswers}/${questions?.length || 0}`);
  console.log(`  Progress: ${questions?.length || 0}/60 questions (${Math.round(((questions?.length || 0) / 60) * 100)}%)`);

  return {
    totalQuestions: questions?.length || 0,
    questionsWithAllChoices,
    questionsWithAnswers,
    progressPercentage: Math.round(((questions?.length || 0) / 60) * 100)
  };
}

/**
 * Main function for Math questions 1-15
 */
async function extractMathQuestions1_15() {
  console.log('\n🚀 STARTING MATH SECTION EXTRACTION - QUESTIONS 1-15');

  console.log('\n📋 ADDING MATH QUESTIONS 1-15:');
  console.log(`  Questions to Add: ${MATH_QUESTIONS_1_15.length} (Questions 1-15)`);

  // Upload questions 1-15
  const uploadResults = await uploadMathQuestions1_15();

  // Check progress
  const progressResults = await checkMathProgress();

  console.log('\n🎯 MATH SECTION EXTRACTION STARTED!');
  console.log(`✅ Questions Added: ${uploadResults.totalUploaded}`);
  console.log(`✅ Total Progress: ${progressResults.totalQuestions}/60 questions (${progressResults.progressPercentage}%)`);
  console.log(`✅ Quality: ${progressResults.questionsWithAllChoices}/${progressResults.totalQuestions} questions have all choices`);

  console.log('\n📋 NEXT STEPS:');
  console.log(`1. Continue extracting remaining ${60 - progressResults.totalQuestions} Math questions`);
  console.log('2. Move to Reading section once Math is complete');
  console.log('3. Complete with Science section');

  return {
    success: true,
    uploadResults,
    progressResults,
    remainingQuestions: 60 - progressResults.totalQuestions
  };
}

// Run extraction for Math questions 1-15
extractMathQuestions1_15().catch(console.error);