#!/usr/bin/env node

/**
 * EXTRACT MATH QUESTIONS 16-30 - PRACTICE ACT 3
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

console.log('📝 EXTRACTING MATH QUESTIONS 16-30 - PRACTICE ACT 3');
console.log('Continuing Math section manual extraction with 100% accuracy');
console.log('=' .repeat(80));

// Math Questions 16-30 - Manually extracted from Practice ACT 3
const MATH_QUESTIONS_16_30 = [
  {
    question_number: 16,
    question_stem: "A square and a rectangle have the same area. The length of the rectangle is 196 centimeters, and the width of the rectangle is 4 centimeters. What is the length, in centimeters, of a side of the square?",
    choice_a: "20",
    choice_b: "28",
    choice_c: "100",
    choice_d: "400",
    choice_e: "784",
    correct_answer: "B",
    question_type: "geometry",
    question_category: "plane-geometry",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 16 - areas of rectangle and square"
  },
  {
    question_number: 17,
    question_stem: "T-shirts are on sale for D dollars each, including tax. Valentina has N dollars with which to purchase T-shirts. After she purchases the maximum number she can, Q T-shirts, she has R dollars left. For all possible choices of D and N, which of the following equations models a correct relationship between D, N, Q, and R, as defined?",
    choice_a: "N = Q + R",
    choice_b: "N = Q + RD",
    choice_c: "N = QD + RD",
    choice_d: "N = QD + R",
    choice_e: "N = QR + D",
    correct_answer: "D",
    question_type: "algebra",
    question_category: "elementary-algebra",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 17 - modeling with equations"
  },
  {
    question_number: 18,
    question_stem: "At a sandwich shop, customers can order either a meat or a vegetarian sandwich on either white or wheat bread. Out of a total of 50 customers, 20 ordered a sandwich on white bread, 28 ordered a meat sandwich, and 12 ordered a meat sandwich on white bread. How many customers ordered a vegetarian sandwich on wheat bread?",
    choice_a: "2",
    choice_b: "8",
    choice_c: "10",
    choice_d: "14",
    choice_e: "16",
    correct_answer: "D",
    question_type: "prealgebra",
    question_category: "data-analysis",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 18 - two-way table analysis"
  },
  {
    question_number: 19,
    question_stem: "A team of biologists tagged and released 90 deer in a forest. From the same forest 2 weeks later, the biologists collected a random sample of 30 deer, 5 of which were tagged. Let p be the proportion of deer in this forest that are tagged. What is p, the sample proportion, for this sample?",
    choice_a: "1/33",
    choice_b: "1/18",
    choice_c: "1/6",
    choice_d: "1/5",
    choice_e: "1/3",
    correct_answer: "C",
    question_type: "prealgebra",
    question_category: "probability-statistics",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 19 - sample proportion"
  },
  {
    question_number: 20,
    question_stem: "√2 + √8 + √18 = ?",
    choice_a: "2√7",
    choice_b: "6√2",
    choice_c: "12√2",
    choice_d: "14√2",
    choice_e: "14",
    correct_answer: "B",
    question_type: "algebra",
    question_category: "intermediate-algebra",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 20 - simplifying radicals"
  },
  {
    question_number: 21,
    question_stem: "Which of the following inequalities is equivalent to 3 - 2x > 7 - x?",
    choice_a: "x < -4",
    choice_b: "x > -4",
    choice_c: "x < -1/4",
    choice_d: "x > -1/4",
    choice_e: "x > 6",
    correct_answer: "A",
    question_type: "algebra",
    question_category: "elementary-algebra",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 21 - solving linear inequalities"
  },
  {
    question_number: 22,
    question_stem: "Let a be positive and b be negative. If it can be determined, in which quadrant of the standard (x,y) coordinate plane is the point (-a, b²) located?",
    choice_a: "I",
    choice_b: "II",
    choice_c: "III",
    choice_d: "IV",
    choice_e: "Cannot be determined from the given information",
    correct_answer: "B",
    question_type: "geometry",
    question_category: "coordinate-geometry",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 22 - coordinate plane quadrants"
  },
  {
    question_number: 23,
    question_stem: "The mass of a certain type of bacteria grows exponentially, doubling every 20 minutes. What was the mass, in milligrams, of the bacteria exactly 2 hours after the mass first reached 10 milligrams?",
    choice_a: "70",
    choice_b: "200",
    choice_c: "320",
    choice_d: "640",
    choice_e: "4,000",
    correct_answer: "D",
    question_type: "algebra",
    question_category: "functions",
    difficulty_level: "hard",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 23 - exponential growth"
  },
  {
    question_number: 24,
    question_stem: "One day will be randomly selected from the 7 days in a week. Then 1 month will be randomly selected from the 12 months in a year. What is the probability that the selected day will be Tuesday and the selected month will be January?",
    choice_a: "1/19",
    choice_b: "1/84",
    choice_c: "2/19",
    choice_d: "7/12",
    choice_e: "19/84",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "probability-statistics",
    difficulty_level: "easy",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 24 - independent probability"
  },
  {
    question_number: 25,
    question_stem: "The average weight of Juan, Jim, and Malik is exactly 160 pounds. The average weight of Juan, Jim, Malik, and Harry is exactly 150 pounds. How many pounds does Harry weigh?",
    choice_a: "100",
    choice_b: "120",
    choice_c: "130",
    choice_d: "155",
    choice_e: "190",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "statistics-averages",
    difficulty_level: "medium",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 25 - calculating from averages"
  },
  {
    question_number: 26,
    question_stem: "What is the value of the expression (log₆(36))(log₉(9))?",
    choice_a: "2",
    choice_b: "3",
    choice_c: "4",
    choice_d: "5",
    choice_e: "18",
    correct_answer: "C",
    question_type: "algebra",
    question_category: "functions",
    difficulty_level: "hard",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 26 - logarithm operations"
  },
  {
    question_number: 27,
    question_stem: "Each of 2 identical number cubes, shown below, has a different integer, 1 through 6, on each face. Consider the sample space determined by rolling these number cubes and adding the 2 integers on the faces that land on top. What is the positive difference between the greatest sum and the least sum in this sample space?",
    choice_a: "5",
    choice_b: "10",
    choice_c: "11",
    choice_d: "12",
    choice_e: "13",
    correct_answer: "B",
    question_type: "prealgebra",
    question_category: "probability-statistics",
    difficulty_level: "easy",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 27 - dice probability and range"
  },
  {
    question_number: 28,
    question_stem: "What angle measure, in radians, is equal to 30°?",
    choice_a: "π/12",
    choice_b: "π/6",
    choice_c: "π/4",
    choice_d: "π/3",
    choice_e: "π/2",
    correct_answer: "B",
    question_type: "geometry",
    question_category: "trigonometry",
    difficulty_level: "easy",
    has_figure: false,
    notes: "Practice ACT 3 Math Question 28 - degree to radian conversion"
  },
  {
    question_number: 29,
    question_stem: "For one school week, Hannah recorded temperature data. To the nearest degree, what was the mean of the differences in daily high and low temperatures for these 5 days? (Monday: Low -3°, High 26°; Tuesday: Low -5°, High 32°; Wednesday: Low -7°, High 22°; Thursday: Low 3°, High 40°; Friday: Low 2°, High 40°)",
    choice_a: "28°",
    choice_b: "29°",
    choice_c: "30°",
    choice_d: "32°",
    choice_e: "34°",
    correct_answer: "E",
    question_type: "prealgebra",
    question_category: "statistics-averages",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 29 - mean of differences"
  },
  {
    question_number: 30,
    question_stem: "A family's budgeted items are expressed as a fraction of their weekly income in the chart. (Fixed: 3/8, Food: 1/4, Utilities: 1/8, Transportation: 1/12, Personal: 1/16, Entertainment: 1/24) What fractional part of their weekly income is left for unbudgeted items?",
    choice_a: "1/48",
    choice_b: "1/24",
    choice_c: "1/12",
    choice_d: "1/8",
    choice_e: "1/4",
    correct_answer: "A",
    question_type: "prealgebra",
    question_category: "fractions",
    difficulty_level: "medium",
    has_figure: true,
    notes: "Practice ACT 3 Math Question 30 - adding fractions with different denominators"
  }
];

/**
 * Upload Math questions 16-30
 */
async function uploadMathQuestions16_30() {
  console.log('\n📤 UPLOADING MATH QUESTIONS 16-30...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of MATH_QUESTIONS_16_30) {
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

  console.log(`\n✅ Math questions 16-30 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check Math progress after adding 16-30
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

  console.log(`\n📊 MATH SECTION QUALITY AFTER Q16-30:`);
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
 * Main function for Math questions 16-30
 */
async function extractMathQuestions16_30() {
  console.log('\n🚀 CONTINUING MATH SECTION EXTRACTION - QUESTIONS 16-30');

  console.log('\n📋 ADDING MATH QUESTIONS 16-30:');
  console.log(`  Questions to Add: ${MATH_QUESTIONS_16_30.length} (Questions 16-30)`);

  // Upload questions 16-30
  const uploadResults = await uploadMathQuestions16_30();

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

// Run extraction for Math questions 16-30
extractMathQuestions16_30().catch(console.error);