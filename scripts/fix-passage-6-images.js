const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixPassage6Images() {
  console.log('🔧 Fixing Passage 6 image placeholders...\n');

  const { data: passage } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .eq('passage_number', 6)
    .single();

  let text = passage.passage_text;

  // Remove existing placeholders
  text = text.replace(/\{\{image\d+\}\}\s*/g, '');

  // Place image1 after Figure 1 description
  text = text.replace(
    /(<i>Figure 1<\/i> illustrates a harmonic and also the apparatus that a student used to perform 2 experiments on standing waves\.)/,
    '$1\n\n{{image1}}\n\n'
  );

  // Place image2 after Experiment 1 description (after "String Z (μ = 0.16 g/cm).")
  text = text.replace(
    /(She repeated this procedure for String Y \(μ = 0\.08 g\/cm\) and for String Z \(μ = 0\.16 g\/cm\)\.)/,
    '$1\n\n{{image2}}\n\n'
  );

  // Place image3 after Table 2 reference
  text = text.replace(
    /(See Table 2\.)/,
    '$1\n\n{{image3}}\n\n'
  );

  // Clean up excessive newlines
  text = text.replace(/\n{4,}/g, '\n\n');

  console.log('Updated text with placeholders:');
  console.log('- {{image1}} after Figure 1 description');
  console.log('- {{image2}} after Experiment 1 description');
  console.log('- {{image3}} after Table 2 reference');

  const { error } = await supabase
    .from('practice_test_science_passages')
    .update({ passage_text: text })
    .eq('id', passage.id);

  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('\n✅ Updated Passage 6');
  }
}

fixPassage6Images();
