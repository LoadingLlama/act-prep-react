const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function identifyAllGenericQuestions() {
  try {
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, lesson_key, title')
      .eq('subject', 'english')
      .order('lesson_key', { ascending: true });

    const allGenericQuestions = [];
    let totalGeneric = 0;

    for (const lesson of lessons) {
      const { data: questions } = await supabase
        .from('lesson_examples')
        .select('*')
        .eq('lesson_id', lesson.id);

      if (!questions || questions.length === 0) continue;

      const genericQuestions = questions.filter(q => {
        const exp = q.answer_explanation || '';
        return exp.includes("doesn't satisfy the requirements") ||
               exp.includes("doesn't best fulfill the requirements") ||
               exp.includes("might seem plausible at first");
      });

      if (genericQuestions.length > 0) {
        allGenericQuestions.push({
          lessonKey: lesson.lesson_key,
          lessonTitle: lesson.title,
          totalQuestions: questions.length,
          genericCount: genericQuestions.length,
          questions: genericQuestions.map(q => ({
            id: q.id,
            position: q.position,
            title: q.title,
            problemText: q.problem_text.substring(0, 200),
            correctAnswer: q.correct_answer
          }))
        });
        totalGeneric += genericQuestions.length;
      }
    }

    console.log('=== LESSONS WITH GENERIC EXPLANATIONS ===\n');
    allGenericQuestions.forEach(lesson => {
      console.log(`${lesson.lessonKey}: ${lesson.genericCount}/${lesson.totalQuestions} generic`);
    });

    console.log(`\nTotal generic questions to fix: ${totalGeneric}`);

    fs.writeFileSync('all-generic-questions.json', JSON.stringify(allGenericQuestions, null, 2));
    console.log('\nSaved to: all-generic-questions.json');

  } catch (err) {
    console.error('Error:', err);
  }
}

identifyAllGenericQuestions();
