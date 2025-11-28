#!/usr/bin/env node

/**
 * MANUAL REVIEW OF EXTRACTED PRACTICE ACT 3 DATA
 * Check all questions and passages for accuracy
 * Verify all database columns are properly filled
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 MANUAL REVIEW OF EXTRACTED PRACTICE ACT 3 DATA');
console.log('Checking all questions and passages for accuracy');
console.log('=' .repeat(80));

/**
 * Review uploaded questions from Practice ACT 3
 */
async function reviewUploadedQuestions() {
  console.log('\n❓ REVIEWING UPLOADED QUESTIONS...');

  const tables = [
    'act_english_questions',
    'act_math_questions',
    'act_reading_questions',
    'act_science_questions'
  ];

  for (const table of tables) {
    console.log(`\n📋 CHECKING ${table.toUpperCase()}:`);

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('test_number', 3)
      .order('question_number');

    if (error) {
      console.log(`❌ Error: ${error.message}`);
      continue;
    }

    if (!data || data.length === 0) {
      console.log(`⚠️ No Practice ACT 3 questions found in ${table}`);
      continue;
    }

    console.log(`📊 Found ${data.length} questions`);

    // Check first few questions for accuracy
    for (let i = 0; i < Math.min(3, data.length); i++) {
      const question = data[i];
      console.log(`\n🔍 Question ${question.question_number}:`);
      console.log(`  Stem: ${question.question_stem.substring(0, 100)}...`);
      console.log(`  Choice A: ${question.choice_a || 'MISSING'}`);
      console.log(`  Choice B: ${question.choice_b || 'MISSING'}`);
      console.log(`  Choice C: ${question.choice_c || 'MISSING'}`);
      console.log(`  Choice D: ${question.choice_d || 'MISSING'}`);

      if (table === 'act_math_questions') {
        console.log(`  Choice E: ${question.choice_e || 'MISSING'}`);
        console.log(`  Has Figure: ${question.has_figure}`);
      }

      if (table === 'act_english_questions') {
        console.log(`  Passage Number: ${question.passage_number || 'MISSING'}`);
        console.log(`  Underlined Text: ${question.underlined_text || 'MISSING'}`);
      }

      if (table.includes('reading') || table.includes('science')) {
        console.log(`  Passage ID: ${question.passage_id || 'MISSING'}`);
      }

      console.log(`  Correct Answer: ${question.correct_answer || 'MISSING'}`);
      console.log(`  Question Type: ${question.question_type || 'MISSING'}`);
      console.log(`  Category: ${question.question_category || 'MISSING'}`);
      console.log(`  Lesson ID: ${question.lesson_id || 'NULL (OK)'}`);
      console.log(`  Difficulty: ${question.difficulty_level || 'MISSING'}`);

      // Check for obvious issues
      const issues = [];
      if (!question.question_stem) issues.push('Missing question stem');
      if (!question.choice_a) issues.push('Missing choice A');
      if (!question.choice_b) issues.push('Missing choice B');
      if (!question.choice_c) issues.push('Missing choice C');
      if (!question.choice_d) issues.push('Missing choice D');
      if (!question.correct_answer) issues.push('Missing correct answer');
      if (!question.question_type) issues.push('Missing question type');
      if (!question.question_category) issues.push('Missing question category');

      if (issues.length > 0) {
        console.log(`  ❌ ISSUES FOUND: ${issues.join(', ')}`);
      } else {
        console.log(`  ✅ Basic validation passed`);
      }
    }
  }
}

/**
 * Review uploaded passages from Practice ACT 3
 */
async function reviewUploadedPassages() {
  console.log('\n📖 REVIEWING UPLOADED PASSAGES...');

  const tables = [
    'act_english_passages',
    'act_reading_passages',
    'act_science_passages'
  ];

  for (const table of tables) {
    console.log(`\n📋 CHECKING ${table.toUpperCase()}:`);

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('test_number', 3)
      .order('passage_number');

    if (error) {
      console.log(`❌ Error: ${error.message}`);
      continue;
    }

    if (!data || data.length === 0) {
      console.log(`⚠️ No Practice ACT 3 passages found in ${table}`);
      continue;
    }

    console.log(`📊 Found ${data.length} passages`);

    // Check each passage for accuracy
    for (const passage of data) {
      console.log(`\n🔍 Passage ${passage.passage_number}:`);
      console.log(`  Title: ${passage.title || 'MISSING'}`);
      console.log(`  Introduction: ${(passage.introduction || '').substring(0, 100)}${passage.introduction && passage.introduction.length > 100 ? '...' : ''}`);
      console.log(`  Text Length: ${passage.passage_text ? passage.passage_text.length : 0} characters`);
      console.log(`  Text Preview: ${(passage.passage_text || '').substring(0, 150)}...`);

      if (table === 'act_reading_passages') {
        console.log(`  Passage Type: ${passage.passage_type || 'MISSING'}`);
        console.log(`  Author: ${passage.author || 'MISSING'}`);
        console.log(`  Source: ${passage.source || 'MISSING'}`);
      }

      if (table === 'act_science_passages') {
        console.log(`  Passage Type: ${passage.passage_type || 'MISSING'}`);
        console.log(`  Figures: ${passage.figures || 'NULL'}`);
      }

      // Check for obvious issues
      const issues = [];
      if (!passage.title) issues.push('Missing title');
      if (!passage.passage_text || passage.passage_text.length < 50) issues.push('Missing or too short passage text');

      if (table === 'act_reading_passages') {
        if (!passage.passage_type) issues.push('Missing passage type');
        if (!passage.author) issues.push('Missing author');
        if (!passage.source) issues.push('Missing source');
      }

      if (table === 'act_science_passages') {
        if (!passage.passage_type) issues.push('Missing passage type');
      }

      if (issues.length > 0) {
        console.log(`  ❌ ISSUES FOUND: ${issues.join(', ')}`);
      } else {
        console.log(`  ✅ Basic validation passed`);
      }
    }
  }
}

