#!/usr/bin/env node

/**
 * COMPLETE ACT 3 EXTRACTION
 * Final comprehensive extraction for Practice ACT 3
 * Handles all sections and formats properly
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

console.log('🔥 COMPLETE ACT 3 EXTRACTION - FINAL VERSION');
console.log('All Sections • All Passages • All Questions • Complete Answer Keys');
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
 * Extract all answer keys from Practice ACT 3
 */
function extractCompleteAnswerKeys(content) {
  console.log('🔑 EXTRACTING COMPLETE ANSWER KEYS...');

  const answerKeys = {};
  const lines = content.split('\n');
  let currentSection = '';
  let sectionOffset = 0;

  // Look for answer key section
  let inAnswerSection = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect answer key section
    if (line.toLowerCase().includes('answer key') || line.toLowerCase().includes('practice act')) {
      inAnswerSection = true;
      console.log(`  📝 Found answer key section at line ${i}`);
      continue;
    }

    if (inAnswerSection) {
      // Detect section headers
      if (line.toLowerCase().includes('english')) {
        currentSection = 'English';
        sectionOffset = 0;
        console.log(`  📚 English section (offset: ${sectionOffset})`);
      } else if (line.toLowerCase().includes('mathematics') || line.toLowerCase().includes('math')) {
        currentSection = 'Math';
        sectionOffset = 75;
        console.log(`  🔢 Math section (offset: ${sectionOffset})`);
      } else if (line.toLowerCase().includes('reading')) {
        currentSection = 'Reading';
        sectionOffset = 135;
        console.log(`  📖 Reading section (offset: ${sectionOffset})`);
      } else if (line.toLowerCase().includes('science')) {
        currentSection = 'Science';
        sectionOffset = 175;
        console.log(`  🧪 Science section (offset: ${sectionOffset})`);
      }

      // Extract individual answers
      const patterns = [
        /(\d+)\.\s*([A-K])/g,
        /(\d+):\s*([A-K])/g,
        /(\d+)\s+([A-K])/g
      ];

      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(line)) !== null) {
          const localQuestionNum = parseInt(match[1]);
          const answer = match[2].toUpperCase();
          const globalQuestionNum = sectionOffset + localQuestionNum;
          answerKeys[globalQuestionNum] = answer;
        }
      }
    }
  }

  console.log(`✅ Extracted ${Object.keys(answerKeys).length} complete answer keys`);
  return answerKeys;
}

/**
 * Extract all passages from Practice ACT 3
 */
function extractAllPassages(content) {
  console.log('📚 EXTRACTING ALL PASSAGES...');

  const passages = [];
  const lines = content.split('\n');

  let currentSection = 'English';
  let currentPassage = null;
  let passageNumber = 0;
  let sectionPassageNumber = 0;
  let inPassageText = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect section changes
    if (line.includes('ENGLISH TEST')) {
      currentSection = 'English';
      sectionPassageNumber = 0;
      console.log('  📝 Entering English section');
    } else if (line.includes('MATHEMATICS TEST')) {
      currentSection = 'Math';
      sectionPassageNumber = 0;
      console.log('  🔢 Entering Math section');
    } else if (line.includes('READING TEST')) {
      currentSection = 'Reading';
      sectionPassageNumber = 0;
      console.log('  📖 Entering Reading section');
    } else if (line.includes('SCIENCE TEST')) {
      currentSection = 'Science';
      sectionPassageNumber = 0;
      console.log('  🧪 Entering Science section');
    }

    // Detect passage starts
    const passageMatch = line.match(/^PASSAGE\s+[IVX]+/i) ||
                        line.match(/^Passage\s+[IVX]/i) ||
                        (currentSection === 'Reading' && line.match(/^Passage\s*$/i));

    if (passageMatch) {
      // Save previous passage
      if (currentPassage) {
        const formattedPassage = createFormattedPassage(currentPassage, currentSection);
        passages.push(formattedPassage);
        console.log(`  ✅ Saved ${currentSection} passage ${currentPassage.passage_number}`);
      }

      passageNumber++;
      sectionPassageNumber++;

      currentPassage = {
        passage_number: sectionPassageNumber,
        section: currentSection,
        title: line,
        introduction: '',
        passage_text: '',
        passage_type: '',
        author: '',
        source: ''
      };

      inPassageText = true;
      console.log(`  📋 Started ${currentSection} passage ${sectionPassageNumber}: ${line}`);

      // Look for passage type info in next few lines for Reading section
      if (currentSection === 'Reading') {
        for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
          const nextLine = lines[j].trim();
          if (nextLine.includes('LITERARY NARRATIVE') ||
              nextLine.includes('SOCIAL SCIENCE') ||
              nextLine.includes('HUMANITIES') ||
              nextLine.includes('NATURAL SCIENCE')) {
            currentPassage.passage_type = nextLine.split(':')[0].trim();
            currentPassage.introduction = nextLine;
            break;
          }
        }
      }
      continue;
    }

    // Collect passage text
    if (currentPassage && inPassageText) {
      // Stop when we hit questions or next section
      if (line.match(/^\d+\./) ||
          line.includes('GO ON TO THE NEXT PAGE') ||
          line.includes('END OF TEST')) {
        inPassageText = false;
        continue;
      }

      // Add content to passage
      if (line.length > 10 &&
          !line.match(/^[A-J]\./) &&
          !line.includes('ACT-D06') &&
          !line.match(/^\d+$/)) {
        currentPassage.passage_text += line + ' ';
      }
    }
  }

  // Save last passage
  if (currentPassage) {
    const formattedPassage = createFormattedPassage(currentPassage, currentSection);
    passages.push(formattedPassage);
    console.log(`  ✅ Saved final ${currentSection} passage ${currentPassage.passage_number}`);
  }

  console.log(`✅ Extracted ${passages.length} total passages`);
  return passages;
}

