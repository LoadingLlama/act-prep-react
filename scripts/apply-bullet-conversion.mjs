#!/usr/bin/env node

/**
 * Apply Bullet Conversion to All Reading & Science Lessons
 *
 * Batch processes all lessons in Reading and Science subjects.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
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

const STYLES = {
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  li: 'margin: 0.15rem 0;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
};

/**
 * Convert blocky text to bullets (same as test script)
 */
function convertBlockyTextToBullets(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  let stats = {
    total: 0,
    converted: 0,
    skipped: 0,
    conversions: []
  };

  $('p').each((i, el) => {
    const $p = $(el);
    const text = $p.text().trim();
    const htmlContent = $p.html() || '';

    stats.total++;

    if (shouldSkipParagraph($p, $, text, htmlContent)) {
      stats.skipped++;
      return;
    }

    const detection = detectConversionNeeded(text, htmlContent);

    if (detection.shouldConvert) {
      const result = convertToBullets($p, $, text, htmlContent, detection);

      if (result.success) {
        stats.converted++;
        stats.conversions.push({
          pattern: detection.pattern,
          bulletsCreated: result.bulletsCreated
        });
      } else {
        stats.skipped++;
      }
    } else {
      stats.skipped++;
    }
  });

  return { html: $.html(), stats };
}

function shouldSkipParagraph($p, $, text, htmlContent) {
  if (text.length < 100) return true;

  if (htmlContent.includes('Times New Roman') ||
      htmlContent.includes('Solution:') ||
      htmlContent.includes('height: 1px')) return true;

  const prevH3 = $p.prevAll('h3').first().text().toLowerCase();
  if (prevH3.includes('key takeaway')) return true;

  const sentences = text.split(/\.\s+/);
  if (sentences.length === 1 && text.endsWith(':')) return true;

  return false;
}

function detectConversionNeeded(text, htmlContent) {
  const wordCount = text.split(/\s+/).length;

  if (text.match(/\(1\)[^)]*\(2\)/) || text.match(/\(\d+\)\s+[A-Z][\w\s]{5,}/g)) {
    return { shouldConvert: true, pattern: 'Numbered Items', strategy: 'numbered' };
  }

  const listMatch = text.match(/(include|are|types are|methods are|strategies are|steps are|principles are|elements are|factors are|approaches are|mistakes are|errors are|techniques are|ways are):\s*/i);
  if (listMatch && wordCount > 80) {
    return { shouldConvert: true, pattern: 'List Keywords', strategy: 'listKeywords' };
  }

  const sequentialCount = (text.match(/\b(First,|Second,|Third,|Fourth,|Then,|Next,|Finally,|Additionally,|Moreover,|Furthermore,)/gi) || []).length;
  if (sequentialCount >= 2) {
    return { shouldConvert: true, pattern: 'Sequential Words', strategy: 'sequential' };
  }

  const semicolonCount = (text.match(/;/g) || []).length;
  if (semicolonCount >= 3 && wordCount > 100) {
    return { shouldConvert: true, pattern: 'Multiple Semicolons', strategy: 'semicolons' };
  }

  if (wordCount > 150 && text.match(/\.\s+[A-Z]/g)) {
    const sentences = text.split(/\.\s+/);
    if (sentences.length >= 4) {
      return { shouldConvert: true, pattern: 'Long Multi-Sentence', strategy: 'longParagraph' };
    }
  }

  const strongCount = (htmlContent.match(/<strong/g) || []).length;
  if (strongCount >= 3 && wordCount > 100) {
    return { shouldConvert: true, pattern: 'Multiple Strong Points', strategy: 'strongPoints' };
  }

  const emDashCount = (text.match(/—/g) || []).length;
  if (emDashCount >= 2 && wordCount > 100) {
    return { shouldConvert: true, pattern: 'Em Dash Separation', strategy: 'emDashes' };
  }

  return { shouldConvert: false };
}

function convertToBullets($p, $, text, htmlContent, detection) {
  const bullets = [];
  let intro = null;

  switch (detection.strategy) {
    case 'numbered':
      bullets.push(...extractNumberedBullets(text));
      intro = extractIntroBeforeColon(text);
      break;
    case 'listKeywords':
      const result = extractListKeywordBullets(text);
      bullets.push(...result.bullets);
      intro = result.intro;
      break;
    case 'sequential':
      bullets.push(...extractSequentialBullets(text));
      break;
    case 'semicolons':
      bullets.push(...extractSemicolonBullets(text));
      break;
    case 'longParagraph':
      bullets.push(...extractSentenceBullets(text));
      intro = extractFirstSentenceIfIntro(text);
      break;
    case 'strongPoints':
      bullets.push(...extractStrongPointBullets(text, htmlContent));
      break;
    case 'emDashes':
      bullets.push(...extractEmDashBullets(text));
      break;
  }

  if (bullets.length === 0) {
    return { success: false };
  }

  if (intro) {
    const $intro = $(`<p style="${STYLES.p}"></p>`);
    $intro.html(intro);
    $p.before($intro);
  }

  const $ul = $(`<ul style="${STYLES.ul}"></ul>`);
  bullets.forEach(bullet => {
    const $li = $(`<li style="${STYLES.li}"></li>`);
    $li.html(bullet);
    $ul.append($li);
  });

  $p.replaceWith($ul);

  return { success: true, bulletsCreated: bullets.length };
}

