#!/usr/bin/env node

/**
 * PRACTICE ACT 3 SPECIFIC EXTRACTOR
 * Designed for the exact format found in Practice ACT 3
 * Handles the unique structure and formatting patterns
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

console.log('🔥 PRACTICE ACT 3 SPECIFIC EXTRACTOR');
console.log('Tailored for Practice ACT 3 Format • UUID Generation • Perfect Database Matching');
console.log('=' .repeat(80));

// Store passage UUIDs for linking
const passageUUIDs = {};
let globalQuestionNumber = 0;

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
 * Detect section based on question number (Practice ACT format)
 * English: 1-75, Math: 1-60, Reading: 1-40, Science: 1-40
 */
function getSectionInfo(globalQuestionNum) {
  if (globalQuestionNum >= 1 && globalQuestionNum <= 75) {
    return { section: 'English', localNumber: globalQuestionNum, passageNumber: Math.ceil(globalQuestionNum / 15) };
  } else if (globalQuestionNum >= 76 && globalQuestionNum <= 135) {
    return { section: 'Math', localNumber: globalQuestionNum - 75, passageNumber: null };
  } else if (globalQuestionNum >= 136 && globalQuestionNum <= 175) {
    return { section: 'Reading', localNumber: globalQuestionNum - 135, passageNumber: Math.ceil((globalQuestionNum - 135) / 10) };
  } else if (globalQuestionNum >= 176 && globalQuestionNum <= 215) {
    return { section: 'Science', localNumber: globalQuestionNum - 175, passageNumber: Math.ceil((globalQuestionNum - 175) / 10) };
  }
  return { section: 'English', localNumber: globalQuestionNum, passageNumber: 1 };
}

/**
 * Extract questions from Practice ACT 3 format
 */
function extractPracticeACT3Questions(content) {
  console.log('🔍 EXTRACTING QUESTIONS FROM PRACTICE ACT 3 FORMAT...');

  const questions = [];
  const lines = content.split('\n');

  let currentQuestion = null;
  let currentChoice = null;
  let inQuestionText = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Detect question number - format like "1. Which of the following..."
    const questionMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (questionMatch) {
      // Save previous question
      if (currentQuestion) {
        const sectionInfo = getSectionInfo(currentQuestion.question_number);
        const formattedQuestion = createPracticeACT3Question(currentQuestion, sectionInfo);
        questions.push(formattedQuestion);
      }

      globalQuestionNumber++;
      currentQuestion = {
        question_number: globalQuestionNumber,
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
        has_figure: false,
        figure_url: null,
        figure_data: null
      };
      inQuestionText = true;
      continue;
    }

    // Detect choices - format like "A." or "F." etc.
    const choiceMatch = line.match(/^([A-J])\.\s*(.*)/) || line.match(/^([A-J])\s+(.+)/);
    if (choiceMatch && currentQuestion) {
      const choiceLetter = choiceMatch[1].toUpperCase();
      const choiceText = choiceMatch[2];

      // Map choice letters to standard a,b,c,d,e format
      const choiceMap = {
        'A': 'a', 'F': 'a',
        'B': 'b', 'G': 'b',
        'C': 'c', 'H': 'c',
        'D': 'd', 'J': 'd',
        'E': 'e', 'K': 'e'
      };

      const mappedChoice = choiceMap[choiceLetter];
      if (mappedChoice) {
        currentQuestion[`choice_${mappedChoice}`] = choiceText;
      }

      inQuestionText = false;
      continue;
    }

    // Continue question stem if we're still in question text
    if (inQuestionText && currentQuestion && !line.match(/^[A-J]\./)) {
      currentQuestion.question_stem += ' ' + line;
    }

    // Detect special patterns like "NO CHANGE"
    if (line === 'NO CHANGE' && currentQuestion) {
      if (!currentQuestion.choice_a) {
        currentQuestion.choice_a = 'NO CHANGE';
      }
    }
  }

  // Save last question
  if (currentQuestion) {
    const sectionInfo = getSectionInfo(currentQuestion.question_number);
    const formattedQuestion = createPracticeACT3Question(currentQuestion, sectionInfo);
    questions.push(formattedQuestion);
  }

  console.log(`✅ Extracted ${questions.length} questions from Practice ACT 3`);
  return questions;
}

/**
 * Create properly formatted question based on Practice ACT 3 structure
 */
