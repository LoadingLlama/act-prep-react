const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Load all diagnostic questions from JSON file
 */
function loadQuestions() {
  const data = fs.readFileSync('diagnostic_questions_full.json', 'utf8');
  return JSON.parse(data);
}

/**
 * Parse choices from JSON string
 */
function parseChoices(choicesStr) {
  try {
    if (Array.isArray(choicesStr)) return choicesStr;
    return JSON.parse(choicesStr);
  } catch (e) {
    console.error('Error parsing choices:', choicesStr);
    return [];
  }
}

/**
 * Get choice letter from index for different subjects
 */
function getChoiceLetter(index, subject) {
  if (subject === 'english') {
    return ['A', 'B', 'C', 'D'][index];
  } else if (subject === 'math') {
    return ['A', 'B', 'C', 'D', 'E'][index];
  } else if (subject === 'reading') {
    return ['F', 'G', 'H', 'J'][index];
  } else if (subject === 'science') {
    return ['A', 'B', 'C', 'D'][index];
  }
  return String.fromCharCode(65 + index);
}

/**
 * Get the correct answer letter/text
 */
function getCorrectAnswerInfo(question, subject) {
  const choices = parseChoices(question.choices);
  let correctIndex;

  // Parse correct answer
  if (subject === 'math' || subject === 'science') {
    // Math and Science use letters directly
    if (/^[A-E]$/.test(question.correct_answer)) {
      correctIndex = question.correct_answer.charCodeAt(0) - 65;
    } else {
      correctIndex = parseInt(question.correct_answer);
    }
  } else {
    // English and Reading use indices
    correctIndex = parseInt(question.correct_answer);
  }

  const correctChoice = choices[correctIndex];
  const correctLetter = getChoiceLetter(correctIndex, subject);

  return {
    correctIndex,
    correctChoice,
    correctLetter,
    allChoices: choices
  };
}

/**
 * Extract underlined portion from passage for English questions
 */
function extractUnderlinedText(passage, questionNumber) {
  if (!passage || !passage.passage_text) return null;

  const regex = new RegExp(`<u id="q${questionNumber}">(.*?)</u>`, 'i');
  const match = passage.passage_text.match(regex);
  return match ? match[1] : null;
}

/**
 * Generate explanation for a Math question
 */
