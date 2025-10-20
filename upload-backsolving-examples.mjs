import { createClient } from '@supabase/supabase-js';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID for backsolving
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'backsolving')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 1.1 - Backsolving...\n');

// Create examples from Chapter 1
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Backsolving with Radicals',
    problem_text: 'If √(x + 10) - 2√(x - 2) = 0, what is the value of x?',
    choices: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '14' },
      { letter: 'D', text: '18' },
      { letter: 'E', text: '22' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Backsolve by testing answer choices.\n\nAlgebraic approach would be messy:\n- Isolate radicals on both sides\n- Square both sides (introduces errors)\n- Still have a radical, square again\n- Lots of room for mistakes!\n\nBacksolving approach (much faster!):\n\nStep 1: Start with B (x = 6)\nPlug x = 6 into the equation:\n√(6 + 10) - 2√(6 - 2) = 0\n√16 - 2√4 = 0\n4 - 2(2) = 0\n4 - 4 = 0\n0 = 0 ✓\n\nIt works! We\'re done.\n\nWhy start with B?\n- Answer choices are in order\n- If B was too big, we\'d know to try A\n- If B was too small, we\'d try C or D\n- Starting in the middle lets us eliminate multiple choices quickly\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Backsolving with Polynomials',
    problem_text: 'Which of the following is a solution to the equation x³ + 5x² + 6x = 0?',
    choices: [
      { letter: 'A', text: '-3' },
      { letter: 'B', text: '-1' },
      { letter: 'C', text: '1' },
      { letter: 'D', text: '2' },
      { letter: 'E', text: '3' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Test answer choices instead of factoring.\n\nAlgebraic approach:\n- Factor out x: x(x² + 5x + 6) = 0\n- Factor quadratic: x(x + 2)(x + 3) = 0\n- Solutions: x = 0, x = -2, x = -3\n- But wait, 0 and -2 aren\'t in the choices!\n\nBacksolving approach (faster!):\n\nStep 1: Start with B or C\nLet\'s try B (x = -1):\n(-1)³ + 5(-1)² + 6(-1)\n= -1 + 5 - 6\n= -2 ✗ (need 0)\n\nStep 2: Try A (x = -3)\n(-3)³ + 5(-3)² + 6(-3)\n= -27 + 5(9) - 18\n= -27 + 45 - 18\n= 0 ✓\n\nIt works!\n\nKEY INSIGHT:\nEven if you know how to factor, backsolving can be faster when answer choices are given. Just plug and check!\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Backsolving with Linear Functions',
    problem_text: 'A linear function f passes through the points (1, 5), (3, 9), and (7, 17). Which of the following equations defines f?',
    choices: [
      { letter: 'A', text: 'f(x) = 2x + 5' },
      { letter: 'B', text: 'f(x) = x + 5' },
      { letter: 'C', text: 'f(x) = 4x + 1' },
      { letter: 'D', text: 'f(x) = 2x + 3' },
      { letter: 'E', text: 'f(x) = 3x + 2' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use the points to test which equation works.\n\nStep 1: Pick a point to test\nLet\'s use (1, 5)\nThis means when x = 1, f(1) should equal 5\n\nStep 2: Test answer choice A\nf(x) = 2x + 5\nf(1) = 2(1) + 5 = 7 ✗ (need 5)\n\nStep 3: Test answer choice B\nf(x) = x + 5\nf(1) = 1 + 5 = 6 ✗ (need 5)\n\nStep 4: Test answer choice C\nf(x) = 4x + 1\nf(1) = 4(1) + 1 = 5 ✓ (works!)\n\nStep 5: Test answer choice D\nf(x) = 2x + 3\nf(1) = 2(1) + 3 = 5 ✓ (also works!)\n\nBoth C and D work for point (1, 5)!\nWe need to test another point.\n\nStep 6: Use point (3, 9) to eliminate\nTest C: f(3) = 4(3) + 1 = 13 ✗ (need 9)\nTest D: f(3) = 2(3) + 3 = 9 ✓\n\nOnly D works for both points!\n\nSTRATEGY TIP:\nWhen multiple choices work for the first point, test a second point. The correct answer must work for ALL given points.\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'When NOT to Backsolve',
    problem_text: 'If 3x + 7 = 22, what is the value of x?',
    choices: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '9' },
      { letter: 'E', text: '15' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Simple algebra is faster than backsolving.\n\nBacksolving approach (slower):\nTest B: 3(5) + 7 = 15 + 7 = 22 ✓\n\nAlgebraic approach (faster!):\n3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 5\n\nDone in 3 simple steps!\n\nWHEN TO USE ALGEBRA INSTEAD:\n- Equation is very simple (1-2 steps)\n- Backsolving would take more time than solving\n- You\'re confident in your algebra skills\n\nWHEN TO BACKSOLVE:\n- Radicals or absolute values (messy algebra)\n- Complex word problems (hard to set up)\n- Polynomials or systems (tedious algebra)\n- You\'re stuck and need a way forward\n\nKEY TAKEAWAY:\nBacksolving is a TOOL, not a rule. Use whichever method gets you to the answer fastest!\n\nThe answer is B.',
    is_worked_example: false
  }
];

for (const example of examples) {
  const { error } = await supabase
    .from('lesson_examples')
    .insert(example);

  if (error) {
    console.error(`Error creating example at position ${example.position}:`, error.message);
  } else {
    console.log(`✓ Example ${example.position} created: ${example.title}`);
  }
}

console.log('\n✅ Topic 1.1 - Backsolving examples complete!');
