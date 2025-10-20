#!/usr/bin/env node

/**
 * IMPROVED Blocky Text → Bullet Conversion Script
 *
 * More aggressive detection and conversion of paragraph blocks to bullet lists
 * for Reading and Science lessons.
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
 * Styles for bullet lists
 */
const STYLES = {
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  li: 'margin: 0.15rem 0;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
};

/**
 * AGGRESSIVE conversion of blocky paragraphs to bullet lists
 */
function convertBlockyTextToBullets(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  let stats = {
    total: 0,
    converted: 0,
    skipped: 0,
    conversions: []
  };

  // Find all paragraphs
  $('p').each((i, el) => {
    const $p = $(el);
    const text = $p.text().trim();
    const htmlContent = $p.html() || '';

    stats.total++;

    // Skip conditions
    if (shouldSkipParagraph($p, $, text, htmlContent)) {
      stats.skipped++;
      return;
    }

    // AGGRESSIVE DETECTION: Check if paragraph should be converted
    const detection = detectConversionNeeded(text, htmlContent);

    if (detection.shouldConvert) {
      const result = convertTobullets($p, $, text, htmlContent, detection);

      if (result.success) {
        stats.converted++;
        stats.conversions.push({
          index: i,
          pattern: detection.pattern,
          wordCount: text.split(/\s+/).length,
          preview: text.substring(0, 80) + '...',
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

/**
 * Determine if paragraph should be skipped
 */
function shouldSkipParagraph($p, $, text, htmlContent) {
  // Too short
  if (text.length < 100) return true;

  // Has special styling (answer choices, examples)
  if (htmlContent.includes('Times New Roman') ||
      htmlContent.includes('Solution:') ||
      htmlContent.includes('height: 1px')) return true;

  // In Key Takeaways section
  const prevH3 = $p.prevAll('h3').first().text().toLowerCase();
  if (prevH3.includes('key takeaway')) return true;

  // Is already a single-sentence intro (ends with colon)
  const sentences = text.split(/\.\s+/);
  if (sentences.length === 1 && text.endsWith(':')) return true;

  return false;
}

/**
 * AGGRESSIVE detection of conversion candidates
 */
function detectConversionNeeded(text, htmlContent) {
  const wordCount = text.split(/\s+/).length;

  // PATTERN 1: Has numbered items (1), (2), (3) OR (1) ... (2) ... (3)
  if (text.match(/\(1\)[^)]*\(2\)/) || text.match(/\(\d+\)\s+[A-Z][\w\s]{5,}/g)) {
    return { shouldConvert: true, pattern: 'Numbered Items', strategy: 'numbered' };
  }

  // PATTERN 2: Has list keywords followed by multiple items
  const listMatch = text.match(/(include|are|types are|methods are|strategies are|steps are|principles are|elements are|factors are|approaches are|mistakes are|errors are|techniques are|ways are):\s*/i);
  if (listMatch && wordCount > 80) {
    return { shouldConvert: true, pattern: 'List Keywords', strategy: 'listKeywords' };
  }

  // PATTERN 3: Has sequential words (First... Second... Then... Next...)
  const sequentialCount = (text.match(/\b(First,|Second,|Third,|Fourth,|Then,|Next,|Finally,|Additionally,|Moreover,|Furthermore,)/gi) || []).length;
  if (sequentialCount >= 2) {
    return { shouldConvert: true, pattern: 'Sequential Words', strategy: 'sequential' };
  }

  // PATTERN 4: Multiple semicolons separating distinct points
  const semicolonCount = (text.match(/;/g) || []).length;
  if (semicolonCount >= 3 && wordCount > 100) {
    return { shouldConvert: true, pattern: 'Multiple Semicolons', strategy: 'semicolons' };
  }

  // PATTERN 5: Very long paragraph under H4 subsection (likely procedural)
  if (wordCount > 150 && text.match(/\.\s+[A-Z]/g)) {
    const sentences = text.split(/\.\s+/);
    if (sentences.length >= 4) {
      return { shouldConvert: true, pattern: 'Long Multi-Sentence', strategy: 'longParagraph' };
    }
  }

  // PATTERN 6: Contains multiple "strong" points (bold text indicators)
  const strongCount = (htmlContent.match(/<strong/g) || []).length;
  if (strongCount >= 3 && wordCount > 100) {
    return { shouldConvert: true, pattern: 'Multiple Strong Points', strategy: 'strongPoints' };
  }

  // PATTERN 7: Em dashes separating multiple concepts
  const emDashCount = (text.match(/—/g) || []).length;
  if (emDashCount >= 2 && wordCount > 100) {
    return { shouldConvert: true, pattern: 'Em Dash Separation', strategy: 'emDashes' };
  }

  return { shouldConvert: false };
}

/**
 * Convert paragraph to bullets based on strategy
 */
function convertTobullets($p, $, text, htmlContent, detection) {
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

  // Only convert if we extracted bullets
  if (bullets.length === 0) {
    return { success: false };
  }

  // Create intro paragraph if we have one
  if (intro) {
    const $intro = $(`<p style="${STYLES.p}"></p>`);
    $intro.html(intro);
    $p.before($intro);
  }

  // Create bullet list
  const $ul = $(`<ul style="${STYLES.ul}"></ul>`);
  bullets.forEach(bullet => {
    const $li = $(`<li style="${STYLES.li}"></li>`);
    $li.html(bullet);
    $ul.append($li);
  });

  // Replace paragraph with bullet list
  $p.replaceWith($ul);

  return { success: true, bulletsCreated: bullets.length };
}

/**
 * Extract bullets from numbered items (1), (2), (3)
 */
function extractNumberedBullets(text) {
  const bullets = [];
  const parts = text.split(/\((\d+)\)/).filter(Boolean);

  for (let i = 0; i < parts.length; i += 2) {
    if (i + 1 < parts.length) {
      const content = parts[i + 1].trim();
      if (content.length > 5) {
        // Clean up the content
        let cleaned = content.replace(/^[\s,;:]+/, '').replace(/[,;]$/, '');

        // If it has a label (like "Variables - "), make it bold
        cleaned = cleaned.replace(/^([A-Za-z\s]+)\s*[-:]\s*/, '<strong>$1:</strong> ');

        bullets.push(cleaned);
      }
    }
  }

  return bullets;
}

/**
 * Extract bullets after list keywords (include:, are:, etc.)
 */
function extractListKeywordBullets(text) {
  const match = text.match(/(.*?)(include|are|types are|methods are|strategies are|steps are|principles are|elements are|factors are|approaches are|mistakes are|errors are|techniques are|ways are):\s*(.*)/is);

  if (!match) return { bullets: [], intro: null };

  const intro = match[1].trim() + ' ' + match[2] + ':';
  const afterColon = match[3];

  const bullets = [];

  // Try splitting by common separators
  let items = [];

  // Try splitting by em-dash or semicolon
  if (afterColon.includes('—')) {
    items = afterColon.split(/—/).map(s => s.trim()).filter(s => s.length > 10);
  } else if (afterColon.includes(';')) {
    items = afterColon.split(/;/).map(s => s.trim()).filter(s => s.length > 10);
  } else {
    // Split by sentences if they start with capital strong tags
    const sentences = afterColon.split(/\.\s+/);
    items = sentences.map(s => s.trim()).filter(s => s.length > 10);
  }

  items.forEach(item => {
    let cleaned = item.replace(/\.$/, '').trim();
    // Make labels bold
    cleaned = cleaned.replace(/^([A-Za-z\s]+)\s*[-:]\s*/, '<strong>$1:</strong> ');
    bullets.push(cleaned);
  });

  return { bullets, intro };
}

/**
 * Extract bullets from sequential words
 */
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

/**
 * Extract bullets separated by semicolons
 */
function extractSemicolonBullets(text) {
  const parts = text.split(/;\s*/);
  const bullets = [];

  parts.forEach((part, idx) => {
    const trimmed = part.trim();
    // Skip very short parts and intro clauses
    if (trimmed.length > 15 && !trimmed.match(/^(e\.g\.|i\.e\.|etc)/i)) {
      // Don't include the first part if it's an intro
      if (idx === 0 && trimmed.includes(':')) {
        return;
      }
      bullets.push(trimmed.replace(/\.$/, ''));
    }
  });

  return bullets;
}

/**
 * Extract bullets from long multi-sentence paragraphs
 */
function extractSentenceBullets(text) {
  const sentences = text.split(/\.\s+/).filter(s => s.trim().length > 15);
  const bullets = [];

  // Group sentences into logical bullets (2-3 sentences each or at transition words)
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

/**
 * Extract bullets based on strong tags
 */
function extractStrongPointBullets(text, htmlContent) {
  const $ = cheerio.load(`<div>${htmlContent}</div>`, { decodeEntities: false });
  const bullets = [];

  $('strong').each((i, el) => {
    const $strong = $(el);
    const label = $strong.text().trim();

    // Get text after this strong tag until next strong or end
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

/**
 * Extract bullets separated by em-dashes
 */
function extractEmDashBullets(text) {
  const parts = text.split(/—/);
  const bullets = [];

  parts.forEach((part, idx) => {
    const trimmed = part.trim();
    if (trimmed.length > 15 && idx > 0) { // Skip first part (intro)
      bullets.push(trimmed.replace(/\.$/, ''));
    }
  });

  return bullets;
}

/**
 * Extract intro before colon
 */
function extractIntroBeforeColon(text) {
  const colonMatch = text.match(/^(.*?):\s*/);
  if (colonMatch && colonMatch[1].length < 150) {
    return colonMatch[1] + ':';
  }
  return null;
}

/**
 * Extract first sentence if it's a good intro
 */
function extractFirstSentenceIfIntro(text) {
  const sentences = text.split(/\.\s+/);
  const first = sentences[0] + '.';

  if (first.length < 150 && (first.includes(':') || /\b(following|these|include)\b/i.test(first))) {
    return first;
  }

  return null;
}

/**
 * Test on a single lesson and save BEFORE/AFTER
 */
async function testOnLesson(lessonKey, saveToDb = false) {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║    IMPROVED: Blocky Text → Bullet Conversion        ║');
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
    console.log(`📚 Subject: ${lesson.subject}`);

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
    const contentId = contents[0].id;

    // Save original
    const beforeFile = path.join(__dirname, 'lesson-analysis', `${lessonKey}_BEFORE.html`);
    fs.writeFileSync(beforeFile, originalContent);
    console.log(`\n💾 Saved BEFORE to: ${lessonKey}_BEFORE.html`);

    // Convert
    console.log('\n🔄 Converting...\n');
    const { html: convertedContent, stats } = convertBlockyTextToBullets(originalContent);

    // Save converted
    const afterFile = path.join(__dirname, 'lesson-analysis', `${lessonKey}_AFTER.html`);
    fs.writeFileSync(afterFile, convertedContent);
    console.log(`💾 Saved AFTER to: ${lessonKey}_AFTER.html`);

    // Print statistics
    console.log('\n' + '═'.repeat(60));
    console.log('📊 CONVERSION STATISTICS:');
    console.log('═'.repeat(60));
    console.log(`Total paragraphs analyzed:  ${stats.total}`);
    console.log(`✅ Converted to bullets:     ${stats.converted}`);
    console.log(`⏭️  Skipped (kept as-is):     ${stats.skipped}`);
    console.log(`Conversion rate:            ${((stats.converted / stats.total) * 100).toFixed(1)}%`);

    if (stats.conversions.length > 0) {
      console.log('\n📝 Conversion Details:');
      console.log('-'.repeat(60));
      stats.conversions.forEach((conv, idx) => {
        console.log(`\n${idx + 1}. Pattern: ${conv.pattern}`);
        console.log(`   Words: ${conv.wordCount} → ${conv.bulletsCreated} bullets`);
        console.log(`   Preview: "${conv.preview}"`);
      });
    }

    console.log('\n' + '═'.repeat(60));

    // Save to database if requested
    if (saveToDb) {
      console.log('\n💾 Saving to database...');
      const { error: updateError } = await supabase
        .from('lesson_section_content')
        .update({ content: convertedContent })
        .eq('id', contentId);

      if (updateError) throw updateError;
      console.log('✅ Successfully saved to database!');
    } else {
      console.log('\n⚠️  NOT saved to database (test mode)');
      console.log('   Run with --save flag to apply changes');
    }

    console.log(`\n📂 Review the conversion:`);
    console.log(`   BEFORE: scripts/lesson-analysis/${lessonKey}_BEFORE.html`);
    console.log(`   AFTER:  scripts/lesson-analysis/${lessonKey}_AFTER.html`);
    console.log(`\n✅ TEST COMPLETE!\n`);

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    console.error(err.stack);
  }
}

// Get lesson key and save flag from command line
const lessonKey = process.argv[2] || 'core-principles';
const saveToDb = process.argv.includes('--save');

testOnLesson(lessonKey, saveToDb).catch(console.error);
