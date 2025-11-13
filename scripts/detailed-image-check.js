const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function detailedImageCheck() {
  const { data: passages } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  passages.forEach(p => {
    console.log('\n\n========================================');
    console.log(`PASSAGE ${p.passage_number}: ${p.passage_title}`);
    console.log('========================================\n');

    // Find all image placeholders
    const placeholderPattern = /\{\{image\d+\}\}/g;
    let match;
    const placeholders = [];

    while ((match = placeholderPattern.exec(p.passage_text)) !== null) {
      placeholders.push({
        placeholder: match[0],
        index: match.index
      });
    }

    if (placeholders.length === 0) {
      console.log('No image placeholders\n');
      return;
    }

    console.log(`Found ${placeholders.length} image placeholder(s):\n`);

    placeholders.forEach(ph => {
      const contextBefore = p.passage_text.substring(Math.max(0, ph.index - 200), ph.index);
      const contextAfter = p.passage_text.substring(ph.index + ph.placeholder.length, Math.min(p.passage_text.length, ph.index + ph.placeholder.length + 200));

      console.log(`--- ${ph.placeholder} ---`);
      console.log('BEFORE:');
      console.log(contextBefore);
      console.log('\n>>> PLACEHOLDER HERE <<<\n');
      console.log('AFTER:');
      console.log(contextAfter);
      console.log('\n');
    });
  });
}

detailedImageCheck();
