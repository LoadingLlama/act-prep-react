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
  .eq('lesson_key', 'sequences')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 24
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Arithmetic Sequence - Finding a Term',
    problem_text: 'In a certain arithmetic sequence, the 1st and 4th terms are 3 and 24 respectively. What is the 5th term of the arithmetic sequence?',
    choices: [
      { letter: 'A', text: '27' },
      { letter: 'B', text: '30' },
      { letter: 'C', text: '31' },
      { letter: 'D', text: '37' },
      { letter: 'E', text: '45' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Draw out the sequence and find the common difference.\\n\\nStep 1: Draw the sequence\\n3 → ? → ? → 24 → ?\\n(1st) (2nd) (3rd) (4th) (5th)\\n\\nStep 2: Find common difference\\nFrom 1st to 4th term, we add d three times.\\nTotal difference: 24 - 3 = 21\\nCommon difference: d = 21 ÷ 3 = 7\\n\\nStep 3: Find 5th term\\n5th term = 24 + 7 = 31\\n\\nRemember: Draw the sequence first to visualize the jumps!\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Arithmetic Sequence - Using the Formula',
    problem_text: 'The 3rd and 5th terms in an arithmetic sequence are -4 and 11 respectively. What is the 45th term of this sequence?',
    choices: [
      { letter: 'A', text: '311' },
      { letter: 'B', text: '318.5' },
      { letter: 'C', text: '326' },
      { letter: 'D', text: '329' },
      { letter: 'E', text: '334' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Find the common difference, then use the formula.\\n\\nStep 1: Find common difference\\nFrom 3rd to 5th term, we add d two times.\\nTotal difference: 11 - (-4) = 15\\nCommon difference: d = 15 ÷ 2 = 7.5\\n\\nStep 2: Find the 1st term\\nWork backward from 3rd term:\\n3rd term = -4\\n2nd term = -4 - 7.5 = -11.5\\n1st term = -11.5 - 7.5 = -19\\n\\nStep 3: Use formula\\ntₙ = t₁ + d(n - 1)\\nt₄₅ = -19 + 7.5(45 - 1)\\nt₄₅ = -19 + 7.5(44)\\nt₄₅ = -19 + 330 = 311\\n\\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Geometric Sequence - Finding a Term',
    problem_text: 'The 1st term in a geometric sequence is 560 and the 2nd term is -280. What is the 5th term of the geometric sequence?',
    choices: [
      { letter: 'A', text: '-70' },
      { letter: 'B', text: '-35' },
      { letter: 'C', text: '35' },
      { letter: 'D', text: '70' },
      { letter: 'E', text: '140' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Find the common ratio and multiply to get the 5th term.\\n\\nStep 1: Find common ratio\\nr = (2nd term) ÷ (1st term)\\nr = -280 ÷ 560 = -1/2\\n\\nStep 2: Build the sequence\\n1st term: 560\\n2nd term: 560 × (-1/2) = -280\\n3rd term: -280 × (-1/2) = 140\\n4th term: 140 × (-1/2) = -70\\n5th term: -70 × (-1/2) = 35\\n\\nAlternative: Use formula\\nt₅ = 560 × (-1/2)⁴ = 560 × (1/16) = 35\\n\\nNote: (-1/2)⁴ = positive because even exponent!\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Recursive Sequence - Building Terms',
    problem_text: 'A sequence is defined for all integers by sₙ = 3sₙ₋₁ + 2, with s₁ = 4. What is s₃?',
    choices: [
      { letter: 'A', text: '14' },
      { letter: 'B', text: '20' },
      { letter: 'C', text: '38' },
      { letter: 'D', text: '44' },
      { letter: 'E', text: '50' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Apply the recursive formula step by step.\\n\\nStep 1: Find s₂ using s₁\\nsₙ = 3sₙ₋₁ + 2\\ns₂ = 3s₁ + 2\\ns₂ = 3(4) + 2\\ns₂ = 12 + 2 = 14\\n\\nStep 2: Find s₃ using s₂\\ns₃ = 3s₂ + 2\\ns₃ = 3(14) + 2\\ns₃ = 42 + 2 = 44\\n\\nRemember: For recursive sequences, you MUST work forward term by term. You cannot skip ahead!\\n\\nThe answer is D.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 4.6...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-4.6-v1.html', 'utf8');

console.log('\\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'sequences')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 4.6`);
  console.log('\\n✅ Topic 4.6 - Sequences complete!');
}
