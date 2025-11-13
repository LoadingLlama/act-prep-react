const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

async function testUpdate() {
  try {
    // Get FANBOYS question
    const { data: question, error: fetchError } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac')
      .eq('title', 'FANBOYS: Basic Usage')
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return;
    }

    console.log('Before update - Choice A explanation:');
    console.log(question.choices[0].explanation);
    console.log('\\nLength:', question.choices[0].explanation.length);

    // Update with simple explanation
    const updatedChoices = [
      { ...question.choices[0], explanation: 'This choice correctly uses a comma before FANBOYS conjunction "but."' },
      { ...question.choices[1], explanation: 'This choice lacks the required comma before "but."' },
      { ...question.choices[2], explanation: 'This choice incorrectly uses a semicolon instead of comma.' },
      { ...question.choices[3], explanation: 'This choice lacks punctuation creating incorrect structure.' }
    ];

    console.log('\\n\\nUpdating with simple explanations...');

    const { data: updated, error: updateError } = await supabase
      .from('lesson_examples')
      .update({ choices: updatedChoices })
      .eq('id', question.id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      return;
    }

    console.log('\\nAfter update - Choice A explanation:');
    console.log(updated.choices[0].explanation);
    console.log('\\nLength:', updated.choices[0].explanation.length);
    console.log('\\n✓ Update successful!');

  } catch (err) {
    console.error('Error:', err);
  }
}

testUpdate();
