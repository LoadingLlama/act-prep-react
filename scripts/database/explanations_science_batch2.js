const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

const explanations = {
  // Question 16 - ID 191
  191: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Figure 1 shows paleowildfires during 180-160 mya when %O₂ was below 15 (around 12-13%). This contradicts the claim that paleowildfires only occurred when %O₂ was higher than 15, making this interval inconsistent with the claim.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> 250-230 mya had %O₂ above 15.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> 120-100 mya had %O₂ above 15.</div>
<div><strong>Choice J:</strong> 90-70 mya had %O₂ well above 15.</div>
</div>
</div>`,

  // Question 17 - ID 192
  192: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Figure 2 shows ignition at different %O₂ levels. Pine wood required the highest %O₂ to ignite (didn't ignite until higher levels), followed by candle, dry paper, then match which ignited at the lowest %O₂.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Match ignited at lowest %O₂, not highest.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Incorrect ordering of dry paper and pine wood.</div>
<div><strong>Choice D:</strong> Incorrect ordering, with match at end instead of beginning.</div>
</div>
</div>`,

  // Question 18 - ID 193
  193: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Figure 1 shows the bar graph of paleowildfires by time interval. The interval from 95-85 mya (which falls in the 100-90 mya interval on the graph) shows approximately 4 paleowildfires recorded.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> 9 is too high for this time interval.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> 14 represents a different, more active interval.</div>
<div><strong>Choice J:</strong> 19 is from the peak wildfire period.</div>
</div>
</div>`,

  // Question 19 - ID 194
  194: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Figure 2 shows flame duration at different %O₂ levels. At initial %O₂ of 16, dry paper sustained a flame longest among the four materials tested, burning for approximately 10-11 seconds.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Candle had shorter burn time at this %O₂.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Match burned very briefly compared to dry paper.</div>
<div><strong>Choice D:</strong> Pine wood had shorter flame duration than dry paper.</div>
</div>
</div>`,

  // Question 20 - ID 195
  195: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Student 2's explanation states purple pigment is produced when a plant "receives too little phosphorus (a nutrient)." Since phosphorus comes from soil, Student 2 would agree that soil influences stem color.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Student 1 says sunlight determines color, not soil.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Student 3 says genetics determine color, not nutrients.</div>
<div><strong>Choice J:</strong> Student 4 says genetics determine color, not soil.</div>
</div>
</div>`,

  // Question 21 - ID 196
  196: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Student 1 states plants receiving 8+ hours of sunlight produce purple pigment. If purple pigment protects from sun damage, this supports Student 1's explanation—plants exposed to most sunlight would benefit from purple stem protection.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Student 1 says high sunlight produces purple, not green stems.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Student 2 says sunlight doesn't affect stem color.</div>
<div><strong>Choice D:</strong> Student 2's explanation doesn't involve sunlight exposure.</div>
</div>
</div>`,

  // Question 22 - ID 197
  197: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
All four students state "All plants in Population A produce the green pigment chlorophyll," which is used for photosynthesis. Both green and purple-stemmed plants have chlorophyll according to all students.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Purple-stemmed plants also produce chlorophyll.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Green-stemmed plants also produce chlorophyll.</div>
<div><strong>Choice J:</strong> All students agree both types produce chlorophyll.</div>
</div>
</div>`,

  // Question 23 - ID 198
  198: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Students 1 and 2 say all plants are genetically identical with ability to produce both pigments—environmental factors determine color. Adding phosphorus wouldn't change this. Students 3 and 4 say genetics determine color, so changing environment won't affect purple-stemmed plants.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Student 1 attributes color to sunlight, not nutrients.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Student 2 attributes purple to low phosphorus—adding it might change color.</div>
<div><strong>Choice H:</strong> Student 3 says genetics determine color immutably.</div>
</div>
</div>`,

  // Question 24 - ID 199
  199: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Student 3 states QQ or Qq produces purple stems, qq produces green. If two purple parents produced some green offspring, parents must be Qq × Qq, producing 25% qq (green) offspring. Student 3's genetics explanation predicts this 3:1 ratio.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Student 1 says all plants are genetically identical.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Student 2 doesn't involve genetic inheritance.</div>
<div><strong>Choice J:</strong> Student 4 has opposite genetics—qq makes purple, so purple × purple couldn't make green.</div>
</div>
</div>`,

  // Question 25 - ID 200
  200: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Student 4 states qq produces purple, QQ or Qq produces green. Purple-stemmed (qq) × green-stemmed (QQ or Qq): if green parent is QQ, all offspring are Qq (green). If Qq, offspring are 50% Qq (green) and 50% qq (purple).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> This is the opposite—assumes Student 3's genetics.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Ignores the possibility of heterozygous green parent.</div>
<div><strong>Choice C:</strong> Wrong genetic model—doesn't match Student 4's explanation.</div>
</div>
</div>`,

  // Question 26 - ID 201
  201: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Figure 2 shows total H₂ volume produced each month. May shows approximately 3.5-4.0 L of H₂ produced, which is the value shown on the bar graph for that month.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> 1 L is too low for May's production.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> 2 L underestimates May's output.</div>
<div><strong>Choice J:</strong> 6 L is higher than May's actual production.</div>
</div>
</div>`,

  // Question 27 - ID 202
  202: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Comparing Figure 2 (H₂ production) with Table 1 (solar irradiance), both show highest values in summer months (June-July) and lowest in winter months (December-January), indicating H₂ production increased as solar irradiance increased.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The data shows the opposite trend.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> There's a clear correlation, not no relationship.</div>
<div><strong>Choice D:</strong> The pattern shows consistent correlation, not random variation.</div>
</div>
</div>`,

  // Question 28 - ID 203
  203: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Table 1 shows average solar irradiance. July had the highest at approximately 290 W/m², which corresponds to peak summer when the sun is strongest and days are longest.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> January had low solar irradiance (winter).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> March had moderate irradiance (spring).</div>
<div><strong>Choice J:</strong> October had declining irradiance (fall).</div>
</div>
</div>`,

  // Question 29 - ID 204
  204: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The electrolysis equation 2H₂O → 2H₂ + O₂ shows that for every 2 molecules of H₂O, 1 molecule of O₂ is produced. Since H₂O is the reactant being broken down, it was placed in the tank at the experiment's start.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> H₂ is a product, created during the experiment.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> O₂ is a product, not initially in the tank.</div>
<div><strong>Choice D:</strong> NaOH was added as a solution, but wasn't the electrolyzed substance.</div>
</div>
</div>`,

  // Question 30 - ID 205
  205: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The chemical equation 2H₂O → 2H₂ + O₂ shows 2 moles H₂ produced for every 1 mole O₂. If 4.0 L of H₂ was produced, then 2.0 L of O₂ was produced (half as much), following the 2:1 stoichiometric ratio.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> 1.0 L is too little—doesn't match the 2:1 ratio.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> 1.3 L doesn't match stoichiometry.</div>
<div><strong>Choice J:</strong> 4.0 L would mean equal volumes, contradicting the equation.</div>
</div>
</div>`
};

async function uploadExplanations() {
  console.log('Uploading Science explanations for questions 16-30...\n');

  let count = 0;
  for (const [questionId, explanation] of Object.entries(explanations)) {
    const { error } = await supabase
      .from('practice_test_science_questions')
      .update({ explanation })
      .eq('id', parseInt(questionId));

    if (error) {
      console.error(`Error updating question ${questionId}:`, error);
    } else {
      count++;
      console.log(`✓ Updated question ${count}/15 (ID: ${questionId})`);
    }
  }

  console.log(`\n========== PROGRESS: 70/80 total explanations complete ==========`);
}

uploadExplanations();
