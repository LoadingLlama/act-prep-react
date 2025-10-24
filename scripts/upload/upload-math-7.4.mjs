import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID (using 'vectors' key)
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'vectors')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 7.4...\n');

// Create examples from Chapter 32
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Basic Vector Addition',
    problem_text: 'What is the sum of vectors (2, 5) and (-6, 8)?',
    choices: [
      { letter: 'A', text: '(8, 13)' },
      { letter: 'B', text: '(-4, 13)' },
      { letter: 'C', text: '(-8, -3)' },
      { letter: 'D', text: '(-4, 3)' },
      { letter: 'E', text: '(4, -13)' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Add vectors by combining like terms.\n\nStep 1: Identify components\nVector 1: (2, 5)\nVector 2: (-6, 8)\n\nStep 2: Add x-components (A values)\n2 + (-6) = -4\n\nStep 3: Add y-components (B values)\n5 + 8 = 13\n\nStep 4: Write final answer\n(-4, 13)\n\nRemember: Just combine like terms!\nx-components together\ny-components together\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Vector Subtraction with Coefficients',
    problem_text: 'The vectors A and B can be written as 5i - j and 12i - 4j respectively. If vector C is equal to 2A - B, which of the following represents vector C?',
    choices: [
      { letter: 'A', text: '22i - 6j' },
      { letter: 'B', text: '10i - 2j' },
      { letter: 'C', text: '-2i + 2j' },
      { letter: 'D', text: '2i - 6j' },
      { letter: 'E', text: '-2i - 2j' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Distribute coefficients, then combine like terms.\n\nStep 1: Find 2A by distributing\nA = 5i - j\n2A = 2(5i - j)\n= 10i - 2j\n\nStep 2: Set up subtraction\nC = 2A - B\n= (10i - 2j) - (12i - 4j)\n\nStep 3: CRITICAL - Distribute the negative\n= 10i - 2j - 12i + 4j\n\nStep 4: Combine like terms\ni terms: 10i - 12i = -2i\nj terms: -2j + 4j = 2j\n\nStep 5: Write final answer\nC = -2i + 2j\n\nCOMMON MISTAKE:\nForgetting to distribute the negative:\n(10i - 2j) - (12i - 4j)\n= 10i - 2j - 12i - 4j ✗ (wrong!)\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Vector Addition in Standard Form',
    problem_text: 'The vector 4i + 5j is added to the vector -2i + 6j. What is the sum of the two vectors?',
    choices: [
      { letter: 'A', text: '2i - j' },
      { letter: 'B', text: '2i + 11j' },
      { letter: 'C', text: '4i + 11j' },
      { letter: 'D', text: '6i + 11j' },
      { letter: 'E', text: '2i + j' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Combine like terms in standard form.\n\nStep 1: Set up addition\n(4i + 5j) + (-2i + 6j)\n\nStep 2: Group like terms\n= 4i + (-2i) + 5j + 6j\n\nStep 3: Combine i terms (x-components)\n4i + (-2i) = 2i\n\nStep 4: Combine j terms (y-components)\n5j + 6j = 11j\n\nStep 5: Write final answer\n2i + 11j\n\nPattern for standard form:\nCombine all i terms together\nCombine all j terms together\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Vector with Multiple Coefficients',
    problem_text: 'Given that u and v are vectors such that u = (7, 1) and v = (2, 8), what is the component form of the vector 2u + 3v?',
    choices: [
      { letter: 'A', text: '(9, 9)' },
      { letter: 'B', text: '(16, 10)' },
      { letter: 'C', text: '(18, 18)' },
      { letter: 'D', text: '(20, 26)' },
      { letter: 'E', text: '(22, 32)' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Distribute coefficients to each vector first.\n\nStep 1: Find 2u by distributing\nu = (7, 1)\n2u = 2(7, 1) = (14, 2)\n\nStep 2: Find 3v by distributing\nv = (2, 8)\n3v = 3(2, 8) = (6, 24)\n\nStep 3: Add the results\n2u + 3v = (14, 2) + (6, 24)\n\nStep 4: Combine x-components\n14 + 6 = 20\n\nStep 5: Combine y-components\n2 + 24 = 26\n\nStep 6: Write final answer\n(20, 26)\n\nProcess:\n1. Distribute coefficients first\n2. Then add/subtract vectors\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Magnitude of a Vector',
    problem_text: 'Vince is drawing a vector on the standard (x, y) coordinate plane to show a bus driving 45° north of east at 36 miles per hour. If each coordinate unit represents 1 mile per hour, what is the magnitude of the vector?',
    choices: [
      { letter: 'A', text: '18' },
      { letter: 'B', text: '18√2' },
      { letter: 'C', text: '36' },
      { letter: 'D', text: '36√2' },
      { letter: 'E', text: '72' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Magnitude represents the speed.\n\nStep 1: Understand the question\nThe bus is traveling at 36 mph\nMagnitude = speed = 36 mph\n\nStep 2: Check units\n"Each coordinate unit represents 1 mile per hour"\nSo magnitude = 36 units\n\nStep 3: Answer\nMagnitude = 36\n\nKEY INSIGHT:\nMagnitude is the LENGTH of the vector\nIt represents the speed (36 mph)\nDirection (45° north of east) doesn\'t change magnitude\n\nAlternate approach using formula:\nIf vector is at 45° with magnitude 36:\nx-component = 36 cos(45°) = 36(√2/2) = 18√2\ny-component = 36 sin(45°) = 36(√2/2) = 18√2\nMagnitude = √((18√2)² + (18√2)²)\n= √(648 + 648) = √1296 = 36 ✓\n\nBut simpler: magnitude = speed = 36\n\nThe answer is C.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-7.4-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'vectors')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 7.4');
}

console.log('\n✅ Topic 7.4 - Vectors complete!');
