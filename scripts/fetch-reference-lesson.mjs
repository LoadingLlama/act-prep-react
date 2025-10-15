#!/usr/bin/env node

/**
 * Fetch Reference Lesson (1.1 Math) for Styling Analysis
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📚 Fetching Reference Lesson 1.1 (Math)...\n');

async function fetchReferenceLesson() {
  // Try multiple possible lesson keys for 1.1
  const possibleKeys = ['1.1', 'math-1.1', 'substitution', '1-1'];

  let lesson = null;
  let usedKey = null;

  for (const key of possibleKeys) {
    console.log(`🔍 Trying lesson_key: "${key}"...`);

    const { data: metadata, error } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('lesson_key', key)
      .single();

    if (!error && metadata) {
      lesson = metadata;
      usedKey = key;
      console.log(`✅ Found lesson with key: "${key}"\n`);
      break;
    }
  }

  if (!lesson) {
    console.log('❌ Could not find lesson 1.1. Fetching first math lesson...\n');

    const { data: firstMath } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', 'math')
      .order('order_index', { ascending: true })
      .limit(1)
      .single();

    if (firstMath) {
      lesson = firstMath;
      usedKey = firstMath.lesson_key;
      console.log(`✅ Using first math lesson: "${firstMath.title}"\n`);
    } else {
      console.error('❌ No math lessons found in database');
      return;
    }
  }

  // Fetch sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index', { ascending: true });

  console.log(`📋 Lesson Metadata:`);
  console.log(`   ID: ${lesson.id}`);
  console.log(`   Key: ${lesson.lesson_key}`);
  console.log(`   Title: ${lesson.title}`);
  console.log(`   Subject: ${lesson.subject}`);
  console.log(`   Category: ${lesson.category}`);
  console.log(`   Sections: ${sections.length}\n`);

  // Fetch content for all sections
  let fullHTML = '';

  for (const section of sections) {
    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index', { ascending: true });

    console.log(`📝 Section: "${section.title}" (${content.length} content blocks)`);

    const sectionHTML = content.map(c => c.content).join('\n');
    fullHTML += `\n<!-- SECTION: ${section.title} -->\n${sectionHTML}\n`;
  }

  // Save to file
  const outputPath = '/Users/cadenchiang/Desktop/act-prep-react/docs/REFERENCE_LESSON_1.1.html';
  fs.writeFileSync(outputPath, fullHTML);

  console.log(`\n✅ Saved reference lesson HTML to: ${outputPath}`);
  console.log(`📊 Total HTML length: ${fullHTML.length} characters\n`);

  // Save metadata as JSON
  const metadataPath = '/Users/cadenchiang/Desktop/act-prep-react/docs/REFERENCE_LESSON_METADATA.json';
  fs.writeFileSync(metadataPath, JSON.stringify({
    metadata: lesson,
    sections: sections.map(s => ({
      id: s.id,
      title: s.title,
      section_type: s.section_type,
      order_index: s.order_index
    }))
  }, null, 2));

  console.log(`✅ Saved metadata to: ${metadataPath}\n`);

  return { lesson, sections, fullHTML };
}

fetchReferenceLesson()
  .then(() => {
    console.log('✅ Reference lesson analysis complete!');
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });
