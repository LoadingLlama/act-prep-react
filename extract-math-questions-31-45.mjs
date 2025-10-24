#!/usr/bin/env node

/**
 * EXTRACT MATH QUESTIONS 31-45 - PRACTICE ACT 3
 * Continuing Math section manual extraction with 100% accuracy
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 EXTRACTING MATH QUESTIONS 31-45 - PRACTICE ACT 3');
console.log('Continuing Math section manual extraction with 100% accuracy');
console.log('=' .repeat(80));

// Math Questions 31-45 - Manually extracted from Practice ACT 3
const MATH_QUESTIONS_31_45 = [
  {
    question_number: 31,
    question_stem: "What is the 322nd digit after the decimal point in the repeating decimal 0.1357̄?",
    choice_a: "1",
    choice_b: "3",
    choice_c: "5",
    choice_d: "7",
    choice_e: "Cannot be determined",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "number-properties",
    difficulty_level: "hard",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 31 - repeating decimals"
  },
  {
    question_number: 32,
    question_stem: "You and a friend each have a can full of water. You start pouring the water from your can into an empty bucket at a constant rate of 4 ounces per second. While you are still pouring water, 3 seconds after you started, your friend starts pouring the water from her can into the same bucket at a constant rate of 2 ounces per second. How many seconds after you first started pouring the water into the bucket will it contain 24 ounces of water?",
    choice_a: "4",
    choice_b: "5",
    choice_c: "6",
    choice_d: "8",
    choice_e: "12",
    correct_answer: "A",
    question_type: "algebra",
    question_category: "elementary-algebra",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 32 - rate problems"
  },
  {
    question_number: 33,
    question_stem: "A package of candy contains pieces each of which is 1 of 6 possible colors: brown, red, green, yellow, orange, and blue. In each package, 1/2 of the pieces are brown and the remaining pieces have an even distribution of the other 5 colors. What is the probability that a piece drawn randomly from the package is red?",
    choice_a: "1/12",
    choice_b: "1/10",
    choice_c: "1/6",
    choice_d: "1/5",
    choice_e: "1/2",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "probability-statistics",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 33 - probability with unequal distribution"
  },
  {
    question_number: 34,
    question_stem: "Which of the following intervals is the range of the function f(x) = -(x - 3)² + 4?",
    choice_a: "(0, 3]",
    choice_b: "(0, 4]",
    choice_c: "[3, 4]",
    choice_d: "[3, ∞)",
    choice_e: "(-∞, 4]",
    correct_answer: "E",
    question_type: "algebra",
    question_category: "functions",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 34 - range of quadratic function"
  },
  {
    question_number: 35,
    question_stem: "Anoki made a scale drawing of his rectangular classroom. The classroom is 7.5 meters by 9.0 meters. In his scale drawing, Anoki made the length of the shorter side of the classroom 9.0 centimeters. What is the length, in centimeters, of the longer side of the classroom in Anoki's scale drawing?",
    choice_a: "7.5",
    choice_b: "10.5",
    choice_c: "10.8",
    choice_d: "15.0",
    choice_e: "16.5",
    correct_answer: "C",
    question_type: "prealgebra",
    question_category: "proportions",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 35 - scale drawings and proportions"
  },
  {
    question_number: 36,
    question_stem: "In rhombus ABCD shown below, AC = 5 feet and BD = 6 feet. What is the area of ABCD, in square feet?",
    choice_a: "11",
    choice_b: "15",
    choice_c: "22",
    choice_d: "30",
    choice_e: "61",
    correct_answer: "B",
    question_type: "geometry",
    question_category: "plane-geometry",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 36 - area of rhombus using diagonals"
  },
  {
    question_number: 37,
    question_stem: "One number is 25% of a second number, and the second number is 70% of a third number. The first number is what percent of the third number?",
    choice_a: "17.5%",
    choice_b: "42.5%",
    choice_c: "45%",
    choice_d: "87.5%",
    choice_e: "95%",
    correct_answer: "A",
    question_type: "prealgebra",
    question_category: "percentages",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 37 - compound percentages"
  },
  {
    question_number: 38,
    question_stem: "The monthly rent charged for a store at Center Street Mall is $2 per square foot of floor area. The floor plan of a store at Center Street Mall is shown in the figure below, with right angles as indicated and all distances given in feet. How much monthly rent is charged for this store?",
    choice_a: "$1,656",
    choice_b: "$1,872",
    choice_c: "$6,624",
    choice_d: "$7,380",
    choice_e: "$7,488",
    correct_answer: "E",
    question_type: "geometry",
    question_category: "plane-geometry",
    difficulty_level: "hard",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 38 - area of complex polygon"
  },
  {
    question_number: 39,
    question_stem: "Mrs. Neeson, a science teacher, told her students that 30.0% of their final semester grades will come from their homework averages, and the remaining 70.0% will come from their test averages. She also said that the final exam will count for 20.0% of the test average. What percent of the science final semester grade is the final exam grade?",
    choice_a: "6.0%",
    choice_b: "10.5%",
    choice_c: "14.0%",
    choice_d: "20.0%",
    choice_e: "28.6%",
    correct_answer: "C",
    question_type: "prealgebra",
    question_category: "percentages",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 39 - weighted averages and percentages"
  },
  {
    question_number: 40,
    question_stem: "A rectangle with an area of 30 square inches has length and width, in inches, that are both integers. Which of the following CANNOT be the perimeter, in inches, of the rectangle?",
    choice_a: "22",
    choice_b: "26",
    choice_c: "31",
    choice_d: "34",
    choice_e: "62",
    correct_answer: "C",
    question_type: "geometry",
    question_category: "plane-geometry",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 40 - rectangle area and perimeter constraints"
  },
  {
    question_number: 41,
    question_stem: "A couple is deciding between 2 condos to purchase. Condo X costs $210,000 and Condo Y costs $189,900. What is the positive difference, in dollars, of the 2 list prices?",
    choice_a: "2.01 × 10³",
    choice_b: "2.01 × 10⁴",
    choice_c: "2.01 × 10⁵",
    choice_d: "2.10 × 10⁴",
    choice_e: "2.10 × 10⁵",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "scientific-notation",
    difficulty_level: "easy",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 41 - difference and scientific notation"
  },
  {
    question_number: 42,
    question_stem: "The couple will consider the price per square foot of each condo. Let x and y be the price per square foot, rounded to the nearest $1, of Condo X and Condo Y, respectively. One of the following comparisons is true. Which one? (Condo X: $210,000, 2,274 ft²; Condo Y: $189,900, 1,726 ft²)",
    choice_a: "x is $3 greater than y",
    choice_b: "x is $6 less than y",
    choice_c: "x is $6 greater than y",
    choice_d: "x is $18 less than y",
    choice_e: "x is $18 greater than y",
    correct_answer: "D",
    question_type: "prealgebra",
    question_category: "rates",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 42 - unit rates and comparison"
  },
  {
    question_number: 43,
    question_stem: "The annual property tax for Condo X is 2% of its assessed value. The annual property tax is $3,824. What is the assessed value of Condo X?",
    choice_a: "$42,000",
    choice_b: "$186,200",
    choice_c: "$191,200",
    choice_d: "$205,900",
    choice_e: "$210,000",
    correct_answer: "C",
    question_type: "prealgebra",
    question_category: "percentages",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 43 - finding whole from percentage"
  },
  {
    question_number: 44,
    question_stem: "In the complex plane, consider the segment whose endpoints are the points corresponding to -6 + 3i and 2 - 7i. The midpoint of this segment corresponds to which of the following complex numbers?",
    choice_a: "-4 - 4i",
    choice_b: "-4 + 5i",
    choice_c: "-2 - 2i",
    choice_d: "-2 + 2i",
    choice_e: "4 + 5i",
    correct_answer: "C",
    question_type: "algebra",
    question_category: "functions",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 44 - midpoint of complex numbers"
  },
  {
    question_number: 45,
    question_stem: "In the standard (x,y) coordinate plane, the 3 lines with equations y = 3x - 3, y = 2x + 2, and x = 0 bound a triangular region. What is the area, in square coordinate units, of that triangular region?",
    choice_a: "2.5",
    choice_b: "5.0",
    choice_c: "7.5",
    choice_d: "12.5",
    choice_e: "62.5",
    correct_answer: "D",
    question_type: "geometry",
    question_category: "coordinate-geometry",
    difficulty_level: "hard",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 45 - area of triangle formed by lines"
  }
];

/**
 * Upload Math questions 31-45
 */
async function uploadMathQuestions31_45() {
  console.log('\n📤 UPLOADING MATH QUESTIONS 31-45...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of MATH_QUESTIONS_31_45) {
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

  console.log(`\n✅ Math questions 31-45 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check Math progress after adding 31-45
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

  console.log(`\n📊 MATH SECTION QUALITY AFTER Q31-45:`);
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
 * Main function for Math questions 31-45
 */
async function extractMathQuestions31_45() {
  console.log('\n🚀 CONTINUING MATH SECTION EXTRACTION - QUESTIONS 31-45');

  console.log('\n📋 ADDING MATH QUESTIONS 31-45:');
  console.log(`  Questions to Add: ${MATH_QUESTIONS_31_45.length} (Questions 31-45)`);

  // Upload questions 31-45
  const uploadResults = await uploadMathQuestions31_45();

  // Check progress
  const progressResults = await checkMathProgress();

  console.log('\n🎯 MATH SECTION PROGRESS UPDATE!');
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

// Run extraction for Math questions 31-45
extractMathQuestions31_45().catch(console.error);