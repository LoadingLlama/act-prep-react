#!/usr/bin/env node

/**
 * PRACTICE ACT 4 - MATH QUESTIONS 21-40 (MANUAL EXTRACTION BATCH 2)
 * Carefully extracted from source files
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
const LESSON_ID = '406a197f-f7d0-4c0d-9582-594dbb1bd8a0';

// Math answer key (F/G/H/J/K → A/B/C/D/E)
const ANSWERS = {
  21:'B', 22:'C', 23:'E', 24:'B', 25:'E', 26:'C', 27:'C', 28:'C', 29:'C', 30:'D',
  31:'B', 32:'A', 33:'D', 34:'A', 35:'C', 36:'D', 37:'E', 38:'E', 39:'A', 40:'D'
};

const mathQuestions = [
  {
    question_number: 21,
    question_stem: 'Before October 1, Felix had paid all 7 of his monthly gym fees on time. He will make his next gym payment on October 4. What total amount must Felix pay on October 4 so that his gym account will be paid in full?\n\nPowerPeople: Sign-up fee $35, Monthly fee $50, Late fee $5',
    choice_a: '$50',
    choice_b: '$55',
    choice_c: '$70',
    choice_d: '$75',
    choice_e: '$90'
  },
  {
    question_number: 22,
    question_stem: 'Another gym, Good-As-New, has a sign-up fee equal to the mean of all the sign-up fees in the table. What is the sign-up fee for Good-As-New?\n\nGym fees: PowerPeople $35, TrimTime $25, FirmFactory $0',
    choice_a: '$8',
    choice_b: '$15',
    choice_c: '$20',
    choice_d: '$30',
    choice_e: '$58'
  },
  {
    question_number: 23,
    question_stem: 'The dimensions, in inches, of 2 rectangular prisms are shown in the figure below. The volume of the large prism is the same as the volume of how many of the small prisms?\n\nLarge prism: 2x, 2y, 3z\nSmall prism: x, y, a',
    choice_a: '2',
    choice_b: '4',
    choice_c: '6',
    choice_d: '7',
    choice_e: '12'
  },
  {
    question_number: 24,
    question_stem: 'For what real number value of x is the equation 64^x = 2^(1/2) true?',
    choice_a: '-1/12',
    choice_b: '1/12',
    choice_c: '1/6',
    choice_d: '6',
    choice_e: '12'
  },
  {
    question_number: 25,
    question_stem: 'Suppose that the 8 identical faces of a regular octahedron, like the one shown below, are numbered from 11 through 18, with 1 number per face, and each face is equally likely to land down when the octahedron is tossed. What is the probability that, on 1 toss of this octahedron, the number on the face landing down is a prime number or an even number?',
    choice_a: '0',
    choice_b: '1/8',
    choice_c: '1/4',
    choice_d: '5/8',
    choice_e: '7/8'
  },
  {
    question_number: 26,
    question_stem: 'In △RST below, U is a point on RT such that SU is an angle bisector of ∠RST. What is m∠R?',
    choice_a: '30°',
    choice_b: '40°',
    choice_c: '50°',
    choice_d: '90°',
    choice_e: '100°'
  },
  {
    question_number: 27,
    question_stem: 'A lawn-and-garden store sells 2 types of grass seed: shade and sun. The numbers of bags sold on Friday and Saturday last week are given in matrix A; the selling price per bag and the profit per bag are given in matrix B. Price and profit are in dollars. What is the total profit for the sale of the 2 types of grass seed sold on Friday and Saturday?\n\nFriday: 3 shade, 13 sun\nSaturday: 13 shade, 6 sun\nPrice: shade $7.50, sun $8.00\nProfit: shade $1.20, sun $1.50',
    choice_a: '$65.00',
    choice_b: '$97.50',
    choice_c: '$102.50',
    choice_d: '$110.50',
    choice_e: '$208.00'
  },
  {
    question_number: 28,
    question_stem: 'What real value of x satisfies the equation 36^(x+1) = 6?',
    choice_a: '-1',
    choice_b: '-1/2',
    choice_c: '0',
    choice_d: '1/2',
    choice_e: '1'
  },
  {
    question_number: 29,
    question_stem: 'In right triangle △ABC shown below, AB = 9 units and BC = 12 units. What is sin A?',
    choice_a: '3/5',
    choice_b: '3/4',
    choice_c: '4/5',
    choice_d: '4/3',
    choice_e: '5/3'
  },
  {
    question_number: 30,
    question_stem: 'Shown below is quadrilateral ABCD in the standard (x,y) coordinate plane with vertices A(0,4), B(6,0), C(0,-4), and D(-2,0). What is the area, in square coordinate units, of ABCD?',
    choice_a: '16',
    choice_b: '24',
    choice_c: '32',
    choice_d: '48',
    choice_e: '64'
  },
  {
    question_number: 31,
    question_stem: 'What is the perimeter, in coordinate units, of ABCD?\n\nVertices: A(0,4), B(6,0), C(0,-4), D(-2,0)',
    choice_a: '4√5',
    choice_b: '4√5 + 4√13',
    choice_c: '4√13',
    choice_d: '16',
    choice_e: '144'
  },
  {
    question_number: 32,
    question_stem: 'What are the coordinates of the image of point B resulting from a rotation of 180° about the origin?\n\nOriginal point B: (6,0)',
    choice_a: '(-6,0)',
    choice_b: '(0,-6)',
    choice_c: '(0,6)',
    choice_d: '(6,0)',
    choice_e: '(-6,-6)'
  },
  {
    question_number: 33,
    question_stem: 'Which of the following expressions is equivalent to (x² + 4x - 12)/(x² - 36) for x ≠ ±6?',
    choice_a: '(x + 2)/(x - 6)',
    choice_b: '(x - 2)/(x + 6)',
    choice_c: '(x + 6)/(x - 6)',
    choice_d: '(x + 6)/(x + 6)',
    choice_e: '1'
  },
  {
    question_number: 34,
    question_stem: 'The rectangular top surface of a patio is 4 feet longer than it is wide and has an area of 192 square feet. What is the width, in feet, of the rectangular top surface of the patio?',
    choice_a: '12',
    choice_b: '14',
    choice_c: '16',
    choice_d: '48',
    choice_e: '96'
  },
  {
    question_number: 35,
    question_stem: 'In the standard (x,y) coordinate plane, what is the slope of the line that contains (-2,-2) and has a y-intercept of 1?',
    choice_a: '-3/2',
    choice_b: '-1/2',
    choice_c: '3/2',
    choice_d: '2',
    choice_e: '3'
  },
  {
    question_number: 36,
    question_stem: 'Veronica delivers 27 copies of the News Report and 22 copies of the City Times to 38 of the 40 houses on Oakland Street. No house receives more than 1 copy of each newspaper. How many houses receive both newspapers?',
    choice_a: '2',
    choice_b: '5',
    choice_c: '7',
    choice_d: '9',
    choice_e: '11'
  },
  {
    question_number: 37,
    question_stem: '|-3| + |-5|(7-3) = ?',
    choice_a: '-41',
    choice_b: '-23',
    choice_c: '23',
    choice_d: '32',
    choice_e: '35'
  },
  {
    question_number: 38,
    question_stem: 'Julia, an archaeology student, needs to dig 6 cylindrical pits at an archaeological site. Each pit will be 8 feet in diameter and 6 feet deep. Since she needs to work slowly and carefully, Julia can remove dirt at an average rate of 3 cubic feet per hour. Which of the following values is closest to the number of hours it will take Julia to dig all 6 pits?\n\n(Note: The volume, V, of a cylinder with radius r and height h is V = πr²h; π ≈ 3.14.)',
    choice_a: '100',
    choice_b: '200',
    choice_c: '400',
    choice_d: '600',
    choice_e: '800'
  },
  {
    question_number: 39,
    question_stem: 'Hector counted the number of blue candies in each of 14 packages and summarized his data in the frequency bar graph below. What is the median of the numbers of blue candies in the 14 packages?',
    choice_a: '4.0',
    choice_b: '4.5',
    choice_c: '5.0',
    choice_d: '5.5',
    choice_e: '6.0'
  },
  {
    question_number: 40,
    question_stem: 'In certain years, July, a month with 31 days, has exactly 4 Mondays and 4 Fridays. The first of July in those years will be on:',
    choice_a: 'Tuesday.',
    choice_b: 'Wednesday.',
    choice_c: 'Thursday.',
    choice_d: 'Saturday.',
    choice_e: 'Sunday.'
  }
];

async function uploadMathQuestions() {
  console.log('📊 UPLOADING PRACTICE ACT 4 MATH QUESTIONS 21-40');
  console.log('='.repeat(60));

  let successCount = 0;
  const errors = [];

  for (const q of mathQuestions) {
    const question = {
      ...q,
      test_number: TEST_NUMBER,
      lesson_id: LESSON_ID,
      correct_answer: ANSWERS[q.question_number],
      question_type: 'Problem Solving',
      question_category: 'Math'
    };

    try {
      const { error } = await supabase
        .from('act_math_questions')
        .upsert(question, { onConflict: 'test_number,question_number' });

      if (error) {
        errors.push(`Q${q.question_number}: ${error.message}`);
      } else {
        successCount++;
        console.log(`  ✅ Q${q.question_number}: ${q.question_stem.slice(0, 50)}...`);
      }
    } catch (err) {
      errors.push(`Q${q.question_number}: ${err.message}`);
    }
  }

  console.log(`\n📊 BATCH 2 RESULTS (Questions 21-40):`);
  console.log(`  ✅ Successfully uploaded: ${successCount}/${mathQuestions.length}`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(`    • ${e}`));
  }
}

uploadMathQuestions();
