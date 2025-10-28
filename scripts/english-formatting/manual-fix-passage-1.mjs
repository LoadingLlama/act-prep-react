import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 MANUALLY FIXING PASSAGE 1 UNDERLINED PORTIONS\n');
console.log('='.repeat(80));

// Corrected Passage 1 with proper underlined portions in chronological order
// Based on answer choices, underlining the text that each question tests
const correctedPassage = `In recent years, urban farming has transformed from a niche hobby into a significant movement reshaping city landscapes across America. Community gardens now <u>dots</u><sub>1</sub> neighborhoods from Brooklyn to San Francisco<u> ;</u><sub>2</sub> <u>converting</u><sub>3</sub> vacant lots into productive green spaces that benefit entire communities. These gardens serve multiple purposes: they provide fresh produce to food deserts, create gathering places for neighbors to connect, and offer valuable educational opportunities for children <u>who</u><sub>4</sub> might otherwise never see how vegetables actually grow from seed to harvest.

Maya Rodriguez, a dedicated coordinator for the Detroit Urban Farming Initiative, has witnessed this remarkable transformation firsthand over nearly two decades. She recalls when the organization <u>started</u><sub>5</sub> in 2005 with just three modest raised beds in an abandoned lot that nobody wanted. Today, the initiative manages over forty thriving community gardens <u>across the city ,</u><sub>6</sub> employing twenty full-time staff members and mobilizing hundreds of enthusiastic volunteers. The gardens produce thousands of pounds of fresh vegetables <u>annually ,</u><sub>7</sub> distributing them free to residents <u>who need them most .</u><sub>8</sub>

<u>The environmental benefits extend beyond food production.</u><sub>9</sub> Urban gardens <u>absorb</u><sub>10</sub> rainwater <u>that would otherwise</u><sub>11</sub> overwhelm aging storm drains<u>, reduce</u><sub>12</sub> the urban heat island effect that makes cities uncomfortably warm in summer, and provide essential habitat for pollinators like bees and butterflies.<u></u><sub>13</sub> Recent studies have shown that neighborhoods with active community gardens experience measurably lower crime rates and increased property values. <u>Residents</u><sub>14</sub> consistently report feeling more connected to their communities and more invested in neighborhood improvement initiatives.

However, significant challenges remain for urban farmers. Access to suitable land continues to be the primary obstacle, as property owners and city governments often prioritize commercial development over green space. Funding for essential tools, quality seeds, and basic infrastructure requires constant fundraising efforts and grant writing. Volunteer coordination and training demand considerable time and organizational energy. Despite these persistent hurdles, the urban farming movement <u>continues to grow steadily, demonstrating that cities can be places not just of consumption, but of cultivation and community building.</u><sub>15</sub>`;

console.log('📝 Corrected Passage 1 with proper underlined portions:\\n');
console.log(correctedPassage.substring(0, 500) + '...\\n');

console.log('='.repeat(80));
console.log('\\nUPDATING DATABASE...\\n');

// Update Passage 1
const { error } = await sb
  .from('practice_test_english_passages')
  .update({ passage_text: correctedPassage })
  .eq('test_number', 1)
  .eq('passage_number', 1);

if (error) {
  console.log('❌ Error:', error.message);
} else {
  console.log('✅ Successfully updated Passage 1 with correct underlined portions!');
  console.log('\\nUnderlined portions now match answer choices:');
  console.log('  Q1: "dots" (verb agreement)');
  console.log('  Q2: " ;" (punctuation)');
  console.log('  Q3: "converting" (sentence structure)');
  console.log('  Q4: "who" (relative pronoun)');
  console.log('  Q5: "started" (verb tense)');
  console.log('  Q6: "across the city ," (wordiness)');
  console.log('  Q7: "annually ," (word choice)');
  console.log('  Q8: "who need them most ." (punctuation)');
  console.log('  Q9: "The environmental benefits extend beyond food production." (transition)');
  console.log('  Q10: "absorb" (verb agreement)');
  console.log('  Q11: "that would otherwise" (restrictive clause)');
  console.log('  Q12: ", reduce" (parallelism)');
  console.log('  Q13: (empty - question about adding sentence)');
  console.log('  Q14: "Residents" (transition word)');
  console.log('  Q15: (essay goal question - marks end)');
}

console.log('\\n' + '='.repeat(80));
console.log('\\n📊 PROGRESS:');
console.log('  Passage 1: ✅ Complete');
console.log('  Passage 2: ⏳ Needs manual fixing');
console.log('  Passage 3: ⏳ Needs manual fixing');
console.log('  Passage 4: ⏳ Needs manual fixing');
console.log('  Passage 5: ⏳ Needs manual fixing');
console.log('\\n' + '='.repeat(80));
