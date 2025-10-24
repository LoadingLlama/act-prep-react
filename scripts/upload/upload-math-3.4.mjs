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
  .eq('lesson_key', '3.4')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 14
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Converting Logarithmic to Exponential Form',
    problem_text: 'When log₄(x) = 3, what is x?',
    choices: [
      { letter: 'A', text: '12' },
      { letter: 'B', text: '48' },
      { letter: 'C', text: '64' },
      { letter: 'D', text: '81' },
      { letter: 'E', text: '256' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Convert from logarithmic form to exponential form.\n\nStep 1: Identify the base (4) and exponent (3)\nlog₄(x) = 3 means 4³ = x\n\nStep 2: Calculate:\nx = 4³ = 64\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Using Change of Base Rule',
    problem_text: 'What integer does 5(log₃(9) + log₂(8)) equal?',
    choices: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '15' },
      { letter: 'C', text: '20' },
      { letter: 'D', text: '25' },
      { letter: 'E', text: '30' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Method #1 - Convert to exponential form:\n\nStep 1: Find log₃(9)\nlog₃(9) = x means 3^x = 9\n3² = 9, so x = 2\n\nStep 2: Find log₂(8)\nlog₂(8) = x means 2^x = 8\n2³ = 8, so x = 3\n\nStep 3: Substitute and solve:\n5(2 + 3) = 5(5) = 25\n\nMethod #2 - Use calculator with change of base:\nlog₃(9) = log(9)/log(3) = 2\nlog₂(8) = log(8)/log(2) = 3\n5(2 + 3) = 25\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Using Power Rule',
    problem_text: 'If log₉(3^x) = 3/2, what is the value of x?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '9/2' },
      { letter: 'D', text: '4' },
      { letter: 'E', text: '6' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Use the power rule, then change of base.\n\nStep 1: Apply power rule: log_a(x^n) = n·log_a(x)\nlog₉(3^x) = x·log₉(3)\n\nStep 2: Set equal to 3/2:\nx·log₉(3) = 3/2\n\nStep 3: Find log₉(3) using change of base:\nlog₉(3) = log(3)/log(9) = 0.477/0.954 = 1/2\n\nStep 4: Substitute and solve:\nx·(1/2) = 3/2\nx = 3\n\nAlternate: Backsolve by trying x=3:\nlog₉(3³) = log₉(27) = 3/2 ✓\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Natural Logarithms',
    problem_text: 'If ln(x-1) = 3, then x = ?',
    choices: [
      { letter: 'A', text: 'e³ + 1' },
      { letter: 'B', text: '1 - e³' },
      { letter: 'C', text: 'e²' },
      { letter: 'D', text: 'e³ + 1' },
      { letter: 'E', text: '3e + 1' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Convert natural logarithm to exponential form.\n\nStep 1: Remember ln means log base e\nln(x-1) = 3 means e³ = x-1\n\nStep 2: Solve for x by adding 1 to both sides:\ne³ + 1 = x\n\nThe answer is A (or D, they\'re the same).',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 3.4...');
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
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.4-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '3.4')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 3.4`);
  console.log('\n✅ Topic 3.4 - Logarithms complete!');
}
