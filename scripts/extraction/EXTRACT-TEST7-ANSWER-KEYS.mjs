#!/usr/bin/env node

/**
 * PRACTICE TEST 7 (FORM F07) - ANSWER KEYS
 * Extracted from Practice ACT 7.txt answer key sections
 * All answers normalized to A/B/C/D(/E)
 */

// ENGLISH (75 questions) - Lines 5342-5769
// F→A, G→B, H→C, J→D
export const ENGLISH_ANSWERS = [
  'C', 'B', 'D', 'A', 'C', 'A', 'C', 'D', 'B', 'C',  // Q1-10
  'B', 'A', 'C', 'B', 'D', 'A', 'C', 'D', 'D', 'B',  // Q11-20
  'B', 'A', 'B', 'B', 'C', 'C', 'C', 'A', 'C', 'D',  // Q21-30
  'A', 'C', 'C', 'D', 'A', 'C', 'B', 'C', 'C', 'D',  // Q31-40
  'C', 'A', 'D', 'D', 'B', 'B', 'B', 'B', 'B', 'A',  // Q41-50
  'B', 'A', 'D', 'D', 'C', 'C', 'D', 'A', 'C', 'A',  // Q51-60
  'C', 'D', 'B', 'B', 'A', 'A', 'D', 'C', 'D', 'B',  // Q61-70
  'A', 'A', 'D', 'A', 'D'                            // Q71-75
];

// MATH (60 questions) - Lines 5770-6100
// F→A, G→B, H→C, J→D, K→E
export const MATH_ANSWERS = [
  'C', 'A', 'E', 'E', 'C', 'C', 'C', 'B', 'A', 'C',  // Q1-10
  'E', 'B', 'C', 'C', 'C', 'E', 'A', 'E', 'A', 'E',  // Q11-20
  'C', 'D', 'C', 'A', 'C', 'B', 'D', 'B', 'B', 'D',  // Q21-30
  'C', 'A', 'D', 'C', 'E', 'D', 'C', 'A', 'D', 'C',  // Q31-40
  'E', 'C', 'E', 'D', 'A', 'A', 'D', 'C', 'D', 'B',  // Q41-50
  'C', 'B', 'C', 'E', 'D', 'C', 'A', 'B', 'D', 'A'   // Q51-60
];

// READING (40 questions) - Lines 6101-6363
// F→A, G→B, H→C, J→D
export const READING_ANSWERS = [
  'D', 'A', 'C', 'A', 'C', 'B', 'D', 'D', 'B', 'D',  // Q1-10
  'C', 'D', 'C', 'B', 'A', 'D', 'C', 'B', 'D', 'D',  // Q11-20
  'A', 'D', 'B', 'A', 'C', 'D', 'C', 'A', 'B', 'D',  // Q21-30
  'B', 'D', 'B', 'B', 'B', 'C', 'A', 'A', 'C', 'D'   // Q31-40
];

// SCIENCE (40 questions) - Lines 6364-6610
// F→A, G→B, H→C, J→D
export const SCIENCE_ANSWERS = [
  'A', 'C', 'B', 'C', 'A', 'D', 'D', 'C', 'A', 'A',  // Q1-10
  'D', 'C', 'D', 'C', 'D', 'D', 'C', 'A', 'B', 'D',  // Q11-20
  'A', 'C', 'C', 'B', 'D', 'A', 'A', 'B', 'B', 'C',  // Q21-30
  'B', 'A', 'D', 'A', 'C', 'B', 'C', 'A', 'B', 'A'   // Q31-40
];

console.log('📋 ANSWER KEYS FOR TEST 7 (FORM F07)');
console.log('='.repeat(60));
console.log(`English (75): ${ENGLISH_ANSWERS.length} answers`);
console.log(`Math (60): ${MATH_ANSWERS.length} answers`);
console.log(`Reading (40): ${READING_ANSWERS.length} answers`);
console.log(`Science (40): ${SCIENCE_ANSWERS.length} answers`);
console.log(`TOTAL: ${ENGLISH_ANSWERS.length + MATH_ANSWERS.length + READING_ANSWERS.length + SCIENCE_ANSWERS.length} answers`);
