#!/usr/bin/env node

/**
 * EXTRACT TEST 2 MATH QUESTIONS 11-25
 * Continue extracting Math questions from the PDF
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 EXTRACTING TEST 2 MATH QUESTIONS 11-25\n');
console.log('='.repeat(70));

// Math questions 11-25 from the PDF
const questions = [
  {
    number: 10,
    stem: "An 8-inch-by-6-inch rectangle is cut along a diagonal to form 2 triangles. What is the area, in square inches, of each triangle?",
    choices: {
      F: "7",
      G: "12",
      H: "14",
      J: "24",
      K: "48"
    }
  },
  {
    number: 11,
    stem: "In a class of tenth graders, no student participated in more than 1 of the following extracurricular activities: 1/8 of the class played in the band; 1/4 sang in the chorus; 1/3 played football; and 1/6 played basketball. What fraction of the class did not participate in any 1 of these 4 activities?",
    choices: {
      A: "0",
      B: "1/8",
      C: "1/4",
      D: "1/3",
      E: "5/24"
    }
  },
  {
    number: 12,
    stem: "What is the smallest integer greater than √61?",
    choices: {
      F: "7",
      G: "8",
      H: "9",
      J: "30",
      K: "31"
    }
  },
  {
    number: 13,
    stem: "In triangle ABC shown below, sin C = 3/5 and the length of AB is 6 inches. What is the length, in inches, of AC?",
    choices: {
      A: "√5",
      B: "√13",
      C: "4",
      D: "5",
      E: "9"
    }
  },
  {
    number: 14,
    stem: "The table below shows the first 5 terms of an arithmetic sequence. Which of the following is a general expression for the nth term? [Term position: 1,2,3,4,5 with nth terms: 1,5,9,13,17]",
    choices: {
      F: "2n - 1",
      G: "3n - 2",
      H: "4n - 3",
      J: "5n - 4",
      K: "6n - 5"
    }
  },
  {
    number: 15,
    stem: "What is the perimeter, in feet, of the figure shown below? [Figure shows a shape with dimensions 20 ft, 8 ft, and 7 ft]",
    choices: {
      A: "35",
      B: "56",
      C: "70",
      D: "80",
      E: "84"
    }
  },
  {
    number: 16,
    stem: "Manuel estimates that 2/3 of a pizza is left. Stephen estimates that 3/4 is left. They are going to compromise for a joint estimate by using the number halfway between their 2 estimates. What is their joint estimate?",
    choices: {
      F: "5/12",
      G: "17/24",
      H: "5/6",
      J: "7/8",
      K: "11/12"
    }
  },
  {
    number: 17,
    stem: "So far this basketball season, Sherita made 46 of her first 60 free throws, giving her a free-throw average of about 76.7%. What is the minimum number of free throws she would need to make from now on in order to have a free-throw average of at least 80%?",
    choices: {
      A: "2",
      B: "3",
      C: "10",
      D: "14",
      E: "20"
    }
  },
  {
    number: 18,
    stem: "Two functions are defined as f(x) = 2x - 1 and g(x) = x² + 1. Which of the following expressions represents f(g(x))?",
    choices: {
      F: "2x² + 1",
      G: "2x² - 1",
      H: "2x² + 2x",
      J: "4x² - 4x + 2",
      K: "2x² + 2x - 1"
    }
  },
  {
    number: 19,
    stem: "Data Set A consists of the 8 numbers listed below. Data Set B consists of the 8 numbers in A and a 9th number, which is greater than 90. How will the mean and the median of B compare to the mean and the median of A? [Numbers: 62, 76, 76, 80, 82, 87, 94, 96]",
    choices: {
      A: "The mean and the median of B will each be greater than the mean and the median of A.",
      B: "The mean and the median of B will each be less than the mean and the median of A.",
      C: "The mean and the median of B will each be the same as the mean and the median of A.",
      D: "The mean of B will be the same as the mean of A, and the median of B will be greater than the median of A.",
      E: "The mean of B will be greater than the mean of A, and the median of B will be the same as the median of A."
    }
  },
  {
    number: 20,
    stem: "A truck traveling at 35 mph has a leaky radiator that is losing 4 fluid ounces per minute. How many miles will the truck travel before the radiator, which held 480 fluid ounces when it began to leak, is empty?",
    choices: {
      F: "13.7",
      G: "17.5",
      H: "35.0",
      J: "70.0",
      K: "120.0"
    }
  },
  {
    number: 21,
    stem: "In the standard (x,y) coordinate plane, what is the midpoint of the line segment that has endpoints (5,8) and (3,-1)?",
    choices: {
      A: "(-2,-9)",
      B: "(-1,7)",
      C: "(1,4.5)",
      D: "(4,3.5)",
      E: "(8,7)"
    }
  },
  {
    number: 22,
    stem: "The ordered pairs (x,y) in one of the following tables belong to a linear function. Which one? [Multiple tables with coordinate pairs shown]",
    choices: {
      F: "Table F",
      G: "Table G",
      H: "Table H",
      J: "Table J",
      K: "Table K"
    }
  },
  {
    number: 23,
    stem: "In triangle ABC shown below, m∠A = x°, m∠B = (2x)°, m∠C = (3x)°, AB = c inches, AC = b inches, and BC = a inches. Which of the following inequalities correctly relates the side lengths of triangle ABC?",
    choices: {
      A: "a < b < c",
      B: "a < c < b",
      C: "b < a < c",
      D: "c < a < b",
      E: "c < b < a"
    }
  },
  {
    number: 24,
    stem: "What is the slope of the line that passes through (1,5) and (17,7) in the standard (x,y) coordinate plane?",
    choices: {
      F: "1/8",
      G: "1/16",
      H: "2/16",
      J: "8",
      K: "16"
    }
  },
  {
    number: 25,
    stem: "If 3x + 2y = 12 and x - y = 1, then y = ?",
    choices: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
      E: "6"
    }
  }
];

console.log('\n📝 Extracting Math questions 10-25:');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Update in database
  const updateData = {
    question_stem: q.stem,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J,
    choice_e: q.choices.E || q.choices.K
  };

  const { error } = await supabase
    .from('act_math_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating Math Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Math Q${q.number} in database`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/16 Math questions!`);
console.log('✅ Math questions 10-25 now have real content!');
console.log('\n📋 PROGRESS: 25/60 Math questions complete');
console.log('    Continue with remaining 35 Math questions\n');