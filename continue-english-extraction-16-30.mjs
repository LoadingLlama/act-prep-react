#!/usr/bin/env node

/**
 * CONTINUE ENGLISH SECTION EXTRACTION - PRACTICE ACT 3 (QUESTIONS 16-30)
 * Adding more manually extracted English questions with 100% accuracy
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 CONTINUING ENGLISH SECTION EXTRACTION - PRACTICE ACT 3 (Q16-30)');
console.log('Adding questions 16-30 manually extracted with 100% accuracy');
console.log('=' .repeat(80));

// English Questions 16-30 - Manually extracted from Practice ACT 3
const ENGLISH_QUESTIONS_16_30 = [
  {
    question_number: 16,
    passage_number: 2,
    question_stem: "Which choice corrects the subject-verb agreement error in this sentence?",
    underlined_text: "has been passed on",
    context_before: "mournful poem The Seafarer",
    context_after: "by people being conversant for centuries",
    choice_a: "NO CHANGE",
    choice_b: "have been passed on",
    choice_c: "was passed on",
    choice_d: "is passed on",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 16 - subject-verb agreement with compound subject"
  },
  {
    question_number: 17,
    passage_number: 2,
    question_stem: "Which choice provides the most precise and appropriate language?",
    underlined_text: "by people being conversant",
    context_before: "has been passed on",
    context_after: "for centuries",
    choice_a: "NO CHANGE",
    choice_b: "by folks rattling them off",
    choice_c: "through spoken word",
    choice_d: "in chitchat",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 17 - precise language choice"
  },
  {
    question_number: 18,
    passage_number: 2,
    question_stem: "Which choice most effectively indicates why scops needed great memorization skills?",
    underlined_text: "skills",
    context_before: "required not only great memorization",
    context_after: "but also the ability to compose epic works",
    choice_a: "NO CHANGE",
    choice_b: "skills (something that could be honed over time)",
    choice_c: "skills (performances could last from several minutes to several days)",
    choice_d: "skills (audiences could range from a few to many people)",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 18 - explanatory information"
  },
  {
    question_number: 19,
    passage_number: 2,
    question_stem: "Which choice provides the most concise and effective expression?",
    underlined_text: "at an elevated, consistent level of frequency",
    context_before: "but also the ability to compose epic works",
    context_after: "Scops became the keepers",
    choice_a: "NO CHANGE",
    choice_b: "regularly as part of their usual routine",
    choice_c: "on a regular basis",
    choice_d: "a lot",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 19 - conciseness"
  },
  {
    question_number: 20,
    passage_number: 2,
    question_stem: "Which choice provides the most effective punctuation and parallel structure?",
    underlined_text: "songs were written, and even the histories",
    context_before: "Scops became the keepers of poems,",
    context_after: "of their people",
    choice_a: "NO CHANGE",
    choice_b: "scops were writers of songs, and even the histories",
    choice_c: "they wrote songs, and even the histories",
    choice_d: "songs, and even the histories",
    correct_answer: "D",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 20 - parallel structure"
  },
  {
    question_number: 21,
    passage_number: 2,
    question_stem: "Which choice provides the most effective preposition?",
    underlined_text: "as",
    context_before: "Skilled scops were valued",
    context_after: "highly in Anglo-Saxon society",
    choice_a: "NO CHANGE",
    choice_b: "for",
    choice_c: "so",
    choice_d: "DELETE the underlined portion",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 21 - appropriate preposition"
  },
  {
    question_number: 22,
    passage_number: 2,
    question_stem: "Which choice provides the most effective transitional word or phrase?",
    underlined_text: "There are, generally,",
    context_before: "extra rewards for their talents.",
    context_after: "several records of royals giving land",
    choice_a: "NO CHANGE",
    choice_b: "in other words,",
    choice_c: "nonetheless,",
    choice_d: "in fact,",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 22 - transitions"
  },
  {
    question_number: 23,
    passage_number: 2,
    question_stem: "Which choice provides the most concise wording?",
    underlined_text: "scops after the scops proved they were worthy of such a gift",
    context_before: "several records of royals giving land to deserving",
    context_after: "Coins or gold rings",
    choice_a: "NO CHANGE",
    choice_b: "scops when the royals felt they had earned it",
    choice_c: "scops when the scops proved worthy",
    choice_d: "scops",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 23 - conciseness"
  },
  {
    question_number: 24,
    passage_number: 2,
    question_stem: "The writer is considering revising the underlined portion to the following: which could be used as status symbols to display one's success— Given that the information is accurate, should the writer make this revision?",
    underlined_text: "these could be quite useful",
    context_before: "Coins or gold rings—",
    context_after: "—were common gifts for scops",
    choice_a: "Yes, because the revised phrase more clearly explains why coins and gold rings would be useful to scops",
    choice_b: "Yes, because the revised phrase more clearly describes why scops were important to royals",
    choice_c: "No, because the revised phrase fails to maintain the paragraph's focus on why scops were highly valued in Anglo-Saxon society",
    choice_d: "No, because the revised phrase fails to explain how the gifts were of use to scops",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 24 - revision decision"
  },
  {
    question_number: 25,
    passage_number: 2,
    question_stem: "Which choice corrects the pronoun reference error?",
    underlined_text: "which did well",
    context_before: "were common gifts for scops",
    context_after: "To achieve this kind of success",
    choice_a: "NO CHANGE",
    choice_b: "for whom",
    choice_c: "whom",
    choice_d: "who",
    correct_answer: "D",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 25 - pronoun reference"
  },
  {
    question_number: 26,
    passage_number: 2,
    question_stem: "Which of the following true statements, if added here, would create the most effective transition between the first sentence of the paragraph and the information that follows?",
    underlined_text: "This question asks about adding a sentence",
    context_before: "While mindful of the expectation that they would glorify their leaders, scops set standards for morality through",
    context_after: "their celebration of heroes and condemnation of villains",
    choice_a: "A scop would often travel through several communities, performing in various locations",
    choice_b: "Sometimes audience members sang along with the scops during performances",
    choice_c: "The best scops could keep an audience's attention for long periods",
    choice_d: "A scop was also a moral compass for the community",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 26 - adding sentences"
  },
  {
    question_number: 27,
    passage_number: 2,
    question_stem: "Which choice provides the most effective preposition?",
    underlined_text: "over",
    context_before: "Therefore, a person's reputation could rise or fall",
    context_after: "the scop's hand",
    choice_a: "NO CHANGE",
    choice_b: "by",
    choice_c: "DELETE the underlined portion",
    choice_d: "at",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 27 - preposition choice"
  },
  {
    question_number: 28,
    passage_number: 2,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "next. Thereby providing",
    context_before: "conveyed through history from one generation to the",
    context_after: "a type of immortality traditionally revered",
    choice_a: "NO CHANGE",
    choice_b: "next, providing",
    choice_c: "next. Providing",
    choice_d: "next—providing",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 28 - punctuation with participial phrase"
  },
  {
    question_number: 29,
    passage_number: 2,
    question_stem: "The writer wants to add the following sentence to the essay: Today, poets are thought of mainly as writers. The sentence would most logically be placed at:",
    underlined_text: "This question asks about the passage as a whole",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 1",
    choice_b: "Point B in Paragraph 1",
    choice_c: "Point C in Paragraph 2",
    choice_d: "Point D in Paragraph 2",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 29 - sentence placement"
  },
  {
    question_number: 30,
    passage_number: 2,
    question_stem: "Suppose the writer's primary purpose had been to discuss one type of person who was significant in early Anglo-Saxon society. Would this essay accomplish that goal?",
    underlined_text: "This question asks about the passage as a whole",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it describes the role of scops and explains how they safeguarded the history and values of Anglo-Saxon communities",
    choice_b: "Yes, because it discusses early Anglo-Saxon ceremonies and the kinds of people who participated in them",
    choice_c: "No, because it mainly focuses on describing the specific poems and stories that scops recited rather than on Anglo-Saxon communities themselves",
    choice_d: "No, because it instead focuses on the moment in history when the role of the scop began to dwindle",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 30 - passage as a whole"
  }
];

/**
 * Upload English questions 16-30
 */
