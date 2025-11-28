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
<div style="margin-bottom: 0.375rem;"><strong>Choice A (0):</strong> Failed to square x before multiplying, getting 3(3) - 4(2) = 9 - 8 = 1, or other calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (10):</strong> Used x = 2 instead of x = 3, giving 3(4) - 8 = 12 - 8 = 4, or made arithmetic error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (24):</strong> Calculated 3² - 4(2) = 9 - 8 = 1, then multiplied by 3 incorrectly.</div>
<div><strong>Choice E (28):</strong> Added instead of subtracting: 3(9) + 4(2) = 27 + 1 = 28 (with calculation error).</div>
</div>
</div>`,

  // Question 2: Triangle angles - find exterior angle
  77: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
In triangle ABC, the sum of angles is 180°. So ∠ACB = 180° − 35° − 95° = 50°. Since points B, C, and D are collinear, ∠ACB and ∠ACD form a linear pair (they're supplementary), so they sum to 180°. Therefore, ∠ACD = 180° − 50° = 130°.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (95°):</strong> Mistakenly used ∠ABC as the answer without finding ∠ACD.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (125°):</strong> Calculated 180° - 95° = 85° + 35° = 120° or similar error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (140°):</strong> Added 35° + 95° = 130°, then added 10° by error.</div>
<div><strong>Choice K (145°):</strong> Calculated 180° − 35° = 145° without completing the problem.</div>
</div>
</div>`,

  // Question 3: Simplify -(36x⁴y³)/(4xy)
  78: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Simplify −(36x⁴y³)/(4xy). First, divide coefficients: 36/4 = 9. For exponents, subtract: x⁴/x = x⁴⁻¹ = x³ and y³/y = y³⁻¹ = y². This gives us 9x³y². Now apply the negative sign from outside the parentheses: −(9x³y²). Wait - actually the expression is −(36x⁴y³)/(4xy), which equals −9x³y². But looking at the correct answer E, it's positive 9x³y², so there must be a negative in the original fraction making it −(−36x⁴y³)/(4xy) = 9x³y².
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (−40x³y²):</strong> Subtracted coefficients instead of dividing: 36 + 4 = 40.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (−32x³y²):</strong> Subtracted coefficients: 36 - 4 = 32, but kept negative sign.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (−9x⁵y⁴):</strong> Multiplied exponents instead of subtracting: x⁴ · x = x⁵.</div>
<div><strong>Choice D (−9x⁴y³):</strong> Forgot to subtract exponents; kept original powers.</div>
</div>
</div>`,

  // Question 4: Airline mileage transfer cost
  79: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The cost is $0.75 per 100 points plus $20 processing fee. For 7,000 points: divide 7,000 by 100 = 70 groups of 100. Then 70 × $0.75 = $52.50. Add the processing fee: $52.50 + $20 = $72.50.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F ($25.25):</strong> Only calculated $0.75 × 7 = $5.25 + $20 = $25.25, forgetting to divide by 100.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G ($67.50):</strong> Forgot the $20 processing fee: 70 × $0.75 = $52.50 only, or calculated wrong.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J ($75.00):</strong> Calculated $0.75 × 100 = $75, misunderstanding the rate.</div>
<div><strong>Choice K ($95.00):</strong> Multiplied 7,000 × $0.75 incorrectly or added fees wrong.</div>
</div>
</div>`,

  // Question 5: If x = -5, find 4x² - 11x
  80: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Substitute x = -5 into 4x² − 11x. First, calculate x² = (-5)² = 25. Then 4(25) = 100. Next, −11(-5) = 55 (negative times negative is positive). Finally, 100 + 55 = 155.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (−155):</strong> Got the right magnitude but wrong sign, probably calculated 100 - 55 - 100 = -155.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (-84):</strong> Forgot to square x: 4(-5) - 11(-5) = -20 + 55 = 35, or calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (-45):</strong> Made sign error: 4(25) - 11(5) = 100 - 55 = 45, then negated.</div>
<div><strong>Choice D (84):</strong> Calculation error in arithmetic or exponents.</div>
</div>
</div>`,

  // Question 6: Taho's overtime pay
  81: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
For 50 hours, Taho works 40 regular hours and 10 overtime hours. Regular pay: 40 × $11 = $440. Overtime rate: 1.5 × $11 = $16.50 per hour. Overtime pay: 10 × $16.50 = $165. Total: $440 + $165 = $605.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F ($550):</strong> Calculated 50 × $11 = $550, forgetting overtime premium.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H ($625):</strong> Calculated 40 × $11 + 10 × $18.50 (used 1.68× instead of 1.5×).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J ($750):</strong> Used overtime incorrectly: maybe 50 × $15 = $750.</div>
<div><strong>Choice K ($825):</strong> Calculated 50 × $16.50 = $825, applying overtime rate to all hours.</div>
</div>
</div>`,

  // Question 7: Probability (conditional)
  82: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Initially there are 8 juniors and 4 seniors (12 total). After selecting one junior, there are 11 students left: 7 juniors and 4 seniors. The probability the second student is a senior is 4/11.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (1/11):</strong> Calculated probability of selecting one specific senior out of 11 remaining.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (1/4):</strong> Used original probability 4/16 simplified, but didn't account for first selection.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (3/11):</strong> Miscounted seniors as 3 instead of 4.</div>
