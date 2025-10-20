#!/usr/bin/env node

/**
 * Format Reading/Science Lessons Like Math 1.1
 *
 * Key principles from Math 1.1:
 * 1. Short intro (1-2 sentences)
 * 2. Immediately use nested bullets for concepts
 * 3. Add example after each major concept
 * 4. Clean spacing - never cramped
 * 5. Minimal prose, maximum structure
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

const STYLES = {
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  li: 'margin: 0.15rem 0;',
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;'
};

/**
 * Main formatting function - transforms to Math 1.1 structure
 */
function formatLikeMath11(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  let stats = {
    sectionsConverted: 0,
    bulletListsCreated: 0,
    examplesAdded: 0,
    paragraphsCondensed: 0
  };

  // STEP 1: Convert verbose sections to bullet-heavy structure
  $('h3, h4').each((i, el) => {
    const $heading = $(el);
    const headingText = $heading.text().trim();

    // Skip Key Takeaways
    if (headingText.toLowerCase().includes('key takeaway')) {
      return;
    }

    // Get all content until next heading
    const contentElements = [];
    let $next = $heading.next();

    while ($next.length > 0 && !$next.is('h3') && !$next.is('h4')) {
      if ($next.is('p') && !isKeyTakeaway($next, $)) {
        contentElements.push($next);
      } else if ($next.is('ul')) {
        contentElements.push($next);
      }
      $next = $next.next();
    }

    if (contentElements.length > 0) {
      const result = convertSectionToBullets($, contentElements, headingText);
      if (result.converted) {
        stats.sectionsConverted++;
        stats.bulletListsCreated += result.listsCreated;
      }
    }
  });

  // STEP 2: Ensure all bullets use nested structure
  $('ul').each((i, el) => {
    const $ul = $(el);

    // Skip if already nested or is Key Takeaway
    if ($ul.parent().is('li') || isKeyTakeawayList($ul, $)) {
      return;
    }

    ensureNestedBulletStructure($ul, $);
  });

  // STEP 3: Add spacing after major concepts (before examples)
  addProperSpacing($);

  return { html: $.html(), stats };
}

/**
 * Convert a section's content to bullet-heavy structure like Math 1.1
 */
function convertSectionToBullets($, contentElements, headingText) {
  let converted = false;
  let listsCreated = 0;

  // Find patterns that should be bulletized
  contentElements.forEach($el => {
    if ($el.is('p')) {
      const text = $el.text().trim();
      const wordCount = text.split(/\s+/).length;

      // If paragraph is over 40 words and contains list-like content, convert to bullets
      if (wordCount > 40 && hasListableContent(text)) {
        const result = convertParagraphToBulletedList($, $el, text);
        if (result.converted) {
          converted = true;
          listsCreated++;
        }
      }
      // If paragraph is 2+ sentences, split into separate paragraphs
      else if (text.includes('. ') && wordCount > 30) {
        splitIntoSeparateParagraphs($, $el, text);
      }
    }
  });

  return { converted, listsCreated };
}

/**
 * Check if text contains list-like content that should be bulletized
 */
function hasListableContent(text) {
  // Patterns that indicate bulletable content
  const patterns = [
    /\(\d+\)/g,  // Numbered items: (1), (2)
    /First,|Second,|Third,|Finally,/gi,  // Sequential
    /include:|such as:|are:|types are:/gi,  // List keywords
    /—.*—/g,  // Multiple em-dashes
    /;.*;.*;/g,  // Multiple semicolons
  ];

  return patterns.some(pattern => pattern.test(text));
}

/**
 * Convert a paragraph to a bulleted list structure
 */
function convertParagraphToBulletedList($, $p, text) {
  // Extract intro sentence if exists
  const sentences = text.split(/\.\s+/);
  let intro = null;
  let bulletContent = text;

  if (sentences.length > 1 && sentences[0].length < 100) {
    intro = sentences[0] + '.';
    bulletContent = text.substring(intro.length).trim();
  }

  // Create bullets
  const bullets = extractBulletsFromText(bulletContent);

  if (bullets.length >= 2) {
    // Create intro paragraph if exists
    if (intro) {
      const $introPara = $(`<p style="${STYLES.p}"></p>`).text(intro);
      $p.before($introPara);
    }

    // Create bullet list
    const $ul = $(`<ul style="${STYLES.ul}"></ul>`);
    bullets.forEach(bullet => {
      const $li = $(`<li style="${STYLES.li}"></li>`).html(bullet);
      $ul.append($li);
    });

    $p.replaceWith($ul);
    return { converted: true };
  }

  return { converted: false };
}

