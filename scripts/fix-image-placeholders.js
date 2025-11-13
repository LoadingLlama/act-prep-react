const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixImagePlaceholders() {
  try {
    console.log('🔧 Fixing image placeholders in science passages...\n');

    // Get all science passages
    const { data: passages, error } = await supabase
      .from('practice_test_science_passages')
      .select('*')
      .eq('test_number', 1);

    if (error) {
      console.error('Error fetching passages:', error);
      return;
    }

    console.log(`Found ${passages.length} science passages\n`);

    for (const passage of passages) {
      console.log(`\n=== Passage ${passage.passage_number}: ${passage.passage_title} ===`);

      let updatedText = passage.passage_text;
      let changed = false;

      // First, remove any existing placeholders to avoid duplicates
      updatedText = updatedText.replace(/\{\{image\d+\}\}\s*/g, '');

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

      // Add placeholders after Figure/Table references
      // Handle both single and double italic tags
      const replacements = [
        // Double italic figures
        { pattern: /(<i><i>Figure 1<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image1}}\n\n' },
        { pattern: /(<i><i>Figure 2<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image2}}\n\n' },
        { pattern: /(<i><i>Figure 3<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image3}}\n\n' },
        { pattern: /(<i><i>Figure 4<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image4}}\n\n' },
        { pattern: /(<i><i>Figure 5<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image5}}\n\n' },

        // Single italic figures
        { pattern: /(<i>Figure 1<\/i>\.?)/gi, placeholder: '$1\n\n{{image1}}\n\n' },
        { pattern: /(<i>Figure 2<\/i>\.?)/gi, placeholder: '$1\n\n{{image2}}\n\n' },
        { pattern: /(<i>Figure 3<\/i>\.?)/gi, placeholder: '$1\n\n{{image3}}\n\n' },
        { pattern: /(<i>Figure 4<\/i>\.?)/gi, placeholder: '$1\n\n{{image4}}\n\n' },
        { pattern: /(<i>Figure 5<\/i>\.?)/gi, placeholder: '$1\n\n{{image5}}\n\n' },

        // Double italic tables
        { pattern: /(<i><i>Table 1<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image1}}\n\n' },
        { pattern: /(<i><i>Table 2<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image2}}\n\n' },
        { pattern: /(<i><i>Table 3<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image3}}\n\n' },
        { pattern: /(<i><i>Table 4<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image4}}\n\n' },
        { pattern: /(<i><i>Table 5<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image5}}\n\n' },

        // Single italic tables
        { pattern: /(<i>Table 1<\/i>\.?)/gi, placeholder: '$1\n\n{{image1}}\n\n' },
        { pattern: /(<i>Table 2<\/i>\.?)/gi, placeholder: '$1\n\n{{image2}}\n\n' },
        { pattern: /(<i>Table 3<\/i>\.?)/gi, placeholder: '$1\n\n{{image3}}\n\n' },
        { pattern: /(<i>Table 4<\/i>\.?)/gi, placeholder: '$1\n\n{{image4}}\n\n' },
        { pattern: /(<i>Table 5<\/i>\.?)/gi, placeholder: '$1\n\n{{image5}}\n\n' }
      ];

      const before = updatedText;
      for (const { pattern, placeholder } of replacements) {
        updatedText = updatedText.replace(pattern, placeholder);
      }

      if (before !== updatedText) {
        changed = true;
      }

      // Clean up multiple consecutive newlines (more than 2)
      updatedText = updatedText.replace(/\n{3,}/g, '\n\n');

      if (changed) {
        // Count placeholders added
        const placeholders = (updatedText.match(/\{\{image\d+\}\}/g) || []).length;
        console.log(`  Added ${placeholders} image placeholder(s)`);

        // Update the passage
        const { error: updateError } = await supabase
          .from('practice_test_science_passages')
          .update({ passage_text: updatedText })
          .eq('id', passage.id);

        if (updateError) {
          console.error(`  ❌ Error updating passage ${passage.passage_number}:`, updateError);
        } else {
          console.log(`  ✅ Updated passage ${passage.passage_number}`);
        }
      } else {
        console.log(`  ⏭️  No changes needed`);
      }
    }

    console.log('\n✅ Done!');

  } catch (err) {
    console.error('Error:', err);
  }
}

fixImagePlaceholders();
