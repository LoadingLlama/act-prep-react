import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDamage() {
  console.log('🔍 CHECKING FOR DAMAGED LESSONS\n');

  // Get all math lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  console.log(`Found ${lessons.length} math lessons\n`);

  const damaged = [];
  const ok = [];

  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lesson.id);

    if (!sections || sections.length === 0) {
      continue;
    }

    let totalContent = 0;
    for (const section of sections) {
      const { data: blocks } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_id', section.id);

      if (blocks) {
        totalContent += blocks.reduce((sum, b) => sum + b.content.length, 0);
      }
    }

    if (totalContent < 3000) {
      damaged.push({ ...lesson, contentLength: totalContent });
    } else {
      ok.push({ ...lesson, contentLength: totalContent });
    }
  }

  console.log(`\n❌ DAMAGED LESSONS (< 3000 chars):`);
  console.log(`Found ${damaged.length} damaged lessons\n`);
  damaged.forEach(l => {
    console.log(`  ${l.lesson_key}: ${l.contentLength} chars - "${l.title}"`);
  });

  console.log(`\n✅ OK LESSONS (>= 3000 chars):`);
  console.log(`Found ${ok.length} OK lessons\n`);
  ok.slice(0, 5).forEach(l => {
    console.log(`  ${l.lesson_key}: ${l.contentLength} chars - "${l.title}"`);
  });

  if (damaged.length > 0) {
    console.log(`\n\n🚨 ACTION REQUIRED:`);
    console.log(`${damaged.length} lessons need restoration!`);
    console.log(`\nLesson keys that need help:`);
    damaged.forEach(l => console.log(`  - ${l.lesson_key}`));
  }
}

checkDamage().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
