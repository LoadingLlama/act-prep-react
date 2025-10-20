/**
 * ============================================================================
 * SUPER EASY LESSON UPLOADER
 * ============================================================================
 *
 * Upload a new lesson from simple text format - NO CODING REQUIRED!
 *
 * Usage:
 * 1. Create a text file with your lesson content
 * 2. Run: node scripts/upload-lesson.js path/to/lesson.txt
 * 3. Done! Your lesson is uploaded and ready.
 *
 * Text Format:
 * - Use ## for section headings
 * - Use ### for subsection headings
 * - Use - for bullet points
 * - Use EXAMPLE: for examples
 * - Use KEY TAKEAWAYS: for summary
 * - Use {term} for key terms to highlight
 *
 * Example lesson.txt:
 * -------------------
 * ## 1. What Is Backsolving?
 *
 * {Backsolving} is a powerful strategy...
 *
 * - Faster than algebra
 * - Less mistakes
 *
 * EXAMPLE: Basic Backsolving
 * If √x + 10 = 20, what is x?
 * A. 2
 * B. 6
 * C. 10
 * D. 14
 * E. 18
 *
 * SOLUTION:
 * Try C (10):
 * √10 + 10 = 13.16
 * ≠ 20
 * Doesn't work
 *
 * Try D (14):
 * √14 + 10 = 13.74
 * ≠ 20
 * Still wrong
 *
 * Answer: (System will detect from solution)
 *
 * KEY TAKEAWAYS:
 * - Start with middle choice
 * - Test each systematically
 * -------------------
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { validateLessonContent } = require('../src/schemas/lessonContent.schema');
require('dotenv').config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main() {
  console.log('═'.repeat(80));
  console.log('📤 SUPER EASY LESSON UPLOADER');
  console.log('═'.repeat(80));
  console.log();

  // Get file path from arguments
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('❌ Error: No file provided');
    console.log();
    console.log('Usage: node scripts/upload-lesson.js <path-to-lesson-file>');
    console.log();
    console.log('Example: node scripts/upload-lesson.js docs/my-lesson.txt');
    process.exit(1);
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`📄 Reading file: ${filePath}`);

  // Read file
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`✅ File loaded (${content.length} characters)`);
  console.log();

  // Parse the text format
  console.log('🔄 Converting text to JSON...');
  const lessonData = parseTextToJson(content);

  console.log(`✅ Conversion complete`);
  console.log(`   - ${lessonData.content.length} content blocks created`);
  console.log();

  // Validate
  console.log('🔍 Validating lesson structure...');
  const validation = validateLessonContent(lessonData);

  if (!validation.valid) {
    console.error('❌ Validation failed:');
    validation.errors.forEach(err => console.error(`   - ${err}`));
    process.exit(1);
  }

  console.log('✅ Validation passed');
  console.log();

  // Ask for lesson metadata
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (question) => new Promise(resolve => readline.question(question, resolve));

  try {
    console.log('📝 Please provide lesson metadata:');
    console.log();

    const title = await ask('Lesson Title: ');
    const subject = await ask('Subject (math/english/reading/science): ');
    const category = await ask('Category (e.g., "Test-Taking Strategies"): ');
    const difficulty = await ask('Difficulty (1-5): ');

    readline.close();

    // Create lesson in database
    console.log();
    console.log('💾 Uploading to database...');

    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .insert({
        title: title,
        subject: subject,
        category: category,
        difficulty_level: parseInt(difficulty) || 1,
        content_json: lessonData,
        is_published: false,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (lessonError) {
      console.error('❌ Error uploading lesson:', lessonError);
      process.exit(1);
    }

    console.log();
    console.log('✅ LESSON UPLOADED SUCCESSFULLY!');
    console.log();
    console.log('📊 Lesson Details:');
    console.log(`   ID: ${lesson.id}`);
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Subject: ${lesson.subject}`);
    console.log(`   Status: Draft (not published)`);
    console.log();
    console.log('💡 To publish this lesson, run:');
    console.log(`   node scripts/publish-lesson.js ${lesson.id}`);
    console.log();

  } catch (error) {
    readline.close();
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// TEXT PARSER
// ============================================================================

function parseTextToJson(text) {
  console.log('📖 Parsing text content...');

  const lines = text.split('\n');
  const content = [];
  let currentParagraph = [];
  let currentList = [];
  let inExample = false;
  let currentExample = null;
  let inSolution = false;
  let inKeyTakeaways = false;
  let currentKeyTakeaways = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines between blocks
    if (!line) {
      flushCurrentBlocks();
      continue;
    }

    // Section heading (##)
    if (line.startsWith('##')) {
      flushCurrentBlocks();
      const headingText = line.replace(/^#+\s*/, '');
      content.push({
        type: 'heading',
        level: line.startsWith('###') ? 4 : 3,
        text: headingText
      });
      console.log(`   📌 Heading: "${headingText}"`);
      continue;
    }

    // Example block
    if (line.startsWith('EXAMPLE:')) {
      flushCurrentBlocks();
      inExample = true;
      currentExample = {
        type: 'example',
        title: line.replace('EXAMPLE:', '').trim(),
        problem: '',
        choices: [],
        solution: { steps: [], answer: '' }
      };
      console.log(`   🎯 Example: "${currentExample.title}"`);
      continue;
    }

    // Solution block
    if (line === 'SOLUTION:') {
      inSolution = true;
      continue;
    }

    // Key takeaways block
    if (line.startsWith('KEY TAKEAWAYS:')) {
      flushCurrentBlocks();
      inKeyTakeaways = true;
      continue;
    }

    // In example - parse choices (A. B. C. etc.)
    if (inExample && line.match(/^[A-E]\.\s/)) {
      const letter = line[0];
      const value = line.substring(3).trim();
      currentExample.choices.push({ letter, value });
      console.log(`      Choice ${letter}: ${value}`);
      continue;
    }

    // In solution - parse steps
    if (inSolution && inExample) {
      // Detect new attempt
      if (line.match(/^(Try|Start with|Test)/i)) {
        if (currentExample.solution.steps.length > 0 && currentExample.solution.steps[currentExample.solution.steps.length - 1].work.length === 0) {
          // Previous step had no work, remove it
          currentExample.solution.steps.pop();
        }
        currentExample.solution.steps.push({
          attempt: line.replace(':', '').trim(),
          work: [],
          result: 'incorrect'
        });
        continue;
      }

      // Add to current step's work
      const currentStep = currentExample.solution.steps[currentExample.solution.steps.length - 1];
      if (currentStep) {
        if (line.includes('Works') || line.includes('✓') || line.includes('Correct')) {
          currentStep.result = 'correct';
          // Extract answer
          const answerMatch = currentStep.attempt.match(/([A-E])/);
          if (answerMatch) {
            currentExample.solution.answer = answerMatch[1];
          }
        } else if (line.includes('Doesn\'t work') || line.includes('❌') || line.includes('wrong')) {
          currentStep.result = 'incorrect';
        } else {
          currentStep.work.push(line);
        }
      }
      continue;
    }

    // In key takeaways
    if (inKeyTakeaways) {
      if (line.startsWith('-') || line.startsWith('•')) {
        const item = line.substring(1).trim();
        currentKeyTakeaways.push(item);
        console.log(`   ✓ Takeaway: "${item.substring(0, 50)}..."`);
      }
      continue;
    }

    // Bullet point
    if (line.startsWith('-') || line.startsWith('•')) {
      flushParagraph();
      currentList.push(line.substring(1).trim());
      continue;
    }

    // Regular paragraph line
    if (inExample && !currentExample.problem) {
      currentExample.problem = line;
    } else {
      currentParagraph.push(line);
    }
  }

  // Flush any remaining content
  flushCurrentBlocks();

  function flushCurrentBlocks() {
    flushParagraph();
    flushList();
    flushExample();
    flushKeyTakeaways();
  }

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ');
      const keyTerms = extractKeyTerms(text);

      content.push({
        type: 'paragraph',
        text: text,
        keyTerms: keyTerms.length > 0 ? keyTerms : undefined
      });

      console.log(`   📝 Paragraph (${text.length} chars, ${keyTerms.length} key terms)`);
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList.length > 0) {
      content.push({
        type: 'list',
        items: currentList
      });
      console.log(`   📋 List (${currentList.length} items)`);
      currentList = [];
    }
  }

  function flushExample() {
    if (inExample && currentExample) {
      content.push(currentExample);
      console.log(`   ✅ Example complete (${currentExample.choices.length} choices, ${currentExample.solution.steps.length} steps)`);
      inExample = false;
      inSolution = false;
      currentExample = null;
    }
  }

  function flushKeyTakeaways() {
    if (inKeyTakeaways && currentKeyTakeaways.length > 0) {
      content.push({
        type: 'key_takeaways',
        items: currentKeyTakeaways
      });
      console.log(`   ✅ Key Takeaways (${currentKeyTakeaways.length} items)`);
      inKeyTakeaways = false;
      currentKeyTakeaways = [];
    }
  }

  function extractKeyTerms(text) {
    const terms = [];
    const regex = /\{([^}]+)\}/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      terms.push(match[1]);
    }
    return terms;
  }

  return {
    version: '1.0.0',
    lessonId: 'pending', // Will be set after upload
    content: content
  };
}

// ============================================================================
// RUN
// ============================================================================

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { parseTextToJson };
