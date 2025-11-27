const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const allEnglishLessons = [
  'commas', 'logical-placement', 'misc-topics', 'modifiers',
  'parallel-structure', 'pronouns', 'punctuation', 'redundancy',
  'transitions', 'verbs', 'word-choice'
];

async function scanAllIncomplete() {
  console.log('Scanning ALL remaining English lessons for incomplete questions...\n');
  console.log('='.repeat(80));

  const allIncomplete = [];

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', lessonKey).single();
    const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).order('position');

    for (const q of questions) {
      const text = q.problem_text || '';
      const lowText = text.toLowerCase();

      // Check for incomplete patterns
      const refsParagraph = (lowText.includes('this essay') || lowText.includes('this paragraph')) && text.length < 300 && !lowText.includes('the paragraph ');
      const refsUnderlined = lowText.includes('underlined') && !text.includes('<u>');
      const refsSentences = (lowText.includes('sentence 1') || lowText.includes('sentence 2')) && !text.includes('[Sentence');
      const refsMarshall = lowText.includes('marshall');
      const refsManta = lowText.includes('manta') && text.length < 250;
      const tooShort = text.length < 180;

      if (refsParagraph || refsUnderlined || refsSentences || refsMarshall || refsManta || tooShort) {
        allIncomplete.push({
          lesson: lessonKey,
          pos: q.position,
          id: q.id,
          title: q.title,
          length: text.length,
          issue: refsParagraph ? 'refs essay/para' : refsUnderlined ? 'refs underlined without showing' : refsSentences ? 'refs sentences' : refsMarshall ? 'refs Marshall' : refsManta ? 'refs manta' : 'too short'
        });
      }
    }
  }

  console.log(`\nFound ${allIncomplete.length} potentially incomplete questions:\n`);

  allIncomplete.forEach(q => {
    console.log(`${q.lesson.padEnd(20)} Position ${q.pos.toString().padEnd(3)} [${q.issue}] - ${q.length} chars`);
    console.log(`  ${q.title}`);
  });

  console.log('\n' + '='.repeat(80));
  console.log(`Total potentially incomplete: ${allIncomplete.length}`);

  // Group by lesson
  const byLesson = {};
  allIncomplete.forEach(q => {
    if (!byLesson[q.lesson]) byLesson[q.lesson] = [];
    byLesson[q.lesson].push(q);
  });

  console.log('\nBy lesson:');
  Object.keys(byLesson).forEach(lesson => {
    console.log(`  ${lesson}: ${byLesson[lesson].length} questions`);
  });
}

scanAllIncomplete();
