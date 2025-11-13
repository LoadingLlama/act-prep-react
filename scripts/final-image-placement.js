const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Final correct image placeholder placement
 */
async function finalImagePlacement() {
  console.log('🔧 Final image placeholder placement...\n');

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

    // Find all Figure and Table references with their positions
    const figureTablePattern = /((?:<i><i>|<i>|\()?(?:Figure|Table)\s+\d+(?:<\/i><\/i>|<\/i>|\))?)/gi;

    const matches = [];
    let match;
    while ((match = figureTablePattern.exec(text)) !== null) {
      matches.push({
        text: match[0],
        index: match.index,
        endIndex: match.index + match[0].length
      });
    }

    console.log(`  Found ${matches.length} Figure/Table references`);

    if (matches.length === 0) {
      continue;
    }

    // Build new text by inserting placeholders in FORWARD order
    let newText = '';
    let lastIndex = 0;
    let imageCounter = 1;

    for (const m of matches) {
      // Add text before this match
      newText += text.substring(lastIndex, m.endIndex);

      // Add placeholder if we have images left
      if (imageCounter <= availableImages.length) {
        newText += `\n\n{{image${imageCounter}}}\n\n`;
        console.log(`  Placing {{image${imageCounter}}} after "${m.text}"`);
        imageCounter++;
      }

      lastIndex = m.endIndex;
    }

    // Add remaining text
    newText += text.substring(lastIndex);

    // Clean up excessive newlines
    newText = newText.replace(/\n{4,}/g, '\n\n');

    // Update passage
    const { error: updateError } = await supabase
      .from('practice_test_science_passages')
      .update({ passage_text: newText })
      .eq('id', passage.id);

    if (updateError) {
      console.error(`  ❌ Error:`, updateError);
    } else {
      console.log(`  ✅ Updated`);
    }
  }

  console.log('\n✅ Done!');
}

finalImagePlacement();
