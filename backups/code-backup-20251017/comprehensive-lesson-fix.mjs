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

function comprehensiveFix(html) {
  // Remove HTML comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // Remove html/head/body wrappers from cheerio
  html = html.replace(/<html[^>]*>/gi, '');
  html = html.replace(/<\/html>/gi, '');
  html = html.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  html = html.replace(/<body[^>]*>/gi, '');
  html = html.replace(/<\/body>/gi, '');

  // Trim whitespace
  html = html.trim();

  // Load into cheerio for processing
  const $ = cheerio.load(html, {
    decodeEntities: false,
    xmlMode: false
  });

  // CRITICAL: Apply clean template styling

  // 1. Fix all paragraphs
  $('p').attr('style', 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;');

  // 2. Fix all H3 headers
  $('h3').each((i, el) => {
    const $h3 = $(el);
    const text = $h3.text().trim().toLowerCase();

    if (text.includes('key takeaway')) {
      $h3.attr('style', 'color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;');
    } else {
      $h3.attr('style', 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;');
    }
  });

  // 3. Fix all H4 headers
  $('h4').each((i, el) => {
    const $h4 = $(el);
    const text = $h4.text().trim();

    // Check if it's an example/practice header
    if (text.match(/example\s+\d+:/i) || text.match(/practice\s+problem\s+\d+:/i)) {
      $h4.attr('style', 'margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;');
    } else {
      $h4.attr('style', 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;');
    }
  });

  // 4. Fix all UL lists
  $('ul').each((i, el) => {
    const $ul = $(el);
    const parent = $ul.parent();

    // Check if it's a Key Takeaways list
    const prevH3 = $ul.prevAll('h3').first().text().trim().toLowerCase();

    if (prevH3.includes('key takeaway')) {
      // Key Takeaways list
      $ul.attr('style', 'list-style: none; padding: 0; margin: 0;');

      $ul.find('li').each((j, li) => {
        const $li = $(li);
        $li.attr('style', 'margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;');

        let content = $li.html();
        // Add checkmark if not present
        if (!content.includes('✓')) {
          // Remove any existing checkmark spans first
          content = content.replace(/<span[^>]*>✓<\/span>\s*/g, '');
          $li.html(`<span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${content}`);
        }
      });
    } else if (parent.is('li')) {
      // Nested list
      $ul.attr('style', 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;');
      $ul.find('li').attr('style', 'margin: 0.15rem 0;');
    } else {
      // Regular list
      $ul.attr('style', 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;');
      $ul.find('li').attr('style', 'margin: 0.15rem 0;');
    }
  });

  // 5. Keep glossary terms styled
  $('strong').each((i, el) => {
    const $strong = $(el);
    const currentStyle = $strong.attr('style') || '';

    if (currentStyle.includes('#2563eb') || currentStyle.includes('underline')) {
      $strong.attr('style', 'color: #2563eb; font-weight: 600; text-decoration: underline;');
    }
  });

  // 6. Style answer choices
  $('span').each((i, el) => {
    const $span = $(el);
    const text = $span.text().trim();
    const currentStyle = $span.attr('style') || '';

    // Answer choice spans
    if ((text.match(/^[A-E]\.?\s*\d+/) || text.match(/^[A-E]\.?$/)) && !currentStyle.includes('color:')) {
      $span.attr('style', "font-family: 'Times New Roman', Times, Georgia, serif;");
    }
  });

  // Get the clean HTML
  let cleanHtml = $.html();

  // Remove cheerio's added html/body tags again
  cleanHtml = cleanHtml.replace(/<html[^>]*>/gi, '');
  cleanHtml = cleanHtml.replace(/<\/html>/gi, '');
  cleanHtml = cleanHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  cleanHtml = cleanHtml.replace(/<body[^>]*>/gi, '');
  cleanHtml = cleanHtml.replace(/<\/body>/gi, '');

  return cleanHtml.trim();
}

async function fixAllLessons() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║     Comprehensive Lesson Fix - All 116 Lessons   ║');
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
            .from('section_content')
            .select('id, content, order_index')
            .eq('section_id', section.id)
            .order('order_index')
            .limit(1);

          if (contentError) throw contentError;
          if (!content || content.length === 0) continue;

          const originalContent = content[0].content;
          const originalLength = originalContent.length;

          // Apply comprehensive fix
          const fixedContent = comprehensiveFix(originalContent);
          const newLength = fixedContent.length;

          // Update database
          const { error: updateError } = await supabase
            .from('section_content')
            .update({ content: fixedContent })
            .eq('id', content[0].id);

          if (updateError) throw updateError;

          const change = ((newLength / originalLength - 1) * 100).toFixed(1);
          console.log(`   ✅ Fixed: ${section.title} (${originalLength} → ${newLength} chars, ${change}%)`);
        }

        processed++;

      } catch (err) {
        console.error(`   ❌ Error: ${err.message}`);
        errors++;
      }
    }

    console.log('\n' + '─'.repeat(60));
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║          Comprehensive Fix Complete!             ║');
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

fixAllLessons();
