#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 Checking lessons table...\n');

// Check all lessons
const { data: allLessons, error } = await supabase
  .from('lessons')
  .select('*')
  .order('subject', { ascending: true })
  .order('lesson_key', { ascending: true });

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log(`Total lessons: ${allLessons?.length || 0}\n`);

if (allLessons && allLessons.length > 0) {
  // Group by subject
  const bySubject = {};
  allLessons.forEach(lesson => {
    if (!bySubject[lesson.subject]) {
      bySubject[lesson.subject] = [];
    }
    bySubject[lesson.subject].push(lesson);
  });

  Object.entries(bySubject).forEach(([subject, lessons]) => {
    console.log(`\n═══ ${subject} (${lessons.length} lessons) ═══`);
    lessons.slice(0, 5).forEach(lesson => {
      console.log(`  [${lesson.id}] ${lesson.lesson_key}: ${lesson.title}`);
    });
    if (lessons.length > 5) {
      console.log(`  ... and ${lessons.length - 5} more`);
    }
  });
} else {
  console.log('⚠️  No lessons found in database!');
  console.log('📝 We need to populate the lessons table first.');
}

console.log('\n✅ Done');
