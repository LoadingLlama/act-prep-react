#!/usr/bin/env node
/**
 * Update Lesson Reading Times Script
 * Calculates accurate reading times based on content length
 * Uses 200 words per minute (standard for educational content)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
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

  // Strip HTML tags
  const strippedText = text.replace(/<[^>]*>/g, ' ');

  // Strip extra whitespace and count words
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
      // Count choices
      if (block.choices && Array.isArray(block.choices)) {
        for (const choice of block.choices) {
          totalWords += countWords(choice.text || '');
        }
      }
      // Count explanation
      if (block.answer_explanation) {
        totalWords += countWords(block.answer_explanation);
      }
    } else if (block.type === 'practice' && block.questions) {
      // Count practice questions
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
 * @param {number} wordCount - Total word count
 * @returns {string} - Reading time string like "5 min"
 */
function calculateReadingTime(wordCount) {
  const WORDS_PER_MINUTE = 200; // Educational content reading speed

  if (wordCount === 0) {
    return '1 min'; // Minimum
  }

  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

  return `${minutes} min`;
}

/**
 * Main function to update all lesson reading times
 */
async function updateLessonReadingTimes() {
  console.log('📚 Fetching all lessons from Supabase...\n');

  // Fetch all lessons
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error fetching lessons:', error);
    process.exit(1);
  }

  console.log(`✅ Found ${lessons.length} lessons\n`);
  console.log('📊 Calculating reading times...\n');

  const updates = [];

  for (const lesson of lessons) {
    let wordCount = 0;

    // Count words from content_json (preferred)
    if (lesson.content_json) {
      wordCount = countWordsInContentJson(lesson.content_json);
    }
    // Fallback to content field
    else if (lesson.content) {
      wordCount = countWords(lesson.content);
    }

    const newReadingTime = calculateReadingTime(wordCount);
    const oldReadingTime = lesson.duration || 'unknown';

    console.log(`📖 ${lesson.lesson_key}`);
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Words: ${wordCount.toLocaleString()}`);
    console.log(`   Old: ${oldReadingTime} → New: ${newReadingTime}`);

    if (oldReadingTime !== newReadingTime) {
      console.log(`   ✏️  Will update`);
      updates.push({
        lesson_key: lesson.lesson_key,
        id: lesson.id,
        old_duration: oldReadingTime,
        new_duration: newReadingTime,
        word_count: wordCount
      });
    } else {
      console.log(`   ✓ No change needed`);
    }
    console.log('');
  }

  // Confirm before updating
  if (updates.length === 0) {
    console.log('✅ All reading times are already accurate!\n');
    return;
  }

  console.log(`\n📝 Summary: ${updates.length} lessons need updating\n`);
  console.log('🔄 Updating lessons in database...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    const { error } = await supabase
      .from('lessons')
      .update({ duration: update.new_duration })
      .eq('id', update.id);

    if (error) {
      console.error(`❌ Failed to update ${update.lesson_key}:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Updated ${update.lesson_key}: ${update.old_duration} → ${update.new_duration}`);
      successCount++;
    }
  }

  console.log('\n📊 Final Results:');
  console.log(`   ✅ Successfully updated: ${successCount} lessons`);
  if (errorCount > 0) {
    console.log(`   ❌ Failed: ${errorCount} lessons`);
  }
  console.log('\n🎉 Reading time update complete!\n');
}

// Run the script
updateLessonReadingTimes().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
