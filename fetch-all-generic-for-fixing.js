const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

const lessonsWithGeneric = [
  'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
  'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
  'redundancy', 'transitions', 'verbs', 'which-choice'
];

async function fetchAllGenericForFixing() {
  const allQuestions = [];

  for (const lessonKey of lessonsWithGeneric) {
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
      .order('position', { ascending: true});

    const genericQuestions = questions.filter(q => {
      const exp = q.answer_explanation || '';
      return exp.includes("doesn't satisfy the requirements") ||
             exp.includes("doesn't best fulfill the requirements") ||
             exp.includes("might seem plausible at first");
    });

    allQuestions.push({
      lessonKey,
      lessonTitle: lesson.title,
      questions: genericQuestions
    });

    console.log(`${lessonKey}: ${genericQuestions.length} generic questions`);
  }

  fs.writeFileSync('all-generic-full-data.json', JSON.stringify(allQuestions, null, 2));
  console.log('\nSaved full data to: all-generic-full-data.json');
  console.log(`Total questions to fix: ${allQuestions.reduce((sum, l) => sum + l.questions.length, 0)}`);
}

fetchAllGenericForFixing();
