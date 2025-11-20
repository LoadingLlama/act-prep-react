const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

const explanations = {
  // Question 1 - ID 176
  176: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
According to Table 1, for H₂ at 273 K: at 5.00 atm the molar volume is approximately 4.5 L, and at 10.0 atm it's approximately 2.2 L. The absolute difference is |4.5 - 2.2| = 2.3 L, which is approximately 2.2 L.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> 1.8 L is too small for the difference between these values.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> 4.0 L would be nearly double the volume at 10.0 atm.</div>
<div><strong>Choice D:</strong> 5.0 L exceeds the molar volume at 5.00 atm.</div>
</div>
</div>`,

  // Question 2 - ID 177
  177: `<div style="line-height: 1.6; margin-bottom: 0.375rem; color: #374151;">
In Table 2 at 323 K and 1.00 atm, comparing molar volumes shows H₂ has the smallest, then He, then N₂, then Ar has the largest. This ordering reflects molecular size differences.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Places Ar first incorrectly—Ar has the largest molar volume, not smallest.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Incorrect ordering of He and N₂.</div>
<div><strong>Choice H:</strong> Incorrect ordering of He and N₂ positions.</div>
</div>
</div>`,

  // Question 3 - ID 178
  178: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Comparing Tables 1 and 2, N₂ (nitrogen) and O₂ (oxygen) have very similar molar volumes at all temperatures and pressures shown. Both are diatomic molecules with similar molecular weights, so they behave similarly.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> He (helium) is much smaller and lighter than O₂.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Ar (argon) is heavier than O₂ with different molar volumes.</div>
<div><strong>Choice C:</strong> H₂ (hydrogen) is the lightest gas with significantly different volumes.</div>
</div>
</div>`,

  // Question 4 - ID 179
  179: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Table 2 shows molar volumes at 1.00 atm and 773 K. Comparing each gas's value to the ideal gas value of 63.429 L, all six gases listed (He, Ne, Ar, H₂, N₂, O₂) have smaller molar volumes than the ideal gas at these conditions.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> At least some gases have smaller volumes than ideal.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> More than 2 gases deviate from ideal behavior.</div>
<div><strong>Choice H:</strong> Only 4 is too few; 6 gases are shown in the table.</div>
</div>
</div>`,

  // Question 5 - ID 180
  180: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Since mean free time decreases as volume decreases, the least mean free time occurs at the smallest volume. Table 1 shows O₂ at 100.0 atm has the smallest molar volume (around 0.2 L), much smaller than He or either gas at 0.500 atm.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> He at 0.500 atm has large volume, so higher mean free time.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> O₂ at 0.500 atm has larger volume than at 100.0 atm.</div>
<div><strong>Choice C:</strong> He at 100.0 atm has larger volume than O₂ at same pressure.</div>
</div>
</div>`,

  // Question 6 - ID 181
  181: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Table 2 shows O₂ at 1 atm: 18 L corresponds to lower temperature, 63 L to higher temperature. Since kinetic energy increases with temperature, the 63 L sample at higher temperature has greater average kinetic energy.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Lower temperature means lower kinetic energy, not greater.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> 18 L sample is at higher temperature, not lower.</div>
<div><strong>Choice H:</strong> 63 L is at higher temperature, but this choice says lower.</div>
</div>
</div>`,

  // Question 7 - ID 182
  182: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
According to Figure 3 (Experiment 3), as cleaning time increased from 0 min to 30 min to 60 min, the average number of bacterial colonies per dish decreased, showing flies removed bacteria during cleaning.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Colonies decreased, not increased.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> The trend was consistently decreasing, not increasing then decreasing.</div>
<div><strong>Choice D:</strong> The trend was decreasing, not decreasing then increasing.</div>
</div>
</div>`,

  // Question 8 - ID 183
  183: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Experiment 3 used 3 groups of 10 S. carnaria flies each (one group for 0 min cleaning, one for 30 min, one for 60 min). Total: 3 groups × 10 flies = 30 flies tested.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> 5 is too few—each group alone had 10 flies.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> 10 represents just one group, not the total.</div>
<div><strong>Choice H:</strong> 24 doesn't match 3 groups of 10 flies.</div>
</div>
</div>`,

  // Question 9 - ID 184
  184: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Experiment 1 results in Figure 1 show that after flies walked on E. coli bacteria, they transferred bacteria to sterile petri dishes (forming colonies), demonstrating flies can transfer bacteria between surfaces, supporting disease-spreading capability.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Flies didn't transfer bacteria to each other, but to dishes.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> The results show flies did transfer bacteria.</div>
<div><strong>Choice D:</strong> The experiment didn't test transfer between fly species.</div>
</div>
</div>`,

  // Question 10 - ID 185
  185: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Sterile nutrient agar ensures any bacterial colonies that form came only from bacteria the flies transferred, not from pre-existing bacteria in the agar. This is essential for measuring bacterial transfer by flies.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Scientists want colonies from flies, not from agar before flies.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> The agar feeds bacteria, not flies' reproduction.</div>
<div><strong>Choice J:</strong> While agar feeds bacteria, sterility ensures measuring fly transfer.</div>
</div>
</div>`,

  // Question 11 - ID 186
  186: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
To test if Species X transfers more E. coli than M. domestica or S. carnaria, repeat Experiment 1 (which compared M. domestica and S. carnaria transfer rates) adding a Species X group for direct comparison.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Changing bacteria species doesn't test Species X flies.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Experiment 2 varied time, not species comparison.</div>
<div><strong>Choice D:</strong> Wrong experiment and irrelevant bacteria change.</div>
</div>
</div>`,

  // Question 12 - ID 187
  187: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Experiment 3 tested how cleaning time affects bacterial transfer by S. carnaria. The hypothesis being tested is that S. carnaria remove bacteria when they clean themselves (varying cleaning time should change bacteria transferred).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Experiment 3 varied cleaning time, not exposure time.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Experiment 3 didn't compare M. domestica to S. carnaria.</div>
<div><strong>Choice J:</strong> Only S. carnaria were tested, not both species.</div>
</div>
</div>`,

  // Question 13 - ID 188
  188: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Figure 1 shows the average for one group of S. carnaria. Experiment 2's 5-min group was a different set of S. carnaria. Biological variation between different groups means by chance, the Experiment 2 flies transferred fewer E. coli on average.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> M. domestica weren't in Experiment 2.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Different species weren't being compared here.</div>
<div><strong>Choice D:</strong> Both groups had the same procedure, so variation is due to chance.</div>
</div>
</div>`,

  // Question 14 - ID 189
  189: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Figure 1 shows atmospheric %O₂ over time during the Mesozoic era. At approximately 21% O₂ (today's level), this occurred around 90-100 million years ago according to the model line on the graph.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> 150 mya shows higher %O₂ than 21%.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> 200 mya shows higher %O₂.</div>
<div><strong>Choice J:</strong> 250 mya shows the highest %O₂ levels.</div>
</div>
</div>`,

  // Question 15 - ID 190
  190: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
According to Figure 2, at an initial %O₂ of 17, reading the graph for each material shows burn times. Pine needles burned for approximately 11-12 seconds at this oxygen level.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> 4 seconds is too short based on the trend shown.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> 8 seconds underestimates the burn time.</div>
<div><strong>Choice D:</strong> 16 seconds is too long for %O₂ of 17.</div>
</div>
</div>`
};

async function uploadExplanations() {
  console.log('Uploading Science explanations for questions 1-15...\n');

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

  console.log(`\n========== PROGRESS: 55/80 total explanations complete ==========`);
}

uploadExplanations();
