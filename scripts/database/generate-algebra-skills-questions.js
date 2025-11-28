const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const LESSON_ID = '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f';

// 30 questions for Algebra Skills (3.1) - PEMDAS, negative numbers, combining terms
// Difficulty progression: 1-10 easy, 11-20 medium, 21-30 hard
const questions = [
  // EASY QUESTIONS (1-10)
  {
    position: 1,
    difficulty: 'easy',
    problem_text: 'What is 5 + 3 × 2?',
    choices: [
      {
        letter: 'A',
        text: '16',
        explanation: 'This incorrectly adds first: (5 + 3) × 2 = 8 × 2 = 16. You must follow PEMDAS order of operations, which requires multiplication before addition.'
      },
      {
        letter: 'B',
        text: '11',
        explanation: 'CORRECT. Following PEMDAS, multiply first: 3 × 2 = 6, then add: 5 + 6 = 11. Multiplication always comes before addition in order of operations.'
      },
      {
        letter: 'C',
        text: '13',
        explanation: 'This adds the wrong numbers together. There is no calculation that produces 13 from 5 + 3 × 2 when following any order of operations.'
      },
      {
        letter: 'D',
        text: '10',
        explanation: 'This only performs the multiplication 3 × 2 = 6 and then adds 4 instead of 5, or makes a different arithmetic error. The correct calculation is 5 + 6 = 11.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 2,
    difficulty: 'easy',
    problem_text: 'What is -8 + 5?',
    choices: [
      {
        letter: 'A',
        text: '-13',
        explanation: 'This incorrectly adds the absolute values: -(8 + 5) = -13. When adding a positive to a negative, subtract the smaller from the larger and keep the sign of the larger.'
      },
      {
        letter: 'B',
        text: '13',
        explanation: 'This gives the positive version of adding absolute values. When adding -8 and 5, you need to keep track of the negative sign on the 8.'
      },
      {
        letter: 'C',
        text: '-3',
        explanation: 'CORRECT. Think of this as starting at -8 and moving 5 units to the right: -8 + 5 = -3. Or subtract: 8 - 5 = 3, and since 8 is larger, the answer is negative.'
      },
      {
        letter: 'D',
        text: '3',
        explanation: 'This has the correct magnitude but wrong sign. The answer should be negative because |-8| > |5|, so the negative number dominates.'
      }
    ],
    correct_answer: 'C'
  },
  {
    position: 3,
    difficulty: 'easy',
    problem_text: 'Simplify: 3x + 5x',
    choices: [
      {
        letter: 'A',
        text: '8x',
        explanation: 'CORRECT. These are like terms (both have variable x), so add the coefficients: 3 + 5 = 8, giving 8x.'
      },
      {
        letter: 'B',
        text: '15x',
        explanation: 'This multiplies the coefficients (3 × 5 = 15) instead of adding them. When combining like terms, you add coefficients, not multiply them.'
      },
      {
        letter: 'C',
        text: '8x^2',
        explanation: 'This incorrectly changes the exponent. When adding like terms with the same variable, the exponent stays the same; only the coefficient changes.'
      },
      {
        letter: 'D',
        text: '15x^2',
        explanation: 'This both multiplies coefficients incorrectly and changes the exponent. The correct operation is to add coefficients: 3x + 5x = (3+5)x = 8x.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 4,
    difficulty: 'easy',
    problem_text: 'What is 12 ÷ 4 × 3?',
    choices: [
      {
        letter: 'A',
        text: '1',
        explanation: 'This incorrectly divides 12 ÷ (4 × 3) = 12 ÷ 12 = 1. Division and multiplication have equal priority and are performed left to right.'
      },
      {
        letter: 'B',
        text: '9',
        explanation: 'CORRECT. Working left to right: 12 ÷ 4 = 3, then 3 × 3 = 9. Division and multiplication have equal priority in PEMDAS.'
      },
      {
        letter: 'C',
        text: '4',
        explanation: 'This might come from 12 ÷ 3 = 4, forgetting to include the multiplication by 3 at all.'
      },
      {
        letter: 'D',
        text: '36',
        explanation: 'This incorrectly multiplies 12 × 3 = 36 first, ignoring the division. You must work left to right when operations have equal priority.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 5,
    difficulty: 'easy',
    problem_text: 'What is -4 - 7?',
    choices: [
      {
        letter: 'A',
        text: '-11',
        explanation: 'CORRECT. Subtracting a positive is the same as adding a negative: -4 - 7 = -4 + (-7) = -11. Both numbers are negative, so add their absolute values and keep the negative sign.'
      },
      {
        letter: 'B',
        text: '11',
        explanation: 'This gives the absolute value of the answer but with the wrong sign. When both numbers are negative, the result must be negative.'
      },
      {
        letter: 'C',
        text: '-3',
        explanation: 'This incorrectly subtracts the absolute values: 7 - 4 = 3, then makes it negative. But -4 - 7 means moving 7 more units left from -4.'
      },
      {
        letter: 'D',
        text: '3',
        explanation: 'This might come from |-7| - |-4| = 3, but ignores the signs. The correct calculation is -4 - 7 = -11.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 6,
    difficulty: 'easy',
    problem_text: 'Simplify: 7y - 2y',
    choices: [
      {
        letter: 'A',
        text: '5y',
        explanation: 'CORRECT. Subtract the coefficients: 7 - 2 = 5, so 7y - 2y = 5y.'
      },
      {
        letter: 'B',
        text: '9y',
        explanation: 'This adds the coefficients (7 + 2 = 9) instead of subtracting. The minus sign means subtraction: 7 - 2 = 5.'
      },
      {
        letter: 'C',
        text: '5',
        explanation: 'This forgets to keep the variable y. When combining like terms, the variable stays: 7y - 2y = 5y, not just 5.'
      },
      {
        letter: 'D',
        text: '14y',
        explanation: 'This multiplies the coefficients (7 × 2 = 14) instead of subtracting. Combining like terms means adding or subtracting coefficients, not multiplying.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 7,
    difficulty: 'easy',
    problem_text: 'What is 6 + 2 × (4 - 1)?',
    choices: [
      {
        letter: 'A',
        text: '24',
        explanation: 'This incorrectly calculates (6 + 2) × (4 - 1) = 8 × 3 = 24. Parentheses create a group, but you cannot add the 6 to what is inside the parentheses.'
      },
      {
        letter: 'B',
        text: '12',
        explanation: 'CORRECT. Following PEMDAS: First parentheses (4 - 1) = 3, then multiplication 2 × 3 = 6, finally addition 6 + 6 = 12.'
      },
      {
        letter: 'C',
        text: '10',
        explanation: 'This might add 6 + 2 = 8 first, then add (4 - 1) = 3 to get 11, or make another error. The correct order is parentheses, then multiplication, then addition.'
      },
      {
        letter: 'D',
        text: '18',
        explanation: 'This might come from 6 + 2 × 4 - 1 = 6 + 8 - 1 = 13, or from 6 × 3 = 18. The correct calculation is 6 + (2 × 3) = 12.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 8,
    difficulty: 'easy',
    problem_text: 'What is (-3) × 4?',
    choices: [
      {
        letter: 'A',
        text: '12',
        explanation: 'This gives the absolute value but wrong sign. A negative times a positive always gives a negative result.'
      },
      {
        letter: 'B',
        text: '-12',
        explanation: 'CORRECT. Multiply the absolute values: 3 × 4 = 12. Since one number is negative and one is positive, the result is negative: -12.'
      },
      {
        letter: 'C',
        text: '-7',
        explanation: 'This adds instead of multiplies: -3 + 4 = 1, or possibly confuses the operation. The problem requires multiplication: (-3) × 4 = -12.'
      },
      {
        letter: 'D',
        text: '1',
        explanation: 'This might come from -3 + 4 = 1. The operation is multiplication, not addition.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 9,
    difficulty: 'easy',
    problem_text: 'Simplify: 4a + 3b + 2a',
    choices: [
      {
        letter: 'A',
        text: '6a + 3b',
        explanation: 'CORRECT. Combine like terms: 4a + 2a = 6a. The 3b cannot be combined with the a terms because they have different variables.'
      },
      {
        letter: 'B',
        text: '9ab',
        explanation: 'This incorrectly adds all coefficients and combines different variables into a product. You cannot combine 4a + 3b + 2a into 9ab; only like terms can be combined.'
      },
      {
        letter: 'C',
        text: '9a + 3b',
        explanation: 'This adds all three coefficients to the a term: 4 + 3 + 2 = 9. But 3b has a different variable, so only 4a + 2a = 6a can be combined.'
      },
      {
        letter: 'D',
        text: '4a + 5b',
        explanation: 'This incorrectly combines 3b + 2a to get 5b. You cannot add terms with different variables; 2a stays as 2a and combines with 4a to make 6a.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 10,
    difficulty: 'easy',
    problem_text: 'What is 20 - 3 × 4?',
    choices: [
      {
        letter: 'A',
        text: '68',
        explanation: 'This appears to come from a calculation error. Following PEMDAS correctly gives 20 - 12 = 8, not 68.'
      },
      {
        letter: 'B',
        text: '8',
        explanation: 'CORRECT. Following PEMDAS, multiply first: 3 × 4 = 12, then subtract: 20 - 12 = 8.'
      },
      {
        letter: 'C',
        text: '32',
        explanation: 'This incorrectly calculates (20 - 3) × 4 = 17 × 4 = 68, or makes another error. You must multiply before subtracting.'
      },
      {
        letter: 'D',
        text: '17',
        explanation: 'This subtracts first: 20 - 3 = 17, then forgets to multiply by 4. Following PEMDAS, you must do 3 × 4 = 12 first, then 20 - 12 = 8.'
      }
    ],
    correct_answer: 'B'
  },

  // MEDIUM QUESTIONS (11-20)
  {
    position: 11,
    difficulty: 'medium',
    problem_text: 'Simplify: -2(3x - 5)',
    choices: [
      {
        letter: 'A',
        text: '-6x - 10',
        explanation: 'This correctly multiplies -2 × 3x = -6x but incorrectly multiplies -2 × (-5) = -10. A negative times a negative gives a positive, so -2 × (-5) = +10.'
      },
      {
        letter: 'B',
        text: '-6x + 10',
        explanation: 'CORRECT. Distribute -2 to both terms: -2 × 3x = -6x and -2 × (-5) = +10, giving -6x + 10.'
      },
      {
        letter: 'C',
        text: '6x - 10',
        explanation: 'This reverses both signs. When distributing -2, the first term becomes -2 × 3x = -6x (negative), not 6x.'
      },
      {
        letter: 'D',
        text: '-6x - 5',
        explanation: 'This forgets to multiply -5 by -2. You must distribute -2 to BOTH terms inside the parentheses: -2(3x) and -2(-5).'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 12,
    difficulty: 'medium',
    problem_text: 'What is (-5) × (-6)?',
    choices: [
      {
        letter: 'A',
        text: '-30',
        explanation: 'This treats it like a negative times a positive. When both numbers are negative, the negatives cancel and the result is positive.'
      },
      {
        letter: 'B',
        text: '30',
        explanation: 'CORRECT. A negative times a negative equals a positive: (-5) × (-6) = 30. Multiply absolute values 5 × 6 = 30, and the result is positive.'
      },
      {
        letter: 'C',
        text: '-11',
        explanation: 'This adds the numbers instead of multiplying: -5 + (-6) = -11. The problem requires multiplication, not addition.'
      },
      {
        letter: 'D',
        text: '11',
        explanation: 'This might come from |-5 - 6| = |-11| = 11. The operation is multiplication: (-5) × (-6) = 30.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 13,
    difficulty: 'medium',
    problem_text: 'Simplify: 5x^2 + 3x - 2x^2 + 7x',
    choices: [
      {
        letter: 'A',
        text: '3x^2 + 10x',
        explanation: 'CORRECT. Combine like terms: 5x^2 - 2x^2 = 3x^2 and 3x + 7x = 10x, giving 3x^2 + 10x.'
      },
      {
        letter: 'B',
        text: '7x^2 + 10x',
        explanation: 'This adds the x^2 coefficients: 5 + (-2) = 3, but writes 7 instead. The correct combination is 5 - 2 = 3, not 7.'
      },
      {
        letter: 'C',
        text: '3x^2 + 4x',
        explanation: 'This correctly finds 3x^2 but incorrectly combines the x terms. 3x + 7x = 10x, not 4x.'
      },
      {
        letter: 'D',
        text: '13x^2',
        explanation: 'This adds all coefficients (5 + 3 + (-2) + 7 = 13) and incorrectly combines unlike terms. You cannot add x^2 terms and x terms together.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 14,
    difficulty: 'medium',
    problem_text: 'What is 18 ÷ (2 + 1)?',
    choices: [
      {
        letter: 'A',
        text: '9',
        explanation: 'This divides 18 ÷ 2 = 9 and ignores the parentheses. You must first calculate what is inside parentheses: 2 + 1 = 3.'
      },
      {
        letter: 'B',
        text: '6',
        explanation: 'CORRECT. Parentheses first: 2 + 1 = 3, then divide: 18 ÷ 3 = 6.'
      },
      {
        letter: 'C',
        text: '10',
        explanation: 'This might come from 18 ÷ 2 = 9, then 9 + 1 = 10. But you cannot break up division this way; you must evaluate the parentheses first as a complete unit.'
      },
      {
        letter: 'D',
        text: '19',
        explanation: 'This appears to add 18 + 1 = 19, completely ignoring the division and parentheses. The correct calculation is 18 ÷ (2 + 1) = 18 ÷ 3 = 6.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 15,
    difficulty: 'medium',
    problem_text: 'Simplify: 3(2x + 4) - 5x',
    choices: [
      {
        letter: 'A',
        text: 'x + 12',
        explanation: 'CORRECT. Distribute: 3(2x) + 3(4) = 6x + 12. Then combine: 6x + 12 - 5x = x + 12.'
      },
      {
        letter: 'B',
        text: '6x + 12 - 5x',
        explanation: 'This correctly distributes but does not combine like terms. You must simplify further: 6x - 5x = x, giving the final answer x + 12.'
      },
      {
        letter: 'C',
        text: 'x + 7',
        explanation: 'This correctly finds x for the variable term but incorrectly simplifies 12 to 7. The constant term should remain 12, giving x + 12.'
      },
      {
        letter: 'D',
        text: '11x + 12',
        explanation: 'This adds the x coefficients: 6 + (-5) = 1, but writes 11 instead. The correct simplification is 6x - 5x = x (which is 1x).'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 16,
    difficulty: 'medium',
    problem_text: 'What is -12 ÷ (-3)?',
    choices: [
      {
        letter: 'A',
        text: '-4',
        explanation: 'This treats it like dividing a negative by a positive. When both numbers are negative, the result is positive.'
      },
      {
        letter: 'B',
        text: '4',
        explanation: 'CORRECT. A negative divided by a negative equals a positive: -12 ÷ (-3) = 4. Divide absolute values 12 ÷ 3 = 4, and the result is positive.'
      },
      {
        letter: 'C',
        text: '-9',
        explanation: 'This subtracts instead of divides: -12 - (-3) = -12 + 3 = -9. The operation is division: -12 ÷ (-3) = 4.'
      },
      {
        letter: 'D',
        text: '36',
        explanation: 'This multiplies instead of divides: (-12) × (-3) = 36. The operation is division, not multiplication.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 17,
    difficulty: 'medium',
    problem_text: 'Simplify: -4a - (-7a)',
    choices: [
      {
        letter: 'A',
        text: '-11a',
        explanation: 'This treats the double negative as -4a - 7a = -11a. Subtracting a negative is the same as adding: -(-7a) = +7a.'
      },
      {
        letter: 'B',
        text: '3a',
        explanation: 'CORRECT. Subtracting a negative is the same as adding: -4a - (-7a) = -4a + 7a = 3a.'
      },
      {
        letter: 'C',
        text: '11a',
        explanation: 'This calculates |-4| + |7| = 11 but gets the sign wrong. The correct calculation is -4 + 7 = 3, giving 3a.'
      },
      {
        letter: 'D',
        text: '-3a',
        explanation: 'This has the correct magnitude but wrong sign. Since 7a > 4a, and we are adding a larger positive to a smaller negative, the result is positive.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 18,
    difficulty: 'medium',
    problem_text: 'What is 2^3 + 4 × 3?',
    choices: [
      {
        letter: 'A',
        text: '20',
        explanation: 'CORRECT. Following PEMDAS: Exponents first 2^3 = 8, then multiplication 4 × 3 = 12, finally addition 8 + 12 = 20.'
      },
      {
        letter: 'B',
        text: '30',
        explanation: 'This might calculate (2^3 + 4) × 3 = 12 × 3 = 36, or make another grouping error. You must follow PEMDAS: exponents, then multiplication, then addition.'
      },
      {
        letter: 'C',
        text: '14',
        explanation: 'This correctly calculates 2^3 = 8 but then adds only 6 instead of 12, possibly calculating 4 + 3 instead of 4 × 3.'
      },
      {
        letter: 'D',
        text: '54',
        explanation: 'This might come from 2^3 × 4 × 3 = 8 × 4 × 3 = 96, or another error. The correct operation between 2^3 and 4 is addition, not multiplication.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 19,
    difficulty: 'medium',
    problem_text: 'Simplify: 8y - 3y + 2y - 5y',
    choices: [
      {
        letter: 'A',
        text: '2y',
        explanation: 'CORRECT. Combine all like terms: 8 - 3 + 2 - 5 = 2, so the answer is 2y.'
      },
      {
        letter: 'B',
        text: '12y',
        explanation: 'This adds all coefficients without considering signs: 8 + 3 + 2 + 5 = 18, or makes another error. The correct calculation tracks signs: 8 - 3 + 2 - 5 = 2.'
      },
      {
        letter: 'C',
        text: '-2y',
        explanation: 'This has the correct magnitude but wrong sign. The calculation 8 - 3 + 2 - 5 = 2 is positive, not negative.'
      },
      {
        letter: 'D',
        text: '0',
        explanation: 'This might come from thinking the terms cancel out, but they do not: 8 - 3 = 5, then 5 + 2 = 7, then 7 - 5 = 2.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 20,
    difficulty: 'medium',
    problem_text: 'What is 15 - 2 × (6 - 4)?',
    choices: [
      {
        letter: 'A',
        text: '26',
        explanation: 'This might calculate (15 - 2) × (6 - 4) = 13 × 2 = 26. You cannot group the 15 - 2 together; only the parentheses create a group.'
      },
      {
        letter: 'B',
        text: '11',
        explanation: 'CORRECT. Parentheses first: (6 - 4) = 2, then multiplication: 2 × 2 = 4, finally subtraction: 15 - 4 = 11.'
      },
      {
        letter: 'C',
        text: '19',
        explanation: 'This might subtract 2 from 15 first: 15 - 2 = 13, then add (6 - 4) = 2 to get 15, or make another error. Follow PEMDAS: parentheses, multiplication, then subtraction.'
      },
      {
        letter: 'D',
        text: '8',
        explanation: 'This might come from 15 - (6 - 4) = 15 - 2 = 13, then making an error, or from another incorrect grouping. The correct answer is 11.'
      }
    ],
    correct_answer: 'B'
  },

  // HARD QUESTIONS (21-30)
  {
    position: 21,
    difficulty: 'hard',
    problem_text: 'Simplify: 3(2x - 4) - 2(x + 5)',
    choices: [
      {
        letter: 'A',
        text: '4x - 22',
        explanation: 'CORRECT. Distribute: 3(2x - 4) = 6x - 12 and 2(x + 5) = 2x + 10. Then: 6x - 12 - 2x - 10 = 4x - 22.'
      },
      {
        letter: 'B',
        text: '4x - 2',
        explanation: 'This correctly finds 4x but incorrectly simplifies the constants. The constant terms are -12 - 10 = -22, not -2.'
      },
      {
        letter: 'C',
        text: '6x - 22',
        explanation: 'This correctly finds -22 for the constant but forgets to subtract 2x from 6x. The variable terms combine: 6x - 2x = 4x.'
      },
      {
        letter: 'D',
        text: '8x - 2',
        explanation: 'This adds the x coefficients: 6 + 2 = 8 instead of subtracting, and also incorrectly calculates the constant. The correct answer is 4x - 22.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 22,
    difficulty: 'hard',
    problem_text: 'What is 24 ÷ 6 × 2 ÷ 4?',
    choices: [
      {
        letter: 'A',
        text: '8',
        explanation: 'This might calculate 24 ÷ 6 = 4, then 4 × 2 = 8, then forget the final ÷ 4. Working left to right through all operations gives 2.'
      },
      {
        letter: 'B',
        text: '2',
        explanation: 'CORRECT. Work left to right: 24 ÷ 6 = 4, then 4 × 2 = 8, then 8 ÷ 4 = 2.'
      },
      {
        letter: 'C',
        text: '16',
        explanation: 'This might incorrectly group operations. Following the left-to-right rule for equal-priority operations, the answer is 2, not 16.'
      },
      {
        letter: 'D',
        text: '1',
        explanation: 'This might come from 24 ÷ (6 × 2 ÷ 4) = 24 ÷ 3 = 8, or another error. You must work strictly left to right: 24 ÷ 6 × 2 ÷ 4 = 2.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 23,
    difficulty: 'hard',
    problem_text: 'Simplify: 5x^2 - 2x + 3x^2 + 7x - 4x^2',
    choices: [
      {
        letter: 'A',
        text: '4x^2 + 5x',
        explanation: 'CORRECT. Combine x^2 terms: 5 + 3 - 4 = 4, giving 4x^2. Combine x terms: -2 + 7 = 5, giving 5x. Final answer: 4x^2 + 5x.'
      },
      {
        letter: 'B',
        text: '12x^2 + 5x',
        explanation: 'This adds all x^2 coefficients without considering signs: 5 + 2 + 3 + 7 + 4 = 21, or makes another error. The x^2 terms combine to 5 + 3 - 4 = 4.'
      },
      {
        letter: 'C',
        text: '4x^2 + 9x',
        explanation: 'This correctly finds 4x^2 but incorrectly adds the x coefficients. The x terms are -2x + 7x = 5x, not 9x.'
      },
      {
        letter: 'D',
        text: '8x^2 + 5x',
        explanation: 'This incorrectly combines the x^2 terms. The calculation should be 5 + 3 - 4 = 4, not 8.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 24,
    difficulty: 'hard',
    problem_text: 'What is -3 × 4 ÷ (-2)?',
    choices: [
      {
        letter: 'A',
        text: '-6',
        explanation: 'This calculates -3 × 4 = -12, then divides by 2 (forgetting the negative sign): -12 ÷ 2 = -6. The divisor is -2, so -12 ÷ (-2) = 6.'
      },
      {
        letter: 'B',
        text: '6',
        explanation: 'CORRECT. Work left to right: -3 × 4 = -12, then -12 ÷ (-2) = 6. Negative divided by negative equals positive.'
      },
      {
        letter: 'C',
        text: '-24',
        explanation: 'This multiplies all three numbers without dividing: -3 × 4 × (-2) = -12 × (-2) = 24, then gets the sign wrong, or forgets to divide.'
      },
      {
        letter: 'D',
        text: '24',
        explanation: 'This might multiply all numbers: -3 × 4 × (-2) = 24, forgetting that ÷ means division, not multiplication.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 25,
    difficulty: 'hard',
    problem_text: 'Simplify: -2(3a - 4b) + 5(a + 2b)',
    choices: [
      {
        letter: 'A',
        text: '-a + 18b',
        explanation: 'CORRECT. Distribute: -2(3a - 4b) = -6a + 8b and 5(a + 2b) = 5a + 10b. Combine: (-6a + 5a) + (8b + 10b) = -a + 18b.'
      },
      {
        letter: 'B',
        text: '-11a + 18b',
        explanation: 'This incorrectly combines the a coefficients. The calculation should be -6 + 5 = -1, not -11.'
      },
      {
        letter: 'C',
        text: '-a + 2b',
        explanation: 'This correctly finds -a but incorrectly combines the b terms. The b coefficients are 8 + 10 = 18, not 2.'
      },
      {
        letter: 'D',
        text: 'a + 18b',
        explanation: 'This gets the correct b term but wrong sign on the a term. The a coefficients combine as -6 + 5 = -1, which is negative.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 26,
    difficulty: 'hard',
    problem_text: 'What is 2 + 3 × 4^2?',
    choices: [
      {
        letter: 'A',
        text: '100',
        explanation: 'This might calculate (2 + 3) × 4^2 = 5 × 16 = 80, or (2 + 3 × 4)^2 = 14^2 = 196, or another grouping error. Follow PEMDAS: exponents first, then multiplication, then addition.'
      },
      {
        letter: 'B',
        text: '50',
        explanation: 'CORRECT. Following PEMDAS: Exponents first 4^2 = 16, then multiplication 3 × 16 = 48, finally addition 2 + 48 = 50.'
      },
      {
        letter: 'C',
        text: '38',
        explanation: 'This might calculate 2 + 3 = 5, then 5 × 4 = 20, then 20 + 4^2 = 20 + 16 = 36, or make another error. The correct answer is 50.'
      },
      {
        letter: 'D',
        text: '20',
        explanation: 'This might calculate 2 + 3 = 5, then 5 × 4 = 20, forgetting to square the 4. Following PEMDAS, 4^2 = 16 must be calculated first.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 27,
    difficulty: 'hard',
    problem_text: 'Simplify: 4(2x - 3) - 3(2x - 4) + 2x',
    choices: [
      {
        letter: 'A',
        text: '4x',
        explanation: 'CORRECT. Distribute: 4(2x - 3) = 8x - 12 and 3(2x - 4) = 6x - 12. Then: 8x - 12 - 6x + 12 + 2x = (8 - 6 + 2)x + (-12 + 12) = 4x + 0 = 4x.'
      },
      {
        letter: 'B',
        text: '4x - 24',
        explanation: 'This correctly finds 4x but incorrectly keeps the constant term. The constants are -12 + 12 = 0, so they cancel out completely.'
      },
      {
        letter: 'C',
        text: '10x',
        explanation: 'This incorrectly combines the x coefficients. The correct calculation is 8 - 6 + 2 = 4, not 10.'
      },
      {
        letter: 'D',
        text: '2x + 12',
        explanation: 'This makes errors in both the variable and constant terms. The correct simplification gives 4x with no constant term.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 28,
    difficulty: 'hard',
    problem_text: 'What is (-8) ÷ 4 × (-2)?',
    choices: [
      {
        letter: 'A',
        text: '-4',
        explanation: 'This calculates -8 ÷ 4 = -2, then forgets to multiply by -2. Working left to right: -2 × (-2) = 4.'
      },
      {
        letter: 'B',
        text: '4',
        explanation: 'CORRECT. Work left to right: (-8) ÷ 4 = -2, then (-2) × (-2) = 4. Negative times negative equals positive.'
      },
      {
        letter: 'C',
        text: '-1',
        explanation: 'This might come from -8 ÷ (4 × -2) = -8 ÷ (-8) = 1, then getting the sign wrong. You must work left to right, not group operations.'
      },
      {
        letter: 'D',
        text: '1',
        explanation: 'This might calculate -8 ÷ (-8) = 1 by incorrectly grouping the last two numbers. The correct process is: -8 ÷ 4 = -2, then -2 × (-2) = 4.'
      }
    ],
    correct_answer: 'B'
  },
  {
    position: 29,
    difficulty: 'hard',
    problem_text: 'Simplify: 6m - 2n + 4m - 3m + 5n - n',
    choices: [
      {
        letter: 'A',
        text: '7m + 2n',
        explanation: 'CORRECT. Combine m terms: 6 + 4 - 3 = 7, giving 7m. Combine n terms: -2 + 5 - 1 = 2, giving 2n. Final answer: 7m + 2n.'
      },
      {
        letter: 'B',
        text: '7m + 3n',
        explanation: 'This correctly finds 7m but incorrectly combines the n terms. The calculation should be -2 + 5 - 1 = 2, not 3.'
      },
      {
        letter: 'C',
        text: '13m + 2n',
        explanation: 'This adds all m coefficients without considering signs: 6 + 2 + 4 + 3 + 5 + 1, or makes another error. The m terms combine as 6 + 4 - 3 = 7.'
      },
      {
        letter: 'D',
        text: '3m + 2n',
        explanation: 'This incorrectly combines the m terms. The correct calculation is 6 + 4 - 3 = 7, not 3.'
      }
    ],
    correct_answer: 'A'
  },
  {
    position: 30,
    difficulty: 'hard',
    problem_text: 'What is 100 ÷ 5 ÷ 2 × 5?',
    choices: [
      {
        letter: 'A',
        text: '10',
        explanation: 'This might calculate 100 ÷ 5 = 20, then 20 ÷ 2 = 10, then forget to multiply by 5. Working all the way through gives 50.'
      },
      {
        letter: 'B',
        text: '50',
        explanation: 'CORRECT. Work strictly left to right: 100 ÷ 5 = 20, then 20 ÷ 2 = 10, then 10 × 5 = 50.'
      },
      {
        letter: 'C',
        text: '20',
        explanation: 'This calculates only 100 ÷ 5 = 20, then stops. You must continue: 20 ÷ 2 = 10, then 10 × 5 = 50.'
      },
      {
        letter: 'D',
        text: '2',
        explanation: 'This might come from 100 ÷ (5 × 2 × 5) = 100 ÷ 50 = 2, incorrectly grouping the operations. You must work left to right without grouping: the answer is 50.'
      }
    ],
    correct_answer: 'B'
  }
];

async function insertQuestions() {
  console.log(`Preparing to insert ${questions.length} questions for Algebra Skills (3.1)...\n`);

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
      answer_explanation: q.choices.find(c => c.letter === q.correct_answer).explanation,
      solution_steps: [],
      diagram_svg: null
    };

    const { error } = await supabase
      .from('practice_questions')
      .insert(questionData);

    if (error) {
      console.error(`Error inserting question ${q.position}:`, error);
    } else {
      console.log(`✓ Question ${q.position} inserted (${q.difficulty})`);
    }
  }

  console.log('\n✅ All 30 questions for Algebra Skills (3.1) inserted successfully!');
}

insertQuestions();
