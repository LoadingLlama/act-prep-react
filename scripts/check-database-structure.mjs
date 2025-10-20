#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkStructure() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║        Database Structure & Labeling Check       ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // Get all lessons
  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title, subject, category, order_index')
    .order('subject, order_index');

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`Total lessons: ${lessons.length}\n`);

  // Group by subject
  const bySubject = {};
  lessons.forEach(lesson => {
    if (!bySubject[lesson.subject]) {
      bySubject[lesson.subject] = [];
    }
    bySubject[lesson.subject].push(lesson);
  });

  // Display structure
  Object.entries(bySubject).forEach(([subject, subjectLessons]) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${subject.toUpperCase()} (${subjectLessons.length} lessons)`);
    console.log('='.repeat(60));

    subjectLessons.forEach(lesson => {
      console.log(`\n  lesson_key: ${lesson.lesson_key}`);
      console.log(`  title: ${lesson.title}`);
      console.log(`  category: ${lesson.category || 'N/A'}`);
      console.log(`  order_index: ${lesson.order_index}`);
    });
  });

  console.log('\n\n' + '='.repeat(60));
  console.log('LABELING ISSUES TO CHECK:');
  console.log('='.repeat(60));

  // Check for potential labeling issues
  const issues = [];

  lessons.forEach(lesson => {
    // Check if lesson_key matches title pattern
    const keyWords = lesson.lesson_key.toLowerCase().split('-');
    const titleWords = lesson.title.toLowerCase().split(' ');

    const hasOverlap = keyWords.some(kw => titleWords.some(tw => tw.includes(kw) || kw.includes(tw)));

    if (!hasOverlap) {
      issues.push({
        type: 'KEY_TITLE_MISMATCH',
        lesson_key: lesson.lesson_key,
        title: lesson.title,
        message: 'lesson_key and title seem unrelated'
      });
    }

    // Check if title is too generic
    if (lesson.title.length < 10) {
      issues.push({
        type: 'GENERIC_TITLE',
        lesson_key: lesson.lesson_key,
        title: lesson.title,
        message: 'Title might be too generic/short'
      });
    }
  });

  if (issues.length > 0) {
    console.log(`\n⚠️  Found ${issues.length} potential issues:\n`);
    issues.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.type}]`);
      console.log(`   lesson_key: ${issue.lesson_key}`);
      console.log(`   title: ${issue.title}`);
      console.log(`   → ${issue.message}\n`);
    });
  } else {
    console.log('\n✅ No obvious labeling issues found!');
  }

  console.log('\n');
}

checkStructure();
