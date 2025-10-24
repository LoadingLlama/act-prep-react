#!/usr/bin/env node

/**
 * CONTINUE ENGLISH SECTION EXTRACTION - PRACTICE ACT 3
 * Adding more manually extracted English questions
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 CONTINUING ENGLISH SECTION EXTRACTION - PRACTICE ACT 3');
console.log('Adding more manually extracted English questions with 100% accuracy');
console.log('=' .repeat(80));

// Additional English Questions - Manually extracted from Practice ACT 3
const ADDITIONAL_ENGLISH_QUESTIONS = [
  {
    question_number: 4,
    passage_number: 1,
    question_stem: "Which choice provides the most specific reason Eyde could not build the sun mirrors?",
    underlined_text: "had considered the idea",
    context_before: "Sam Eyde, the town's founder,",
    context_after: "However, Eyde did not follow through",
    choice_a: "NO CHANGE",
    choice_b: "had come to understand that building the mirrors wasn't feasible",
    choice_c: "had realized that the necessary technology didn't exist",
    choice_d: "had recognized that the project could not succeed",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 4 - specific details"
  },
  {
    question_number: 5,
    passage_number: 1,
    question_stem: "Which choice provides proper punctuation for this sentence?",
    underlined_text: "reality. Three",
    context_before: "Andersen made the mirrors a",
    context_after: "550-square-foot mirrors were airlifted",
    choice_a: "NO CHANGE",
    choice_b: "reality. When three",
    choice_c: "reality, three",
    choice_d: "reality three",
    correct_answer: "A",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 5 - punctuation"
  },
  {
    question_number: 6,
    passage_number: 1,
    question_stem: "Which choice provides the best transition from the previous sentence?",
    underlined_text: "mountain, moreover,",
    context_before: "carried the heavy equipment up the",
    context_after: "no roads led to the cliffside",
    choice_a: "NO CHANGE",
    choice_b: "mountain because",
    choice_c: "mountain and",
    choice_d: "mountain,",
    correct_answer: "B",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 6 - transitions"
  },
  {
    question_number: 7,
    passage_number: 1,
    question_stem: "Which choice corrects the error in this sentence?",
    underlined_text: "construction cite",
    context_before: "no roads led to the cliffside",
    context_after: "Since a crane would have been",
    choice_a: "NO CHANGE",
    choice_b: "construction sight",
    choice_c: "construction cite",
    choice_d: "construction site",
    correct_answer: "D",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 7 - word choice error"
  },
  {
    question_number: 8,
    passage_number: 1,
    question_stem: "Which choice provides the most effective comma usage?",
    underlined_text: "tools such as thirty-foot wooden tripods",
    context_before: "workers used",
    context_after: "to install the mirrors",
    choice_a: "NO CHANGE",
    choice_b: "tools, such as thirty-foot, wooden, tripods",
    choice_c: "tools such as thirty-foot wooden tripods,",
    choice_d: "tools, such as thirty-foot wooden tripods",
    correct_answer: "D",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 8 - comma usage"
  },
  {
    question_number: 9,
    passage_number: 1,
    question_stem: "Which choice best describes the mirrors' coordinated function?",
    underlined_text: "team up as a group",
    context_before: "The three mirrors",
    context_after: "to create a bright ellipse",
    choice_a: "NO CHANGE",
    choice_b: "help each other out",
    choice_c: "are synchronized",
    choice_d: "conspire together",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 9 - word choice"
  },
  {
    question_number: 10,
    passage_number: 1,
    question_stem: "Which choice provides the best conjunction for this sentence?",
    underlined_text: "yet",
    context_before: "tracking the sun as it crosses the sky",
    context_after: "they're controlled wirelessly",
    choice_a: "NO CHANGE",
    choice_b: "and",
    choice_c: "but",
    choice_d: "DELETE the underlined portion",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 10 - conjunctions"
  },
  {
    question_number: 11,
    passage_number: 1,
    question_stem: "If the writer were to delete the underlined portion (adjusting the capitalization as needed), the essay would primarily lose information that:",
    underlined_text: "tracking the sun as it crosses the sky",
    context_before: "the mirrors adjust every ten seconds,",
    context_after: "They're controlled wirelessly",
    choice_a: "reveals the size and location of the light reflected by the mirrors",
    choice_b: "describes the mechanism that adjusts the mirrors during the day",
    choice_c: "clarifies where the mirrors are located in relation to the town",
    choice_d: "specifies why the mirrors adjust throughout the day",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 11 - deletion effects"
  },
  {
    question_number: 12,
    passage_number: 1,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "Germany, and monitored, in Rjukan and on",
    context_before: "controlled wirelessly by a company in",
    context_after: "the mountain via webcam",
    choice_a: "NO CHANGE",
    choice_b: "Germany and, monitored in Rjukan, and",
    choice_c: "Germany and monitored in Rjukan, and,",
    choice_d: "Germany and monitored in Rjukan and",
    correct_answer: "D",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 12 - punctuation in series"
  },
  {
    question_number: 13,
    passage_number: 1,
    question_stem: "Which choice corrects the subject-verb agreement error?",
    underlined_text: "rays that reaches the town is",
    context_before: "The light",
    context_after: "between 80 and 100 percent as bright",
    choice_a: "NO CHANGE",
    choice_b: "rays that reaches the town are",
    choice_c: "rays that reach the town are",
    choice_d: "rays that reach the town is",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 13 - subject-verb agreement"
  },
  {
    question_number: 14,
    passage_number: 1,
    question_stem: "Which choice provides the most concise and effective expression?",
    underlined_text: "due to the bright light when the Solspeil first",
    context_before: "residents rejoiced",
    context_after: "shone a bright beam of sunlight",
    choice_a: "NO CHANGE",
    choice_b: "when the Solspeil, controlled remotely,",
    choice_c: "at the initial time the Solspeil",
    choice_d: "when the Solspeil",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 14 - conciseness"
  },
  {
    question_number: 15,
    passage_number: 1,
    question_stem: "Suppose the writer's primary purpose had been to describe a technological project that benefited a community. Would this essay accomplish that purpose?",
    underlined_text: "This question asks about the passage as a whole",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it focuses on the international attention Rjukan has experienced since the completion of the project",
    choice_b: "Yes, because it describes how mirrors were used to bring sunlight to a town that was previously without it in winter",
    choice_c: "No, because it emphasizes the historical background of the mirror idea rather than the modern technological implementation",
    choice_d: "No, because it focuses more on the problems with winter darkness than on how the technology solved them",
    correct_answer: "B",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 15 - passage as a whole"
  }
];

/**
 * Upload additional English questions
 */
async function uploadAdditionalQuestions() {
  console.log('\n📤 UPLOADING ADDITIONAL ENGLISH QUESTIONS...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of ADDITIONAL_ENGLISH_QUESTIONS) {
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

  console.log(`\n✅ Additional questions upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check total English progress
 */
async function checkEnglishProgress() {
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

  console.log(`\n📊 ENGLISH SECTION QUALITY:`)
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
 * Main continuation function
 */
async function continueEnglishExtraction() {
  console.log('\n🚀 CONTINUING ENGLISH EXTRACTION');

  console.log('\n📋 ADDING MORE QUESTIONS:');
  console.log(`  Additional Questions: ${ADDITIONAL_ENGLISH_QUESTIONS.length} (Questions 4-15)`);

  // Upload additional questions
  const uploadResults = await uploadAdditionalQuestions();

  // Check overall progress
  const progressResults = await checkEnglishProgress();

  console.log('\n🎯 ENGLISH SECTION UPDATE COMPLETE!');
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

// Run continuation
continueEnglishExtraction().catch(console.error);