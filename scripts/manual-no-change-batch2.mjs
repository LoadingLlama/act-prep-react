/**
 * Manual context-specific NO CHANGE explanations - Batch 2
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Batch 2: Examples 10-25
const specificExplanations = {
  // Removing Irrelevant Information
  'a899710b-c79c-4a6c-bcef-dd833add45bf': {
    letter: 'A',
    explanation: `The underlined sentence about when marathon running became an Olympic sport is completely irrelevant to the narrative about this specific runner finishing the race. It interrupts the flow of the story with a random historical fact that doesn't connect to the moment being described. The sentence should be deleted to maintain focus on the runner's victory.`
  },

  // Pronoun Agreement with Singular Antecedents
  'aeeab69d-9f09-46d3-936a-f9ae99d82062': {
    letter: 'A',
    explanation: `"Their" is incorrect because "each member" is grammatically singular, requiring a singular pronoun. Even though we're talking about multiple team members, the word "each" treats them individually, one at a time. Since this is the women's track team, the singular pronoun "her" is needed to agree with "each member."`
  },

  // Quotation Marks with Spoken Dialogue
  'c1b71e74-1738-4d03-8765-e9ddd5d35707': {
    letter: 'A',
    explanation: `The comma after "herself" and the quotation mark before "who" are both correctly placed. When introducing dialogue or internal thoughts with phrases like "said to herself," you need a comma before opening the quotation marks. The lowercase "who" is also correct since it's the beginning of a question within the dialogue, not the main sentence.`
  },

  // Possessive Pronouns with Group Nouns
  'b85b3394-4dc7-48b4-8d49-4c6afdc69ad2': {
    letter: 'A',
    explanation: `"Their" is incorrect because "team" is a collective noun that should be treated as singular when the group acts as a single unit. The team is picking up one trophy together, not individual trophies, so we need the singular possessive pronoun "its" rather than the plural "their."  `
  },

  // Who vs. Whom in Descriptive Phrases
  '4e109097-8c62-4b1d-b64f-150e911693c0': {
    letter: 'A',
    explanation: `"Who" is correct here because it's the subject of the verb "opened" in the descriptive clause. We use "who" when it's performing the action (the florists opened the shop), and "whom" when it's receiving the action. Since the florists are doing the opening, "who" is the right choice.`
  },

  // Transitional Words (However)
  'ef765798-1b03-44b8-a754-4c4644a67043': {
    letter: 'A',
    explanation: `The semicolon before "however" is correct because we're connecting two independent clauses. "However" is a conjunctive adverb that shows contrast, and when it joins two complete sentences, it requires a semicolon before it (not just a comma) and a comma after it. This is the same pattern as with other conjunctive adverbs like "therefore" or "nevertheless."`
  },

  // Unnecessary Information (Crossing-Out Trick)
  '995b8159-aaa0-473c-b16b-74b54a6f72d1': {
    letter: 'A',
    explanation: `The commas around "thousands of them" make it an unnecessary interruption that can be removed from the sentence. If you cross out this phrase, the sentence reads "Electric vehicles, already on the road in America, are..." which shows the phrase breaks up the flow awkwardly. Without the commas, "thousands of them" becomes an essential part of the meaning and reads more smoothly.`
  },

  // Identifying Comma + FANBOYS
  'b5130bfe-7cb5-4e6c-baaf-6f61db735ee4': {
    letter: 'A',
    explanation: `The comma before "and" is incorrect here because what follows "and then" is not an independent clause—it's just a continuation of what the same subject did. You only need a comma before FANBOYS (for, and, nor, but, or, yet, so) when joining two complete sentences. Here, "won the grand prize" can't stand alone, so no comma is needed.`
  },

  // Middle/End Modifier with "which"
  '8939f5bb-1a0a-4ff5-a399-7d753515c301': {
    letter: 'A',
    explanation: `The phrase "which arrived at their nesting grounds early this year" incorrectly modifies "research team" when it should modify "blue storks." The way it's written, it sounds like the research team arrived at nesting grounds, but it's actually the storks that nest. The descriptive clause needs to be repositioned to clearly refer to the storks, not the researchers.`
  },

  // All Transitions Type
  'e3b6794c-27d8-4882-9bc2-94a74f3785f6': {
    letter: 'A',
    explanation: `"Under the circumstances" doesn't make logical sense here because that phrase refers to specific conditions or situations, not physical location. The passage is contrasting the distant view with the close-up view of the ocean, so we need a transition that indicates physical proximity or location, not situational context.`
  },
};

async function updateSpecificExplanations() {
  console.log('🔧 Applying Batch 2 NO CHANGE explanations...\n');

  let updated = 0;

  for (const [id, data] of Object.entries(specificExplanations)) {
    const { data: example } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('id', id)
      .single();

    if (!example) {
      console.log(`❌ Example not found: ${id}`);
      continue;
    }

    let explanation = example.answer_explanation || '';
    const pattern = new RegExp(`\\*\\*Choice ${data.letter}:[^✓✗]+(✓ CORRECT|✗ Incorrect)`, 's');
    const match = explanation.match(pattern);

    if (!match) {
      console.log(`❌ Could not find Choice ${data.letter} in ${example.title}`);
      continue;
    }

    const isCorrect = example.correct_answer === data.letter;
    const marker = isCorrect ? '✓ CORRECT' : '✗ Incorrect';
    const noChangeChoice = example.choices.find(c => c.letter === data.letter);

    const newExplanation = `**Choice ${data.letter}: "${noChangeChoice.text}"**
${data.explanation}
${marker}`;

    explanation = explanation.replace(match[0], newExplanation);

    const { error } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: explanation })
      .eq('id', id);

    if (error) {
      console.log(`❌ Error updating ${example.title}:`, error.message);
    } else {
      updated++;
      console.log(`✅ ${updated}. ${example.title}`);
    }
  }

  console.log(`\n✅ Updated ${updated} NO CHANGE explanations`);
}

updateSpecificExplanations().then(() => process.exit(0));