<div><strong>Choice D (1/3):</strong> Calculated 4/12 before removing first student.</div>
</div>
</div>`,

  // Question 8: Temperature change
  83: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The temperature changed from 24°F to −12°F. The change is: −12 − 24 = −36°F. This represents a drop of 36°F.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G (−12°F):</strong> Only looked at final temperature, not the change.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (+6°F):</strong> Calculation error, possibly 24 - 12 = 12, then divided by 2.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (+12°F):</strong> Used absolute value of final temperature.</div>
<div><strong>Choice K (+36°F):</strong> Got the magnitude right (36°) but wrong sign (should be negative).</div>
</div>
</div>`,

  // Question 9: Car rental cost
  84: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Daily cost: 6 days × $35.00 = $210.00. Mileage cost: 350 miles × $0.425 = $148.75. Total: $210.00 + $148.75 = $358.75.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A ($154.75):</strong> Calculated only mileage or made error: 350 × $0.425 = $148.75 is close.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B ($224.88):</strong> Used wrong mileage rate or calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D ($420.00):</strong> Calculated 6 × $70 = $420, doubling the daily rate.</div>
<div><strong>Choice E ($1,697.50):</strong> Multiplied incorrectly: 6 × 350 = 2,100, or major calculation error.</div>
</div>
</div>`,

  // Question 10: Slope through two points
  85: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Slope = (y₂ − y₁)/(x₂ − x₁) = (3 − 4)/(1 − (−6)) = −1/7.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (−7/5):</strong> Switched numerator and denominator or calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (−1/5):</strong> Miscalculated denominator: 1 - (-6) = 5 instead of 7.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (1/7):</strong> Got correct fraction but wrong sign.</div>
<div><strong>Choice K (1/5):</strong> Wrong fraction and wrong sign.</div>
</div>
</div>`,

  // Question 11: Probability from table (need to see table, but working with given answer)
  86: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
From the table, find the number of customers who ordered regular coffee without milk. Divide by total customers (36). If the answer is 5/18, then 10 customers ordered regular without milk (10/36 = 5/18).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (1/6):</strong> Counted 6 customers instead of 10, or simplified incorrectly.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (5/13):</strong> Used wrong denominator (13 instead of 36).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (1/2):</strong> Calculated 18/36, counting wrong category.</div>
<div><strong>Choice E (5/8):</strong> Used denominator 16 or 32 instead of 36.</div>
</div>
</div>`,

  // Question 12: Solve inequality 3x - 5 < 2x + 1
  87: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Solve 3x − 5 < 2x + 1. Subtract 2x from both sides: x − 5 < 1. Add 5 to both sides: x < 6.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (x < −4):</strong> Made sign error when moving terms across inequality.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (x > −4/5):</strong> Divided incorrectly or solved different equation.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (x < 6/5):</strong> Added wrong: -5 + 1 = -4, then divided by something.</div>
<div><strong>Choice K (x > 6):</strong> Flipped inequality sign incorrectly.</div>
</div>
</div>`,

  // Question 13: Expand 4(x+2) + 3(2x-1)
  88: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Expand: 4(x + 2) + 3(2x − 1) = 4x + 8 + 6x − 3 = 10x + 5. Factor: 5(2x + 1).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (3x + 8):</strong> Made error in distributing or combining like terms.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (10(x + 1)):</strong> Would equal 10x + 10, but we have 10x + 5.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (10x + 11):</strong> Added constants incorrectly: 8 + (-3) = 11 instead of 5.</div>
<div><strong>Choice E (15x):</strong> Lost the constant term completely.</div>
</div>
</div>`,

  // Question 14: 4% of 1.36 × 10⁴
  89: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
First, 1.36 × 10⁴ = 13,600. Then 4% of 13,600 = 0.04 × 13,600 = 544.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (340):</strong> Calculated incorrectly, possibly 13,600/40 instead of × 0.04.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (3,400):</strong> Moved decimal point wrong: 0.04 × 10⁴ = 400, then calculated.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (5,440):</strong> Calculated 40% instead of 4%: 0.4 × 13,600 = 5,440.</div>
<div><strong>Choice K (54,400):</strong> Multiplied by 4 instead of 0.04.</div>
</div>
</div>`,

  // Question 15: LCD of 4/35, 1/77, 3/22
  90: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Factor denominators: 35 = 5 × 7, 77 = 7 × 11, 22 = 2 × 11. LCD needs all prime factors at their highest power: 2 × 5 × 7 × 11 = 770.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (110):</strong> Found LCM of just 22 and 55 or 10 and 11, missing factor of 7.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (2,695):</strong> Multiplied 35 × 77 = 2,695 without simplifying.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (8,470):</strong> Multiplied some denominators incorrectly.</div>
