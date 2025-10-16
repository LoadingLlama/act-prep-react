#!/usr/bin/env node

/**
 * Direct Lesson Update Script
 * Updates each lesson individually using Supabase client
 */

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🚀 Updating English Lessons Directly...\n');
console.log('⚠️  This will REPLACE all existing English lesson content!\n');

const lessonsDir = '/Users/cadenchiang/Desktop/act-prep-react/docs/preppros-lessons';
const summary = JSON.parse(fs.readFileSync(`${lessonsDir}/SUMMARY.json`, 'utf-8'));

async function updateLesson(result) {
  const htmlPath = `${lessonsDir}/${result.lessonKey}.html`;
  const html = fs.readFileSync(htmlPath, 'utf-8');

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Updating: ${result.title}`);
  console.log(`Lesson Key: ${result.lessonKey}`);
  console.log(`Content: ${result.htmlLength} characters`);
  console.log('='.repeat(60));

  try {
    // Step 1: Delete existing section content
    console.log('  1️⃣  Deleting existing section content...');

    const { data: existingSections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', result.lessonId);

    if (existingSections && existingSections.length > 0) {
      for (const section of existingSections) {
        await supabase
          .from('section_content')
          .delete()
          .eq('section_id', section.id);
      }
      console.log(`     ✓ Deleted content from ${existingSections.length} section(s)`);
    }

    // Step 2: Delete existing sections
    console.log('  2️⃣  Deleting existing sections...');

    const { error: deleteSectionsError } = await supabase
      .from('lesson_sections')
      .delete()
      .eq('lesson_id', result.lessonId);

    if (deleteSectionsError) {
      throw deleteSectionsError;
    }
    console.log('     ✓ Sections deleted');

    // Step 3: Insert new section
    console.log('  3️⃣  Creating new section...');

    const { data: newSection, error: sectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: result.lessonId,
        section_key: `${result.lessonKey}-main`,
        title: 'Main Content',
        section_type: 'content',
        order_index: 0
      })
      .select()
      .single();

    if (sectionError) {
      throw sectionError;
    }
    console.log(`     ✓ Section created: ${newSection.id}`);

    // Step 4: Insert content
    console.log('  4️⃣  Inserting new content...');

    const { error: contentError } = await supabase
      .from('section_content')
      .insert({
        section_id: newSection.id,
        content_type: 'html',
        content: html,
        order_index: 0
      });

    if (contentError) {
      throw contentError;
    }
    console.log(`     ✓ Content inserted (${html.length} chars)`);

    // Step 5: Update lesson metadata timestamp
    console.log('  5️⃣  Updating lesson timestamp...');

    const { error: updateError } = await supabase
      .from('lesson_metadata')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', result.lessonId);

    if (updateError) {
      throw updateError;
    }
    console.log('     ✓ Timestamp updated');

    console.log(`\n  ✅ ${result.title} - UPDATED SUCCESSFULLY`);

    return true;
  } catch (err) {
    console.error(`\n  ❌ ERROR: ${err.message}`);
    console.error(`  Full error:`, err);
    return false;
  }
}

async function updateAllLessons() {
  console.log(`📚 Processing ${summary.results.length} lessons...\n`);

  const results = [];

  for (const result of summary.results) {
    const success = await updateLesson(result);
    results.push({ lessonKey: result.lessonKey, success });

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log(`\n\n${'='.repeat(60)}`);
  console.log('FINAL SUMMARY');
  console.log('='.repeat(60) + '\n');

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log(`\nFailed lessons:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.lessonKey}`);
    });
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('✅ UPDATE COMPLETE!');
  console.log('='.repeat(60) + '\n');
}

updateAllLessons();
