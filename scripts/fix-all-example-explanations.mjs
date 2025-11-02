/**
 * Fix all problematic example explanations
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const fixes = {
  // Very short explanations (science examples)
  '599f8651-8e2d-4793-bb97-382a4a429f8a': {
    // Using pH Knowledge to Classify Substances
    answer_explanation: `pH Scale Classification:
• pH < 7 = Acid
• pH = 7 = Neutral
• pH > 7 = Base

From Table 1, substances with pH > 7:
• Baking soda solution: pH = 8.5 (base)
• Bleach: pH = 12.5 (base)

Substances with pH < 7 (acids):
• Lemon juice: pH = 2.3
• Vinegar: pH = 3.1

Pure water (pH = 7) is neutral.

The answer is C. Only baking soda solution and bleach are classified as bases.`
  },

  '5b795e90-83c0-4284-9d57-7bd035ae4f4e': {
    // Identifying Independent and Dependent Variables
    answer_explanation: `Key Concept:
• Independent variable = What the experimenter CHANGES
• Dependent variable = What the experimenter MEASURES (the result)

In this experiment:
• The student CHANGED the amount of fertilizer (0g, 5g, 10g, 15g)
• The student MEASURED the plant height

The independent variable is the amount of fertilizer.

The answer is B.`
  },

  'cd11a8da-9f1a-47d1-95a2-e134a57d1f86': {
    // Identifying States of Water at Different Temperatures
    answer_explanation: `State of Water:
• Below 0°C = Solid (ice)
• 0°C to 100°C = Liquid (water)
• Above 100°C = Gas (steam/water vapor)

From Table 1:
• -10°C → Solid ice
• 25°C → Liquid water
• 100°C → Liquid water (at boiling point)
• 120°C → Gas (steam)

At 25°C (room temperature), water is in the liquid state.

The answer is B.`
  },

  'bb0148a3-e5ad-4432-bcae-8198952ebd08': {
    // Comparing Two Viewpoints on Climate Change
    answer_explanation: `Points of Agreement vs. Disagreement:

Both scientists agree that:
• CO₂ levels have increased since pre-industrial times (Scientist 1 says "40% increase," Scientist 2 acknowledges "CO₂ levels have increased")

They disagree on:
• Whether human activity is the PRIMARY cause
• Whether natural cycles can fully explain the changes
• Whether current warming is unprecedented

The answer is A. Both scientists agree that CO₂ levels have increased since pre-industrial times.`
  },

  'afb520c8-4c11-4896-b05b-7aa7560901ff': {
    // Applying Photosynthesis Knowledge
    answer_explanation: `Photosynthesis requires light energy to convert CO₂ and water into glucose.

Key observations from Table 1:
• Environment A (high light + high CO₂): 18 cm growth — BEST
• Environment B (high light + low CO₂): 12 cm growth
• Environment C (low light + high CO₂): 8 cm growth
• Environment D (NO light + high CO₂): 1 cm growth — WORST

Even with high CO₂, plants without light (Environment D) barely grew. This proves light is ESSENTIAL for photosynthesis and growth.

The answer is B. Light is essential for photosynthesis and plant growth.`
  },

  'e83c9008-dc65-468d-80c5-64ef8996694e': {
    // Understanding Density and Floating
    answer_explanation: `Density Rule for Floating:
• If object density < liquid density → Object floats
• If object density > liquid density → Object sinks

Water density = 1.00 g/cm³

From Table 1:
• Ice cube: 0.92 g/cm³ < 1.00 → Floated ✓
• Wood block: 0.65 g/cm³ < 1.00 → Floated ✓
• Iron nail: 7.87 g/cm³ > 1.00 → Sank ✓
• Glass marble: 2.50 g/cm³ > 1.00 → Sank ✓

Ice floats because its density (0.92 g/cm³) is LOWER than liquid water's density (1.00 g/cm³).

The answer is B. Ice has a lower density than liquid water.`
  },

  '87e8162c-fed6-4400-b136-6804738f3e38': {
    // Evaluating New Evidence Against Viewpoints
    answer_explanation: `Key Evidence: Dinosaur bones found BELOW iridium layer, but NONE above it.

This means:
• Dinosaurs were alive BEFORE the iridium layer formed
• Dinosaurs were NOT alive AFTER the iridium layer formed
• The iridium layer marks the exact time dinosaurs went extinct

Student 1 says the iridium layer came from an asteroid impact 66 million years ago and caused extinction. This finding shows dinosaurs existed before the iridium layer and disappeared right after — exactly matching Student 1's asteroid impact theory.

Student 2's volcanic activity theory doesn't explain why the extinction happened exactly at the iridium layer.

The answer is A. This finding most strongly supports Student 1's viewpoint only.`
  },

  // Explanations that don't mention the answer
  '3ce9780f-61f7-40d6-8423-c4db6a7e6b2a': {
    // Affect vs. Effect
    answer_explanation: `Key Rule:
• "affect" = verb (to influence or change something)
• "effect" = noun (the result or consequence)

In this sentence:
• First use: "the effect" (noun) — correct ✓
• Second use: "affects" (verb meaning "influences") — correct ✓

The current wording is correct.

The answer is A. NO CHANGE.`
  },

  '4a312610-e89e-4408-b7ab-9aae7169660d': {
    // Than vs. Then
    answer_explanation: `Key Rule:
• "than" = for comparisons
• "then" = for time sequences or if/then statements

This sentence compares "practice" to "natural talent," so we need the comparison word "than."

The current wording is correct.

The answer is A. NO CHANGE.`
  },

  '78e8c18a-ab06-47b7-8a2b-3321d0c576ba': {
    // Have vs. Of
    answer_explanation: `Key Rule:
NEVER use "could of," "should of," "would of," or "might of."
ALWAYS use "could have," "should have," "would have," or "might have."

The confusion comes from "could've" sounding like "could of," but "of" is grammatically incorrect.

The correct phrase is "could have."

The answer is B. could have.`
  },

  '149cd22b-70d5-448e-83a6-9f94f0cbeb35': {
    // Countable vs. Non-countable
    answer_explanation: `Key Rule:
For COUNTABLE nouns (items you can count individually):
• Use: number, many, fewer, few

For NON-COUNTABLE nouns (substances/concepts):
• Use: amount, much, less, little

Students are countable (1 student, 2 students, etc.), so use "number" not "amount."

The answer is B. number of students.`
  },

  'f1dba965-960a-48bb-904b-7d290beb2530': {
    // Dividing Fractions
    answer_explanation: `Use the "Keep, Flip, Change" method:

Step 1: KEEP the first fraction: 3/5

Step 2: FLIP the second fraction (take the reciprocal): 2/7 becomes 7/2

Step 3: CHANGE division to multiplication: (3/5) × (7/2)

Step 4: Multiply across: (3 × 7)/(5 × 2) = 21/10

The answer is B. 21/10.`
  },

  '051f825a-d732-40c6-893f-d152cad27f98': {
    // Complex Fractions
    answer_explanation: `A complex fraction is just division in disguise!

Step 1: Rewrite as division: (1/2) ÷ (3/4)

Step 2: Use "Keep, Flip, Change":
• KEEP: 1/2
• FLIP: 3/4 becomes 4/3
• CHANGE to multiplication: (1/2) × (4/3)

Step 3: Multiply: (1 × 4)/(2 × 3) = 4/6 = 2/3

The answer is B. 2/3.`
  },

  // Contains "undefined"
  '4a2bec04-32c8-4bbd-94be-072ab865b8e7': {
    // Testing Equations with Simple Data Points
    answer_explanation: `Step 1: Identify the variables
T = temperature (°C)
h = altitude (km)

Looking at the data, as altitude increases, temperature decreases. This means we need a negative relationship (eliminate A and C which show positive relationships).

Remaining: B (T = 20 - 5h) or D (T = 100/h)

Step 2: Test with h = 0 (easiest point)
From the table: when h = 0, T = 20

Test B: T = 20 - 5(0) = 20 - 0 = 20 ✓ Matches!
Test D: T = 100/0 = cannot divide by zero ✗ Doesn't work!

Equation B works for h = 0, but let's verify with another point to be sure.

Step 3: Test with h = 1 (another simple point)
From the table: when h = 1, T = 15

Test B: T = 20 - 5(1) = 20 - 5 = 15 ✓ Matches!

Step 4: Verify with h = 2
From the table: when h = 2, T = 10

Test B: T = 20 - 5(2) = 20 - 10 = 10 ✓ Matches!

The answer is B.

The pattern shows that for every 1 km increase in altitude, temperature decreases by 5°C, starting from 20°C at sea level (h = 0).`
  },

  'dca7b39d-3ff3-4e27-bb0a-eaea41fb201d': {
    // Matrix Multiplication - Defined or Undefined
    answer_explanation: `Check if middle numbers match.

Step 1: Write dimensions
AB = (2 × 3) × (2 × 2)

Step 2: Box middle numbers
(2 × [3]) × ([2] × 2)

Step 3: Check if they match
Middle numbers: 3 and 2
3 ≠ 2 → They do NOT match!

Step 4: Conclusion
AB is NOT DEFINED

Rule: Number of columns in first matrix must equal number of rows in second matrix
Columns in A = 3
Rows in B = 2
3 ≠ 2, so the multiplication is not defined

The answer is D. No, the multiplication is not defined.`
  },

  'a2adf0b5-86f0-49d9-8fbf-a0a9e583a6ed': {
    // Finding Domain from Fractions
    answer_explanation: `Find where the function is not defined (denominator = 0).

Step 1: Set denominator equal to 0
x² - 5x + 6 = 0

Step 2: Factor
Need two numbers that multiply to 6 and add to -5
Those are -2 and -3
(x - 2)(x - 3) = 0

Step 3: Solve each factor
x - 2 = 0 → x = 2
x - 3 = 0 → x = 3

The function is not defined at x = 2 and x = 3, so these values are NOT in the domain.

The answer is C. 2 and 3.`
  }
};

async function fixExamples() {
  console.log('🔧 Fixing all problematic example explanations...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const [id, updates] of Object.entries(fixes)) {
    try {
      const { error } = await supabase
        .from('lesson_examples')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error(`❌ Error updating ${id}:`, error);
        errorCount++;
      } else {
        console.log(`✅ Updated example ${id.substring(0, 8)}...`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception updating ${id}:`, err);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`📊 SUMMARY:`);
  console.log(`   ✅ Successfully updated: ${successCount} examples`);
  console.log(`   ❌ Errors: ${errorCount} examples`);
  console.log('='.repeat(80));
}

fixExamples().then(() => {
  console.log('\n✅ All fixes complete!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
