const fs = require('fs');

/**
 * Generates comprehensive HTML explanations for ACT practice test questions
 * This script creates explanations for Math, Reading, and Science sections
 */

// Load all question data
const mathQuestions = JSON.parse(fs.readFileSync('./data/math-questions.json', 'utf8'));
const readingQuestions = JSON.parse(fs.readFileSync('./data/reading-questions.json', 'utf8'));
const readingPassages = JSON.parse(fs.readFileSync('./data/reading-passages.json', 'utf8'));
const scienceQuestions = JSON.parse(fs.readFileSync('./data/science-questions.json', 'utf8'));
const sciencePassages = JSON.parse(fs.readFileSync('./data/science-passages.json', 'utf8'));

// Helper function to parse choices
function parseChoices(choices) {
  if (Array.isArray(choices)) {
    return choices;
  }
  try {
    return JSON.parse(choices);
  } catch (e) {
    return [];
  }
}

// Helper function to get passage by ID
function getPassageById(passages, passageId) {
  return passages.find(p => p.id === passageId);
}

console.log('Total questions to process:');
console.log(`- Math: ${mathQuestions.length}`);
console.log(`- Reading: ${readingQuestions.length}`);
console.log(`- Science: ${scienceQuestions.length}`);
console.log(`- TOTAL: ${mathQuestions.length + readingQuestions.length + scienceQuestions.length}`);
console.log('\nStarting explanation generation...\n');

// Process each section
console.log('Processing math questions...');
const mathExplanations = mathQuestions.map(q => ({
  question_id: q.id,
  question_number: q.question_number,
  question_text: q.question_text,
  choices: parseChoices(q.choices),
  correct_answer: q.correct_answer,
  question_type: q.question_type,
  explanation: null // Will be filled in manually with proper content
}));

console.log('Processing reading questions...');
const readingExplanations = readingQuestions.map(q => {
  const passage = getPassageById(readingPassages, q.passage_id);
  return {
    question_id: q.id,
    question_number: q.question_number,
    passage_title: passage ? passage.passage_title : null,
    passage_text: passage ? passage.passage_text : null,
    question_text: q.question_text,
    choices: parseChoices(q.choices),
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    explanation: null // Will be filled in manually with proper content
  };
});

console.log('Processing science questions...');
const scienceExplanations = scienceQuestions.map(q => {
  const passage = getPassageById(sciencePassages, q.passage_id);
  return {
    question_id: q.id,
    question_number: q.question_number,
    passage_title: passage ? passage.passage_title : null,
    passage_text: passage ? passage.passage_text : null,
    passage_type: passage ? passage.passage_type : null,
    question_text: q.question_text,
    choices: parseChoices(q.choices),
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    explanation: null // Will be filled in manually with proper content
  };
});

// Save templates for manual completion
fs.writeFileSync('./data/math-explanations-template.json', JSON.stringify(mathExplanations, null, 2));
fs.writeFileSync('./data/reading-explanations-template.json', JSON.stringify(readingExplanations, null, 2));
fs.writeFileSync('./data/science-explanations-template.json', JSON.stringify(scienceExplanations, null, 2));

console.log('\nTemplates created successfully!');
console.log('Files saved:');
console.log('- ./data/math-explanations-template.json');
console.log('- ./data/reading-explanations-template.json');
console.log('- ./data/science-explanations-template.json');