function createPracticeACT3Question(questionData, sectionInfo) {
  const baseQuestion = {
    test_number: 3,
    question_number: sectionInfo.localNumber,
    question_stem: questionData.question_stem.trim(),
    choice_a: questionData.choice_a.trim(),
    choice_b: questionData.choice_b.trim(),
    choice_c: questionData.choice_c.trim(),
    choice_d: questionData.choice_d.trim(),
    correct_answer: questionData.correct_answer || '',
    question_type: determineQuestionType(questionData.question_stem, sectionInfo.section),
    question_category: determineQuestionCategory(questionData.question_stem, sectionInfo.section),
    lesson_id: null,
    difficulty_level: determineDifficultyLevel(questionData.question_stem),
    notes: `Practice ACT 3 Question ${sectionInfo.localNumber} (${sectionInfo.section})`
  };

  // Add section-specific fields
  if (sectionInfo.section === 'English') {
    return {
      ...baseQuestion,
      passage_number: sectionInfo.passageNumber,
      underlined_text: extractUnderlinedText(questionData.question_stem),
      context_before: '',
      context_after: ''
    };
  } else if (sectionInfo.section === 'Math') {
    return {
      ...baseQuestion,
      choice_e: questionData.choice_e.trim(),
      has_figure: detectFigure(questionData.question_stem),
      figure_url: null,
      figure_data: null
    };
  } else if (sectionInfo.section === 'Reading' || sectionInfo.section === 'Science') {
    const passageId = getPassageUUID(sectionInfo.section, sectionInfo.passageNumber);

    const sectionQuestion = {
      ...baseQuestion,
      passage_id: passageId
    };

    if (sectionInfo.section === 'Science') {
      sectionQuestion.has_figure = detectFigure(questionData.question_stem);
      sectionQuestion.figure_url = null;
    }

    return sectionQuestion;
  }

  return baseQuestion;
}

/**
 * Extract passages from Practice ACT 3 format
 */
function extractPracticeACT3Passages(content) {
  console.log('🔍 EXTRACTING PASSAGES FROM PRACTICE ACT 3 FORMAT...');

  const passages = [];
  const lines = content.split('\n');

  let currentPassage = null;
  let passageCount = 0;
  let currentSection = 'English';
  let inPassageText = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect section headers
    if (line.includes('ENGLISH TEST')) {
      currentSection = 'English';
      continue;
    } else if (line.includes('MATHEMATICS TEST')) {
      currentSection = 'Math';
      continue;
    } else if (line.includes('READING TEST')) {
      currentSection = 'Reading';
      continue;
    } else if (line.includes('SCIENCE TEST')) {
      currentSection = 'Science';
      continue;
    }

    // Detect passage headers - formats like "PASSAGE I", "PASSAGE II", etc.
    if (line.match(/^PASSAGE\s+[IVX]+/) || line.includes('PASSAGE')) {
      // Save previous passage
      if (currentPassage) {
        const formattedPassage = createPracticeACT3Passage(currentPassage, currentSection);
        passages.push(formattedPassage);
      }

      passageCount++;
      currentPassage = {
        passage_number: getSectionPassageNumber(currentSection, passageCount),
        title: line,
        introduction: '',
        passage_text: '',
        section: currentSection
      };
      inPassageText = true;
      continue;
    }

    // Collect passage text
    if (currentPassage && inPassageText) {
      // Stop collecting when we hit a question
      if (line.match(/^\d+\./)) {
        inPassageText = false;
        continue;
      }

      // Add to passage text
      if (line.length > 0 && !line.match(/^[A-J]\./)) {
        currentPassage.passage_text += line + ' ';
      }
    }
  }

  // Save last passage
  if (currentPassage) {
    const formattedPassage = createPracticeACT3Passage(currentPassage, currentSection);
    passages.push(formattedPassage);
  }

  console.log(`✅ Extracted ${passages.length} passages from Practice ACT 3`);
  return passages;
}

/**
 * Get passage number within section
 */
function getSectionPassageNumber(section, globalCount) {
  // Reset counting for each section
  if (section === 'English') return Math.min(globalCount, 5);
  if (section === 'Reading') return Math.min(globalCount - 5, 4);
  if (section === 'Science') return Math.min(globalCount - 9, 7);
  return 1;
}

/**
 * Create properly formatted passage for Practice ACT 3
 */
