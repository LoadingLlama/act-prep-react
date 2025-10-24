import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID (using 'trigonometry' key, not '7.1')
const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'trigonometry')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 7.1...\n');

// Create examples from Chapter 17
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Finding Cosine Using SOH-CAH-TOA',
    problem_text: 'In a right triangle, the side adjacent to angle B is 5 and the hypotenuse is 5√5. What is the value of cos(B)?',
    choices: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '1/√5' },
      { letter: 'C', text: '√5' },
      { letter: 'D', text: '5' },
      { letter: 'E', text: '1/5' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Use CAH from SOH-CAH-TOA.\n\nStep 1: Identify what cosine needs\ncos = Adjacent / Hypotenuse\n\nStep 2: Plug in values\nAdjacent to B = 5\nHypotenuse = 5√5\n\nStep 3: Set up fraction\ncos(B) = 5 / (5√5)\n\nStep 4: Simplify\n= 5 / (5√5)\n= 1 / √5\n\nNote: ACT sometimes leaves √ in denominator\n(doesn\'t require rationalization)\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Finding Tangent with Pythagorean Theorem',
    problem_text: 'In a right triangle, the side opposite angle A is 4 and the hypotenuse is 7. What is the value of tan(A)?',
    choices: [
      { letter: 'A', text: '4/7' },
      { letter: 'B', text: '4/√33' },
      { letter: 'C', text: '√33/4' },
      { letter: 'D', text: '7/4' },
      { letter: 'E', text: '4/3' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Find adjacent side first using Pythagorean theorem.\n\nStep 1: Identify what tangent needs\ntan = Opposite / Adjacent\nOpposite = 4 (given)\nAdjacent = ? (unknown)\n\nStep 2: Use Pythagorean theorem\na² + b² = c²\n4² + (adjacent)² = 7²\n16 + (adjacent)² = 49\n(adjacent)² = 33\nadjacent = √33\n\nStep 3: Calculate tangent\ntan(A) = Opposite / Adjacent\n= 4 / √33\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Finding Secant (Reciprocal Function)',
    problem_text: 'In a right triangle, if tan(q) = 15/13, what is the value of sec(q)?',
    choices: [
      { letter: 'A', text: '13/√394' },
      { letter: 'B', text: '15/√394' },
      { letter: 'C', text: '√394/15' },
      { letter: 'D', text: '√394/13' },
      { letter: 'E', text: '13/15' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use tangent to find sides, then calculate secant.\n\nStep 1: Draw triangle from tangent\ntan(q) = Opposite / Adjacent = 15/13\nOpposite = 15\nAdjacent = 13\n\nStep 2: Find hypotenuse (Pythagorean theorem)\n13² + 15² = c²\n169 + 225 = c²\n394 = c²\nc = √394\n\nStep 3: Calculate secant\nsec = Hypotenuse / Adjacent\n= √394 / 13\n\nAlternative method:\ncos(q) = 13/√394\nsec(q) = flip it = √394/13\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Inverse Trig to Find Angle',
    problem_text: 'In a right triangle, the side opposite angle A is 30 and the hypotenuse is 55. Which expression gives the degree measure of angle A?',
    choices: [
      { letter: 'A', text: 'tan⁻¹(30/55)' },
      { letter: 'B', text: 'tan⁻¹(55/30)' },
      { letter: 'C', text: 'sin⁻¹(55/30)' },
      { letter: 'D', text: 'sin⁻¹(30/55)' },
      { letter: 'E', text: 'cos⁻¹(30/55)' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use inverse sine for opposite and hypotenuse.\n\nStep 1: Identify what we have\nOpposite = 30\nHypotenuse = 55\nNeed angle A\n\nStep 2: Choose trig function\nSine uses Opposite and Hypotenuse\nsin(A) = Opposite / Hypotenuse = 30/55\n\nStep 3: Use inverse to find angle\nA = sin⁻¹(30/55)\n\nWHY NOT TANGENT:\nTangent needs Opposite/Adjacent\nWe have Opposite/Hypotenuse\nSo must use sine!\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Pythagorean Identity',
    problem_text: 'If 3sin²(θ) + 3cos²(θ) = a, what is the value of a?',
    choices: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '6' },
      { letter: 'E', text: '9' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use the Pythagorean identity.\n\nStep 1: Recall the identity\nsin²(θ) + cos²(θ) = 1\n(True for ALL angles)\n\nStep 2: Factor out 3\n3sin²(θ) + 3cos²(θ) = a\n3(sin²(θ) + cos²(θ)) = a\n\nStep 3: Apply identity\n3(1) = a\n\nStep 4: Solve\na = 3\n\nVerification (Substitution):\nPick any angle, say θ = 30°\n3sin²(30°) + 3cos²(30°)\n= 3(0.5)² + 3(0.866)²\n= 3(0.25) + 3(0.75)\n= 0.75 + 2.25 = 3 ✓\n\nThe answer is C.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-7.1-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'trigonometry')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 7.1');
}

console.log('\n✅ Topic 7.1 - Trigonometry complete!');
