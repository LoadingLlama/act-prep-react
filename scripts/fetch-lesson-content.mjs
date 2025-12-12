#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonKey = process.argv[2];

if (!lessonKey) {
  console.error('Usage: node fetch-lesson-content.mjs <lesson_key>');
  process.exit(1);
}

async function fetchLesson() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  if (!data) {
    console.log(`No lesson found with key: ${lessonKey}`);
    return;
  }

  console.log(`✓ Found lesson: ${data.title}`);
  console.log(`  Reading time: ${data.reading_time} min`);
  console.log(`  Lesson key: ${data.lesson_key}`);

  // Save to file
  const filename = `/Users/cadenchiang/Desktop/act-prep-react/lesson-content-${lessonKey}.txt`;
  fs.writeFileSync(filename, data.content, 'utf8');

  console.log(`\n✅ Content saved to: lesson-content-${lessonKey}.txt`);
}

fetchLesson().then(() => process.exit(0));
