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

// CLEAN TEMPLATE STYLING - From MATH_1_1_TEMPLATE.html
const STYLES = {
  // Paragraphs - simple and clean
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  p_intro: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',

  // Headers - clean with good spacing
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  h4_example: 'margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;',

  // Lists - compact and readable
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  li: 'margin: 0.15rem 0;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',

  // Key Takeaways - green with checkmarks
  h3_key: 'color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;',
  ul_key: 'list-style: none; padding: 0; margin: 0;',
  li_key: 'margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;',
  checkmark: 'color: #4caf50; font-weight: bold; margin-right: 0.5rem;',

  // Glossary terms - blue underlined
  glossary: 'color: #2563eb; font-weight: 600; text-decoration: underline;',

  // Answer choices
  answer: 'font-family: \'Times New Roman\', Times, Georgia, serif;',
};

function applyCleanStyling(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Remove any existing html/head/body tags from cheerio wrapping
  let content = $.html();
  content = content.replace(/<html><head><\/head><body>/gi, '');
  content = content.replace(/<\/body><\/html>/gi, '');

  // Reload without wrapper
  const $clean = cheerio.load(content, { decodeEntities: false });

  // Apply paragraph styling
  $clean('p').each((i, el) => {
    const $p = $clean(el);
    // Keep existing strong tags but update paragraph style
    $p.attr('style', STYLES.p);
  });

  // Apply H3 styling
  $clean('h3').each((i, el) => {
    const $h3 = $clean(el);
    const text = $h3.text().trim().toLowerCase();

    if (text.includes('key takeaway')) {
      $h3.attr('style', STYLES.h3_key);
    } else {
      // Remove any borders/padding added by previous scripts
      $h3.attr('style', STYLES.h3);
    }
  });

  // Apply H4 styling
  $clean('h4').each((i, el) => {
    const $h4 = $clean(el);
    const text = $h4.text().trim();

    // Check if it's an example header
    if (text.match(/example\s+\d+:/i) || text.includes('Practice Problem')) {
      $h4.attr('style', STYLES.h4_example);
    } else {
      $h4.attr('style', STYLES.h4);
    }
  });

  // Apply UL/LI styling
  $clean('ul').each((i, el) => {
    const $ul = $clean(el);

    // Check if this is Key Takeaways list
    const prevH3 = $ul.prevAll('h3').first().text().trim().toLowerCase();
    if (prevH3.includes('key takeaway')) {
      $ul.attr('style', STYLES.ul_key);

      // Add checkmarks to each LI
      $ul.find('li').each((j, li) => {
        const $li = $clean(li);
        $li.attr('style', STYLES.li_key);

        const content = $li.html();
        // Only add checkmark if not already there
        if (!content.includes('✓')) {
          $li.html(`<span style="${STYLES.checkmark}">✓</span>${content}`);
        }
      });
    } else {
      // Regular list
      const parent = $ul.parent();

      // Check if nested
      if (parent.is('li')) {
        $ul.attr('style', STYLES.ul_nested);
      } else {
        $ul.attr('style', STYLES.ul);
      }

      $ul.find('li').attr('style', STYLES.li);
    }
  });

  // Style glossary terms (keep existing ones, don't add new)
  $clean('strong').each((i, el) => {
    const $strong = $clean(el);
    const currentStyle = $strong.attr('style') || '';

    // If it already has blue color and underline, keep that style
    if (currentStyle.includes('#2563eb') || currentStyle.includes('text-decoration: underline')) {
      $strong.attr('style', STYLES.glossary);
    }
  });

  // Clean up answer choice formatting
  $clean('span').each((i, el) => {
    const $span = $clean(el);
    const text = $span.text().trim();

    // Check if it's an answer choice (A. B. C. etc.)
    if (text.match(/^[A-E]\.?\s*\d+/) || text.match(/^[A-E]$/)) {
      $span.attr('style', STYLES.answer);
    }
  });

  // Remove excessive spacing elements added by previous scripts
  $clean('div').each((i, el) => {
    const $div = $clean(el);
    const style = $div.attr('style') || '';

    // Remove any fancy box styling - keep content simple
    if (style.includes('border-radius') || style.includes('background: #fafafa') || style.includes('background: #fef2f2')) {
      // Remove the div wrapper but keep the content
      $div.replaceWith($div.html());
    }
  });

  // Clean up any extra nested ULs from previous formatting
  $clean('ul ul ul').each((i, el) => {
    const $ul = $clean(el);
    $ul.replaceWith($ul.html());
  });

  return $clean.html();
}

async function applyToAllLessons() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║      Apply Clean Template Styling to All         ║');
  console.log('║              (MATH_1_1_TEMPLATE.html)             ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  try {
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

        const { data: sections, error: sectionsError } = await supabase
          .from('lesson_sections')
          .select('id, title, order_index')
          .eq('lesson_id', lesson.id)
          .order('order_index');

        if (sectionsError) throw sectionsError;

        if (!sections || sections.length === 0) {
          console.log('   ⏭️  No sections, skipping');
          skipped++;
          continue;
        }

        for (const section of sections) {
          const { data: content, error: contentError } = await supabase
            .from('lesson_section_content')
            .select('id, content, order_index')
            .eq('section_id', section.id)
            .order('order_index')
            .limit(1);

          if (contentError) throw contentError;
          if (!content || content.length === 0) continue;

          const originalContent = content[0].content;
          const cleanContent = applyCleanStyling(originalContent);

          // Update database
          const { error: updateError } = await supabase
            .from('lesson_section_content')
            .update({ content: cleanContent })
            .eq('id', content[0].id);

          if (updateError) throw updateError;

          console.log(`   ✅ Applied clean styling: ${section.title}`);
        }

        processed++;

      } catch (err) {
        console.error(`   ❌ Error: ${err.message}`);
        errors++;
      }
    }

    console.log('\n' + '─'.repeat(60));
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║         Clean Template Styling Applied!          ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');
    console.log(`✅ Successfully processed: ${processed} lessons`);
    console.log(`⏭️  Skipped: ${skipped} lessons`);
    console.log(`❌ Errors: ${errors} lessons`);
    console.log('');

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

applyToAllLessons();
