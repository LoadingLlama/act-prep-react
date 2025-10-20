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
  .eq('lesson_key', '5.6')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 5.6...\n');

// Create examples from Chapter 20
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Repeating Decimal Pattern',
    problem_text: 'What is the 307th place after the decimal point in the repeating decimal 0.34562̄?',
    choices: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '5' },
      { letter: 'E', text: '6' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use the repeating pattern to find the 307th digit.\n\nStep 1: Identify repeating unit\n0.34562̄ = 0.345623456234562...\nRepeating unit: 34562 (5 digits)\n\nStep 2: Go to end of repeating unit\nEvery 5th digit is "2" (5th, 10th, 15th, 20th...)\n\nStep 3: Find multiple of 5 near 307\nClosest multiple: 305\n305th digit = 2\n\nStep 4: Count forward\n305th = 2\n306th = 3\n307th = 4 ✓\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Longer Repeating Pattern',
    problem_text: 'What is the 703rd place after the decimal point in the repeating decimal 0.596127̄?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '6' },
      { letter: 'D', text: '9' },
      { letter: 'E', text: '7' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Find the 703rd digit using the pattern.\n\nStep 1: Identify repeating unit\n0.596127̄ = 0.596127596127...\nRepeating unit: 596127 (6 digits)\n\nStep 2: Go to end of repeating unit\nEvery 6th digit is "7" (6th, 12th, 18th...)\n\nStep 3: Find multiple of 6 near 703\nClosest multiple: 702\n702 ÷ 6 = 117 ✓\n702nd digit = 7\n\nStep 4: Count forward\n702nd = 7\n703rd = 5 (first in pattern) ✓\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Units Digit of Large Power',
    problem_text: 'What is the units digit of 7^122?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '9' },
      { letter: 'E', text: '6' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use the repeating pattern of units digits for powers of 7.\n\nStep 1: Identify the pattern\n7^1 = 7, 7^2 = 49, 7^3 = 343, 7^4 = 2,401\n7^5 = 16,807, 7^6 = 117,649...\nUnits digits: 7, 9, 3, 1, 7, 9, 3, 1...\n\nStep 2: Pattern repeats every 4 terms\nEvery 4th power has units digit 1\n\nStep 3: Find multiple of 4 near 122\n122 ÷ 4 = 30 remainder 2\nClosest multiple: 120\n7^120 has units digit 1\n\nStep 4: Count forward\n7^121 has units digit 7\n7^122 has units digit 9 ✓\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Algebraic Pattern Problem',
    problem_text: '3^x has a 9 in the ones place. What digit does 3^(x+3) have in the ones place?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '9' },
      { letter: 'E', text: '27' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Use the pattern for powers of 3.\n\nStep 1: Pattern for powers of 3\n3^1 = 3, 3^2 = 9, 3^3 = 27, 3^4 = 81\nUnits digits: 3, 9, 7, 1, 3, 9, 7, 1...\n\nStep 2: Find when units digit is 9\n3^2 = 9, 3^6 = 729, etc.\nPick x = 2\n\nStep 3: Calculate 3^(x+3)\n3^(2+3) = 3^5 = 243\nUnits digit = 3\n\nAlternative: Count in pattern\nStarting from 9, count 3 forward:\n9 → 7 → 1 → 3 ✓\n\nEither method works!\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Powers of i',
    problem_text: '10i^47 - 7 is equal to:',
    choices: [
      { letter: 'A', text: '-10i - 7' },
      { letter: 'B', text: '10i + 7' },
      { letter: 'C', text: '3i' },
      { letter: 'D', text: '3' },
      { letter: 'E', text: '10i - 7' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Use the repeating pattern for powers of i.\n\nStep 1: Pattern for powers of i\ni^1 = i, i^2 = -1, i^3 = -i, i^4 = 1\ni^5 = i, i^6 = -1, i^7 = -i, i^8 = 1...\nPattern: i, -1, -i, 1 (repeats every 4)\n\nStep 2: Every 4th power equals 1\ni^4 = 1, i^8 = 1, i^12 = 1...\n\nStep 3: Find multiple of 4 near 47\n47 ÷ 4 = 11 remainder 3\nClosest: 48 or 44\nUsing 48: i^48 = 1\n\nStep 4: Count backward\ni^48 = 1\ni^47 = -i\n\nStep 5: Substitute\n10i^47 - 7 = 10(-i) - 7 = -10i - 7\n\nThe answer is A.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-5.6-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '5.6')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 5.6');
}

console.log('\n✅ Topic 5.6 - Repeating Patterns complete!');