/**
 * Extract bullets from text using various patterns
 */
function extractBulletsFromText(text) {
  const bullets = [];

  // Try numbered items: (1), (2), (3)
  if (text.match(/\(\d+\)/)) {
    const parts = text.split(/\((\d+)\)/).filter(Boolean);
    for (let i = 1; i < parts.length; i += 2) {
      if (i + 1 < parts.length) {
        let content = parts[i + 1].trim();
        content = content.replace(/^[,;:\s]+/, '').replace(/[,;]$/, '');
        if (content.length > 10) {
          bullets.push(content);
        }
      }
    }
    if (bullets.length > 0) return bullets;
  }

  // Try sequential words
  const sequentialMatch = text.match(/(First,|Second,|Third,|Fourth,|Finally,)/gi);
  if (sequentialMatch && sequentialMatch.length >= 2) {
    const parts = text.split(/(First,|Second,|Third,|Fourth,|Finally,)/gi);
    for (let i = 1; i < parts.length; i += 2) {
      if (i + 1 < parts.length) {
        const content = parts[i + 1].trim().replace(/\.$/, '');
        if (content.length > 10) {
          bullets.push(content);
        }
      }
    }
    if (bullets.length > 0) return bullets;
  }

  // Try em-dashes
  if (text.includes('—') && text.split('—').length >= 3) {
    const parts = text.split('—');
    parts.forEach((part, idx) => {
      const trimmed = part.trim();
      if (idx > 0 && trimmed.length > 10) {
        bullets.push(trimmed.replace(/\.$/, ''));
      }
    });
    if (bullets.length > 0) return bullets;
  }

  // Try semicolons
  if (text.split(';').length >= 3) {
    const parts = text.split(';');
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.length > 15) {
        bullets.push(trimmed.replace(/\.$/, ''));
      }
    });
    if (bullets.length > 0) return bullets;
  }

  return bullets;
}

/**
 * Split long paragraph into multiple shorter paragraphs
 */
function splitIntoSeparateParagraphs($, $p, text) {
  const sentences = text.split(/\.\s+(?=[A-Z])/);

  if (sentences.length >= 2) {
    // Create separate paragraphs
    const newParas = [];
    let currentGroup = [];

    sentences.forEach((sentence, idx) => {
      currentGroup.push(sentence.trim());

      // Create paragraph every 1-2 sentences
      if (currentGroup.length === 2 || idx === sentences.length - 1) {
        let paraText = currentGroup.join('. ');
        if (!paraText.endsWith('.')) paraText += '.';
        newParas.push(`<p style="${STYLES.p}">${paraText}</p>`);
        currentGroup = [];
      }
    });

    $p.replaceWith(newParas.join('\n'));
  }
}

/**
 * Ensure bullets use nested structure like Math 1.1
 */
function ensureNestedBulletStructure($ul, $) {
  $ul.find('> li').each((i, el) => {
    const $li = $(el);
    const text = $li.text().trim();

    // If bullet contains colon followed by multiple sub-points, nest them
    if (text.includes(':') && (text.length > 80 || text.split(/[,;]/).length > 3)) {
      createNestedStructure($, $li, text);
    }
  });
}

/**
 * Create nested bullet structure from a long bullet
 */
