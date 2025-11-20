const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

const explanations = {
  // Question 31 - ID 166
  166: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The seventh and eighth paragraphs explain that while solar-fuel technology exists in principle—Japanese engineers built a working prototype—the problem is that "commercial solar cells contain expensive silicon crystals" and "electrolyzers are packed with platinum," showing technology has advanced but cost problems prevent large-scale viability.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Too narrow—focuses on just one detail rather than the main function.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> US-Japan collaboration isn't the focus of these paragraphs.</div>
<div><strong>Choice D:</strong> The auto industry's leadership isn't questioned here.</div>
</div>
</div>`,

  // Question 32 - ID 167
  167: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "Nathan S. Lewis has been giving a lecture on the energy crisis" and "To avoid potentially debilitating global warming, the chemist says civilization must be able to generate more than 10 trillion watts," identifying this as Lewis's opinion expressed in his lectures.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> South Carolina researchers aren't mentioned regarding this statistic.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> No chemist being challenged by Lewis is mentioned.</div>
<div><strong>Choice J:</strong> The author doesn't express this as their own changing opinion.</div>
</div>
</div>`,

  // Question 33 - ID 168
  168: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states Lewis says "humankind needs a radical breakthrough in solar-fuel technology: artificial leaves that will capture solar rays and churn out chemical fuel," showing the breakthrough will make these capabilities possible—the breakthrough is needed to achieve them.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The capabilities don't exist yet—they're what the breakthrough aims to create.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Neither serves as an example of misguided focus.</div>
<div><strong>Choice D:</strong> The sequence is reversed—breakthrough comes first.</div>
</div>
</div>`,

  // Question 34 - ID 169
  169: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage explicitly states "The problem is that commercial solar cells contain expensive silicon crystals. And electrolyzers are packed with platinum, to date the best material for catalyzing the water-splitting reaction, but it costs $1,500 an ounce," identifying high material costs as a major challenge.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> The technology to split water exists; the passage says "electrolyzers are used in various commercial processes."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Diminishing federal funding isn't mentioned.</div>
<div><strong>Choice J:</strong> Public reluctance isn't discussed as a challenge.</div>
</div>
</div>`,

  // Question 35 - ID 170
  170: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "the sun pours more energy onto the earth every hour than humankind uses in a year," clearly indicating that humanity's yearly energy use is smaller than the sun's hourly energy output to Earth.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Humanity uses less energy in a year than the sun provides in an hour.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> The comparison doesn't suggest twice the amount.</div>
<div><strong>Choice D:</strong> The comparison doesn't suggest ten times the amount.</div>
</div>
</div>`,

  // Question 36 - ID 171
  171: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "Lewis's lab is one of several that are crafting prototype leaves, not much larger than computer chips," providing a direct comparison for the size of these prototypes.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Computer chips are much smaller than a human hand.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Maple leaves are larger than computer chips.</div>
<div><strong>Choice H:</strong> Carpet squares are much larger than computer chips.</div>
</div>
</div>`,

  // Question 37 - ID 172
  172: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Line 25 describes how organisms have been "engineered to excrete oil" or algae "altered to pump out biofuels," where "pump out" means to produce or generate these fuels, not to remove them from somewhere.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> "Remove" suggests taking away, not creating.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> "Drain" means to empty, not to produce.</div>
<div><strong>Choice D:</strong> "Siphon" means to draw out existing liquid, not create new fuel.</div>
</div>
</div>`,

  // Question 38 - ID 173
  173: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states Lewis estimates "the country would need to manufacture thin, flexible solar-fuel films, instead of discrete chiplike devices, that roll off high-speed production lines," showing he envisions thin, flexible films as the ideal form.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> The passage says "instead of discrete chiplike devices," rejecting this form.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> "Rigid" contradicts the "flexible" description.</div>
<div><strong>Choice J:</strong> Refrigeration isn't mentioned as part of the design.</div>
</div>
</div>`,

  // Question 39 - ID 174
  174: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "The artificial leaf Lewis is designing requires two principal elements: a collector that converts solar energy (photons) into electrical energy (electrons) and an electrolyzer that uses the electron energy to split water," identifying these as the two main components.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> A fuel cell uses the hydrogen later, but isn't part of the leaf technology itself.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> The catalyst is added to help but isn't one of the two principal elements.</div>
<div><strong>Choice C:</strong> These are materials used, not the principal elements of the technology.</div>
</div>
</div>`,

  // Question 40 - ID 175
  175: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "the exhaust from burning the hydrogen later in a fuel cell is water," clearly identifying water as one outcome of this process.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Splitting silicon crystals isn't mentioned as an outcome.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> This describes what happens, but the question asks for an outcome/product.</div>
<div><strong>Choice H:</strong> Fuel cell lining deterioration isn't mentioned.</div>
</div>
</div>`
};

async function uploadExplanations() {
  console.log('Uploading explanations for questions 31-40...\n');

  let count = 0;
  for (const [questionId, explanation] of Object.entries(explanations)) {
    const { error } = await supabase
      .from('practice_test_reading_questions')
      .update({ explanation })
      .eq('id', parseInt(questionId));

    if (error) {
      console.error(`Error updating question ${questionId}:`, error);
    } else {
      count++;
      console.log(`✓ Updated question ${count}/10 (ID: ${questionId})`);
    }
  }

  console.log(`\n========== ALL 40 READING QUESTIONS COMPLETE! ==========`);
  console.log(`========== PROGRESS: 40/80 total explanations complete ==========`);
}

uploadExplanations();
