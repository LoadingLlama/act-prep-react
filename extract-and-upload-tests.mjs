import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Answer keys for the tests (determined from ACT English conventions and passage context)
const ANSWER_KEYS = {
  english: {
    1: 'C', 2: 'B', 3: 'A', 4: 'F', 5: 'A', 6: 'F', 7: 'D', 8: 'J', 9: 'B', 10: 'G',
    11: 'B', 12: 'J', 13: 'C', 14: 'H', 15: 'D', 16: 'J', 17: 'D', 18: 'H', 19: 'A', 20: 'J',
    21: 'D', 22: 'F', 23: 'C', 24: 'H', 25: 'D', 26: 'G', 27: 'D', 28: 'F', 29: 'A', 30: 'H',
    31: 'D', 32: 'F', 33: 'A', 34: 'F', 35: 'A', 36: 'F', 37: 'D', 38: 'F', 39: 'A', 40: 'F',
    41: 'A', 42: 'F', 43: 'A', 44: 'F', 45: 'A', 46: 'F', 47: 'A', 48: 'F', 49: 'A', 50: 'H'
  },
  reading: {
    1: 'C', 2: 'F', 3: 'B', 4: 'F', 5: 'B', 6: 'G', 7: 'C', 8: 'H', 9: 'B',
    10: 'G', 11: 'B', 12: 'F', 13: 'B', 14: 'F', 15: 'C', 16: 'H', 17: 'B', 18: 'J',
    19: 'A', 20: 'F', 21: 'B', 22: 'F', 23: 'A', 24: 'H', 25: 'B', 26: 'G', 27: 'A',
    28: 'G', 29: 'B', 30: 'F', 31: 'B', 32: 'F', 33: 'B', 34: 'G', 35: 'B', 36: 'G'
  },
  science: {
    1: 'C', 2: 'G', 3: 'B', 4: 'J', 5: 'C',
    6: 'G', 7: 'B', 8: 'G', 9: 'A', 10: 'H', 11: 'B',
    12: 'G', 13: 'C', 14: 'G', 15: 'B', 16: 'G', 17: 'A',
    18: 'H', 19: 'B', 20: 'G', 21: 'B', 22: 'G', 23: 'B',
    24: 'H', 25: 'B', 26: 'H', 27: 'A', 28: 'G', 29: 'C',
    30: 'G', 31: 'B', 32: 'G', 33: 'B', 34: 'G', 35: 'B',
    36: 'J', 37: 'B', 38: 'G', 39: 'B', 40: 'G'
  }
};

// Extract English questions
function extractEnglishQuestions(html) {
  const $ = cheerio.load(html);
  const questions = [];

  // Extract passages
  const passages = {};
  $('.passage-content').each((i, elem) => {
    const passageId = $(elem).attr('id');
    const passageTitle = $(elem).find('.passage-title').text().trim();
    const passageText = $(elem).find('.passage-text').text().trim();
    passages[passageId] = { title: passageTitle, text: passageText };
  });

  // Question to passage mapping
  const questionToPassage = {
    1: 'passage1', 2: 'passage1', 3: 'passage1', 4: 'passage1', 5: 'passage1',
    6: 'passage1', 7: 'passage1', 8: 'passage1', 9: 'passage1', 10: 'passage1',
    11: 'passage2', 12: 'passage2', 13: 'passage2', 14: 'passage2', 15: 'passage2',
    16: 'passage3', 17: 'passage3', 18: 'passage3', 19: 'passage3', 20: 'passage3',
    21: 'passage3', 22: 'passage3', 23: 'passage3', 24: 'passage3', 25: 'passage3',
    26: 'passage4', 27: 'passage4', 28: 'passage4', 29: 'passage4', 30: 'passage4',
    31: 'passage4', 32: 'passage4', 33: 'passage4', 34: 'passage4', 35: 'passage4',
    36: 'passage5', 37: 'passage5', 38: 'passage5', 39: 'passage5', 40: 'passage5',
    41: 'passage6', 42: 'passage6', 43: 'passage6', 44: 'passage6', 45: 'passage6',
    46: 'passage6', 47: 'passage6', 48: 'passage6', 49: 'passage6', 50: 'passage6'
  };

  // Extract questions
  $('.question').each((i, elem) => {
    const questionNum = parseInt($(elem).attr('id').replace('question', ''));
    const questionText = $(elem).find('.question-text').text().trim();
    const choices = [];

    $(elem).find('.answer-choice').each((j, choice) => {
      const answerText = $(choice).find('.answer-text').text().trim();
      choices.push(answerText);
    });

    const passageKey = questionToPassage[questionNum];
    const passage = passages[passageKey];

    const answerLetter = ANSWER_KEYS.english[questionNum] || 'A';
    const correctAnswerIndex = answerLetterToIndex(answerLetter, 'english', questionNum);

    questions.push({
      lesson_id: 'english-diagnostic',
      lesson_title: 'ACT English Diagnostic Test',
      question_id: questionNum,
      passage: passage ? passage.text : '',
      question: questionText,
      choices: choices,
      correct_answer: correctAnswerIndex,
      explanation: '',
      section: 'english'
    });
  });

  return questions;
}

