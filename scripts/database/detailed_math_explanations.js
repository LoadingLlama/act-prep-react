// Detailed, specific explanations for Math questions
// Each explanation is tailored to the exact question

const mathExplanations = {
  // Question 76: Function evaluation f(x,y) = 3x² - 4y, find f(3,2)
  76: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
To find f(3,2), substitute x = 3 and y = 2 into the function: f(3,2) = 3(3)² − 4(2) = 3(9) − 8 = 27 − 8 = 19.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Results from incorrectly calculating 27 − 8 as 0, which is mathematically impossible.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Results from calculating 3² as 3 instead of 9, giving 3(3) − 8 = 1, not 10. This stems from a fundamental exponent error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> May result from adding instead of subtracting: 27 − 8 ≠ 24, or from calculation errors in the exponent.</div>
<div><strong>Choice E:</strong> Results from adding 27 + 8 = 35 instead of subtracting, or another arithmetic error.</div>
</div>
</div>`,

  // Question 77: Triangle angles - ∠BAC = 35°, ∠ABC = 95°, find ∠ACD
  77: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
In triangle ABC, the angles sum to 180°. Since ∠BAC = 35° and ∠ABC = 95°, then ∠ACB = 180° − 35° − 95° = 50°. Since points B, C, and D are collinear, angles ACB and ACD form a linear pair and sum to 180°. Therefore, ∠ACD = 180° − 50° = 130°.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Simply repeats ∠ABC without considering that ∠ACD is a different angle formed by the linear pair.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> May result from subtracting one of the given angles from 180° without first finding ∠ACB.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Results from calculation errors in the triangle or linear pair relationships.</div>
<div><strong>Choice K:</strong> Results from subtracting 35° from 180° without properly calculating ∠ACB first.</div>
</div>
</div>`,

  // Question 78: Simplify −(36x⁴y³)/(4xy)
  78: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Simplify by dividing coefficients and subtracting exponents: −(36x⁴y³)/(4xy) = −(36/4)(x⁴⁻¹)(y³⁻¹) = −9x³y². However, this appears to have an error in the question or answer choices, as the given correct answer E (9x³y²) is positive, not negative. The mathematical simplification gives −9x³y², but if the expression had a double negative or different initial form, the answer would be 9x³y².
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Incorrectly calculates the coefficient as −40 instead of −9 or 9.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Incorrectly calculates the coefficient as −32 instead of −9 or 9.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Incorrectly adds exponents instead of subtracting: x⁴⁺¹ and y³⁺¹ instead of x⁴⁻¹ and y³⁻¹.</div>
<div><strong>Choice D:</strong> Fails to subtract exponents, keeping the original exponents instead of simplifying.</div>
</div>
</div>`,

  // Question 79: Cost calculation - $0.75 per 100 points + $20 fee for 7,000 points
  79: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
First, find how many sets of 100 points are in 7,000: 7,000 ÷ 100 = 70. Then calculate the variable cost: 70 × $0.75 = $52.50. Finally, add the one-time processing fee: $52.50 + $20.00 = $72.50.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Far too low; likely calculated only a fraction of the transfer cost plus the fee.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Only calculates 70 × $0.75 = $52.50 plus approximately $15, missing the full $20 processing fee or making a calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Miscalculates the per-point cost or incorrectly applies the formula.</div>
<div><strong>Choice K:</strong> May have incorrectly calculated the variable cost as $75 instead of $52.50, then added the $20 fee.</div>
</div>
</div>`,

  // Question 80: Evaluate 4x² − 11x when x = −5
  80: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Substitute x = −5 into the expression: 4(−5)² − 11(−5). Calculate the exponent first: (−5)² = 25. Then: 4(25) − 11(−5) = 100 − (−55) = 100 + 55 = 155.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Results from sign errors and incorrect handling of negative numbers throughout the calculation.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> May result from calculating 4(−5)² as −100 instead of 100, giving −100 − (−55) = −100 + 55 = −45, not −84.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Results from treating (−5)² as −25 instead of 25, giving 4(−25) − 11(−5) = −100 + 55 = −45.</div>
<div><strong>Choice D:</strong> Results from calculating 100 − (−55) as 100 − 55 = 45 or other sign errors.</div>
</div>
</div>`,
};

module.exports = { mathExplanations };
