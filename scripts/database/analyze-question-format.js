const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Analyzing current question format...\n');

  // Get sample questions from different lessons
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .not('problem_text', 'is', null)
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${examples.length} examples\n`);

  // Analyze format
  let hasNumberedBrackets = 0;
  let hasUnderlineTags = 0;
  let hasSeparatePassage = 0;

  examples.forEach((ex, i) => {
    const text = ex.problem_text || '';

    // Check for [1], [2], etc.
    if (/\[\d+\]/.test(text)) {
      hasNumberedBrackets++;
      console.log(`Example ${i + 1}: HAS numbered brackets [1], [2], etc.`);
    }

    // Check for <u> tags
    if (/<u/.test(text)) {
      hasUnderlineTags++;
      console.log(`Example ${i + 1}: HAS <u> tags`);
    }

    // Check if there's a separate passage field
    if (ex.passage_text) {
      hasSeparatePassage++;
      console.log(`Example ${i + 1}: HAS separate passage_text field`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY:');
  console.log(`Questions with [1], [2] brackets: ${hasNumberedBrackets}/${examples.length}`);
  console.log(`Questions with <u> tags: ${hasUnderlineTags}/${examples.length}`);
  console.log(`Questions with separate passage_text: ${hasSeparatePassage}/${examples.length}`);
  console.log('='.repeat(80));

  // Show one example in detail
  console.log('\nDETAILED EXAMPLE:');
  console.log('ID:', examples[0].id);
  console.log('Lesson ID:', examples[0].lesson_id);
  console.log('\nProblem Text:');
  console.log(examples[0].problem_text);
  console.log('\nChoices:');
  console.log(JSON.stringify(examples[0].choices, null, 2));
  console.log('\nCorrect Answer:', examples[0].correct_answer);

  // Check database schema
  console.log('\n' + '='.repeat(80));
  console.log('DATABASE FIELDS:');
  console.log(Object.keys(examples[0]).join(', '));
})();
