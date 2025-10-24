#!/usr/bin/env node

/**
 * COMPREHENSIVE LESSON REASSIGNMENT
 * Fix incorrect lesson assignments based on manual review
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 COMPREHENSIVE LESSON REASSIGNMENT');
console.log('='.repeat(80));

// Lesson ID mappings (from our review)
const LESSONS = {
  // English
  'verbs': '10fff941-59e1-4d3a-84b7-d0fe8f9985ef',
  'comma_rules': '3e8f0696-1bf7-4b5c-880d-fb5359923b7d',
  'punctuation': '66776383-9334-4efb-bd72-74b1bbeab8ac',
  'sentences': 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac',
  'word_choice': '04df2a09-a910-4456-8fe5-2f8e7f62c50f',
  'add_delete': '784a146b-8809-4189-a1b4-4b2fdcaf8199',
  'redundancy': '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734',
  'transitions': '7aae3763-017b-4762-ad5a-346aac1f027b',
  'placement': '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4',
  'which_choice': '29b59c9d-ef2e-4f7f-aae2-464222884d3a',
  'modifiers': 'f7ac1d6c-6416-47fd-9720-807224100517',
  'pronouns': '3c3585a1-f137-4331-8390-29ef1f5e889f',
  'parallel': 'e6153221-e330-4db4-8cc7-9c5a1d51a301',
  'misc': '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16',

  // Math
  'algebra': '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'geometry': '3e2c98a9-98e3-40e3-8301-11f38aa0c15b',
  'functions': '89b5a825-cb28-4e50-a4a7-de9d73922bc9',
  'probability': 'b5f5c943-7bcd-431a-aa94-df51be6612e2',
  'ratios': '27833f99-7aa1-4e5d-92e4-c953fadebc0d',
  'mean_median': '4b3fd0c3-4de3-4e74-bd87-f78f5fb0ad17',
  'number_theory': '74013e77-3111-4dc6-beca-ff15948e4351',
  'word_problems': 'ec9b95cf-47f7-4c01-8118-91aef61f7170',
  'sequences': 'ad844a99-7156-4315-ac86-958f52468df2',
  'trigonometry': 'a0cddccc-a9e8-4ec0-a0b2-ef1cc46a161a',

  // Reading
  'question_types': '25fb92b6-429e-4940-802a-e339ae3a47e1',
  'context_words': 'c22d531f-b59a-41fe-8b19-bf2f8e063b48',
  'comparing': '680d39ef-6fc8-490b-a574-c68fad112466',

  // Science
  'data_points': '53c5676d-0fa7-4416-8848-38268483599e',
  'trends': 'b8825e84-e3de-4642-913e-fc5c1ea70690',
  'experiments': '1513e653-31c1-418d-9e7f-f91253d9438b',
  'approximation': '4ca7c266-f0e2-48ff-adbd-204ae486d503',
  'two_part': 'eb0ae215-47e8-4b48-8251-250067974600',
  'viewpoints': '6f9652ad-13d6-447f-bc9f-df706d1e45aa'
};

// Define comprehensive reassignments based on manual review
const REASSIGNMENTS = {
  english: [
    // Q1 Test 2 - preposition issue, not just verbs
    { test: 2, question: 1, lesson: LESSONS.misc, reason: 'Preposition/gerund structure, not pure verb issue' },

    // Q2 Test 2 - verb forms, not punctuation
    { test: 2, question: 2, lesson: LESSONS.verbs, reason: 'Verb form (being), not punctuation' },

    // Q6 Test 2 - deleting content question
    { test: 2, question: 6, lesson: LESSONS.add_delete, reason: 'Deleting underlined portion - add/delete topic' },

    // More specific verb vs grammar distinctions
    { test: 2, question: 10, lesson: LESSONS.sentences, reason: 'Sentence structure, not just verbs' },
  ],

  math: [
    // Q2 Test 2 - commission average calculation
    { test: 2, question: 2, lesson: LESSONS.mean_median, reason: 'Calculating average commission - mean/median topic' },

    // Q3 Test 2 - greatest common factor
    { test: 2, question: 3, lesson: LESSONS.number_theory, reason: 'GCD calculation - number theory topic' },

    // Q6 Test 2 - ratio/proportion word problem
    { test: 2, question: 6, lesson: LESSONS.ratios, reason: 'Map scale ratio problem' },

    // Q7 Test 2 - percentage word problem
    { test: 2, question: 7, lesson: LESSONS.word_problems, reason: 'Multi-step word problem' },
  ],

  reading: [
    // Most reading questions need more specific categorization beyond "question types"
    // We'll focus on vocabulary in context questions for now
  ],

  science: [
    // Science assignments are generally correct, but some could have multiple tags
  ]
};

// Function to apply reassignments
async function applyReassignments() {
  console.log('🔧 Applying lesson reassignments...\n');

  for (const [section, assignments] of Object.entries(REASSIGNMENTS)) {
    console.log(`📝 ${section.toUpperCase()} Section Reassignments:`);

    for (const assignment of assignments) {
      const tableName = `act_${section}_questions`;

      try {
        const { data, error } = await supabase
          .from(tableName)
          .update({ lesson_id: assignment.lesson })
          .eq('test_number', assignment.test)
          .eq('question_number', assignment.question);

        if (error) {
          console.log(`  ❌ Q${assignment.question} Test ${assignment.test}: ${error.message}`);
        } else {
          console.log(`  ✅ Q${assignment.question} Test ${assignment.test}: ${assignment.reason}`);
        }
      } catch (err) {
        console.log(`  ❌ Q${assignment.question} Test ${assignment.test}: ${err.message}`);
      }
    }
    console.log('');
  }
}

// Advanced analysis: Find questions that need manual review
async function identifyQuestionPatterns() {
  console.log('🔍 ADVANCED PATTERN ANALYSIS');
  console.log('='.repeat(50));

  // English pattern analysis
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('*')
    .in('test_number', [1, 2]);

  console.log('\n📝 English Question Pattern Analysis:');

  const patterns = {
    underlined: 0,
    rhetorical: 0,
    grammar_errors: 0,
    organization: 0
  };

  englishQuestions?.forEach(q => {
    if (q.question_stem.includes('<u>') && q.question_stem.includes('</u>')) {
      patterns.underlined++;
    } else {
      patterns.rhetorical++;
    }

    // Check for grammar patterns
    if (q.question_type?.includes('verb') || q.question_type?.includes('comma') ||
        q.question_type?.includes('punctuation') || q.question_type?.includes('fragment')) {
      patterns.grammar_errors++;
    }

    // Check for organization patterns
    if (q.question_stem.includes('Which choice') || q.question_stem.includes('delete') ||
        q.question_stem.includes('add') || q.question_stem.includes('placement')) {
      patterns.organization++;
    }
  });

  console.log(`  Underlined questions: ${patterns.underlined}`);
  console.log(`  Rhetorical questions: ${patterns.rhetorical}`);
  console.log(`  Grammar/usage focus: ${patterns.grammar_errors}`);
  console.log(`  Organization focus: ${patterns.organization}`);

  // Math complexity analysis
  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('*')
    .in('test_number', [1, 2])
    .order('question_number');

  console.log('\n🔢 Math Question Complexity Progression:');

  const mathComplexity = {
    easy: mathQuestions?.slice(0, 20).map(q => q.question_stem.length).reduce((a, b) => a + b, 0) / 20,
    medium: mathQuestions?.slice(20, 40).map(q => q.question_stem.length).reduce((a, b) => a + b, 0) / 20,
    hard: mathQuestions?.slice(40, 60).map(q => q.question_stem.length).reduce((a, b) => a + b, 0) / 20
  };

  console.log(`  Q1-20 avg length: ${mathComplexity.easy?.toFixed(0) || 'N/A'} chars`);
  console.log(`  Q21-40 avg length: ${mathComplexity.medium?.toFixed(0) || 'N/A'} chars`);
  console.log(`  Q41-60 avg length: ${mathComplexity.hard?.toFixed(0) || 'N/A'} chars`);
}

// Function to create multiple lesson tags (future enhancement)
async function identifyMultipleTagCandidates() {
  console.log('\n🏷️  MULTIPLE TAG CANDIDATES');
  console.log('='.repeat(50));

  // English questions that could have multiple tags
  const { data: englishComplex } = await supabase
    .from('act_english_questions')
    .select('*')
    .in('test_number', [1, 2]);

  console.log('\n📝 English questions needing multiple tags:');

  englishComplex?.forEach(q => {
    const multiTagReasons = [];

    // Check for comma + verb issues
    if (q.question_stem.includes('comma') && q.question_type?.includes('verb')) {
      multiTagReasons.push('Comma Rules + Verbs');
    }

    // Check for word choice + style
    if (q.question_type?.includes('word-choice') && q.question_stem.includes('style')) {
      multiTagReasons.push('Word Choice + Style');
    }

    // Check for sentence structure + punctuation
    if (q.question_type?.includes('fragment') && q.question_stem.includes('punctuation')) {
      multiTagReasons.push('Sentences + Punctuation');
    }

    if (multiTagReasons.length > 0) {
      console.log(`  Q${q.question_number} Test ${q.test_number}: ${multiTagReasons.join(', ')}`);
    }
  });
}

// Main execution
console.log('Starting comprehensive lesson reassignment...\n');

await applyReassignments();
await identifyQuestionPatterns();
await identifyMultipleTagCandidates();

console.log('\n✅ COMPREHENSIVE REASSIGNMENT COMPLETE');
console.log('🎯 Key improvements made:');
console.log('  - Fixed English grammar vs organization distinctions');
console.log('  - Corrected Math topic classifications (GCD, averages, ratios)');
console.log('  - Identified patterns for future multiple tagging');
console.log('  - Analyzed complexity progressions');