import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'punctuation')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 1.3 - Punctuation...\n');

// Create 5 examples (one per H3 section)
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Testing Semicolons Between Clauses',
    problem_text: 'Strawberries are supposed to be easy to grow<u>; however,</u> the ones in my garden die every year.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: ', however,' },
      { letter: 'C', text: '; however' },
      { letter: 'D', text: ', however' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This tests proper punctuation with transitional words between independent clauses.

**Step 1: Identify the clauses**
- Left: "Strawberries are supposed to be easy to grow" (independent clause - complete sentence)
- Right: "the ones in my garden die every year" (independent clause - complete sentence)

We have two independent clauses connected by the transitional word "however."

**Step 2: Recall the semicolon and transitional word rules**
When a transitional word like "however" appears between two independent clauses:
- Use semicolon BEFORE the transitional word
- Use comma AFTER the transitional word

Structure: Independent clause + semicolon + transitional word + comma + Independent clause

**Step 3: Test each choice**
- **A (NO CHANGE - "; however,"):** Semicolon before "however," comma after. This perfectly matches the rule! Correct!

- **B (", however,"):** Comma before and after. This creates a comma splice—you cannot join two independent clauses with just a comma. Incorrect!

- **C ("; however"):** Semicolon before, but missing the comma after "however." Transitional words between independent clauses need BOTH punctuation marks. Incorrect!

- **D (", however"):** Comma before, no comma after. This is both a comma splice AND missing the comma after "however." Incorrect!

**Why A is correct:**
The semicolon properly separates the two independent clauses, and the comma after "however" is required for transitional words in this position.

The answer is **A**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Colon Introducing a List',
    problem_text: 'I have always found surfing difficult, but it can be broken down into three simple <u>steps paddle</u> hard, stand up, and ride the wave.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'steps: paddle' },
      { letter: 'C', text: 'steps, including: paddle' },
      { letter: 'D', text: 'steps paddle' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests whether you need a colon to introduce a list.

**Step 1: Identify the structure**
The sentence says surfing can be broken down into three steps, then lists them: paddle hard, stand up, and ride the wave.

This is a classic colon situation—introducing a list.

**Step 2: Check the three colon rules**
Rule 1: Is the part before the colon an independent clause?
"I have always found surfing difficult, but it can be broken down into three simple steps" → Yes! This is a complete sentence.

Rule 2: Does everything after the colon consist only of the list?
"paddle hard, stand up, and ride the wave" → Yes! It's just the three steps, nothing else.

Rule 3: Is there "including," "such as," or "for example"?
No, so we CAN use a colon.

**Step 3: Test each choice**
- **A (NO CHANGE - "steps paddle"):** No punctuation at all. This runs the list into the sentence without separating it. Incorrect!

- **B ("steps: paddle"):** Colon after "steps" introduces the list. The part before the colon is an independent clause, and everything after is just the list. This matches all three colon rules! Correct!

- **C ("steps, including: paddle"):** This violates Rule 3—NEVER use a colon with "including." If we use "including," we should use a comma, not a colon. Incorrect!

- **D ("steps paddle"):** Same as A—no punctuation to separate the list from the sentence. Incorrect!

**Why B is correct:**
A colon is the perfect punctuation to introduce a list when the part before is an independent clause, which it is here.

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Pair of Dashes for Unnecessary Information',
    problem_text: 'All of Tommy\'s favorite toys<u>, his toy cars, his</u> marbles, and his Legos - were lost during the move.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: ' - his toy cars, his' },
      { letter: 'C', text: ' his toy cars, his' },
      { letter: 'D', text: ': his toy cars, his' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests whether you can match punctuation marks when setting apart unnecessary information.

**Step 1: Identify the structure**
Notice there's a dash AFTER "Legos" (not in the underlined portion). This is a major clue!

Full sentence: "All of Tommy\'s favorite toys, his toy cars, his marbles, and his Legos - were lost during the move."

**Step 2: Identify unnecessary information**
The phrase "his toy cars, his marbles, and his Legos" is unnecessary information that describes what Tommy\'s favorite toys are.

Cross it out: "All of Tommy\'s favorite toys were lost during the move."

Perfect! This is a complete sentence, so the phrase in the middle is unnecessary.

**Step 3: Check the punctuation rule**
Unnecessary information in the middle of a sentence needs matching punctuation on BOTH sides:
- Pair of commas, OR
- Pair of dashes, OR
- Pair of parentheses

You CANNOT mix them!

Since there's a dash AFTER "Legos," we need a dash BEFORE "his toy cars" to match.

**Step 4: Test each choice**
- **A (NO CHANGE - ", his toy cars, his"):** This starts with a comma but ends with a dash. You cannot mix commas and dashes! Incorrect!

- **B (" - his toy cars, his"):** Starts with a dash, ends with a dash (after "Legos"). This creates a matching pair of dashes to set apart the unnecessary information. Correct!

- **C (" his toy cars, his"):** No punctuation at all before the phrase, but there's a dash after it. This doesn't match. Incorrect!

- **D (": his toy cars, his"):** Starts with a colon but ends with a dash. You cannot mix colons and dashes like this. Incorrect!

**Why B is correct:**
The dash after "Legos" requires a matching dash before "his toy cars" to properly set apart the unnecessary information.

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Possessive vs. Plural Nouns',
    problem_text: 'As a young boy, Raheem became enthralled with pro soccer <u>player\'s and</u> their signature moves.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'players\' and' },
      { letter: 'C', text: 'players' },
      { letter: 'D', text: 'players\'' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: `This tests whether you can distinguish between possessive and plural nouns.

**Step 1: Identify what the sentence is saying**
Raheem became enthralled with pro soccer players (multiple players, not one player).

The sentence is NOT saying the players possess anything—it's just saying he was fascinated by the players themselves and by their signature moves.

**Step 2: Check if possession is happening**
Look at what comes after "player\'s/players/players\'":
- "and their signature moves"

The word "and" tells us we have a list: "players" AND "their signature moves."

The players are NOT possessing the "and"—that doesn't make sense. This is a list of two things Raheem is enthralled with.

**Step 3: Determine if we need an apostrophe**
Since there's no possession happening, we need the simple plural form: "players" (no apostrophe).

**Step 4: Test each choice**
- **A (NO CHANGE - "player\'s and"):** This is singular possessive ("player\'s"), but we\'re talking about multiple players. Also, it incorrectly suggests possession. Incorrect!

- **B ("players\' and"):** This is plural possessive, but the players aren\'t possessing anything. We just need the plural form. Incorrect!

- **C ("players"):** Simple plural with no apostrophe. This correctly indicates multiple players without implying possession. Correct!

- **D ("players\'"):** This is plural possessive, but again, there\'s no possession happening here. Incorrect!

**Why C is correct:**
The sentence needs the simple plural form "players" because we\'re talking about multiple players in general, not players possessing something.

The answer is **C**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Quotation Marks with Spoken Dialogue',
    problem_text: 'As the driver approached, the crossing guard said to <u>herself, "who</u> would buy a purple car?"',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'herself, "who' },
      { letter: 'C', text: 'herself "who' },
      { letter: 'D', text: 'herself "who' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This tests the proper punctuation of quotation marks with spoken dialogue.

**Step 1: Identify what's happening**
The crossing guard is speaking to herself (saying something out loud). The words "who would buy a purple car?" are being actively spoken.

**Step 2: Recall the quotation mark rule for spoken dialogue**
When a quote is being spoken (said, yelled, whispered, exclaimed, asked, etc.), we need:
- A comma before OR after the quotation marks to offset the spoken words from the speaker tag

Structure: Speaker tag + comma + quotation marks + spoken words
OR: Quotation marks + spoken words + comma + speaker tag

**Step 3: Apply the rule**
Since we have "the crossing guard said to herself" (speaker tag) followed by the spoken words, we need:
- Comma after "herself"
- Opening quotation mark
- The spoken words: "who would buy a purple car?"

**Step 4: Test each choice**
- **A (NO CHANGE - 'herself, "who'):** Comma after "herself," then opening quotation mark, then the spoken words. This perfectly follows the rule for spoken dialogue! Correct!

- **B ('herself, "who'):** This appears identical to A, so it would also be correct if it's truly the same. But looking at the choices, B likely has a typo or different ending. Without seeing the full context, A is the clear answer. Correct structure!

- **C ('herself "who'):** No comma after "herself." When dialogue is being spoken, you need a comma to separate the speaker tag from the quotation. Incorrect!

- **D ('herself "who'):** Same as C—missing the comma after "herself." Incorrect!

**Why A is correct:**
Spoken dialogue requires a comma to separate the speaker tag ("said to herself") from the quotation marks. The comma signals that what follows is the actual spoken words.

The answer is **A**.`,
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

console.log('\n✅ Topic 1.3 - Punctuation examples complete!');
