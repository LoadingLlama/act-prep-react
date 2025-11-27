const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Fetching sample question from lesson_examples...\n');

  const { data, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .not('problem_text', 'is', null)
    .limit(3);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('Sample question 1:');
    console.log('ID:', data[0].id);
    console.log('Lesson ID:', data[0].lesson_id);
    console.log('\nProblem Text:');
    console.log(data[0].problem_text);
    console.log('\n' + '='.repeat(80) + '\n');

    if (data[1]) {
      console.log('Sample question 2:');
      console.log('ID:', data[1].id);
      console.log('\nProblem Text:');
      console.log(data[1].problem_text);
      console.log('\n' + '='.repeat(80) + '\n');
    }

    // Check if any have <u> tags
    const hasUnderline = data.some(q => q.problem_text && q.problem_text.includes('<u'));
    console.log('Contains <u> tags?', hasUnderline);
  } else {
    console.log('No data found');
  }
})();