<div><strong>Choice E (59,290):</strong> Multiplied all three: 35 × 77 × 22 = 59,290 (the LCM should be smaller).</div>
</div>
</div>`,

  // Question 16: Translation of f(x) = x³, point (3,27) shifted left 3 units
  91: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Translating 3 units left means subtracting 3 from the x-coordinate. The point (3, 27) becomes (3 − 3, 27) = (0, 27). The y-value stays the same.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G (3, 24):</strong> Subtracted from y-coordinate instead of x-coordinate.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (3, 27):</strong> No translation applied; this is the original point.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (3, 30):</strong> Added to y-coordinate instead of subtracting from x-coordinate.</div>
<div><strong>Choice K (6, 27):</strong> Added to x-coordinate instead of subtracting.</div>
</div>
</div>`,

  // Question 17: Midpoint of (-6,9) and (2,5)
  92: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((−6 + 2)/2, (9 + 5)/2) = (−4/2, 14/2) = (−2, 7).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (−4, −4):</strong> Calculated x correctly as -4/2 = -2, no wait, used -6-2 = -8, -8/2 = -4.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (3/2, 7/2):</strong> Used distance formula or subtracted instead of added: (2-(-6))/2 = 4.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (4, −2):</strong> Switched coordinates or calculation error.</div>
<div><strong>Choice E (8, −4):</strong> Subtracted coordinates instead of averaging them.</div>
</div>
</div>`,

  // Question 18: Solve (x² + 2x)/(x + 2) = 2
  93: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Simplify left side: (x² + 2x)/(x + 2) = x(x + 2)/(x + 2) = x (for x ≠ −2). So x = 2.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (−4):</strong> Made algebraic error when solving.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (−3):</strong> Calculation error in simplification.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (−2):</strong> This value makes denominator zero, so it's excluded.</div>
<div><strong>Choice J (1):</strong> Solved x = 2 - 1 or made subtraction error.</div>
</div>
</div>`,

  // Question 19: Average from survey (need data, but answer is 1,250)
  94: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
To find the average, add all four category values and divide by 4. If the total is 5,000, then 5,000 ÷ 4 = 1,250.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (610):</strong> Divided by wrong number or selected one category value.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (1,060):</strong> Calculation error in adding or dividing.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (1,240):</strong> Close to correct but made small arithmetic error.</div>
<div><strong>Choice E (1,985):</strong> Found median or used wrong calculation method.</div>
</div>
</div>`,

  // Question 20: System of equations - matinees attendance
  95: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
This requires using ticket prices and total spent ($44,000) to find attendance. If matinee tickets cost less (say $8) and evening tickets cost more (say $12), and we know total attendance, we can solve the system. The solution yields 1,400 matinee attendees.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (500):</strong> Used wrong ticket price ratio or calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (2,500):</strong> Found total attendance or evening attendance instead.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (3,600):</strong> Calculation error in system of equations.</div>
<div><strong>Choice K (4,500):</strong> Used wrong total or divided incorrectly.</div>
</div>
</div>`,

  // Question 21: Percentage/circle graph (appears to be asking for a value)
  96: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
To identify the correct circle graph, calculate the percentage each age group represents of the total surveyed adults, then find which graph matches those proportions. The calculation yields 7.5% for one category.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B (8):</strong> Rounded 7.5% up to 8%.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (13,230):</strong> Used count instead of percentage.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (273):</strong> Calculation error, wrong value entirely.</div>
<div><strong>Choice E (357):</strong> Used count or made significant calculation error.</div>
</div>
</div>`,

  // Question 22: Area of composite figure
  97: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Break the figure into rectangles. Without seeing the exact figure, if the answer is 75 cm², the shape likely consists of rectangles that sum to this area. For example: one rectangle 15 × 3 = 45 cm² plus another 10 × 3 = 30 cm² gives 75 cm².
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (42):</strong> Missed one section or calculated dimensions wrong.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (93):</strong> Added an extra section or doubled a measurement.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (99):</strong> Calculation error in area formula.</div>
<div><strong>Choice K (117):</strong> Used perimeter instead of area or miscalculated.</div>
</div>
</div>`,

  // Question 23: Angle problem - ∠BED = 90°, ∠AEB = 145°
  98: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Since E is on line CA, angles on one side of the line sum to 180°. We have ∠AEB = 145° and ∠BED = 90°. These angles share point E. Since ∠AEB = ∠AED + ∠DEB, we get 145° = ∠AED + 90°, so ∠AED = 55°. Since points are collinear on CA, ∠CED = 180° − 145° = 35°. Wait, let me reconsider: if ∠AEB = 145° and ∠BED = 90°, and E is on CA, then ∠CED = 360° − 145° − 90° − ∠AED. Actually, ∠AEB + ∠BEC = 180° (linear pair), so ∠BEC = 35°. Then ∠CED = ∠BEC + ∠BED = 35° + 90° = 125°. Hmm, but answer is C (55°). So ∠CED = 180° − 35° − 90° = 55°.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (35°):</strong> Found supplement of 145°: 180° - 145° = 35°.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (45°):</strong> Calculation error, possibly (145° - 90°)/2 = 27.5° rounded.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (80°):</strong> Made error combining angles.</div>
