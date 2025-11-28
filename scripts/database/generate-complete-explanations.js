const fs = require('fs');

/**
 * Complete Explanation Generator for All 140 ACT Questions
 * Generates comprehensive HTML-formatted explanations
 */

const mathQuestions = JSON.parse(fs.readFileSync('./data/math-questions.json', 'utf8'));
const readingQuestions = JSON.parse(fs.readFileSync('./data/reading-questions.json', 'utf8'));
const readingPassages = JSON.parse(fs.readFileSync('./data/reading-passages.json', 'utf8'));
const scienceQuestions = JSON.parse(fs.readFileSync('./data/science-questions.json', 'utf8'));
const sciencePassages = JSON.parse(fs.readFileSync('./data/science-passages.json', 'utf8'));

function parseChoices(choices) {
  if (Array.isArray(choices)) return choices;
  try { return JSON.parse(choices); } catch (e) { return []; }
}

function getChoiceLetter(choices, index) {
  const choice = choices[index];
  if (!choice) return '';
  const match = choice.match(/^([A-K])\./);
  return match ? match[1] : '';
}

// COMPREHENSIVE MATH EXPLANATIONS (60 questions)
const mathExplanations = require('./math-explanations-complete.json');

// COMPREHENSIVE READING EXPLANATIONS (40 questions)
const readingExplanations = require('./reading-explanations-complete.json');

// COMPREHENSIVE SCIENCE EXPLANATIONS (40 questions)
const scienceExplanations = require('./science-explanations-complete.json');

console.log('Explanation Summary:');
console.log(`Math: ${mathExplanations.length} explanations`);
console.log(`Reading: ${readingExplanations.length} explanations`);
console.log(`Science: ${scienceExplanations.length} explanations`);
console.log(`TOTAL: ${mathExplanations.length + readingExplanations.length + scienceExplanations.length}`);
