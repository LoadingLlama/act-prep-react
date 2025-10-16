#!/usr/bin/env node

/**
 * Upload Rewritten Lesson to Supabase
 * Generic script for uploading any rewritten lesson
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonKey = process.argv[2];
const contentPath = process.argv[3];

if (!lessonKey || !contentPath) {
  console.error('❌ Please provide lesson key and content path');
  console.log('Usage: node upload-lesson.mjs <lesson-key> <content-path>');
  process.exit(1);
}

console.log(`📚 Uploading ${lessonKey} to Supabase...\n`);

// Read the rewritten content
const fullContent = fs.readFileSync(contentPath, 'utf-8');
console.log(`📄 Content loaded: ${fullContent.length} characters\n`);

async function uploadLesson() {
  // 1. Find the lesson
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', lessonKey)
    .eq('subject', 'english')
    .single();

  if (lessonError || !lesson) {
    console.error('❌ Could not find lesson:', lessonError);
    return;
  }

  console.log(`✅ Found lesson: ${lesson.title}`);
  console.log(`   ID: ${lesson.id}\n`);

  // 2. Find the lesson section
  const { data: sections, error: sectionError } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index', { ascending: true });

  if (sectionError || !sections || sections.length === 0) {
    console.error('❌ Could not find sections:', sectionError);
    return;
  }

  const mainSection = sections[0];
  console.log(`✅ Found section: ${mainSection.title}`);
  console.log(`   Section ID: ${mainSection.id}\n`);

  // 3. Delete old content blocks
  const { error: deleteError } = await supabase
    .from('section_content')
    .delete()
    .eq('section_id', mainSection.id);

  if (deleteError) {
    console.error('❌ Error deleting old content:', deleteError);
    return;
  }

  console.log('✅ Deleted old content blocks\n');

  // 4. Split content into chunks (~2000 characters)
  // Strategy: Split after major sections (<h3> tags)
  const chunks = [];
  const h3Regex = /<h3[^>]*>/g;
  let matches = [];
  let match;

  while ((match = h3Regex.exec(fullContent)) !== null) {
    matches.push(match.index);
  }

  if (matches.length === 0) {
    // No h3 tags, just use the whole content
    chunks.push(fullContent);
  } else {
    // Split at h3 boundaries
    let lastIndex = 0;
    for (let i = 1; i < matches.length; i++) {
      chunks.push(fullContent.substring(lastIndex, matches[i]));
      lastIndex = matches[i];
    }
    chunks.push(fullContent.substring(lastIndex));
  }

  console.log(`📦 Split into ${chunks.length} content blocks:\n`);
  chunks.forEach((chunk, i) => {
    console.log(`   Block ${i + 1}: ${chunk.length} characters`);
  });
  console.log('');

  // 5. Insert new content blocks
  for (let i = 0; i < chunks.length; i++) {
    const { error: insertError } = await supabase
      .from('section_content')
      .insert({
        section_id: mainSection.id,
        content_type: 'text',
        content: chunks[i],
        order_index: i
      });

    if (insertError) {
      console.error(`❌ Error inserting block ${i + 1}:`, insertError);
      return;
    }

    console.log(`✅ Inserted block ${i + 1}/${chunks.length}`);
  }

  console.log(`\n🎉 ${lesson.title} successfully uploaded!`);
  console.log(`   Content blocks: ${chunks.length}`);
  console.log(`   Total characters: ${fullContent.length}\n`);
}

uploadLesson();
