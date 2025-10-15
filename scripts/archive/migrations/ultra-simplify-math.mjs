import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function ultraSimplifyMath(html) {
  const $ = cheerio.load(html, {
    xmlMode: false,
    decodeEntities: false
  });

  // Remove all SVGs
  $('svg, defs, marker').remove();

  // Remove emojis
  $('*').each(function() {
    $(this).contents().each(function() {
      if (this.type === 'text') {
        this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
      }
    });
  });

  // Remove ALL inline styles and classes first
  $('[style]').removeAttr('style');
  $('div').not('.lesson-content, .example-box').removeAttr('class');

  // Find divs with h4 that should become concept boxes
  $('div').not('.lesson-content').each(function() {
    const $div = $(this);
    const $h4 = $div.find('> h4').first();

    if ($h4.length > 0) {
      const h4Text = $h4.text().toLowerCase().trim();
      const divText = $div.text().toLowerCase();

      // Only make it a concept-box if it's a substantial concept explanation
      if (h4Text.length > 3 && (
        h4Text.includes('independent') ||
        h4Text.includes('dependent') ||
        h4Text.includes('phrase') ||
        h4Text.includes('quick test') ||
        h4Text.includes('fanboys') ||
        (divText.includes('solution') && divText.includes('problem'))
      )) {
        $div.attr('class', 'concept-box');
      } else if (h4Text.includes('tip') || h4Text.includes('remember')) {
        $div.attr('class', 'tip-box');
      } else if (h4Text.includes('takeaway') || h4Text.includes('bottom line') || h4Text.includes('key')) {
        $div.attr('class', 'key-takeaway');
      } else {
        // Otherwise, unwrap this div - it's just structure
        $div.replaceWith($div.html());
      }
    }
  });

  // Remove divs that don't have a class now (they're wrappers)
  $('div:not([class]):not(.lesson-content)').each(function() {
    $(this).replaceWith($(this).html());
  });

  // Remove empty elements
  $('div:empty, p:empty, h4:empty').not('.lesson-content').remove();

  // Clean up the HTML
  let cleanHtml = $('.lesson-content').html();

  // Remove excessive line breaks
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');

  return `<div class="lesson-content">\n${cleanHtml}\n</div>`;
}

async function testUltraSimplify() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  const simplified = ultraSimplifyMath(lesson.content);

  console.log('=== ULTRA SIMPLIFIED ===\n');
  console.log(simplified);
  console.log('\n\nLength:', simplified.length);
}

testUltraSimplify();
