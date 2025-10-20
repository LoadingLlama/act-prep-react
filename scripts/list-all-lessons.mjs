#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, subject, lesson_key, title')
    .order('subject, lesson_key');

  console.log('\n=== ALL LESSONS ===\n');

  let currentSubject = '';
  lessons.forEach(lesson => {
    if (lesson.subject !== currentSubject) {
      currentSubject = lesson.subject;
      console.log(`\n${currentSubject.toUpperCase()}:`);
    }
    console.log(`  ${lesson.lesson_key} - ${lesson.title}`);
  });

  console.log(`\nTotal: ${lessons.length} lessons\n`);
}

main().catch(console.error);
