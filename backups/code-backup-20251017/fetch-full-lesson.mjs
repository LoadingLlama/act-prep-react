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

async function fetchFullLesson() {
  // Fetch backsolving lesson
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id, title')
    .eq('lesson_key', 'backsolving')
    .single();

  console.log('Lesson:', lesson.title);

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id, title')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  console.log('Sections:', sections.map(s => s.title));

  const { data: content } = await supabase
    .from('section_content')
    .select('content, section_id')
    .eq('section_id', sections[0].id)
    .order('order_index');

  const fullContent = content[0].content;

  fs.writeFileSync('/tmp/backsolving-full.html', fullContent);
  console.log('\n✅ Saved to /tmp/backsolving-full.html');
  console.log(`Length: ${fullContent.length} chars\n`);

  // Check for specific content
  console.log('Contains "Example 1":', fullContent.includes('Example 1'));
  console.log('Contains "Basic Backsolving":', fullContent.includes('Basic Backsolving'));
  console.log('Contains "√x + 10":', fullContent.includes('√x + 10'));

  // Show first 2000 chars
  console.log('\n--- First 2000 chars ---');
  console.log(fullContent.substring(0, 2000));
}

fetchFullLesson();
