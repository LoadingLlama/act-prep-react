const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

// Ultra-simple explanations matching the user's format
const simpleExplanations = {
  'FANBOYS: Basic Usage': {
    'A': 'This choice correctly uses a comma before FANBOYS conjunction "but."',
    'B': 'This choice lacks the required comma before "but."',
    'C': 'This choice incorrectly uses a semicolon instead of comma.',
    'D': 'This choice lacks punctuation creating incorrect structure.'
  }
};

async function testServiceKeyUpdate() {
  try {
    console.log('Testing update with service role key...\n');

    const { data: question } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac')
      .eq('title', 'FANBOYS: Basic Usage')
      .single();

    console.log('BEFORE - Choice A:');
    console.log(question.choices[0].explanation.substring(0, 80) + '...');

    const updatedChoices = question.choices.map(c => ({
      ...c,
      explanation: simpleExplanations['FANBOYS: Basic Usage'][c.letter]
    }));

    const { error } = await supabase
      .from('lesson_examples')
      .update({ choices: updatedChoices })
      .eq('id', question.id);

    if (error) {
      console.error('Update error:', error);
      return;
    }

    // Verify
    const { data: updated } = await supabase
      .from('lesson_examples')
      .select('choices')
      .eq('id', question.id)
      .single();

    console.log('\\nAFTER - Choice A:');
    console.log(updated.choices[0].explanation);

    if (updated.choices[0].explanation === simpleExplanations['FANBOYS: Basic Usage']['A']) {
      console.log('\\n✓ SUCCESS! Service role key can update the database.');
    } else {
      console.log('\\n✗ FAILED: Update did not persist.');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

testServiceKeyUpdate();
