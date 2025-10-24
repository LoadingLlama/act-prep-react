import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// Get lesson ID
const { data: lessonData, error: lessonError} = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', '3.3')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 13
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Applying Multiple Exponent Rules',
    problem_text: 'For all nonzero x and y, what is (x⁶y⁷)/(x²y⁵) equivalent to?',
    choices: [
      { letter: 'A', text: 'x⁴y²' },
      { letter: 'B', text: 'x³y²' },
      { letter: 'C', text: 'x⁸y¹²' },
      { letter: 'D', text: 'xy²' },
      { letter: 'E', text: '1/(x⁴y²)' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Use the quotient rule to simplify.\n\nStep 1: Apply quotient rule to x terms: x⁶/x² = x⁶⁻² = x⁴\n\nStep 2: Apply quotient rule to y terms: y⁷/y⁵ = y⁷⁻⁵ = y²\n\nStep 3: Combine: x⁴y²\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Solving Exponential Equations with Same Base',
    problem_text: 'If 4^(3x+1) = 4^(-x+7), what is the value of x?',
    choices: [
      { letter: 'A', text: '-2' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '3/2' },
      { letter: 'D', text: '2' },
      { letter: 'E', text: '8' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'When bases are the same, set exponents equal.\n\nStep 1: Since the bases (both 4) are equal, the exponents must be equal:\n3x+1 = -x+7\n\nStep 2: Solve for x:\n3x + x = 7 - 1\n4x = 6\nx = 6/4 = 3/2\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Making Bases the Same',
    problem_text: 'For what value of x is 9^(2x) = 27^(x+4) true?',
    choices: [
      { letter: 'A', text: '12' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '3' },
      { letter: 'E', text: '2' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Convert to the same base, then set exponents equal.\n\nStep 1: Recognize that 9 = 3² and 27 = 3³\n\nStep 2: Rewrite equation using base 3:\n(3²)^(2x) = (3³)^(x+4)\n\nStep 3: Use power rule:\n3^(4x) = 3^(3x+12)\n\nStep 4: Since bases are equal, set exponents equal:\n4x = 3x + 12\n\nStep 5: Solve:\nx = 12\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Simplifying and Combining Radicals',
    problem_text: 'If √45 + √20 = x√5, then x = ?',
    choices: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '9' },
      { letter: 'D', text: '13' },
      { letter: 'E', text: '65' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Simplify each radical, then combine like radicals.\n\nStep 1: Simplify √45:\n√45 = √(3×3×5) = 3√5\n\nStep 2: Simplify √20:\n√20 = √(2×2×5) = 2√5\n\nStep 3: Add the like radicals:\n3√5 + 2√5 = 5√5\n\nStep 4: Compare to x√5:\nx√5 = 5√5, so x = 5\n\nThe answer is A.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 3.3...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.3-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '3.3');

if (updateError) {
  console.error('Error uploading content:', updateError);
} else {
  console.log(`✓ Uploaded ${content.length} characters for Topic 3.3`);
  console.log('\n✅ Topic 3.3 - Exponents and Roots complete!');
}
