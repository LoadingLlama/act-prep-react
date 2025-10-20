#!/usr/bin/env node

/**
 * Comprehensive Lesson Revamp Script
 *
 * This script revamps ALL 35 math lessons to have consistent 1.1 styling.
 * It handles:
 * - Applying consistent styling to all elements
 * - Fixing broken content (split paragraphs, random headings, etc.)
 * - Cleaning up duplicate checkmarks
 * - Removing invalid/corrupted sections
 * - Ensuring proper Key Takeaways formatting
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

// Lesson 1.1 Reference Styling
const STYLES = {
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  li: 'margin: 0.15rem 0;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  h3_key: 'color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;',
  ul_key: 'list-style: none; padding: 0; margin: 0;',
  li_key: 'margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;',
  checkmark: 'color: #4caf50; font-weight: bold; margin-right: 0.5rem;',
  glossary: 'color: #2563eb; font-weight: 600; text-decoration: underline;',
  answer_p: 'margin: 0.3rem 0 0.5rem 0;',
  answer_span: `font-family: 'Times New Roman', Times, Georgia, serif;`,
  solution_p: 'margin: 1.5rem 0 0.75rem 0;',
  answer_final: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  spacer: 'height: 1px; margin: 0; padding: 0;',
  hidden_h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;',
};

/**
 * Clean and standardize HTML content
 */
