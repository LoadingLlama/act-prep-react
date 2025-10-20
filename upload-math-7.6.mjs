import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID (using 'miscellaneous-topics' key)
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'miscellaneous-topics')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 7.6...\n');

// Create examples from Chapter 35
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Venn Diagram - Finding "Neither"',
    problem_text: 'Among a group of 23 students, 14 play tennis, 10 play soccer, and 4 play both. Of the 23 students, how many play neither tennis nor soccer?',
    choices: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '7' },
      { letter: 'E', text: '9' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Draw a Venn diagram and work step by step.\n\nStep 1: Draw the diagram\nTwo overlapping circles:\n- Left circle = Tennis\n- Right circle = Soccer\n- Overlap = Both\n- Outside = Neither\n\nStep 2: Start with "both"\nBoth tennis and soccer = 4\nLabel the overlap with 4\n\nStep 3: Find "only tennis"\nTotal tennis = 14\nBoth = 4\nOnly tennis = 14 - 4 = 10\n\nStep 4: Find "only soccer"\nTotal soccer = 10\nBoth = 4\nOnly soccer = 10 - 4 = 6\n\nStep 5: Find "neither"\nTotal students = 23\nOnly tennis + Both + Only soccer = 10 + 4 + 6 = 20\nNeither = 23 - 20 = 3\n\nKEY STRATEGY:\nAlways draw the diagram!\nStart with overlap, then subtract to find "only" regions\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Made-Up Math Symbol',
    problem_text: 'If a⊗b = 3a² - 4b, what is the value of 5⊗9?',
    choices: [
      { letter: 'A', text: '39' },
      { letter: 'B', text: '48' },
      { letter: 'C', text: '66' },
      { letter: 'D', text: '189' },
      { letter: 'E', text: '225' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Treat the made-up symbol like a function.\n\nStep 1: Identify the definition\na⊗b = 3a² - 4b\nThis tells us how to calculate a⊗b\n\nStep 2: Identify what to find\nFind 5⊗9\nSo a = 5 and b = 9\n\nStep 3: Substitute into the definition\n5⊗9 = 3(5)² - 4(9)\n\nStep 4: Calculate\n= 3(25) - 4(9)\n= 75 - 36\n= 39\n\nDON\'T PANIC:\nThe ⊗ symbol is made-up!\nThe ACT defines it in the problem\nJust plug in the numbers and solve\n\nThe answer is A.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Logic - Contrapositive Statement',
    problem_text: 'Given the true statement, "If it is Monday, there is bad traffic," which of the following statements must be true?',
    choices: [
      { letter: 'A', text: 'If it is not Monday, there is bad traffic.' },
      { letter: 'B', text: 'If it is not Monday, there is not bad traffic.' },
      { letter: 'C', text: 'If there is bad traffic, it is Monday.' },
      { letter: 'D', text: 'If there is not bad traffic, it is not Monday.' },
      { letter: 'E', text: 'Bad traffic only occurs on Mondays.' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use the contrapositive rule.\n\nStep 1: Identify the original statement structure\n"If A, then B"\nA = it is Monday\nB = there is bad traffic\n\nStep 2: Create the contrapositive\nContrapositive: "If not B, then not A"\nSwitch the order AND negate both parts\n\nStep 3: Translate back to words\nNot B = there is NOT bad traffic\nNot A = it is NOT Monday\n\nContrapositive: "If there is not bad traffic, it is not Monday"\n\nStep 4: Check answer choices\nChoice D matches exactly!\n\nWHY OTHER CHOICES ARE WRONG:\nA: Only negates A (not both)\nB: Negates both but doesn\'t switch order\nC: Switches order but doesn\'t negate\nE: Makes an assumption not in original\n\nCONTRAPOSITIVE TRICK:\nIf A → B, then (not B) → (not A)\nThis ALWAYS works!\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Pattern Spotting',
    problem_text: 'The first three elements of a pattern are shown. Each element is composed of small squares with side lengths of 14 inches. Element 1 is a 1×1 square, Element 2 is a 2×2 square, Element 3 is a 3×3 square. Each element is a square with both dimensions 14 inches more than the dimensions of the previous element. What is the perimeter, in inches, of the 5th element?',
    choices: [
      { letter: 'A', text: '70' },
      { letter: 'B', text: '126' },
      { letter: 'C', text: '196' },
      { letter: 'D', text: '280' },
      { letter: 'E', text: '350' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Spot the pattern, then extend it.\n\nStep 1: Identify the pattern\nElement 1: 1×1 (1 small square on each side)\nElement 2: 2×2 (2 small squares on each side)\nElement 3: 3×3 (3 small squares on each side)\n\nPattern: Element n is an n×n square\n\nStep 2: Find Element 5\nElement 4: 4×4 square\nElement 5: 5×5 square\n\nStep 3: Calculate side length of Element 5\nEach small square has side = 14 inches\nElement 5 has 5 small squares on each side\nTotal side length = 5 × 14 = 70 inches\n\nStep 4: Calculate perimeter\nPerimeter of square = 4s\n= 4 × 70\n= 280 inches\n\nPATTERN STRATEGY:\nDon\'t try to jump to the answer\nIdentify what changes each step\nExtend the pattern methodically\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Puzzle - Optimization',
    problem_text: 'Office Supply Depot sells binders in two ways: a set of 10 binders in a large box and 1 binder in a small box. The large box has a height of 12 inches, and the small box has a height of 2.5 inches. Matt is going to stack the boxes to a height of 5.5 feet (66 inches). What is the maximum number of binders that he can store?',
    choices: [
      { letter: 'A', text: '66' },
      { letter: 'B', text: '62' },
      { letter: 'C', text: '60' },
      { letter: 'D', text: '52' },
      { letter: 'E', text: '50' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Optimize by using large boxes first.\n\nStep 1: Convert to same units\n5.5 feet = 5.5 × 12 = 66 inches total height\n\nStep 2: Maximize large boxes (most efficient)\nLarge box height = 12 inches\nLarge box holds = 10 binders\n\nHow many large boxes fit?\n66 ÷ 12 = 5.5\nCan only use 5 whole boxes\n\nStep 3: Calculate height used and remaining\n5 large boxes × 12 inches = 60 inches used\nRemaining height = 66 - 60 = 6 inches\n\nStep 4: Maximize small boxes in remaining space\nSmall box height = 2.5 inches\nSmall box holds = 1 binder\n\nHow many small boxes fit?\n6 ÷ 2.5 = 2.4\nCan only use 2 whole boxes\n\nStep 5: Verify total height\n5(12) + 2(2.5) = 60 + 5 = 65 inches ✓\n(Under 66 inch limit)\n\nStep 6: Count total binders\nLarge boxes: 5 × 10 = 50 binders\nSmall boxes: 2 × 1 = 2 binders\nTotal: 50 + 2 = 52 binders\n\nPUZZLE STRATEGY:\nUse the most efficient option first\nThen fill remaining space\nVerify you stay under limits\n\nThe answer is D.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-7.6-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'miscellaneous-topics')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 7.6');
}

console.log('\n✅ Topic 7.6 - Miscellaneous Topics complete!');
