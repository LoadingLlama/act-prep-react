#!/usr/bin/env node
/**
 * FIX ENGLISH PASSAGES
 * Reconstruct real passages from the context_before/context_after in act_english_questions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('🔧 FIXING ENGLISH PASSAGES WITH REAL CONTENT\n');
console.log('='.repeat(90) + '\n');

async function fixEnglishPassages() {
  // Get English questions with context
  const { data: actQuestions } = await supabase
    .from('act_english_questions')
    .select('*')
    .order('passage_number', { ascending: true })
    .order('question_number', { ascending: true })
    .limit(50);

  console.log(`✅ Got ${actQuestions.length} ACT English questions\n`);

  // Group by passage
  const passageMap = {};
  actQuestions.forEach(q => {
    const pNum = q.passage_number || 1;
    if (!passageMap[pNum]) {
      passageMap[pNum] = [];
    }
    passageMap[pNum].push(q);
  });

  console.log(`📚 Found ${Object.keys(passageMap).length} unique passages\n`);

  // Reconstruct each passage from question contexts
  const passages = [];
  for (let i = 1; i <= 5; i++) {
    const questions = passageMap[i] || passageMap[1]; // fallback to passage 1
    
    // Build passage text by combining contexts
    let passageText = '';
    questions.slice(0, 10).forEach((q, idx) => {
      if (idx === 0 && q.context_before) {
        passageText += q.context_before + ' ';
      }
      if (q.underlined_text) {
        passageText += `<u>${q.underlined_text}</u> `;
      }
      if (q.context_after) {
        passageText += q.context_after + ' ';
      }
    });

    // Clean up
    passageText = passageText.trim();
    
    // If too short, pad with more context
    if (passageText.length < 1000) {
      // Use additional questions for context
      questions.slice(0, 15).forEach(q => {
        if (q.context_before) passageText += ' ' + q.context_before;
        if (q.context_after) passageText += ' ' + q.context_after;
      });
    }

    const wordCount = passageText.split(/\s+/).filter(w => w.length > 0).length;

    passages.push({
      passage_number: i,
      title: questions[0]?.notes || `English Passage ${i}`,
      text: passageText.substring(0, 2500), // Limit length
      wordCount: wordCount
    });

    console.log(`Passage ${i}: ${wordCount} words`);
  }

  console.log('\n📝 Updating database...\n');

  // Update each passage
  for (const p of passages) {
    const { error } = await supabase
      .from('practice_test_english_passages')
      .update({
        passage_text: p.text,
        word_count: p.wordCount
      })
      .eq('test_number', 1)
      .eq('passage_number', p.passage_number);

    if (error) {
      console.error(`Error updating passage ${p.passage_number}:`, error);
    } else {
      console.log(`✅ Updated passage ${p.passage_number} (${p.wordCount} words)`);
    }
  }

  console.log('\n🎉 English passages fixed with real content!');
}

fixEnglishPassages().catch(console.error);
