import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function removeDuplicates(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Track all text content we've seen
  const seenContent = new Set();
  const seenListItems = new Set();

  // First pass: collect all list item content
  $('ul li, ol li').each(function() {
    const text = $(this).text().trim().toLowerCase();
    seenListItems.add(text);
  });

  // Second pass: remove duplicate paragraphs and paragraphs that duplicate list items
  $('p').each(function() {
    const $p = $(this);
    const text = $p.text().trim().toLowerCase();

    // Skip empty paragraphs
    if (text.length === 0) {
      $p.remove();
      return;
    }

    // Check if this paragraph duplicates a list item
    if (seenListItems.has(text)) {
      console.log('  Removing duplicate paragraph (already in list):', text.substring(0, 60) + '...');
      $p.remove();
      return;
    }

    // Check for exact duplicate paragraphs
    if (seenContent.has(text)) {
      console.log('  Removing duplicate paragraph:', text.substring(0, 60) + '...');
      $p.remove();
      return;
    }

    seenContent.add(text);
  });

  // Remove duplicate list items within the same list
  $('ul, ol').each(function() {
    const $list = $(this);
    const seenItems = new Set();

    $list.find('li').each(function() {
      const $li = $(this);
      const text = $li.text().trim().toLowerCase();

      if (seenItems.has(text)) {
        console.log('  Removing duplicate list item:', text.substring(0, 60) + '...');
        $li.remove();
      } else {
        seenItems.add(text);
      }
    });
  });

  // Remove duplicate headings
  const seenHeadings = new Set();
  $('h3, h4').each(function() {
    const $heading = $(this);
    const text = $heading.text().trim().toLowerCase();

    if (seenHeadings.has(text)) {
      console.log('  Removing duplicate heading:', text);
      $heading.remove();
    } else {
      seenHeadings.add(text);
    }
  });

  // Remove h2 tags (should only have h3 and h4)
  $('h2').each(function() {
    const $h2 = $(this);
    // Convert to h3
    $h2.replaceWith('<h3>' + $h2.html() + '</h3>');
  });

  // Clean up any remaining issues
  // Remove empty elements
  $('p:empty, li:empty, ul:empty, ol:empty, h3:empty, h4:empty').remove();

  return $.html('.lesson-content');
}

async function removeAllDuplicates() {
  console.log('🧹 Removing ALL duplicates from all lessons...\n');

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
      const cleaned = removeDuplicates(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: cleaned,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Cleaned`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully cleaned: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

removeAllDuplicates();
