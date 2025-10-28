#!/usr/bin/env node
/**
 * REWRITE ACT TEST 1 - Same structure, completely new text
 * Takes act_* test 1 and rewrites everything while keeping question types
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('✍️  REWRITING ACT TEST 1 - New Text, Same Testing\n');
console.log('='.repeat(90) + '\n');

async function rewriteTest1() {
  
  // Get ACT test 1 as template
  console.log('📚 Loading ACT Test 1 as template...\n');

  const { data: actEnglishQ } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number')
    .order('question_number');

  const { data: actReadingP } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: actReadingQ } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  const { data: actMath } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  const { data: actScienceP } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: actScienceQ } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  console.log(`✅ Loaded ${actEnglishQ?.length || 0} English questions`);
  console.log(`✅ Loaded ${actReadingP?.length || 0} Reading passages + ${actReadingQ?.length || 0} questions`);
  console.log(`✅ Loaded ${actMath?.length || 0} Math questions`);
  console.log(`✅ Loaded ${actScienceP?.length || 0} Science passages + ${actScienceQ?.length || 0} questions\n`);

  console.log('='.repeat(90));
  console.log('📋 TEMPLATE STRUCTURE:\n');
  
  // Show what we'll keep vs rewrite
  console.log('KEEP (Structure):');
  console.log('  ✓ Question types (e.g., verb-tense, comma-usage)');
  console.log('  ✓ Difficulty levels');
  console.log('  ✓ Correct answer positions');
  console.log('  ✓ Number of questions per passage');
  console.log('  ✓ Word counts (approximate)\n');

  console.log('REWRITE (Content):');
  console.log('  ✍️  All passage text → completely new topics');
  console.log('  ✍️  All question stems → new wording, same grammar concept');
  console.log('  ✍️  All answer choices → new text, same type of error');
  console.log('  ✍️  Math problems → new numbers/scenarios, same math concept');
  console.log('  ✍️  Science data → new experiments, same data patterns\n');

  console.log('='.repeat(90) + '\n');
  console.log('🎯 Ready to generate rewritten test!');
  console.log('   This will create completely new text that tests the exact same skills.\n');
}

rewriteTest1().catch(console.error);
