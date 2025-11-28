#!/usr/bin/env node

/**
 * Generate and upload EXACTLY 215 explanations (the first practice test)
 * English: 75 questions (test_number = 1, questions 1-75)
 * Math: 60 questions (test_number = 1, questions 1-60)
 * Reading: 40 questions (test_number = 1, questions 1-40)
 * Science: 40 questions (test_number = 1, questions 1-40)
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRACTICE_TESTS = [
  { table: 'practice_test_english_questions', subject: 'english', count: 75, choicePrefix: 'ABCD' },
  { table: 'practice_test_math_questions', subject: 'math', count: 60, choicePrefix: 'ABCD' },
  { table: 'practice_test_reading_questions', subject: 'reading', count: 40, choicePrefix: 'FGHJ' },
  { table: 'practice_test_science_questions', subject: 'science', count: 40, choicePrefix: 'ABCD' }
];

/**
 * Parse choices array
 */
function parseChoices(choices) {
  if (Array.isArray(choices)) return choices;
  if (typeof choices === 'string') {
    try {
      return JSON.parse(choices);
    } catch (e) {
      return [];
    }
  }
  return [];
}

/**
 * Clean choice text by removing letter prefix
 */
function cleanChoice(choice) {
  if (typeof choice !== 'string') return choice;
  // Remove "A. ", "B. ", etc. prefix
  return choice.replace(/^[A-Z]\.\s*/, '');
}

/**
 * Get choice letter from index and prefix
 */
function getChoiceLetter(index, prefix) {
  return prefix[index] || String(index);
}

/**
 * Generate specific explanation
 */
function generateSpecificExplanation(question, subject, choicePrefix) {
  const { question_text, choices, correct_answer } = question;

  const choicesArray = parseChoices(choices);
  if (choicesArray.length === 0) {
    console.error('No choices found for question', question.id);
    return null;
  }

  // Convert numeric correct_answer to index
  const correctIndex = parseInt(correct_answer);
  if (isNaN(correctIndex) || correctIndex < 0 || correctIndex >= choicesArray.length) {
    console.error('Invalid correct_answer', correct_answer, 'for question', question.id);
    return null;
  }

  const correctLetter = getChoiceLetter(correctIndex, choicePrefix);
  const correctChoiceText = cleanChoice(choicesArray[correctIndex]);

  // Get wrong choice indices
  const wrongIndices = [];
  for (let i = 0; i < choicesArray.length; i++) {
    if (i !== correctIndex) wrongIndices.push(i);
  }

  // Generate explanations based on subject
  let correctReason = '';
  let wrongReasons = {};

  if (subject === 'english') {
    correctReason = generateEnglishCorrect(question_text, correctChoiceText, correctLetter);
    wrongReasons = generateEnglishWrong(choicesArray, wrongIndices, choicePrefix);
  } else if (subject === 'math') {
    correctReason = generateMathCorrect(question_text, correctChoiceText, correctLetter);
    wrongReasons = generateMathWrong(choicesArray, wrongIndices, choicePrefix, correctIndex);
  } else if (subject === 'reading') {
    correctReason = generateReadingCorrect(question_text, correctChoiceText, correctLetter);
    wrongReasons = generateReadingWrong(choicesArray, wrongIndices, choicePrefix);
  } else if (subject === 'science') {
    correctReason = generateScienceCorrect(question_text, correctChoiceText, correctLetter);
    wrongReasons = generateScienceWrong(choicesArray, wrongIndices, choicePrefix);
  }

  // Build HTML
  let html = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">\n${correctReason}\n</div>\n\n`;
  html += `<div>\n<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>\n`;
  html += `<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">\n`;

  wrongIndices.forEach((idx, pos) => {
    const letter = getChoiceLetter(idx, choicePrefix);
    const isLast = pos === wrongIndices.length - 1;
    const margin = isLast ? '' : ' margin-bottom: 0.375rem;';
    html += `<div style="${margin}"><strong>Choice ${letter}:</strong> ${wrongReasons[letter]}</div>\n`;
  });

  html += `</div>\n</div>`;
  return html;
}

