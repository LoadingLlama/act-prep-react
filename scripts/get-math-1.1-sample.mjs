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

async function getMath11() {
  // Get Math 1.1 lesson
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', 'math')
    .eq('lesson_key', 'backsolving')
    .single();

  if (lessonError || !lesson) {
    console.log('Lesson not found, trying alternative query...');

    const { data: lessons } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', 'math')
      .ilike('title', '%backsolv%');

    console.log('Found lessons:', lessons);
    return;
  }

  console.log('Found lesson:', lesson.title);

  // Get sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  if (!sections || sections.length === 0) {
    console.log('No sections found');
    return;
  }

  // Get content
  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id)
    .order('order_index');

  if (!contents || contents.length === 0) {
    console.log('No content found');
    return;
  }

  // Save to file
  const outputPath = path.join(__dirname, 'lesson-analysis', 'MATH_1.1_REFERENCE.html');
  fs.writeFileSync(outputPath, contents[0].content);

  console.log(`✅ Saved Math 1.1 to: ${outputPath}`);
}

getMath11().catch(console.error);
