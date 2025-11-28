const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const lessonsToFix = ['adding-deleting', 'logical-placement', 'redundancy', 'transitions', 'which-choice', 'word-choice'];

async function fixLast6MainExplanations() {
  console.log('Fixing last 6 main explanations (Practice Question 46)...\n');

  let fixed = 0;

  for (const lessonKey of lessonsToFix) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .eq('position', 45);

    if (questions && questions.length > 0) {
      const q = questions[0];

      // Generate main explanation from the per-choice explanations
      let mainExp = `**Question ${q.position}**: ${q.title || 'Practice Question'}\n\n`;

      const correctChoice = q.choices.find(c => c.letter === q.correct_answer);
      if (correctChoice) {
        mainExp += `**Choice ${correctChoice.letter} is correct**: ${correctChoice.text}\n`;
        mainExp += `${correctChoice.explanation}\n\n`;
      }

      // Add incorrect choices
      q.choices.forEach(c => {
        if (c.letter !== q.correct_answer) {
          mainExp += `• Choice ${c.letter} is wrong: ${c.text}\n`;
          mainExp += `  ${c.explanation}\n\n`;
        }
      });

      const { error } = await supabase
        .from('lesson_examples')
        .update({ answer_explanation: mainExp.trim() })
        .eq('id', q.id);

      if (!error) {
        console.log(`✓ Fixed: ${lessonKey} - Practice Question 46`);
        fixed++;
      } else {
        console.log(`✗ Error: ${lessonKey} - ${error.message}`);
      }
    }
  }

  console.log(`\n✓ Fixed ${fixed}/6 questions`);
}

fixLast6MainExplanations();