/**
 * Check the actual Practice ACT 3 source file for comparison
 */
async function checkSourceFileFormat() {
  console.log('\n📄 CHECKING SOURCE FILE FORMAT...');

  const txtFile = "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 3.txt";

  try {
    const content = fs.readFileSync(txtFile, 'utf8');
    const lines = content.split('\n');

    console.log(`📊 Source file: ${content.length} characters, ${lines.length} lines`);

    // Find and show actual question format
    console.log('\n🔍 EXAMINING ACTUAL QUESTION FORMAT:');

    let foundFirstQuestion = false;
    let foundFirstChoice = false;
    let questionCount = 0;

    for (let i = 0; i < lines.length && questionCount < 3; i++) {
      const line = lines[i].trim();

      // Look for question pattern
      const questionMatch = line.match(/^(\d+)\.\s+(.+)/);
      if (questionMatch && !foundFirstQuestion) {
        foundFirstQuestion = true;
        questionCount++;
        console.log(`\n📝 Question ${questionMatch[1]} (Line ${i + 1}):`);
        console.log(`  Stem: ${questionMatch[2]}`);

        // Look for choices in next few lines
        for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
          const choiceLine = lines[j].trim();
          const choiceMatch = choiceLine.match(/^([A-J])\.\s*(.+)/) || choiceLine.match(/^([A-J])\s+(.+)/);

          if (choiceMatch) {
            console.log(`  Choice ${choiceMatch[1]}: ${choiceMatch[2]}`);
          } else if (choiceLine === 'NO CHANGE') {
            console.log(`  Choice: NO CHANGE`);
          } else if (choiceLine.length > 0 && !choiceLine.match(/^\d+\./) && !foundFirstChoice) {
            // Might be continuation of question stem
            console.log(`  Continuation: ${choiceLine}`);
          }
        }
      }
    }

    // Find and show actual passage format
    console.log('\n🔍 EXAMINING ACTUAL PASSAGE FORMAT:');

    let foundFirstPassage = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if ((line.includes('PASSAGE') || line.includes('Passage')) && !foundFirstPassage) {
        foundFirstPassage = true;
        console.log(`\n📖 Passage found (Line ${i + 1}):`);
        console.log(`  Header: ${line}`);

        // Show next few lines
        for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
          const passageLine = lines[j].trim();
          if (passageLine.length > 0 && !passageLine.match(/^\d+\./)) {
            console.log(`  Content: ${passageLine}`);
          }
        }
        break;
      }
    }

    // Look for answer key section
    console.log('\n🔍 EXAMINING ANSWER KEY FORMAT:');

    let foundAnswerKey = false;
    for (let i = lines.length - 100; i < lines.length; i++) {
      if (i < 0) continue;
      const line = lines[i].trim();

      if (line.toLowerCase().includes('answer') && !foundAnswerKey) {
        foundAnswerKey = true;
        console.log(`\n🔑 Answer key section (Line ${i + 1}):`);
        console.log(`  Header: ${line}`);

        // Show next few lines
        for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
          const answerLine = lines[j].trim();
          if (answerLine.length > 0) {
            console.log(`  Content: ${answerLine}`);
          }
        }
        break;
      }
    }

  } catch (error) {
    console.log(`❌ Error reading source file: ${error.message}`);
  }
}

/**
 * Main review function
 */
async function performManualReview() {
  console.log('\n🚀 STARTING MANUAL REVIEW OF PRACTICE ACT 3 DATA');

  try {
    // Check what was actually uploaded
    await reviewUploadedQuestions();
    await reviewUploadedPassages();

    // Check the source file format
    await checkSourceFileFormat();

    console.log('\n🎯 MANUAL REVIEW COMPLETE');
    console.log('=' .repeat(60));
    console.log('Review the output above to identify extraction accuracy issues.');
    console.log('Look for:');
    console.log('- Missing or incomplete question stems');
    console.log('- Missing or incorrect choices');
    console.log('- Missing answer keys');
    console.log('- Incorrect passage text extraction');
    console.log('- Missing required fields');

  } catch (error) {
    console.error(`❌ Manual review failed: ${error.message}`);
  }
}

// Run the manual review
performManualReview().catch(console.error);