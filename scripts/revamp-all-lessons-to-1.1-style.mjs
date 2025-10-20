#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, '../docs');

// Lesson 1.1 Template Structure
const LESSON_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{TITLE}}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1000px; margin: 40px auto; padding: 20px; }
    h1 { color: #2c3e50; }
    h2 { color: #34495e; margin-top: 30px; }
    .section { margin: 30px 0; }
    .content-block { margin: 15px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #3498db; }
    .metadata { background: #ecf0f1; padding: 15px; border-radius: 5px; margin-bottom: 30px; }
  </style>
</head>
<body>
  <div class="metadata">
    <h1>{{TITLE}}</h1>
    <p><strong>Lesson Key:</strong> {{LESSON_KEY}}</p>
    <p><strong>Category:</strong> {{CATEGORY}}</p>
    <p><strong>Difficulty:</strong> {{DIFFICULTY}}</p>
    <p><strong>Duration:</strong> {{DURATION}}</p>
  </div>

  <div class="section">
    <h2>Main Content</h2>
    <div class="content-block">
{{CONTENT}}
    </div>
  </div>
</body>
</html>`;

// Clean styling rules from lesson 1.1
const STYLES = {
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  li: 'margin: 0.15rem 0;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  h3_key: 'color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;',
  ul_key: 'list-style: none; padding: 0; margin: 0;',
  li_key: 'margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;',
  checkmark: 'color: #4caf50; font-weight: bold; margin-right: 0.5rem;',
  glossary: 'color: #2563eb; font-weight: 600; text-decoration: underline;',
  answer_p: 'margin: 0.3rem 0 0.5rem 0;',
  answer_span: `font-family: 'Times New Roman', Times, Georgia, serif;`,
  solution_p: 'margin: 1.5rem 0 0.75rem 0;',
  answer_final: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  spacer: 'height: 1px; margin: 0; padding: 0;',
  hidden_h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;',
};

function cleanAndApplyStyling(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // Remove wrapper tags if present
  let content = $.html();
  content = content.replace(/<html><head><\/head><body>/gi, '');
  content = content.replace(/<\/body><\/html>/gi, '');

  const $clean = cheerio.load(content, { decodeEntities: false });

  // Apply paragraph styling
  $clean('p').each((i, el) => {
    const $p = $clean(el);
    const text = $p.text().trim().toLowerCase();

    if (text.startsWith('answer:')) {
      $p.attr('style', STYLES.answer_final);
    } else if ($p.prev().is('p') && $p.prev().text().includes('Solution:')) {
      // This might be an answer choices paragraph
      const hasAnswerChoices = $p.find('span').length > 0;
      if (hasAnswerChoices) {
        $p.attr('style', STYLES.answer_p);
      } else {
        $p.attr('style', STYLES.p);
      }
    } else if (text.includes('solution:')) {
      $p.attr('style', STYLES.solution_p);
    } else {
      $p.attr('style', STYLES.p);
    }
  });

  // Apply H3 styling
  $clean('h3').each((i, el) => {
    const $h3 = $clean(el);
    const text = $h3.text().trim().toLowerCase();

    if (text.includes('key takeaway')) {
      $h3.attr('style', STYLES.h3_key);
    } else if (text === '.') {
      $h3.attr('style', STYLES.hidden_h3);
    } else {
      $h3.attr('style', STYLES.h3);
    }
  });

  // Apply H4 styling
  $clean('h4').each((i, el) => {
    $clean(el).attr('style', STYLES.h4);
  });

  // Apply UL/LI styling
  $clean('ul').each((i, el) => {
    const $ul = $clean(el);
    const prevH3 = $ul.prevAll('h3').first().text().trim().toLowerCase();

    if (prevH3.includes('key takeaway')) {
      $ul.attr('style', STYLES.ul_key);

      $ul.find('li').each((j, li) => {
        const $li = $clean(li);
        $li.attr('style', STYLES.li_key);

        const content = $li.html();
        if (!content.includes('✓')) {
          $li.html(`<span style="${STYLES.checkmark}">✓</span>${content}`);
        }
      });
    } else {
      const parent = $ul.parent();

      if (parent.is('li')) {
        $ul.attr('style', STYLES.ul_nested);
      } else {
        $ul.attr('style', STYLES.ul);
      }

      $ul.find('li').attr('style', STYLES.li);
    }
  });

  // Style glossary terms
  $clean('strong').each((i, el) => {
    const $strong = $clean(el);
    const currentStyle = $strong.attr('style') || '';

    if (currentStyle.includes('#2563eb') || currentStyle.includes('text-decoration: underline')) {
      $strong.attr('style', STYLES.glossary);
    }
  });

  // Style answer choices
  $clean('span').each((i, el) => {
    const $span = $clean(el);
    const text = $span.text().trim();
    const fontFamily = $span.css('font-family') || '';

    if (fontFamily.includes('Times') || text.match(/^[A-K]\./)) {
      $span.attr('style', STYLES.answer_span);
    }
  });

  // Remove fancy boxes and gradients
  $clean('div').each((i, el) => {
    const $div = $clean(el);
    const style = $div.attr('style') || '';

    if (style.includes('linear-gradient') || style.includes('border-radius') || style.includes('box-shadow')) {
      // Keep the content, remove the wrapper
      $div.replaceWith($div.html());
    }
  });

  // Add spacer before Key Takeaways
  $clean('h3').each((i, el) => {
    const $h3 = $clean(el);
    const text = $h3.text().trim().toLowerCase();

    if (text.includes('key takeaway')) {
      // Add spacer paragraph before it
      $h3.before(`<p style="${STYLES.spacer}"></p>`);
      // Add hidden h3 before the spacer
      $h3.before(`<h3 style="${STYLES.hidden_h3}">.</h3>`);
    }
  });

  return $clean.html();
}

async function processAllLessons() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║   Revamping All Lessons to Match 1.1 Style          ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  const lessonFiles = [
    'LESSON_1_2_SUBSTITUTION_NEW_COMPLETE.html',
    'LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html',
    'LESSON_2_3_LINES.html',
    'LESSON_2_4_ARCS_SECTORS.html',
    'LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html',
    'LESSON_3_1_ALGEBRA_SKILLS.html',
    'LESSON_3_2_FRACTIONS.html',
    'LESSON_3_3_EXPONENTS_ROOTS.html',
    'LESSON_3_4_LOGARITHMS.html',
    'LESSON_3_5_INEQUALITIES.html',
    'LESSON_3_6_ABSOLUTE_VALUE.html',
    'LESSON_4_1_SYSTEMS_OF_EQUATIONS.html',
    'LESSON_4_2_QUADRATICS.html',
    'LESSON_4_3_FUNCTIONS.html',
    'LESSON_4_4_TRANSFORMING_FUNCTIONS.html',
    'LESSON_4_5_EXPONENTIAL_GROWTH_DECAY.html',
    'LESSON_4_6_SEQUENCES.html',
    'LESSON_5_1_NUMBER_THEORY.html',
    'LESSON_5_2_PERCENTAGES.html',
    'LESSON_5_3_RATIOS_PROPORTIONS.html',
    'LESSON_5_4_UNIT_CONVERSION.html',
    'LESSON_5_5_SCIENTIFIC_NOTATION.html',
    'LESSON_5_6_REPEATING_PATTERNS.html',
    'LESSON_6_1_MEAN_MEDIAN_MODE.html',
    'LESSON_6_2_ADVANCED_STATISTICS.html',
    'LESSON_6_3_PROBABILITY.html',
    'LESSON_6_4_PERMUTATIONS_COMBINATIONS.html',
  ];

  let processed = 0;
  let errors = 0;

  for (const filename of lessonFiles) {
    try {
      const filepath = path.join(docsDir, filename);

      if (!fs.existsSync(filepath)) {
        console.log(`⏭️  Skipping ${filename} (file not found)`);
        continue;
      }

      console.log(`\n[${processed + 1}/${lessonFiles.length}] Processing ${filename}...`);

      const content = fs.readFileSync(filepath, 'utf-8');

      // Check if it's already a complete HTML file or just a fragment
      const isFragment = !content.trim().startsWith('<!DOCTYPE');

      let cleanedContent;
      if (isFragment) {
        // It's a fragment, apply styling and wrap in template
        cleanedContent = cleanAndApplyStyling(content);

        // For now, just save the styled fragment
        // Full template wrapping can be added later if needed
        fs.writeFileSync(filepath, cleanedContent, 'utf-8');
        console.log(`   ✅ Applied 1.1 styling to fragment`);
      } else {
        // It's a complete HTML file, extract content and apply styling
        const $ = cheerio.load(content);
        const mainContent = $('.content-block').html() || $('body').html() || content;

        cleanedContent = cleanAndApplyStyling(mainContent);

        // Re-wrap in the full HTML structure
        const title = $('title').text() || $('h1').first().text() || filename.replace('.html', '');
        const lessonKey = filename.replace('LESSON_', '').replace('.html', '').toLowerCase();

        const fullHtml = LESSON_TEMPLATE
          .replace(/{{TITLE}}/g, title)
          .replace(/{{LESSON_KEY}}/g, lessonKey)
          .replace(/{{CATEGORY}}/g, 'Math')
          .replace(/{{DIFFICULTY}}/g, '3/5')
          .replace(/{{DURATION}}/g, '30 minutes')
          .replace('{{CONTENT}}', cleanedContent);

        fs.writeFileSync(filepath, fullHtml, 'utf-8');
        console.log(`   ✅ Revamped complete HTML file with 1.1 structure`);
      }

      processed++;
    } catch (err) {
      console.error(`   ❌ Error processing ${filename}:`, err.message);
      errors++;
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║            Lesson Revamp Complete!                  ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');
  console.log(`✅ Successfully processed: ${processed} lessons`);
  console.log(`❌ Errors: ${errors} lessons`);
  console.log('');
}

processAllLessons().catch(console.error);
