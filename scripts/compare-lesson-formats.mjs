#!/usr/bin/env node

/**
 * Compare English lesson formatting with Math reference
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📊 Comparing Lesson Formats...\n');

async function fetchFullLesson(lessonKey) {
  // Fetch metadata
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) return null;

  // Fetch sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index', { ascending: true });

  // Fetch content
  let fullHTML = '';
  for (const section of sections) {
    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index', { ascending: true });

    const sectionHTML = content.map(c => c.content).join('\n');
    fullHTML += `\n<!-- SECTION: ${section.title} -->\n${sectionHTML}\n`;
  }

  return { lesson, sections, fullHTML };
}

async function compare() {
  // Fetch Math reference (substitution)
  console.log('🔵 Fetching Math reference lesson (substitution)...');
  const mathLesson = await fetchFullLesson('substitution');

  // Fetch English lesson (sentence-structure)
  console.log('🟢 Fetching English lesson (sentence-structure)...\n');
  const englishLesson = await fetchFullLesson('sentence-structure');

  if (!mathLesson || !englishLesson) {
    console.error('❌ Could not fetch lessons');
    return;
  }

  console.log('📋 MATH LESSON (Reference):');
  console.log(`   Title: ${mathLesson.lesson.title}`);
  console.log(`   Sections: ${mathLesson.sections.length}`);
  console.log(`   Content length: ${mathLesson.fullHTML.length} characters`);
  console.log(`   Difficulty: ${mathLesson.lesson.difficulty_level}`);
  console.log(`   Duration: ${mathLesson.lesson.duration_minutes} min\n`);

  console.log('📋 ENGLISH LESSON:');
  console.log(`   Title: ${englishLesson.lesson.title}`);
  console.log(`   Sections: ${englishLesson.sections.length}`);
  console.log(`   Content length: ${englishLesson.fullHTML.length} characters`);
  console.log(`   Difficulty: ${englishLesson.lesson.difficulty_level}`);
  console.log(`   Duration: ${englishLesson.lesson.duration_minutes} min\n`);

  // Analyze HTML patterns
  console.log('🔍 HTML Pattern Analysis:\n');

  const mathPatterns = {
    hasH2: mathLesson.fullHTML.includes('<h2'),
    hasH3: mathLesson.fullHTML.includes('<h3'),
    hasH4: mathLesson.fullHTML.includes('<h4'),
    hasKeyTakeaways: mathLesson.fullHTML.includes('Key Takeaways'),
    hasTipBoxes: mathLesson.fullHTML.includes('TIP') || mathLesson.fullHTML.includes('tip'),
    hasColoredBoxes: mathLesson.fullHTML.includes('background-color') || mathLesson.fullHTML.includes('background:'),
    hasBulletPoints: mathLesson.fullHTML.includes('<ul') || mathLesson.fullHTML.includes('<li'),
    hasInlineStyles: mathLesson.fullHTML.includes('style="'),
  };

  const englishPatterns = {
    hasH2: englishLesson.fullHTML.includes('<h2'),
    hasH3: englishLesson.fullHTML.includes('<h3'),
    hasH4: englishLesson.fullHTML.includes('<h4'),
    hasKeyTakeaways: englishLesson.fullHTML.includes('Key Takeaways'),
    hasTipBoxes: englishLesson.fullHTML.includes('TIP') || englishLesson.fullHTML.includes('tip'),
    hasColoredBoxes: englishLesson.fullHTML.includes('background-color') || englishLesson.fullHTML.includes('background:'),
    hasBulletPoints: englishLesson.fullHTML.includes('<ul') || englishLesson.fullHTML.includes('<li'),
    hasInlineStyles: englishLesson.fullHTML.includes('style="'),
  };

  console.log('Math Lesson Patterns:');
  Object.entries(mathPatterns).forEach(([key, value]) => {
    const icon = value ? '✅' : '❌';
    console.log(`   ${icon} ${key}: ${value}`);
  });

  console.log('\nEnglish Lesson Patterns:');
  Object.entries(englishPatterns).forEach(([key, value]) => {
    const icon = value ? '✅' : '❌';
    console.log(`   ${icon} ${key}: ${value}`);
  });

  // Check consistency
  console.log('\n📊 Formatting Consistency:');
  const consistent = Object.keys(mathPatterns).every(key => mathPatterns[key] === englishPatterns[key]);
  if (consistent) {
    console.log('   ✅ Formatting appears consistent');
  } else {
    console.log('   ⚠️  Formatting differences detected');
    console.log('\n   Differences:');
    Object.keys(mathPatterns).forEach(key => {
      if (mathPatterns[key] !== englishPatterns[key]) {
        console.log(`      - ${key}: Math=${mathPatterns[key]}, English=${englishPatterns[key]}`);
      }
    });
  }

  // Save samples
  fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/docs/SAMPLE_MATH_LESSON.html', mathLesson.fullHTML);
  fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/docs/SAMPLE_ENGLISH_LESSON.html', englishLesson.fullHTML);

  console.log('\n✅ Saved sample lessons to docs/');
  console.log('   - SAMPLE_MATH_LESSON.html');
  console.log('   - SAMPLE_ENGLISH_LESSON.html\n');
}

compare().catch(err => console.error('❌ Error:', err.message));
