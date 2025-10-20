#!/usr/bin/env node

/**
 * TEST Script: Convert Blocky Paragraphs to Bullet Lists
 *
 * Tests conversion on a SINGLE lesson before applying to all lessons.
 * Converts Reading/Science blocky text to scannable bullet-based format.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Convert blocky paragraphs to bullet lists
 */
function convertBlockyTextToBullets(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  console.log('\n📊 CONVERSION ANALYSIS:');
  console.log('='.repeat(60));

  // Find all paragraphs
  const allParags = $('p').toArray();
  console.log(`\nTotal paragraphs found: ${allParags.length}`);

  let converted = 0;
  let skipped = 0;

  $('p').each((i, el) => {
    const $p = $(el);
    const text = $p.text().trim();
    const html = $p.html() || '';

    // Skip if empty, too short, or has special styling
    if (text.length < 50) {
      skipped++;
      return;
    }

    // Skip Key Takeaways, examples, answer choices
    const prevH3 = $p.prevAll('h3').first().text().toLowerCase();
    if (prevH3.includes('key takeaway') ||
        html.includes('Example:') ||
        html.includes('Solution:') ||
        html.includes('Times New Roman')) {
      skipped++;
      return;
    }

    // PATTERN 1: Numbered items in paragraph (1), (2), (3) or (1) ... (2) ... (3)
    const hasNumberedItems = text.match(/\(1\)[^(]*\(2\)[^(]*\(3\)/) ||
                             text.match(/\(\d+\)\s+[A-Z]/g);

    // PATTERN 2: Multiple sentences with semicolons separating distinct points
    const hasMultipleSemicolons = (text.match(/;/g) || []).length >= 2;

    // PATTERN 3: Sequential indicators (first... then... next... finally)
    const hasSequentialWords = /\b(first,|second,|third,|then,|next,|finally,|additionally,)/i.test(text);

    // PATTERN 4: List indicators "include:", "are:", followed by multiple items
    const hasListIndicators = /((include|are|types are|methods are|strategies are|steps are|principles are):)/i.test(text) &&
                               text.length > 150;

    // PATTERN 5: Very long paragraphs (>200 words) under H4 subsections
    const wordCount = text.split(/\s+/).length;
    const isUnderH4 = $p.prevAll('h4').length > 0 && $p.prevAll('h3').length > 0;
    const isLongUnderH4 = wordCount > 200 && isUnderH4;

    if (hasNumberedItems || hasMultipleSemicolons || hasSequentialWords || hasListIndicators || isLongUnderH4) {
      console.log(`\n🔄 Converting paragraph ${i + 1}:`);
      console.log(`  Words: ${wordCount}`);
      console.log(`  Pattern: ${hasNumberedItems ? 'Numbered' : hasSequentialWords ? 'Sequential' : hasListIndicators ? 'List' : isLongUnderH4 ? 'Long under H4' : 'Multiple semicolons'}`);
      console.log(`  Preview: ${text.substring(0, 80)}...`);

      // Convert to bullet list
      const bullets = convertParagraphToBullets(text, $);

      if (bullets.length > 0) {
        // Create intro paragraph from first sentence if appropriate
        const sentences = text.split(/\. /);
        const firstSentence = sentences[0] + (sentences[0].endsWith('.') ? '' : '.');

        // Check if first sentence is a good intro (short and sets up what follows)
        const shouldHaveIntro = firstSentence.length < 150 &&
                                (firstSentence.includes(':') ||
                                 /\b(following|these|include)\b/i.test(firstSentence));

        if (shouldHaveIntro) {
          const $intro = $('<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"></p>');
          $intro.html(firstSentence);
          $p.before($intro);
        }

        // Create bullet list
        const $ul = $('<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"></ul>');
        bullets.forEach(bullet => {
          const $li = $('<li style="margin: 0.15rem 0;"></li>');
          $li.html(bullet);
          $ul.append($li);
        });

        // Replace paragraph with bullet list (and maybe intro)
        $p.replaceWith($ul);
        converted++;
      } else {
        skipped++;
      }
    } else {
      skipped++;
    }
  });

  console.log(`\n📈 RESULTS:`);
  console.log(`  ✅ Converted: ${converted} paragraphs`);
  console.log(`  ⏭️  Skipped: ${skipped} paragraphs`);
  console.log('='.repeat(60));

  return $.html();
}

/**
 * Convert a single paragraph to bullet points
 */
function convertParagraphToBullets(text, $) {
  const bullets = [];

  // Strategy 1: Split by numbered items (1), (2), (3)
  if (text.match(/\(\d+\)/)) {
    const parts = text.split(/\((\d+)\)/).filter(Boolean);
    for (let i = 0; i < parts.length; i += 2) {
      if (i + 1 < parts.length) {
        const content = parts[i + 1].trim();
        if (content.length > 5) {
          bullets.push(content.replace(/^[\s,;:]+/, '').replace(/[,;:]$/, ''));
        }
      }
    }
  }

  // Strategy 2: Split by semicolons if there are distinct points
  else if ((text.match(/;/g) || []).length >= 2) {
    const parts = text.split(/;\s*/);
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.length > 10 && !trimmed.match(/^(e\.g\.|i\.e\.|etc)/)) {
        bullets.push(trimmed.replace(/\.$/, ''));
      }
    });
  }

  // Strategy 3: Split by sequential words
  else if (/\b(first,|second,|third,|then,|next,|finally,)/i.test(text)) {
    const parts = text.split(/\b(First,|Second,|Third,|Then,|Next,|Finally,|Additionally,)/i);
    for (let i = 1; i < parts.length; i += 2) {
      if (i + 1 < parts.length) {
        const marker = parts[i];
        const content = parts[i + 1].trim();
        if (content.length > 10) {
          bullets.push(content.replace(/^[\s,;:]+/, '').replace(/[,;]$/, ''));
        }
      }
    }
  }

  // Strategy 4: For list indicators, split by patterns like "are:", then each sentence
  else if (/((include|are|types are):)/i.test(text)) {
    const afterColon = text.split(/:\s*/)[1];
    if (afterColon) {
      const sentences = afterColon.split(/\.\s+/);
      sentences.forEach(sent => {
        const trimmed = sent.trim();
        if (trimmed.length > 10) {
          bullets.push(trimmed.replace(/\.$/, ''));
        }
      });
    }
  }

  // Strategy 5: For very long paragraphs, split into logical chunks by sentences
  else if (text.split(/\s+/).length > 200) {
    const sentences = text.split(/\.\s+/);
    let currentChunk = '';

    sentences.forEach((sent, idx) => {
      currentChunk += sent + '. ';

      // Create a bullet after 2-3 sentences or at key transition words
      const shouldSplit = (idx > 0 && currentChunk.split(/\s+/).length > 30) ||
                          /\b(However,|Additionally,|Moreover,|Furthermore,|In contrast,|Similarly,)/i.test(sent);

      if (shouldSplit || idx === sentences.length - 1) {
        const trimmed = currentChunk.trim();
        if (trimmed.length > 15) {
          bullets.push(trimmed);
        }
        currentChunk = '';
      }
    });
  }

  return bullets;
}