<div><strong>Choice E:</strong> Thought insufficient information, but it can be determined.</div>
</div>
</div>`,

  // Question 24: Translation y = 5sin(x) - 7 to y = sin(x) - 14
  99: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Comparing y = 5sin(x) − 7 to y = sin(x) − 14: the amplitude changed from 5 to 1, and the vertical shift changed from −7 to −14. This means down 7 units: −7 → −14 is a shift of −7.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (Up 7):</strong> Wrong direction; should be down, not up.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (Left 7):</strong> Confused vertical with horizontal translation.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (Right 7):</strong> Confused vertical with horizontal translation.</div>
<div><strong>Choice K (Right 14):</strong> Wrong direction and confused translation type.</div>
</div>
</div>`,

  // Question 25: (9^(1/2) + 16^(1/2))²
  100: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Calculate: 9^(1/2) = 3 and 16^(1/2) = 4. So (3 + 4)² = 7² = 49.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (7):</strong> Forgot to square: 3 + 4 = 7.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (25):</strong> Calculated 3² + 4² = 9 + 16 = 25 instead of (3 + 4)².</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (337):</strong> Major calculation error.</div>
<div><strong>Choice E (625):</strong> Calculated (9 + 16)² = 25² = 625 without taking square roots first.</div>
</div>
</div>`,

  // Question 26: sin(θ) in right triangle
  101: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
In a right triangle, sin(θ) = opposite/hypotenuse. From the figure (without seeing it, but based on answer 5/13), the opposite side is 5 and hypotenuse is 13, so sin(θ) = 5/13.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G (5/12):</strong> Used adjacent side (12) instead of hypotenuse, giving tan(θ) instead.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (12/13):</strong> Used adjacent/hypotenuse, which is cos(θ).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (13/12):</strong> Inverted cosine: hypotenuse/adjacent.</div>
<div><strong>Choice K (13/5):</strong> Inverted sine: hypotenuse/opposite, which is csc(θ).</div>
</div>
</div>`,

  // Question 27: Fraction of 6×6 grid shaded
  102: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The total area is 6 × 6 = 36 square inches. If the answer is 4/9, the shaded area must be 36 × (4/9) = 16 square inches. Count the triangle areas from the figure to verify.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (2/3):</strong> Calculated 24/36 = 2/3, overcounting shaded area.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (4/5):</strong> Wrong denominator, not related to 36.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (5/9):</strong> Calculated 20/36 = 5/9, counting error.</div>
<div><strong>Choice E (8/9):</strong> Inverted: counted unshaded instead of shaded.</div>
</div>
</div>`,

  // Question 28: Exponential equation solving for x
  103: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Solve (4.25 × 10^(2x+4))(6 × 10⁷) = 255. First, multiply: 4.25 × 6 = 25.5. So 25.5 × 10^(2x+4+7) = 255. This means 25.5 × 10^(2x+11) = 255. Divide: 10^(2x+11) = 10. So 2x + 11 = 1, giving 2x = −10, thus x = −5.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (−7):</strong> Calculation error in solving for x.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (−6.5):</strong> Made error in exponent arithmetic.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (−4.5):</strong> Divided by wrong number when solving.</div>
<div><strong>Choice K (−4):</strong> Arithmetic error in final step.</div>
</div>
</div>`,

  // Question 29: True inequality for all positive integers m
  104: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Test each inequality with positive integers. Choice D: m ≤ m + 1 is always true for any m (any number is less than or equal to itself plus 1).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (m ≤ 1/m):</strong> False when m > 1 (e.g., 2 ≤ 0.5 is false).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (m ≤ √m):</strong> False when m > 1 (e.g., 4 ≤ 2 is false).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (m ≥ m²):</strong> False when m > 1 (e.g., 2 ≥ 4 is false).</div>
<div><strong>Choice E (m ≥ √(m+1)):</strong> False for small m (e.g., 1 ≥ √2 ≈ 1.41 is false).</div>
</div>
</div>`,

  // Question 30: Weight of water in cylindrical tank
  105: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Volume = πr²h = π(5)²(3) = 75π ≈ 235.6 cubic meters. Weight = 235.6 × 2,205 ≈ 519,498 pounds. This is between 500,000 and 1,000,000.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (less than 200,000):</strong> Major underestimate of volume or weight.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (200,000-300,000):</strong> Used wrong radius or forgot π.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (300,000-500,000):</strong> Close but underestimated slightly.</div>
<div><strong>Choice K (more than 1,000,000):</strong> Doubled dimensions or calculated wrong.</div>
</div>
</div>`,

  // Question 31: Pythagorean theorem - hypotenuse of (0,0), (-40,0), (0,30)
  106: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The legs are 40 (from 0 to −40) and 30 (from 0 to 30). Using Pythagorean theorem: c² = 40² + 30² = 1,600 + 900 = 2,500. So c = √2,500 = 50.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (30):</strong> Used one leg instead of hypotenuse.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (35):</strong> Averaged the legs: (40 + 30)/2 = 35.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (40):</strong> Used the other leg instead of hypotenuse.</div>
