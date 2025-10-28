#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('Fixing Science passage linkages for Test 7...\n');

// Get current passage UUIDs
const { data: passages } = await supabase
  .from('act_science_passages')
  .select('id, passage_number')
  .eq('test_number', 7)
  .order('passage_number');

const passageMap = {};
for (const p of passages) {
  passageMap[p.passage_number] = p.id;
}

console.log('Current passage UUIDs:');
for (let i = 1; i <= 6; i++) {
  console.log(`  Passage ${i}: ${passageMap[i]}`);
}

// Define question ranges for each passage
const questionRanges = [
  { passage: 1, questions: [1, 2, 3, 4, 5, 6, 7] },
  { passage: 2, questions: [8, 9, 10, 11, 12, 13, 14] },
  { passage: 3, questions: [15, 16, 17, 18, 19, 20, 21] },
  { passage: 4, questions: [22, 23, 24, 25, 26, 27] },
  { passage: 5, questions: [28, 29, 30, 31, 32, 33, 34] },
  { passage: 6, questions: [35, 36, 37, 38, 39, 40] }
];

console.log('\nUpdating question passage_id values...\n');

for (const range of questionRanges) {
  const passageId = passageMap[range.passage];

  for (const qNum of range.questions) {
    const { error } = await supabase
      .from('act_science_questions')
      .update({ passage_id: passageId })
      .eq('test_number', 7)
      .eq('question_number', qNum);

    if (error) {
      console.error(`  ❌ Error updating Q${qNum}:`, error);
    } else {
      console.log(`  ✓ Q${qNum} → Passage ${range.passage}`);
    }
  }
}

console.log('\n✅ All Science passage linkages fixed!\n');
