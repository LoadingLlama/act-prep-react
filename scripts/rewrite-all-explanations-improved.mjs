/**
 * Rewrite ALL 231 example explanations to simple choice-by-choice format
 * Uses SERVICE_ROLE_KEY for updates
 * Processes in batches of 20 and shows progress
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Use SERVICE_ROLE_KEY for updates
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Extract a brief reason for why a choice is right/wrong
 *
 * @param {string} letter - The choice letter (A, B, C, D, E)
 * @param {string} choiceText - The text of this choice
 * @param {string} originalExplanation - The original explanation text
 * @param {boolean} isCorrect - Whether this is the correct answer
 * @returns {string} - Brief reason (1-2 sentences max)
 */
function extractReasonForChoice(letter, choiceText, originalExplanation, isCorrect) {
  if (!originalExplanation) {
    return isCorrect ? 'Correct answer' : 'Incorrect';
  }

  // Pattern 1: "A. "text" → reason ✗/✓"
  const pattern1 = new RegExp(
    `${letter}\\.\\s*["""]?[^"""→]*["""]?\\s*[→:-]\\s*([^✗✓\\n]+)[✗✓]?`,
    'i'
  );
  const match1 = originalExplanation.match(pattern1);
  if (match1 && match1[1]) {
    let reason = match1[1].trim();
    // Remove trailing punctuation and symbols
    reason = reason.replace(/[✗✓\s]+$/, '').trim();
    if (reason.length > 100) {
      reason = reason.substring(0, 97) + '...';
    }
    if (reason.length > 5) return reason;
  }

  // Pattern 2: "A. text - reason"
  const pattern2 = new RegExp(
    `${letter}\\.\\s*[^-→\\n]{3,50}\\s*[-–—]\\s*([^✗✓\\n]{5,120})`,
    'i'
  );
  const match2 = originalExplanation.match(pattern2);
  if (match2 && match2[1]) {
    let reason = match2[1].trim();
    reason = reason.replace(/[✗✓\s]+$/, '').trim();
    if (reason.length > 100) {
      reason = reason.substring(0, 97) + '...';
    }
    if (reason.length > 5) return reason;
  }

  // Pattern 3: Look for the choice text followed by explanation
  const escapedChoiceText = choiceText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern3 = new RegExp(
    `${escapedChoiceText}[\\s:,-]*([^\\n]{10,120})`,
    'i'
  );
  const match3 = originalExplanation.match(pattern3);
  if (match3 && match3[1]) {
    let reason = match3[1].trim();
    reason = reason.replace(/[✗✓\s]+$/, '').trim();
    // Remove leading punctuation
    reason = reason.replace(/^[→:,-]\s*/, '');
    if (reason.length > 100) {
      reason = reason.substring(0, 97) + '...';
    }
    if (reason.length > 5) return reason;
  }

  // Fallback: Generic reasons based on correctness
  if (isCorrect) {
    // Look for calculation or verification in the explanation
    const lines = originalExplanation.split('\n');
    for (const line of lines) {
      if (line.includes('=') && line.length < 100 && line.length > 10) {
        return line.trim();
      }
    }
    return 'Correct answer';
  } else {
    // Common wrong answer patterns
    if (originalExplanation.toLowerCase().includes('would need')) {
      const needMatch = originalExplanation.match(/would need[^✗\n]{5,60}/i);
      if (needMatch) return needMatch[0].trim();
    }
    if (originalExplanation.toLowerCase().includes('should be')) {
      const shouldMatch = originalExplanation.match(/should be[^✗\n]{5,60}/i);
      if (shouldMatch) return shouldMatch[0].trim();
    }
    return 'Does not satisfy the requirement';
  }
}

/**
 * Rewrite a single explanation to the simple format
 *
 * @param {Object} example - The example object from database
 * @returns {string} - The rewritten explanation in simple format
 */
function rewriteExplanation(example) {
  const { choices, correct_answer, answer_explanation } = example;

  if (!choices || !correct_answer) {
    console.warn(`Example ${example.id} missing choices or correct_answer`);
    return answer_explanation; // Return original if data is missing
  }

  // choices is an array of {letter, text} objects
  const choicesArray = Array.isArray(choices) ? choices : [];

  // Build the new explanation
  let newExplanation = '';

  // Process each choice in the array
  choicesArray.forEach(choice => {
    const { letter, text } = choice;
    const isCorrect = letter === correct_answer;
    const symbol = isCorrect ? '✓' : '✗';

    // Extract a brief reason from the original explanation
    const reason = extractReasonForChoice(letter, text, answer_explanation, isCorrect);

    newExplanation += `${letter}. "${text}" → ${reason} ${symbol}\n`;
  });

  newExplanation += `\nThe answer is ${correct_answer}.`;

  return newExplanation.trim();
}

/**
 * Process examples in batches
 */
async function rewriteAllExplanations() {
  console.log('Starting to rewrite all example explanations...\n');

  // Fetch all examples
  console.log('Fetching all examples from database...');
  const { data: examples, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('*')
    .order('id');

  if (fetchError) {
    console.error('Error fetching examples:', fetchError);
    process.exit(1);
  }

  console.log(`Found ${examples.length} examples to rewrite\n`);

  // Process in batches of 20
  const BATCH_SIZE = 20;
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (let i = 0; i < examples.length; i += BATCH_SIZE) {
    const batch = examples.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(examples.length / BATCH_SIZE);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Processing Batch ${batchNum}/${totalBatches} (Examples ${i + 1}-${Math.min(i + BATCH_SIZE, examples.length)})`);
    console.log('='.repeat(60));

    for (const example of batch) {
      try {
        // Rewrite the explanation
        const newExplanation = rewriteExplanation(example);

        // Update in database
        const { error: updateError } = await supabase
          .from('lesson_examples')
          .update({ answer_explanation: newExplanation })
          .eq('id', example.id);

        if (updateError) {
          throw updateError;
        }

        successCount++;
        console.log(`✓ ${successCount}. Updated example ${example.id} - "${example.title}"`);

        // Show before/after for first example in first batch
        if (i === 0 && successCount === 1) {
          console.log('\n--- SAMPLE TRANSFORMATION ---');
          console.log('BEFORE:');
          console.log(example.answer_explanation?.substring(0, 200) + '...');
          console.log('\nAFTER:');
          console.log(newExplanation);
          console.log('----------------------------\n');
        }

      } catch (error) {
        errorCount++;
        errors.push({ id: example.id, title: example.title, error: error.message });
        console.log(`✗ Failed to update example ${example.id}: ${error.message}`);
      }
    }

    // Progress summary after each batch
    console.log(`\nBatch ${batchNum} Complete: ${successCount}/${examples.length} total updated`);
  }

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('FINAL SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total examples: ${examples.length}`);
  console.log(`Successfully rewritten: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  if (errors.length > 0) {
    console.log('\nFailed examples:');
    errors.forEach(err => {
      console.log(`  - ID ${err.id}: ${err.title} - ${err.error}`);
    });
  }

  console.log('\n✓ Rewrite complete!');
}

// Run the script
rewriteAllExplanations()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
