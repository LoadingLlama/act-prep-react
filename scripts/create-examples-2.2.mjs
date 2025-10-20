import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

const LESSON_ID = 'd2ae4a84-cb54-4006-8dee-8c325e443c2d'; // Topic 2.2 UUID

async function createExamples() {
  console.log('Creating examples for Math 2.2 (Areas, Volumes & Triangles)...\n');

  const examples = [
    // Example 1: Rectangle and Square Area (after Section 1)
    {
      lesson_id: LESSON_ID,
      position: 2,
      title: 'Rectangle and Square Area',
      problem_text: 'One side of rectangle ABCD has a length of 9 inches. A square whose area is equal to the area of rectangle ABCD has a side length of 12 inches. What is the width, in inches, of rectangle ABCD?',
      choices: [
        { letter: 'A', text: '12' },
        { letter: 'B', text: '14' },
        { letter: 'C', text: '16' },
        { letter: 'D', text: '18' },
        { letter: 'E', text: '20' }
      ],
      correct_answer: 'C',
      solution_steps: [],
      answer_explanation: 'Since the area of rectangle ABCD and the square are equal, we first find the area of the square.\n\nA = s² = 12² = 144 square inches\n\nNow, we know the area of rectangle ABCD is 144 square inches and that one side length is 9 inches, so we can solve for the width using A = lw.\n\n144 = (9)(w)\nw = 144 ÷ 9\nw = 16\n\nThe answer is C.',
      is_worked_example: false
    },
    // Example 2: Unit Conversion with Area (after Section 2)
    {
      lesson_id: LESSON_ID,
      position: 3,
      title: 'Unit Conversion - Yards to Square Feet',
      problem_text: 'A professional soccer field is 136 yards long and 93 yards wide. What is the area of the professional soccer field in square feet?',
      choices: [
        { letter: 'A', text: '113,832' },
        { letter: 'B', text: '37,944' },
        { letter: 'C', text: '12,648' },
        { letter: 'D', text: '4,216' },
        { letter: 'E', text: '1,405' }
      ],
      correct_answer: 'A',
      solution_steps: [],
      answer_explanation: 'The key to solving these questions is to convert the units BEFORE solving for the area.\n\n1 yard = 3 feet, so we convert the length and width from yards to feet:\n\nLength: 136 yards × 3 = 408 feet\nWidth: 93 yards × 3 = 279 feet\n\nNow we can find the area using A = lw:\n\nA = (408 ft)(279 ft) = 113,832 ft²\n\nThe answer is A.',
      is_worked_example: false
    },
    // Example 3: Pythagorean Theorem with Midpoint (after Section 3)
    {
      lesson_id: LESSON_ID,
      position: 4,
      title: 'Pythagorean Theorem with Midpoint',
      problem_text: 'In triangle ABC, point D is the midpoint of AB, AC = 12 m, and BC = 15 m. To the closest meter, what is the length of CD?',
      choices: [
        { letter: 'A', text: '14' },
        { letter: 'B', text: '13' },
        { letter: 'C', text: '11' },
        { letter: 'D', text: '9' },
        { letter: 'E', text: '7' }
      ],
      correct_answer: 'B',
      solution_steps: [],
      answer_explanation: 'To find CD, we need to find AD first. To find AD, we need to first find AB using the Pythagorean theorem.\n\nStep 1: Find AB using right triangle ABC:\na² + b² = c²\n12² + b² = 15²\n144 + b² = 225\nb² = 81\nb = 9\n\nSo AB = 9 meters.\n\nStep 2: Find AD (the midpoint):\nPoint D is the midpoint of AB, so AD = AB ÷ 2 = 9 ÷ 2 = 4.5 meters\n\nStep 3: Find CD using the Pythagorean theorem:\n12² + 4.5² = c²\n144 + 20.25 = c²\n164.25 = c²\nc = 12.82 meters\n\nCD = 12.82 meters, which is closest to 13.\n\nThe answer is B.',
      is_worked_example: false
    },
    // Example 4: 30-60-90 Triangle (after Section 4)
    {
      lesson_id: LESSON_ID,
      position: 5,
      title: '30-60-90 Special Right Triangle',
      problem_text: 'In the right triangle below, one angle measures 30°, another measures 60°, and y = 10. What is the value of x?',
      choices: [
        { letter: 'A', text: '4' },
        { letter: 'B', text: '5' },
        { letter: 'C', text: '6' },
        { letter: 'D', text: '8' },
        { letter: 'E', text: '10' }
      ],
      correct_answer: 'B',
      solution_steps: [],
      answer_explanation: 'This is a 30-60-90 special right triangle with side ratio x : x√3 : 2x.\n\nIn a 30-60-90 triangle:\n- The short leg (opposite 30°) = x\n- The long leg (opposite 60°) = x√3\n- The hypotenuse (opposite 90°) = 2x\n\nKey rule: The short leg is always half the hypotenuse.\n\nSince y = 10 is the hypotenuse:\nx = y ÷ 2 = 10 ÷ 2 = 5\n\nThe answer is B.',
      is_worked_example: false
    }
  ];

  for (const example of examples) {
    console.log(`Creating example ${example.position}: ${example.title}...`);

    const { data, error } = await supabase
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
