const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const specificExplanations = {
  1: { // "The stable hand hired by the farm owners groom..."
    A: "Incorrect. 'Groom' is a plural verb, but the subject is 'stable hand' (singular) - don't be distracted by the plural 'owners' in the interrupting phrase 'hired by the farm owners', which is just describing the stable hand.",
    B: "Correct. 'Grooms' is singular and agrees with the singular subject 'the stable hand' - the phrase 'hired by the farm owners' is just a descriptive interruption between the subject and verb, but doesn't change that we need a singular verb.",
    C: "Incorrect. 'Have groomed' is plural (have = plural helping verb), but the subject is 'the stable hand' (singular) - the singular subject requires 'has groomed', not 'have groomed', and present tense 'grooms' is better than present perfect here.",
    D: "Incorrect. 'Are grooming' is plural (are = plural helping verb), but the subject is 'the stable hand' (singular) - the singular subject would require 'is grooming', not 'are grooming', and simple present 'grooms' is better than progressive here."
  },
  2: { // "The car accident...delayed my commute and causes me..."
    A: "Incorrect. 'Causes' is present tense, but the first verb 'delayed' is past tense - both verbs describe the same past event (the accident that happened), so they must match in tense for parallel structure.",
    B: "Correct. 'Caused' matches the past tense 'delayed' - both verbs describe what the accident did in the past (it delayed the commute AND caused lateness), maintaining parallel structure and consistent tense.",
    C: "Incorrect. 'Will cause' is future tense, but 'delayed' is past tense - the accident already happened and both effects (delaying the commute and causing lateness) occurred in the past, not the future.",
    D: "Incorrect. 'Has caused' is present perfect tense, but 'delayed' is simple past tense - while both refer to past events, mixing tenses breaks parallel structure. Both verbs should use the same tense (simple past: 'delayed' and 'caused')."
  }
};

async function fixVerbsExplanations() {
  console.log('Fixing verbs lesson generic explanations...\n');
  console.log('='.repeat(80));

  const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', 'verbs').single();

  let updatedCount = 0;

  for (const pos of [1, 2]) {
    const { data: q } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).eq('position', pos).single();

    const newExplanations = specificExplanations[pos];
    const updatedChoices = q.choices.map(choice => ({
      ...choice,
      explanation: newExplanations[choice.letter]
    }));

    const { error } = await supabase.from('lesson_examples').update({ choices: updatedChoices }).eq('id', q.id);

    if (error) {
      console.log(`✗ Failed to update position ${pos}: ${error.message}`);
    } else {
      console.log(`✓ Updated position ${pos}: ${q.title}`);
      updatedCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Successfully updated ${updatedCount}/2 verbs questions with specific explanations`);
  console.log('='.repeat(80));
}

fixVerbsExplanations();
