const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Looking for passage-style questions (longer problem_text)...\n');

  const { data, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .not('problem_text', 'is', null)
    .order('id', { ascending: true })
    .limit(20);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    // Find questions with longer text (likely passage-style)
    const longQuestions = data.filter(q => q.problem_text && q.problem_text.length > 150);

    if (longQuestions.length > 0) {
      console.log(`Found ${longQuestions.length} questions with longer text.\n`);
      console.log('Sample passage-style question:');
      console.log('ID:', longQuestions[0].id);
      console.log('Length:', longQuestions[0].problem_text.length);
      console.log('\nProblem Text:');
      console.log(longQuestions[0].problem_text);
      console.log('\n' + '='.repeat(80));

      // Check for underline tags
      const hasUnderline = longQuestions[0].problem_text.includes('<u');
      console.log('\nContains <u> tags?', hasUnderline);

      if (hasUnderline) {
        console.log('Underline tag found!');
      } else {
        console.log('No <u> tags found in passage-style question.');
        console.log('This is likely the issue - passage questions need underline markup added.');
      }
    } else {
      console.log('No long questions found in first 20 results.');
    }
  }
})();
