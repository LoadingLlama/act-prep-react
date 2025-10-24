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
  .eq('lesson_key', 'systems-equations')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 15
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Using Elimination Method',
    problem_text: 'If 10x - 4y = 16 and 2x + 4y = 8, what is the value of y?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '8' },
      { letter: 'E', text: '12' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Use elimination to cancel out x.\\n\\nStep 1: Multiply the second equation by -5:\\n10x - 4y = 16\\n-10x - 20y = -40\\n\\nStep 2: Add the equations together (x cancels):\\n-24y = -24\\n\\nStep 3: Solve for y:\\ny = 1\\n\\nElimination is fastest when coefficients are already opposite or easy to make opposite.\\n\\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Using Substitution Method',
    problem_text: 'If 12x + 8y = 8 and y = 6x - 14, what does x equal?',
    choices: [
      { letter: 'A', text: '-2' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '7' },
      { letter: 'E', text: '10' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use substitution since y is already isolated.\\n\\nStep 1: Substitute (6x - 14) for y in first equation:\\n12x + 8(6x - 14) = 8\\n\\nStep 2: Distribute the 8:\\n12x + 48x - 112 = 8\\n\\nStep 3: Combine like terms:\\n60x - 112 = 8\\n\\nStep 4: Solve for x:\\n60x = 120\\nx = 2\\n\\nRemember: When one variable is already isolated (y = ...), always use substitution!\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Word Problem with Two Unknowns',
    problem_text: 'Mary buys 42 plants for a total of $108. She buys only tomato plants ($3 each) and pepper plants ($2 each). How many pepper plants did Mary buy?',
    choices: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '16' },
      { letter: 'D', text: '18' },
      { letter: 'E', text: '24' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Set up two equations and use elimination.\\n\\nStep 1: Define variables\\nLet x = tomato plants, y = pepper plants\\n\\nStep 2: Write equation for total plants:\\nx + y = 42\\n\\nStep 3: Write equation for total cost:\\n3x + 2y = 108\\n\\nStep 4: Use elimination (multiply first equation by -3):\\n-3x - 3y = -126\\n3x + 2y = 108\\n\\nStep 5: Add equations (x cancels):\\n-y = -18\\ny = 18\\n\\nWord problem tip: Look for \"total\" (gives you one equation) and \"cost\" (gives you another).\\n\\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Backsolving with 3 Unknowns',
    problem_text: 'The drama club sold 200 tickets for $2,025. Student tickets cost $7 and regular tickets cost $12. How many student tickets were sold?',
    choices: [
      { letter: 'A', text: '60' },
      { letter: 'B', text: '75' },
      { letter: 'C', text: '90' },
      { letter: 'D', text: '100' },
      { letter: 'E', text: '125' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Use elimination OR backsolve. Let us show both.\\n\\nMethod 1 - Algebra:\\nLet s = student tickets, r = regular tickets\\ns + r = 200\\n7s + 12r = 2025\\n\\nMultiply first by -7: -7s - 7r = -1400\\nAdd to second: 5r = 625 → r = 125\\nSo s = 200 - 125 = 75\\n\\nMethod 2 - Backsolve (faster!):\\nTry B) 75 student tickets\\nThen regular tickets = 200 - 75 = 125\\nCheck: 75(7) + 125(12) = 525 + 1500 = 2025 ✓\\n\\nFor problems with numerical answer choices asking \"how many\", backsolve is often fastest!\\n\\nThe answer is B.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 4.1...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-4.1-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'systems-equations')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 4.1`);
  console.log('\n✅ Topic 4.1 - Systems of Equations complete!');
}