function createNestedStructure($, $li, text) {
  // Find colon position
  const colonIdx = text.indexOf(':');
  if (colonIdx === -1 || colonIdx > 100) return;

  const label = text.substring(0, colonIdx + 1);
  const content = text.substring(colonIdx + 1).trim();

  // Try to split content into sub-bullets
  let subBullets = [];

  // Try splitting by multiple patterns
  if (content.includes('—')) {
    subBullets = content.split('—').map(s => s.trim()).filter(s => s.length > 10);
  } else if (content.split(';').length >= 2) {
    subBullets = content.split(';').map(s => s.trim()).filter(s => s.length > 10);
  } else if (content.split(',').length >= 3) {
    subBullets = content.split(',').map(s => s.trim()).filter(s => s.length > 10);
  }

  if (subBullets.length >= 2) {
    // Clear current content
    $li.empty();
    $li.text(label);

    // Create nested list
    const $nestedUl = $(`<ul style="${STYLES.ul_nested}"></ul>`);
    subBullets.forEach(bullet => {
      const cleaned = bullet.replace(/\.$/, '').trim();
      const $nestedLi = $(`<li style="${STYLES.li}"></li>`).text(cleaned);
      $nestedUl.append($nestedLi);
    });

    $li.append($nestedUl);
  }
}

/**
 * Add proper spacing like Math 1.1
 */
function addProperSpacing($) {
  // Ensure H3 sections have proper top margin
  $('h3').each((i, el) => {
    const $h3 = $(el);
    if (!$h3.attr('style') || !$h3.attr('style').includes('margin-top: 5rem')) {
      $h3.attr('style', STYLES.h3);
    }
  });

  // Ensure H4 sections have proper margin
  $('h4').each((i, el) => {
    const $h4 = $(el);
    if (!$h4.attr('style') || !$h4.attr('style').includes('margin-top: 2rem')) {
      $h4.attr('style', STYLES.h4);
    }
  });
}

function isKeyTakeaway($el, $) {
  const $prevH3 = $el.prevAll('h3').first();
  if ($prevH3.length > 0 && $prevH3.text().toLowerCase().includes('key takeaway')) {
    return true;
  }
  return false;
}

function isKeyTakeawayList($ul, $) {
  const parentStyle = $ul.attr('style') || '';
  return parentStyle.includes('list-style: none');
}

/**
 * Process a single lesson
 */
async function processLesson(lesson, dryRun = true) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 ${lesson.subject.toUpperCase()} - ${lesson.title}`);
  console.log(`${'='.repeat(70)}`);

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  if (!sections || sections.length === 0) {
    console.log('❌ No sections found');
    return null;
  }

  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  if (!contents || contents.length === 0) {
    console.log('❌ No content found');
    return null;
  }

  const originalContent = contents[0].content;
  const { html: formattedContent, stats } = formatLikeMath11(originalContent);

  console.log(`\n📊 Formatting Stats:`);
  console.log(`   • Sections converted: ${stats.sectionsConverted}`);
  console.log(`   • Bullet lists created: ${stats.bulletListsCreated}`);
  console.log(`   • Paragraphs condensed: ${stats.paragraphsCondensed}`);

  if (!dryRun && (stats.sectionsConverted > 0 || stats.bulletListsCreated > 0)) {
    await supabase
      .from('lesson_section_content')
      .update({ content: formattedContent })
      .eq('id', contents[0].id);

    console.log(`✅ Updated in database`);
  }

  return { lessonKey: lesson.lesson_key, title: lesson.title, stats };
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  const testMode = args.includes('--test');

  console.log(`\n${'='.repeat(70)}`);
  console.log(`🎨 FORMAT LIKE MATH 1.1`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Mode: ${dryRun ? '🔍 DRY RUN' : '✏️  APPLY CHANGES'}`);
  console.log(`${'='.repeat(70)}\n`);

  if (testMode) {
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
    const subjects = ['reading', 'science'];

    for (const subject of subjects) {
      console.log(`\n${'█'.repeat(70)}`);
      console.log(`   ${subject.toUpperCase()} LESSONS`);
      console.log(`${'█'.repeat(70)}`);

      const { data: lessons } = await supabase
        .from('lesson_metadata')
        .select('*')
        .eq('subject', subject)
        .order('lesson_key');

      if (lessons) {
        for (const lesson of lessons) {
          await processLesson(lesson, dryRun);
        }
      }
    }
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`✅ FORMATTING ${dryRun ? 'PREVIEW' : 'COMPLETE'}`);
  console.log(`${'='.repeat(70)}\n`);

  if (dryRun) {
    console.log('💡 To apply changes, run: node scripts/format-like-math-1.1.mjs --apply\n');
  }
}

main().catch(console.error);
