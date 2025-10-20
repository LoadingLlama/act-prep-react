#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Golden template styling
const STYLES = {
  // Paragraphs
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',

  // Headers
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h3_green: 'color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;',
  h4: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  h4_example: 'margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;',

  // Lists
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  li: 'margin: 0.15rem 0;',

  // Key terms (blue underlined)
  keyTerm: 'color: #2563eb; font-weight: 600; text-decoration: underline;',

  // Key Takeaways
  keyTakeaway_ul: 'list-style: none; padding: 0; margin: 0;',
  keyTakeaway_li: 'margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;',
  keyTakeaway_check: 'color: #4caf50; font-weight: bold; margin-right: 0.5rem;'
};

/**
 * RESTRUCTURING RULES based on golden template analysis:
 *
 * 1. Opening Paragraph:
 *    - Should be 3-4 sentences max
 *    - Highlight 3-5 key terms with blue underline
 *    - Set expectations for what's to come
 *
 * 2. Section Structure:
 *    - 4-5 numbered H3 sections
 *    - Each H3 should be clear and descriptive
 *    - H4 subsections for steps/sub-topics
 *
 * 3. Content Format:
 *    - Short paragraphs (2-3 sentences) followed by bullets
 *    - NOT long dense paragraphs
 *    - Use nested bullet lists for examples
 *
 * 4. Examples:
 *    - Extract to red-bordered boxes
 *    - Include actual problem + solution
 *    - Use H4 with red border style
 *
 * 5. Must-Have Sections:
 *    - "What Is [Topic]?" - definition and overview
 *    - "The Process" or "How It Works" - step-by-step
 *    - Examples - at least 1-2 worked examples
 *    - "When to Use" / "When NOT to Use"
 *    - Key Takeaways
 *
 * 6. Flow:
 *    - Introduce concept
 *    - Explain process
 *    - Show examples
 *    - Clarify limitations
 *    - Summarize
 */

async function restructureLesson(lessonId, lessonKey, title) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Restructuring: ${title} (${lessonKey})`);
  console.log('='.repeat(60));

  // Get current content
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id, title')
    .eq('lesson_id', lessonId)
    .limit(1);

  if (!sections || sections.length === 0) {
    console.log('⏭️  No sections found');
    return { status: 'skipped', reason: 'no_sections' };
  }

  const { data: content } = await supabase
    .from('lesson_section_content')
    .select('id, content')
    .eq('section_id', sections[0].id)
    .limit(1);

  if (!content || content.length === 0) {
    console.log('⏭️  No content found');
    return { status: 'skipped', reason: 'no_content' };
  }

  const originalHTML = content[0].content;
  const originalLength = originalHTML.length;

  console.log(`Original length: ${originalLength} chars`);

  // Parse and analyze
  const $ = cheerio.load(originalHTML, { decodeEntities: false });

  const analysis = {
    h3Count: $('h3').length,
    h4Count: $('h4').length,
    paragraphCount: $('p').length,
    listCount: $('ul').length,
    hasExamples: $('p').filter((i, el) => $(el).html()?.includes('<strong>Example')).length > 0,
    hasKeyTakeaways: $('h3').filter((i, el) => $(el).text().includes('Key Takeaway')).length > 0
  };

  console.log(`Structure: ${analysis.h3Count} H3s, ${analysis.h4Count} H4s, ${analysis.paragraphCount} ps, ${analysis.listCount} lists`);

  // Apply restructuring
  let restructured = originalHTML;

  // PHASE 1: Fix styling to match golden template
  restructured = applyGoldenTemplateStyling(restructured);

  // PHASE 2: Convert long paragraphs to bullet points
  restructured = convertParagraphsToBullets(restructured);

  // PHASE 3: Extract and format examples
  restructured = extractAndFormatExamples(restructured);

  // PHASE 4: Add numbered sections if missing
  restructured = addNumberedSections(restructured);

  // PHASE 5: Ensure Key Takeaways formatting
  restructured = formatKeyTakeaways(restructured);

  const newLength = restructured.length;
  const percentChange = ((newLength / originalLength - 1) * 100).toFixed(1);

  console.log(`New length: ${newLength} chars (${percentChange}% change)`);

  // Save sample for review
  const sampleDir = path.join(__dirname, '../samples/restructured');
  if (!fs.existsSync(sampleDir)) {
    fs.mkdirSync(sampleDir, { recursive: true });
  }
  const samplePath = path.join(sampleDir, `${lessonKey}.html`);
  fs.writeFileSync(samplePath, restructured);
  console.log(`✅ Sample saved to: samples/restructured/${lessonKey}.html`);

  return {
    status: 'restructured',
    originalLength,
    newLength,
    percentChange: parseFloat(percentChange),
    analysis
  };
}

function applyGoldenTemplateStyling(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Fix all paragraphs
  $('p').attr('style', STYLES.p);

  // Fix H3 sections
  $('h3').each((i, el) => {
    const $h3 = $(el);
    const text = $h3.text().trim().toLowerCase();
    if (text.includes('key takeaway')) {
      $h3.attr('style', STYLES.h3_green);
    } else {
      $h3.attr('style', STYLES.h3);
    }
  });

  // Fix H4 sections
  $('h4').each((i, el) => {
    const $h4 = $(el);
    const text = $h4.text().trim();
    if (text.match(/example\s+\d+:/i)) {
      $h4.attr('style', STYLES.h4_example);
    } else {
      $h4.attr('style', STYLES.h4);
    }
  });

  // Fix lists
  $('ul').each((i, el) => {
    const $ul = $(el);
    const parent = $ul.parent();

    // Check if nested
    if (parent.is('li')) {
      $ul.attr('style', STYLES.ul_nested);
    } else {
      $ul.attr('style', STYLES.ul);
    }

    $ul.find('li').attr('style', STYLES.li);
  });

  return $.html();
}

function convertParagraphsToBullets(html) {
  // This is a complex transformation that would ideally use AI
  // For now, we'll preserve the structure but ensure proper styling
  // A full implementation would parse semantic meaning and convert appropriately
  return html;
}

function extractAndFormatExamples(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Find inline examples and convert to red-bordered boxes
  $('p').each((i, el) => {
    const $p = $(el);
    const htmlContent = $p.html() || '';

    // Check if this is an example paragraph
    if (htmlContent.includes('<strong>Example')) {
      // Extract example content
      const exampleMatch = htmlContent.match(/<strong>Example\s+(\d+)?:?\s*([^<]+)<\/strong>(.*)/i);

      if (exampleMatch) {
        const exampleNum = exampleMatch[1] || '1';
        const exampleTitle = exampleMatch[2] || 'Example';
        const exampleContent = exampleMatch[3] || '';

        // Create red-bordered example box
        const exampleHTML = `
