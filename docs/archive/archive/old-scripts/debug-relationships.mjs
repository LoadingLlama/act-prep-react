#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('=== DEBUGGING PASSAGE-QUESTION RELATIONSHIPS ===');

// Get all passages
const { data: passages } = await supabase
  .from('act_english_passages')
  .select('*')
  .in('test_number', [1, 2]);

// Get all questions
const { data: questions } = await supabase
  .from('act_english_questions')
  .select('*')
  .in('test_number', [1, 2]);

console.log('\nPassages found:', passages?.length);
passages?.forEach(p => {
  console.log(`Passage: Test ${p.test_number}, Passage ${p.passage_number}`);
});

console.log('\nQuestions found:', questions?.length);
const questionsByTestAndPassage = {};
questions?.forEach(q => {
  const key = `test_${q.test_number}_passage_${q.passage_number}`;
  if (!questionsByTestAndPassage[key]) {
    questionsByTestAndPassage[key] = [];
  }
  questionsByTestAndPassage[key].push(q.question_number);
});

console.log('\nQuestions grouped by test and passage:');
Object.entries(questionsByTestAndPassage).forEach(([key, questionNums]) => {
  console.log(`${key}: ${questionNums.length} questions (${questionNums.slice(0, 5).join(', ')}${questionNums.length > 5 ? '...' : ''})`);
});

console.log('\nTesting relationship for first passage:');
const firstPassage = passages?.[0];
if (firstPassage) {
  const matchingQuestions = questions?.filter(q =>
    q.test_number === firstPassage.test_number &&
    q.passage_number === firstPassage.passage_number
  );
  console.log(`Passage: Test ${firstPassage.test_number}, Passage ${firstPassage.passage_number}`);
  console.log(`Matching questions: ${matchingQuestions?.length || 0}`);
  if (matchingQuestions?.length > 0) {
    console.log('Question numbers:', matchingQuestions.map(q => q.question_number));
  }
}

// Check if passage_number field exists and has expected values
console.log('\nFirst few questions with their passage numbers:');
questions?.slice(0, 10).forEach(q => {
  console.log(`Q${q.question_number}: Test ${q.test_number}, Passage ${q.passage_number}, Type: ${q.question_type}`);
});