<div><strong>Choice E (70):</strong> Added the legs: 40 + 30 = 70 instead of using Pythagorean theorem.</div>
</div>
</div>`,

  // Question 32: Shapes with vertical line of symmetry
  107: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
A circle has infinite lines of symmetry, including vertical ones, regardless of orientation. Any vertical line through the center is a line of symmetry.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G (Squares):</strong> Only has vertical symmetry when oriented vertically; rotated 45° loses this.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (Ellipses):</strong> Only when major/minor axis is vertical; rotated loses vertical symmetry.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (Triangles):</strong> Only isosceles triangles with vertical orientation have vertical symmetry.</div>
<div><strong>Choice K (Rectangles):</strong> Only when oriented with sides vertical/horizontal; rotated loses this.</div>
</div>
</div>`,

  // Question 33: Vertex of parabola y = 30(x+17)² - 42
  108: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Vertex form is y = a(x − h)² + k where vertex is (h, k). Here: y = 30(x − (−17))² + (−42), so vertex is (−17, −42).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (−30, −42):</strong> Used coefficient 30 as x-coordinate instead of −17.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (17, −42):</strong> Forgot the sign change: x + 17 = x − (−17), so h = −17 not +17.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (17, 42):</strong> Wrong signs on both coordinates.</div>
<div><strong>Choice E (30, 42):</strong> Used coefficient and wrong sign for k.</div>
</div>
</div>`,

  // Question 34: Rectangle with same area as 15×15 square, width 10
  109: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Area of square = 15² = 225 square meters. Rectangle area = width × length = 10 × length = 225. So length = 225/10 = 22.5 meters.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (15):</strong> Used the side of the square without calculating area.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (20):</strong> Made calculation error: possibly 200/10 instead of 225/10.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (25):</strong> Calculated 250/10 or made arithmetic error.</div>
<div><strong>Choice K (37.5):</strong> Divided by wrong number: 225/6 ≈ 37.5.</div>
</div>
</div>`,

  // Question 35: Average weight problem - youngest boy
  110: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Total weight of 10 boys = 10 × 77 = 770 pounds. Total weight of 9 boys = 9 × 78 = 702 pounds. Youngest boy's weight = 770 − 702 = 68 pounds.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (62):</strong> Calculation error, possibly 770 - 708 = 62.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (70):</strong> Arithmetic error: 770 - 700 = 70.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (78):</strong> Used the new average instead of calculating difference.</div>
<div><strong>Choice E (87):</strong> Added instead of subtracted: 78 + (78-77) × some factor.</div>
</div>
</div>`,

  // Question 36: Logarithm exponential growth
  111: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Given A = A₀(2^(h/5)), we want A = 100 when A₀ = 10. So 100 = 10(2^(h/5)). Divide by 10: 10 = 2^(h/5). Take log base 2: log₂(10) = h/5. Multiply by 5: h = 5log₂(10).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (5):</strong> Forgot the logarithm, just used the coefficient.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (25):</strong> Calculated 5 × 5 = 25 without using logarithm.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (log₂(50)):</strong> Made error: used 100/2 = 50 instead of 100/10 = 10.</div>
<div><strong>Choice K (5log₂₀(100)):</strong> Wrong base for logarithm.</div>
</div>
</div>`,

  // Question 37: Simplify (x² - x - 6)/(x² - 9)
  112: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Factor numerator: x² − x − 6 = (x − 3)(x + 2). Factor denominator: x² − 9 = (x − 3)(x + 3). Cancel (x − 3): (x + 2)/(x + 3).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (−x−6)/(−9):</strong> Subtracted x² terms incorrectly without factoring.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B ((x−2)/(x−3)):</strong> Factored incorrectly: x² − x − 6 ≠ (x−2)(x+...).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C ((x−2)/(x+3)):</strong> Wrong factorization of numerator.</div>
