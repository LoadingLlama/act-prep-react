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
  .eq('lesson_key', '5.3')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 5.3...\n');

// Create examples from Chapter 10
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Ratio with Total',
    problem_text: 'The ratio of red marbles to green marbles in a bag is 4:6. If there are a total of 80 marbles in the bag and all marbles are either red or green, how many marbles are red?',
    choices: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '20' },
      { letter: 'C', text: '32' },
      { letter: 'D', text: '48' },
      { letter: 'E', text: '54' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use the "x trick" to solve ratio problems with totals.\n\nStep 1: Set up using x trick\nRatio 4:6 means 4x red marbles and 6x green marbles\n\nStep 2: Write equation with total\nRed + Green = Total\n4x + 6x = 80\n\nStep 3: Solve for x\n10x = 80\nx = 8\n\nStep 4: Find red marbles\nRed = 4x = 4(8) = 32\n\nAlternative method (fraction):\nRed = (4/(4+6)) × 80 = (4/10) × 80 = 32\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Simplifying Ratios',
    problem_text: 'A recipe calls for 24 ounces of flour and 36 ounces of sugar. What is the simplified ratio of flour to sugar?',
    choices: [
      { letter: 'A', text: '1:2' },
      { letter: 'B', text: '2:3' },
      { letter: 'C', text: '3:4' },
      { letter: 'D', text: '4:6' },
      { letter: 'E', text: '6:9' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Simplify ratios by dividing both parts by their GCF.\n\nStep 1: Write the ratio\nFlour:Sugar = 24:36\n\nStep 2: Find GCF of 24 and 36\nFactors of 24: 1, 2, 3, 4, 6, 8, 12, 24\nFactors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36\nGCF = 12\n\nStep 3: Divide both parts by GCF\n24 ÷ 12 = 2\n36 ÷ 12 = 3\n\nSimplified ratio = 2:3\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Solving Proportions',
    problem_text: 'If 3/5 = x/20, what is the value of x?',
    choices: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '12' },
      { letter: 'E', text: '15' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Solve proportions by cross multiplying.\n\nStep 1: Set up the proportion\n3/5 = x/20\n\nStep 2: Cross multiply\n3 × 20 = 5 × x\n60 = 5x\n\nStep 3: Solve for x\n5x = 60\nx = 60 ÷ 5\nx = 12\n\nCheck: 3/5 = 12/20?\n3/5 = 0.6\n12/20 = 0.6 ✓\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Unit Rate Problem',
    problem_text: 'If 5 apples cost $3.75, how much would 8 apples cost at the same rate?',
    choices: [
      { letter: 'A', text: '$4.80' },
      { letter: 'B', text: '$5.25' },
      { letter: 'C', text: '$6.00' },
      { letter: 'D', text: '$6.40' },
      { letter: 'E', text: '$7.50' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Set up a proportion to solve unit rate problems.\n\nMethod 1: Proportion\nStep 1: Set up proportion\n5 apples / $3.75 = 8 apples / x\n\nStep 2: Cross multiply\n5x = 3.75 × 8\n5x = 30\n\nStep 3: Solve\nx = $6.00\n\nMethod 2: Find unit rate\nPrice per apple = $3.75 ÷ 5 = $0.75\n8 apples = 8 × $0.75 = $6.00\n\nBoth methods give the same answer.\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Three-Part Ratio',
    problem_text: 'The ratio of red to green to blue marbles is 2:3:5. If there are 100 marbles total, how many blue marbles are there?',
    choices: [
      { letter: 'A', text: '20' },
      { letter: 'B', text: '30' },
      { letter: 'C', text: '40' },
      { letter: 'D', text: '50' },
      { letter: 'E', text: '60' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use the x trick for three-part ratios.\n\nStep 1: Set up with x trick\nRed:Green:Blue = 2:3:5\nRed = 2x, Green = 3x, Blue = 5x\n\nStep 2: Write equation with total\n2x + 3x + 5x = 100\n\nStep 3: Solve for x\n10x = 100\nx = 10\n\nStep 4: Find blue marbles\nBlue = 5x = 5(10) = 50\n\nCheck: Red = 20, Green = 30, Blue = 50\nTotal = 20 + 30 + 50 = 100 ✓\n\nThe answer is D.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-5.3-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '5.3')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 5.3');
}

console.log('\n✅ Topic 5.3 - Ratios and Proportions complete!');
