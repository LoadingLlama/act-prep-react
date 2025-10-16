#!/usr/bin/env node

/**
 * Upload Rewritten Chapter 1 (Sentence Structure) to Supabase
 * Replaces existing content with new Math 1.1-style version
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📚 Uploading Chapter 1 Rewrite to Supabase...\n');

// Read the rewritten content
const contentPath = '/Users/cadenchiang/Desktop/act-prep-react/docs/CHAPTER_1_REWRITE.html';
const fullContent = fs.readFileSync(contentPath, 'utf-8');

console.log(`📄 Content loaded: ${fullContent.length} characters\n`);

async function uploadChapter1() {
  // 1. Find the sentence-structure lesson
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .eq('subject', 'english')
    .single();

  if (lessonError || !lesson) {
    console.error('❌ Could not find sentence-structure lesson:', lessonError);
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

  const mainSection = sections[0]; // Use first section
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

  // 4. Break content into chunks (~1,500-2,000 characters)
  // Split at natural boundaries (after </h3>, </h4>, </ul>, etc.)
  const chunks = [];
  const maxChunkSize = 2000;
  const minChunkSize = 1500;

  // Strategy: Split after major sections
  const splitPoints = [
    fullContent.indexOf('<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. The 5 Rules'),
    fullContent.indexOf('<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Common Mistakes'),
    fullContent.indexOf('<h3 style="color: #2e7d32;')
  ];

  let lastIndex = 0;
  for (let i = 0; i < splitPoints.length; i++) {
    if (splitPoints[i] > 0) {
      chunks.push(fullContent.substring(lastIndex, splitPoints[i]));
      lastIndex = splitPoints[i];
    }
  }
  chunks.push(fullContent.substring(lastIndex)); // Last chunk

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

  console.log('\n🎉 Chapter 1 successfully uploaded to Supabase!');
  console.log(`   Lesson: ${lesson.title}`);
  console.log(`   Content blocks: ${chunks.length}`);
  console.log(`   Total characters: ${fullContent.length}\n`);
}

uploadChapter1();
