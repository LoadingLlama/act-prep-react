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
  .eq('lesson_key', 'transforming-functions')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 33
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Vertical Shift of a Line',
    problem_text: 'The graph of 4x + 2y = 26 is shifted up 4 units. What is the y-coordinate of the resulting y-intercept?',
    choices: [
      { letter: 'A', text: '13' },
      { letter: 'B', text: '17' },
      { letter: 'C', text: '22' },
      { letter: 'D', text: '30' },
      { letter: 'E', text: '34' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Find the original y-intercept, then apply the vertical shift.\\n\\nStep 1: Convert to slope-intercept form\\n4x + 2y = 26\\n2y = -4x + 26\\ny = -2x + 13\\n\\nStep 2: Identify original y-intercept\\nThe y-intercept is at (0, 13).\\n\\nStep 3: Apply vertical shift\\nShifting up 4 units means adding 4 to the y-coordinate: 13 + 4 = 17.\\n\\nThe new y-intercept is (0, 17).\\n\\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Horizontal Shift of Parabola',
    problem_text: 'The function f(x) = x² is transformed to g(x) = (x - 3)². How does the graph of g(x) compare to f(x)?',
    choices: [
      { letter: 'A', text: 'Shifted 3 units left' },
      { letter: 'B', text: 'Shifted 3 units right' },
      { letter: 'C', text: 'Shifted 3 units up' },
      { letter: 'D', text: 'Shifted 3 units down' },
      { letter: 'E', text: 'Stretched vertically by factor of 3' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Apply the horizontal shift rule.\\n\\nRule: Numbers inside parentheses shift horizontally with OPPOSITE sign.\\n\\nStep 1: Identify the transformation\\ng(x) = (x - 3)² has "-3" inside the parentheses.\\n\\nStep 2: Apply the rule\\nSubtraction inside parentheses → shift RIGHT\\nThe graph shifts 3 units to the RIGHT.\\n\\nStep 3: Verify\\nThe vertex of f(x) = x² is at (0, 0).\\nThe vertex of g(x) = (x - 3)² is at (3, 0).\\nThis confirms a shift 3 units right.\\n\\nRemember: The sign is OPPOSITE what you expect!\\n\\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Vertical Stretch and Reflection',
    problem_text: 'If f(x) = x², which transformation produces g(x) = -2x²?',
    choices: [
      { letter: 'A', text: 'Reflection over x-axis only' },
      { letter: 'B', text: 'Vertical stretch by factor of 2 only' },
      { letter: 'C', text: 'Reflection over x-axis and vertical stretch by factor of 2' },
      { letter: 'D', text: 'Horizontal shift left 2 units' },
      { letter: 'E', text: 'Vertical shift down 2 units' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Identify both transformations from the coefficient.\\n\\nStep 1: Identify the negative sign\\nThe negative sign causes reflection over the x-axis.\\n\\nStep 2: Identify the coefficient\\nThe coefficient 2 (absolute value of -2) causes vertical stretch by factor of 2.\\n\\nStep 3: Combined effect\\ng(x) = -2x² applies BOTH transformations:\\n- Flips the parabola upside down (opens downward)\\n- Stretches it vertically by factor of 2 (makes it narrower)\\n\\nExample: For x = 1:\\nf(1) = 1² = 1\\ng(1) = -2(1)² = -2\\nThe point (1, 1) becomes (1, -2) — flipped and stretched.\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Multiple Transformations Combined',
    problem_text: 'The function f(x) = x² is transformed to g(x) = -(x + 1)² + 3. Which transformations were applied?',
    choices: [
      { letter: 'A', text: 'Left 1, up 3' },
      { letter: 'B', text: 'Right 1, down 3, reflection' },
      { letter: 'C', text: 'Left 1, up 3, reflection' },
      { letter: 'D', text: 'Right 1, up 3, reflection' },
      { letter: 'E', text: 'Left 1, down 3' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Identify each transformation systematically.\\n\\nStep 1: Horizontal shift\\n(x + 1) inside parentheses → shift LEFT 1 unit\\n(Remember: opposite sign!)\\n\\nStep 2: Vertical reflection\\nNegative sign in front → flip over x-axis\\n\\nStep 3: Vertical shift\\n+ 3 outside → shift UP 3 units\\n\\nStep 4: Combined transformations\\nStarting from f(x) = x²:\\n- Shift left 1 unit: (x + 1)²\\n- Flip vertically: -(x + 1)²\\n- Shift up 3 units: -(x + 1)² + 3\\n\\nVertex moved from (0, 0) to (-1, 3) and opens downward.\\n\\nThe answer is C.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 4.4...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-4.4-v1.html', 'utf8');

console.log('\\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'transforming-functions')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 4.4`);
  console.log('\\n✅ Topic 4.4 - Transforming Functions complete!');
}
