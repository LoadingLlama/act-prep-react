#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verifyFinalPassages() {
  console.log('✅ FINAL PASSAGE VERIFICATION\n');
  console.log('='.repeat(80) + '\n');

  const { data: eng } = await supabase
    .from('practice_test_english_passages')
    .select('passage_text')
    .eq('test_number', 1)
    .eq('passage_number', 1)
    .single();

  console.log('ENGLISH PASSAGE 1 (first 600 chars):');
  console.log(eng?.passage_text?.substring(0, 600));
  console.log('\n');

  // Check for duplicates
  const text = eng?.passage_text || '';
  const firstIdx = text.indexOf('Mantas are plankton-eating');
  const lastIdx = text.lastIndexOf('Mantas are plankton-eating');
  const hasDuplicate = firstIdx !== -1 && firstIdx !== lastIdx;

  console.log('✓ Has duplicate "Mantas are plankton-eating":', hasDuplicate);
  console.log('✓ Has brackets:', text.includes('['));
  console.log('✓ Has 3+ spaces:', /\s{3,}/.test(text));

  // Find brackets if they exist
  if (text.includes('[')) {
    const bracketIdx = text.indexOf('[');
    console.log('\n📌 Bracket found at position:', bracketIdx);
    console.log('Context:', text.substring(Math.max(0, bracketIdx - 50), bracketIdx + 100));
  }

  console.log('\n' + '='.repeat(80) + '\n');

  if (!hasDuplicate && !text.includes('[') && !/\s{3,}/.test(text)) {
    console.log('✨ All passages are properly formatted and ready for display!\n');
  } else {
    console.log('⚠️  Some issues remain that may need additional fixing.\n');
  }
}

verifyFinalPassages().catch(console.error);
