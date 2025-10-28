#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkActEnglishPassages() {
  console.log('🔍 REAL ACT TEST 1 - ENGLISH PASSAGE ANALYSIS\n');
  console.log('='.repeat(80) + '\n');

  const { data: actQuestions } = await supabase
    .from('act_english_questions')
    .select('passage_number, context_before, underlined_text, context_after, question_number')
    .eq('test_number', 1)
    .order('question_number')
    .limit(75);

  const byPassage = {};
  actQuestions?.forEach(q => {
    const pNum = q.passage_number || 1;
    if (!byPassage[pNum]) byPassage[pNum] = [];
    byPassage[pNum].push(q);
  });

  console.log('REAL ACT ENGLISH PASSAGES (Test 1):\n');

  Object.keys(byPassage).sort((a,b) => a-b).forEach(pNum => {
    const questions = byPassage[pNum];

    let fullText = '';
    questions.forEach(q => {
      fullText += (q.context_before || '') + ' ';
      fullText += (q.underlined_text || '') + ' ';
      fullText += (q.context_after || '') + ' ';
    });

    const words = fullText.split(/\s+/).filter(w => w.length > 0).length;
    console.log(`  Passage ${pNum}: ${words} words (${questions.length} questions)`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('\n⚠️ PROBLEM:');
  console.log('Practice Test 1 English passages: 159 words average');
  console.log('These need to match real ACT length!\n');
}

checkActEnglishPassages().catch(console.error);
