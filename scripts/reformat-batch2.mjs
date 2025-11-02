/**
 * Reformat batch 2 - the 6 worst examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const batch2Fixes = {
  // Simplifying Fractions - Splitting Numerators - 2160 → ~200 chars
  '10b5f7a1-c988-428a-a006-e5cee67c6777': {
    answer_explanation: `Split the numerator to simplify:

(12x + 2)/6 = 12x/6 + 2/6 = 2x + 1/3

The answer is B.`
  },

  // Pair of Dashes for Unnecessary Information - 1533 → ~350 chars
  'a808129f-6611-4c53-9f2f-bd09284fa0cb': {
    answer_explanation: `The phrase "his toy cars, his marbles, and his Legos" is unnecessary information in the middle of the sentence.

Since there's a dash AFTER "Legos" (not underlined), we need a matching dash BEFORE "his toy cars" to create a pair.

Unnecessary information needs matching punctuation: both commas, both dashes, or both parentheses. Never mix them!

Test the choices:
A. ", his toy cars" → Comma + dash (mismatched) ✗
B. " - his toy cars" → Dash + dash (matched pair) ✓
C. " his toy cars" → No punctuation + dash ✗
D. ": his toy cars" → Colon + dash (mismatched) ✗

The answer is B.`
  },

  // Unnecessary Information with Names - 1519 → ~250 chars
  '7a292371-2130-450b-aa0b-33ec3502b2ba': {
    answer_explanation: `"A very popular teacher among the students" is unnecessary information (an appositive) describing Mr. Alvin.

Cross it out: "Mr. Alvin cancelled the final exam" ✓ Still complete!

Unnecessary information in the middle needs commas on both sides. The underlined portion shows where the first comma goes.

Test the choices:
A. NO CHANGE → No comma to set it apart ✗
B. ", a very popular," → Only surrounds part of the phrase ✗
C. " a very popular," → Comma after but not before ✗
D. ", a very popular" → Opens with a comma correctly ✓

The answer is D.`
  },

  // Identifying Subject-Verb Agreement vs. Tense Questions - 1498 → ~300 chars
  '60bc14d2-a169-4705-a697-01da657af929': {
    answer_explanation: `The choices show both singular ("has") and plural ("have") verbs, so this tests subject-verb agreement.

Cross out prepositional phrases:
"The first row of the townhouses for sale in my neighborhood has the best view of the beach."

Subject: "row" (singular)
Verb must be singular → "has"

Test the choices:
A. "has" → Singular, matches "row" ✓
B. "having" → Not a complete verb ✗
C. "have" → Plural, doesn't match ✗
D. "would have" → Plural + changes meaning ✗

The answer is A.`
  },

  // Subject-Verb Agreement with Prepositional Phrases - 1382 → ~250 chars
  '1e83b0a0-2020-4f25-b209-634cdc118b1d': {
    answer_explanation: `Cross out the prepositional phrase:
"The stable hand hired by the farm owners groom the horses every morning."

Subject: "stable hand" (singular)
Verb must be singular → "grooms"

Test the choices:
A. "groom" → Plural ✗
B. "grooms" → Singular ✓
C. "have groomed" → Plural ✗
D. "are grooming" → Plural ✗

The answer is B.`
  },

  // Pronoun Agreement with Singular Antecedents - 1243 → ~250 chars
  'aeeab69d-9f09-46d3-936a-f9ae99d82062': {
    answer_explanation: `Antecedent: "Each member" (singular)
Gender: female (women's track team)
Pronoun needed: singular + female = "her"

Test the choices:
A. "their" → Plural ✗
B. "her" → Singular + female ✓
C. "his or her" → Unnecessarily vague ✗
D. "its" → For things, not people ✗

The answer is B.`
  }
};

async function reformatBatch2() {
  console.log('🔧 Reformatting batch 2 (6 worst examples)...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const [id, updates] of Object.entries(batch2Fixes)) {
    try {
      const { error } = await supabase
        .from('lesson_examples')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error(`❌ Error updating ${id}:`, error);
        errorCount++;
      } else {
        console.log(`✅ Reformatted ${id.substring(0, 8)}...`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception updating ${id}:`, err);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`📊 SUMMARY:`);
  console.log(`   ✅ Successfully reformatted: ${successCount} examples`);
  console.log(`   ❌ Errors: ${errorCount} examples`);
  console.log('='.repeat(80));
}

reformatBatch2().then(() => {
  console.log('\n✅ Batch 2 complete!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
