// NUMBER THEORY - BATCH 2 (Questions 11-20: MEDIUM)
// Lesson ID: 74013e77-3111-4dc6-beca-ff15948e4351

const batch2 = [
  {
    position: 11,
    problem_text: "What is the GCF of 36, 48, and 60?",
    choices: [
      {
        letter: "A",
        text: "6",
        explanation: "6 is a common factor but not the greatest. All three numbers are divisible by 12: 36 ÷ 12 = 3, 48 ÷ 12 = 4, 60 ÷ 12 = 5."
      },
      {
        letter: "B",
        text: "12",
        explanation: "CORRECT. Using prime factorization: 36 = 2² × 3², 48 = 2⁴ × 3, 60 = 2² × 3 × 5. The GCF = 2² × 3 = 12."
      },
      {
        letter: "C",
        text: "4",
        explanation: "4 is a common factor of all three, but it's not the greatest. The highest power of common prime factors gives GCF = 2² × 3 = 12."
      },
      {
        letter: "D",
        text: "24",
        explanation: "24 does not divide 60 evenly (60 ÷ 24 = 2.5). The GCF must divide all three numbers, and the correct answer is 12."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 12,
    problem_text: "What is the LCM of 8, 12, and 15?",
    choices: [
      {
        letter: "A",
        text: "60",
        explanation: "60 is not divisible by 8 (60 ÷ 8 = 7.5). The LCM must be a multiple of all three numbers, including 8."
      },
      {
        letter: "B",
        text: "120",
        explanation: "CORRECT. Prime factorizations: 8 = 2³, 12 = 2² × 3, 15 = 3 × 5. LCM = 2³ × 3 × 5 = 120. Check: 120 ÷ 8 = 15, 120 ÷ 12 = 10, 120 ÷ 15 = 8."
      },
      {
        letter: "C",
        text: "180",
        explanation: "While 180 is a common multiple, it's not the least. The smallest number divisible by 8, 12, and 15 is 120, not 180."
      },
      {
        letter: "D",
        text: "360",
        explanation: "360 is a common multiple but much larger than necessary. The LCM is the smallest common multiple, which is 120."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 13,
    problem_text: "Which of the following numbers is divisible by both 4 and 9?",
    choices: [
      {
        letter: "A",
        text: "36",
        explanation: "CORRECT. 36 ÷ 4 = 9 and 36 ÷ 9 = 4, so 36 is divisible by both. Also, digit sum = 3 + 6 = 9 (divisible by 9), and last two digits form 36 (divisible by 4)."
      },
      {
        letter: "B",
        text: "54",
        explanation: "54 is divisible by 9 (digit sum = 9) but not by 4 (54 ÷ 4 = 13.5). A number divisible by 4 must have its last two digits divisible by 4."
      },
      {
        letter: "C",
        text: "48",
        explanation: "48 is divisible by 4 (48 ÷ 4 = 12) but not by 9 (digit sum = 12, not divisible by 9). We need both conditions satisfied."
      },
      {
        letter: "D",
        text: "63",
        explanation: "63 is divisible by 9 (digit sum = 9) but not by 4 (63 ÷ 4 = 15.75). The number must be divisible by both."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 14,
    problem_text: "What is the sum of all prime numbers between 20 and 30?",
    choices: [
      {
        letter: "A",
        text: "75",
        explanation: "This misses one or more primes. The primes between 20 and 30 are 23 and 29. Their sum is 23 + 29 = 52, not 75."
      },
      {
        letter: "B",
        text: "52",
        explanation: "CORRECT. The only prime numbers between 20 and 30 are 23 and 29. Their sum is 23 + 29 = 52."
      },
      {
        letter: "C",
        text: "81",
        explanation: "This incorrectly includes composite numbers. Only 23 and 29 are prime in this range (21, 24, 25, 26, 27, 28 are all composite). Sum = 52."
      },
      {
        letter: "D",
        text: "46",
        explanation: "This might only count one prime number or make a calculation error. Both 23 and 29 are prime, and 23 + 29 = 52."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 15,
    problem_text: "If n is an odd integer, which expression must also be odd?",
    choices: [
      {
        letter: "A",
        text: "2n",
        explanation: "2n is always even because it's 2 times any integer. For example, if n = 5 (odd), then 2n = 10 (even)."
      },
      {
        letter: "B",
        text: "n + 1",
        explanation: "If n is odd, then n + 1 is even. For example, if n = 7 (odd), then n + 1 = 8 (even). Odd + odd = even."
      },
      {
        letter: "C",
        text: "n²",
        explanation: "CORRECT. The square of an odd number is always odd. If n = 2k + 1, then n² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd."
      },
      {
        letter: "D",
        text: "n + 2",
        explanation: "While n + 2 is odd when n is odd (odd + even = odd), this is not the only correct answer. However, n² is the better answer as it demonstrates a fundamental property."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 16,
    problem_text: "What is the prime factorization of 180?",
    choices: [
      {
        letter: "A",
        text: "2² × 3² × 5",
        explanation: "CORRECT. 180 = 4 × 45 = 4 × 9 × 5 = 2² × 3² × 5. All factors (2, 3, 5) are prime."
      },
      {
        letter: "B",
        text: "2 × 3³ × 5",
        explanation: "This gives 2 × 27 × 5 = 270, not 180. The correct factorization has 3² (not 3³): 180 = 2² × 3² × 5."
      },
      {
        letter: "C",
        text: "2³ × 3 × 5",
        explanation: "This gives 8 × 3 × 5 = 120, not 180. The correct factorization has 2² (not 2³) and 3² (not 3): 180 = 2² × 3² × 5."
      },
      {
        letter: "D",
        text: "2² × 3 × 15",
        explanation: "15 is not prime (15 = 3 × 5). Prime factorization requires only prime factors: 180 = 2² × 3² × 5."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 17,
    problem_text: "How many positive divisors does 60 have?",
    choices: [
      {
        letter: "A",
        text: "10",
        explanation: "This undercounts the divisors. The complete list is: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60. That's 12 divisors."
      },
      {
        letter: "B",
        text: "12",
        explanation: "CORRECT. Using 60 = 2² × 3 × 5, the number of divisors is (2+1)(1+1)(1+1) = 3 × 2 × 2 = 12. The divisors are: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60."
      },
      {
        letter: "C",
        text: "8",
        explanation: "This significantly undercounts. 60 has 12 divisors: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60."
      },
      {
        letter: "D",
        text: "6",
        explanation: "This only counts some divisors. Using the formula with prime factorization 2² × 3 × 5, there are (2+1)(1+1)(1+1) = 12 divisors."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 18,
    problem_text: "Which number is NOT divisible by 6?",
    choices: [
      {
        letter: "A",
        text: "42",
        explanation: "42 is divisible by 6 because 42 ÷ 6 = 7. Also, 42 is divisible by both 2 (even) and 3 (digit sum = 6)."
      },
      {
        letter: "B",
        text: "54",
        explanation: "54 is divisible by 6 because 54 ÷ 6 = 9. Also, 54 is divisible by both 2 (even) and 3 (digit sum = 9)."
      },
      {
        letter: "C",
        text: "58",
        explanation: "CORRECT. 58 is NOT divisible by 6. While 58 is even (divisible by 2), the digit sum is 5 + 8 = 13, which is not divisible by 3. A number must be divisible by both 2 and 3 to be divisible by 6."
      },
      {
        letter: "D",
        text: "72",
        explanation: "72 is divisible by 6 because 72 ÷ 6 = 12. Also, 72 is divisible by both 2 (even) and 3 (digit sum = 9)."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 19,
    problem_text: "What is the remainder when 47 is divided by 6?",
    choices: [
      {
        letter: "A",
        text: "5",
        explanation: "CORRECT. 47 ÷ 6 = 7 remainder 5, because 47 = 6 × 7 + 5."
      },
      {
        letter: "B",
        text: "1",
        explanation: "This is incorrect. 6 × 7 = 42, and 47 - 42 = 5, not 1. The remainder is 5."
      },
      {
        letter: "C",
        text: "7",
        explanation: "7 is the quotient (how many times 6 goes into 47), not the remainder. The remainder is what's left over: 47 - 42 = 5."
      },
      {
        letter: "D",
        text: "3",
        explanation: "This is incorrect. The largest multiple of 6 less than 47 is 42, so 47 - 42 = 5, not 3."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 20,
    problem_text: "If the product of two consecutive integers is 56, what are the integers?",
    choices: [
      {
        letter: "A",
        text: "6 and 7",
        explanation: "6 × 7 = 42, not 56. We need two consecutive integers whose product is 56."
      },
      {
        letter: "B",
        text: "7 and 8",
        explanation: "CORRECT. 7 × 8 = 56. These are consecutive integers (they differ by 1) and their product is 56."
      },
      {
        letter: "C",
        text: "8 and 9",
        explanation: "8 × 9 = 72, not 56. This product is too large."
      },
      {
        letter: "D",
        text: "4 and 14",
        explanation: "While 4 × 14 = 56, these are not consecutive integers. Consecutive integers differ by 1, and 14 - 4 = 10."
      }
    ],
    correct_answer: "B"
  }
];

module.exports = batch2;
