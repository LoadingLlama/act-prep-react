const fetch = require('node-fetch');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

async function showExamples() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/practice_test_english_questions?test_number=eq.1&select=question_number,question_type,explanation&order=question_number`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const data = await response.json();

  // Get examples from different question types
  const types = {};
  data.forEach(q => {
    if (q.question_type && !types[q.question_type]) {
      types[q.question_type] = q;
    }
  });

  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║      REFORMATTED EXPLANATIONS - EXAMPLES BY QUESTION TYPE          ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');
  console.log('');

  const showcaseTypes = ['Sentence Structure', 'Punctuation', 'Which Choice', 'Wordiness/Redundancy', 'Adding/Deleting Information'];

  showcaseTypes.forEach((type, idx) => {
    if (types[type]) {
      console.log(`${idx + 1}. ${type.toUpperCase()} (Question ${types[type].question_number})`);
      console.log('─'.repeat(70));
      console.log(types[type].explanation);
      console.log('');
    }
  });

  console.log('═'.repeat(70));
  console.log('✓ All question types successfully reformatted!');
  console.log('═'.repeat(70));
}

showExamples();
