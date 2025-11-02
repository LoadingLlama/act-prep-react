/**
 * Reformat batch 3 - final 6 long+complex examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const batch3Fixes = {
  // Possessive vs. Plural Nouns - 1420 → ~250 chars
  '128d0807-8b9a-47c3-8bdc-91053f113257': {
    answer_explanation: `Look at what comes after: "and their signature moves"

The word "and" shows a list: players AND their moves. There's no possession happening.

We need the simple plural form: "players" (no apostrophe).

Test the choices:
A. "player's and" → Singular possessive ✗
B. "players and" → Simple plural ✓
C. "players' and" → Plural possessive ✗
D. "player and" → Singular, but context shows multiple players ✗

The answer is B.`
  },

  // Who vs. Whom in Descriptive Phrases - 1304 → ~250 chars
  '4e109097-8c62-4b1d-b64f-150e911693c0': {
    answer_explanation: `Use the he/him trick on just the phrase:
"who opened up a shop" → "he opened up a shop" ✓

Since "he" works (not "him"), use "who" (not "whom").

Quick trick: The word after who/whom is "opened" (a verb), so use "who."

Test the choices:
A. "who" → Subject pronoun, correct for doing the action ✓
B. "whom" → Object pronoun ✗
C. "which" → For things, not people ✗
D. "that" → Can work for people but "who" is clearer and more formal ✗

The answer is A.`
  },

  // System of Equations Word Problem - 905 → ~300 chars (fix calculation errors!)
  '75e146c8-00de-4a47-b032-6f66c79e73de': {
    answer_explanation: `Set up two equations:

First purchase: 10b + 3c = 24.40
Second purchase: 16b = 22.72

Solve for b:
16b = 22.72
b = 1.42

Substitute into first equation:
10(1.42) + 3c = 24.40
14.20 + 3c = 24.40
3c = 10.20
c = 3.40

The answer is C. $3.40`
  },

  // Approximating Values in Complex Tables - 1807 → ~400 chars
  '7bbc7cba-c00b-4129-ad6f-e2a08e868426': {
    answer_explanation: `Find F when X = 5.5, keeping M = 3, A = 4, T = 10 constant (one-variable rule).

Trials with matching M, A, T values:
• Trial 1: X = 6, F = 12
• Trial 4: X = 5, F = 18

We need X = 5.5, which is between 5 and 6.

Since X increases from 5 to 6, F decreases from 18 to 12.
At X = 5.5 (halfway), F ≈ 15 (halfway between 12 and 18).

The answer is B. Between 12 N and 15 N.`
  },

  // Puzzle - Optimization - 920 → ~300 chars
  '64a813f8-54eb-480b-90c5-59c6c611e93f': {
    answer_explanation: `Convert: 5.5 feet = 66 inches

Maximize large boxes first (most efficient):
66 ÷ 12 = 5.5 → Use 5 large boxes
5 × 12 = 60 inches used, 6 inches remaining

Fill remaining space with small boxes:
6 ÷ 2.5 = 2.4 → Use 2 small boxes

Total binders:
• Large: 5 × 10 = 50 binders
• Small: 2 × 1 = 2 binders
• Total: 52 binders

The answer is D. 52`
  },

  // Ambiguous Pronouns - 1508 → ~250 chars
  '909a2c6e-014a-47a0-a68d-fa64119da870': {
    answer_explanation: `The pronoun "he" is ambiguous - it could refer to either the owner OR the customer.

Ambiguous pronouns are always incorrect. We need to specify exactly who is smiling.

Test the choices:
A. "he" → Ambiguous ✗
B. "the owner" → Specifies who is smiling ✓
C. "they" → Plural, doesn't match ✗
D. "the one" → Still vague ✗

The answer is B.`
  }
};

async function reformatBatch3() {
  console.log('🔧 Reformatting batch 3 (final 6 examples)...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const [id, updates] of Object.entries(batch3Fixes)) {
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

reformatBatch3().then(() => {
  console.log('\n✅ Batch 3 complete! All major reformatting done.');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
