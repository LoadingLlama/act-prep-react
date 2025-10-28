#!/usr/bin/env node
/**
 * ADD ITALICS TO ALL TEST SECTIONS
 *
 * Adds proper italicization according to ACT conventions:
 * - Math: Variables (x, y, z), function names (f, g, h), angle notation
 * - Science: "Experiment 1", "Study 1", "Figure 1", "Table 1", scientific names
 * - Reading: Passage titles, book/article titles, emphasized terms
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Italicize single-letter variables in mathematical context
 * Examples: x, y, z, a, b, c, f, g, h, n, m, etc.
 */
function italicizeMathVariables(text) {
  if (!text) return text;

  let result = text;

  // Italicize function notation: f(x,y) → <i>f</i>(<i>x</i>,<i>y</i>)
  // Only replace if not already italicized
  result = result.replace(/(?<!<i>)\b([a-hj-z])\(([a-z])\)(?!<\/i>)/gi, '<i>$1</i>(<i>$2</i>)');
  result = result.replace(/(?<!<i>)\b([a-hj-z])\(([a-z]),\s*([a-z])\)(?!<\/i>)/gi, '<i>$1</i>(<i>$2</i>, <i>$3</i>)');
  result = result.replace(/(?<!<i>)\b([a-hj-z])\(([a-z]),\s*([a-z]),\s*([a-z])\)(?!<\/i>)/gi, '<i>$1</i>(<i>$2</i>, <i>$3</i>, <i>$4</i>)');

  // Italicize angle notation: ∠BAC → ∠<i>BAC</i>
  result = result.replace(/∠(?!<i>)([A-Z]{2,4})(?!<\/i>)/g, '∠<i>$1</i>');

  // Italicize common math variables when standalone
  // Only italicize if it's a clear variable context (between spaces, punctuation, or start/end)
  const variables = ['x', 'y', 'z', 'a', 'b', 'c', 'd', 'f', 'g', 'h', 'n', 'm', 'k', 'r', 's', 't', 'p', 'q', 'w', 'v', 'u'];

  for (const v of variables) {
    // Match single letter with word boundaries
    // Avoid replacing 'a' when it's an article by checking context
    if (v === 'a') {
      // Only italicize 'a' in mathematical contexts (with numbers, equals, etc.)
      result = result.replace(/(?<!<i>)\b(a)\s*=(?!<\/i>)/g, '<i>$1</i> =');
      result = result.replace(/=\s*(?<!<i>)(a)\b(?!<\/i>)/g, '= <i>$1</i>');
      result = result.replace(/(?<!<i>)\b(a)\s*\+(?!<\/i>)/g, '<i>$1</i> +');
      result = result.replace(/\+\s*(?<!<i>)(a)\b(?!<\/i>)/g, '+ <i>$1</i>');
      result = result.replace(/(?<!<i>)\b(a)\s*−(?!<\/i>)/g, '<i>$1</i> −');
      result = result.replace(/−\s*(?<!<i>)(a)\b(?!<\/i>)/g, '− <i>$1</i>');
      result = result.replace(/(?<!<i>)\b(a)\s*\*(?!<\/i>)/g, '<i>$1</i> *');
      result = result.replace(/\*\s*(?<!<i>)(a)\b(?!<\/i>)/g, '* <i>$1</i>');
      result = result.replace(/(?<!<i>)\b(a)\s*\/(?!<\/i>)/g, '<i>$1</i> /');
      result = result.replace(/\/\s*(?<!<i>)(a)\b(?!<\/i>)/g, '/ <i>$1</i>');
    } else {
      // For other variables, italicize in most contexts
      // Don't use \b word boundaries because they don't work with superscripts
      const regex = new RegExp(v, 'g');
      result = result.replace(regex, (match, offset, string) => {
        // Check if already in italic tags
        const before20 = string.substring(Math.max(0, offset - 20), offset);
        const after20 = string.substring(offset + 1, Math.min(string.length, offset + 21));

        if (before20.includes('<i>') && !before20.includes('</i>')) {
          // Already inside italic tags
          return match;
        }

        // Don't italicize if it's part of a word like "is", "of", "to"
        const before = string[offset - 1] || ' ';
        const after = string[offset + 1] || ' ';

        // Check if it's truly standalone or part of a math expression
        // Allow digits, superscripts, and subscripts before/after (for 3x, x²y, etc.)
        const validBefore = /[\s,;:.()\[\]{}=+\-*/^<>0-9²³⁴⁰¹⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉−]/.test(before);
        const validAfter = /[\s,;:.()\[\]{}=+\-*/^²³⁴⁰¹⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉<>.!?−]/.test(after);

        // Also check that we're not in the middle of a word
        const beforeIsLetter = /[a-zA-Z]/.test(before);
        const afterIsLetter = /[a-zA-Z]/.test(after);

        if (validBefore && validAfter && !beforeIsLetter && !afterIsLetter) {
          return `<i>${match}</i>`;
        }
        return match;
      });
    }
  }

  // Clean up any accidental double italics
  result = result.replace(/<i><i>/g, '<i>');
  result = result.replace(/<\/i><\/i>/g, '</i>');
  result = result.replace(/<i>\s*<\/i>/g, '');

  return result;
}

/**
 * Italicize scientific terms and references
 * Examples: Experiment 1, Study 2, Figure 3, Table 1
 */
