#!/usr/bin/env node

/**
 * MOLECULAR-LEVEL ANALYSIS OF PRACTICE TEST 1
 * Analyzes every aspect of existing Test 1 to ensure 1:1 regeneration
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('🔬 MOLECULAR-LEVEL ANALYSIS OF PRACTICE TEST 1\n');
console.log('='.repeat(80) + '\n');

const analysisReport = {
  english: {},
  math: {},
  reading: {},
  science: {}
};

async function analyzeEnglish() {
  console.log('📝 ANALYZING ENGLISH SECTION\n');

  const { data: questions, error } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  const { data: passages } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number', { ascending: true });

  // Question type distribution
  const typeCount = {};
  const difficultyCount = {};
  const choicesAnalysis = [];
  const underlinePatterns = [];

  questions.forEach(q => {
    // Type distribution
    typeCount[q.question_type] = (typeCount[q.question_type] || 0) + 1;

    // Difficulty distribution
    difficultyCount[q.difficulty] = (difficultyCount[q.difficulty] || 0) + 1;

    // Analyze choices
    const choices = JSON.parse(q.choices);
    choicesAnalysis.push({
      qNum: q.question_number,
      choiceCount: choices.length,
      hasNoChange: choices[0].includes('NO CHANGE'),
      avgLength: choices.reduce((sum, c) => sum + c.length, 0) / choices.length
    });

    // Analyze underlines
    const underlineMatch = q.question_text.match(/<u>([^<]+)<\/u>/);
    if (underlineMatch) {
      underlinePatterns.push({
        qNum: q.question_number,
        underlineText: underlineMatch[1],
        length: underlineMatch[1].length
      });
    }
  });

  analysisReport.english = {
    totalQuestions: questions.length,
    questionTypes: typeCount,
    difficulty: difficultyCount,
    avgChoiceLength: choicesAnalysis.reduce((sum, c) => sum + c.avgLength, 0) / choicesAnalysis.length,
    noChangeCount: choicesAnalysis.filter(c => c.hasNoChange).length,
    choicesPerQuestion: choicesAnalysis[0]?.choiceCount,
    underlineCount: underlinePatterns.length,
    avgUnderlineLength: underlinePatterns.reduce((sum, u) => sum + u.length, 0) / underlinePatterns.length,
    passageCount: passages?.length || 0,
    questionsPerPassage: questions.length / (passages?.length || 1)
  };

  console.log('Question Types:', typeCount);
  console.log('Difficulty:', difficultyCount);
  console.log('Choices per question:', choicesAnalysis[0]?.choiceCount);
  console.log('Questions with NO CHANGE:', choicesAnalysis.filter(c => c.hasNoChange).length);
  console.log('Underlines found:', underlinePatterns.length);
  console.log('Passages:', passages?.length);
  console.log('');
}

async function analyzeMath() {
  console.log('🔢 ANALYZING MATH SECTION\n');

  const { data: questions, error } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  const typeCount = {};
  const difficultyCount = {};
  const choicesAnalysis = [];
  const hasImages = questions.filter(q => q.question_image_url).length;

  questions.forEach(q => {
    typeCount[q.question_type] = (typeCount[q.question_type] || 0) + 1;
    difficultyCount[q.difficulty] = (difficultyCount[q.difficulty] || 0) + 1;

    const choices = JSON.parse(q.choices);
    choicesAnalysis.push({
      qNum: q.question_number,
      choiceCount: choices.length,
      avgLength: choices.reduce((sum, c) => sum + c.length, 0) / choices.length
    });
  });

  analysisReport.math = {
    totalQuestions: questions.length,
    questionTypes: typeCount,
    difficulty: difficultyCount,
    choicesPerQuestion: choicesAnalysis[0]?.choiceCount,
    avgChoiceLength: choicesAnalysis.reduce((sum, c) => sum + c.avgLength, 0) / choicesAnalysis.length,
    questionsWithImages: hasImages
  };

  console.log('Question Types:', typeCount);
  console.log('Difficulty:', difficultyCount);
  console.log('Choices per question:', choicesAnalysis[0]?.choiceCount);
  console.log('Questions with images:', hasImages);
  console.log('');
}

async function analyzeReading() {
  console.log('📖 ANALYZING READING SECTION\n');

  const { data: questions, error: qError } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number', { ascending: true });

  const { data: passages, error: pError } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number', { ascending: true });

  if (qError || pError) {
    console.error('Error:', qError || pError);
    return;
  }

  const typeCount = {};
  const difficultyCount = {};
  const passageTypes = {};

  questions.forEach(q => {
    typeCount[q.question_type] = (typeCount[q.question_type] || 0) + 1;
    difficultyCount[q.difficulty] = (difficultyCount[q.difficulty] || 0) + 1;
  });

  passages.forEach(p => {
    passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;
  });

  const passageWordCounts = passages.map(p => p.word_count);

  analysisReport.reading = {
    totalQuestions: questions.length,
    questionTypes: typeCount,
    difficulty: difficultyCount,
    passageCount: passages.length,
    passageTypes: passageTypes,
    avgPassageLength: passageWordCounts.reduce((a, b) => a + b, 0) / passageWordCounts.length,
    questionsPerPassage: questions.length / passages.length
  };

  console.log('Question Types:', typeCount);
  console.log('Difficulty:', difficultyCount);
  console.log('Passage Types:', passageTypes);
  console.log('Passages:', passages.length);
  console.log('Avg passage length:', Math.round(passageWordCounts.reduce((a, b) => a + b, 0) / passageWordCounts.length), 'words');
  console.log('');
}

async function analyzeScience() {
  console.log('🔬 ANALYZING SCIENCE SECTION\n');

  const { data: questions, error: qError } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number', { ascending: true });

  const { data: passages, error: pError } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number', { ascending: true });

  if (qError || pError) {
    console.error('Error:', qError || pError);
    return;
  }

  const typeCount = {};
  const difficultyCount = {};
  const passageTypes = {};
  const hasHTMLTables = passages.filter(p => p.passage_text.includes('<table')).length;

  questions.forEach(q => {
    typeCount[q.question_type] = (typeCount[q.question_type] || 0) + 1;
    difficultyCount[q.difficulty] = (difficultyCount[q.difficulty] || 0) + 1;
  });

  passages.forEach(p => {
    passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;
  });

  analysisReport.science = {
    totalQuestions: questions.length,
    questionTypes: typeCount,
    difficulty: difficultyCount,
    passageCount: passages.length,
    passageTypes: passageTypes,
    passagesWithTables: hasHTMLTables,
    questionsPerPassage: questions.length / passages.length
  };

  console.log('Question Types:', typeCount);
  console.log('Difficulty:', difficultyCount);
  console.log('Passage Types:', passageTypes);
  console.log('Passages:', passages.length);
  console.log('Passages with HTML tables:', hasHTMLTables);
  console.log('');
}

async function runAnalysis() {
  await analyzeEnglish();
  await analyzeMath();
  await analyzeReading();
  await analyzeScience();

  // Save full report
  console.log('='.repeat(80));
  console.log('📊 FULL ANALYSIS REPORT\n');
  console.log(JSON.stringify(analysisReport, null, 2));

  fs.writeFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/scripts/analysis/TEST1-MOLECULAR-ANALYSIS.json',
    JSON.stringify(analysisReport, null, 2)
  );

  console.log('\n✅ Analysis complete! Report saved to TEST1-MOLECULAR-ANALYSIS.json');
}

runAnalysis();
