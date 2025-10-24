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
  .eq('lesson_key', '5.4')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 5.4...\n');

// Create examples from Chapter 29
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Simple Length Conversion',
    problem_text: 'A string that is 10 feet and 3 inches long is cut into three pieces of equal length. What is the length of each piece of string?',
    choices: [
      { letter: 'A', text: '3 feet 1 inch' },
      { letter: 'B', text: '3 feet 3 inches' },
      { letter: 'C', text: '3 feet 5 inches' },
      { letter: 'D', text: '3 feet 8 inches' },
      { letter: 'E', text: '4 feet 1 inch' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Convert all to one unit before dividing.\n\nStep 1: Convert 10 feet to inches\n10 feet × 12 inches/foot = 120 inches\n\nStep 2: Add the extra 3 inches\n120 + 3 = 123 inches total\n\nStep 3: Divide by 3 pieces\n123 ÷ 3 = 41 inches per piece\n\nStep 4: Convert back to feet and inches\n41 ÷ 12 = 3 remainder 5\n41 inches = 3 feet 5 inches\n\nCheck: 3 × 41 = 123 inches ✓\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Area Unit Conversion',
    problem_text: 'A tennis court is 78 feet long and 36 feet wide. What is the area, in square yards, of a tennis court?',
    choices: [
      { letter: 'A', text: '312' },
      { letter: 'B', text: '936' },
      { letter: 'C', text: '2,808' },
      { letter: 'D', text: '8,424' },
      { letter: 'E', text: '25,272' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'CRITICAL: Convert units BEFORE calculating area.\n\nStep 1: Convert length to yards\n78 feet × (1 yard / 3 feet) = 26 yards\n\nStep 2: Convert width to yards\n36 feet × (1 yard / 3 feet) = 12 yards\n\nStep 3: Calculate area\nArea = 26 × 12 = 312 square yards\n\nCOMMON MISTAKE:\nCalculating 78 × 36 = 2,808 sq ft first\nThen converting gives wrong answer\n\nAlways convert dimensions first!\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Dimensional Analysis with Rates',
    problem_text: 'The top speed of Andrew\'s toy car is 30 meters per second. What is the top speed of the toy car in kilometers per hour? (1 kilometer = 1,000 meters)',
    choices: [
      { letter: 'A', text: '1,800' },
      { letter: 'B', text: '500' },
      { letter: 'C', text: '108' },
      { letter: 'D', text: '90' },
      { letter: 'E', text: '18' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use dimensional analysis to convert units.\n\nStart: 30 meters / 1 second\n\nStep 1: Convert meters to kilometers\n(30 m / 1 s) × (1 km / 1,000 m)\n= 30 km / 1,000 s\n\nStep 2: Convert seconds to minutes\n(30 km / 1,000 s) × (60 s / 1 min)\n= 1,800 km / 1,000 min\n\nStep 3: Convert minutes to hours\n(1,800 km / 1,000 min) × (60 min / 1 hr)\n= 108,000 km / 1,000 hr\n\nStep 4: Simplify\n108,000 ÷ 1,000 = 108 km/hr\n\nAll units cancel correctly!\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Rate Problem with Mixed Units',
    problem_text: 'Erica bikes at an average speed of 24 miles per hour for 40 minutes. If Rosie bikes at an average speed of 18 miles per hour, approximately how many minutes does it take Rosie to bike the same distance that Erica biked in 40 minutes?',
    choices: [
      { letter: 'A', text: '53' },
      { letter: 'B', text: '56' },
      { letter: 'C', text: '60' },
      { letter: 'D', text: '67' },
      { letter: 'E', text: '72' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Find Erica\'s distance, then find Rosie\'s time.\n\nStep 1: Convert Erica\'s speed to miles/minute\n24 miles/hr × (1 hr / 60 min) = 0.4 miles/min\n\nStep 2: Find distance Erica travels\nDistance = 0.4 miles/min × 40 min = 16 miles\n\nStep 3: Convert Rosie\'s speed to miles/minute\n18 miles/hr × (1 hr / 60 min) = 0.3 miles/min\n\nStep 4: Find Rosie\'s time\nTime = 16 miles ÷ 0.3 miles/min = 53.3 minutes\n\nRounded: approximately 53 minutes\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Algebraic Unit Conversion',
    problem_text: 'A metal pipe that is p feet long will be cut into n pieces that are each x inches long. Which of the following expressions correctly describes the length, in inches, of each of the n pieces of pipe?',
    choices: [
      { letter: 'A', text: 'x = 12p/n' },
      { letter: 'B', text: 'x = p/n' },
      { letter: 'C', text: 'x = pn/12' },
      { letter: 'D', text: 'x = 12n/p' },
      { letter: 'E', text: 'x = n/12p' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Convert feet to inches, then divide by n pieces.\n\nMethod 1: Algebraic\nStep 1: Convert p feet to inches\np feet × (12 inches / 1 foot) = 12p inches\n\nStep 2: Divide by n pieces\nx = 12p / n inches per piece\n\nMethod 2: Substitution (faster!)\nLet p = 2 feet and n = 3 pieces\n\n2 feet × 12 = 24 inches\n24 ÷ 3 = 8 inches per piece\nSo x = 8\n\nTest answer A: x = 12p/n\n8 = 12(2)/3 = 24/3 = 8 ✓\n\nWorks!\n\nThe answer is A.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-5.4-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '5.4')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 5.4');
}

console.log('\n✅ Topic 5.4 - Unit Conversion complete!');
