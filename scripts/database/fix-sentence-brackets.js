const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Replace [Sentence 1] with [1], [Sentence 2] with [2], etc.
 */
function fixSentenceBrackets(text) {
  if (!text) return text;

  // Replace [Sentence 1] -> [1], [Sentence 2] -> [2], etc.
  return text.replace(/\[Sentence (\d+)\]/g, '[$1]');
}

(async () => {
  console.log('Finding questions with [Sentence N] format...\n');

  // Get all questions with [Sentence format
  const { data: allQuestions, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .ilike('problem_text', '%[Sentence %');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${allQuestions.length} questions to fix\n`);

  let fixed = 0;
  for (const q of allQuestions) {
    const originalText = q.problem_text;
    const fixedText = fixSentenceBrackets(originalText);

    if (originalText !== fixedText) {
      console.log(`Fixing question ${q.position}:`);
      console.log(`BEFORE: ${originalText.substring(0, 100)}...`);
      console.log(`AFTER:  ${fixedText.substring(0, 100)}...`);
      console.log('');

      // Update in database
      const { error: updateError } = await supabase
        .from('lesson_examples')
        .update({ problem_text: fixedText })
        .eq('id', q.id);

      if (updateError) {
        console.error(`Error updating question ${q.id}:`, updateError);
      } else {
        fixed++;
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`COMPLETE! Fixed ${fixed} questions`);
  console.log('[Sentence 1] -> [1], [Sentence 2] -> [2], etc.');
  console.log('='.repeat(80));
})();
