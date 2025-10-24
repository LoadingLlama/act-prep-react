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
  .eq('lesson_key', 'exponential-growth')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

// Create examples from Chapter 28
const examples = [
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Identifying Exponential Growth Equation',
    problem_text: 'Julia estimates that the number of bees in a hive increases by 30% every month. If Julia buys a hive with 50 bees, which of the following properly models the number of bees, B, that will live in the hive in m months?',
    choices: [
      { letter: 'A', text: 'B = 50 + 30m' },
      { letter: 'B', text: 'B = 50(0.3)ᵐ' },
      { letter: 'C', text: 'B = 50m² + 30' },
      { letter: 'D', text: 'B = 50(1.3)ᵐ' },
      { letter: 'E', text: 'B = 50(30)ᵐ' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Identify the initial value and growth rate.\\n\\nStep 1: Identify initial value\\nThe hive starts with 50 bees, so P = 50.\\n\\nStep 2: Identify growth rate\\nThe population increases by 30% every month, so r = 0.30.\\n\\nStep 3: Write exponential growth formula\\nA = P(1 + r)ᵗ\\nB = 50(1 + 0.30)ᵐ\\nB = 50(1.3)ᵐ\\n\\nStep 4: Eliminate wrong answers\\nA is linear (50 + 30m), not exponential—WRONG\\nB uses 0.3 instead of 1.3—WRONG (missing the "1")\\nC is quadratic—WRONG\\nE uses 30 instead of 1.3—WRONG\\n\\nRemember: For a 30% growth rate, use (1 + 0.30) = 1.30!\\n\\nThe answer is D.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Calculating Exponential Decay',
    problem_text: 'The Santa Barbara Newspaper is losing subscribers at a rate of 12% per year. If the newspaper currently has 24,000 subscribers, which of the following is closest to the number of subscribers the newspaper will have in 2 years?',
    choices: [
      { letter: 'A', text: '15,360' },
      { letter: 'B', text: '18,240' },
      { letter: 'C', text: '18,590' },
      { letter: 'D', text: '21,120' },
      { letter: 'E', text: '22,320' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Use the exponential decay formula.\\n\\nStep 1: Identify values\\nP = 24,000 (initial subscribers)\\nr = 0.12 (12% loss rate)\\nt = 2 (years)\\n\\nStep 2: Write decay formula\\nA = P(1 - r)ᵗ\\nA = 24,000(1 - 0.12)²\\n\\nStep 3: Calculate\\nA = 24,000(0.88)²\\nA = 24,000(0.7744)\\nA = 18,585.6\\n\\nStep 4: Find closest answer\\nThe question says "closest to," so round to 18,590.\\n\\nRemember: Decay uses (1 - r), which gives 0.88—this represents keeping 88% of subscribers each year.\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'General Form - Identifying Growth vs. Decay',
    problem_text: 'Which of the following equations represents exponential decay?',
    choices: [
      { letter: 'A', text: 'y = 150(2)ˣ' },
      { letter: 'B', text: 'y = 100(1.5)ˣ' },
      { letter: 'C', text: 'y = 12,000(1/3)ˣ' },
      { letter: 'D', text: 'y = 50(3)ˣ' },
      { letter: 'E', text: 'y = 200(1.08)ˣ' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: 'Check the base (b value) in general form y = abˣ.\\n\\nStep 1: Recall the rule\\nIf b > 1 → exponential GROWTH\\nIf 0 < b < 1 → exponential DECAY\\n\\nStep 2: Check each base\\nA: b = 2 (greater than 1) → GROWTH\\nB: b = 1.5 (greater than 1) → GROWTH\\nC: b = 1/3 ≈ 0.333 (between 0 and 1) → DECAY ✓\\nD: b = 3 (greater than 1) → GROWTH\\nE: b = 1.08 (greater than 1) → GROWTH\\n\\nStep 3: Verify understanding\\nIn choice C, the value is multiplied by 1/3 each time period.\\nThis means it keeps only one-third of its value, so it is decreasing (decaying).\\n\\nThe answer is C.',
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Compound Interest Calculation',
    problem_text: 'A bank account starts with $100 and earns 8% annual interest compounded yearly. What is the account balance after 3 years?',
    choices: [
      { letter: 'A', text: '$108.00' },
      { letter: 'B', text: '$116.64' },
      { letter: 'C', text: '$124.00' },
      { letter: 'D', text: '$125.97' },
      { letter: 'E', text: '$133.10' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: 'Apply the exponential growth formula for compound interest.\\n\\nStep 1: Identify values\\nP = $100 (initial balance)\\nr = 0.08 (8% interest rate)\\nt = 3 (years)\\n\\nStep 2: Write growth formula\\nA = P(1 + r)ᵗ\\nA = 100(1 + 0.08)³\\nA = 100(1.08)³\\n\\nStep 3: Calculate\\nA = 100(1.08)³\\nA = 100(1.259712)\\nA = $125.97\\n\\nStep 4: Verify it is NOT linear\\nIf it were linear ($8 per year), we would get $100 + $24 = $124.\\nBut compound interest is exponential, so we get more: $125.97.\\n\\nThe answer is D.',
    is_worked_example: false
  }
];

console.log('Creating examples for Topic 4.5...');
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

// Upload HTML content
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-4.5-v1.html', 'utf8');

console.log('\\nUploading lesson content...');
const { data, error: updateError } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'exponential-growth')
  .select();

if (updateError) {
  console.error('ERROR:', updateError);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
} else {
  console.log(`✓ Successfully updated ${data.length} row(s)`);
  console.log(`✓ Uploaded ${content.length} characters for Topic 4.5`);
  console.log('\\n✅ Topic 4.5 - Exponential Growth complete!');
}
