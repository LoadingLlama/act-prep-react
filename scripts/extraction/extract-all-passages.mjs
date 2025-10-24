#!/usr/bin/env node

/**
 * EXTRACT ALL PASSAGES FROM TEST 1
 * Extracts English, Reading, and Science passages from source text file
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 1.txt';
const content = readFileSync(testPath, 'utf-8');
const lines = content.split('\n');

console.log('📖 Extracting All Passages from Test 1...\n');

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function findLineIndex(searchTerm) {
  return lines.findIndex(line => line.includes(searchTerm));
}

function extractTextBetween(startIdx, endIdx) {
  return lines.slice(startIdx, endIdx)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

// =====================================================
// EXTRACT ENGLISH PASSAGES
// =====================================================

console.log('📝 Extracting English Passages...\n');

const englishPassages = [];

// English Passage 1: "Double the Manta Rays"
const e1Start = findLineIndex('PASSAGE |') + 2; // After "PASSAGE I"
const e1End = findLineIndex('PASSAGE I'); // Next passage marker
const e1Text = extractTextBetween(e1Start, e1End > 0 ? e1End : e1Start + 200);

englishPassages.push({
  passage_number: 1,
  title: 'Double the Manta Rays',
  passage_text: e1Text
});

console.log('✅ Extracted English Passage 1: Double the Manta Rays');

// English Passage 2: "Origins of Aspirin"
const e2Start = findLineIndex('Origins of Aspirin');
const e2End = findLineIndex('PASSAGE III') > 0 ? findLineIndex('PASSAGE III') : e2Start + 200;
const e2Text = extractTextBetween(e2Start, e2End);

englishPassages.push({
  passage_number: 2,
  title: 'Origins of Aspirin',
  passage_text: e2Text
});

console.log('✅ Extracted English Passage 2: Origins of Aspirin');

// TODO: Extract passages 3, 4, 5 (will need to find markers in file)

// =====================================================
// EXTRACT READING PASSAGES
// =====================================================

console.log('\n📚 Extracting Reading Passages...\n');

const readingPassages = [];

// Reading Passage 1: "Love Marriage" (LITERARY NARRATIVE)
// Reading Passage 2: "Our Vanishing Night" (SOCIAL SCIENCE - Dual passage)
// Reading Passage 3: "On Places, Photographs, and Memory" (HUMANITIES)
// Reading Passage 4: "Glaciers" (NATURAL SCIENCE)

// TODO: Extract reading passages

// =====================================================
// EXTRACT SCIENCE PASSAGES
// =====================================================

console.log('\n🔬 Extracting Science Passages...\n');

const sciencePassages = [];

// Science passages contain tables, graphs, and experiment descriptions
// Need special handling for structured data

// TODO: Extract science passages

// =====================================================
// SAVE RESULTS
// =====================================================

const results = {
  test_number: 1,
  english_passages: englishPassages,
  reading_passages: readingPassages,
  science_passages: sciencePassages,
  extraction_date: new Date().toISOString()
};

const outputPath = join(__dirname, '../../backups/passages/test-1-passages.json');
writeFileSync(outputPath, JSON.stringify(results, null, 2));

console.log('\n✅ Extraction complete!');
console.log(`📁 Saved to: ${outputPath}`);
console.log(`\n📊 Summary:`);
console.log(`  English: ${englishPassages.length} passages`);
console.log(`  Reading: ${readingPassages.length} passages`);
console.log(`  Science: ${sciencePassages.length} passages`);
