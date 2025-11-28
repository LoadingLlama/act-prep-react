/**
 * Check if passage titles are duplicated in passage text
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTitles() {
  console.log('🔍 CHECKING PASSAGE TITLE DUPLICATION\n');

  const sections = ['english', 'reading', 'science'];

  for (const section of sections) {
    const { data, error } = await supabase
      .from(`practice_test_${section}_passages`)
      .select('passage_number, passage_title, passage_text')
      .eq('test_number', 2)
      .order('passage_number', { ascending: true });

    if (error || !data) continue;

    console.log(`\n${section.toUpperCase()} SECTION:`);
    console.log('-'.repeat(70));

    data.forEach(passage => {
      const title = passage.passage_title || '';
      const text = passage.passage_text || '';
      const firstLine = text.split('\n')[0].trim();

      const titleInText = text.includes(title);
      const titleIsFirstLine = firstLine === title || firstLine.startsWith(title);

      console.log(`\nPassage ${passage.passage_number}:`);
      console.log(`  Title: "${title}"`);
      console.log(`  First line: "${firstLine.substring(0, 60)}..."`);
      console.log(`  Title in text: ${titleInText ? 'YES ⚠️' : 'No'}`);
      console.log(`  Title is first line: ${titleIsFirstLine ? 'YES ⚠️ (DUPLICATE!)' : 'No'}`);
    });
  }
}

checkTitles().catch(console.error);
