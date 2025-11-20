const fetch = require('node-fetch');
const fs = require('fs');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

async function fetchQuestions() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/practice_test_english_questions?test_number=eq.1&select=*&order=question_number`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const data = await response.json();
  fs.writeFileSync('original-questions.json', JSON.stringify(data, null, 2));
  console.log(`Fetched ${data.length} questions`);
}

fetchQuestions();
