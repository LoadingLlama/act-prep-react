const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '66776383-9334-4efb-bd72-74b1bbeab8ac'; // Topic 1.3 - Advanced Punctuation

const questions = [
  // Semicolons (questions 6-15)
  {
    position: 6,
    title: 'Semicolon vs. Comma with Conjunction',
    problem_text: '<p>The team practiced every day<span class="blank-marker">____</span>they were determined to win the championship.</p>',
    choices: [
      { letter: 'A', text: '; and', explanation: 'Semicolons should NOT be used before coordinating conjunctions (FANBOYS) when joining independent clauses. Use a comma instead.' },
      { letter: 'B', text: ', and', explanation: 'This correctly uses a comma before the coordinating conjunction <em>"and"</em> to join two independent clauses.' },
      { letter: 'C', text: '; because', explanation: 'Semicolons should not be used before subordinating conjunctions like <em>"because."</em>' },
      { letter: 'D', text: 'and', explanation: 'A comma is required before <em>"and"</em> when joining two independent clauses.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 7,
    title: 'Semicolon with Transitional Word',
    problem_text: '<p>The experiment failed<span class="blank-marker">____</span>however, the scientists learned valuable lessons from it.</p>',
    choices: [
      { letter: 'A', text: '; however,', explanation: 'This correctly uses a semicolon before the conjunctive adverb <em>"however"</em> to join two independent clauses, with a comma after it.' },
      { letter: 'B', text: ', however,', explanation: 'A comma alone cannot join two independent clauses; this creates a comma splice.' },
      { letter: 'C', text: '; however', explanation: 'A comma is needed after <em>"however"</em> when it introduces an independent clause.' },
      { letter: 'D', text: 'however,', explanation: 'A semicolon or period is needed before <em>"however"</em> to properly separate the two independent clauses.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 8,
    title: 'Semicolon in Complex List',
    problem_text: '<p>The conference included speakers from Portland<span class="blank-marker">____</span>Oregon; Austin, Texas; and Seattle, Washington.</p>',
    choices: [
      { letter: 'A', text: '; Oregon,', explanation: 'Semicolons are not needed after individual city-state pairs in a simple list.' },
      { letter: 'B', text: ', Oregon,', explanation: 'While a comma after <em>"Oregon"</em> is correct, a semicolon is needed before <em>"Austin"</em> to separate complex list items that contain commas.' },
      { letter: 'C', text: ', Oregon;', explanation: 'This correctly uses commas within each city-state pair and semicolons between the pairs in the complex list.' },
      { letter: 'D', text: ' Oregon;', explanation: 'A comma is needed after <em>"Portland"</em> to separate the city from the state.' }
    ],
    correct_answer: 'C'
  },
  {
    position: 9,
    title: 'When NOT to Use a Semicolon',
    problem_text: '<p>The library offers many resources<span class="blank-marker">____</span>books, computers, and study rooms.</p>',
    choices: [
      { letter: 'A', text: ';', explanation: 'A semicolon cannot introduce a list. Use a colon instead.' },
      { letter: 'B', text: ':', explanation: 'This correctly uses a colon to introduce the list of resources.' },
      { letter: 'C', text: ',', explanation: 'A comma creates a run-on sentence here. A colon is needed to introduce the list.' },
      { letter: 'D', text: '; such as', explanation: 'Semicolons should not be used before phrases like <em>"such as."</em>' }
    ],
    correct_answer: 'B'
  },
  {
    position: 10,
    title: 'Semicolon Between Related Sentences',
    problem_text: '<p>Marie Curie was a brilliant scientist<span class="blank-marker">____</span>she was the first woman to win a Nobel Prize.</p>',
    choices: [
      { letter: 'A', text: ',', explanation: 'A comma alone cannot join two independent clauses without a coordinating conjunction; this creates a comma splice.' },
      { letter: 'B', text: ';', explanation: 'This correctly uses a semicolon to join two closely related independent clauses.' },
      { letter: 'C', text: '', explanation: 'Joining two independent clauses without punctuation creates a run-on sentence.' },
      { letter: 'D', text: ': she', explanation: 'While a colon can introduce an explanation, it should not be followed by lowercase <em>"she"</em> in this context.' }
    ],
    correct_answer: 'B'
  },

  // Colons (questions 11-18)
  {
    position: 11,
    title: 'Colon Before Explanation',
    problem_text: '<p>The coach had one rule<span class="blank-marker">____</span>always give your best effort.</p>',
    choices: [
      { letter: 'A', text: ':', explanation: 'This correctly uses a colon after a complete sentence to introduce an explanation or elaboration.' },
      { letter: 'B', text: ';', explanation: 'A semicolon is used between two independent clauses, but <em>"always give your best effort"</em> is not an independent clause.' },
      { letter: 'C', text: ',', explanation: 'A comma is too weak here; a colon is needed to introduce the explanation.' },
      { letter: 'D', text: ', which was', explanation: 'This creates wordiness. A simple colon is more concise.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 12,
    title: 'Colon After Complete Sentence',
    problem_text: '<p>The museum features work from several periods<span class="blank-marker">____</span>Renaissance, Baroque, and Modern.</p>',
    choices: [
      { letter: 'A', text: ': the', explanation: 'Adding <em>"the"</em> is unnecessary and creates awkward grammar.' },
      { letter: 'B', text: ':', explanation: 'This correctly uses a colon after a complete sentence to introduce a list.' },
      { letter: 'C', text: ' including:', explanation: 'While grammatically possible, the colon alone is more concise and preferred.' },
      { letter: 'D', text: ', such as', explanation: 'A colon is stronger and more appropriate than a comma phrase for introducing this list.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 13,
    title: 'When NOT to Use a Colon',
    problem_text: '<p>Her favorite activities include<span class="blank-marker">____</span>reading, hiking, and painting.</p>',
    choices: [
      { letter: 'A', text: ':', explanation: 'A colon should not follow a verb directly. The sentence is incomplete before the punctuation.' },
      { letter: 'B', text: ' reading,', explanation: 'This correctly continues the sentence without punctuation, as <em>"include"</em> is the verb that takes the list as its direct object.' },
      { letter: 'C', text: '; reading,', explanation: 'A semicolon cannot follow a verb in this construction.' },
      { letter: 'D', text: ' are: reading,', explanation: 'This changes the meaning and creates grammatical errors.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 14,
    title: 'Colon in Time Format',
    problem_text: '<p>The meeting is scheduled for 3<span class="blank-marker">____</span>30 PM.</p>',
    choices: [
      { letter: 'A', text: '.', explanation: 'A period is not the standard punctuation for time format.' },
      { letter: 'B', text: ':', explanation: 'This correctly uses a colon to separate hours from minutes in time notation.' },
      { letter: 'C', text: ';', explanation: 'A semicolon is not used in time format.' },
      { letter: 'D', text: '-', explanation: 'A dash is not the standard punctuation for time format.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 15,
    title: 'Colon After Incomplete Sentence',
    problem_text: '<p>The ingredients are<span class="blank-marker">____</span>flour, sugar, eggs, and butter.</p>',
    choices: [
      { letter: 'A', text: ':', explanation: 'A colon should not follow the verb <em>"are"</em> directly. What comes before a colon must be a complete sentence.' },
      { letter: 'B', text: ' flour,', explanation: 'This correctly continues without punctuation, as the list completes the predicate begun by <em>"are."</em>' },
      { letter: 'C', text: ' as follows:', explanation: 'While this creates a complete sentence before the colon, it adds unnecessary wordiness.' },
      { letter: 'D', text: '; flour,', explanation: 'A semicolon cannot follow a linking verb in this construction.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 16,
    title: 'Colon with Quotation',
    problem_text: '<p>The professor made an important point<span class="blank-marker">____</span>"Success requires both talent and perseverance."</p>',
    choices: [
      { letter: 'A', text: ',', explanation: 'A comma is typically used before direct quotations in dialogue, but a colon is stronger when introducing a formal quotation or statement.' },
      { letter: 'B', text: ':', explanation: 'This correctly uses a colon to formally introduce the quotation that explains the point.' },
      { letter: 'C', text: ';', explanation: 'A semicolon is not used to introduce quotations.' },
      { letter: 'D', text: '—', explanation: 'While a dash could work, a colon is more formal and appropriate for academic writing.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 17,
    title: 'Colon vs. Semicolon Choice',
    problem_text: '<p>The solution is simple<span class="blank-marker">____</span>work harder and smarter.</p>',
    choices: [
      { letter: 'A', text: ';', explanation: 'A semicolon joins two independent clauses, but <em>"work harder and smarter"</em> is an imperative, not an independent clause.' },
      { letter: 'B', text: ':', explanation: 'This correctly uses a colon to introduce the explanation of what the simple solution is.' },
      { letter: 'C', text: ',', explanation: 'A comma is too weak to introduce this explanatory element.' },
      { letter: 'D', text: '—to', explanation: 'Adding <em>"to"</em> changes the grammar unnecessarily.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 18,
    title: 'Colon in Ratios',
    problem_text: '<p>The recipe calls for a ratio of 2<span class="blank-marker">____</span>1 water to rice.</p>',
    choices: [
      { letter: 'A', text: ' to', explanation: 'While <em>"to"</em> can express ratios in words, the colon is the standard punctuation in numeric ratios.' },
      { letter: 'B', text: ':', explanation: 'This correctly uses a colon to express the numerical ratio.' },
      { letter: 'C', text: '-', explanation: 'A dash is not standard punctuation for expressing ratios.' },
      { letter: 'D', text: '/', explanation: 'A forward slash could work, but a colon is the traditional and preferred punctuation for ratios.' }
    ],
    correct_answer: 'B'
  },

  // Dashes (questions 19-26)
  {
    position: 19,
    title: 'Pair of Dashes for Interruption',
    problem_text: '<p>The author<span class="blank-marker">____</span>who wrote over thirty novels<span class="blank-marker">____</span>received the lifetime achievement award.</p>',
    choices: [
      { letter: 'A', text: '—, —', explanation: 'Mixing a dash with a comma is inconsistent. Use matching punctuation for both sides of a parenthetical element.' },
      { letter: 'B', text: '—, —,', explanation: 'Use a pair of dashes to set off the parenthetical phrase <em>"who wrote over thirty novels."</em>' },
      { letter: 'C', text: ', ,', explanation: 'While commas work, dashes create more emphasis for this significant detail.' },
      { letter: 'D', text: '— who wrote over thirty novels —', explanation: 'This correctly uses matching em dashes to set off the parenthetical information with emphasis.' }
    ],
    correct_answer: 'D'
  },
  {
    position: 20,
    title: 'Single Dash for Emphasis',
    problem_text: '<p>She had one goal this semester<span class="blank-marker">____</span>perfect attendance.</p>',
    choices: [
      { letter: 'A', text: ':', explanation: 'A colon works here but lacks the dramatic emphasis that a dash provides.' },
      { letter: 'B', text: '—', explanation: 'This correctly uses an em dash to create dramatic emphasis before the revelation.' },
      { letter: 'C', text: ',', explanation: 'A comma is too weak to highlight this important information.' },
      { letter: 'D', text: ';', explanation: 'A semicolon is used between independent clauses, not before a fragment used for emphasis.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 21,
    title: 'Dash vs. Parentheses',
    problem_text: '<p>Three students<span class="blank-marker">____</span>Maya, James, and Sophia<span class="blank-marker">____</span>earned scholarships.</p>',
    choices: [
      { letter: 'A', text: '— Maya, James, and Sophia —', explanation: 'This correctly uses em dashes to set off the list of names with moderate emphasis.' },
      { letter: 'B', text: ' (Maya, James, and Sophia)', explanation: 'Parentheses would de-emphasize these important names.' },
      { letter: 'C', text: ', Maya, James, and Sophia,', explanation: 'Commas create confusion about whether the three students are being named or additional information is being added.' },
      { letter: 'D', text: ': Maya, James, and Sophia:', explanation: 'Two colons is grammatically incorrect.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 22,
    title: 'Dash Before Explanation',
    problem_text: '<p>The test was postponed<span class="blank-marker">____</span>the fire alarm went off during the exam.</p>',
    choices: [
      { letter: 'A', text: ':', explanation: 'While a colon could work, it\'s typically used after a complete independent clause to introduce a list or explanation.' },
      { letter: 'B', text: '—', explanation: 'This correctly uses an em dash to introduce an explanatory clause with emphasis.' },
      { letter: 'C', text: ',', explanation: 'This creates a comma splice by joining two independent clauses with only a comma.' },
      { letter: 'D', text: ' because', explanation: 'While <em>"because"</em> works grammatically, the dash provides stylistic emphasis on the unexpected reason.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 23,
    title: 'Misuse of Dash',
    problem_text: '<p>The menu includes<span class="blank-marker">____</span>sandwiches, salads, and soups.</p>',
    choices: [
      { letter: 'A', text: '—', explanation: 'A dash should not follow a verb directly. The verb <em>"includes"</em> takes the list as its direct object.' },
      { letter: 'B', text: ':', explanation: 'A colon should not follow a verb directly. What comes before must be a complete sentence.' },
      { letter: 'C', text: ' sandwiches,', explanation: 'This correctly continues the sentence without punctuation, completing the verb phrase.' },
      { letter: 'D', text: ' the following—', explanation: 'This creates unnecessary wordiness.' }
    ],
    correct_answer: 'C'
  },
  {
    position: 24,
    title: 'Dash for Abrupt Break',
    problem_text: '<p>"I think we should<span class="blank-marker">____</span>wait, did you hear that noise?"</p>',
    choices: [
      { letter: 'A', text: '—', explanation: 'This correctly uses an em dash to show an abrupt break or interruption in thought.' },
      { letter: 'B', text: ',', explanation: 'A comma doesn\'t convey the sudden interruption in the speaker\'s thought.' },
      { letter: 'C', text: ';', explanation: 'A semicolon is too formal and doesn\'t show the abrupt break in thought.' },
      { letter: 'D', text: '...', explanation: 'Ellipses show trailing off or hesitation, not an abrupt interruption.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 25,
    title: 'Dash with Commas in Interruption',
    problem_text: '<p>The ingredients<span class="blank-marker">____</span>butter, sugar, flour, and eggs<span class="blank-marker">____</span>were already measured.</p>',
    choices: [
      { letter: 'A', text: ', butter, sugar, flour, and eggs,', explanation: 'Using commas to set off a list that contains commas creates confusion.' },
      { letter: 'B', text: '— butter, sugar, flour, and eggs —', explanation: 'This correctly uses em dashes instead of commas to set off the parenthetical list that already contains commas.' },
      { letter: 'C', text: ': butter, sugar, flour, and eggs:', explanation: 'Two colons is grammatically incorrect.' },
      { letter: 'D', text: ' (butter, sugar, flour, and eggs)', explanation: 'Parentheses would work but de-emphasize the important list of ingredients.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 26,
    title: 'Dash in Formal Writing',
    problem_text: '<p>The study revealed surprising results<span class="blank-marker">____</span>social media use correlates with decreased sleep quality.</p>',
    choices: [
      { letter: 'A', text: '—', explanation: 'While a dash works, it may be too informal for academic writing.' },
      { letter: 'B', text: ':', explanation: 'This correctly uses a colon, which is more formal and appropriate for academic writing when introducing an explanation.' },
      { letter: 'C', text: ',', explanation: 'A comma creates a comma splice by joining two independent clauses.' },
      { letter: 'D', text: ';', explanation: 'A semicolon works but doesn\'t show that the second clause explains the first.' }
    ],
    correct_answer: 'B'
  },

  // Apostrophes - Possessives (questions 27-35)
  {
    position: 27,
    title: 'Singular Possessive',
    problem_text: '<p>The<span class="blank-marker">____</span> collar was blue.</p>',
    choices: [
      { letter: 'A', text: 'dogs', explanation: 'This is plural, not possessive. An apostrophe is needed to show the collar belongs to the dog.' },
      { letter: 'B', text: 'dog\'s', explanation: 'This correctly uses an apostrophe before <em>s</em> to show the singular possessive form.' },
      { letter: 'C', text: 'dogs\'', explanation: 'This shows plural possessive (multiple dogs), but the sentence refers to one dog.' },
      { letter: 'D', text: 'dog', explanation: 'This lacks the possessive form needed to show the collar belongs to the dog.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 28,
    title: 'Plural Possessive',
    problem_text: '<p>All three<span class="blank-marker">____</span> backpacks were stolen.</p>',
    choices: [
      { letter: 'A', text: 'student\'s', explanation: 'This shows singular possessive (one student), but the sentence refers to three students.' },
      { letter: 'B', text: 'students', explanation: 'This is plural but not possessive. An apostrophe is needed.' },
      { letter: 'C', text: 'students\'', explanation: 'This correctly uses an apostrophe after <em>s</em> to show plural possessive (backpacks belong to multiple students).' },
      { letter: 'D', text: 'students\'s', explanation: 'For plural nouns ending in <em>s</em>, add only an apostrophe, not apostrophe-s.' }
    ],
    correct_answer: 'C'
  },
  {
    position: 29,
    title: 'Possessive with Name Ending in S',
    problem_text: '<p>We attended<span class="blank-marker">____</span> graduation party.</p>',
    choices: [
      { letter: 'A', text: 'James', explanation: 'This lacks the possessive form needed to show the party belongs to James.' },
      { letter: 'B', text: 'James\'s', explanation: 'This correctly forms the possessive by adding apostrophe-s to the singular name James.' },
      { letter: 'C', text: 'James\'', explanation: 'While some style guides allow just an apostrophe after <em>s</em>, adding apostrophe-s is more common and preferred.' },
      { letter: 'D', text: 'Jame\'s', explanation: 'Never drop the final <em>s</em> when forming a possessive.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 30,
    title: 'Its vs. It\'s',
    problem_text: '<p>The committee announced<span class="blank-marker">____</span> decision yesterday.</p>',
    choices: [
      { letter: 'A', text: 'it\'s', explanation: '<em>"It\'s"</em> means <em>"it is"</em> or <em>"it has."</em> The possessive form of <em>"it"</em> has no apostrophe.' },
      { letter: 'B', text: 'its', explanation: 'This correctly uses <em>"its"</em> (no apostrophe) as the possessive form meaning <em>"belonging to it."</em>' },
      { letter: 'C', text: 'its\'', explanation: 'The possessive <em>"its"</em> never takes an apostrophe.' },
      { letter: 'D', text: 'their', explanation: 'While <em>"committee"</em> is collective, ACT prefers treating it as singular, using <em>"its."</em>' }
    ],
    correct_answer: 'B'
  },
  {
    position: 31,
    title: 'Whose vs. Who\'s',
    problem_text: '<p>The student<span class="blank-marker">____</span> project won first place was congratulated by the principal.</p>',
    choices: [
      { letter: 'A', text: 'who\'s', explanation: '<em>"Who\'s"</em> means <em>"who is"</em> or <em>"who has."</em> The possessive form is <em>"whose."</em>' },
      { letter: 'B', text: 'whose', explanation: 'This correctly uses <em>"whose"</em> (no apostrophe) as the possessive form meaning <em>"belonging to whom."</em>' },
      { letter: 'C', text: 'whos', explanation: 'This is not a word. The possessive form is <em>"whose."</em>' },
      { letter: 'D', text: 'who', explanation: '<em>"Who"</em> is not possessive and doesn\'t show that the project belongs to the student.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 32,
    title: 'Irregular Plural Possessive',
    problem_text: '<p>The<span class="blank-marker">____</span> toys were scattered across the floor.</p>',
    choices: [
      { letter: 'A', text: 'childrens', explanation: 'This lacks the apostrophe needed for the possessive form.' },
      { letter: 'B', text: 'children\'s', explanation: 'This correctly adds apostrophe-s to the irregular plural <em>"children"</em> to form the possessive.' },
      { letter: 'C', text: 'childrens\'', explanation: 'Since <em>"children"</em> doesn\'t end in <em>s</em>, use apostrophe-s, not just an apostrophe.' },
      { letter: 'D', text: 'children', explanation: 'This is plural but not possessive. An apostrophe is needed to show the toys belong to the children.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 33,
    title: 'Joint vs. Individual Possession',
    problem_text: '<p>Tom and<span class="blank-marker">____</span> presentation received an A grade.</p>',
    choices: [
      { letter: 'A', text: 'Sarah\'s', explanation: 'This correctly shows joint possession by adding the possessive only to the last name when two people share ownership.' },
      { letter: 'B', text: 'Sarahs', explanation: 'This lacks the apostrophe needed to show possession.' },
      { letter: 'C', text: 'Sarah', explanation: 'This lacks the possessive form needed to show the presentation belongs to both.' },
      { letter: 'D', text: 'Sarah\'s\'', explanation: 'Double apostrophes are never correct.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 34,
    title: 'Plural Not Possessive',
    problem_text: '<p>The library has thousands of<span class="blank-marker">____</span> available for checkout.</p>',
    choices: [
      { letter: 'A', text: 'book\'s', explanation: 'This is possessive, but the sentence simply needs a plural (multiple books), not possession.' },
      { letter: 'B', text: 'books', explanation: 'This correctly uses the simple plural form without an apostrophe.' },
      { letter: 'C', text: 'books\'', explanation: 'This is plural possessive, but nothing belongs to the books here.' },
      { letter: 'D', text: 'book', explanation: 'This is singular, but <em>"thousands"</em> requires a plural noun.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 35,
    title: 'Your vs. You\'re',
    problem_text: '<p><span class="blank-marker">____</span> going to love this new restaurant.</p>',
    choices: [
      { letter: 'A', text: 'Your', explanation: '<em>"Your"</em> is possessive (belonging to you). The sentence needs <em>"you are."</em>' },
      { letter: 'B', text: 'You\'re', explanation: 'This correctly uses the contraction <em>"you\'re"</em> meaning <em>"you are."</em>' },
      { letter: 'C', text: 'Youre', explanation: 'This is not a word. Contractions require apostrophes.' },
      { letter: 'D', text: 'Yore', explanation: '<em>"Yore"</em> is an archaic word meaning <em>"long ago"</em> and is not appropriate here.' }
    ],
    correct_answer: 'B'
  },

  // Quotation Marks (questions 36-42)
  {
    position: 36,
    title: 'Quotation Marks with Comma',
    problem_text: '<p>"I think we should leave now<span class="blank-marker">____</span> Sarah suggested.</p>',
    choices: [
      { letter: 'A', text: ',"', explanation: 'This correctly places the comma inside the closing quotation mark, which is standard American English style.' },
      { letter: 'B', text: '",', explanation: 'The comma should come before the closing quotation mark, not after.' },
      { letter: 'C', text: '."', explanation: 'A period would end the sentence entirely, but <em>"Sarah suggested"</em> continues it.' },
      { letter: 'D', text: '"', explanation: 'A comma is needed before the dialogue tag <em>"Sarah suggested."</em>' }
    ],
    correct_answer: 'A'
  },
  {
    position: 37,
    title: 'Quotation Marks with Period',
    problem_text: '<p>The teacher said, "Class is dismissed<span class="blank-marker">____</span></p>',
    choices: [
      { letter: 'A', text: '".', explanation: 'The period should come before the closing quotation mark, not after.' },
      { letter: 'B', text: '."', explanation: 'This correctly places the period inside the closing quotation mark, following American English conventions.' },
      { letter: 'C', text: ',"', explanation: 'A period, not a comma, is needed to end this complete sentence.' },
      { letter: 'D', text: '"!', explanation: 'While an exclamation point could work for emphasis, a period is standard and the sentence is not exclamatory.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 38,
    title: 'Quotation Marks with Question Mark',
    problem_text: '<p>"Where are my keys<span class="blank-marker">____</span> she wondered aloud.</p>',
    choices: [
      { letter: 'A', text: '?"', explanation: 'This correctly places the question mark inside the quotation marks since it\'s part of the quoted question.' },
      { letter: 'B', text: '"?', explanation: 'The question mark should come before the closing quotation mark.' },
      { letter: 'C', text: '?,"', explanation: 'Do not use both a question mark and a comma together.' },
      { letter: 'D', text: ',"', explanation: 'A question mark is needed because the quoted text is a question.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 39,
    title: 'Question Mark Outside Quotation',
    problem_text: '<p>Did she really say "I don\'t care<span class="blank-marker">____</span></p>',
    choices: [
      { letter: 'A', text: '?"?', explanation: 'This would use two question marks, which is incorrect.' },
      { letter: 'B', text: '"?', explanation: 'This correctly places the question mark outside the quotation marks because the overall sentence is the question, not the quote itself.' },
      { letter: 'C', text: '?"', explanation: 'The question mark should be outside because the entire sentence asks whether she said this, not because the quote is a question.' },
      { letter: 'D', text: '."?', explanation: 'Do not use both a period and a question mark together.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 40,
    title: 'Quotation Marks for Titles',
    problem_text: '<p>My favorite short story is<span class="blank-marker">____</span>The Lottery<span class="blank-marker">____</span>by Shirley Jackson.</p>',
    choices: [
      { letter: 'A', text: '"The Lottery"', explanation: 'This correctly uses quotation marks for the title of a short story (shorter works use quotation marks).' },
      { letter: 'B', text: 'The Lottery', explanation: 'Short story titles should be in quotation marks, not plain text.' },
      { letter: 'C', text: '<em>The Lottery</em>', explanation: 'Italics are used for longer works like books and magazines, not short stories.' },
      { letter: 'D', text: '\'The Lottery\'', explanation: 'Use double quotation marks, not single quotes, in American English.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 41,
    title: 'Quotation Within Quotation',
    problem_text: '<p>Maria said,<span class="blank-marker">____</span>The teacher told us, \'Read chapter five tonight.\'<span class="blank-marker">____</span></p>',
    choices: [
      { letter: 'A', text: '"The teacher told us, \'Read chapter five tonight.\'"', explanation: 'This correctly uses double quotes for the outer quotation and single quotes for the nested quotation.' },
      { letter: 'B', text: '"The teacher told us, "Read chapter five tonight.""', explanation: 'Use single quotes for quotations within quotations, not double quotes.' },
      { letter: 'C', text: '\'The teacher told us, "Read chapter five tonight."\'', explanation: 'In American English, use double quotes on the outside, not single quotes.' },
      { letter: 'D', text: '"The teacher told us, Read chapter five tonight."', explanation: 'The nested quotation needs its own quotation marks.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 42,
    title: 'Quotation Marks for Irony',
    problem_text: '<p>His<span class="blank-marker">____</span>brilliant<span class="blank-marker">____</span> idea cost the company millions.</p>',
    choices: [
      { letter: 'A', text: '"brilliant"', explanation: 'This correctly uses quotation marks to indicate irony or sarcasm (the idea was not actually brilliant).' },
      { letter: 'B', text: 'brilliant', explanation: 'Without quotation marks, the word appears sincere rather than ironic.' },
      { letter: 'C', text: '—brilliant—', explanation: 'Dashes emphasize but don\'t convey the ironic tone that quotation marks provide.' },
      { letter: 'D', text: '(brilliant)', explanation: 'Parentheses de-emphasize rather than indicate irony.' }
    ],
    correct_answer: 'A'
  },

  // Parentheses and Miscellaneous (questions 43-50)
  {
    position: 43,
    title: 'Parentheses for Additional Info',
    problem_text: '<p>The conference<span class="blank-marker">____</span>which attracted over 500 attendees<span class="blank-marker">____</span>was a huge success.</p>',
    choices: [
      { letter: 'A', text: ' (which attracted over 500 attendees)', explanation: 'This correctly uses parentheses to de-emphasize the supplementary information about attendance.' },
      { letter: 'B', text: '—which attracted over 500 attendees—', explanation: 'Dashes would emphasize this information, but the context suggests it\'s supplementary rather than crucial.' },
      { letter: 'C', text: ', which attracted over 500 attendees,', explanation: 'Commas work but don\'t de-emphasize the way parentheses do.' },
      { letter: 'D', text: ': which attracted over 500 attendees:', explanation: 'Colons are not used in pairs to set off parenthetical information.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 44,
    title: 'Punctuation with Parentheses',
    problem_text: '<p>She finally finished her thesis (after three years of research<span class="blank-marker">____</span></p>',
    choices: [
      { letter: 'A', text: ').', explanation: 'This correctly places the period outside the closing parenthesis when the parenthetical is part of a larger sentence.' },
      { letter: 'B', text: '.)', explanation: 'The period should come after the closing parenthesis, not before.' },
      { letter: 'C', text: ')!', explanation: 'The sentence is not exclamatory; a period is appropriate.' },
      { letter: 'D', text: '.)', explanation: 'This places the period in the wrong position.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 45,
    title: 'Ellipsis for Omission',
    problem_text: '<p>The Constitution begins: "We the People<span class="blank-marker">____</span>do ordain and establish this Constitution."</p>',
    choices: [
      { letter: 'A', text: '...', explanation: 'This correctly uses an ellipsis (three dots) to indicate that words have been omitted from the quotation.' },
      { letter: 'B', text: '..', explanation: 'An ellipsis should have three dots, not two.' },
      { letter: 'C', text: '....', explanation: 'Use three dots for an ellipsis within a sentence.' },
      { letter: 'D', text: '—', explanation: 'A dash does not indicate omission; an ellipsis is needed.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 46,
    title: 'Hyphen in Compound Modifier',
    problem_text: '<p>The<span class="blank-marker">____</span> student received an award.</p>',
    choices: [
      { letter: 'A', text: 'well known', explanation: 'When a compound modifier comes before a noun, it should be hyphenated.' },
      { letter: 'B', text: 'well-known', explanation: 'This correctly hyphenates the compound modifier <em>"well-known"</em> before the noun.' },
      { letter: 'C', text: 'wellknown', explanation: 'These are two words that should be hyphenated, not combined into one word.' },
      { letter: 'D', text: 'well—known', explanation: 'Use a hyphen, not an em dash, in compound modifiers.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 47,
    title: 'Hyphen with Numbers',
    problem_text: '<p>She completed the<span class="blank-marker">____</span> test in record time.</p>',
    choices: [
      { letter: 'A', text: 'thirty five question', explanation: 'Compound numbers and the noun they modify should be hyphenated.' },
      { letter: 'B', text: 'thirty-five-question', explanation: 'This correctly hyphenates the compound number <em>"thirty-five"</em> and connects it to <em>"question."</em>' },
      { letter: 'C', text: 'thirty-five question', explanation: 'When the compound number modifies a noun, all three words should be hyphenated.' },
      { letter: 'D', text: 'thirtyfive question', explanation: 'Compound numbers should be hyphenated, not written as one word.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 48,
    title: 'Slash for Alternatives',
    problem_text: '<p>Please bring your laptop<span class="blank-marker">____</span>tablet to the workshop.</p>',
    choices: [
      { letter: 'A', text: '/or', explanation: 'Spaces should surround <em>"or"</em> when listing alternatives, or use a slash without spaces.' },
      { letter: 'B', text: '/', explanation: 'This correctly uses a forward slash to indicate alternatives (one or the other).' },
      { letter: 'C', text: ' or ', explanation: 'While <em>"or"</em> works, the slash is more concise in this context.' },
      { letter: 'D', text: ' and/or ', explanation: '<em>"And/or"</em> is often considered awkward and should be avoided in formal writing.' }
    ],
    correct_answer: 'B'
  },
  {
    position: 49,
    title: 'Exclamation Point Use',
    problem_text: '<p>Watch out<span class="blank-marker">____</span></p>',
    choices: [
      { letter: 'A', text: '!', explanation: 'This correctly uses an exclamation point for the urgent warning <em>"Watch out."</em>' },
      { letter: 'B', text: '.', explanation: 'A period understates the urgency of this warning.' },
      { letter: 'C', text: '!!', explanation: 'Never use multiple exclamation points in formal writing.' },
      { letter: 'D', text: '...', explanation: 'An ellipsis shows trailing off or hesitation, not urgency or excitement.' }
    ],
    correct_answer: 'A'
  },
  {
    position: 50,
    title: 'Unnecessary Punctuation',
    problem_text: '<p>The athletes<span class="blank-marker">____</span>who trained every day<span class="blank-marker">____</span>won the championship.</p>',
    choices: [
      { letter: 'A', text: ', who trained every day,', explanation: 'Commas would make this clause non-essential, implying all athletes trained daily. The clause is restrictive.' },
      { letter: 'B', text: ' who trained every day', explanation: 'This correctly omits commas around the essential restrictive clause that identifies which athletes won.' },
      { letter: 'C', text: '—who trained every day—', explanation: 'Dashes would make this parenthetical, but it\'s essential information.' },
      { letter: 'D', text: ' (who trained every day)', explanation: 'Parentheses de-emphasize information, but this clause is essential to identify the winning athletes.' }
    ],
    correct_answer: 'B'
  }
];

async function addQuestions() {
  console.log('Adding 45 questions to Topic 1.3 - Advanced Punctuation...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const example = {
      lesson_id: LESSON_ID,
      position: q.position,
      title: q.title,
      problem_text: q.problem_text,
      choices: q.choices,
      correct_answer: q.correct_answer,
      solution_steps: [],
      is_worked_example: false,
      diagram_svg: null,
      answer_explanation: null
    };

    const { data, error } = await supabase
      .from('lesson_examples')
      .insert([example])
      .select();

    if (error) {
      console.error(`✗ Error adding question ${q.position}:`, error.message);
      errorCount++;
    } else {
      console.log(`✓ Added question ${q.position}: ${q.title}`);
      successCount++;
    }
  }

  console.log(`\n✓ Complete! Added ${successCount} questions, ${errorCount} errors`);
  console.log(`Topic 1.3 now has 50 total practice questions (5 existing + 45 new)`);
}

addQuestions();
