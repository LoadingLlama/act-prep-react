const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkScienceImages() {
  try {
    console.log('🔍 Checking science questions for image URLs...\n');

    // Get a few science passages
    const { data: passages, error: passagesError } = await supabase
      .from('practice_test_science_passages')
      .select('*')
      .eq('test_number', 1)
      .limit(3);

    if (passagesError) {
      console.error('Error fetching passages:', passagesError);
      return;
    }

    console.log(`Found ${passages.length} science passages\n`);

    passages.forEach((p, idx) => {
      console.log(`\n=== Passage ${p.passage_number} ===`);
      console.log('Columns with image data:');

      Object.keys(p).forEach(key => {
        if (key.toLowerCase().includes('image') || key.toLowerCase().includes('figure')) {
          console.log(`  ${key}:`, p[key]);
        }
      });

      // Show a snippet of the passage
      if (p.passage_text) {
        console.log('\nPassage snippet (first 200 chars):');
        console.log(p.passage_text.substring(0, 200) + '...');
      }
    });

    // Also get a few science questions with passages
    const { data: questions, error } = await supabase
      .from('practice_test_science_questions')
      .select('*')
      .eq('test_number', 1)
      .not('passage_id', 'is', null)
      .limit(3);

    if (error) {
      console.error('Error fetching questions:', error);
      return;
    }

    console.log(`Found ${questions.length} science questions with passages\n`);

    questions.forEach((q, idx) => {
      console.log(`\n=== Question ${q.question_number} ===`);
      console.log('Columns with image data:');

      Object.keys(q).forEach(key => {
        if (key.toLowerCase().includes('image') || key.toLowerCase().includes('figure')) {
          console.log(`  ${key}:`, q[key]);
        }
      });

      // Show a snippet of the passage
      if (q.passage) {
        console.log('\nPassage snippet (first 200 chars):');
        console.log(q.passage.substring(0, 200) + '...');
      }
    });

  } catch (err) {
    console.error('Error:', err);
  }
}

checkScienceImages();
