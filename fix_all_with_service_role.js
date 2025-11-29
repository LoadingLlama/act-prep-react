const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Use SERVICE ROLE KEY to bypass RLS policies
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const allUpdates = [
  // Fractions (4 questions)
  {
    id: '62527519-09c4-4201-af4d-6b425064d7f3',
    title: "Fraction Operations in Context",
    problem_text: "A recipe calls for 2/3 cup of flour and 3/4 cup of sugar. If Emily wants to make 1.5 times the recipe, how many total cups of flour and sugar combined will she need?",
    choices: [
      { letter: "A", text: "1 5/12" },
      { letter: "B", text: "1 17/24" },
      { letter: "C", text: "2 1/8" },
      { letter: "D", text: "2 7/24" }
    ],
    correct_answer: "C",
    answer_explanation: "First, multiply each ingredient by 1.5: Flour = (2/3) × 1.5 = (2/3) × (3/2) = 1 cup. Sugar = (3/4) × 1.5 = (3/4) × (3/2) = 9/8 cups. Total = 1 + 9/8 = 8/8 + 9/8 = 17/8 = 2 1/8 cups."
  },
  {
    id: '6858f809-8d59-4b12-8cdf-58c04276e50e',
    title: "Fraction Division with Variables",
    problem_text: "If x/5 = 3/4, what is the value of x?",
    choices: [
      { letter: "A", text: "12/5" },
      { letter: "B", text: "15/4" },
      { letter: "C", text: "3 3/4" },
      { letter: "D", text: "4 1/5" }
    ],
    correct_answer: "B",
    answer_explanation: "To solve for x, multiply both sides by 5: x = (3/4) × 5 = 15/4. Check: (15/4) ÷ 5 = 15/4 × 1/5 = 15/20 = 3/4 ✓"
  },
  {
    id: '283e709e-40a0-4d38-ab8b-cb53976d2d06',
    title: "Complex Fraction Simplification",
    problem_text: "What is the value of (2/3 + 1/4) ÷ (5/6 - 1/2)?",
    choices: [
      { letter: "A", text: "2 1/2" },
      { letter: "B", text: "2 3/4" },
      { letter: "C", text: "3 1/4" },
      { letter: "D", text: "11/4" }
    ],
    correct_answer: "B",
    answer_explanation: "First solve the numerator: 2/3 + 1/4 = 8/12 + 3/12 = 11/12. Then the denominator: 5/6 - 1/2 = 5/6 - 3/6 = 2/6 = 1/3. Now divide: (11/12) ÷ (1/3) = 11/12 × 3/1 = 33/12 = 11/4 = 2 3/4."
  },
  {
    id: '1de19107-65d2-4f97-8b3a-3bd29e86bb9d',
    title: "Fraction Word Problem",
    problem_text: "Maria spent 1/3 of her money on groceries and 1/4 of the remainder on gas. If she started with $120, how much money does she have left?",
    choices: [
      { letter: "A", text: "$50" },
      { letter: "B", text: "$60" },
      { letter: "C", text: "$70" },
      { letter: "D", text: "$80" }
    ],
    correct_answer: "B",
    answer_explanation: "Groceries: (1/3) × $120 = $40. Remainder after groceries: $120 - $40 = $80. Gas: (1/4) × $80 = $20. Money left: $80 - $20 = $60."
  },

  // Exponents (4 questions)
  {
    id: '0e03894f-88b1-4fb8-a6ea-e1ba9c33eb5b',
    title: "Exponent Rules Application",
    problem_text: "If (x³)² × x⁴ = x^n, what is the value of n?",
    choices: [
      { letter: "A", text: "9" },
      { letter: "B", text: "10" },
      { letter: "C", text: "12" },
      { letter: "D", text: "24" }
    ],
    correct_answer: "B",
    answer_explanation: "Using exponent rules: (x³)² = x⁶. Then x⁶ × x⁴ = x^(6+4) = x¹⁰. Therefore n = 10."
  },
  {
    id: 'a3bbb601-1588-44fb-9d84-46957926fd19',
    title: "Solving Exponential Equations",
    problem_text: "If 2^(x+3) = 32, what is the value of x?",
    choices: [
      { letter: "A", text: "1" },
      { letter: "B", text: "2" },
      { letter: "C", text: "3" },
      { letter: "D", text: "5" }
    ],
    correct_answer: "B",
    answer_explanation: "Rewrite 32 as a power of 2: 32 = 2⁵. So 2^(x+3) = 2⁵. Therefore x + 3 = 5, which means x = 2."
  },
  {
    id: 'e83f20a6-9e51-4283-af3e-668dc0640aa0',
    title: "Radical Equations",
    problem_text: "If √(x + 5) = 8, what is the value of x?",
    choices: [
      { letter: "A", text: "3" },
      { letter: "B", text: "13" },
      { letter: "C", text: "59" },
      { letter: "D", text: "69" }
    ],
    correct_answer: "C",
    answer_explanation: "Square both sides: (√(x + 5))² = 8². This gives x + 5 = 64. Solving for x: x = 64 - 5 = 59. Check: √(59 + 5) = √64 = 8 ✓"
  },
  {
    id: '365216b0-7e3f-4057-9588-e2628626e520',
    title: "Negative and Fractional Exponents",
    problem_text: "What is the value of 16^(3/4)?",
    choices: [
      { letter: "A", text: "4" },
      { letter: "B", text: "8" },
      { letter: "C", text: "12" },
      { letter: "D", text: "64" }
    ],
    correct_answer: "B",
    answer_explanation: "16^(3/4) = (16^(1/4))³. The fourth root of 16 is 2 (since 2⁴ = 16). Therefore (16^(1/4))³ = 2³ = 8."
  },

  // Number Theory (4 questions)
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
  },

  // Sentence Structure - fix missing 4th choice
  {
    id: '458b63bc-3505-4f22-9884-42d3d47b3944',
    choices: [
      {
        letter: "A",
        text: "sport, but",
        explanation: "This choice correctly uses the comma + coordinating conjunction \"but\" to show the contrast between \"Hockey is my favorite sport\" and \"I cannot skate very well.\""
      },
      {
        letter: "B",
        text: "sport even though",
        explanation: "This choice creates a run-on sentence by placing the subordinating conjunction \"even though\" without a comma before it."
      },
      {
        letter: "C",
        text: "sport, so",
        explanation: "This choice incorrectly uses \"so\" which suggests causation when the relationship between \"my favorite sport\" and \"cannot skate well\" is actually contrast."
      },
      {
        letter: "D",
        text: "sport. Although",
        explanation: "This choice creates a sentence fragment by starting a new sentence with the subordinating conjunction \"Although\" without completing the thought."
      }
    ]
  }
];

async function fixAllQuestions() {
  console.log('Fixing all corrupted questions using SERVICE ROLE KEY...\n');
  console.log('='.repeat(90));

  let fixed = 0;
  let failed = 0;

  for (const update of allUpdates) {
    const { id, ...data } = update;

    const { data: result, error } = await supabase
      .from('lesson_examples')
      .update(data)
      .eq('id', id)
      .select();

    if (error) {
      console.error(`✗ Error updating ${data.title || id}:`, error.message);
      failed++;
    } else if (result && result.length > 0) {
      console.log(`✓ Updated: ${data.title || result[0].title}`);
      fixed++;
    } else {
      console.log(`⚠ No rows affected: ${data.title || id}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(90));
  console.log(`✅ Successfully fixed: ${fixed}/${allUpdates.length}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed}/${allUpdates.length}`);
  }
  console.log('='.repeat(90));
}

fixAllQuestions().catch(console.error);
