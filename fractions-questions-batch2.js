// FRACTIONS - BATCH 2 (Questions 11-20: MEDIUM)
// Lesson ID: a8cd8513-f0a8-4bb1-9890-f21dc053939a

const batch2 = [
  {
    position: 11,
    problem_text: "What is 2 3/4 - 1 5/8?",
    choices: [
      {
        letter: "A",
        text: "1 1/8",
        explanation: "CORRECT. Convert to improper: 2 3/4 = 11/4 = 22/8, and 1 5/8 = 13/8. Subtract: 22/8 - 13/8 = 9/8 = 1 1/8."
      },
      {
        letter: "B",
        text: "1 2/4",
        explanation: "This subtracts whole numbers correctly (2-1=1) but incorrectly handles the fractions, possibly subtracting 5 from 3 and using the wrong denominator."
      },
      {
        letter: "C",
        text: "3/4",
        explanation: "This might result from incorrectly subtracting the fractions without properly borrowing from the whole number, or making errors in finding the common denominator."
      },
      {
        letter: "D",
        text: "1 3/8",
        explanation: "This makes an error in the fractional subtraction. With LCD of 8, we have 6/8 - 5/8 = 1/8, not 3/8."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 12,
    problem_text: "Simplify: (2/3) ÷ (4/9)",
    choices: [
      {
        letter: "A",
        text: "8/27",
        explanation: "This multiplies the fractions directly (2/3 × 4/9 = 8/27) instead of dividing. Division requires multiplying by the reciprocal."
      },
      {
        letter: "B",
        text: "3/2",
        explanation: "CORRECT. Multiply by the reciprocal: 2/3 × 9/4 = 18/12 = 3/2 (simplified by dividing both by 6)."
      },
      {
        letter: "C",
        text: "6/9",
        explanation: "This might come from an incorrect cross-multiplication or confusion about the division process. The correct approach is to flip 4/9 and multiply."
      },
      {
        letter: "D",
        text: "2/9",
        explanation: "This incorrectly keeps 2 in the numerator and uses 9 as denominator, perhaps trying to divide across without using the reciprocal method."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 13,
    problem_text: "A recipe calls for 2/3 cup of flour. If you want to make 3 1/2 times the recipe, how much flour do you need?",
    choices: [
      {
        letter: "A",
        text: "2 1/3 cups",
        explanation: "CORRECT. Multiply: 2/3 × 3 1/2 = 2/3 × 7/2 = 14/6 = 7/3 = 2 1/3 cups."
      },
      {
        letter: "B",
        text: "2 cups",
        explanation: "This rounds 2 1/3 down to 2, or makes a calculation error. The exact answer maintains the fractional part: 2 1/3 cups."
      },
      {
        letter: "C",
        text: "3 2/3 cups",
        explanation: "This might add 2/3 + 3 1/2 instead of multiplying, or makes an error in converting 3 1/2 to an improper fraction."
      },
      {
        letter: "D",
        text: "7/6 cups",
        explanation: "This equals approximately 1.17 cups and likely results from multiplying 2/3 by 3 (instead of 3 1/2), getting 2, then making additional errors."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 14,
    problem_text: "What is 5/12 + 3/8 + 1/6?",
    choices: [
      {
        letter: "A",
        text: "9/26",
        explanation: "This incorrectly adds numerators (5+3+1=9) and denominators (12+8+6=26) separately. You must find a common denominator for all three fractions."
      },
      {
        letter: "B",
        text: "23/24",
        explanation: "CORRECT. LCD of 12, 8, and 6 is 24. Convert: 5/12=10/24, 3/8=9/24, 1/6=4/24. Add: 10+9+4=23, so 23/24."
      },
      {
        letter: "C",
        text: "1 1/24",
        explanation: "This suggests a sum greater than 1. However, 10/24 + 9/24 + 4/24 = 23/24, which is less than 1."
      },
      {
        letter: "D",
        text: "19/24",
        explanation: "This makes an error in converting one of the fractions to 24ths, or in adding the numerators. The correct sum of 10+9+4 is 23, not 19."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 15,
    problem_text: "If 3/4 of a number is 36, what is the number?",
    choices: [
      {
        letter: "A",
        text: "27",
        explanation: "This calculates 3/4 of 36 (which is 27) instead of finding what number has 3/4 equal to 36. You need to divide 36 by 3/4, not multiply."
      },
      {
        letter: "B",
        text: "48",
        explanation: "CORRECT. Set up equation: 3/4 × n = 36. Solve: n = 36 ÷ 3/4 = 36 × 4/3 = 144/3 = 48."
      },
      {
        letter: "C",
        text: "54",
        explanation: "This adds 36 + (36 × 1/2) = 36 + 18 = 54, which doesn't solve the equation 3/4 × n = 36."
      },
      {
        letter: "D",
        text: "12",
        explanation: "This divides 36 by 3 to get 12, but forgets to account for the 4 in the denominator. The correct calculation is 36 × 4/3, not 36 ÷ 3."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 16,
    problem_text: "Simplify: (3/4 + 1/2) ÷ (2/3)",
    choices: [
      {
        letter: "A",
        text: "5/4",
        explanation: "This adds 3/4 + 1/2 correctly to get 5/4, but forgets to complete the division by 2/3. The problem requires one more step."
      },
      {
        letter: "B",
        text: "15/8",
        explanation: "CORRECT. First add: 3/4 + 2/4 = 5/4. Then divide by 2/3: (5/4) × (3/2) = 15/8, which equals 1 7/8."
      },
      {
        letter: "C",
        text: "10/12",
        explanation: "This might result from errors in addition or division, or confusing the order of operations. The correct process is to add first, then divide."
      },
      {
        letter: "D",
        text: "5/6",
        explanation: "This might multiply 5/4 by 2/3 instead of dividing by 2/3, which would give 10/12 = 5/6. Division requires multiplying by the reciprocal 3/2."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 17,
    problem_text: "A container is 5/8 full. After pouring out 1/4 of the container's total capacity, what fraction of the container is full?",
    choices: [
      {
        letter: "A",
        text: "3/8",
        explanation: "CORRECT. Subtract 1/4 from 5/8. Convert: 1/4 = 2/8. Then: 5/8 - 2/8 = 3/8 of the container remains full."
      },
      {
        letter: "B",
        text: "1/2",
        explanation: "This might subtract 1/4 from 5/8 incorrectly, perhaps calculating 5/8 - 1/8 = 4/8 = 1/2. The problem states 1/4, which equals 2/8."
      },
      {
        letter: "C",
        text: "5/32",
        explanation: "This incorrectly multiplies 5/8 × 1/4 = 5/32 instead of subtracting. The container loses 1/4 of capacity, not reduces to 1/4 of current amount."
      },
      {
        letter: "D",
        text: "1/4",
        explanation: "This might confuse what's being asked. Pouring out 1/4 from a container that's 5/8 full leaves 3/8, not 1/4."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 18,
    problem_text: "What is the reciprocal of 2 3/5?",
    choices: [
      {
        letter: "A",
        text: "5/13",
        explanation: "CORRECT. Convert to improper fraction: 2 3/5 = 13/5. The reciprocal flips numerator and denominator: 5/13."
      },
      {
        letter: "B",
        text: "3/5",
        explanation: "This gives the reciprocal of just the fractional part (3/5 → 5/3) but ignores the whole number 2. You must first convert the entire mixed number."
      },
      {
        letter: "C",
        text: "5/2",
        explanation: "This flips only the whole number and denominator (2 and 5) while ignoring the numerator 3. You must convert to 13/5 first, then find the reciprocal."
      },
      {
        letter: "D",
        text: "13/5",
        explanation: "This converts 2 3/5 to an improper fraction correctly (13/5) but forgets to flip it. The reciprocal requires flipping to 5/13."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 19,
    problem_text: "Evaluate: 2/3 × 3/4 × 4/5",
    choices: [
      {
        letter: "A",
        text: "24/60",
        explanation: "This multiplies all numerators (2×3×4=24) and all denominators (3×4×5=60) correctly but doesn't simplify. Reduce 24/60 to 2/5."
      },
      {
        letter: "B",
        text: "2/5",
        explanation: "CORRECT. Notice cancellation: 2/3 × 3/4 × 4/5. The 3s cancel, the 4s cancel, leaving 2/5."
      },
      {
        letter: "C",
        text: "9/60",
        explanation: "This makes errors in multiplication. The product of numerators 2×3×4 is 24, not 9."
      },
      {
        letter: "D",
        text: "3/5",
        explanation: "This might result from calculation errors in multiplying or simplifying. The correct simplified answer is 2/5, not 3/5."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 20,
    problem_text: "A pizza is cut into 12 equal slices. John eats 1/3 of the pizza, and Sarah eats 1/4 of the pizza. How many slices are left?",
    choices: [
      {
        letter: "A",
        text: "5 slices",
        explanation: "CORRECT. John eats 1/3 = 4 slices, Sarah eats 1/4 = 3 slices. Total eaten: 4+3=7. Remaining: 12-7=5 slices."
      },
      {
        letter: "B",
        text: "4 slices",
        explanation: "This might calculate 1/3 + 1/4 = 7/12 and convert incorrectly to slices, or subtract only one person's consumption."
      },
      {
        letter: "C",
        text: "7 slices",
        explanation: "This represents the slices eaten (4+3=7), not the slices left. The question asks for remaining slices: 12-7=5."
      },
      {
        letter: "D",
        text: "6 slices",
        explanation: "This might calculate 12 × (1 - 1/2) = 6, incorrectly assuming they ate half. Actually, 1/3 + 1/4 = 7/12, leaving 5/12 = 5 slices."
      }
    ],
    correct_answer: "A"
  }
];

module.exports = batch2;
