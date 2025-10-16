import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Extracts examples from HTML content
 * Returns array of example objects
 */
function extractExamplesFromHTML(htmlContent) {
  const examples = [];

  // Split by Example headers (h4 with "Example N:")
  const examplePattern = /<h4[^>]*>\s*Example (\d+):\s*([^<]+)<\/h4>/gi;
  const matches = [...htmlContent.matchAll(examplePattern)];

  if (matches.length === 0) {
    return examples;
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const exampleNum = parseInt(match[1]);
    const title = match[2].trim();
    const startIndex = match.index;

    // Find end of this example (start of next example or end of content)
    const nextMatch = matches[i + 1];
    const endIndex = nextMatch ? nextMatch.index : htmlContent.length;
    const exampleHTML = htmlContent.substring(startIndex, endIndex);

    // Extract problem text - try new format first (yellow box), then old format
    let problemText = '';

    // New format: Yellow gradient box with font-weight: 500
    const newFormatMatch = exampleHTML.match(/<div[^>]*background:[^>]*linear-gradient[^>]*fef3c7[^>]*>[\s\S]*?<p[^>]*font-weight:\s*500[^>]*>([\s\S]*?)<\/p>/i);
    if (newFormatMatch) {
      problemText = newFormatMatch[1].trim();
    } else {
      // Old format: First <p> tag after h4, before answer choices or solution
      const oldFormatMatch = exampleHTML.match(/<\/h4>\s*(?:<div[^>]*>)?\s*<p[^>]*>([\s\S]*?)<\/p>/i);
      if (oldFormatMatch) {
        problemText = oldFormatMatch[1].trim();
      }
    }

    // Extract answer choices (A-E or F-K format) - handle both formats
    const choices = [];

    // New format: <p> tags with Times New Roman and <strong>A)</strong>
    const newChoicePattern = /<p[^>]*Times New Roman[^>]*>\s*<strong>([A-K])\)<\/strong>\s*(.*?)<\/p>/gi;
    let choiceMatch;
    while ((choiceMatch = newChoicePattern.exec(exampleHTML)) !== null) {
      choices.push({
        letter: choiceMatch[1],
        text: choiceMatch[2].trim()
      });
    }

    // Old format: <span> tags with Times New Roman followed by letter and text
    if (choices.length === 0) {
      const oldChoicePattern = /<span[^>]*Times New Roman[^>]*>([A-K])\.\s*(.*?)<\/span>/gi;
      while ((choiceMatch = oldChoicePattern.exec(exampleHTML)) !== null) {
        choices.push({
          letter: choiceMatch[1],
          text: choiceMatch[2].trim()
        });
      }
    }

    // Extract correct answer - handle both formats
    let correctAnswer = null;

    // New format: Green colored "Answer: B"
    const newAnswerMatch = exampleHTML.match(/<strong[^>]*color:\s*#15803d[^>]*>Answer:\s*([A-K])<\/strong>/i);
    if (newAnswerMatch) {
      correctAnswer = newAnswerMatch[1];
    } else {
      // Old format: "Answer: B" in plain text
      const oldAnswerMatch = exampleHTML.match(/Answer:\s*([A-K])/i);
      if (oldAnswerMatch) {
        correctAnswer = oldAnswerMatch[1];
      }
    }

    // Extract solution steps - handle both formats
    const solutionSteps = [];

    // New format: <p><strong>Step 1:</strong> text</p>
    const newStepPattern = /<p[^>]*line-height:\s*1\.6[^>]*>\s*<strong>Step\s+(\d+):<\/strong>\s*(.*?)<\/p>/gi;
    let stepMatch;
    while ((stepMatch = newStepPattern.exec(exampleHTML)) !== null) {
      solutionSteps.push({
        step: parseInt(stepMatch[1]),
        text: stepMatch[2].trim()
      });
    }

    // Old format: <li> bullet points after "Solution:"
    if (solutionSteps.length === 0) {
      const solutionMatch = exampleHTML.match(/<strong>Solution:<\/strong>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i);
      if (solutionMatch) {
        const listItems = solutionMatch[1].match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
        if (listItems) {
          listItems.forEach((item, index) => {
            const text = item.replace(/<\/?li[^>]*>/g, '').trim();
            solutionSteps.push({
              step: index + 1,
              text: text
            });
          });
        }
      }
    }

    // Extract answer explanation
    const explanationMatch = exampleHTML.match(/<strong[^>]*color:\s*#15803d[^>]*>Answer:\s*[A-K]<\/strong>\s*—\s*(.*?)(?:<\/p>|$)/i);
    const answerExplanation = explanationMatch ? explanationMatch[1].trim() : '';

    // Check if this is a worked example (no choices)
    const isWorkedExample = choices.length === 0;

    examples.push({
      position: exampleNum,
      title,
      problem_text: problemText,
      choices: choices.length > 0 ? choices : null,
      correct_answer: correctAnswer,
      solution_steps: solutionSteps,
      answer_explanation: answerExplanation,
      is_worked_example: isWorkedExample,
      diagram_svg: null // Will add later for geometry lessons if needed
    });
  }

  return examples;
}

/**
 * Get all HTML files from docs directory
 */
function getAllLessonFiles() {
  const docsDir = path.join(__dirname, '..', 'docs');
  const files = fs.readdirSync(docsDir);
  return files
    .filter(f => f.endsWith('.html'))
    .map(f => ({
      filename: f,
      path: path.join(docsDir, f)
    }));
}

/**
 * Extract lesson key from filename
 * LESSON_5_2_PERCENTAGES.html -> 5.2
 * LESSON_1_1_BACKSOLVING.html -> backsolving
 * LESSON_1_2_SUBSTITUTION_NEW_COMPLETE.html -> substitution
 */
function getLessonKeyFromFilename(filename) {
  // Special case for backsolving (Math 1.1)
  if (filename.includes('BACKSOLVING')) {
    return 'backsolving';
  }

  // Special case for substitution (Math 1.2)
  if (filename.includes('SUBSTITUTION')) {
    return 'substitution';
  }

  // Standard format: LESSON_X_Y_
  const match = filename.match(/LESSON_(\d+)_(\d+)_/);
  if (match) {
    return `${match[1]}.${match[2]}`;
  }

  return null;
}

/**
 * Main migration function
 */
async function migrateExamples() {
  console.log('🔄 MIGRATING ALL EXAMPLES TO SUPABASE');
  console.log('================================================================================\n');

  const lessonFiles = getAllLessonFiles();
  let totalExamples = 0;
  let processedLessons = 0;

  for (const file of lessonFiles) {
    const lessonKey = getLessonKeyFromFilename(file.filename);
    if (!lessonKey) {
      console.log(`⏭️  Skipping ${file.filename} (no lesson key)`);
      continue;
    }

    // Get lesson UUID from database
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError || !lesson) {
      console.log(`❌ Lesson ${lessonKey} not found in database`);
      continue;
    }

    // Read HTML content
    const htmlContent = fs.readFileSync(file.path, 'utf8');

    // Extract examples
    const examples = extractExamplesFromHTML(htmlContent);

    if (examples.length === 0) {
      console.log(`⏭️  ${lessonKey}: ${lesson.title} - No examples`);
      continue;
    }

    console.log(`\n📝 ${lessonKey}: ${lesson.title}`);
    console.log(`   Found ${examples.length} examples`);

    // Delete existing examples for this lesson
    const { error: deleteError } = await supabase
      .from('examples')
      .delete()
      .eq('lesson_id', lesson.id);

    if (deleteError) {
      console.log(`   ❌ Error deleting old examples: ${deleteError.message}`);
      continue;
    }

    // Insert new examples
    for (const example of examples) {
      const { error: insertError } = await supabase
        .from('examples')
        .insert({
          lesson_id: lesson.id,
          ...example
        });

      if (insertError) {
        console.log(`   ❌ Error inserting example ${example.position}: ${insertError.message}`);
      } else {
        console.log(`   ✓ Example ${example.position}: ${example.title}`);
        totalExamples++;
      }
    }

    processedLessons++;
  }

  console.log('\n================================================================================');
  console.log(`✅ MIGRATION COMPLETE!`);
  console.log(`   Processed ${processedLessons} lessons`);
  console.log(`   Migrated ${totalExamples} examples total`);
}

// Run migration
migrateExamples().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
