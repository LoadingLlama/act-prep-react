#!/usr/bin/env node

/**
 * Check for existing English lessons in database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 Checking for English lessons in database...\n');

async function checkEnglishLessons() {
  const { data: englishLessons, error } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title, category, order_index')
    .eq('subject', 'english')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  if (!englishLessons || englishLessons.length === 0) {
    console.log('❌ No English lessons found in database\n');
    console.log('We need to extract and format them from the PrepPros textbook.');
    return;
  }

  console.log(`✅ Found ${englishLessons.length} English lessons:\n`);
  englishLessons.forEach((lesson, i) => {
    console.log(`${i + 1}. [${lesson.lesson_key}] ${lesson.title}`);
    console.log(`   Category: ${lesson.category}`);
  });
}

checkEnglishLessons();
