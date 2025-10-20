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

async function checkLessonCount() {
  try {
    // Get all lessons with content
    const { data: lessons, error } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title, subject')
      .order('lesson_key');

    if (error) throw error;

    console.log(`\n📊 Total lessons in database: ${lessons.length}`);
    console.log('\nLessons by subject:');

    const bySubject = {};
    lessons.forEach(lesson => {
      bySubject[lesson.subject] = (bySubject[lesson.subject] || 0) + 1;
    });

    Object.entries(bySubject).forEach(([subject, count]) => {
      console.log(`  ${subject}: ${count}`);
    });

    // Check which ones have actual content
    let withContent = 0;
    for (const lesson of lessons) {
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id)
        .limit(1);

      if (sections && sections.length > 0) {
        withContent++;
      }
    }

    console.log(`\n✅ Lessons with content: ${withContent}`);
    console.log(`⏸️  Lessons without content: ${lessons.length - withContent}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkLessonCount();
