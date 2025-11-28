const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const allEnglishLessons = ['adding-deleting', 'commas', 'logical-placement', 'misc-topics', 'modifiers', 'parallel-structure', 'pronouns', 'punctuation', 'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'];

async function findGenericUnderlined() {
  console.log('Searching for questions with generic underlined text...\n');

  const genericPatterns = [
    'This passage provides important context',
    'establishes a foundation for the subsequent analysis',
    'helps frame the key points being developed'
  ];

  const issues = [];

  for (const key of allEnglishLessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', key).single();
    const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id);

    for (const q of questions) {
      const text = q.problem_text || '';
      const low = text.toLowerCase();

      for (const pattern of genericPatterns) {
        if (low.includes(pattern.toLowerCase())) {
          issues.push({
            lesson: key,
            position: q.position,
            title: q.title,
            snippet: text.substring(0, 200) + '...'
          });
          break;
        }
      }
    }
  }

  console.log(`Found ${issues.length} questions with generic underlined text:\n`);
  issues.forEach(issue => {
    console.log(`${issue.lesson} Position ${issue.position}: ${issue.title}`);
    console.log(`  Snippet: ${issue.snippet}`);
    console.log('');
  });
}

findGenericUnderlined();
