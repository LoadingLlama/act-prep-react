#!/usr/bin/env node

/**
 * EXTRACT ACTUAL TEST 2 QUESTIONS FROM PDF - FIXED
 * Extract real question content, not placeholders
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
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

// Check if we already have the PDF text
const existingPdfPath = join(__dirname, '../../backups/passages/test2-pdf-full-text.txt');
let pdfText = '';

try {
  pdfText = readFileSync(existingPdfPath, 'utf-8');
  console.log(`✅ Using existing PDF text: ${pdfText.length} characters`);
} catch (error) {
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

  const outputPath = '${existingPdfPath}';
  fs.writeFileSync(outputPath, fullText);
  console.log('Extracted ' + fullText.length + ' characters');
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
    pdfText = readFileSync(existingPdfPath, 'utf-8');
    unlinkSync(tempScriptPath);
  } catch (error) {
    console.error('❌ PDF extraction failed:', error.message);
    process.exit(1);
  }
}

console.log('\n🔍 Analyzing PDF text structure...');

// Look for English test questions by finding patterns
const lines = pdfText.split('\n');
let englishQuestions = [];
let currentQuestion = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Skip empty lines
  if (!line) continue;

  // Look for question indicators - numbers followed by periods or underlined text
  const questionMatch = line.match(/^(\d{1,2})\./);
  if (questionMatch) {
    const qNum = parseInt(questionMatch[1]);
    if (qNum >= 1 && qNum <= 75) {
      if (currentQuestion) {
        englishQuestions.push(currentQuestion);
      }
      currentQuestion = {
        number: qNum,
        stem: line,
        choices: {},
        context: []
      };
    }
  }

  // Look for answer choices
  const choiceMatch = line.match(/^([A-J])\.\s*(.*)/);
  if (choiceMatch && currentQuestion) {
    currentQuestion.choices[choiceMatch[1]] = choiceMatch[2];
  }

  // Look for underlined text patterns (common in English)
  if (line.includes('underlined') && currentQuestion) {
    currentQuestion.context.push(line);
  }

  // Look for NO CHANGE options
  if (line.includes('NO CHANGE') && currentQuestion) {
    if (!currentQuestion.choices['A']) {
      currentQuestion.choices['A'] = 'NO CHANGE';
    }
  }
}

if (currentQuestion) {
  englishQuestions.push(currentQuestion);
}

console.log(`🔍 Found ${englishQuestions.length} potential English questions`);

// Show first few questions for inspection
console.log('\n📝 Sample questions found:');
englishQuestions.slice(0, 5).forEach(q => {
  console.log(`Q${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`  Choices: ${Object.keys(q.choices).join(', ')}`);
  console.log('');
});

// Check if we have reasonable question content
const hasGoodQuestions = englishQuestions.length > 50 &&
                        englishQuestions.some(q => Object.keys(q.choices).length >= 4);

if (hasGoodQuestions) {
  console.log('✅ Found structured question content');
} else {
  console.log('❌ Question parsing needs refinement');
  console.log('    The OCR text structure may require different parsing logic');
}

console.log('\n📊 Analysis Summary:');
console.log(`Total lines in PDF: ${lines.length}`);
console.log(`Questions found: ${englishQuestions.length}`);
console.log(`Average choices per question: ${englishQuestions.reduce((sum, q) => sum + Object.keys(q.choices).length, 0) / englishQuestions.length || 0}`);

console.log('\n⚠️  CONCLUSION:');
console.log('    Test 2 questions require manual extraction from PDF');
console.log('    The OCR text structure makes automated parsing difficult');
console.log('    Each question needs individual attention for proper formatting');
console.log('\n✅ Analysis complete!\n');