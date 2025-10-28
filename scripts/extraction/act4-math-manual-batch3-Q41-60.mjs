#!/usr/bin/env node

/**
 * PRACTICE ACT 4 - MATH QUESTIONS 41-60 (MANUAL EXTRACTION BATCH 3 - FINAL)
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
  41:'C', 42:'C', 43:'A', 44:'C', 45:'B', 46:'E', 47:'A', 48:'A', 49:'E', 50:'A',
  51:'A', 52:'B', 53:'D', 54:'A', 55:'C', 56:'D', 57:'B', 58:'C', 59:'D', 60:'E'
};

const mathQuestions = [
  {
    question_number: 41,
    question_stem: 'Ms. Siochi has a rectangular lot with a perimeter of 100 meters. She paid $2,420.00 for fencing to install along the entire perimeter. She chose standard fencing for 3 sides of the lot and decorative fencing for 1 of the 20-meter sides. Ms. Siochi paid $1.00 more per meter for the decorative fencing than for the standard fencing. How much did Ms. Siochi pay per meter for the decorative fencing?',
    choice_a: '$22.40',
    choice_b: '$23.40',
    choice_c: '$24.00',
    choice_d: '$25.00',
    choice_e: '$26.00'
  },
  {
    question_number: 42,
    question_stem: 'Students use dowel rods to learn about equations. They lay several rods, some of which are red and some of which are white, end to end. The length of each red rod is R centimeters, and the length of each white rod is W centimeters. The students determine that the total length of 2 red rods and 7 white rods is the same as the total length of 4 red rods and 3 white rods. Based on this relationship, which of the following equations must be true?',
    choice_a: 'R = 2W',
    choice_b: 'R = 3W',
    choice_c: '2R = 4W',
    choice_d: '7R = 9W',
    choice_e: '9R = 7W'
  },
  {
    question_number: 43,
    question_stem: 'For i = √-1, (2+2i)² = ?',
    choice_a: '-16',
    choice_b: '0',
    choice_c: '8i',
    choice_d: '4+2i',
    choice_e: '4+4i'
  },
  {
    question_number: 44,
    question_stem: 'For all θ such that cos θ ≠ 0 and sin θ ≠ 0, which of the following expressions is equal to (sec θ)(tan θ)?',
    choice_a: 'cos θ',
    choice_b: 'sin θ',
    choice_c: '1/cos θ',
    choice_d: 'sin²θ/cos²θ',
    choice_e: 'sin θ/cos²θ'
  },
  {
    question_number: 45,
    question_stem: 'The map below shows the 5 villages and the 7 roads on Gull Island. All residential mailboxes on Gull Island are located along these roads. During a mail run, the island\'s mail carrier travels on each road exactly once, but she may pass through a village more than once. The carrier starts her run in 1 of the 5 villages and ends her run in 1 of the 4 remaining villages. One of the following pairs of villages gives the starting point and ending point for the mail run. Which one?\n\nVillages: Ripley, Marcus, Portville, Willa, Baytown',
    choice_a: 'Baytown to Marcus',
    choice_b: 'Baytown to Portville',
    choice_c: 'Marcus to Ripley',
    choice_d: 'Portville to Willa',
    choice_e: 'Ripley to Willa'
  },
  {
    question_number: 46,
    question_stem: 'Which of the following sets is the range of the function f(x) = -3√(x² + 16)?',
    choice_a: '(0, 3)',
    choice_b: '[0, ∞)',
    choice_c: '(-∞, ∞)',
    choice_d: '[-3, ∞)',
    choice_e: '(-∞, -12]'
  },
  {
    question_number: 47,
    question_stem: 'Mr. Schulte has a fair 12-sided die, with the sides numbered from 1 through 12. On both Monday and Tuesday, Mr. Schulte will roll the die 1 time. If the side that lands faceup is numbered with a prime number, Mr. Schulte will collect the homework that day—otherwise, he will not collect the homework. What is the probability that Mr. Schulte will collect homework on both Monday and Tuesday?\n\n(Note: 1 is NOT a prime number.)',
    choice_a: '1/4',
    choice_b: '5/24',
    choice_c: '5/12',
    choice_d: '25/144',
    choice_e: '1/2'
  },
  {
    question_number: 48,
    question_stem: 'The table below gives the number of Jerry\'s Construction workers needed to frame a specific type of house in certain selected numbers of days. Given that all the workers work at the same rate, how many workers will it take to frame this specific type of house in 10 days?\n\nWorkers: 2, ?, 6, 30\nDays: 15, 10, 5, 1',
    choice_a: '3',
    choice_b: '4',
    choice_c: '5',
    choice_d: '10',
    choice_e: '12'
  },
  {
    question_number: 49,
    question_stem: 'Considering only positive integer factors, which of the following integers has an odd number of distinct factors?',
    choice_a: '8',
    choice_b: '12',
    choice_c: '18',
    choice_d: '24',
    choice_e: '36'
  },
  {
    question_number: 50,
    question_stem: 'A solution is 5% alcohol and 95% water. A second solution is 20% alcohol and 80% water. If 2 gallons of the first solution are mixed with 1 gallon of the second solution, the resulting solution is what percent alcohol?',
    choice_a: '10%',
    choice_b: '12.5%',
    choice_c: '15%',
    choice_d: '25%',
    choice_e: '30%'
  },
  {
    question_number: 51,
    question_stem: 'In the standard (x,y) coordinate plane, the graph of the equation y = 3 sin(2x + 0.5π) has what amplitude and period?',
    choice_a: 'amplitude: 3, period: π',
    choice_b: 'amplitude: 3, period: 2π',
    choice_c: 'amplitude: 3, period: 4π',
    choice_d: 'amplitude: 6, period: π',
    choice_e: 'amplitude: 6, period: 2π'
  },
  {
    question_number: 52,
    question_stem: 'A pet shop always has 54 hamsters that are either solid-colored or multicolored in the front of the store for customers to see. Any additional hamsters are kept in an area at the back of the store. Which of the following ratios of solid-colored hamsters to multicolored hamsters is possible for the hamsters in the front of this pet shop?',
    choice_a: '1:54',
    choice_b: '2:7',
    choice_c: '3:8',
    choice_d: '4:5',
    choice_e: '5:6'
  },
  {
    question_number: 53,
    question_stem: 'A cookie jar contains 10 cookies of 3 types. There are 5 chocolate-chip cookies, 3 oatmeal-raisin cookies, and 2 sugar cookies. You reach into the jar and choose a cookie at random and then, without replacing the first cookie, reach into the jar and choose another cookie at random. What is the probability that both of the cookies you choose are the same type?',
    choice_a: '1/15',
    choice_b: '7/30',
    choice_c: '3/10',
    choice_d: '13/45',
    choice_e: '1/3'
  },
  {
    question_number: 54,
    question_stem: 'Quadrilateral ABCD is a parallelogram. Which of the following statements about ABCD must be true?',
    choice_a: 'The diagonals bisect each other.',
    choice_b: 'The diagonals are perpendicular.',
    choice_c: 'The diagonals are congruent.',
    choice_d: 'All 4 sides are congruent.',
    choice_e: 'All 4 interior angles are congruent.'
  },
  {
    question_number: 55,
    question_stem: 'For all m such that 0 < m < 1, the value of m - m² must be:',
    choice_a: 'greater than m.',
    choice_b: 'equal to m.',
    choice_c: 'less than m, but greater than 0.',
    choice_d: 'equal to 0.',
    choice_e: 'less than 0.'
  },
  {
    question_number: 56,
    question_stem: 'Bill and Nate are participating in a fund-raising event in which they run or walk a distance of 30 miles. A graph representing their progress during the first hour is shown in the standard (x,y) coordinate plane below. Assume that Bill continues to travel at the same speed until he reaches the finish line. One of the following phrases describes how Nate will need to change his average speed for the remainder of the event in order to finish at exactly the same time as Bill. Which one?',
    choice_a: 'Decrease it by 2 mph',
    choice_b: 'Decrease it by 2.5 mph',
    choice_c: 'Increase it by 2 mph',
    choice_d: 'Increase it by 2.5 mph',
    choice_e: 'Increase it by 4 mph'
  },
  {
    question_number: 57,
    question_stem: 'The math club is selling T-shirts as a fund-raiser. There is a linear relationship between x, the number of T-shirts sold, and y, the profit in dollars from selling the T-shirts. When the club sells 6 shirts, it makes a profit of $10; when it sells 10 shirts, it makes a profit of $20. Which of the following equations gives the relationship between x and y?',
    choice_a: 'y = 2x + 2',
    choice_b: 'y = 2.5x + 0',
    choice_c: 'y = x + 4',
    choice_d: 'y = 2x + 5',
    choice_e: 'y = 3x - 5'
  },
  {
    question_number: 58,
    question_stem: 'For the following system of equations, what is the value of x - y?\n\n2^(x+y) = 32\n2^(x-y) = 8',
    choice_a: '-3',
    choice_b: '-1',
    choice_c: '1',
    choice_d: '2',
    choice_e: '3'
  },
  {
    question_number: 59,
    question_stem: 'Nineteen students are eligible to play doubles tennis. What is the maximum number of different 2-person teams possible?',
    choice_a: '9',
    choice_b: '38',
    choice_c: '76',
    choice_d: '171',
    choice_e: '342'
  },
  {
    question_number: 60,
    question_stem: 'In the equation ax² + bx + c = 0, coefficients a, b, and c are positive real numbers. If a = c and both roots of the quadratic equation are real numbers, which of the following relations must hold between a and b?',
    choice_a: 'b ≥ 2a',
    choice_b: 'b ≤ 2a',
    choice_c: 'b ≥ a',
    choice_d: 'b ≤ a',
    choice_e: 'b > 2√a'
  }
];

async function uploadMathQuestions() {
  console.log('📊 UPLOADING PRACTICE ACT 4 MATH QUESTIONS 41-60 (FINAL BATCH)');
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

  console.log(`\n📊 BATCH 3 RESULTS (Questions 41-60):`);
  console.log(`  ✅ Successfully uploaded: ${successCount}/${mathQuestions.length}`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(`    • ${e}`));
  }

  console.log(`\n🎉 ALL 60 MATH QUESTIONS FOR PRACTICE ACT 4 COMPLETE!`);
}

uploadMathQuestions();
