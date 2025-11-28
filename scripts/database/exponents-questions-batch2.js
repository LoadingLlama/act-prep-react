// EXPONENTS AND ROOTS - BATCH 2 (Questions 11-20: MEDIUM)
// Lesson ID: b8c03bf0-99df-460d-be21-0015eebe7920

const batch2 = [
  {
    position: 11,
    problem_text: "Simplify: (2x³y²)³",
    choices: [
      {
        letter: "A",
        text: "6x⁹y⁶",
        explanation: "This incorrectly multiplies the coefficient by 3 (2 × 3 = 6) instead of cubing it. When raising a product to a power, raise each factor: 2³ = 8, not 2 × 3."
      },
      {
        letter: "B",
        text: "8x⁹y⁶",
        explanation: "CORRECT. Raise each factor to the third power: (2x³y²)³ = 2³ × (x³)³ × (y²)³ = 8x⁹y⁶."
      },
      {
        letter: "C",
        text: "2x⁹y⁶",
        explanation: "This correctly handles the variables (x⁹y⁶) but leaves the coefficient as 2 instead of cubing it. 2³ = 8, so the answer should be 8x⁹y⁶."
      },
      {
        letter: "D",
        text: "8x⁶y⁵",
        explanation: "This incorrectly adds the outer exponent to the inner exponents (3+3=6, 2+3=5) instead of multiplying them. Use the power rule: multiply exponents."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 12,
    problem_text: "What is 16^(1/2)?",
    choices: [
      {
        letter: "A",
        text: "8",
        explanation: "This divides 16 by 2 to get 8. A fractional exponent 1/2 means square root, not division. Since √16 = 4, the answer is 4."
      },
      {
        letter: "B",
        text: "4",
        explanation: "CORRECT. An exponent of 1/2 means square root: 16^(1/2) = √16 = 4 because 4² = 16."
      },
      {
        letter: "C",
        text: "2",
        explanation: "This might confuse √4 = 2 with √16. Since 4 × 4 = 16, the square root of 16 is 4, not 2."
      },
      {
        letter: "D",
        text: "256",
        explanation: "This squares 16 instead of taking its square root (16² = 256). The exponent 1/2 means the inverse: the square root, which is 4."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 13,
    problem_text: "Simplify: 2⁻³",
    choices: [
      {
        letter: "A",
        text: "-8",
        explanation: "This incorrectly treats the negative exponent as making the result negative: -(2³) = -8. A negative exponent means reciprocal, not negative result."
      },
      {
        letter: "B",
        text: "1/8",
        explanation: "CORRECT. A negative exponent means reciprocal: 2⁻³ = 1/(2³) = 1/8."
      },
      {
        letter: "C",
        text: "-6",
        explanation: "This incorrectly multiplies the base by the exponent and makes it negative (2 × -3 = -6). Negative exponents mean reciprocal: 2⁻³ = 1/8."
      },
      {
        letter: "D",
        text: "1/6",
        explanation: "This might confuse the calculation. 2⁻³ = 1/(2³) = 1/8, not 1/6. The denominator should be 2³ = 8."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 14,
    problem_text: "Simplify: √(49x⁸)",
    choices: [
      {
        letter: "A",
        text: "7x⁴",
        explanation: "CORRECT. √(49x⁸) = √49 × √(x⁸) = 7x⁴ because √49 = 7 and √(x⁸) = x⁴."
      },
      {
        letter: "B",
        text: "7x²",
        explanation: "This correctly finds √49 = 7 but incorrectly calculates √(x⁸). Since (x⁴)² = x⁸, we have √(x⁸) = x⁴, not x²."
      },
      {
        letter: "C",
        text: "49x⁴",
        explanation: "This correctly handles the variable part (x⁴) but doesn't take the square root of 49. Since √49 = 7, the coefficient should be 7, not 49."
      },
      {
        letter: "D",
        text: "7x⁸",
        explanation: "This takes the square root of 49 correctly but leaves x⁸ unchanged. The square root applies to the entire expression: √(x⁸) = x⁴."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 15,
    problem_text: "What is 27^(1/3)?",
    choices: [
      {
        letter: "A",
        text: "9",
        explanation: "This divides 27 by 3 to get 9. An exponent of 1/3 means cube root, not division. Since ∛27 = 3, the answer is 3."
      },
      {
        letter: "B",
        text: "3",
        explanation: "CORRECT. An exponent of 1/3 means cube root: 27^(1/3) = ∛27 = 3 because 3³ = 27."
      },
      {
        letter: "C",
        text: "81",
        explanation: "This cubes 3 to get 27, then incorrectly processes it further. Since 27^(1/3) asks for the cube root of 27, which is 3, not 81."
      },
      {
        letter: "D",
        text: "1/27",
        explanation: "This treats the fractional exponent as a negative exponent. A positive fractional exponent 1/3 means cube root (3), not reciprocal."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 16,
    problem_text: "Simplify: (x⁴y³)/(x²y)",
    choices: [
      {
        letter: "A",
        text: "x²y²",
        explanation: "CORRECT. Divide powers with the same base by subtracting exponents: x⁴⁻² = x² and y³⁻¹ = y², giving x²y²."
      },
      {
        letter: "B",
        text: "x²y³",
        explanation: "This correctly handles x (4-2=2) but doesn't subtract the y exponents. Since y³/y = y³⁻¹ = y², the answer should be x²y²."
      },
      {
        letter: "C",
        text: "x⁶y⁴",
        explanation: "This incorrectly adds the exponents (4+2=6, 3+1=4), which is the rule for multiplication. When dividing, subtract exponents."
      },
      {
        letter: "D",
        text: "x²y",
        explanation: "This correctly finds x² but leaves y unchanged. The division applies to all terms: y³/y = y², not y."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 17,
    problem_text: "Simplify: ∛(-8)",
    choices: [
      {
        letter: "A",
        text: "Undefined",
        explanation: "While square roots of negative numbers are not real, cube roots of negative numbers ARE real. Since (-2)³ = -8, ∛(-8) = -2."
      },
      {
        letter: "B",
        text: "-2",
        explanation: "CORRECT. ∛(-8) = -2 because (-2) × (-2) × (-2) = -8. Cube roots of negative numbers are negative."
      },
      {
        letter: "C",
        text: "2",
        explanation: "This gives the positive value. Since we need a number that cubes to -8 (negative), the answer must be negative: -2, not 2."
      },
      {
        letter: "D",
        text: "-4",
        explanation: "This might confuse the calculation. Since (-2)³ = -8, the cube root of -8 is -2, not -4."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 18,
    problem_text: "Simplify: (5²)(5⁻²)",
    choices: [
      {
        letter: "A",
        text: "0",
        explanation: "This incorrectly thinks the positive and negative exponents cancel to zero. When multiplying powers with the same base, add exponents: 2 + (-2) = 0, so 5⁰ = 1."
      },
      {
        letter: "B",
        text: "1",
        explanation: "CORRECT. Add the exponents: 5² × 5⁻² = 5²⁺⁽⁻²⁾ = 5⁰ = 1. Any non-zero number to the power of 0 equals 1."
      },
      {
        letter: "C",
        text: "5⁴",
        explanation: "This incorrectly multiplies the exponents or adds them as 2+2=4, ignoring the negative sign. The correct calculation is 2 + (-2) = 0, giving 5⁰ = 1."
      },
      {
        letter: "D",
        text: "25",
        explanation: "This calculates only 5² = 25 and ignores the 5⁻² term. When multiplying, add exponents: 2 + (-2) = 0, so the answer is 5⁰ = 1."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 19,
    problem_text: "What is 8^(2/3)?",
    choices: [
      {
        letter: "A",
        text: "4",
        explanation: "CORRECT. 8^(2/3) = (∛8)² = 2² = 4. The denominator indicates cube root (∛8 = 2), then square the result."
      },
      {
        letter: "B",
        text: "2",
        explanation: "This correctly finds ∛8 = 2 but forgets to square it. The exponent 2/3 means cube root THEN square: (∛8)² = 2² = 4."
      },
      {
        letter: "C",
        text: "16/3",
        explanation: "This might divide 8 by 3 then multiply by 2, or make similar arithmetic errors. The correct process is: take the cube root (2), then square it (4)."
      },
      {
        letter: "D",
        text: "64",
        explanation: "This incorrectly cubes 8 first (8³ = 512) or squares it (8² = 64). The fractional exponent means: cube root first (∛8 = 2), then square (2² = 4)."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 20,
    problem_text: "Simplify: √(9a²b⁴)",
    choices: [
      {
        letter: "A",
        text: "3ab²",
        explanation: "CORRECT. √(9a²b⁴) = √9 × √(a²) × √(b⁴) = 3 × a × b² = 3ab²."
      },
      {
        letter: "B",
        text: "9ab²",
        explanation: "This doesn't take the square root of 9. Since √9 = 3, the coefficient should be 3, not 9."
      },
      {
        letter: "C",
        text: "3a²b²",
        explanation: "This correctly finds √9 = 3 and √(b⁴) = b², but doesn't simplify √(a²). Since √(a²) = a (for a ≥ 0), the answer is 3ab²."
      },
      {
        letter: "D",
        text: "3ab⁴",
        explanation: "This correctly handles 3a but doesn't take the square root of b⁴. Since √(b⁴) = b², the answer should be 3ab², not 3ab⁴."
      }
    ],
    correct_answer: "A"
  }
];

module.exports = batch2;
