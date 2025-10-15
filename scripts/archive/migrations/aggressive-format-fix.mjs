import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function aggressiveFormatFix(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // 1. Fix lesson-intro - remove any inline styles
  $('.lesson-intro').removeAttr('style');

  // 2. Fix headings with colons that should be separate content
  $('h4').each(function() {
    const $h4 = $(this);
    const html = $h4.html().trim();

    // If h4 contains a colon with content after it, split it
    if (html.includes(':') && !html.match(/^[^:]+:\s*$/)) {
      const parts = html.split(/:\s*/);
      if (parts.length > 1 && parts[1].trim().length > 0) {
        $h4.html(parts[0]);
        $h4.after('<p>' + parts.slice(1).join(': ') + '</p>');
      }
    }
  });

  // 3. Remove incorrectly created lists
  $('ul').each(function() {
    const $ul = $(this);
    const items = $ul.find('li');

    // If list only has one item, convert back to paragraph
    if (items.length === 1) {
      const content = items.first().html();
      $ul.replaceWith('<p>' + content + '</p>');
    }
  });

  // 4. Fix paragraphs with colons that should be separate items
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // Pattern: "formula: formula" (multiple formulas with colons)
    if (html.match(/[a-z0-9]\s*[+\-=×÷]\s*[a-z0-9].*:\s*[a-z0-9]\s*[+\-=×÷]/i)) {
      const parts = html.split(/:\s*(?=[a-z0-9]\s*[+\-=×÷])/i);
      if (parts.length > 1) {
        $p.html(parts[0]);
        parts.slice(1).forEach(part => {
          if (part.trim()) {
            $p.after('<p>' + part.trim() + '</p>');
          }
        });
      }
    }

    // Pattern: "text: text" where both parts are substantial
    html = $p.html();
    if (html.match(/^[^:]{10,50}:\s*[A-Z]/) && !html.includes('<strong>')) {
      const idx = html.indexOf(':');
      const firstPart = html.substring(0, idx).trim();
      const secondPart = html.substring(idx + 1).trim();

      if (secondPart.length > 10) {
        $p.html(firstPart);
        $p.after('<p>' + secondPart + '</p>');
      }
    }
  });

  // 5. Fix steps that are merged
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph has multiple Step labels
    const stepMatches = html.match(/<strong>Step \d+:/g);
    if (stepMatches && stepMatches.length > 1) {
      const parts = html.split(/(?=<strong>Step \d+:)/);
      if (parts.length > 1) {
        $p.html(parts[0]);
        parts.slice(1).forEach(part => {
          if (part.trim()) {
            $p.after('<p>' + part.trim() + '</p>');
          }
        });
      }
    }
  });

  // 6. Fix "Example X:" that's merged with following content
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // Pattern: content followed by "Example X:"
    if (html.match(/[.:]\s*<strong>Example \d*:?<\/strong>\s*$/i)) {
      html = html.replace(/:\s*<strong>Example \d*:?<\/strong>\s*$/i, '');
      $p.html(html);
      $p.after('<p><strong>Example:</strong></p>');
    }

    // Pattern: "Example:" followed by formula on same line
    html = $p.html();
    if (html.match(/^Example \d*:?\s*<\/strong>\s*[a-z0-9]/i)) {
      const match = html.match(/^(<strong>Example \d*:?<\/strong>)\s*(.*)/i);
      if (match && match[2].trim()) {
        $p.html(match[1]);
        $p.after('<p>' + match[2].trim() + '</p>');
      }
    }
  });

  // 7. Properly format formula blocks with line breaks
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph has multiple lines of formulas (contains = and <br>)
    if (html.includes('=') && html.match(/<br>\s*[a-z=]/i)) {
      // Keep as is - this is a proper multi-line formula
      return;
    }
  });

  // 8. Remove empty headings and paragraphs
  $('h3:empty, h4:empty, p:empty, li:empty').remove();

  // 9. Fix heading text that should be bold paragraphs
  $('h4').each(function() {
    const $h4 = $(this);
    const text = $h4.text().trim();

    // If h4 starts with checkmark, bullet, or is very long description
    if (text.match(/^[✓✗•]/) || text.length > 80) {
      $h4.replaceWith('<p><strong>' + $h4.html() + '</strong></p>');
    }

    // If h4 has no colon and looks like a section header, keep it
    // Otherwise it might be misformatted
  });

  // 10. Clean up whitespace between tags
  let cleanHtml = $.html('.lesson-content');

  // Remove excessive whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleanHtml = cleanHtml.replace(/>\s+</g, '>\n<');

  // Clean up spaces in self-closing tags
  cleanHtml = cleanHtml.replace(/\s+>/g, '>');

  return cleanHtml;
}

async function aggressiveFixAll() {
  console.log('⚡ Applying aggressive formatting fixes to all lessons...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} math lessons\n`);

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      const fixed = aggressiveFormatFix(lesson.content);

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

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully fixed: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

aggressiveFixAll();
