const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allEnglishLessons = [
  'adding-deleting',
  'commas',
  'logical-placement',
  'misc-topics',
  'modifiers',
  'parallel-structure',
  'pronouns',
  'punctuation',
  'redundancy',
  'transitions',
  'verbs',
  'which-choice',
  'word-choice'
];

async function finalCompleteVerification() {
  console.log('═'.repeat(80));
  console.log('FINAL COMPLETE VERIFICATION - ALL ENGLISH QUESTIONS');
  console.log('═'.repeat(80));
  console.log();

  let totalQuestions = 0;
  let totalWithMainExp = 0;
  let totalWithAllChoiceExp = 0;
  let questionsWithIssues = [];

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) continue;

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    let mainExpCount = 0;
    let allChoiceExpCount = 0;

    for (const q of questions) {
      totalQuestions++;

      // Check main explanation
      const hasMainExp = q.answer_explanation && q.answer_explanation.trim() !== '';
      if (hasMainExp) {
        totalWithMainExp++;
        mainExpCount++;
      }

      // Check per-choice explanations
      const hasAllChoiceExp = q.choices && q.choices.length > 0 &&
        q.choices.every(c => c.explanation && c.explanation.trim() !== '');

      if (hasAllChoiceExp) {
        totalWithAllChoiceExp++;
        allChoiceExpCount++;
      }

      // Track issues
      if (!hasMainExp || !hasAllChoiceExp) {
        questionsWithIssues.push({
          lesson: lessonKey,
          position: q.position,
          title: q.title,
          missingMainExp: !hasMainExp,
          missingChoiceExp: !hasAllChoiceExp,
          emptyChoices: q.choices ? q.choices.filter(c => !c.explanation || c.explanation.trim() === '').map(c => c.letter) : []
        });
      }
    }

    const mainPercent = ((mainExpCount / questions.length) * 100).toFixed(1);
    const choicePercent = ((allChoiceExpCount / questions.length) * 100).toFixed(1);

    const mainStatus = mainExpCount === questions.length ? '✓' : '❌';
    const choiceStatus = allChoiceExpCount === questions.length ? '✓' : '❌';

    console.log(`${mainStatus}${choiceStatus} ${lessonKey.padEnd(20)} - ${questions.length} questions`);
    console.log(`     Main explanations: ${mainExpCount}/${questions.length} (${mainPercent}%)`);
    console.log(`     Per-choice explanations: ${allChoiceExpCount}/${questions.length} (${choicePercent}%)`);
  }

  console.log('\n' + '═'.repeat(80));
  console.log('OVERALL SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Total English questions: ${totalQuestions}`);
  console.log(`Questions with main explanations: ${totalWithMainExp}/${totalQuestions} (${((totalWithMainExp/totalQuestions)*100).toFixed(1)}%)`);
  console.log(`Questions with ALL per-choice explanations: ${totalWithAllChoiceExp}/${totalQuestions} (${((totalWithAllChoiceExp/totalQuestions)*100).toFixed(1)}%)`);

  if (questionsWithIssues.length === 0) {
    console.log('\n🎉 🎉 🎉 PERFECT! ALL QUESTIONS COMPLETE! 🎉 🎉 🎉');
    console.log('\n✓ All 650 questions have:');
    console.log('  ✓ Main explanations');
    console.log('  ✓ Per-choice explanations for every choice (A, B, C, D)');
  } else {
    console.log(`\n⚠️  ${questionsWithIssues.length} questions still need attention:\n`);
    questionsWithIssues.forEach(issue => {
      console.log(`  ${issue.lesson} - Position ${issue.position}: ${issue.title}`);
      if (issue.missingMainExp) {
        console.log(`    ❌ Missing main explanation`);
      }
      if (issue.missingChoiceExp) {
        console.log(`    ❌ Missing per-choice explanations for: ${issue.emptyChoices.join(', ')}`);
      }
    });
  }

  console.log('\n' + '═'.repeat(80));
}

finalCompleteVerification();
