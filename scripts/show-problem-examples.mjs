/**
 * Show details of problematic examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const problemIds = [
  '599f8651', // Using pH Knowledge to Classify Substances
  '5b795e90', // Identifying Independent and Dependent Variables
  'cd11a8da', // Identifying States of Water at Different Temperatures
  'bb0148a3', // Comparing Two Viewpoints on Climate Change
  'afb520c8', // Applying Photosynthesis Knowledge
  'e83c9008', // Understanding Density and Floating
  '87e8162c', // Evaluating New Evidence Against Viewpoints
  '3ce9780f', // Affect vs. Effect
  '4a312610', // Than vs. Then
  '78e8c18a', // Have vs. Of
  '149cd22b', // Countable vs. Non-countable
  'f1dba965', // Dividing Fractions
  '051f825a', // Complex Fractions
  '4a2bec04', // Testing Equations with Simple Data Points
  'dca7b39d', // Matrix Multiplication - Defined or Undefined
  'a2adf0b5'  // Finding Domain from Fractions
];

async function showProblemExamples() {
  // Get all examples first
  const { data: allExamples, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('*');

  if (fetchError) {
    console.error('❌ Error fetching examples:', fetchError);
    return;
  }

  // Filter by ID prefix
  const examples = allExamples.filter(ex =>
    problemIds.some(prefix => ex.id.startsWith(prefix))
  );

  for (const data of examples) {

    console.log('\n' + '='.repeat(80));
    console.log(`📝 ${data.title}`);
    console.log(`ID: ${data.id}`);
    console.log('='.repeat(80));

    console.log('\n📄 PROBLEM TEXT:');
    console.log(data.problem_text);

    console.log('\n📋 CHOICES:');
    data.choices?.forEach(c => console.log(`  ${c.letter}. ${c.text}`));

    console.log(`\n✅ CORRECT ANSWER: ${data.correct_answer}`);

    console.log('\n💡 CURRENT EXPLANATION:');
    console.log(`"${data.answer_explanation}"`);
    console.log(`(Length: ${data.answer_explanation?.length || 0} characters)`);

    console.log('\n' + '-'.repeat(80));
  }
}

showProblemExamples().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
