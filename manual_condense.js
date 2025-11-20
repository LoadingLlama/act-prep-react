const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

// Condensed explanations
const condensedExplanations = {
  1: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"Of the thousands of new animal species" creates a subordinate phrase that eliminates the comma splice in the original sentence.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Creates a comma splice by joining two independent clauses with only a comma.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Still contains the comma splice error despite adding "Scientists say."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Also creates a comma splice by improperly connecting two complete thoughts with just a comma.</div>
</div>
</div>`,

  2: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"Mantas are" correctly establishes subject-verb agreement with a complete independent clause.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> "Mantas, which are" creates a fragment because the main clause lacks a verb.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> "Mantas," creates a sentence fragment by leaving the subject without a verb.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Deleting the phrase creates a fragment lacking proper grammatical structure.</div>
</div>
</div>`,

  3: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Paired em dashes correctly set off the parenthetical information "up to twenty-five feet wide."
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Incorrectly mixes a colon and an em dash—parenthetical elements must use matching punctuation.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Incorrectly mixes a comma and an em dash.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Incorrectly uses a comma and a colon, plus colons shouldn't conclude phrases.</div>
</div>
</div>`,

  4: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"variations in the mantas" uses the correct prepositional idiom without unnecessary commas.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Incorrectly treats the essential phrase "in the mantas" as non-essential by adding commas.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Uses an unnecessary em dash before an essential phrase.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Same error as F—incorrectly adds commas around an essential phrase.</div>
</div>
</div>`,

  5: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Yes, because the sentence about her lodgings interrupts the logical flow from Marshall's observations to her hypothesis.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> The issue isn't location justification—it's that the sentence disrupts the paragraph's focus on scientific observations.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> The sentence doesn't explain how Marshall built an institution—it's just a minor detail.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> While it clarifies Marshall's connection to the center, this information interrupts the narrative flow.</div>
</div>
</div>`,

  6: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"is" correctly agrees with the singular subject "The skin" (not the plural "mantas" in the prepositional phrase).
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> "happen to be" is plural and doesn't agree with singular "skin."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> "were" is plural and past tense, neither matching the singular present-tense subject.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> "are" is plural and doesn't agree with singular "skin."</div>
</div>
</div>`,

  7: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"was that" correctly connects the subject to the noun clause without unnecessary punctuation.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Colons shouldn't separate verbs from their complements.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Commas shouldn't surround "that" when it introduces an essential noun clause.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> A comma incorrectly separates the verb from its necessary complement.</div>
</div>
</div>`,

  8: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
After Sentence 1 creates an immediate connection—Sentence 1 mentions "collecting data," and this sentence provides examples.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Can't reference "Other data" before establishing what the basic data were.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Sentence 3 already provides specific detailed data, so introducing "basic" data here is out of sequence.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Too late—the concept of basic data should come early in the discussion.</div>
</div>
</div>`,

  9: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"had the evidence to announce" explicitly indicates the announcement was backed by scientific data.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Only indicates who made the announcement, not whether it was evidence-based.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Emphasizes reaction rather than whether the announcement was data-backed.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Emphasizes timing rather than scientific rigor.</div>
</div>
</div>`,

  10: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"are" correctly agrees with the plural subject "two manta species."
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> "is" is singular and doesn't agree with plural "two manta species."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> "exists" is singular and doesn't agree with plural "two manta species."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> "was" is both singular and past tense, neither matching the plural present-tense subject.</div>
</div>
</div>`,

  11: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"rarely ventures far from its home territory" maintains formal, scientific tone appropriate for the passage.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> "kind of sticks around" is informal and colloquial.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> "doesn't delight in slogging" awkwardly anthropomorphizes the fish and uses informal language.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> "loves hanging around its neighborhood" is highly informal and inappropriate for scientific writing.</div>
</div>
</div>`,

  12: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"that" correctly introduces the noun clause in the construction "The fact that."
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> "whether" introduces doubt or alternatives, which doesn't make sense with "The fact."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> "which" cannot introduce a noun clause in this construction.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> "how" doesn't work with "The fact" in this context.</div>
</div>
</div>`,

  13: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"for so long" correctly modifies "went undifferentiated" when placed immediately after it.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Misplaced modifier—makes it seem like scientists "know for so long" rather than animals "went undifferentiated for so long."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Awkwardly suggests the highlighting action occurred for a long time.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Creates garbled syntax by splitting the noun clause.</div>
</div>
</div>`,

  14: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"Fortunately, mantas have a devoted and expert researcher in Dr. Marshall" suggests continued scientific study.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Introduces a new topic about threats rather than concluding with continued study.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice G:</strong> Mentions past documentation, not future research.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> A poetic description doesn't suggest ongoing research.</div>
</div>
</div>`,

  15: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
No, because the essay focuses on Marshall's research and discovery process, not the scientific community's response.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> The essay never discusses the scientific community's acceptance of the identification.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Research thoroughness is different from community response.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> The essay presents Marshall's discovery process, not anyone's response to it.</div>
</div>
</div>`,

  16: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"temperature, helping" correctly uses a participial phrase to modify the preceding clause.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Semicolons should separate independent clauses, not introduce participial phrases.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Creates a comma splice by joining two independent clauses with only a comma.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Creates a sentence fragment that cannot stand alone.</div>
</div>
</div>`,

  17: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Commas correctly set off the non-restrictive phrase "particularly in the bark of the willow tree."
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Em dashes around only part of the phrase break apart "in the bark of the willow tree."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Semicolons separate independent clauses, not dependent phrases.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Incorrectly separates "particularly" from the phrase it modifies.</div>
</div>
</div>`,

  18: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"willow is listed among" uses passive voice with the correct idiom to indicate willow is one item in a group.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Creates a fragment—prepositional phrases can't be followed by verbs without subjects.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Uses wrong idiom—"listed on" means appearing on a surface, not included in a group.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Same fragment error as F plus wrong idiom.</div>
</div>
</div>`,

  19: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"about" concisely indicates the date is approximate.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> "approximately about" is redundant—both words mean the same thing.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> "an estimation of" is wordy—three words for what one word conveys.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> "in the region of" is unnecessarily wordy.</div>
</div>
</div>`,

  20: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"While" establishes contrast between willow's continued worldwide use and its declining favor in Europe.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice F:</strong> Information about habitats and symbolism is irrelevant to medicinal use.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice H:</strong> Introducing Imhotep is tangential to the paragraph's focus.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice J:</strong> Side effects weren't mentioned earlier and don't explain why cinchona was preferred.</div>
</div>
</div>`
};

async function updateExplanations() {
  const results = [];
  let processed = 0;

  for (const [questionNum, condensed] of Object.entries(condensedExplanations)) {
    const { data, error } = await supabase
      .from('practice_test_english_questions')
      .update({ explanation: condensed })
      .eq('question_number', parseInt(questionNum))
      .select();

    if (error) {
      console.error(`Error updating question ${questionNum}:`, error);
      results.push({ question_number: questionNum, success: false });
    } else {
      console.log(`✓ Question ${questionNum} updated`);
      results.push({ question_number: questionNum, success: true });
    }

    processed++;
    if (processed % 20 === 0) {
      console.log(`\n=== PROGRESS: ${processed}/20 questions completed ===\n`);
    }
  }

  console.log(`\n=== COMPLETE: ${processed}/20 questions updated ===`);
  fs.writeFileSync('update_results_batch1.json', JSON.stringify(results, null, 2));
}

updateExplanations();
