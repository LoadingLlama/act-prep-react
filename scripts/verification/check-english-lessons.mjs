#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data, error } = await supabase
  .from('act_english_questions')
  .select('question_number, lesson_id, difficulty_level, question_type')
  .eq('test_number', 2)
  .order('question_number');

if (error) {
  console.error('Error:', error);
} else {
  console.log('📚 ENGLISH QUESTIONS LESSON STATUS:');
  console.log('='.repeat(50));

  let withLessons = 0;
  let withDifficulty = 0;
  let withQuestionType = 0;

  data.forEach(q => {
    if (q.lesson_id) withLessons++;
    if (q.difficulty_level) withDifficulty++;
    if (q.question_type) withQuestionType++;
  });

  console.log(`✅ With lesson_id: ${withLessons}/75`);
  console.log(`✅ With difficulty_level: ${withDifficulty}/75`);
  console.log(`✅ With question_type: ${withQuestionType}/75`);

  // Show some missing examples
  const missing = data.filter(q => !q.lesson_id || !q.difficulty_level);
  console.log(`\n❌ Missing lesson data: ${missing.length} questions`);
  if (missing.length > 0) {
    console.log('First few missing:');
    missing.slice(0, 10).forEach(q => {
      console.log(`Q${q.question_number}: lesson_id=${q.lesson_id || 'NULL'}, difficulty=${q.difficulty_level || 'NULL'}, type=${q.question_type || 'NULL'}`);
    });
  }
}