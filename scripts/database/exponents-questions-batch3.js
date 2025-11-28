// EXPONENTS AND ROOTS - BATCH 3 (Questions 21-30: HARD)
// Lesson ID: b8c03bf0-99df-460d-be21-0015eebe7920

const batch3 = [
  {
    position: 21,
    problem_text: "Simplify: (2x⁻³y²)⁻²",
    choices: [
      {
        letter: "A",
        text: "x⁶/(4y⁴)",
        explanation: "CORRECT. Apply the power: (2x⁻³y²)⁻² = 2⁻² × (x⁻³)⁻² × (y²)⁻² = (1/4) × x⁶ × y⁻⁴ = x⁶/(4y⁴)."
      },
      {
        letter: "B",
        text: "4x⁶y⁴",
        explanation: "This incorrectly handles the negative exponents. While 2⁻² = 1/4 and (y²)⁻² = y⁻⁴ = 1/y⁴, this answer places everything in the numerator."
      },
      {
        letter: "C",
        text: "x⁶/(2y⁴)",
        explanation: "This correctly handles the variable exponents but doesn't properly square the coefficient. 2⁻² = 1/4, not 1/2."
      },
      {
        letter: "D",
        text: "4x⁶/y⁴",
        explanation: "This inverts the coefficient incorrectly. Since 2⁻² = 1/4 (not 4), the coefficient should be in the denominator: x⁶/(4y⁴)."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 22,
    problem_text: "If 2^x = 32, what is x?",
    choices: [
      {
        letter: "A",
        text: "4",
        explanation: "This might confuse powers. Since 2⁴ = 16 (not 32), this is incorrect. We need 2⁵ = 32, so x = 5."
      },
      {
        letter: "B",
        text: "5",
        explanation: "CORRECT. Since 2⁵ = 2 × 2 × 2 × 2 × 2 = 32, we have x = 5."
      },
      {
        letter: "C",
        text: "6",
        explanation: "This overestimates. Since 2⁶ = 64 (which is greater than 32), x cannot be 6. The correct answer is 2⁵ = 32, so x = 5."
      },
      {
        letter: "D",
        text: "16",
        explanation: "This incorrectly divides 32 by 2 to get 16. The question asks for the exponent, not the result of division. Since 2⁵ = 32, x = 5."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 23,
    problem_text: "Simplify: ∜(16x⁸y¹²)",
    choices: [
      {
        letter: "A",
        text: "4x²y³",
        explanation: "This incorrectly keeps 4 as the coefficient. Since ∜16 = 2 (because 2⁴ = 16), the coefficient should be 2, giving 2x²y³."
      },
      {
        letter: "B",
        text: "2x²y³",
        explanation: "CORRECT. ∜(16x⁸y¹²) = ∜16 × ∜(x⁸) × ∜(y¹²) = 2 × x² × y³ = 2x²y³ because 2⁴ = 16, (x²)⁴ = x⁸, (y³)⁴ = y¹²."
      },
      {
        letter: "C",
        text: "2x⁴y⁶",
        explanation: "This incorrectly divides the exponents by 2 instead of 4. The fourth root means dividing exponents by 4: x⁸/⁴ = x², y¹²/⁴ = y³."
      },
      {
        letter: "D",
        text: "4x⁴y⁶",
        explanation: "This makes multiple errors: keeps 4 instead of taking ∜16 = 2, and divides exponents by 2 instead of 4. The correct answer is 2x²y³."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 24,
    problem_text: "Simplify: (27x⁶)^(2/3)",
    choices: [
      {
        letter: "A",
        text: "9x⁴",
        explanation: "CORRECT. (27x⁶)^(2/3) = (∛27)² × (∛(x⁶))² = 3² × (x²)² = 9x⁴."
      },
      {
        letter: "B",
        text: "3x⁴",
        explanation: "This correctly handles the variable (x⁴) but only takes the cube root of 27 without squaring it. Since (∛27)² = 3² = 9, the coefficient should be 9."
      },
      {
        letter: "C",
        text: "9x²",
        explanation: "This correctly finds the coefficient (9) but incorrectly simplifies the variable. Since (x⁶)^(2/3) = x⁴, not x², the answer is 9x⁴."
      },
      {
        letter: "D",
        text: "18x⁴",
        explanation: "This might multiply 27 by 2/3 to get 18. The correct process is: take the cube root first (∛27 = 3), then square it (3² = 9), giving 9x⁴."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 25,
    problem_text: "Rationalize the denominator: 1/√5",
    choices: [
      {
        letter: "A",
        text: "√5/5",
        explanation: "CORRECT. Multiply by √5/√5: (1/√5) × (√5/√5) = √5/5."
      },
      {
        letter: "B",
        text: "1/√5",
        explanation: "This leaves the expression unchanged. To rationalize, multiply numerator and denominator by √5 to get √5/5."
      },
      {
        letter: "C",
        text: "√5",
        explanation: "This incorrectly removes the denominator entirely. Rationalizing 1/√5 gives √5/5 (which equals approximately 0.447), not √5 (which equals approximately 2.236)."
      },
      {
        letter: "D",
        text: "5/√5",
        explanation: "This incorrectly multiplies only the numerator by 5. When rationalizing, multiply both numerator and denominator by √5 to get √5/5."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 26,
    problem_text: "Simplify: (x^(1/2) × x^(1/3)) / x^(1/6)",
    choices: [
      {
        letter: "A",
        text: "x",
        explanation: "This makes an error in adding the fractional exponents. The numerator: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Then: 5/6 - 1/6 = 4/6 = 2/3, giving x^(2/3)."
      },
      {
        letter: "B",
        text: "x^(2/3)",
        explanation: "CORRECT. Numerator: x^(1/2) × x^(1/3) = x^(3/6 + 2/6) = x^(5/6). Then divide: x^(5/6) ÷ x^(1/6) = x^(5/6 - 1/6) = x^(4/6) = x^(2/3)."
      },
      {
        letter: "C",
        text: "x^(1/2)",
        explanation: "This makes calculation errors in combining the fractional exponents. The correct process: (1/2 + 1/3) - 1/6 = 5/6 - 1/6 = 4/6 = 2/3."
      },
      {
        letter: "D",
        text: "x^(5/6)",
        explanation: "This correctly combines the numerator (x^(5/6)) but forgets to divide by x^(1/6). Subtracting: 5/6 - 1/6 = 4/6 = 2/3."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 27,
    problem_text: "If 3^(2x) = 81, what is x?",
    choices: [
      {
        letter: "A",
        text: "4",
        explanation: "This incorrectly assumes 2x = 4 without finding what power of 3 equals 81. Since 3⁴ = 81, we have 2x = 4, so x = 2."
      },
      {
        letter: "B",
        text: "2",
        explanation: "CORRECT. Since 3⁴ = 81, we have 3^(2x) = 3⁴, so 2x = 4, which gives x = 2."
      },
      {
        letter: "C",
        text: "3",
        explanation: "This might confuse the base with the answer. Since 3^(2x) = 3⁴, we get 2x = 4, so x = 2 (not 3)."
      },
      {
        letter: "D",
        text: "40.5",
        explanation: "This incorrectly divides 81 by 2 to get 40.5. The correct approach: recognize 3⁴ = 81, set 2x = 4, solve to get x = 2."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 28,
    problem_text: "Simplify: √(50x³y⁵)",
    choices: [
      {
        letter: "A",
        text: "5xy²√(2xy)",
        explanation: "CORRECT. √(50x³y⁵) = √(25·2·x²·x·y⁴·y) = 5xy²√(2xy)."
      },
      {
        letter: "B",
        text: "25xy²√(2xy)",
        explanation: "This incorrectly keeps 25 instead of taking its square root. Since √25 = 5, the coefficient should be 5, giving 5xy²√(2xy)."
      },
      {
        letter: "C",
        text: "5x²y³√2",
        explanation: "This extracts too much from under the radical. Since x³ = x²·x, we can only extract x (leaving one x inside), giving 5xy²√(2xy), not 5x²y³√2."
      },
      {
        letter: "D",
        text: "5xy√(2xy)",
        explanation: "This correctly handles most factors but doesn't fully simplify y⁵. Since y⁵ = y⁴·y, we extract y² (from √(y⁴)), giving 5xy²√(2xy)."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 29,
    problem_text: "Simplify: (8x⁻⁶y³)^(1/3)",
    choices: [
      {
        letter: "A",
        text: "2y/(x²)",
        explanation: "CORRECT. (8x⁻⁶y³)^(1/3) = 8^(1/3) × x^(-6/3) × y^(3/3) = 2 × x⁻² × y = 2y/x²."
      },
      {
        letter: "B",
        text: "2x²y",
        explanation: "This incorrectly makes x⁻² positive as x². A negative exponent means the variable belongs in the denominator: x⁻² = 1/x², so the answer is 2y/x²."
      },
      {
        letter: "C",
        text: "8y/(x²)",
        explanation: "This doesn't take the cube root of 8. Since ∛8 = 2 (because 2³ = 8), the coefficient should be 2, giving 2y/x²."
      },
      {
        letter: "D",
        text: "2y/(x⁶)",
        explanation: "This doesn't apply the exponent 1/3 to x⁻⁶. Since (x⁻⁶)^(1/3) = x^(-6/3) = x⁻², the denominator should be x², not x⁶."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 30,
    problem_text: "If 5^(x+2) = 125, what is x?",
    choices: [
      {
        letter: "A",
        text: "3",
        explanation: "This incorrectly assumes x + 2 = 3 without verifying. Since 5³ = 125, we have x + 2 = 3, so x = 1."
      },
      {
        letter: "B",
        text: "1",
        explanation: "CORRECT. Since 5³ = 125, we have 5^(x+2) = 5³, so x + 2 = 3, which gives x = 1."
      },
      {
        letter: "C",
        text: "5",
        explanation: "This might confuse the base with the answer. Since x + 2 = 3 (from 5³ = 125), we get x = 1, not 5."
      },
      {
        letter: "D",
        text: "25",
        explanation: "This incorrectly divides 125 by 5 to get 25. The correct approach: recognize 5³ = 125, set x + 2 = 3, solve to get x = 1."
      }
    ],
    correct_answer: "B"
  }
];

module.exports = batch3;
