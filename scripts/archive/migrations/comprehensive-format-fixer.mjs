import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function comprehensiveFormatFix(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // 1. Remove inline styles from lesson-intro
  $('.lesson-intro[style]').removeAttr('style');

  // 2. Fix broken step paragraphs - merge steps that got split incorrectly
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph ends with step content and next starts with another step header
    if (html.match(/<strong>Step \d+:/) && html.includes('<br>')) {
      const nextP = $p.next('p');
      if (nextP.length > 0 && nextP.html().match(/<strong>Step \d+:/)) {
        // These are separate steps, keep them separate
        return;
      }
    }

    // Fix misplaced content in steps
    // Pattern: text followed by heading text in same paragraph
    if (html.match(/[.!]\s*<strong>[A-Z][^<]*:?<\/strong>\s*<br>/)) {
      const parts = html.split(/(<strong>[A-Z][^<]*:?<\/strong>)\s*<br>/);
      if (parts.length >= 3) {
        $p.html(parts[0]);
        for (let i = 1; i < parts.length; i += 2) {
          if (parts[i] && parts[i+1]) {
            $p.after('<p>' + parts[i] + ' ' + parts[i+1] + '</p>');
          }
        }
      }
    }
  });

  // 3. Clean up symbol formatting (checkmarks, X marks)
  $('*').each(function() {
    $(this).contents().each(function() {
      if (this.type === 'text') {
        // Remove stray checkmarks and X symbols that break flow
        this.data = this.data.replace(/✓\s*/g, '');
        this.data = this.data.replace(/✗\s*/g, '');
      }
    });
  });

  // 4. Fix headings that are actually paragraphs
  $('h4').each(function() {
    const $h4 = $(this);
    const text = $h4.text().trim();

    // If h4 contains a formula or long description, it should be a paragraph
    if (text.match(/=/) && text.length > 30) {
      $h4.replaceWith('<p><strong>' + $h4.html() + '</strong></p>');
    }
  });

  // 5. Fix paragraphs that should be list items
  let inListSection = false;
  let listItems = [];

  $('.lesson-content > *').each(function() {
    const $el = $(this);
    const text = $el.text().trim();

    // Pattern: "item: description"
    if ($el.is('p') && text.match(/^[A-Za-z\s]+:\s+[A-Z]/) && text.length < 100) {
      if (!inListSection) {
        inListSection = true;
        listItems = [];
      }
      listItems.push($el.html());
      $el.remove();
    } else if (inListSection) {
      // End of list section, create ul
      if (listItems.length > 0) {
        const listHtml = '<ul>' + listItems.map(item => '<li>' + item + '</li>').join('') + '</ul>';
        $el.before(listHtml);
        listItems = [];
      }
      inListSection = false;
    }
  });

  // 6. Fix formula paragraphs - separate multiple formulas on separate lines
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph has multiple formulas separated by colons
    if (html.match(/[a-z]\s*=.*:\s*[a-z]\s*=/i)) {
      const parts = html.split(/:\s*(?=[a-z]\s*=)/i);
      if (parts.length > 1) {
        $p.html(parts[0]);
        parts.slice(1).forEach(part => {
          $p.after('<p>' + part.trim() + '</p>');
        });
      }
    }
  });

  // 7. Fix "Example:" labels that got merged with content
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // Pattern: "text: Example:"
    if (html.match(/:\s*<strong>Example:\s*<\/strong>\s*$/)) {
      html = html.replace(/:\s*<strong>Example:\s*<\/strong>\s*$/, '');
      $p.html(html);
      $p.after('<p><strong>Example:</strong></p>');
    }

    // Pattern: "Example:" at start with content after it
    html = $p.html();
    if (html.match(/^<strong>Example \d*:?\s*<\/strong>/)) {
      const match = html.match(/^(<strong>Example \d*:?\s*<\/strong>)(.*)/);
      if (match && match[2].trim().length > 0) {
        $p.html(match[1]);
        $p.after('<p>' + match[2].trim() + '</p>');
      }
    }
  });

  // 8. Ensure proper spacing in formulas
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // Add spaces around operators in formulas
    if (html.match(/[a-z0-9][+\-×÷=][a-z0-9]/i)) {
      let fixed = html.replace(/([a-z0-9])([+\-×÷=])([a-z0-9])/gi, '$1 $2 $3');
      $p.html(fixed);
    }
  });

  // 9. Fix broken example sections
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph starts with "Step" but contains other content
    if (html.match(/^<strong>Step \d+:.*<\/strong>.*[^:]\s*<br>/)) {
      // Check if there's content after the step that should be separate
      const parts = html.split(/<br>\s*(?=<strong>)/);
      if (parts.length > 1) {
        $p.html(parts[0]);
        parts.slice(1).forEach(part => {
          $p.after('<p>' + part + '</p>');
        });
      }
    }
  });

  // 10. Remove empty paragraphs and list items
  $('p:empty, li:empty, h3:empty, h4:empty').remove();

  // 11. Fix table formatting if tables exist
  $('table').each(function() {
    const $table = $(this);
    // Ensure table has proper structure
    if (!$table.attr('style')) {
      $table.attr('style', 'width: 100%; border-collapse: collapse; margin: 1rem 0;');
    }
  });

  // Get clean HTML
  let cleanHtml = $.html('.lesson-content');

  // Final cleanup: remove excessive whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleanHtml = cleanHtml.replace(/>\s+</g, '>\n<');

  return cleanHtml;
}

async function fixAllLessons() {
  console.log('🔧 Applying comprehensive formatting fixes to all lessons...\\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} math lessons\\n`);

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      const fixed = comprehensiveFormatFix(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: fixed,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Fixed`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\\n' + '='.repeat(60));
  console.log(`✅ Successfully fixed: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

fixAllLessons();
