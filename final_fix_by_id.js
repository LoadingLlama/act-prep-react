const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const updates = [
  // Fractions
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
  // Exponents
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
  // Sentence structure - fix missing choice
  {
    id: '458b63bc-3505-4f22-9884-42d3d47b3944',
    choices: [
      { letter: "A", text: "sport, but" },
      { letter: "B", text: "sport even though" },
      { letter: "C", text: "sport, so" },
      { letter: "D", text: "sport. Although" }
    ]
  }
];

async function applyFinalFixes() {
  console.log('Applying final fixes by ID...\n');

  let fixed = 0;

  for (const update of updates) {
    const { id, ...data } = update;

    const { error } = await supabase
      .from('lesson_examples')
      .update(data)
      .eq('id', id);

    if (error) {
      console.error(`✗ Error updating ${id}:`, error.message);
    } else {
      console.log(`✓ Updated: ${data.title || id}`);
      fixed++;
    }
  }

  console.log(`\n✅ Successfully applied ${fixed}/${updates.length} fixes`);
}

applyFinalFixes().catch(console.error);
