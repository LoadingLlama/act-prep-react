const fs = require('fs');

/**
 * Direct Explanation Generator - Creates comprehensive explanations
 * This script will be populated with all 140 explanations
 */

const mathQuestions = JSON.parse(fs.readFileSync('./data/math-questions.json', 'utf8'));
const readingQuestions = JSON.parse(fs.readFileSync('./data/reading-questions.json', 'utf8'));
const readingPassages = JSON.parse(fs.readFileSync('./data/reading-passages.json', 'utf8'));
const scienceQuestions = JSON.parse(fs.readFileSync('./data/science-questions.json', 'utf8'));
const sciencePassages = JSON.parse(fs.readFileSync('./data/science-passages.json', 'utf8'));

console.log('Creating explanation files structure...');
console.log(`Total: ${mathQuestions.length + readingQuestions.length + scienceQuestions.length} questions`);

// Create initial structure files
const mathStructure = mathQuestions.map(q => ({
  question_id: q.id,
  question_number: q.question_number,
  explanation: null
}));

const readingStructure = readingQuestions.map(q => ({
  question_id: q.id,
  question_number: q.question_number,
  explanation: null
}));

const scienceStructure = scienceQuestions.map(q => ({
  question_id: q.id,
  question_number: q.question_number,
  explanation: null
}));

fs.writeFileSync('./data/math-explanations-structure.json', JSON.stringify(mathStructure, null, 2));
fs.writeFileSync('./data/reading-explanations-structure.json', JSON.stringify(readingStructure, null, 2));
fs.writeFileSync('./data/science-explanations-structure.json', JSON.stringify(scienceStructure, null, 2));

console.log('Structure files created. Ready for explanation population.');
