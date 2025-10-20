#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listMathLessons() {
  try {
    // Get all math lessons
    const { data: lessons, error } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('subject', 'math')
      .order('lesson_key');

    if (error) throw error;

    console.log(`\n📊 Total math lessons in database: ${lessons.length}\n`);

    lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.lesson_key} - ${lesson.title}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

listMathLessons();
