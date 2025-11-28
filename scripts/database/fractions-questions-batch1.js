// FRACTIONS - BATCH 1 (Questions 1-10: EASY)
// Lesson ID: a8cd8513-f0a8-4bb1-9890-f21dc053939a

const batch1 = [
  {
    position: 1,
    problem_text: "What is 2/3 + 1/4?",
    choices: [
      {
        letter: "A",
        text: "3/7",
        explanation: "This incorrectly adds numerators and denominators separately (2+1=3, 3+4=7). You cannot add fractions by simply adding across - you must find a common denominator first."
      },
      {
        letter: "B",
        text: "11/12",
        explanation: "CORRECT. To add fractions, find the LCD of 3 and 4, which is 12. Convert: 2/3 = 8/12 and 1/4 = 3/12. Then add: 8/12 + 3/12 = 11/12."
      },
      {
        letter: "C",
        text: "5/6",
        explanation: "This suggests using 6 as the common denominator (which works for 2/3 = 4/6), but 1/4 doesn't convert to sixths evenly. You need LCD = 12, not 6."
      },
      {
        letter: "D",
        text: "2/12",
        explanation: "This incorrectly converts only 1/4 to 3/12 and ignores the 2/3 term entirely, or makes an error in conversion and addition."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 2,
    problem_text: "Simplify: 15/25",
    choices: [
      {
        letter: "A",
        text: "5/5",
        explanation: "This divides only the numerator by 3 (15÷3=5) but incorrectly divides the denominator by 5 (25÷5=5). To simplify, you must divide both by the SAME number."
      },
      {
        letter: "B",
        text: "3/5",
        explanation: "CORRECT. The GCF of 15 and 25 is 5. Divide both numerator and denominator by 5: 15÷5 = 3 and 25÷5 = 5, giving 3/5 in simplest form."
      },
      {
        letter: "C",
        text: "15/25",
        explanation: "This leaves the fraction unchanged. While mathematically equal, it's not in simplest form - you must divide out the common factor of 5."
      },
      {
        letter: "D",
        text: "1/5",
        explanation: "This incorrectly divides the numerator by 15 (15÷15=1) but only the denominator by 5 (25÷5=5), applying different divisors to each part."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 3,
    problem_text: "What is 5/6 - 1/3?",
    choices: [
      {
        letter: "A",
        text: "4/3",
        explanation: "This subtracts denominators (6-3=3) and numerators (5-1=4) separately, which is incorrect. You must find a common denominator before subtracting."
      },
      {
        letter: "B",
        text: "1/2",
        explanation: "CORRECT. Convert 1/3 to sixths: 1/3 = 2/6. Then subtract: 5/6 - 2/6 = 3/6 = 1/2 (simplified by dividing both by 3)."
      },
      {
        letter: "C",
        text: "3/6",
        explanation: "While 3/6 equals 1/2, the question expects the simplest form. Though mathematically correct, 3/6 should be reduced to 1/2."
      },
      {
        letter: "D",
        text: "2/3",
        explanation: "This might result from incorrectly converting 5/6 to 4/6 before subtracting 2/6, or miscalculating the subtraction step."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 4,
    problem_text: "Calculate: 2/5 × 3/4",
    choices: [
      {
        letter: "A",
        text: "5/9",
        explanation: "This adds the fractions (2/5 + 3/4 with errors) rather than multiplying them. Multiplication of fractions is different from addition."
      },
      {
        letter: "B",
        text: "6/20",
        explanation: "This is the unreduced product. While 2×3=6 and 5×4=20 is correct, you must simplify: 6/20 = 3/10 (dividing both by 2)."
      },
      {
        letter: "C",
        text: "3/10",
        explanation: "CORRECT. Multiply numerators: 2×3=6. Multiply denominators: 5×4=20. Then simplify: 6/20 ÷ 2/2 = 3/10."
      },
      {
        letter: "D",
        text: "6/9",
        explanation: "This multiplies 2×3=6 correctly but incorrectly calculates the denominator as 9 (perhaps 5+4) instead of multiplying 5×4=20."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 5,
    problem_text: "What is 3/4 ÷ 1/2?",
    choices: [
      {
        letter: "A",
        text: "3/8",
        explanation: "This multiplies the fractions (3/4 × 1/2 = 3/8) instead of dividing. Division requires multiplying by the reciprocal, not direct multiplication."
      },
      {
        letter: "B",
        text: "3/2",
        explanation: "CORRECT. To divide fractions, multiply by the reciprocal: 3/4 × 2/1 = 6/4 = 3/2 (simplified). This equals 1½ or 1.5."
      },
      {
        letter: "C",
        text: "3/6",
        explanation: "This might come from keeping 3 in the numerator and multiplying denominators 4×2=8, but using 6 instead. Division of fractions doesn't work this way."
      },
      {
        letter: "D",
        text: "2/3",
        explanation: "This inverts the result incorrectly. While 3/2 is correct, flipping it to 2/3 reverses the division - this would be the answer to 1/2 ÷ 3/4."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 6,
    problem_text: "Convert 5/8 to a decimal.",
    choices: [
      {
        letter: "A",
        text: "0.58",
        explanation: "This treats the fraction as if the digits are simply separated by a decimal point (5.8 then moved). To convert, you must divide: 5 ÷ 8."
      },
      {
        letter: "B",
        text: "0.625",
        explanation: "CORRECT. Divide numerator by denominator: 5 ÷ 8 = 0.625. You can verify: 0.625 × 8 = 5."
      },
      {
        letter: "C",
        text: "0.85",
        explanation: "This reverses the division, calculating 8 ÷ 5 = 1.6 then making an error, or confuses 5/8 with a different fraction."
      },
      {
        letter: "D",
        text: "0.525",
        explanation: "This might come from a calculator error or misreading. The calculation 5 ÷ 8 definitively equals 0.625, not 0.525."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 7,
    problem_text: "Which fraction is equivalent to 0.75?",
    choices: [
      {
        letter: "A",
        text: "7/5",
        explanation: "This incorrectly uses the digits 7 and 5 from 0.75 as numerator and denominator. To convert decimals to fractions, 0.75 = 75/100, not 7/5."
      },
      {
        letter: "B",
        text: "75/10",
        explanation: "This puts 75 in the numerator but uses the wrong denominator. Since 0.75 has two decimal places, it's 75/100, not 75/10 (which equals 7.5)."
      },
      {
        letter: "C",
        text: "3/4",
        explanation: "CORRECT. 0.75 = 75/100. Simplify by dividing both by 25: 75÷25=3 and 100÷25=4, giving 3/4."
      },
      {
        letter: "D",
        text: "7/10",
        explanation: "This represents 0.7, not 0.75. The extra 0.05 makes a difference - 0.75 needs to be expressed as 75 hundredths, which simplifies to 3/4."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 8,
    problem_text: "What is 1 2/3 + 2 1/4?",
    choices: [
      {
        letter: "A",
        text: "3 3/7",
        explanation: "This adds whole numbers correctly (1+2=3) but incorrectly adds fractions by adding numerators and denominators separately (2+1=3, 3+4=7)."
      },
      {
        letter: "B",
        text: "3 11/12",
        explanation: "CORRECT. Add whole numbers: 1+2=3. Add fractions with LCD 12: 2/3=8/12, 1/4=3/12, so 8/12+3/12=11/12. Final: 3 11/12."
      },
      {
        letter: "C",
        text: "4 11/12",
        explanation: "This adds the whole numbers incorrectly as 4 (instead of 3), though the fractional part 11/12 is correct."
      },
      {
        letter: "D",
        text: "3 5/7",
        explanation: "This adds whole numbers correctly but makes errors in finding the common denominator or adding the fractions 2/3 and 1/4."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 9,
    problem_text: "Simplify: 24/36",
    choices: [
      {
        letter: "A",
        text: "2/3",
        explanation: "CORRECT. The GCF of 24 and 36 is 12. Divide both by 12: 24÷12=2 and 36÷12=3, giving 2/3 in simplest form."
      },
      {
        letter: "B",
        text: "12/18",
        explanation: "This divides both numbers by 2 (24÷2=12, 36÷2=18) but doesn't fully simplify. The GCF is 12, not 2, so you need to simplify further to 2/3."
      },
      {
        letter: "C",
        text: "4/6",
        explanation: "This divides both by 6 (24÷6=4, 36÷6=6) but doesn't fully simplify. You can further reduce 4/6 by dividing both by 2 to get 2/3."
      },
      {
        letter: "D",
        text: "6/9",
        explanation: "This divides both by 4 (24÷4=6, 36÷4=9) but doesn't fully simplify. The fraction 6/9 can be reduced by dividing both by 3 to get 2/3."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 10,
    problem_text: "Calculate: 3/5 of 20",
    choices: [
      {
        letter: "A",
        text: "6",
        explanation: "This divides 20 by 5 to get 4, then adds 2, or makes another calculation error. 'Of' means multiply: 3/5 × 20."
      },
      {
        letter: "B",
        text: "12",
        explanation: "CORRECT. 'Of' means multiply: 3/5 × 20 = 60/5 = 12. Alternatively: one-fifth of 20 is 4, so three-fifths is 3×4=12."
      },
      {
        letter: "C",
        text: "15",
        explanation: "This incorrectly multiplies 3 × 5 = 15, ignoring the 20 entirely, or confuses the operation required."
      },
      {
        letter: "D",
        text: "60",
        explanation: "This multiplies 3 × 20 = 60 and forgets to divide by 5. The full calculation is (3 × 20) ÷ 5 = 60 ÷ 5 = 12."
      }
    ],
    correct_answer: "B"
  }
];

module.exports = batch1;
