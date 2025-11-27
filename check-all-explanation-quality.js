const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const allEnglishLessons = [
  'adding-deleting', 'which-choice', 'logical-placement', 'redundancy',
  'transitions', 'word-choice', 'commas', 'misc-topics', 'modifiers',
  'parallel-structure', 'pronouns', 'punctuation', 'verbs'
];

// Generic patterns that indicate non-specific explanations
const genericPatterns = [
  'violates standard',
  'incorrect and needs to be changed',
  'follows proper comma rules',
  'doesn\'t follow proper',
  'this punctuation violates',
  'this verb form violates',
  'this pronoun violates',
  'standard usage rules',
  'proper grammar rules',
  'correct grammar rules'
];

async function checkAllExplanationQuality() {
  console.log('Checking explanation quality across all English lessons...\n');
  console.log('='.repeat(80));

  const results = {};

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', lessonKey).single();
    const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).order('position');

    let genericCount = 0;
    const genericPositions = [];

    for (const q of questions) {
      let hasGeneric = false;

      for (const choice of q.choices) {
        const exp = (choice.explanation || '').toLowerCase();

        // Check if explanation contains generic patterns
        for (const pattern of genericPatterns) {
          if (exp.includes(pattern)) {
            hasGeneric = true;
            break;
          }
        }

        if (hasGeneric) break;
      }

      if (hasGeneric) {
        genericCount++;
        if (genericPositions.length < 3) {  // Store first 3 examples
          genericPositions.push(q.position);
        }
      }
    }

    results[lessonKey] = {
      total: questions.length,
      generic: genericCount,
      examples: genericPositions,
      percentage: Math.round((genericCount / questions.length) * 100)
    };
  }

  console.log('\nResults by lesson:\n');

  Object.keys(results).forEach(key => {
    const r = results[key];
    const status = r.generic === 0 ? '✓' : '⚠️';
    console.log(`${status} ${key.padEnd(20)} ${r.generic}/${r.total} (${r.percentage}%) have generic explanations`);
    if (r.examples.length > 0) {
      console.log(`   Examples at positions: ${r.examples.join(', ')}`);
    }
  });

  console.log('\n' + '='.repeat(80));

  const needsFix = Object.keys(results).filter(k => results[k].generic > 0);
  console.log(`\nLessons needing fixes: ${needsFix.length}/${allEnglishLessons.length}`);
  console.log(`Lessons with generic explanations: ${needsFix.join(', ')}`);
}

checkAllExplanationQuality();