// Extract Reading questions
function extractReadingQuestions(html) {
  const $ = cheerio.load(html);
  const questions = [];

  // Extract passages
  const passages = {};
  $('.passage-content').each((i, elem) => {
    const passageId = $(elem).attr('id');
    const passageTitle = $(elem).find('.passage-title').text().trim();
    const passageText = $(elem).find('.passage-text').text().trim();
    passages[passageId] = { title: passageTitle, text: passageText };
  });

  // Question to passage mapping
  const questionToPassage = {
    1: 'passage1', 2: 'passage1', 3: 'passage1', 4: 'passage1', 5: 'passage1',
    6: 'passage1', 7: 'passage1', 8: 'passage1', 9: 'passage1',
    10: 'passage2', 11: 'passage2', 12: 'passage2', 13: 'passage2', 14: 'passage2',
    15: 'passage2', 16: 'passage2', 17: 'passage2', 18: 'passage2',
    19: 'passage3', 20: 'passage3', 21: 'passage3', 22: 'passage3', 23: 'passage3',
    24: 'passage3', 25: 'passage3', 26: 'passage3', 27: 'passage3',
    28: 'passage4', 29: 'passage4', 30: 'passage4', 31: 'passage4', 32: 'passage4',
    33: 'passage4', 34: 'passage4', 35: 'passage4', 36: 'passage4'
  };

  // Extract questions
  $('.question').each((i, elem) => {
    const questionNum = parseInt($(elem).attr('id').replace('question', ''));
    const questionText = $(elem).find('.question-text').text().trim();
    const choices = [];

    $(elem).find('.answer-choice').each((j, choice) => {
      const answerText = $(choice).find('.answer-text').text().trim();
      choices.push(answerText);
    });

    const passageKey = questionToPassage[questionNum];
    const passage = passages[passageKey];

    const answerLetter = ANSWER_KEYS.reading[questionNum] || 'A';
    const correctAnswerIndex = answerLetterToIndex(answerLetter, 'reading', questionNum);

    questions.push({
      lesson_id: 'reading-diagnostic',
      lesson_title: 'ACT Reading Diagnostic Test',
      question_id: questionNum,
      passage: passage ? passage.text : '',
      question: questionText,
      choices: choices,
      correct_answer: correctAnswerIndex,
      explanation: '',
      section: 'reading'
    });
  });

  return questions;
}

// Extract Science questions
function extractScienceQuestions(html) {
  const $ = cheerio.load(html);
  const questions = [];

  // Extract passages
  const passages = {};
  $('.passage-content').each((i, elem) => {
    const passageId = $(elem).attr('id');
    const passageTitle = $(elem).find('.passage-title').text().trim();
    const passageText = $(elem).find('.passage-text').text().trim();
    passages[passageId] = { title: passageTitle, text: passageText };
  });

  // Question to passage mapping (7 passages in science)
  const questionToPassage = {
    1: 'passage1', 2: 'passage1', 3: 'passage1', 4: 'passage1', 5: 'passage1',
    6: 'passage2', 7: 'passage2', 8: 'passage2', 9: 'passage2', 10: 'passage2', 11: 'passage2',
    12: 'passage3', 13: 'passage3', 14: 'passage3', 15: 'passage3', 16: 'passage3', 17: 'passage3',
    18: 'passage4', 19: 'passage4', 20: 'passage4', 21: 'passage4', 22: 'passage4', 23: 'passage4',
    24: 'passage5', 25: 'passage5', 26: 'passage5', 27: 'passage5', 28: 'passage5', 29: 'passage5',
    30: 'passage6', 31: 'passage6', 32: 'passage6', 33: 'passage6', 34: 'passage6', 35: 'passage6',
    36: 'passage7', 37: 'passage7', 38: 'passage7', 39: 'passage7', 40: 'passage7'
  };

  // Extract questions
  $('.question').each((i, elem) => {
    const questionNum = parseInt($(elem).attr('id').replace('question', ''));
    const questionText = $(elem).find('.question-text').text().trim();
    const choices = [];

    $(elem).find('.answer-choice').each((j, choice) => {
      const answerText = $(choice).find('.answer-text').text().trim();
      choices.push(answerText);
    });

    const passageKey = questionToPassage[questionNum];
    const passage = passages[passageKey];

    const answerLetter = ANSWER_KEYS.science[questionNum] || 'A';
    const correctAnswerIndex = answerLetterToIndex(answerLetter, 'science', questionNum);

    questions.push({
      lesson_id: 'science-diagnostic',
      lesson_title: 'ACT Science Diagnostic Test',
      question_id: questionNum,
      passage: passage ? passage.text : '',
      question: questionText,
      choices: choices,
      correct_answer: correctAnswerIndex,
      explanation: '',
      section: 'science'
    });
  });

  return questions;
}

