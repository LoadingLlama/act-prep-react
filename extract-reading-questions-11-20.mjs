#!/usr/bin/env node

/**
 * EXTRACT READING QUESTIONS 11-20 - PRACTICE ACT 3
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

console.log('📝 EXTRACTING READING QUESTIONS 11-20 - PRACTICE ACT 3');
console.log('Continuing Reading section manual extraction with 100% accuracy');
console.log('=' .repeat(80));

// Reading Questions 11-20 - Manually extracted from Practice ACT 3
const READING_QUESTIONS_11_20 = [
  {
    question_number: 11,
    question_stem: "The passage can best be described as an:",
    choice_a: "evaluation of Hall and his company's effects on the world economy.",
    choice_b: "assessment of major discoveries in chemistry during the nineteenth century.",
    choice_c: "overview of how the perception of aluminum's value changed and Hall's role in that change.",
    choice_d: "argument that aluminum should still be considered a precious metal due to its value to manufacturers.",
    correct_answer: "C",
    question_type: "social-science",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 11 - passage description"
  },
  {
    question_number: 12,
    question_stem: "Based on the passage, the author would most likely agree with which of the following statements?",
    choice_a: "It is unclear why aluminum was originally classified as being similar to metals like silver and platinum.",
    choice_b: "It is uncertain whether mineralogists or chemists were ultimately more responsible for the widespread use of aluminum.",
    choice_c: "There is no clear evidence for why aluminum's price dropped substantially years before Hall began experimenting with the metal.",
    choice_d: "It is difficult to definitively judge whether aluminum's status was bettered or worsened by the attention it received in the 1800s.",
    correct_answer: "D",
    question_type: "social-science",
    question_category: "KID",
    difficulty_level: "hard",
    notes: "Practice ACT 3 Reading Question 12 - author's perspective"
  },
  {
    question_number: 13,
    question_stem: "In the context of the passage, what does the author most nearly mean when he says that \"an American chemist ruined everything\" (lines 33-34)?",
    choice_a: "Hall was the first to discover how to extract pure aluminum from the earth's crust.",
    choice_b: "Hall made aluminum commercially available to manufacturers for a very high price.",
    choice_c: "Hall's work with aluminum quickly stripped it of its status as a rare and precious metal.",
    choice_d: "Hall founded his company in the United States long before other countries had the tools to produce aluminum.",
    correct_answer: "C",
    question_type: "social-science",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 13 - meaning in context"
  },
  {
    question_number: 14,
    question_stem: "In the passage, which of the following individuals or groups is presented as believing in Jewett's \"aluminium El Dorado\" (line 41)?",
    choice_a: "Most students at Oberlin",
    choice_b: "Manufacturers in France",
    choice_c: "Héroult",
    choice_d: "Hall",
    correct_answer: "D",
    question_type: "social-science",
    question_category: "KID",
    difficulty_level: "easy",
    notes: "Practice ACT 3 Reading Question 14 - explicit information"
  },
  {
    question_number: 15,
    question_stem: "The main point of the fourth paragraph (lines 45-60) is that:",
    choice_a: "Hall failed for years in his experimentation with aluminum.",
    choice_b: "Hall found an ideal solution to a confounding scientific problem.",
    choice_c: "Jewett's experiments with electricity led to a major scientific discovery.",
    choice_d: "despite its success in the lab, Hall's breakthrough wasn't initially practical on an industrial level.",
    correct_answer: "B",
    question_type: "social-science",
    question_category: "KID",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 15 - main point of paragraph"
  },
  {
    question_number: 16,
    question_stem: "The passage indicates that Hall moved quickly to found Alcoa because:",
    choice_a: "other scientists' work was rapidly beginning to rival his own.",
    choice_b: "he much preferred developing a business to studying chemistry.",
    choice_c: "his professors were pressuring him to begin producing aluminum commercially.",
    choice_d: "he wanted to distance himself from Héroult, who tried to take credit for Hall's discovery.",
    correct_answer: "A",
    question_type: "social-science",
    question_category: "KID",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 16 - cause and effect"
  },
  {
    question_number: 17,
    question_stem: "The author most likely includes the information about Napoleon III primarily to:",
    choice_a: "illustrate how commonplace gold had become by the 1880s.",
    choice_b: "highlight the extravagant wealth of the French royalty.",
    choice_c: "emphasize just how highly esteemed aluminum once was.",
    choice_d: "suggest that the nineteenth-century fascination with aluminum was felt primarily by the French.",
    correct_answer: "C",
    question_type: "social-science",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 17 - author's purpose"
  },
  {
    question_number: 18,
    question_stem: "According to the passage, the Washington Monument was capped with a pyramid of aluminum because:",
    choice_a: "the pyramid's high cost was meant to symbolize the overall value of the monument to the United States.",
    choice_b: "aluminum was a commonly used building material at the time the monument was erected.",
    choice_c: "US engineers wanted to outdo the lavish displays of wealth put on by French royalty.",
    choice_d: "the US government wanted to flaunt the United States' industrial might.",
    correct_answer: "D",
    question_type: "social-science",
    question_category: "KID",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 18 - explicit information"
  },
  {
    question_number: 19,
    question_stem: "The passage indicates that before Hall's discovery, manufacturers were interested in using aluminum in part because of the metal's:",
    choice_a: "strength.",
    choice_b: "popularity.",
    choice_c: "purity.",
    choice_d: "cheapness.",
    correct_answer: "A",
    question_type: "social-science",
    question_category: "KID",
    difficulty_level: "easy",
    notes: "Practice ACT 3 Reading Question 19 - explicit information"
  },
  {
    question_number: 20,
    question_stem: "The author most likely uses the word \"stumbled\" (line 62) to suggest that:",
    choice_a: "the mistakes Hall made in his initial experiments were later remedied by Héroult.",
    choice_b: "Héroult's discovery may have been more accidental than intentional.",
    choice_c: "the problems Hall faced during his experiments were not experienced by Héroult.",
    choice_d: "Héroult was the first to discover an entirely new process for obtaining aluminum.",
    correct_answer: "B",
    question_type: "social-science",
    question_category: "CS",
    difficulty_level: "medium",
    notes: "Practice ACT 3 Reading Question 20 - word choice analysis"
  }
];

/**
 * Upload Reading questions 11-20
 */
async function uploadReadingQuestions11_20() {
  console.log('\n📤 UPLOADING READING QUESTIONS 11-20...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of READING_QUESTIONS_11_20) {
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

  console.log(`\n✅ Reading questions 11-20 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check Reading progress after adding 11-20
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

  console.log(`\n📊 READING SECTION QUALITY AFTER Q11-20:`);
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
 * Main function for Reading questions 11-20
 */
async function extractReadingQuestions11_20() {
  console.log('\n🚀 CONTINUING READING SECTION EXTRACTION - QUESTIONS 11-20');

  console.log('\n📋 ADDING READING QUESTIONS 11-20:');
  console.log(`  Questions to Add: ${READING_QUESTIONS_11_20.length} (Questions 11-20)`);

  // Upload questions 11-20
  const uploadResults = await uploadReadingQuestions11_20();

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

// Run extraction for Reading questions 11-20
extractReadingQuestions11_20().catch(console.error);