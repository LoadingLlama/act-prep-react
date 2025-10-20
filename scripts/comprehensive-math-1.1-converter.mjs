#!/usr/bin/env node

/**
 * COMPREHENSIVE Math 1.1 Converter
 *
 * This script COMPLETELY restructures lessons to match Math 1.1:
 * - Converts ALL prose sections to bullet lists
 * - Creates proper nested bullet structure
 * - Formats examples clearly with labels
 * - Removes ALL unnecessary paragraphs
 * - Makes everything scannable like Math 1.1
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

const ST = {
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  li: 'margin: 0.15rem 0;',
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  strong: 'color: #2563eb; font-weight: 600; text-decoration: underline;'
};

/**
 * Main conversion - transforms to pure Math 1.1 structure
 */
function convertToMath11Structure(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  let stats = {converted: 0, bulletLists: 0};

  // Process each H4 section
  $('h4').each((i, el) => {
    const $h4 = $(el);
    const heading = $h4.text().trim();

    // Skip if Key Takeaways
    if (heading.toLowerCase().includes('key takeaway')) return;

    // Collect all content until next heading
    const sectionContent = [];
    let $next = $h4.next();

    while ($next.length > 0 && !$next.is('h3') && !$next.is('h4')) {
      if ($next.is('p') || $next.is('ul')) {
        sectionContent.push($next);
      }
      const $temp = $next;
      $next = $next.next();
      $temp.remove(); // Remove from DOM
    }

    if (sectionContent.length === 0) return;

    // Convert this section to bullet structure
    const newContent = convertSectionToBullets($, sectionContent, heading);

    if (newContent) {
      $h4.after(newContent);
      stats.converted++;
      stats.bulletLists++;
    }
  });

  return {html: $.html(), stats};
}

/**
 * Convert a section's content to bullet-based structure
 */
function convertSectionToBullets($, elements, heading) {
  // Collect all text
  let allText = '';
  elements.forEach($el => {
    if ($el.is('p')) {
      allText += $el.text().trim() + ' ';
    } else if ($el.is('ul')) {
      $el.find('li').each((i, li) => {
        allText += $(li).text().trim() + ' ';
      });
    }
  });

  allText = allText.trim();
  if (!allText || allText.length < 50) return null;

  // Split into sentences
  const sentences = allText.split(/\.\s+(?=[A-Z])/);
  if (sentences.length === 0) return null;

  // Create intro (first 1-2 sentences if short enough)
  let intro = null;
  let bulletSentences = sentences;

  if (sentences[0].length < 150) {
    intro = sentences[0] + '.';
    bulletSentences = sentences.slice(1);
  }

  // Build the new structure
  let html = '';

  // Add intro paragraph if exists
  if (intro) {
    html += `<p style="${ST.p}">${intro}</p>`;
  }

  // Create bullet list from remaining sentences
  if (bulletSentences.length > 0) {
    html += `<ul style="${ST.ul}">`;

    bulletSentences.forEach(sentence => {
      const cleaned = sentence.trim();
      if (cleaned.length > 10) {
        // Check if sentence has sub-points (colon followed by content)
        if (cleaned.includes(':') && cleaned.length > 80) {
          html += createNestedBullet($, cleaned);
        } else {
          html += `<li style="${ST.li}">${cleaned}${cleaned.endsWith('.') ? '' : '.'}</li>`;
        }
      }
    });

    html += `</ul>`;
  }

  return html;
}

/**
 * Create a nested bullet from a sentence with colon
 */
function createNestedBullet($, text) {
  const colonIdx = text.indexOf(':');
  if (colonIdx === -1 || colonIdx > 100) {
    return `<li style="${ST.li}">${text}${text.endsWith('.') ? '' : '.'}</li>`;
  }

  const label = text.substring(0, colonIdx + 1);
  const rest = text.substring(colonIdx + 1).trim();

  // Try to split rest into sub-bullets
  let subPoints = [];

  if (rest.includes(';')) {
    subPoints = rest.split(';').map(s => s.trim()).filter(s => s.length > 5);
  } else if (rest.includes(',') && rest.split(',').length >= 3) {
    subPoints = rest.split(',').map(s => s.trim()).filter(s => s.length > 5);
  }

  if (subPoints.length >= 2) {
    let html = `<li style="${ST.li}">${label}<ul style="${ST.ul_nested}">`;
    subPoints.forEach(point => {
      const cleaned = point.replace(/\.$/, '').trim();
      html += `<li style="${ST.li}">${cleaned}</li>`;
    });
    html += `</ul></li>`;
    return html;
  }

  return `<li style="${ST.li}">${text}${text.endsWith('.') ? '' : '.'}</li>`;
}

/**
 * Test on single lesson and save output
 */
async function testLesson(subject, lessonKey) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Testing: ${subject.toUpperCase()} - ${lessonKey}`);
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
    console.log('❌ No sections');
    return;
  }

  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  if (!contents || contents.length === 0) {
    console.log('❌ No content');
    return;
  }

  const original = contents[0].content;
  const { html: converted, stats } = convertToMath11Structure(original);

  console.log(`\n📊 Stats:`);
  console.log(`   • Sections converted: ${stats.converted}`);
  console.log(`   • Bullet lists created: ${stats.bulletLists}`);

  // Save files
  const outputDir = path.join(__dirname, 'lesson-analysis');
  fs.writeFileSync(path.join(outputDir, `${lessonKey}_BEFORE_MATH11.html`), original);
  fs.writeFileSync(path.join(outputDir, `${lessonKey}_AFTER_MATH11.html`), converted);

  console.log(`\n✅ Files saved for review`);
}

async function main() {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🎯 COMPREHENSIVE MATH 1.1 CONVERTER - TEST`);
  console.log(`${'='.repeat(70)}\n`);

  await testLesson('reading', 'core-principles');

  console.log(`\n${'='.repeat(70)}`);
  console.log(`✅ TEST COMPLETE`);
  console.log(`${'='.repeat(70)}\n`);
  console.log(`Review the BEFORE/AFTER files, then run with --apply to convert all lessons\n`);
}

main().catch(console.error);
