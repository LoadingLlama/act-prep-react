#!/usr/bin/env node

/**
 * ACCURATE ACT 3 EXTRACTION - COMPLETE REWRITE
 * Properly handles the actual Practice ACT 3 format
 * Fixes all the issues found in manual review
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

console.log('🔥 ACCURATE ACT 3 EXTRACTION - COMPLETE REWRITE');
console.log('Proper Format Handling • All Choices Extracted • Complete Question Stems');
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
 * Accurately extract questions from Practice ACT 3
 */
function extractQuestionsAccurately(content) {
  console.log('❓ EXTRACTING QUESTIONS WITH ACCURATE PARSING...');

  const questions = [];
  const lines = content.split('\n');

  let currentSection = 'English';
  let currentQuestion = null;
  let questionCount = 0;
  let collectingChoices = false;
  let currentChoiceLabel = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect section changes
    if (line.includes('ENGLISH TEST')) {
      currentSection = 'English';
      console.log('  📝 Entering English section');
      continue;
    } else if (line.includes('MATHEMATICS TEST')) {
      currentSection = 'Math';
      console.log('  🔢 Entering Math section');
      continue;
    } else if (line.includes('READING TEST')) {
      currentSection = 'Reading';
      console.log('  📖 Entering Reading section');
      continue;
    } else if (line.includes('SCIENCE TEST')) {
      currentSection = 'Science';
      console.log('  🧪 Entering Science section');
      continue;
    }

    // Detect question starts - look for number followed by period
    const questionMatch = line.match(/^(\d+)\.\s*(.+)$/);
    if (questionMatch) {
      // Save previous question
      if (currentQuestion) {
        const formattedQuestion = formatQuestion(currentQuestion, currentSection);
        questions.push(formattedQuestion);
        console.log(`    ✅ Saved ${currentSection} question ${currentQuestion.local_number}`);
      }

      questionCount++;
      const questionNumber = parseInt(questionMatch[1]);

      currentQuestion = {
        global_number: questionCount,
        local_number: questionNumber,
        section: currentSection,
        question_stem: questionMatch[2],
        choice_a: '',
        choice_b: '',
        choice_c: '',
        choice_d: '',
        choice_e: '',
        correct_answer: '',
        has_figure: false
      };

      collectingChoices = false;
      console.log(`    📝 Started ${currentSection} question ${questionNumber}: ${questionMatch[2].substring(0, 50)}...`);
      continue;
    }

    // Continue question stem if we have a current question and not collecting choices
    if (currentQuestion && !collectingChoices && line.length > 0) {
      // Check if this line starts choice collection
      if (line.match(/^[A-J]\./) || line === 'NO CHANGE') {
        collectingChoices = true;
      } else if (!line.match(/^\d+$/) &&
                 !line.includes('GO ON TO THE NEXT PAGE') &&
                 !line.includes('ACT-D06')) {
        // Continue question stem
        currentQuestion.question_stem += ' ' + line;
        continue;
      }
    }

    // Handle choice collection
    if (currentQuestion && collectingChoices) {
      // Direct choice pattern: "A. choice text"
      const directChoiceMatch = line.match(/^([A-J])\.\s*(.+)$/);
      if (directChoiceMatch) {
        const choiceLetter = directChoiceMatch[1].toUpperCase();
        const choiceText = directChoiceMatch[2];
        assignChoice(currentQuestion, choiceLetter, choiceText);
        continue;
      }

      // Choice label only: "A."
      const labelOnlyMatch = line.match(/^([A-J])\.\s*$/);
      if (labelOnlyMatch) {
        currentChoiceLabel = labelOnlyMatch[1].toUpperCase();
        continue;
      }

      // Choice text for previously found label
      if (currentChoiceLabel && line.length > 0 &&
          !line.match(/^\d+\./) &&
          !line.includes('GO ON TO THE NEXT PAGE')) {
        assignChoice(currentQuestion, currentChoiceLabel, line);
        currentChoiceLabel = '';
        continue;
      }

      // Special case: "NO CHANGE"
      if (line === 'NO CHANGE') {
        if (!currentQuestion.choice_a) {
          currentQuestion.choice_a = 'NO CHANGE';
        }
        continue;
      }

      // If we encounter a new question, stop collecting choices
      if (line.match(/^\d+\./)) {
        collectingChoices = false;
        i--; // Reprocess this line
        continue;
      }
    }
  }

  // Save last question
  if (currentQuestion) {
    const formattedQuestion = formatQuestion(currentQuestion, currentSection);
    questions.push(formattedQuestion);
    console.log(`    ✅ Saved final ${currentSection} question ${currentQuestion.local_number}`);
  }

  console.log(`✅ Extracted ${questions.length} questions with accurate parsing`);
  return questions;
}