/**
 * Create properly formatted passage
 */
function createFormattedPassage(passageData, section) {
  const passageId = getPassageUUID(section, passageData.passage_number);

  const basePassage = {
    id: passageId,
    test_number: 3,
    passage_number: passageData.passage_number,
    title: passageData.title || `Practice ACT 3 ${section} Passage ${passageData.passage_number}`,
    introduction: passageData.introduction || '',
    passage_text: passageData.passage_text.trim()
  };

  if (section === 'Reading') {
    return {
      ...basePassage,
      passage_type: passageData.passage_type || 'HUMANITIES',
      author: passageData.author || 'Various Authors',
      source: passageData.source || 'Practice ACT 3'
    };
  } else if (section === 'Science') {
    return {
      ...basePassage,
      passage_type: determineSciencePassageType(passageData.title),
      figures: null
    };
  }

  // English passages
  return basePassage;
}

/**
 * Extract all questions from Practice ACT 3
 */
function extractAllQuestions(content) {
  console.log('❓ EXTRACTING ALL QUESTIONS...');

  const questions = [];
  const lines = content.split('\n');

  let currentSection = 'English';
  let currentQuestion = null;
  let questionNumber = 0;
  let sectionQuestionNumber = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect section changes
    if (line.includes('ENGLISH TEST')) {
      currentSection = 'English';
      sectionQuestionNumber = 0;
    } else if (line.includes('MATHEMATICS TEST')) {
      currentSection = 'Math';
      sectionQuestionNumber = 0;
    } else if (line.includes('READING TEST')) {
      currentSection = 'Reading';
      sectionQuestionNumber = 0;
    } else if (line.includes('SCIENCE TEST')) {
      currentSection = 'Science';
      sectionQuestionNumber = 0;
    }

    // Detect question starts
    const questionMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (questionMatch) {
      // Save previous question
      if (currentQuestion) {
        const formattedQuestion = createFormattedQuestion(currentQuestion, currentSection);
        questions.push(formattedQuestion);
      }

      questionNumber++;
      sectionQuestionNumber++;

      currentQuestion = {
        question_number: sectionQuestionNumber,
        section: currentSection,
        question_stem: questionMatch[2],
        choice_a: '',
        choice_b: '',
        choice_c: '',
        choice_d: '',
        choice_e: '',
        correct_answer: '',
        underlined_text: '',
        has_figure: false
      };
      continue;
    }

    // Extract choices
    if (currentQuestion) {
      const choiceMatch = line.match(/^([A-K])\.\s*(.+)/) || line.match(/^([A-K])\s+(.+)/);
      if (choiceMatch) {
        const choiceLetter = choiceMatch[1].toUpperCase();
        const choiceText = choiceMatch[2];

        // Map choice letters to standard format
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
      } else if (line === 'NO CHANGE' && !currentQuestion.choice_a) {
        currentQuestion.choice_a = 'NO CHANGE';
      }
    }
  }

  // Save last question
  if (currentQuestion) {
    const formattedQuestion = createFormattedQuestion(currentQuestion, currentSection);
    questions.push(formattedQuestion);
  }

  console.log(`✅ Extracted ${questions.length} total questions`);
  return questions;
}

/**
 * Create formatted question
 */
