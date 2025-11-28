const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function verifyExplanations() {
  console.log('VERIFICATION: SPECIFIC EXPLANATIONS\n');

  const sections = [
    { name: 'english', questionNumbers: [5, 15, 30] },
    { name: 'math', questionNumbers: [10, 25, 40] },
    { name: 'reading', questionNumbers: [5, 15, 25] },
    { name: 'science', questionNumbers: [5, 15, 25] }
  ];

  for (const section of sections) {
    console.log('\n================================================================================');
    console.log(section.name.toUpperCase() + ' SECTION - Sample Questions');
    console.log('================================================================================');

    const tableName = 'practice_test_' + section.name + '_questions';

    for (const qNum of section.questionNumbers) {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('test_number', 1)
        .eq('question_number', qNum)
        .single();

      if (error || !data) {
        console.log('\nCould not fetch question ' + qNum);
        continue;
      }

      let choicesArray = data.choices;
      if (typeof data.choices === 'string') {
        try {
          choicesArray = JSON.parse(data.choices);
        } catch (e) {
          choicesArray = data.choices;
        }
      }

      console.log('\n--- Question #' + qNum + ' ---');
      console.log('\nQUESTION TEXT:');
      console.log(data.question_text);

      if (Array.isArray(choicesArray)) {
        console.log('\nCHOICES:');
        choicesArray.forEach(c => console.log('  ' + c));
      }

      console.log('\nCORRECT ANSWER: ' + data.correct_answer);

      console.log('\nEXPLANATION:');
      console.log(data.explanation || '(No explanation)');
    }
  }

  console.log('\n================================================================================\n');
}

verifyExplanations().catch(console.error);
