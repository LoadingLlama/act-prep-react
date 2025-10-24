#!/usr/bin/env node

/**
 * EXTRACT ALL PASSAGES FROM OCR PDF
 * Uses the OCR PDF which has better formatting than the text file
 */

const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';

console.log('📄 Extracting text from OCR PDF...\n');
console.log('Source:', pdfPath, '\n');

// Read PDF
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse();
parser.parseBuffer(dataBuffer).then(function(data) {
  console.log('✅ PDF parsed successfully');
  console.log(`📊 Pages: ${data.numpages}`);
  console.log(`📝 Text length: ${data.text.length} characters\n`);

  // Save full text for analysis
  const outputPath = path.join(__dirname, '../../backups/passages/pdf-full-text.txt');
  fs.writeFileSync(outputPath, data.text);
  console.log(`💾 Saved full text to: ${outputPath}\n`);

  // Let's examine the structure by showing first 2000 characters
  console.log('=== FIRST 2000 CHARACTERS ===\n');
  console.log(data.text.substring(0, 2000));
  console.log('\n=== [text continues...] ===\n');

  // Search for section markers
  console.log('🔍 Searching for key markers...\n');

  const markers = [
    'PASSAGE I',
    'PASSAGE II',
    'PASSAGE III',
    'PASSAGE IV',
    'PASSAGE V',
    'LITERARY NARRATIVE',
    'SOCIAL SCIENCE',
    'HUMANITIES',
    'NATURAL SCIENCE',
    'Passage I',
    'Passage II',
    'Passage III'
  ];

  markers.forEach(marker => {
    const index = data.text.indexOf(marker);
    if (index !== -1) {
      console.log(`✓ Found "${marker}" at position ${index}`);
    }
  });

  console.log('\n💡 Next step: Parse sections and extract passages');

}).catch(function(error) {
  console.error('❌ Error parsing PDF:', error);
});
