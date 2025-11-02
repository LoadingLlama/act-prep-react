import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateTest2EnglishPassage1() {
  console.log('🔧 UPDATING TEST 2 ENGLISH PASSAGE 1 - A Mouthful of Music\n');

  const passageText = `PASSAGE I

A Mouthful of Music

Mouth music is the name given in English to the many ways <u id="q1">by</u> imitating the sounds of musical instruments with the human voice. Forms of mouth music are performed around the world, but the genre <u id="q2">being</u> particularly popular in England, Ireland, and Scotland. In this Celtic region, lilting and jigging are two of the lively names used to refer to this musical form.

Celtic mouth music exists to accompany dancing, so the rhythms and sounds are <u id="q3">first-class and the words take a back seat</u>. Instead of using traditional lyrics, singers often produce nonsense <u id="q4">syllables called vocables</u> to represent specific instrumental sounds, such as those of bagpipes or violins. The results are songs that rarely make literal sense but nevertheless flow in a way <u id="q5">easier to dance to</u>.

One Scottish form of mouth music, puirt-a-beul, is performed entirely in the Gaelic language and accompanies traditional dance steps. <u id="q6">The often tongue-twisting lyrics</u> require much practice to perfect. The greater challenge for many puirt-a-beul singers, <u id="q7">though</u>, is learning when to breathe. A poorly timed breath might break a song's flow, interrupting the steady beat it relies on to help <u id="q8">time their steps</u>.

[Q9] Instruments were prohibitively expensive and thus scarce in isolated Scottish villages <u id="q10">in order to fill</u> the void, mouth music emerged and provided residents with the music they wanted for dancing. Additionally, puirt-a-beul gave anyone <u id="q11">whomever</u> didn't read music a way to learn and pass on traditional songs.

The continuing popularity of Celtic mouth music is testament to the vitality of <u id="q12">them</u>. In the 1990s, groups like Mouth Music from Scotland and The Cranberries from Ireland rose to fame, <u id="q13">exposing with audiences Celtic mouth music worldwide</u>. The bands' celebrity continually survives as they <u id="q14">combine traditional mouth music with modern rhythms</u>.`;

  const { data, error } = await supabase
    .from('practice_test_english_passages')
    .update({
      passage_text: passageText,
      passage_title: 'A Mouthful of Music'
    })
    .eq('test_number', 2)
    .eq('passage_number', 1)
    .select();

  if (error) {
    console.error('❌ Error updating passage:', error);
    return;
  }

  console.log('✅ Successfully updated Test 2 English Passage 1!');
  console.log('\n📊 Updated passage details:');
  console.log('- ID:', data[0].id);
  console.log('- Title:', data[0].passage_title);
  console.log('- Text length:', data[0].passage_text.length, 'characters');
  console.log('- Underlined sections:', (data[0].passage_text.match(/<u id="q/g) || []).length);
  console.log('\n📄 Passage preview (first 300 characters):');
  console.log(data[0].passage_text.substring(0, 300));

  console.log('\n✅ Test 2 English Passage 1 has been updated with complete content!');
}

updateTest2EnglishPassage1().catch(console.error);
