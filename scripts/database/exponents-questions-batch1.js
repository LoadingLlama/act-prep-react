// EXPONENTS AND ROOTS - BATCH 1 (Questions 1-10: EASY)
// Lesson ID: b8c03bf0-99df-460d-be21-0015eebe7920

const batch1 = [
  {
    position: 1,
    problem_text: "What is 2³?",
    choices: [
      {
        letter: "A",
        text: "6",
        explanation: "This incorrectly multiplies the base by the exponent (2 × 3 = 6). An exponent means repeated multiplication, not simple multiplication of base and exponent."
      },
      {
        letter: "B",
        text: "8",
        explanation: "CORRECT. 2³ means 2 × 2 × 2 = 8. The exponent 3 tells you to multiply 2 by itself 3 times."
      },
      {
        letter: "C",
        text: "9",
        explanation: "This confuses the calculation with 3² (which equals 9). The problem asks for 2³, not 3²."
      },
      {
        letter: "D",
        text: "5",
        explanation: "This adds the base and exponent (2 + 3 = 5) instead of using exponentiation. An exponent represents repeated multiplication, not addition."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 2,
    problem_text: "Simplify: x⁵ × x³",
    choices: [
      {
        letter: "A",
        text: "x⁸",
        explanation: "CORRECT. When multiplying powers with the same base, add the exponents: x⁵ × x³ = x⁵⁺³ = x⁸."
      },
      {
        letter: "B",
        text: "x¹⁵",
        explanation: "This incorrectly multiplies the exponents (5 × 3 = 15). When multiplying powers with the same base, you add exponents, not multiply them."
      },
      {
        letter: "C",
        text: "x²",
        explanation: "This subtracts the exponents (5 - 3 = 2), which is the rule for division, not multiplication. When multiplying, add the exponents."
      },
      {
        letter: "D",
        text: "2x⁸",
        explanation: "This incorrectly adds a coefficient of 2. When multiplying powers with the same base, only the exponents are added: x⁵ × x³ = x⁸, not 2x⁸."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 3,
    problem_text: "What is √16?",
    choices: [
      {
        letter: "A",
        text: "4",
        explanation: "CORRECT. √16 = 4 because 4 × 4 = 16. The square root asks: what number multiplied by itself gives 16?"
      },
      {
        letter: "B",
        text: "8",
        explanation: "This incorrectly divides 16 by 2 to get 8. The square root of 16 is the number that, when squared, equals 16. Since 4² = 16, √16 = 4."
      },
      {
        letter: "C",
        text: "2",
        explanation: "This confuses the calculation. While √4 = 2, the problem asks for √16. Since 4² = 16, the answer is 4, not 2."
      },
      {
        letter: "D",
        text: "256",
        explanation: "This squares 16 instead of finding its square root (16² = 256). The square root is the inverse operation: √16 = 4."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 4,
    problem_text: "Simplify: (x²)⁴",
    choices: [
      {
        letter: "A",
        text: "x⁶",
        explanation: "This incorrectly adds the exponents (2 + 4 = 6). When raising a power to a power, you multiply the exponents, not add them."
      },
      {
        letter: "B",
        text: "x⁸",
        explanation: "CORRECT. When raising a power to a power, multiply the exponents: (x²)⁴ = x²ˣ⁴ = x⁸."
      },
      {
        letter: "C",
        text: "x²",
        explanation: "This leaves the exponent unchanged, ignoring the outer exponent of 4. The power-to-power rule requires multiplying exponents: 2 × 4 = 8."
      },
      {
        letter: "D",
        text: "4x²",
        explanation: "This incorrectly creates a coefficient of 4. When raising a power to a power, multiply the exponents to get x⁸; don't add a coefficient."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 5,
    problem_text: "What is 5⁰?",
    choices: [
      {
        letter: "A",
        text: "0",
        explanation: "This confuses the zero exponent with the base itself. Any non-zero number raised to the power of 0 equals 1, not 0."
      },
      {
        letter: "B",
        text: "1",
        explanation: "CORRECT. Any non-zero number raised to the power of 0 equals 1. This is a fundamental exponent rule: 5⁰ = 1."
      },
      {
        letter: "C",
        text: "5",
        explanation: "This incorrectly assumes 5⁰ = 5, treating the exponent as if it doesn't exist. The zero exponent rule states that any non-zero base to the power of 0 equals 1."
      },
      {
        letter: "D",
        text: "Undefined",
        explanation: "While 0⁰ is indeterminate, 5⁰ is well-defined. Any non-zero number raised to the power of 0 equals 1."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 6,
    problem_text: "Simplify: x⁷ ÷ x²",
    choices: [
      {
        letter: "A",
        text: "x⁹",
        explanation: "This incorrectly adds the exponents (7 + 2 = 9), which is the rule for multiplication. When dividing, subtract the exponents."
      },
      {
        letter: "B",
        text: "x⁵",
        explanation: "CORRECT. When dividing powers with the same base, subtract the exponents: x⁷ ÷ x² = x⁷⁻² = x⁵."
      },
      {
        letter: "C",
        text: "x¹⁴",
        explanation: "This incorrectly multiplies the exponents (7 × 2 = 14). Division of powers requires subtracting exponents, not multiplying them."
      },
      {
        letter: "D",
        text: "x³·⁵",
        explanation: "This divides the exponents (7 ÷ 2 = 3.5). When dividing powers with the same base, you subtract exponents: 7 - 2 = 5, not 7 ÷ 2."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 7,
    problem_text: "What is ∛27?",
    choices: [
      {
        letter: "A",
        text: "9",
        explanation: "This incorrectly divides 27 by 3 to get 9. The cube root asks: what number cubed equals 27? Since 3³ = 27, ∛27 = 3."
      },
      {
        letter: "B",
        text: "3",
        explanation: "CORRECT. ∛27 = 3 because 3 × 3 × 3 = 27. The cube root asks: what number multiplied by itself three times gives 27?"
      },
      {
        letter: "C",
        text: "6",
        explanation: "This might come from confusing the calculation. Since 3³ = 27, the cube root of 27 is 3, not 6."
      },
      {
        letter: "D",
        text: "√27",
        explanation: "This leaves the expression unsimplified as a square root. The cube root symbol (∛) specifically means the third root, which equals 3."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 8,
    problem_text: "Simplify: 2³ × 2²",
    choices: [
      {
        letter: "A",
        text: "2⁵",
        explanation: "CORRECT. When multiplying powers with the same base, add the exponents: 2³ × 2² = 2³⁺² = 2⁵ = 32."
      },
      {
        letter: "B",
        text: "2⁶",
        explanation: "This incorrectly multiplies the exponents (3 × 2 = 6). The rule for multiplying powers is to add exponents, not multiply them."
      },
      {
        letter: "C",
        text: "4⁵",
        explanation: "This incorrectly changes the base to 4. When multiplying powers with the same base (2), keep the base as 2 and add the exponents to get 2⁵."
      },
      {
        letter: "D",
        text: "2¹",
        explanation: "This subtracts the exponents (3 - 2 = 1), which is the rule for division. When multiplying, add the exponents: 3 + 2 = 5."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 9,
    problem_text: "What is √64?",
    choices: [
      {
        letter: "A",
        text: "32",
        explanation: "This incorrectly divides 64 by 2 to get 32. The square root asks what number squared equals 64. Since 8² = 64, √64 = 8."
      },
      {
        letter: "B",
        text: "4",
        explanation: "This might confuse √16 = 4 with √64. Since 8 × 8 = 64, the square root of 64 is 8, not 4."
      },
      {
        letter: "C",
        text: "8",
        explanation: "CORRECT. √64 = 8 because 8 × 8 = 64. The square root asks: what number multiplied by itself gives 64?"
      },
      {
        letter: "D",
        text: "6",
        explanation: "This might result from estimation errors. Since 6² = 36 (not 64) and 8² = 64, the correct answer is 8."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 10,
    problem_text: "Simplify: (3²)(3³)",
    choices: [
      {
        letter: "A",
        text: "3⁵",
        explanation: "CORRECT. When multiplying powers with the same base, add the exponents: 3² × 3³ = 3²⁺³ = 3⁵ = 243."
      },
      {
        letter: "B",
        text: "3⁶",
        explanation: "This incorrectly multiplies the exponents (2 × 3 = 6). When multiplying powers with the same base, add the exponents: 2 + 3 = 5."
      },
      {
        letter: "C",
        text: "9⁵",
        explanation: "This incorrectly changes the base from 3 to 9 (possibly thinking 3² = 9). Keep the base as 3 and add exponents to get 3⁵."
      },
      {
        letter: "D",
        text: "6⁵",
        explanation: "This incorrectly adds the bases (3 + 3 = 6) instead of keeping the base constant. With the same base, add exponents: 3⁵, not 6⁵."
      }
    ],
    correct_answer: "A"
  }
];

module.exports = batch1;
