#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔬 EXTRACTING EVERYTHING\n');

const [r1, r2, r3, r4, r5, r6, r7, r8] = await Promise.all([
  supabase.from('act_english_questions').select('*'),
  supabase.from('act_english_passages').select('*'),
  supabase.from('act_math_questions').select('*'),
  supabase.from('act_reading_questions').select('*'),
  supabase.from('act_reading_passages').select('*'),
  supabase.from('act_science_questions').select('*'),
  supabase.from('act_science_passages').select('*'),
  supabase.from('lessons').select('*')
]);

const engQ = r1.data || [];
const engP = r2.data || [];
const mathQ = r3.data || [];
const readQ = r4.data || [];
const readP = r5.data || [];
const sciQ = r6.data || [];
const sciP = r7.data || [];
const lessons = r8.data || [];

console.log(`✓ ${engQ.length} English Q, ${engP.length} English P`);
console.log(`✓ ${mathQ.length} Math Q`);
console.log(`✓ ${readQ.length} Reading Q, ${readP.length} Reading P`);
console.log(`✓ ${sciQ.length} Science Q, ${sciP.length} Science P`);
console.log(`✓ ${lessons.length} Lessons\n`);

const data = {
  english: { questions: engQ, passages: engP },
  math: { questions: mathQ },
  reading: { questions: readQ, passages: readP },
  science: { questions: sciQ, passages: sciP },
  lessons: lessons,
  meta: {
    totalQuestions: engQ.length + mathQ.length + readQ.length + sciQ.length,
    totalPassages: engP.length + readP.length + sciP.length,
    extracted: new Date().toISOString()
  }
};

fs.writeFileSync('reports/complete-act-data.json', JSON.stringify(data, null, 2));
console.log('✅ JSON: reports/complete-act-data.json');

const size = fs.statSync('reports/complete-act-data.json').size;
console.log(`   Size: ${(size / 1024 / 1024).toFixed(2)} MB\n`);
console.log('This file contains EVERYTHING needed to generate tests.');