function createPracticeACT3Passage(passageData, section) {
  const passageNumber = passageData.passage_number;
  const passageId = getPassageUUID(section, passageNumber);

  const basePassage = {
    id: passageId,
    test_number: 3,
    passage_number: passageNumber,
    title: passageData.title || `Practice ACT 3 ${section} Passage ${passageNumber}`,
    introduction: passageData.introduction || '',
    passage_text: passageData.passage_text.trim()
  };

  if (section === 'Reading') {
    return {
      ...basePassage,
      passage_type: determineReadingPassageType(passageData.title),
      author: 'Unknown Author',
      source: 'Practice ACT 3'
    };
  } else if (section === 'Science') {
    return {
      ...basePassage,
      passage_type: determineSciencePassageType(passageData.title),
      figures: null
    };
  }

  // English passages - minimal fields
  return basePassage;
}

/**
 * Extract answer keys from Practice ACT 3
 */
function extractPracticeACT3AnswerKeys(content) {
  console.log('🔑 EXTRACTING ANSWER KEYS FROM PRACTICE ACT 3...');

  const answerKeys = {};
  const lines = content.split('\n');
  let inAnswerSection = false;
  let sectionOffset = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect answer key sections
    if (line.toLowerCase().includes('answer key') ||
        line.toLowerCase().includes('answers') ||
        line.toLowerCase().includes('answer choices')) {
      inAnswerSection = true;
      continue;
    }

    // Detect section headers in answer key
    if (inAnswerSection) {
      if (line.toLowerCase().includes('english')) {
        sectionOffset = 0;
      } else if (line.toLowerCase().includes('mathematics')) {
        sectionOffset = 75;
      } else if (line.toLowerCase().includes('reading')) {
        sectionOffset = 135;
      } else if (line.toLowerCase().includes('science')) {
        sectionOffset = 175;
      }
    }

    if (inAnswerSection) {
      // Extract answers in various formats
      const answerPattern = /(\d+)\.\s*([A-K])/g;
      let match;
      while ((match = answerPattern.exec(line)) !== null) {
        const localQuestionNum = parseInt(match[1]);
        const answer = match[2].toUpperCase();
        const globalQuestionNum = sectionOffset + localQuestionNum;
        answerKeys[globalQuestionNum] = answer;
      }
    }
  }

  console.log(`✅ Extracted ${Object.keys(answerKeys).length} answer keys`);
  return answerKeys;
}

/**
 * Apply answer keys to questions
 */
function applyAnswerKeys(questions, answerKeys) {
  console.log('🔑 APPLYING ANSWER KEYS TO QUESTIONS...');

  let appliedCount = 0;
  questions.forEach(question => {
    // Calculate global question number for answer key lookup
    const sectionOffsets = { 'English': 0, 'Math': 75, 'Reading': 135, 'Science': 175 };
    const section = determineSectionFromQuestionData(question);
    const globalQuestionNum = sectionOffsets[section] + question.question_number;

    const answer = answerKeys[globalQuestionNum];
    if (answer) {
      question.correct_answer = answer;
      appliedCount++;
    }
  });

  console.log(`✅ Applied ${appliedCount}/${questions.length} answer keys`);
}

/**
 * Determine section from question data
 */
function determineSectionFromQuestionData(question) {
  if ('passage_number' in question) return 'English';
  if ('choice_e' in question) return 'Math';
  if ('passage_id' in question && !('has_figure' in question)) return 'Reading';
  if ('passage_id' in question && 'has_figure' in question) return 'Science';
  return 'English';
}

/**
 * Helper functions for question classification
 */
function determineQuestionType(questionStem, section) {
  const stem = questionStem.toLowerCase();

  if (section === 'English') {
    if (stem.includes('underlined') || stem.includes('not acceptable')) {
      return 'usage-mechanics';
    } else if (stem.includes('main idea') || stem.includes('best describes')) {
      return 'main-idea';
    }
    return 'rhetorical-skills';
  } else if (section === 'Math') {
    if (stem.includes('equation') || stem.includes('solve')) {
      return 'algebra';
    } else if (stem.includes('triangle') || stem.includes('angle')) {
      return 'geometry';
    }
    return 'pre-algebra';
  } else if (section === 'Reading') {
    if (stem.includes('main idea')) return 'main-idea';
    if (stem.includes('detail') || stem.includes('according to')) return 'detail';
    return 'inference';
  } else if (section === 'Science') {
    if (stem.includes('data') || stem.includes('table')) return 'data-interpretation';
    if (stem.includes('experiment')) return 'research-summary';
    return 'conflicting-viewpoints';
  }

  return 'general';
}

function determineQuestionCategory(questionStem, section) {
  if (section === 'English') return 'POW';
  if (section === 'Math') return 'PHM-A';
  if (section === 'Reading') return 'KID';
  if (section === 'Science') return 'IOD';
  return 'General';
}

