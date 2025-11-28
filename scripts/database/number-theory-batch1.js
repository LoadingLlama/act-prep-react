// NUMBER THEORY - BATCH 1 (Questions 1-10: EASY)
// Lesson ID: 74013e77-3111-4dc6-beca-ff15948e4351

const batch1 = [
  {
    position: 1,
    problem_text: "Which of the following is a prime number?",
    choices: [
      {
        letter: "A",
        text: "15",
        explanation: "15 is composite because it has factors other than 1 and itself: 15 = 3 × 5. A prime number has exactly two factors."
      },
      {
        letter: "B",
        text: "17",
        explanation: "CORRECT. 17 is prime because its only factors are 1 and 17. It cannot be divided evenly by any other whole number."
      },
      {
        letter: "C",
        text: "18",
        explanation: "18 is composite with many factors: 1, 2, 3, 6, 9, 18. Since 18 = 2 × 9 = 3 × 6, it's not prime."
      },
      {
        letter: "D",
        text: "21",
        explanation: "21 is composite because 21 = 3 × 7. A prime number cannot be expressed as a product of two smaller natural numbers."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 2,
    problem_text: "What is the greatest common factor (GCF) of 12 and 18?",
    choices: [
      {
        letter: "A",
        text: "3",
        explanation: "While 3 is a common factor of both 12 and 18, it's not the greatest. The factors of 12 are 1, 2, 3, 4, 6, 12 and of 18 are 1, 2, 3, 6, 9, 18. The GCF is 6."
      },
      {
        letter: "B",
        text: "6",
        explanation: "CORRECT. The factors of 12 are 1, 2, 3, 4, 6, 12 and of 18 are 1, 2, 3, 6, 9, 18. The greatest common factor is 6."
      },
      {
        letter: "C",
        text: "36",
        explanation: "36 is the least common multiple (LCM) of 12 and 18, not the greatest common factor. The GCF must divide both numbers, and 36 is larger than both."
      },
      {
        letter: "D",
        text: "9",
        explanation: "9 is not a factor of 12 (12 ÷ 9 = 1.33..., not a whole number). The GCF must divide both numbers evenly, and 9 only divides 18."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 3,
    problem_text: "Which number is divisible by 3?",
    choices: [
      {
        letter: "A",
        text: "125",
        explanation: "125 is not divisible by 3. The sum of digits is 1 + 2 + 5 = 8, which is not divisible by 3. A number is divisible by 3 if its digit sum is divisible by 3."
      },
      {
        letter: "B",
        text: "234",
        explanation: "CORRECT. The sum of digits is 2 + 3 + 4 = 9, which is divisible by 3. Therefore, 234 is divisible by 3 (234 ÷ 3 = 78)."
      },
      {
        letter: "C",
        text: "157",
        explanation: "157 is not divisible by 3. The sum of digits is 1 + 5 + 7 = 13, which is not divisible by 3. This means 157 is not divisible by 3."
      },
      {
        letter: "D",
        text: "341",
        explanation: "341 is not divisible by 3. The sum of digits is 3 + 4 + 1 = 8, which is not divisible by 3."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 4,
    problem_text: "What is the least common multiple (LCM) of 4 and 6?",
    choices: [
      {
        letter: "A",
        text: "2",
        explanation: "2 is the greatest common factor (GCF) of 4 and 6, not the least common multiple. The LCM must be a multiple of both numbers."
      },
      {
        letter: "B",
        text: "12",
        explanation: "CORRECT. Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... The smallest number that appears in both lists is 12."
      },
      {
        letter: "C",
        text: "24",
        explanation: "While 24 is a common multiple of 4 and 6, it's not the least common multiple. The smallest common multiple is 12."
      },
      {
        letter: "D",
        text: "10",
        explanation: "10 is not a multiple of either 4 or 6. The LCM must be divisible by both 4 and 6, and 10 ÷ 4 = 2.5 (not a whole number)."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 5,
    problem_text: "How many prime numbers are there between 10 and 20?",
    choices: [
      {
        letter: "A",
        text: "3",
        explanation: "This misses one prime. The primes between 10 and 20 are: 11, 13, 17, and 19. That's 4 primes, not 3."
      },
      {
        letter: "B",
        text: "4",
        explanation: "CORRECT. The prime numbers between 10 and 20 are: 11, 13, 17, and 19. Each has exactly two factors (1 and itself)."
      },
      {
        letter: "C",
        text: "5",
        explanation: "This overcounts. Numbers like 14, 15, 16, 18 are composite. Only 11, 13, 17, and 19 are prime (4 total)."
      },
      {
        letter: "D",
        text: "2",
        explanation: "This significantly undercounts. The primes between 10 and 20 are: 11, 13, 17, and 19. That's 4 primes."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 6,
    problem_text: "What is the prime factorization of 24?",
    choices: [
      {
        letter: "A",
        text: "2 × 12",
        explanation: "This is a factorization but not the prime factorization. 12 is not prime (12 = 2 × 6). Continue factoring until all factors are prime: 24 = 2³ × 3."
      },
      {
        letter: "B",
        text: "3 × 8",
        explanation: "This is a factorization but not the prime factorization. 8 is not prime (8 = 2³). The prime factorization requires only prime factors."
      },
      {
        letter: "C",
        text: "2³ × 3",
        explanation: "CORRECT. 24 = 2 × 2 × 2 × 3 = 2³ × 3. Both 2 and 3 are prime numbers, so this is the complete prime factorization."
      },
      {
        letter: "D",
        text: "4 × 6",
        explanation: "Neither 4 nor 6 is prime. Prime factorization requires expressing the number as a product of only prime numbers: 24 = 2³ × 3."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 7,
    problem_text: "If a number is divisible by both 2 and 3, it must also be divisible by:",
    choices: [
      {
        letter: "A",
        text: "5",
        explanation: "Numbers divisible by 2 and 3 are not necessarily divisible by 5. For example, 6 is divisible by 2 and 3 but not by 5."
      },
      {
        letter: "B",
        text: "6",
        explanation: "CORRECT. If a number is divisible by both 2 and 3, it must be divisible by their LCM, which is 6. Examples: 6, 12, 18, 24."
      },
      {
        letter: "C",
        text: "9",
        explanation: "Numbers divisible by 2 and 3 are not necessarily divisible by 9. For example, 6 is divisible by 2 and 3, but 6 ÷ 9 is not a whole number."
      },
      {
        letter: "D",
        text: "8",
        explanation: "Numbers divisible by 2 and 3 are not necessarily divisible by 8. For example, 6 is divisible by 2 and 3, but 6 ÷ 8 = 0.75."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 8,
    problem_text: "Which of the following is an even number?",
    choices: [
      {
        letter: "A",
        text: "37",
        explanation: "37 is odd because it ends in 7. Even numbers end in 0, 2, 4, 6, or 8."
      },
      {
        letter: "B",
        text: "51",
        explanation: "51 is odd because it ends in 1. Even numbers must be divisible by 2, and 51 ÷ 2 = 25.5."
      },
      {
        letter: "C",
        text: "64",
        explanation: "CORRECT. 64 is even because it ends in 4 and is divisible by 2 (64 ÷ 2 = 32)."
      },
      {
        letter: "D",
        text: "79",
        explanation: "79 is odd because it ends in 9. Even numbers are divisible by 2, and 79 ÷ 2 = 39.5."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 9,
    problem_text: "What is the smallest prime number?",
    choices: [
      {
        letter: "A",
        text: "0",
        explanation: "0 is not prime. Prime numbers must be greater than 1 and have exactly two factors: 1 and themselves."
      },
      {
        letter: "B",
        text: "1",
        explanation: "1 is not considered prime by modern definition. A prime number must have exactly two distinct factors, but 1 only has one factor (itself)."
      },
      {
        letter: "C",
        text: "2",
        explanation: "CORRECT. 2 is the smallest prime number. It's also the only even prime, as all other even numbers are divisible by 2."
      },
      {
        letter: "D",
        text: "3",
        explanation: "While 3 is prime, it's not the smallest. 2 is the smallest prime number and the only even prime."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 10,
    problem_text: "Which number leaves a remainder of 1 when divided by 3?",
    choices: [
      {
        letter: "A",
        text: "12",
        explanation: "12 ÷ 3 = 4 with remainder 0. To have remainder 1 when divided by 3, the number must be one more than a multiple of 3."
      },
      {
        letter: "B",
        text: "13",
        explanation: "CORRECT. 13 ÷ 3 = 4 remainder 1, because 13 = 3 × 4 + 1."
      },
      {
        letter: "C",
        text: "15",
        explanation: "15 ÷ 3 = 5 with remainder 0. 15 is exactly divisible by 3, so the remainder is 0, not 1."
      },
      {
        letter: "D",
        text: "17",
        explanation: "17 ÷ 3 = 5 remainder 2, because 17 = 3 × 5 + 2. The remainder is 2, not 1."
      }
    ],
    correct_answer: "B"
  }
];

module.exports = batch1;
