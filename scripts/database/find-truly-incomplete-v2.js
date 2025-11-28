const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const allEnglishLessons = [
  'commas', 'logical-placement', 'misc-topics', 'modifiers',
  'parallel-structure', 'pronouns', 'punctuation', 'redundancy',
  'transitions', 'verbs', 'word-choice'
];

async function findTrulyIncompleteV2() {
  console.log('Finding TRULY incomplete questions (refined search)...\n');
  console.log('='.repeat(80));

  const trulyIncomplete = [];

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', lessonKey).single();
    const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).order('position');

    for (const q of questions) {
      const text = q.problem_text || '';
      const lowText = text.toLowerCase();

      // Check for questions that reference things WITHOUT showing them
      const refsParagraphWithoutShowing = (lowText.includes('this essay') || lowText.includes('this paragraph')) && text.length < 300;
      const refsUnderlinedWithoutShowing = lowText.includes('underlined') && !text.includes('<u>');
      const refsMarshall = lowText.includes('marshall');
      const refsManta = lowText.includes('manta') && text.length < 250;

      // DON'T flag if it has [Sentence X] or [X] showing the sentences
      const hasSentenceLabels = text.includes('[1]') || text.includes('[Sentence 1]');

      if ((refsParagraphWithoutShowing || refsUnderlinedWithoutShowing || refsMarshall || refsManta) && !hasSentenceLabels) {
        trulyIncomplete.push({
          lesson: lessonKey,
          pos: q.position,
          id: q.id,
          title: q.title,
          length: text.length,
          issue: refsParagraphWithoutShowing ? 'refs essay/para without showing' :
                 refsUnderlinedWithoutShowing ? 'refs underlined without <u>' :
                 refsMarshall ? 'refs Marshall' :
                 'refs manta'
        });
      }
    }
  }

  console.log(`Found ${trulyIncomplete.length} TRULY incomplete questions:\n`);

  trulyIncomplete.forEach(q => {
    console.log(`${q.lesson.padEnd(20)} Position ${q.pos.toString().padEnd(3)} [${q.issue}]`);
    console.log(`  ${q.title}`);
    console.log(`  ID: ${q.id}`);
  });

  console.log('\n' + '='.repeat(80));

  // Group by lesson
  const byLesson = {};
  trulyIncomplete.forEach(q => {
    if (!byLesson[q.lesson]) byLesson[q.lesson] = [];
    byLesson[q.lesson].push(q);
  });

  console.log('\nBy lesson:');
  Object.keys(byLesson).forEach(lesson => {
    console.log(`  ${lesson}: ${byLesson[lesson].length} questions to delete`);
  });
}

findTrulyIncompleteV2();
