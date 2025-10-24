#!/usr/bin/env node

/**
 * EXTRACT READING QUESTIONS 1-10 - PRACTICE ACT 3
 * Starting Reading section manual extraction with 100% accuracy
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 EXTRACTING READING QUESTIONS 1-10 - PRACTICE ACT 3');
console.log('Starting Reading section manual extraction with 100% accuracy');
console.log('=' .repeat(80));

// Reading Questions 1-10 - Manually extracted from Practice ACT 3
const READING_QUESTIONS_1_10 = [
  {
    question_number: 1,
    question_stem: "As presented in the passage, Capote's and Cruz's attitudes toward the condition of their apartments can best be described as:",
    choice_a: "similar; they were both disappointed in their old, shabby apartments.",
    choice_b: "similar; the apartments' defects didn't keep them from appreciating their apartments.",
    choice_c: "different; Capote was disappointed in his apartment's shabbiness, whereas Cruz felt at home despite her apartment's defects.",
    choice_d: "different; Capote felt at home despite his apartment's defects, whereas Cruz was disappointed in her apartment's shabbiness.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "KID",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 1 - comparing attitudes"
  },
  {
    question_number: 2,
    passage_number: 1,
    question_stem: "Details in the passage indicate that, compared to Cruz's first apartment, Capote's first apartment:",
    choice_a: "was somewhat larger.",
    choice_b: "had less natural light.",
    choice_c: "was in a different city.",
    choice_d: "had a clearer view.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "key-ideas-and-details",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 2 - comparing details"
  },
  {
    question_number: 3,
    passage_number: 1,
    question_stem: "According to the passage, acquiring an apartment in New York has become more daunting because:",
    choice_a: "there are fewer apartments in the city.",
    choice_b: "it has become a transforming rite of passage.",
    choice_c: "more people are moving to the city.",
    choice_d: "apartments have become more expensive.",
    correct_answer: "D",
    question_type: "literary-narrative",
    question_category: "key-ideas-and-details",
    difficulty_level: "easy",
    notes: "Practice ACT 3 Reading Question 3 - explicit information"
  },
  {
    question_number: 4,
    passage_number: 1,
    question_stem: "The main idea of the ninth paragraph (lines 62-72) is that Cruz's apartment was:",
    choice_a: "too small and cluttered to hold all the people who wanted to stay there.",
    choice_b: "a hospitable, welcoming place despite its clutter and small size.",
    choice_c: "decorated with posters and pictures brought by Cruz's many visitors.",
    choice_d: "much like an office building, with people hurriedly coming and going.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "key-ideas-and-details",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 4 - main idea of paragraph"
  },
  {
    question_number: 5,
    passage_number: 1,
    question_stem: "The main function of the tenth paragraph (lines 73-82) is to:",
    choice_a: "analyze the relationship Cruz had with her grandmother.",
    choice_b: "explain how world travel and music influenced Cruz's writing.",
    choice_c: "depict the sights and sounds Cruz encountered while at her desk.",
    choice_d: "reveal Cruz's frustration with the cluttered, noisy apartment complex.",
    correct_answer: "C",
    question_type: "literary-narrative",
    question_category: "craft-and-structure",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 5 - paragraph function"
  },
  {
    question_number: 6,
    passage_number: 1,
    question_stem: "Which of the following statements best captures Cruz's revelation as it is presented in lines 86-92?",
    choice_a: "For Cruz, a quiet, solitary place to write wasn't available and may not have been helpful.",
    choice_b: "Cruz was opposed to the idea that a room full of people is more inspiring than a quiet one.",
    choice_c: "For Cruz, writing came most easily during quiet moments.",
    choice_d: "Cruz needed to make the most of the few quiet moments she could find.",
    correct_answer: "A",
    question_type: "literary-narrative",
    question_category: "key-ideas-and-details",
    difficulty_level: "hard",
    notes: "Practice ACT 3 Reading Question 6 - understanding revelation"
  },
  {
    question_number: 7,
    passage_number: 1,
    question_stem: "According to the passage, without her family members, Cruz wouldn't have:",
    choice_a: "obtained a college degree.",
    choice_b: "felt confident about her career choice.",
    choice_c: "been able to pay rent for her apartment.",
    choice_d: "continued her freelance teaching jobs.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "key-ideas-and-details",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 7 - explicit information"
  },
  {
    question_number: 8,
    passage_number: 1,
    question_stem: "According to Cruz, she returned to the city to:",
    choice_a: "be near family.",
    choice_b: "find an apartment.",
    choice_c: "finish her second novel.",
    choice_d: "study creative writing.",
    correct_answer: "D",
    question_type: "literary-narrative",
    question_category: "key-ideas-and-details",
    difficulty_level: "easy",
    notes: "Practice ACT 3 Reading Question 8 - explicit information"
  },
  {
    question_number: 9,
    passage_number: 1,
    question_stem: "The primary writing mode of Cruz's essay is:",
    choice_a: "descriptive; Cruz uses imagery and specific details to portray her surroundings.",
    choice_b: "narrative; Cruz recounts the main events of her writing career.",
    choice_c: "persuasive; Cruz uses events from her life to argue that family support systems are crucial.",
    choice_d: "expository; Cruz explains how to thrive in a flawed apartment.",
    correct_answer: "A",
    question_type: "literary-narrative",
    question_category: "craft-and-structure",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 9 - writing mode"
  },
  {
    question_number: 10,
    passage_number: 1,
    question_stem: "Based on the passage, Cruz considered the rent she paid for her apartment to be:",
    choice_a: "lower than that of similar apartments.",
    choice_b: "too high for a one-bedroom in a prewar building.",
    choice_c: "more than she had expected to pay.",
    choice_d: "less than she had paid in the past.",
    correct_answer: "A",
    question_type: "literary-narrative",
    question_category: "key-ideas-and-details",
    difficulty_level: "easy",
    notes: "Practice ACT 3 Reading Question 10 - inference from text"
  }
];

/**
 * Upload Reading questions 1-10
 */
