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
  .eq('lesson_key', '5.5')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 5.5...\n');

// Create examples from Chapter 30
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Converting Large Numbers',
    problem_text: 'The MLB estimates that 250,000 baseballs are used during an entire season. Which of the following expressions, when written in scientific notation, correctly represents the number of baseballs used during a season?',
    choices: [
      { letter: 'A', text: '2.5 × 10⁴' },
      { letter: 'B', text: '2.5 × 10⁵' },
      { letter: 'C', text: '2.5 × 10⁶' },
      { letter: 'D', text: '25 × 10⁴' },
      { letter: 'E', text: '0.25 × 10⁶' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Convert 250,000 to scientific notation.\n\nStep 1: Identify where decimal is\n250,000. (decimal at end)\n\nStep 2: Move decimal after first digit\nPlace between 2 and 5: 2.5\n\nStep 3: Count moves to the LEFT\n250,000. → 2.5\nMoved 5 places left\n\nStep 4: Write in scientific notation\n2.5 × 10⁵\n\nWHY D IS WRONG:\nDigit term must be 1 ≤ digit < 10\n25 is too large (≥ 10)\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Converting Small Numbers',
    problem_text: 'During an experiment, Ronald found that the average weight of an ant is 0.0000029 kg. The average weight of an ant in kilograms is equal to 2.9 × 10ᵏ. What is the value of k?',
    choices: [
      { letter: 'A', text: '7' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '-6' },
      { letter: 'D', text: '-7' },
      { letter: 'E', text: '-5' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Convert 0.0000029 to scientific notation.\n\nStep 1: Move decimal to RIGHT\nPlace after the 2: 2.9\n\nStep 2: Count moves to the RIGHT\n0.0000029 → 2.9\nMoved 6 places right\n\nStep 3: Right movement = negative exponent\nk = -6\n\nResult: 2.9 × 10⁻⁶\n\nRULE TO REMEMBER:\n• Decimal moves LEFT → positive exponent\n• Decimal moves RIGHT → negative exponent\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Multiplication with Scientific Notation',
    problem_text: 'What is (2.1 × 10⁴) × (4 × 10⁶)?',
    choices: [
      { letter: 'A', text: '8.4 × 10⁹' },
      { letter: 'B', text: '8.4 × 10¹⁰' },
      { letter: 'C', text: '8.4 × 10²⁴' },
      { letter: 'D', text: '6.1 × 10¹⁰' },
      { letter: 'E', text: '2.14 × 10¹⁰' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Multiply digits, add exponents.\n\nStep 1: Multiply digit terms\n2.1 × 4 = 8.4\n\nStep 2: Add exponents\n10⁴ × 10⁶ = 10⁽⁴⁺⁶⁾ = 10¹⁰\n\nStep 3: Combine\n8.4 × 10¹⁰\n\nCheck digit term:\n1 ≤ 8.4 < 10 ✓\nCorrect scientific notation!\n\nMULTIPLICATION RULE:\n(a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10⁽ᵐ⁺ⁿ⁾\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Addition with Scientific Notation',
    problem_text: 'Which of the following expressions represents the sum of 2.6 × 10⁶ and 7.8 × 10⁵ in scientific notation?',
    choices: [
      { letter: 'A', text: '10.4 × 10⁵' },
      { letter: 'B', text: '1.04 × 10⁶' },
      { letter: 'C', text: '3.38 × 10⁶' },
      { letter: 'D', text: '10.4 × 10¹¹' },
      { letter: 'E', text: '8.06 × 10⁶' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Exponents must match before adding.\n\nMethod 1: Convert to same exponent\nStep 1: Convert 2.6 × 10⁶ to 10⁵\n2.6 × 10⁶ = 26 × 10⁵\n\nStep 2: Add digit terms\n26 × 10⁵ + 7.8 × 10⁵ = 33.8 × 10⁵\n\nStep 3: Adjust to proper scientific notation\n33.8 × 10⁵ = 3.38 × 10⁶\n\nMethod 2: Convert to standard form\n2,600,000 + 780,000 = 3,380,000\n= 3.38 × 10⁶\n\nBoth methods work!\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Percentage Problems',
    problem_text: 'What is 8% of 9.02 × 10⁴?',
    choices: [
      { letter: 'A', text: '7,216' },
      { letter: 'B', text: '11,275' },
      { letter: 'C', text: '72,160' },
      { letter: 'D', text: '112,750' },
      { letter: 'E', text: '721,600' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Calculate percentage of scientific notation.\n\nStep 1: Convert percentage to decimal\n8% = 0.08\n\nStep 2: Multiply\n0.08 × (9.02 × 10⁴)\n= (0.08 × 9.02) × 10⁴\n\nStep 3: Calculate digit product\n0.08 × 9.02 = 0.7216\n\nStep 4: Combine\n0.7216 × 10⁴\n\nStep 5: Convert to standard form\n0.7216 × 10,000 = 7,216\n\nAlternatively:\n9.02 × 10⁴ = 90,200\n8% of 90,200 = 0.08 × 90,200 = 7,216\n\nThe answer is A.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-5.5-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '5.5')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 5.5');
}

console.log('\n✅ Topic 5.5 - Scientific Notation complete!');
