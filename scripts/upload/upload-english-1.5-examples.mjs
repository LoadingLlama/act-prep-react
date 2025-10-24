import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'pronouns')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 1.5 - Pronouns...\n');

// Create 4 examples (one per H3 section)
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Who vs. Whom in Descriptive Phrases',
    problem_text: 'I could not believe how much the florists <u>who</u> opened up a shop down the street charge for their roses.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'whom' },
      { letter: 'C', text: 'which' },
      { letter: 'D', text: 'that' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This tests "who" vs. "whom" in a descriptive phrase.

**Step 1: Identify the phrase**
"who opened up a shop down the street" is a descriptive phrase telling us more about the florists.

**Step 2: Use the he/him replacement trick for just the phrase**
Look only at the phrase: "who opened up a shop down the street"

Can we say "he opened up a shop down the street"? ✓ Yes!
Can we say "him opened up a shop down the street"? ✗ No!

Since "he" works, we use "who" (not "whom").

**Step 3: Use the quick trick**
Look at the word right after "who/whom": "opened"

"Opened" is a verb → Use "who"

**Step 4: Test each choice**
- **A (NO CHANGE - "who"):** The florists did the action (they opened up a shop), so we need the subject pronoun "who." Using the he/him trick on the phrase confirms "he opened" works. Correct!

- **B ("whom"):** This is the object pronoun. Test with the phrase: "whom opened up a shop" → "him opened up a shop" doesn\'t work. Incorrect!

- **C ("which"):** "Which" is used for things, not people. The florists are people, so we can\'t use "which." Incorrect!

- **D ("that"):** While "that" can sometimes be used for people, "who" is more grammatically precise when referring to people performing an action. "Who" is the better choice. Incorrect!

**Why A is correct:**
The word after "who" is a verb ("opened"), and using the he/him test on the phrase shows "he opened" works, so "who" is correct.

The answer is **A**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Possessive Pronouns with Group Nouns',
    problem_text: 'The entire team went on stage to pick up <u>their</u> trophy.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'its' },
      { letter: 'C', text: 'it\'s' },
      { letter: 'D', text: 'there' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests possessive pronoun agreement with group nouns.

**Step 1: Identify the antecedent**
What is the pronoun referring back to? "The entire team"

**Step 2: Determine if the antecedent is singular or plural**
"Team" is a group noun. Even though a team consists of many people, the word "team" itself is SINGULAR.

Group nouns (team, committee, class, herd, jury, etc.) are always treated as singular.

**Step 3: Match the pronoun to the antecedent**
Singular antecedent ("team") → Singular possessive pronoun needed

Singular possessive pronouns: my, your, his, her, its
Plural possessive pronouns: our, your, their

We need "its" (singular), not "their" (plural).

**Step 4: Test each choice**
- **A (NO CHANGE - "their"):** This is a plural possessive pronoun. "Team" is singular, so we can\'t use "their." Incorrect!

- **B ("its"):** This is a singular possessive pronoun matching the singular antecedent "team." "The team...its trophy" is correct! Correct!

- **C ("it\'s"):** This is a contraction for "it is." Test: "The entire team went on stage to pick up it is trophy." That doesn\'t make sense! Incorrect!

- **D ("there"):** "There" is not a possessive pronoun—it indicates location. "Pick up there trophy" doesn\'t work. Incorrect!

**Why B is correct:**
Group nouns like "team" are singular and require singular possessive pronouns like "its."

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Pronoun Agreement with Singular Antecedents',
    problem_text: 'Each member of the women\'s track team improved <u>their</u> time.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'her' },
      { letter: 'C', text: 'his or her' },
      { letter: 'D', text: 'its' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests pronoun agreement with the tricky word "each."

**Step 1: Identify the antecedent**
What is the pronoun referring to? "Each member"

Don\'t be fooled by "women\'s track team"—that\'s in a prepositional phrase ("of the women\'s track team"). The actual antecedent is "each member."

**Step 2: Determine if the antecedent is singular or plural**
"Each" is a singular word. Even though we\'re talking about multiple members of the team, "each member" refers to one member at a time.

"Each member" = singular

**Step 3: Determine the gender**
We\'re talking about the "women\'s track team," so the members are female.

Gender: female → Use "her" (not "his")

**Step 4: Match the pronoun**
Singular + female → "her"

**Step 5: Test each choice**
- **A (NO CHANGE - "their"):** "Their" is plural. "Each member" is singular, so "their" doesn\'t match. Incorrect!

- **B ("her"):** "Her" is singular and female, matching "each member" of the women\'s track team. Correct!

- **C ("his or her"):** While "his or her" is singular, we already know from context that the track team is a women\'s team, so "his or her" is unnecessarily vague. "Her" is more precise. Incorrect!

- **D ("its"):** "Its" is used for things, not people. Members of the track team are people, not things. Incorrect!

**Why B is correct:**
"Each member" is singular and female (women\'s track team), so the pronoun must be "her."

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Ambiguous Pronouns',
    problem_text: 'When the owner of Pizza Port greets a customer, <u>he</u> always smiles.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'the owner' },
      { letter: 'C', text: 'they' },
      { letter: 'D', text: 'the customer' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests ambiguous pronouns.

**Step 1: Identify the pronoun**
The underlined portion is "he."

**Step 2: Find what "he" could be referring to**
Who are the people in this sentence?
- The owner of Pizza Port
- A customer

"He" could be referring to EITHER the owner OR the customer. We can\'t tell which one!

**Step 3: Determine if the pronoun is ambiguous**
Since we don\'t know exactly who "he" refers to, the pronoun is AMBIGUOUS.

Ambiguous pronouns are always incorrect on the ACT.

**Step 4: Look for the answer that eliminates ambiguity**
We need an answer choice that specifies exactly who is smiling.

**Step 5: Test each choice**
- **A (NO CHANGE - "he"):** Ambiguous—could be the owner or the customer. Incorrect!

- **B ("the owner"):** This specifies that it\'s the owner who always smiles. "When the owner of Pizza Port greets a customer, the owner always smiles." This is clear and unambiguous! Correct!

- **C ("they"):** This is plural and doesn\'t match either singular person (owner or customer). Also still somewhat ambiguous—does it mean the owner and customer together? Incorrect!

- **D ("the customer"):** This would mean the customer always smiles. While this eliminates ambiguity, it changes the meaning. Typically, it\'s the business owner (Pizza Port owner) who would be described as always smiling when greeting customers, not the customer. The context suggests the owner is the one being friendly. Incorrect!

**Why B is correct:**
The pronoun "he" is ambiguous because it could refer to either the owner or the customer. Replacing "he" with "the owner" eliminates the ambiguity and makes logical sense in context.

The answer is **B**.`,
    is_worked_example: false
  }
];

for (const example of examples) {
  const { error } = await supabase
    .from('lesson_examples')
    .insert(example);

  if (error) {
    console.error(`Error creating example at position ${example.position}:`, error.message);
  } else {
    console.log(`✓ Example ${example.position} created: ${example.title}`);
  }
}

console.log('\n✅ Topic 1.5 - Pronouns examples complete!');
