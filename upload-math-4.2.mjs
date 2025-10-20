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
  .eq('lesson_key', 'quadratics')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 16
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'FOILing Perfect Squares',
    problem_text: 'Which of the following is equivalent to (2x + 3)² + 4x?',
    choices: [
      { letter: 'A', text: '4x² + 16x + 9' },
      { letter: 'B', text: '4x² + 4x + 9' },
      { letter: 'C', text: '2x² + 4x + 3' },
      { letter: 'D', text: '6x² + 9' },
      { letter: 'E', text: '4x² + 12x + 9' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'FOIL the perfect square first, then add 4x.\\n\\nStep 1: Expand (2x + 3)²\\n(2x + 3)² = (2x + 3)(2x + 3)\\nF: 2x · 2x = 4x²\\nO: 2x · 3 = 6x\\nI: 3 · 2x = 6x\\nL: 3 · 3 = 9\\nResult: 4x² + 12x + 9\\n\\nStep 2: Add 4x\\n4x² + 12x + 9 + 4x = 4x² + 16x + 9\\n\\nCommon mistake: (2x + 3)² ≠ 4x² + 9. You MUST FOIL!\\n\\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Finding Sum of Roots',
    problem_text: 'What is the sum of the roots of the polynomial f(x) = x² - 11x + 18?',
    choices: [
      { letter: 'A', text: '-11' },
      { letter: 'B', text: '-7' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '11' },
      { letter: 'E', text: '18' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Find roots by factoring, then add them.\\n\\nStep 1: Set equal to zero\\nx² - 11x + 18 = 0\\n\\nStep 2: Factor\\nNeed two numbers that multiply to 18 and add to -11\\nThose numbers are -2 and -9\\n(x - 2)(x - 9) = 0\\n\\nStep 3: Set each factor to zero\\nx - 2 = 0 → x = 2\\nx - 9 = 0 → x = 9\\n\\nStep 4: Sum the roots\\n2 + 9 = 11\\n\\nRemember: roots = solutions = zeros = x-intercepts (all the same thing!)\\n\\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Using Quadratic Formula',
    problem_text: 'Which of the following is a zero for the function f(x) = x² - 8x + 4?',
    choices: [
      { letter: 'A', text: '8 + 4√2' },
      { letter: 'B', text: '4 - 2√3' },
      { letter: 'C', text: '4 + 2√3' },
      { letter: 'D', text: '-8 + 4√3' },
      { letter: 'E', text: '8 - 2√3' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use quadratic formula since this does not factor easily.\\n\\nFormula: x = (-b ± √(b² - 4ac)) / (2a)\\nFor x² - 8x + 4: a = 1, b = -8, c = 4\\n\\nStep 1: Plug in values\\nx = (8 ± √(64 - 16)) / 2\\n\\nStep 2: Simplify under radical\\nx = (8 ± √48) / 2\\n\\nStep 3: Simplify √48 = √(16·3) = 4√3\\nx = (8 ± 4√3) / 2\\n\\nStep 4: Divide all terms by 2\\nx = 4 ± 2√3\\n\\nBoth solutions: x = 4 + 2√3 and x = 4 - 2√3\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Using the Discriminant',
    problem_text: 'How many real roots are there to the equation 2x² - 7x + 9 = 0?',
    choices: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '3' },
      { letter: 'E', text: '4' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Use the discriminant to determine number of real solutions.\\n\\nDiscriminant: b² - 4ac\\nFor 2x² - 7x + 9: a = 2, b = -7, c = 9\\n\\nStep 1: Calculate discriminant\\nb² - 4ac = (-7)² - 4(2)(9)\\n= 49 - 72\\n= -23\\n\\nStep 2: Interpret result\\nSince -23 < 0 (negative), there are 0 real roots\\n\\nDiscriminant Rules:\\n• Positive → 2 real solutions\\n• Zero → 1 real solution\\n• Negative → 0 real solutions (2 complex)\\n\\nThe answer is A.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 4.2...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-4.2-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'quadratics')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 4.2`);
  console.log('\n✅ Topic 4.2 - Quadratics complete!');
}
