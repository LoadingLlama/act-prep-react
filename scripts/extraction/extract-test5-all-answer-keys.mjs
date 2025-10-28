#!/usr/bin/env node

/**
 * PRACTICE TEST 5 - COMPREHENSIVE ANSWER KEY EXTRACTION
 * Extract all 215 answer keys from TXT file with manual verification
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const txtPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 5.txt';
const outputPath = join(__dirname, '../../backups/test5-answer-keys-complete.json');

console.log('📖 EXTRACTING ALL TEST 5 ANSWER KEYS\n');
console.log('='.repeat(80));

// Read entire TXT file
const lines = fs.readFileSync(txtPath, 'utf-8').split('\n');

console.log(`\nTotal lines: ${lines.length}\n`);

// Find the sections
const mathStart = lines.findIndex(l => l.includes('Test 2: Mathematics—Scoring Key'));
const readingStart = lines.findIndex(l => l.includes('Test 3: Reading—Scoring Key'));
const scienceStart = lines.findIndex(l => l.includes('Test 4: Science—Scoring Key'));

console.log('Section locations:');
console.log(`  Math: Line ${mathStart}`);
console.log(`  Reading: Line ${readingStart}`);
console.log(`  Science: Line ${scienceStart}\n`);

// Extract Math answers (Questions 1-60)
console.log('='.repeat(80));
console.log('\n📐 EXTRACTING MATH ANSWERS (Q1-Q60):\n');

const mathAnswers = {};
const mathSection = lines.slice(mathStart, readingStart).join('\n');

// Math answers follow pattern: "1.\n\nE" or "1.\n\nE\n\n2."
const mathLines = lines.slice(mathStart, mathStart + 300);

let currentQ = null;
for (let i = 0; i < mathLines.length; i++) {
  const line = mathLines[i].trim();

  // Check if line is a question number (1. to 60.)
  const qMatch = line.match(/^(\d+)\.$/);
  if (qMatch) {
    currentQ = parseInt(qMatch[1]);
    continue;
  }

  // Check if line is an answer (A-K for math)
  if (currentQ && /^[A-K]$/.test(line) && !mathAnswers[currentQ]) {
    mathAnswers[currentQ] = line;
    console.log(`  Q${currentQ}: ${line}`);
    currentQ = null;
  }
}

console.log(`\n✅ Extracted ${Object.keys(mathAnswers).length}/60 Math answers`);

// Extract Reading answers (Questions 1-40)
console.log('\n' + '='.repeat(80));
console.log('\n📚 EXTRACTING READING ANSWERS (Q1-Q40):\n');

const readingAnswers = {};
const readingLines = lines.slice(readingStart, scienceStart);

currentQ = null;
for (let i = 0; i < readingLines.length; i++) {
  const line = readingLines[i].trim();

  const qMatch = line.match(/^(\d+)\. $/);
  if (qMatch) {
    currentQ = parseInt(qMatch[1]);
    continue;
  }

  // Reading uses F/G/H/J -> convert to A/B/C/D
  if (currentQ && /^[FGHJ]$/.test(line) && !readingAnswers[currentQ]) {
    const conversion = { 'F': 'A', 'G': 'B', 'H': 'C', 'J': 'D' };
    readingAnswers[currentQ] = conversion[line];
    console.log(`  Q${currentQ}: ${line} → ${conversion[line]}`);
    currentQ = null;
  }
}

console.log(`\n✅ Extracted ${Object.keys(readingAnswers).length}/40 Reading answers`);

// Extract Science answers (Questions 1-40)
console.log('\n' + '='.repeat(80));
console.log('\n🔬 EXTRACTING SCIENCE ANSWERS (Q1-Q40):\n');

const scienceAnswers = {};
const scienceLines = lines.slice(scienceStart, scienceStart + 200);

currentQ = null;
for (let i = 0; i < scienceLines.length; i++) {
  const line = scienceLines[i].trim();

  const qMatch = line.match(/^(\d+)\. $/);
  if (qMatch) {
    currentQ = parseInt(qMatch[1]);
    continue;
  }

  // Science uses F/G/H/J -> convert to A/B/C/D
  if (currentQ && /^[FGHJ]$/.test(line) && !scienceAnswers[currentQ]) {
    const conversion = { 'F': 'A', 'G': 'B', 'H': 'C', 'J': 'D' };
    scienceAnswers[currentQ] = conversion[line];
    console.log(`  Q${currentQ}: ${line} → ${conversion[line]}`);
    currentQ = null;
  }
}

console.log(`\n✅ Extracted ${Object.keys(scienceAnswers).length}/40 Science answers`);

// For English, we'll need to manually extract or use PDF
console.log('\n' + '='.repeat(80));
console.log('\n📝 ENGLISH ANSWERS:\n');
console.log('⚠️  English answer keys appear corrupted in TXT file');
console.log('    Will need manual extraction from PDF or visual verification\n');

const englishAnswers = {};
// Placeholder - these need to be manually verified from PDF

// Save results
const result = {
  test_number: 5,
  extracted_date: new Date().toISOString(),
  english: {
    answers: englishAnswers,
    count: Object.keys(englishAnswers).length,
    expected: 75,
    status: 'MANUAL_ENTRY_REQUIRED'
  },
  math: {
    answers: mathAnswers,
    count: Object.keys(mathAnswers).length,
    expected: 60,
    status: Object.keys(mathAnswers).length === 60 ? 'COMPLETE' : 'INCOMPLETE'
  },
  reading: {
    answers: readingAnswers,
    count: Object.keys(readingAnswers).length,
    expected: 40,
    status: Object.keys(readingAnswers).length === 40 ? 'COMPLETE' : 'INCOMPLETE'
  },
  science: {
    answers: scienceAnswers,
    count: Object.keys(scienceAnswers).length,
    expected: 40,
    status: Object.keys(scienceAnswers).length === 40 ? 'COMPLETE' : 'INCOMPLETE'
  },
  total: {
    extracted: Object.keys(englishAnswers).length + Object.keys(mathAnswers).length +
               Object.keys(readingAnswers).length + Object.keys(scienceAnswers).length,
    expected: 215
  }
};

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log('='.repeat(80));
console.log('\n📊 EXTRACTION SUMMARY:\n');
console.log(`  English: ${result.english.count}/75 (${result.english.status})`);
console.log(`  Math: ${result.math.count}/60 (${result.math.status})`);
console.log(`  Reading: ${result.reading.count}/40 (${result.reading.status})`);
console.log(`  Science: ${result.science.count}/40 (${result.science.status})`);
console.log(`  TOTAL: ${result.total.extracted}/215 answers`);

console.log(`\n✅ Answer keys saved to: ${outputPath}`);

console.log('\n' + '='.repeat(80));
console.log('\n⏭️  NEXT STEP: Manually extract English answer keys from PDF\n');
