/**
 * Rewrite ALL examples to simple choice-by-choice format
 * Format: A. [choice] → [why right/wrong] ✓/✗
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function rewriteAllSimple() {
  console.log('🔧 Rewriting ALL examples to simple format...\n');

  const { data: examples, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('*');

  if (fetchError) {
    console.error('Error:', fetchError);
    return;
  }

  console.log(`Found ${examples.length} examples\n`);
  console.log('Processing in batches of 10...\n');

  let successCount = 0;
  let skipCount = 0;

  for (let i = 0; i < examples.length; i++) {
    const ex = examples[i];

    // Skip if already in simple format (very short with A./B./C./D. pattern)
    const hasChoicePattern = ex.answer_explanation?.match(/^[A-E]\.\s/m);
    const isShort = (ex.answer_explanation?.length || 0) < 400;
    const hasNoSteps = !(ex.answer_explanation?.includes('Step '));

    if (hasChoicePattern && isShort && hasNoSteps) {
      skipCount++;
      continue;
    }

    // For now, just log which ones need rewriting
    // We'll need to do this in batches with manual review
    console.log(`${i + 1}. ${ex.title}`);
    console.log(`   Length: ${ex.answer_explanation?.length || 0}, Has steps: ${!hasNoSteps}`);

    successCount++;

    if (successCount >= 10) {
      console.log('\n... (showing first 10 that need rewriting)\n');
      break;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Need to rewrite: ~${examples.length - skipCount} examples`);
  console.log(`Already in simple format: ${skipCount} examples`);
  console.log('='.repeat(80));
}

rewriteAllSimple().then(() => process.exit(0));
