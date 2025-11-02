/**
 * Script to rewrite all 231 example explanations in lesson_examples table
 * to a thorough, sectional format with clear highlighting.
 *
 * This script:
 * 1. Connects to Supabase using SUPABASE_SERVICE_ROLE_KEY from .env
 * 2. Gets all examples from lesson_examples table
 * 3. Rewrites each answer_explanation to thorough sectional format
 * 4. Processes in batches of 20 with progress tracking
 * 5. Updates the database with new explanations
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { Anthropic } = require('@anthropic-ai/sdk');

// Initialize Supabase client with service role key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing required environment variables');
  console.error('REACT_APP_SUPABASE_URL:', supabaseUrl ? 'Found' : 'Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Found' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Anthropic client for AI-powered rewriting
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Rewrites a single explanation to the thorough sectional format
 * @param {Object} example - The example object with question_text, choices, correct_answer, answer_explanation
 * @returns {Promise<string>} - The rewritten explanation
 */
async function rewriteExplanation(example) {
  const { question_text, choices, correct_answer, answer_explanation } = example;

  const prompt = `You are an expert ACT test prep tutor. Rewrite the following explanation to be thorough, educational, and well-structured.

**Current Question:**
${question_text}

**Choices:**
${JSON.stringify(choices, null, 2)}

**Correct Answer:** ${correct_answer}

**Current Explanation:**
${answer_explanation}

**Required Format:**

\`\`\`
**Choice A: "[choice text]"**
[2-3 sentences thoroughly explaining why this choice is right or wrong, explaining the concept clearly]
✗ Incorrect (or ✓ CORRECT if it's the right answer)

**Choice B: "[choice text]"**
[2-3 sentences thoroughly explaining why this choice is right or wrong]
✗ Incorrect (or ✓ CORRECT if it's the right answer)

... (continue for all choices)

The answer is [letter].
\`\`\`

**Key Requirements:**
1. Use bold markdown for each choice header: \`**Choice A: "text"**\`
2. Write 2-3 thorough sentences explaining WHY each choice is right/wrong
3. Be educational - explain the concept, don't just say "wrong"
4. Mark incorrect choices with \`✗ Incorrect\`
5. Mark the CORRECT choice with \`✓ CORRECT\` (all caps)
6. End with \`The answer is [letter].\`
7. Make explanations super clear for students learning

Rewrite the explanation now:`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const rewrittenExplanation = message.content[0].text.trim();
    return rewrittenExplanation;
  } catch (error) {
    console.error(`Error rewriting explanation for example ${example.id}:`, error.message);
    throw error;
  }
}

/**
 * Processes examples in batches and updates the database
 * @param {Array} examples - All examples to process
 * @param {number} batchSize - Number of examples per batch
 */
async function processBatches(examples, batchSize = 20) {
  const totalExamples = examples.length;
  let successCount = 0;
  let failCount = 0;
  const failedIds = [];

  console.log(`\nStarting to process ${totalExamples} examples in batches of ${batchSize}...`);
  console.log('='.repeat(80));

  for (let i = 0; i < totalExamples; i += batchSize) {
    const batch = examples.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(totalExamples / batchSize);

    console.log(`\n[BATCH ${batchNumber}/${totalBatches}] Processing examples ${i + 1}-${Math.min(i + batchSize, totalExamples)}...`);

    for (const example of batch) {
      const exampleIndex = examples.indexOf(example) + 1;
      process.stdout.write(`  [${exampleIndex}/${totalExamples}] Rewriting example ${example.id}... `);

      try {
        const rewrittenExplanation = await rewriteExplanation(example);

        // Update the database
        const { error } = await supabase
          .from('lesson_examples')
          .update({ answer_explanation: rewrittenExplanation })
          .eq('id', example.id);

        if (error) {
          throw error;
        }

        successCount++;
        console.log('✓ SUCCESS');
      } catch (error) {
        failCount++;
        failedIds.push(example.id);
        console.log(`✗ FAILED: ${error.message}`);
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`  Batch ${batchNumber} complete: ${successCount}/${exampleIndex} successful`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('FINAL SUMMARY:');
  console.log(`  Total examples processed: ${totalExamples}`);
  console.log(`  Successfully rewritten: ${successCount}`);
  console.log(`  Failed: ${failCount}`);

  if (failedIds.length > 0) {
    console.log(`  Failed IDs: ${failedIds.join(', ')}`);
  }

  return { totalExamples, successCount, failCount, failedIds };
}

/**
 * Main function to orchestrate the rewriting process
 */
async function main() {
  console.log('Starting explanation rewriting process...\n');

  try {
    // Fetch all examples from the lesson_examples table
    console.log('Fetching examples from database...');
    const { data: examples, error } = await supabase
      .from('lesson_examples')
      .select('id, question_text, choices, correct_answer, answer_explanation')
      .order('id');

    if (error) {
      throw error;
    }

    if (!examples || examples.length === 0) {
      console.log('No examples found in the database.');
      return;
    }

    console.log(`Found ${examples.length} examples to process.\n`);

    // Process examples in batches
    const results = await processBatches(examples, 20);

    console.log('\nRewriting process completed!');

    if (results.failCount === 0) {
      console.log('All explanations were successfully rewritten.');
    } else {
      console.log(`Warning: ${results.failCount} examples failed to update.`);
    }

  } catch (error) {
    console.error('\nFatal error:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the main function
main();
