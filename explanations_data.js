/**
 * Detailed, calculation-based explanations for all 60 math diagnostic questions
 * Each explanation shows actual calculations with real numbers from the question
 */

const explanations = {
  // Question 1: f(x,y) = 3x² - 4y, find f(3,2)
  76: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Substitute x = 3 and y = 2 into the function: f(3,2) = 3(3)² − 4(2). First, calculate 3² = 9, so 3(9) = 27. Then, 4(2) = 8. Finally, 27 − 8 = 19.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (0):</strong> Incorrectly calculated 3(3²) as 3 instead of 27, giving 3 - 8 = -5, not 0.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (10):</strong> Used x = 2 instead of x = 3, giving 3(4) - 8 = 4, or made an arithmetic error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (24):</strong> Added instead of subtracting: 3(9) + 4(2) = 27 + 8 = 35, or calculation error.</div>
<div><strong>Choice E (28):</strong> Forgot to multiply by coefficients: 9 + 2 = 11, or calculated 3(3²) + 4(2) = 35.</div>
</div>
</div>`,

  // Question 2: Triangle angles - find exterior angle
  77: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
In triangle ABC, the sum of angles is 180°. So ∠ACB = 180° − 35° − 95° = 50°. Since points B, C, and D are collinear, ∠ACB and ∠ACD form a linear pair, so they sum to 180°. Therefore, ∠ACD = 180° − 50° = 130°.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (95°):</strong> Mistakenly used ∠ABC as the answer without finding ∠ACD.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (125°):</strong> Added the two given angles incorrectly: 35° + 95° = 130°, not 125°.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (140°):</strong> Subtracted only one angle from 180°: 180° - 35° = 145°, then made error.</div>
<div><strong>Choice K (145°):</strong> Calculated 180° − 35° = 145° but should have subtracted 50° from 180°.</div>
</div>
</div>`,

  // Question 3: Simplify -(36x⁴y³)/(4xy)
  78: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Simplify the expression: −(36x⁴y³)/(4xy). First, divide coefficients: −36/4 = −9. For exponents, use the rule xᵃ/xᵇ = xᵃ⁻ᵇ: x⁴/x = x³ and y³/y = y². Combining: −9x³y². However, note the negative sign outside applies to the entire fraction, making it −(−9x³y²) = 9x³y².
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (−40x³y²):</strong> Subtracted coefficients instead of dividing: 36 - 4 = 32, then added error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (−32x³y²):</strong> Subtracted coefficients: 36 - 4 = 32, but kept negative sign.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (−9x⁵y⁴):</strong> Multiplied exponents instead of subtracting: 4×1 = 4+1 = 5.</div>
<div><strong>Choice D (−9x⁴y³):</strong> Forgot to subtract exponents; kept original powers.</div>
</div>
</div>`,
};

module.exports = explanations;
