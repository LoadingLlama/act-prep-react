#!/usr/bin/env node

/**
 * AUTOMATED PRACTICE ACT 4 EXTRACTION FROM PDF
 * Extracts all sections using PDF parsing
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import fs from 'fs';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 4;
const LESSON_ID = '406a197f-f7d0-4c0d-9582-594dbb1bd8a0';
const PDF_PATH = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 4.pdf';

// Answer keys
const ANSWER_KEYS = {
  math: {
    1:'A', 2:'E', 3:'D', 4:'D', 5:'D', 6:'A', 7:'B', 8:'E', 9:'D', 10:'E',
    11:'A', 12:'C', 13:'D', 14:'B', 15:'B', 16:'C', 17:'D', 18:'E', 19:'C', 20:'D',
    21:'B', 22:'C', 23:'E', 24:'B', 25:'E', 26:'C', 27:'C', 28:'C', 29:'C', 30:'D',
    31:'B', 32:'A', 33:'D', 34:'A', 35:'C', 36:'D', 37:'E', 38:'E', 39:'A', 40:'D',
    41:'C', 42:'C', 43:'A', 44:'C', 45:'B', 46:'E', 47:'A', 48:'A', 49:'E', 50:'A',
    51:'A', 52:'B', 53:'D', 54:'A', 55:'C', 56:'D', 57:'B', 58:'C', 59:'D', 60:'E'
  }
};

console.log('🎯 AUTOMATED PRACTICE ACT 4 PDF EXTRACTION');
console.log('='.repeat(80));

async function extractFromPDF() {
  try {
    console.log(`\n📄 Reading PDF: ${PDF_PATH}`);
    const dataBuffer = fs.readFileSync(PDF_PATH);
    const pdfData = await pdfParse(dataBuffer);

    console.log(`✅ PDF loaded: ${pdfData.numpages} pages`);
    console.log(`📝 Extracting text content...`);

    const text = pdfData.text;

    // Find Math section
    const mathStart = text.indexOf('MATHEMATICS TEST');
    const readingStart = text.indexOf('READING TEST');

    if (mathStart === -1) {
      console.error('❌ Math section not found in PDF');
      return;
    }

    const mathSection = text.slice(mathStart, readingStart > mathStart ? readingStart : undefined);
    console.log(`\n📊 Math section found (${mathSection.length} characters)`);

    // Extract Math questions
    const mathQuestions = extractMathQuestions(mathSection);
    console.log(`\n✅ Extracted ${mathQuestions.length} Math questions`);

    // Upload to database
    if (mathQuestions.length > 0) {
      await uploadMathQuestions(mathQuestions);
    }

  } catch (error) {
    console.error('❌ PDF extraction failed:', error.message);
    console.error(error);
  }
}

function extractMathQuestions(mathText) {
  const questions = [];

  // Pattern to match questions: number followed by period
  const questionPattern = /(\d+)\.\s+(.+?)(?=\d+\.\s+|$)/gs;

  let match;
  while ((match = questionPattern.exec(mathText)) !== null) {
    const questionNum = parseInt(match[1]);
    if (questionNum < 1 || questionNum > 60) continue;

    const fullText = match[2].trim();

    // Try to extract choices (looking for A-E or F-K patterns)
    const choicePatterns = [
      /([A-E])\.\s*([^\n]+)/g,  // A. B. C. D. E.
      /([F-K])\.\s*([^\n]+)/g   // F. G. H. J. K.
    ];

    let choices = {};
    let questionStem = fullText;

    for (const pattern of choicePatterns) {
      pattern.lastIndex = 0;
      let choiceMatch;
      const tempChoices = {};

      while ((choiceMatch = pattern.exec(fullText)) !== null) {
        tempChoices[choiceMatch[1]] = choiceMatch[2].trim();
      }

      if (Object.keys(tempChoices).length >= 4) {
        choices = tempChoices;
        // Remove choices from question stem
        const firstChoiceIdx = fullText.search(pattern);
        if (firstChoiceIdx > 0) {
          questionStem = fullText.slice(0, firstChoiceIdx).trim();
        }
        break;
      }
    }

    // Convert F/G/H/J/K to A/B/C/D/E if needed
    if (choices['F']) {
      const converted = {};
      converted.A = choices.F || '';
      converted.B = choices.G || '';
      converted.C = choices.H || '';
      converted.D = choices.J || '';
      converted.E = choices.K || '';
      choices = converted;
    }

    if (questionStem && (choices.A || choices.a)) {
      questions.push({
        question_number: questionNum,
        question_stem: questionStem,
        choice_a: choices.A || choices.a || '',
        choice_b: choices.B || choices.b || '',
        choice_c: choices.C || choices.c || '',
        choice_d: choices.D || choices.d || '',
        choice_e: choices.E || choices.e || ''
      });

      console.log(`  Q${questionNum}: ${questionStem.slice(0, 50)}...`);
    }
  }

  return questions;
}

async function uploadMathQuestions(questions) {
  console.log('\n📤 UPLOADING MATH QUESTIONS TO DATABASE...');

  let successCount = 0;
  const errors = [];

  for (const q of questions) {
    const question = {
      ...q,
      test_number: TEST_NUMBER,
      lesson_id: LESSON_ID,
      correct_answer: ANSWER_KEYS.math[q.question_number],
      question_type: 'Problem Solving',
      question_category: 'Math'
    };

    try {
      const { error } = await supabase
        .from('act_math_questions')
        .upsert(question, { onConflict: 'test_number,question_number' });

      if (error) {
        errors.push(`Q${q.question_number}: ${error.message}`);
      } else {
        successCount++;
        console.log(`  ✅ Uploaded Q${q.question_number}`);
      }
    } catch (err) {
      errors.push(`Q${q.question_number}: ${err.message}`);
    }
  }

  console.log(`\n📊 UPLOAD RESULTS:`);
  console.log(`  ✅ Successfully uploaded: ${successCount}/${questions.length}`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(`    • ${e}`));
  }
}

extractFromPDF();
