const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Specific explanations for each question based on actual content
const specificExplanations = {
  1: { // Basic List Parallelism: made her bed, cleaning the shelves, vacuumed the floor
    A: "Incorrect. This uses a gerund 'cleaning' while the other items use past tense verbs ('made', 'vacuumed'), breaking parallel structure.",
    B: "Correct. All three verbs are now in past tense: 'made', 'cleaned', and 'vacuumed', maintaining parallel structure.",
    C: "Incorrect. This adds the subject 'she', making this a full clause while the other items are just verbs, breaking parallel structure.",
    D: "Incorrect. This uses past progressive 'was cleaning' while the other verbs use simple past tense ('made', 'vacuumed'), breaking parallel structure."
  },
  2: { // Two-Item List: would rather get... than paying
    A: "Incorrect. This mixes 'get' (base verb) with 'paying' (gerund), breaking the parallel structure required by 'would rather X than Y'.",
    B: "Correct. Both items now use infinitives: 'to get' and 'to pay', maintaining parallel structure in the 'would rather... than' comparison.",
    C: "Incorrect. While both items use gerunds ('getting' and 'paying'), this doesn't work with 'would rather', which requires infinitives.",
    D: "Incorrect. The first item 'to get' requires 'would' in front, but the structure already has 'would rather', making this construction awkward and non-parallel."
  },
  3: { // Not Only/But Also: took away... but also she locked
    A: "Incorrect. This adds the subject 'she' after 'but also', creating an imbalanced structure ('took away my keys' vs 'she locked them').",
    B: "Correct. Both verbs follow the same pattern: 'took away' and 'locked', maintaining parallel structure in the 'not only... but also' construction.",
    C: "Incorrect. This adds the subject 'she' after 'but also', breaking the parallel structure where both verbs should directly follow their conjunctions.",
    D: "Incorrect. This uses past progressive 'was locking' while the first verb is simple past 'took', breaking parallel structure."
  },
  4: { // Both/And: Both a scholar and quite athletic
    A: "Incorrect. This mixes a noun 'scholar' with an adjective 'athletic', breaking the parallel structure required by 'both... and'.",
    B: "Correct. Both items are now nouns: 'scholar' and 'athlete', maintaining parallel structure in the 'both... and' construction.",
    C: "Incorrect. This mixes an adjective 'scholarly' with a different adjective form 'quite athletic' (modified by an adverb), creating unbalanced parallel structure.",
    D: "Incorrect. While this may seem acceptable, it breaks the 'both... and' correlative conjunction pattern by removing 'both', weakening the parallel structure."
  },
  47: { // Complex Correlative: not only because of their validity but also their innovative
    A: "Incorrect. This creates an incomplete parallel structure - 'because of their statistical validity' has no matching 'because of' after 'but also'.",
    B: "Correct. Both clauses now follow the same structure: 'because of their statistical validity' and 'because of their innovative methodology', maintaining parallel structure.",
    C: "Incorrect. This mixes a gerund phrase 'having statistical validity' with an adjective phrase 'innovative in methodology', breaking parallel structure.",
    D: "Incorrect. This mixes 'because of' with 'for', using different prepositions that break the parallel structure in the 'not only... but also' construction."
  },
  48: { // Sophisticated List: climate modeling, developing sustainable energy, and what the economic impacts
    A: "Incorrect. This mixes noun 'modeling' and gerund 'developing' with a clause 'what the economic impacts', breaking list parallelism.",
    B: "Correct. All three items are now compound nouns: 'climate modeling', 'sustainable energy development', and 'economic impacts', maintaining parallel structure.",
    C: "Incorrect. While more parallel than A, the first two items lack articles while the third has 'the', creating slight imbalance in the list structure.",
    D: "Incorrect. This mixes a noun 'modeling' and gerund 'developing' with a noun phrase 'the economic impacts' that includes an article, breaking parallel structure."
  },
  49: { // Advanced Comparison: more efficient than using the previous version
    A: "Incorrect. This compares a noun 'software' with a gerund phrase 'using the previous version', breaking parallel structure in the comparison.",
    B: "Correct. Both items being compared are now nouns: 'software' and 'version', maintaining parallel structure in the 'more... than' comparison.",
    C: "Incorrect. This compares a noun 'software' with an infinitive phrase 'to use the previous version', breaking parallel structure in the comparison.",
    D: "Incorrect. This compares a noun 'software' with a dependent clause 'when you use the previous version', breaking parallel structure in the comparison."
  },
  50: { // Complex Verb Form: recommended revising, to implement, and scheduling
    A: "Incorrect. This mixes gerunds 'revising' and 'scheduling' with an infinitive 'to implement', breaking parallel structure in the list.",
    B: "Correct. All three items are now gerunds: 'revising', 'implementing', and 'scheduling', maintaining parallel structure after 'recommended'.",
    C: "Incorrect. This mixes gerunds 'revising' and 'scheduling' with a noun 'implementation', breaking the parallel structure in the list.",
    D: "Incorrect. This mixes gerunds 'revising' and 'scheduling' with a clause 'that new training protocols be implemented', breaking parallel structure."
  }
};

async function updateParallelStructureExplanations() {
  console.log('Updating parallel-structure explanations to be specific...\n');
  console.log('='.repeat(80));

  // Get parallel-structure lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'parallel-structure')
    .single();

  // Get questions that need updates
  const { data: questions } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id)
    .in('position', [1, 2, 3, 4, 47, 48, 49, 50]);

  let updatedCount = 0;

  for (const q of questions) {
    const pos = q.position;
    const newExplanations = specificExplanations[pos];

    if (!newExplanations) {
      console.log(`  ⚠️  No specific explanations defined for position ${pos}`);
      continue;
    }

    // Update choices with specific explanations
    const updatedChoices = q.choices.map(choice => ({
      ...choice,
      explanation: newExplanations[choice.letter]
    }));

    const { error } = await supabase
      .from('lesson_examples')
      .update({ choices: updatedChoices })
      .eq('id', q.id);

    if (error) {
      console.log(`  ✗ Failed to update position ${pos}: ${error.message}`);
    } else {
      console.log(`  ✓ Updated position ${pos}: ${q.title}`);
      console.log(`     Now has specific explanations for each choice`);
      updatedCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Successfully updated ${updatedCount} questions with specific explanations`);
  console.log('='.repeat(80));
}

updateParallelStructureExplanations();
