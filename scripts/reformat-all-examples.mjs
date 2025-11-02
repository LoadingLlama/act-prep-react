/**
 * Reformat all examples to be clearer and more concise
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Clean, concise rewrites of the worst examples
const cleanRewrites = {
  // Identifying Sentence Fragments - the one user mentioned
  '2dd97a59-68c1-4ffd-9f9a-859c66ad3d46': {
    answer_explanation: `The sentence is missing a verb, making it a fragment.

Looking at "Fair a new type of diecast toy car" - there's no verb connecting these parts.

Test the choices:
A. "Fair a" → Still no verb ✗
B. "Fair," → Still no verb ✗
C. "Fair;" → Still no verb ✗
D. "Fair was" → Adds the linking verb "was" ✓

With "Fair was," we get a complete sentence: "The toy Fair was a new type of diecast toy car."

The answer is D.`
  },

  // Unnecessary Information (Crossing-Out Trick) - 2229 chars → ~400
  '995b8159-aaa0-473c-b16b-74b54a6f72d1': {
    answer_explanation: `Use the crossing-out trick to identify unnecessary information.

Cross out "thousands of them already on the road in America":
"Electric vehicles are one of the fastest growing industries in the world" ✓

The entire phrase is unnecessary information set off by commas. Within that phrase, we don't need additional commas around just "thousands of them."

Test the choices:
A. ", thousands of them," → Breaks up the single phrase incorrectly ✗
B. ", thousands, of them" → Weird comma placement ✗
C. " thousands of them" → No extra commas within the phrase ✓
D. " thousands of, them" → Breaks it up incorrectly ✗

The answer is C.`
  },

  // Dependent Clauses Creating Fragments - 1102 chars → ~350
  '9d0d69c7-b3bd-4aba-b5c5-a58a36e29cdd': {
    answer_explanation: `Starting with "While" makes the entire sentence a dependent clause with no independent clause = fragment.

Test the choices:
A. "While the bakery varies" → Dependent clause, no independent clause ✗
B. "Having various types of bread" → Participial phrase, not an independent clause ✗
C. "With the bakery having varied" → Prepositional phrase, not independent ✗
D. "The bakery varies" → Independent clause with subject + verb ✓

Removing "While" gives us: "The bakery varies its types of bread and always has a line around the block."

The answer is D.`
  },

  // Middle/End Modifier with "which" - 1610 chars → ~400
  '8939f5bb-1a0a-4ff5-a399-7d753515c301': {
    answer_explanation: `The modifier "which arrived at their nesting grounds early this year" is placed after "research team," so it's currently describing the research team. But teams don't have nesting grounds!

Since we can't move the modifier to be after "blue storks," we need to change what the modifier says to correctly describe the research team.

Test the choices:
A. NO CHANGE → Says team arrived at nesting grounds ✗
B. "which tracked the movements of the blue storks," → Correctly describes what the team did ✓
C. "arriving at their nesting grounds early this year," → Still about team arriving ✗
D. "having arrived early at the nesting grounds," → Still about team arriving ✗

The answer is B.`
  },

  // Modifier without Commas - 2133 chars → ~300
  '6eedb76a-22a7-4010-8cd6-5f3718c6c857': {
    answer_explanation: `The modifier "chasing the cat" comes right after "dog" and describes which dog we're talking about.

Since it's essential information (not just extra detail), no commas are needed.

Test the choices:
A. NO CHANGE: "chasing the cat ran" → Correct placement, no commas ✓
B. "chasing the cat, ran" → Unnecessary comma ✗
C. "that was chasing the cat ran" → Unnecessarily wordy ✗
D. ", chasing the cat, ran" → Commas treat essential info as unnecessary ✗

The answer is A.`
  },

  // Chaining Data Across Two Figures - 1547 chars → ~400
  '6342a9d8-08cc-4e16-b481-a287accf54a2': {
    answer_explanation: `This requires chaining information from Figure 1 to Figure 2.

Given: L = 3 kg for Sample 2
Find: B (%) for Sample 2

Step 1: Find H using Figure 1
At L = 3 kg, Sample 2 has H = 14

Step 2: Find B using Figure 2
At H = 14, Sample 2 has B = 36%

Chain: L = 3 kg → [Figure 1] → H = 14 → [Figure 2] → B = 36%

The answer is C.`
  },

  // Variable Expression with Percents - already decent, just clean up
  'ef7c906b-3e78-4775-b964-366a27f61a55': {
    answer_explanation: `Total bars = nm
Need 70% of total = 0.7nm

Test the choices:
A. 0.7(m + n) → Adds instead of multiplies ✗
B. 70nm → Should be 0.7, not 70 ✗
C. nm + m → Adds m, not taking 70% ✗
D. 0.7nm → 70% of total bars ✓
E. 0.7(n + m) → Adds instead of multiplies ✗

The answer is D.`
  },

  // Divisibility by 3 - already pretty clean, just minor cleanup
  'a254aef0-c397-4d3c-84dd-a089b2d4db7a': {
    answer_explanation: `Divisibility rule for 3: Sum of digits must be divisible by 3.

A. 1,234 → 1+2+3+4 = 10 → Not divisible by 3 ✗
B. 2,467 → 2+4+6+7 = 19 → Not divisible by 3 ✗
C. 3,571 → 3+5+7+1 = 16 → Not divisible by 3 ✗
D. 4,725 → 4+7+2+5 = 18 → 18÷3 = 6 ✓
E. 5,892 → 5+8+9+2 = 24 → Also divisible by 3 ✓

The answer is D.`
  }
};

async function reformatExamples() {
  console.log('🔧 Reformatting examples to be clearer and more concise...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const [id, updates] of Object.entries(cleanRewrites)) {
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

reformatExamples().then(() => {
  console.log('\n✅ Reformatting complete!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
