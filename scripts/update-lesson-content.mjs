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

async function updateLessonContent(subject, lessonKey, newContent) {
  // Get lesson
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', subject)
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log(`❌ Lesson not found: ${subject} - ${lessonKey}`);
    return false;
  }

  // Get section
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  if (!sections || sections.length === 0) {
    console.log(`❌ No sections found`);
    return false;
  }

  // Get content
  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  if (!contents || contents.length === 0) {
    console.log(`❌ No content found`);
    return false;
  }

  // Update content
  const { error } = await supabase
    .from('lesson_section_content')
    .update({ content: newContent })
    .eq('id', contents[0].id);

  if (error) {
    console.log(`❌ Update failed:`, error);
    return false;
  }

  console.log(`✅ Updated: ${lesson.title}`);
  return true;
}

async function main() {
  const newContent = fs.readFileSync(
    path.join(__dirname, 'lesson-analysis/finding-correct-answer_FINAL.html'),
    'utf8'
  );

  await updateLessonContent('reading', 'finding-correct-answer', newContent);
}

main().catch(console.error);
