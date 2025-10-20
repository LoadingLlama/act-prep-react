#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ULTRA STRUCTURED FORMATTING - Maximum separation and bullet points
const STYLES = {
  // Main sections - MASSIVE spacing
  h3: 'margin-top: 8rem; margin-bottom: 2rem; font-weight: 700; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.75rem;',
  h3_green: 'margin-top: 8rem; margin-bottom: 2rem; font-weight: 700; font-size: 20px; color: #059669; border-bottom: 2px solid #059669; padding-bottom: 0.75rem;',
  h4: 'margin-top: 4rem; margin-bottom: 1.5rem; font-weight: 600; font-size: 18px; color: #374151;',
  h5: 'margin-top: 2rem; margin-bottom: 1rem; font-weight: 600; font-size: 16px; color: #6b7280;',

  // Lists - more spacing
  ul: 'margin: 1.5rem 0 4rem 1.5rem; font-size: 16px; line-height: 2.2;',
  li: 'margin-bottom: 1rem;',
  li_green: 'margin-bottom: 1.25rem; color: #059669; font-weight: 600;',

  // Nested lists for examples
  ul_nested: 'margin: 0.75rem 0 0.75rem 1.5rem; font-size: 15px; line-height: 1.8;',
  li_nested: 'margin-bottom: 0.5rem;',

  // Paragraphs
  p_intro: 'font-size: 16px; line-height: 1.8; margin: 0 0 3rem 0;',
  p_normal: 'margin: 0 0 1rem 0;',
  p_last: 'margin: 0;',

  // Examples (gray boxes) - MORE spacing
  example_box: 'border: 1px solid #d1d5db; border-radius: 6px; padding: 2rem; margin: 3rem 0 5rem 0; background: #fafafa;',
  example_title: 'font-size: 16px; font-weight: 700; margin: 0 0 1.5rem 0; color: #1f2937; text-transform: uppercase; letter-spacing: 0.5px;',

  // Practice problems (red boxes) - MORE spacing
  practice_box: 'border: 2px solid #dc2626; border-left: 6px solid #dc2626; border-radius: 6px; padding: 2rem; margin: 3rem 0 5rem 0; background: #fef2f2;',
  practice_title: 'font-size: 16px; font-weight: 700; margin: 0 0 1.5rem 0; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;',
};

function convertExamplesToBullets(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Convert example boxes to have bullet points
  $('div').each((i, el) => {
    const $div = $(el);
    const style = $div.attr('style') || '';

    // Skip if not an example/practice box
    if (!style.includes('background: #fafafa') && !style.includes('background: #fef2f2')) {
      return;
    }

    // Get all paragraphs except the title
    const $paragraphs = $div.find('p').not(':first');

    if ($paragraphs.length === 0) return;

    // Check if we should convert to bullets
    // Convert if there are multiple steps or Test statements
    const hasMultipleSteps = $paragraphs.length >= 2;
    const hasTestStatements = $paragraphs.text().includes('Test') || $paragraphs.text().includes('Step');

    if (hasMultipleSteps || hasTestStatements) {
      // Create a new UL for the steps
      const $ul = $('<ul></ul>').attr('style', STYLES.ul_nested);

      $paragraphs.each((j, p) => {
        const $p = $(p);
        const text = $p.html();

        // Skip if empty
        if (!text || text.trim() === '') return;

        // Create list item
        const $li = $('<li></li>')
          .attr('style', STYLES.li_nested)
          .html(text);

        $ul.append($li);
        $p.remove();
      });

      // Append the UL to the div
      $div.append($ul);
    }
  });

  return $.html();
}

