#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('Verifying Test 7 Science section...\n');

const { data: questions } = await supabase
  .from('act_science_questions')
  .select('question_number, correct_answer')
  .eq('test_number', 7)
  .order('question_number');

const { data: passages } = await supabase
  .from('act_science_passages')
  .select('passage_number, title')
  .eq('test_number', 7)
  .order('passage_number');

console.log(`Total Questions: ${questions?.length || 0}/40`);
console.log(`Total Passages: ${passages?.length || 0}/6\n`);

if (passages && passages.length > 0) {
  console.log('Passages:');
  for (const p of passages) {
    console.log(`  ${p.passage_number}. ${p.title}`);
  }
}

if (questions && questions.length > 0) {
  const answerKey = questions.map(q => q.correct_answer).join(',');
  console.log(`\nExtracted Answers: ${answerKey}`);

  const expected = 'C,A,D,B,A,B,C,A,C,B,D,A,B,C,D,C,B,D,C,A,B,D,A,C,C,B,A,D,C,A,D,C,A,B,D,B,C,A,B,D';
  console.log(`Expected Answers:  ${expected}`);

  if (answerKey === expected) {
    console.log('\n✅ 100% MATCH - All answers correct!');
  } else {
    console.log('\n⚠️  MISMATCH DETECTED - Checking differences...');
    const extracted = answerKey.split(',');
    const exp = expected.split(',');
    for (let i = 0; i < 40; i++) {
      if (extracted[i] !== exp[i]) {
        console.log(`Q${i+1}: Expected ${exp[i]}, Got ${extracted[i]}`);
      }
    }
  }
}
