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

async function fetchLesson(subject, lessonKey, outputName) {
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', subject)
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log(`❌ Lesson not found: ${subject} - ${lessonKey}`);
    return;
  }

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  if (!sections || sections.length === 0) {
    console.log(`❌ No sections for: ${lesson.title}`);
    return;
  }

  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  if (!contents || contents.length === 0) {
    console.log(`❌ No content for: ${lesson.title}`);
    return;
  }

  const outputPath = path.join(__dirname, 'lesson-analysis', `${outputName}_CURRENT.html`);
  fs.writeFileSync(outputPath, contents[0].content);

  console.log(`✅ Saved: ${outputPath}`);
  console.log(`   Title: ${lesson.title}`);
  console.log(`   Length: ${contents[0].content.length} chars\n`);
}

async function main() {
  console.log('\n📥 Fetching current lesson samples...\n');

  // Fetch one from each subject
  await fetchLesson('reading', 'core-principles', 'reading-core-principles');
  await fetchLesson('science', 'passage-approach', 'science-passage-approach');
  await fetchLesson('english', 'commas', 'english-commas');

  console.log('✅ All samples fetched\n');
}

main().catch(console.error);