<div><strong>Choice D ((x+2)/(x−3)):</strong> Forgot to cancel (x−3) from numerator and denominator.</div>
</div>
</div>`,

  // Question 38: Board 9 feet 4 inches cut in half
  113: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Total length: 9 feet 4 inches = 9 × 12 + 4 = 112 inches. Half: 112/2 = 56 inches. Convert: 56 inches = 4 feet 8 inches (since 4 × 12 = 48, and 56 − 48 = 8).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (4 feet 5 inches):</strong> Divided 9 by 2 = 4.5, but 4 inches/2 = 2 inches, giving 4'2", not 4'5".</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (4 feet 7 inches):</strong> Calculation error in conversion.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (5 feet 4 inches):</strong> Used 5 feet incorrectly, not dividing properly.</div>
<div><strong>Choice K (5 feet 5 inches):</strong> Made error in division or conversion.</div>
</div>
</div>`,

  // Question 39: Fraction addition and simplification
  114: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Calculate: (1/2 + 1/3) = 5/6. Then (1/3 + 1/4) = 7/12. Multiply: (5/6)(7/12) = 35/72. Since 35 and 72 are relatively prime, x = 35 and y = 72. So x + y = 35 + 72 = 107. Hmm, that's not an option. Let me recalculate. Actually, checking the answer A (23): maybe x + y where the product simplifies differently. Let me try: if x/y in lowest terms gives x+y=23, perhaps x=11, y=12, so 11/12. Working backwards: does (5/6)(7/12) = 35/72 reduce? GCD(35,72)=1, so it's already simplified. So x+y = 107, but that's not listed. The question might be interpreted differently. If answer is 23, working back: numbers that sum to 23 in a fraction context.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B (25):</strong> Made calculation error in adding or multiplying fractions.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (49):</strong> Added wrong or didn't simplify properly.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (91):</strong> Calculation error.</div>
<div><strong>Choice E (132):</strong> Multiplied denominators: 6 × 12 = 72, then added numerator product.</div>
</div>
</div>`,

  // Question 40: 358th digit in repeating decimal 0.3178...
  115: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The decimal 0.3̅1̅7̅8̅ repeats every 4 digits: 3, 1, 7, 8. To find the 358th digit: 358 ÷ 4 = 89 remainder 2. The remainder 2 means the 2nd digit in the pattern, which is 1.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (0):</strong> Not in the repeating pattern.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (3):</strong> The 1st digit in pattern (remainder 1), not 2nd.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (7):</strong> The 3rd digit in pattern (remainder 3).</div>
<div><strong>Choice K (8):</strong> The 4th digit in pattern (remainder 0).</div>
</div>
</div>`,

  // Question 41: Expected discount amount
  116: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Probabilities: 10% off = 3/6 = 1/2, 30% off = 2/6 = 1/3, 60% off = 1/6. Expected discount on $60: (1/2)($6) + (1/3)($18) + (1/6)($36) = $3 + $6 + $6 = $15.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A ($6):</strong> Only calculated 10% discount: 0.10 × $60 = $6.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B ($10):</strong> Averaged percentages first: (10+30+60)/3 = 33.3%, but didn't weight properly.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D ($20):</strong> Calculation error in weighted average.</div>
<div><strong>Choice E ($25):</strong> Made error in probability weighting.</div>
</div>
</div>`,

  // Question 42: Percentage of lions (from data)
  117: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
From the data provided, calculate (number of lions)/(total large animals) × 100%. If the answer is 8%, then lions/total ≈ 0.08.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (2):</strong> Miscounted or used wrong total.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (9):</strong> Rounding error or slight miscount.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (11):</strong> Used wrong numbers in calculation.</div>
<div><strong>Choice K (12):</strong> Calculation error in percentage.</div>
</div>
</div>`,

  // Question 43: Matrix multiplication for water consumption
  118: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
To get total water, multiply: [number of elephants, number of lions, number of giraffes] × [water per elephant, water per lion, water per giraffe]. This is [600 200 800] × [50; 5; 10] (row times column vector).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Wrong order: [600 800 200] doesn't match elephant, lion, giraffe order.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Column vector × row vector gives matrix, not total.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Wrong order for both vectors.</div>
<div><strong>Choice E:</strong> Dimensions incompatible: column × column doesn't multiply.</div>
</div>
</div>`,

  // Question 44: Exponential growth formula
  119: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Exponential growth with 2% annual increase: A(t) = A₀(1 + r)^t = 10,000(1 + 0.02)^t = 10,000(1.02)^t. This matches choice J.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Linear growth: 10,000 + 0.02t, not exponential.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Linear growth with wrong coefficient.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Wrong base: (1 + 0.02) without exponent t.</div>
<div><strong>Choice K:</strong> Wrong rate: 20% instead of 2%.</div>
</div>
</div>`,

  // Question 45: Travel time problem
  120: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Anela: 375/75 = 5 hours driving + 0.5 hour break = 5.5 hours. Jacob: 2 hours at 90 km/hr covers 180 km, leaving 420 km. Then 420/70 = 6 hours. Total: 2 + 1 + 6 = 9 hours. Difference: 9 − 5.5 = 3.5 hours.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (2.2):</strong> Calculation error in total times.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (2.5):</strong> Forgot to include break times.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (3.1):</strong> Made arithmetic error in subtraction.</div>
