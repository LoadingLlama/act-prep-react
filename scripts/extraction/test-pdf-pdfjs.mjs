#!/usr/bin/env node

/**
 * Test PDF Reading with pdfjs-dist
 * Extracts text from Practice ACT 1 PDF to verify quality
 */

import { readFileSync, writeFileSync } from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';

console.log('📖 Reading PDF with pdfjs-dist:', pdfPath);
console.log('');

// Read the PDF file
const dataBuffer = readFileSync(pdfPath);

// Load the PDF document
const loadingTask = pdfjsLib.getDocument({
  data: new Uint8Array(dataBuffer),
  useSystemFonts: true
});

const pdfDocument = await loadingTask.promise;

console.log(`📊 PDF has ${pdfDocument.numPages} pages`);
console.log('');

// Extract text from all pages
let fullText = '';

for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
  const page = await pdfDocument.getPage(pageNum);
  const textContent = await page.getTextContent();

  // Combine text items
  const pageText = textContent.items.map(item => item.str).join(' ');
  fullText += pageText + '\n\n';

  if (pageNum === 1) {
    console.log('📝 First page sample:');
    console.log('='.repeat(80));
    console.log(pageText.substring(0, 1000));
    console.log('='.repeat(80));
    console.log('');
  }
}

console.log(`✅ Extracted ${fullText.length} characters total`);
console.log('');

// Look for question patterns
console.log('🔍 Analyzing structure...');
const lines = fullText.split('\n').filter(line => line.trim().length > 0);

// Find English section
const englishStart = fullText.indexOf('ENGLISH TEST');
const mathStart = fullText.indexOf('MATHEMATICS TEST');
const readingStart = fullText.indexOf('READING TEST');
const scienceStart = fullText.indexOf('SCIENCE TEST');

console.log(`   English section: ${englishStart > 0 ? '✅ Found at position ' + englishStart : '❌ Not found'}`);
console.log(`   Math section: ${mathStart > 0 ? '✅ Found at position ' + mathStart : '❌ Not found'}`);
console.log(`   Reading section: ${readingStart > 0 ? '✅ Found at position ' + readingStart : '❌ Not found'}`);
console.log(`   Science section: ${scienceStart > 0 ? '✅ Found at position ' + scienceStart : '❌ Not found'}`);
console.log('');

// Look for answer key
const answerKeyStart = fullText.indexOf('Scoring Key');
if (answerKeyStart > 0) {
  console.log(`✅ Found answer key at position ${answerKeyStart}`);
  console.log('   Sample:');
  console.log(fullText.substring(answerKeyStart, answerKeyStart + 500));
  console.log('');
}

// Save full extracted text for analysis
writeFileSync('test-1-pdfjs-extracted.txt', fullText);
console.log('💾 Full text saved to: test-1-pdfjs-extracted.txt');

// Show sample of English section
if (englishStart > 0) {
  console.log('\n📝 English section sample (first 1500 chars):');
  console.log('='.repeat(80));
  console.log(fullText.substring(englishStart, englishStart + 1500));
  console.log('='.repeat(80));
}
