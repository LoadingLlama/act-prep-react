const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

const explanations = {
  // Question 1 - ID 136
  136: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The third paragraph (lines 33-46) shifts from describing Murali's impressions to describing their courtship and how it affected the Sri Lankan community in New York, particularly the elders who arranged occasions for them to be together.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The passage focuses on their courtship, not married life.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Murali shows no concerns about marriage in the passage.</div>
<div><strong>Choice D:</strong> Family conflicts are mentioned but aren't the main focus of the paragraph.</div>
</div>
</div>`,

  // Question 2 - ID 137
  137: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage describes Vani as having "reserve" and "inability to say anything truly personal in public," but also notes she "never raised her voice, but she did not speak softly" and "never caught her admitting she was wrong," showing self-assurance.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Nothing suggests she is severe or impolite.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> She's not described as apologetic.</div>
<div><strong>Choice J:</strong> She's described as having "pale slimness" and making her own clothes, not unkempt.</div>
</div>
</div>`,

  // Question 3 - ID 138
  138: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "a friend of his noticed that they were staying near each other. Perhaps Murali could give Vani a ride home?" This suggestion to drive her home came before the elders organized occasions, before Vani smiled without thinking, and before the brother's confrontation.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The elders organizing occasions happened after they met.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Vani's unguarded smile happened after the first car ride.</div>
<div><strong>Choice D:</strong> The brother's confrontation was much later, near the end.</div>
</div>
</div>`,

  // Question 4 - ID 139
  139: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The italicized phrases appear in the description of Vani's behavior in public, following "She never raised her voice, but she did not speak softly," indicating these are examples of the type of polite, conventional comments she would make publicly.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> These describe Vani's speech patterns, not Murali's preparations.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> This isn't from their first meeting conversation.</div>
<div><strong>Choice J:</strong> These aren't Vani's secret thoughts but her outward speech.</div>
</div>
</div>`,

  // Question 5 - ID 140
  140: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage explicitly states "She liked her food steaming and spicy, as he did," directly confirming that both Murali and Vani enjoyed eating spicy food.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> They met in New York but there's no mention of being born there.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Only Vani is described as a good cook.</div>
<div><strong>Choice D:</strong> Only Murali is mentioned as a doctor.</div>
</div>
</div>`,

  // Question 6 - ID 141
  141: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "Whether it was Murali who managed to get introduced to Vani or the other way around, no one else really remembers. And they will never admit which one of them was responsible," showing both refuse to confess who initiated their introduction.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> It's not about forgetting, but refusing to admit.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> It's about Murali and Vani themselves, not their friends.</div>
<div><strong>Choice H:</strong> The passage doesn't specify that Murali initiated it.</div>
</div>
</div>`,

  // Question 7 - ID 142
  142: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "She did not ask him in for a cup of coffee; it was not her house," clearly explaining that Vani didn't invite Murali in because she was boarding with another family and it wasn't her own home.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> She smiled openly at him, showing comfort, not self-consciousness.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> No mention of her assumptions about his schedule.</div>
<div><strong>Choice D:</strong> He drove out of his way willingly; she wasn't burdening him.</div>
</div>
</div>`,

  // Question 8 - ID 143
  143: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Lines 61-65 describe how "The Sri Lankan elders of New York City" viewed Vani as "Proper: smart and polite and a good cook and lovely" with "grace." This description explicitly comes from the elders' perspective.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Murali's perspective was described earlier in the passage.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Vani's family in Sri Lanka appears later, not in these lines.</div>
<div><strong>Choice H:</strong> Murali's friends aren't mentioned in this section.</div>
</div>
</div>`,

  // Question 9 - ID 144
  144: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "And then one day something was suggested by one of those elders. And somehow the pair of them were talking about it. To each other. Directly. Which was a faux pas," showing their direct discussion of marriage was considered improper or unconventional by traditional standards.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The passage calls it a "faux pas," not proper behavior.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> It was unconventional, not sensible by traditional standards.</div>
<div><strong>Choice C:</strong> Nothing suggests it was superficial.</div>
</div>
</div>`,

  // Question 10 - ID 145
  145: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Line 79 states "his failure to observe certain formalities," where "observe" means to follow or adhere to traditions and customs, not to watch or study them.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> "Study" doesn't fit the context of formalities.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> "Express" doesn't work with "formalities."</div>
<div><strong>Choice J:</strong> "Perceive" means to notice, not to follow.</div>
</div>
</div>`,

  // Question 11 - ID 146
  146: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The first paragraph of Passage A describes London in 1800 lit only by candles and lanterns, contrasting it with today's light-flooded world, establishing that light pollution is a recent phenomenon appearing only after widespread electrification.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Travel difficulty isn't the main focus.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Gas lighting timing isn't the main point.</div>
<div><strong>Choice D:</strong> The paragraph shows London had minimal light pollution historically.</div>
</div>
</div>`,

  // Question 12 - ID 147
  147: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Lines 21-30 contrast "the city's pale ceiling" of light pollution that makes the sky look "emptied of stars" with "the rest of the universe" above it—"a bright shoal of stars and planets and galaxies"—that remains undiminished.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Colors of stars aren't contrasted here.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Venus and stars aren't compared in this paragraph.</div>
<div><strong>Choice J:</strong> Past appreciation versus current apathy isn't discussed.</div>
</div>
</div>`,

  // Question 13 - ID 148
  148: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The passage states "Light is a powerful biological force, and on many species it acts as a magnet" and describes animals "being 'captured' by searchlights," showing they are irresistibly drawn to artificial light.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The passage doesn't discuss lost foraging abilities.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> It's about attraction to light, not confinement to dark areas.</div>
<div><strong>Choice D:</strong> Habitat loss isn't mentioned as the meaning of "captured."</div>
</div>
</div>`,

  // Question 14 - ID 149
  149: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Joseph simply says the painting is "beautiful," appreciating its aesthetic. The Passage B author, however, says "I love the story this painting tells" and discusses what the painting reveals about the dark night sky of Van Gogh's time.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Joseph likely appreciates colors too; this isn't the key difference.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Both appreciate its beauty.</div>
<div><strong>Choice J:</strong> The author focuses on story, not technique.</div>
</div>
</div>`,

  // Question 15 - ID 150
  150: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
The first paragraph describes the painting's setting at MoMA, mentions "fifty million people pass by every year," describes the scene depicted in the painting, and notes Joseph calling it "beautiful," establishing both its popularity and appearance.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> The author doesn't convey personal excitement about first seeing it.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> It doesn't show different people's reactions.</div>
<div><strong>Choice D:</strong> When and why Van Gogh painted it isn't discussed until later.</div>
</div>
</div>`
};

async function uploadExplanations() {
  console.log('Uploading explanations for questions 1-15...\n');

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

  console.log(`\n========== Completed ${count} explanations ==========`);
}

uploadExplanations();
