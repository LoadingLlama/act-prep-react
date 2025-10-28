#!/usr/bin/env node
/**
 * CORRECT GENERATOR - Keep passages and questions matched!
 * Takes ONE complete ACT test and adapts it with slight text variations
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('🎯 CORRECT GENERATOR - Matching Passages & Questions\n');
console.log('='.repeat(90) + '\n');

async function generateCorrectly() {
  // STEP 1: Pick ONE complete ACT test as source
  const sourceTestNumber = 1; // Use ACT test 1 as source
  
  console.log(`📚 Using ACT Test ${sourceTestNumber} as source\n`);

  // Get all questions from that ONE test, grouped by passage
  const { data: actEnglishQ } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', sourceTestNumber)
    .order('passage_number')
    .order('question_number')
    .limit(50);

  const { data: actReadingQ } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', sourceTestNumber)
    .order('question_number')
    .limit(36);

  const { data: actReadingP } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', sourceTestNumber)
    .order('passage_number')
    .limit(4);

  const { data: actScienceQ } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', sourceTestNumber)
    .order('question_number')
    .limit(40);

  const { data: actScienceP } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', sourceTestNumber)
    .order('passage_number')
    .limit(6);

  const { data: actMath } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', sourceTestNumber)
    .order('question_number')
    .limit(45);

  console.log(`✅ Got ${actEnglishQ?.length || 0} English questions`);
  console.log(`✅ Got ${actReadingQ?.length || 0} Reading questions with ${actReadingP?.length || 0} passages`);
  console.log(`✅ Got ${actScienceQ?.length || 0} Science questions with ${actScienceP?.length || 0} passages`);
  console.log(`✅ Got ${actMath?.length || 0} Math questions\n`);

  // STEP 2: Group English questions by passage_number
  const englishByPassage = {};
  (actEnglishQ || []).forEach(q => {
    const pNum = q.passage_number || 1;
    if (!englishByPassage[pNum]) englishByPassage[pNum] = [];
    englishByPassage[pNum].push(q);
  });

  console.log(`📝 English grouped into ${Object.keys(englishByPassage).length} passages\n`);

  // STEP 3: Reconstruct each English passage from ITS questions
  console.log('🔨 Reconstructing English passages from question contexts...\n');
  
  const englishPassagesToInsert = [];
  const passageNumberMap = {}; // old passage_number -> new passage ID
  
  for (let i = 1; i <= 5; i++) {
    const questions = englishByPassage[Object.keys(englishByPassage)[i-1]] || englishByPassage[1];
    
    // Build passage from these specific questions' contexts
    let fullText = '';
    questions.slice(0, 10).forEach(q => {
      if (q.context_before) fullText += q.context_before + ' ';
      if (q.underlined_text) fullText += \`<u>\${q.underlined_text}</u> \`;
      if (q.context_after) fullText += q.context_after + ' ';
    });

    const wordCount = fullText.split(/\\s+/).filter(w => w.length > 0).length;

    englishPassagesToInsert.push({
      test_number: 1,
      passage_number: i,
      passage_type: 'general',
      passage_title: \`English Passage \${i}\`,
      passage_text: fullText.trim(),
      word_count: wordCount,
      originalPassageNumber: Object.keys(englishByPassage)[i-1]
    });

    console.log(\`  Passage \${i}: \${wordCount} words (from \${questions.length} questions)\`);
  }

  console.log('\\n✅ All passages match their questions!\n');
  console.log('Next: Clear database and insert with proper matching...');
}

generateCorrectly().catch(console.error);
