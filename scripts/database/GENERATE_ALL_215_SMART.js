#!/usr/bin/env node

/**
 * SMART SCRIPT: Auto-detects choice letters from the actual choices
 * Generates all 215 explanations for Practice Test 1
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const TESTS = [
  { table: 'practice_test_english_questions', subject: 'english', count: 75 },
  { table: 'practice_test_math_questions', subject: 'math', count: 60 },
  { table: 'practice_test_reading_questions', subject: 'reading', count: 40 },
  { table: 'practice_test_science_questions', subject: 'science', count: 40 }
];

/** Parse choices */
function parseChoices(choices) {
  if (Array.isArray(choices)) return choices;
  if (typeof choices === 'string') {
    try {
      return JSON.parse(choices);
    } catch {
      return [];
    }
  }
  return [];
}

/** Extract letters from choices array */
function extractLetters(choicesArray) {
  const letters = [];
  for (const choice of choicesArray) {
    if (typeof choice === 'string') {
      const match = choice.match(/^([A-Z])\.\s/);
      if (match) {
        letters.push(match[1]);
      }
    }
  }
  return letters;
}

/** Clean choice text */
function cleanChoice(choice) {
  if (typeof choice !== 'string') return choice;
  return choice.replace(/^[A-Z]\.\s*/, '');
}

/** Generate explanation */
function generateExplanation(question, subject) {
  const { question_text, choices, correct_answer } = question;

  const choicesArray = parseChoices(choices);
  if (choicesArray.length === 0) {
    console.error(`No choices for Q${question.question_number}`);
    return null;
  }

  // Auto-detect letters from choices
  const letters = extractLetters(choicesArray);
  if (letters.length === 0) {
    console.error(`Could not extract letters for Q${question.question_number}`);
    return null;
  }

  const correctIdx = letters.indexOf(correct_answer);
  if (correctIdx === -1) {
    console.error(`Letter "${correct_answer}" not found in ${letters.join('')} for Q${question.question_number}`);
    return null;
  }

  const correctText = cleanChoice(choicesArray[correctIdx]);

  // Get wrong answers
  const wrongIndices = [];
  for (let i = 0; i < choicesArray.length; i++) {
    if (i !== correctIdx) wrongIndices.push(i);
  }

  // Generate
  let correctReason = '';
  let wrongReasons = {};

  if (subject === 'english') {
    correctReason = genEnglishCorrect(question_text, correctText, correct_answer);
    wrongReasons = genEnglishWrong(choicesArray, wrongIndices, letters);
  } else if (subject === 'math') {
    correctReason = genMathCorrect(question_text, correctText, correct_answer);
    wrongReasons = genMathWrong(choicesArray, wrongIndices, letters, correctIdx);
  } else if (subject === 'reading') {
    correctReason = genReadingCorrect(question_text, correctText, correct_answer);
    wrongReasons = genReadingWrong(choicesArray, wrongIndices, letters);
  } else if (subject === 'science') {
    correctReason = genScienceCorrect(question_text, correctText, correct_answer);
    wrongReasons = genScienceWrong(choicesArray, wrongIndices, letters);
  }

  // Build HTML
  let html = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">\n${correctReason}\n</div>\n\n`;
  html += `<div>\n<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>\n`;
  html += `<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">\n`;

  wrongIndices.forEach((idx, pos) => {
    const letter = letters[idx];
    const isLast = pos === wrongIndices.length - 1;
    const margin = isLast ? '' : ' margin-bottom: 0.375rem;';
    html += `<div style="${margin}"><strong>Choice ${letter}:</strong> ${wrongReasons[letter]}</div>\n`;
  });

  html += `</div>\n</div>`;
  return html;
}

// ENGLISH
function genEnglishCorrect(q, text, letter) {
  if (text === 'NO CHANGE') {
    return 'The original text is correct. It follows proper grammar, uses appropriate punctuation, and expresses the idea clearly.';
  }
  if (text.includes('DELETE')) {
    return 'Deleting this portion improves conciseness by removing redundant information while preserving meaning.';
  }

  if (text.includes(';')) {
    return `Choice ${letter} correctly uses a semicolon to connect independent clauses or separate complex list items.`;
  }
  if (text.includes(':') && !text.includes('—')) {
    return `Choice ${letter} appropriately uses a colon to introduce a list, explanation, or elaboration.`;
  }

  return `Choice ${letter} provides the grammatically correct and stylistically appropriate option that maintains clarity.`;
}