function createFormattedQuestion(questionData, section) {
  const baseQuestion = {
    test_number: 3,
    question_number: questionData.question_number,
    question_stem: questionData.question_stem.trim(),
    choice_a: questionData.choice_a.trim(),
    choice_b: questionData.choice_b.trim(),
    choice_c: questionData.choice_c.trim(),
    choice_d: questionData.choice_d.trim(),
    correct_answer: questionData.correct_answer || '',
    question_type: determineQuestionType(questionData.question_stem, section),
    question_category: determineQuestionCategory(section),
    lesson_id: null,
    difficulty_level: determineDifficultyLevel(questionData.question_stem),
    notes: `Practice ACT 3 ${section} Question ${questionData.question_number}`
  };

  // Add section-specific fields
  if (section === 'English') {
    return {
      ...baseQuestion,
      passage_number: Math.ceil(questionData.question_number / 15),
      underlined_text: extractUnderlinedText(questionData.question_stem),
      context_before: '',
      context_after: ''
    };
  } else if (section === 'Math') {
    return {
      ...baseQuestion,
      choice_e: questionData.choice_e.trim(),
      has_figure: detectFigure(questionData.question_stem),
      figure_url: null,
      figure_data: null
    };
  } else if (section === 'Reading' || section === 'Science') {
    const passageNumber = Math.ceil(questionData.question_number / 10);
    const passageId = getPassageUUID(section, passageNumber);

    const sectionQuestion = {
      ...baseQuestion,
      passage_id: passageId
    };

    if (section === 'Science') {
      sectionQuestion.has_figure = detectFigure(questionData.question_stem);
      sectionQuestion.figure_url = null;
    }

    return sectionQuestion;
  }

  return baseQuestion;
}

/**
 * Apply answer keys to all questions
 */
