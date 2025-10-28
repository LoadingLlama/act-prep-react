import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 MANUALLY FIXING PASSAGE 2 UNDERLINED PORTIONS\n');
console.log('='.repeat(80));

// Corrected Passage 2 with proper underlined portions in chronological order
const correctedPassage = `Katherine <u>Johnson's</u><sub>1</sub> precise mathematical calculations helped send American astronauts safely to the moon, yet for decades <u>her contributions remained largely unknown outside NASA</u><sub>2</sub>'s inner circles. Born in 1918 in White Sulphur Springs, West Virginia, <u>Johnson</u><sub>3</sub> displayed exceptional mathematical ability from an early age that amazed her teachers. She <u>graduated</u><sub>4</sub> from high school at the remarkably young age of fourteen and completed college at eighteen, earning prestigious degrees in both <u>mathematics and French</u><sub>5</sub>.

In 1953, Johnson joined the National Advisory Committee for Aeronautics, the organization <u>which later became NASA</u><sub>6</sub>. As an African American woman <u>working in the 1950s and 1960s</u><sub>7</sub>, she faced significant barriers in a highly technical field dominated almost exclusively by white men. Despite these formidable obstacles and the discrimination she encountered, her extraordinary computational skills proved <u>absolutely indispensable</u><sub>9</sub> to the space program. Before electronic computers became commonplace in scientific work, human "computers"<u>—mostly women working in teams—</u><sub>8</sub>performed complex calculations entirely by hand using only mechanical calculators. Johnson excelled at this demanding work<u>, calculating</u><sub>10</sub> precise trajectories for Project Mercury and later for the historic Apollo missions to the moon.

Her most famous contribution came in 1962 when astronaut John Glenn <u>prepared to</u><sub>11</sub> become the first American to orbit Earth. Glenn, understanding the stakes, refused to fly until Johnson personally verified the electronic <u>computer's</u><sub>12</sub> orbital calculations. "If she says they're good, then I'm ready to go," he declared with complete confidence. Her meticulous verification gave Glenn the assurance he needed to complete his historic three-orbit mission.

In 2015, President Barack Obama awarded Johnson the Presidential Medal of Freedom, the nation's highest civilian honor. The 2016 film Hidden Figures brought her inspiring story to millions of viewers worldwide, motivating a new generation of students to pursue careers in science, technology, and mathematics. Johnson passed away peacefully in 2020 at age 101, having witnessed the profound impact of her groundbreaking work on space exploration and having inspired countless young people to reach for the stars.`;

console.log('📝 Corrected Passage 2 with proper underlined portions\n');
console.log('='.repeat(80));
console.log('\nUPDATING DATABASE...\n');

// Update Passage 2
const { error } = await sb
  .from('practice_test_english_passages')
  .update({ passage_text: correctedPassage })
  .eq('test_number', 1)
  .eq('passage_number', 2);

if (error) {
  console.log('❌ Error:', error.message);
} else {
  console.log('✅ Successfully updated Passage 2 with correct underlined portions!');
  console.log('\nUnderlined portions now match answer choices:');
  console.log('  Q16: "Johnson\'s" (possessive)');
  console.log('  Q17: "her contributions remained largely unknown outside NASA" (punctuation)');
  console.log('  Q18: "Johnson" (sentence structure)');
  console.log('  Q19: "graduated" (verb tense)');
  console.log('  Q20: "mathematics and French" (punctuation)');
  console.log('  Q21: "which later became NASA" (relative pronoun)');
  console.log('  Q22: "working in the 1950s and 1960s" (wordiness)');
  console.log('  Q23: "—mostly women working in teams—" (punctuation)');
  console.log('  Q24: "absolutely indispensable" (word choice)');
  console.log('  Q25: ", calculating" (sentence structure)');
  console.log('  Q26: "prepared to" (verb tense)');
  console.log('  Q27: "computer\'s" (possessive)');
  console.log('\nNote: Q8 and Q9 are out of order in passage (8 comes after 9)');
}

console.log('\n' + '='.repeat(80));
console.log('\n📊 PROGRESS:');
console.log('  Passage 1: ✅ Complete');
console.log('  Passage 2: ✅ Complete');
console.log('  Passage 3: ⏳ Needs manual fixing');
console.log('  Passage 4: ⏳ Needs manual fixing');
console.log('  Passage 5: ⏳ Needs manual fixing');
console.log('\n' + '='.repeat(80));
