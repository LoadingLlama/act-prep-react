#!/usr/bin/env node
/**
 * CLEAR NO CHANGE QUESTION TEXT
 *
 * For English questions with "NO CHANGE" as option A,
 * clear the question_text field so students only see
 * the highlighted portion in the passage.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function clearNoChangeQuestionText(testNumber) {
  console.log(`\n🔄 Processing Test ${testNumber}...`);

  // Get all English questions for this test
  const { data: questions } = await supabase
    .from('practice_test_english_questions')
    .select('id, question_number, choices, question_text')
    .eq('test_number', testNumber)
    .order('question_number');

  if (!questions || questions.length === 0) {
    console.log(`  ⚠️  No questions found`);
    return 0;
  }

  let cleared = 0;

  for (const q of questions) {
    const choices = JSON.parse(q.choices);

    // Check if first choice is "NO CHANGE"
    if (choices[0] && choices[0].includes('NO CHANGE')) {
      // Clear the question_text (use empty string due to NOT NULL constraint)
      const { error } = await supabase
        .from('practice_test_english_questions')
        .update({ question_text: '' })
        .eq('id', q.id);

      if (error) {
        console.log(`  ❌ Error clearing Q${q.question_number}: ${error.message}`);
      } else {
        cleared++;
      }
    }
  }

  console.log(`  ✅ Cleared ${cleared} NO CHANGE questions`);
  return cleared;
}

async function clearAllNoChangeQuestionText() {
  console.log('🔧 CLEARING NO CHANGE QUESTION TEXT\n');
  console.log('='.repeat(80) + '\n');

  let totalCleared = 0;

  for (let testNum = 1; testNum <= 7; testNum++) {
    const cleared = await clearNoChangeQuestionText(testNum);
    totalCleared += cleared;
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ COMPLETE! Cleared ${totalCleared} NO CHANGE questions across all tests\n`);
}

clearAllNoChangeQuestionText().catch(console.error);
