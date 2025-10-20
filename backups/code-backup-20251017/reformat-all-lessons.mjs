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

// Formatting rules based on approved template
const STYLES = {
  // Main sections
  h3: 'margin-top: 6rem; margin-bottom: 1.5rem; font-weight: 700; font-size: 20px;',
  h3_green: 'margin-top: 6rem; margin-bottom: 1.5rem; font-weight: 700; font-size: 20px; color: #059669;',
  h4: 'margin-top: 3rem; margin-bottom: 1rem; font-weight: 600; font-size: 18px;',

  // Lists
  ul: 'margin: 1rem 0 3rem 1.5rem; font-size: 16px; line-height: 2;',
  li: 'margin-bottom: 0.75rem;',
  li_green: 'margin-bottom: 1rem; color: #059669; font-weight: 600;',

  // Paragraphs
  p_intro: 'font-size: 16px; line-height: 1.8; margin: 0 0 2rem 0;',
  p_normal: 'margin: 0 0 0.75rem 0;',
  p_last: 'margin: 0;',

  // Examples (gray boxes)
  example_box: 'border: 1px solid #d1d5db; padding: 1.5rem; margin: 2rem 0 3rem 0; background: #fafafa;',
  example_title: 'font-size: 15px; font-weight: 600; margin: 0 0 1rem 0;',

  // Practice problems (red boxes)
  practice_box: 'border: 1px solid #dc2626; border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0 3rem 0; background: #fef2f2;',
  practice_title: 'font-size: 15px; font-weight: 600; margin: 0 0 1rem 0; color: #991b1b;',
};

function reformatHTML(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Fix all H3 sections (except Key Takeaways)
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

  // Fix all UL lists
  $('ul').each((i, el) => {
    const parent = $(el).parent();
    // Check if this is a Key Takeaways list
    const prevH3 = $(el).prevAll('h3').first().text().trim();
    if (prevH3.toLowerCase().includes('key takeaway')) {
      $(el).attr('style', STYLES.ul);
      // Make all LIs green
      $(el).find('li').attr('style', STYLES.li_green);
    } else {
      $(el).attr('style', STYLES.ul);
      $(el).find('li').attr('style', STYLES.li);
    }
  });

  // Fix example boxes (gray)
  $('div').each((i, el) => {
    const style = $(el).attr('style') || '';
    const text = $(el).text().toLowerCase();

    // Identify example boxes (not red/practice)
    if (style.includes('background') &&
        (text.includes('example') || text.includes('solution')) &&
        !style.includes('#dc2626') && !style.includes('#fef2f2')) {
      $(el).attr('style', STYLES.example_box);

      // Fix the title
      $(el).find('p').first().attr('style', STYLES.example_title);
    }

    // Identify practice boxes (red)
    if (style.includes('#dc2626') || style.includes('#fef2f2') ||
        text.includes('practice problem') || text.includes('quick practice')) {
      $(el).attr('style', STYLES.practice_box);

      // Fix the title with red color
      $(el).find('p').first().attr('style', STYLES.practice_title);
    }
  });

  // Fix intro paragraphs (first p after h3 or at start)
  $('p').each((i, el) => {
    const parent = $(el).parent();
    const prevSibling = $(el).prev();

    // Skip if inside a box
    if (parent.is('div[style*="background"]')) return;

    // Check if it's an intro paragraph (comes right after h3 or h2 or is first)
    if (prevSibling.is('h3') || prevSibling.is('h2') || i === 0) {
      $(el).attr('style', STYLES.p_intro);
    }
  });

  return $.html();
}

async function reformatAllLessons() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║   ACT Prep - Systematic Lesson Reformatting      ║');
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
            .from('section_content')
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

          // Apply reformatting
          const reformattedContent = reformatHTML(originalContent);
          const newLength = reformattedContent.length;

          // Update in database
          const { error: updateError } = await supabase
            .from('section_content')
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
    console.log('║              Reformatting Complete!               ║');
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