function addMoreStructure(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Apply ultra-structured formatting

  // Fix all H3 sections with underline
  $('h3').each((i, el) => {
    const text = $(el).text().trim();
    if (text.toLowerCase().includes('key takeaway')) {
      $(el).attr('style', STYLES.h3_green);
    } else {
      $(el).attr('style', STYLES.h3);
    }
  });

  // Fix all H4 sections
  $('h4').attr('style', STYLES.h4);

  // Fix all H5 sections (if any)
  $('h5').attr('style', STYLES.h5);

  // Fix all main UL lists
  $('ul').each((i, el) => {
    const $ul = $(el);
    const parent = $ul.parent();

    // Skip nested lists
    if ($ul.attr('style') && $ul.attr('style').includes('ul_nested')) {
      return;
    }

    // Check if this is a Key Takeaways list
    const prevH3 = $ul.prevAll('h3').first().text().trim();
    if (prevH3.toLowerCase().includes('key takeaway')) {
      $ul.attr('style', STYLES.ul);
      // Make all LIs green
      $ul.find('li').attr('style', STYLES.li_green);
    } else {
      $ul.attr('style', STYLES.ul);
      $ul.find('li').attr('style', STYLES.li);
    }
  });

  // Fix example boxes (gray)
  $('div').each((i, el) => {
    const $div = $(el);
    const style = $div.attr('style') || '';
    const text = $div.text().toLowerCase();

    // Identify example boxes (not red/practice)
    if (style.includes('background') &&
        (text.includes('example') || text.includes('solution')) &&
        !style.includes('#dc2626') && !style.includes('#fef2f2')) {
      $div.attr('style', STYLES.example_box);

      // Fix the title
      $div.find('p').first().attr('style', STYLES.example_title);
    }

    // Identify practice boxes (red)
    if (style.includes('#dc2626') || style.includes('#fef2f2') ||
        text.includes('practice problem') || text.includes('quick practice')) {
      $div.attr('style', STYLES.practice_box);

      // Fix the title with red color
      $div.find('p').first().attr('style', STYLES.practice_title);
    }
  });

  // Fix intro paragraphs
  $('p').each((i, el) => {
    const $p = $(el);
    const parent = $p.parent();

    // Skip if inside a box or list
    if (parent.is('div[style*="background"]') || parent.is('li') || parent.is('ul')) {
      return;
    }

    // Check if it's an intro paragraph
    const prevSibling = $p.prev();
    if (prevSibling.is('h3') || prevSibling.is('h2') || i === 0) {
      $p.attr('style', STYLES.p_intro);
    }
  });

  return $.html();
}

async function reformatAllLessons() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║  ULTRA-STRUCTURED Lesson Reformatting            ║');
  console.log('║  More Bullets • More Spacing • More Structure    ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  try {
    // Fetch all lessons
    console.log('📥 Fetching all lessons from database...');
    const { data: lessons, error: lessonsError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title, subject')
      .order('subject, lesson_key');

    if (lessonsError) throw lessonsError;

    console.log(`✅ Found ${lessons.length} lessons\n`);
    console.log('─'.repeat(60));

    let processed = 0;
    let skipped = 0;
    let errors = 0;

    for (const lesson of lessons) {
      try {
        console.log(`\n[${processed + 1}/${lessons.length}] ${lesson.subject.toUpperCase()} - ${lesson.title}`);
        console.log(`   Lesson Key: ${lesson.lesson_key}`);

        // Fetch lesson sections
        const { data: sections, error: sectionsError } = await supabase
          .from('lesson_sections')
          .select('id, title, order_index')
          .eq('lesson_id', lesson.id)
          .order('order_index');

        if (sectionsError) throw sectionsError;

        if (!sections || sections.length === 0) {
          console.log('   ⏭️  No sections found, skipping');
          skipped++;
          continue;
        }

        // Process each section
        for (const section of sections) {
          // Fetch content
          const { data: content, error: contentError } = await supabase
            .from('lesson_section_content')
            .select('id, content, order_index')
            .eq('section_id', section.id)
            .order('order_index')
            .limit(1);

          if (contentError) throw contentError;

          if (!content || content.length === 0) {
            continue;
          }

          const originalContent = content[0].content;
          const originalLength = originalContent.length;

          // Apply ULTRA reformatting
          let reformattedContent = convertExamplesToBullets(originalContent);
          reformattedContent = addMoreStructure(reformattedContent);
          const newLength = reformattedContent.length;

          // Update in database
          const { error: updateError } = await supabase
            .from('lesson_section_content')
            .update({
              content: reformattedContent
            })
            .eq('id', content[0].id);

          if (updateError) throw updateError;

          console.log(`   ✅ Updated section: ${section.title}`);
          console.log(`      ${originalLength} → ${newLength} chars (${((newLength/originalLength - 1) * 100).toFixed(1)}%)`);
        }

        processed++;

      } catch (err) {
        console.error(`   ❌ Error: ${err.message}`);
        errors++;
      }
    }

    console.log('\n' + '─'.repeat(60));
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║         Ultra-Structured Reformatting Complete!   ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');
    console.log(`✅ Successfully processed: ${processed} lessons`);
    console.log(`⏭️  Skipped (no content): ${skipped} lessons`);
    console.log(`❌ Errors: ${errors} lessons`);
    console.log('');

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

reformatAllLessons();
