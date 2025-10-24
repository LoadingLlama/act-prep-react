#!/usr/bin/env node

/**
 * EXTRACT TEST 2 PDF DIRECT
 * Use PDF parsing to get complete, accurate text extraction
 */

import pdfParse from 'pdf-parse';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📄 DIRECT PDF TEXT EXTRACTION FOR TEST 2\n');
console.log('='.repeat(70));

try {
  // Read the PDF file
  const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 2.pdf';
  console.log(`📖 Reading PDF: ${pdfPath}`);

  const dataBuffer = readFileSync(pdfPath);

  console.log('🔍 Parsing PDF content...');
  const data = await pdfParse(dataBuffer);

  console.log(`✅ Successfully extracted ${data.text.length} characters from PDF`);
  console.log(`📋 Total pages: ${data.numpages}`);

  // Save the extracted text to a file
  const outputPath = join(__dirname, '../../temp/test2-pdf-extracted.txt');

  // Create temp directory if it doesn't exist
  try {
    mkdirSync(join(__dirname, '../../temp'), { recursive: true });
  } catch (e) {
    // Directory might already exist
  }

  writeFileSync(outputPath, data.text);
  console.log(`💾 Saved extracted text to: ${outputPath}`);

  // Show preview of extracted text
  console.log('\n📝 PREVIEW OF EXTRACTED TEXT:');
  console.log('='.repeat(50));
  console.log(data.text.substring(0, 2000));
  console.log('\n... (text continues)');

  // Look for passage markers
  const passageMatches = data.text.match(/PASSAGE [IV]+/g);
  if (passageMatches) {
    console.log(`\n🔍 Found ${passageMatches.length} passage markers:`, passageMatches);
  }

} catch (error) {
  console.error('❌ Error extracting PDF:', error.message);
  console.log('\n🔄 Falling back to manual reconstruction from OCR fragments...');
}