function extractNumberedBullets(text) {
  const bullets = [];
  const parts = text.split(/\((\d+)\)/).filter(Boolean);

  for (let i = 0; i < parts.length; i += 2) {
    if (i + 1 < parts.length) {
      const content = parts[i + 1].trim();
      if (content.length > 5) {
        let cleaned = content.replace(/^[\s,;:]+/, '').replace(/[,;]$/, '');
        cleaned = cleaned.replace(/^([A-Za-z\s]+)\s*[-:]\s*/, '<strong>$1:</strong> ');
        bullets.push(cleaned);
      }
    }
  }

  return bullets;
}

function extractListKeywordBullets(text) {
  const match = text.match(/(.*?)(include|are|types are|methods are|strategies are|steps are|principles are|elements are|factors are|approaches are|mistakes are|errors are|techniques are|ways are):\s*(.*)/is);

  if (!match) return { bullets: [], intro: null };

  const intro = match[1].trim() + ' ' + match[2] + ':';
  const afterColon = match[3];
  const bullets = [];

  let items = [];

  if (afterColon.includes('—')) {
    items = afterColon.split(/—/).map(s => s.trim()).filter(s => s.length > 10);
  } else if (afterColon.includes(';')) {
    items = afterColon.split(/;/).map(s => s.trim()).filter(s => s.length > 10);
  } else {
    const sentences = afterColon.split(/\.\s+/);
    items = sentences.map(s => s.trim()).filter(s => s.length > 10);
  }

  items.forEach(item => {
    let cleaned = item.replace(/\.$/, '').trim();
    cleaned = cleaned.replace(/^([A-Za-z\s]+)\s*[-:]\s*/, '<strong>$1:</strong> ');
    bullets.push(cleaned);
  });

  return { bullets, intro };
}

function extractSequentialBullets(text) {
  const bullets = [];
  const parts = text.split(/\b(First,|Second,|Third,|Fourth,|Then,|Next,|Finally,|Additionally,|Moreover,|Furthermore,)\s*/i);

  for (let i = 1; i < parts.length; i += 2) {
    if (i + 1 < parts.length) {
      const content = parts[i + 1].trim();
      if (content.length > 10) {
        const cleaned = content.replace(/\.$/, '').trim();
        bullets.push(cleaned);
      }
    }
  }

  return bullets;
}

function extractSemicolonBullets(text) {
  const parts = text.split(/;\s*/);
  const bullets = [];

  parts.forEach((part, idx) => {
    const trimmed = part.trim();
    if (trimmed.length > 15 && !trimmed.match(/^(e\.g\.|i\.e\.|etc)/i)) {
      if (idx === 0 && trimmed.includes(':')) {
        return;
      }
      bullets.push(trimmed.replace(/\.$/, ''));
    }
  });

  return bullets;
}

function extractSentenceBullets(text) {
  const sentences = text.split(/\.\s+/).filter(s => s.trim().length > 15);
  const bullets = [];
  let currentBullet = '';

  sentences.forEach((sent, idx) => {
    currentBullet += sent.trim() + '. ';

    const hasTransition = /\b(However,|Additionally,|Moreover,|Furthermore,|In contrast,|Similarly,|For example,)/i.test(sent);
    const isLongEnough = currentBullet.split(/\s+/).length > 20;
    const isLast = idx === sentences.length - 1;

    if (hasTransition || isLongEnough || isLast) {
      bullets.push(currentBullet.trim());
      currentBullet = '';
    }
  });

  return bullets.filter(b => b.length > 0);
}

function extractStrongPointBullets(text, htmlContent) {
  const $ = cheerio.load(`<div>${htmlContent}</div>`, { decodeEntities: false });
  const bullets = [];

  $('strong').each((i, el) => {
    const $strong = $(el);
    const label = $strong.text().trim();

    let afterText = '';
    let node = $strong[0].nextSibling;

    while (node && node.name !== 'strong') {
      if (node.type === 'text') {
        afterText += node.data;
      }
      node = node.nextSibling;
    }

    afterText = afterText.trim().replace(/^[\s:,;-]+/, '').replace(/[,;]$/, '');

    if (afterText.length > 10) {
      bullets.push(`<strong>${label}:</strong> ${afterText}`);
    }
  });

  return bullets;
}

function extractEmDashBullets(text) {
  const parts = text.split(/—/);
  const bullets = [];

  parts.forEach((part, idx) => {
    const trimmed = part.trim();
    if (trimmed.length > 15 && idx > 0) {
      bullets.push(trimmed.replace(/\.$/, ''));
    }
  });

  return bullets;
}

function extractIntroBeforeColon(text) {
  const colonMatch = text.match(/^(.*?):\s*/);
  if (colonMatch && colonMatch[1].length < 150) {
    return colonMatch[1] + ':';
  }
  return null;
}