<h4 style="${STYLES.h4_example}">Example ${exampleNum}: ${exampleTitle.trim()}</h4>
<p style="${STYLES.p}">${exampleContent.trim()}</p>
        `.trim();

        $p.replaceWith(exampleHTML);
      }
    }
  });

  return $.html();
}

function addNumberedSections(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Add numbers to H3s if not already numbered
  let sectionNum = 0;
  $('h3').each((i, el) => {
    const $h3 = $(el);
    const text = $h3.text().trim();

    // Skip Key Takeaways
    if (text.toLowerCase().includes('key takeaway')) {
      return;
    }

    // Skip if already numbered
    if (text.match(/^\d+\./)) {
      return;
    }

    sectionNum++;
    $h3.text(`${sectionNum}. ${text}`);
  });

  return $.html();
}

function formatKeyTakeaways(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Find Key Takeaways section
  $('h3').each((i, el) => {
    const $h3 = $(el);
    const text = $h3.text().trim().toLowerCase();

    if (text.includes('key takeaway')) {
      $h3.attr('style', STYLES.h3_green);

      // Find the following UL
      const $ul = $h3.nextAll('ul').first();
      if ($ul.length > 0) {
        $ul.attr('style', STYLES.keyTakeaway_ul);

        $ul.find('li').each((j, li) => {
          const $li = $(li);
          $li.attr('style', STYLES.keyTakeaway_li);

          // Add checkmark if not present
          const content = $li.html() || '';
          if (!content.includes('✓')) {
            $li.html(`<span style="${STYLES.keyTakeaway_check}">✓</span>${content}`);
          }
        });
      }
    }
  });

  return $.html();
}

async function restructureAllLessons() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║  Comprehensive Lesson Restructuring (Phase 1)     ║');
  console.log('║  Applying Golden Template Structure              ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // Start with a few test lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, subject')
    .limit(5);

  console.log(`Testing on ${lessons.length} lessons...\n`);

  const results = [];

  for (const lesson of lessons) {
    try {
      const result = await restructureLesson(lesson.id, lesson.lesson_key, lesson.title);
      results.push({ lesson: lesson.title, ...result });
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      results.push({ lesson: lesson.title, status: 'error', error: err.message });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 RESTRUCTURING SUMMARY:\n');

  const successful = results.filter(r => r.status === 'restructured');
  const skipped = results.filter(r => r.status === 'skipped');
  const errors = results.filter(r => r.status === 'error');

  console.log(`✅ Successfully restructured: ${successful.length}`);
  console.log(`⏭️  Skipped: ${skipped.length}`);
  console.log(`❌ Errors: ${errors.length}\n`);

  if (successful.length > 0) {
    const avgChange = (successful.reduce((sum, r) => sum + r.percentChange, 0) / successful.length).toFixed(1);
    console.log(`Average size change: ${avgChange}%\n`);
  }

  console.log('📁 Review restructured samples in: samples/restructured/\n');
  console.log('⚠️  This was a TEST RUN. Review samples before applying to all lessons.\n');
}

restructureAllLessons();
