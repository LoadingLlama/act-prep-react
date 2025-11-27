const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const FRACTIONS_LESSON_ID = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';

const questions = [
  // EASY QUESTIONS (1-17)
  {
    position: 1,
    difficulty: 'easy',
    problem_text: 'What is 1/4 + 1/4?',
    choices: [
      { letter: 'A', text: '1/8' },
      { letter: 'B', text: '1/2' },
      { letter: 'C', text: '2/4' },
      { letter: 'D', text: '1/16' }
    ],
    correct_answer: 'B',
    solution: `**Add fractions with the same denominator by adding the numerators.**
\`\`\`
1/4 + 1/4 = (1 + 1)/4 = 2/4
\`\`\`

**Simplify the fraction.**
\`\`\`
2/4 = 1/2
\`\`\``
  },
  {
    position: 2,
    difficulty: 'easy',
    problem_text: 'What is 3/5 - 1/5?',
    choices: [
      { letter: 'A', text: '2/5' },
      { letter: 'B', text: '2/0' },
      { letter: 'C', text: '4/5' },
      { letter: 'D', text: '3/10' }
    ],
    correct_answer: 'A',
    solution: `**Subtract fractions with the same denominator by subtracting the numerators.**
\`\`\`
3/5 - 1/5 = (3 - 1)/5 = 2/5
\`\`\``
  },
  {
    position: 3,
    difficulty: 'easy',
    problem_text: 'What is 2/3 × 3/4?',
    choices: [
      { letter: 'A', text: '6/12' },
      { letter: 'B', text: '1/2' },
      { letter: 'C', text: '5/7' },
      { letter: 'D', text: '2/4' }
    ],
    correct_answer: 'B',
    solution: `**Multiply the numerators and multiply the denominators.**
\`\`\`
2/3 × 3/4 = (2 × 3)/(3 × 4) = 6/12
\`\`\`

**Simplify the fraction.**
\`\`\`
6/12 = 1/2
\`\`\``
  },
  {
    position: 4,
    difficulty: 'easy',
    problem_text: 'What is 1/2 ÷ 1/4?',
    choices: [
      { letter: 'A', text: '1/8' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '1/6' }
    ],
    correct_answer: 'C',
    solution: `**To divide fractions, multiply by the reciprocal.**
\`\`\`
1/2 ÷ 1/4 = 1/2 × 4/1
\`\`\`

**Multiply the fractions.**
\`\`\`
= (1 × 4)/(2 × 1) = 4/2 = 2
\`\`\``
  },
  {
    position: 5,
    difficulty: 'easy',
    problem_text: 'Which fraction is equivalent to 2/6?',
    choices: [
      { letter: 'A', text: '1/3' },
      { letter: 'B', text: '2/3' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '3/9' }
    ],
    correct_answer: 'A',
    solution: `**Simplify by dividing both numerator and denominator by their GCF.**
\`\`\`
GCF of 2 and 6 is 2
2/6 = (2 ÷ 2)/(6 ÷ 2) = 1/3
\`\`\``
  },
  {
    position: 6,
    difficulty: 'easy',
    problem_text: 'What is 5/8 + 1/8?',
    choices: [
      { letter: 'A', text: '6/16' },
      { letter: 'B', text: '6/8' },
      { letter: 'C', text: '5/16' },
      { letter: 'D', text: '4/8' }
    ],
    correct_answer: 'B',
    solution: `**Add fractions with the same denominator.**
\`\`\`
5/8 + 1/8 = (5 + 1)/8 = 6/8
\`\`\``
  },
  {
    position: 7,
    difficulty: 'easy',
    problem_text: 'What is 7/9 - 2/9?',
    choices: [
      { letter: 'A', text: '5/9' },
      { letter: 'B', text: '5/0' },
      { letter: 'C', text: '9/9' },
      { letter: 'D', text: '5/18' }
    ],
    correct_answer: 'A',
    solution: `**Subtract fractions with the same denominator.**
\`\`\`
7/9 - 2/9 = (7 - 2)/9 = 5/9
\`\`\``
  },
  {
    position: 8,
    difficulty: 'easy',
    problem_text: 'What is 1/3 × 6?',
    choices: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '6/3' },
      { letter: 'C', text: '18' },
      { letter: 'D', text: '1/18' }
    ],
    correct_answer: 'A',
    solution: `**Rewrite 6 as a fraction and multiply.**
\`\`\`
1/3 × 6 = 1/3 × 6/1 = 6/3
\`\`\`

**Simplify.**
\`\`\`
6/3 = 2
\`\`\``
  },
  {
    position: 9,
    difficulty: 'easy',
    problem_text: 'Which fraction is equivalent to 4/8?',
    choices: [
      { letter: 'A', text: '1/4' },
      { letter: 'B', text: '1/2' },
      { letter: 'C', text: '2/3' },
      { letter: 'D', text: '4/16' }
    ],
    correct_answer: 'B',
    solution: `**Simplify by dividing both terms by their GCF.**
\`\`\`
GCF of 4 and 8 is 4
4/8 = (4 ÷ 4)/(8 ÷ 4) = 1/2
\`\`\``
  },
  {
    position: 10,
    difficulty: 'easy',
    problem_text: 'What is 2/5 × 5/6?',
    choices: [
      { letter: 'A', text: '10/30' },
      { letter: 'B', text: '1/3' },
      { letter: 'C', text: '7/11' },
      { letter: 'D', text: '2/6' }
    ],
    correct_answer: 'B',
    solution: `**Multiply numerators and denominators.**
\`\`\`
2/5 × 5/6 = (2 × 5)/(5 × 6) = 10/30
\`\`\`

**Simplify.**
\`\`\`
10/30 = 1/3
\`\`\``
  },
  {
    position: 11,
    difficulty: 'easy',
    problem_text: 'What is 3/4 ÷ 1/2?',
    choices: [
      { letter: 'A', text: '3/8' },
      { letter: 'B', text: '3/2' },
      { letter: 'C', text: '2/3' },
      { letter: 'D', text: '6' }
    ],
    correct_answer: 'B',
    solution: `**Multiply by the reciprocal.**
\`\`\`
3/4 ÷ 1/2 = 3/4 × 2/1
\`\`\`

**Multiply.**
\`\`\`
= (3 × 2)/(4 × 1) = 6/4 = 3/2
\`\`\``
  },
  {
    position: 12,
    difficulty: 'easy',
    problem_text: 'What is 2/3 + 1/3?',
    choices: [
      { letter: 'A', text: '3/3' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '3/6' },
      { letter: 'D', text: '2/6' }
    ],
    correct_answer: 'B',
    solution: `**Add fractions with the same denominator.**
\`\`\`
2/3 + 1/3 = (2 + 1)/3 = 3/3
\`\`\`

**Simplify.**
\`\`\`
3/3 = 1
\`\`\``
  },
  {
    position: 13,
    difficulty: 'easy',
    problem_text: 'Which fraction is equivalent to 6/9?',
    choices: [
      { letter: 'A', text: '1/3' },
      { letter: 'B', text: '3/3' },
      { letter: 'C', text: '2/3' },
      { letter: 'D', text: '6/3' }
    ],
    correct_answer: 'C',
    solution: `**Simplify by dividing by the GCF.**
\`\`\`
GCF of 6 and 9 is 3
6/9 = (6 ÷ 3)/(9 ÷ 3) = 2/3
\`\`\``
  },
  {
    position: 14,
    difficulty: 'easy',
    problem_text: 'What is 1/5 × 10?',
    choices: [
      { letter: 'A', text: '10/5' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '50' },
      { letter: 'D', text: '1/50' }
    ],
    correct_answer: 'B',
    solution: `**Multiply the fraction by the whole number.**
\`\`\`
1/5 × 10 = 1/5 × 10/1 = 10/5
\`\`\`

**Simplify.**
\`\`\`
10/5 = 2
\`\`\``
  },
  {
    position: 15,
    difficulty: 'easy',
    problem_text: 'What is 5/6 - 2/6?',
    choices: [
      { letter: 'A', text: '3/6' },
      { letter: 'B', text: '1/2' },
      { letter: 'C', text: '3/0' },
      { letter: 'D', text: '7/6' }
    ],
    correct_answer: 'B',
    solution: `**Subtract fractions with the same denominator.**
\`\`\`
5/6 - 2/6 = (5 - 2)/6 = 3/6
\`\`\`

**Simplify.**
\`\`\`
3/6 = 1/2
\`\`\``
  },
  {
    position: 16,
    difficulty: 'easy',
    problem_text: 'What is 1/2 × 2/3?',
    choices: [
      { letter: 'A', text: '2/6' },
      { letter: 'B', text: '1/3' },
      { letter: 'C', text: '3/4' },
      { letter: 'D', text: '2/5' }
    ],
    correct_answer: 'B',
    solution: `**Multiply numerators and denominators.**
\`\`\`
1/2 × 2/3 = (1 × 2)/(2 × 3) = 2/6
\`\`\`

**Simplify.**
\`\`\`
2/6 = 1/3
\`\`\``
  },
  {
    position: 17,
    difficulty: 'easy',
    problem_text: 'What is 4/5 ÷ 2?',
    choices: [
      { letter: 'A', text: '8/5' },
      { letter: 'B', text: '2/5' },
      { letter: 'C', text: '4/10' },
      { letter: 'D', text: '4/7' }
    ],
    correct_answer: 'B',
    solution: `**Rewrite as division by a fraction.**
\`\`\`
4/5 ÷ 2 = 4/5 ÷ 2/1 = 4/5 × 1/2
\`\`\`

**Multiply.**
\`\`\`
= (4 × 1)/(5 × 2) = 4/10 = 2/5
\`\`\``
  },

  // MEDIUM QUESTIONS (18-34)
  {
    position: 18,
    difficulty: 'medium',
    problem_text: 'What is 1/2 + 1/3?',
    choices: [
      { letter: 'A', text: '2/5' },
      { letter: 'B', text: '5/6' },
      { letter: 'C', text: '3/5' },
      { letter: 'D', text: '1/6' }
    ],
    correct_answer: 'B',
    solution: `**Find the least common denominator (LCD).**
\`\`\`
LCD of 2 and 3 is 6
\`\`\`

**Convert to equivalent fractions.**
\`\`\`
1/2 = 3/6
1/3 = 2/6
\`\`\`

**Add the fractions.**
\`\`\`
3/6 + 2/6 = 5/6
\`\`\``
  },
  {
    position: 19,
    difficulty: 'medium',
    problem_text: 'What is 3/4 - 1/6?',
    choices: [
      { letter: 'A', text: '2/2' },
      { letter: 'B', text: '7/12' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '5/12' }
    ],
    correct_answer: 'B',
    solution: `**Find the LCD.**
\`\`\`
LCD of 4 and 6 is 12
\`\`\`

**Convert to equivalent fractions.**
\`\`\`
3/4 = 9/12
1/6 = 2/12
\`\`\`

**Subtract.**
\`\`\`
9/12 - 2/12 = 7/12
\`\`\``
  },
  {
    position: 20,
    difficulty: 'medium',
    problem_text: 'What is 2 1/2 + 1 1/4?',
    choices: [
      { letter: 'A', text: '3 3/4' },
      { letter: 'B', text: '3 1/2' },
      { letter: 'C', text: '4 1/4' },
      { letter: 'D', text: '3 2/6' }
    ],
    correct_answer: 'A',
    solution: `**Add the whole numbers.**
\`\`\`
2 + 1 = 3
\`\`\`

**Add the fractions (LCD of 2 and 4 is 4).**
\`\`\`
1/2 + 1/4 = 2/4 + 1/4 = 3/4
\`\`\`

**Combine.**
\`\`\`
3 + 3/4 = 3 3/4
\`\`\``
  },
  {
    position: 21,
    difficulty: 'medium',
    problem_text: 'What is 5/6 × 2/5?',
    choices: [
      { letter: 'A', text: '10/30' },
      { letter: 'B', text: '1/3' },
      { letter: 'C', text: '7/11' },
      { letter: 'D', text: '2/6' }
    ],
    correct_answer: 'B',
    solution: `**Multiply the fractions.**
\`\`\`
5/6 × 2/5 = (5 × 2)/(6 × 5) = 10/30
\`\`\`

**Simplify.**
\`\`\`
10/30 = 1/3
\`\`\``
  },
  {
    position: 22,
    difficulty: 'medium',
    problem_text: 'What is 3/8 ÷ 3/4?',
    choices: [
      { letter: 'A', text: '9/32' },
      { letter: 'B', text: '1/2' },
      { letter: 'C', text: '3/2' },
      { letter: 'D', text: '12/24' }
    ],
    correct_answer: 'B',
    solution: `**Multiply by the reciprocal.**
\`\`\`
3/8 ÷ 3/4 = 3/8 × 4/3
\`\`\`

**Multiply and simplify.**
\`\`\`
= (3 × 4)/(8 × 3) = 12/24 = 1/2
\`\`\``
  },
  {
    position: 23,
    difficulty: 'medium',
    problem_text: 'What is 2/3 + 3/5?',
    choices: [
      { letter: 'A', text: '5/8' },
      { letter: 'B', text: '19/15' },
      { letter: 'C', text: '1 4/15' },
      { letter: 'D', text: '5/15' }
    ],
    correct_answer: 'C',
    solution: `**Find the LCD.**
\`\`\`
LCD of 3 and 5 is 15
\`\`\`

**Convert to equivalent fractions.**
\`\`\`
2/3 = 10/15
3/5 = 9/15
\`\`\`

**Add.**
\`\`\`
10/15 + 9/15 = 19/15 = 1 4/15
\`\`\``
  },
  {
    position: 24,
    difficulty: 'medium',
    problem_text: 'What is 5/8 - 1/4?',
    choices: [
      { letter: 'A', text: '4/4' },
      { letter: 'B', text: '3/8' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '4/8' }
    ],
    correct_answer: 'B',
    solution: `**Find the LCD.**
\`\`\`
LCD of 8 and 4 is 8
\`\`\`

**Convert 1/4.**
\`\`\`
1/4 = 2/8
\`\`\`

**Subtract.**
\`\`\`
5/8 - 2/8 = 3/8
\`\`\``
  },
  {
    position: 25,
    difficulty: 'medium',
    problem_text: 'What is 3 2/3 - 1 1/2?',
    choices: [
      { letter: 'A', text: '2 1/6' },
      { letter: 'B', text: '2 1/3' },
      { letter: 'C', text: '2 5/6' },
      { letter: 'D', text: '1 5/6' }
    ],
    correct_answer: 'A',
    solution: `**Subtract the whole numbers.**
\`\`\`
3 - 1 = 2
\`\`\`

**Subtract the fractions (LCD of 3 and 2 is 6).**
\`\`\`
2/3 - 1/2 = 4/6 - 3/6 = 1/6
\`\`\`

**Combine.**
\`\`\`
2 + 1/6 = 2 1/6
\`\`\``
  },
  {
    position: 26,
    difficulty: 'medium',
    problem_text: 'What is 2 1/3 × 3?',
    choices: [
      { letter: 'A', text: '6 1/3' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '6 3/3' },
      { letter: 'D', text: '8' }
    ],
    correct_answer: 'B',
    solution: `**Convert mixed number to improper fraction.**
\`\`\`
2 1/3 = 7/3
\`\`\`

**Multiply.**
\`\`\`
7/3 × 3 = 7/3 × 3/1 = 21/3 = 7
\`\`\``
  },
  {
    position: 27,
    difficulty: 'medium',
    problem_text: 'What is 4/9 + 2/9 + 1/3?',
    choices: [
      { letter: 'A', text: '7/9' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '6/9' },
      { letter: 'D', text: '7/27' }
    ],
    correct_answer: 'B',
    solution: `**Convert 1/3 to ninths.**
\`\`\`
1/3 = 3/9
\`\`\`

**Add all fractions.**
\`\`\`
4/9 + 2/9 + 3/9 = 9/9 = 1
\`\`\``
  },
  {
    position: 28,
    difficulty: 'medium',
    problem_text: 'What is 1/2 + 1/4 + 1/8?',
    choices: [
      { letter: 'A', text: '3/14' },
      { letter: 'B', text: '7/8' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '3/8' }
    ],
    correct_answer: 'B',
    solution: `**Find the LCD.**
\`\`\`
LCD of 2, 4, and 8 is 8
\`\`\`

**Convert to equivalent fractions.**
\`\`\`
1/2 = 4/8
1/4 = 2/8
1/8 = 1/8
\`\`\`

**Add.**
\`\`\`
4/8 + 2/8 + 1/8 = 7/8
\`\`\``
  },
  {
    position: 29,
    difficulty: 'medium',
    problem_text: 'What is 5 1/2 ÷ 2?',
    choices: [
      { letter: 'A', text: '2 3/4' },
      { letter: 'B', text: '3 1/4' },
      { letter: 'C', text: '2 1/2' },
      { letter: 'D', text: '11/4' }
    ],
    correct_answer: 'A',
    solution: `**Convert to improper fraction.**
\`\`\`
5 1/2 = 11/2
\`\`\`

**Divide by 2.**
\`\`\`
11/2 ÷ 2 = 11/2 × 1/2 = 11/4
\`\`\`

**Convert to mixed number.**
\`\`\`
11/4 = 2 3/4
\`\`\``
  },
  {
    position: 30,
    difficulty: 'medium',
    problem_text: 'What is 7/12 + 5/12?',
    choices: [
      { letter: 'A', text: '12/12' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '12/24' },
      { letter: 'D', text: '2/3' }
    ],
    correct_answer: 'B',
    solution: `**Add fractions with the same denominator.**
\`\`\`
7/12 + 5/12 = 12/12
\`\`\`

**Simplify.**
\`\`\`
12/12 = 1
\`\`\``
  },
  {
    position: 31,
    difficulty: 'medium',
    problem_text: 'What is 2/3 × 9/10?',
    choices: [
      { letter: 'A', text: '18/30' },
      { letter: 'B', text: '3/5' },
      { letter: 'C', text: '6/10' },
      { letter: 'D', text: '11/13' }
    ],
    correct_answer: 'B',
    solution: `**Multiply.**
\`\`\`
2/3 × 9/10 = (2 × 9)/(3 × 10) = 18/30
\`\`\`

**Simplify.**
\`\`\`
18/30 = 3/5
\`\`\``
  },
  {
    position: 32,
    difficulty: 'medium',
    problem_text: 'What is 5/6 ÷ 5/12?',
    choices: [
      { letter: 'A', text: '25/72' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '5/18' }
    ],
    correct_answer: 'B',
    solution: `**Multiply by the reciprocal.**
\`\`\`
5/6 ÷ 5/12 = 5/6 × 12/5
\`\`\`

**Multiply and simplify.**
\`\`\`
= (5 × 12)/(6 × 5) = 60/30 = 2
\`\`\``
  },
  {
    position: 33,
    difficulty: 'medium',
    problem_text: 'What is 4 1/5 + 2 3/5?',
    choices: [
      { letter: 'A', text: '6 4/5' },
      { letter: 'B', text: '6 4/10' },
      { letter: 'C', text: '7 4/5' },
      { letter: 'D', text: '6 1/5' }
    ],
    correct_answer: 'A',
    solution: `**Add the whole numbers.**
\`\`\`
4 + 2 = 6
\`\`\`

**Add the fractions.**
\`\`\`
1/5 + 3/5 = 4/5
\`\`\`

**Combine.**
\`\`\`
6 + 4/5 = 6 4/5
\`\`\``
  },
  {
    position: 34,
    difficulty: 'medium',
    problem_text: 'What is 3/7 + 2/7 - 1/7?',
    choices: [
      { letter: 'A', text: '4/7' },
      { letter: 'B', text: '6/7' },
      { letter: 'C', text: '5/7' },
      { letter: 'D', text: '0/7' }
    ],
    correct_answer: 'A',
    solution: `**Perform operations from left to right.**
\`\`\`
3/7 + 2/7 = 5/7
5/7 - 1/7 = 4/7
\`\`\``
  },

  // HARD QUESTIONS (35-50)
  {
    position: 35,
    difficulty: 'hard',
    problem_text: 'What is 2/3 + 3/4 + 5/6?',
    choices: [
      { letter: 'A', text: '10/13' },
      { letter: 'B', text: '2 1/4' },
      { letter: 'C', text: '27/12' },
      { letter: 'D', text: '2 3/12' }
    ],
    correct_answer: 'B',
    solution: `**Find the LCD.**
\`\`\`
LCD of 3, 4, and 6 is 12
\`\`\`

**Convert to equivalent fractions.**
\`\`\`
2/3 = 8/12
3/4 = 9/12
5/6 = 10/12
\`\`\`

**Add.**
\`\`\`
8/12 + 9/12 + 10/12 = 27/12 = 2 3/12 = 2 1/4
\`\`\``
  },
  {
    position: 36,
    difficulty: 'hard',
    problem_text: 'What is 7/8 - 1/3 + 1/6?',
    choices: [
      { letter: 'A', text: '17/24' },
      { letter: 'B', text: '7/17' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '19/24' }
    ],
    correct_answer: 'A',
    solution: `**Find the LCD.**
\`\`\`
LCD of 8, 3, and 6 is 24
\`\`\`

**Convert all fractions.**
\`\`\`
7/8 = 21/24
1/3 = 8/24
1/6 = 4/24
\`\`\`

**Calculate.**
\`\`\`
21/24 - 8/24 + 4/24 = 17/24
\`\`\``
  },
  {
    position: 37,
    difficulty: 'hard',
    problem_text: 'What is 3 2/5 × 2 1/2?',
    choices: [
      { letter: 'A', text: '8 1/2' },
      { letter: 'B', text: '6 2/10' },
      { letter: 'C', text: '17/2' },
      { letter: 'D', text: '6 1/5' }
    ],
    correct_answer: 'A',
    solution: `**Convert to improper fractions.**
\`\`\`
3 2/5 = 17/5
2 1/2 = 5/2
\`\`\`

**Multiply.**
\`\`\`
17/5 × 5/2 = (17 × 5)/(5 × 2) = 85/10 = 17/2
\`\`\`

**Convert to mixed number.**
\`\`\`
17/2 = 8 1/2
\`\`\``
  },
  {
    position: 38,
    difficulty: 'hard',
    problem_text: 'What is 4 2/3 ÷ 1 1/6?',
    choices: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '14/3' },
      { letter: 'D', text: '5 1/3' }
    ],
    correct_answer: 'A',
    solution: `**Convert to improper fractions.**
\`\`\`
4 2/3 = 14/3
1 1/6 = 7/6
\`\`\`

**Divide by multiplying by reciprocal.**
\`\`\`
14/3 ÷ 7/6 = 14/3 × 6/7
\`\`\`

**Multiply and simplify.**
\`\`\`
= (14 × 6)/(3 × 7) = 84/21 = 4
\`\`\``
  },
  {
    position: 39,
    difficulty: 'hard',
    problem_text: 'Solve for x: x/4 + 1/2 = 3/4',
    choices: [
      { letter: 'A', text: 'x = 1' },
      { letter: 'B', text: 'x = 2' },
      { letter: 'C', text: 'x = 1/2' },
      { letter: 'D', text: 'x = 3' }
    ],
    correct_answer: 'A',
    solution: `**Subtract 1/2 from both sides.**
\`\`\`
x/4 = 3/4 - 1/2
x/4 = 3/4 - 2/4 = 1/4
\`\`\`

**Multiply both sides by 4.**
\`\`\`
x = 1
\`\`\``
  },
  {
    position: 40,
    difficulty: 'hard',
    problem_text: 'What is (2/3 + 1/4) × 6?',
    choices: [
      { letter: 'A', text: '11/2' },
      { letter: 'B', text: '5 1/2' },
      { letter: 'C', text: '6 1/2' },
      { letter: 'D', text: '11' }
    ],
    correct_answer: 'B',
    solution: `**Add the fractions first (LCD = 12).**
\`\`\`
2/3 + 1/4 = 8/12 + 3/12 = 11/12
\`\`\`

**Multiply by 6.**
\`\`\`
11/12 × 6 = 11/12 × 6/1 = 66/12 = 11/2
\`\`\`

**Convert to mixed number.**
\`\`\`
11/2 = 5 1/2
\`\`\``
  },
  {
    position: 41,
    difficulty: 'hard',
    problem_text: 'What is 5/6 ÷ 2/3 × 3/5?',
    choices: [
      { letter: 'A', text: '3/4' },
      { letter: 'B', text: '5/4' },
      { letter: 'C', text: '1' },
      { letter: 'D', text: '15/12' }
    ],
    correct_answer: 'A',
    solution: `**Perform operations from left to right.**
\`\`\`
5/6 ÷ 2/3 = 5/6 × 3/2 = 15/12 = 5/4
\`\`\`

**Continue multiplication.**
\`\`\`
5/4 × 3/5 = 15/20 = 3/4
\`\`\``
  },
  {
    position: 42,
    difficulty: 'hard',
    problem_text: 'Solve for x: 2x/5 = 4/10',
    choices: [
      { letter: 'A', text: 'x = 1' },
      { letter: 'B', text: 'x = 2' },
      { letter: 'C', text: 'x = 1/2' },
      { letter: 'D', text: 'x = 4' }
    ],
    correct_answer: 'A',
    solution: `**Simplify the right side.**
\`\`\`
4/10 = 2/5
\`\`\`

**Set up equation.**
\`\`\`
2x/5 = 2/5
\`\`\`

**Multiply both sides by 5.**
\`\`\`
2x = 2
x = 1
\`\`\``
  },
  {
    position: 43,
    difficulty: 'hard',
    problem_text: 'What is 6 2/3 - 2 5/6?',
    choices: [
      { letter: 'A', text: '3 5/6' },
      { letter: 'B', text: '4 5/6' },
      { letter: 'C', text: '3 1/2' },
      { letter: 'D', text: '4 1/6' }
    ],
    correct_answer: 'A',
    solution: `**Convert to improper fractions.**
\`\`\`
6 2/3 = 20/3
2 5/6 = 17/6
\`\`\`

**Find LCD (6) and convert.**
\`\`\`
20/3 = 40/6
\`\`\`

**Subtract.**
\`\`\`
40/6 - 17/6 = 23/6 = 3 5/6
\`\`\``
  },
  {
    position: 44,
    difficulty: 'hard',
    problem_text: 'What is (3/4 - 1/3) ÷ 5/12?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '5/6' },
      { letter: 'D', text: '1/2' }
    ],
    correct_answer: 'A',
    solution: `**Subtract the fractions in parentheses (LCD = 12).**
\`\`\`
3/4 - 1/3 = 9/12 - 4/12 = 5/12
\`\`\`

**Divide.**
\`\`\`
5/12 ÷ 5/12 = 5/12 × 12/5 = 1
\`\`\``
  },
  {
    position: 45,
    difficulty: 'hard',
    problem_text: 'What is 2 3/8 + 1 5/6 - 3/4?',
    choices: [
      { letter: 'A', text: '3 11/24' },
      { letter: 'B', text: '4 1/24' },
      { letter: 'C', text: '3 13/24' },
      { letter: 'D', text: '3 5/24' }
    ],
    correct_answer: 'A',
    solution: `**Find LCD of 8, 6, and 4 which is 24.**
\`\`\`
2 3/8 = 2 9/24
1 5/6 = 1 20/24
3/4 = 18/24
\`\`\`

**Add the first two.**
\`\`\`
2 9/24 + 1 20/24 = 3 29/24 = 4 5/24
\`\`\`

**Subtract the third (borrow since 5 < 18).**
\`\`\`
4 5/24 - 18/24 = 3 + (24 + 5)/24 - 18/24
= 3 + 29/24 - 18/24
= 3 + 11/24
= 3 11/24
\`\`\``
  },
  {
    position: 46,
    difficulty: 'hard',
    problem_text: 'Solve for x: (x + 1)/3 = 2/3',
    choices: [
      { letter: 'A', text: 'x = 1' },
      { letter: 'B', text: 'x = 2' },
      { letter: 'C', text: 'x = 0' },
      { letter: 'D', text: 'x = 3' }
    ],
    correct_answer: 'A',
    solution: `**Multiply both sides by 3.**
\`\`\`
x + 1 = 2
\`\`\`

**Subtract 1 from both sides.**
\`\`\`
x = 1
\`\`\``
  },
  {
    position: 47,
    difficulty: 'hard',
    problem_text: 'What is 5/8 × 4/5 ÷ 2/5?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '5/4' },
      { letter: 'C', text: '2/5' },
      { letter: 'D', text: '4/5' }
    ],
    correct_answer: 'B',
    solution: `**Multiply the first two fractions.**
\`\`\`
5/8 × 4/5 = (5 × 4)/(8 × 5) = 20/40 = 1/2
\`\`\`

**Divide by 2/5 (multiply by reciprocal).**
\`\`\`
1/2 ÷ 2/5 = 1/2 × 5/2 = 5/4
\`\`\``
  },
  {
    position: 48,
    difficulty: 'hard',
    problem_text: 'What is 1 1/2 + 2 2/3 + 1 1/6?',
    choices: [
      { letter: 'A', text: '5 1/3' },
      { letter: 'B', text: '4 1/3' },
      { letter: 'C', text: '5 1/6' },
      { letter: 'D', text: '4 5/6' }
    ],
    correct_answer: 'A',
    solution: `**Convert to fractions with LCD = 6.**
\`\`\`
1 1/2 = 1 3/6
2 2/3 = 2 4/6
1 1/6 = 1 1/6
\`\`\`

**Add whole numbers and fractions.**
\`\`\`
(1 + 2 + 1) + (3/6 + 4/6 + 1/6)
= 4 + 8/6
= 4 + 1 2/6
= 5 1/3
\`\`\``
  },
  {
    position: 49,
    difficulty: 'hard',
    problem_text: 'Solve for x: 3/4 - x/8 = 1/2',
    choices: [
      { letter: 'A', text: 'x = 2' },
      { letter: 'B', text: 'x = 1' },
      { letter: 'C', text: 'x = 4' },
      { letter: 'D', text: 'x = 3' }
    ],
    correct_answer: 'A',
    solution: `**Convert all fractions to eighths.**
\`\`\`
6/8 - x/8 = 4/8
\`\`\`

**Subtract 6/8 from both sides.**
\`\`\`
-x/8 = 4/8 - 6/8 = -2/8
\`\`\`

**Multiply by -8.**
\`\`\`
x = 2
\`\`\``
  },
  {
    position: 50,
    difficulty: 'hard',
    problem_text: 'What is (2 1/3 + 1 1/2) × (3/4 - 1/6)?',
    choices: [
      { letter: 'A', text: '2 17/72' },
      { letter: 'B', text: '23/12' },
      { letter: 'C', text: '2 5/24' },
      { letter: 'D', text: '161/72' }
    ],
    correct_answer: 'A',
    solution: `**Add the first parentheses (LCD = 6).**
\`\`\`
2 1/3 + 1 1/2 = 2 2/6 + 1 3/6 = 3 5/6 = 23/6
\`\`\`

**Subtract in second parentheses (LCD = 12).**
\`\`\`
3/4 - 1/6 = 9/12 - 2/12 = 7/12
\`\`\`

**Multiply the results.**
\`\`\`
23/6 × 7/12 = (23 × 7)/(6 × 12) = 161/72
\`\`\`

**Convert to mixed number.**
\`\`\`
161 ÷ 72 = 2 remainder 17
161/72 = 2 17/72
\`\`\``
  }
];

async function insertQuestions() {
  console.log('\n========================================');
  console.log('INSERTING 50 FRACTIONS QUESTIONS');
  console.log('Using SERVICE ROLE KEY (bypasses RLS)');
  console.log('========================================\n');

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: FRACTIONS_LESSON_ID,
      subject: 'math',
      position: q.position,
      difficulty: q.difficulty,
      title: `Fractions Practice ${q.position}`,
      problem_text: q.problem_text,
      choices: JSON.stringify(q.choices),
      correct_answer: q.correct_answer,
      answer_explanation: q.solution,
      solution_steps: [],
      diagram_svg: null
    };

    const { data, error } = await supabase
      .from('practice_questions')
      .insert([questionData]);

    if (error) {
      console.error(`❌ Question ${q.position} failed:`, error.message);
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
  console.log('========================================\n');
}

insertQuestions().catch(console.error);
