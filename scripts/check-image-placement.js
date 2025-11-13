const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkImagePlacement() {
  const { data: passages } = await supabase
    .from('practice_test_science_passages')
    .select('passage_number, passage_title, passage_text, image_url_1, image_url_2, image_url_3, image_url_4, image_url_5')
    .eq('test_number', 1)
    .order('passage_number');

  passages.forEach(p => {
    console.log('\n\n========================================');
    console.log(`PASSAGE ${p.passage_number}: ${p.passage_title}`);
    console.log('========================================');

    // Check which image URLs exist
    const imageUrls = [];
    for (let i = 1; i <= 5; i++) {
      if (p[`image_url_${i}`]) {
        imageUrls.push(i);
      }
    }
    console.log('\nAvailable images:', imageUrls.length > 0 ? imageUrls.join(', ') : 'None');

    // Show where {{imageX}} placeholders are in the text
    const placeholders = [];
    for (let i = 1; i <= 5; i++) {
      const placeholder = `{{image${i}}}`;
      if (p.passage_text.includes(placeholder)) {
        placeholders.push(i);
      }
    }
    console.log('Placeholders in text:', placeholders.length > 0 ? placeholders.join(', ') : 'None');

    // Show context around each placeholder
    if (placeholders.length > 0) {
      console.log('\n--- Context around placeholders ---');
      placeholders.forEach(num => {
        const placeholder = `{{image${num}}}`;
        const index = p.passage_text.indexOf(placeholder);
        const before = p.passage_text.substring(Math.max(0, index - 150), index);
        const after = p.passage_text.substring(index + placeholder.length, Math.min(p.passage_text.length, index + placeholder.length + 150));

        console.log(`\n{{image${num}}}:`);
        console.log('...', before.trim());
        console.log('>>> {{image' + num + '}} <<<');
        console.log(after.trim(), '...');
      });
    }

    // Check if there are images but no placeholders
    if (imageUrls.length > 0 && placeholders.length === 0) {
      console.log('\n⚠️  WARNING: Has images but no placeholders!');
    }
    if (placeholders.length > imageUrls.length) {
      console.log(`\n⚠️  WARNING: Has ${placeholders.length} placeholders but only ${imageUrls.length} images!`);
    }
  });
}

checkImagePlacement();
