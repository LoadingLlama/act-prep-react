#!/usr/bin/env node
/**
 * QUALITY ANALYSIS - Compare Generated vs Real ACT
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('🔍 QUALITY ANALYSIS - Generated vs Real ACT\n');
console.log('='.repeat(90) + '\n');

async function analyzeQuality() {
  // Get generated English questions
  const { data: genEnglish } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number')
    .limit(5);

  // Get real ACT English questions
  const { data: actEnglish } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number')
    .limit(5);

  console.log('📝 ENGLISH QUESTIONS COMPARISON:\n');
  console.log('GENERATED:\n');
  genEnglish?.forEach(q => {
    const words = q.question_text?.split(/\s+/).length || 0;
    console.log(`Q${q.question_number}: ${words} words`);
    console.log(`  "${q.question_text?.substring(0, 150)}..."`);
    console.log(`  Choices: ${q.choices}\n`);
  });

  console.log('\nREAL ACT:\n');
  actEnglish?.forEach(q => {
    const fullText = `${q.context_before || ''} ${q.underlined_text || ''} ${q.context_after || ''}`;
    const words = fullText.split(/\s+/).length;
    console.log(`Q${q.question_number}: ${words} words (${q.question_type})`);
    console.log(`  Context: "${q.context_before?.substring(0, 100)}..."`);
    console.log(`  Underlined: "${q.underlined_text}"`);
    console.log(`  Choices: A=${q.choice_a}, B=${q.choice_b}\n`);
  });

  // Get generated Math
  const { data: genMath } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number')
    .limit(5);

  // Get real ACT Math
  const { data: actMath } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number')
    .limit(5);

  console.log('\n' + '='.repeat(90));
  console.log('\n🔢 MATH QUESTIONS COMPARISON:\n');
  console.log('GENERATED:\n');
  genMath?.forEach(q => {
    const words = q.question_text?.split(/\s+/).length || 0;
    console.log(`Q${q.question_number}: ${words} words`);
    console.log(`  "${q.question_text}"`);
    console.log(`  Choices: ${q.choices}\n`);
  });

  console.log('\nREAL ACT:\n');
  actMath?.forEach(q => {
    const words = q.question_stem?.split(/\s+/).length || 0;
    console.log(`Q${q.question_number}: ${words} words (${q.question_type})`);
    console.log(`  "${q.question_stem}"`);
    console.log(`  Choices: A=${q.choice_a}, B=${q.choice_b}, C=${q.choice_c}\n`);
  });

  // Get passage word counts
  const { data: genReadingP } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .eq('test_number', 1);

  const { data: actReadingP } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', 1);

  console.log('\n' + '='.repeat(90));
  console.log('\n📖 READING PASSAGES WORD COUNT:\n');
  console.log('Generated:');
  genReadingP?.forEach(p => {
    console.log(`  Passage ${p.passage_number}: ${p.word_count} words`);
  });
  console.log(`  Average: ${Math.round(genReadingP?.reduce((sum, p) => sum + (p.word_count || 0), 0) / genReadingP?.length)}`);

  console.log('\nReal ACT:');
  actReadingP?.forEach(p => {
    const words = p.passage_text?.split(/\s+/).filter(w => w.length > 0).length || 0;
    console.log(`  Passage ${p.passage_number}: ${words} words (${p.passage_type})`);
  });
  const actAvg = Math.round(actReadingP?.reduce((sum, p) => sum + (p.passage_text?.split(/\s+/).length || 0), 0) / actReadingP?.length);
  console.log(`  Average: ${actAvg}`);

  console.log('\n' + '='.repeat(90));
  console.log('\n⚠️  ISSUES IDENTIFIED:\n');
  console.log('1. Generated reading passages: 332 words vs Real ACT: ' + actAvg + ' words');
  console.log(`   Gap: ${Math.round((1 - 332/actAvg) * 100)}% too short\n`);

  // Get actual English passage word counts
  const { data: actEngPassages } = await supabase
    .from('act_english_questions')
    .select('context_before, context_after, passage_number')
    .eq('test_number', 1)
    .limit(75);

  // Calculate real English passage lengths
  const englishPassageWords = {};
  actEngPassages?.forEach(q => {
    const pNum = q.passage_number || 1;
    if (!englishPassageWords[pNum]) englishPassageWords[pNum] = 0;
    const words = (q.context_before + ' ' + q.context_after).split(/\s+/).length;
    englishPassageWords[pNum] += words;
  });

  const actEnglishAvg = Math.round(Object.values(englishPassageWords).reduce((a,b) => a+b, 0) / Object.keys(englishPassageWords).length);

  console.log('2. Generated English passages: 107-145 words vs Real ACT: ~' + actEnglishAvg + ' words per passage');
  console.log(`   Gap: ~${Math.round((1 - 125/actEnglishAvg) * 100)}% too short\n`);

  console.log('3. Question complexity: Generated questions are generic templates');
  console.log('   Real ACT questions have specific context and nuanced testing\n');

  console.log('4. Answer choices: Generated choices lack variety and realistic distractors\n');

  console.log('='.repeat(90) + '\n');
}

analyzeQuality().catch(console.error);
