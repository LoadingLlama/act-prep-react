#!/usr/bin/env node
/**
 * REMOVE ITALICS FROM TEST 1
 * Removes all <i> tags from Test 1 so we can re-apply with improved script
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function removeItalics() {
  console.log('🔄 Removing italics from Test 1 to re-apply with improved script...\n');

  // Remove from math questions
  const { data: mathQ } = await supabase
    .from('practice_test_math_questions')
    .select('id, question_text, choices')
    .eq('test_number', 1);

  for (const q of mathQ) {
    const cleanText = q.question_text.replace(/<\/?i>/g, '');
    const cleanChoices = q.choices.replace(/<\/?i>/g, '');

    await supabase
      .from('practice_test_math_questions')
      .update({ question_text: cleanText, choices: cleanChoices })
      .eq('id', q.id);
  }

  console.log('✅ Removed italics from Math questions');

  // Remove from science passages
  const { data: sciP } = await supabase
    .from('practice_test_science_passages')
    .select('id, passage_text')
    .eq('test_number', 1);

  for (const p of sciP) {
    const cleanText = p.passage_text.replace(/<\/?i>/g, '');

    await supabase
      .from('practice_test_science_passages')
      .update({ passage_text: cleanText })
      .eq('id', p.id);
  }

  console.log('✅ Removed italics from Science passages');

  // Remove from science questions
  const { data: sciQ } = await supabase
    .from('practice_test_science_questions')
    .select('id, question_text, choices')
    .eq('test_number', 1);

  for (const q of sciQ) {
    const cleanText = q.question_text.replace(/<\/?i>/g, '');
    const cleanChoices = q.choices.replace(/<\/?i>/g, '');

    await supabase
      .from('practice_test_science_questions')
      .update({ question_text: cleanText, choices: cleanChoices })
      .eq('id', q.id);
  }

  console.log('✅ Removed italics from Science questions');
  console.log('\n✅ Ready to re-apply italics with improved script!');
}

removeItalics().catch(console.error);
