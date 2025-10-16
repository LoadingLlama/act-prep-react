#!/usr/bin/env node

/**
 * List All English Lessons to Rewrite
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📚 Fetching English Lessons...\n');

async function listEnglishLessons() {
  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', 'english')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Found ${lessons.length} English lessons:\n`);

  lessons.forEach((lesson, i) => {
    console.log(`${i + 1}. [${lesson.lesson_key}] ${lesson.title}`);
    console.log(`   Category: ${lesson.category}`);
    console.log(`   Difficulty: ${lesson.difficulty_level}`);
    console.log('');
  });

  console.log('\n📋 Lessons to rewrite (excluding Chapter 1):');
  const remaining = lessons.filter(l => l.lesson_key !== 'sentence-structure');
  remaining.forEach((lesson, i) => {
    console.log(`${i + 1}. ${lesson.title}`);
  });

  console.log(`\n✅ Total remaining: ${remaining.length} lessons\n`);
}

listEnglishLessons();