function cleanAndApplyStyling(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Remove wrapper tags if present
  let content = $.html();
  content = content.replace(/<html><head><\/head><body>/gi, '');
  content = content.replace(/<\/body><\/html>/gi, '');

  const $clean = cheerio.load(content, { decodeEntities: false });

  // Remove corrupted/invalid headings (single letters, weird text, wrong chapter titles)
  $clean('h3').each((i, el) => {
    const $h3 = $clean(el);
    const text = $h3.text().trim();

    // Strip number prefix like "12. " to get actual heading text
    const textWithoutNumber = text.replace(/^\d+\.\s*/, '');

    // List of known corrupted/invalid headings to remove
    const corruptedHeadings = [
      'Z', 'NN', 'SN', 'JI', 'Nw', 'I',
      'Godt', 'Bo Sil', 'Brownies',
      'Class 1', 'Class 2', 'Class',
      'Standard Deviations',
      'Hidden Section Separator', 'Hidden Separator',
      'Hidden Separator', // Remove hidden artifacts
      'Hidden Section Separator' // Remove hidden artifacts
    ];

    // Remove headings that are clearly corrupted
    const isCorrupted =
      corruptedHeadings.some(bad =>
        textWithoutNumber === bad ||
        textWithoutNumber.toLowerCase() === bad.toLowerCase() ||
        text.toLowerCase() === bad.toLowerCase()
      ) || // Exact matches (with or without number prefix)
      textWithoutNumber.match(/^[A-Z]{1,2}$/) ||  // Single or double letters
      textWithoutNumber.match(/^Class\s+\d+$/i) || // "Class 1", "Class 2", etc
      text.includes('Chapter') && !text.includes('1.') && !text.includes('Topic') || // Wrong chapter references
      text.match(/^\d+\.\s*$/) || // Headings that are just numbers like "1."
      text.match(/^\d+\s*$/) && text.length < 3 || // Just a number
      textWithoutNumber.match(/^(For any|The answer is|Putting this in|You can see how)/) || // Sentence fragments as headings
      textWithoutNumber.length < 2 && textWithoutNumber !== '.'; // Very short unless it's the separator dot

    if (isCorrupted) {
      $h3.remove();
    }
  });

  // Clean up broken content and special characters
  $clean('*').each((i, el) => {
    const $el = $clean(el);
    let html = $el.html();

    if (html) {
      // Fix common broken characters and formatting
      html = html.replace(/§=©/g, ''); // Remove weird character sequences
      html = html.replace(/\s+/g, ' '); // Normalize whitespace
      html = html.replace(/([a-z])\s+([,.!?;:])/g, '$1$2'); // Fix spaced punctuation

      // Fix broken superscripts (like "75" percentile")
      html = html.replace(/(\d+)"?\s*(st|nd|rd|th)\s*percentile/gi, '$1$2 percentile');

      // Fix broken fractions that show as just operators
      html = html.replace(/\s*=\s*and\s*probability/g, ', and probability');
      html = html.replace(/\s*=\s*x\s*(\d+)/g, ' × $1');

      $el.html(html);
    }
  });

  // Merge consecutive paragraphs that are sentence fragments (broken paragraphs)
  let mergedSomething = true;
  let iterations = 0;
  const maxIterations = 50; // Safety limit

  while (mergedSomething && iterations < maxIterations) {
    mergedSomething = false;
    iterations++;

    $clean('p').each((i, el) => {
      const $p = $clean(el);
      const text = $p.text().trim();
      const $next = $p.next('p');

      if ($next.length > 0) {
        const nextText = $next.text().trim();

        // Merge if current paragraph doesn't end with proper punctuation
        // and next paragraph continues the sentence
        const endsIncomplete = !text.match(/[.!?;:]$/) && text.length > 0 && text.length < 250;
        const startsWithLowercase = nextText.match(/^[a-z]/);
        const isContinuation = nextText.match(/^(and|or|but|which|that|of|the|is|are|was|were)/i);

        if (endsIncomplete && (startsWithLowercase || isContinuation || nextText.length < 150)) {
          // Merge paragraphs
          $p.html($p.html() + ' ' + $next.html());
          $next.remove();
          mergedSomething = true;
          return false; // Break from each() to restart
        }
      }
    });
  }

  // Remove empty paragraphs and list items
  $clean('p').each((i, el) => {
    const $p = $clean(el);
    const text = $p.text().trim();

    // Remove if empty (unless it's a spacer)
    if (text.length === 0 && !$p.attr('style')?.includes('height: 1px')) {
      $p.remove();
      return;
    }

    // Remove paragraphs that are just broken math/symbols
    if (text.match(/^[=\-+×÷\/\*\s]+$/) || text === '=' || text.match(/^[§©®™]+$/)) {
      $p.remove();
      return;
    }

    // Remove paragraphs that are just numbers followed by period (likely corrupted list items)
    if (text.match(/^\d+\.\s*$/) && text.length < 5) {
      $p.remove();
    }
  });

  $clean('li').each((i, el) => {
    const $li = $clean(el);
    const text = $li.text().trim();

    // Remove empty list items
    if (text.length === 0) {
      $li.remove();
      return;
    }

    // Remove list items that are just numbers (corrupted)
    if (text.match(/^\d+\.?\s*$/) && text.length < 5) {
      $li.remove();
    }
  });

  // Clean up answer choice spans
  $clean('span').each((i, el) => {
    const $span = $clean(el);
    const text = $span.text().trim();
    const fontFamily = $span.css('font-family') || $span.attr('style') || '';

    // If it's an answer choice span with only a letter and period, check if it's empty/broken
    if (fontFamily.includes('Times') && text.match(/^[A-K]\.\s*$/)) {
      // Check if there's actual content after it
      const parent = $span.parent();
      const html = parent.html() || '';
      const spanHtml = $clean.html($span);
      const afterSpan = html.split(spanHtml)[1] || '';
      const trimmedAfter = afterSpan.replace(/<br\s*\/?>/gi, '').trim();

      // Remove if empty or immediately followed by another answer choice
      if (!trimmedAfter || trimmedAfter.startsWith('<span') || trimmedAfter.length < 3) {
        $span.remove();
      }
    }
  });

  // Remove paragraphs that contain only empty answer choices
  $clean('p').each((i, el) => {
    const $p = $clean(el);
    const spans = $p.find('span');
    const hasOnlyEmptyAnswers = spans.length > 0 &&
      spans.toArray().every(span => {
        const text = $clean(span).text().trim();
        return text.match(/^[A-K]\.\s*$/);
      });

    if (hasOnlyEmptyAnswers) {
      $p.remove();
    }
  });

  // Apply paragraph styling
  $clean('p').each((i, el) => {
    const $p = $clean(el);
    const text = $p.text().trim().toLowerCase();

    if (text.startsWith('answer:')) {
      $p.attr('style', STYLES.answer_final);
    } else if ($p.prev().is('p') && $p.prev().text().includes('Solution:')) {
      const hasAnswerChoices = $p.find('span').length > 0;
      if (hasAnswerChoices) {
        $p.attr('style', STYLES.answer_p);
      } else {
        $p.attr('style', STYLES.p);
      }
    } else if (text.includes('solution:')) {
      $p.attr('style', STYLES.solution_p);
    } else {
      $p.attr('style', STYLES.p);
    }
  });

  // Apply H3 styling
  $clean('h3').each((i, el) => {
    const $h3 = $clean(el);
    const text = $h3.text().trim().toLowerCase();

    if (text.includes('key takeaway')) {
      $h3.attr('style', STYLES.h3_key);
    } else if (text === '.') {
      $h3.attr('style', STYLES.hidden_h3);
    } else {
      $h3.attr('style', STYLES.h3);
    }
  });

  // Apply H4 styling
  $clean('h4').each((i, el) => {
    $clean(el).attr('style', STYLES.h4);
  });

  // Apply UL/LI styling
  $clean('ul').each((i, el) => {
    const $ul = $clean(el);
    const prevH3 = $ul.prevAll('h3').first().text().trim().toLowerCase();

    if (prevH3.includes('key takeaway')) {
      $ul.attr('style', STYLES.ul_key);

      $ul.find('li').each((j, li) => {
        const $li = $clean(li);
        $li.attr('style', STYLES.li_key);

        // Remove duplicate checkmarks
        let content = $li.html() || '';
        // Remove ALL existing checkmarks first (multiple styles)
        content = content.replace(/<span[^>]*color:\s*#059669[^>]*>✓<\/span>/g, ''); // Old style 1
        content = content.replace(/<span[^>]*color:\s*#4caf50[^>]*>✓<\/span>/g, ''); // Old style 2
        content = content.replace(/<span[^>]*color:\s*#2e7d32[^>]*>✓<\/span>/g, ''); // Old style 3
        content = content.replace(/<span[^>]*>✓<\/span>/g, ''); // Any other span with checkmark
        content = content.replace(/✓/g, ''); // Bare checkmarks
        content = content.trim();

        // Add single checkmark at the beginning with correct style
        $li.html(`<span style="${STYLES.checkmark}">✓</span>${content}`);
      });
    } else {
      const parent = $ul.parent();

      if (parent.is('li')) {
        $ul.attr('style', STYLES.ul_nested);
      } else {
        $ul.attr('style', STYLES.ul);
      }

      $ul.find('li').attr('style', STYLES.li);
    }
  });

  // Style glossary terms
  $clean('strong').each((i, el) => {
    const $strong = $clean(el);
    const currentStyle = $strong.attr('style') || '';

    if (currentStyle.includes('#2563eb') || currentStyle.includes('text-decoration: underline')) {
      $strong.attr('style', STYLES.glossary);
    }
  });

  // Style answer choices
  $clean('span').each((i, el) => {
    const $span = $clean(el);
    const text = $span.text().trim();
    const fontFamily = $span.css('font-family') || $span.attr('style') || '';

    if (fontFamily.includes('Times') || text.match(/^[A-K]\./)) {
      $span.attr('style', STYLES.answer_span);
    }
  });

  // Remove fancy boxes and gradients
  $clean('div').each((i, el) => {
    const $div = $clean(el);
    const style = $div.attr('style') || '';

    if (style.includes('linear-gradient') || style.includes('border-radius') || style.includes('box-shadow')) {
      $div.replaceWith($div.html());
    }
  });

  // Ensure Key Takeaways has proper spacers
  $clean('h3').each((i, el) => {
    const $h3 = $clean(el);
    const text = $h3.text().trim().toLowerCase();

    if (text.includes('key takeaway')) {
      // Remove any existing spacers before it
      let $prev = $h3.prev();
      while ($prev.length > 0 && ($prev.is('p') && $prev.text().trim().length === 0 || $prev.is('h3') && $prev.text().trim() === '.')) {
        const $toRemove = $prev;
        $prev = $prev.prev();
        $toRemove.remove();
      }

      // Add proper spacers
      $h3.before(`<p style="${STYLES.spacer}"></p>`);
      $h3.before(`<h3 style="${STYLES.hidden_h3}">.</h3>`);
    }
  });

  return $clean.html();
}

/**
 * Get all lessons from database and revamp them
 */
async function revampAllLessons(subject = 'math') {
  const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log(`║   Comprehensive Lesson Revamp - ${subjectName.padEnd(19)} ║`);
  console.log('╚══════════════════════════════════════════════════════╝\n');

  try {
    // Fetch all lessons for the specified subject
    const { data: lessons, error: lessonsError } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', subject)
      .order('lesson_key');

    if (lessonsError) throw lessonsError;

    console.log(`📊 Found ${lessons.length} ${subjectName} lessons in database\n`);

    let processed = 0;
    let errors = 0;

    for (const lesson of lessons) {
      try {
        console.log(`\n[${processed + 1}/${lessons.length}] Processing: ${lesson.title}`);
        console.log(`   Key: ${lesson.lesson_key}`);

        // Get sections
        const { data: sections, error: sectionsError } = await supabase
          .from('lesson_sections')
          .select('*')
          .eq('lesson_id', lesson.id)
          .order('order_index');

        if (sectionsError) throw sectionsError;

        if (!sections || sections.length === 0) {
          console.log(`   ⚠️  No sections found, skipping...`);
          errors++;
          continue;
        }

        // Process each section (typically just one for math lessons)
        for (const section of sections) {
          // Get content for this section
          const { data: contents, error: contentsError } = await supabase
            .from('lesson_section_content')
            .select('*')
            .eq('section_id', section.id)
            .order('order_index');

          if (contentsError) throw contentsError;

          if (!contents || contents.length === 0) {
            console.log(`   ⚠️  No content found for section, skipping...`);
            continue;
          }

          // Get the main content (typically the first content block)
          const mainContent = contents[0];

          if (!mainContent || !mainContent.content) {
            console.log(`   ⚠️  Empty content, skipping...`);
            continue;
          }

          // Apply styling and cleanup
          const cleanedContent = cleanAndApplyStyling(mainContent.content);

          // Update the content in database
          const { error: updateError } = await supabase
            .from('lesson_section_content')
            .update({ content: cleanedContent })
            .eq('id', mainContent.id);

          if (updateError) throw updateError;

          console.log(`   ✅ Successfully revamped and updated in database`);
        }

        processed++;

      } catch (err) {
        console.error(`   ❌ Error processing ${lesson.lesson_key}:`, err.message);
        errors++;
      }
    }

    console.log('\n' + '─'.repeat(60));
    console.log('\n╔══════════════════════════════════════════════════════╗');
    console.log('║            Comprehensive Revamp Complete!           ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');
    console.log(`✅ Successfully processed: ${processed} lessons`);
    console.log(`❌ Errors: ${errors} lessons`);
    console.log('');

  } catch (err) {
    console.error('Fatal error:', err);
    console.error(err.stack);
  }
}

// Get subject from command line argument, default to 'math'
const subject = process.argv[2] || 'math';

// Validate subject
const validSubjects = ['math', 'english', 'reading', 'science'];
if (!validSubjects.includes(subject.toLowerCase())) {
  console.error(`❌ Invalid subject: ${subject}`);
  console.error(`   Valid subjects: ${validSubjects.join(', ')}`);
  process.exit(1);
}

revampAllLessons(subject.toLowerCase()).catch(console.error);
