const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addImagePlaceholders() {
  try {
    console.log('🔧 Adding image placeholders to science passages...\n');

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
      let updatedText = passage.passage_text;
      let changed = false;

      // Replace references to figures/tables with placeholders
      // Replace "Figure 1" with "Figure 1\n\n{{image1}}\n\n"
      const replacements = [
        { pattern: /(<i><i>Figure 1<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image1}}\n\n' },
        { pattern: /(<i><i>Figure 2<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image2}}\n\n' },
        { pattern: /(<i><i>Figure 3<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image3}}\n\n' },
        { pattern: /(<i><i>Figure 4<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image4}}\n\n' },
        { pattern: /(<i><i>Figure 5<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image5}}\n\n' },
        { pattern: /(<i><i>Table 1<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image1}}\n\n' },
        { pattern: /(<i><i>Table 2<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image2}}\n\n' },
        { pattern: /(<i><i>Table 3<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image3}}\n\n' },
        { pattern: /(<i><i>Table 4<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image4}}\n\n' },
        { pattern: /(<i><i>Table 5<\/i><\/i>\.?)/gi, placeholder: '$1\n\n{{image5}}\n\n' }
      ];

      for (const { pattern, placeholder } of replacements) {
        const before = updatedText;
        updatedText = updatedText.replace(pattern, placeholder);
        if (before !== updatedText) {
          changed = true;
        }
      }

      if (changed) {
        // Update the passage
        const { error: updateError } = await supabase
          .from('practice_test_science_passages')
          .update({ passage_text: updatedText })
          .eq('id', passage.id);

        if (updateError) {
          console.error(`❌ Error updating passage ${passage.passage_number}:`, updateError);
        } else {
          console.log(`✅ Updated passage ${passage.passage_number}`);
        }
      } else {
        console.log(`⏭️  Skipped passage ${passage.passage_number} (no changes needed)`);
      }
    }

    console.log('\n✅ Done!');

  } catch (err) {
    console.error('Error:', err);
  }
}

addImagePlaceholders();
