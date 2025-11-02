#!/usr/bin/env node
/**
 * Add duration column and update all lesson reading times
 * Step 1: Add duration column to lessons table
 * Step 2: Calculate and populate accurate reading times
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Strip HTML tags and count words
 */
function countWords(text) {
  if (!text) return 0;
  const strippedText = text.replace(/<[^>]*>/g, ' ');
  const words = strippedText.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Count words in content_json blocks
 */
function countWordsInContentJson(contentJson) {
  if (!contentJson || !contentJson.content) return 0;

  let totalWords = 0;

  for (const block of contentJson.content) {
    if (block.type === 'text' && block.text) {
      totalWords += countWords(block.text);
    } else if (block.type === 'section' && block.title) {
      totalWords += countWords(block.title);
    } else if (block.type === 'example' && block.problem_text) {
      totalWords += countWords(block.problem_text);
      if (block.choices && Array.isArray(block.choices)) {
        for (const choice of block.choices) {
          totalWords += countWords(choice.text || '');
        }
      }
      if (block.answer_explanation) {
        totalWords += countWords(block.answer_explanation);
      }
    } else if (block.type === 'practice' && block.questions) {
      for (const question of block.questions) {
        totalWords += countWords(question.question_text || '');
        if (question.choices) {
          for (const choice of question.choices) {
            totalWords += countWords(choice.text || '');
          }
        }
      }
    }
  }

  return totalWords;
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(wordCount) {
  const WORDS_PER_MINUTE = 200;
  if (wordCount === 0) return '1 min';
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

async function main() {
  console.log('🚀 Step 1: Adding duration column to lessons table...\n');

  // Add duration column using raw SQL
  const { data: addColumnData, error: addColumnError } = await supabase.rpc('exec_sql', {
    sql: 'ALTER TABLE lessons ADD COLUMN IF NOT EXISTS duration TEXT;'
  });

  if (addColumnError) {
    console.log('Note: Could not add column via RPC (this is expected)');
    console.log('Please run this SQL in Supabase SQL Editor:\n');
    console.log('ALTER TABLE lessons ADD COLUMN IF NOT EXISTS duration TEXT;\n');
    console.log('Then run this script again.\n');
    console.log('Or continuing anyway to see if column already exists...\n');
  } else {
    console.log('✅ Duration column added successfully\n');
  }

  console.log('🚀 Step 2: Fetching all lessons...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error fetching lessons:', error);
    process.exit(1);
  }

  console.log(`✅ Found ${lessons.length} lessons\n`);
  console.log('📊 Calculating and updating reading times...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const lesson of lessons) {
    let wordCount = 0;

    if (lesson.content_json) {
      wordCount = countWordsInContentJson(lesson.content_json);
    } else if (lesson.content) {
      wordCount = countWords(lesson.content);
    }

    const newReadingTime = calculateReadingTime(wordCount);

    console.log(`📖 ${lesson.lesson_key}`);
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Words: ${wordCount.toLocaleString()}`);
    console.log(`   Reading Time: ${newReadingTime}`);

    const { error: updateError } = await supabase
      .from('lessons')
      .update({ duration: newReadingTime })
      .eq('id', lesson.id);

    if (updateError) {
      console.log(`   ❌ Failed: ${updateError.message}`);
      errorCount++;
    } else {
      console.log(`   ✅ Updated successfully`);
      successCount++;
    }
    console.log('');
  }

  console.log('\n📊 Final Results:');
  console.log(`   ✅ Successfully updated: ${successCount} lessons`);
  if (errorCount > 0) {
    console.log(`   ❌ Failed: ${errorCount} lessons`);
  }
  console.log('\n🎉 Reading time update complete!\n');
}

main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
