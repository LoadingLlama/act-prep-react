import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function simplifyMathLesson(html) {
  const $ = cheerio.load(html, {
    xmlMode: false,
    decodeEntities: false
  });

  // Remove all SVGs and SVG artifacts
  $('svg, defs, marker').remove();

  // Remove emojis
  $('*').each(function() {
    const el = $(this);
    el.contents().each(function() {
      if (this.type === 'text') {
        this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
      }
    });
  });

  // Remove ALL inline styles
  $('[style]').removeAttr('style');

  // Remove all classes from divs (we'll re-add only what's needed)
  $('div').not('.lesson-content').removeAttr('class');

  // Unwrap unnecessary divs - only keep divs that have h4 or are wrapping example-box content
  $('div').not('.lesson-content').each(function() {
    const $div = $(this);
    const hasH4 = $div.find('> h4').length > 0;
    const hasStrongWithKeywords = $div.find('strong').text().toLowerCase().match(/example|solution|problem|takeaway|remember|tip/);

    // If this div doesn't have an h4 or special keywords, unwrap it
    if (!hasH4 && !hasStrongWithKeywords) {
      $div.replaceWith($div.html());
    }
  });

  // Now identify and classify only the divs that should be boxes
  $('div').not('.lesson-content').each(function() {
    const $div = $(this);
    const $h4 = $div.find('> h4').first();
    const text = $div.text().toLowerCase();

    // Only add classes to divs that deserve to be boxes
    if ($h4.length > 0) {
      const h4Text = $h4.text().toLowerCase();

      // These are actual concept boxes with headings
      if (h4Text.includes('independent clause') ||
          h4Text.includes('dependent clause') ||
          h4Text.includes('phrase') ||
          h4Text.includes('example')) {
        $div.attr('class', 'concept-box');
      } else if (h4Text.includes('quick test') || h4Text.includes('tip') || h4Text.includes('remember')) {
        $div.attr('class', 'tip-box');
      } else if (h4Text.includes('bottom line') || h4Text.includes('takeaway')) {
        $div.attr('class', 'key-takeaway');
      }
    } else if (text.includes('solution:') && text.includes('problem:')) {
      $div.attr('class', 'example-box');
    }
  });

  // Remove divs that still don't have a class (they're just wrappers)
  $('div').not('.lesson-content').not('[class]').each(function() {
    $(this).replaceWith($(this).html());
  });

  // Clean up empty divs
  $('div:empty').not('.lesson-content').remove();

  // Get the lesson content
  const cleanHtml = $('.lesson-content').html();
  const finalHtml = `<div class="lesson-content">\n${cleanHtml}\n</div>`;

  // Remove excessive whitespace
  return finalHtml.replace(/\n\s*\n\s*\n+/g, '\n\n').replace(/\n\s*\n\s*\n+/g, '\n\n');
}

async function testSimplify() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Original length:', lesson.content.length);
  console.log('\n=== ORIGINAL ===\n');
  console.log(lesson.content.substring(0, 1000));

  const simplified = simplifyMathLesson(lesson.content);

  console.log('\n\nSimplified length:', simplified.length);
  console.log('\n=== SIMPLIFIED ===\n');
  console.log(simplified);
}

testSimplify();
