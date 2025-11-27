const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const allEnglishLessons = ['adding-deleting', 'commas', 'logical-placement', 'misc-topics', 'modifiers', 'parallel-structure', 'pronouns', 'punctuation', 'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'];

async function checkCounts() {
  console.log('Current question counts:\n');

  for (const key of allEnglishLessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', key).single();
    const { data: questions } = await supabase.from('lesson_examples').select('id').eq('lesson_id', lesson.id);

    const count = questions.length;
    const needed = key === 'adding-deleting' ? 'N/A (skip)' : (50 - count);

    console.log(`${key.padEnd(20)}: ${count.toString().padStart(2)} questions (need ${needed})`);
  }
}

checkCounts();
