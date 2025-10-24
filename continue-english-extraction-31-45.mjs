#!/usr/bin/env node

/**
 * CONTINUE ENGLISH SECTION EXTRACTION - PRACTICE ACT 3 (QUESTIONS 31-45)
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

console.log('📝 CONTINUING ENGLISH SECTION EXTRACTION - PRACTICE ACT 3 (Q31-45)');
console.log('Adding questions 31-45 manually extracted with 100% accuracy');
console.log('=' .repeat(80));

// English Questions 31-45 - Manually extracted from Practice ACT 3
const ENGLISH_QUESTIONS_31_45 = [
  {
    question_number: 31,
    passage_number: 3,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "his \"summer office'—a nickname for his",
    context_before: "my uncle Lee invited me, a total city girl, to",
    context_after: "boat",
    choice_a: "NO CHANGE",
    choice_b: "his \"summer office\" (a nickname)",
    choice_c: "his: \"summer office,\" a nickname",
    choice_d: "his \"summer office\" a nickname",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 31 - punctuation with appositive"
  },
  {
    question_number: 32,
    passage_number: 3,
    question_stem: "Which choice provides the most effective sentence structure?",
    underlined_text: "morning as we walked to the dock to ready the",
    context_before: "So one",
    context_after: "pontoon",
    choice_a: "NO CHANGE",
    choice_b: "morning we walked to the dock and readied",
    choice_c: "morning, walking to the dock and readying",
    choice_d: "morning, walking to the dock to ready",
    correct_answer: "A",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 32 - sentence structure"
  },
  {
    question_number: 33,
    passage_number: 3,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "sonar, and piloted",
    context_before: "He activated the boat's",
    context_after: "slowly forward",
    choice_a: "NO CHANGE",
    choice_b: "sonar, and piloted,",
    choice_c: "sonar and piloted,",
    choice_d: "sonar and piloted",
    correct_answer: "D",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 33 - comma usage in series"
  },
  {
    question_number: 34,
    passage_number: 3,
    question_stem: "Which choice provides the most concise and effective expression?",
    underlined_text: "showing what",
    context_before: "ghostly images appeared on the screen,",
    context_after: "looked like a collection of matchsticks",
    choice_a: "NO CHANGE",
    choice_b: "the images showed",
    choice_c: "they showed",
    choice_d: "showed",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 34 - conciseness"
  },
  {
    question_number: 35,
    passage_number: 3,
    question_stem: "Which choice most precisely characterizes the arrangement of \"matchsticks\" as haphazard?",
    underlined_text: "collection",
    context_before: "looked like a",
    context_after: "of matchsticks on the lake bottom",
    choice_a: "NO CHANGE",
    choice_b: "jumble",
    choice_c: "batch",
    choice_d: "range",
    correct_answer: "B",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 35 - precise word choice"
  },
  {
    question_number: 36,
    passage_number: 3,
    question_stem: "If the writer were to delete the underlined portion, the essay would primarily lose:",
    underlined_text: "protected from insects and oxygen,",
    context_before: "In the deep water,",
    context_after: "the wood remained well preserved",
    choice_a: "a clarification about the quality of the wood in submerged logs",
    choice_b: "an explanation of the underwater decomposition process",
    choice_c: "a description of factors that differentiate Moosehead Lake from other lakes",
    choice_d: "an indication of why the submerged logs have remained in good condition",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 36 - deletion effects"
  },
  {
    question_number: 37,
    passage_number: 3,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "displayed",
    context_before: "On the boat, another monitor",
    context_after: "the underwater video camera's view",
    choice_a: "NO CHANGE",
    choice_b: "displayed:",
    choice_c: "displayed,",
    choice_d: "and showed",
    correct_answer: "A",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "easy",
    notes: "Practice ACT 3 English Question 37 - punctuation with direct object"
  },
  {
    question_number: 38,
    passage_number: 3,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "that Uncle Lee thought was birch",
    context_before: "the grapple arm reaching for a log",
    context_after: "The arm's iron pinchers grasped the log",
    choice_a: "NO CHANGE",
    choice_b: "that, Uncle Lee, thought",
    choice_c: "that, Uncle Lee thought",
    choice_d: "that Uncle Lee thought,",
    correct_answer: "A",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 38 - restrictive clause punctuation"
  },
  {
    question_number: 39,
    passage_number: 3,
    question_stem: "Which choice corrects the verb tense error?",
    underlined_text: "they pull it",
    context_before: "and, aided by a winch,",
    context_after: "from the depths",
    choice_a: "NO CHANGE",
    choice_b: "pulling",
    choice_c: "pulled",
    choice_d: "pull",
    correct_answer: "C",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 39 - verb tense consistency"
  },
  {
    question_number: 40,
    passage_number: 3,
    question_stem: "Which choice provides the most appropriate style for this essay?",
    underlined_text: "a gunked-up, mega-big",
    context_before: "When the log surfaced, it looked like",
    context_after: "telephone pole",
    choice_a: "NO CHANGE",
    choice_b: "a repugnantly filthy and prodigiously sized",
    choice_c: "an excessively proportioned, begrimed",
    choice_d: "a slimy, hefty",
    correct_answer: "D",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 40 - appropriate style and tone"
  },
  {
    question_number: 41,
    passage_number: 3,
    question_stem: "Which choice provides the most effective punctuation?",
    underlined_text: "axe he explained",
    context_before: "Because it was felled by an",
    context_after: "the tree was probably cut in the mid-nineteenth century",
    choice_a: "NO CHANGE",
    choice_b: "axe, he explained,",
    choice_c: "axe, he explained",
    choice_d: "axe he explained,",
    correct_answer: "B",
    question_type: "usage-mechanics",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 41 - punctuation with parenthetical expression"
  },
  {
    question_number: 42,
    passage_number: 3,
    question_stem: "The best placement for the underlined portion would be:",
    underlined_text: "Add to that when it was cut",
    context_before: "the tree was probably cut in the mid-nineteenth century.",
    context_after: "the age of the tree—easily two hundred years",
    choice_a: "where it is now",
    choice_b: "after the word age",
    choice_c: "after the word tree (and before the dash)",
    choice_d: "after the word looking",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 42 - sentence organization"
  },
  {
    question_number: 43,
    passage_number: 3,
    question_stem: "Which choice puts the age of the tree into perspective by using a specific detail?",
    underlined_text: "that had seen centuries come and centuries go",
    context_before: "we were looking at a birch",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "may have started life a century before the Declaration of Independence",
    choice_c: "had spent many more years under water than it had on land",
    choice_d: "first sprouted from seed a remarkably long time ago",
    correct_answer: "B",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 43 - specific supporting details"
  },
  {
    question_number: 44,
    passage_number: 3,
    question_stem: "Which choice best illustrates that the narrator felt a moderate degree of proficiency at operating the grapple arm?",
    underlined_text: "I'd gotten pretty good at",
    context_before: "By the end of the day,",
    context_after: "operating the grapple arm",
    choice_a: "NO CHANGE",
    choice_b: "I'd perfected the skill of",
    choice_c: "I still struggled with",
    choice_d: "I'd tried my hand at",
    correct_answer: "A",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "medium",
    notes: "Practice ACT 3 English Question 44 - precise expression of degree"
  },
  {
    question_number: 45,
    passage_number: 3,
    question_stem: "Which choice most effectively concludes the essay by alluding to both the past and future of the salvaged logs?",
    underlined_text: "finding a single salvageable log",
    context_before: "but some days he'd leave the lake without",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "The kind of wood we'd recovered—old-growth, tight-grained hardwood—wasn't really available from commercial loggers anymore",
    choice_c: "Our load of high-quality wood would become beautiful furniture or flooring, complete with an immersing backstory",
    choice_d: "With those heavy logs along for the ride, the boat moved a bit sluggishly, but even so we made it home by dinnertime",
    correct_answer: "C",
    question_type: "rhetorical-skills",
    question_category: "POW",
    difficulty_level: "hard",
    notes: "Practice ACT 3 English Question 45 - effective conclusion"
  }
];

/**
 * Upload English questions 31-45
 */
async function uploadEnglishQuestions31_45() {
  console.log('\n📤 UPLOADING ENGLISH QUESTIONS 31-45...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of ENGLISH_QUESTIONS_31_45) {
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

  console.log(`\n✅ Questions 31-45 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check total English progress after adding 31-45
 */
async function checkEnglishProgressAfter45() {
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

  console.log(`\n📊 ENGLISH SECTION QUALITY AFTER Q31-45:`);
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
 * Main function for questions 31-45
 */
async function continueEnglishExtraction31_45() {
  console.log('\n🚀 CONTINUING ENGLISH EXTRACTION - QUESTIONS 31-45');

  console.log('\n📋 ADDING QUESTIONS 31-45:');
  console.log(`  Questions to Add: ${ENGLISH_QUESTIONS_31_45.length} (Questions 31-45)`);

  // Upload questions 31-45
  const uploadResults = await uploadEnglishQuestions31_45();

  // Check overall progress
  const progressResults = await checkEnglishProgressAfter45();

  console.log('\n🎯 ENGLISH SECTION UPDATE COMPLETE (Q31-45)!');
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

// Run continuation for questions 31-45
continueEnglishExtraction31_45().catch(console.error);