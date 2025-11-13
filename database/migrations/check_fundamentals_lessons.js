const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkFundamentals() {
  const lessonIds = ['english-intro', 'introduction-to-act-math', 'reading-intro', 'science-introduction'];

  console.log('=== CHECKING FUNDAMENTAL LESSONS ===\n');

  for (const id of lessonIds) {
    const { data, error } = await supabase
      .from('lessons')
      .select('lesson_key, title, content, duration')
      .eq('lesson_key', id)
      .single();

    if (error) {
      console.log(`❌ '${id}' - NOT IN DATABASE`);
    } else {
      console.log(`✅ '${id}' - ${data.title}`);
      console.log(`   Content: ${data.content ? (data.content.length + ' chars') : 'EMPTY'}`);
      console.log(`   Duration: ${data.duration || 'not set'}`);
    }
    console.log('');
  }

  // Also check for a well-formatted golden template lesson
  console.log('\n=== CHECKING FOR GOLDEN TEMPLATE EXAMPLES ===\n');
  const { data: template1 } = await supabase
    .from('lessons')
    .select('lesson_key, title, content')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (template1?.content) {
    console.log('✅ Found template: sentence-structure');
    console.log('   Content length:', template1.content.length, 'chars');
    console.log('\nFirst 1500 chars:');
    console.log(template1.content.substring(0, 1500));
    console.log('\n...\n');
  }

  const { data: template2 } = await supabase
    .from('lessons')
    .select('lesson_key, title, content')
    .eq('lesson_key', 'getting-started')
    .single();

  if (template2?.content) {
    console.log('\n✅ Found template: getting-started');
    console.log('   Content length:', template2.content.length, 'chars');
  }
}

checkFundamentals();
