const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function fetchSamples() {
  console.log('Fetching sample questions...\n');

  // Fetch 2 questions from each subject
  for (const subject of ['English', 'Math', 'Reading', 'Science']) {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('subject', subject)
      .limit(2);

    if (error) {
      console.error(`Error fetching ${subject}:`, error);
      continue;
    }

    console.log(`\n=== ${subject.toUpperCase()} SAMPLES ===\n`);
    data.forEach((q, idx) => {
      console.log(`Sample ${idx + 1} (ID: ${q.id})`);
      console.log(`Question: ${q.question_text}`);
      console.log(`Choices:`);
      console.log(`  A: ${q.choices.A}`);
      console.log(`  B: ${q.choices.B}`);
      console.log(`  C: ${q.choices.C}`);
      console.log(`  D: ${q.choices.D}`);
      console.log(`Correct: ${q.correct_answer}`);
      if (q.passage) {
        console.log(`Passage: ${q.passage.substring(0, 200)}...`);
      }
      console.log('---\n');
    });
  }
}

fetchSamples().catch(console.error);
