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

  // Remove emojis from text content
  $('*').each(function() {
    $(this).contents().filter(function() {
      return this.type === 'text';
    }).each(function() {
      this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    });
  });

  // Convert grid layouts with inline styles to simple divs
  $('div[style*="display: grid"], div[style*="grid-template"]').each(function() {
    $(this).removeAttr('style');
  });

  // Remove all inline styles from divs, h4, p tags
  $('div, h4, p, h3, h2').each(function() {
    $(this).removeAttr('style');
  });

  // Convert colorful concept boxes to simple concept-box class
  $('div').each(function() {
    const $div = $(this);

    // Check if this looks like a concept/tip box
    if ($div.find('h4').length > 0 && $div.find('p').length > 0) {
      const h4Text = $div.find('h4').first().text().toLowerCase();

      // Convert to appropriate class
      if (h4Text.includes('perimeter') || h4Text.includes('area')) {
        $div.attr('class', 'concept-box');
      } else if (h4Text.includes('remember') || h4Text.includes('key') || h4Text.includes('tip')) {
        $div.attr('class', 'tip-box');
      } else if (h4Text.includes('example') || h4Text.includes('problem')) {
        $div.attr('class', 'example-box');
      } else if (h4Text.includes('takeaway') || h4Text.includes('bottom line')) {
        $div.attr('class', 'key-takeaway');
      } else if (!$div.hasClass('lesson-content')) {
        $div.attr('class', 'concept-box');
      }
    }
  });

  // Clean up empty divs (but preserve lesson-content)
  $('div:empty:not(.lesson-content)').remove();

  // Remove marker definitions and other SVG artifacts
  $('defs, marker').remove();

  // Convert fancy solution boxes to simple format
  $('div').each(function() {
    const $div = $(this);
    const text = $div.text().trim();

    if (text.startsWith('Solution:') || text.includes('Solution:')) {
      $div.attr('class', 'example-box');
      const firstP = $div.find('p').first();
      if (firstP.length) {
        firstP.html('<strong>Solution:</strong> ' + firstP.text().replace(/^Solution:\s*/, ''));
      }
    }

    if (text.startsWith('Problem:') || text.includes('Problem:')) {
      $div.attr('class', 'example-box');
    }
  });

  // Remove border-left inline styles from p tags
  $('p').each(function() {
    $(this).removeAttr('style');
  });

  // Get the clean HTML
  let cleanHtml = $.html('.lesson-content');

  // Remove excessive whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n/g, '\n\n');

  return cleanHtml;
}

async function testCleanOneLesson() {
  console.log('Fetching geometry-shapes lesson for testing...');

  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (error) {
    console.error('Error fetching lesson:', error);
    return;
  }

  console.log(`\nOriginal content length: ${lesson.content.length} characters`);
  console.log('\n=== ORIGINAL (first 500 chars) ===');
  console.log(lesson.content.substring(0, 500));

  const cleanedContent = cleanMathLesson(lesson.content);

  console.log(`\nCleaned content length: ${cleanedContent.length} characters`);
  console.log('\n=== CLEANED (first 1000 chars) ===');
  console.log(cleanedContent.substring(0, 1000));

  // Save both for comparison
  fs.writeFileSync('original-lesson.html', lesson.content);
  fs.writeFileSync('cleaned-lesson.html', cleanedContent);

  console.log('\n✅ Saved original-lesson.html and cleaned-lesson.html for comparison');
  console.log('\nDo you want to update this lesson in the database? Run the full script if yes.');
}

testCleanOneLesson();
