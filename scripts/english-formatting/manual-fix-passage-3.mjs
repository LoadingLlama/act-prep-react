import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 MANUALLY FIXING PASSAGE 3 UNDERLINED PORTIONS\n');
console.log('='.repeat(80));

// Corrected Passage 3 with proper underlined portions in chronological order
// Note: Q28-30 are from Passage 2 ending, starting with Q31 for Passage 3
const correctedPassage = `Small-town Main Streets across America <u>have struggled</u><sub>1</sub> for decades as massive shopping malls and convenient online retailers <u>drew customers steadily away from traditional downtown districts</u><sub>2</sub>. Empty storefronts and fading facades became visible symbols of economic decline in countless communities. However, a growing movement <u>seeks to reverse</u><sub>3</sub> this troubling trend through creative revitalization strategies that combine economic development with community building.

<u>Rockville, a town of eight thousand residents in rural Iowa, exemplifies this promising transformation.</u><sub>4</sub> Five years ago, downtown Rockville <u>consisted</u><sub>6</sub> primarily of vacant buildings and a few struggling businesses barely hanging on. The town council partnered with <u>a nonprofit organization specializing in downtown revitalization</u><sub>7</sub> to develop solutions. Together, they developed a comprehensive plan<u> :</u><sub>8</sub> attracting new businesses with innovative incentives, improving aging infrastructure, and <u>creating</u><sub>9</sub> community gathering spaces that would draw people downtown. The town offered generous tax incentives to entrepreneurs willing to open shops downtown and commit to staying for several years. They upgraded crumbling sidewalks, installed attractive period lighting, <u>and planted trees</u><sub>10</sub> along previously barren streets. <u>Most significantly</u><sub>11</sub>, they converted an abandoned warehouse into a vibrant community center <u>hosting weekly farmers markets, monthly concerts, and seasonal festivals</u><sub>12</sub> that brought families together.

The results exceeded even optimistic expectations. Within three years, occupancy rates increased dramatically from thirty percent to eighty-five percent. New restaurants, boutiques, and art galleries opened their doors, creating both jobs and renewed energy. Property values rose substantially, generating additional tax revenue for continued improvements.<u></u><sub>13</sub> Residents reported increased pride in their community and greater civic engagement at public meetings.

While challenges certainly remain—including fierce competition from e-commerce and the need for ongoing investment and maintenance—Rockville's experience demonstrates convincingly that thoughtful planning and sustained community commitment can breathe new life into struggling downtown districts across America.<u></u><sub>15</sub>`;

console.log('📝 Corrected Passage 3 with proper underlined portions\n');
console.log('='.repeat(80));
console.log('\nUPDATING DATABASE...\n');

// Update Passage 3
const { error } = await sb
  .from('practice_test_english_passages')
  .update({ passage_text: correctedPassage })
  .eq('test_number', 1)
  .eq('passage_number', 3);

if (error) {
  console.log('❌ Error:', error.message);
} else {
  console.log('✅ Successfully updated Passage 3 with correct underlined portions!');
  console.log('\nUnderlined portions now match answer choices:');
  console.log('  Q31 (sub 1): "have struggled" (verb tense)');
  console.log('  Q32 (sub 2): "drew customers steadily away from traditional downtown districts" (punctuation)');
  console.log('  Q33 (sub 3): "seeks to reverse" (word choice)');
  console.log('  Q34 (sub 4): "Rockville, a town..." (transition sentence)');
  console.log('  Q35 (sub 5): (deleted - part of Q34)');
  console.log('  Q36 (sub 6): "consisted" (verb agreement)');
  console.log('  Q37 (sub 7): "a nonprofit organization specializing..." (punctuation)');
  console.log('  Q38 (sub 8): " :" (punctuation)');
  console.log('  Q39 (sub 9): "creating" (parallelism)');
  console.log('  Q40 (sub 10): "and planted trees" (wordiness)');
  console.log('  Q41 (sub 11): "Most significantly" (transition word)');
  console.log('  Q42 (sub 12): "hosting weekly farmers markets..." (punctuation)');
  console.log('  Q43 (sub 13): (empty - add sentence question)');
  console.log('  Q44 (sub 14): (deleted)');
  console.log('  Q45 (sub 15): (empty - essay goal question)');
}

console.log('\n' + '='.repeat(80));
console.log('\n📊 PROGRESS:');
console.log('  Passage 1: ✅ Complete');
console.log('  Passage 2: ✅ Complete');
console.log('  Passage 3: ✅ Complete');
console.log('  Passage 4: ⏳ Needs manual fixing');
console.log('  Passage 5: ⏳ Needs manual fixing');
console.log('\n' + '='.repeat(80));
