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
  .eq('lesson_key', '3.5')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Solving Inequality with Negative Division',
    problem_text: 'Which of the following inequalities describes the solution set for 6x + 12 < 9x + 17?',
    choices: [
      { letter: 'A', text: 'x > -29/5' },
      { letter: 'B', text: 'x ≤ -29/5' },
      { letter: 'C', text: 'x ≤ -5/3' },
      { letter: 'D', text: 'x ≥ -5/3' },
      { letter: 'E', text: 'x > -5/3' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Move all x-terms to left, all numbers to right.\n\nStep 1: Subtract 9x from both sides:\n6x - 9x + 12 < 17\n-3x + 12 < 17\n\nStep 2: Subtract 12 from both sides:\n-3x < 5\n\nStep 3: Divide by -3 (FLIP THE SIGN!):\nx ≥ -5/3\n\nRemember: When dividing by a negative, flip the inequality sign.\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Graphing Inequality on Number Line',
    problem_text: 'Which graph shows the solution set for 2x - 4 ≥ -x + 6?',
    choices: [
      { letter: 'A', text: 'Open circle at 10/3, shading left' },
      { letter: 'B', text: 'Solid circle at 10/3, shading left' },
      { letter: 'C', text: 'Solid circle at 10/3, shading right' },
      { letter: 'D', text: 'Open circle at 10/3, shading right' },
      { letter: 'E', text: 'Solid circle at 2, shading right' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Solve the inequality, then graph.\n\nStep 1: Add x to both sides:\n2x + x - 4 ≥ 6\n3x - 4 ≥ 6\n\nStep 2: Add 4 to both sides:\n3x ≥ 10\n\nStep 3: Divide by 3 (positive, so sign stays same):\nx ≥ 10/3\n\nStep 4: Graph on number line:\n- Use SOLID circle (because of ≥)\n- Shade to the RIGHT (because x is greater than 10/3)\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Graphing Linear Inequality',
    problem_text: 'Which of the following describes how to graph y < 2x - 4?',
    choices: [
      { letter: 'A', text: 'Solid line, shade above' },
      { letter: 'B', text: 'Solid line, shade below' },
      { letter: 'C', text: 'Dashed line, shade above' },
      { letter: 'D', text: 'Dashed line, shade below' },
      { letter: 'E', text: 'Solid line through origin' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Determine line type and shading direction.\n\nStep 1: Line type\nSince the inequality is < (less than, NOT less than or equal to), use a DASHED line.\nStrict inequalities (< and >) always use dashed lines.\n\nStep 2: Shading\nSince the inequality is y < (something), shade BELOW the line.\n"Less than" means the y-values are smaller, which is below the line.\n\nThe answer is D: dashed line, shade below.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 3.5...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.5-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '3.5')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 3.5`);
  console.log('\n✅ Topic 3.5 - Inequalities complete!');
}
