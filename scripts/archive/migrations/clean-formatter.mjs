import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function cleanFormat(html) {
  const $ = cheerio.load(html, {
    xmlMode: false,
    decodeEntities: false
  });

  // STEP 1: Remove ALL inline styles
  $('*').removeAttr('style');

  // STEP 2: Remove ALL classes (lesson-intro, etc)
  $('*').removeAttr('class');

  // STEP 3: Remove the wrapping div if present
  if ($('.lesson-content').length) {
    const content = $('.lesson-content').html();
    return formatOutput(content, $);
  }

  return formatOutput($.html(), $);
}

function formatOutput(html, $) {
  // Clean up the HTML string for proper indentation
  let formatted = html;

  // Remove the div wrapper entirely
  formatted = formatted.replace(/<div[^>]*>/g, '');
  formatted = formatted.replace(/<\/div>/g, '');

  // Add proper indentation
  formatted = formatted
    .replace(/<h3>/g, '\n            <h3>')
    .replace(/<\/h3>/g, '</h3>\n            ')
    .replace(/<h4>/g, '\n            <h4>')
    .replace(/<\/h4>/g, '</h4>\n            ')
    .replace(/<p>/g, '<p>')
    .replace(/<\/p>/g, '</p>\n            ')
    .replace(/<ul>/g, '<ul>\n                ')
    .replace(/<\/ul>/g, '\n            </ul>\n            ')
    .replace(/<ol>/g, '<ol>\n                ')
    .replace(/<\/ol>/g, '\n            </ol>\n            ')
    .replace(/<li>/g, '<li>')
    .replace(/<\/li>/g, '</li>\n                ')
    .replace(/<table>/g, '\n            <table>\n                ')
    .replace(/<\/table>/g, '\n            </table>\n            ')
    .replace(/<tr>/g, '<tr>')
    .replace(/<\/tr>/g, '</tr>\n                ')
    .replace(/<th>/g, '<th>')
    .replace(/<\/th>/g, '</th>')
    .replace(/<td>/g, '<td>')
    .replace(/<\/td>/g, '</td>')
    .replace(/<svg/g, '\n            <svg')
    .replace(/<\/svg>/g, '</svg>\n            ');

  // Clean up excessive newlines
  formatted = formatted.replace(/\n\s*\n\s*\n+/g, '\n            ');

  // Remove leading/trailing whitespace
  formatted = formatted.trim();

  // Add proper start indentation
  formatted = '\n            ' + formatted + '\n        ';

  return formatted;
}

async function cleanAllLessons() {
  console.log('✨ CLEANING ALL MATH LESSONS TO MATCH ENGLISH FORMAT...\n');
  console.log('Removing ALL inline styles, classes, and complex formatting...\n');

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
      const cleaned = cleanFormat(lesson.content);

      await supabase
        .from('lessons')
        .update({
          content: cleaned,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      console.log(`   ✅ Cleaned to match English format\n`);
      successCount++;
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}\n`);
    }
  }

  console.log('='.repeat(70));
  console.log(`✅ Cleaned ${successCount}/35 lessons to simple, clear format`);
  console.log('='.repeat(70));
}

cleanAllLessons();
