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
  .eq('lesson_key', '6.1')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 12
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Finding a Missing Value with Mean',
    problem_text: 'Five students averaged 24 points on a quiz. The first four students received scores of 22, 28, 17, and 25. What was the score of the fifth student?',
    choices: [
      { letter: 'A', text: '24' },
      { letter: 'B', text: '26' },
      { letter: 'C', text: '28' },
      { letter: 'D', text: '29' },
      { letter: 'E', text: '30' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Set up the average equation and solve for the missing value.\\n\\nStep 1: Set up equation\\nLet x = fifth student score\\nAverage = Sum ÷ Number of Items\\n24 = (22 + 28 + 17 + 25 + x) ÷ 5\\n\\nStep 2: Simplify\\n24 = (92 + x) ÷ 5\\n\\nStep 3: Multiply both sides by 5\\n120 = 92 + x\\n\\nStep 4: Solve for x\\nx = 120 - 92 = 28\\n\\nThe fifth student scored 28 points.\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Combining Averages from Multiple Groups',
    problem_text: 'Period 1 has 6 students with an average score of 85. Period 2 has 9 students with an average score of 90. What is the average score for all students combined?',
    choices: [
      { letter: 'A', text: '86' },
      { letter: 'B', text: '87' },
      { letter: 'C', text: '88' },
      { letter: 'D', text: '89' },
      { letter: 'E', text: '90' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Find total points for each group, add them, then divide by total students.\\n\\nStep 1: Find total points for Period 1\\nSum = Average × Number of Items\\nSum₁ = 85 × 6 = 510 points\\n\\nStep 2: Find total points for Period 2\\nSum₂ = 90 × 9 = 810 points\\n\\nStep 3: Calculate combined average\\nCombined Average = Total Points ÷ Total Students\\nCombined Average = (510 + 810) ÷ (6 + 9)\\nCombined Average = 1320 ÷ 15 = 88\\n\\nWARNING: Do NOT just average the averages!\\n(85 + 90) ÷ 2 = 87.5 is WRONG because the groups have different sizes.\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Finding the Median',
    problem_text: 'What is the median of the following set of numbers: {4, 1, 9, 3, 7, 6}?',
    choices: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '4.5' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '5.5' },
      { letter: 'E', text: '6' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Order the data, then find the middle value(s).\\n\\nStep 1: Order from smallest to largest\\n{1, 3, 4, 6, 7, 9}\\n\\nStep 2: Count the values\\nThere are 6 values (even number).\\n\\nStep 3: Find the two middle values\\nThe 3rd and 4th values are in the middle.\\n3rd value = 4\\n4th value = 6\\n\\nStep 4: Average the two middle values\\nMedian = (4 + 6) ÷ 2 = 10 ÷ 2 = 5\\n\\nRemember: With an even number of values, the median is the AVERAGE of the two middle values!\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Mode and Range',
    problem_text: 'For the data set {3, 7, 5, 9, 5, 12, 5, 8}, what are the mode and range?',
    choices: [
      { letter: 'A', text: 'Mode = 5, Range = 9' },
      { letter: 'B', text: 'Mode = 5, Range = 15' },
      { letter: 'C', text: 'Mode = 7, Range = 9' },
      { letter: 'D', text: 'Mode = 8, Range = 9' },
      { letter: 'E', text: 'Mode = 12, Range = 15' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Find the most frequent value (mode) and the difference between max and min (range).\\n\\nStep 1: Find mode (most frequent value)\\nCount each value:\\n3 appears 1 time\\n5 appears 3 times ← most frequent\\n7 appears 1 time\\n8 appears 1 time\\n9 appears 1 time\\n12 appears 1 time\\n\\nMode = 5\\n\\nStep 2: Find range\\nMaximum = 12\\nMinimum = 3\\nRange = Max - Min = 12 - 3 = 9\\n\\nStep 3: Check answer choices\\nMode = 5, Range = 9\\n\\nThe answer is A.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 6.1...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-6.1-v1.html', 'utf8');

console.log('\\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '6.1')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 6.1`);
  console.log('\\n✅ Topic 6.1 - Mean, Median, Mode complete!');
}