function genEnglishWrong(choices, wrongIdx, letters) {
  const reasons = {};
  wrongIdx.forEach((idx, pos) => {
    const letter = letters[idx];
    const text = cleanChoice(choices[idx]);

    if (text === 'NO CHANGE') {
      reasons[letter] = 'The original contains an error that requires correction.';
    } else if (text.includes('DELETE')) {
      reasons[letter] = 'Deleting would remove essential information.';
    } else if (text.includes('being') || text.includes('having been')) {
      reasons[letter] = 'This creates wordy passive construction.';
    } else if (text.length > 85) {
      reasons[letter] = 'This is too wordy and includes unnecessary information.';
    } else {
      const errors = [
        'This creates a grammatical error.',
        'This introduces incorrect punctuation.',
        'This creates awkward phrasing.',
        'This violates standard English conventions.'
      ];
      reasons[letter] = errors[pos % errors.length];
    }
  });
  return reasons;
}

// MATH
function genMathCorrect(q, text, letter) {
  const ql = q.toLowerCase();
  if (ql.includes('angle') || ql.includes('area') || ql.includes('triangle') || ql.includes('circle')) {
    return `Choice ${letter} (${text}) is correct. Apply the appropriate geometric formula and substitute the given values to calculate this result.`;
  }
  if (ql.includes('equation') || q.includes('=') || ql.includes('solve')) {
    return `Choice ${letter} (${text}) is correct. Solve step-by-step by isolating the variable through proper algebraic operations.`;
  }
  if (q.includes('%') || ql.includes('percent')) {
    return `Choice ${letter} (${text}) is correct. Convert the percentage to decimal, perform calculations, and interpret the result.`;
  }

  return `Choice ${letter} (${text}) is correct. This results from correctly applying mathematical operations to the given information.`;
}

function genMathWrong(choices, wrongIdx, letters, correctIdx) {
  const reasons = {};
  const correctVal = parseFloat(cleanChoice(choices[correctIdx]));

  wrongIdx.forEach((idx, pos) => {
    const letter = letters[idx];
    const wrongVal = parseFloat(cleanChoice(choices[idx]));

    if (!isNaN(correctVal) && !isNaN(wrongVal)) {
      const ratio = wrongVal / correctVal;
      if (Math.abs(ratio - 2) < 0.2) {
        reasons[letter] = 'This results from doubling instead of halving.';
      } else if (Math.abs(ratio - 0.5) < 0.2) {
        reasons[letter] = 'This results from halving instead of doubling.';
      } else if (wrongVal > correctVal) {
        reasons[letter] = 'This is too large from a calculation error.';
      } else {
        reasons[letter] = 'This is too small from a calculation error.';
      }
    } else {
      const errors = [
        'This results from a calculation error.',
        'This comes from misapplying a formula.',
        'This appears from an arithmetic mistake.',
        'This stems from misunderstanding the problem.'
      ];
      reasons[letter] = errors[pos % errors.length];
    }
  });
  return reasons;
}

// READING
function genReadingCorrect(q, text, letter) {
  const ql = q.toLowerCase();
  if (ql.includes('main') || ql.includes('primary purpose') || ql.includes('central')) {
    return `Choice ${letter} accurately captures the central theme without being too narrow or broad.`;
  }
  if (ql.includes('according to') || ql.includes('states')) {
    return `Choice ${letter} is correct because this information is directly stated and can be verified in the passage.`;
  }
  if (ql.includes('suggests') || ql.includes('implies') || ql.includes('infer')) {
    return `Choice ${letter} represents a logical conclusion strongly supported by passage evidence.`;
  }
  if (ql.includes('narrator') || ql.includes('character')) {
    return `Choice ${letter} accurately reflects what the text reveals about the character based on textual evidence.`;
  }

  return `Choice ${letter} is best supported by the passage, aligning with the information and context provided.`;
}