function determineDifficultyLevel(questionStem) {
  const complexity = questionStem.length;
  if (complexity < 100) return 'easy';
  if (complexity < 200) return 'medium';
  return 'hard';
}

function extractUnderlinedText(questionStem) {
  const underlinedMatch = questionStem.match(/underlined\s+portion/i);
  return underlinedMatch ? 'underlined portion' : '';
}

function detectFigure(questionStem) {
  return questionStem.toLowerCase().includes('figure') ||
         questionStem.toLowerCase().includes('graph') ||
         questionStem.toLowerCase().includes('table');
}

function determineReadingPassageType(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('prose') || titleLower.includes('fiction')) return 'PROSE FICTION';
  if (titleLower.includes('social') || titleLower.includes('history')) return 'SOCIAL SCIENCE';
  if (titleLower.includes('natural') || titleLower.includes('biology')) return 'NATURAL SCIENCE';
  return 'HUMANITIES';
}

function determineSciencePassageType(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('data') || titleLower.includes('table')) return 'DATA REPRESENTATION';
  if (titleLower.includes('research') || titleLower.includes('study')) return 'RESEARCH SUMMARY';
  return 'CONFLICTING VIEWPOINTS';
}

/**
 * Upload to database with proper section handling
 */
async function uploadToDatabase(questions, passages) {
  console.log('📤 UPLOADING PRACTICE ACT 3 TO DATABASE...');

  let uploadedQuestions = 0;
  let uploadedPassages = 0;
  const errors = [];

  // Group data by section
  const questionsBySection = {
    English: questions.filter(q => determineSectionFromQuestionData(q) === 'English'),
    Math: questions.filter(q => determineSectionFromQuestionData(q) === 'Math'),
    Reading: questions.filter(q => determineSectionFromQuestionData(q) === 'Reading'),
    Science: questions.filter(q => determineSectionFromQuestionData(q) === 'Science')
  };

  const passagesBySection = {
    English: passages.filter(p => !p.passage_type), // English passages don't have passage_type
    Reading: passages.filter(p => p.passage_type && p.author),
    Science: passages.filter(p => p.passage_type && !p.author)
  };

  // Upload passages first
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

  console.log(`✅ Upload complete: ${uploadedPassages}P, ${uploadedQuestions}Q`);
  if (errors.length > 0) {
    console.log(`⚠️ Upload errors: ${errors.length}`);
    errors.slice(0, 10).forEach(error => console.log(`  • ${error}`));
  }

  return {
    uploadedPassages,
    uploadedQuestions,
    errors,
    breakdown: { questions: questionsBySection, passages: passagesBySection }
  };
}

/**
 * Main extraction function
 */
async function extractPracticeACT3() {
  const txtFile = "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 3.txt";

  console.log('\n🚀 PRACTICE ACT 3 SPECIFIC EXTRACTION');
  console.log(`📄 Processing: ${txtFile}`);

  try {
    const content = fs.readFileSync(txtFile, 'utf8');
    console.log(`📊 Content length: ${content.length} characters`);

    // Extract components
    const questions = extractPracticeACT3Questions(content);
    const passages = extractPracticeACT3Passages(content);
    const answerKeys = extractPracticeACT3AnswerKeys(content);

    // Apply answer keys
    applyAnswerKeys(questions, answerKeys);

    // Upload to database
    const uploadResults = await uploadToDatabase(questions, passages);

    // Summary
    console.log('\n🎯 PRACTICE ACT 3 EXTRACTION COMPLETE!');
    console.log(`✅ Questions: ${questions.length} extracted`);
    console.log(`✅ Passages: ${passages.length} extracted`);
    console.log(`✅ Answer Keys: ${Object.keys(answerKeys).length} found`);
    console.log(`📤 Uploaded: ${uploadResults.uploadedPassages}P, ${uploadResults.uploadedQuestions}Q`);

    // Section breakdown
    console.log('\n📊 SECTION BREAKDOWN:');
    Object.entries(uploadResults.breakdown.questions).forEach(([section, questions]) => {
      console.log(`  ${section}: ${questions.length} questions`);
    });
    Object.entries(uploadResults.breakdown.passages).forEach(([section, passages]) => {
      console.log(`  ${section}: ${passages.length} passages`);
    });

    return {
      success: true,
      questions,
      passages,
      answerKeys,
      uploadResults
    };

  } catch (error) {
    console.error(`❌ Extraction failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Run extraction
extractPracticeACT3().catch(console.error);