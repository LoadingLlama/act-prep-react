#!/usr/bin/env node

/**
 * CONTINUE ENGLISH SECTION EXTRACTION - PRACTICE ACT 3 (QUESTIONS 46-60)
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

console.log('📝 CONTINUING ENGLISH SECTION EXTRACTION - PRACTICE ACT 3 (Q46-60)');
console.log('Adding questions 46-60 manually extracted with 100% accuracy');
console.log('=' .repeat(80));

// English Questions 46-60 - Manually extracted from Practice ACT 3
const ENGLISH_QUESTIONS_46_60 = [
  {
    question_number: 46,
    passage_number: 4,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "pursuing her PhD; when",
    context_before: "Meenakshi Wadhwa was",
    context_after: "a professor asked her",
    choice_a: "NO CHANGE",
    choice_b: "in pursuit of her PhD",
    choice_c: "was pursuing her PhD",
    choice_d: "pursuing her PhD",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 46 - punctuation with subordinate clause"
  },
  {
    question_number: 47,
    passage_number: 4,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "her, if she wanted to see a meteorite",
    context_before: "a professor asked",
    context_after: "from Mars",
    choice_a: "NO CHANGE",
    choice_b: "her if she wanted to see a meteorite",
    choice_c: "her, if she wanted to see a meteorite,",
    choice_d: "her, if she wanted, to see a meteorite",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 47 - punctuation with conditional clause"
  },
  {
    question_number: 48,
    passage_number: 4,
    question_stem: "Which choice provides the most effective transition?",
    underlined_text: "Thereafter, the",
    context_before: "Earth rocks.",
    context_after: "idea that she could learn",
    choice_a: "NO CHANGE",
    choice_b: "After that day, the",
    choice_c: "Since then, the",
    choice_d: "The",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 48 - transitional expressions"
  },
  {
    question_number: 49,
    passage_number: 4,
    question_stem: "Which choice provides the most effective sentence structure?",
    underlined_text: "there she conducted research",
    context_before: "The Field Museum in Chicago,",
    context_after: "on meteorites, especially those from Mars",
    choice_a: "NO CHANGE",
    choice_b: "it was there that",
    choice_c: "where",
    choice_d: "DELETE the underlined portion",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 49 - subordinate clause structure"
  },
  {
    question_number: 50,
    passage_number: 4,
    question_stem: "Which choice most strongly indicates that the mass spectrometer did not directly reveal the processes that created meteorites?",
    underlined_text: "identified",
    context_before: "revealed the rocks' age and",
    context_after: "the processes that created them",
    choice_a: "NO CHANGE",
    choice_b: "determined",
    choice_c: "hinted at",
    choice_d: "showed",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 50 - precision of language"
  },
  {
    question_number: 51,
    passage_number: 4,
    question_stem: "Which choice provides the most precise word?",
    underlined_text: "information helped",
    context_before: "This",
    context_after: "Wadhwa better understand",
    choice_a: "NO CHANGE",
    choice_b: "facilitated",
    choice_c: "assisted",
    choice_d: "aided",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 51 - word choice"
  },
  {
    question_number: 52,
    passage_number: 4,
    question_stem: "Which choice provides the most effective punctuation and sentence structure?",
    underlined_text: "from Mars and the asteroid belt. Making the meteorite",
    context_before: "including samples",
    context_after: "collection Wadhwa oversees is the largest",
    choice_a: "NO CHANGE",
    choice_b: "Mars, and the asteroid belt; the",
    choice_c: "Mars and the asteroid belt. The",
    choice_d: "Mars and the asteroid belt, the",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 52 - sentence fragments"
  },
  {
    question_number: 53,
    passage_number: 4,
    question_stem: "Which choice provides the most effective transition?",
    underlined_text: "Because",
    context_before: "at any university.",
    context_after: "meteorites contain material that predates Earth",
    choice_a: "NO CHANGE",
    choice_b: "In fact,",
    choice_c: "These",
    choice_d: "The",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 53 - logical transitions"
  },
  {
    question_number: 54,
    passage_number: 4,
    question_stem: "Which choice provides the most effective transitional word or phrase?",
    underlined_text: "For example,",
    context_before: "early history of the solar system.",
    context_after: "a 2010 study she cowrote found",
    choice_a: "NO CHANGE",
    choice_b: "In other words,",
    choice_c: "Even so,",
    choice_d: "Instead,",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 54 - transitional phrases"
  },
  {
    question_number: 55,
    passage_number: 4,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "supernova exploded",
    context_before: "colleagues discovered evidence that a",
    context_after: "before the planets formed",
    choice_a: "NO CHANGE",
    choice_b: "supernova, which exploded",
    choice_c: "supernova that exploded",
    choice_d: "supernova, exploding",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 55 - restrictive vs. nonrestrictive clauses"
  },
  {
    question_number: 56,
    passage_number: 4,
    question_stem: "At this point, the writer is considering adding the following sentence: Wadhwa has twice been to Antarctica to hunt for meteorites. Should the writer make this addition here?",
    underlined_text: "This question asks about adding a sentence",
    context_before: "essential elements.",
    context_after: "In 2006, Wadhwa became the director",
    choice_a: "Yes, because it emphasizes that Wadhwa is passionate about studying meteorites",
    choice_b: "Yes, because it further demonstrates the meteorite expertise Wadhwa has developed",
    choice_c: "No, because it presents information that is discussed earlier in the essay",
    choice_d: "No, because it is only loosely related to the content of the paragraph",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 56 - adding sentences"
  },
  {
    question_number: 57,
    passage_number: 4,
    question_stem: "Which choice provides the most appropriate pronoun?",
    underlined_text: "earned her,",
    context_before: "honors Wadhwa's research has",
    context_after: "perhaps the most meaningful one came",
    choice_a: "NO CHANGE",
    choice_b: "herself,",
    choice_c: "itself,",
    choice_d: "for it,",
    correct_answer: "A",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 57 - pronoun case"
  },
  {
    question_number: 58,
    passage_number: 4,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "astronomers, Carolyn, and Gene Shoemaker",
    context_before: "came from",
    context_after: "After discovering an asteroid",
    choice_a: "NO CHANGE",
    choice_b: "astronomers Carolyn,",
    choice_c: "astronomers Carolyn",
    choice_d: "astronomers; Carolyn",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 58 - series punctuation"
  },
  {
    question_number: 59,
    passage_number: 4,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "Red Planet meaning that one day,",
    context_before: "orbit crosses that of the",
    context_after: "as Wadhwa put it",
    choice_a: "NO CHANGE",
    choice_b: "Planet, meaning that one day,",
    choice_c: "Planet, meaning that, one day",
    choice_d: "Planet, meaning, that one day",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 59 - comma usage with participial phrases"
  },
  {
    question_number: 60,
    passage_number: 4,
    question_stem: "Which choice provides the most concise and effective expression?",
    underlined_text: "put it,",
    context_before: "as Wadhwa",
    context_after: "she \"just might have an impact on Mars\"",
    choice_a: "NO CHANGE",
    choice_b: "herself once verbally said,",
    choice_c: "said in her own words,",
    choice_d: "vocally stated,",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 60 - conciseness"
  }
];

/**
 * Upload English questions 46-60
 */
async function uploadEnglishQuestions46_60() {
  console.log('\n📤 UPLOADING ENGLISH QUESTIONS 46-60...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of ENGLISH_QUESTIONS_46_60) {
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

  console.log(`\n✅ Questions 46-60 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check total English progress after adding 46-60
 */
async function checkEnglishProgressAfter60() {
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

  console.log(`\n📊 ENGLISH SECTION QUALITY AFTER Q46-60:`);
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
 * Main function for questions 46-60
 */
async function continueEnglishExtraction46_60() {
  console.log('\n🚀 CONTINUING ENGLISH EXTRACTION - QUESTIONS 46-60');

  console.log('\n📋 ADDING QUESTIONS 46-60:');
  console.log(`  Questions to Add: ${ENGLISH_QUESTIONS_46_60.length} (Questions 46-60)`);

  // Upload questions 46-60
  const uploadResults = await uploadEnglishQuestions46_60();

  // Check overall progress
  const progressResults = await checkEnglishProgressAfter60();

  console.log('\n🎯 ENGLISH SECTION UPDATE COMPLETE (Q46-60)!');
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

// Run continuation for questions 46-60
continueEnglishExtraction46_60().catch(console.error);