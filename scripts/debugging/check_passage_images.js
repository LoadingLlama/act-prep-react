/**
 * Check Passage Image URLs
 * Specifically check if passage images are set up correctly
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPassageImages() {
  console.log('🔍 CHECKING PASSAGE IMAGE URLs\n');
  console.log('='.repeat(80));

  const sections = ['english', 'reading', 'science'];
  const testNumbers = [2, 3, 4, 5, 6, 7];

  let totalPassages = 0;
  let passagesWithImages = 0;
  let totalImageUrls = 0;

  for (const testNum of testNumbers) {
    console.log(`\n📋 TEST ${testNum} (displayed as Test ${testNum - 1})`);
    console.log('-'.repeat(80));

    for (const section of sections) {
      const passageTable = `practice_test_${section}_passages`;

      const { data: passages, error } = await supabase
        .from(passageTable)
        .select('*')
        .eq('test_number', testNum)
        .order('passage_number', { ascending: true });

      if (error) {
        console.log(`  ❌ ${section.toUpperCase()}: ERROR - ${error.message}`);
        continue;
      }

      if (!passages || passages.length === 0) {
        console.log(`  ${section.toUpperCase()}: No passages`);
        continue;
      }

      totalPassages += passages.length;
      let sectionImagesCount = 0;
      let passagesWithImagesInSection = 0;

      console.log(`  ${section.toUpperCase()}: ${passages.length} passages`);

      passages.forEach(p => {
        let imageUrls = [];
        for (let i = 1; i <= 5; i++) {
          const urlKey = `image_url_${i}`;
          if (p[urlKey]) {
            imageUrls.push(`image${i}: ${p[urlKey].substring(0, 60)}...`);
            sectionImagesCount++;
            totalImageUrls++;
          }
        }

        if (imageUrls.length > 0) {
          console.log(`    Passage ${p.passage_number}: ${imageUrls.length} images`);
          imageUrls.forEach(url => console.log(`      ${url}`));
          passagesWithImagesInSection++;
          passagesWithImages++;
        }
      });

      if (sectionImagesCount > 0) {
        console.log(`    Total: ${passagesWithImagesInSection} passages with ${sectionImagesCount} images`);
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY');
  console.log(`  Total passages checked: ${totalPassages}`);
  console.log(`  Passages with images: ${passagesWithImages}`);
  console.log(`  Total image URLs: ${totalImageUrls}`);
  console.log('='.repeat(80));

  // Now check if passages have placeholders in their text
  console.log('\n🔍 CHECKING FOR IMAGE PLACEHOLDERS IN PASSAGE TEXT\n');
  console.log('='.repeat(80));

  for (const testNum of [2, 3, 4, 5, 6, 7]) {
    for (const section of sections) {
      const passageTable = `practice_test_${section}_passages`;

      const { data: passages, error } = await supabase
        .from(passageTable)
        .select('passage_number, passage_text, image_url_1, image_url_2, image_url_3, image_url_4, image_url_5')
        .eq('test_number', testNum);

      if (error || !passages) continue;

      passages.forEach(p => {
        const text = p.passage_text || '';

        // Check for image placeholders like {{image1}}, {{image2}}, etc.
        const placeholders = text.match(/\{\{image\d+\}\}/g) || [];

        if (placeholders.length > 0) {
          console.log(`Test ${testNum} ${section.toUpperCase()} Passage ${p.passage_number}:`);
          console.log(`  Found ${placeholders.length} placeholders: ${placeholders.join(', ')}`);

          // Check if URLs exist for these placeholders
          placeholders.forEach(ph => {
            const num = ph.match(/\d+/)[0];
            const urlKey = `image_url_${num}`;
            if (!p[urlKey]) {
              console.log(`  ❌ MISSING URL for ${ph}`);
            } else {
              console.log(`  ✓ URL exists for ${ph}`);
            }
          });
        }
      });
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('CHECK COMPLETE\n');
}

checkPassageImages().catch(console.error);
