const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// All English lesson keys that should have 50 questions each
const englishLessons = [
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
  'word-choice',
  'apostrophes'  // Add if it's an English lesson
];

async function verifyEnglishOnly() {
  console.log('Verifying ENGLISH lessons only...\n');

  // Get all English lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .in('lesson_key', englishLessons);

  console.log(`Found ${lessons.length} English lessons\n`);

  let totalEnglishQuestions = 0;
  let genericEnglishQuestions = 0;
  const genericByLesson = [];

  for (const lesson of lessons) {
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('id, title, answer_explanation, choices')
      .eq('lesson_id', lesson.id);

    totalEnglishQuestions += questions.length;

    // Count generic explanations
    const genericInLesson = questions.filter(q => {
      const hasGenericMain = q.answer_explanation && (
        q.answer_explanation.includes("doesn't satisfy the requirements") ||
        q.answer_explanation.includes("doesn't best fulfill the requirements") ||
        q.answer_explanation.includes("might seem plausible at first")
      );

      const hasGenericChoice = q.choices && q.choices.some(c =>
        c.explanation && (
          c.explanation.includes("doesn't best fulfill") ||
          c.explanation.includes("doesn't satisfy the requirements")
        )
      );

      return hasGenericMain || hasGenericChoice;
    });

    if (genericInLesson.length > 0) {
      genericByLesson.push({
        lesson: lesson.lesson_key,
        count: genericInLesson.length,
        questions: genericInLesson.map(q => q.title)
      });
      genericEnglishQuestions += genericInLesson.length;
    }

    console.log(`✓ ${lesson.lesson_key}: ${questions.length} total, ${genericInLesson.length} generic`);
  }

  console.log('\n' + '='.repeat(80));
  console.log(`ENGLISH LESSONS SUMMARY:`);
  console.log(`Total English questions: ${totalEnglishQuestions}`);
  console.log(`Questions with generic explanations: ${genericEnglishQuestions}`);
  console.log('='.repeat(80));

  if (genericEnglishQuestions > 0) {
    console.log('\n⚠️  English lessons still needing fixes:\n');
    for (const item of genericByLesson) {
      console.log(`  ${item.lesson} (${item.count} questions):`);
      item.questions.forEach(title => console.log(`    - ${title}`));
    }
  } else {
    console.log('\n✓✓✓ SUCCESS! All English lesson explanations are now specific and educational!');
  }
}

verifyEnglishOnly();
