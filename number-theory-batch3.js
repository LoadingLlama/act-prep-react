// NUMBER THEORY - BATCH 3 (Questions 21-30: HARD)
// Lesson ID: 74013e77-3111-4dc6-beca-ff15948e4351

const batch3 = [
  {
    position: 21,
    problem_text: "What is the GCF of 84, 126, and 210?",
    choices: [
      {
        letter: "A",
        text: "21",
        explanation: "21 is a common factor but not the greatest. All three numbers are divisible by 42: 84 ÷ 42 = 2, 126 ÷ 42 = 3, 210 ÷ 42 = 5."
      },
      {
        letter: "B",
        text: "42",
        explanation: "CORRECT. Prime factorizations: 84 = 2² × 3 × 7, 126 = 2 × 3² × 7, 210 = 2 × 3 × 5 × 7. GCF = 2 × 3 × 7 = 42."
      },
      {
        letter: "C",
        text: "14",
        explanation: "14 is a common factor but not the greatest. The highest power of each common prime factor gives GCF = 2 × 3 × 7 = 42, not 14."
      },
      {
        letter: "D",
        text: "7",
        explanation: "7 is a common factor but far from the greatest. All three share the factors 2, 3, and 7, giving GCF = 2 × 3 × 7 = 42."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 22,
    problem_text: "How many prime numbers are less than 30?",
    choices: [
      {
        letter: "A",
        text: "9",
        explanation: "This might include 1 or miss some primes. The primes less than 30 are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. That's 10 primes (1 is not prime)."
      },
      {
        letter: "B",
        text: "10",
        explanation: "CORRECT. The prime numbers less than 30 are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. That's exactly 10 primes."
      },
      {
        letter: "C",
        text: "11",
        explanation: "This might incorrectly include 1 as prime. By modern definition, 1 is not prime. The count is 10."
      },
      {
        letter: "D",
        text: "8",
        explanation: "This misses two primes. All primes less than 30 are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 (total: 10)."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 23,
    problem_text: "What is the LCM of 18, 24, and 30?",
    choices: [
      {
        letter: "A",
        text: "120",
        explanation: "120 is not divisible by 18 (120 ÷ 18 = 6.67). The LCM must be divisible by all three numbers."
      },
      {
        letter: "B",
        text: "180",
        explanation: "180 is not the LCM. While divisible by 18 and 30, we need to check all: 18 = 2 × 3², 24 = 2³ × 3, 30 = 2 × 3 × 5. LCM = 2³ × 3² × 5 = 360."
      },
      {
        letter: "C",
        text: "360",
        explanation: "CORRECT. Prime factorizations: 18 = 2 × 3², 24 = 2³ × 3, 30 = 2 × 3 × 5. LCM = 2³ × 3² × 5 = 8 × 9 × 5 = 360."
      },
      {
        letter: "D",
        text: "720",
        explanation: "720 is a common multiple but twice the LCM. The smallest number divisible by 18, 24, and 30 is 360, not 720."
      }
    ],
    correct_answer: "C"
  },
  {
    position: 24,
    problem_text: "If n is divisible by 12, which of the following must be true?",
    choices: [
      {
        letter: "A",
        text: "n is divisible by 8",
        explanation: "Not necessarily. For example, 12 is divisible by 12 but not by 8. Since 12 = 2² × 3, n must be divisible by factors of 12, not 8 (which is 2³)."
      },
      {
        letter: "B",
        text: "n is divisible by 6",
        explanation: "CORRECT. Since 12 = 2 × 6, any number divisible by 12 must also be divisible by its factors, including 6."
      },
      {
        letter: "C",
        text: "n is divisible by 9",
        explanation: "Not necessarily. For example, 12 is divisible by 12 but not by 9 (12 ÷ 9 = 1.33). 9 is not a factor of 12."
      },
      {
        letter: "D",
        text: "n is divisible by 5",
        explanation: "Not necessarily. For example, 12 is divisible by 12 but not by 5. 5 is not a factor of 12, so this doesn't have to be true."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 25,
    problem_text: "What is the smallest positive integer that is divisible by 2, 3, 4, 5, and 6?",
    choices: [
      {
        letter: "A",
        text: "30",
        explanation: "30 is not divisible by 4 (30 ÷ 4 = 7.5). The LCM must be divisible by all given numbers, including 4."
      },
      {
        letter: "B",
        text: "60",
        explanation: "CORRECT. Find LCM of 2, 3, 4, 5, 6. Prime factorizations: 2 = 2, 3 = 3, 4 = 2², 5 = 5, 6 = 2 × 3. LCM = 2² × 3 × 5 = 60."
      },
      {
        letter: "C",
        text: "120",
        explanation: "While 120 is divisible by all these numbers, it's not the smallest. The LCM (least common multiple) is 60, not 120."
      },
      {
        letter: "D",
        text: "180",
        explanation: "180 is divisible by all these numbers but is much larger than necessary. The smallest such number is 60."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 26,
    problem_text: "How many positive divisors does 72 have?",
    choices: [
      {
        letter: "A",
        text: "10",
        explanation: "This undercounts. Using 72 = 2³ × 3², the number of divisors is (3+1)(2+1) = 4 × 3 = 12."
      },
      {
        letter: "B",
        text: "12",
        explanation: "CORRECT. 72 = 2³ × 3². Using the formula, number of divisors = (3+1)(2+1) = 12. They are: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72."
      },
      {
        letter: "C",
        text: "8",
        explanation: "This significantly undercounts. The prime factorization 2³ × 3² gives (3+1)(2+1) = 12 divisors, not 8."
      },
      {
        letter: "D",
        text: "18",
        explanation: "This overcounts. Using the divisor formula with 72 = 2³ × 3², we get (3+1)(2+1) = 12 divisors, not 18."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 27,
    problem_text: "What is the sum of the prime factors of 210?",
    choices: [
      {
        letter: "A",
        text: "10",
        explanation: "This only includes some prime factors. 210 = 2 × 3 × 5 × 7, so the sum of distinct prime factors is 2 + 3 + 5 + 7 = 17."
      },
      {
        letter: "B",
        text: "17",
        explanation: "CORRECT. Prime factorization of 210 = 2 × 3 × 5 × 7. Sum of distinct prime factors: 2 + 3 + 5 + 7 = 17."
      },
      {
        letter: "C",
        text: "20",
        explanation: "This might incorrectly include non-prime factors or make calculation errors. The prime factors are 2, 3, 5, 7 with sum = 17."
      },
      {
        letter: "D",
        text: "15",
        explanation: "This misses one prime factor. 210 = 2 × 3 × 5 × 7, so all four prime factors sum to 2 + 3 + 5 + 7 = 17."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 28,
    problem_text: "If n = 2^a × 3^b × 5^c, and n has exactly 24 divisors, which of the following could be true?",
    choices: [
      {
        letter: "A",
        text: "a = 2, b = 2, c = 1",
        explanation: "Number of divisors = (2+1)(2+1)(1+1) = 3 × 3 × 2 = 18, not 24. We need a combination that gives 24."
      },
      {
        letter: "B",
        text: "a = 3, b = 2, c = 1",
        explanation: "CORRECT. Number of divisors = (3+1)(2+1)(1+1) = 4 × 3 × 2 = 24. This satisfies the condition."
      },
      {
        letter: "C",
        text: "a = 1, b = 1, c = 2",
        explanation: "Number of divisors = (1+1)(1+1)(2+1) = 2 × 2 × 3 = 12, not 24. We need exponents that produce 24."
      },
      {
        letter: "D",
        text: "a = 2, b = 1, c = 1",
        explanation: "Number of divisors = (2+1)(1+1)(1+1) = 3 × 2 × 2 = 12, not 24. We need different exponents."
      }
    ],
    correct_answer: "B"
  },
  {
    position: 29,
    problem_text: "What is the remainder when 100 is divided by 7?",
    choices: [
      {
        letter: "A",
        text: "2",
        explanation: "CORRECT. 100 ÷ 7 = 14 remainder 2, because 100 = 7 × 14 + 2. Check: 7 × 14 = 98, and 100 - 98 = 2."
      },
      {
        letter: "B",
        text: "3",
        explanation: "This is incorrect. 7 × 14 = 98, so 100 - 98 = 2, not 3."
      },
      {
        letter: "C",
        text: "1",
        explanation: "This is incorrect. The largest multiple of 7 less than or equal to 100 is 98, so 100 - 98 = 2."
      },
      {
        letter: "D",
        text: "5",
        explanation: "This is incorrect. 100 = 7 × 14 + 2, so the remainder is 2, not 5."
      }
    ],
    correct_answer: "A"
  },
  {
    position: 30,
    problem_text: "If a and b are relatively prime (GCF = 1), and a × b = 60, which of the following CANNOT be the value of a?",
    choices: [
      {
        letter: "A",
        text: "12",
        explanation: "If a = 12, then b = 5. Since 12 = 2² × 3 and 5 = 5, they share no common prime factors, so GCF(12, 5) = 1. This could be a."
      },
      {
        letter: "B",
        text: "15",
        explanation: "If a = 15, then b = 4. Since 15 = 3 × 5 and 4 = 2², they share no common prime factors, so GCF(15, 4) = 1. This could be a."
      },
      {
        letter: "C",
        text: "10",
        explanation: "CORRECT. If a = 10, then b = 6. Since 10 = 2 × 5 and 6 = 2 × 3, they share the common factor 2, so GCF(10, 6) = 2 ≠ 1. They are NOT relatively prime, so a cannot be 10."
      },
      {
        letter: "D",
        text: "20",
        explanation: "If a = 20, then b = 3. Since 20 = 2² × 5 and 3 = 3, they share no common prime factors, so GCF(20, 3) = 1. This could be a."
      }
    ],
    correct_answer: "C"
  }
];

module.exports = batch3;