async function uploadReadingQuestions1_10() {
  console.log('\n📤 UPLOADING READING QUESTIONS 1-10...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of READING_QUESTIONS_1_10) {
    try {
      const questionData = {
        test_number: 3,
        lesson_id: null,
        passage_id: null, // Will be linked after passages are uploaded
        ...question
      };

      const { error } = await supabase
        .from('act_reading_questions')
        .upsert([questionData]);

      if (error) {
        errors.push(`Reading Question ${question.question_number}: ${error.message}`);
      } else {
        totalUploaded++;
        console.log(`  ✅ Uploaded Reading question ${question.question_number}`);
        console.log(`     Stem: ${question.question_stem.substring(0, 50)}...`);
        console.log(`     Answer: ${question.correct_answer}`);
      }
    } catch (err) {
      errors.push(`Reading Question ${question.question_number}: ${err.message}`);
    }
  }

  console.log(`\n✅ Reading questions 1-10 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check Reading progress after adding 1-10
 */
async function checkReadingProgress() {
  console.log('\n📊 CHECKING READING SECTION PROGRESS...');

  // Check total questions
  const { data: questions } = await supabase
    .from('act_reading_questions')
    .select('question_number, correct_answer, choice_a, choice_b, choice_c, choice_d')
    .eq('test_number', 3)
    .order('question_number');

  console.log(`❓ Total Reading Questions: ${questions?.length || 0}`);

  let questionsWithAllChoices = 0;
  let questionsWithAnswers = 0;

  questions?.forEach(q => {
    const hasAllChoices = q.choice_a && q.choice_b && q.choice_c && q.choice_d;
    if (hasAllChoices) questionsWithAllChoices++;
    if (q.correct_answer) questionsWithAnswers++;
  });

  console.log(`\n📊 READING SECTION QUALITY:`);
  console.log(`  Questions with all choices: ${questionsWithAllChoices}/${questions?.length || 0}`);
  console.log(`  Questions with answers: ${questionsWithAnswers}/${questions?.length || 0}`);
  console.log(`  Progress: ${questions?.length || 0}/40 questions (${Math.round(((questions?.length || 0) / 40) * 100)}%)`);

  return {
    totalQuestions: questions?.length || 0,
    questionsWithAllChoices,
    questionsWithAnswers,
    progressPercentage: Math.round(((questions?.length || 0) / 40) * 100)
  };
}

/**
 * Main function for Reading questions 1-10
 */
async function extractReadingQuestions1_10() {
  console.log('\n🚀 STARTING READING SECTION EXTRACTION - QUESTIONS 1-10');

  console.log('\n📋 ADDING READING QUESTIONS 1-10:');
  console.log(`  Questions to Add: ${READING_QUESTIONS_1_10.length} (Questions 1-10)`);

  // Upload questions 1-10
  const uploadResults = await uploadReadingQuestions1_10();

  // Check progress
  const progressResults = await checkReadingProgress();

  console.log('\n🎯 READING SECTION EXTRACTION STARTED!');
  console.log(`✅ Questions Added: ${uploadResults.totalUploaded}`);
  console.log(`✅ Total Progress: ${progressResults.totalQuestions}/40 questions (${progressResults.progressPercentage}%)`);
  console.log(`✅ Quality: ${progressResults.questionsWithAllChoices}/${progressResults.totalQuestions} questions have all choices`);

  console.log('\n📋 NEXT STEPS:');
  console.log(`1. Continue extracting remaining ${40 - progressResults.totalQuestions} Reading questions`);
  console.log('2. Extract all 4 Reading passages');
  console.log('3. Move to Science section once Reading is complete');

  return {
    success: true,
    uploadResults,
    progressResults,
    remainingQuestions: 40 - progressResults.totalQuestions
  };
}

// Run extraction for Reading questions 1-10
extractReadingQuestions1_10().catch(console.error);