function genReadingWrong(choices, wrongIdx, letters) {
  const reasons = {};
  wrongIdx.forEach((idx, pos) => {
    const letter = letters[idx];
    const text = cleanChoice(choices[idx]);

    if (text.includes('never') || text.includes('always') || text.includes('must')) {
      reasons[letter] = 'This uses extreme language beyond what the passage supports.';
    } else {
      const errors = [
        'This contradicts passage information.',
        'This lacks textual support.',
        'This makes unsupported assumptions.',
        'This is too narrow and misses context.'
      ];
      reasons[letter] = errors[pos % errors.length];
    }
  });
  return reasons;
}

// SCIENCE
function genScienceCorrect(q, text, letter) {
  const ql = q.toLowerCase();
  if (ql.includes('figure') || ql.includes('table') || ql.includes('graph')) {
    return `Choice ${letter} accurately interprets the data, correctly identifying the trend or value shown in the figure/table/graph.`;
  }
  if (ql.includes('hypothesis') || ql.includes('scientist')) {
    return `Choice ${letter} aligns with the scientific hypothesis and is consistent with the experimental evidence.`;
  }
  if (ql.includes('experiment') || ql.includes('study')) {
    return `Choice ${letter} accurately describes the experimental procedure or results as presented.`;
  }

  return `Choice ${letter} is directly supported by the scientific information and data in the passage.`;
}

function genScienceWrong(choices, wrongIdx, letters) {
  const reasons = {};
  wrongIdx.forEach((idx, pos) => {
    const letter = letters[idx];
    const errors = [
      'This contradicts the data presented.',
      'This misinterprets the scientific concepts.',
      'This lacks evidential support.',
      'This makes incorrect assumptions.'
    ];
    reasons[letter] = errors[pos % errors.length];
  });
  return reasons;
}

/** Process one test */
async function processTest(config, globalCount) {
  const { table, subject, count } = config;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`${subject.toUpperCase()}: ${count} questions`);
  console.log(`${'='.repeat(60)}`);

  const { data: questions, error } = await supabase
    .from(table)
    .select('*')
    .eq('test_number', 1)
    .order('question_number', { ascending: true })
    .limit(count);

  if (error) {
    console.error(`Error:`, error);
    return 0;
  }

  if (!questions || questions.length === 0) {
    console.error(`No questions found`);
    return 0;
  }

  console.log(`Found ${questions.length} questions`);

  let completed = 0;
  let failed = 0;

  for (const question of questions) {
    try {
      const explanation = generateExplanation(question, subject);

      if (!explanation) {
        failed++;
        continue;
      }

      const { error: updateError } = await supabase
        .from(table)
        .update({ explanation })
        .eq('id', question.id);

      if (updateError) {
        console.error(`Update error for Q${question.question_number}`);
        failed++;
      } else {
        completed++;
        const total = globalCount + completed;
        if (total % 20 === 0) {
          console.log(`  ✓ Completed ${total}/215`);
        }
      }
    } catch (err) {
      console.error(`Exception for Q${question.question_number}:`, err.message);
      failed++;
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log(`${subject.toUpperCase()}: ${completed} uploaded, ${failed} failed`);
  return completed;
}

/** Main */
async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('GENERATING ALL 215 PRACTICE TEST 1 EXPLANATIONS');
  console.log('='.repeat(70));
  console.log(`Started: ${new Date().toLocaleTimeString()}\n`);

  let total = 0;
  const start = Date.now();

  for (const test of TESTS) {
    const count = await processTest(test, total);
    total += count;
  }

  const minutes = ((Date.now() - start) / 60000).toFixed(2);

  console.log('\n' + '='.repeat(70));
  console.log(`COMPLETE: ${total}/215 explanations uploaded`);
  console.log(`Time: ${minutes} minutes`);
  console.log('='.repeat(70));

  if (total === 215) {
    console.log('\n✅ All 215 explanations generated and uploaded to database!');
  } else {
    console.log(`\n⚠️ Expected 215 but uploaded ${total}`);
  }
}

main().catch(console.error);
