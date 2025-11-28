const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

const FRACTIONS_LESSON_ID = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';

const batch1 = require('./fractions-questions-batch1.js');
const batch2 = require('./fractions-questions-batch2.js');
const batch3 = require('./fractions-questions-batch3.js');

const allQuestions = [...batch1, ...batch2, ...batch3];

console.log(`\nFRACTIONS: Inserting ${allQuestions.length} questions\n`);

(async () => {
  // Delete existing
  await supabase.from('lesson_examples').delete().eq('lesson_id', FRACTIONS_LESSON_ID);
  console.log('✓ Old questions deleted\n');

  let inserted = 0;
  for (const q of allQuestions) {
    const record = {
      lesson_id: FRACTIONS_LESSON_ID,
      position: q.position,
      title: `Fractions Practice ${q.position}`,
      problem_text: q.problem_text,
      choices: JSON.stringify(q.choices),
      correct_answer: q.correct_answer,
      answer_explanation: q.choices.find(c => c.letter === q.correct_answer)?.explanation || '',
      solution_steps: []
    };

    const { error } = await supabase.from('lesson_examples').insert([record]);
    if (error) {
      console.error(`❌ Q${q.position}:`, error.message);
    } else {
      console.log(`✓ Q${q.position}: ${q.problem_text.substring(0, 50)}...`);
      inserted++;
    }
  }

  console.log(`\n✅ Inserted: ${inserted}/${allQuestions.length}\n`);
})();
