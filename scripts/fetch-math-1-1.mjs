#!/usr/bin/env node

/**
 * Fetch Math Lesson 1.1 for Style Analysis
 * This will serve as the template for rewriting English lessons
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📚 Fetching Math Lesson 1.1 for Style Analysis...\n');

async function fetchMathLesson() {
  // Try different possible keys for 1.1
  const possibleKeys = ['1.1', 'math-1.1', 'math-1-1'];

  let lesson = null;
  let usedKey = null;

  // Try each key
  for (const key of possibleKeys) {
    const { data, error } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('lesson_key', key)
      .eq('subject', 'math')
      .single();

    if (!error && data) {
      lesson = data;
      usedKey = key;
      break;
    }
  }

  // If not found, get first math lesson
  if (!lesson) {
    console.log('Trying to find first math lesson...\n');
    const { data } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', 'math')
      .order('order_index', { ascending: true })
      .limit(5);

    console.log('Available Math Lessons:');
    data?.forEach((l, i) => {
      console.log(`${i + 1}. [${l.lesson_key}] ${l.title}`);
    });

    if (data && data.length > 0) {
      lesson = data[0];
      usedKey = lesson.lesson_key;
    }
  }

  if (!lesson) {
    console.error('❌ No math lessons found!');
    return;
  }

  console.log(`\n✅ Found: ${lesson.title}`);
  console.log(`   Key: ${lesson.lesson_key}`);
  console.log(`   ID: ${lesson.id}\n`);

  // Fetch sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index', { ascending: true });

  console.log(`📑 Sections: ${sections.length}\n`);

  // Fetch all content
  let fullContent = '';
  for (const section of sections) {
    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index', { ascending: true });

    console.log(`  📄 ${section.title}`);
    console.log(`     Content blocks: ${content.length}`);

    const sectionText = content.map(c => c.content).join('\n\n');
    fullContent += `\n<!-- ========== SECTION: ${section.title} ========== -->\n`;
    fullContent += sectionText + '\n';

    console.log(`     Chars: ${sectionText.length}\n`);
  }

  // Save to file
  const outputPath = '/Users/cadenchiang/Desktop/act-prep-react/docs/MATH_1_1_TEMPLATE.html';
  fs.writeFileSync(outputPath, fullContent);

  console.log(`✅ Saved to: ${outputPath}`);
  console.log(`📊 Total content: ${fullContent.length} characters\n`);

  // Save metadata
  const metadataPath = '/Users/cadenchiang/Desktop/act-prep-react/docs/MATH_1_1_METADATA.json';
  fs.writeFileSync(metadataPath, JSON.stringify({
    lesson,
    sections,
    contentLength: fullContent.length
  }, null, 2));

  console.log(`✅ Saved metadata to: ${metadataPath}\n`);

  return { lesson, sections, fullContent };
}

fetchMathLesson();
