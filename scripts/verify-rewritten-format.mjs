/**
 * Verify rewritten examples have correct format
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verify() {
  console.log('🔍 Verifying rewritten example formats...\n');

  // Get a sample of 10 random examples
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  let allGood = true;

  for (const ex of examples) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Example: ${ex.title}`);
    console.log(`Correct Answer: ${ex.correct_answer}`);
    console.log(`Choices: ${ex.choices?.length || 0}`);

    const explanation = ex.answer_explanation || '';

    // Check for sectional format
    const hasSectionalFormat = explanation.includes('**Choice');
    const hasCorrectMarker = explanation.includes('✓ CORRECT');
    const hasIncorrectMarker = explanation.includes('✗ Incorrect');
    const hasAnswer = explanation.includes(`The answer is ${ex.correct_answer}`);

    console.log(`\n✅ Sectional format: ${hasSectionalFormat ? 'YES' : 'NO'}`);
    console.log(`✅ Correct marker: ${hasCorrectMarker ? 'YES' : 'NO'}`);
    console.log(`✅ Incorrect marker: ${hasIncorrectMarker ? 'YES' : 'NO'}`);
    console.log(`✅ Answer statement: ${hasAnswer ? 'YES' : 'NO'}`);

    // Count choices in explanation
    const choiceMatches = explanation.match(/\*\*Choice [A-E]:/g);
    const choiceCount = choiceMatches ? choiceMatches.length : 0;
    const expectedCount = ex.choices?.length || 0;

    console.log(`✅ All choices explained: ${choiceCount}/${expectedCount} ${choiceCount === expectedCount ? 'YES' : 'NO'}`);

    if (!hasSectionalFormat || !hasCorrectMarker || !hasAnswer || choiceCount !== expectedCount) {
      allGood = false;
      console.log('\n⚠️  ISSUE DETECTED');
      console.log('\nExplanation preview:');
      console.log(explanation.substring(0, 300) + '...');
    }
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(allGood ? '\n✅ All samples look good!' : '\n⚠️  Some issues found');
}

verify().then(() => process.exit(0));
