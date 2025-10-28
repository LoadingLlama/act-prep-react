#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 LESSON REFERENCE VALIDATION\n');
console.log('='.repeat(80));

// Get all lessons
const { data: lessons } = await supabase.from('lessons').select('id, title, lesson_key, subject');
const lessonIds = new Set(lessons?.map(l => l.id) || []);

console.log('\n✅ Found ' + lessonIds.size + ' valid lessons in database\n');

let invalidRefs = 0;
let totalChecked = 0;

// Check all question lesson_ids
const sections = [
  { table: 'act_english_questions', name: 'English' },
  { table: 'act_math_questions', name: 'Math' },
  { table: 'act_reading_questions', name: 'Reading' },
  { table: 'act_science_questions', name: 'Science' }
];

for (const section of sections) {
  const { data: questions } = await supabase
    .from(section.table)
    .select('test_number, question_number, lesson_id');

  const invalid = questions?.filter(q => !lessonIds.has(q.lesson_id)) || [];
  invalidRefs += invalid.length;
  totalChecked += questions?.length || 0;

  console.log(section.name + ': ' + (questions?.length || 0) + ' questions checked');
  if (invalid.length > 0) {
    console.log('  ❌ Found ' + invalid.length + ' invalid lesson references');
    for (const q of invalid.slice(0, 5)) {
      console.log('    - Test ' + q.test_number + ' Q' + q.question_number + ': ' + q.lesson_id);
    }
  } else {
    console.log('  ✅ All lesson_ids are valid');
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n📊 LESSON REFERENCE SUMMARY:\n');
console.log('Total questions checked: ' + totalChecked);
console.log('Invalid lesson references: ' + invalidRefs);

if (invalidRefs === 0) {
  console.log('\n✅✅✅ PERFECT! ALL LESSON REFERENCES VALID! ✅✅✅');
} else {
  console.log('\n❌ FOUND ' + invalidRefs + ' INVALID REFERENCES');
}

console.log('\n' + '='.repeat(80) + '\n');
