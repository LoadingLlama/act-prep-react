#!/usr/bin/env node

/**
 * Test Restructuring and Generate Sample Files
 */

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function aggressivelyRestructure(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  let stats = {
    paragraphsSplit: 0,
    bulletsSplit: 0,
    verboseItemsFixed: 0
  };

  // STEP 1: Split long paragraphs (1-2 sentences max)
  $('p').each((i, el) => {
    const $p = $(el);

    if (isKeyTakeawaySection($p) || $p.text().trim().length < 100) {
      return;
    }

    const result = splitLongParagraph($p, $);
    if (result.wasSplit) {
      stats.paragraphsSplit++;
    }
  });

  // STEP 2: Split bloated bullets
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

  // STEP 3: Remove redundant phrases
  $('p, li').each((i, el) => {
    const $el = $(el);
    let html = $el.html();

    if (!html) return;

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

function isKeyTakeawaySection($el) {
  const $section = $el.closest('ul').prev('h3');
  if ($section.length > 0) {
    const heading = $section.text().toLowerCase();
    if (heading.includes('key takeaway')) return true;
  }

  const parentStyle = $el.parent().attr('style') || '';
  if (parentStyle.includes('list-style: none')) return true;

  return false;
}

function splitLongParagraph($p, $) {
  const html = $p.html();
  if (!html) return { wasSplit: false };

  const text = $p.text().trim();
  const sentences = text.split(/\.\s+(?=[A-Z])/);

  if (sentences.length >= 3) {
    const style = $p.attr('style') || 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;';

    let newParagraphs = [];
    let currentGroup = [];

    sentences.forEach((sentence, idx) => {
      currentGroup.push(sentence.trim());

      if (currentGroup.length === 2 || idx === sentences.length - 1) {
        const paragraphText = currentGroup.join('. ') + (currentGroup.join('').includes('.') ? '' : '.');
        newParagraphs.push(`<p style="${style}">${paragraphText}</p>`);
        currentGroup = [];
      }
    });

    $p.replaceWith(newParagraphs.join('\n'));
    return { wasSplit: true };
  }

  return { wasSplit: false };
}

function splitLongBullet($li, $, text) {
  const wordCount = text.split(/\s+/).length;

  if (wordCount <= 30) {
    return { wasSplit: false };
  }

  const naturalBreaks = [' — ', ' - ', '; ', ', and ', ', but ', ', while ', '. '];

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

    const $newLi1 = $('<li>').attr('style', $li.attr('style')).text(part1);
    const $newLi2 = $('<li>').attr('style', $li.attr('style')).text(part2);

    $li.replaceWith($newLi1);
    $newLi1.after($newLi2);

    return { wasSplit: true };
  }

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

async function testLesson(subject, lessonKey, outputName) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 Testing: ${subject.toUpperCase()} - ${lessonKey}`);
  console.log(`${'='.repeat(70)}`);

  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', subject)
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log('❌ Lesson not found');
    return;
  }

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  if (!sections || sections.length === 0) {
    console.log('❌ No sections found');
    return;
  }

  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  if (!contents || contents.length === 0) {
    console.log('❌ No content found');
    return;
  }

  const originalContent = contents[0].content;
  const { html: restructuredContent, stats } = aggressivelyRestructure(originalContent);

  console.log(`\n📊 Restructuring Stats:`);
  console.log(`   • Paragraphs split: ${stats.paragraphsSplit}`);
  console.log(`   • Bullets split: ${stats.bulletsSplit}`);
  console.log(`   • Verbose phrases removed: ${stats.verboseItemsFixed}`);
  console.log(`   • Total changes: ${stats.paragraphsSplit + stats.bulletsSplit + stats.verboseItemsFixed}`);

  // Save BEFORE and AFTER files
  const outputDir = path.join(__dirname, 'lesson-analysis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const beforePath = path.join(outputDir, `${outputName}_BEFORE_RESTRUCTURE.html`);
  const afterPath = path.join(outputDir, `${outputName}_AFTER_RESTRUCTURE.html`);

  fs.writeFileSync(beforePath, originalContent);
  fs.writeFileSync(afterPath, restructuredContent);

  console.log(`\n✅ Files saved:`);
  console.log(`   BEFORE: ${beforePath}`);
  console.log(`   AFTER:  ${afterPath}`);

  return stats;
}

async function main() {
  console.log(`\n${'█'.repeat(70)}`);
  console.log(`   AGGRESSIVE RESTRUCTURING TEST - GENERATE SAMPLES`);
  console.log(`${'█'.repeat(70)}\n`);

  await testLesson('reading', 'core-principles', 'reading-core-principles');
  await testLesson('science', 'passage-approach', 'science-passage-approach');

  console.log(`\n${'='.repeat(70)}`);
  console.log(`✅ TEST COMPLETE - Review the BEFORE/AFTER files`);
  console.log(`${'='.repeat(70)}\n`);
}

main().catch(console.error);
