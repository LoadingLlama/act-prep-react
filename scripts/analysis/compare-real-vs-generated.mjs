#!/usr/bin/env node
/**
 * COMPARE REAL ACT QUESTIONS VS OUR GENERATED TEST 1
 * Find exact patterns to match
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('🔬 MOLECULAR COMPARISON: REAL ACT vs PRACTICE TEST 1\n');
console.log('='.repeat(90) + '\n');

async function compareTests() {
  // Get real ACT English questions
  const { data: realEnglish } = await supabase
    .from('act_english_questions')
    .select('question_stem, underlined_text, choice_a, choice_b, choice_c, choice_d, difficulty_level');

  // Get generated English questions
  const { data: genEnglish } = await supabase
    .from('practice_test_english_questions')
    .select('question_text, choices, difficulty')
    .eq('test_number', 1);

  // Analyze English question stems
  console.log('📝 ENGLISH QUESTION ANALYSIS:\n');
  
  const realStemWords = realEnglish
    .filter(q => q.question_stem)
    .map(q => q.question_stem.split(/\s+/).filter(w => w.length > 0).length);
  
  const genStemWords = genEnglish
    .map(q => {
      // Extract question stem (text after underline, before choices)
      const parts = q.question_text.split('\n\n');
      const stem = parts.length > 1 ? parts[1] : '';
      return stem.split(/\s+/).filter(w => w.length > 0).length;
    });

  console.log('REAL ACT ENGLISH:');
  console.log(`   Avg question stem: ${(realStemWords.reduce((a,b)=>a+b,0)/realStemWords.length).toFixed(1)} words`);
  console.log(`   Range: ${Math.min(...realStemWords)}-${Math.max(...realStemWords)} words`);
  console.log(`   Total questions: ${realEnglish.length}`);
  
  console.log('\nGENERATED ENGLISH:');
  console.log(`   Avg question stem: ${(genStemWords.reduce((a,b)=>a+b,0)/genStemWords.length).toFixed(1)} words`);
  console.log(`   Range: ${Math.min(...genStemWords)}-${Math.max(...genStemWords)} words`);
  console.log(`   Total questions: ${genEnglish.length}/50`);

  // Analyze choice length
  const realChoiceWords = realEnglish.map(q => {
    const choices = [q.choice_a, q.choice_b, q.choice_c, q.choice_d].filter(c => c);
    return choices.reduce((sum, c) => sum + c.split(/\s+/).filter(w => w.length > 0).length, 0) / choices.length;
  });

  const genChoiceWords = genEnglish.map(q => {
    const choices = JSON.parse(q.choices);
    return choices.reduce((sum, c) => {
      const text = c.replace(/^[A-D]\.\s*/, '');
      return sum + text.split(/\s+/).filter(w => w.length > 0).length;
    }, 0) / choices.length;
  });

  console.log('\nCHOICE LENGTH ANALYSIS:');
  console.log(`REAL ACT: avg ${(realChoiceWords.reduce((a,b)=>a+b,0)/realChoiceWords.length).toFixed(1)} words per choice`);
  console.log(`GENERATED: avg ${(genChoiceWords.reduce((a,b)=>a+b,0)/genChoiceWords.length).toFixed(1)} words per choice`);

  // Math questions
  console.log('\n\n🔢 MATH QUESTION ANALYSIS:\n');
  
  const { data: realMath } = await supabase
    .from('act_math_questions')
    .select('question_stem, difficulty_level');

  const { data: genMath } = await supabase
    .from('practice_test_math_questions')
    .select('question_text, difficulty')
    .eq('test_number', 1);

  const realMathWords = realMath
    .filter(q => q.question_stem)
    .map(q => q.question_stem.split(/\s+/).filter(w => w.length > 0).length);
  
  const genMathWords = genMath
    .map(q => q.question_text.split(/\s+/).filter(w => w.length > 0).length);

  console.log('REAL ACT MATH:');
  console.log(`   Avg question: ${(realMathWords.reduce((a,b)=>a+b,0)/realMathWords.length).toFixed(1)} words`);
  console.log(`   Range: ${Math.min(...realMathWords)}-${Math.max(...realMathWords)} words`);
  
  console.log('\nGENERATED MATH:');
  console.log(`   Avg question: ${(genMathWords.reduce((a,b)=>a+b,0)/genMathWords.length).toFixed(1)} words`);
  console.log(`   Range: ${Math.min(...genMathWords)}-${Math.max(...genMathWords)} words`);

  // Difficulty distribution
  console.log('\n\nDIFFICULTY DISTRIBUTION:\n');
  
  const realMathDiff = {easy: 0, medium: 0, hard: 0};
  realMath.forEach(q => {
    if (q.difficulty_level) realMathDiff[q.difficulty_level]++;
  });
  
  const genMathDiff = {easy: 0, medium: 0, hard: 0};
  genMath.forEach(q => {
    if (q.difficulty) genMathDiff[q.difficulty]++;
  });

  console.log('REAL ACT MATH:');
  Object.entries(realMathDiff).forEach(([diff, count]) => {
    const pct = (count / realMath.length * 100).toFixed(1);
    console.log(`   ${diff}: ${count} (${pct}%)`);
  });

  console.log('\nGENERATED MATH:');
  Object.entries(genMathDiff).forEach(([diff, count]) => {
    const pct = (count / genMath.length * 100).toFixed(1);
    console.log(`   ${diff}: ${count} (${pct}%)`);
  });

  // Check passages
  console.log('\n\n📖 PASSAGE ANALYSIS:\n');
  
  const { data: realReadPassages } = await supabase
    .from('act_reading_passages')
    .select('*');

  const { data: genReadPassages } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .eq('test_number', 1);

  if (realReadPassages && realReadPassages.length > 0) {
    const realWords = realReadPassages
      .filter(p => p.passage_text)
      .map(p => p.passage_text.split(/\s+/).filter(w => w.length > 0).length);
    
    console.log('REAL ACT READING PASSAGES:');
    console.log(`   Count: ${realReadPassages.length}`);
    console.log(`   Avg length: ${(realWords.reduce((a,b)=>a+b,0)/realWords.length).toFixed(0)} words`);
    console.log(`   Range: ${Math.min(...realWords)}-${Math.max(...realWords)} words`);
  }

  const genWords = genReadPassages.map(p => p.word_count);
  console.log('\nGENERATED READING PASSAGES:');
  console.log(`   Count: ${genReadPassages.length}`);
  console.log(`   Avg length: ${(genWords.reduce((a,b)=>a+b,0)/genWords.length).toFixed(0)} words`);
  console.log(`   Range: ${Math.min(...genWords)}-${Math.max(...genWords)} words`);

  // Science passages
  const { data: realSciPassages } = await supabase
    .from('act_science_passages')
    .select('*');

  const { data: genSciPassages } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1);

  if (realSciPassages && realSciPassages.length > 0) {
    console.log('\n\nREAL ACT SCIENCE PASSAGES:');
    console.log(`   Count: ${realSciPassages.length}`);
    console.log(`   Sample columns:`, Object.keys(realSciPassages[0]).join(', '));
  }

  console.log('\nGENERATED SCIENCE PASSAGES:');
  console.log(`   Count: ${genSciPassages.length}`);

  // Final summary
  console.log('\n\n' + '='.repeat(90));
  console.log('🎯 KEY FINDINGS:\n');
  console.log('1. ENGLISH: Need to match real ACT question stem patterns');
  console.log('2. MATH: Word counts look reasonable, check difficulty distribution');
  console.log('3. READING: Passages need expansion to match real ACT length');
  console.log('4. SCIENCE: Need to analyze real ACT science passage structure');
  console.log('5. Only 30/50 English questions - missing 20 questions');
  console.log('='.repeat(90) + '\n');
}

compareTests().catch(console.error);
