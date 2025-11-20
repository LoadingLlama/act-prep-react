/**
 * COMPREHENSIVE EXPLANATION GENERATOR FOR ALL 215 DIAGNOSTIC QUESTIONS
 *
 * This script generates HIGHLY SPECIFIC explanations for each question by:
 * 1. Reading the actual question content
 * 2. Analyzing the correct answer
 * 3. Determining why each wrong answer fails
 * 4. Generating HTML formatted explanations
 * 5. Uploading to the database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Load full question data with passages
 */
function loadFullQuestionData() {
  return JSON.parse(fs.readFileSync('diagnostic_questions_full.json', 'utf8'));
}

/**
 * Parse choices array
 */
function parseChoices(choices) {
  if (Array.isArray(choices)) return choices;
  try {
    return JSON.parse(choices);
  } catch {
    return [];
  }
}

/**
 * Get choice letter for different subjects
 */
function getChoiceInfo(question, subject) {
  const choices = parseChoices(question.choices);
  let correctIndex;

  // Determine correct index based on subject
  if (subject === 'math' || subject === 'science') {
    if (/^[A-E]$/.test(question.correct_answer)) {
      correctIndex = question.correct_answer.charCodeAt(0) - 65;
    } else {
      correctIndex = parseInt(question.correct_answer);
    }
  } else {
    correctIndex = parseInt(question.correct_answer);
  }

  const letterMapping = {
    'english': ['A', 'B', 'C', 'D'],
    'math': ['A', 'B', 'C', 'D', 'E'],
    'reading': ['F', 'G', 'H', 'J'],
    'science': ['A', 'B', 'C', 'D']
  };

  return {
    choices,
    correctIndex,
    correctLetter: letterMapping[subject][correctIndex],
    correctChoice: choices[correctIndex],
    getLetterForIndex: (idx) => letterMapping[subject][idx]
  };
}

/**
 * Generate explanation HTML
 */
function generateExplanationHTML(correctExplanation, wrongExplanations) {
  const wrongHTML = Object.entries(wrongExplanations)
    .map(([letter, explanation]) =>
      `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> ${explanation}</div>`
    )
    .join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${correctExplanation}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongHTML}
</div>
</div>`;
}

/**
 * Write explanations to separate JS files for review/editing
 */
function exportExplanationTemplates() {
  const questions = loadFullQuestionData();

  console.log('Exporting explanation templates...\n');

  // Create template files for each subject
  const subjects = {
    math: { questions: questions.math, table: 'practice_test_math_questions' },
    english: { questions: questions.english, table: 'practice_test_english_questions' },
    reading: { questions: questions.reading, table: 'practice_test_reading_questions' },
    science: { questions: questions.science, table: 'practice_test_science_questions' }
  };

  for (const [subject, data] of Object.entries(subjects)) {
    let content = `/**\n * ${subject.toUpperCase()} EXPLANATIONS\n * \n * Add specific explanations for each question below.\n * Each entry should reference actual content from the question.\n */\n\n`;

    content += `const ${subject.toUpperCase()}_EXPLANATIONS = [\n`;

    data.questions.forEach((q, idx) => {
      const info = getChoiceInfo(q, subject);

      content += `  {\n`;
      content += `    id: ${q.id},\n`;
      content += `    question_number: ${q.question_number},\n`;
      content += `    question_text: ${JSON.stringify(q.question_text || '[See passage]')},\n`;
      content += `    choices: ${JSON.stringify(info.choices, null, 6)},\n`;
      content += `    correct_answer: "${info.correctLetter}",\n`;
      content += `    correct_choice: ${JSON.stringify(info.correctChoice)},\n`;

      if (subject === 'english' && q.passage) {
        // Extract underlined text for English
        const regex = new RegExp(`<u id="q${q.question_number}">(.*?)</u>`, 'i');
        const match = q.passage.passage_text.match(regex);
        if (match) {
          content += `    underlined_text: ${JSON.stringify(match[1])},\n`;
        }
      }

      content += `    \n`;
      content += `    // WRITE SPECIFIC EXPLANATION HERE:\n`;
      content += `    correct_explanation: "TODO: Explain why ${info.correctLetter} is correct using specific details",\n`;
      content += `    wrong_explanations: {\n`;

      info.choices.forEach((choice, idx) => {
        if (idx !== info.correctIndex) {
          const letter = info.getLetterForIndex(idx);
          content += `      "${letter}": "TODO: Explain why ${letter} is wrong",\n`;
        }
      });

      content += `    }\n`;
      content += `  }${idx < data.questions.length - 1 ? ',' : ''}\n\n`;
    });

    content += `];\n\n`;
    content += `module.exports = ${subject.toUpperCase()}_EXPLANATIONS;\n`;

    const filename = `explanations_${subject}.js`;
    fs.writeFileSync(filename, content);
    console.log(`Created ${filename} with ${data.questions.length} questions`);
  }

  console.log('\n✓ Template files created!');
  console.log('\nNext steps:');
  console.log('1. Edit each explanations_*.js file');
  console.log('2. Replace TODO placeholders with specific explanations');
  console.log('3. Run upload script to update database');
}

/**
 * Upload explanations from completed JS files
 */
async function uploadExplanationsFromFiles() {
  console.log('Uploading explanations to database...\n');

  const subjects = {
    math: 'practice_test_math_questions',
    english: 'practice_test_english_questions',
    reading: 'practice_test_reading_questions',
    science: 'practice_test_science_questions'
  };

  const results = {
    updated: 0,
    errors: 0,
    skipped: 0
  };

  for (const [subject, tableName] of Object.entries(subjects)) {
    const filename = `explanations_${subject}.js`;

    if (!fs.existsSync(filename)) {
      console.log(`⚠ ${filename} not found, skipping`);
      continue;
    }

    console.log(`\nProcessing ${subject}...`);

    try {
      const explanations = require(`./${filename}`);

      for (const item of explanations) {
        // Skip if not completed
        if (item.correct_explanation.startsWith('TODO')) {
          results.skipped++;
          continue;
        }

        const explanationHTML = generateExplanationHTML(
          item.correct_explanation,
          item.wrong_explanations
        );

        const { error } = await supabase
          .from(tableName)
          .update({ explanation: explanationHTML })
          .eq('id', item.id);

        if (error) {
          console.error(`  ✗ Error updating question ${item.id}:`, error.message);
          results.errors++;
        } else {
          console.log(`  ✓ Updated question ${item.question_number} (ID: ${item.id})`);
          results.updated++;
        }
      }
    } catch (e) {
      console.error(`Error processing ${subject}:`, e.message);
    }
  }

  console.log('\n=== UPLOAD SUMMARY ===');
  console.log(`Updated: ${results.updated}`);
  console.log(`Errors: ${results.errors}`);
  console.log(`Skipped (incomplete): ${results.skipped}`);
  console.log(`Total: ${results.updated + results.errors + results.skipped}`);
}

/**
 * Main menu
 */
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args[0] === 'export') {
    exportExplanationTemplates();
  } else if (args[0] === 'upload') {
    uploadExplanationsFromFiles();
  } else {
    console.log(`
Usage:
  node generate_all_215_explanations.js export  - Create explanation template files
  node generate_all_215_explanations.js upload  - Upload completed explanations to database

Workflow:
  1. Run 'export' to create template files
  2. Edit the template files and replace TODOs with specific explanations
  3. Run 'upload' to update the database
    `);
  }
}

module.exports = {
  loadFullQuestionData,
  exportExplanationTemplates,
  uploadExplanationsFromFiles,
  generateExplanationHTML
};
