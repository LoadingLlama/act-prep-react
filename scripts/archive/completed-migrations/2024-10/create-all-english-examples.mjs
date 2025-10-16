import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Complete set of English interactive examples for all lessons
 * These render using ExampleCard component (same as Math)
 */
const englishExamples = [
  // COMMAS
  {
    lesson_key: 'commas',
    position: 1,
    title: 'Identifying Unnecessary Commas',
    problem_text: 'The scientist carefully analyzed the data, before presenting her findings to the committee.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'data before presenting' },
      { letter: 'C', text: 'data; before presenting' },
      { letter: 'D', text: 'data. Before presenting' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the comma after "data" - is it necessary?' },
      { step: 2, text: 'Check if there are two independent clauses: "The scientist carefully analyzed the data" is independent.' },
      { step: 3, text: '"before presenting her findings" is a dependent clause starting with "before."' },
      { step: 4, text: 'No comma needed between independent clause and dependent clause when dependent comes second.' }
    ],
    answer_explanation: 'Remove the comma. No comma is needed before a dependent clause that follows an independent clause.',
    is_worked_example: false
  },
  {
    lesson_key: 'commas',
    position: 2,
    title: 'Comma Usage with Introductory Phrases',
    problem_text: 'After reviewing all the applications the hiring manager selected three candidates for interviews.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'applications, the hiring manager' },
      { letter: 'C', text: 'applications; the hiring manager' },
      { letter: 'D', text: 'applications the hiring manager,' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the introductory phrase: "After reviewing all the applications"' },
      { step: 2, text: 'This is a dependent clause that comes before the independent clause.' },
      { step: 3, text: 'Rule: Use a comma after an introductory dependent clause.' },
      { step: 4, text: 'Add comma after "applications" before the main clause begins.' }
    ],
    answer_explanation: 'Add a comma after the introductory phrase "After reviewing all the applications."',
    is_worked_example: false
  },

  // VERBS
  {
    lesson_key: 'verbs',
    position: 1,
    title: 'Subject-Verb Agreement with Intervening Phrases',
    problem_text: 'The collection of ancient artifacts were displayed in the museum\'s main gallery.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'was displayed' },
      { letter: 'C', text: 'have been displayed' },
      { letter: 'D', text: 'are displayed' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the subject: "The collection" (singular)' },
      { step: 2, text: 'Ignore the intervening phrase "of ancient artifacts" - this is not the subject.' },
      { step: 3, text: 'The verb must agree with "collection" (singular), not "artifacts."' },
      { step: 4, text: 'Use singular verb "was displayed" to match singular subject "collection."' }
    ],
    answer_explanation: 'The subject is "collection" (singular), so the verb should be "was displayed."',
    is_worked_example: false
  },
  {
    lesson_key: 'verbs',
    position: 2,
    title: 'Verb Tense Consistency',
    problem_text: 'By the time the guests arrived, the chef has prepared all the appetizers.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'had prepared' },
      { letter: 'C', text: 'prepares' },
      { letter: 'D', text: 'is preparing' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the time sequence: "By the time the guests arrived" (past)' },
      { step: 2, text: 'The preparation happened BEFORE the guests arrived.' },
      { step: 3, text: 'Use past perfect "had prepared" to show action completed before another past action.' },
      { step: 4, text: '"Has prepared" (present perfect) doesn\'t work with the past context.' }
    ],
    answer_explanation: 'Use past perfect "had prepared" because the action was completed before another past action.',
    is_worked_example: false
  },

  // PRONOUNS
  {
    lesson_key: 'pronouns',
    position: 1,
    title: 'Pronoun-Antecedent Agreement',
    problem_text: 'Each of the students must submit their research paper by Friday.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'his or her research paper' },
      { letter: 'C', text: 'its research paper' },
      { letter: 'D', text: 'our research paper' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the antecedent: "Each" (singular, indefinite pronoun)' },
      { step: 2, text: '"Their" is plural and doesn\'t agree with singular "each."' },
      { step: 3, text: 'Use "his or her" to match the singular antecedent.' },
      { step: 4, text: 'Words like "each," "every," "either," "neither" are singular.' }
    ],
    answer_explanation: '"Each" is singular, so use "his or her" instead of "their."',
    is_worked_example: false
  },
  {
    lesson_key: 'pronouns',
    position: 2,
    title: 'Pronoun Case',
    problem_text: 'Between you and I, the new policy doesn\'t make much sense.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Between you and me,' },
      { letter: 'C', text: 'Between yourself and I,' },
      { letter: 'D', text: 'Between you and myself,' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: '"Between" is a preposition requiring object case pronouns.' },
      { step: 2, text: '"I" is subject case; "me" is object case.' },
      { step: 3, text: 'Test by removing "you and": "between I" sounds wrong vs "between me."' },
      { step: 4, text: 'Always use object case (me, him, her, them) after prepositions.' }
    ],
    answer_explanation: 'After the preposition "between," use object case "me" instead of subject case "I."',
    is_worked_example: false
  },

  // TRANSITIONS
  {
    lesson_key: 'transitions',
    position: 1,
    title: 'Identifying the Correct Transition',
    problem_text: 'From a distance, the ocean looked pretty calm today even though a storm had arrived last night. [Transition], the scene was much more chaotic with big waves and strong riptides.',
    choices: [
      { letter: 'A', text: 'NO CHANGE (Under the circumstances,)' },
      { letter: 'B', text: 'For instance,' },
      { letter: 'C', text: 'Up close,' },
      { letter: 'D', text: 'For example,' }
    ],
    correct_answer: 'C',
    solution_steps: [
      { step: 1, text: 'Read the context: First sentence says "from a distance" the ocean looked calm.' },
      { step: 2, text: 'The second sentence describes chaos with big waves and riptides.' },
      { step: 3, text: 'We need a transition that contrasts "from a distance" with what\'s happening closer.' },
      { step: 4, text: '"Up close" is the logical opposite of "from a distance" and properly connects these contrasting observations.' }
    ],
    answer_explanation: '"Up close" creates a clear contrast with "from a distance" in the previous sentence.',
    is_worked_example: false
  },
  {
    lesson_key: 'transitions',
    position: 2,
    title: 'Determining if a Transition is Necessary',
    problem_text: 'Stepping out on the island\'s port on Monday, the new couple debuted their own classic take on beach attire. [Transition] the actor opted for a classic white tee and board shorts while his model counterpart wore a floral print coverup and strappy sandals.',
    choices: [
      { letter: 'A', text: 'NO CHANGE (As a result,)' },
      { letter: 'B', text: 'In other words, the' },
      { letter: 'C', text: 'Consequently, the' },
      { letter: 'D', text: 'The' }
    ],
    correct_answer: 'D',
    solution_steps: [
      { step: 1, text: 'Check if a transition is needed by reading without one: "...take on beach attire. The actor opted for..."' },
      { step: 2, text: 'The sentence flows naturally without a transition - it\'s simply describing what they wore.' },
      { step: 3, text: 'Transitions like "as a result" or "consequently" suggest cause-and-effect, which doesn\'t apply here.' },
      { step: 4, text: 'The sentence is just continuing the description, so no transition is necessary.' }
    ],
    answer_explanation: 'No transition is needed - the sentence simply continues describing their outfits.',
    is_worked_example: false
  },

  // WHICH-CHOICE
  {
    lesson_key: 'which-choice',
    position: 1,
    title: 'Choosing the Most Concise Option',
    problem_text: 'The committee spent months researching the topic before they made their final decision about what to do.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'before making their final decision.' },
      { letter: 'C', text: 'before they ultimately decided.' },
      { letter: 'D', text: 'before deciding.' }
    ],
    correct_answer: 'D',
    solution_steps: [
      { step: 1, text: 'Identify redundancy: "made their final decision about what to do" is wordy.' },
      { step: 2, text: 'Option A keeps unnecessary words like "about what to do" (redundant with "decision").' },
      { step: 3, text: 'Options B and C still include "their final" or "ultimately" which is implied.' },
      { step: 4, text: 'Option D "before deciding" is the most concise while maintaining full meaning.' }
    ],
    answer_explanation: '"Before deciding" is the most concise option without losing any meaning.',
    is_worked_example: false
  },
  {
    lesson_key: 'which-choice',
    position: 2,
    title: 'Selecting the Most Specific Detail',
    problem_text: 'The artist used various colors in her painting to create a vibrant atmosphere.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'bold reds, deep blues, and golden yellows' },
      { letter: 'C', text: 'different shades' },
      { letter: 'D', text: 'lots of paint' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: '"Various colors" is vague and doesn\'t create a vivid image for the reader.' },
      { step: 2, text: 'Option B provides specific color names that support "vibrant atmosphere."' },
      { step: 3, text: 'Options C and D are even more vague than the original.' },
      { step: 4, text: 'Specific details make writing stronger and more engaging.' }
    ],
    answer_explanation: 'Specific color names create a more vivid, vibrant image than "various colors."',
    is_worked_example: false
  },

  // WORD-CHOICE
  {
    lesson_key: 'word-choice',
    position: 1,
    title: 'Selecting the Correct Word in Context',
    problem_text: 'The company\'s new policy will [affect/effect] all employees starting next month.',
    choices: [
      { letter: 'A', text: 'affect (verb - to influence)' },
      { letter: 'B', text: 'effect (noun - a result)' },
      { letter: 'C', text: 'effect (verb - to bring about)' },
      { letter: 'D', text: 'affect (noun - emotion)' }
    ],
    correct_answer: 'A',
    solution_steps: [
      { step: 1, text: 'Determine the part of speech needed: "will [blank] all employees" needs a verb.' },
      { step: 2, text: 'We need the verb meaning "to influence" - that\'s "affect."' },
      { step: 3, text: 'Option B "effect" as a noun doesn\'t fit grammatically here.' },
      { step: 4, text: 'Option C "effect" as a verb means "to bring about" (usually with a noun like "change"), which doesn\'t fit the context.' }
    ],
    answer_explanation: '"Affect" (verb) means to influence, which is what the policy does to employees.',
    is_worked_example: false
  },
  {
    lesson_key: 'word-choice',
    position: 2,
    title: 'Commonly Confused Words',
    problem_text: 'The weather was to unpredictable for them to proceed with their outdoor plans.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'too unpredictable' },
      { letter: 'C', text: 'two unpredictable' },
      { letter: 'D', text: 'so unpredictable' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the three forms: "to" (preposition/infinitive), "too" (excessive), "two" (number).' },
      { step: 2, text: 'Context requires "excessively unpredictable" - that\'s "too."' },
      { step: 3, text: '"To" is used for direction or infinitive verbs, not for degree.' },
      { step: 4, text: 'While "so" works grammatically, "too" more precisely conveys the excessive nature.' }
    ],
    answer_explanation: 'Use "too" to mean "excessively" unpredictable.',
    is_worked_example: false
  },

  // MODIFIERS
  {
    lesson_key: 'modifiers',
    position: 1,
    title: 'Misplaced Modifiers',
    problem_text: 'Running quickly through the park, the fountain caught my attention.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Running quickly through the park, I noticed the fountain.' },
      { letter: 'C', text: 'The fountain caught my attention running quickly through the park.' },
      { letter: 'D', text: 'Running quickly, the fountain in the park caught my attention.' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the modifier: "Running quickly through the park"' },
      { step: 2, text: 'Who/what is running? The modifier suggests the fountain is running, which is illogical.' },
      { step: 3, text: 'The person (I) is running, not the fountain.' },
      { step: 4, text: 'Place the modifier next to what it modifies: "I" not "fountain."' }
    ],
    answer_explanation: 'The modifier "Running quickly through the park" should describe "I," not "fountain."',
    is_worked_example: false
  },
  {
    lesson_key: 'modifiers',
    position: 2,
    title: 'Dangling Modifiers',
    problem_text: 'To succeed in college, careful planning and hard work are necessary.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'To succeed in college, students need careful planning and hard work.' },
      { letter: 'C', text: 'Careful planning and hard work are necessary to succeed in college.' },
      { letter: 'D', text: 'Both B and C' }
    ],
    correct_answer: 'D',
    solution_steps: [
      { step: 1, text: 'Identify the modifier: "To succeed in college"' },
      { step: 2, text: 'Who is succeeding? Planning and work don\'t succeed - people do.' },
      { step: 3, text: 'Option B adds "students" as the subject who succeeds.' },
      { step: 4, text: 'Option C repositions the modifier to avoid the dangling issue. Both fix the error.' }
    ],
    answer_explanation: 'Both B and C correctly resolve the dangling modifier by either adding a subject or repositioning.',
    is_worked_example: false
  },

  // REDUNDANCY
  {
    lesson_key: 'redundancy',
    position: 1,
    title: 'Eliminating Redundant Phrases',
    problem_text: 'The final outcome of the experiment was surprising and unexpected.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'The outcome of the experiment was surprising.' },
      { letter: 'C', text: 'The final outcome was surprising.' },
      { letter: 'D', text: 'The experiment\'s outcome was unexpected.' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify redundancy: "final outcome" - outcomes are inherently final.' },
      { step: 2, text: '"Surprising and unexpected" mean essentially the same thing.' },
      { step: 3, text: 'Option B removes both redundancies: "final" and one of the synonyms.' },
      { step: 4, text: 'Options C and D remove only one redundancy each.' }
    ],
    answer_explanation: 'Remove both "final" (redundant with outcome) and either "surprising" or "unexpected" (synonyms).',
    is_worked_example: false
  },
  {
    lesson_key: 'redundancy',
    position: 2,
    title: 'Recognizing Wordy Expressions',
    problem_text: 'Due to the fact that it was raining, the game was postponed.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Because it was raining,' },
      { letter: 'C', text: 'On account of the rain,' },
      { letter: 'D', text: 'In light of the fact that it was raining,' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the wordy phrase: "due to the fact that" = 5 words' },
      { step: 2, text: 'This can be replaced with "because" = 1 word with same meaning.' },
      { step: 3, text: 'Option C is less wordy but "because" is clearest and most concise.' },
      { step: 4, text: 'Option D makes it even wordier.' }
    ],
    answer_explanation: 'Replace wordy "due to the fact that" with concise "because."',
    is_worked_example: false
  },

  // PARALLEL-STRUCTURE
  {
    lesson_key: 'parallel-structure',
    position: 1,
    title: 'Parallel Structure in Lists',
    problem_text: 'The job requires attention to detail, working well under pressure, and you must be organized.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'attention to detail, the ability to work well under pressure, and organization.' },
      { letter: 'C', text: 'attention to detail, working well under pressure, and organization.' },
      { letter: 'D', text: 'being attentive to detail, working well under pressure, and being organized.' }
    ],
    correct_answer: 'C',
    solution_steps: [
      { step: 1, text: 'Identify the list structure: three items describing job requirements.' },
      { step: 2, text: 'First two items are noun phrases: "attention to detail," "working well under pressure"' },
      { step: 3, text: 'Third item breaks parallel: "you must be organized" is a clause, not a noun phrase.' },
      { step: 4, text: 'Option C makes all three items parallel noun phrases.' }
    ],
    answer_explanation: 'Use parallel structure with three noun phrases: attention, working, and organization.',
    is_worked_example: false
  },
  {
    lesson_key: 'parallel-structure',
    position: 2,
    title: 'Parallel Structure with Correlative Conjunctions',
    problem_text: 'The restaurant is known not only for its excellent food but also having great service.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'but also for its great service.' },
      { letter: 'C', text: 'but also they have great service.' },
      { letter: 'D', text: 'and also having great service.' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify correlative conjunctions: "not only...but also"' },
      { step: 2, text: 'After "not only": "for its excellent food" (prepositional phrase)' },
      { step: 3, text: 'After "but also": "having great service" (gerund phrase) - not parallel!' },
      { step: 4, text: 'Option B uses "for its great service" matching the structure after "not only."' }
    ],
    answer_explanation: 'Make structures parallel after "not only" and "but also" - both should be prepositional phrases.',
    is_worked_example: false
  },

  // PUNCTUATION
  {
    lesson_key: 'punctuation',
    position: 1,
    title: 'Semicolon Usage',
    problem_text: 'The concert was sold out, however, we managed to get tickets at the last minute.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'out; however, we' },
      { letter: 'C', text: 'out however we' },
      { letter: 'D', text: 'out, and however, we' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify two independent clauses: "The concert was sold out" and "we managed to get tickets"' },
      { step: 2, text: '"However" is a conjunctive adverb connecting the clauses.' },
      { step: 3, text: 'Rule: Use semicolon before conjunctive adverb, comma after it.' },
      { step: 4, text: 'Comma alone (A) creates comma splice. Option B correctly uses semicolon.' }
    ],
    answer_explanation: 'Use semicolon before "however" when connecting two independent clauses.',
    is_worked_example: false
  },
  {
    lesson_key: 'punctuation',
    position: 2,
    title: 'Apostrophe Usage',
    problem_text: 'The childrens\' toys were scattered throughout the playroom.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'children\'s toys' },
      { letter: 'C', text: 'childrens toys' },
      { letter: 'D', text: 'children toys' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the possessive: toys belonging to children.' },
      { step: 2, text: '"Children" is already plural (irregular plural, not ending in -s).' },
      { step: 3, text: 'For plural nouns not ending in -s, add \'s (not s\').' },
      { step: 4, text: 'Correct form is "children\'s" with apostrophe before the s.' }
    ],
    answer_explanation: 'For irregular plurals like "children," use apostrophe + s: children\'s.',
    is_worked_example: false
  },

  // LOGICAL-PLACEMENT
  {
    lesson_key: 'logical-placement',
    position: 1,
    title: 'Sentence Placement for Logical Flow',
    problem_text: '[1] Marie Curie won two Nobel Prizes. [2] She discovered radium and polonium. [3] Few scientists have achieved such recognition. [4] She was the first woman to win a Nobel Prize.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Place sentence 4 before sentence 1' },
      { letter: 'C', text: 'Place sentence 3 after sentence 4' },
      { letter: 'D', text: 'Delete sentence 3' }
    ],
    correct_answer: 'C',
    solution_steps: [
      { step: 1, text: 'Analyze logical flow: Sentence 1 states she won two Nobel Prizes.' },
      { step: 2, text: 'Sentence 4 adds she was the FIRST woman to win - this is more impressive context.' },
      { step: 3, text: 'Sentence 3 says "few scientists have achieved such recognition" - refers to her achievements.' },
      { step: 4, text: 'Better order: 1 (two prizes) → 4 (first woman) → 3 (few have done this) → 2 (discoveries)' }
    ],
    answer_explanation: 'Move sentence 3 after sentence 4 to maintain logical flow of her achievements.',
    is_worked_example: false
  },
  {
    lesson_key: 'logical-placement',
    position: 2,
    title: 'Identifying Misplaced Information',
    problem_text: 'The national park features diverse wildlife. Visitors can hike over 50 miles of trails. The park was established in 1872. Many tourists visit each year to see geysers and hot springs.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Move the third sentence to the beginning' },
      { letter: 'C', text: 'Move the fourth sentence before the second sentence' },
      { letter: 'D', text: 'Delete the third sentence' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify topic: describing a national park\'s features and history.' },
      { step: 2, text: 'Sentence 3 gives historical background (established 1872) - this is introductory info.' },
      { step: 3, text: 'Current order jumps from wildlife to trails to history to geysers - disjointed.' },
      { step: 4, text: 'Better flow: Start with history, then describe features chronologically.' }
    ],
    answer_explanation: 'Begin with historical context (established 1872) before describing park features.',
    is_worked_example: false
  },

  // ADDING-DELETING
  {
    lesson_key: 'adding-deleting',
    position: 1,
    title: 'Deciding What to Add',
    problem_text: 'The Grand Canyon is one of the most visited natural wonders in the United States. [Addition?]',
    choices: [
      { letter: 'A', text: 'Add: "It has many rocks and formations."' },
      { letter: 'B', text: 'Add: "Over 6 million people visit annually to witness its breathtaking vistas."' },
      { letter: 'C', text: 'Add: "Arizona has other attractions too."' },
      { letter: 'D', text: 'Add nothing' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Identify the main idea: Grand Canyon is highly visited.' },
      { step: 2, text: 'Option A is vague and doesn\'t add meaningful detail.' },
      { step: 3, text: 'Option B provides specific visitor statistics supporting "most visited."' },
      { step: 4, text: 'Option C shifts topic to Arizona generally - not focused on Grand Canyon.' }
    ],
    answer_explanation: 'Add specific supporting detail about visitor numbers that reinforces "most visited."',
    is_worked_example: false
  },
  {
    lesson_key: 'adding-deleting',
    position: 2,
    title: 'Deciding What to Delete',
    problem_text: 'Shakespeare wrote 37 plays during his lifetime. He was born in Stratford-upon-Avon in 1564. His plays are still performed worldwide today. My favorite color is blue.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Delete the second sentence' },
      { letter: 'C', text: 'Delete the fourth sentence' },
      { letter: 'D', text: 'Delete the third sentence' }
    ],
    correct_answer: 'C',
    solution_steps: [
      { step: 1, text: 'Identify paragraph focus: Shakespeare\'s plays and their legacy.' },
      { step: 2, text: 'Sentences 1, 2, 3 all relate to Shakespeare and his work.' },
      { step: 3, text: 'Sentence 4 ("My favorite color is blue") is completely off-topic.' },
      { step: 4, text: 'Delete irrelevant information that doesn\'t support the main idea.' }
    ],
    answer_explanation: 'Delete the sentence about favorite color - it\'s completely unrelated to Shakespeare.',
    is_worked_example: false
  }
];

