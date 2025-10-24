#!/usr/bin/env node

/**
 * Test PDF Reading - Check structure of Practice ACT 1 PDF
 */

import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';

console.log('📖 Reading PDF:', pdfPath);
console.log('');

const dataBuffer = readFileSync(pdfPath);
const parser = new PDFParse();
const data = await parser.parseBuffer(dataBuffer);

console.log('📊 PDF Metadata:');
console.log(`   Pages: ${data.numpages}`);
console.log(`   Text length: ${data.text.length} characters`);
console.log('');

// Show first 2000 characters
console.log('📝 First 2000 characters:');
console.log('='.repeat(80));
console.log(data.text.substring(0, 2000));
console.log('='.repeat(80));
console.log('');

// Try to find question patterns
console.log('🔍 Looking for question patterns...');
const lines = data.text.split('\n');

// Find lines with question numbers
const questionLines = lines.filter((line, idx) => {
  const match = line.match(/^(\d+)\.\s/);
  if (match && parseInt(match[1]) <= 75) {
    return true;
  }
  return false;
});

console.log(`   Found ${questionLines.length} potential question markers`);
console.log('   First 10 question lines:');
questionLines.slice(0, 10).forEach((line, idx) => {
  console.log(`   ${idx + 1}. ${line.substring(0, 80)}...`);
});

// Look for answer key section
const answerKeyStart = data.text.indexOf('Scoring Key');
if (answerKeyStart > 0) {
  console.log(`\n✅ Found answer key at position ${answerKeyStart}`);
  console.log('   Sample:');
  console.log(data.text.substring(answerKeyStart, answerKeyStart + 500));
}

// Save full text for analysis
writeFileSync('test-1-pdf-extracted.txt', data.text);
console.log('\n💾 Full text saved to: test-1-pdf-extracted.txt');
