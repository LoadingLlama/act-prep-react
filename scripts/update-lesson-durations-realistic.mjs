#!/usr/bin/env node
/**
 * Update Lesson Durations with REALISTIC learning time estimates
 * Accounts for: comprehension reading, examples, practice questions, diagrams, note-taking
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
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Strip HTML and count words
 */
function countWords(text) {
  if (!text) return 0;
  const stripped = text.replace(/<[^>]*>/g, ' ');
  return stripped.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Analyze content_json and calculate REALISTIC learning time
 */
function calculateRealisticDuration(contentJson) {
  if (!contentJson || !contentJson.content) return { minutes: 5, breakdown: 'No content' };

  let totalMinutes = 0;
  let breakdown = [];

  // Count different content types
  let wordCount = 0;
  let exampleCount = 0;
  let practiceQuestionCount = 0;
  let diagramCount = 0;

  for (const block of contentJson.content) {
    if (block.type === 'text' && block.text) {
      wordCount += countWords(block.text);
    }
    else if (block.type === 'section' && block.title) {
      wordCount += countWords(block.title);
    }
    else if (block.type === 'example') {
      exampleCount++;
      // Count words in example too
      if (block.problem_text) wordCount += countWords(block.problem_text);
      if (block.choices) {
        block.choices.forEach(c => wordCount += countWords(c.text || ''));
      }
      if (block.answer_explanation) wordCount += countWords(block.answer_explanation);
    }
    else if (block.type === 'practice' && block.questions) {
      practiceQuestionCount += block.questions.length;
      // Count words in practice questions
      block.questions.forEach(q => {
        wordCount += countWords(q.question_text || '');
        if (q.choices) {
          q.choices.forEach(c => wordCount += countWords(c.text || ''));
        }
      });
    }
    else if (block.type === 'diagram' || block.diagram_svg) {
      diagramCount++;
    }
  }

  // REALISTIC TIME CALCULATION BASED ON WORD COUNT RANGES:

  // Base time from word count ranges
  let baseMinutes;
  if (wordCount < 600) {
    baseMinutes = 15;
  } else if (wordCount < 1000) {
    baseMinutes = 15; // 600-999 words
  } else if (wordCount < 1200) {
    baseMinutes = 20; // 1000-1199 words
  } else if (wordCount < 1400) {
    baseMinutes = 25; // 1200-1399 words
  } else if (wordCount < 2000) {
    baseMinutes = 30; // 1400-1999 words
  } else if (wordCount < 2500) {
    baseMinutes = 35; // 2000-2499 words
  } else {
    baseMinutes = 40; // 2500+ words
  }

  totalMinutes = baseMinutes;
  breakdown.push(`${baseMinutes} min base (${wordCount.toLocaleString()} words)`);

  // Add time for interactive examples (users work through them)
  if (exampleCount > 0) {
    const exampleMinutes = Math.round(exampleCount * 2); // 2 min per example
    totalMinutes += exampleMinutes;
    breakdown.push(`+${exampleMinutes} min for ${exampleCount} example${exampleCount > 1 ? 's' : ''}`);
  }

  // Add time for practice questions (users solve them)
  if (practiceQuestionCount > 0) {
    const practiceMinutes = Math.round(practiceQuestionCount * 1.5); // 1.5 min per question
    totalMinutes += practiceMinutes;
    breakdown.push(`+${practiceMinutes} min for ${practiceQuestionCount} question${practiceQuestionCount > 1 ? 's' : ''}`);
  }

  // Add time for diagrams
  if (diagramCount > 0) {
    const diagramMinutes = diagramCount * 1; // 1 min per diagram
    totalMinutes += diagramMinutes;
    breakdown.push(`+${diagramMinutes} min for ${diagramCount} diagram${diagramCount > 1 ? 's' : ''}`);
  }

  // Round to nearest 5 minutes for cleaner estimates
  totalMinutes = Math.round(totalMinutes / 5) * 5;

  return {
    minutes: totalMinutes,
    breakdown: breakdown.join(', ')
  };
}

/**
 * Main function
 */
async function main() {
  console.log('📚 Fetching all lessons...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log(`✅ Found ${lessons.length} lessons\n`);
  console.log('⏱️  Calculating REALISTIC learning durations...\n');

  let successCount = 0;

  for (const lesson of lessons) {
    let result;

    if (lesson.content_json) {
      result = calculateRealisticDuration(lesson.content_json);
    } else {
      // Fallback for lessons without content_json
      const wordCount = countWords(lesson.content || '');

      // Word count based duration ranges
      let minutes;
      if (wordCount < 600) {
        minutes = 15; // Short lessons
      } else if (wordCount < 1000) {
        minutes = 15; // 600-999 words
      } else if (wordCount < 1200) {
        minutes = 20; // 1000-1199 words
      } else if (wordCount < 1400) {
        minutes = 25; // 1200-1399 words
      } else if (wordCount < 2000) {
        minutes = 30; // 1400-1999 words
      } else if (wordCount < 2500) {
        minutes = 35; // 2000-2499 words
      } else {
        minutes = 40; // 2500+ words
      }

      result = { minutes, breakdown: `${wordCount} words, ${minutes} min based on length` };
    }

    // Apply minimums for introduction lessons only
    const isIntro = lesson.lesson_key.includes('intro') || lesson.lesson_key === 'getting-started';
    if (isIntro && result.minutes < 15) {
      result.minutes = 15;
    }

    const newDuration = `${result.minutes} min`;
    const oldDuration = lesson.duration || 'unknown';

    console.log(`📖 ${lesson.lesson_key}`);
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Old: ${oldDuration} → New: ${newDuration}`);
    console.log(`   Breakdown: ${result.breakdown}`);

    const { error: updateError } = await supabase
      .from('lessons')
      .update({ duration: newDuration })
      .eq('id', lesson.id);

    if (updateError) {
      console.log(`   ❌ Failed: ${updateError.message}`);
    } else {
      console.log(`   ✅ Updated`);
      successCount++;
    }
    console.log('');
  }

  console.log('\n📊 Final Results:');
  console.log(`   ✅ Successfully updated: ${successCount} lessons`);
  console.log('\n🎉 Realistic duration update complete!\n');
}

main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
