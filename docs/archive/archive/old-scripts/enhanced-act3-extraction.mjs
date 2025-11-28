#!/usr/bin/env node

/**
 * ENHANCED ACT 3 EXTRACTION SYSTEM
 * Fixes UUID generation and section detection
 * Matches existing database format exactly
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔥 ENHANCED ACT 3 EXTRACTION SYSTEM');
console.log('UUID Generation • Section Detection • Database Format Matching');
console.log('=' .repeat(80));

// Store passage UUIDs for linking
const passageUUIDs = {};

/**
 * Generate or retrieve passage UUID
 */
function getPassageUUID(section, passageNumber) {
  const key = `${section}-${passageNumber}`;
  if (!passageUUIDs[key]) {
    passageUUIDs[key] = randomUUID();
  }
  return passageUUIDs[key];
}

/**
 * Detect ACT section based on question number ranges
 * English: 1-75, Math: 1-60, Reading: 1-40, Science: 1-40
 */
function detectSectionByQuestionNumber(questionNumber, totalQuestions = 240) {
  if (questionNumber >= 1 && questionNumber <= 75) {
    return 'English';
  } else if (questionNumber >= 76 && questionNumber <= 135) {
    return 'Math';
  } else if (questionNumber >= 136 && questionNumber <= 175) {
    return 'Reading';
  } else if (questionNumber >= 176 && questionNumber <= 215) {
    return 'Science';
  }

  // Fallback based on content
  return 'English'; // Default
}

/**
 * Enhanced section detection based on content patterns
 */
function detectSectionByContent(content) {
  const contentLower = content.toLowerCase();

  // English section indicators
  if (contentLower.includes('underlined') ||
      contentLower.includes('no change') ||
      contentLower.includes('best expresses') ||
      contentLower.includes('grammar') ||
      contentLower.includes('punctuation')) {
    return 'English';
  }

  // Math section indicators
  if (contentLower.includes('equation') ||
      contentLower.includes('calculate') ||
      contentLower.includes('solve') ||
      contentLower.includes('graph') ||
      contentLower.includes('function') ||
      contentLower.match(/\d+\s*[+\-×÷=]/)) {
    return 'Math';
  }

  // Science section indicators
  if (contentLower.includes('experiment') ||
      contentLower.includes('hypothesis') ||
      contentLower.includes('data') ||
      contentLower.includes('table') ||
      contentLower.includes('figure') ||
      contentLower.includes('study') ||
      contentLower.includes('trial')) {
    return 'Science';
  }

  // Reading is default/everything else
  return 'Reading';
}

/**
 * Create properly formatted question based on existing database patterns
 */
function createFormattedQuestion(questionData, section, testNumber = 3) {
  const baseQuestion = {
    test_number: testNumber,
    question_number: questionData.question_number,
    question_stem: questionData.question_stem || '',
    choice_a: questionData.choice_a || '',
    choice_b: questionData.choice_b || '',
    choice_c: questionData.choice_c || '',
    choice_d: questionData.choice_d || '',
    correct_answer: questionData.correct_answer || '',
    question_type: questionData.question_type || determineQuestionType(questionData.question_stem, section),
    question_category: questionData.question_category || determineQuestionCategory(questionData.question_stem, section),
    lesson_id: null, // Will be populated by lesson assignment system
    difficulty_level: questionData.difficulty_level || determineDifficultyLevel(questionData.question_stem),
    notes: questionData.notes || `Test ${testNumber} Question ${questionData.question_number}`
  };

  // Add section-specific fields
  if (section === 'English') {
    return {
      ...baseQuestion,
      passage_number: questionData.passage_number || Math.ceil(questionData.question_number / 15),
      underlined_text: questionData.underlined_text || extractUnderlinedText(questionData.question_stem),
      context_before: questionData.context_before || '',
      context_after: questionData.context_after || ''
    };
  } else if (section === 'Math') {
    return {
      ...baseQuestion,
      choice_e: questionData.choice_e || '',
      has_figure: questionData.has_figure || false,
      figure_url: questionData.figure_url || null,
      figure_data: questionData.figure_data || null
    };
  } else if (section === 'Reading' || section === 'Science') {
    const passageNumber = questionData.passage_number || Math.ceil((questionData.question_number - (section === 'Reading' ? 135 : 175)) / 10);
    const passageId = getPassageUUID(section, passageNumber);

    const sectionQuestion = {
      ...baseQuestion,
      passage_id: passageId
    };

    if (section === 'Science') {
      sectionQuestion.has_figure = questionData.has_figure || false;
      sectionQuestion.figure_url = questionData.figure_url || null;
    }

    return sectionQuestion;
  }

  return baseQuestion;
}

