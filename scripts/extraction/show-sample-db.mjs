#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('ACTUAL DATABASE CONTENT - First 5 Questions Per Section:\n');

const sections = ['E', 'M', 'R', 'S'];

for (const sec of sections) {
  const { data } = await supabase
    .from('act_questions')
    .select('*')
    .eq('test_number', 1)
    .eq('section', sec)
    .lte('question_number', 5)
    .order('question_number');

  const sectionName = {E: 'ENGLISH', M: 'MATH', R: 'READING', S: 'SCIENCE'}[sec];
  console.log(`═══ ${sectionName} ═══\n`);

  data.forEach(q => {
    console.log(`Q${q.question_number}: Answer = ${q.correct_answer}`);
    console.log(`Stem: ${q.question_stem.substring(0, 70)}...`);
    if (sec === 'E' && q.underlined_text) {
      console.log(`Underlined: "${q.underlined_text.substring(0, 50)}..."`);
    }
    console.log('');
  });
}

// Show answer key summary
console.log('\n═══ ANSWER KEY SUMMARY ═══\n');

for (const sec of sections) {
  const { data } = await supabase
    .from('act_questions')
    .select('question_number, correct_answer')
    .eq('test_number', 1)
    .eq('section', sec)
    .order('question_number');

  const answers = data.map(q => `${q.question_number}:${q.correct_answer}`);
  const sectionName = {E: 'English', M: 'Math   ', R: 'Reading', S: 'Science'}[sec];
  console.log(`${sectionName} (${data.length}): ${answers.slice(0, 10).join(' ')} ... ${answers.slice(-5).join(' ')}`);
}