/**
 * Test on a single lesson
 */
async function testOnLesson(lessonKey) {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║         TEST: Blocky Text → Bullet Conversion       ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log(`\n🎯 Testing on lesson: ${lessonKey}\n`);

  try {
    // Fetch lesson
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError) throw lessonError;

    console.log(`✅ Found: ${lesson.title}`);

    // Get section
    const { data: sections, error: sectionsError } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('order_index');

    if (sectionsError) throw sectionsError;

    // Get content
    const { data: contents, error: contentsError } = await supabase
      .from('lesson_section_content')
      .select('*')
      .eq('section_id', sections[0].id)
      .order('order_index');

    if (contentsError) throw contentsError;

    const originalContent = contents[0].content;

    // Save original
    fs.writeFileSync(
      path.join(__dirname, 'lesson-analysis', `test_${lessonKey}_BEFORE.html`),
      originalContent
    );
    console.log(`\n💾 Saved BEFORE to: test_${lessonKey}_BEFORE.html`);

    // Convert
    const convertedContent = convertBlockyTextToBullets(originalContent);

    // Save converted
    fs.writeFileSync(
      path.join(__dirname, 'lesson-analysis', `test_${lessonKey}_AFTER.html`),
      convertedContent
    );
    console.log(`\n💾 Saved AFTER to: test_${lessonKey}_AFTER.html`);

    console.log(`\n✅ TEST COMPLETE!`);
    console.log(`\n📂 Compare the files:`);
    console.log(`   BEFORE: scripts/lesson-analysis/test_${lessonKey}_BEFORE.html`);
    console.log(`   AFTER:  scripts/lesson-analysis/test_${lessonKey}_AFTER.html`);
    console.log(`\n⚠️  MANUAL VERIFICATION REQUIRED before applying to database!`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
  }
}

// Get lesson key from command line
const lessonKey = process.argv[2] || 'core-principles';

testOnLesson(lessonKey).catch(console.error);
