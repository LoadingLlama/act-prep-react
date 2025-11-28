const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

const explanations = {
  // Question 16 - ID 151
  151: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states Van Gogh "certainly had his troubles" but the painting "looks as it does in part because it's of a time that no longer exists" and was "an imagined sky inspired by a real sky," showing he used imagination combined with observation of the actual night sky.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Daytime painting isn't mentioned as a reason for imagination.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> The passage doesn't say the work is "almost entirely imagined."</div>
<div><strong>Choice J:</strong> He did use imagination, not trying to depict it "exactly as it was."</div>
</div>
</div>`,

  // Question 17 - ID 152
  152: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The phrase appears in "no one has seen a sky remotely close to this over Paris," meaning no one has seen a sky "anything like" this—the phrase indicates similarity or resemblance, not physical proximity.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> "Remotely close" is less definitive than "exactly similar."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> This refers to resemblance, not geographic location.</div>
<div><strong>Choice D:</strong> "Adjacent" implies physical nearness, which isn't the meaning here.</div>
</div>
</div>`,

  // Question 18 - ID 153
  153: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Passage A provides a general overview of light pollution—its history, effects on the night sky, and impact on animals. Passage B examines the same issue through the specific lens of Van Gogh's painting The Starry Night and what it reveals about darker historical skies.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Passage A doesn't focus on "the process," and B is broader than one reaction.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Passage A doesn't offer restoration suggestions.</div>
<div><strong>Choice H:</strong> Passage B doesn't explain Van Gogh's era's use of light.</div>
</div>
</div>`,

  // Question 19 - ID 154
  154: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Both passages discuss how dark cities once were: Passage A describes 1800 London with only candles and lanterns, and Passage B discusses "a small dark town" and "towns much darker than the towns we live in today."
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Only Passage A mentions scientific researchers (Longcore and Rich).</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Only Passage B discusses The Starry Night artwork.</div>
<div><strong>Choice D:</strong> Neither author shares personal memories of darker nights.</div>
</div>
</div>`,

  // Question 20 - ID 155
  155: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Passage A extensively discusses how light affects nocturnal animals, stating "among mammals alone, the number of nocturnal species is astonishing" and describing how "songbirds and seabirds being 'captured' by searchlights." Passage B doesn't mention animals at all.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Passage B discusses star colors more than Passage A.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Passage B focuses more on nature and imagination.</div>
<div><strong>Choice J:</strong> Neither passage emphasizes places with remaining darkness.</div>
</div>
</div>`,

  // Question 21 - ID 156
  156: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage begins by describing a visit to a childhood waterfall, then uses this experience to reflect on broader topics about how places, photographs, and conversations affect memory—making it a description of an experience followed by consideration of related topics.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> It doesn't discuss how the memory changed over time.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> It's not about a lifelong hobby.</div>
<div><strong>Choice D:</strong> The author's opinions don't change; they're explaining a consistent view.</div>
</div>
</div>`,

  // Question 22 - ID 157
  157: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage concludes "it seems to me that no conversation or photograph can make memory so vivid or recognizable, so physically palpable, as the return to a place," establishing that revisiting places evokes the clearest and most accurate memories.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> The passage argues photographs replace rather than improve memories.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> This reverses the claim—photographs' truth depends on context, not memory.</div>
<div><strong>Choice J:</strong> The passage doesn't say all three are needed for sustained memory.</div>
</div>
</div>`,

  // Question 23 - ID 158
  158: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The author describes the waterfall visit with respectful awe: "I am amazed by all that I can remember," describes details "startlingly unchanged," and expresses wonder at remembered sensations, showing reverence for the place and the memories it evokes.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The tone is serious and reflective, not joking.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> The author expresses amazement and pleasure, not gloominess.</div>
<div><strong>Choice C:</strong> There's no pleading or begging quality to the description.</div>
</div>
</div>`,

  // Question 24 - ID 159
  159: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The second paragraph explains that "Conversations with others about shared experiences of the past can seem to augment memory but quite often...operate in the opposite way: they alter or even replace our own memories with those of another," showing reminiscing changes memories.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Memory fading isn't the main point of this paragraph.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> The paragraph argues reminiscing changes, not preserves, memories.</div>
<div><strong>Choice J:</strong> Family versus nonfamily members isn't discussed.</div>
</div>
</div>`,

  // Question 25 - ID 160
  160: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
This statement follows the explanation that photographs capture moments when people stop their activity to pose. The author means photographs mainly record the act of posing for a photo, not the actual experience people were having before the camera appeared.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> It's not about photographer skill but what photographs capture.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> The point isn't about forgetting the photographer.</div>
<div><strong>Choice C:</strong> Being brief isn't what "photography itself" refers to.</div>
</div>
</div>`,

  // Question 26 - ID 161
  161: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The first paragraph ends with the author "Standing on a rock ledge getting ready to jump" and preparing himself. The passage is about visiting a waterfall where "We used to jump from those cliffs," so jumping into the water below logically follows.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> He's preparing to jump, not leave.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> He's standing, preparing to jump, not sitting.</div>
<div><strong>Choice J:</strong> No indication he's taking a photograph.</div>
</div>
</div>`,

  // Question 27 - ID 162
  162: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states photographs "convert the three dimensions of space into two and eliminate the third spatial dimension and time. Also sacrificed are smell, touch, sound, and context," directly supporting that photos eliminate these elements of experience.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Photographs go from 3D to 2D, not the reverse.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Too narrow—the passage mentions all sensory information is lost, not just some.</div>
<div><strong>Choice D:</strong> This is a conclusion, not the specific detail used as support.</div>
</div>
</div>`,

  // Question 28 - ID 163
  163: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The dashed section lists "family outings, vacations, ballgames—Scotty in front of Niagara Falls, Dad and Grandma smiling in front of the famous restaurant," providing specific examples of the mundane, commonplace pictures people typically take.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> No contrast between trivial and meaningful is made here.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> The passage argues against photographs' usefulness, not for it.</div>
<div><strong>Choice J:</strong> These aren't events the author wishes to have pictures of.</div>
</div>
</div>`,

  // Question 29 - ID 164
  164: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The phrase "seemingly irrefutable factuality" emphasizes that photographs appear to show objective, indisputable truth. The passage explains this is deceptive, but the phrase itself describes how photographs convey an impression of factual accuracy.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> The passage argues photos don't clarify events.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> "Irrefutable" means provable, opposite of "can't be proven."</div>
<div><strong>Choice D:</strong> The phrase is about appearing factual, not implying hidden stories.</div>
</div>
</div>`,

  // Question 30 - ID 165
  165: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Line 82 discusses "the nature of memory itself: its malleability, its unreliability, its elusiveness," where "nature" refers to the essential character or fundamental qualities of memory—its essence.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> "Temperament" refers to personality, not applicable to memory.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> "Nature" doesn't mean outdoor scenery in this context.</div>
<div><strong>Choice J:</strong> "Environment" doesn't fit the context of memory's characteristics.</div>
</div>
</div>`
};

async function uploadExplanations() {
  console.log('Uploading explanations for questions 16-30...\n');

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
      console.log(`✓ Updated question ${count}/15 (ID: ${questionId})`);
    }
  }

  console.log(`\n========== PROGRESS: 30/80 total explanations complete ==========`);
}

uploadExplanations();
