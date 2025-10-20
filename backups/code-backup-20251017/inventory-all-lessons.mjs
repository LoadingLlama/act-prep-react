import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inventoryAllLessons() {
  console.log('📊 COMPLETE LESSON INVENTORY\n');
  console.log('='.repeat(70));

  const subjects = ['english', 'math', 'reading', 'science'];

  for (const subject of subjects) {
    const { data: lessons } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('subject', subject)
      .order('lesson_key');

    console.log(`\n${subject.toUpperCase()} LESSONS: ${lessons?.length || 0} total`);
    console.log('-'.repeat(70));

    if (!lessons || lessons.length === 0) {
      console.log('  No lessons found');
      continue;
    }

    let damaged = 0;
    let ok = 0;

    for (const lesson of lessons) {
      // Get content length
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id);

      if (!sections || sections.length === 0) {
        console.log(`  ❌ ${lesson.lesson_key}: NO SECTIONS - "${lesson.title}"`);
        damaged++;
        continue;
      }

      let totalContent = 0;
      for (const section of sections) {
        const { data: content } = await supabase
          .from('section_content')
          .select('content')
          .eq('section_id', section.id);

        if (content) {
          totalContent += content.reduce((sum, c) => sum + (c.content?.length || 0), 0);
        }
      }

      if (totalContent < 3000) {
        console.log(`  ❌ ${lesson.lesson_key}: ${totalContent} chars (DAMAGED) - "${lesson.title}"`);
        damaged++;
      } else {
        console.log(`  ✅ ${lesson.lesson_key}: ${totalContent} chars - "${lesson.title}"`);
        ok++;
      }
    }

    console.log(`\n  Summary: ✅ ${ok} OK | ❌ ${damaged} DAMAGED`);
  }

  console.log('\n' + '='.repeat(70));
}

inventoryAllLessons().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
