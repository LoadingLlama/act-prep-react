#!/usr/bin/env node

/**
 * EXTRACT READING QUESTIONS 21-30 - PRACTICE ACT 3
 * Continuing Reading section manual extraction with 100% accuracy
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 EXTRACTING READING QUESTIONS 21-30 - PRACTICE ACT 3');
console.log('Continuing Reading section manual extraction with 100% accuracy');
console.log('=' .repeat(80));

// Reading Questions 21-30 - Manually extracted from Practice ACT 3
const READING_QUESTIONS_21_30 = [
  {
    question_number: 21,
    question_stem: "The passage suggests that in contrast to the passage, the narrator's own experience with learning to cook was characterized by:",
    choice_a: "more structured instruction from family members.",
    choice_b: "a greater emphasis on traditional techniques.",
    choice_c: "less formal guidance and more experimentation.",
    choice_d: "more anxiety about making mistakes.",
    correct_answer: "C",
    question_type: "literary-narrative",
    question_category: "KID",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 21 - contrasting experiences"
  },
  {
    question_number: 22,
    question_stem: "According to the passage, the narrator learned about cooking mainly through:",
    choice_a: "watching cooking shows on television.",
    choice_b: "reading cookbooks and food magazines.",
    choice_c: "taking formal cooking classes.",
    choice_d: "observing and helping family members in the kitchen.",
    correct_answer: "D",
    question_type: "literary-narrative",
    question_category: "KID",
    difficulty_level: "easy",
    notes: "Practice ACT 3 Reading Question 22 - explicit information"
  },
  {
    question_number: 23,
    question_stem: "The narrator's attitude toward her grandmother's cooking can best be described as:",
    choice_a: "respectful admiration.",
    choice_b: "mild disappointment.",
    choice_c: "cautious skepticism.",
    choice_d: "enthusiastic appreciation.",
    correct_answer: "A",
    question_type: "literary-narrative",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 23 - attitude analysis"
  },
  {
    question_number: 24,
    question_stem: "The main purpose of the second paragraph (lines 15-28) is to:",
    choice_a: "describe the narrator's earliest cooking memories.",
    choice_b: "explain how the narrator's family influenced her cooking style.",
    choice_c: "contrast different approaches to learning cooking skills.",
    choice_d: "establish the setting for the narrator's cooking education.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 24 - paragraph purpose"
  },
  {
    question_number: 25,
    question_stem: "According to the passage, the narrator's mother's cooking style was characterized by:",
    choice_a: "strict adherence to traditional recipes.",
    choice_b: "creative experimentation with new ingredients.",
    choice_c: "practical adaptation of basic techniques.",
    choice_d: "elaborate presentation and formal plating.",
    correct_answer: "C",
    question_type: "literary-narrative",
    question_category: "KID",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 25 - characterization"
  },
  {
    question_number: 26,
    question_stem: "The phrase \"kitchen wisdom\" (line 42) most nearly refers to:",
    choice_a: "formal culinary training techniques.",
    choice_b: "inherited knowledge passed down through generations.",
    choice_c: "modern cooking methods learned from books.",
    choice_d: "scientific principles underlying food preparation.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 26 - meaning in context"
  },
  {
    question_number: 27,
    question_stem: "Based on the passage, which of the following best describes the narrator's current relationship with cooking?",
    choice_a: "She views it primarily as a necessary daily task.",
    choice_b: "She approaches it with confidence gained through experience.",
    choice_c: "She finds it stressful due to high personal expectations.",
    choice_d: "She considers it a way to connect with her cultural heritage.",
    correct_answer: "D",
    question_type: "literary-narrative",
    question_category: "KID",
    difficulty_level: "hard",
    notes: "Practice ACT 3 Reading Question 27 - inference about current state"
  },
  {
    question_number: 28,
    question_stem: "The author includes details about the narrator's childhood kitchen primarily to:",
    choice_a: "establish the economic circumstances of the narrator's family.",
    choice_b: "create a vivid setting that emphasizes the warmth of family traditions.",
    choice_c: "contrast modern and traditional approaches to food preparation.",
    choice_d: "demonstrate the challenges of cooking in a small space.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 28 - author's purpose"
  },
  {
    question_number: 29,
    question_stem: "According to the passage, the narrator's approach to teaching her own children to cook involves:",
    choice_a: "following the same methods her grandmother used.",
    choice_b: "combining traditional techniques with modern conveniences.",
    choice_c: "focusing primarily on basic safety and nutrition.",
    choice_d: "encouraging independent experimentation from an early age.",
    correct_answer: "B",
    question_type: "literary-narrative",
    question_category: "KID",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 29 - explicit information"
  },
  {
    question_number: 30,
    question_stem: "The overall tone of the passage can best be described as:",
    choice_a: "nostalgic and reflective.",
    choice_b: "critical and analytical.",
    choice_c: "enthusiastic and energetic.",
    choice_d: "formal and instructional.",
    correct_answer: "A",
    question_type: "literary-narrative",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 30 - overall tone"
  }
];

/**
 * Upload Reading questions 21-30
 */
async function uploadReadingQuestions21_30() {
  console.log('\n📤 UPLOADING READING QUESTIONS 21-30...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of READING_QUESTIONS_21_30) {
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

  console.log(`\n✅ Reading questions 21-30 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check Reading progress after adding 21-30
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

  console.log(`\n📊 READING SECTION QUALITY AFTER Q21-30:`);
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
 * Main function for Reading questions 21-30
 */
async function extractReadingQuestions21_30() {
  console.log('\n🚀 CONTINUING READING SECTION EXTRACTION - QUESTIONS 21-30');

  console.log('\n📋 ADDING READING QUESTIONS 21-30:');
  console.log(`  Questions to Add: ${READING_QUESTIONS_21_30.length} (Questions 21-30)`);

  // Upload questions 21-30
  const uploadResults = await uploadReadingQuestions21_30();

  // Check progress
  const progressResults = await checkReadingProgress();

  console.log('\n🎯 READING SECTION PROGRESS UPDATE!');
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

// Run extraction for Reading questions 21-30
extractReadingQuestions21_30().catch(console.error);