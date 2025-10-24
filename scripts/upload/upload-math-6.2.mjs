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
  .eq('lesson_key', '6.2')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 6.2...\n');

// Create examples from Chapter 22
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Basic Probability with Single Selection',
    problem_text: 'A bag contains 38 candies: 18 blue, 10 red, 5 yellow, 3 green, and 2 pink. If Andy reaches into the bag and picks one candy at random, what is the probability that he will select a yellow candy?',
    choices: [
      { letter: 'A', text: '5/33' },
      { letter: 'B', text: '5/18' },
      { letter: 'C', text: '5/38' },
      { letter: 'D', text: '10/38' },
      { letter: 'E', text: '1/5' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use the basic probability formula: Probability = Desired Outcomes ÷ Total Outcomes\n\nStep 1: Identify desired outcomes\nThere are 5 yellow candies in the bag.\n\nStep 2: Identify total outcomes\nThere are 38 total candies in the bag.\n\nStep 3: Calculate probability\nProbability = 5/38\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Probability of NOT Selecting',
    problem_text: 'Using the same bag from Example 1 (38 candies: 18 blue, 10 red, 5 yellow, 3 green, 2 pink), what is the probability that Evelyn will NOT pick a blue candy?',
    choices: [
      { letter: 'A', text: '9/19' },
      { letter: 'B', text: '10/19' },
      { letter: 'C', text: '9/38' },
      { letter: 'D', text: '10/38' },
      { letter: 'E', text: '18/38' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'To find probability of NOT selecting something, count everything that isn\'t the unwanted outcome.\n\nStep 1: Count non-blue candies\nBlue candies = 18\nNOT blue = 38 - 18 = 20 candies\n\nStep 2: Calculate probability\nProbability = 20/38\n\nStep 3: Simplify\n20/38 = 10/19\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Multiple Events Without Replacement',
    problem_text: 'Min will select 2 candies from the bag (38 candies: 18 blue, 10 red, 5 yellow, 3 green, 2 pink) without replacement. What is the probability that she will select a red candy and then a green candy?',
    choices: [
      { letter: 'A', text: '30/1444' },
      { letter: 'B', text: '13/76' },
      { letter: 'C', text: '15/703' },
      { letter: 'D', text: '30/1406' },
      { letter: 'E', text: '13/38' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'For multiple events, multiply the probabilities. Without replacement means the total decreases.\n\nStep 1: First selection probability\nP(red first) = 10/38\n\nStep 2: Second selection probability\nAfter removing one candy, 37 remain\nP(green second) = 3/37\n\nStep 3: Multiply probabilities\nP(red AND green) = (10/38) × (3/37)\nP(red AND green) = 30/1406\n\nStep 4: Simplify\n30/1406 = 15/703\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Geometric Probability with Area',
    problem_text: 'A square dartboard has sides of length 10 inches. A circular target with radius 3 inches is painted in the center. If a dart lands randomly on the board, what is the probability it hits the circular target?',
    choices: [
      { letter: 'A', text: '9π/100' },
      { letter: 'B', text: '3π/100' },
      { letter: 'C', text: '9/100' },
      { letter: 'D', text: '3π/10' },
      { letter: 'E', text: '9π/10' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'For geometric probability, use areas: Probability = Desired Area ÷ Total Area\n\nStep 1: Find area of square board\nArea = 10 × 10 = 100 square inches\n\nStep 2: Find area of circular target\nArea = πr² = π(3)² = 9π square inches\n\nStep 3: Calculate probability\nProbability = 9π/100\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'OR Rule for Multiple Possibilities',
    problem_text: 'From the bag of 38 candies (18 blue, 10 red, 5 yellow, 3 green, 2 pink), what is the probability of selecting either a red candy OR a yellow candy?',
    choices: [
      { letter: 'A', text: '5/38' },
      { letter: 'B', text: '10/38' },
      { letter: 'C', text: '13/38' },
      { letter: 'D', text: '15/38' },
      { letter: 'E', text: '18/38' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'For "or" scenarios with mutually exclusive events, add the probabilities OR count total desired outcomes.\n\nMethod 1: Add probabilities\nP(red) = 10/38\nP(yellow) = 5/38\nP(red OR yellow) = 10/38 + 5/38 = 15/38\n\nMethod 2: Count directly (faster!)\nRed candies = 10\nYellow candies = 5\nTotal red or yellow = 15\nProbability = 15/38\n\nThe answer is D.',
    is_worked_example: false
  }
];

for (const example of examples) {
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-6.2-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '6.2')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 6.2');
}

console.log('\n✅ Topic 6.2 - Probability complete!');
