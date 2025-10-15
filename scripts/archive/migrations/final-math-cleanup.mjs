import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function finalCleanup(html) {
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

  // Remove ALL styles
  $('[style]').removeAttr('style');

  // Remove ALL classes except lesson-content
  $('*').not('.lesson-content').removeAttr('class');

  // Unwrap ALL divs except lesson-content
  $('div').not('.lesson-content').each(function() {
    $(this).replaceWith($(this).html());
  });

  // Clean up empty elements
  $('p:empty, h4:empty, div:empty').remove();

  // Clean up excessive whitespace in HTML
  let cleanHtml = $('.lesson-content').html();
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleanHtml = cleanHtml.trim();

  return `<div class="lesson-content">\n${cleanHtml}\n</div>`;
}

async function testFinalCleanup() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  const cleaned = finalCleanup(lesson.content);

  console.log('=== FINAL CLEANUP ===\n');
  console.log(cleaned);
  console.log('\n\nLength:', cleaned.length);
}

testFinalCleanup();
