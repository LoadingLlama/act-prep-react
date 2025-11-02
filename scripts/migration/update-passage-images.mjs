#!/usr/bin/env node

/**
 * Example script to update science passage with image URLs
 *
 * WORKFLOW:
 * 1. Upload images to Supabase Storage (test-images bucket)
 * 2. Update passage_text with {{placeholder}} tags
 * 3. Update image_urls JSONB column with placeholder -> URL mapping
 * 4. Images will automatically render at the correct positions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updatePassageExample() {
  console.log('📝 Example: Updating Science Passage 1 with images\n');

  // Example: Test 1, Science Passage 1 - Molar Volume of Gases
  const testNumber = 1;
  const passageNumber = 1;

  // Step 1: Define the image URLs (after uploading to Supabase Storage)
  const imageUrls = {
    table1: 'https://rabavobdklnwvwsldbix.supabase.co/storage/v1/object/public/test-images/test1-science-p1-table1.png',
    table2: 'https://rabavobdklnwvwsldbix.supabase.co/storage/v1/object/public/test-images/test1-science-p1-table2.png'
  };

  // Step 2: Update passage_text with placeholders
  const passageText = `
The molar volume of a gas is the volume occupied by 1 mole (mol; 6 × 10²³ atoms or molecules) of that gas at a given pressure and temperature.

<i>Table 1</i> shows how the molar volume, in L, of each of 6 gases—helium (He), neon (Ne), argon (Ar), hydrogen (H₂), nitrogen (N₂), and oxygen (O₂)—varies with pressure, in atmospheres (atm), at a temperature of 273 kelvins (K).

<img src="{{table1}}" alt="Table 1: Molar volume at various pressures" class="passage-table" />

<i>Table 2</i> shows how the molar volume of each of the 6 gases varies with temperature at a pressure of 1.00 atm.

<img src="{{table2}}" alt="Table 2: Molar volume at various temperatures" class="passage-table" />
  `.trim();

  // Step 3: Update the database
  const { data, error } = await supabase
    .from('practice_test_science_passages')
    .update({
      passage_text: passageText,
      image_urls: imageUrls
    })
    .eq('test_number', testNumber)
    .eq('passage_number', passageNumber);

  if (error) {
    console.error('❌ Error updating passage:', error.message);
    return;
  }

  console.log('✅ Successfully updated passage!');
  console.log('\n📋 Summary:');
  console.log(`- Test ${testNumber}, Passage ${passageNumber}`);
  console.log(`- Added ${Object.keys(imageUrls).length} image URLs`);
  console.log(`- Updated passage_text with {{placeholders}}`);
  console.log('\n🎉 Images will now render at the correct positions in the passage!');
}

// Example function showing the workflow
async function workflowExample() {
  console.log('📚 WORKFLOW FOR ADDING IMAGES TO PASSAGES\n');
  console.log('━'.repeat(60));

  console.log('\n1️⃣  UPLOAD IMAGES TO SUPABASE STORAGE');
  console.log('   - Go to Supabase Dashboard → Storage → test-images');
  console.log('   - Upload your table/figure screenshots');
  console.log('   - Name them: test1-science-p1-table1.png, etc.');
  console.log('   - Copy the public URLs');

  console.log('\n2️⃣  UPDATE PASSAGE_TEXT WITH PLACEHOLDERS');
  console.log('   - Add {{table1}}, {{table2}}, {{figure1}} where images should appear');
  console.log('   - Example:');
  console.log('     <img src="{{table1}}" alt="Table 1" class="passage-table" />');

  console.log('\n3️⃣  CREATE IMAGE_URLS MAPPING');
  console.log('   - Create a JSONB object mapping placeholders to URLs:');
  console.log('     {');
  console.log('       "table1": "https://...../test1-science-p1-table1.png",');
  console.log('       "table2": "https://...../test1-science-p1-table2.png"');
  console.log('     }');

  console.log('\n4️⃣  UPDATE THE DATABASE');
  console.log('   - Run this script or use the pattern above');
  console.log('   - Update both passage_text and image_urls columns');

  console.log('\n5️⃣  TEST IN PRACTICE TEST');
  console.log('   - Images will automatically render at placeholder positions!');

  console.log('\n━'.repeat(60));
  console.log('\n💡 TIP: You can have as many images as needed per passage');
  console.log('   Just add more placeholder keys to image_urls object\n');
}

// Run the workflow example
workflowExample().then(() => {
  console.log('\n❓ Want to run the example update? (Uncomment the line below)');
  console.log('// updatePassageExample().then(() => process.exit(0));');
  process.exit(0);
});
