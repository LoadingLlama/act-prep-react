const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixBadJson() {
  try {
    console.log('🔧 Fixing malformed JSON in question 673...\n');

    const correctChoices = [
      "A. (x-2)^2/1 - 3(y-2)^2/4=1",
      "B. (x-2)^2/1- 3(y-2)^2/3 = 1",
      "C. (x+2)^2/1 - 3(y+2)^2/4 = 1",
      "D. (x-2)^2/1 = 3(y-2)^2/4 = 1",
      "E. (x+2)^2/1 + 4(y+2)^2/3 = 1"
    ];

    const { error } = await supabase
      .from('practice_test_math_questions')
      .update({ choices: JSON.stringify(correctChoices) })
      .eq('id', 673);

    if (error) {
      console.error('❌ Error updating question:', error);
      return;
    }

    console.log('✅ Successfully fixed question 673!');
    console.log('Fixed choices:', JSON.stringify(correctChoices, null, 2));

  } catch (err) {
    console.error('Error:', err);
  }
}

fixBadJson();
