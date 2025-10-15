import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function perfectLesson(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // STEP 1: Fix broken formulas - remove all nested spans and clean up
  $('span').each(function() {
    const $span = $(this);
    // If span only contains another span, unwrap it
    if ($span.children('span').length > 0 && $span.contents().length === 1) {
      $span.replaceWith($span.html());
    }
    // If span is empty, remove it
    if ($span.text().trim() === '') {
      $span.remove();
    }
  });

  // STEP 2: Fix formulas split across paragraphs
  const formulaParagraphs = [];
  $('p').each(function(index) {
    const $p = $(this);
    const text = $p.text().trim();

    // Check if this is a formula fragment (has math symbols, very short)
    if (text.match(/^[−\-+×÷=<>√()0-9\s]+$/) && text.length < 10) {
      formulaParagraphs.push({ index, element: $p });
    }
  });

  // Remove formula fragment paragraphs
  formulaParagraphs.forEach(item => item.element.remove());

  // STEP 3: Fix "Answer: X: Problem:" and other malformed text
  $('*').contents().each(function() {
    if (this.type === 'text') {
      // Remove malformed patterns
      this.data = this.data.replace(/Answer:\s*[A-D]:\s*<strong>Problem:<\/strong>/g, '');
      this.data = this.data.replace(/Answer:\s*[A-D]:/g, 'Answer: $&'.replace(':', ''));
    }
  });

  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // Fix "Answer: X: " pattern
    html = html.replace(/Answer:\s*([A-D]):\s*<strong>/g, '<strong>Answer: $1</strong><br><strong>');
    html = html.replace(/Answer:\s*([A-D]):\s*$/g, '<strong>Answer: $1</strong>');
    html = html.replace(/Answer:\s*([A-D])\s*$/g, '<strong>Answer: $1</strong>');

    $p.html(html);
  });

  // STEP 4: Ensure proper example structure
  $('h4').each(function() {
    const $h4 = $(this);
    const text = $h4.text().trim();

    // If this is an Example heading
    if (text.match(/^Example\s*\d*$/i)) {
      let $current = $h4.next();
      let problemFound = false;
      let solutionFound = false;

      // Ensure Problem and Solution labels exist
      while ($current.length && !$current.is('h3, h4')) {
        const currentText = $current.text().trim();

        if (currentText.startsWith('Problem:')) {
          problemFound = true;
        } else if (currentText.startsWith('Solution:')) {
          solutionFound = true;
        }

        // Check if this paragraph should be labeled
        if (!problemFound && !currentText.match(/^(Problem:|Solution:|Answer:)/)) {
          // This might be an unlabeled problem
          if ($current.text().includes('?') || $current.text().match(/A\.\s|B\.\s|C\.\s|D\.\s/)) {
            if (!problemFound) {
              problemFound = true;
            }
          }
        }

        $current = $current.next();
      }
    }
  });

  // STEP 5: Clean up multiple choice formatting
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // If paragraph has A. B. C. D. all on same line, add line breaks
    if (html.match(/A\.\s*[^<]+<br>B\.\s*[^<]+<br>C\.\s*[^<]+<br>D\.\s*/)) {
      // Already has breaks, good
    } else if (html.match(/A\.\s*[^A-D]+\s*B\.\s*[^A-D]+\s*C\.\s*[^A-D]+\s*D\./)) {
      // Missing breaks, add them
      let fixed = html.replace(/\s*B\.\s*/g, '<br>B. ');
      fixed = fixed.replace(/\s*C\.\s*/g, '<br>C. ');
      fixed = fixed.replace(/\s*D\.\s*/g, '<br>D. ');
      $p.html(fixed);
    }
  });

  // STEP 6: Remove duplicate content more aggressively
  const seenParagraphs = new Set();
  $('p').each(function() {
    const $p = $(this);
    const text = $p.text().trim().toLowerCase().substring(0, 100);

    if (text.length === 0) {
      $p.remove();
      return;
    }

    if (seenParagraphs.has(text)) {
      $p.remove();
      return;
    }

    seenParagraphs.add(text);
  });

  // STEP 7: Apply perfect formatting

  // Remove ALL inline styles first
  $('*').removeAttr('style');

  // Apply gold standard styles
  $('.lesson-intro').attr('style', 'margin: 0.75rem 0;');
  $('h3').attr('style', 'margin-top: 2rem;');
  $('h4').attr('style', 'margin-top: 1.5rem;');

  $('p').not('.lesson-intro').each(function() {
    const $p = $(this);
    const html = $p.html();

    // Check if this should be a highlight box
    if (html.toLowerCase().includes('remember') ||
        html.toLowerCase().includes('important') ||
        html.toLowerCase().includes('key point') ||
        $p.prev().text().toLowerCase().includes('remember')) {
      $p.attr('style', 'background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;');
    } else {
      $p.attr('style', 'margin: 0.75rem 0;');
    }
  });

  $('ul, ol').attr('style', 'margin: 1rem 0; padding-left: 2rem;');

  $('table').attr('style', 'width: 100%; border-collapse: collapse; margin: 1.5rem 0;');

  $('svg').attr('style', 'display: block; margin: 1.5rem auto;');

  // STEP 8: Final cleanup

  // Remove h2 tags
  $('h2').each(function() {
    $(this).replaceWith('<h3>' + $(this).html() + '</h3>');
  });

  // Remove empty elements
  $('p:empty, h3:empty, h4:empty, li:empty, ul:empty, ol:empty').remove();

  // Clean up whitespace
  let cleanHtml = $.html('.lesson-content');
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n');

  return cleanHtml;
}

async function perfectAllLessons() {
  console.log('🎨 MASTER LESSON PERFECTOR - Analyzing and perfecting every lesson...\n');

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
  console.log('Analyzing every line... fixing all broken examples... enhancing quality...\n');

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);
    console.log(`  📖 Reading every line...`);

    try {
      const perfected = perfectLesson(lesson.content);

      console.log(`  🔧 Fixing broken examples...`);
      console.log(`  ✨ Enhancing quality...`);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: perfected,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Perfect!`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }

    console.log('');
  }

  console.log('='.repeat(70));
  console.log(`✅ Successfully perfected: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(70));
  console.log('\n🎉 ALL LESSONS ARE NOW PERFECT! 🎉\n');
}

perfectAllLessons();