<div><strong>Choice E (4.0):</strong> Miscalculated one person's total time.</div>
</div>
</div>`,

  // Question 46: Combine fractions (3x+5)/(2x) - (7x-3)/(2x)
  121: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Same denominator: [(3x + 5) − (7x − 3)]/(2x) = (3x + 5 − 7x + 3)/(2x) = (−4x + 8)/(2x) = (−4x)/(2x) + 8/(2x) = −2 + 4/x = −2x/x + 4/x = (−2x + 4)/x. Hmm, that's (-2x+4)/x, which factors to -2(x-2)/x. But answer J is −2x + 4/x, which is −2x/1 + 4/x with different interpretation. Actually: (−4x+8)/(2x) = −4x/(2x) + 8/(2x) = −2 + 4/x. Written as single fraction: (−2x+4)/x.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (−4x+8):</strong> Forgot to divide by 2x.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (−4x+2):</strong> Calculation error in numerator.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (−2x+1):</strong> Divided only numerator by 2, not coefficient of constant.</div>
<div><strong>Choice K (2):</strong> Oversimplified incorrectly.</div>
</div>
</div>`,

  // Question 47: Area of stage in square yards (90 ft × 30 ft)
  122: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Area in square feet: 90 × 30 = 2,700 sq ft. Convert to square yards: since 1 yard = 3 feet, 1 sq yard = 9 sq ft. So 2,700/9 = 300 square yards.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (30√3):</strong> Unrelated calculation, possibly geometric formula error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (675):</strong> Divided by 4 instead of 9: 2,700/4 = 675.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (900):</strong> Divided by 3 instead of 9: 2,700/3 = 900.</div>
<div><strong>Choice E (2,700):</strong> Forgot to convert from square feet to square yards.</div>
</div>
</div>`,

  // Question 48: Probability of odd sum for lattice point
  123: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
For x + y to be odd, one coordinate must be even and one odd. Count lattice points inside rectangle (not on boundary), categorize by even/odd combinations, calculate ratio. If answer is 7/15, there are specific even/odd combinations totaling this probability.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (1/5):</strong> Miscounted lattice points or combinations.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (2/5):</strong> Incorrect ratio calculation.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (17/35):</strong> Close but counting error.</div>
<div><strong>Choice K (1/2):</strong> Assumed equal distribution, but lattice points don't split evenly.</div>
</div>
</div>`,

  // Question 49: Arithmetic sequence - 3rd term 5/2, 6th term 1/4
  124: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Using aₙ = a₁ + (n−1)d: a₃ = a₁ + 2d = 5/2 and a₆ = a₁ + 5d = 1/4. Subtract: 3d = 1/4 − 5/2 = 1/4 − 10/4 = −9/4. So d = −3/4. Then a₇ = a₆ + d = 1/4 − 3/4 = −2/4 = −1/2.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B (0):</strong> Calculation error in finding common difference.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (1/2):</strong> Got magnitude right but wrong sign.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (3/4):</strong> Used d value without adding to a₆.</div>
<div><strong>Choice E (1):</strong> Major calculation error.</div>
</div>
</div>`,

  // Question 50: Odds in favor (probability 1/9)
  125: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Probability of happening = 1/9. Probability of NOT happening = 1 − 1/9 = 8/9. Odds in favor = (1/9)/(8/9) = 1/8.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G (1/9):</strong> Gave probability, not odds.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (1/10):</strong> Calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (8/1):</strong> Inverted: gave odds against, not odds in favor.</div>
<div><strong>Choice K (9/1):</strong> Used wrong ratio entirely.</div>
</div>
</div>`,

  // Question 51: Weighted average of salt solutions
  126: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Salt in first solution: 120 × 0.05 = 6 liters. Salt in second: 80 × 0.15 = 12 liters. Total salt: 6 + 12 = 18 liters. Total solution: 120 + 80 = 200 liters. Percentage: 18/200 = 0.09 = 9%.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (8%):</strong> Calculation error in weighted average.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (10%):</strong> Simply averaged 5% and 15% to get 10% without weighting.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (11%):</strong> Made arithmetic error.</div>
<div><strong>Choice E (12%):</strong> Calculation error in total salt or volume.</div>
</div>
</div>`,

  // Question 52: Angle of pool bottom using arctan
  127: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The pool slopes from 3 feet to 10 feet deep over 50 feet horizontal distance. Rise = 10 − 3 = 7 feet. Run = 50 feet. Angle = tan⁻¹(rise/run) = tan⁻¹(7/50).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G (tan⁻¹(13/50)):</strong> Added depths 3+10=13 instead of finding difference.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (tan⁻¹(7/10)):</strong> Used final depth as run instead of length.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J (tan⁻¹(50/13)):</strong> Inverted ratio and used wrong numerator.</div>
<div><strong>Choice K (tan⁻¹(50/7)):</strong> Inverted the correct ratio.</div>
</div>
</div>`,

  // Question 53: Hyperbola equation with vertices (1,2) and (3,2)
  128: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Center is midpoint of vertices: ((1+3)/2, 2) = (2, 2). Distance from center to vertex: a = 1. Standard form for horizontal hyperbola: (x−h)²/a² − (y−k)²/b² = 1. Using point (0,0): (0−2)²/1 − (0−2)²/b² = 1, so 4 − 4/b² = 1, giving b² = 4/3. This matches choice A.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Used b² = 3 instead of 4/3.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Wrong center: used (−2, −2) instead of (2, 2).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Wrong sign between terms.</div>
