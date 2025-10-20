#!/usr/bin/env node

/**
 * Final Consistency Pass - All 82 Lessons
 *
 * Ensures EVERY lesson follows Math 1.1 standards:
 * 1. Consistent HTML structure
 * 2. Proper spacing (h3 5rem, h4 2rem)
 * 3. Correct bullet styling (nested where appropriate)
 * 4. No formatting inconsistencies
 * 5. Clean, scannable layout
 */

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Standard styles from Math 1.1
const STANDARD_STYLES = {
  p: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  ul_nested: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  li: 'margin: 0.15rem 0;',
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  strong: 'color: #2563eb; font-weight: 600; text-decoration: underline;'
};

/**
 * Apply final consistency fixes
 */
function applyConsistencyFixes(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  let stats = {
    headingsFixed: 0,
    paragraphsFixed: 0,
    listsFixed: 0,
    strongTagsFixed: 0,
    oddElementsRemoved: 0
  };

  // FIX 1: Standardize all H3 headings
  $('h3').each((i, el) => {
    const $h3 = $(el);
    const currentStyle = $h3.attr('style') || '';

    // Skip Key Takeaways (they have special styling)
    if ($h3.text().toLowerCase().includes('key takeaway')) {
      return;
    }

    // Skip hidden separators
    if (currentStyle.includes('visibility: hidden')) {
      return;
    }

    // Apply standard H3 style
    if (currentStyle !== STANDARD_STYLES.h3) {
      $h3.attr('style', STANDARD_STYLES.h3);
      stats.headingsFixed++;
    }
  });

  // FIX 2: Standardize all H4 headings
  $('h4').each((i, el) => {
    const $h4 = $(el);
    const currentStyle = $h4.attr('style') || '';

    if (currentStyle !== STANDARD_STYLES.h4) {
      $h4.attr('style', STANDARD_STYLES.h4);
      stats.headingsFixed++;
    }
  });

  // FIX 3: Standardize all paragraphs
  $('p').each((i, el) => {
    const $p = $(el);
    const currentStyle = $p.attr('style') || '';

    // Skip special paragraphs (answer choices, separators)
    if (currentStyle.includes('height: 1px') ||
        currentStyle.includes('Times New Roman') ||
        currentStyle.includes('visibility: hidden')) {
      return;
    }

    if (currentStyle !== STANDARD_STYLES.p) {
      $p.attr('style', STANDARD_STYLES.p);
      stats.paragraphsFixed++;
    }
  });

  // FIX 4: Standardize all UL lists
  $('ul').each((i, el) => {
    const $ul = $(el);
    const currentStyle = $ul.attr('style') || '';

    // Check if nested (inside an LI)
    const isNested = $ul.parent().is('li');

    // Check if Key Takeaway list (special styling)
    const isKeyTakeaway = currentStyle.includes('list-style: none');

    if (isKeyTakeaway) {
      return; // Don't modify Key Takeaway lists
    }

    const correctStyle = isNested ? STANDARD_STYLES.ul_nested : STANDARD_STYLES.ul;

    if (currentStyle !== correctStyle) {
      $ul.attr('style', correctStyle);
      stats.listsFixed++;
    }
  });

  // FIX 5: Standardize all LI items
  $('li').each((i, el) => {
    const $li = $(el);
    const currentStyle = $li.attr('style') || '';

    // Skip Key Takeaway list items (they have special color styling)
    const $parentUl = $li.parent('ul');
    if ($parentUl.length > 0 && ($parentUl.attr('style') || '').includes('list-style: none')) {
      return;
    }

    if (currentStyle !== STANDARD_STYLES.li) {
      $li.attr('style', STANDARD_STYLES.li);
      stats.listsFixed++;
    }
  });

  // FIX 6: Standardize all <strong> tags
  $('strong').each((i, el) => {
    const $strong = $(el);
    const currentStyle = $strong.attr('style') || '';

    if (currentStyle !== STANDARD_STYLES.strong) {
      $strong.attr('style', STANDARD_STYLES.strong);
      stats.strongTagsFixed++;
    }
  });

  // FIX 7: Remove any odd/inconsistent elements
  // Remove empty paragraphs
  $('p').each((i, el) => {
    const $p = $(el);
    if ($p.text().trim() === '' && !$p.attr('style')?.includes('height: 1px')) {
      $p.remove();
      stats.oddElementsRemoved++;
    }
  });

  // Remove empty list items
  $('li').each((i, el) => {
    const $li = $(el);
    if ($li.text().trim() === '') {
      $li.remove();
      stats.oddElementsRemoved++;
    }
  });

  return { html: $.html(), stats };
}

/**
 * Process a single lesson
 */
async function processLesson(lesson, dryRun = true) {
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  if (!sections || sections.length === 0) {
    return null;
  }

  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id);

  if (!contents || contents.length === 0) {
    return null;
  }

  const originalContent = contents[0].content;
  const { html: fixedContent, stats } = applyConsistencyFixes(originalContent);

  const totalChanges = stats.headingsFixed + stats.paragraphsFixed + stats.listsFixed +
                       stats.strongTagsFixed + stats.oddElementsRemoved;

  if (totalChanges > 0) {
    console.log(`\n${lesson.subject.toUpperCase()} - ${lesson.title}`);
    console.log(`   • Headings: ${stats.headingsFixed}`);
    console.log(`   • Paragraphs: ${stats.paragraphsFixed}`);
    console.log(`   • Lists: ${stats.listsFixed}`);
    console.log(`   • Strong tags: ${stats.strongTagsFixed}`);
    console.log(`   • Odd elements removed: ${stats.oddElementsRemoved}`);
    console.log(`   ✅ Total fixes: ${totalChanges}`);

    if (!dryRun) {
      await supabase
        .from('lesson_section_content')
        .update({ content: fixedContent })
        .eq('id', contents[0].id);
    }
  }

  return { lessonKey: lesson.lesson_key, totalChanges };
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');

  console.log(`\n${'='.repeat(70)}`);
  console.log(`🔧 FINAL CONSISTENCY PASS - ALL 82 LESSONS`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Mode: ${dryRun ? '🔍 DRY RUN' : '✏️  APPLY CHANGES'}`);
  console.log(`${'='.repeat(70)}\n`);

  const subjects = ['math', 'english', 'reading', 'science'];
  let grandTotal = { lessons: 0, changes: 0 };

  for (const subject of subjects) {
    console.log(`\n${'█'.repeat(70)}`);
    console.log(`   ${subject.toUpperCase()} LESSONS`);
    console.log(`${'█'.repeat(70)}`);

    const { data: lessons } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('subject', subject)
      .order('lesson_key');

    if (!lessons) continue;

    let subjectTotal = 0;

    for (const lesson of lessons) {
      const result = await processLesson(lesson, dryRun);
      if (result && result.totalChanges > 0) {
        subjectTotal += result.totalChanges;
        grandTotal.lessons++;
      }
    }

    grandTotal.changes += subjectTotal;

    console.log(`\n   📊 ${subject.toUpperCase()} Summary: ${subjectTotal} total fixes`);
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`📈 GRAND TOTAL`);
  console.log(`${'='.repeat(70)}`);
  console.log(`   Lessons with fixes: ${grandTotal.lessons}`);
  console.log(`   Total fixes applied: ${grandTotal.changes}`);
  console.log(`${'='.repeat(70)}\n`);

  if (dryRun) {
    console.log('💡 To apply fixes, run: node scripts/final-consistency-pass.mjs --apply\n');
  } else {
    console.log('✅ All lessons now follow Math 1.1 standards!\n');
  }
}

main().catch(console.error);
