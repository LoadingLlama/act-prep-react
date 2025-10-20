#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fetchLesson(subject, lessonKey) {
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', subject)
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log(`❌ Lesson not found`);
    return;
  }

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  console.log(`\n✅ ${lesson.title}`);
  console.log(`Length: ${contents[0].content.length} chars\n`);

  const outputPath = path.join(__dirname, 'lesson-analysis', `${lessonKey}_CURRENT.html`);
  fs.writeFileSync(outputPath, contents[0].content);
  console.log(`Saved to: ${outputPath}\n`);
}

const [subject, lessonKey] = process.argv.slice(2);
if (!subject || !lessonKey) {
  console.log('Usage: node fetch-specific-lesson.mjs <subject> <lessonKey>');
  process.exit(1);
}

fetchLesson(subject, lessonKey).catch(console.error);
