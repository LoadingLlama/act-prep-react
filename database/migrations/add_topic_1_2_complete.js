const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '3e8f0696-1bf7-4b5c-880d-fb5359923b7d'; // Topic 1.2 - Essential Comma Rules

const questions = [
  // Introductory Elements (1-10)
  {
    position: 1,
    title: 'Introductory Prepositional Phrase',
    problem_text: '<u>After the long meeting</u> everyone went home to rest.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory prepositional phrase <em>"After the long meeting."</em>' },
      { letter: 'B', text: 'After the long meeting,', explanation: 'This choice correctly places a comma after the introductory prepositional phrase <em>"After the long meeting"</em> to separate it from the main clause.' },
      { letter: 'C', text: 'After, the long meeting', explanation: 'This choice incorrectly places the comma after <em>"After,"</em> breaking up the introductory phrase.' },
      { letter: 'D', text: 'After the long meeting;', explanation: 'This choice incorrectly uses a semicolon. Introductory elements require commas, not semicolons.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory prepositional phrases of 4+ words should be followed by a comma.'
  },

  {
    position: 2,
    title: 'Short Introductory Phrase',
    problem_text: '<u>In 2015</u> the company launched its most successful product.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice is acceptable. Short introductory prepositional phrases (3 words or fewer) may omit the comma, though adding one is also correct.' },
      { letter: 'B', text: 'In 2015,', explanation: 'This choice correctly adds a comma after the short introductory phrase <em>"In 2015,"</em> which is also acceptable.' },
      { letter: 'C', text: 'In, 2015', explanation: 'This choice incorrectly places a comma after <em>"In,"</em> separating the preposition from its object.' },
      { letter: 'D', text: 'In 2015;', explanation: 'This choice incorrectly uses a semicolon. Short introductory phrases require either no punctuation or a comma.' }
    ],
    correct_answer: 'A',
    answer_explanation: 'Short introductory phrases (3 words or fewer) may optionally omit the comma.'
  },

  {
    position: 3,
    title: 'Introductory Dependent Clause',
    problem_text: '<u>When the storm finally passed</u> residents began assessing the damage.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory dependent clause <em>"When the storm finally passed."</em>' },
      { letter: 'B', text: 'When the storm finally passed,', explanation: 'This choice correctly places a comma after the introductory dependent clause <em>"When the storm finally passed"</em> before the independent clause.' },
      { letter: 'C', text: 'When, the storm finally passed', explanation: 'This choice incorrectly places a comma after <em>"When,"</em> breaking up the dependent clause.' },
      { letter: 'D', text: 'When the storm finally, passed', explanation: 'This choice incorrectly places a comma between the subject <em>"storm"</em> and verb <em>"passed."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory dependent clauses must be followed by a comma.'
  },

  {
    position: 4,
    title: 'Introductory Participial Phrase',
    problem_text: '<u>Walking through the park</u> Sarah noticed the autumn leaves had turned golden.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory participial phrase <em>"Walking through the park."</em>' },
      { letter: 'B', text: 'Walking through the park,', explanation: 'This choice correctly places a comma after the introductory participial phrase <em>"Walking through the park"</em> to separate it from the main clause.' },
      { letter: 'C', text: 'Walking, through the park', explanation: 'This choice incorrectly places a comma after <em>"Walking,"</em> breaking up the participial phrase.' },
      { letter: 'D', text: 'Walking through, the park', explanation: 'This choice incorrectly places a comma in the middle of the participial phrase.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory participial phrases must be followed by a comma.'
  },

  {
    position: 5,
    title: 'Introductory Infinitive Phrase',
    problem_text: '<u>To understand the concept fully</u> students must practice regularly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory infinitive phrase <em>"To understand the concept fully."</em>' },
      { letter: 'B', text: 'To understand the concept fully,', explanation: 'This choice correctly places a comma after the introductory infinitive phrase <em>"To understand the concept fully"</em> before the main clause.' },
      { letter: 'C', text: 'To understand, the concept fully', explanation: 'This choice incorrectly places a comma in the middle of the infinitive phrase.' },
      { letter: 'D', text: 'To, understand the concept fully', explanation: 'This choice incorrectly places a comma after the infinitive marker <em>"To."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory infinitive phrases should be followed by a comma.'
  },

  {
    position: 6,
    title: 'Introductory Adverb',
    problem_text: '<u>Unfortunately</u> the team lost the championship game.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory adverb <em>"Unfortunately."</em>' },
      { letter: 'B', text: 'Unfortunately,', explanation: 'This choice correctly places a comma after the introductory adverb <em>"Unfortunately"</em> to separate it from the main clause.' },
      { letter: 'C', text: 'Unfortunately;', explanation: 'This choice incorrectly uses a semicolon. Introductory adverbs require commas.' },
      { letter: 'D', text: 'Unfortunately -', explanation: 'This choice incorrectly uses a dash. Introductory adverbs require commas.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory transition words and adverbs should be followed by a comma.'
  },

  {
    position: 7,
    title: 'Long Introductory Phrase',
    problem_text: '<u>After reviewing all the evidence carefully</u> the jury reached its verdict.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the long introductory phrase <em>"After reviewing all the evidence carefully."</em>' },
      { letter: 'B', text: 'After reviewing all the evidence carefully,', explanation: 'This choice correctly places a comma after the entire introductory phrase before the main clause <em>"the jury reached its verdict."</em>' },
      { letter: 'C', text: 'After reviewing all the evidence, carefully', explanation: 'This choice incorrectly places a comma in the middle, separating <em>"evidence"</em> from <em>"carefully."</em>' },
      { letter: 'D', text: 'After, reviewing all the evidence carefully', explanation: 'This choice incorrectly places a comma after <em>"After."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Long introductory phrases require a comma at the end before the main clause.'
  },

  {
    position: 8,
    title: 'Introductory Yes/No',
    problem_text: '<u>Yes</u> I would like to attend the conference.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory word <em>"Yes."</em>' },
      { letter: 'B', text: 'Yes,', explanation: 'This choice correctly places a comma after the introductory word <em>"Yes"</em> to separate it from the main clause.' },
      { letter: 'C', text: 'Yes;', explanation: 'This choice incorrectly uses a semicolon. Introductory words like <em>"Yes"</em> and <em>"No"</em> require commas.' },
      { letter: 'D', text: 'Yes -', explanation: 'This choice incorrectly uses a dash instead of a comma.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory words like "Yes" and "No" must be followed by a comma.'
  },

  {
    position: 9,
    title: 'Introductory Transition Phrase',
    problem_text: '<u>On the other hand</u> some researchers disagree with this conclusion.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory transition phrase <em>"On the other hand."</em>' },
      { letter: 'B', text: 'On the other hand,', explanation: 'This choice correctly places a comma after the introductory transition phrase <em>"On the other hand"</em> before the main clause.' },
      { letter: 'C', text: 'On, the other hand', explanation: 'This choice incorrectly places a comma after <em>"On,"</em> breaking up the transition phrase.' },
      { letter: 'D', text: 'On the other, hand', explanation: 'This choice incorrectly places a comma in the middle of the transition phrase.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory transitional phrases must be followed by a comma.'
  },

  {
    position: 10,
    title: 'Introductory Appositive',
    problem_text: '<u>A skilled musician</u> David plays five different instruments.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the introductory appositive <em>"A skilled musician."</em>' },
      { letter: 'B', text: 'A skilled musician,', explanation: 'This choice correctly places a comma after the introductory appositive <em>"A skilled musician"</em> before the name <em>"David."</em>' },
      { letter: 'C', text: 'A skilled, musician', explanation: 'This choice incorrectly places a comma between the adjective <em>"skilled"</em> and noun <em>"musician."</em>' },
      { letter: 'D', text: 'A skilled musician;', explanation: 'This choice incorrectly uses a semicolon. Appositives require commas.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'An introductory appositive must be followed by a comma before the noun it renames.'
  },

  // Items in a Series (11-18)
  {
    position: 11,
    title: 'Three Items - Oxford Comma',
    problem_text: 'The recipe calls for flour<u>, sugar and</u> eggs.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the Oxford comma before <em>"and"</em> in the series.' },
      { letter: 'B', text: ', sugar, and', explanation: 'This choice correctly uses the Oxford comma before <em>"and"</em> in the three-item series: <em>flour, sugar, and eggs.</em>' },
      { letter: 'C', text: '; sugar, and', explanation: 'This choice incorrectly uses a semicolon. Simple series use commas, not semicolons.' },
      { letter: 'D', text: ' sugar, and', explanation: 'This choice lacks the comma after <em>"flour"</em> needed to separate the first two items.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use commas to separate items in a series, including before the final conjunction (Oxford comma).'
  },

  {
    position: 12,
    title: 'Four Items in Series',
    problem_text: 'The course covers grammar<u> punctuation style and</u> usage.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks all necessary commas to separate the four items in the series.' },
      { letter: 'B', text: ', punctuation, style, and', explanation: 'This choice correctly separates all four items with commas: <em>grammar, punctuation, style, and usage.</em>' },
      { letter: 'C', text: ', punctuation, style and', explanation: 'This choice lacks the Oxford comma before <em>"and."</em>' },
      { letter: 'D', text: '; punctuation; style; and', explanation: 'This choice incorrectly uses semicolons. Simple series require commas, not semicolons.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use commas to separate all items in a series, including before the final conjunction.'
  },

  {
    position: 13,
    title: 'Series with Internal Commas',
    problem_text: 'We visited Portland<u>, Oregon, Seattle, Washington, and</u> Vancouver, Canada.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice incorrectly uses only commas when the series items contain internal commas, creating confusion.' },
      { letter: 'B', text: ', Oregon; Seattle, Washington; and', explanation: 'This choice correctly uses semicolons to separate the complex items: <em>Portland, Oregon; Seattle, Washington; and Vancouver, Canada.</em>' },
      { letter: 'C', text: ' Oregon; Seattle Washington; and', explanation: 'This choice incorrectly omits the comma within <em>"Seattle, Washington."</em>' },
      { letter: 'D', text: ', Oregon: Seattle, Washington: and', explanation: 'This choice incorrectly uses colons instead of semicolons.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When series items contain internal commas, use semicolons to separate the major items.'
  },

  {
    position: 14,
    title: 'Series of Actions',
    problem_text: 'She woke up<u> brushed her teeth got dressed and</u> left for work.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas to separate the four actions in the series.' },
      { letter: 'B', text: ', brushed her teeth, got dressed, and', explanation: 'This choice correctly uses commas to separate all four actions: <em>woke up, brushed her teeth, got dressed, and left.</em>' },
      { letter: 'C', text: ', brushed her teeth, got dressed and', explanation: 'This choice lacks the Oxford comma before <em>"and."</em>' },
      { letter: 'D', text: ' and brushed her teeth, got dressed, and', explanation: 'This choice incorrectly adds <em>"and"</em> after the first item.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use commas to separate all actions in a series of verbs.'
  },

  {
    position: 15,
    title: 'Series of Phrases',
    problem_text: 'The athlete trained by running every morning<u> by lifting weights in the afternoon and</u> by swimming each evening.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the comma after <em>"morning"</em> to separate the first two parallel phrases.' },
      { letter: 'B', text: ', by lifting weights in the afternoon, and', explanation: 'This choice correctly uses commas to separate the three parallel phrases beginning with <em>"by."</em>' },
      { letter: 'C', text: ' by lifting weights in the afternoon, and', explanation: 'This choice lacks the opening comma after <em>"morning."</em>' },
      { letter: 'D', text: '; by lifting weights in the afternoon; and', explanation: 'This choice incorrectly uses semicolons for a simple series.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use commas to separate three or more parallel phrases in a series.'
  },

  {
    position: 16,
    title: 'Two Items - No Comma',
    problem_text: 'The package includes a manual<u>, and</u> warranty information.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice incorrectly uses a comma before <em>"and"</em> when connecting only two items, not a series.' },
      { letter: 'B', text: ' and', explanation: 'This choice correctly omits the comma because only two items are being connected: <em>manual and warranty information.</em>' },
      { letter: 'C', text: '; and', explanation: 'This choice incorrectly uses a semicolon when connecting two items.' },
      { letter: 'D', text: ' or', explanation: 'This choice changes the meaning by using <em>"or"</em> instead of <em>"and."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Do not use a comma when connecting only two items with a conjunction (unless they are independent clauses).'
  },

  {
    position: 17,
    title: 'Series of Adjectives - Non-coordinate',
    problem_text: 'She wore a beautiful<u>, red silk</u> dress.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice incorrectly places a comma between <em>"red"</em> and <em>"silk."</em> These are non-coordinate adjectives.' },
      { letter: 'B', text: ' red silk', explanation: 'This choice correctly omits the comma between <em>"red"</em> and <em>"silk"</em> because they are non-coordinate adjectives (color and material).' },
      { letter: 'C', text: ', red, silk', explanation: 'This choice incorrectly adds commas between all adjectives.' },
      { letter: 'D', text: ' red, silk', explanation: 'This choice incorrectly places a comma between non-coordinate adjectives.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Do not use commas between non-coordinate adjectives (adjectives that build on each other or have a specific order).'
  },

  {
    position: 18,
    title: 'Series with Complex Final Item',
    problem_text: 'The museum exhibits paintings from the Renaissance<u>, sculptures from ancient Greece and</u> artifacts from ancient Egypt.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the Oxford comma before <em>"and"</em> in the series.' },
      { letter: 'B', text: ', sculptures from ancient Greece, and', explanation: 'This choice correctly uses commas to separate all three items in the series, including the Oxford comma before <em>"and."</em>' },
      { letter: 'C', text: '; sculptures from ancient Greece; and', explanation: 'This choice incorrectly uses semicolons for a simple series without internal punctuation.' },
      { letter: 'D', text: ' and sculptures from ancient Greece, and', explanation: 'This choice incorrectly uses <em>"and"</em> twice in the series.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use commas to separate all items in a series, even when items are lengthy phrases.'
  },

  // Compound Sentences (19-26)
  {
    position: 19,
    title: 'Comma Before FANBOYS',
    problem_text: 'The restaurant was crowded<u> but</u> we managed to find a table.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma before <em>"but"</em> when joining two independent clauses.' },
      { letter: 'B', text: ', but', explanation: 'This choice correctly places a comma before <em>"but"</em> when joining the independent clauses <em>"The restaurant was crowded"</em> and <em>"we managed to find a table."</em>' },
      { letter: 'C', text: '; but', explanation: 'This choice incorrectly uses a semicolon. FANBOYS conjunctions require a comma.' },
      { letter: 'D', text: ' - but', explanation: 'This choice incorrectly uses a dash instead of a comma.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma before FANBOYS conjunctions (For, And, Nor, But, Or, Yet, So) when joining independent clauses.'
  },

  {
    position: 20,
    title: 'Compound Predicate - No Comma',
    problem_text: 'Maria studied hard<u>, and</u> passed the exam with flying colors.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice incorrectly places a comma before <em>"and"</em> in a compound predicate where both verbs share the subject <em>"Maria."</em>' },
      { letter: 'B', text: ' and', explanation: 'This choice correctly omits the comma because <em>"studied hard"</em> and <em>"passed the exam"</em> form a compound predicate sharing the subject <em>"Maria."</em>' },
      { letter: 'C', text: '; and', explanation: 'This choice incorrectly uses a semicolon. Compound predicates need no punctuation.' },
      { letter: 'D', text: ' - and', explanation: 'This choice incorrectly uses a dash.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Do not use a comma before a conjunction joining a compound predicate (two verbs with the same subject).'
  },

  {
    position: 21,
    title: 'Compound Sentence with So',
    problem_text: 'The roads were icy<u> so</u> schools were closed for the day.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma before <em>"so"</em> when joining two independent clauses.' },
      { letter: 'B', text: ', so', explanation: 'This choice correctly places a comma before the FANBOYS conjunction <em>"so"</em> when joining the two independent clauses about icy roads causing school closures.' },
      { letter: 'C', text: '; so', explanation: 'This choice incorrectly uses a semicolon. FANBOYS conjunctions require commas, not semicolons.' },
      { letter: 'D', text: ' - so', explanation: 'This choice incorrectly uses a dash instead of a comma.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma before "so" when it joins two independent clauses.'
  },

  {
    position: 22,
    title: 'Compound with For',
    problem_text: 'We decided to leave early<u> for</u> the traffic was getting worse.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma before <em>"for"</em> when it functions as a FANBOYS conjunction joining two independent clauses.' },
      { letter: 'B', text: ', for', explanation: 'This choice correctly places a comma before <em>"for"</em> when it joins the two independent clauses <em>"We decided to leave early"</em> and <em>"the traffic was getting worse."</em>' },
      { letter: 'C', text: ' because', explanation: 'This choice changes the conjunction, though it would be grammatically correct.' },
      { letter: 'D', text: '; for', explanation: 'This choice incorrectly uses a semicolon before a FANBOYS conjunction.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When "for" means "because" and joins independent clauses, use a comma before it.'
  },

  {
    position: 23,
    title: 'Compound with Yet',
    problem_text: 'The evidence seemed conclusive<u> yet</u> the jury remained unconvinced.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma before <em>"yet"</em> when joining two independent clauses.' },
      { letter: 'B', text: ', yet', explanation: 'This choice correctly places a comma before <em>"yet"</em> when joining the contrasting independent clauses about the evidence and the jury.' },
      { letter: 'C', text: '; yet', explanation: 'This choice incorrectly uses a semicolon. FANBOYS conjunctions require commas.' },
      { letter: 'D', text: ' but', explanation: 'This choice changes the conjunction and still lacks a comma.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma before "yet" when joining two independent clauses showing contrast.'
  },

  {
    position: 24,
    title: 'Multiple Compound Actions',
    problem_text: 'The chef chopped the vegetables<u> and</u> sautéed them<u> and</u> added the spices.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice correctly omits commas because all three verbs share the same subject <em>"The chef"</em> in a compound predicate.' },
      { letter: 'B', text: ', and; and', explanation: 'This choice incorrectly mixes punctuation marks.' },
      { letter: 'C', text: ', and sautéed them, and', explanation: 'This choice incorrectly adds commas in a compound predicate.' },
      { letter: 'D', text: '. She sautéed them and', explanation: 'This choice incorrectly separates the actions into two sentences and changes the subject.' }
    ],
    correct_answer: 'A',
    answer_explanation: 'Multiple verbs sharing the same subject form a compound predicate and do not require commas.'
  },

  {
    position: 25,
    title: 'Compound with Nor',
    problem_text: 'The company did not meet its sales targets<u> nor did</u> it achieve customer satisfaction goals.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma before <em>"nor"</em> when joining two independent clauses.' },
      { letter: 'B', text: ', nor did', explanation: 'This choice correctly places a comma before <em>"nor"</em> when joining the two negative independent clauses.' },
      { letter: 'C', text: '; nor did', explanation: 'This choice incorrectly uses a semicolon before a FANBOYS conjunction.' },
      { letter: 'D', text: ' and it did not', explanation: 'This choice changes the parallel structure and meaning.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma before "nor" when joining two independent clauses in a negative compound sentence.'
  },

  {
    position: 26,
    title: 'Compound vs. Complex',
    problem_text: 'The team won the game<u> because</u> they practiced diligently.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice is correct. No comma is needed before <em>"because"</em> when the dependent clause comes after the independent clause.' },
      { letter: 'B', text: ', because', explanation: 'This choice incorrectly adds a comma before a subordinating conjunction at the end of a sentence.' },
      { letter: 'C', text: '; because', explanation: 'This choice incorrectly uses a semicolon before a subordinating conjunction.' },
      { letter: 'D', text: ' - because', explanation: 'This choice incorrectly uses a dash.' }
    ],
    correct_answer: 'A',
    answer_explanation: 'Do not use a comma before subordinating conjunctions (like "because") when the dependent clause follows the independent clause.'
  },

  // Non-restrictive Clauses (27-34)
  {
    position: 27,
    title: 'Non-restrictive Which Clause',
    problem_text: 'The museum<u> which opened last year</u> features modern art.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the non-restrictive clause <em>"which opened last year."</em>' },
      { letter: 'B', text: ', which opened last year,', explanation: 'This choice correctly sets off the non-restrictive clause <em>"which opened last year"</em> with commas on both sides.' },
      { letter: 'C', text: ' which opened last year,', explanation: 'This choice lacks the opening comma before <em>"which."</em>' },
      { letter: 'D', text: ', which opened last year', explanation: 'This choice lacks the closing comma after <em>"year."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Non-restrictive clauses providing extra information must be set off with commas. "Which" typically introduces non-restrictive clauses.'
  },

  {
    position: 28,
    title: 'Restrictive That Clause - No Commas',
    problem_text: 'The book<u>, that I borrowed from the library,</u> is due tomorrow.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice incorrectly uses commas around a restrictive clause that is essential to identifying which book.' },
      { letter: 'B', text: ' that I borrowed from the library', explanation: 'This choice correctly omits commas because the <em>"that"</em> clause is restrictive and essential to identifying which specific book is due.' },
      { letter: 'C', text: ' that I borrowed from the library,', explanation: 'This choice incorrectly adds a closing comma after a restrictive clause.' },
      { letter: 'D', text: ', which I borrowed from the library,', explanation: 'This choice changes <em>"that"</em> to <em>"which,"</em> making it non-restrictive.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Restrictive clauses essential to identify the noun should not be set off with commas. "That" introduces restrictive clauses.'
  },

  {
    position: 29,
    title: 'Non-restrictive Who Clause',
    problem_text: 'My neighbor<u> who works at the hospital</u> helped during the emergency.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the non-restrictive clause providing additional information about <em>"my neighbor."</em>' },
      { letter: 'B', text: ', who works at the hospital,', explanation: 'This choice correctly sets off the non-restrictive clause <em>"who works at the hospital"</em> with commas, indicating extra information.' },
      { letter: 'C', text: ' who works at the hospital,', explanation: 'This choice lacks the opening comma before <em>"who."</em>' },
      { letter: 'D', text: ', who works at the hospital', explanation: 'This choice lacks the closing comma after <em>"hospital."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use commas around non-restrictive relative clauses that add extra information.'
  },

  {
    position: 30,
    title: 'Restrictive Who Clause',
    problem_text: 'Students<u>, who complete all assignments,</u> will receive bonus points.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice incorrectly uses commas, suggesting all students will receive bonus points, when only those completing assignments should.' },
      { letter: 'B', text: ' who complete all assignments', explanation: 'This choice correctly omits commas because the clause is restrictive—it specifies which students receive bonus points.' },
      { letter: 'C', text: ' who complete all assignments,', explanation: 'This choice incorrectly adds a closing comma after a restrictive clause.' },
      { letter: 'D', text: ', who complete all assignments', explanation: 'This choice incorrectly adds an opening comma before a restrictive clause.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Omit commas around restrictive clauses that are essential to specify which people or things are being discussed.'
  },

  {
    position: 31,
    title: 'Non-restrictive Mid-Sentence',
    problem_text: 'The proposal<u> which was submitted last week</u> has been approved.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the non-restrictive clause <em>"which was submitted last week."</em>' },
      { letter: 'B', text: ', which was submitted last week,', explanation: 'This choice correctly uses commas to set off the non-restrictive clause providing additional information about when the proposal was submitted.' },
      { letter: 'C', text: ' which was submitted last week,', explanation: 'This choice lacks the opening comma before <em>"which."</em>' },
      { letter: 'D', text: ' that was submitted last week', explanation: 'This choice changes <em>"which"</em> to <em>"that,"</em> making it restrictive, which changes the meaning.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off non-restrictive clauses in the middle of sentences with commas on both sides.'
  },

  {
    position: 32,
    title: 'Multiple Non-restrictive Elements',
    problem_text: 'Dr. Smith<u> who specializes in cardiology and has 20 years of experience</u> will lead the study.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the long non-restrictive clause describing Dr. Smith.' },
      { letter: 'B', text: ', who specializes in cardiology and has 20 years of experience,', explanation: 'This choice correctly sets off the entire non-restrictive clause with commas, treating it as one unit of additional information.' },
      { letter: 'C', text: ' who specializes in cardiology, and has 20 years of experience,', explanation: 'This choice incorrectly places a comma in the middle of the relative clause.' },
      { letter: 'D', text: ', who specializes in cardiology and has 20 years of experience', explanation: 'This choice lacks the closing comma after <em>"experience."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off the entire non-restrictive clause with commas, even when it contains compound elements.'
  },

  {
    position: 33,
    title: 'End of Sentence Non-restrictive',
    problem_text: 'We visited the Louvre<u> which houses the Mona Lisa</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the opening comma before the non-restrictive clause <em>"which houses the Mona Lisa."</em>' },
      { letter: 'B', text: ', which houses the Mona Lisa', explanation: 'This choice correctly places a comma before the non-restrictive clause at the end of the sentence.' },
      { letter: 'C', text: ' which houses the Mona Lisa,', explanation: 'This choice incorrectly adds a comma before the period.' },
      { letter: 'D', text: ' that houses the Mona Lisa', explanation: 'This choice changes <em>"which"</em> to <em>"that,"</em> making it restrictive.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma before a non-restrictive clause at the end of a sentence.'
  },

  {
    position: 34,
    title: 'Where Clause - Non-restrictive',
    problem_text: 'We traveled to Paris<u> where we visited the Eiffel Tower</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the comma before the non-restrictive <em>"where"</em> clause.' },
      { letter: 'B', text: ', where we visited the Eiffel Tower', explanation: 'This choice correctly places a comma before the non-restrictive <em>"where"</em> clause providing additional information about Paris.' },
      { letter: 'C', text: ' where, we visited the Eiffel Tower', explanation: 'This choice incorrectly places a comma after <em>"where."</em>' },
      { letter: 'D', text: '; where we visited the Eiffel Tower', explanation: 'This choice incorrectly uses a semicolon before a dependent clause.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma before non-restrictive "where" clauses that add extra information.'
  },

  // Appositives (35-39)
  {
    position: 35,
    title: 'Essential Appositive - No Commas',
    problem_text: 'My sister<u> Sarah</u> is studying medicine.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice is correct when the speaker has multiple sisters and needs to specify which one. The name <em>"Sarah"</em> is essential.' },
      { letter: 'B', text: ', Sarah,', explanation: 'This choice adds commas, suggesting the speaker has only one sister, making the name non-essential.' },
      { letter: 'C', text: ' Sarah,', explanation: 'This choice inconsistently uses only one comma.' },
      { letter: 'D', text: ', Sarah', explanation: 'This choice incorrectly uses only an opening comma.' }
    ],
    correct_answer: 'A',
    answer_explanation: 'Omit commas around essential appositives needed to identify which person or thing is meant.'
  },

  {
    position: 36,
    title: 'Non-essential Appositive',
    problem_text: 'My best friend<u> Jennifer</u> won the scholarship.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the non-essential appositive <em>"Jennifer."</em> Since there is only one best friend, the name is extra information.' },
      { letter: 'B', text: ', Jennifer,', explanation: 'This choice correctly sets off the non-essential appositive <em>"Jennifer"</em> with commas because the speaker has only one best friend.' },
      { letter: 'C', text: ' Jennifer,', explanation: 'This choice lacks the opening comma before <em>"Jennifer."</em>' },
      { letter: 'D', text: ', Jennifer', explanation: 'This choice lacks the closing comma after <em>"Jennifer."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off non-essential appositives with commas when the noun is already clearly identified.'
  },

  {
    position: 37,
    title: 'Longer Appositive Phrase',
    problem_text: 'The CEO<u> a Harvard Business School graduate</u> announced the merger.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the non-essential appositive phrase <em>"a Harvard Business School graduate."</em>' },
      { letter: 'B', text: ', a Harvard Business School graduate,', explanation: 'This choice correctly sets off the appositive phrase providing additional information about the CEO with commas.' },
      { letter: 'C', text: ' - a Harvard Business School graduate -', explanation: 'This choice uses dashes, which is also acceptable but commas are more standard.' },
      { letter: 'D', text: ', a Harvard Business School graduate', explanation: 'This choice lacks the closing comma after <em>"graduate."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off non-essential appositive phrases with commas.'
  },

  {
    position: 38,
    title: 'Appositive at End',
    problem_text: 'We met with Dr. Martinez<u> the department chair</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the comma before the appositive <em>"the department chair."</em>' },
      { letter: 'B', text: ', the department chair', explanation: 'This choice correctly places a comma before the appositive at the end of the sentence.' },
      { letter: 'C', text: ' - the department chair', explanation: 'This choice uses a dash, which is acceptable but a comma is more standard.' },
      { letter: 'D', text: '; the department chair', explanation: 'This choice incorrectly uses a semicolon before an appositive.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma before an appositive at the end of a sentence.'
  },

  {
    position: 39,
    title: 'Complex Appositive',
    problem_text: 'The novel<u> a bestselling mystery thriller</u> won several awards.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the appositive phrase <em>"a bestselling mystery thriller."</em>' },
      { letter: 'B', text: ', a bestselling mystery thriller,', explanation: 'This choice correctly sets off the appositive phrase with commas on both sides.' },
      { letter: 'C', text: ' a bestselling mystery thriller,', explanation: 'This choice lacks the opening comma before <em>"a bestselling."</em>' },
      { letter: 'D', text: ', a bestselling mystery thriller', explanation: 'This choice lacks the closing comma after <em>"thriller."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off appositive phrases that rename or provide additional information with commas.'
  },

  // Parenthetical/Interrupters (40-43)
  {
    position: 40,
    title: 'Parenthetical However',
    problem_text: 'The plan<u> however</u> needs significant revision.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the parenthetical interrupter <em>"however."</em>' },
      { letter: 'B', text: ', however,', explanation: 'This choice correctly sets off the interrupter <em>"however"</em> with commas on both sides.' },
      { letter: 'C', text: ' however,', explanation: 'This choice lacks the opening comma before <em>"however."</em>' },
      { letter: 'D', text: ', however', explanation: 'This choice lacks the closing comma after <em>"however."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off parenthetical elements (conjunctive adverbs in the middle of sentences) with commas.'
  },

  {
    position: 41,
    title: 'Parenthetical Indeed',
    problem_text: 'The results<u> indeed</u> confirmed our hypothesis.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the parenthetical word <em>"indeed."</em>' },
      { letter: 'B', text: ', indeed,', explanation: 'This choice correctly sets off the interrupter <em>"indeed"</em> with commas on both sides.' },
      { letter: 'C', text: ' indeed,', explanation: 'This choice lacks the opening comma before <em>"indeed."</em>' },
      { letter: 'D', text: ', indeed', explanation: 'This choice lacks the closing comma after <em>"indeed."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off parenthetical emphasizers with commas.'
  },

  {
    position: 42,
    title: 'Parenthetical Of Course',
    problem_text: 'The solution<u> of course</u> was simpler than we thought.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the parenthetical phrase <em>"of course."</em>' },
      { letter: 'B', text: ', of course,', explanation: 'This choice correctly sets off the parenthetical phrase <em>"of course"</em> with commas on both sides.' },
      { letter: 'C', text: ' of course,', explanation: 'This choice lacks the opening comma before <em>"of course."</em>' },
      { letter: 'D', text: ', of course', explanation: 'This choice lacks the closing comma after <em>"course."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off parenthetical phrases that could be removed without changing the basic meaning with commas.'
  },

  {
    position: 43,
    title: 'Parenthetical In Fact',
    problem_text: 'She was<u> in fact</u> the youngest person to win the award.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the parenthetical phrase <em>"in fact."</em>' },
      { letter: 'B', text: ', in fact,', explanation: 'This choice correctly sets off the parenthetical phrase <em>"in fact"</em> with commas on both sides.' },
      { letter: 'C', text: ' in fact,', explanation: 'This choice lacks the opening comma before <em>"in fact."</em>' },
      { letter: 'D', text: ', in fact', explanation: 'This choice lacks the closing comma after <em>"fact."</em>' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off parenthetical transitional phrases with commas.'
  },

  // Dates, Addresses, Direct Address (44-47)
  {
    position: 44,
    title: 'Date with Day and Year',
    problem_text: 'On July 4<u>, 1776 the</u> Declaration of Independence was signed.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after the year <em>"1776."</em>' },
      { letter: 'B', text: ', 1776, the', explanation: 'This choice correctly places commas both before and after the year <em>"1776"</em> in the date.' },
      { letter: 'C', text: ' 1776, the', explanation: 'This choice lacks the comma before <em>"1776."</em>' },
      { letter: 'D', text: ', 1776; the', explanation: 'This choice incorrectly uses a semicolon after the year.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When a date includes day, month, and year, use commas before and after the year.'
  },

  {
    position: 45,
    title: 'City and State',
    problem_text: 'The conference will be held in Chicago<u>, Illinois in</u> September.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the required comma after <em>"Illinois."</em>' },
      { letter: 'B', text: ', Illinois, in', explanation: 'This choice correctly places commas both before and after the state name <em>"Illinois."</em>' },
      { letter: 'C', text: ' Illinois, in', explanation: 'This choice lacks the comma before <em>"Illinois."</em>' },
      { letter: 'D', text: ', Illinois; in', explanation: 'This choice incorrectly uses a semicolon after the state.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When a city and state appear in text, use commas before and after the state name.'
  },

  {
    position: 46,
    title: 'Direct Address',
    problem_text: 'Thank you<u> Dr. Johnson</u> for your assistance.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks commas around the direct address <em>"Dr. Johnson."</em>' },
      { letter: 'B', text: ', Dr. Johnson,', explanation: 'This choice correctly sets off the name in direct address with commas on both sides.' },
      { letter: 'C', text: ' Dr. Johnson,', explanation: 'This choice lacks the opening comma before the name.' },
      { letter: 'D', text: ', Dr. Johnson', explanation: 'This choice lacks the closing comma after the name.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Set off names in direct address with commas.'
  },

  {
    position: 47,
    title: 'Address at Beginning',
    problem_text: '<u>Ladies and gentlemen</u> please take your seats.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the comma after the direct address <em>"Ladies and gentlemen."</em>' },
      { letter: 'B', text: 'Ladies and gentlemen,', explanation: 'This choice correctly places a comma after the direct address at the beginning of the sentence.' },
      { letter: 'C', text: 'Ladies, and gentlemen', explanation: 'This choice incorrectly places a comma in the middle of the address phrase.' },
      { letter: 'D', text: 'Ladies and gentlemen;', explanation: 'This choice incorrectly uses a semicolon after direct address.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma after a name or title in direct address at the beginning of a sentence.'
  },

  // Coordinate Adjectives & Contrasting Elements (48-50)
  {
    position: 48,
    title: 'Coordinate Adjectives',
    problem_text: 'It was a long<u> difficult</u> journey.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the comma between the coordinate adjectives <em>"long"</em> and <em>"difficult."</em>' },
      { letter: 'B', text: ', difficult', explanation: 'This choice correctly places a comma between coordinate adjectives <em>"long"</em> and <em>"difficult"</em> that equally modify <em>"journey."</em>' },
      { letter: 'C', text: ' and difficult', explanation: 'This choice works but adding <em>"and"</em> is unnecessary when a comma suffices.' },
      { letter: 'D', text: '; difficult', explanation: 'This choice incorrectly uses a semicolon between adjectives.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use commas to separate coordinate adjectives (adjectives that equally modify the noun and could be connected with "and").'
  },

  {
    position: 49,
    title: 'Contrasting Element',
    problem_text: 'The assignment is challenging<u> not</u> impossible.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the comma before the contrasting element <em>"not impossible."</em>' },
      { letter: 'B', text: ', not', explanation: 'This choice correctly places a comma before the contrasting element introduced by <em>"not."</em>' },
      { letter: 'C', text: ' but not', explanation: 'This choice adds <em>"but,"</em> which is acceptable but still needs a comma.' },
      { letter: 'D', text: '; not', explanation: 'This choice incorrectly uses a semicolon before a contrasting element.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma to set off contrasting elements introduced by "not."'
  },

  {
    position: 50,
    title: 'Tag Question',
    problem_text: 'You understand the instructions<u> don\'t you</u>?',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'This choice lacks the comma before the tag question <em>"don\'t you."</em>' },
      { letter: 'B', text: ', don\'t you', explanation: 'This choice correctly places a comma before the tag question at the end of the sentence.' },
      { letter: 'C', text: '; don\'t you', explanation: 'This choice incorrectly uses a semicolon before a tag question.' },
      { letter: 'D', text: ' - don\'t you', explanation: 'This choice incorrectly uses a dash instead of a comma.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use a comma to set off tag questions at the end of statements.'
  }
];

async function addTopic12Questions() {
  try {
    console.log('Adding 50 practice questions for Topic 1.2 - Essential Comma Rules...\\n');

    let added = 0;
    let errors = 0;

    for (const question of questions) {
      try {
        const { error } = await supabase
          .from('lesson_examples')
          .insert({
            lesson_id: LESSON_ID,
            position: question.position,
            title: question.title,
            problem_text: question.problem_text,
            choices: question.choices,
            correct_answer: question.correct_answer,
            answer_explanation: question.answer_explanation,
            solution_steps: [],
            diagram_svg: null,
            is_worked_example: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error(`Error adding question ${question.position}:`, error);
          errors++;
        } else {
          added++;
          console.log(`✓ ${question.position}. ${question.title}`);
        }
      } catch (err) {
        console.error(`Exception adding question ${question.position}:`, err.message);
        errors++;
      }
    }

    console.log(`\\n✓ Complete! Added ${added}/${questions.length} questions (${errors} errors)`);

  } catch (err) {
    console.error('Error:', err);
  }
}

addTopic12Questions();