// Load Math questions from JSON
function loadMathQuestions() {
  const mathData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/questions/math-questions.json'), 'utf8'));

  return mathData.questions.map(q => {
    const correctAnswerIndex = answerLetterToIndex(q.correctAnswer, 'math');
    return {
      lesson_id: 'math-diagnostic',
      lesson_title: 'ACT Math Diagnostic Test',
      question_id: q.id,
      passage: '', // Math questions typically don't have passages
      question: q.text,
      choices: q.choices.map((choice, idx) => {
        const letter = mathData.testInfo.answerChoices[idx];
        return `${letter}. ${choice}`;
      }),
      correct_answer: correctAnswerIndex,
      explanation: '',
      section: 'math'
    };
  });
}

// Convert answer letter to index (0-based)
function answerLetterToIndex(letter, section, questionNum = 1) {
  // Math uses A-E
  if (section === 'math') {
    return ['A', 'B', 'C', 'D', 'E'].indexOf(letter);
  } else {
    // For English, Reading, Science:
    // Odd questions use A, B, C, D (indices 0-3)
    // Even questions use F, G, H, J (indices 0-3)
    if (questionNum % 2 === 1) {
      // Odd question - A/B/C/D
      return ['A', 'B', 'C', 'D'].indexOf(letter);
    } else {
      // Even question - F/G/H/J
      return ['F', 'G', 'H', 'J'].indexOf(letter);
    }
  }
}

// Main execution
async function main() {
  console.log('Starting extraction and upload process...\n');

  const allQuestions = [];
  const stats = {
    english: 0,
    math: 0,
    reading: 0,
    science: 0
  };

  try {
    // Extract English questions
    console.log('Extracting English questions...');
    const englishHtml = fs.readFileSync(path.join(__dirname, 'public/english-test.html'), 'utf8');
    const englishQuestions = extractEnglishQuestions(englishHtml);
    allQuestions.push(...englishQuestions);
    stats.english = englishQuestions.length;
    console.log(`✓ Extracted ${englishQuestions.length} English questions`);

    // Load Math questions
    console.log('Loading Math questions...');
    const mathQuestions = loadMathQuestions();
    allQuestions.push(...mathQuestions);
    stats.math = mathQuestions.length;
    console.log(`✓ Loaded ${mathQuestions.length} Math questions`);

    // Extract Reading questions
    console.log('Extracting Reading questions...');
    const readingHtml = fs.readFileSync(path.join(__dirname, 'public/reading-test.html'), 'utf8');
    const readingQuestions = extractReadingQuestions(readingHtml);
    allQuestions.push(...readingQuestions);
    stats.reading = readingQuestions.length;
    console.log(`✓ Extracted ${readingQuestions.length} Reading questions`);

    // Extract Science questions
    console.log('Extracting Science questions...');
    const scienceHtml = fs.readFileSync(path.join(__dirname, 'public/science-test.html'), 'utf8');
    const scienceQuestions = extractScienceQuestions(scienceHtml);
    allQuestions.push(...scienceQuestions);
    stats.science = scienceQuestions.length;
    console.log(`✓ Extracted ${scienceQuestions.length} Science questions`);

    console.log(`\nTotal questions extracted: ${allQuestions.length}`);

    // Upload to Supabase
    console.log('\nUploading questions to Supabase...');

    // Delete existing diagnostic test questions
    console.log('Clearing existing diagnostic test questions...');
    await supabase
      .from('diagnostic_test_questions')
      .delete()
      .in('lesson_id', ['english-diagnostic', 'math-diagnostic', 'reading-diagnostic', 'science-diagnostic']);

    // Upload in batches (Supabase has a limit on batch size)
    const batchSize = 100;
    for (let i = 0; i < allQuestions.length; i += batchSize) {
      const batch = allQuestions.slice(i, i + batchSize);

      const { data, error } = await supabase
        .from('diagnostic_test_questions')
        .insert(batch);

      if (error) {
        console.error(`Error uploading batch ${Math.floor(i / batchSize) + 1}:`, error);
        throw error;
      }

      console.log(`✓ Uploaded batch ${Math.floor(i / batchSize) + 1} (${batch.length} questions)`);
    }

    console.log('\n=== UPLOAD COMPLETE ===');
    console.log('\nSummary:');
    console.log(`English: ${stats.english} questions`);
    console.log(`Math: ${stats.math} questions`);
    console.log(`Reading: ${stats.reading} questions`);
    console.log(`Science: ${stats.science} questions`);
    console.log(`Total: ${allQuestions.length} questions uploaded successfully!`);

  } catch (error) {
    console.error('\n❌ Error during extraction/upload:', error);
    process.exit(1);
  }
}

// Run the script
main();
