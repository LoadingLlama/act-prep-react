#!/usr/bin/env node

/**
 * PRACTICE TEST 5 - ANSWER KEY EXTRACTION FROM TXT
 * Extract all answer keys for manual verification
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const txtPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 5.txt';
const outputPath = join(__dirname, '../../backups/test5-answer-keys.json');

console.log('📖 EXTRACTING TEST 5 ANSWER KEYS FROM TXT\n');
console.log('='.repeat(80));

// Read entire TXT file
const fullText = fs.readFileSync(txtPath, 'utf-8');

console.log(`\nTotal characters: ${fullText.length}`);

// Find the scoring key section
const scoringStart = fullText.indexOf('Scoring Keys for the ACT Practice Tests');
if (scoringStart < 0) {
  console.log('❌ Could not find scoring section');
  process.exit(1);
}

const scoringSection = fullText.substring(scoringStart, scoringStart + 20000);

console.log('\n📝 Found scoring section at position:', scoringStart);
console.log('Preview:');
console.log(scoringSection.substring(0, 500));
console.log('...\n');

// The answer keys in the TXT file appear to be in a specific pattern
// Let me extract them by looking for the actual answer patterns

const answerKeys = {
  english: [],
  math: [],
  reading: [],
  science: []
};

console.log('='.repeat(80));
console.log('\n📊 MANUAL EXTRACTION REQUIRED\n');
console.log('The TXT file answer key section appears to be corrupted from OCR.');
console.log('We will extract answers manually from the PDF or use a different approach.\n');

console.log('Saving raw scoring section for manual review...\n');

// Save the scoring section for manual review
const result = {
  scoringSection: scoringSection,
  note: 'Manual extraction required - answer keys need to be verified against PDF',
  english: answerKeys.english,
  math: answerKeys.math,
  reading: answerKeys.reading,
  science: answerKeys.science
};

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log('='.repeat(80));
console.log(`\n✅ Scoring section saved to: ${outputPath}`);
console.log('\n⚠️  NEXT STEP: Manually verify answers from PDF\n');
