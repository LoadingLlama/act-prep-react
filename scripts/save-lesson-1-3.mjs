#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function saveLessonContent() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'punctuation')
    .single();

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('Lesson found:', data.title);

  // Save to file
  fs.writeFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/lesson-1-3-content.txt',
    data.content,
    'utf8'
  );

  console.log('Content saved to lesson-1-3-content.txt');
}

saveLessonContent().then(() => process.exit(0));