/**
 * Create properly formatted passage based on existing database patterns
 */
function createFormattedPassage(passageData, section, testNumber = 3) {
  const passageNumber = passageData.passage_number || 1;
  const passageId = getPassageUUID(section, passageNumber);

  const basePassage = {
    id: passageId,
    test_number: testNumber,
    passage_number: passageNumber,
    title: passageData.title || `Test ${testNumber} ${section} Passage ${passageNumber}`,
    introduction: passageData.introduction || '',
    passage_text: passageData.passage_text || passageData.content || ''
  };

  if (section === 'Reading') {
    return {
      ...basePassage,
      passage_type: passageData.passage_type || determineReadingPassageType(passageData.title),
      author: passageData.author || 'Unknown Author',
      source: passageData.source || 'Unknown Source'
    };
  } else if (section === 'Science') {
    return {
      ...basePassage,
      passage_type: passageData.passage_type || determineSciencePassageType(passageData.title),
      figures: passageData.figures || null
    };
  }

  // English passages - minimal fields
  return basePassage;
}

/**
 * Determine question type based on content and section
 */
function determineQuestionType(questionStem, section) {
  const stem = questionStem.toLowerCase();

  if (section === 'English') {
    if (stem.includes('underlined') || stem.includes('best replaces')) {
      return 'usage-mechanics';
    } else if (stem.includes('main idea') || stem.includes('best describes')) {
      return 'main-idea';
    } else {
      return 'rhetorical-skills';
    }
  } else if (section === 'Math') {
    if (stem.includes('equation') || stem.includes('solve')) {
      return 'algebra';
    } else if (stem.includes('angle') || stem.includes('triangle')) {
      return 'geometry';
    } else {
      return 'pre-algebra';
    }
  } else if (section === 'Reading') {
    if (stem.includes('main idea') || stem.includes('primarily')) {
      return 'main-idea';
    } else if (stem.includes('detail') || stem.includes('according to')) {
      return 'detail';
    } else {
      return 'inference';
    }
  } else if (section === 'Science') {
    if (stem.includes('data') || stem.includes('table')) {
      return 'data-interpretation';
    } else if (stem.includes('experiment')) {
      return 'research-summary';
    } else {
      return 'conflicting-viewpoints';
    }
  }

  return 'general';
}

/**
 * Determine question category based on existing patterns
 */
function determineQuestionCategory(questionStem, section) {
  const stem = questionStem.toLowerCase();

  if (section === 'English') {
    return 'POW'; // Power of Writing
  } else if (section === 'Math') {
    return 'PHM-A'; // Preparing for Higher Math - Algebra
  } else if (section === 'Reading') {
    return 'KID'; // Key Ideas and Details
  } else if (section === 'Science') {
    return 'IOD'; // Interpretation of Data
  }

  return 'General';
}

/**
 * Determine difficulty level based on question complexity
 */
function determineDifficultyLevel(questionStem) {
  const complexity = questionStem.length;
  if (complexity < 100) return 'easy';
  if (complexity < 200) return 'medium';
  return 'hard';
}

/**
 * Extract underlined text from question stem
 */
function extractUnderlinedText(questionStem) {
  const underlinedMatch = questionStem.match(/<u>(.*?)<\/u>/);
  if (underlinedMatch) return underlinedMatch[1];

  // Look for quotation marks or other indicators
  const quotedMatch = questionStem.match(/"([^"]+)"/);
  if (quotedMatch) return quotedMatch[1];

  return '';
}

/**
 * Determine reading passage type
 */
function determineReadingPassageType(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('prose') || titleLower.includes('fiction')) return 'PROSE FICTION';
  if (titleLower.includes('social') || titleLower.includes('history')) return 'SOCIAL SCIENCE';
  if (titleLower.includes('natural') || titleLower.includes('biology')) return 'NATURAL SCIENCE';
  return 'HUMANITIES';
}

/**
 * Determine science passage type
 */
function determineSciencePassageType(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('data') || titleLower.includes('table')) return 'DATA REPRESENTATION';
  if (titleLower.includes('research') || titleLower.includes('study')) return 'RESEARCH SUMMARY';
  return 'CONFLICTING VIEWPOINTS';
}

/**
 * Enhanced extraction from Practice ACT 3 content
 */
