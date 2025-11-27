const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function findQuestion() {
  try {
    // Search for examples with "Martinez" or long problem_text
    const { data, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .ilike('problem_text', '%Martinez%');

    if (error) {
      console.error('Error:', error);

      // Try getting English lesson examples with long text
      const { data: englishData, error: englishError } = await supabase
        .from('lesson_examples')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (englishError) {
        console.error('Error fetching English examples:', englishError);
        return;
      }

      console.log('=== Recent lesson examples ===');
      englishData.forEach((ex, idx) => {
        console.log(`\n--- Example ${idx + 1} ---`);
        console.log('Title:', ex.title);
        console.log('Problem text length:', ex.problem_text?.length || 0);
        console.log('Problem text preview:', ex.problem_text?.substring(0, 200) + '...');
      });

      return;
    }

    if (data && data.length > 0) {
      console.log('Found Martinez questions:');
      data.forEach((ex, idx) => {
        console.log(`\n=== Example ${idx + 1} ===`);
        console.log('Title:', ex.title);
        console.log('Problem text:', ex.problem_text);
        console.log('\nChoices:', JSON.stringify(ex.choices, null, 2));
        console.log('Correct answer:', ex.correct_answer);
      });
    } else {
      console.log('No Martinez questions found, showing examples with longer text...');

      // Get examples with longer problem_text (likely passages)
      const { data: longData, error: longError } = await supabase
        .from('lesson_examples')
        .select('*')
        .limit(50);

      if (longError) {
        console.error('Error:', longError);
        return;
      }

      // Sort by length and show longest ones
      const sorted = longData.sort((a, b) => (b.problem_text?.length || 0) - (a.problem_text?.length || 0));

      console.log('\n=== Examples with longest problem text ===');
      sorted.slice(0, 5).forEach((ex, idx) => {
        console.log(`\n--- Example ${idx + 1} ---`);
        console.log('Title:', ex.title);
        console.log('Problem text length:', ex.problem_text?.length || 0);
        console.log('Problem text:\n', ex.problem_text);
        console.log('\nChoices:', JSON.stringify(ex.choices, null, 2));
      });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

findQuestion();
