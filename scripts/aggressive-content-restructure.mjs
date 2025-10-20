#!/usr/bin/env node

/**
 * Aggressive Content Restructuring Script
 *
 * Purpose: Completely restructure Reading/Science lessons to be scannable
 *
 * Rules:
 * 1. Max 1-2 sentences per paragraph (break longer paragraphs)
 * 2. Bullets must be SHORT (15-25 words max)
 * 3. Split bloated content into bite-sized chunks
 * 4. Remove redundancy and over-explanation
 * 5. Add visual breathing room
 */

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
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
 * Main restructuring function
 */
function aggressivelyRestructure(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  let stats = {
    paragraphsSplit: 0,
    bulletsSplit: 0,
    verboseItemsFixed: 0
  };

  // STEP 1: Aggressively split long paragraphs (1-2 sentences max)
  $('p').each((i, el) => {
    const $p = $(el);

    // Skip if Key Takeaway or very short
    if (isKeyTakeawaySection($p) || $p.text().trim().length < 100) {
      return;
    }

    const result = splitLongParagraph($p, $);
    if (result.wasSplit) {
      stats.paragraphsSplit++;
    }
  });

  // STEP 2: Split bloated bullet items (max 25 words per bullet)
  $('li').each((i, el) => {
    const $li = $(el);
    const text = $li.text().trim();
    const wordCount = text.split(/\s+/).length;

    if (wordCount > 30) {
      const result = splitLongBullet($li, $, text);
      if (result.wasSplit) {
        stats.bulletsSplit++;
      }
    }
  });

  // STEP 3: Remove redundant phrases and over-explanation
  $('p, li').each((i, el) => {
    const $el = $(el);
    let html = $el.html();

    if (!html) return;

    // Remove redundant transitional bloat
    const redundantPhrases = [
      /This is because\s+/gi,
      /The reason for this is that\s+/gi,
      /It is important to note that\s+/gi,
      /It should be noted that\s+/gi,
      /You should understand that\s+/gi,
      /Keep in mind that\s+/gi,
      /Remember that\s+/gi,
      /As mentioned (previously|earlier|before),?\s+/gi,
      /As we (discussed|noted|saw) (earlier|before|previously),?\s+/gi
    ];

    let originalHtml = html;
    redundantPhrases.forEach(pattern => {
      html = html.replace(pattern, '');
    });

    if (html !== originalHtml) {
      $el.html(html);
      stats.verboseItemsFixed++;
    }
  });

  return { html: $.html(), stats };
}

/**
 * Check if element is in Key Takeaways section
 */
function isKeyTakeawaySection($el) {
  const $section = $el.closest('ul').prev('h3');
  if ($section.length > 0) {
    const heading = $section.text().toLowerCase();
    if (heading.includes('key takeaway')) return true;
  }

  // Check parent styles
  const parentStyle = $el.parent().attr('style') || '';
  if (parentStyle.includes('list-style: none')) return true;

  return false;
}

/**
 * Split long paragraphs into multiple shorter paragraphs (1-2 sentences each)
 */
function splitLongParagraph($p, $) {
  const html = $p.html();
  if (!html) return { wasSplit: false };

  // Count sentences (split by '. ' but account for abbreviations)
  const text = $p.text().trim();
  const sentences = text.split(/\.\s+(?=[A-Z])/);

  // If 3+ sentences, split into multiple paragraphs
  if (sentences.length >= 3) {
    const style = $p.attr('style') || 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;';

    // Create separate paragraph for each 1-2 sentences
    let newParagraphs = [];
    let currentGroup = [];

    sentences.forEach((sentence, idx) => {
      currentGroup.push(sentence.trim());

      // Create paragraph every 2 sentences or at the end
      if (currentGroup.length === 2 || idx === sentences.length - 1) {
        const paragraphText = currentGroup.join('. ') + (currentGroup.join('').includes('.') ? '' : '.');
        newParagraphs.push(`<p style="${style}">${paragraphText}</p>`);
        currentGroup = [];
      }
    });

    // Replace original paragraph with split paragraphs
    $p.replaceWith(newParagraphs.join('\n'));
    return { wasSplit: true };
  }

  return { wasSplit: false };
}

/**
 * Split long bullet items into multiple shorter bullets
 */
