const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function removeBadQuestions() {
  console.log('Removing bad generic questions added from english_questions.json...\n');

  const lessonKeys = [
    'sentence-structure', 'commas', 'punctuation', 'verbs', 'pronouns',
    'modifiers', 'parallel-structure', 'misc-topics', 'redundancy',
    'word-choice', 'transitions', 'which-choice', 'adding-deleting', 'logical-placement'
  ];

  let totalRemoved = 0;

  for (const key of lessonKeys) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', key)
      .single();

    if (!lesson) continue;

    // Find questions with generic problem text
    const { data: badQuestions } = await supabase
      .from('lesson_examples')
      .select('id, position, problem_text')
      .eq('lesson_id', lesson.id)
      .ilike('problem_text', '%Which choice best corrects the underlined portion%');

    if (badQuestions && badQuestions.length > 0) {
      console.log(`${key}: Found ${badQuestions.length} bad questions`);

      const ids = badQuestions.map(q => q.id);
      const { error } = await supabase
        .from('lesson_examples')
        .delete()
        .in('id', ids);

      if (error) {
        console.error(`  Error removing from ${key}:`, error.message);
      } else {
        console.log(`  ✓ Removed ${badQuestions.length} questions`);
        totalRemoved += badQuestions.length;
      }
    }
  }

  console.log(`\n✅ Total removed: ${totalRemoved} bad questions`);
}

removeBadQuestions();
