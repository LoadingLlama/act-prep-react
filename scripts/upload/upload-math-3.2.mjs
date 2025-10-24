import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// 1. Create glossary terms
const terms = [
  {
    term: 'common denominator',
    definition: 'A shared denominator used when adding or subtracting fractions. To combine fractions, they must have the same denominator.',
    lesson_key: '3.2'
  },
  {
    term: 'reciprocal',
    definition: 'The multiplicative inverse of a number. For a fraction a/b, the reciprocal is b/a. Multiplying a number by its reciprocal equals 1.',
    lesson_key: '3.2'
  },
  {
    term: 'complex fraction',
    definition: 'A fraction that contains one or more fractions in its numerator, denominator, or both. Example: (1/2)/(3/4)',
    lesson_key: '3.2'
  },
  {
    term: 'least common denominator',
    definition: 'The smallest number that is a multiple of all denominators in a set of fractions. Used to efficiently combine fractions with different denominators.',
    lesson_key: '3.2'
  }
];

console.log('Creating glossary terms for Topic 3.2...');
for (const term of terms) {
  const { error } = await supabase
    .from('lesson_term_definitions')
    .insert(term);

  if (error && error.code !== '23505') {
    console.error(`Error creating term "${term.term}":`, error.message);
  } else if (error && error.code === '23505') {
    console.log(`Term "${term.term}" already exists, skipping...`);
  } else {
    console.log(`✓ Created term: ${term.term}`);
  }
}

// 2. Get lesson ID for examples
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', '3.2')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// 3. Create examples
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Adding Fractions with Different Denominators',
    problem_text: 'What is the value of 2/3 + 3/4?',
    choices: [
      { letter: 'A', text: '5/7' },
      { letter: 'B', text: '5/12' },
      { letter: 'C', text: '17/12' },
      { letter: 'D', text: '6/12' },
      { letter: 'E', text: '1' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Step 1: Find the least common denominator (LCD). The LCD of 3 and 4 is 12.\n\nStep 2: Convert each fraction to have denominator 12:\n• 2/3 = 8/12 (multiply top and bottom by 4)\n• 3/4 = 9/12 (multiply top and bottom by 3)\n\nStep 3: Add the numerators: 8/12 + 9/12 = 17/12\n\nThe answer is 17/12, which is an improper fraction (this is fine for the ACT).',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Dividing Fractions',
    problem_text: 'What is (3/5) ÷ (2/7)?',
    choices: [
      { letter: 'A', text: '6/35' },
      { letter: 'B', text: '21/10' },
      { letter: 'C', text: '10/21' },
      { letter: 'D', text: '5/14' },
      { letter: 'E', text: '14/5' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Use the "Keep, Flip, Change" method:\n\nStep 1: KEEP the first fraction: 3/5\n\nStep 2: FLIP the second fraction (take the reciprocal): 2/7 becomes 7/2\n\nStep 3: CHANGE division to multiplication: (3/5) × (7/2)\n\nStep 4: Multiply across: (3 × 7)/(5 × 2) = 21/10\n\nThe answer is 21/10.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Complex Fractions',
    problem_text: 'Simplify: (1/2)/(3/4)',
    choices: [
      { letter: 'A', text: '3/8' },
      { letter: 'B', text: '2/3' },
      { letter: 'C', text: '4/6' },
      { letter: 'D', text: '6/4' },
      { letter: 'E', text: '8/3' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'A complex fraction is just division in disguise!\n\nStep 1: Rewrite as division: (1/2) ÷ (3/4)\n\nStep 2: Use "Keep, Flip, Change":\n• KEEP: 1/2\n• FLIP: 3/4 becomes 4/3\n• CHANGE to multiplication: (1/2) × (4/3)\n\nStep 3: Multiply: (1 × 4)/(2 × 3) = 4/6 = 2/3\n\nThe answer is 2/3.',
    is_worked_example: false
  }
];

console.log('\nCreating examples for Topic 3.2...');
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

// 4. Upload HTML content
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.2-v1.html', 'utf8');

console.log('\nUploading lesson content...');
const { error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '3.2');

if (updateError) {
  console.error('Error uploading content:', updateError);
} else {
  console.log(`✓ Uploaded ${content.length} characters for Topic 3.2`);
  console.log('\n✅ Topic 3.2 - Fractions complete!');
}