function extractFirstSentenceIfIntro(text) {
  const sentences = text.split(/\.\s+/);
  const first = sentences[0] + '.';

  if (first.length < 150 && (first.includes(':') || /\b(following|these|include)\b/i.test(first))) {
    return first;
  }

  return null;
}

/**
 * Process all lessons for a subject
 */
async function processSubject(subject) {
  console.log(`\n╔══════════════════════════════════════════════════════╗`);
  console.log(`║   Bullet Conversion - ${subject.toUpperCase().padEnd(32)} ║`);
  console.log(`╚══════════════════════════════════════════════════════╝\n`);

  try {
    const { data: lessons, error: lessonsError } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', subject)
      .order('lesson_key');

    if (lessonsError) throw lessonsError;

    console.log(`📊 Found ${lessons.length} ${subject} lessons\n`);

    let totalStats = {
      lessonsProcessed: 0,
      lessonsWithChanges: 0,
      totalParagraphs: 0,
      totalConverted: 0,
      errors: 0
    };

    for (const lesson of lessons) {
      try {
        console.log(`\n[${totalStats.lessonsProcessed + 1}/${lessons.length}] ${lesson.title}`);

        const { data: sections, error: sectionsError } = await supabase
          .from('lesson_sections')
          .select('*')
          .eq('lesson_id', lesson.id)
          .order('order_index');

        if (sectionsError) throw sectionsError;

        if (!sections || sections.length === 0) {
          console.log(`   ⚠️  No sections, skipping...`);
          continue;
        }

        const { data: contents, error: contentsError } = await supabase
          .from('lesson_section_content')
          .select('*')
          .eq('section_id', sections[0].id)
          .order('order_index');

        if (contentsError) throw contentsError;

        if (!contents || contents.length === 0) {
          console.log(`   ⚠️  No content, skipping...`);
          continue;
        }

        const originalContent = contents[0].content;
        const { html: convertedContent, stats } = convertBlockyTextToBullets(originalContent);

        totalStats.totalParagraphs += stats.total;
        totalStats.totalConverted += stats.converted;

        if (stats.converted > 0) {
          const { error: updateError } = await supabase
            .from('lesson_section_content')
            .update({ content: convertedContent })
            .eq('id', contents[0].id);

          if (updateError) throw updateError;

          totalStats.lessonsWithChanges++;
          console.log(`   ✅ Converted ${stats.converted}/${stats.total} paragraphs`);
        } else {
          console.log(`   ⏭️  No changes needed`);
        }

        totalStats.lessonsProcessed++;

      } catch (err) {
        console.error(`   ❌ Error: ${err.message}`);
        totalStats.errors++;
      }
    }

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`\n📈 ${subject.toUpperCase()} SUMMARY:`);
    console.log(`   Lessons processed: ${totalStats.lessonsProcessed}`);
    console.log(`   Lessons with changes: ${totalStats.lessonsWithChanges}`);
    console.log(`   Total paragraphs: ${totalStats.totalParagraphs}`);
    console.log(`   Converted to bullets: ${totalStats.totalConverted}`);
    console.log(`   Conversion rate: ${((totalStats.totalConverted / totalStats.totalParagraphs) * 100).toFixed(1)}%`);
    console.log(`   Errors: ${totalStats.errors}`);

    return totalStats;

  } catch (err) {
    console.error('Fatal error:', err);
    console.error(err.stack);
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║     Apply Bullet Conversion to All Lessons          ║');
  console.log('╚══════════════════════════════════════════════════════╝');

  const readingStats = await processSubject('reading');
  const scienceStats = await processSubject('science');

  if (readingStats && scienceStats) {
    console.log('\n' + '═'.repeat(60));
    console.log('║           FINAL SUMMARY - ALL SUBJECTS              ║');
    console.log('═'.repeat(60));
    console.log(`\nReading Lessons: ${readingStats.lessonsWithChanges}/${readingStats.lessonsProcessed} updated`);
    console.log(`  Converted: ${readingStats.totalConverted}/${readingStats.totalParagraphs} paragraphs (${((readingStats.totalConverted / readingStats.totalParagraphs) * 100).toFixed(1)}%)`);
    console.log(`\nScience Lessons: ${scienceStats.lessonsWithChanges}/${scienceStats.lessonsProcessed} updated`);
    console.log(`  Converted: ${scienceStats.totalConverted}/${scienceStats.totalParagraphs} paragraphs (${((scienceStats.totalConverted / scienceStats.totalParagraphs) * 100).toFixed(1)}%)`);
    console.log(`\nTOTAL: ${readingStats.lessonsWithChanges + scienceStats.lessonsWithChanges} lessons updated`);
    console.log(`  Converted: ${readingStats.totalConverted + scienceStats.totalConverted} paragraphs`);
    console.log(`  Errors: ${readingStats.errors + scienceStats.errors}`);
    console.log('\n✅ BULLET CONVERSION COMPLETE!\n');
  }
}

main().catch(console.error);
