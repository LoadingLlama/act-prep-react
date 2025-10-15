import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function cleanMathLesson(html) {
  const $ = cheerio.load(html, { xmlMode: false });

  // Remove all SVG elements
  $('svg').remove();

  // Remove emojis from all text nodes
  $('*').each(function() {
    const el = $(this);
    el.contents().each(function() {
      if (this.type === 'text') {
        this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
      }
    });
  });

  // Remove all inline styles
  $('[style]').removeAttr('style');

  // Convert divs with specific patterns to appropriate classes
  $('div').each(function() {
    const $div = $(this);
    const hasH4 = $div.find('h4').length > 0;
    const hasP = $div.find('p').length > 0;

    // Skip lesson-content div
    if ($div.hasClass('lesson-content')) {
      return;
    }

    // Check for concept/tip boxes
    if (hasH4 && hasP) {
      const h4Text = $div.find('h4').first().text().toLowerCase();

      if (h4Text.includes('perimeter') || h4Text.includes('area') || h4Text.includes('rectangle') || h4Text.includes('square') || h4Text.includes('triangle') || h4Text.includes('circle')) {
        $div.attr('class', 'concept-box');
      } else if (h4Text.includes('remember') || h4Text.includes('tip')) {
        $div.attr('class', 'tip-box');
      } else if (h4Text.includes('example')) {
        $div.attr('class', 'example-box');
      } else if (h4Text.includes('takeaway') || h4Text.includes('key')) {
        $div.attr('class', 'key-takeaway');
      } else {
        $div.attr('class', 'concept-box');
      }
    } else if ($div.text().toLowerCase().includes('solution:')) {
      $div.attr('class', 'example-box');
    }
  });

  // Remove empty divs (except lesson-content)
  $('div:empty').not('.lesson-content').remove();

  // Get the complete HTML
  let cleanHtml = $.html();

  // Remove excessive whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n/g, '\n\n');

  return cleanHtml;
}

async function testClean() {
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
  console.log('\n=== ORIGINAL (first 800 chars) ===');
  console.log(lesson.content.substring(0, 800));

  const cleaned = cleanMathLesson(lesson.content);

  console.log('\n\nCleaned length:', cleaned.length);
  console.log('\n=== CLEANED (first 1500 chars) ===');
  console.log(cleaned.substring(0, 1500));

  fs.writeFileSync('test-cleaned.html', cleaned);
  console.log('\n✅ Saved to test-cleaned.html');
}

testClean();
