#!/usr/bin/env node

/**
 * FIX PRACTICE ACT 4 ANSWERS - Update extraction script with correct answers and question types
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Correct answer key from Practice ACT 4 (F/G/H/J format converted to A/B/C/D)
const CORRECT_ANSWERS = {
  1: 'D', 2: 'C', 3: 'A', 4: 'C', 5: 'D', 6: 'A', 7: 'A', 8: 'D', 9: 'B', 10: 'B',
  11: 'C', 12: 'B', 13: 'A', 14: 'C', 15: 'C', 16: 'C', 17: 'A', 18: 'D', 19: 'D', 20: 'A',
  21: 'B', 22: 'D', 23: 'A', 24: 'B', 25: 'B', 26: 'A', 27: 'D', 28: 'C', 29: 'B', 30: 'C',
  31: 'B', 32: 'C', 33: 'D', 34: 'A', 35: 'D', 36: 'C', 37: 'A', 38: 'A', 39: 'B', 40: 'C',
  41: 'D', 42: 'A', 43: 'D', 44: 'D', 45: 'C', 46: 'C', 47: 'D', 48: 'A', 49: 'A', 50: 'C',
  51: 'C', 52: 'D', 53: 'A', 54: 'C', 55: 'B', 56: 'B', 57: 'C', 58: 'D', 59: 'D', 60: 'D',
  61: 'B', 62: 'D', 63: 'B', 64: 'A', 65: 'D', 66: 'C', 67: 'B', 68: 'B', 69: 'B', 70: 'A',
  71: 'D', 72: 'C', 73: 'D', 74: 'B', 75: 'A'
};

// Question types for English questions
const QUESTION_TYPES = {
  // Usage/Mechanics questions (1-40)
  1: 'Grammar', 2: 'Grammar', 3: 'Word Choice', 4: 'Punctuation', 5: 'Grammar',
  6: 'Word Choice', 7: 'Punctuation', 8: 'Word Choice', 9: 'Punctuation', 10: 'Grammar',
  11: 'Grammar', 12: 'Word Choice', 13: 'Grammar', 14: 'Punctuation', 15: 'Organization',
  16: 'Style', 17: 'Grammar', 18: 'Grammar', 19: 'Grammar', 20: 'Word Choice',
  21: 'Punctuation', 22: 'Word Choice', 23: 'Grammar', 24: 'Style', 25: 'Grammar',
  26: 'Grammar', 27: 'Punctuation', 28: 'Word Choice', 29: 'Style', 30: 'Organization',
  31: 'Word Choice', 32: 'Punctuation', 33: 'Grammar', 34: 'Punctuation', 35: 'Word Choice',
  36: 'Punctuation', 37: 'Punctuation', 38: 'Organization', 39: 'Punctuation', 40: 'Style',
  // Rhetorical Skills questions (41-75)
  41: 'Grammar', 42: 'Punctuation', 43: 'Grammar', 44: 'Word Choice', 45: 'Organization',
  46: 'Grammar', 47: 'Grammar', 48: 'Style', 49: 'Grammar', 50: 'Grammar',
  51: 'Punctuation', 52: 'Grammar', 53: 'Grammar', 54: 'Organization', 55: 'Word Choice',
  56: 'Word Choice', 57: 'Grammar', 58: 'Style', 59: 'Word Choice', 60: 'Style',
  61: 'Grammar', 62: 'Word Choice', 63: 'Punctuation', 64: 'Style', 65: 'Grammar',
  66: 'Grammar', 67: 'Grammar', 68: 'Word Choice', 69: 'Style', 70: 'Grammar',
  71: 'Grammar', 72: 'Grammar', 73: 'Punctuation', 74: 'Organization', 75: 'Style'
};

// Question categories for English questions (ACT standard format)
const QUESTION_CATEGORIES = {
  // CSE (Conventions of Standard English) - Grammar, Punctuation (1-40)
  1: 'CSE', 2: 'CSE', 3: 'KLA', 4: 'CSE', 5: 'CSE',
  6: 'KLA', 7: 'CSE', 8: 'KLA', 9: 'CSE', 10: 'CSE',
  11: 'CSE', 12: 'KLA', 13: 'CSE', 14: 'CSE', 15: 'POW',
  16: 'POW', 17: 'CSE', 18: 'CSE', 19: 'CSE', 20: 'KLA',
  21: 'CSE', 22: 'KLA', 23: 'CSE', 24: 'POW', 25: 'CSE',
  26: 'CSE', 27: 'CSE', 28: 'KLA', 29: 'POW', 30: 'POW',
  31: 'KLA', 32: 'CSE', 33: 'CSE', 34: 'CSE', 35: 'KLA',
  36: 'CSE', 37: 'CSE', 38: 'POW', 39: 'CSE', 40: 'POW',
  // POW (Passage Organization and Writing) and KLA (Knowledge of Language) (41-75)
  41: 'CSE', 42: 'CSE', 43: 'CSE', 44: 'KLA', 45: 'POW',
  46: 'CSE', 47: 'CSE', 48: 'POW', 49: 'CSE', 50: 'CSE',
  51: 'CSE', 52: 'CSE', 53: 'CSE', 54: 'POW', 55: 'KLA',
  56: 'KLA', 57: 'CSE', 58: 'POW', 59: 'KLA', 60: 'POW',
  61: 'CSE', 62: 'KLA', 63: 'CSE', 64: 'POW', 65: 'CSE',
  66: 'CSE', 67: 'CSE', 68: 'KLA', 69: 'POW', 70: 'CSE',
  71: 'CSE', 72: 'CSE', 73: 'CSE', 74: 'POW', 75: 'POW'
};

console.log('🔧 FIXING PRACTICE ACT 4 ANSWERS AND QUESTION TYPES...');

const filePath = join(__dirname, 'extract-practice-act-4-complete.mjs');
let content = fs.readFileSync(filePath, 'utf8');

// Update each question with correct answer, question type, and category
for (let i = 1; i <= 75; i++) {
  const correctAnswer = CORRECT_ANSWERS[i];
  const questionType = QUESTION_TYPES[i];
  const questionCategory = QUESTION_CATEGORIES[i];

  // Pattern to match question definition
  const oldPattern = new RegExp(
    `{ question_number: ${i}, ([^}]*), correct_answer: "[^"]*"([^}]*)}`,
    'g'
  );

  const replacement = `{ question_number: ${i}, $1, correct_answer: "${correctAnswer}", question_type: "${questionType}", question_category: "${questionCategory}"$2}`;

  content = content.replace(oldPattern, replacement);
}

// Also fix the conversion function call issue and remove the old correct_answer format
content = content.replace(/convertAnswerFormat\(CORRECT_ANSWERS\[\d+\]\)/g, (match) => {
  const questionNum = match.match(/\[(\d+)\]/)[1];
  return `"${CORRECT_ANSWERS[questionNum]}"`;
});

fs.writeFileSync(filePath, content);
console.log('✅ Successfully updated all 75 questions with correct answers, question types, and categories!');
console.log('📋 Answer distribution:');
console.log('  A answers:', Object.values(CORRECT_ANSWERS).filter(a => a === 'A').length);
console.log('  B answers:', Object.values(CORRECT_ANSWERS).filter(a => a === 'B').length);
console.log('  C answers:', Object.values(CORRECT_ANSWERS).filter(a => a === 'C').length);
console.log('  D answers:', Object.values(CORRECT_ANSWERS).filter(a => a === 'D').length);
console.log('📊 Category distribution:');
console.log('  CSE (Conventions of Standard English):', Object.values(QUESTION_CATEGORIES).filter(c => c === 'CSE').length);
console.log('  KLA (Knowledge of Language):', Object.values(QUESTION_CATEGORIES).filter(c => c === 'KLA').length);
console.log('  POW (Passage Organization and Writing):', Object.values(QUESTION_CATEGORIES).filter(c => c === 'POW').length);