#!/usr/bin/env node

/**
 * PRACTICE ACT 4 MATH SECTION EXTRACTION
 * Extract all 60 Math questions with complete content from source file
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔢 PRACTICE ACT 4 MATH SECTION EXTRACTION');
console.log('='.repeat(60));

const TEST_NUMBER = 4;

// Read the Practice ACT 4 content
const contentPath = join(__dirname, '../../practice-act-4-content.txt');
const content = fs.readFileSync(contentPath, 'utf8');

// Math answer key (F/G/H/J/K format converted to A/B/C/D/E)
const MATH_ANSWERS = {
  1: 'A', 2: 'K', 3: 'D', 4: 'J', 5: 'D', 6: 'F', 7: 'B', 8: 'K', 9: 'D', 10: 'K',
  11: 'A', 12: 'H', 13: 'D', 14: 'G', 15: 'B', 16: 'H', 17: 'D', 18: 'K', 19: 'C', 20: 'J',
  21: 'B', 22: 'H', 23: 'E', 24: 'G', 25: 'E', 26: 'H', 27: 'C', 28: 'H', 29: 'C', 30: 'J',
  31: 'B', 32: 'F', 33: 'D', 34: 'F', 35: 'C', 36: 'J', 37: 'E', 38: 'K', 39: 'A', 40: 'J',
  41: 'C', 42: 'H', 43: 'A', 44: 'H', 45: 'B', 46: 'K', 47: 'A', 48: 'F', 49: 'E', 50: 'F',
  51: 'A', 52: 'G', 53: 'D', 54: 'F', 55: 'C', 56: 'J', 57: 'B', 58: 'H', 59: 'D', 60: 'K'
};

// Convert F/G/H/J/K to A/B/C/D/E
function convertMathAnswer(answer) {
  const answerMap = { 'F': 'A', 'G': 'B', 'H': 'C', 'J': 'D', 'K': 'E' };
  return answerMap[answer] || answer;
}

// Get converted answers
const CONVERTED_ANSWERS = {};
Object.keys(MATH_ANSWERS).forEach(q => {
  CONVERTED_ANSWERS[q] = convertMathAnswer(MATH_ANSWERS[q]);
});

// Extract Math questions from content
function extractMathQuestions(content) {
  console.log('📖 Extracting Math questions from source content...');

  // Find the Math section
  const mathSectionStart = content.indexOf('MATHEMATICS TEST');
  const readingSectionStart = content.indexOf('READING TEST');

  if (mathSectionStart === -1) {
    throw new Error('Math section not found in content');
  }

  const mathSection = content.slice(mathSectionStart, readingSectionStart === -1 ? undefined : readingSectionStart);

  const questions = [];

  // Use regex to find each question with its full content
  const questionRegex = /(\d+)\.\s+(.*?)(?=\d+\.\s+|$)/gs;
  let match;

  while ((match = questionRegex.exec(mathSection)) !== null) {
    const questionNum = parseInt(match[1]);
    const fullContent = match[2].trim();

    if (questionNum > 60 || questionNum < 1) continue;

    // Determine if this question uses A-E or F-K format
    const usesAE = fullContent.includes('A.');
    const usesFK = fullContent.includes('F.');

    if (!usesAE && !usesFK) continue;

    // Split question stem from choices
    const choiceLetters = usesAE ? ['A', 'B', 'C', 'D', 'E'] : ['F', 'G', 'H', 'J', 'K'];
    const firstChoiceIndex = fullContent.indexOf(choiceLetters[0] + '.');

    if (firstChoiceIndex === -1) continue;

    const questionStem = fullContent.slice(0, firstChoiceIndex).trim();
    const choicesText = fullContent.slice(firstChoiceIndex);

    // Extract each choice
    const choices = {};
    choiceLetters.forEach((letter, index) => {
      const nextLetter = choiceLetters[index + 1];
      const startPattern = new RegExp(`${letter}\\.\\s*`);
      const endPattern = nextLetter ? new RegExp(`\\s*${nextLetter}\\.`) : null;

      const start = choicesText.search(startPattern);
      if (start === -1) return;

      let end = choicesText.length;
      if (endPattern) {
        const endMatch = choicesText.search(endPattern);
        if (endMatch > start) end = endMatch;
      }

      const choiceText = choicesText.slice(start, end)
        .replace(startPattern, '')
        .trim();

      choices[letter] = choiceText;
    });

    // Convert to standard A-E format
    const question = {
      question_number: questionNum,
      question_stem: questionStem,
      choice_a: choices.A || choices.F || '',
      choice_b: choices.B || choices.G || '',
      choice_c: choices.C || choices.H || '',
      choice_d: choices.D || choices.J || '',
      choice_e: choices.E || choices.K || '',
      correct_answer: CONVERTED_ANSWERS[questionNum],
      test_number: TEST_NUMBER,
      question_type: 'Problem Solving',
      question_category: 'Math'
    };

    if (question.question_stem && (question.choice_a || question.choice_f)) {
      questions.push(question);
      console.log(`    Q${questionNum}: ${questionStem.slice(0, 40)}...`);
    }
  }

  console.log(`📊 Extracted ${questions.length} Math questions`);
  return questions;
}

// Upload Math questions to database
async function uploadMathQuestions(questions) {
  console.log('\n🔢 UPLOADING MATH QUESTIONS...');

  let uploadCount = 0;
  const errors = [];

  for (const question of questions) {
    try {
      const { error } = await supabase
        .from('act_math_questions')
        .upsert(question, {
          onConflict: 'test_number,question_number'
        });

      if (error) {
        errors.push(`Q${question.question_number}: ${error.message}`);
      } else {
        uploadCount++;
        console.log(`  ✅ Uploaded Q${question.question_number}: ${question.question_stem.slice(0, 50)}...`);
      }
    } catch (err) {
      errors.push(`Q${question.question_number}: ${err.message}`);
    }
  }

  console.log(`\n📊 MATH UPLOAD RESULTS:`);
  console.log(`  ✅ Successfully uploaded: ${uploadCount}/${questions.length} questions`);

  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`    • ${error}`));
  }

  return { uploadCount, errors };
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Math extraction...\n');

    const questions = extractMathQuestions(content);

    if (questions.length === 0) {
      console.log('❌ No Math questions extracted');
      return;
    }

    const results = await uploadMathQuestions(questions);

    console.log('\n🎯 MATH EXTRACTION COMPLETE!');
    console.log(`📊 Total questions processed: ${questions.length}`);
    console.log(`✅ Successfully uploaded: ${results.uploadCount}`);

  } catch (error) {
    console.error('❌ Math extraction failed:', error.message);
    process.exit(1);
  }
}

main();