/**
 * Manual thorough rewrites for key examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const thoroughRewrites = {
  // Identifying Sentence Fragments
  '2dd97a59-68c1-4ffd-9f9a-859c66ad3d46': {
    answer_explanation: `**Choice A: "NO CHANGE" (Fair a)**
This leaves the sentence as a fragment because there's no verb. Looking at "the toy Fair a new type of diecast toy car," we have a subject ("Fair") but no verb to connect it to what comes next. Without a linking verb like "was," the sentence is incomplete and doesn't express a complete thought.
✗ Incorrect

**Choice B: "Fair,"**
Adding a comma doesn't solve the fundamental problem - we still don't have a verb. The sentence would read "the toy Fair, a new type of diecast toy car," which is still a fragment. A comma can't replace the missing verb that's needed to make this a complete sentence.
✗ Incorrect

**Choice C: "Fair;"**
A semicolon is used to connect two independent clauses, but we don't have two independent clauses here. We have "the toy Fair" and "a new type of diecast toy car," neither of which can stand alone as complete sentences. This choice still leaves us without the necessary verb.
✗ Incorrect

**Choice D: "Fair was"**
This adds the linking verb "was," which connects the subject to its description. Now the sentence reads "the toy Fair was a new type of diecast toy car" - a complete sentence with a subject (Fair), a verb (was), and a complement (a new type of diecast toy car). This creates a grammatically complete thought.
✓ CORRECT

The answer is D.`
  },

  // Variable Expression with Percents
  'ef7c906b-3e78-4775-b964-366a27f61a55': {
    answer_explanation: `**Choice A: "0.7(m + n)"**
This incorrectly adds m and n instead of multiplying them. The problem states Jeremy has n boxes with m bars each, which means the total is n times m (multiplication), not n plus m (addition). This would give us 70% of the sum of boxes and bars, which doesn't make mathematical sense for this situation.
✗ Incorrect

**Choice B: "70nm"**
This uses 70 instead of 0.7 to represent 70%. When we write a percentage as a decimal, 70% becomes 0.7 (which is 70 divided by 100). Using 70nm would mean Jeremy needs to sell 70 times his total inventory, which is impossible and doesn't represent the 70% correctly.
✗ Incorrect

**Choice C: "nm + m"**
This expression adds an extra m to the total, which doesn't match the problem. The total number of bars is nm (n boxes times m bars per box), and we need 70% of that total. Adding m changes the total amount, which isn't what the question is asking for.
✗ Incorrect

**Choice D: "0.7nm"**
This correctly represents 70% of the total bars. First, we find the total: n boxes × m bars per box = nm total bars. Then we multiply by 0.7 (which is 70% as a decimal) to get 70% of that total. This matches exactly what the problem is asking for.
✓ CORRECT

**Choice E: "0.7(n + m)"**
Like choice A, this incorrectly adds n and m instead of multiplying them. Even though it uses the correct decimal (0.7) for 70%, it's finding 70% of the wrong amount. We need 70% of the product (n times m), not 70% of the sum (n plus m).
✗ Incorrect

The answer is D.`
  },

  // Using pH Knowledge to Classify Substances
  '599f8651-8e2d-4793-bb97-382a4a429f8a': {
    answer_explanation: `**Choice A: "Lemon juice and vinegar only"**
While lemon juice (pH 2.3) and vinegar (pH 3.1) are both acids (pH < 7), this answer only identifies acids, not bases. The question asks which substances are classified as bases, which have pH values greater than 7. Acids and bases are opposites on the pH scale.
✗ Incorrect

**Choice B: "Pure water only"**
Pure water has a pH of 7.0, making it neutral - neither acidic nor basic. Neutral substances are right in the middle of the pH scale. The question asks for bases, which must have pH values greater than 7, not equal to 7.
✗ Incorrect

**Choice C: "Baking soda solution and bleach only"**
This correctly identifies the bases in the table. Baking soda solution has a pH of 8.5 and bleach has a pH of 12.5, both of which are greater than 7. According to the pH scale, any substance with pH > 7 is classified as a base, and these are the only two substances in the table that meet this criterion.
✓ CORRECT

**Choice D: "All five substances"**
Not all five substances are bases - the table includes acids (lemon juice and vinegar), a neutral substance (pure water), and bases (baking soda solution and bleach). A substance can only be classified as one of these categories based on its pH value, so it's impossible for all five to be bases.
✗ Incorrect

The answer is C.`
  }
};

async function applyThoroughRewrites() {
  console.log('🔧 Applying manual thorough rewrites...\n');

  let successCount = 0;

  for (const [id, updates] of Object.entries(thoroughRewrites)) {
    const { error } = await supabase
      .from('lesson_examples')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error(`❌ Error:`, error);
    } else {
      console.log(`✅ Updated ${id.substring(0, 8)}...`);
      successCount++;
    }
  }

  console.log(`\n✅ Applied ${successCount} thorough rewrites`);
}

applyThoroughRewrites().then(() => process.exit(0));
