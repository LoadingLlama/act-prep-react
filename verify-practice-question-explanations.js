const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const englishLessons = [
  'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
  'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
  'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
];

async function verifyPracticeQuestionExplanations() {
  console.log('Analyzing practice question explanation structure...\n');
  console.log('='.repeat(80));

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .in('lesson_key', englishLessons);

  let totalWorkedExamples = 0;
  let totalPracticeQuestions = 0;
  let practiceWithMainExp = 0;
  let practiceWithChoiceExp = 0;

  for (const lesson of lessons) {
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    // Separate worked examples (first 4) from practice questions (5-50)
    const workedExamples = questions.filter(q => q.position <= 4);
    const practiceQuestions = questions.filter(q => q.position > 4);

    totalWorkedExamples += workedExamples.length;
    totalPracticeQuestions += practiceQuestions.length;

    // Count practice questions with main explanations
    const practiceWithMain = practiceQuestions.filter(q =>
      q.answer_explanation && q.answer_explanation.trim() !== ''
    ).length;

    // Count practice questions with choice explanations
    const practiceWithChoice = practiceQuestions.filter(q =>
      q.choices && q.choices.every(c => c.explanation && c.explanation.trim() !== '')
    ).length;

    practiceWithMainExp += practiceWithMain;
    practiceWithChoiceExp += practiceWithChoice;

    const mainExpPercent = ((practiceWithMain / practiceQuestions.length) * 100).toFixed(0);
    const choiceExpPercent = ((practiceWithChoice / practiceQuestions.length) * 100).toFixed(0);

    console.log(`${lesson.lesson_key.padEnd(20)} - ${practiceQuestions.length} practice questions`);
    console.log(`  Main explanations: ${practiceWithMain}/${practiceQuestions.length} (${mainExpPercent}%)`);
    console.log(`  Choice explanations: ${practiceWithChoice}/${practiceQuestions.length} (${choiceExpPercent}%)`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY:');
  console.log(`  Worked examples (positions 1-4): ${totalWorkedExamples} questions`);
  console.log(`  Practice questions (positions 5-50): ${totalPracticeQuestions} questions`);
  console.log(`  Practice with main explanations: ${practiceWithMainExp}/${totalPracticeQuestions} (${((practiceWithMainExp/totalPracticeQuestions)*100).toFixed(1)}%)`);
  console.log(`  Practice with choice explanations: ${practiceWithChoiceExp}/${totalPracticeQuestions} (${((practiceWithChoiceExp/totalPracticeQuestions)*100).toFixed(1)}%)`);
  console.log('='.repeat(80));

  // Sample a few practice questions to show their main explanations
  console.log('\nSample practice question main explanations:\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'adding-deleting')
    .single();

  const { data: samples } = await supabase
    .from('lesson_examples')
    .select('title, answer_explanation, correct_answer')
    .eq('lesson_id', lesson.id)
    .gte('position', 5)
    .limit(2);

  samples.forEach(q => {
    console.log('─'.repeat(80));
    console.log(`Question: ${q.title}`);
    console.log(`Correct answer: ${q.correct_answer}`);
    console.log(`Main explanation:\n${q.answer_explanation}\n`);
  });
}

verifyPracticeQuestionExplanations();
