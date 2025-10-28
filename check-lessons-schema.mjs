#!/usr/bin/env node

/**
 * CHECK LESSONS TABLE SCHEMA
 * Investigate the actual schema of the lessons table
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING LESSONS TABLE SCHEMA');
console.log('='.repeat(50));

async function checkLessonsSchema() {
  // Get a sample lesson to see the schema
  const { data: sampleLessons } = await supabase
    .from('lessons')
    .select('*')
    .limit(3);

  console.log('\n📋 SAMPLE LESSONS DATA:');
  if (sampleLessons && sampleLessons.length > 0) {
    console.log('Available fields:');
    Object.keys(sampleLessons[0]).forEach(field => {
      console.log(`  • ${field}`);
    });

    console.log('\nSample records:');
    sampleLessons.forEach((lesson, index) => {
      console.log(`\n  Lesson ${index + 1}:`);
      Object.entries(lesson).forEach(([key, value]) => {
        console.log(`    ${key}: ${value}`);
      });
    });
  } else {
    console.log('No lessons found');
  }

  // Also check if Practice Test lessons already exist
  const { data: practiceTestLessons } = await supabase
    .from('lessons')
    .select('*')
    .like('lesson_key', 'practice-test-%');

  console.log('\n📚 EXISTING PRACTICE TEST LESSONS:');
  if (practiceTestLessons && practiceTestLessons.length > 0) {
    practiceTestLessons.forEach(lesson => {
      console.log(`  • ${lesson.lesson_key}: ${lesson.title} (ID: ${lesson.id})`);
    });
  } else {
    console.log('No practice test lessons found');
  }
}

checkLessonsSchema().catch(console.error);