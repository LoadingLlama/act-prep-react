#!/usr/bin/env node

/**
 * EXTRACT TEST 4 ANSWER KEYS
 * Extract all answer keys from the Practice ACT 4 TXT file
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔑 EXTRACTING TEST 4 ANSWER KEYS FROM TXT FILE\n');
console.log('='.repeat(80));

// Read the TXT file
const txtPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 4.txt';
const content = fs.readFileSync(txtPath, 'utf8');
const lines = content.split('\n');

// Based on manual inspection, answer keys start around line 5750
// Let me extract them manually from the visible patterns

// ENGLISH ANSWER KEY (75 questions) - Questions use A, B, C, D
const ENGLISH_ANSWERS = {
  1: 'C', 2: 'H', 3: 'A', 4: 'F', 5: 'A',
  6: 'F', 7: 'A', 8: 'F', 9: 'B', 10: 'G',
  11: 'C', 12: 'G', 13: 'A', 14: 'H', 15: 'C',
  16: 'H', 17: 'A', 18: 'J', 19: 'D', 20: 'F',
  21: 'B', 22: 'J', 23: 'A', 24: 'G', 25: 'B',
  26: 'F', 27: 'D', 28: 'H', 29: 'B', 30: 'H',
  31: 'B', 32: 'F', 33: 'C', 34: 'F', 35: 'C',
  36: 'H', 37: 'A', 38: 'F', 39: 'D', 40: 'H',
  41: 'A', 42: 'H', 43: 'B', 44: 'F', 45: 'D',
  46: 'G', 47: 'D', 48: 'F', 49: 'A', 50: 'H',
  51: 'C', 52: 'J', 53: 'A', 54: 'H', 55: 'B',
  56: 'G', 57: 'C', 58: 'J', 59: 'D', 60: 'J',
  61: 'B', 62: 'J', 63: 'B', 64: 'F', 65: 'D',
  66: 'H', 67: 'B', 68: 'F', 69: 'B', 70: 'H',
  71: 'A', 72: 'H', 73: 'D', 74: 'G', 75: 'A'
};

// READING ANSWER KEY (40 questions) - Questions use A, B, C, D
// Extracted from "Test 3: Reading—Scoring Key" section
const READING_ANSWERS = {
  1: 'B', 2: 'F', 3: 'D', 4: 'H', 5: 'C',
  6: 'J', 7: 'B', 8: 'F', 9: 'B', 10: 'J',
  11: 'A', 12: 'J', 13: 'D', 14: 'J', 15: 'D',
  16: 'G', 17: 'A', 18: 'G', 19: 'C', 20: 'H',
  21: 'B', 22: 'H', 23: 'A', 24: 'J', 25: 'B',
  26: 'F', 27: 'D', 28: 'H', 29: 'A', 30: 'H',
  31: 'C', 32: 'F', 33: 'B', 34: 'J', 35: 'C',
  36: 'H', 37: 'D', 38: 'H', 39: 'B', 40: 'J'
};

// SCIENCE ANSWER KEY (40 questions) - Questions use A, B, C, D
const SCIENCE_ANSWERS = {
  1: 'A', 2: 'J', 3: 'D', 4: 'H', 5: 'C',
  6: 'G', 7: 'B', 8: 'H', 9: 'C', 10: 'H',
  11: 'A', 12: 'J', 13: 'A', 14: 'G', 15: 'D',
  16: 'G', 17: 'B', 18: 'G', 19: 'C', 20: 'H',
  21: 'B', 22: 'F', 23: 'B', 24: 'H', 25: 'A',
  26: 'F', 27: 'A', 28: 'H', 29: 'D', 30: 'F',
  31: 'C', 32: 'F', 33: 'D', 34: 'J', 35: 'C',
  36: 'H', 37: 'C', 38: 'H', 39: 'B', 40: 'J'
};

// Convert F/G/H/J to A/B/C/D format
function convertAnswer(answer) {
  const mapping = {
    'F': 'A',
    'G': 'B',
    'H': 'C',
    'J': 'D'
  };
  return mapping[answer] || answer;
}

console.log('\n📝 ENGLISH ANSWERS (Q1-75):');
const englishConverted = {};
for (let i = 1; i <= 75; i++) {
  englishConverted[i] = convertAnswer(ENGLISH_ANSWERS[i]);
  if (i % 10 === 0) {
    console.log(`Q${i-9}-${i}: ${Object.values(englishConverted).slice(i-10, i).join(' ')}`);
  }
}

console.log('\n📚 READING ANSWERS (Q1-40):');
const readingConverted = {};
for (let i = 1; i <= 40; i++) {
  readingConverted[i] = convertAnswer(READING_ANSWERS[i]);
  if (i % 10 === 0) {
    console.log(`Q${i-9}-${i}: ${Object.values(readingConverted).slice(i-10, i).join(' ')}`);
  }
}

console.log('\n🔬 SCIENCE ANSWERS (Q1-40):');
const scienceConverted = {};
for (let i = 1; i <= 40; i++) {
  scienceConverted[i] = convertAnswer(SCIENCE_ANSWERS[i]);
  if (i % 10 === 0) {
    console.log(`Q${i-9}-${i}: ${Object.values(scienceConverted).slice(i-10, i).join(' ')}`);
  }
}

// Save to file
const answerKeys = {
  test_number: 4,
  english: englishConverted,
  reading: readingConverted,
  science: scienceConverted,
  extracted_at: new Date().toISOString()
};

const outputPath = join(__dirname, '../../data/test4-answer-keys.json');
fs.mkdirSync(dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(answerKeys, null, 2));

console.log(`\n✅ Answer keys saved to: ${outputPath}`);
console.log('\n' + '='.repeat(80));
