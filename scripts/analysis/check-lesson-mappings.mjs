#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 Checking lesson mappings...');

const [englishData, mathData, readingData, scienceData, lessons] = await Promise.all([
  supabase.from('act_english_questions').select('lesson_id, test_number').in('test_number', [1, 2]),
  supabase.from('act_math_questions').select('lesson_id, test_number').in('test_number', [1, 2]),
  supabase.from('act_reading_questions').select('lesson_id, test_number').in('test_number', [1, 2]),
  supabase.from('act_science_questions').select('lesson_id, test_number').in('test_number', [1, 2]),
  supabase.from('lessons').select('*')
]);

const lessonMap = {};
lessons.data?.forEach(lesson => {
  lessonMap[lesson.id] = lesson.title;
});

const sections = [
  { name: 'English', questions: englishData.data },
  { name: 'Math', questions: mathData.data },
  { name: 'Reading', questions: readingData.data },
  { name: 'Science', questions: scienceData.data }
];

const lessonDistribution = {};

sections.forEach(section => {
  lessonDistribution[section.name] = {};

  section.questions?.forEach(q => {
    if (q.lesson_id && lessonMap[q.lesson_id]) {
      const lessonTitle = lessonMap[q.lesson_id];
      lessonDistribution[section.name][lessonTitle] = (lessonDistribution[section.name][lessonTitle] || 0) + 1;
    }
  });
});

console.log('✅ Lesson distribution ready');
console.log(JSON.stringify(lessonDistribution, null, 2));