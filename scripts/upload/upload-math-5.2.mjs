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
  .eq('lesson_key', '5.2')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 5.2...\n');

// Create examples from Chapter 9
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Simple Percentage Calculation',
    problem_text: 'Isaiah purchased a watch for 72% of the original price of $160. He paid no sales tax. Which of the following is closest to the price Isaiah paid?',
    choices: [
      { letter: 'A', text: '$45' },
      { letter: 'B', text: '$88' },
      { letter: 'C', text: '$115' },
      { letter: 'D', text: '$138' },
      { letter: 'E', text: '$160' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use the decimal method (faster than proportions).\n\nStep 1: Convert percentage to decimal\n72% = 0.72\n\nStep 2: Multiply by original price\nPrice paid = 0.72 × $160\nPrice paid = $115.20\n\nThe closest answer is $115.\n\nAlternative method (proportion):\nx/160 = 72/100\n100x = 11,520\nx = $115.20\n\nBoth methods work, but decimal is faster!\n\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Finding the Original Price',
    problem_text: 'Joey buys golf clubs for $720 when they are on sale for 80% of the original price. What was the original price, in dollars?',
    choices: [
      { letter: 'A', text: '$576' },
      { letter: 'B', text: '$800' },
      { letter: 'C', text: '$864' },
      { letter: 'D', text: '$900' },
      { letter: 'E', text: '$936' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'When finding the original from a percentage, divide by the decimal.\n\nStep 1: Set up equation\n$720 = 80% of original\n$720 = 0.80 × original\n\nStep 2: Solve for original\noriginal = $720 ÷ 0.80\noriginal = $900\n\nCheck: 0.80 × $900 = $720 ✓\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Percent Increase',
    problem_text: 'A town\'s population increased from 500,000 to 620,000. What was the percent increase?',
    choices: [
      { letter: 'A', text: '12%' },
      { letter: 'B', text: '19.4%' },
      { letter: 'C', text: '20%' },
      { letter: 'D', text: '24%' },
      { letter: 'E', text: '120%' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Use the percent change formula: (change ÷ original) × 100\n\nStep 1: Find the change\nChange = New - Original\nChange = 620,000 - 500,000 = 120,000\n\nStep 2: Divide by ORIGINAL (not new!)\n120,000 ÷ 500,000 = 0.24\n\nStep 3: Convert to percentage\n0.24 × 100 = 24%\n\nCRITICAL: Always divide by the original value!\n\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Percent Decrease',
    problem_text: 'A jacket originally priced at $80 is now on sale for $68. What is the percent decrease?',
    choices: [
      { letter: 'A', text: '12%' },
      { letter: 'B', text: '15%' },
      { letter: 'C', text: '17.6%' },
      { letter: 'D', text: '20%' },
      { letter: 'E', text: '85%' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'Use percent change formula with original price.\n\nStep 1: Find the decrease\nDecrease = Original - New\nDecrease = $80 - $68 = $12\n\nStep 2: Divide by original\n$12 ÷ $80 = 0.15\n\nStep 3: Convert to percentage\n0.15 × 100 = 15%\n\nQuick check: $80 × 0.85 = $68 ✓\n(85% means 15% off)\n\nThe answer is B.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Multiple Percentage Changes',
    problem_text: 'A stock price starts at $100, increases by 20%, then decreases by 20%. What is the final price?',
    choices: [
      { letter: 'A', text: '$96' },
      { letter: 'B', text: '$98' },
      { letter: 'C', text: '$100' },
      { letter: 'D', text: '$102' },
      { letter: 'E', text: '$104' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: 'Multiple percentage changes multiply, not add! Apply each change to the NEW value.\n\nStep 1: Apply 20% increase\n$100 × 1.20 = $120\n(Increase means multiply by 1.20, not add 20)\n\nStep 2: Apply 20% decrease to NEW value\n$120 × 0.80 = $96\n(Decrease means multiply by 0.80)\n\nShortcut: Multiply the multipliers\n$100 × 1.20 × 0.80 = $100 × 0.96 = $96\n\nCRITICAL: 20% up then 20% down does NOT return to original!\n\nThe answer is A.',
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
const htmlContent = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-5.2-v1.html', 'utf8');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '5.2')
  .select();

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - check SERVICE_ROLE_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ Uploaded', htmlContent.length, 'characters for Topic 5.2');
}

console.log('\n✅ Topic 5.2 - Percentages complete!');
