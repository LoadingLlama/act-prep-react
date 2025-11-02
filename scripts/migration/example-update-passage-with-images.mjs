#!/usr/bin/env node

/**
 * Example: Update a science passage with multiple table/figure images
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function exampleUpdate() {
  console.log('📝 Example: Updating Science Passage with Multiple Images\n');

  // STEP 1: Upload your images to Supabase Storage
  console.log('STEP 1: Upload images to Supabase Storage (test-images bucket)');
  console.log('  - test1-science-p1-table1.png');
  console.log('  - test1-science-p1-table2.png');
  console.log('  - test1-science-p1-figure1.png\n');

  // STEP 2: Update passage with image URLs and placeholders
  console.log('STEP 2: Update passage in database\n');

  const testNumber = 1;
  const passageNumber = 1;

  // The passage text with {{image1}}, {{image2}} placeholders
  const passageText = `
The molar volume of a gas is the volume occupied by 1 mole (mol; 6 × 10²³ atoms or molecules) of that gas at a given pressure and temperature.

<i>Table 1</i> shows how the molar volume, in L, of each of 6 gases—helium (He), neon (Ne), argon (Ar), hydrogen (H₂), nitrogen (N₂), and oxygen (O₂)—varies with pressure, in atmospheres (atm), at a temperature of 273 kelvins (K).

<img src="{{image1}}" alt="Table 1: Molar volume at various pressures" class="passage-table" />

<i>Table 2</i> shows how the molar volume of each of the 6 gases varies with temperature at a pressure of 1.00 atm.

<img src="{{image2}}" alt="Table 2: Molar volume at various temperatures" class="passage-table" />
  `.trim();

  // Update with image URLs in separate columns
  const { data, error } = await supabase
    .from('practice_test_science_passages')
    .update({
      passage_text: passageText,
      image_url_1: 'https://rabavobdklnwvwsldbix.supabase.co/storage/v1/object/public/test-images/test1-science-p1-table1.png',
      image_url_2: 'https://rabavobdklnwvwsldbix.supabase.co/storage/v1/object/public/test-images/test1-science-p1-table2.png'
      // Add image_url_3, image_url_4, image_url_5 as needed
    })
    .eq('test_number', testNumber)
    .eq('passage_number', passageNumber);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('✅ Successfully updated passage!');
  console.log(`\n📋 Updated Test ${testNumber}, Passage ${passageNumber}`);
  console.log('   - Added 2 table images');
  console.log('   - Images will render at {{image1}} and {{image2}} positions');
  console.log('\n🎉 Refresh the practice test to see the images!\n');
}

console.log('━'.repeat(60));
console.log('HOW TO ADD IMAGES TO SCIENCE PASSAGES');
console.log('━'.repeat(60));
console.log('\n1. Run the SQL migration to add image_url columns');
console.log('2. Upload table/figure images to Supabase Storage');
console.log('3. Update passage_text with {{image1}}, {{image2}} placeholders');
console.log('4. Set image_url_1, image_url_2, etc. with actual URLs');
console.log('5. Images automatically render at placeholder positions!\n');
console.log('━'.repeat(60));
console.log('\n❓ Run example update? (Uncomment line below)');
console.log('// exampleUpdate().then(() => process.exit(0));\n');

// Uncomment to run:
// exampleUpdate().then(() => process.exit(0));
