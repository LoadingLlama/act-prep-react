const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const numberTheoryUpdates = [
  {
    id: '1a5e8055-7f1c-4ad5-b79f-140701f94b48',
    title: "Prime Factorization Application",
    problem_text: "What is the smallest positive integer that is divisible by both 12 and 18?",
    choices: [
      { letter: "A", text: "36" },
      { letter: "B", text: "54" },
      { letter: "C", text: "72" },
      { letter: "D", text: "216" }
    ],
    correct_answer: "A",
    answer_explanation: "Find the LCM by prime factorization: 12 = 2² × 3, and 18 = 2 × 3². The LCM uses the highest power of each prime: 2² × 3² = 4 × 9 = 36."
  },
  {
    id: '203d19b9-177b-4e26-acde-d7194317a524',
    title: "GCD and LCM Relationship",
    problem_text: "If the greatest common divisor (GCD) of two numbers is 8 and their least common multiple (LCM) is 240, what is the product of the two numbers?",
    choices: [
      { letter: "A", text: "960" },
      { letter: "B", text: "1,920" },
      { letter: "C", text: "2,400" },
      { letter: "D", text: "30" }
    ],
    correct_answer: "B",
    answer_explanation: "Use the fundamental relationship: GCD × LCM = Product of the two numbers. Therefore: 8 × 240 = 1,920."
  },
  {
    id: 'b23e9db9-482b-438f-aa65-3eeadd6461b4',
    title: "Divisibility Rules Application",
    problem_text: "For what value of the digit x is the number 4,32x divisible by both 3 and 4?",
    choices: [
      { letter: "A", text: "0" },
      { letter: "B", text: "2" },
      { letter: "C", text: "4" },
      { letter: "D", text: "8" }
    ],
    correct_answer: "A",
    answer_explanation: "For divisibility by 4, the last two digits (2x) must be divisible by 4. For divisibility by 3, the sum of digits (4+3+2+x) must be divisible by 3. The digit sum is 9+x, which is divisible by 3 when x ∈ {0,3,6,9}. The last two digits form 20+x, divisible by 4 when x ∈ {0,4,8}. The only value that satisfies both conditions is x=0."
  },
  {
    id: '6da4ebdf-9ab1-4e9b-a455-d6787d94c901',
    title: "Prime Number Properties",
    problem_text: "How many prime numbers are there between 20 and 40?",
    choices: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correct_answer: "B",
    answer_explanation: "List primes between 20 and 40: 23, 29, 31, 37. That's 4 prime numbers. (Note: 21=3×7, 25=5², 27=3³, 33=3×11, 35=5×7, 39=3×13 are composite.)"
  }
];

async function fixNumberTheory() {
  console.log('Fixing Number Theory questions...\\n');

  let fixed = 0;

  for (const update of numberTheoryUpdates) {
    const { id, ...data } = update;

    const { error } = await supabase
      .from('lesson_examples')
      .update(data)
      .eq('id', id);

    if (error) {
      console.error(`✗ Error updating ${id}:`, error.message);
    } else {
      console.log(`✓ Updated: ${data.title}`);
      fixed++;
    }
  }

  console.log(`\\n✅ Successfully fixed ${fixed}/${numberTheoryUpdates.length} Number Theory questions`);
}

fixNumberTheory().catch(console.error);