function italicizeScienceTerms(text) {
  if (!text) return text;

  let result = text;

  // Italicize "Experiment #", "Study #", "Figure #", "Table #"
  result = result.replace(/\b(Experiment|Study|Figure|Table)\s+(\d+)/g, '<i>$1 $2</i>');

  // Italicize scientific names (Latin binomial nomenclature)
  // Pattern: Capitalized word followed by lowercase word (e.g., "Homo sapiens")
  // Only if they appear to be scientific names (conservative approach)

  return result;
}

/**
 * Italicize reading passage elements
 * Examples: book titles, article titles, emphasized terms
 */
function italicizeReadingTerms(text) {
  if (!text) return text;

  let result = text;

  // This is more conservative - we'd need to identify actual titles
  // For now, we'll handle this manually or with a more sophisticated approach

  return result;
}

/**
 * Process Math questions
 */
async function processMathQuestions(testNumber) {
  console.log(`\n🔢 Processing Math Test ${testNumber}...`);

  const { data: questions } = await supabase
    .from('practice_test_math_questions')
    .select('id, question_number, question_text, choices')
    .eq('test_number', testNumber)
    .order('question_number');

  if (!questions || questions.length === 0) {
    console.log(`  ⚠️  No questions found`);
    return 0;
  }

  let updated = 0;

  for (const q of questions) {
    let questionText = italicizeMathVariables(q.question_text);

    // Process choices
    let choices = JSON.parse(q.choices);
    choices = choices.map(choice => italicizeMathVariables(choice));

    // Only update if something changed
    if (questionText !== q.question_text || JSON.stringify(choices) !== q.choices) {
      const { error } = await supabase
        .from('practice_test_math_questions')
        .update({
          question_text: questionText,
          choices: JSON.stringify(choices)
        })
        .eq('id', q.id);

      if (error) {
        console.log(`  ❌ Error updating Q${q.question_number}: ${error.message}`);
      } else {
        updated++;
      }
    }
  }

  console.log(`  ✅ Updated ${updated}/${questions.length} questions`);
  return updated;
}

/**
 * Process Science questions and passages
 */
async function processScienceQuestions(testNumber) {
  console.log(`\n🔬 Processing Science Test ${testNumber}...`);

  // Update passages
  const { data: passages } = await supabase
    .from('practice_test_science_passages')
    .select('id, passage_number, passage_text')
    .eq('test_number', testNumber)
    .order('passage_number');

  let passagesUpdated = 0;

  if (passages && passages.length > 0) {
    for (const p of passages) {
      let passageText = italicizeScienceTerms(p.passage_text);

      if (passageText !== p.passage_text) {
        const { error } = await supabase
          .from('practice_test_science_passages')
          .update({ passage_text: passageText })
          .eq('id', p.id);

        if (!error) {
          passagesUpdated++;
        }
      }
    }
  }

  // Update questions
  const { data: questions } = await supabase
    .from('practice_test_science_questions')
    .select('id, question_number, question_text, choices')
    .eq('test_number', testNumber)
    .order('question_number');

  let questionsUpdated = 0;

  if (questions && questions.length > 0) {
    for (const q of questions) {
      let questionText = italicizeScienceTerms(q.question_text);

      let choices = JSON.parse(q.choices);
      choices = choices.map(choice => italicizeScienceTerms(choice));

      if (questionText !== q.question_text || JSON.stringify(choices) !== q.choices) {
        const { error } = await supabase
          .from('practice_test_science_questions')
          .update({
            question_text: questionText,
            choices: JSON.stringify(choices)
          })
          .eq('id', q.id);

        if (!error) {
          questionsUpdated++;
        }
      }
    }
  }

  console.log(`  ✅ Updated ${passagesUpdated} passages, ${questionsUpdated} questions`);
  return passagesUpdated + questionsUpdated;
}

/**
 * Process Reading questions and passages
 */
async function processReadingQuestions(testNumber) {
  console.log(`\n📖 Processing Reading Test ${testNumber}...`);

  // For now, Reading italics are handled conservatively
  // We'll add specific patterns as needed

  console.log(`  ℹ️  Reading italics handled conservatively - manual review may be needed`);
  return 0;
}

/**
 * Main execution
 */
async function addItalicsToAllSections() {
  console.log('✨ ADDING ITALICS TO ALL TEST SECTIONS\n');
  console.log('='.repeat(80) + '\n');

  // Get test range from command line args (default: just test 1 for safety)
  const args = process.argv.slice(2);
  const runAll = args.includes('--all');

  const startTest = runAll ? 1 : 1;
  const endTest = runAll ? 7 : 1;

  if (!runAll) {
    console.log('⚠️  TESTING MODE: Processing Test 1 only');
    console.log('💡 Use --all flag to process all 7 tests\n');
  }

  let totalUpdated = 0;

  for (let testNum = startTest; testNum <= endTest; testNum++) {
    console.log(`\n📝 TEST ${testNum}`);
    console.log('-'.repeat(80));

    const mathUpdated = await processMathQuestions(testNum);
    const scienceUpdated = await processScienceQuestions(testNum);
    const readingUpdated = await processReadingQuestions(testNum);

    totalUpdated += mathUpdated + scienceUpdated + readingUpdated;
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ COMPLETE! Updated ${totalUpdated} items\n`);

  if (!runAll) {
    console.log('✅ Test 1 processed successfully!');
    console.log('💡 Review the results, then run: node scripts/add-italics-all-sections.mjs --all\n');
  }
}

addItalicsToAllSections().catch(console.error);
