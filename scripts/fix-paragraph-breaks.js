const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Intelligently add paragraph breaks to passages that only have single line breaks
 */
async function fixParagraphBreaks() {
  console.log('🔧 Fixing paragraph breaks in passages 4, 5, and 6...\n');

  // Get passages that need fixing
  const { data: passages, error } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .in('passage_number', [4, 5, 6]);

  if (error) {
    console.error('Error fetching passages:', error);
    return;
  }

  for (const passage of passages) {
    console.log(`\n=== Fixing Passage ${passage.passage_number}: ${passage.passage_title} ===`);

    let text = passage.passage_text;

    // Add paragraph breaks before common section markers
    // 1. Before italicized headers like <i>Student 1</i>, <i>Experiment</i>
    text = text.replace(/\n(<i>(?:Student|Experiment|Study|Procedure)[^<]*<\/i>)/g, '\n\n$1');

    // 2. Before double-italicized headers like <i><i>Experiment 1</i></i>
    text = text.replace(/\n(<i><i>[^<]+<\/i><\/i>)/g, '\n\n$1');

    // 3. Before numbered list items (1., 2., 3., etc.) at start of line
    text = text.replace(/\n(\d+\.\s)/g, '\n\n$1');

    // 4. Before "Steps" text that starts a list
    text = text.replace(/\n(Steps\s+\d)/g, '\n\n$1');

    // 5. After figure/table references followed by new content
    text = text.replace(/(<\/i>)\n([A-Z])/g, '$1\n\n$2');

    // 6. After chemical equations or formulas followed by new content
    text = text.replace(/(→[^\n]+)\n([A-Z])/g, '$1\n\n$2');

    // Count how many breaks we added
    const oldBreaks = (passage.passage_text.match(/\n\n/g) || []).length;
    const newBreaks = (text.match(/\n\n/g) || []).length;
    const added = newBreaks - oldBreaks;

    console.log(`Added ${added} paragraph breaks (${oldBreaks} → ${newBreaks})`);

    // Update the passage
    const { error: updateError } = await supabase
      .from('practice_test_science_passages')
      .update({ passage_text: text })
      .eq('id', passage.id);

    if (updateError) {
      console.error(`❌ Error updating passage ${passage.passage_number}:`, updateError);
    } else {
      console.log(`✅ Successfully updated passage ${passage.passage_number}`);
    }
  }

  console.log('\n✅ Done!');
}

fixParagraphBreaks();
