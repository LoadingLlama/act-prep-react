const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allEnglishLessons = [
  'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
  'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
  'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
];

async function comprehensiveVerification() {
  console.log('COMPREHENSIVE FINAL VERIFICATION');
  console.log('='.repeat(80));
  console.log('Checking all English practice questions for completeness and quality\\n');

  let totalQuestions = 0;
  let missingMainExplanations = 0;
  let missingPerChoiceExplanations = 0;
  let genericExplanations = 0;
  let incompleteQuestions = 0;

  const genericPatterns = [
    "doesn't best fulfill",
    "doesn't satisfy the requirements",
    "might seem plausible at first",
    "may appear correct",
    "seems like it could work"
  ];

  const problematicPatterns = [
    'the underlined portion',
    'at this point in the essay',
    'at this point in the passage',
    'Which of the following quotations',
    'leads the reader from',
    'concluding sentence of the essay',
    'provides the most relevant information at this point'
  ];

  const issuesByLesson = {};

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id, title')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) continue;

    const { data: questions, count } = await supabase
      .from('lesson_examples')
      .select('*', { count: 'exact' })
      .eq('lesson_id', lesson.id)
      .order('position');

    totalQuestions += count;
    issuesByLesson[lessonKey] = {
      count,
      missingMain: [],
      missingPerChoice: [],
      generic: [],
      incomplete: []
    };

    for (const q of questions) {
      // Check main explanation
      if (!q.answer_explanation || q.answer_explanation.trim().length < 20) {
        missingMainExplanations++;
        issuesByLesson[lessonKey].missingMain.push({
          position: q.position,
          title: q.title,
          id: q.id
        });
      }

      // Check for generic patterns in main explanation
      const mainExpl = (q.answer_explanation || '').toLowerCase();
      for (const pattern of genericPatterns) {
        if (mainExpl.includes(pattern.toLowerCase())) {
          genericExplanations++;
          issuesByLesson[lessonKey].generic.push({
            position: q.position,
            title: q.title,
            pattern
          });
          break;
        }
      }

      // Check per-choice explanations
      const choices = q.choices || [];
      let hasAllPerChoiceExplanations = true;

      for (const choice of choices) {
        if (!choice.explanation || choice.explanation.trim().length < 10) {
          hasAllPerChoiceExplanations = false;
          break;
        }
      }

      if (!hasAllPerChoiceExplanations) {
        missingPerChoiceExplanations++;
        issuesByLesson[lessonKey].missingPerChoice.push({
          position: q.position,
          title: q.title,
          id: q.id
        });
      }

      // Check for context-dependent issues
      const problemText = (q.problem_text || '').toLowerCase();
      const hasUnderlineTag = problemText.includes('<u>') && problemText.includes('</u>');
      const hasLongContext = problemText.length > 300;
      const hasBracketedSentences = problemText.includes('[1]') || problemText.includes('sentence 1:');
      const hasActualContext = (hasUnderlineTag && hasLongContext) || hasBracketedSentences;

      let hasContextReference = false;
      for (const pattern of problematicPatterns) {
        if (problemText.includes(pattern.toLowerCase())) {
          hasContextReference = true;
          break;
        }
      }

      if (hasContextReference && !hasActualContext) {
        incompleteQuestions++;
        issuesByLesson[lessonKey].incomplete.push({
          position: q.position,
          title: q.title,
          preview: problemText.substring(0, 100)
        });
      }
    }
  }

  // Print summary
  console.log('\\n📊 OVERALL SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total questions across 13 lessons: ${totalQuestions}`);
  console.log(`Missing main explanations: ${missingMainExplanations}`);
  console.log(`Missing per-choice explanations: ${missingPerChoiceExplanations}`);
  console.log(`Generic explanations: ${genericExplanations}`);
  console.log(`Incomplete/context-dependent questions: ${incompleteQuestions}`);
  console.log();

  // Print per-lesson details
  console.log('📋 QUESTION COUNTS PER LESSON');
  console.log('='.repeat(80));
  for (const lessonKey of allEnglishLessons) {
    const lesson = issuesByLesson[lessonKey];
    const status = lesson.count >= 45 ? '✓' : '⚠️ ';
    console.log(`${status} ${lessonKey.padEnd(20)} - ${lesson.count} questions`);
  }
  console.log();

  // Print issues if any
  if (missingMainExplanations > 0) {
    console.log('\\n⚠️  MISSING MAIN EXPLANATIONS');
    console.log('='.repeat(80));
    for (const [lessonKey, issues] of Object.entries(issuesByLesson)) {
      if (issues.missingMain.length > 0) {
        console.log(`\\n${lessonKey}:`);
        issues.missingMain.forEach(q => {
          console.log(`  Position ${q.position}: ${q.title} (${q.id})`);
        });
      }
    }
  }

  if (missingPerChoiceExplanations > 0) {
    console.log('\\n⚠️  MISSING PER-CHOICE EXPLANATIONS');
    console.log('='.repeat(80));
    for (const [lessonKey, issues] of Object.entries(issuesByLesson)) {
      if (issues.missingPerChoice.length > 0) {
        console.log(`\\n${lessonKey}:`);
        issues.missingPerChoice.forEach(q => {
          console.log(`  Position ${q.position}: ${q.title} (${q.id})`);
        });
      }
    }
  }

  if (genericExplanations > 0) {
    console.log('\\n⚠️  GENERIC EXPLANATIONS');
    console.log('='.repeat(80));
    for (const [lessonKey, issues] of Object.entries(issuesByLesson)) {
      if (issues.generic.length > 0) {
        console.log(`\\n${lessonKey}:`);
        issues.generic.forEach(q => {
          console.log(`  Position ${q.position}: ${q.title} - Pattern: "${q.pattern}"`);
        });
      }
    }
  }

  if (incompleteQuestions > 0) {
    console.log('\\n⚠️  INCOMPLETE/CONTEXT-DEPENDENT QUESTIONS');
    console.log('='.repeat(80));
    for (const [lessonKey, issues] of Object.entries(issuesByLesson)) {
      if (issues.incomplete.length > 0) {
        console.log(`\\n${lessonKey}:`);
        issues.incomplete.forEach(q => {
          console.log(`  Position ${q.position}: ${q.title}`);
          console.log(`    Preview: ${q.preview}...`);
        });
      }
    }
  }

  // Final verdict
  console.log('\\n\\n✅ FINAL VERDICT');
  console.log('='.repeat(80));
  if (missingMainExplanations === 0 && missingPerChoiceExplanations === 0 &&
      genericExplanations === 0 && incompleteQuestions === 0) {
    console.log('🎉 ALL CHECKS PASSED!');
    console.log(`✓ All ${totalQuestions} questions have complete main explanations`);
    console.log(`✓ All ${totalQuestions} questions have per-choice explanations`);
    console.log(`✓ No generic explanations found`);
    console.log(`✓ No incomplete/context-dependent questions found`);
    console.log('\\n🎓 All English practice questions are ready for use!');
  } else {
    console.log('⚠️  ISSUES FOUND - See details above');
  }
  console.log('='.repeat(80));
}

comprehensiveVerification();
