const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

// Create Supabase client with SERVICE ROLE key (bypasses RLS)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const LESSON_ID = '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f'; // Algebra Skills (3.1)

// All 50 questions with solutions in Mathway style
const questions = [
  // EASY (1-17)
  {
    position: 1,
    difficulty: 'easy',
    problem_text: 'What is 5 + 3 × 2?',
    choices: [
      { letter: 'A', text: '16' },
      { letter: 'B', text: '11' },
      { letter: 'C', text: '13' },
      { letter: 'D', text: '10' }
    ],
    correct_answer: 'B',
    solution: 'Multiply first following PEMDAS.\n```\n5 + 3 × 2\n= 5 + 6\n```\n\nAdd 5 and 6.\n```\n= 11\n```'
  },
  {
    position: 2,
    difficulty: 'easy',
    problem_text: 'What is -8 + 5?',
    choices: [
      { letter: 'A', text: '-13' },
      { letter: 'B', text: '13' },
      { letter: 'C', text: '-3' },
      { letter: 'D', text: '3' }
    ],
    correct_answer: 'C',
    solution: 'Add the numbers.\n```\n-8 + 5\n```\n\nSince the numbers have different signs, subtract the smaller from the larger and keep the sign of the larger.\n```\n8 - 5 = 3\n```\n\nSince |-8| > |5|, the answer is negative.\n```\n= -3\n```'
  },
  {
    position: 3,
    difficulty: 'easy',
    problem_text: 'Simplify: 3x + 5x',
    choices: [
      { letter: 'A', text: '8x' },
      { letter: 'B', text: '15x' },
      { letter: 'C', text: '8x^2' },
      { letter: 'D', text: '15x^2' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms.\n```\n3x + 5x\n```\n\nAdd the coefficients.\n```\n= (3 + 5)x\n= 8x\n```'
  },
  {
    position: 4,
    difficulty: 'easy',
    problem_text: 'What is 12 ÷ 4 × 3?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '9' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '36' }
    ],
    correct_answer: 'B',
    solution: 'Work from left to right since division and multiplication have equal priority.\n```\n12 ÷ 4 × 3\n```\n\nDivide 12 by 4.\n```\n= 3 × 3\n```\n\nMultiply 3 by 3.\n```\n= 9\n```'
  },
  {
    position: 5,
    difficulty: 'easy',
    problem_text: 'What is -4 - 7?',
    choices: [
      { letter: 'A', text: '-11' },
      { letter: 'B', text: '11' },
      { letter: 'C', text: '-3' },
      { letter: 'D', text: '3' }
    ],
    correct_answer: 'A',
    solution: 'Subtracting a positive is the same as adding a negative.\n```\n-4 - 7\n= -4 + (-7)\n```\n\nAdd the negative numbers.\n```\n= -11\n```'
  },
  {
    position: 6,
    difficulty: 'easy',
    problem_text: 'Simplify: 7y - 2y',
    choices: [
      { letter: 'A', text: '5y' },
      { letter: 'B', text: '9y' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '14y' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms.\n```\n7y - 2y\n```\n\nSubtract the coefficients.\n```\n= (7 - 2)y\n= 5y\n```'
  },
  {
    position: 7,
    difficulty: 'easy',
    problem_text: 'What is 6 + 2 × (4 - 1)?',
    choices: [
      { letter: 'A', text: '24' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '18' }
    ],
    correct_answer: 'B',
    solution: 'Evaluate the expression inside parentheses first.\n```\n6 + 2 × (4 - 1)\n= 6 + 2 × 3\n```\n\nMultiply 2 by 3.\n```\n= 6 + 6\n```\n\nAdd 6 and 6.\n```\n= 12\n```'
  },
  {
    position: 8,
    difficulty: 'easy',
    problem_text: 'What is (-3) × 4?',
    choices: [
      { letter: 'A', text: '12' },
      { letter: 'B', text: '-12' },
      { letter: 'C', text: '-7' },
      { letter: 'D', text: '1' }
    ],
    correct_answer: 'B',
    solution: 'Multiply the absolute values.\n```\n|-3| × |4| = 3 × 4 = 12\n```\n\nSince one number is negative and one is positive, the result is negative.\n```\n= -12\n```'
  },
  {
    position: 9,
    difficulty: 'easy',
    problem_text: 'Simplify: 4a + 3b + 2a',
    choices: [
      { letter: 'A', text: '6a + 3b' },
      { letter: 'B', text: '9ab' },
      { letter: 'C', text: '9a + 3b' },
      { letter: 'D', text: '4a + 5b' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with variable a.\n```\n4a + 3b + 2a\n= (4a + 2a) + 3b\n```\n\nAdd the coefficients of a.\n```\n= 6a + 3b\n```'
  },
  {
    position: 10,
    difficulty: 'easy',
    problem_text: 'What is 20 - 3 × 4?',
    choices: [
      { letter: 'A', text: '68' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '32' },
      { letter: 'D', text: '17' }
    ],
    correct_answer: 'B',
    solution: 'Multiply first following PEMDAS.\n```\n20 - 3 × 4\n= 20 - 12\n```\n\nSubtract 12 from 20.\n```\n= 8\n```'
  },
  {
    position: 11,
    difficulty: 'easy',
    problem_text: 'What is 10 ÷ 2 + 3?',
    choices: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '6.5' },
      { letter: 'D', text: '13' }
    ],
    correct_answer: 'B',
    solution: 'Divide first following PEMDAS.\n```\n10 ÷ 2 + 3\n= 5 + 3\n```\n\nAdd 5 and 3.\n```\n= 8\n```'
  },
  {
    position: 12,
    difficulty: 'easy',
    problem_text: 'Simplify: 9m - 5m + m',
    choices: [
      { letter: 'A', text: '5m' },
      { letter: 'B', text: '4m' },
      { letter: 'C', text: '15m' },
      { letter: 'D', text: '3m' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms.\n```\n9m - 5m + m\n= (9 - 5 + 1)m\n```\n\nSimplify the coefficient.\n```\n= 5m\n```'
  },
  {
    position: 13,
    difficulty: 'easy',
    problem_text: 'What is (-2) × (-5)?',
    choices: [
      { letter: 'A', text: '-10' },
      { letter: 'B', text: '10' },
      { letter: 'C', text: '-7' },
      { letter: 'D', text: '7' }
    ],
    correct_answer: 'B',
    solution: 'Multiply the absolute values.\n```\n|-2| × |-5| = 2 × 5 = 10\n```\n\nSince both numbers are negative, the result is positive.\n```\n= 10\n```'
  },
  {
    position: 14,
    difficulty: 'easy',
    problem_text: 'What is 2 + 6 ÷ 2?',
    choices: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '1.33' }
    ],
    correct_answer: 'B',
    solution: 'Divide first following PEMDAS.\n```\n2 + 6 ÷ 2\n= 2 + 3\n```\n\nAdd 2 and 3.\n```\n= 5\n```'
  },
  {
    position: 15,
    difficulty: 'easy',
    problem_text: 'Simplify: 2x + 3x - x',
    choices: [
      { letter: 'A', text: '4x' },
      { letter: 'B', text: '5x' },
      { letter: 'C', text: '6x' },
      { letter: 'D', text: '2x' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms.\n```\n2x + 3x - x\n= (2 + 3 - 1)x\n```\n\nSimplify the coefficient.\n```\n= 4x\n```'
  },
  {
    position: 16,
    difficulty: 'easy',
    problem_text: 'What is 3 - (-4)?',
    choices: [
      { letter: 'A', text: '-1' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '-7' },
      { letter: 'D', text: '1' }
    ],
    correct_answer: 'B',
    solution: 'Subtracting a negative is the same as adding.\n```\n3 - (-4)\n= 3 + 4\n```\n\nAdd 3 and 4.\n```\n= 7\n```'
  },
  {
    position: 17,
    difficulty: 'easy',
    problem_text: 'Simplify: 5p + 2q - 3p + q',
    choices: [
      { letter: 'A', text: '2p + 3q' },
      { letter: 'B', text: '8p + 3q' },
      { letter: 'C', text: '2p + q' },
      { letter: 'D', text: '5pq' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with variable p.\n```\n5p + 2q - 3p + q\n= (5p - 3p) + (2q + q)\n```\n\nSimplify each group.\n```\n= 2p + 3q\n```'
  },
  // MEDIUM (18-34)
  {
    position: 18,
    difficulty: 'medium',
    problem_text: 'Simplify: -3(2x - 4)',
    choices: [
      { letter: 'A', text: '-6x - 12' },
      { letter: 'B', text: '-6x + 12' },
      { letter: 'C', text: '6x - 12' },
      { letter: 'D', text: '-6x - 4' }
    ],
    correct_answer: 'B',
    solution: 'Distribute -3 to each term inside the parentheses.\n```\n-3(2x - 4)\n= -3 × 2x + (-3) × (-4)\n```\n\nMultiply each term.\n```\n= -6x + 12\n```'
  },
  {
    position: 19,
    difficulty: 'medium',
    problem_text: 'What is 16 ÷ 4 ÷ 2?',
    choices: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '1' }
    ],
    correct_answer: 'B',
    solution: 'Work from left to right.\n```\n16 ÷ 4 ÷ 2\n```\n\nDivide 16 by 4.\n```\n= 4 ÷ 2\n```\n\nDivide 4 by 2.\n```\n= 2\n```'
  },
  {
    position: 20,
    difficulty: 'medium',
    problem_text: 'Simplify: 3x² + 2x - x² + 5x',
    choices: [
      { letter: 'A', text: '2x² + 7x' },
      { letter: 'B', text: '4x² + 7x' },
      { letter: 'C', text: '2x² + 3x' },
      { letter: 'D', text: '9x²' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with x².\n```\n3x² + 2x - x² + 5x\n= (3x² - x²) + (2x + 5x)\n```\n\nSimplify each group.\n```\n= 2x² + 7x\n```'
  },
  {
    position: 21,
    difficulty: 'medium',
    problem_text: 'What is (-10) ÷ 2?',
    choices: [
      { letter: 'A', text: '-5' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '-8' },
      { letter: 'D', text: '-20' }
    ],
    correct_answer: 'A',
    solution: 'Divide the absolute values.\n```\n|-10| ÷ |2| = 10 ÷ 2 = 5\n```\n\nSince one number is negative and one is positive, the result is negative.\n```\n= -5\n```'
  },
  {
    position: 22,
    difficulty: 'medium',
    problem_text: 'Simplify: 4(x + 2) - 3x',
    choices: [
      { letter: 'A', text: 'x + 8' },
      { letter: 'B', text: '4x + 8 - 3x' },
      { letter: 'C', text: '7x + 8' },
      { letter: 'D', text: 'x + 2' }
    ],
    correct_answer: 'A',
    solution: 'Distribute 4 to each term inside the parentheses.\n```\n4(x + 2) - 3x\n= 4x + 8 - 3x\n```\n\nCombine like terms.\n```\n= (4x - 3x) + 8\n= x + 8\n```'
  },
  {
    position: 23,
    difficulty: 'medium',
    problem_text: 'What is 3 × 4 - 2 × 5?',
    choices: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '10' },
      { letter: 'C', text: '30' },
      { letter: 'D', text: '-2' }
    ],
    correct_answer: 'A',
    solution: 'Multiply first, working left to right.\n```\n3 × 4 - 2 × 5\n= 12 - 10\n```\n\nSubtract 10 from 12.\n```\n= 2\n```'
  },
  {
    position: 24,
    difficulty: 'medium',
    problem_text: 'Simplify: -5y - (-3y)',
    choices: [
      { letter: 'A', text: '-2y' },
      { letter: 'B', text: '2y' },
      { letter: 'C', text: '-8y' },
      { letter: 'D', text: '8y' }
    ],
    correct_answer: 'A',
    solution: 'Subtracting a negative is the same as adding.\n```\n-5y - (-3y)\n= -5y + 3y\n```\n\nCombine like terms.\n```\n= (-5 + 3)y\n= -2y\n```'
  },
  {
    position: 25,
    difficulty: 'medium',
    problem_text: 'What is 18 - 2 × (5 + 1)?',
    choices: [
      { letter: 'A', text: '96' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '14' },
      { letter: 'D', text: '20' }
    ],
    correct_answer: 'B',
    solution: 'Evaluate the expression inside parentheses first.\n```\n18 - 2 × (5 + 1)\n= 18 - 2 × 6\n```\n\nMultiply 2 by 6.\n```\n= 18 - 12\n```\n\nSubtract 12 from 18.\n```\n= 6\n```'
  },
  {
    position: 26,
    difficulty: 'medium',
    problem_text: 'Simplify: 2a + 3b - 5a + 4b',
    choices: [
      { letter: 'A', text: '-3a + 7b' },
      { letter: 'B', text: '7a + 7b' },
      { letter: 'C', text: '-3a + b' },
      { letter: 'D', text: '3a + 7b' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with variable a.\n```\n2a + 3b - 5a + 4b\n= (2a - 5a) + (3b + 4b)\n```\n\nSimplify each group.\n```\n= -3a + 7b\n```'
  },
  {
    position: 27,
    difficulty: 'medium',
    problem_text: 'What is (-6) × 3 ÷ (-2)?',
    choices: [
      { letter: 'A', text: '-9' },
      { letter: 'B', text: '9' },
      { letter: 'C', text: '-18' },
      { letter: 'D', text: '1' }
    ],
    correct_answer: 'B',
    solution: 'Work from left to right.\n```\n(-6) × 3 ÷ (-2)\n```\n\nMultiply -6 by 3.\n```\n= -18 ÷ (-2)\n```\n\nDivide -18 by -2.\n```\n= 9\n```'
  },
  {
    position: 28,
    difficulty: 'medium',
    problem_text: 'Simplify: 3(x - 2) + 2(x + 4)',
    choices: [
      { letter: 'A', text: '5x + 2' },
      { letter: 'B', text: '5x - 2' },
      { letter: 'C', text: '5x + 14' },
      { letter: 'D', text: 'x + 2' }
    ],
    correct_answer: 'A',
    solution: 'Distribute 3 and 2 to their respective terms.\n```\n3(x - 2) + 2(x + 4)\n= 3x - 6 + 2x + 8\n```\n\nCombine like terms.\n```\n= (3x + 2x) + (-6 + 8)\n= 5x + 2\n```'
  },
  {
    position: 29,
    difficulty: 'medium',
    problem_text: 'What is 2³ + 3 × 2?',
    choices: [
      { letter: 'A', text: '14' },
      { letter: 'B', text: '64' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '20' }
    ],
    correct_answer: 'A',
    solution: 'Evaluate the exponent first.\n```\n2³ + 3 × 2\n= 8 + 3 × 2\n```\n\nMultiply 3 by 2.\n```\n= 8 + 6\n```\n\nAdd 8 and 6.\n```\n= 14\n```'
  },
  {
    position: 30,
    difficulty: 'medium',
    problem_text: 'Simplify: 6x - 2y + 3x - y - 4x',
    choices: [
      { letter: 'A', text: '5x - 3y' },
      { letter: 'B', text: '5x + 3y' },
      { letter: 'C', text: '13x - 3y' },
      { letter: 'D', text: '5x - y' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with variable x.\n```\n6x - 2y + 3x - y - 4x\n= (6x + 3x - 4x) + (-2y - y)\n```\n\nSimplify each group.\n```\n= 5x - 3y\n```'
  },
  {
    position: 31,
    difficulty: 'medium',
    problem_text: 'What is 25 - 4 × 5 + 3?',
    choices: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '102' },
      { letter: 'C', text: '22' },
      { letter: 'D', text: '125' }
    ],
    correct_answer: 'A',
    solution: 'Multiply first following PEMDAS.\n```\n25 - 4 × 5 + 3\n= 25 - 20 + 3\n```\n\nWork from left to right.\n```\n= 5 + 3\n= 8\n```'
  },
  {
    position: 32,
    difficulty: 'medium',
    problem_text: 'Simplify: -2(a - 3b) + 4(2a + b)',
    choices: [
      { letter: 'A', text: '6a + 10b' },
      { letter: 'B', text: '6a - 2b' },
      { letter: 'C', text: '10a + 10b' },
      { letter: 'D', text: '6a + 2b' }
    ],
    correct_answer: 'A',
    solution: 'Distribute -2 and 4 to their respective terms.\n```\n-2(a - 3b) + 4(2a + b)\n= -2a + 6b + 8a + 4b\n```\n\nCombine like terms.\n```\n= (-2a + 8a) + (6b + 4b)\n= 6a + 10b\n```'
  },
  {
    position: 33,
    difficulty: 'medium',
    problem_text: 'What is (-15) ÷ (-3) × 2?',
    choices: [
      { letter: 'A', text: '-10' },
      { letter: 'B', text: '10' },
      { letter: 'C', text: '2.5' },
      { letter: 'D', text: '-2.5' }
    ],
    correct_answer: 'B',
    solution: 'Work from left to right.\n```\n(-15) ÷ (-3) × 2\n```\n\nDivide -15 by -3.\n```\n= 5 × 2\n```\n\nMultiply 5 by 2.\n```\n= 10\n```'
  },
  {
    position: 34,
    difficulty: 'medium',
    problem_text: 'Simplify: 4m - 3n + 2m - 5m + n',
    choices: [
      { letter: 'A', text: 'm - 2n' },
      { letter: 'B', text: '11m - 2n' },
      { letter: 'C', text: 'm + 2n' },
      { letter: 'D', text: '3m - 2n' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with variable m.\n```\n4m - 3n + 2m - 5m + n\n= (4m + 2m - 5m) + (-3n + n)\n```\n\nSimplify each group.\n```\n= m - 2n\n```'
  },
  // HARD (35-50)
  {
    position: 35,
    difficulty: 'hard',
    problem_text: 'Simplify: 3(2x - 5) - 2(3x - 4)',
    choices: [
      { letter: 'A', text: '-7' },
      { letter: 'B', text: '-7x' },
      { letter: 'C', text: '12x - 7' },
      { letter: 'D', text: '-23' }
    ],
    correct_answer: 'A',
    solution: 'Distribute 3 and -2 to their respective terms.\n```\n3(2x - 5) - 2(3x - 4)\n= 6x - 15 - 6x + 8\n```\n\nCombine like terms.\n```\n= (6x - 6x) + (-15 + 8)\n= 0 - 7\n= -7\n```'
  },
  {
    position: 36,
    difficulty: 'hard',
    problem_text: 'What is 100 ÷ 5 ÷ 2 × 5?',
    choices: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '50' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '4' }
    ],
    correct_answer: 'B',
    solution: 'Work from left to right.\n```\n100 ÷ 5 ÷ 2 × 5\n```\n\nDivide 100 by 5.\n```\n= 20 ÷ 2 × 5\n```\n\nDivide 20 by 2.\n```\n= 10 × 5\n```\n\nMultiply 10 by 5.\n```\n= 50\n```'
  },
  {
    position: 37,
    difficulty: 'hard',
    problem_text: 'Simplify: 5x² - 3x + 2x² + 7x - 4x² + x',
    choices: [
      { letter: 'A', text: '3x² + 5x' },
      { letter: 'B', text: '3x² + 4x' },
      { letter: 'C', text: '7x² + 5x' },
      { letter: 'D', text: '11x² + 5x' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with x².\n```\n5x² - 3x + 2x² + 7x - 4x² + x\n= (5x² + 2x² - 4x²) + (-3x + 7x + x)\n```\n\nSimplify each group.\n```\n= 3x² + 5x\n```'
  },
  {
    position: 38,
    difficulty: 'hard',
    problem_text: 'What is 3 × 2² + 4 ÷ 2?',
    choices: [
      { letter: 'A', text: '14' },
      { letter: 'B', text: '38' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '20' }
    ],
    correct_answer: 'A',
    solution: 'Evaluate the exponent first.\n```\n3 × 2² + 4 ÷ 2\n= 3 × 4 + 4 ÷ 2\n```\n\nMultiply and divide from left to right.\n```\n= 12 + 2\n```\n\nAdd 12 and 2.\n```\n= 14\n```'
  },
  {
    position: 39,
    difficulty: 'hard',
    problem_text: 'Simplify: -4(2a - 3b) + 3(a + 2b) - 2a',
    choices: [
      { letter: 'A', text: '-7a + 18b' },
      { letter: 'B', text: '-7a + 12b' },
      { letter: 'C', text: '-3a + 18b' },
      { letter: 'D', text: '-13a + 18b' }
    ],
    correct_answer: 'A',
    solution: 'Distribute -4, 3, and combine with -2a.\n```\n-4(2a - 3b) + 3(a + 2b) - 2a\n= -8a + 12b + 3a + 6b - 2a\n```\n\nCombine like terms.\n```\n= (-8a + 3a - 2a) + (12b + 6b)\n= -7a + 18b\n```'
  },
  {
    position: 40,
    difficulty: 'hard',
    problem_text: 'What is 36 ÷ 6 + 2 × 3?',
    choices: [
      { letter: 'A', text: '12' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '24' },
      { letter: 'D', text: '18' }
    ],
    correct_answer: 'A',
    solution: 'Divide and multiply first, working left to right.\n```\n36 ÷ 6 + 2 × 3\n= 6 + 6\n```\n\nAdd 6 and 6.\n```\n= 12\n```'
  },
  {
    position: 41,
    difficulty: 'hard',
    problem_text: 'Simplify: 3x - 2(x - 4) + 5(2x + 1) - 7x',
    choices: [
      { letter: 'A', text: '4x + 13' },
      { letter: 'B', text: '4x + 8' },
      { letter: 'C', text: '14x + 13' },
      { letter: 'D', text: '4x + 3' }
    ],
    correct_answer: 'A',
    solution: 'Distribute -2 and 5 to their respective terms.\n```\n3x - 2(x - 4) + 5(2x + 1) - 7x\n= 3x - 2x + 8 + 10x + 5 - 7x\n```\n\nCombine like terms.\n```\n= (3x - 2x + 10x - 7x) + (8 + 5)\n= 4x + 13\n```'
  },
  {
    position: 42,
    difficulty: 'hard',
    problem_text: 'What is 2 + 3 × (4 + 2)²?',
    choices: [
      { letter: 'A', text: '110' },
      { letter: 'B', text: '150' },
      { letter: 'C', text: '182' },
      { letter: 'D', text: '38' }
    ],
    correct_answer: 'A',
    solution: 'Evaluate the expression inside parentheses first.\n```\n2 + 3 × (4 + 2)²\n= 2 + 3 × 6²\n```\n\nEvaluate the exponent.\n```\n= 2 + 3 × 36\n```\n\nMultiply 3 by 36.\n```\n= 2 + 108\n```\n\nAdd 2 and 108.\n```\n= 110\n```'
  },
  {
    position: 43,
    difficulty: 'hard',
    problem_text: 'Simplify: 6y - 3z + 2y - 5y + 4z - z',
    choices: [
      { letter: 'A', text: '3y' },
      { letter: 'B', text: '3y + 6z' },
      { letter: 'C', text: '13y' },
      { letter: 'D', text: '3y + 2z' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with variable y.\n```\n6y - 3z + 2y - 5y + 4z - z\n= (6y + 2y - 5y) + (-3z + 4z - z)\n```\n\nSimplify each group.\n```\n= 3y + 0z\n= 3y\n```'
  },
  {
    position: 44,
    difficulty: 'hard',
    problem_text: 'What is 48 ÷ 8 × 2 ÷ 3?',
    choices: [
      { letter: 'A', text: '32' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '8' }
    ],
    correct_answer: 'B',
    solution: 'Work from left to right.\n```\n48 ÷ 8 × 2 ÷ 3\n```\n\nDivide 48 by 8.\n```\n= 6 × 2 ÷ 3\n```\n\nMultiply 6 by 2.\n```\n= 12 ÷ 3\n```\n\nDivide 12 by 3.\n```\n= 4\n```'
  },
  {
    position: 45,
    difficulty: 'hard',
    problem_text: 'Simplify: 4(3m - 2n) - 3(2m - 4n) + m - n',
    choices: [
      { letter: 'A', text: '7m + 3n' },
      { letter: 'B', text: '7m + 4n' },
      { letter: 'C', text: '19m + 3n' },
      { letter: 'D', text: '7m - 5n' }
    ],
    correct_answer: 'A',
    solution: 'Distribute 4 and -3 to their respective terms.\n```\n4(3m - 2n) - 3(2m - 4n) + m - n\n= 12m - 8n - 6m + 12n + m - n\n```\n\nCombine like terms.\n```\n= (12m - 6m + m) + (-8n + 12n - n)\n= 7m + 3n\n```'
  },
  {
    position: 46,
    difficulty: 'hard',
    problem_text: 'What is 5 × 2³ - 4 × 3?',
    choices: [
      { letter: 'A', text: '28' },
      { letter: 'B', text: '136' },
      { letter: 'C', text: '24' },
      { letter: 'D', text: '52' }
    ],
    correct_answer: 'A',
    solution: 'Evaluate the exponent first.\n```\n5 × 2³ - 4 × 3\n= 5 × 8 - 4 × 3\n```\n\nMultiply from left to right.\n```\n= 40 - 12\n```\n\nSubtract 12 from 40.\n```\n= 28\n```'
  },
  {
    position: 47,
    difficulty: 'hard',
    problem_text: 'Simplify: -3(2x - y) - 2(-x + 3y) + 4(x - 2y)',
    choices: [
      { letter: 'A', text: '-11y' },
      { letter: 'B', text: '0x - 11y' },
      { letter: 'C', text: '0x + 11y' },
      { letter: 'D', text: '-6x - 11y' }
    ],
    correct_answer: 'A',
    solution: 'Distribute -3, -2, and 4 to their respective terms.\n```\n-3(2x - y) - 2(-x + 3y) + 4(x - 2y)\n= -6x + 3y + 2x - 6y + 4x - 8y\n```\n\nCombine like terms.\n```\n= (-6x + 2x + 4x) + (3y - 6y - 8y)\n= 0x - 11y\n= -11y\n```'
  },
  {
    position: 48,
    difficulty: 'hard',
    problem_text: 'What is 100 - 5 × (4 + 6) ÷ 2?',
    choices: [
      { letter: 'A', text: '75' },
      { letter: 'B', text: '925' },
      { letter: 'C', text: '50' },
      { letter: 'D', text: '90' }
    ],
    correct_answer: 'A',
    solution: 'Evaluate the expression inside parentheses first.\n```\n100 - 5 × (4 + 6) ÷ 2\n= 100 - 5 × 10 ÷ 2\n```\n\nWork from left to right for multiplication and division.\n```\n= 100 - 50 ÷ 2\n= 100 - 25\n```\n\nSubtract 25 from 100.\n```\n= 75\n```'
  },
  {
    position: 49,
    difficulty: 'hard',
    problem_text: 'Simplify: 2x² - 3xy + 4y² - x² + 5xy - 2y² + xy',
    choices: [
      { letter: 'A', text: 'x² + 3xy + 2y²' },
      { letter: 'B', text: 'x² + 7xy + 2y²' },
      { letter: 'C', text: '3x² + 3xy + 2y²' },
      { letter: 'D', text: 'x² + 3xy + 6y²' }
    ],
    correct_answer: 'A',
    solution: 'Combine like terms with x².\n```\n2x² - 3xy + 4y² - x² + 5xy - 2y² + xy\n= (2x² - x²) + (-3xy + 5xy + xy) + (4y² - 2y²)\n```\n\nSimplify each group.\n```\n= x² + 3xy + 2y²\n```'
  },
  {
    position: 50,
    difficulty: 'hard',
    problem_text: 'What is 3 × (2 + 4)² ÷ 6 - 2?',
    choices: [
      { letter: 'A', text: '16' },
      { letter: 'B', text: '106' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '52' }
    ],
    correct_answer: 'A',
    solution: 'Evaluate the expression inside parentheses first.\n```\n3 × (2 + 4)² ÷ 6 - 2\n= 3 × 6² ÷ 6 - 2\n```\n\nEvaluate the exponent.\n```\n= 3 × 36 ÷ 6 - 2\n```\n\nWork from left to right for multiplication and division.\n```\n= 108 ÷ 6 - 2\n= 18 - 2\n```\n\nSubtract 2 from 18.\n```\n= 16\n```'
  }
];

async function insertQuestions() {
  console.log('========================================');
  console.log('INSERTING 50 ALGEBRA SKILLS QUESTIONS');
  console.log('Using SERVICE ROLE KEY (bypasses RLS)');
  console.log('========================================\n');

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: LESSON_ID,
      subject: 'math',
      position: q.position,
      difficulty: q.difficulty,
      title: `Algebra Skills Practice ${q.position}`,
      problem_text: q.problem_text,
      choices: JSON.stringify(q.choices),
      correct_answer: q.correct_answer,
      answer_explanation: q.solution,
      solution_steps: [],
      diagram_svg: null
    };

    const { error } = await supabase
      .from('practice_questions')
      .insert(questionData);

    if (error) {
      console.error(`❌ Question ${q.position} FAILED:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Question ${q.position} inserted (${q.difficulty})`);
      successCount++;
    }
  }

  console.log('\n========================================');
  console.log('INSERTION COMPLETE');
  console.log(`✅ Success: ${successCount}/50`);
  console.log(`❌ Errors: ${errorCount}/50`);
  console.log('========================================');
}

insertQuestions();
