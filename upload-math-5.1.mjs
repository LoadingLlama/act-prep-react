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
  .eq('lesson_key', '5.1')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 5.1...\n');

// Create examples from Chapter 8
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Identifying Prime Numbers',
    problem_text: 'Which of the following is a prime number?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '21' },
      { letter: 'C', text: '27' },
      { letter: 'D', text: '29' },
      { letter: 'E', text: '35' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'A prime number is divisible only by 1 and itself.\n\nCheck each option:\nA. 1 is NOT prime (by definition)\nB. 21 = 3 × 7 (divisible by 3 and 7)\nC. 27 = 3 × 9 (divisible by 3)\nD. 29 is only divisible by 1 and 29 ✓\nE. 35 = 5 × 7 (divisible by 5 and 7)\n\nCRITICAL FACTS:\n• 1 is NOT a prime number\n• 2 is the ONLY even prime number\n• To test: check divisibility by 2, 3, 5, 7, 11...\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Divisibility by 3',
    problem_text: 'Which of the following numbers is divisible by 3?',
    choices: [
      { letter: 'A', text: '1,234' },
      { letter: 'B', text: '2,467' },
      { letter: 'C', text: '3,571' },
      { letter: 'D', text: '4,725' },
      { letter: 'E', text: '5,892' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'A number is divisible by 3 if the sum of its digits is divisible by 3.\n\nCheck each option:\n\nA. 1,234 → 1+2+3+4 = 10 → 10÷3 = 3.33... ✗\nB. 2,467 → 2+4+6+7 = 19 → 19÷3 = 6.33... ✗\nC. 3,571 → 3+5+7+1 = 16 → 16÷3 = 5.33... ✗\nD. 4,725 → 4+7+2+5 = 18 → 18÷3 = 6 ✓\nE. 5,892 → 5+8+9+2 = 24 → 24÷3 = 8 ✓ (also works!)\n\nBoth D and E are divisible by 3, but D appears first.\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Greatest Common Factor',
    problem_text: 'What is the greatest common factor (GCF) of 48 and 72?',
    choices: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '24' },
      { letter: 'E', text: '144' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Find the largest number that divides evenly into both 48 and 72.\n\nMethod 1: List factors\nFactors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48\nFactors of 72: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72\n\nCommon factors: 1, 2, 3, 4, 6, 8, 12, 24\nGreatest = 24\n\nMethod 2: Prime factorization\n48 = 2⁴ × 3\n72 = 2³ × 3²\nGCF = 2³ × 3 = 8 × 3 = 24\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Even and Odd Properties',
    problem_text: 'If x is an odd integer and y is an even integer, which of the following must be odd?',
    choices: [
      { letter: 'A', text: 'x + y' },
      { letter: 'B', text: 'x × y' },
      { letter: 'C', text: 'y × y' },
      { letter: 'D', text: 'x + x' },
      { letter: 'E', text: 'y + y' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Use the rules for even and odd operations.\n\nA. x + y = Odd + Even = Odd ✓\n\nB. x × y = Odd × Even = Even ✗\n   (Any number times even = even)\n\nC. y × y = Even × Even = Even ✗\n\nD. x + x = Odd + Odd = Even ✗\n\nE. y + y = Even + Even = Even ✗\n\nCRITICAL RULES:\n• Even + Even = Even\n• Odd + Odd = Even\n• Even + Odd = Odd ✓\n• Even × Anything = Even\n• Odd × Odd = Odd\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Consecutive Integers',
    problem_text: 'The sum of three consecutive integers is 72. What is the largest of these integers?',
    choices: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '23' },
      { letter: 'C', text: '24' },
      { letter: 'D', text: '25' },
      { letter: 'E', text: '26' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Set up consecutive integers as n, n+1, n+2.\n\nStep 1: Write equation\nn + (n+1) + (n+2) = 72\n\nStep 2: Simplify\n3n + 3 = 72\n\nStep 3: Solve for n\n3n = 69\nn = 23\n\nStep 4: Find the largest\nThe three integers are 23, 24, 25\nLargest = 25\n\nCheck: 23 + 24 + 25 = 72 ✓\n\nThe answer is D.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-5.1-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '5.1')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 5.1');
}

console.log('\n✅ Topic 5.1 - Number Theory complete!');
