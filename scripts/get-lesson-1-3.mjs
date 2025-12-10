#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getLessonContent() {
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
  console.log('\nContent:');
  console.log(JSON.stringify(data.content, null, 2));
}

getLessonContent().then(() => process.exit(0));
