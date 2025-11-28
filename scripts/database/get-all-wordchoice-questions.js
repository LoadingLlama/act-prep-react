const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getAllWordChoiceQuestions() {
  try {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', 'word-choice')
      .single();

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position', { ascending: true });

    // Format for easy review
    const formatted = questions.map((q, idx) => ({
      id: q.id,
      position: q.position,
      title: q.title,
      problemText: q.problem_text,
      choices: q.choices,
      correctAnswer: q.correct_answer,
      currentExplanation: q.answer_explanation,
      hasGeneric: (q.answer_explanation || '').includes("doesn't satisfy the requirements")
    }));

    fs.writeFileSync('word-choice-questions-full.json', JSON.stringify(formatted, null, 2));
    console.log(`Exported ${formatted.length} word-choice questions to word-choice-questions-full.json`);
    console.log(`Questions with generic explanations: ${formatted.filter(q => q.hasGeneric).length}`);

  } catch (err) {
    console.error('Error:', err);
  }
}

getAllWordChoiceQuestions();