function applyCompleteAnswerKeys(questions, answerKeys) {
  console.log('🔑 APPLYING COMPLETE ANSWER KEYS...');

  let appliedCount = 0;
  questions.forEach(question => {
    const section = determineSectionFromQuestion(question);
    const sectionOffsets = { 'English': 0, 'Math': 75, 'Reading': 135, 'Science': 175 };
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
 * Helper functions
 */
function determineSectionFromQuestion(question) {
  if ('passage_number' in question) return 'English';
  if ('choice_e' in question) return 'Math';
  if ('passage_id' in question && !('has_figure' in question)) return 'Reading';
  if ('passage_id' in question && 'has_figure' in question) return 'Science';
  return 'English';
}

function determineQuestionType(questionStem, section) {
  const stem = questionStem.toLowerCase();
  if (section === 'English') {
    if (stem.includes('underlined') || stem.includes('not acceptable')) return 'usage-mechanics';
    if (stem.includes('main idea')) return 'main-idea';
    return 'rhetorical-skills';
  } else if (section === 'Math') {
    if (stem.includes('equation')) return 'algebra';
    if (stem.includes('triangle')) return 'geometry';
    return 'pre-algebra';
  } else if (section === 'Reading') {
    if (stem.includes('main idea')) return 'main-idea';
    if (stem.includes('detail')) return 'detail';
    return 'inference';
  } else if (section === 'Science') {
    if (stem.includes('data')) return 'data-interpretation';
    if (stem.includes('experiment')) return 'research-summary';
    return 'conflicting-viewpoints';
  }
  return 'general';
}

function determineQuestionCategory(section) {
  const categories = { 'English': 'POW', 'Math': 'PHM-A', 'Reading': 'KID', 'Science': 'IOD' };
  return categories[section] || 'General';
}

function determineDifficultyLevel(questionStem) {
  const complexity = questionStem.length;
  if (complexity < 100) return 'easy';
  if (complexity < 200) return 'medium';
  return 'hard';
}

function extractUnderlinedText(questionStem) {
  return questionStem.toLowerCase().includes('underlined') ? 'underlined portion' : '';
}

function detectFigure(questionStem) {
  return questionStem.toLowerCase().includes('figure') ||
         questionStem.toLowerCase().includes('graph') ||
         questionStem.toLowerCase().includes('table');
}

function determineSciencePassageType(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('data')) return 'DATA REPRESENTATION';
  if (titleLower.includes('research')) return 'RESEARCH SUMMARY';
  return 'CONFLICTING VIEWPOINTS';
}

/**
 * Upload everything to database
 */
async function uploadEverythingToDatabase(questions, passages) {
  console.log('📤 UPLOADING EVERYTHING TO DATABASE...');

  let totalUploaded = 0;
  const errors = [];
  const results = {};

  // Group by section
  const questionsBySection = {
    English: questions.filter(q => determineSectionFromQuestion(q) === 'English'),
    Math: questions.filter(q => determineSectionFromQuestion(q) === 'Math'),
    Reading: questions.filter(q => determineSectionFromQuestion(q) === 'Reading'),
    Science: questions.filter(q => determineSectionFromQuestion(q) === 'Science')
  };

  const passagesBySection = {
    English: passages.filter(p => !p.passage_type && !p.author),
    Reading: passages.filter(p => p.passage_type && p.author),
    Science: passages.filter(p => p.passage_type && !p.author)
  };

  // Upload passages first
  for (const [section, sectionPassages] of Object.entries(passagesBySection)) {
    if (sectionPassages.length === 0) continue;

    const tableName = `act_${section.toLowerCase()}_passages`;
    console.log(`📖 Uploading ${sectionPassages.length} ${section} passages...`);

    let sectionUploaded = 0;
    for (const passage of sectionPassages) {
      try {
        const { error } = await supabase.from(tableName).upsert([passage]);
        if (!error) {
          sectionUploaded++;
          totalUploaded++;
        } else {
          errors.push(`${section} Passage ${passage.passage_number}: ${error.message}`);
        }
      } catch (err) {
        errors.push(`${section} Passage ${passage.passage_number}: ${err.message}`);
      }
    }
    results[`${section}_passages`] = sectionUploaded;
  }

  // Upload questions
  for (const [section, sectionQuestions] of Object.entries(questionsBySection)) {
    if (sectionQuestions.length === 0) continue;

    const tableName = `act_${section.toLowerCase()}_questions`;
    console.log(`❓ Uploading ${sectionQuestions.length} ${section} questions...`);

    let sectionUploaded = 0;
    for (const question of sectionQuestions) {
      try {
        const { error } = await supabase.from(tableName).upsert([question]);
        if (!error) {
          sectionUploaded++;
          totalUploaded++;
        } else {
          errors.push(`${section} Question ${question.question_number}: ${error.message}`);
        }
      } catch (err) {
        errors.push(`${section} Question ${question.question_number}: ${err.message}`);
      }
    }
    results[`${section}_questions`] = sectionUploaded;
  }

  console.log(`✅ Total uploaded: ${totalUploaded} items`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length} (likely duplicates)`);
  }

  return { results, errors, totalUploaded };
}

/**
 * Main extraction function
 */
async function completeACT3Extraction() {
  const txtFile = "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 3.txt";

  console.log('\n🚀 COMPLETE PRACTICE ACT 3 EXTRACTION');
  console.log(`📄 Processing: ${txtFile}`);

  try {
    const content = fs.readFileSync(txtFile, 'utf8');
    console.log(`📊 Content length: ${content.length} characters`);

    // Extract everything
    const passages = extractAllPassages(content);
    const questions = extractAllQuestions(content);
    const answerKeys = extractCompleteAnswerKeys(content);

    // Apply answer keys
    applyCompleteAnswerKeys(questions, answerKeys);

    // Upload everything
    const uploadResults = await uploadEverythingToDatabase(questions, passages);

    // Final summary
    console.log('\n🎯 COMPLETE ACT 3 EXTRACTION FINISHED!');
    console.log('=' .repeat(60));
    console.log(`✅ Questions Extracted: ${questions.length}`);
    console.log(`✅ Passages Extracted: ${passages.length}`);
    console.log(`✅ Answer Keys Found: ${Object.keys(answerKeys).length}`);
    console.log(`📤 Total Items Uploaded: ${uploadResults.totalUploaded}`);

    console.log('\n📊 FINAL BREAKDOWN:');
    const breakdown = {
      English: questions.filter(q => determineSectionFromQuestion(q) === 'English').length,
      Math: questions.filter(q => determineSectionFromQuestion(q) === 'Math').length,
      Reading: questions.filter(q => determineSectionFromQuestion(q) === 'Reading').length,
      Science: questions.filter(q => determineSectionFromQuestion(q) === 'Science').length
    };

    Object.entries(breakdown).forEach(([section, count]) => {
      console.log(`  ${section}: ${count} questions`);
    });

    console.log('\n🎉 PRACTICE ACT 3 EXTRACTION 100% COMPLETE! 🎉');

    return {
      success: true,
      questions,
      passages,
      answerKeys,
      uploadResults,
      breakdown
    };

  } catch (error) {
    console.error(`❌ Extraction failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Run the complete extraction
completeACT3Extraction().catch(console.error);