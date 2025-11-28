const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allEnglishLessons = [
  'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
  'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
  'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
];

async function findUltraComprehensiveIncomplete() {
  console.log('ULTRA-COMPREHENSIVE SEARCH for incomplete questions...\\n');
  console.log('='.repeat(80));

  // Massively expanded patterns to catch every variation
  const problematicPatterns = [
    // Underlined portion references
    'the underlined portion',
    'delete the underlined',
    'the sentence would primarily lose',
    'the writer were to delete',
    'deleting the underlined',

    // Passage/essay context references
    'at this point in the essay',
    'at this point in the passage',
    'at this point in the paragraph',
    'earlier in the passage',
    'later in the passage',
    'earlier in the essay',
    'later in the essay',
    'in the context of the passage',
    'in the context of the essay',
    'according to the passage',
    'according to the essay',
    'the passage discusses',
    'the essay discusses',

    // Quotation references
    'Which of the following quotations',
    'quotation to the',
    'from the quotation',
    'from the [name] quotation',
    'leads the reader from',
    'quotation from',

    // Named person/entity references without context
    'grandmaster flash',
    'the furious five',
    '"the message"',
    'robinson had to convince',
    'klimas',

    // Concluding/paragraph references
    'best concludes this paragraph and the essay',
    'concluding sentence of the essay',
    'concluding sentence of the paragraph',
    'best concludes the essay',
    'most effectively concludes',
    'concluding paragraph',

    // Sentence/information placement
    'provides the most relevant information at this point',
    'most relevant information at this point',
    'best placement for this sentence',
    'where should this sentence be placed',
    'most effectively indicates that',
    'most effectively leads',
    'most effectively emphasizes'
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
        if (problemText.includes(pattern.toLowerCase()) || title.includes(pattern.toLowerCase())) {
          hasContextReference = true;
          matchedPatterns.push(pattern);
        }
      }

      // Check if there's actual passage context provided
      const hasUnderlineTag = problemText.includes('<u>') && problemText.includes('</u>');
      const hasLongContext = problemText.length > 300;
      const hasBracketedSentences = problemText.includes('[1]') || problemText.includes('sentence 1:');
      const hasParagraphLabel = problemText.includes('paragraph:') || problemText.includes('paragraph 1');

      // Question has actual context if it includes underlined portions in long text OR bracketed sentences
      const hasActualContext = (hasUnderlineTag && hasLongContext) || hasBracketedSentences || hasParagraphLabel;

      if (hasContextReference && !hasActualContext) {
        totalProblematic++;
        problematicQuestions.push({
          lesson: lessonKey,
          position: q.position,
          id: q.id,
          title: q.title,
          patterns: matchedPatterns,
          problemLength: problemText.length,
          problemPreview: problemText.substring(0, 250)
        });
      }
    }
  }

  console.log(`Found ${totalProblematic} questions that lack proper context:\\n`);

  // Group by lesson
  const byLesson = {};
  problematicQuestions.forEach(q => {
    if (!byLesson[q.lesson]) byLesson[q.lesson] = [];
    byLesson[q.lesson].push(q);
  });

  for (const [lessonKey, questions] of Object.entries(byLesson)) {
    console.log(`\\n${lessonKey} (${questions.length} questions):`);
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

  console.log('\\n' + '='.repeat(80));
  console.log(`Total: ${totalProblematic} questions need deletion`);
  console.log('='.repeat(80));

  // Export IDs for deletion script
  const idsToDelete = problematicQuestions.map(q => q.id);
  console.log('\\nQuestion IDs to delete:');
  console.log(JSON.stringify(idsToDelete, null, 2));
}

findUltraComprehensiveIncomplete();