/**
 * Upload all English examples to Supabase
 */
async function createAllEnglishExamples() {
  console.log('📝 CREATING ALL ENGLISH INTERACTIVE EXAMPLES');
  console.log('==============================================\n');

  let successCount = 0;
  let errorCount = 0;
  const lessonStats = {};

  for (const example of englishExamples) {
    // Track per-lesson stats
    if (!lessonStats[example.lesson_key]) {
      lessonStats[example.lesson_key] = 0;
    }

    // Get lesson UUID
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .eq('lesson_key', example.lesson_key)
      .single();

    if (lessonError || !lesson) {
      console.log(`❌ Lesson ${example.lesson_key} not found in database`);
      errorCount++;
      continue;
    }

    // Check if example already exists
    const { data: existing } = await supabase
      .from('examples')
      .select('id')
      .eq('lesson_id', lesson.id)
      .eq('position', example.position)
      .single();

    if (existing) {
      console.log(`⏭️  ${example.lesson_key} - Example ${example.position} already exists (skipping)`);
      continue;
    }

    // Insert example
    const { error: insertError } = await supabase
      .from('examples')
      .insert({
        lesson_id: lesson.id,
        position: example.position,
        title: example.title,
        problem_text: example.problem_text,
        choices: example.choices,
        correct_answer: example.correct_answer,
        solution_steps: example.solution_steps,
        answer_explanation: example.answer_explanation,
        is_worked_example: example.is_worked_example,
        diagram_svg: null
      });

    if (insertError) {
      console.log(`❌ Error inserting ${example.lesson_key} Example ${example.position}: ${insertError.message}`);
      errorCount++;
    } else {
      console.log(`✓ ${example.lesson_key} - Example ${example.position}: ${example.title}`);
      successCount++;
      lessonStats[example.lesson_key]++;
    }
  }

  console.log('\n==============================================');
  console.log(`✅ COMPLETE!`);
  console.log(`   Created: ${successCount} examples`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`\n   Examples per lesson:`);

  Object.entries(lessonStats).forEach(([lesson, count]) => {
    console.log(`   - ${lesson}: ${count} examples`);
  });

  console.log(`\n   All examples render using ExampleCard component`);
  console.log(`   with same styling as Math examples (React/JSX)`);
}

// Run creation
createAllEnglishExamples().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