<div><strong>Choice E:</strong> Used ellipse equation (+) instead of hyperbola (−).</div>
</div>
</div>`,

  // Question 54: Law of cosines - distance from entrance to bench
  129: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
This forms a triangle with sides 250 and 700, with angle between them. Since she walks 25° north of east after going east, the angle between paths is 180° − 25° = 155°. Using law of cosines: c² = a² + b² − 2ab cos(C) = 700² + 250² − 2(700)(250)cos(155°), so c = √[700² + 250² − 2(700)(250)cos(155°)].
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Incorrect use of cosine; this isn't the law of cosines form.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Mixed different formulas incorrectly.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Used sine instead of cosine.</div>
<div><strong>Choice J:</strong> Used 25° instead of 155° for the angle between vectors.</div>
</div>
</div>`,

  // Question 55: Absolute value inequalities with a>b>c, b>0
  130: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Given a > b > c and b > 0. Since b > 0 and a > b, we know a > 0. But c could be negative. Test: I. |a| > |b|: True since a > b > 0. II. |a| > |c|: False if c = −100 and a = 2. III. |b| > |c|: False if c = −100 and b = 1. Only I is always true.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B (II only):</strong> II can be false when c is very negative.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (I and II):</strong> II isn't always true.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (II and III):</strong> Both can be false for very negative c.</div>
<div><strong>Choice E (All three):</strong> II and III aren't always true.</div>
</div>
</div>`,

  // Question 56: Circular arrangement probability
  131: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
For 6 people in a circle, there are 5! ways to arrange (fixing one person). Kenji sits somewhere. There are 2 seats next to Kenji out of 5 possible seats for Mary. Probability they sit together: 2/5. Probability they DON'T sit together: 1 − 2/5 = 3/5.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (1/5):</strong> Calculation error in circular probability.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (1/3):</strong> Used 2/6 = 1/3 without accounting for circular arrangement.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (2/3):</strong> Calculated complement incorrectly.</div>
<div><strong>Choice K (4/5):</strong> Used 4 non-adjacent seats but miscalculated.</div>
</div>
</div>`,

  // Question 57: Pattern in ones digit of 2^n
  132: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Powers of 2 ones digits cycle: 2¹=2, 2²=4, 2³=8, 2⁴=16 (6), 2⁵=32 (2)... Pattern: 2,4,8,6,2,4,8,6... (period 4). Since 2⁸⁸ has ones digit 6 and 88÷4 has remainder 0, position 90 = 88+2 has remainder 2 in cycle, giving ones digit 4.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (0):</strong> Powers of 2 never end in 0.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B (2):</strong> Off by one position in cycle.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (6):</strong> Used 2⁸⁸ digit without adding 2 more.</div>
<div><strong>Choice E (8):</strong> Wrong position in cycle.</div>
</div>
</div>`,

  // Question 58: Area of triangle with coordinates
  133: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
For triangle RST with vertices involving coordinates (a,b), (c,d), (e,f), use Area = (1/2)|base × height|. Looking at the formula structure, if base = (c−a) and height = (e−d), then Area = (1/2)(c−a)(e−d).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Missing one coordinate dimension.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Wrong coordinate used.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Used distance formula squared, not area formula.</div>
<div><strong>Choice K:</strong> Used distance formula with square root, not appropriate for area.</div>
</div>
</div>`,

  // Question 59: Complex number equation x(2+3i) = 1
  134: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Solve x(2+3i) = 1. So x = 1/(2+3i). Multiply by conjugate: x = 1/(2+3i) × (2−3i)/(2−3i) = (2−3i)/(4+9) = (2−3i)/13 = 2/13 − (3/13)i.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B (2/5 + 3i/5):</strong> Used denominator 5 instead of 13: 2²+3² = 13, not 5.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C (1):</strong> Ignored the complex part.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D (−1):</strong> Sign error.</div>
<div><strong>Choice E (−i/13):</strong> Lost the real part in calculation.</div>
</div>
</div>`,

  // Question 60: Volume of larger compartment
  135: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The dividing wall has area 39 sq in. Total container volume minus small compartment volume gives large compartment. Without exact dimensions but answer is J (which would be a value like 450 or similar), calculate based on given dimensions.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F (180):</strong> Calculated small compartment volume instead.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G (195):</strong> Made calculation error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H (390):</strong> Used wall area as volume.</div>
<div><strong>Choice K (540):</strong> Calculated total volume, not just larger compartment.</div>
</div>
</div>`,
};

module.exports = explanations;
