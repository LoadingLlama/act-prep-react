#!/usr/bin/env node

/**
 * PRACTICE ACT 4 - MATH QUESTIONS 1-20 (MANUAL EXTRACTION)
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
  1:'A', 2:'E', 3:'D', 4:'D', 5:'D', 6:'A', 7:'B', 8:'E', 9:'D', 10:'E',
  11:'A', 12:'C', 13:'D', 14:'B', 15:'B', 16:'C', 17:'D', 18:'E', 19:'C', 20:'D'
};

const mathQuestions = [
  {
    question_number: 1,
    question_stem: 'Given x = 5, y = 3, and z = -6, (x + y - z)(y + z) = ?',
    choice_a: '-42',
    choice_b: '-6',
    choice_c: '6',
    choice_d: '11',
    choice_e: '18'
  },
  {
    question_number: 2,
    question_stem: 'Each student attending the East Central High School preprom dinner must choose 1 item from each of 3 categories: entrée, side dish, and beverage. There are 3 entrée choices, 4 side dish choices, and 2 beverage choices. How many different dinner combinations for each student are possible?',
    choice_a: '8',
    choice_b: '9',
    choice_c: '12',
    choice_d: '14',
    choice_e: '24'
  },
  {
    question_number: 3,
    question_stem: 'A bag contains 13 solid-colored marbles: 3 red, 5 white, 4 black, and 1 yellow. If only 1 marble is selected, what is the probability of randomly selecting 1 marble that is NOT black?',
    choice_a: '1/9',
    choice_b: '4/9',
    choice_c: '9/13',
    choice_d: '4/13',
    choice_e: '1'
  },
  {
    question_number: 4,
    question_stem: 'Sam works at Glendale Hospital and earns $12 per hour for the first 40 hours and $18 per hour for every additional hour he works each week. Last week, Sam earned $570. To the nearest whole number, how many hours did he work?',
    choice_a: '32',
    choice_b: '35',
    choice_c: '38',
    choice_d: '45',
    choice_e: '48'
  },
  {
    question_number: 5,
    question_stem: 'In the figure below, AB is congruent to BC, and AE intersects BF at C. What is the measure of ∠B?',
    choice_a: '26°',
    choice_b: '38°',
    choice_c: '52°',
    choice_d: '128°',
    choice_e: '154°'
  },
  {
    question_number: 6,
    question_stem: 'The dimensions, in feet, of a standard tennis court are shown in the figure below. All lines that meet in the figure do so at right angles. Which of the following values is closest to the area, in square feet, of the 1 service box shown shaded?',
    choice_a: '284',
    choice_b: '527',
    choice_c: '567',
    choice_d: '1,053',
    choice_e: '1,134'
  },
  {
    question_number: 7,
    question_stem: 'In scientific notation, what is the product of 3 and 0.000 000 72?',
    choice_a: '2.16 × 10⁻⁷',
    choice_b: '2.16 × 10⁻⁶',
    choice_c: '2.4 × 10⁻⁶',
    choice_d: '2.4 × 10⁻⁷',
    choice_e: '6.9 × 10⁻⁷'
  },
  {
    question_number: 8,
    question_stem: 'If f(x) = (4x + 3)², then f(1) = ?',
    choice_a: '1',
    choice_b: '7',
    choice_c: '19',
    choice_d: '28',
    choice_e: '49'
  },
  {
    question_number: 9,
    question_stem: 'Regular octagon ABCDEFGH is inscribed in a circle, as shown below. The sector of the circle bounded by radii AJ and DJ and by AD is shaded. The area of the shaded sector is what fraction of the area of the circle?',
    choice_a: '1/5',
    choice_b: '1/7',
    choice_c: '3/10',
    choice_d: '3/8',
    choice_e: '3/5'
  },
  {
    question_number: 10,
    question_stem: 'The expression (2x + 3)(5x - 6) is equivalent to:',
    choice_a: '7x² - 18',
    choice_b: '7x² + 3x - 18',
    choice_c: '10x² - 18',
    choice_d: '10x² - 3x - 18',
    choice_e: '10x² + 3x - 18'
  },
  {
    question_number: 11,
    question_stem: 'A cake recipe requires 2 cup of flour. Mary and Haloa decide to make the cake together. Mary has 1/4 cup of flour and Haloa has 1/12 cup of flour. How many more cups of flour do they need to make the cake?',
    choice_a: '1/3',
    choice_b: '2/3',
    choice_c: '1',
    choice_d: '1 1/3',
    choice_e: '1 2/3'
  },
  {
    question_number: 12,
    question_stem: 'Coach Shannon is buying packages of granola bars, juice boxes, and apples as snacks for her soccer team. The table below gives the number of snacks per package and the price per package. What is the minimum total price of the snacks, all bought in whole packages, Coach Shannon buys so that each of the 15 girls on the team gets at least 1 snack of each type?\n\nGranola bars: 3 per package, $2.50\nJuice boxes: 4 per package, $3.00\nApples: 5 per package, $4.50',
    choice_a: '$30.00',
    choice_b: '$35.00',
    choice_c: '$38.00',
    choice_d: '$42.00',
    choice_e: '$50.00'
  },
  {
    question_number: 13,
    question_stem: 'Given functions f(x) = 5x + 1 and g(x) = x² - 2, what is the value of f(g(-3))?',
    choice_a: '-198',
    choice_b: '-54',
    choice_c: '-39',
    choice_d: '36',
    choice_e: '194'
  },
  {
    question_number: 14,
    question_stem: 'For 7y = 2x - 5, which of the following expressions gives x in terms of y?',
    choice_a: '(7y - 5)/2',
    choice_b: '(7y + 5)/2',
    choice_c: '7y - 5',
    choice_d: '7y + 5',
    choice_e: '5y + 5'
  },
  {
    question_number: 15,
    question_stem: 'For an angle with measure θ in a right triangle, sin θ = 4/5 and tan θ = 4/3. What is the value of cos θ?',
    choice_a: '1/5',
    choice_b: '3/5',
    choice_c: '4/5',
    choice_d: '5/4',
    choice_e: '5/3'
  },
  {
    question_number: 16,
    question_stem: 'A scale drawing of a proposed trapezoidal landscape design is shown in the figure below, with the given dimensions in meters. The trapezoid consists of a right triangle and a square divided into 3 isosceles right triangles. The unshaded regions will be white rock; the shaded triangular regions will be black rock. What is the area, in square meters, that will be black rock?',
    choice_a: '50',
    choice_b: '100',
    choice_c: '150',
    choice_d: '200',
    choice_e: '300'
  },
  {
    question_number: 17,
    question_stem: 'One construction sign flashes every 6 seconds, and another construction sign flashes every 10 seconds. At a certain instant, the 2 signs flash at the same time. How many seconds elapse until the 2 signs next flash at the same time?',
    choice_a: '4',
    choice_b: '8',
    choice_c: '16',
    choice_d: '30',
    choice_e: '60'
  },
  {
    question_number: 18,
    question_stem: 'Which of the following expressions is equivalent to 4x² + 8x - 12?',
    choice_a: '(4x - 3)(x + 4)',
    choice_b: '(4x + 3)(x - 4)',
    choice_c: '4(x - 3)(x - 1)',
    choice_d: '4(x - 3)(x + 1)',
    choice_e: '4(x + 3)(x - 1)'
  },
  {
    question_number: 19,
    question_stem: 'A person\'s vertical jump is the difference between the maximum height the person can reach at the top of a jump and the maximum height the person can reach when standing. The maximum height Donald can reach at the top of his jump is 10 feet 4 inches, and the maximum height he can reach when standing is 7 feet 10 inches. What is Donald\'s vertical jump?',
    choice_a: '2 feet 0 inches',
    choice_b: '2 feet 4 inches',
    choice_c: '2 feet 6 inches',
    choice_d: '3 feet 0 inches',
    choice_e: '3 feet 6 inches'
  },
  {
    question_number: 20,
    question_stem: 'Given that Jocelyn becomes a member of TrimTime on July 1 and that she pays all monthly fees on time, what total amount will Jocelyn have paid to the gym by September 2 of that year?\n\nTrimTime: Sign-up fee $25, Monthly fee $60, Late fee $10',
    choice_a: '$85',
    choice_b: '$145',
    choice_c: '$180',
    choice_d: '$205',
    choice_e: '$215'
  }
];

async function uploadMathQuestions() {
  console.log('📊 UPLOADING PRACTICE ACT 4 MATH QUESTIONS 1-20');
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

  console.log(`\n📊 BATCH 1 RESULTS (Questions 1-20):`);
  console.log(`  ✅ Successfully uploaded: ${successCount}/${mathQuestions.length}`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(`    • ${e}`));
  }
}

uploadMathQuestions();
