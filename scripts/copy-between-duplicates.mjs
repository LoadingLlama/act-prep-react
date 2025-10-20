/**
 * Copy content between duplicate lessons
 * If numeric lesson (2.2) is damaged but named lesson (areas-volumes-triangles) is good, copy over
 */

import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Manual mapping of duplicates based on titles
const duplicatePairs = [
  { numeric: '2.2', named: 'areas-volumes-triangles' },
  { numeric: '2.4', named: 'arcs-sectors' },
  { numeric: '2.5', named: 'circles-ellipses-hyperbolas' },
  { numeric: '3.4', named: 'logarithms' },
  { numeric: '4.2', named: 'quadratics' },
  { numeric: '4.4', named: 'function-transformations' },
  { numeric: '4.5', named: 'exponential-growth-decay' },
  { numeric: '5.6', named: 'repeating-patterns' },
  { numeric: '6.1', named: 'mean-median-mode-range' },
  { numeric: '4.1', named: 'systems-of-equations' },
  { numeric: '6.4', named: 'counting-permutations-combinations' }
];

async function getLessonContent(lessonKey) {
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) return null;

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .order('order_index')
    .limit(1);

  if (!sections || sections.length === 0) return null;

  const { data: content } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id)
    .order('order_index')
    .limit(1);

  return content && content.length > 0 ? content[0] : null;
}

async function copyContent(fromKey, toKey) {
  const fromContent = await getLessonContent(fromKey);
  const toContent = await getLessonContent(toKey);

  if (!fromContent || !toContent) {
    return { success: false, reason: 'Content not found' };
  }

  const fromLength = fromContent.content?.length || 0;
  const toLength = toContent.content?.length || 0;

  // Only copy if source is significantly better
  if (fromLength < 3000 || fromLength <= toLength) {
    return { success: false, reason: `Source not better (${fromLength} vs ${toLength})` };
  }

  // Copy content
  const { error } = await supabase
    .from('lesson_section_content')
    .update({ content: fromContent.content })
    .eq('id', toContent.id);

  if (error) {
    return { success: false, reason: error.message };
  }

  return { success: true, fromLength, toLength };
}

async function copyBetweenDuplicates() {
  console.log('🔄 COPYING CONTENT BETWEEN DUPLICATES\n');

  let copied = 0;
  let skipped = 0;

  for (const pair of duplicatePairs) {
    console.log(`\nChecking: ${pair.numeric} ↔️ ${pair.named}`);

    // Try copying from named to numeric
    let result = await copyContent(pair.named, pair.numeric);
    if (result.success) {
      console.log(`  ✅ ${pair.named} → ${pair.numeric}: ${result.toLength} → ${result.fromLength} chars`);
      copied++;
      continue;
    }

    // Try copying from numeric to named
    result = await copyContent(pair.numeric, pair.named);
    if (result.success) {
      console.log(`  ✅ ${pair.numeric} → ${pair.named}: ${result.toLength} → ${result.fromLength} chars`);
      copied++;
      continue;
    }

    console.log(`  ⏭️  ${result.reason}`);
    skipped++;
  }

  console.log('\n' + '='.repeat(70));
  console.log(`✅ Copied: ${copied} pairs`);
  console.log(`⏭️  Skipped: ${skipped} pairs`);
  console.log('='.repeat(70));
}

copyBetweenDuplicates().catch(err => {
  console.error('❌ FAILED:', err);
  process.exit(1);
});