function extractACT3Content(content, testNumber = 3) {
  console.log('🔍 EXTRACTING ACT 3 CONTENT WITH ENHANCED DETECTION...');

  const lines = content.split('\n');
  const questions = [];
  const passages = [];

  let currentQuestion = null;
  let currentPassage = null;
  let questionCount = 0;
  let passageCount = 0;
  let inAnswerKey = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect answer key section
    if (line.toLowerCase().includes('answer key') || line.toLowerCase().includes('answers:')) {
      inAnswerKey = true;
      continue;
    }

    // Skip if in answer key section for now
    if (inAnswerKey && line.match(/^\d+\.\s*[A-E]/)) {
      continue;
    }

    // Detect question start
    const questionMatch = line.match(/^(\d+)\.\s*(.+)/);
    if (questionMatch && !inAnswerKey) {
      // Save previous question
      if (currentQuestion) {
        const section = detectSectionByQuestionNumber(currentQuestion.question_number);
        const formattedQuestion = createFormattedQuestion(currentQuestion, section, testNumber);
        questions.push(formattedQuestion);
      }

      questionCount++;
      const questionNumber = parseInt(questionMatch[1]);
      currentQuestion = {
        question_number: questionNumber,
        question_stem: questionMatch[2],
        choice_a: '',
        choice_b: '',
        choice_c: '',
        choice_d: '',
        choice_e: '',
        correct_answer: '',
        underlined_text: '',
        context_before: '',
        context_after: '',
        passage_number: 1,
        has_figure: false,
        figure_url: null,
        figure_data: null
      };
    }

    // Extract choices
    if (currentQuestion) {
      const choiceMatch = line.match(/^([A-E])\.\s*(.+)/);
      if (choiceMatch) {
        const choiceLetter = choiceMatch[1].toLowerCase();
        currentQuestion[`choice_${choiceLetter}`] = choiceMatch[2];
      }
    }

    // Detect passage start
    if (line.includes('PASSAGE') && line.match(/[IVX]+/)) {
      if (currentPassage) {
        const section = detectSectionByContent(currentPassage.title + ' ' + currentPassage.passage_text);
        const formattedPassage = createFormattedPassage(currentPassage, section, testNumber);
        passages.push(formattedPassage);
      }

      passageCount++;
      currentPassage = {
        passage_number: passageCount,
        title: line,
        introduction: '',
        passage_text: '',
        content: ''
      };
    } else if (currentPassage && line.length > 0 && !line.match(/^\d+\./)) {
      // Accumulate passage text
      currentPassage.passage_text += line + ' ';
      currentPassage.content += line + ' ';
    }
  }

  // Save last question and passage
  if (currentQuestion) {
    const section = detectSectionByQuestionNumber(currentQuestion.question_number);
    const formattedQuestion = createFormattedQuestion(currentQuestion, section, testNumber);
    questions.push(formattedQuestion);
  }

  if (currentPassage) {
    const section = detectSectionByContent(currentPassage.title + ' ' + currentPassage.passage_text);
    const formattedPassage = createFormattedPassage(currentPassage, section, testNumber);
    passages.push(formattedPassage);
  }

  console.log(`✅ Extracted ${questions.length} questions and ${passages.length} passages`);
  return { questions, passages };
}

/**
 * Extract and apply answer keys
 */
function extractAndApplyAnswerKeys(content, questions) {
  console.log('🔑 EXTRACTING AND APPLYING ANSWER KEYS...');

  const answerKeys = {};
  const lines = content.split('\n');
  let inAnswerSection = false;

  for (const line of lines) {
    // Detect answer key section
    if (line.toLowerCase().includes('answer key') ||
        line.toLowerCase().includes('answers:') ||
        line.toLowerCase().includes('correct answers')) {
      inAnswerSection = true;
      continue;
    }

    if (inAnswerSection) {
      // Multiple answer key patterns
      const patterns = [
        /(\d+)\.\s*([A-E])/g,           // 1. A
        /(\d+):\s*([A-E])/g,           // 1: A
        /(\d+)\s+([A-E])/g,            // 1 A
        /Question\s+(\d+):\s*([A-E])/ig, // Question 1: A
        /Q(\d+):\s*([A-E])/ig,         // Q1: A
        /Answer\s+(\d+):\s*([A-E])/ig   // Answer 1: A
      ];

      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(line)) !== null) {
          const questionNum = parseInt(match[1]);
          const answer = match[2].toUpperCase();
          answerKeys[questionNum] = answer;
        }
      }
    }
  }

  // Apply answer keys to questions
  questions.forEach(question => {
    const answer = answerKeys[question.question_number];
    if (answer) {
      question.correct_answer = answer;
    }
  });

  const answeredCount = questions.filter(q => q.correct_answer).length;
  console.log(`✅ Applied ${Object.keys(answerKeys).length} answer keys to ${answeredCount}/${questions.length} questions`);

  return answerKeys;
}

/**
 * Upload to database with proper error handling
 */
