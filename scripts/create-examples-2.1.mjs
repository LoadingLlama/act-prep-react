import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

const LESSON_ID = '3e2c98a9-98e3-40e3-8301-11f38aa0c15b'; // geometry-angles lesson UUID

async function createExamples() {
  console.log('Creating examples for Math 2.1 (Understanding Angles & Lines)...\\n');

  const examples = [
    // Example 1: Parallel Lines with Triangle
    {
      lesson_id: LESSON_ID,
      position: 2,
      title: 'Parallel Lines with Alternate Interior Angles',
      problem_text: 'In the figure, AB is parallel with CD. A triangle is formed with angles 34° and 90°. What is the value of x?',
      choices: [
        { letter: 'A', text: '34' },
        { letter: 'B', text: '40' },
        { letter: 'C', text: '48' },
        { letter: 'D', text: '56' },
        { letter: 'E', text: '90' }
      ],
      correct_answer: 'D',
      solution_steps: [],
      answer_explanation: 'We know that all angles in a triangle add up to 180°, so we can find the unknown third angle in the triangle.\\n\\nThird angle = 180° − 34° − 90° = 56°\\n\\nThe third angle we just found and x° are alternate interior angles (angles on opposite sides of the transversal, between the parallel lines), so they must be equal.\\n\\nTherefore, x = 56°. The answer is D.',
      is_worked_example: false
    },
    // Example 2: Triangle with Angle Bisector
    {
      lesson_id: LESSON_ID,
      position: 3,
      title: 'Triangle with Angle Bisector',
      problem_text: 'In triangle ABC, the measure of angle ABD is 68°, the measure of angle ACD is 40°, D is on BC, and AD is a bisector of angle CAB. What is the measure of angle ADC?',
      choices: [
        { letter: 'A', text: '92' },
        { letter: 'B', text: '100' },
        { letter: 'C', text: '104' },
        { letter: 'D', text: '108' },
        { letter: 'E', text: '112' }
      ],
      correct_answer: 'C',
      solution_steps: [],
      answer_explanation: 'Step 1: Find angle CAB using triangle ABC.\\nAll angles in a triangle add to 180°:\\n∠CAB + ∠ABD + ∠ACD = 180°\\n∠CAB + 68° + 40° = 180°\\n∠CAB = 180° − 68° − 40° = 72°\\n\\nStep 2: Use the angle bisector.\\nAD is a bisector of ∠CAB, which means it cuts the angle in half:\\n∠CAD = ∠BAD = 72° ÷ 2 = 36°\\n\\nStep 3: Find angle ADC using triangle ADC.\\n∠ADC + ∠ACD + ∠CAD = 180°\\n∠ADC + 40° + 36° = 180°\\n∠ADC = 180° − 40° − 36° = 104°\\n\\nThe answer is C.',
      is_worked_example: false
    },
    // Example 3: Pentagon Interior Angles
    {
      lesson_id: LESSON_ID,
      position: 4,
      title: 'Pentagon Interior Angles',
      problem_text: 'A pentagon has interior angles of x°, 1.3x°, 1.4x°, 1.2x°, and 1.1x°. What is the value of x?',
      choices: [
        { letter: 'A', text: '72' },
        { letter: 'B', text: '88' },
        { letter: 'C', text: '90' },
        { letter: 'D', text: '105' },
        { letter: 'E', text: '108' }
      ],
      correct_answer: 'C',
      solution_steps: [],
      answer_explanation: 'The figure has 5 sides, so it is a pentagon.\\n\\nUsing the interior angles formula:\\nSum of Interior Angles = 180°(n − 2)\\nSum = 180°(5 − 2) = 180°(3) = 540°\\n\\nNow set the sum of all angles equal to 540°:\\nx° + 1.3x° + 1.4x° + 1.2x° + 1.1x° = 540°\\n6x° = 540°\\nx = 90\\n\\nThe answer is C.',
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

  console.log('\\n✅ All examples created successfully!');
}

createExamples();