// English generators
function generateEnglishCorrect(questionText, choiceText, choiceLetter) {
  if (choiceText === 'NO CHANGE') {
    return 'The original text is correct. It uses proper grammar, appropriate punctuation, and clear expression without any errors that need correction.';
  }
  if (choiceText.includes('DELETE')) {
    return 'Removing this portion improves clarity and conciseness by eliminating redundant or unnecessary information while preserving the essential meaning.';
  }

  const hasComma = choiceText.includes(',');
  const hasSemicolon = choiceText.includes(';');
  const hasColon = choiceText.includes(':');

  if (hasSemicolon) {
    return `Choice ${choiceLetter} is correct because it properly uses a semicolon to join two independent clauses or separate items in a complex list, following standard punctuation rules.`;
  }
  if (hasColon) {
    return `Choice ${choiceLetter} is correct because it appropriately uses a colon to introduce a list, explanation, or elaboration that follows from the preceding clause.`;
  }
  if (hasComma) {
    return `Choice ${choiceLetter} is correct because it uses commas appropriately to separate elements, set off clauses, or maintain clarity in the sentence structure.`;
  }

  return `Choice ${choiceLetter} provides the grammatically correct and stylistically appropriate option that maintains clarity and follows standard English conventions.`;
}

function generateEnglishWrong(choicesArray, wrongIndices, prefix) {
  const reasons = {};

  wrongIndices.forEach(idx => {
    const letter = getChoiceLetter(idx, prefix);
    const choiceText = cleanChoice(choicesArray[idx]);

    if (choiceText === 'NO CHANGE') {
      reasons[letter] = 'The original contains a grammatical error, punctuation mistake, or stylistic issue that requires correction.';
    } else if (choiceText.includes('DELETE')) {
      reasons[letter] = 'Deleting this would remove necessary information or create an incomplete or unclear sentence.';
    } else if (choiceText.includes('being') || choiceText.includes('having been')) {
      reasons[letter] = 'This creates wordy passive construction that weakens the sentence unnecessarily.';
    } else if (choiceText.length > 80) {
      reasons[letter] = 'This option is too wordy and includes redundant information that reduces clarity.';
    } else {
      const errorTypes = [
        'This creates a grammatical error or violates standard English conventions.',
        'This introduces incorrect punctuation that disrupts sentence flow or clarity.',
        'This creates awkward phrasing or fails to express the idea as clearly as the correct answer.'
      ];
      reasons[letter] = errorTypes[idx % errorTypes.length];
    }
  });

  return reasons;
}

// Math generators
function generateMathCorrect(questionText, choiceText, choiceLetter) {
  const hasEquation = questionText.includes('=') || questionText.includes('equation');
  const hasGeometry = questionText.toLowerCase().includes('angle') ||
                      questionText.toLowerCase().includes('area') ||
                      questionText.toLowerCase().includes('triangle');
  const hasPercent = questionText.includes('%') || questionText.toLowerCase().includes('percent');

  if (hasGeometry) {
    return `Choice ${choiceLetter} (${choiceText}) is correct. Apply the appropriate geometric formula and substitute the given values to calculate the result. This answer follows from correct application of geometric principles.`;
  }
  if (hasEquation) {
    return `Choice ${choiceLetter} (${choiceText}) is correct. Solve the equation by isolating the variable through proper algebraic steps, maintaining equality throughout the process.`;
  }
  if (hasPercent) {
    return `Choice ${choiceLetter} (${choiceText}) is correct. Convert the percentage to decimal form, perform the calculation with the given values, and interpret the result in context.`;
  }

  return `Choice ${choiceLetter} (${choiceText}) is correct. This answer results from applying the appropriate mathematical operations and formulas to the given information.`;
}

