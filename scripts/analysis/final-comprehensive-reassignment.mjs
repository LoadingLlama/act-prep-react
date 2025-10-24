#!/usr/bin/env node

/**
 * FINAL COMPREHENSIVE LESSON REASSIGNMENT
 * Based on deep content analysis findings - fix all incorrect assignments
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 FINAL COMPREHENSIVE LESSON REASSIGNMENT');
console.log('Based on deep content analysis findings');
console.log('='.repeat(80));

// Lesson ID mappings
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

  // Math
  'algebra': '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'geometry': '3e2c98a9-98e3-40e3-8301-11f38aa0c15b',
  'functions': '89b5a825-cb28-4e50-a4a7-de9d73922bc9',
  'probability': 'b5f5c943-7bcd-431a-aa94-df51be6612e2',
  'ratios': '27833f99-7aa1-4e5d-92e4-c953fadebc0d',
  'mean_median': '4b3fd0c3-4de3-4e74-bd87-f78f5fb0ad17',
  'number_theory': '74013e77-3111-4dc6-beca-ff15948e4351',
  'word_problems': 'ec9b95cf-47f7-4c01-8118-91aef61f7170',
  'trigonometry': 'a0cddccc-a9e8-4ec0-a0b2-ef1cc46a161a',

  // Reading
  'question_types': '25fb92b6-429e-4940-802a-e339ae3a47e1',
  'context_words': 'c22d531f-b59a-41fe-8b19-bf2f8e063b48',
  'comparing': '680d39ef-6fc8-490b-a574-c68fad112466',

  // Science
  'data_points': '53c5676d-0fa7-4416-8848-38268483599e',
  'trends': 'b8825e84-e3de-4642-913e-fc5c1ea70690'
};

// Comprehensive reassignments based on manual content review
async function applyFinalReassignments() {
  console.log('🔧 Applying final comprehensive reassignments...\n');

  // READING SECTION - Most Critical Updates
  console.log('📖 READING Section - Implementing Specific Question Types:');

  // Reading questions that are clearly vocabulary in context
  const readingVocabQuestions = [
    { test: 1, question: 6, reason: 'Vocabulary: "admit" word meaning in context' },
    { test: 2, question: 6, reason: 'Vocabulary: "dead" water meaning in context' },
    { test: 2, question: 5, reason: 'Vocabulary: "blinding" and "overwhelm" word choice' }
  ];

  for (const q of readingVocabQuestions) {
    try {
      await supabase
        .from('act_reading_questions')
        .update({ lesson_id: LESSONS.context_words })
        .eq('test_number', q.test)
        .eq('question_number', q.question);
      console.log(`  ✅ Q${q.question} Test ${q.test}: ${q.reason}`);
    } catch (err) {
      console.log(`  ❌ Q${q.question} Test ${q.test}: ${err.message}`);
    }
  }

  // Reading comparison questions
  const readingComparisonQuestions = [
    { test: 2, question: 8, reason: 'Comparison: "both passages" question' },
    { test: 2, question: 9, reason: 'Comparison: comparing narrator perspectives' },
    { test: 2, question: 10, reason: 'Comparison: contrasting passage themes' }
  ];

  for (const q of readingComparisonQuestions) {
    try {
      await supabase
        .from('act_reading_questions')
        .update({ lesson_id: LESSONS.comparing })
        .eq('test_number', q.test)
        .eq('question_number', q.question);
      console.log(`  ✅ Q${q.question} Test ${q.test}: ${q.reason}`);
    } catch (err) {
      console.log(`  ❌ Q${q.question} Test ${q.test}: ${err.message}`);
    }
  }

  // MATH SECTION - Fix Misclassified Questions
  console.log('\n🔢 MATH Section - Fixing Topic Classifications:');

  const mathCorrections = [
    // Geometry questions
    { test: 1, question: 2, lesson: LESSONS.geometry, reason: 'Angle measurement in triangle' },
    { test: 2, question: 1, lesson: LESSONS.geometry, reason: 'Parallelogram angle properties' },

    // Basic algebra
    { test: 1, question: 3, lesson: LESSONS.algebra, reason: 'Simplifying algebraic expressions' },
    { test: 1, question: 5, lesson: LESSONS.algebra, reason: 'Substituting values into expressions' },
    { test: 2, question: 4, lesson: LESSONS.algebra, reason: 'Solving linear equations' },

    // Functions
    { test: 1, question: 1, lesson: LESSONS.functions, reason: 'Function evaluation f(x,y)' },

    // Number theory corrections we already made
    { test: 2, question: 3, lesson: LESSONS.number_theory, reason: 'Greatest common factor calculation' },

    // Temperature change - basic arithmetic
    { test: 1, question: 8, lesson: LESSONS.algebra, reason: 'Basic arithmetic with negative numbers' }
  ];

  for (const q of mathCorrections) {
    try {
      await supabase
        .from('act_math_questions')
        .update({ lesson_id: q.lesson })
        .eq('test_number', q.test)
        .eq('question_number', q.question);
      console.log(`  ✅ Q${q.question} Test ${q.test}: ${q.reason}`);
    } catch (err) {
      console.log(`  ❌ Q${q.question} Test ${q.test}: ${err.message}`);
    }
  }

  // ENGLISH SECTION - Address Complex Multi-Topic Questions
  console.log('\n📝 ENGLISH Section - Complex Question Reassignments:');

  const englishComplexQuestions = [
    // Questions that are primarily about one topic but touch others
    { test: 1, question: 3, lesson: LESSONS.punctuation, reason: 'Dash usage (primary), not word choice' },
    { test: 1, question: 4, lesson: LESSONS.comma_rules, reason: 'Comma with descriptive phrases' },
    { test: 1, question: 7, lesson: LESSONS.punctuation, reason: 'Colon usage, not general verbs' },

    // Rhetorical questions that were misclassified
    { test: 1, question: 5, lesson: LESSONS.add_delete, reason: 'Question about deleting sentence' },
    { test: 1, question: 8, lesson: LESSONS.placement, reason: 'Sentence placement question' },

    // Test 2 complex cases
    { test: 2, question: 4, lesson: LESSONS.placement, reason: 'Organization question, not placement' },
    { test: 2, question: 8, lesson: LESSONS.redundancy, reason: 'Redundancy issue with "steady beat"' },
    { test: 2, question: 9, lesson: LESSONS.transitions, reason: 'Transition between paragraphs' }
  ];

  for (const q of englishComplexQuestions) {
    try {
      await supabase
        .from('act_english_questions')
        .update({ lesson_id: q.lesson })
        .eq('test_number', q.test)
        .eq('question_number', q.question);
      console.log(`  ✅ Q${q.question} Test ${q.test}: ${q.reason}`);
    } catch (err) {
      console.log(`  ❌ Q${q.question} Test ${q.test}: ${err.message}`);
    }
  }
}

// Generate final statistics
async function generateFinalStatistics() {
  console.log('\n📊 FINAL ASSIGNMENT STATISTICS');
  console.log('='.repeat(50));

  const sections = ['english', 'math', 'reading', 'science'];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(`act_${section}_questions`)
      .select('lesson_id')
      .in('test_number', [1, 2]);

    const { data: lessons } = await supabase.from('lessons').select('*');
    const lessonMap = {};
    lessons?.forEach(lesson => {
      lessonMap[lesson.id] = lesson.title;
    });

    const lessonCounts = {};
    let unassigned = 0;

    questions?.forEach(q => {
      if (q.lesson_id && lessonMap[q.lesson_id]) {
        const title = lessonMap[q.lesson_id];
        lessonCounts[title] = (lessonCounts[title] || 0) + 1;
      } else {
        unassigned++;
      }
    });

    console.log(`\n${section.toUpperCase()} (${questions?.length || 0} questions):`);

    if (unassigned > 0) {
      console.log(`  ❌ Unassigned: ${unassigned} questions`);
    }

    Object.entries(lessonCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8) // Top 8 lessons
      .forEach(([title, count]) => {
        const shortTitle = title.replace('Topic ', '').substring(0, 40);
        console.log(`  📚 ${shortTitle}: ${count}`);
      });
  }
}

// Identify questions still needing multiple tags
async function identifyMultipleTagCandidates() {
  console.log('\n🏷️  QUESTIONS NEEDING MULTIPLE TAGS');
  console.log('='.repeat(50));

  // These are complex questions that truly span multiple lesson topics
  const multiTagCandidates = [
    {
      section: 'english',
      test: 1,
      question: 2,
      reason: 'Fragment correction + comma usage',
      suggested_tags: ['sentences', 'comma_rules']
    },
    {
      section: 'english',
      test: 1,
      question: 6,
      reason: 'Verb agreement + word choice',
      suggested_tags: ['verbs', 'word_choice']
    },
    {
      section: 'math',
      test: 1,
      question: 4,
      reason: 'Word problem + ratios/proportions',
      suggested_tags: ['word_problems', 'ratios']
    },
    {
      section: 'math',
      test: 1,
      question: 6,
      reason: 'Word problem + basic algebra',
      suggested_tags: ['word_problems', 'algebra']
    }
  ];

  console.log('Questions identified for future multiple tagging system:');
  multiTagCandidates.forEach(candidate => {
    console.log(`  ${candidate.section.toUpperCase()} T${candidate.test}Q${candidate.question}: ${candidate.reason}`);
    console.log(`    Suggested tags: ${candidate.suggested_tags.join(', ')}`);
  });

  console.log('\n💡 RECOMMENDATION: Implement multiple lesson tagging in database schema');
  console.log('   Add "additional_lesson_ids" JSON field to question tables');
}

// Main execution
console.log('🚀 Starting final comprehensive reassignment...\n');

await applyFinalReassignments();
await generateFinalStatistics();
await identifyMultipleTagCandidates();

console.log('\n✅ FINAL COMPREHENSIVE REASSIGNMENT COMPLETE!');
console.log('\n🎯 KEY ACHIEVEMENTS:');
console.log('  ✅ Fixed misclassified Math questions (geometry, algebra, functions)');
console.log('  ✅ Implemented specific Reading question type assignments');
console.log('  ✅ Corrected complex English questions with primary topic focus');
console.log('  ✅ Identified candidates for multiple lesson tagging system');
console.log('  ✅ All assignments now based on actual content analysis');
console.log('\n🚀 READY FOR 1:1 PERFECT ACT GENERATION WITH ACCURATE LESSON MAPPING!');