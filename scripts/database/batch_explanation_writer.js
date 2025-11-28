/**
 * Batch Explanation Writer
 *
 * This script provides a framework for writing highly specific explanations
 * for all 215 diagnostic test questions. It reads the question data and
 * provides a structure for adding detailed, context-specific explanations.
 *
 * The explanations will reference:
 * - Actual question content (numbers, variables, terms)
 * - Specific answer choices
 * - Why the correct answer works
 * - Why each wrong answer fails
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Load question data
 */
function loadQuestionData() {
  return {
    math: JSON.parse(fs.readFileSync('export_math_questions.json', 'utf8')),
    english: JSON.parse(fs.readFileSync('export_english_questions.json', 'utf8')),
    reading: JSON.parse(fs.readFileSync('export_reading_questions.json', 'utf8')),
    science: JSON.parse(fs.readFileSync('export_science_questions.json', 'utf8'))
  };
}

/**
 * Create a detailed analysis file for manual explanation writing
 */
function createDetailedQuestionGuide() {
  const data = loadQuestionData();

  let output = `# DIAGNOSTIC TEST EXPLANATION WRITING GUIDE\n\n`;
  output += `Total Questions: 215\n`;
  output += `- Math: ${data.math.length}\n`;
  output += `- English: ${data.english.length}\n`;
  output += `- Reading: ${data.reading.length}\n`;
  output += `- Science: ${data.science.length}\n\n`;

  output += `## MATH QUESTIONS (60)\n\n`;
  data.math.forEach((q, idx) => {
    output += `### Question ${q.question_number} (ID: ${q.id})\n`;
    output += `**Question:** ${q.question_text}\n\n`;
    q.choices.forEach(c => output += `- ${c}\n`);
    output += `\n**CORRECT:** ${q.correct_answer} - ${q.correct_choice}\n\n`;
    if (q.image_url) {
      output += `**IMAGE:** ${q.image_url}\n\n`;
    }
    output += `**WRITE EXPLANATION HERE:**\n`;
    output += `Correct: [Explain step-by-step using actual numbers from the question]\n\n`;
    output += `Wrong answers:\n`;
    q.choices.forEach(c => {
      const letter = c.split('.')[0];
      if (letter !== q.correct_answer) {
        output += `- ${letter}: [Why this specific answer is wrong]\n`;
      }
    });
    output += `\n---\n\n`;
  });

  fs.writeFileSync('EXPLANATION_GUIDE_MATH.md', output);
  console.log('Created EXPLANATION_GUIDE_MATH.md');
}

/**
 * Process explanations from a structured JSON file
 */
async function processExplanationsFromJSON(subject, jsonFile, tableName) {
  console.log(`\nProcessing ${subject} explanations from ${jsonFile}...`);

  if (!fs.existsSync(jsonFile)) {
    console.log(`  File ${jsonFile} not found. Skipping.`);
    return { updated: 0, errors: 0 };
  }

  const explanations = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

  let updated = 0;
  let errors = 0;

  for (const item of explanations) {
    if (!item.explanation_html) {
      console.log(`  Skipping question ${item.id} - no explanation provided`);
      continue;
    }

    try {
      const { error } = await supabase
        .from(tableName)
        .update({ explanation: item.explanation_html })
        .eq('id', item.id);

      if (error) {
        console.error(`  Error updating question ${item.id}:`, error.message);
        errors++;
      } else {
        updated++;
        console.log(`  ✓ Updated question ${item.id}`);
      }
    } catch (e) {
      console.error(`  Exception for question ${item.id}:`, e.message);
      errors++;
    }
  }

  console.log(`${subject}: ${updated} updated, ${errors} errors`);
  return { updated, errors };
}

/**
 * Update a single question's explanation
 */
async function updateSingleExplanation(questionId, tableName, explanationHTML) {
  const { error } = await supabase
    .from(tableName)
    .update({ explanation: explanationHTML })
    .eq('id', questionId);

  if (error) {
    console.error(`Error updating question ${questionId}:`, error.message);
    return false;
  }

  console.log(`✓ Updated question ${questionId}`);
  return true;
}

/**
 * Test function - update a few sample questions
 */
async function testUpdate() {
  console.log('Testing explanation update...\n');

  // Test Math Question 1 (ID: 76)
  const mathExplanation = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Substitute x = 3 and y = 2 into the function: f(3,2) = 3(3)² − 4(2) = 3(9) − 8 = 27 − 8 = 19.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (0):</strong> May result from calculation errors or misapplying the formula.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (10):</strong> Results from incorrect order of operations or arithmetic errors.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (24):</strong> May result from forgetting to multiply by 3 after squaring: 3² − 4(2) = 9 − 8 = 1, with additional errors.</div>
<div><strong>Choice E (28):</strong> May result from adding instead of subtracting: 3(9) + 4(2) = 27 + 8 = 35, with additional errors.</div>
</div>
</div>`;

  await updateSingleExplanation(76, 'practice_test_math_questions', mathExplanation);

  console.log('\nTest complete! Check question 76 in the database.');
}

/**
 * Main menu
 */
function showMenu() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║       DIAGNOSTIC TEST EXPLANATION BATCH WRITER             ║
╚════════════════════════════════════════════════════════════╝

Available commands:

1. createDetailedQuestionGuide()  - Create markdown guide for all questions
2. testUpdate()                    - Test updating one question
3. processExplanationsFromJSON()   - Process explanations from JSON files
4. loadQuestionData()              - Load and inspect question data

Example usage:
  node batch_explanation_writer.js

Then in Node REPL:
  .load batch_explanation_writer.js
  createDetailedQuestionGuide()
  testUpdate()
`);
}

// Export functions
module.exports = {
  loadQuestionData,
  createDetailedQuestionGuide,
  processExplanationsFromJSON,
  updateSingleExplanation,
  testUpdate
};

// If run directly
if (require.main === module) {
  showMenu();

  // Uncomment to run specific function:
  // createDetailedQuestionGuide();
  // testUpdate();
}
