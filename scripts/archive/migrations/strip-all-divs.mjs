import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function stripAllDivs(html) {
  const $ = cheerio.load(html, {
    xmlMode: false,
    decodeEntities: false
  });

  // Remove SVGs
  $('svg, defs, marker').remove();

  // Remove emojis
  $('*').each(function() {
    $(this).contents().each(function() {
      if (this.type === 'text') {
        this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
      }
    });
  });

  // Remove ALL styles and classes
  $('[style]').removeAttr('style');
  $('*').not('.lesson-content').removeAttr('class');

  // Recursively unwrap divs until none are left (except lesson-content)
  let foundDivs = true;
  while (foundDivs) {
    const $divs = $('div').not('.lesson-content');
    if ($divs.length === 0) {
      foundDivs = false;
    } else {
      $divs.first().replaceWith(function() {
        return $(this).contents();
      });
    }
  }

  // Clean up empty elements
  $('p:empty, h4:empty').remove();

  // Get cleaned HTML
  let cleanHtml = $('.lesson-content').html();
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();

  return `<div class="lesson-content">\n${cleanHtml}\n</div>`;
}

async function test() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  const stripped = stripAllDivs(lesson.content);

  console.log('=== ALL DIVS STRIPPED ===\n');
  console.log(stripped);
  console.log('\n\nLength:', stripped.length);
}

test();
