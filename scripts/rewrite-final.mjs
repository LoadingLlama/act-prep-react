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
 * Check if the original explanation already has choice-by-choice format
 */
function hasChoiceAnalysis(explanation) {
  if (!explanation) return false;
  const hasMultipleChoices = (explanation.match(/[A-E]\./g) || []).length >= 3;
  const hasSymbols = explanation.includes('✗') || explanation.includes('✓');
  return hasMultipleChoices && hasSymbols;
}

/**
 * Extract reason for a specific choice from existing choice-by-choice explanation
 */
function extractFromChoiceAnalysis(letter, explanation) {
  if (!explanation) return null;

  // Match patterns like: "A. text → reason ✗/✓"
  const patterns = [
    new RegExp(`${letter}\\.\\s*[^→\\n]*→\\s*([^✗✓\\n]+)`, 'i'),
    new RegExp(`${letter}\\.\\s*[^-\\n]*-\\s*([^✗✓\\n]+)`, 'i'),
    new RegExp(`${letter}\\s*\\(.*?\\)\\s*[:""]?\\s*([^✗✓\\n]{10,100})`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = explanation.match(pattern);
    if (match && match[1]) {
      let reason = match[1].trim();
      // Clean up
      reason = reason.replace(/^[→:-]\s*/, '');
      reason = reason.replace(/[✗✓\s]+$/, '').trim();
      if (reason.length > 5 && reason.length < 120) {
        return reason;
      }
    }
  }

  return null;
}

/**
 * Extract or generate a brief reason for why a choice is right/wrong
 */
function getReasonForChoice(letter, choiceText, originalExplanation, isCorrect) {
  if (!originalExplanation) {
    return isCorrect ? 'Correct solution' : 'Incorrect';
  }

  // First, try to extract from choice-by-choice analysis if it exists
  if (hasChoiceAnalysis(originalExplanation)) {
    const extracted = extractFromChoiceAnalysis(letter, originalExplanation);
    if (extracted) return extracted;
  }

  // Look for mathematical calculation that includes the answer
  if (isCorrect) {
    // Look for lines with = sign that match the choice text
    const lines = originalExplanation.split('\n');
    for (const line of lines) {
      if (line.includes('=') && line.includes(choiceText) && line.length < 100) {
        return line.trim();
      }
      // Look for final calculation
      if (line.includes('=') && line.length < 80 && line.length > 10) {
        const lastLine = line.trim();
        if (lastLine) return lastLine;
      }
    }

    // Look for "The answer is X" context
    const answerPattern = new RegExp(`answer is ${letter}[^\\n]{0,100}`, 'i');
    const answerMatch = originalExplanation.match(answerPattern);
    if (answerMatch) {
      const context = originalExplanation.substring(
        Math.max(0, answerMatch.index - 100),
        answerMatch.index
      );
      const contextLines = context.split('\n').filter(l => l.trim());
      if (contextLines.length > 0) {
        const lastContext = contextLines[contextLines.length - 1];
        if (lastContext.length < 100 && lastContext.length > 10) {
          return lastContext.trim();
        }
      }
    }

    return 'Correct solution';
  }

  // For incorrect answers, look for common patterns
  const incorrectPatterns = [
    /would need/i,
    /should be/i,
    /incorrect/i,
    /wrong/i,
    /doesn'?t (work|fit|match|satisfy)/i,
    /can'?t be/i,
  ];

  for (const pattern of incorrectPatterns) {
    if (originalExplanation.toLowerCase().match(pattern)) {
      const match = originalExplanation.match(new RegExp(`.{0,80}${pattern.source}.{0,40}`, 'i'));
      if (match) {
        let reason = match[0].trim();
        // Clean and truncate
        reason = reason.replace(/[✗✓]/g, '').trim();
        if (reason.length > 100) {
          reason = reason.substring(0, 97) + '...';
        }
        if (reason.length > 10) return reason;
      }
    }
  }

  return 'Does not satisfy the requirement';
}

/**
 * Rewrite a single explanation to the simple format
 */
function rewriteExplanation(example) {
  const { choices, correct_answer, answer_explanation, title } = example;

  if (!choices || !correct_answer) {
    console.warn(`Example "${title}" missing choices or correct_answer`);
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

    // Get the reason for this choice
    const reason = getReasonForChoice(letter, text, answer_explanation, isCorrect);

    // Format: A. "choice text" → reason ✗/✓
    newExplanation += `${letter}. "${text}" → ${reason} ${symbol}\n`;
  });

  // Always end with "The answer is X."
  newExplanation += `\nThe answer is ${correct_answer}.`;

  return newExplanation.trim();
}

/**
 * Process examples in batches
 */
async function rewriteAllExplanations() {
  console.log('Starting to rewrite all example explanations...\n');
  console.log('Target format:');
  console.log('A. "choice text" → brief reason ✗/✓');
  console.log('B. "choice text" → brief reason ✗/✓');
  console.log('...');
  console.log('The answer is X.\n');

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

    console.log(`\n${'='.repeat(70)}`);
    console.log(`Processing Batch ${batchNum}/${totalBatches} (Examples ${i + 1}-${Math.min(i + BATCH_SIZE, examples.length)})`);
    console.log('='.repeat(70));

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
        const progress = `[${successCount}/${examples.length}]`;
        console.log(`✓ ${progress} Updated: "${example.title}"`);

        // Show sample transformation for first example
        if (successCount === 1) {
          console.log('\n--- SAMPLE TRANSFORMATION ---');
          console.log('BEFORE (first 300 chars):');
          console.log(example.answer_explanation?.substring(0, 300) + '...\n');
          console.log('AFTER:');
          console.log(newExplanation);
          console.log('----------------------------\n');
        }

      } catch (error) {
        errorCount++;
        errors.push({ id: example.id, title: example.title, error: error.message });
        console.log(`✗ Failed to update "${example.title}": ${error.message}`);
      }
    }

    // Progress summary after each batch
    const percentage = Math.round((successCount / examples.length) * 100);
    console.log(`\n✓ Batch ${batchNum} Complete | Progress: ${successCount}/${examples.length} (${percentage}%)`);
  }

  // Final summary
  console.log('\n' + '='.repeat(70));
  console.log('FINAL SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total examples: ${examples.length}`);
  console.log(`Successfully rewritten: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Success rate: ${Math.round((successCount / examples.length) * 100)}%`);

  if (errors.length > 0) {
    console.log('\n❌ Failed examples:');
    errors.forEach(err => {
      console.log(`  - "${err.title}" (ID: ${err.id})`);
      console.log(`    Error: ${err.error}`);
    });
  } else {
    console.log('\n✓ All examples successfully rewritten!');
  }

  console.log('');
}

// Run the script
rewriteAllExplanations()
  .then(() => {
    console.log('✓ Script completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
