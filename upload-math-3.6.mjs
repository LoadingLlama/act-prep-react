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
  .eq('lesson_key', '3.6')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 18
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Basic Absolute Value Operations',
    problem_text: 'What is the value of |2 + 11| - 2|3 - 5|?',
    choices: [
      { letter: 'A', text: '9' },
      { letter: 'B', text: '13' },
      { letter: 'C', text: '17' },
      { letter: 'D', text: '22' },
      { letter: 'E', text: '26' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Work inside the absolute value bars first.\\n\\nStep 1: Evaluate inside each absolute value\\n|2 + 11| = |13| = 13\\n|3 - 5| = |-2| = 2\\n\\nStep 2: Complete the rest of the expression\\n13 - 2(2) = 13 - 4 = 9\\n\\nRemember: Always complete operations INSIDE the absolute value bars before taking the absolute value.\\n\\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Solving Absolute Value Equation',
    problem_text: 'What is the solution set to 3|2x + 1| - 6 = 45?',
    choices: [
      { letter: 'A', text: '{-9}' },
      { letter: 'B', text: '{8}' },
      { letter: 'C', text: '{2, 8}' },
      { letter: 'D', text: '{-9, 8}' },
      { letter: 'E', text: '{-8, 9}' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Isolate the absolute value, then solve for both cases.\\n\\nStep 1: Add 6 to both sides\\n3|2x + 1| = 51\\n\\nStep 2: Divide by 3\\n|2x + 1| = 17\\n\\nStep 3: Set up two equations\\nCase 1: 2x + 1 = 17\\n2x = 16\\nx = 8\\n\\nCase 2: 2x + 1 = -17\\n2x = -18\\nx = -9\\n\\nStep 4: Solution set is {-9, 8}\\n\\nRemember: Absolute value equations with variables ALWAYS have two solutions!\\n\\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Absolute Value Inequality (Less Than Type)',
    problem_text: 'The set of all values of x that satisfies |x + 3| - 4 < 1 is the same as the set of all values of x that satisfies:',
    choices: [
      { letter: 'A', text: '0 < x < 2' },
      { letter: 'B', text: '0 < x < 5' },
      { letter: 'C', text: '-8 < x < 2' },
      { letter: 'D', text: '-8 < x < 5' },
      { letter: 'E', text: 'x < -8 and x > 2' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Isolate absolute value, then set up compound inequality.\\n\\nStep 1: Add 4 to both sides\\n|x + 3| < 5\\n\\nStep 2: Since this is "less than", the solution is BETWEEN -5 and 5\\nSet up: -5 < x + 3 < 5\\n\\nStep 3: Subtract 3 from all parts\\n-5 - 3 < x < 5 - 3\\n-8 < x < 2\\n\\nRemember: |x| < a means -a < x < a (between two values, one compound inequality)\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Absolute Value Inequality (Greater Than Type)',
    problem_text: 'The set of all values of x that satisfies |½x + 2| > 3 is the same as the set of all values of x that satisfies:',
    choices: [
      { letter: 'A', text: 'x < -10 and x > 2' },
      { letter: 'B', text: 'x < -5 and x > 5' },
      { letter: 'C', text: 'x < -10 and x > 0' },
      { letter: 'D', text: 'x > 2' },
      { letter: 'E', text: '-10 < x < 2' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Since this is "greater than", set up TWO separate inequalities.\\n\\nStep 1: The absolute value is already isolated\\n|½x + 2| > 3\\n\\nStep 2: Since this is "greater than", the solution is OUTSIDE -3 and 3\\nSet up two inequalities:\\n½x + 2 < -3  AND  ½x + 2 > 3\\n\\nStep 3: Solve each inequality\\nCase 1: ½x + 2 < -3\\n½x < -5\\nx < -10\\n\\nCase 2: ½x + 2 > 3\\n½x > 1\\nx > 2\\n\\nFinal answer: x < -10 AND x > 2\\n\\nRemember: |x| > a means x < -a AND x > a (outside, two separate inequalities)\\n\\nThe answer is A.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 3.6...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.6-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '3.6')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 3.6`);
  console.log('\n✅ Topic 3.6 - Absolute Value complete!');
}