function generateMathExplanation(question) {
  const { correctChoice, correctLetter, allChoices } = getCorrectAnswerInfo(question, 'math');

  // This is where you would add AI-powered or template-based specific explanation generation
  // For now, this is a placeholder that shows the structure

  const explanation = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
For question "${question.question_text}", the correct answer is ${correctLetter}: ${correctChoice}. [SPECIFIC STEP-BY-STEP SOLUTION NEEDED HERE]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${allChoices
  .map((choice, idx) => {
    const letter = getChoiceLetter(idx, 'math');
    if (choice === correctChoice) return null;
    return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter} (${choice}):</strong> [SPECIFIC REASON NEEDED]</div>`;
  })
  .filter(Boolean)
  .join('\n')}
</div>
</div>`;

  return explanation;
}

/**
 * Generate explanation for an English question
 */
function generateEnglishExplanation(question, passage) {
  const { correctChoice, correctLetter, allChoices } = getCorrectAnswerInfo(question, 'english');
  const underlinedText = extractUnderlinedText(passage, question.question_number);

  const explanation = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${underlinedText ? `The original text "${underlinedText}" ` : ''}The correct answer is ${correctLetter}: ${correctChoice}. [SPECIFIC GRAMMAR/STYLE REASONING NEEDED HERE]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${allChoices
  .map((choice, idx) => {
    const letter = getChoiceLetter(idx, 'english');
    if (choice === correctChoice) return null;
    return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> ${choice} - [SPECIFIC REASON NEEDED]</div>`;
  })
  .filter(Boolean)
  .join('\n')}
</div>
</div>`;

  return explanation;
}

/**
 * Generate explanation for a Reading question
 */
function generateReadingExplanation(question, passage) {
  const { correctChoice, correctLetter, allChoices } = getCorrectAnswerInfo(question, 'reading');

  const explanation = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
For the question "${question.question_text}", the correct answer is ${correctLetter}: ${correctChoice}. [SPECIFIC TEXTUAL EVIDENCE NEEDED HERE]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${allChoices
  .map((choice, idx) => {
    const letter = getChoiceLetter(idx, 'reading');
    if (choice === correctChoice) return null;
    return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> ${choice} - [SPECIFIC REASON NEEDED]</div>`;
  })
  .filter(Boolean)
  .join('\n')}
</div>
</div>`;

  return explanation;
}

/**
 * Generate explanation for a Science question
 */
function generateScienceExplanation(question, passage) {
  const { correctChoice, correctLetter, allChoices } = getCorrectAnswerInfo(question, 'science');

  const explanation = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
For the question "${question.question_text}", the correct answer is ${correctLetter}: ${correctChoice}. [SPECIFIC DATA/CONCEPT EXPLANATION NEEDED HERE]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${allChoices
  .map((choice, idx) => {
    const letter = getChoiceLetter(idx, 'science');
    if (choice === correctChoice) return null;
    return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> ${choice} - [SPECIFIC REASON NEEDED]</div>`;
  })
  .filter(Boolean)
  .join('\n')}
</div>
</div>`;

  return explanation;
}

/**
 * Export question data for manual explanation writing
 */
function exportQuestionsForManualWork() {
  const questions = loadQuestions();

  // Create detailed exports for each subject
  const exports = {};

  // Export Math questions
  exports.math = questions.math.map(q => {
    const info = getCorrectAnswerInfo(q, 'math');
    return {
      id: q.id,
      question_number: q.question_number,
      question_text: q.question_text,
      choices: info.allChoices,
      correct_answer: info.correctLetter,
      correct_choice: info.correctChoice,
      image_url: q.image_url
    };
  });

  // Export English questions
  exports.english = questions.english.map(q => {
    const info = getCorrectAnswerInfo(q, 'english');
    const underlined = extractUnderlinedText(q.passage, q.question_number);
    return {
      id: q.id,
      question_number: q.question_number,
      passage_id: q.passage_id,
      underlined_text: underlined,
      question_text: q.question_text || '[See passage]',
      choices: info.allChoices,
      correct_answer: info.correctLetter,
      correct_choice: info.correctChoice,
      passage_context: q.passage?.passage_text.substring(0, 500)
    };
  });

  // Export Reading questions
  exports.reading = questions.reading.map(q => {
    const info = getCorrectAnswerInfo(q, 'reading');
    return {
      id: q.id,
      question_number: q.question_number,
      passage_id: q.passage_id,
      question_text: q.question_text,
      choices: info.allChoices,
      correct_answer: info.correctLetter,
      correct_choice: info.correctChoice,
      passage_title: q.passage?.passage_title,
      passage_preview: q.passage?.passage_text.substring(0, 500)
    };
  });

  // Export Science questions
  exports.science = questions.science.map(q => {
    const info = getCorrectAnswerInfo(q, 'science');
    return {
      id: q.id,
      question_number: q.question_number,
      passage_id: q.passage_id,
      question_text: q.question_text,
      choices: info.allChoices,
      correct_answer: info.correctLetter,
      correct_choice: info.correctChoice,
      passage_title: q.passage?.passage_title,
      passage_preview: q.passage?.passage_text.substring(0, 500)
    };
  });

  // Save each subject to its own file
  fs.writeFileSync('export_math_questions.json', JSON.stringify(exports.math, null, 2));
  fs.writeFileSync('export_english_questions.json', JSON.stringify(exports.english, null, 2));
  fs.writeFileSync('export_reading_questions.json', JSON.stringify(exports.reading, null, 2));
  fs.writeFileSync('export_science_questions.json', JSON.stringify(exports.science, null, 2));

  console.log('Exported question data:');
  console.log(`- export_math_questions.json (${exports.math.length} questions)`);
  console.log(`- export_english_questions.json (${exports.english.length} questions)`);
  console.log(`- export_reading_questions.json (${exports.reading.length} questions)`);
  console.log(`- export_science_questions.json (${exports.science.length} questions)`);
}

// Run export
exportQuestionsForManualWork();
