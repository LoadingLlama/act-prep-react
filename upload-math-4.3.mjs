import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'functions')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 11
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Evaluating Functions with Variables',
    problem_text: 'If f(x) = 3√x + 11, what is the value for f(25)?',
    choices: [
      { letter: 'A', text: '15' },
      { letter: 'B', text: '26' },
      { letter: 'C', text: '34' },
      { letter: 'D', text: '64' },
      { letter: 'E', text: '86' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Plug the input into the function.\\n\\nStep 1: Replace x with 25\\nf(25) = 3√25 + 11\\n\\nStep 2: Evaluate the square root\\n√25 = 5\\n\\nStep 3: Complete the calculation\\nf(25) = 3(5) + 11 = 15 + 11 = 26\\n\\nRemember: The input goes in parentheses, the output is what f(x) equals.\\n\\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Composite Functions (Inside Out Method)',
    problem_text: 'If f(x) = 3x + 10 and g(x) = x - 5, what is the value of f(g(8))?',
    choices: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '9' },
      { letter: 'C', text: '19' },
      { letter: 'D', text: '29' },
      { letter: 'E', text: '34' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Work inside out: solve the inner function first.\\n\\nMethod: Inside Out\\n\\nStep 1: Evaluate the inside function g(8)\\ng(8) = 8 - 5 = 3\\n\\nStep 2: Now we have f(g(8)) = f(3)\\n\\nStep 3: Evaluate f(3)\\nf(3) = 3(3) + 10 = 9 + 10 = 19\\n\\nAlternate Method: You could also solve for f(g(x)) = 3(x - 5) + 10 = 3x - 5, then plug in 8.\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Function Notation (Product)',
    problem_text: 'If f(x) = 2x² + 1 and g(x) = x² - 1, which of the following expressions represents (fg)(x)?',
    choices: [
      { letter: 'A', text: '3x²' },
      { letter: 'B', text: '2x² - 1' },
      { letter: 'C', text: '2x⁴ - 1' },
      { letter: 'D', text: '2x⁴ - x² - 1' },
      { letter: 'E', text: '2x⁴ + x² - 1' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Product notation means multiply the functions.\\n\\n(fg)(x) = f(x) × g(x)\\n\\nStep 1: Set up multiplication\\n(fg)(x) = (2x² + 1)(x² - 1)\\n\\nStep 2: FOIL (multiply everything)\\nF: 2x² · x² = 2x⁴\\nO: 2x² · (-1) = -2x²\\nI: 1 · x² = x²\\nL: 1 · (-1) = -1\\n\\nStep 3: Combine like terms\\n2x⁴ - 2x² + x² - 1 = 2x⁴ - x² - 1\\n\\nRemember: (fg)(x) means multiply, NOT compose!\\n\\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Finding Domain from Fractions',
    problem_text: 'The domain of f(x) = 1/(x² - 5x + 6) is the set of all real numbers EXCEPT:',
    choices: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '-3' },
      { letter: 'C', text: '2 and 3' },
      { letter: 'D', text: '-2 and 3' },
      { letter: 'E', text: '-2 and -3' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Find where the function is undefined (denominator = 0).\\n\\nStep 1: Set denominator equal to 0\\nx² - 5x + 6 = 0\\n\\nStep 2: Factor\\nNeed two numbers that multiply to 6 and add to -5\\nThose are -2 and -3\\n(x - 2)(x - 3) = 0\\n\\nStep 3: Solve each factor\\nx - 2 = 0 → x = 2\\nx - 3 = 0 → x = 3\\n\\nThe function is undefined at x = 2 and x = 3, so these values are NOT in the domain.\\n\\nThe answer is C.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 4.3...');
for (const example of examples) {
  const { error } = await supabase
    .from('lesson_examples')
    .insert(example);

  if (error) {
    console.error(`Error creating example at position ${example.position}:`, error.message);
  } else {
    console.log(`✓ Created example: ${example.title}`);
  }
}

// Upload HTML content
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-4.3-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'functions')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 4.3`);
  console.log('\n✅ Topic 4.3 - Functions complete!');
}