/**
 * Assign choice to the appropriate slot
 */
function assignChoice(question, choiceLetter, choiceText) {
  const choiceMap = {
    'A': 'choice_a', 'F': 'choice_a',
    'B': 'choice_b', 'G': 'choice_b',
    'C': 'choice_c', 'H': 'choice_c',
    'D': 'choice_d', 'J': 'choice_d',
    'E': 'choice_e', 'K': 'choice_e'
  };

  const fieldName = choiceMap[choiceLetter];
  if (fieldName && !question[fieldName]) {
    question[fieldName] = choiceText;
    console.log(`      ✓ Choice ${choiceLetter}: ${choiceText.substring(0, 30)}...`);
  }
}

/**
 * Format question for database
 */
function formatQuestion(questionData, section) {
  const baseQuestion = {
    test_number: 3,
    question_number: questionData.local_number,
    question_stem: questionData.question_stem.trim(),
    choice_a: questionData.choice_a.trim(),
    choice_b: questionData.choice_b.trim(),
    choice_c: questionData.choice_c.trim(),
    choice_d: questionData.choice_d.trim(),
    correct_answer: '', // Will be filled by answer key
    question_type: determineQuestionType(questionData.question_stem, section),
    question_category: determineQuestionCategory(section),
    lesson_id: null,
    difficulty_level: determineDifficultyLevel(questionData.question_stem),
    notes: `Practice ACT 3 ${section} Question ${questionData.local_number}`
  };

  // Add section-specific fields
  if (section === 'English') {
    return {
      ...baseQuestion,
      passage_number: Math.ceil(questionData.local_number / 15),
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
    const passageNumber = Math.ceil(questionData.local_number / 10);
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
 * Accurately extract passages from Practice ACT 3
 */
function extractPassagesAccurately(content) {
  console.log('📚 EXTRACTING PASSAGES WITH ACCURATE PARSING...');

  const passages = [];
  const lines = content.split('\n');

  let currentSection = 'English';
  let currentPassage = null;
  let passageNumber = 0;
  let sectionPassageNumber = 0;
  let collectingText = false;

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
      console.log('  🔢 Entering Math section (no passages)');
    } else if (line.includes('READING TEST')) {
      currentSection = 'Reading';
      sectionPassageNumber = 0;
      console.log('  📖 Entering Reading section');
    } else if (line.includes('SCIENCE TEST')) {
      currentSection = 'Science';
      sectionPassageNumber = 0;
      console.log('  🧪 Entering Science section');
    }

    // Skip Math section (no passages)
    if (currentSection === 'Math') continue;

    // Detect passage headers
    const passageHeaderMatch = line.match(/^PASSAGE\s+([IVX]+)/i) ||
                               (currentSection === 'Reading' && line.match(/^Passage\s*$/i));

    if (passageHeaderMatch) {
      // Save previous passage
      if (currentPassage) {
        const formattedPassage = formatPassage(currentPassage, currentSection);
        passages.push(formattedPassage);
        console.log(`    ✅ Saved ${currentSection} passage ${currentPassage.passage_number}`);
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

      collectingText = true;
      console.log(`    📖 Started ${currentSection} passage ${sectionPassageNumber}: ${line}`);

      // For Reading section, look for passage type info
      if (currentSection === 'Reading') {
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          const nextLine = lines[j].trim();
          if (nextLine.includes('LITERARY NARRATIVE') ||
              nextLine.includes('SOCIAL SCIENCE') ||
              nextLine.includes('HUMANITIES') ||
              nextLine.includes('NATURAL SCIENCE')) {
            currentPassage.passage_type = nextLine.split(':')[0].trim();
            currentPassage.introduction = nextLine;
            console.log(`      📋 Found passage type: ${currentPassage.passage_type}`);
            break;
          }
        }
      }
      continue;
    }

    // Collect passage text
    if (currentPassage && collectingText) {
      // Stop collecting when we hit questions
      if (line.match(/^\d+\./)) {
        collectingText = false;
        continue;
      }

      // Add content to passage
      if (line.length > 0 &&
          !line.includes('GO ON TO THE NEXT PAGE') &&
          !line.includes('ACT-D06') &&
          !line.match(/^\d+$/)) {
        currentPassage.passage_text += line + ' ';
      }
    }
  }

  // Save last passage
  if (currentPassage) {
    const formattedPassage = formatPassage(currentPassage, currentSection);
    passages.push(formattedPassage);
    console.log(`    ✅ Saved final ${currentSection} passage ${currentPassage.passage_number}`);
  }

  console.log(`✅ Extracted ${passages.length} passages with accurate parsing`);
  return passages;
}

/**
 * Format passage for database
 */
function formatPassage(passageData, section) {
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
 * Helper functions
 */
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
 * Upload to database with verification
 */
async function uploadAccurateData(questions, passages) {
  console.log('📤 UPLOADING ACCURATELY EXTRACTED DATA...');

  let totalUploaded = 0;
  const errors = [];

  // Group by section
  const questionsBySection = {
    English: questions.filter(q => q.passage_number !== undefined),
    Math: questions.filter(q => q.choice_e !== undefined),
    Reading: questions.filter(q => q.passage_id && q.has_figure === undefined),
    Science: questions.filter(q => q.passage_id && q.has_figure !== undefined)
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
    console.log(`📖 Uploading ${sectionPassages.length} accurate ${section} passages...`);

    for (const passage of sectionPassages) {
      try {
        const { error } = await supabase.from(tableName).upsert([passage]);
        if (!error) {
          totalUploaded++;
          console.log(`    ✅ Uploaded ${section} passage ${passage.passage_number}`);
        } else {
          errors.push(`${section} Passage ${passage.passage_number}: ${error.message}`);
        }
      } catch (err) {
        errors.push(`${section} Passage ${passage.passage_number}: ${err.message}`);
      }
    }
  }

  // Upload questions
  for (const [section, sectionQuestions] of Object.entries(questionsBySection)) {
    if (sectionQuestions.length === 0) continue;

    const tableName = `act_${section.toLowerCase()}_questions`;
    console.log(`❓ Uploading ${sectionQuestions.length} accurate ${section} questions...`);

    for (const question of sectionQuestions) {
      try {
        const { error } = await supabase.from(tableName).upsert([question]);
        if (!error) {
          totalUploaded++;
          console.log(`    ✅ Uploaded ${section} question ${question.question_number}`);
        } else {
          errors.push(`${section} Question ${question.question_number}: ${error.message}`);
        }
      } catch (err) {
        errors.push(`${section} Question ${question.question_number}: ${err.message}`);
      }
    }
  }

  console.log(`✅ Total uploaded: ${totalUploaded} accurate items`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.slice(0, 5).forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors, questionsBySection, passagesBySection };
}

/**
 * Main accurate extraction function
 */
async function performAccurateExtraction() {
  const txtFile = "/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 3.txt";

  console.log('\n🚀 ACCURATE PRACTICE ACT 3 EXTRACTION');
  console.log(`📄 Processing: ${txtFile}`);

  try {
    const content = fs.readFileSync(txtFile, 'utf8');
    console.log(`📊 Content length: ${content.length} characters`);

    // Extract with accurate parsing
    const questions = extractQuestionsAccurately(content);
    const passages = extractPassagesAccurately(content);

    // Validate extraction quality
    console.log('\n🔍 VALIDATING EXTRACTION QUALITY...');
    const validationResults = validateExtraction(questions, passages);

    // Upload accurate data
    const uploadResults = await uploadAccurateData(questions, passages);

    // Final report
    console.log('\n🎯 ACCURATE EXTRACTION COMPLETE!');
    console.log('=' .repeat(60));
    console.log(`✅ Questions Extracted: ${questions.length}`);
    console.log(`✅ Passages Extracted: ${passages.length}`);
    console.log(`📤 Total Uploaded: ${uploadResults.totalUploaded}`);

    console.log('\n📊 QUALITY VALIDATION:');
    console.log(`  Questions with all choices: ${validationResults.questionsWithAllChoices}/${questions.length}`);
    console.log(`  Questions with stems: ${validationResults.questionsWithStems}/${questions.length}`);
    console.log(`  Passages with text: ${validationResults.passagesWithText}/${passages.length}`);

    console.log('\n📋 SECTION BREAKDOWN:');
    Object.entries(uploadResults.questionsBySection).forEach(([section, questions]) => {
      console.log(`  ${section}: ${questions.length} questions`);
    });

    return {
      success: true,
      questions,
      passages,
      uploadResults,
      validationResults
    };

  } catch (error) {
    console.error(`❌ Accurate extraction failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Validate extraction quality
 */
function validateExtraction(questions, passages) {
  let questionsWithAllChoices = 0;
  let questionsWithStems = 0;
  let passagesWithText = 0;

  questions.forEach(q => {
    if (q.question_stem && q.question_stem.length > 10) questionsWithStems++;
    if (q.choice_a && q.choice_b && q.choice_c && q.choice_d) questionsWithAllChoices++;
  });

  passages.forEach(p => {
    if (p.passage_text && p.passage_text.length > 100) passagesWithText++;
  });

  return { questionsWithAllChoices, questionsWithStems, passagesWithText };
}

// Run the accurate extraction
performAccurateExtraction().catch(console.error);