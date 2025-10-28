#!/usr/bin/env node
/**
 * ANALYZE REAL ACT QUESTIONS FROM act_* TABLES
 * This finds the TRUE patterns we need to match
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('🔍 ANALYZING REAL ACT QUESTIONS (act_* tables)\n');
console.log('='.repeat(90) + '\n');

async function analyzeRealACT() {
  // Search for all act_* tables
  const actTables = [
    'act_english_questions',
    'act_math_questions',
    'act_reading_questions',
    'act_science_questions',
    'act_questions'
  ];

  for (const table of actTables) {
    console.log(`\nSearching for ${table}...`);
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact' })
      .limit(5);

    if (!error && data) {
      console.log(`✅ FOUND: ${table} (${count} total rows)\n`);
      
      if (data.length > 0) {
        console.log('   Columns:', Object.keys(data[0]).join(', '));
        console.log('\n   SAMPLE QUESTION:');
        
        const sample = data[0];
        
        // Analyze word count
        if (sample.question_text) {
          const wordCount = sample.question_text.split(/\s+/).filter(w => w.length > 0).length;
          console.log(`   Question text (${wordCount} words):`, sample.question_text.substring(0, 150) + '...');
        }
        
        if (sample.choices) {
          const choices = typeof sample.choices === 'string' ? JSON.parse(sample.choices) : sample.choices;
          console.log('   Choices:', choices);
        }
        
        if (sample.difficulty) {
          console.log('   Difficulty:', sample.difficulty);
        }
        
        if (sample.question_type) {
          console.log('   Type:', sample.question_type);
        }
        
        console.log('\n' + '-'.repeat(90) + '\n');
      }
    } else if (error) {
      console.log(`   ❌ Not found: ${error.message}`);
    }
  }

  // Now analyze word count patterns for found tables
  console.log('\n\n📊 WORD COUNT ANALYSIS OF REAL ACT QUESTIONS\n');
  console.log('='.repeat(90) + '\n');

  for (const table of actTables) {
    const { data, error } = await supabase
      .from(table)
      .select('question_text, difficulty, question_type');

    if (!error && data && data.length > 0) {
      console.log(`\n${table.toUpperCase()}:\n`);
      
      const wordCounts = {
        easy: [],
        medium: [],
        hard: []
      };

      data.forEach(q => {
        if (q.question_text) {
          const words = q.question_text.split(/\s+/).filter(w => w.length > 0).length;
          if (q.difficulty && wordCounts[q.difficulty]) {
            wordCounts[q.difficulty].push(words);
          }
        }
      });

      ['easy', 'medium', 'hard'].forEach(diff => {
        if (wordCounts[diff].length > 0) {
          const avg = wordCounts[diff].reduce((a, b) => a + b, 0) / wordCounts[diff].length;
          const min = Math.min(...wordCounts[diff]);
          const max = Math.max(...wordCounts[diff]);
          console.log(`   ${diff.toUpperCase()}: ${wordCounts[diff].length} questions`);
          console.log(`      Word count range: ${min}-${max} words (avg: ${avg.toFixed(1)})`);
        }
      });

      // Overall stats
      const allWords = [...wordCounts.easy, ...wordCounts.medium, ...wordCounts.hard];
      if (allWords.length > 0) {
        const overallAvg = allWords.reduce((a, b) => a + b, 0) / allWords.length;
        console.log(`   OVERALL: avg ${overallAvg.toFixed(1)} words per question`);
      }
    }
  }
}

analyzeRealACT().catch(console.error);