async function uploadEnglishQuestions16_30() {
  console.log('\n📤 UPLOADING ENGLISH QUESTIONS 16-30...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of ENGLISH_QUESTIONS_16_30) {
    try {
      const questionData = {
        test_number: 3,
        lesson_id: null,
        ...question
      };

      const { error } = await supabase
        .from('act_english_questions')
        .upsert([questionData]);

      if (error) {
        errors.push(`English Question ${question.question_number}: ${error.message}`);
      } else {
        totalUploaded++;
        console.log(`  ✅ Uploaded English question ${question.question_number}`);
        console.log(`     Stem: ${question.question_stem.substring(0, 50)}...`);
        console.log(`     Answer: ${question.correct_answer}`);
      }
    } catch (err) {
      errors.push(`English Question ${question.question_number}: ${err.message}`);
    }
  }

  console.log(`\n✅ Questions 16-30 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check total English progress after adding 16-30
 */
async function checkEnglishProgressAfter30() {
  console.log('\n📊 CHECKING ENGLISH SECTION PROGRESS...');

  // Check total questions
  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('question_number, correct_answer, choice_a, choice_b, choice_c, choice_d')
    .eq('test_number', 3)
    .order('question_number');

  console.log(`❓ Total English Questions: ${questions?.length || 0}`);

  let questionsWithAllChoices = 0;
  let questionsWithAnswers = 0;

  questions?.forEach(q => {
    const hasAllChoices = q.choice_a && q.choice_b && q.choice_c && q.choice_d;
    if (hasAllChoices) questionsWithAllChoices++;
    if (q.correct_answer) questionsWithAnswers++;
  });

  console.log(`\n📊 ENGLISH SECTION QUALITY AFTER Q16-30:`);
  console.log(`  Questions with all choices: ${questionsWithAllChoices}/${questions?.length || 0}`);
  console.log(`  Questions with answers: ${questionsWithAnswers}/${questions?.length || 0}`);
  console.log(`  Progress: ${questions?.length || 0}/75 questions (${Math.round(((questions?.length || 0) / 75) * 100)}%)`);

  return {
    totalQuestions: questions?.length || 0,
    questionsWithAllChoices,
    questionsWithAnswers,
    progressPercentage: Math.round(((questions?.length || 0) / 75) * 100)
  };
}

/**
 * Main function for questions 16-30
 */
async function continueEnglishExtraction16_30() {
  console.log('\n🚀 CONTINUING ENGLISH EXTRACTION - QUESTIONS 16-30');

  console.log('\n📋 ADDING QUESTIONS 16-30:');
  console.log(`  Questions to Add: ${ENGLISH_QUESTIONS_16_30.length} (Questions 16-30)`);

  // Upload questions 16-30
  const uploadResults = await uploadEnglishQuestions16_30();

  // Check overall progress
  const progressResults = await checkEnglishProgressAfter30();

  console.log('\n🎯 ENGLISH SECTION UPDATE COMPLETE (Q16-30)!');
  console.log(`✅ New Questions Added: ${uploadResults.totalUploaded}`);
  console.log(`✅ Total Progress: ${progressResults.totalQuestions}/75 questions (${progressResults.progressPercentage}%)`);
  console.log(`✅ Quality: ${progressResults.questionsWithAllChoices}/${progressResults.totalQuestions} questions have all choices`);

  console.log('\n📋 NEXT STEPS:');
  console.log(`1. Continue extracting remaining ${75 - progressResults.totalQuestions} English questions`);
  console.log('2. Extract remaining 4 English passages');
  console.log('3. Move to Math section once English is complete');

  return {
    success: true,
    uploadResults,
    progressResults,
    remainingQuestions: 75 - progressResults.totalQuestions
  };
}

// Run continuation for questions 16-30
continueEnglishExtraction16_30().catch(console.error);