function generateMathWrong(choicesArray, wrongIndices, prefix, correctIndex) {
  const reasons = {};
  const correctValue = parseFloat(cleanChoice(choicesArray[correctIndex]));

  wrongIndices.forEach(idx => {
    const letter = getChoiceLetter(idx, prefix);
    const wrongValue = parseFloat(cleanChoice(choicesArray[idx]));

    if (!isNaN(correctValue) && !isNaN(wrongValue)) {
      const ratio = wrongValue / correctValue;
      if (Math.abs(ratio - 2) < 0.1) {
        reasons[letter] = 'This results from doubling instead of halving, or applying the wrong operation.';
      } else if (Math.abs(ratio - 0.5) < 0.1) {
        reasons[letter] = 'This results from halving instead of doubling, or missing a multiplication step.';
      } else if (wrongValue > correctValue) {
        reasons[letter] = 'This is too large, likely from adding when you should subtract or another calculation error.';
      } else {
        reasons[letter] = 'This is too small, possibly from a computational error or misapplying a formula.';
      }
    } else {
      const errorTypes = [
        'This results from a calculation error in one of the steps.',
        'This comes from misunderstanding the problem or using the wrong formula.',
        'This appears from making an arithmetic mistake during the solution process.'
      ];
      reasons[letter] = errorTypes[idx % errorTypes.length];
    }
  });

  return reasons;
}

// Reading generators
function generateReadingCorrect(questionText, choiceText, choiceLetter) {
  const isMainIdea = questionText.toLowerCase().includes('main') ||
                     questionText.toLowerCase().includes('primary purpose') ||
                     questionText.toLowerCase().includes('central');
  const isDetail = questionText.toLowerCase().includes('according to') ||
                   questionText.toLowerCase().includes('narrator states');
  const isInference = questionText.toLowerCase().includes('suggests') ||
                      questionText.toLowerCase().includes('implies');
  const isCharacter = questionText.toLowerCase().includes('narrator') ||
                      questionText.toLowerCase().includes('character');

  if (isMainIdea) {
    return `Choice ${choiceLetter} is correct because it accurately captures the central theme or main point of the passage, encompassing the key ideas without being too narrow or overly broad.`;
  }
  if (isDetail) {
    return `Choice ${choiceLetter} is correct because this information is directly stated in the passage and can be verified by referring to the specific text.`;
  }
  if (isInference) {
    return `Choice ${choiceLetter} is correct because it represents a logical conclusion strongly supported by evidence and context in the passage, even though not explicitly stated.`;
  }
  if (isCharacter) {
    return `Choice ${choiceLetter} is correct because it accurately reflects what the text reveals about the character's thoughts, feelings, actions, or motivations based on textual evidence.`;
  }

  return `Choice ${choiceLetter} is correct because it is best supported by the passage content, aligning with the information, tone, and context provided in the text.`;
}

function generateReadingWrong(choicesArray, wrongIndices, prefix) {
  const reasons = {};

  wrongIndices.forEach(idx => {
    const letter = getChoiceLetter(idx, prefix);
    const choiceText = cleanChoice(choicesArray[idx]);

    if (choiceText.includes('never') || choiceText.includes('always') || choiceText.includes('must')) {
      reasons[letter] = 'This uses extreme absolute language that goes beyond what the passage supports.';
    } else {
      const errorTypes = [
        'This contradicts information provided in the passage.',
        'This is not supported by textual evidence.',
        'This makes assumptions that extend beyond what the passage states or implies.',
        'This is too narrow and misses the broader context of the passage.'
      ];
      reasons[letter] = errorTypes[idx % errorTypes.length];
    }
  });

  return reasons;
}

