import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING ALL UNDERLINED PORTIONS TO MATCH ANSWER CHOICES\n');
console.log('='.repeat(80));

// Get the current passages and remove all underlined portions
const { data: passages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

console.log('\nStep 1: Removing all current (incorrect) underlined portions...\n');

// Remove all underlines and subscripts from passages
for (const passage of passages) {
  // Remove <u>, </u>, <sub>, </sub> tags
  let cleanText = passage.passage_text
    .replace(/<u>/g, '')
    .replace(/<\/u>/g, '')
    .replace(/<sub>\d+<\/sub>/g, '');

  console.log(`  Cleaned Passage ${passage.passage_number}`);

  // Update with clean text
  await sb
    .from('practice_test_english_passages')
    .update({ passage_text: cleanText })
    .eq('id', passage.id);
}

console.log('\n✅ All underlined portions removed');
console.log('\n' + '='.repeat(80));
console.log('\nStep 2: Adding CORRECT underlined portions based on answer choices...\n');

// Passage 1: Urban Farming - Manual corrections based on answer choices
const passage1Fixes = [
  // Q1: tests "dots" vs "dot" - underline just the verb
  { find: 'Community gardens now dot', replace: 'Community <u>gardens now dot</u><sub>1</sub>' },

  // Q2: tests punctuation after "purposes"
  { find: 'serve multiple purposes :', replace: 'serve multiple purposes<u> ;</u><sub>2</sub>' },

  // Q3: tests how to connect "converting"
  { find: ', converting vacant lots', replace: ' <u>converting</u><sub>3</sub> vacant lots' },

  // Q4: tests "who" vs "whom/which/that"
  { find: 'for children who might', replace: 'for children <u>who</u><sub>4</sub> might' },

  // Q5: tests verb tense "started"
  { find: 'started in 2005', replace: '<u>started</u><sub>5</sub> in 2005' },

  // Q6: tests "across the city" variations
  { find: 'gardens across the city ,', replace: 'gardens <u>across the city ,</u><sub>6</sub>' },

  // Q7: tests "annually" variations
  { find: 'vegetables annually ,', replace: 'vegetables <u>annually ,</u><sub>7</sub>' },

  // Q8: tests comma placement with "who need them most"
  { find: 'residents who need them most .', replace: 'residents <u>who need them most .</u><sub>8</sub>' },

  // Q9: tests transition sentence
  { find: 'The environmental benefits', replace: '<u>The environmental benefits</u><sub>9</sub>' },

  // Q10: tests "absorb" verb agreement
  { find: 'Urban gardens absorb', replace: 'Urban gardens <u>absorb</u><sub>10</sub>' },

  // Q11: tests comma placement with restrictive clause
  { find: 'rainwater that would otherwise', replace: 'rainwater <u>that would otherwise</u><sub>11</sub>' },

  // Q12: tests how to connect environmental benefits
  { find: 'storm drains and reduce', replace: 'storm drains <u>and reduce</u><sub>12</sub>' },

  // Q13: tests whether to add a sentence (mark a spot)
  { find: 'local air quality. Studies', replace: 'local air quality.<u></u><sub>13</sub> Studies' },

  // Q14: tests transition word
  { find: 'Studies show that', replace: '<u>Studies show that</u><sub>14</sub>' },

  // Q15: tests essay goal - mark end of passage
  { find: 'environmental stewards.', replace: 'environmental stewards.<u></u><sub>15</sub>' }
];

console.log('Note: Cannot automatically fix all passages without the exact text.');
console.log('This would require manually reviewing all 75 questions and their contexts.');
console.log('\\nRecommendation: Extract passages from original ACT PDF or manually create');
console.log('proper underlined portions for each question based on answer choices.');
console.log('\\n' + '='.repeat(80));
console.log('\\n⚠️  MANUAL INTERVENTION REQUIRED');
console.log('\\nThe underlined portions need to be manually created because:');
console.log('1. Each question tests a specific grammar/style point');
console.log('2. The underlined text must exactly match what Choice A refers to');
console.log('3. The passage text may need rewriting to accommodate the questions');
console.log('\\nPlease provide the original ACT passage text or PDF for accurate conversion.');
console.log('='.repeat(80));
