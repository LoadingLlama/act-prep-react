import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID (using 'matrices' key)
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'matrices')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 7.3...\n');

// Create examples from Chapter 19
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Matrix Addition',
    problem_text: 'What is the sum of [[1, 2], [3, 4]] and [[5, 6], [7, 8]]?',
    choices: [
      { letter: 'A', text: '[[6, 8], [10, 12]]' },
      { letter: 'B', text: '[[5, 12], [21, 32]]' },
      { letter: 'C', text: '[[6, 8]]' },
      { letter: 'D', text: '[[10, 12]]' },
      { letter: 'E', text: 'Undefined' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Add corresponding elements in each position.\n\nStep 1: Check dimensions\nBoth are (2 × 2) matrices\nDimensions match → addition is defined ✓\n\nStep 2: Add element by element\nPosition (1,1): 1 + 5 = 6\nPosition (1,2): 2 + 6 = 8\nPosition (2,1): 3 + 7 = 10\nPosition (2,2): 4 + 8 = 12\n\nStep 3: Write result\n[[6, 8], [10, 12]]\n\nResult has same dimensions (2 × 2)\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Scalar Multiplication',
    problem_text: 'What is 3 × [[2, 4], [6, 8]]?',
    choices: [
      { letter: 'A', text: '[[5, 7], [9, 11]]' },
      { letter: 'B', text: '[[6, 12], [18, 24]]' },
      { letter: 'C', text: '[[6, 12]]' },
      { letter: 'D', text: '[[2, 4], [6, 8]]' },
      { letter: 'E', text: '[[24]]' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Multiply every element by the scalar.\n\nStep 1: Identify scalar\nScalar = 3\n\nStep 2: Multiply each element by 3\nPosition (1,1): 3 × 2 = 6\nPosition (1,2): 3 × 4 = 12\nPosition (2,1): 3 × 6 = 18\nPosition (2,2): 3 × 8 = 24\n\nStep 3: Write result\n[[6, 12], [18, 24]]\n\nDimensions stay the same (2 × 2)\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Determinant of 2×2 Matrix',
    problem_text: 'What is the determinant of [[3, 5], [2, 4]]?',
    choices: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '2' },
      { letter: 'E', text: '-2' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use determinant formula: ad - bc.\n\nStep 1: Identify elements\nMatrix: [[a, b], [c, d]]\n= [[3, 5], [2, 4]]\na = 3, b = 5, c = 2, d = 4\n\nStep 2: Apply formula\ndet = ad - bc\n= (3)(4) - (5)(2)\n= 12 - 10\n= 2\n\nRemember the pattern:\nMultiply main diagonal (↘): 3 × 4\nSubtract other diagonal (↙): 5 × 2\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Matrix Multiplication - Defined or Undefined',
    problem_text: 'If matrix A is (2 × 3) and matrix B is (2 × 2), is AB defined?',
    choices: [
      { letter: 'A', text: 'Yes, result is (2 × 2)' },
      { letter: 'B', text: 'Yes, result is (2 × 3)' },
      { letter: 'C', text: 'Yes, result is (3 × 2)' },
      { letter: 'D', text: 'No, undefined' },
      { letter: 'E', text: 'Yes, result is (4 × 6)' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Check if middle numbers match.\n\nStep 1: Write dimensions\nAB = (2 × 3) × (2 × 2)\n\nStep 2: Box middle numbers\n(2 × [3) × (2] × 2)\n\nStep 3: Check if they match\nMiddle numbers: 3 and 2\n3 ≠ 2 → They do NOT match!\n\nStep 4: Conclusion\nAB is UNDEFINED\n\nRule: Number of columns in first matrix\nmust equal number of rows in second matrix\nColumns in A = 3\nRows in B = 2\n3 ≠ 2, so undefined\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Matrix Multiplication - Finding Values',
    problem_text: 'What is [[2, 1], [3, 4]] × [[1, 0], [2, 3]]?',
    choices: [
      { letter: 'A', text: '[[4, 3], [11, 12]]' },
      { letter: 'B', text: '[[2, 0], [6, 12]]' },
      { letter: 'C', text: '[[4, 3]]' },
      { letter: 'D', text: '[[3, 4], [14, 15]]' },
      { letter: 'E', text: '[[3, 2], [10, 11]]' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Multiply: work across rows, down columns.\n\nStep 1: Check if defined\n(2 × 2) × (2 × 2) → defined, result is (2 × 2)\n\nStep 2: Top-left element\nRow 1 [2, 1] × Column 1 [1, 2]\n= (2)(1) + (1)(2) = 2 + 2 = 4\n\nStep 3: Top-right element\nRow 1 [2, 1] × Column 2 [0, 3]\n= (2)(0) + (1)(3) = 0 + 3 = 3\n\nStep 4: Bottom-left element\nRow 2 [3, 4] × Column 1 [1, 2]\n= (3)(1) + (4)(2) = 3 + 8 = 11\n\nStep 5: Bottom-right element\nRow 2 [3, 4] × Column 2 [0, 3]\n= (3)(0) + (4)(3) = 0 + 12 = 12\n\nResult: [[4, 3], [11, 12]]\n\nThe answer is A.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-7.3-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'matrices')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 7.3');
}

console.log('\n✅ Topic 7.3 - Matrices complete!');
