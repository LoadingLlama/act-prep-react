#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔬 MOLECULAR ANALYSIS - ULTRA DEEP\n');

const { data: engQ } = await supabase.from('act_english_questions').select('*');
const { data: mathQ } = await supabase.from('act_math_questions').select('*');  
const { data: readQ } = await supabase.from('act_reading_questions').select('*');
const { data: engP } = await supabase.from('act_english_passages').select('*');
const { data: readP } = await supabase.from('act_reading_passages').select('*');

let output = '';

// FULL DUMP OF EVERYTHING - First 50 questions per section
output += '=== ENGLISH QUESTIONS (FIRST 50 COMPLETE) ===\n\n';
engQ.slice(0, 50).forEach(q => {
  output += `TEST ${q.test_number} | Q${q.question_number} | ${q.question_type} | ${q.question_category} | DIFF: ${q.difficulty_level}\n`;
  output += `CONTEXT BEFORE: ${q.context_before || ''}\n`;
  output += `UNDERLINED: ${q.underlined_text || ''}\n`;
  output += `CONTEXT AFTER: ${q.context_after || ''}\n`;
  output += `STEM: ${q.question_stem || ''}\n`;
  output += `  A: ${q.choice_a || ''}\n`;
  output += `  B: ${q.choice_b || ''}\n`;
  output += `  C: ${q.choice_c || ''}\n`;
  output += `  D: ${q.choice_d || ''}\n`;
  output += `CORRECT: ${q.correct_answer}\n`;
  if (q.notes) output += `NOTES: ${q.notes}\n`;
  output += '\n' + '-'.repeat(100) + '\n\n';
});

output += '\n\n=== MATH QUESTIONS (FIRST 50 COMPLETE) ===\n\n';
mathQ.slice(0, 50).forEach(q => {
  output += `TEST ${q.test_number} | Q${q.question_number} | ${q.question_type} | ${q.question_category} | DIFF: ${q.difficulty_level}\n`;
  output += `HAS_FIGURE: ${q.has_figure}\n`;
  output += `STEM: ${q.question_stem || ''}\n`;
  output += `  A: ${q.choice_a || ''}\n`;
  output += `  B: ${q.choice_b || ''}\n`;
  output += `  C: ${q.choice_c || ''}\n`;
  output += `  D: ${q.choice_d || ''}\n`;
  output += `  E: ${q.choice_e || ''}\n`;
  output += `CORRECT: ${q.correct_answer}\n`;
  if (q.figure_data) output += `FIGURE: ${JSON.stringify(q.figure_data)}\n`;
  if (q.notes) output += `NOTES: ${q.notes}\n`;
  output += '\n' + '-'.repeat(100) + '\n\n';
});

output += '\n\n=== READING QUESTIONS (FIRST 50 COMPLETE) ===\n\n';
readQ.slice(0, 50).forEach(q => {
  output += `TEST ${q.test_number} | Q${q.question_number} | ${q.question_type} | ${q.question_category} | DIFF: ${q.difficulty_level}\n`;
  output += `STEM: ${q.question_stem || ''}\n`;
  output += `  A: ${q.choice_a || ''}\n`;
  output += `  B: ${q.choice_b || ''}\n`;
  output += `  C: ${q.choice_c || ''}\n`;
  output += `  D: ${q.choice_d || ''}\n`;
  output += `CORRECT: ${q.correct_answer}\n`;
  if (q.notes) output += `NOTES: ${q.notes}\n`;
  output += '\n' + '-'.repeat(100) + '\n\n';
});

output += '\n\n=== PASSAGE FULL TEXTS ===\n\n';

output += '--- ENGLISH PASSAGES (FIRST 3) ---\n\n';
engP.slice(0, 3).forEach(p => {
  output += `TEST ${p.test_number} PASSAGE ${p.passage_number}: ${p.title || 'Untitled'}\n`;
  if (p.introduction) output += `INTRO: ${p.introduction}\n\n`;
  output += `${p.passage_text}\n`;
  output += '\n' + '='.repeat(100) + '\n\n';
});

output += '--- READING PASSAGES (FIRST 2) ---\n\n';
readP.slice(0, 2).forEach(p => {
  output += `TEST ${p.test_number} PASSAGE ${p.passage_number}: ${p.passage_type}\n`;
  output += `TITLE: ${p.title || 'N/A'} | AUTHOR: ${p.author || 'N/A'}\n`;
  if (p.introduction) output += `INTRO: ${p.introduction}\n\n`;
  output += `${p.passage_text}\n`;
  output += '\n' + '='.repeat(100) + '\n\n';
});

fs.writeFileSync('reports/molecular-data-dump.txt', output);
console.log('✅ Generated: reports/molecular-data-dump.txt');
console.log('📊 Contains full text of 150 questions + passages');
