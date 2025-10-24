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
  .from('act_english_passages')
  .select('passage_number, title, passage_text')
  .eq('test_number', 1)
  .order('passage_number');

if (error) {
  console.error('Error:', error);
} else {
  console.log('📚 TEST 1 ENGLISH PASSAGES DETAILED REVIEW:');
  console.log('='.repeat(60));

  let totalIssues = 0;

  data.forEach((p, index) => {
    console.log(`\n📄 PASSAGE ${p.passage_number}: ${p.title}`);
    console.log(`Length: ${p.passage_text.length} characters`);

    // Check for completeness indicators
    const hasFullParagraphs = p.passage_text.includes('\n\n') || p.passage_text.length > 1500;
    const endsNaturally = !p.passage_text.endsWith('...');
    const hasIntroduction = p.passage_text.length > 200;
    const hasConclusion = p.passage_text.length > 1000;

    console.log(`Quality indicators:`);
    console.log(`  Full paragraphs: ${hasFullParagraphs ? '✅' : '❌'}`);
    console.log(`  Natural ending: ${endsNaturally ? '✅' : '❌'}`);
    console.log(`  Substantial intro: ${hasIntroduction ? '✅' : '❌'}`);
    console.log(`  Has conclusion: ${hasConclusion ? '✅' : '❌'}`);

    if (!hasFullParagraphs || !endsNaturally || !hasIntroduction || !hasConclusion) {
      totalIssues++;
      console.log('⚠️  This passage may need review!');
    }

    // Show first and last 100 characters
    console.log(`First 120 chars: ${p.passage_text.substring(0, 120)}...`);
    console.log(`Last 120 chars: ...${p.passage_text.substring(p.passage_text.length - 120)}`);
    console.log('-'.repeat(60));
  });

  const avgLength = data.reduce((sum, p) => sum + p.passage_text.length, 0) / data.length;
  console.log(`\n📊 SUMMARY:`);
  console.log(`Total passages: ${data.length}/5`);
  console.log(`Average length: ${Math.round(avgLength)} characters`);
  console.log(`Range: ${Math.min(...data.map(p => p.passage_text.length))} - ${Math.max(...data.map(p => p.passage_text.length))} characters`);
  console.log(`Passages with potential issues: ${totalIssues}/5`);

  if (totalIssues > 0) {
    console.log('\n⚠️  Some Test 1 passages may need to be re-extracted for 100% accuracy');
  } else {
    console.log('\n✅ All Test 1 passages appear to be complete and accurate');
  }
}