async function uploadToDatabase(questions, passages) {
  console.log('📤 UPLOADING TO DATABASE WITH ENHANCED VALIDATION...');

  let uploadedQuestions = 0;
  let uploadedPassages = 0;
  const errors = [];

  // Group questions by section
  const questionsBySection = {
    English: questions.filter(q => detectSectionByQuestionNumber(q.question_number) === 'English'),
    Math: questions.filter(q => detectSectionByQuestionNumber(q.question_number) === 'Math'),
    Reading: questions.filter(q => detectSectionByQuestionNumber(q.question_number) === 'Reading'),
    Science: questions.filter(q => detectSectionByQuestionNumber(q.question_number) === 'Science')
  };

  // Group passages by section
  const passagesBySection = {
    English: passages.filter(p => detectSectionByContent(p.title) === 'English'),
    Reading: passages.filter(p => detectSectionByContent(p.title) === 'Reading'),
    Science: passages.filter(p => detectSectionByContent(p.title) === 'Science')
  };

  // Upload passages first (they're referenced by questions)
  for (const [section, sectionPassages] of Object.entries(passagesBySection)) {
    if (sectionPassages.length === 0) continue;

    const tableName = `act_${section.toLowerCase()}_passages`;
    console.log(`📖 Uploading ${sectionPassages.length} ${section} passages to ${tableName}...`);

    for (const passage of sectionPassages) {
      try {
        const { error } = await supabase
          .from(tableName)
          .upsert([passage]);

        if (error) {
          errors.push(`${section} Passage ${passage.passage_number}: ${error.message}`);
        } else {
          uploadedPassages++;
        }
      } catch (err) {
        errors.push(`${section} Passage ${passage.passage_number}: ${err.message}`);
      }
    }
  }

  // Upload questions by section
  for (const [section, sectionQuestions] of Object.entries(questionsBySection)) {
    if (sectionQuestions.length === 0) continue;

    const tableName = `act_${section.toLowerCase()}_questions`;
    console.log(`❓ Uploading ${sectionQuestions.length} ${section} questions to ${tableName}...`);

    for (const question of sectionQuestions) {
      try {
        const { error } = await supabase
          .from(tableName)
          .upsert([question]);

        if (error) {
          errors.push(`${section} Question ${question.question_number}: ${error.message}`);
        } else {
          uploadedQuestions++;
        }
      } catch (err) {
        errors.push(`${section} Question ${question.question_number}: ${err.message}`);
      }
    }
  }

  console.log(`✅ Database upload complete: ${uploadedPassages}P, ${uploadedQuestions}Q`);
  if (errors.length > 0) {
    console.log(`⚠️ Upload errors: ${errors.length}`);
    errors.slice(0, 10).forEach(error => console.log(`  • ${error}`));
  }

  return {
    uploadedPassages,
    uploadedQuestions,
    errors,
    breakdown: {
      questions: questionsBySection,
      passages: passagesBySection
    }
  };
}

/**
 * Main extraction function
 */
async function extractPracticeACT3(txtFile, ocrFile) {
  console.log('\n🚀 ENHANCED PRACTICE ACT 3 EXTRACTION');
  console.log(`📄 TXT File: ${txtFile}`);
  console.log(`📷 OCR File: ${ocrFile}`);

  try {
    // Read TXT file (primary source)
    const txtContent = fs.readFileSync(txtFile, 'utf8');
    console.log(`📊 TXT Content: ${txtContent.length} characters`);

    // Extract content
    const extraction = extractACT3Content(txtContent, 3);

    // Extract and apply answer keys
    const answerKeys = extractAndApplyAnswerKeys(txtContent, extraction.questions);

    // Upload to database
    const uploadResults = await uploadToDatabase(extraction.questions, extraction.passages);

    // Summary report
    console.log('\n🎯 PRACTICE ACT 3 EXTRACTION COMPLETE!');
    console.log(`✅ Questions Extracted: ${extraction.questions.length}`);
    console.log(`✅ Passages Extracted: ${extraction.passages.length}`);
    console.log(`✅ Answer Keys Applied: ${Object.keys(answerKeys).length}`);
    console.log(`📤 Uploaded: ${uploadResults.uploadedPassages}P, ${uploadResults.uploadedQuestions}Q`);

    // Breakdown by section
    console.log('\n📊 SECTION BREAKDOWN:');
    Object.entries(uploadResults.breakdown.questions).forEach(([section, questions]) => {
      console.log(`  ${section}: ${questions.length} questions`);
    });
    Object.entries(uploadResults.breakdown.passages).forEach(([section, passages]) => {
      console.log(`  ${section}: ${passages.length} passages`);
    });

    return {
      success: true,
      extraction,
      uploadResults,
      answerKeys
    };

  } catch (error) {
    console.error(`❌ Extraction failed: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run extraction
extractPracticeACT3(
  "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 3.txt",
  "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 3.pdf"
).catch(console.error);