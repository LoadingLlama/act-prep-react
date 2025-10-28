#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 INSPECTING ACTUAL DATABASE CONTENT\n');

// Check English Passage 1
const { data: engPassage } = await supabase
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

console.log('📝 ENGLISH PASSAGE 1:');
console.log('─'.repeat(60));
console.log(`Title: (no title field in this table)`);
console.log(`Word Count: ${engPassage.word_count}`);
console.log(`Type: ${engPassage.passage_type}`);
console.log(`\nText (first 500 chars):\n${engPassage.passage_text.substring(0, 500)}...\n`);
console.log('─'.repeat(60));
console.log();

// Check English Question 1
const { data: engQ } = await supabase
  .from('practice_test_english_questions')
  .select('*')
  .eq('test_number', 1)
  .eq('question_number', 1)
  .single();

console.log('📝 ENGLISH QUESTION 1:');
console.log('─'.repeat(60));
console.log(`Question Text: ${engQ.question_text}`);
console.log(`Prompt: ${engQ.question_prompt}`);
console.log(`Choices: ${engQ.choices}`);
console.log(`Correct Answer Index: ${engQ.correct_answer}`);
console.log(`Explanation: ${engQ.explanation}`);
console.log('─'.repeat(60));
console.log();

// Check Math Question 1
const { data: mathQ } = await supabase
  .from('practice_test_math_questions')
  .select('*')
  .eq('test_number', 1)
  .eq('question_number', 1)
  .single();

console.log('🔢 MATH QUESTION 1:');
console.log('─'.repeat(60));
console.log(`Question Text: ${mathQ.question_text}`);
console.log(`Choices: ${mathQ.choices}`);
console.log(`Correct Answer Index: ${mathQ.correct_answer}`);
console.log('─'.repeat(60));
console.log();

// Check Reading Passage 1
const { data: readPassage } = await supabase
  .from('practice_test_reading_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

console.log('📖 READING PASSAGE 1:');
console.log('─'.repeat(60));
console.log(`Word Count: ${readPassage.word_count}`);
console.log(`Type: ${readPassage.passage_type}`);
console.log(`\nText (first 300 chars):\n${readPassage.passage_text.substring(0, 300)}...\n`);
console.log('─'.repeat(60));
console.log();

// Check Science Passage 1
const { data: sciPassage } = await supabase
  .from('practice_test_science_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

console.log('🔬 SCIENCE PASSAGE 1:');
console.log('─'.repeat(60));
console.log(`Title: ${sciPassage.passage_title}`);
console.log(`Type: ${sciPassage.passage_type}`);
console.log(`\nText (first 300 chars):\n${sciPassage.passage_text.substring(0, 300)}...\n`);
console.log('─'.repeat(60));
