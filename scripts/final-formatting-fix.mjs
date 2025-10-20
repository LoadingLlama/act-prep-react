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

// Glossary terms to add tooltips for
const GLOSSARY = {
  'backsolving': 'Testing answer choices by plugging them into the problem',
  'working backwards': 'Testing answer choices by plugging them into the problem',
  'substitution': 'Replacing variables with specific numbers to test answer choices',
  'algebraic': 'Using algebra and equations to solve',
  'eliminate': 'Cross out wrong answer choices',
  'independent clause': 'A complete sentence that can stand alone',
  'dependent clause': 'A sentence fragment that cannot stand alone',
  'comma splice': 'Incorrectly joining two sentences with just a comma',
  'run-on sentence': 'Two sentences incorrectly joined without punctuation',
  'semicolon': 'Punctuation (;) that joins two complete sentences',
  'colon': 'Punctuation (:) that introduces a list or explanation',
};

function addGlossaryTooltips(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Find and wrap glossary terms with tooltip spans
  Object.entries(GLOSSARY).forEach(([term, definition]) => {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');

    // Search in paragraphs and list items (but not inside examples/practice boxes)
    $('p, li').each((i, el) => {
      const $el = $(el);

      // Skip if inside a div box or already has tooltip
      if ($el.closest('div[style*="background: #fafafa"]').length > 0 ||
          $el.closest('div[style*="background: #fef2f2"]').length > 0) {
        return;
      }

      const html = $el.html();
      if (html && regex.test(html)) {
        const newHtml = html.replace(regex, (match) => {
          return `<span class="glossary-term" style="color: #2563eb; text-decoration: underline; text-decoration-style: dotted; cursor: help;" title="${definition}">${match}</span>`;
        });
        $el.html(newHtml);
      }
    });
  });

  return $.html();
}

function fixKeyTakeawaysWithCheckmarks(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Find Key Takeaways section
  $('h3').each((i, el) => {
    const $h3 = $(el);
    const text = $h3.text().trim();

    if (text.toLowerCase().includes('key takeaway')) {
      // Find the UL that follows
      const $ul = $h3.nextAll('ul').first();

      if ($ul.length > 0) {
        // Change list style to none and add checkmarks
        $ul.attr('style', 'margin: 1.5rem 0 4rem 0; font-size: 16px; line-height: 2.2; list-style: none;');

        // Add checkmark to each LI
        $ul.find('li').each((j, li) => {
          const $li = $(li);
          const content = $li.html();
          $li.html(`<span style="color: #059669; font-weight: 700; margin-right: 0.75rem;">✓</span>${content}`);
          $li.attr('style', 'margin-bottom: 1.25rem; color: #059669; font-weight: 600;');
        });
      }
    }
  });

  return $.html();
}

function renameNumberedExamplesToPractice(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Find all divs with "Example" titles
  $('div').each((i, el) => {
    const $div = $(el);
    const $title = $div.find('p').first();
    const titleText = $title.text().trim();

    // Check if it says "Example 1:", "Example 2:", etc.
    if (/^Example\s+\d+:/i.test(titleText)) {
      // Change to Practice Problem and make it red
      $title.text(titleText.replace(/^Example\s+\d+:/i, 'Practice Problem:'));
      $div.attr('style', 'border: 2px solid #dc2626; border-left: 6px solid #dc2626; border-radius: 6px; padding: 2rem; margin: 3rem 0 5rem 0; background: #fef2f2;');
      $title.attr('style', 'font-size: 16px; font-weight: 700; margin: 0 0 1.5rem 0; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;');
    }
  });

  return $.html();
}

function restoreExampleParagraphs(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Find example/practice boxes
  $('div[style*="background: #fafafa"], div[style*="background: #fef2f2"]').each((i, el) => {
    const $div = $(el);

    // Check if it has a UL with bullet points
    const $ul = $div.find('ul').first();

    if ($ul.length > 0) {
      const items = [];
      $ul.find('li').each((j, li) => {
        items.push($(li).html());
      });

      // If there are only 1-2 items, keep as paragraphs
      if (items.length <= 2) {
        $ul.remove();
        items.forEach((item, idx) => {
          const isLast = idx === items.length - 1;
          const pStyle = isLast ? 'margin: 0;' : 'margin: 0 0 0.75rem 0;';
          $div.append(`<p style="${pStyle}">${item}</p>`);
        });
      } else {
        // Keep as bullets but use nested style
        $ul.attr('style', 'margin: 0.75rem 0 0 1.5rem; font-size: 15px; line-height: 1.8; list-style: disc;');
        $ul.find('li').attr('style', 'margin-bottom: 0.5rem;');
      }
    }
  });

  return $.html();
}

async function applyFinalFormatting() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║           Final Formatting Fixes                  ║');
  console.log('║  ✓ Checkmarks  • Tooltips  • Practice Problems   ║');
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

          let finalContent = content[0].content;

          // Apply all fixes
          finalContent = fixKeyTakeawaysWithCheckmarks(finalContent);
          finalContent = addGlossaryTooltips(finalContent);
          finalContent = renameNumberedExamplesToPractice(finalContent);
          finalContent = restoreExampleParagraphs(finalContent);

          // Update database
          const { error: updateError } = await supabase
            .from('lesson_section_content')
            .update({ content: finalContent })
            .eq('id', content[0].id);

          if (updateError) throw updateError;

          console.log(`   ✅ Updated: ${section.title}`);
        }

        processed++;

      } catch (err) {
        console.error(`   ❌ Error: ${err.message}`);
        errors++;
      }
    }

    console.log('\n' + '─'.repeat(60));
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║            Final Formatting Complete!             ║');
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

applyFinalFormatting();
