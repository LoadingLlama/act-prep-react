import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function advancedCleanup(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Remove ALL inline styles
  $('[style]').removeAttr('style');

  // Fix messy symbol list items - split combined concepts
  $('ul li').each(function() {
    const $li = $(this);
    const text = $li.html();

    // Pattern: ">: Greater than" should stay as one item
    // Pattern: "x > 5 means x is more than 5: ≥" should be split
    if (text.match(/^[^:]+:\s*.+:\s*[≥≤<>]/)) {
      // This has multiple concepts, split it
      const parts = text.split(/:\s*(?=[≥≤<>])/);
      if (parts.length > 1) {
        $li.html(parts[0]);
        // Add remaining as new list items after this one
        for (let i = 1; i < parts.length; i++) {
          $li.after('<li>' + parts[i].trim() + '</li>');
        }
      }
    }
  });

  // Fix step list items that got merged - split them properly
  $('ol').each(function() {
    const $ol = $(this);
    const items = [];

    $ol.find('li').each(function() {
      const $li = $(this);
      const html = $li.html();

      // Check if this li contains multiple steps
      const stepMatches = html.match(/Step \d+:/g);
      if (stepMatches && stepMatches.length > 1) {
        // Split by "Step N:" pattern
        const parts = html.split(/(?=Step \d+:)/);
        parts.forEach(part => {
          if (part.trim().length > 0) {
            items.push(part.trim());
          }
        });
        $li.remove();
      } else {
        items.push(html);
        $li.remove();
      }
    });

    // Rebuild the list with properly separated items
    items.forEach(item => {
      $ol.append('<li>' + item + '</li>');
    });
  });

  // Clean up paragraphs with embedded line breaks that should be separate
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // If paragraph has multiple formulas or answers separated by line breaks
    if (html.includes('<br>') && html.match(/[×÷=<>≥≤]/)) {
      // Check if this is a formula block that should be split
      const lines = html.split('<br>');
      if (lines.length > 3 && lines.some(l => l.trim().length < 20)) {
        // This looks like it should be a formula block or separate paragraphs
        $p.html(lines.join('<br>'));
      }
    }

    // Split "Answer: B" from "Key Takeaway" if combined
    html = $p.html();
    if (html.match(/Answer:\s*[A-D].*Key Takeaway/i)) {
      const parts = html.split(/(?=Key Takeaway)/i);
      if (parts.length > 1) {
        $p.html(parts[0].trim());
        $p.after('<h4>' + parts[1].trim() + '</h4>');
      }
    }
  });

  // Remove empty elements
  $('p:empty, li:empty, div:empty').not('.lesson-content').remove();

  // Get clean HTML
  let cleanHtml = $.html('.lesson-content');

  // Remove excessive whitespace but preserve necessary breaks
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleanHtml = cleanHtml.replace(/>\s+</g, '>\n<');

  return cleanHtml;
}

async function advancedCleanupAllMath() {
  console.log('🔧 Advanced cleanup of all math lessons...\n');

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
      const cleaned = advancedCleanup(lesson.content);

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
        console.log(`  ✅ Advanced cleanup applied`);
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

advancedCleanupAllMath();
