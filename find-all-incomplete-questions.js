const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allEnglishLessons = [
  'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
  'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
  'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
];

async function findAllIncompleteQuestions() {
  console.log('Finding ALL questions that lack context...\n');
  console.log('='.repeat(80));

  const problematicPatterns = [
    'the underlined portion',
    'delete the underlined',
    'the sentence would primarily lose',
    'at this point in the essay',
    'at this point in the passage',
    'Which of the following quotations',
    'best concludes this paragraph and the essay',
    'the passage discusses',
    'according to the passage'
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

      // Check if question references undefined context
      let hasContextReference = false;
      let matchedPatterns = [];

      for (const pattern of problematicPatterns) {
        if (problemText.includes(pattern.toLowerCase())) {
          hasContextReference = true;
          matchedPatterns.push(pattern);
        }
      }

      // Check if there's actual passage context provided (long text with underlined portions)
      const hasUnderlineTag = problemText.includes('<u>') && problemText.includes('</u>');
      const hasLongContext = problemText.length > 250;
      const hasBracketedSentences = problemText.includes('[1]') || problemText.includes('sentence 1:');

      const hasActualContext = (hasUnderlineTag && hasLongContext) || hasBracketedSentences;

      if (hasContextReference && !hasActualContext) {
        totalProblematic++;
        problematicQuestions.push({
          lesson: lessonKey,
          position: q.position,
          id: q.id,
          title: q.title,
          patterns: matchedPatterns,
          problemLength: problemText.length,
          problemPreview: problemText.substring(0, 200)
        });
      }
    }
  }

  console.log(`Found ${totalProblematic} questions that lack proper context:\n`);

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
      console.log(`    ID: ${q.id}`);
      console.log(`    Patterns: ${q.patterns.join(', ')}`);
      console.log(`    Text length: ${q.problemLength} chars`);
      console.log(`    Preview: ${q.problemPreview}...`);
      console.log();
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Total: ${totalProblematic} questions need deletion`);
  console.log('='.repeat(80));

  // Export IDs for deletion script
  const idsToDelete = problematicQuestions.map(q => q.id);
  console.log('\nQuestion IDs to delete:');
  console.log(JSON.stringify(idsToDelete, null, 2));
}

findAllIncompleteQuestions();
