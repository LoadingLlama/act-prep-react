#!/usr/bin/env node

/**
 * EXTRACT ACTUAL TEST 2 QUESTIONS FROM PDF
 * Extract real question content, not placeholders
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;
const PDF_PATH = "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 2.pdf";

console.log('🔧 EXTRACTING ACTUAL TEST 2 QUESTIONS FROM PDF\n');
console.log('='.repeat(70));

// Extract fresh PDF text using pdfjs-dist
console.log('📖 Extracting fresh PDF text...');

const extractScript = `
const fs = require('fs');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

async function extractPDF() {
  const data = new Uint8Array(fs.readFileSync('${PDF_PATH.replace(/'/g, "\\'")}'));
  const pdf = await pdfjs.getDocument({ data }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\\n\\n';
  }

  const outputPath = '${join(__dirname, '../../backups/test2-fresh-pdf-text.txt')}';
  fs.writeFileSync(outputPath, fullText);
  console.log(\`Extracted \${fullText.length} characters to \${outputPath}\`);
}

extractPDF().catch(err => {
  console.error('PDF extraction error:', err);
  process.exit(1);
});
`;

const tempScriptPath = join(__dirname, 'temp-pdf-extract.cjs');
writeFileSync(tempScriptPath, extractScript);

try {
  execSync(`node ${tempScriptPath}`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ PDF extraction failed:', error.message);
  process.exit(1);
}

// Read the extracted text
const pdfTextPath = join(__dirname, '../../backups/test2-fresh-pdf-text.txt');
const pdfText = readFileSync(pdfTextPath, 'utf-8');

console.log(`✅ Loaded PDF text: ${pdfText.length} characters`);

// Find English section
console.log('\n🔍 Looking for English test section...');

// Look for the start of the English test
const englishStart = pdfText.search(/ENGLISH\s+TEST/i);
if (englishStart === -1) {
  console.error('❌ Could not find English test section');
  process.exit(1);
}

console.log(`✅ Found English test at position ${englishStart}`);

// Extract a section around the English test
const englishSection = pdfText.substring(englishStart, englishStart + 10000);

console.log('\n📝 Sample English section content:');
console.log(englishSection.substring(0, 500));
console.log('...');

// Look for specific patterns that indicate questions
const lines = englishSection.split('\n');
let questionLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Look for underlined portions (common in English tests)
  if (line.includes('underlined') || line.includes('NO CHANGE') ||
      line.match(/^[A-J]\./)) {
    questionLines.push(\`Line \${i}: \${line}\`);
  }
}

console.log('\n🔍 Found potential question content:');
questionLines.slice(0, 20).forEach(line => console.log(line));

console.log('\n⚠️  NOTE: PDF text parsing shows this requires manual question extraction');
console.log('    The OCR text needs careful parsing to separate questions from passage text');
console.log('    Each question needs to be manually identified and structured');

// Clean up temp file
try {
  const fs = require('fs');
  fs.unlinkSync(tempScriptPath);
} catch (error) {
  // Ignore cleanup errors
}

console.log('\n✅ PDF extraction complete. Manual question parsing needed.\n');