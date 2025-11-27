const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function sampleGenericExplanations() {
  try {
    // Get word-choice lesson
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, lesson_key')
      .eq('lesson_key', 'word-choice')
      .single();

    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lessons.id)
      .limit(5);

    console.log('=== SAMPLE WORD-CHOICE QUESTIONS ===\n');

    examples.forEach((ex, idx) => {
      console.log(`\n--- Question ${idx + 1}: ${ex.title} ---`);
      console.log(`Problem: ${ex.problem_text.substring(0, 150)}...`);
      console.log(`Choices: ${JSON.stringify(ex.choices.map(c => c.text || c))}`);
      console.log(`Correct: ${ex.correct_answer}`);
      console.log(`\nExplanation:`);
      console.log(ex.answer_explanation || 'NO EXPLANATION');
      console.log('\n' + '='.repeat(80));
    });

  } catch (err) {
    console.error('Error:', err);
  }
}

sampleGenericExplanations();
