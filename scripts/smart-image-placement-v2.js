const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Smart image placement - put images AFTER the sentence that references them
 */
async function smartImagePlacementV2() {
  console.log('🔧 Smart image placement v2...\n');

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

    // Find all Figure/Table references with their positions
    // Pattern: Find "Figure X" or "Table X" with various italic wrappings
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

    // Build new text by inserting placeholders AFTER the relevant sentence
    let imageCounter = 1;
    const insertions = []; // Array of {index, placeholder}

    for (const m of matches) {
      if (imageCounter > availableImages.length) {
        break;
      }

      // Find the end of the sentence after this Figure/Table reference
      // Look for: period, closing parenthesis followed by space/newline, or double newline
      let insertPosition = m.endIndex;
      const afterText = text.substring(m.endIndex);

      // Find the next sentence boundary
      // Look for: .) or . followed by space/newline/paragraph
      const boundaryPatterns = [
        /\.\s*\n\n/,  // Period followed by paragraph break
        /\.\s+[A-Z]/,  // Period followed by capital letter (new sentence)
        /\.\s*$/,      // Period at end of text
        /\)\s*\n/,     // Closing paren followed by newline
        /\.\s*\(/      // Period followed by opening paren
      ];

      let bestMatch = null;
      let bestMatchIndex = Infinity;

      for (const pattern of boundaryPatterns) {
        const boundaryMatch = afterText.match(pattern);
        if (boundaryMatch && boundaryMatch.index < bestMatchIndex) {
          bestMatch = boundaryMatch;
          bestMatchIndex = boundaryMatch.index;
        }
      }

      if (bestMatch) {
        // Insert after the period
        insertPosition = m.endIndex + bestMatchIndex + 1;
      } else {
        // Fallback: insert after a reasonable distance (200 chars or next paragraph)
        const fallbackPattern = /\n\n/;
        const fallbackMatch = afterText.match(fallbackPattern);
        if (fallbackMatch) {
          insertPosition = m.endIndex + fallbackMatch.index;
        } else {
          insertPosition = Math.min(m.endIndex + 200, text.length);
        }
      }

      insertions.push({
        index: insertPosition,
        placeholder: `\n\n{{image${imageCounter}}}\n\n`,
        refText: m.text
      });

      console.log(`  {{image${imageCounter}}} after "${m.text}" (${insertPosition - m.endIndex} chars after reference)`);
      imageCounter++;
    }

    // Sort insertions by index in descending order to maintain positions
    insertions.sort((a, b) => b.index - a.index);

    // Apply insertions from end to beginning
    let newText = text;
    for (const insertion of insertions) {
      newText = newText.substring(0, insertion.index) + insertion.placeholder + newText.substring(insertion.index);
    }

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

smartImagePlacementV2();
