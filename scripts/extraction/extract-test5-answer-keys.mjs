#!/usr/bin/env node

/**
 * PRACTICE TEST 5 - ANSWER KEY EXTRACTION FROM PDF
 * Extract all answer keys from OCR PDF for verification
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 5.pdf';
const outputPath = join(__dirname, '../../backups/test5-answer-keys.json');

console.log('📖 EXTRACTING TEST 5 ANSWER KEYS FROM PDF\n');
console.log('='.repeat(80));

// Load PDF
const dataBuffer = fs.readFileSync(pdfPath);
const pdfData = await pdfParse(dataBuffer);

console.log(`\nTotal pages: ${pdfData.numpages}`);
console.log('Extracting answer key section...\n');

const fullText = pdfData.text;

// Find answer key section
const answerKeyStart = fullText.indexOf('Scoring Key');
const answerKeySection = answerKeyStart >= 0 ? fullText.substring(answerKeyStart, answerKeyStart + 10000) : fullText;

console.log('Answer key section found:');
console.log(answerKeySection.substring(0, 500));

const answerKeys = {
  english: { raw: '', parsed: [] },
  math: { raw: '', parsed: [] },
  reading: { raw: '', parsed: [] },
  science: { raw: '', parsed: [] }
};

// Parse answers from full text
console.log('\n' + '='.repeat(80));
console.log('\n📝 PARSING ALL ANSWER KEYS:\n');

// Try to extract individual sections
const sections = [
  { name: 'english', pattern: /English.*?Scoring Key([\s\S]{1,3000})/, expectedCount: 75 },
  { name: 'math', pattern: /Mathem.*?Scoring Key([\s\S]{1,3000})/, expectedCount: 60 },
  { name: 'reading', pattern: /Reading.*?Scoring Key([\s\S]{1,2000})/, expectedCount: 40 },
  { name: 'science', pattern: /Science.*?Scoring Key([\s\S]{1,2000})/, expectedCount: 40 }
];

for (const section of sections) {
  const match = fullText.match(section.pattern);
  if (match) {
    answerKeys[section.name].raw = match[1];

    // Extract answer patterns like "1. D", "2. G", etc.
    const answerPattern = /(\d+)\.\s*([A-K])/g;
    let ansMatch;

    while ((ansMatch = answerPattern.exec(match[1])) !== null) {
      const questionNum = parseInt(ansMatch[1]);
      const answer = ansMatch[2];

      // Convert F/G/H/J to A/B/C/D for English/Reading/Science
      let normalizedAnswer = answer;
      if (['F', 'G', 'H', 'J'].includes(answer) && section.name !== 'math') {
        const conversion = { 'F': 'A', 'G': 'B', 'H': 'C', 'J': 'D' };
        normalizedAnswer = conversion[answer];
      }

      if (questionNum >= 1 && questionNum <= section.expectedCount) {
        answerKeys[section.name].parsed.push({
          question: questionNum,
          original: answer,
          normalized: normalizedAnswer
        });
      }
    }

    console.log(`${section.name.toUpperCase()}: Extracted ${answerKeys[section.name].parsed.length}/${section.expectedCount} answers`);
    if (answerKeys[section.name].parsed.length > 0) {
      console.log(`  First 5: ${answerKeys[section.name].parsed.slice(0, 5).map(a => `Q${a.question}=${a.normalized}`).join(', ')}`);
      console.log(`  Last 5: ${answerKeys[section.name].parsed.slice(-5).map(a => `Q${a.question}=${a.normalized}`).join(', ')}`);
    }
  } else {
    console.log(`${section.name.toUpperCase()}: NOT FOUND in PDF`);
  }
}

// Save to file
fs.writeFileSync(outputPath, JSON.stringify(answerKeys, null, 2));

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Answer keys saved to: ${outputPath}`);
console.log('\n✅ ANSWER KEY EXTRACTION COMPLETE\n');
