import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkLessons() {
  console.log('🔍 Checking which lessons have content\n');

  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, subject')
    .eq('subject', 'math')
    .order('lesson_key');

  const withContent = [];
  const withoutContent = [];

  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lesson.id);

    if (!sections || sections.length === 0) {
      withoutContent.push({ ...lesson, reason: 'No sections' });
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

    if (totalContent === 0) {
      withoutContent.push({ ...lesson, reason: 'No content blocks' });
    } else {
      withContent.push({ ...lesson, contentLength: totalContent });
    }
  }

  console.log(`✅ Lessons WITH content: ${withContent.length}`);
  withContent.slice(0, 10).forEach(l => {
    console.log(`  ${l.lesson_key}: ${l.contentLength} chars`);
  });

  console.log(`\n❌ Lessons WITHOUT content: ${withoutContent.length}`);
  withoutContent.forEach(l => {
    console.log(`  ${l.lesson_key}: ${l.title} (${l.reason})`);
  });
}

checkLessons().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
