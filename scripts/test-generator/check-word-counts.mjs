#!/usr/bin/env node
/**
 * CHECK WORD COUNTS - Verify passage lengths match real ACT
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkWordCounts() {
  console.log('🔍 PRACTICE TEST 1 - WORD COUNT ANALYSIS\n');
  console.log('='.repeat(80) + '\n');

  // English passages
  console.log('ENGLISH PASSAGES (Practice Test 1):');
  const { data: engPractice } = await supabase
    .from('practice_test_english_passages')
    .select('passage_number, word_count')
    .eq('test_number', 1)
    .order('passage_number');

  let totalPracticeWords = 0;
  engPractice?.forEach(p => {
    totalPracticeWords += p.word_count || 0;
    console.log(`  Passage ${p.passage_number}: ${p.word_count} words`);
  });
  console.log(`  Average: ${Math.round(totalPracticeWords / (engPractice?.length || 1))} words\n`);

  // Compare to ACT Test 1
  console.log('ENGLISH PASSAGES (Real ACT Test 1 - should match):');
  const { data: actEnglish } = await supabase
    .from('act_english_questions')
    .select('passage_number, context_before, context_after, underlined_text')
    .eq('test_number', 1)
    .limit(75);

  const actByPassage = {};
  actEnglish?.forEach(q => {
    const pNum = q.passage_number || 1;
    if (!actByPassage[pNum]) actByPassage[pNum] = [];
    actByPassage[pNum].push(q);
  });

  let totalActWords = 0;
  Object.keys(actByPassage).sort().forEach(pNum => {
    const questions = actByPassage[pNum];
    let words = 0;
    questions.forEach(q => {
      const text = (q.context_before || '') + ' ' + (q.underlined_text || '') + ' ' + (q.context_after || '');
      words += text.split(/\s+/).filter(w => w.length > 0).length;
    });
    totalActWords += words;
    console.log(`  Passage ${pNum}: ${words} words (${questions.length} questions)`);
  });
  console.log(`  Average: ${Math.round(totalActWords / Object.keys(actByPassage).length)} words\n`);

  // Reading passages
  console.log('='.repeat(80));
  console.log('\nREADING PASSAGES (Practice Test 1):');
  const { data: readPractice } = await supabase
    .from('practice_test_reading_passages')
    .select('passage_number, word_count')
    .eq('test_number', 1)
    .order('passage_number');

  readPractice?.forEach(p => {
    console.log(`  Passage ${p.passage_number}: ${p.word_count} words`);
  });

  console.log('\nREADING PASSAGES (Real ACT Test 1):');
  const { data: actReading } = await supabase
    .from('act_reading_passages')
    .select('passage_number, passage_text')
    .eq('test_number', 1)
    .order('passage_number');

  actReading?.forEach(p => {
    const words = (p.passage_text || '').split(/\s+/).filter(w => w.length > 0).length;
    console.log(`  Passage ${p.passage_number}: ${words} words`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('\n⚠️  ISSUE: If Practice Test passages are shorter, they need to be regenerated!');
  console.log('The DIRECT-ACT-ADAPTER.mjs must use ALL source questions for full passage length.\n');
}

checkWordCounts().catch(console.error);
