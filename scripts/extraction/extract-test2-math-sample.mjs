#!/usr/bin/env node

/**
 * EXTRACT TEST 2 MATH QUESTIONS - SAMPLE FIRST 10
 * Extract first 10 Math questions to establish pattern
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

console.log('🔧 EXTRACTING TEST 2 MATH QUESTIONS - SAMPLE (1-10)\n');
console.log('='.repeat(70));

// First 10 Math questions from the PDF
const questions = [
  {
    number: 1,
    stem: "The parallelogram below has consecutive angles with measures x° and 25°. What is the value of x?",
    choices: {
      A: "100",
      B: "115",
      C: "130",
      D: "140",
      E: "155"
    }
  },
  {
    number: 2,
    stem: "A retail sales associate's daily commission during 1 week was $30 on Monday and Tuesday and $70 on Wednesday, Thursday, and Friday. What was the associate's average daily commission for these 5 days?",
    choices: {
      F: "$50",
      G: "$51",
      H: "$54",
      J: "$55",
      K: "$56"
    }
  },
  {
    number: 3,
    stem: "What is the greatest common factor of 45, 50, and 84?",
    choices: {
      A: "1",
      B: "2",
      C: "5",
      D: "10",
      E: "15"
    }
  },
  {
    number: 4,
    stem: "For what value of x is the equation 2(x - 12) + x = 36 true?",
    choices: {
      F: "4",
      G: "8",
      H: "16",
      J: "20",
      K: "30"
    }
  },
  {
    number: 5,
    stem: "A bag contains exactly 22 solid-colored buttons: 4 red, 6 blue, and 12 white. What is the probability of randomly selecting 1 button that is NOT white?",
    choices: {
      A: "5/11",
      B: "6/11",
      C: "10/22",
      D: "5/22",
      E: "12/22"
    }
  },
  {
    number: 6,
    stem: "On a map, 1/4 inch represents 12 actual miles. Two towns that are 5 inches apart on this map are how many actual miles apart?",
    choices: {
      F: "120",
      G: "60",
      H: "30",
      J: "24",
      K: "12"
    }
  },
  {
    number: 7,
    stem: "Caden had exactly 45 plants to sell. After Day 1 of his sale, he had exactly 42 plants left. After Day 2, Caden had exactly 39 plants left. After Day 3, he has exactly 36 plants left. Assuming Caden will continue to sell plants at that daily rate, how many of these plants will he have left at the end of Day 6?",
    choices: {
      A: "33",
      B: "27",
      C: "24",
      D: "6",
      E: "3"
    }
  },
  {
    number: 8,
    stem: "An on-demand movie service charges $5 per month, plus $2 for each movie rented. Which of the following equations models the relationship between M, the number of movies rented per month, and T, the total monthly cost, in dollars, for the service?",
    choices: {
      F: "T = 5M + 2",
      G: "T = 2M + 5",
      H: "T = 7M",
      J: "M = 5T + 2",
      K: "M = 2T + 5"
    }
  },
  {
    number: 9,
    stem: "What are the solutions to the quadratic equation (2x + 5)(3x - 4) = 0?",
    choices: {
      A: "-5 and 4",
      B: "-5/2 and 4/3",
      C: "-2 and 3",
      D: "2/5 and -3/4",
      E: "5/2 and 3/4"
    }
  },
  {
    number: 10,
    stem: "If 3x - 7 = 14, then x = ?",
    choices: {
      F: "7/3",
      G: "7",
      H: "14/3",
      J: "21/3",
      K: "21"
    }
  }
];

console.log('\n📝 Extracting Math questions 1-10:');

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

console.log(`\n🎉 Successfully extracted and updated ${successCount}/10 Math questions!`);
console.log('\n📋 STATUS: Sample Math questions complete');
console.log('    Need to continue with remaining 50 Math questions (11-60)');
console.log('    Then Reading (1-40) and Science (1-40) questions\n');