const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Fix spacing after Table/Figure references
 */
async function fixSpacing() {
  console.log('🔧 Fixing spacing after Table/Figure references...\n');

  const { data: passages, error } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  for (const passage of passages) {
    console.log(`\n=== Passage ${passage.passage_number}: ${passage.passage_title} ===`);

    let text = passage.passage_text;
    let changed = false;

    // Add space after </i></i> if followed by a letter
    const before = text;
    text = text.replace(/<\/i><\/i>([a-z])/gi, '</i></i> $1');

    // Add space after </i> if followed by a letter (single italic)
    text = text.replace(/<\/i>([a-z])/gi, '</i> $1');

    if (text !== before) {
      changed = true;
      console.log('  Added spacing after italic tags');
    }

    if (changed) {
      const { error: updateError } = await supabase
        .from('practice_test_science_passages')
        .update({ passage_text: text })
        .eq('id', passage.id);

      if (updateError) {
        console.error(`  ❌ Error:`, updateError);
      } else {
        console.log(`  ✅ Updated`);
      }
    } else {
      console.log('  No changes needed');
    }
  }

  console.log('\n✅ Done!');
}

fixSpacing();
