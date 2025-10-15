import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function createMasterpiece(html) {
  const $ = cheerio.load(html, {
    xmlMode: false,
    decodeEntities: false,
    normalizeWhitespace: false
  });

  // FIX 1: Remove spaces around hyphens in compound words
  $('*').contents().each(function() {
    if (this.type === 'text') {
      this.data = this.data.replace(/test\s*-\s*taking/g, 'test-taking');
      this.data = this.data.replace(/guess\s*-\s*and\s*-\s*check/g, 'guess-and-check');
      this.data = this.data.replace(/step\s*-\s*by\s*-\s*step/g, 'step-by-step');
    }
  });

  // FIX 2: Fix broken SVG tags - remove improperly closed tags
  $('svg').each(function() {
    const svgHtml = $(this).html();
    if (svgHtml) {
      // Remove trailing broken tags
      const cleaned = svgHtml.replace(/<\/(line|path|rect|text)>$/g, '');
      $(this).html(cleaned);
    }
  });

  // FIX 3: Improve formula formatting - separate multi-line formulas
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph contains formulas with line breaks, ensure proper spacing
    if (html && html.includes('<br>') && html.match(/[=+\-×÷]/)) {
      // Add proper spacing around operators in formulas
      let cleaned = html.replace(/\s*=\s*/g, ' = ');
      cleaned = cleaned.replace(/\s*\+\s*/g, ' + ');
      cleaned = cleaned.replace(/\s*−\s*/g, ' − ');
      cleaned = cleaned.replace(/\s*×\s*/g, ' × ');
      $p.html(cleaned);
    }
  });

  // FIX 4: Fix choice labels - make them consistent
  $('strong').each(function() {
    const text = $(this).text().trim();
    if (text.match(/^Choice [A-D]:$/)) {
      // Ensure choice labels are in their own paragraph
      const $strong = $(this);
      if ($strong.parent().is('p')) {
        const $p = $strong.parent();
        const nextContent = $strong.next();

        // If there's content after the choice label in the same paragraph, fix it
        if (nextContent.length > 0 || $strong.get(0).nextSibling) {
          $strong.wrap('<p style="margin: 0.75rem 0;"></p>');
          $p.remove();
        }
      } else {
        // Wrap in paragraph if not already
        $strong.wrap('<p style="margin: 0.75rem 0;"></p>');
      }
    }
  });

  // FIX 5: Clean up whitespace in text nodes
  $('*').contents().each(function() {
    if (this.type === 'text') {
      // Remove excessive whitespace but preserve single spaces
      this.data = this.data.replace(/\s{2,}/g, ' ');
      // Remove leading/trailing whitespace in block elements
      if (this.parent && $(this.parent).is('p, li, h3, h4')) {
        this.data = this.data.trim();
      }
    }
  });

  // FIX 6: Ensure proper spacing in lists
  $('ul li, ol li').each(function() {
    const $li = $(this);
    const text = $li.text().trim();
    if (text) {
      // Remove extra spaces
      $li.html($li.html().replace(/\s{2,}/g, ' ').trim());
    }
  });

  // FIX 7: Fix Problem/Solution/Answer labels
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    if (html) {
      // Ensure Problem, Solution, Answer are bolded
      html = html.replace(/^Problem:/g, '<strong>Problem:</strong>');
      html = html.replace(/^Solution:/g, '<strong>Solution:</strong>');
      html = html.replace(/^Answer:/g, '<strong>Answer:</strong>');

      // But don't double-bold
      html = html.replace(/<strong><strong>/g, '<strong>');
      html = html.replace(/<\/strong><\/strong>/g, '</strong>');

      $p.html(html);
    }
  });

  // FIX 8: Remove empty paragraphs and elements
  $('p:empty, li:empty, h3:empty, h4:empty, span:empty').remove();

  // FIX 9: Fix any remaining inline style issues
  $('p').not('.lesson-intro').each(function() {
    const $p = $(this);
    const style = $p.attr('style');

    if (!style || style === '') {
      // No style, add default
      $p.attr('style', 'margin: 0.75rem 0;');
    } else if (style.includes('background')) {
      // This is a highlight box, ensure complete styling
      $p.attr('style', 'background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;');
    } else if (!style.includes('margin')) {
      // Has style but no margin, add it
      $p.attr('style', style + ' margin: 0.75rem 0;');
    }
  });

  // FIX 10: Ensure h3 and h4 have proper margins
  $('h3').attr('style', 'margin-top: 2rem;');
  $('h4').attr('style', 'margin-top: 1.5rem;');

  // FIX 11: Fix table formatting
  $('table').attr('style', 'width: 100%; border-collapse: collapse; margin: 1.5rem 0;');
  $('table th, table td').each(function() {
    if (!$(this).attr('style')) {
      $(this).attr('style', 'padding: 0.5rem; border: 1px solid #ddd;');
    }
  });

  // FIX 12: Clean up any broken HTML entities
  let finalHtml = $.html('.lesson-content');

  // Properly format the HTML for readability
  finalHtml = finalHtml
    .replace(/<\/p><p/g, '</p>\n<p')
    .replace(/<\/h3><h3/g, '</h3>\n<h3')
    .replace(/<\/h4><h4/g, '</h4>\n<h4')
    .replace(/<\/ul><h/g, '</ul>\n<h')
    .replace(/<\/ol><h/g, '</ol>\n<h');

  return finalHtml;
}

async function createMasterpieceLessons() {
  console.log('🎨 CREATING MASTERPIECE-LEVEL FORMATTING...\n');
  console.log('Fixing all HTML issues, spacing, and clarity problems...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/35] ${lesson.title}`);

    try {
      const masterpiece = createMasterpiece(lesson.content);

      await supabase
        .from('lessons')
        .update({
          content: masterpiece,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      console.log(`   ✅ Perfected\n`);
      successCount++;
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}\n`);
    }
  }

  console.log('='.repeat(70));
  console.log(`✅ Formatted ${successCount}/35 lessons to masterpiece level`);
  console.log('='.repeat(70));
}

createMasterpieceLessons();
