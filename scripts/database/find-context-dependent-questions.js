const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allEnglishLessons = [
  'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
  'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
  'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
];

async function findContextDependentQuestions() {
  console.log('Finding questions that require passage context...\n');
  console.log('='.repeat(80));

  const problematicPatterns = [
    'at this point in the essay',
    'at this point in the passage',
    'at this point in the paragraph',
    'Which of the following quotations',
    'provides the most relevant information at this point',
    'in the context of the passage',
    'According to the passage',
    'earlier in the passage',
    'later in the passage',
    'the essay',
    'the passage discusses'
  ];

  let totalProblematic = 0;
  const problematicQuestions = [];

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id, title')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) continue;

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    for (const q of questions) {
      const problemText = (q.problem_text || '').toLowerCase();
      const title = (q.title || '').toLowerCase();

      // Check if question references passage/essay context
      let hasContextReference = false;
      let matchedPattern = '';

      for (const pattern of problematicPatterns) {
        if (problemText.includes(pattern.toLowerCase()) || title.includes(pattern.toLowerCase())) {
          hasContextReference = true;
          matchedPattern = pattern;
          break;
        }
      }

      // But check if there's actually passage context provided
      const hasPassageContext = problemText.length > 200 ||
                                problemText.includes('[1]') ||
                                problemText.includes('sentence 1:') ||
                                problemText.includes('paragraph:');

      if (hasContextReference && !hasPassageContext) {
        totalProblematic++;
        problematicQuestions.push({
          lesson: lessonKey,
          position: q.position,
          id: q.id,
          title: q.title,
          pattern: matchedPattern,
          problemPreview: problemText.substring(0, 150)
        });
      }
    }
  }

  console.log(`Found ${totalProblematic} questions that reference passages but lack context:\n`);

  // Group by lesson
  const byLesson = {};
  problematicQuestions.forEach(q => {
    if (!byLesson[q.lesson]) byLesson[q.lesson] = [];
    byLesson[q.lesson].push(q);
  });

  for (const [lessonKey, questions] of Object.entries(byLesson)) {
    console.log(`\n${lessonKey} (${questions.length} questions):`);
    console.log('-'.repeat(80));
    questions.forEach(q => {
      console.log(`  Position ${q.position}: ${q.title}`);
      console.log(`    Pattern: "${q.pattern}"`);
      console.log(`    Preview: ${q.problemPreview}...`);
      console.log(`    ID: ${q.id}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Total: ${totalProblematic} questions need fixing or removal`);
  console.log('='.repeat(80));
}

findContextDependentQuestions();
