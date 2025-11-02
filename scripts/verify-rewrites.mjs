/**
 * Verify that all examples were successfully rewritten to the new format
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function verifyFormat(explanation, correctAnswer) {
  if (!explanation) return { valid: false, reason: 'Empty explanation' };

  // Check if it ends with "The answer is X."
  const answerPattern = new RegExp(`The answer is ${correctAnswer}\\.?$`, 'i');
  if (!answerPattern.test(explanation.trim())) {
    return { valid: false, reason: 'Missing or incorrect answer statement' };
  }

  // Check if it has choice markers (A., B., C., D.)
  const choiceMarkers = (explanation.match(/[A-E]\./g) || []).length;
  if (choiceMarkers < 2) {
    return { valid: false, reason: `Only ${choiceMarkers} choice markers found` };
  }

  // Check if it has symbols
  const hasCheckmark = explanation.includes('✓');
  const hasCross = explanation.includes('✗');
  if (!hasCheckmark || !hasCross) {
    return { valid: false, reason: 'Missing ✓ or ✗ symbols' };
  }

  return { valid: true };
}

async function verifyRewrites() {
  console.log('Verifying all rewritten examples...\n');

  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log(`Checking ${examples.length} examples...\n`);

  let validCount = 0;
  let invalidCount = 0;
  const invalidExamples = [];

  examples.forEach((ex, idx) => {
    const verification = verifyFormat(ex.answer_explanation, ex.correct_answer);

    if (verification.valid) {
      validCount++;
    } else {
      invalidCount++;
      invalidExamples.push({
        index: idx + 1,
        id: ex.id,
        title: ex.title,
        reason: verification.reason,
        explanation: ex.answer_explanation
      });
    }
  });

  console.log('='.repeat(70));
  console.log('VERIFICATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total examples: ${examples.length}`);
  console.log(`Valid format: ${validCount}`);
  console.log(`Invalid format: ${invalidCount}`);
  console.log(`Success rate: ${Math.round((validCount / examples.length) * 100)}%`);

  if (invalidExamples.length > 0) {
    console.log('\n❌ Examples with invalid format:');
    invalidExamples.forEach(ex => {
      console.log(`\n${ex.index}. "${ex.title}" (ID: ${ex.id})`);
      console.log(`   Reason: ${ex.reason}`);
      console.log(`   Explanation: ${ex.explanation?.substring(0, 200)}...`);
    });
  } else {
    console.log('\n✓ All examples have valid format!');
  }

  // Show a few random samples
  console.log('\n' + '='.repeat(70));
  console.log('RANDOM SAMPLES (5 examples)');
  console.log('='.repeat(70));

  const sampleIndices = [10, 50, 100, 150, 200];
  sampleIndices.forEach(idx => {
    if (idx < examples.length) {
      const ex = examples[idx];
      console.log(`\n${idx + 1}. ${ex.title}`);
      console.log('-'.repeat(70));
      console.log(ex.answer_explanation);
    }
  });

  console.log('\n✓ Verification complete!');
}

verifyRewrites().then(() => process.exit(0));
