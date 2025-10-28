import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 MANUALLY FIXING PASSAGE 4 UNDERLINED PORTIONS\n');
console.log('='.repeat(80));

// Corrected Passage 4 with proper underlined portions in chronological order
const correctedPassage = `Botanical illustration occupies a unique and important position between art and science<u>, requiring</u><sub>1</sub> both aesthetic sensibility and rigorous scientific accuracy in equal measure. For centuries, these detailed drawings <u>have served as</u><sub>2</sub> essential tools for botanists worldwide, enabling them to <u>document and classify</u><sub>3</sub> plant species with a level of precision <u>that even modern photography cannot always achieve effectively</u><sub>4</sub>.

The golden age of botanical illustration occurred during the eighteenth and nineteenth centuries, when European explorers ventured to distant lands and <u>brought</u><sub>5</sub> back thousands of fascinating plant specimens from remote regions. Artists worked closely with scientists<u>, learning</u><sub>6</sub> to depict <u>not just</u><sub>7</sub> the obvious beauty of plants but their essential identifying characteristics<u> :</u><sub>8</sub> the precise arrangement of leaves, the intricate structure of flowers, the <u>telling details</u><sub>9</sub> of seeds and fruit. These meticulous illustrations became permanent records, <u>especially important</u><sub>10</sub> when physical specimens themselves degraded or were damaged over time.

<u>Today, despite remarkable advances in photography and digital imaging technology,</u><sub>11</sub> botanical illustration remains surprisingly relevant and valued. Photographs can capture a fleeting moment, but illustrations can show multiple stages of growth simultaneously, reveal cross-sections of stems and roots, and display details too small for standard photography to capture clearly. Moreover, a skilled artist can deliberately <u>emphasize</u><sub>12</sub> diagnostic features that distinguish one species from another, creating images more useful for accurate identification than even the best photographs.

Sarah Chen, <u>a respected contemporary botanical illustrator</u><sub>13</sub>, explains her detailed process. She begins by carefully studying live specimens in person<u>, making careful observations and precise measurements</u><sub>14</sub>. Then she <u>creates</u><sub>15</sub> preliminary sketches, refining proportions and arrangements until they're exactly right. The final illustration, often rendered in traditional watercolor, might require forty hours of meticulous work or more. Each tiny hair on a stem, each vein in a leaf must be accurately depicted.

Museums and botanical gardens continue to commission these illustrations regularly, recognizing their enduring scientific and artistic value. As Chen notes, "A good botanical illustration tells the truth about a plant in ways that transcend mere visual representation."`;

console.log('📝 Corrected Passage 4 with proper underlined portions\n');
console.log('='.repeat(80));
console.log('\nUPDATING DATABASE...\n');

// Update Passage 4
const { error } = await sb
  .from('practice_test_english_passages')
  .update({ passage_text: correctedPassage })
  .eq('test_number', 1)
  .eq('passage_number', 4);

if (error) {
  console.log('❌ Error:', error.message);
} else {
  console.log('✅ Successfully updated Passage 4 with correct underlined portions!');
  console.log('\nUnderlined portions now match answer choices:');
  console.log('  Q46 (sub 1): ", requiring" (sentence structure)');
  console.log('  Q47 (sub 2): "have served as" (verb tense)');
  console.log('  Q48 (sub 3): "document and classify" (deleted in Q48)');
  console.log('  Q48 (sub 4): "that even modern photography..." (restrictive clause)');
  console.log('  Q49 (sub 5): "brought" (verb tense)');
  console.log('  Q50 (sub 6): ", learning" (sentence structure)');
  console.log('  Q51 (sub 7): "not just" (transition)');
  console.log('  Q51 (sub 8): " :" (punctuation)');
  console.log('  Q52 (sub 9): "telling details" (word choice)');
  console.log('  Q53 (sub 10): "especially important" (transition)');
  console.log('  Q53 (sub 11): "Today, despite..." (transition sentence)');
  console.log('  Q55 (sub 12): "emphasize" (word choice)');
  console.log('  Q56 (sub 13): "a respected contemporary..." (wordiness)');
  console.log('  Q57 (sub 14): ", making careful observations..." (sentence structure)');
  console.log('  Q57 (sub 15): "creates" (verb tense)');
}

console.log('\n' + '='.repeat(80));
console.log('\n📊 PROGRESS:');
console.log('  Passage 1: ✅ Complete');
console.log('  Passage 2: ✅ Complete');
console.log('  Passage 3: ✅ Complete');
console.log('  Passage 4: ✅ Complete');
console.log('  Passage 5: ⏳ Needs manual fixing');
console.log('\n' + '='.repeat(80));
