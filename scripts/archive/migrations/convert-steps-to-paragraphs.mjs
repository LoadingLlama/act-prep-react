import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function convertStepsToParagraphs(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Convert ordered list step items to paragraphs with bold headers (like fractions lesson)
  $('ol').each(function() {
    const $ol = $(this);
    const items = [];

    $ol.find('li').each(function() {
      const $li = $(this);
      let html = $li.html().trim();

      // Extract step number and content
      const stepMatch = html.match(/^(Step \d+:?\s*[^<\n]*)(.*)/s);
      if (stepMatch) {
        const stepHeader = stepMatch[1].trim();
        const stepContent = stepMatch[2].trim();

        // Format as paragraph with bold header
        if (stepContent.length > 0) {
          items.push('<p><strong>' + stepHeader + '</strong> ' + stepContent + '</p>');
        } else {
          items.push('<p><strong>' + stepHeader + '</strong></p>');
        }
      } else {
        // No step pattern found, just convert to paragraph
        items.push('<p>' + html + '</p>');
      }
    });

    // Replace ordered list with paragraphs
    items.forEach(item => {
      $ol.before(item);
    });
    $ol.remove();
  });

  // Clean up symbol list items - make each concept its own item
  $('ul').each(function() {
    const $ul = $(this);
    const newItems = [];

    $ul.find('li').each(function() {
      const $li = $(this);
      const text = $li.html().trim();

      // Split items that have multiple concepts
      // Pattern: "text: symbol" where symbol is ≥≤<>
      const parts = text.split(/:\s*(?=[≥≤])/).map(p => p.trim()).filter(p => p.length > 0);

      if (parts.length > 1) {
        // Multiple concepts, split them
        parts.forEach(part => {
          if (part.length > 0) {
            newItems.push(part);
          }
        });
      } else {
        // Single concept, keep as is
        newItems.push(text);
      }
    });

    // Rebuild the list
    $ul.empty();
    newItems.forEach(item => {
      $ul.append('<li>' + item + '</li>');
    });
  });

  // Clean up paragraphs with multiple formulas - ensure proper line breaks
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph has formulas separated by multiple line breaks, keep them together
    // This is fine, just ensure no other cleanup breaks it
  });

  // Remove empty elements
  $('p:empty, li:empty').remove();

  // Get clean HTML
  let cleanHtml = $.html('.lesson-content');

  // Clean up whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');

  return cleanHtml;
}

async function convertStepsAll() {
  console.log('📝 Converting step lists to paragraphs (matching fractions format)...\n');

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
      const converted = convertStepsToParagraphs(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: converted,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Converted`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully converted: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

convertStepsAll();
