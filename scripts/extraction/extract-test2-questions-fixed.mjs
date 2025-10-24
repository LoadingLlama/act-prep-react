#!/usr/bin/env node

/**
 * EXTRACT TEST 2 QUESTIONS - FIXED FOR PROPER SCHEMA
 * Extract question content from TXT file and update database with proper column names
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;
const TXT_PATH = "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 2.txt";

console.log('🔧 EXTRACTING TEST 2 QUESTION CONTENT\n');
console.log('='.repeat(70));

// Read the TXT file
const txtContent = readFileSync(TXT_PATH, 'utf-8');

function parseQuestions(text, section, startQ, endQ) {
  const questions = [];

  for (let qNum = startQ; qNum <= endQ; qNum++) {
    // Find question in text - look for the question number pattern
    const qRegex = new RegExp(`${qNum}\\.\\s*([\\s\\S]*?)(?=\\n\\s*${qNum + 1}\\.|$)`, 'i');
    const match = text.match(qRegex);

    if (!match) {
      console.log(`⚠️  Could not find question ${qNum} for ${section}`);
      continue;
    }

    const questionBlock = match[1].trim();

    // Extract question stem (everything before the first choice)
    const stemMatch = questionBlock.match(/^([\\s\\S]*?)(?=[A-K]\\.|$)/);
    const questionStem = stemMatch ? stemMatch[1].trim() : questionBlock;

    // Extract answer choices based on section
    const choices = {};
    let choicePattern;

    if (section === 'english') {
      choicePattern = /([A-J])\\.\s*([^\\n]+)/g;
    } else if (section === 'reading') {
      choicePattern = /([A-D])\\.\s*([^\\n]+)/g;
    } else {
      // Math and Science
      choicePattern = /([A-K])\\.\s*([^\\n]+)/g;
    }

    let choiceMatch;
    while ((choiceMatch = choicePattern.exec(questionBlock)) !== null) {
      choices[choiceMatch[1]] = choiceMatch[2].trim();
    }

    // Create the question object with proper schema
    const question = {
      question_number: qNum,
      question_stem: questionStem,
      choice_a: choices['A'] || '',
      choice_b: choices['B'] || '',
      choice_c: choices['C'] || '',
      choice_d: choices['D'] || '',
      choice_e: choices['E'] || null,
      choice_f: choices['F'] || null,
      choice_g: choices['G'] || null,
      choice_h: choices['H'] || null,
      choice_j: choices['J'] || null,
      choice_k: choices['K'] || null
    };

    questions.push(question);
  }

  return questions;
}

// Parse questions for each section
console.log('📝 Parsing questions from TXT file...');

const englishQuestions = parseQuestions(txtContent, 'english', 1, 75);
const mathQuestions = parseQuestions(txtContent, 'math', 1, 60);
const readingQuestions = parseQuestions(txtContent, 'reading', 1, 40);
const scienceQuestions = parseQuestions(txtContent, 'science', 1, 40);

console.log(`✅ Parsed ${englishQuestions.length}/75 English questions`);
console.log(`✅ Parsed ${mathQuestions.length}/60 Math questions`);
console.log(`✅ Parsed ${readingQuestions.length}/40 Reading questions`);
console.log(`✅ Parsed ${scienceQuestions.length}/40 Science questions`);

// Update database sections
async function updateQuestions(questions, tableName, sectionName) {
  console.log(`\\n💾 Updating ${sectionName} questions in database...`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const { error } = await supabase
      .from(tableName)
      .update({
        question_stem: q.question_stem,
        choice_a: q.choice_a,
        choice_b: q.choice_b,
        choice_c: q.choice_c,
        choice_d: q.choice_d,
        choice_e: q.choice_e,
        choice_f: q.choice_f,
        choice_g: q.choice_g,
        choice_h: q.choice_h,
        choice_j: q.choice_j,
        choice_k: q.choice_k
      })
      .eq('test_number', TEST_NUMBER)
      .eq('question_number', q.question_number);

    if (error) {
      console.error(`❌ Error updating ${sectionName} Q${q.question_number}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`✅ ${sectionName}: ${successCount} updated, ${errorCount} errors`);
  return { successCount, errorCount };
}

// Update all sections
try {
  const englishResult = await updateQuestions(englishQuestions, 'act_english_questions', 'English');
  const mathResult = await updateQuestions(mathQuestions, 'act_math_questions', 'Math');
  const readingResult = await updateQuestions(readingQuestions, 'act_reading_questions', 'Reading');
  const scienceResult = await updateQuestions(scienceQuestions, 'act_science_questions', 'Science');

  // Summary
  const totalSuccess = englishResult.successCount + mathResult.successCount + readingResult.successCount + scienceResult.successCount;
  const totalErrors = englishResult.errorCount + mathResult.errorCount + readingResult.errorCount + scienceResult.errorCount;

  console.log('\\n' + '='.repeat(50));
  console.log('📊 FINAL RESULTS:');
  console.log(`Total questions updated: ${totalSuccess}/215`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Success rate: ${(totalSuccess/215*100).toFixed(1)}%`);

  if (totalSuccess === 215 && totalErrors === 0) {
    console.log('\\n🎉 SUCCESS! All Test 2 questions now have complete content!');
  } else {
    console.log('\\n⚠️  Some updates failed. Check error messages above.');
  }

} catch (error) {
  console.error('❌ Fatal error:', error.message);
}

console.log('\\n✅ Test 2 question extraction complete!\\n');