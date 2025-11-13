const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getAllQuestions() {
  try {
    const { data, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .order('lesson_id', { ascending: true })
      .order('position', { ascending: true });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log(`Found ${data.length} practice questions\n`);
    console.log('='
.repeat(80));

    data.forEach((q, index) => {
      console.log(`\n[${index + 1}] ID: ${q.id}`);
      console.log(`Title: ${q.title}`);
      console.log(`Problem: ${q.problem_text?.substring(0, 200)}...`);
      console.log(`\nChoices:`);
      q.choices?.forEach((c) => {
        const marker = c.letter === q.correct_answer ? '✓' : ' ';
        console.log(`  [${marker}] ${c.letter}: ${c.text}`);
      });
      console.log(`\nCorrect Answer: ${q.correct_answer}`);
      console.log('='.repeat(80));
    });

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

getAllQuestions();