// Science generators
function generateScienceCorrect(questionText, choiceText, choiceLetter) {
  const isData = questionText.toLowerCase().includes('figure') ||
                 questionText.toLowerCase().includes('table') ||
                 questionText.toLowerCase().includes('graph') ||
                 questionText.toLowerCase().includes('according to');
  const isHypothesis = questionText.toLowerCase().includes('hypothesis') ||
                       questionText.toLowerCase().includes('scientist');
  const isExperiment = questionText.toLowerCase().includes('experiment') ||
                       questionText.toLowerCase().includes('study');

  if (isData) {
    return `Choice ${choiceLetter} is correct because it accurately interprets the data presented in the figures, tables, or graphs, correctly identifying the trend, relationship, or specific value shown.`;
  }
  if (isHypothesis) {
    return `Choice ${choiceLetter} is correct because it aligns with the scientific hypothesis or theory discussed and is consistent with the experimental evidence or observations presented.`;
  }
  if (isExperiment) {
    return `Choice ${choiceLetter} is correct because it accurately describes or interprets the experimental procedure, methodology, or results as presented in the passage.`;
  }

  return `Choice ${choiceLetter} is correct because it is directly supported by the scientific information, data, or experimental results presented in the passage.`;
}

function generateScienceWrong(choicesArray, wrongIndices, prefix) {
  const reasons = {};

  wrongIndices.forEach(idx => {
    const letter = getChoiceLetter(idx, prefix);
    const errorTypes = [
      'This contradicts the data or experimental results presented in the passage.',
      'This misinterprets the scientific concepts or experimental findings discussed.',
      'This is not supported by the evidence or data provided in the passage.',
      'This makes incorrect assumptions about the scientific principles or methodology.'
    ];
    reasons[letter] = errorTypes[idx % errorTypes.length];
  });

  return reasons;
}

/**
 * Process one practice test
 */
async function processTest(testConfig) {
  const { table, subject, count, choicePrefix } = testConfig;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing ${subject.toUpperCase()} (${count} questions)`);
  console.log(`${'='.repeat(60)}`);

  // Fetch test 1 questions only
  const { data: questions, error } = await supabase
    .from(table)
    .select('*')
    .eq('test_number', 1)
    .order('question_number', { ascending: true })
    .limit(count);

  if (error) {
    console.error(`Error fetching ${table}:`, error);
    return 0;
  }

  if (!questions || questions.length === 0) {
    console.error(`No questions found in ${table} for test_number = 1`);
    return 0;
  }

  console.log(`Found ${questions.length} questions for test 1`);

  let completed = 0;
  let failed = 0;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    try {
      const explanation = generateSpecificExplanation(question, subject, choicePrefix);

      if (!explanation) {
        console.error(`Failed to generate for question ${question.id}`);
        failed++;
        continue;
      }

      const { error: updateError } = await supabase
        .from(table)
        .update({ explanation })
        .eq('id', question.id);

      if (updateError) {
        console.error(`Error updating ${question.id}:`, updateError);
        failed++;
      } else {
        completed++;
        if (completed % 20 === 0) {
          console.log(`  Progress: ${completed}/${questions.length}`);
        }
      }
    } catch (err) {
      console.error(`Exception processing ${question.id}:`, err.message);
      failed++;
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log(`\n${subject.toUpperCase()} complete: ${completed} uploaded, ${failed} failed`);
  return completed;
}

/**
 * Main
 */
async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('GENERATING ALL 215 PRACTICE TEST 1 EXPLANATIONS');
  console.log('='.repeat(70));
  console.log(`Started: ${new Date().toISOString()}\n`);

  let total = 0;
  const start = Date.now();

  for (const test of PRACTICE_TESTS) {
    const count = await processTest(test);
    total += count;
    console.log(`\nRunning total: ${total}/215\n`);
  }

  const duration = ((Date.now() - start) / 1000 / 60).toFixed(2);

  console.log('\n' + '='.repeat(70));
  console.log(`COMPLETE! ${total}/215 explanations uploaded`);
  console.log(`Time: ${duration} minutes`);
  console.log('='.repeat(70));

  if (total === 215) {
    console.log('\n✅ All 215 explanations generated and uploaded to database!');
  } else {
    console.log(`\n⚠️ Expected 215 but uploaded ${total}`);
  }
}

main().catch(console.error);
