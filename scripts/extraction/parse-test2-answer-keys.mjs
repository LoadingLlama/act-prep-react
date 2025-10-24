#!/usr/bin/env node

/**
 * PARSE TEST 2 ANSWER KEYS FROM PDF TEXT
 * Extract clean answer keys from OCR text
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const answerKeyText = readFileSync(join(__dirname, '../../backups/test2-answer-key-pages.txt'), 'utf-8');

console.log('🔍 PARSING TEST 2 ANSWER KEYS FROM OCR TEXT\n');

// Extract English answers
const englishSection = answerKeyText.match(/Test\s+1:\s+English—Scoring\s+Key[\s\S]*?(?=Test\s+2:)/i);
if (!englishSection) {
  console.error('❌ Could not find English section');
  process.exit(1);
}

// Extract Math answers
const mathSection = answerKeyText.match(/Test\s+2:\s+Mathematics—Scoring\s+Key[\s\S]*?(?=Test\s+3:)/i);
if (!mathSection) {
  console.error('❌ Could not find Math section');
  process.exit(1);
}

// Extract Reading answers
const readingSection = answerKeyText.match(/Test\s+3:\s+Reading—Scoring\s+Key[\s\S]*?(?=Test\s+4:)/i);
if (!readingSection) {
  console.error('❌ Could not find Reading section');
  process.exit(1);
}

// Extract Science answers
const scienceSection = answerKeyText.match(/Test\s+4:\s+Science—Scoring\s+Key[\s\S]*?$/i);
if (!scienceSection) {
  console.error('❌ Could not find Science section');
  process.exit(1);
}

function parseAnswers(text, numQuestions) {
  const answers = {};

  // Pattern: number followed by letter (A-K)
  // Need to handle OCR artifacts like spaces, dots, etc.
  const lines = text.split('\n');

  for (const line of lines) {
    // Match patterns like "1. C", "1 C", "1  C", etc.
    const match = line.match(/(\d+)[\.\s]+([A-K])\s/);
    if (match) {
      const qNum = parseInt(match[1]);
      const answer = match[2];

      if (qNum >= 1 && qNum <= numQuestions && /^[A-K]$/.test(answer)) {
        answers[qNum] = answer;
      }
    }
  }

  return answers;
}

const englishAnswers = parseAnswers(englishSection[0], 75);
const mathAnswers = parseAnswers(mathSection[0], 60);
const readingAnswers = parseAnswers(readingSection[0], 40);
const scienceAnswers = parseAnswers(scienceSection[0], 40);

console.log('📊 Parsed Answers:\n');
console.log(`English: ${Object.keys(englishAnswers).length}/75`);
console.log(`Math: ${Object.keys(mathAnswers).length}/60`);
console.log(`Reading: ${Object.keys(readingAnswers).length}/40`);
console.log(`Science: ${Object.keys(scienceAnswers).length}/40`);

// Create JSON answer key
const answerKey = {
  english: {},
  math: {},
  reading: {},
  science: {}
};

// Convert to string keys
for (let i = 1; i <= 75; i++) answerKey.english[i.toString()] = englishAnswers[i] || null;
for (let i = 1; i <= 60; i++) answerKey.math[i.toString()] = mathAnswers[i] || null;
for (let i = 1; i <= 40; i++) answerKey.reading[i.toString()] = readingAnswers[i] || null;
for (let i = 1; i <= 40; i++) answerKey.science[i.toString()] = scienceAnswers[i] || null;

// Save to file
const outputPath = join(__dirname, '../../answer-keys/test2-answers.json');
writeFileSync(outputPath, JSON.stringify(answerKey, null, 2));

console.log(`\n✅ Answer key saved to: ${outputPath}`);

// Display first 10 of each for verification
console.log('\n🔍 VERIFICATION - First 10 answers of each section:\n');
console.log('English:', Object.entries(answerKey.english).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Math:', Object.entries(answerKey.math).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Reading:', Object.entries(answerKey.reading).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Science:', Object.entries(answerKey.science).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));

// Check for missing answers
const missingEnglish = Object.values(answerKey.english).filter(a => !a).length;
const missingMath = Object.values(answerKey.math).filter(a => !a).length;
const missingReading = Object.values(answerKey.reading).filter(a => !a).length;
const missingScience = Object.values(answerKey.science).filter(a => !a).length;

console.log('\n⚠️  Missing Answers:');
console.log(`English: ${missingEnglish}/75`);
console.log(`Math: ${missingMath}/60`);
console.log(`Reading: ${missingReading}/40`);
console.log(`Science: ${missingScience}/40`);

if (missingEnglish + missingMath + missingReading + missingScience > 0) {
  console.log('\n⚠️  WARNING: Some answers could not be parsed from OCR text!');
  console.log('You may need to manually verify and fill in missing answers.');
}

console.log('\n📝 Next step: Verify answer key is complete and accurate before running extraction.');
