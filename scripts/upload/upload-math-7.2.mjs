import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID (using 'complex-numbers' key)
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'complex-numbers')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 7.2...\n');

// Create examples from Chapter 25
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Subtracting Complex Numbers',
    problem_text: 'What is the difference of complex numbers 22 - 14i and 7 - 3i?',
    choices: [
      { letter: 'A', text: '15 - 17i' },
      { letter: 'B', text: '15 - 11i' },
      { letter: 'C', text: '-15 + 11i' },
      { letter: 'D', text: '29 - 17i' },
      { letter: 'E', text: '15 + 11i' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Subtract complex numbers by combining like terms.\n\nStep 1: Set up the subtraction\n(22 - 14i) - (7 - 3i)\n\nStep 2: CRITICAL - Distribute negative sign to BOTH terms\n= 22 - 14i - 7 + 3i\n\nStep 3: Combine real parts\n22 - 7 = 15\n\nStep 4: Combine imaginary parts\n-14i + 3i = -11i\n\nStep 5: Write final answer\n15 - 11i\n\nCOMMON MISTAKE:\nForgetting to distribute negative:\n22 - 14i - 7 - 3i = 15 - 17i ✗\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Multiplying Complex Numbers',
    problem_text: 'What is the product of complex numbers 1 - 3i and 11 + 2i?',
    choices: [
      { letter: 'A', text: '11 - 6i' },
      { letter: 'B', text: '12 - i' },
      { letter: 'C', text: '11 - 38i' },
      { letter: 'D', text: '17 - 31i' },
      { letter: 'E', text: '5 - 29i' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use FOIL to multiply complex numbers.\n\nStep 1: Use FOIL\n(1 - 3i)(11 + 2i)\nFirst: 1 × 11 = 11\nOuter: 1 × 2i = 2i\nInner: -3i × 11 = -33i\nLast: -3i × 2i = -6i²\n\nStep 2: Combine\n= 11 + 2i - 33i - 6i²\n= 11 - 31i - 6i²\n\nStep 3: Replace i² with -1\ni² = -1, so:\n11 - 31i - 6(-1)\n= 11 - 31i + 6\n\nStep 4: Combine real parts\n= 17 - 31i\n\nCALCULATOR SHORTCUT:\nType directly: (1-3i)(11+2i)\nPress ENTER → get answer!\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Simplifying with Complex Conjugate',
    problem_text: 'Which of the following is equivalent to 5/(3 + 4i)?',
    choices: [
      { letter: 'A', text: '3/5 - 4i/5' },
      { letter: 'B', text: '3/5 + 4i/5' },
      { letter: 'C', text: '15/7 - 20i/7' },
      { letter: 'D', text: '15/7 + 20i/7' },
      { letter: 'E', text: '5/3 - 4i' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Use complex conjugate to remove i from denominator.\n\nStep 1: Identify conjugate\nDenominator: 3 + 4i\nConjugate: 3 - 4i (flip sign of imaginary)\n\nStep 2: Multiply top and bottom by conjugate\n[5/(3 + 4i)] × [(3 - 4i)/(3 - 4i)]\n\nStep 3: Multiply numerator\n5(3 - 4i) = 15 - 20i\n\nStep 4: Multiply denominator (shortcut!)\n(a + bi)(a - bi) = a² + b²\n(3 + 4i)(3 - 4i) = 3² + 4² = 9 + 16 = 25\n\nStep 5: Simplify fraction\n(15 - 20i) / 25\n= 15/25 - 20i/25\n= 3/5 - 4i/5\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Adding Complex Numbers',
    problem_text: 'What is the sum of (8 + 5i) and (5 - 2i)?',
    choices: [
      { letter: 'A', text: '3 + 7i' },
      { letter: 'B', text: '13 + 3i' },
      { letter: 'C', text: '13 + 7i' },
      { letter: 'D', text: '3 + 3i' },
      { letter: 'E', text: '40 - 10i' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Add complex numbers by combining like terms.\n\nStep 1: Set up the addition\n(8 + 5i) + (5 - 2i)\n\nStep 2: Group like terms\n= 8 + 5 + 5i - 2i\n\nStep 3: Combine real parts\n8 + 5 = 13\n\nStep 4: Combine imaginary parts\n5i + (-2i) = 5i - 2i = 3i\n\nStep 5: Write final answer\n13 + 3i\n\nNote: Addition is simpler than subtraction\nbecause you don\'t need to distribute negatives!\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Product of Complex Conjugates',
    problem_text: 'What is the product of 2 + 3i and 2 - 3i?',
    choices: [
      { letter: 'A', text: '4 - 9i' },
      { letter: 'B', text: '-5' },
      { letter: 'C', text: '4 + 9' },
      { letter: 'D', text: '13' },
      { letter: 'E', text: '4 - 9i²' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use conjugate product shortcut.\n\nMethod 1: Shortcut (FAST!)\nFor (a + bi)(a - bi) = a² + b²\n(2 + 3i)(2 - 3i)\n= 2² + 3²\n= 4 + 9\n= 13\n\nMethod 2: FOIL (slower)\n(2 + 3i)(2 - 3i)\nFirst: 2 × 2 = 4\nOuter: 2 × (-3i) = -6i\nInner: 3i × 2 = 6i\nLast: 3i × (-3i) = -9i²\n= 4 - 6i + 6i - 9i²\n= 4 - 9i²\n= 4 - 9(-1)\n= 4 + 9 = 13\n\nBoth methods work!\nShortcut is much faster.\n\nThe answer is D.',
    is_worked_example: false
  }
];

for (const example of examples) {
  // ⚠️ CRITICAL: Table name is 'lesson_examples', NOT 'examples'
  const { error } = await supabase
    .from('lesson_examples')
    .insert(example);

  if (error) {
    console.error(`Error creating example at position ${example.position}:`, error.message);
  } else {
    console.log(`✓ Example ${example.position} created: ${example.title}`);
  }
}

// Upload HTML content
console.log('\nUploading lesson content...');
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-7.2-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'complex-numbers')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 7.2');
}

console.log('\n✅ Topic 7.2 - Complex Numbers complete!');
