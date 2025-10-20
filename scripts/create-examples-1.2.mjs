import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

const LESSON_ID = '56a20188-c413-48c6-b1ba-6cbddf9ba247'; // substitution lesson UUID

async function createExamples() {
  console.log('Creating examples for Math 1.2 (Number Substitution)...\n');

  const examples = [
    // Example 1: Jeremy's Candy Bars
    {
      lesson_id: LESSON_ID,
      position: 1,
      title: 'Variable Expression with Percents',
      problem_text: 'Jeremy has n boxes of candy bars. Each box contains m bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of m and n?',
      choices: [
        { letter: 'A', text: '0.7(m + n)' },
        { letter: 'B', text: '70nm' },
        { letter: 'C', text: 'nm + m' },
        { letter: 'D', text: '0.7nm' },
        { letter: 'E', text: '0.7(n + m)' }
      ],
      correct_answer: 'D',
      solution_steps: [],
      answer_explanation: 'Use number substitution to make this easier. Let\'s say Jeremy has 2 boxes (n = 2) and each box contains 5 bars (m = 5). Total candy bars: 2 × 5 = 10 bars. He needs to sell 70% of them: 0.7 × 10 = 7 bars. Now test the answer choices with n = 2 and m = 5:\n\nA. 0.7(m + n) = 0.7(5 + 2) = 0.7(7) = 4.9 ✗\nB. 70nm = 70(2)(5) = 700 ✗\nC. nm + m = (2)(5) + 5 = 15 ✗\nD. 0.7nm = 0.7(2)(5) = 7 ✓\nE. 0.7(n + m) = 0.7(2 + 5) = 4.9 ✗\n\nOnly D gives us 7, which matches our target answer.',
      is_worked_example: false
    },
    // Example 2: Trigonometry
    {
      lesson_id: LESSON_ID,
      position: 2,
      title: 'Trigonometry with Unknown Angle',
      problem_text: 'If cos(2x°) = a, which of the following must be true for all values of x, in degrees?',
      choices: [
        { letter: 'A', text: 'sin(2x°) = a' },
        { letter: 'B', text: 'sin(x° + 90°) = a' },
        { letter: 'C', text: 'cos(90° - 2x°) = a' },
        { letter: 'D', text: 'sin(90° - 2x°) = a' },
        { letter: 'E', text: 'cos(x° + 90°) = a' }
      ],
      correct_answer: 'D',
      solution_steps: [],
      answer_explanation: 'The easiest way to solve this is to pick a value for x and use your calculator. Let\'s pick x = 10°.\n\nFirst, find what a equals when x = 10°:\ncos(2 × 10°) = cos(20°) = 0.9397\n\nSo a = 0.9397. Now plug x = 10° into each answer choice and see which equals 0.9397:\n\nA. sin(2 × 10°) = sin(20°) = 0.3420 ✗\nB. sin(10° + 90°) = sin(100°) = 0.9848 ✗\nC. cos(90° - 20°) = cos(70°) = 0.3420 ✗\nD. sin(90° - 20°) = sin(70°) = 0.9397 ✓\nE. cos(10° + 90°) = cos(100°) = -0.1736 ✗\n\nOnly D matches! Note: Make sure your calculator is in degree mode, not radian mode.',
      is_worked_example: false
    },
    // Example 3: Rectangle Area Transformation
    {
      lesson_id: LESSON_ID,
      position: 3,
      title: 'Geometry Transformation',
      problem_text: 'If the length of a rectangle is tripled and the width is halved, how many times larger is the area of the new rectangle than the area of the original rectangle?',
      choices: [
        { letter: 'A', text: '1.5' },
        { letter: 'B', text: '2' },
        { letter: 'C', text: '3' },
        { letter: 'D', text: '4' },
        { letter: 'E', text: '6' }
      ],
      correct_answer: 'A',
      solution_steps: [],
      answer_explanation: 'To make this question easier, pick simple values for the length and width. Let\'s say:\n- Original length = 3\n- Original width = 2\n- Original area = 3 × 2 = 6\n\nNow apply the transformations:\n- New length = 3 × 3 = 9 (tripled)\n- New width = 2 ÷ 2 = 1 (halved)\n- New area = 9 × 1 = 9\n\nCompare the areas:\nNew area ÷ Original area = 9 ÷ 6 = 1.5\n\nThe new rectangle is 1.5 times as large as the original. The answer is A.\n\nNote: This works with any numbers you choose for length and width!',
      is_worked_example: false
    }
  ];

  for (const example of examples) {
    console.log(`Creating example ${example.position}: ${example.title}...`);

    const { data, error} = await supabase
      .from('lesson_examples')
      .insert(example)
      .select();

    if (error) {
      console.error(`❌ Failed to create example ${example.position}:`, error);
    } else {
      console.log(`✅ Created example ${example.position}: ${example.title}`);
      console.log(`   ID: ${data[0].id}`);
    }
  }

  console.log('\n✅ All examples created successfully!');
}

createExamples();