function splitLongBullet($li, $, text) {
  const wordCount = text.split(/\s+/).length;

  if (wordCount <= 30) {
    return { wasSplit: false };
  }

  // Try to split at natural break points
  const naturalBreaks = [
    ' — ',
    ' - ',
    '; ',
    ', and ',
    ', but ',
    ', while ',
    '. '
  ];

  let splitPoint = -1;
  let breakChar = null;

  for (const breakPattern of naturalBreaks) {
    const idx = text.indexOf(breakPattern, Math.floor(text.length / 3));
    if (idx > -1 && idx < text.length * 0.7) {
      splitPoint = idx;
      breakChar = breakPattern;
      break;
    }
  }

  if (splitPoint > -1) {
    const part1 = text.substring(0, splitPoint).trim();
    const part2 = text.substring(splitPoint + breakChar.length).trim();

    // Create two separate list items
    const $newLi1 = $('<li>').attr('style', $li.attr('style')).text(part1);
    const $newLi2 = $('<li>').attr('style', $li.attr('style')).text(part2);

    $li.replaceWith($newLi1);
    $newLi1.after($newLi2);

    return { wasSplit: true };
  }

  // If no natural break found, try to split at midpoint comma
  const commaIdx = text.indexOf(',', Math.floor(text.length / 2.5));
  if (commaIdx > -1 && commaIdx < text.length * 0.6) {
    const part1 = text.substring(0, commaIdx).trim();
    const part2 = text.substring(commaIdx + 1).trim();

    const $newLi1 = $('<li>').attr('style', $li.attr('style')).text(part1);
    const $newLi2 = $('<li>').attr('style', $li.attr('style')).text(part2);

    $li.replaceWith($newLi1);
    $newLi1.after($newLi2);

    return { wasSplit: true };
  }

  return { wasSplit: false };
}

/**
 * Process a single lesson
 */
async function processLesson(lesson, dryRun = true) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 ${lesson.subject.toUpperCase()} - ${lesson.title}`);
  console.log(`${'='.repeat(60)}`);

  // Get lesson content
  const { data: sections, error: sectionsError } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  if (sectionsError || !sections || sections.length === 0) {
    console.log('❌ No sections found');
    return null;
  }

  const { data: contents, error: contentsError } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  if (contentsError || !contents || contents.length === 0) {
    console.log('❌ No content found');
    return null;
  }

  const originalContent = contents[0].content;
  const { html: restructuredContent, stats } = aggressivelyRestructure(originalContent);

  console.log(`\n📊 Restructuring Stats:`);
  console.log(`   • Paragraphs split: ${stats.paragraphsSplit}`);
  console.log(`   • Bullets split: ${stats.bulletsSplit}`);
  console.log(`   • Verbose phrases removed: ${stats.verboseItemsFixed}`);
  console.log(`   • Total changes: ${stats.paragraphsSplit + stats.bulletsSplit + stats.verboseItemsFixed}`);

  if (!dryRun && (stats.paragraphsSplit > 0 || stats.bulletsSplit > 0 || stats.verboseItemsFixed > 0)) {
    await supabase
      .from('lesson_section_content')
      .update({ content: restructuredContent })
      .eq('id', contents[0].id);

    console.log(`✅ Updated in database`);
  }

  return {
    lessonKey: lesson.lesson_key,
    title: lesson.title,
    stats
  };
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  const testMode = args.includes('--test');

  console.log(`\n${'='.repeat(70)}`);
  console.log(`🔧 AGGRESSIVE CONTENT RESTRUCTURING`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Mode: ${dryRun ? '🔍 DRY RUN (preview only)' : '✏️  APPLY CHANGES'}`);
  console.log(`${'='.repeat(70)}\n`);

  if (testMode) {
    // Test on 2 lessons (1 reading, 1 science)
    console.log('🧪 TEST MODE - Processing 2 sample lessons\n');

    const { data: readingLesson } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', 'reading')
      .eq('lesson_key', 'core-principles')
      .single();

    const { data: scienceLesson } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', 'science')
      .eq('lesson_key', 'passage-approach')
      .single();

    if (readingLesson) await processLesson(readingLesson, dryRun);
    if (scienceLesson) await processLesson(scienceLesson, dryRun);

  } else {
    // Process all Reading and Science lessons
    const subjects = ['reading', 'science'];

    for (const subject of subjects) {
      console.log(`\n${'█'.repeat(70)}`);
      console.log(`   ${subject.toUpperCase()} LESSONS`);
      console.log(`${'█'.repeat(70)}`);

      const { data: lessons, error } = await supabase
        .from('lesson_metadata')
        .select('*')
        .eq('subject', subject)
        .order('lesson_key');

      if (error || !lessons) {
        console.log(`❌ Error fetching ${subject} lessons:`, error);
        continue;
      }

      for (const lesson of lessons) {
        await processLesson(lesson, dryRun);
      }
    }
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`✅ RESTRUCTURING ${dryRun ? 'PREVIEW' : 'COMPLETE'}`);
  console.log(`${'='.repeat(70)}\n`);

  if (dryRun) {
    console.log('💡 To apply changes, run: node scripts/aggressive-content-restructure.mjs --apply\n');
  }
}

main().catch(console.error);
