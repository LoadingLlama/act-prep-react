const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Intelligently place image placeholders based on Figure/Table references
 */
async function smartImagePlacement() {
  console.log('🔧 Smart image placeholder placement...\n');

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

    // Count available images
    const availableImages = [];
    for (let i = 1; i <= 5; i++) {
      if (passage[`image_url_${i}`]) {
        availableImages.push(i);
      }
    }

    if (availableImages.length === 0) {
      console.log('  No images available, skipping...');
      continue;
    }

    console.log(`  Available images: ${availableImages.join(', ')}`);

    let text = passage.passage_text;

    // Remove ALL existing placeholders first
    text = text.replace(/\n*\{\{image\d+\}\}\n*/g, '');

    // Track which image number to use next
    let imageCounter = 1;

    // Find all Figure and Table references in order, replace with incrementing placeholder
    // Match patterns like: <i>Figure 1</i>, <i><i>Figure 1</i></i>, (Figure 1), etc.

    // Pattern: Find "Figure X" or "Table X" with various italic wrappings
    const figureTablePattern = /((?:<i><i>|<i>|\()?(?:Figure|Table)\s+\d+(?:<\/i><\/i>|<\/i>|\))?)/gi;

    const matches = [];
    let match;
    while ((match = figureTablePattern.exec(text)) !== null) {
      matches.push({
        text: match[0],
        index: match.index
      });
    }

    console.log(`  Found ${matches.length} Figure/Table references`);

    // Replace from end to beginning to preserve indices
    for (let i = matches.length - 1; i >= 0; i--) {
      const m = matches[i];
      if (imageCounter <= availableImages.length) {
        const placeholder = `\n\n{{image${imageCounter}}}\n\n`;
        // Insert placeholder after the reference
        text = text.substring(0, m.index + m.text.length) + placeholder + text.substring(m.index + m.text.length);
        imageCounter++;
      }
    }

    // Clean up excessive newlines
    text = text.replace(/\n{4,}/g, '\n\n');

    // Count final placeholders
    const finalCount = (text.match(/\{\{image\d+\}\}/g) || []).length;
    console.log(`  Placed ${finalCount} image placeholder(s)`);

    // Update passage
    const { error: updateError } = await supabase
      .from('practice_test_science_passages')
      .update({ passage_text: text })
      .eq('id', passage.id);

    if (updateError) {
      console.error(`  ❌ Error:`, updateError);
    } else {
      console.log(`  ✅ Updated`);
    }
  }

  console.log('\n✅ Done!');
}

smartImagePlacement();
