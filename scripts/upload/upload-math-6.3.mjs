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
  .eq('lesson_key', '6.3')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 6.3...\n');

// Create examples from Chapter 23
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Basic Factorial Calculation',
    problem_text: 'The expression 2! + 4! is equal to:',
    choices: [
      { letter: 'A', text: '6' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '24' },
      { letter: 'D', text: '26' },
      { letter: 'E', text: '720' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Calculate each factorial separately, then add.\n\nStep 1: Calculate 2!\n2! = 2 × 1 = 2\n\nStep 2: Calculate 4!\n4! = 4 × 3 × 2 × 1 = 24\n\nStep 3: Add the results\n2! + 4! = 2 + 24 = 26\n\nCalculator tip: Most calculators have a "!" button that can compute factorials directly.\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Fundamental Counting Principle with Outfits',
    problem_text: 'Sarah has 3 shirts, 4 pairs of shoes, and 5 pairs of pants. How many different outfits can she create by choosing one of each?',
    choices: [
      { letter: 'A', text: '12' },
      { letter: 'B', text: '20' },
      { letter: 'C', text: '35' },
      { letter: 'D', text: '60' },
      { letter: 'E', text: '120' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use the Fundamental Counting Principle: multiply the number of choices for each item.\n\nStep 1: Count choices for each category\nShirts: 3 choices\nShoes: 4 choices\nPants: 5 choices\n\nStep 2: Multiply all choices together\nTotal outfits = 3 × 4 × 5\nTotal outfits = 12 × 5 = 60\n\nThis is the MOST COMMON type of counting problem on the ACT. Always multiply independent choices!\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Permutations (Order Matters)',
    problem_text: 'A race has 8 runners. How many different ways can gold, silver, and bronze medals be awarded?',
    choices: [
      { letter: 'A', text: '24' },
      { letter: 'B', text: '56' },
      { letter: 'C', text: '168' },
      { letter: 'D', text: '336' },
      { letter: 'E', text: '512' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Since different orderings matter (gold ≠ silver ≠ bronze), this is a permutation problem.\n\nMethod 1: Use Fundamental Counting Principle (FASTEST)\nGold medal: 8 choices\nSilver medal: 7 choices (one person already won gold)\nBronze medal: 6 choices (two people already have medals)\nTotal arrangements = 8 × 7 × 6 = 336\n\nMethod 2: Use permutation formula\nnPr = n!/(n-r)!\n8P3 = 8!/(8-3)! = 8!/5!\n8P3 = (8 × 7 × 6 × 5!)/(5!) = 8 × 7 × 6 = 336\n\nBoth methods give the same answer. Method 1 is faster!\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Combinations (Order Doesn\'t Matter)',
    problem_text: 'A committee of 3 people must be selected from a group of 8 people. How many different committees can be formed?',
    choices: [
      { letter: 'A', text: '24' },
      { letter: 'B', text: '56' },
      { letter: 'C', text: '168' },
      { letter: 'D', text: '336' },
      { letter: 'E', text: '512' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Since order doesn\'t matter for a committee (selecting Amy-Bob-Chris is the same as Bob-Chris-Amy), use combinations.\n\nStep 1: Use combination formula\nnCr = n!/(r!(n-r)!)\n8C3 = 8!/(3! × 5!)\n\nStep 2: Expand and simplify\n8C3 = (8 × 7 × 6 × 5!)/(3! × 5!)\n8C3 = (8 × 7 × 6)/(3 × 2 × 1)\n8C3 = 336/6 = 56\n\nNote: This is different from Example 3 (permutations gave 336). Combinations always give fewer results because different orderings count as the same selection.\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Choosing the Right Method',
    problem_text: 'A password must contain 4 digits (0-9) followed by 2 letters (A-Z). How many different passwords are possible if digits and letters can repeat?',
    choices: [
      { letter: 'A', text: '260' },
      { letter: 'B', text: '2,600' },
      { letter: 'C', text: '67,600' },
      { letter: 'D', text: '676,000' },
      { letter: 'E', text: '6,760,000' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use the Fundamental Counting Principle since we\'re making independent choices.\n\nStep 1: Count choices for each position\nDigits (0-9): 10 choices for each of 4 positions\nLetters (A-Z): 26 choices for each of 2 positions\n\nStep 2: Calculate total for digits\n1st digit: 10 choices\n2nd digit: 10 choices (can repeat)\n3rd digit: 10 choices\n4th digit: 10 choices\nTotal digit combinations = 10 × 10 × 10 × 10 = 10,000\n\nStep 3: Calculate total for letters\n1st letter: 26 choices\n2nd letter: 26 choices (can repeat)\nTotal letter combinations = 26 × 26 = 676\n\nStep 4: Multiply for final answer\nTotal passwords = 10,000 × 676 = 676,000\n\nThe answer is D.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-6.3-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '6.3')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 6.3');
}

console.log('\n✅ Topic 6.3 - Counting, Permutations, and Combinations complete!');
