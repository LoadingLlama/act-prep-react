const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function showFinalExamples() {
  console.log('FINAL EXAMPLES OF COMPLETED EXPLANATIONS\n');
  console.log('='.repeat(100) + '\n');

  const exampleIds = [76, 84, 100];

  for (const id of exampleIds) {
    const { data, error } = await supabase
      .from('practice_test_math_questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error: ${error.message}`);
      continue;
    }

    console.log(`QUESTION ${data.question_number} (ID: ${data.id})`);
    console.log('-'.repeat(100));
    console.log(`TYPE: ${data.question_type}`);
    console.log(`\nQUESTION TEXT:`);
    console.log(data.question_text);
    console.log(`\nCHOICES:`);
    const choices = JSON.parse(data.choices);
    choices.forEach(choice => console.log(`  ${choice}`));
    console.log(`\nCORRECT ANSWER: ${data.correct_answer}`);
    console.log(`\nEXPLANATION:`);
    console.log(data.explanation);
    console.log('\n' + '='.repeat(100) + '\n');
  }
}

showFinalExamples();
