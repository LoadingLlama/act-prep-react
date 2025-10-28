#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('Verifying Test 7 Math questions...\n');

const { data: questions } = await supabase
  .from('act_math_questions')
  .select('question_number, correct_answer')
  .eq('test_number', 7)
  .order('question_number');

console.log(`Total Questions: ${questions?.length || 0}/60`);

if (questions && questions.length > 0) {
  const answerKey = questions.map(q => q.correct_answer).join(',');
  console.log(`\nExtracted Answers: ${answerKey}`);

  const expected = 'A,B,D,C,B,E,B,C,A,B,D,D,C,A,E,B,D,E,B,C,B,A,D,D,B,C,A,B,A,D,B,E,A,C,C,E,A,B,E,C,D,C,A,B,A,D,C,B,E,D,D,B,E,D,E,A,C,B,D,A';
  console.log(`Expected Answers:  ${expected}`);

  if (answerKey === expected) {
    console.log('\n✅ 100% MATCH - All answers correct!');
  } else {
    console.log('\n⚠️  MISMATCH DETECTED - Checking differences...');
    const extracted = answerKey.split(',');
    const exp = expected.split(',');
    for (let i = 0; i < 60; i++) {
      if (extracted[i] !== exp[i]) {
        console.log(`Q${i+1}: Expected ${exp[i]}, Got ${extracted[i]}`);
      }
    }
  }
}
