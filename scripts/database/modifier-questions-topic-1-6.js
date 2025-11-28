const modifierQuestions = [
  // INTRODUCTORY PARTICIPIAL PHRASES (DANGLING MODIFIERS) (12 questions)
  {
    position: 1,
    title: 'Dangling Modifier - Walking',
    problem_text: '<u>Walking through the park, the flowers seemed especially beautiful.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. This creates a dangling modifier because "walking through the park" illogically modifies "the flowers." Flowers cannot walk.' },
      { letter: 'B', text: 'Walking through the park, I noticed that the flowers seemed especially beautiful.', explanation: 'Correct. The participial phrase now correctly modifies "I," providing a logical subject who can perform the action of walking.' },
      { letter: 'C', text: 'Walking through the park, the beauty of the flowers seemed especially noticeable.', explanation: 'Incorrect. This still creates a dangling modifier because "beauty" cannot walk through the park.' },
      { letter: 'D', text: 'The flowers seemed especially beautiful, walking through the park.', explanation: 'Incorrect. Moving the phrase to the end doesn\'t fix the problem; it still suggests the flowers were walking.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory participial phrases must modify the subject that immediately follows the comma. The subject must be able to logically perform the action in the phrase.'
  },
  {
    position: 2,
    title: 'Dangling Modifier - Running Late',
    problem_text: '<u>Running late for the meeting, the elevator was too slow.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. The elevator cannot be "running late"; this is a dangling modifier that lacks a logical subject.' },
      { letter: 'B', text: 'Running late for the meeting, the slowness of the elevator was frustrating.', explanation: 'Incorrect. "Slowness" cannot run late. The participial phrase still dangles without a proper subject.' },
      { letter: 'C', text: 'Running late for the meeting, I found the elevator too slow.', explanation: 'Correct. "I" is a logical subject that can run late, properly connecting the modifier to its intended subject.' },
      { letter: 'D', text: 'The elevator was too slow, running late for the meeting.', explanation: 'Incorrect. Moving the phrase doesn\'t solve the problem; the elevator still cannot run late for a meeting.' }
    ],
    correct_answer: 'C',
    answer_explanation: 'Dangling modifiers occur when the intended subject of the participial phrase is missing or incorrectly placed. The subject following the comma must perform the action.'
  },
  {
    position: 3,
    title: 'Dangling Modifier - Having Finished',
    problem_text: '<u>Having finished the assignment, the television was turned on.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. The television cannot finish an assignment. This dangling modifier needs a person as the subject.' },
      { letter: 'B', text: 'Having finished the assignment, Maria turned on the television.', explanation: 'Correct. "Maria" can logically finish an assignment, making her the proper subject for the participial phrase.' },
      { letter: 'C', text: 'Having finished the assignment, watching television became the next activity.', explanation: 'Incorrect. "Watching television" (a gerund phrase) cannot finish an assignment; only a person can.' },
      { letter: 'D', text: 'The television was turned on, having finished the assignment.', explanation: 'Incorrect. Repositioning doesn\'t fix the illogical relationship; the television still cannot complete assignments.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Perfect participial phrases (having + past participle) must modify a subject capable of completing the action described in the phrase.'
  },
  {
    position: 4,
    title: 'Dangling Modifier - Exhausted',
    problem_text: '<u>Exhausted from the long hike, a nap was needed.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "A nap" cannot be exhausted. The participial phrase needs a person as its subject.' },
      { letter: 'B', text: 'Exhausted from the long hike, the hikers needed a nap.', explanation: 'Correct. "The hikers" can logically be exhausted, properly matching the modifier with its intended subject.' },
      { letter: 'C', text: 'Exhausted from the long hike, the need for a nap was evident.', explanation: 'Incorrect. "The need" cannot experience exhaustion. Only people can be exhausted from hiking.' },
      { letter: 'D', text: 'A nap was needed, exhausted from the long hike.', explanation: 'Incorrect. Moving the phrase to the end doesn\'t correct the logical problem of a nap being exhausted.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Participial phrases functioning as adjectives must have a clear, logical noun to modify. The noun must be capable of the state or action described.'
  },
  {
    position: 5,
    title: 'Dangling Modifier - Considering',
    problem_text: '<u>Considering the high cost, the vacation was postponed.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "The vacation" cannot consider costs. The phrase needs a person who can make decisions.' },
      { letter: 'B', text: 'Considering the high cost, we postponed the vacation.', explanation: 'Correct. "We" can logically consider costs and make decisions, providing the proper subject for the participial phrase.' },
      { letter: 'C', text: 'Considering the high cost, the postponement of the vacation was decided.', explanation: 'Incorrect. "The postponement" cannot consider anything. The modifier still lacks a proper subject.' },
      { letter: 'D', text: 'The vacation was postponed by us, considering the high cost.', explanation: 'Incorrect. While "by us" is added, the participial phrase still appears to modify "vacation" due to its position.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Present participial phrases must modify subjects capable of performing the mental or physical action described in the modifier.'
  },
  {
    position: 6,
    title: 'Dangling Modifier - Driving',
    problem_text: '<u>Driving down the highway, the accident scene came into view.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "The accident scene" cannot drive. This dangling modifier needs a driver as the subject.' },
      { letter: 'B', text: 'Driving down the highway, we saw the accident scene come into view.', explanation: 'Correct. "We" can drive and see, making this the logical subject for the participial phrase.' },
      { letter: 'C', text: 'Driving down the highway, visibility of the accident scene occurred.', explanation: 'Incorrect. "Visibility" cannot drive. The phrase still dangles without a person as the subject.' },
      { letter: 'D', text: 'The accident scene came into view while driving down the highway.', explanation: 'Incorrect. This still implies the accident scene was driving. The modifier needs to clearly connect to a driver.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory participial phrases require the subject immediately following the comma to be the one performing the action in the phrase.'
  },
  {
    position: 7,
    title: 'Dangling Modifier - Reviewing',
    problem_text: '<u>After reviewing the test results, several errors were discovered.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Several errors" cannot review test results. The participial phrase needs a person as the subject.' },
      { letter: 'B', text: 'After reviewing the test results, the teacher discovered several errors.', explanation: 'Correct. "The teacher" can logically review results and discover errors, providing the proper subject for the phrase.' },
      { letter: 'C', text: 'After reviewing the test results, the discovery of several errors occurred.', explanation: 'Incorrect. "The discovery" cannot review anything. A person must be the subject to perform this action.' },
      { letter: 'D', text: 'Several errors were discovered after reviewing the test results.', explanation: 'Incorrect. While grammatically better, this passive construction still lacks clarity about who did the reviewing.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Participial phrases beginning with "after" must modify a subject that can logically perform the action described in the phrase.'
  },
  {
    position: 8,
    title: 'Dangling Modifier - Broken',
    problem_text: '<u>Broken into pieces, the child cried over the toy.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. This suggests "the child" was broken into pieces. The modifier should describe the toy, not the child.' },
      { letter: 'B', text: 'Broken into pieces, the toy made the child cry.', explanation: 'Correct. "The toy" is what was broken into pieces, properly connecting the modifier to its intended subject.' },
      { letter: 'C', text: 'Broken into pieces, tears came to the child over the toy.', explanation: 'Incorrect. "Tears" cannot be broken into pieces. The modifier needs to describe the toy.' },
      { letter: 'D', text: 'The child cried over the toy, broken into pieces.', explanation: 'Incorrect. While placing the modifier at the end helps, it creates ambiguity about whether the child or toy was broken.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Past participial phrases must modify the noun that actually experienced the action described in the modifier.'
  },
  {
    position: 9,
    title: 'Dangling Modifier - Looking',
    problem_text: '<u>Looking through the telescope, the stars appeared incredibly bright.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "The stars" cannot look through a telescope. This dangling modifier needs an observer as the subject.' },
      { letter: 'B', text: 'Looking through the telescope, the astronomer saw that the stars appeared incredibly bright.', explanation: 'Correct. "The astronomer" can look through a telescope, providing the logical subject for the participial phrase.' },
      { letter: 'C', text: 'Looking through the telescope, the brightness of the stars was incredible.', explanation: 'Incorrect. "The brightness" cannot look through a telescope. The phrase needs a person as the subject.' },
      { letter: 'D', text: 'The stars appeared incredibly bright when looking through the telescope.', explanation: 'Incorrect. This still suggests the stars were looking through the telescope due to the proximity of "stars" to the phrase.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Participial phrases describing an action must modify a subject capable of performing that action, not the object being observed.'
  },
  {
    position: 10,
    title: 'Dangling Modifier - Prepared',
    problem_text: '<u>Carefully prepared by the chef, the guests enjoyed the meal.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. This suggests "the guests" were carefully prepared by the chef. The modifier should describe the meal.' },
      { letter: 'B', text: 'Carefully prepared by the chef, the meal was enjoyed by the guests.', explanation: 'Correct. "The meal" is what was carefully prepared, properly connecting the modifier to the correct noun.' },
      { letter: 'C', text: 'Carefully prepared by the chef, enjoyment of the meal occurred.', explanation: 'Incorrect. "Enjoyment" was not prepared by the chef. The modifier needs to describe the meal itself.' },
      { letter: 'D', text: 'The guests enjoyed the meal, carefully prepared by the chef.', explanation: 'Incorrect. While better, this creates some ambiguity and separates the modifier too far from "meal."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Passive participial phrases (past participle with "by") must modify the noun that received the action, not the one performing a different action.'
  },
  {
    position: 11,
    title: 'Dangling Modifier - Reading',
    problem_text: '<u>While reading the novel, the ending surprised me.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "The ending" cannot read a novel. The participial phrase needs "me" or "I" as the subject.' },
      { letter: 'B', text: 'While reading the novel, I was surprised by the ending.', explanation: 'Correct. "I" can read the novel and be surprised, providing the proper subject for the participial phrase.' },
      { letter: 'C', text: 'While reading the novel, surprise came from the ending.', explanation: 'Incorrect. "Surprise" cannot read a novel. The phrase needs a person as the subject.' },
      { letter: 'D', text: 'The ending surprised me while reading the novel.', explanation: 'Incorrect. This creates ambiguity about who was reading and suggests the ending was doing the reading.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Participial phrases with "while" must modify a subject that can simultaneously perform both the action in the phrase and the main action.'
  },
  {
    position: 12,
    title: 'Dangling Modifier - Entering',
    problem_text: '<u>Entering the library, silence was everywhere.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Silence" cannot enter a library. This dangling modifier needs a person as the subject.' },
      { letter: 'B', text: 'Entering the library, I noticed silence everywhere.', explanation: 'Correct. "I" can enter the library and notice things, making this the logical subject for the participial phrase.' },
      { letter: 'C', text: 'Entering the library, the presence of silence was everywhere.', explanation: 'Incorrect. "The presence" cannot enter a library. Only a person can perform this action.' },
      { letter: 'D', text: 'Silence was everywhere when entering the library.', explanation: 'Incorrect. This still lacks a clear subject for "entering" and creates ambiguity about who entered.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Present participial phrases must have a clear agent performing the action; abstract concepts like "silence" cannot perform physical actions.'
  },

  // INTRODUCTORY PREPOSITIONAL PHRASES (6 questions)
  {
    position: 13,
    title: 'Misplaced Prepositional Phrase - At Age Five',
    problem_text: '<u>At age five, my mother taught me to play piano.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. This suggests "my mother" was five years old when she taught piano. The phrase should modify "me."' },
      { letter: 'B', text: 'My mother taught me to play piano at age five.', explanation: 'Correct. Moving "at age five" near "me" clarifies that I was five when learning, not my mother when teaching.' },
      { letter: 'C', text: 'At age five, piano was taught to me by my mother.', explanation: 'Incorrect. This suggests "piano" was five years old. The prepositional phrase needs to modify the learner.' },
      { letter: 'D', text: 'My mother, at age five, taught me to play piano.', explanation: 'Incorrect. This clearly states the mother was five, which is illogical for someone teaching piano.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Introductory prepositional phrases should modify the nearest logical noun. Placement determines meaning and must match the intended subject.'
  },
  {
    position: 14,
    title: 'Misplaced Prepositional Phrase - In The Garage',
    problem_text: '<u>In the garage, I found my father working on the car.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Correct. The phrase "in the garage" properly modifies "found," indicating where the action of finding occurred. This is clear and unambiguous.' },
      { letter: 'B', text: 'I found my father working on the car in the garage.', explanation: 'Incorrect. While grammatically acceptable, this placement creates ambiguity about whether "in the garage" modifies "car" or "working."' },
      { letter: 'C', text: 'I found in the garage my father working on the car.', explanation: 'Incorrect. This awkward placement splits the verb "found" from its object "my father" unnecessarily.' },
      { letter: 'D', text: 'I found my father in the garage working on the car.', explanation: 'Incorrect. This placement suggests "in the garage" modifies "father" rather than the entire scene, creating slight ambiguity.' }
    ],
    correct_answer: 'A',
    answer_explanation: 'Introductory prepositional phrases can effectively set the scene for the entire sentence when the location applies to the whole action.'
  },
  {
    position: 15,
    title: 'Misplaced Prepositional Phrase - With Great Care',
    problem_text: '<u>With great care, the antique vase was placed on the shelf by the curator.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Correct. The phrase "with great care" appropriately modifies how the vase was placed, and the passive construction makes this clear and unambiguous.' },
      { letter: 'B', text: 'The antique vase was placed with great care on the shelf by the curator.', explanation: 'Incorrect. This placement is acceptable but less effective than opening with the modifier, which emphasizes the careful nature of the action.' },
      { letter: 'C', text: 'The antique vase was placed on the shelf by the curator with great care.', explanation: 'Incorrect. This placement creates ambiguity about whether "with great care" modifies the curator or the action of placing.' },
      { letter: 'D', text: 'The antique vase with great care was placed on the shelf by the curator.', explanation: 'Incorrect. This awkward placement suggests the vase itself possesses great care, which is illogical.' }
    ],
    correct_answer: 'A',
    answer_explanation: 'Introductory prepositional phrases describing manner (how something is done) effectively emphasize the quality of the action when placed at the beginning.'
  },
  {
    position: 16,
    title: 'Misplaced Prepositional Phrase - After Dinner',
    problem_text: '<u>After dinner, we went to the movies my whole family.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "My whole family" is awkwardly placed at the end, separated from "we," making the sentence unclear and choppy.' },
      { letter: 'B', text: 'After dinner, my whole family went to the movies.', explanation: 'Correct. This places the complete subject "my whole family" immediately after the introductory phrase, creating a clear, smooth sentence.' },
      { letter: 'C', text: 'We went to the movies after dinner my whole family.', explanation: 'Incorrect. This is even more awkward, with "my whole family" dangling at the end without clear connection to the sentence.' },
      { letter: 'D', text: 'My whole family, after dinner, went to the movies.', explanation: 'Incorrect. While grammatically acceptable, interrupting the subject and verb with the prepositional phrase creates unnecessary choppiness.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When using introductory prepositional phrases, keep the main subject together and place it immediately after the comma for clarity.'
  },
  {
    position: 17,
    title: 'Misplaced Prepositional Phrase - On The Shelf',
    problem_text: 'I found the book <u>on the shelf that I had been searching for</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. The relative clause "that I had been searching for" appears to modify "shelf," suggesting I was searching for the shelf rather than the book.' },
      { letter: 'B', text: 'that I had been searching for on the shelf', explanation: 'Correct. Moving "on the shelf" to the end places it after the relative clause, making it clear I was searching for the book, which was on the shelf.' },
      { letter: 'C', text: 'on the shelf, that I had been searching for', explanation: 'Incorrect. Adding a comma creates a nonrestrictive clause, implying there is only one book and I happened to be searching for it, which changes the meaning.' },
      { letter: 'D', text: 'that I had been searching, on the shelf, for', explanation: 'Incorrect. This awkwardly splits the phrasal verb "searching for" and creates confusion about what was being searched for.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Prepositional phrases should be placed to avoid interrupting or creating ambiguity with relative clauses that modify the main noun.'
  },
  {
    position: 18,
    title: 'Misplaced Prepositional Phrase - During The Storm',
    problem_text: '<u>During the storm, the tree fell that stood near our house.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. The relative clause "that stood near our house" is separated from its antecedent "tree" by the verb "fell," creating confusion.' },
      { letter: 'B', text: 'The tree that stood near our house fell during the storm.', explanation: 'Correct. This places the relative clause immediately after "tree" for clarity, with the prepositional phrase at the end where it naturally indicates timing.' },
      { letter: 'C', text: 'During the storm, that stood near our house, the tree fell.', explanation: 'Incorrect. This placement separates the subject "tree" from its verb "fell" and creates an incomprehensible sentence structure.' },
      { letter: 'D', text: 'The tree fell that stood during the storm near our house.', explanation: 'Incorrect. This suggests the tree stood during the storm, and the overall meaning becomes unclear and awkward.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Keep relative clauses immediately adjacent to their antecedents; place prepositional phrases where they logically modify without creating ambiguity.'
  },

  // MISPLACED ADJECTIVE PHRASES AND CLAUSES (8 questions)
  {
    position: 19,
    title: 'Misplaced Adjective Phrase - Covered in Dust',
    problem_text: 'We finally found the box <u>covered in dust in the attic that contained old photographs</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. The relative clause "that contained old photographs" appears to modify "attic" rather than "box," creating ambiguity about what contained the photographs.' },
      { letter: 'B', text: 'in the attic covered in dust that contained old photographs', explanation: 'Incorrect. This suggests the attic was covered in dust, and it still leaves ambiguity about what contained the photographs.' },
      { letter: 'C', text: 'that contained old photographs covered in dust in the attic', explanation: 'Incorrect. This placement suggests the photographs were covered in dust in the attic, not the box.' },
      { letter: 'D', text: 'covered in dust that contained old photographs in the attic', explanation: 'Correct. This keeps "covered in dust" and "that contained old photographs" adjacent to "box," while "in the attic" clearly indicates location without ambiguity.' }
    ],
    correct_answer: 'D',
    answer_explanation: 'Multiple modifying phrases should be arranged to minimize ambiguity, with adjective phrases and clauses kept close to the nouns they modify.'
  },
  {
    position: 20,
    title: 'Misplaced Adjective Clause - Who Was Tired',
    problem_text: 'The student gave the test <u>to the teacher who was tired</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. The relative clause "who was tired" appears to modify "teacher," but the intended meaning is likely that the student was tired.' },
      { letter: 'B', text: 'who was tired to the teacher', explanation: 'Correct. This placement makes it clear that "who was tired" modifies "student," indicating the student was tired when giving the test.' },
      { letter: 'C', text: 'to the teacher, who was tired', explanation: 'Incorrect. The comma makes this a nonrestrictive clause that definitively describes the teacher as tired, which may not be the intended meaning.' },
      { letter: 'D', text: 'to who was tired the teacher', explanation: 'Incorrect. This creates a grammatically incorrect and incomprehensible sentence structure.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Relative clauses should be placed immediately after the noun they modify to prevent misreading about which person has the described quality.'
  },
  {
    position: 21,
    title: 'Misplaced Adjective Phrase - With Leather Seats',
    problem_text: 'She showed me a picture <u>of her new car with leather seats on her phone</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "On her phone" appears to modify "leather seats," suggesting the seats are on her phone, which is illogical.' },
      { letter: 'B', text: 'on her phone of her new car with leather seats', explanation: 'Correct. Starting with "on her phone" clarifies that the picture is on the phone, and "with leather seats" properly modifies "car."' },
      { letter: 'C', text: 'of her new car on her phone with leather seats', explanation: 'Incorrect. This suggests the car is on her phone with leather seats, creating ambiguity about whether the phone or car has the seats.' },
      { letter: 'D', text: 'with leather seats of her new car on her phone', explanation: 'Incorrect. This awkward arrangement suggests the picture itself has leather seats, which makes no sense.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When multiple prepositional phrases modify different elements, arrange them to create logical connections and avoid suggesting impossible relationships.'
  },
  {
    position: 22,
    title: 'Misplaced Adjective Clause - That Needs Repair',
    problem_text: 'The mechanic examined the engine <u>of the truck that needs repair</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "That needs repair" appears to modify "truck," but the intended meaning is likely that the engine needs repair.' },
      { letter: 'B', text: 'that needs repair of the truck', explanation: 'Correct. This placement makes it clear that "that needs repair" modifies "engine," indicating the engine is what needs fixing.' },
      { letter: 'C', text: 'of the truck, that needs repair', explanation: 'Incorrect. The comma creates a nonrestrictive clause that still modifies "truck," not "engine," and suggests the truck needs repair.' },
      { letter: 'D', text: 'that of the truck needs repair', explanation: 'Incorrect. This creates an awkward and grammatically questionable construction that confuses the meaning.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Place relative clauses immediately after the specific noun they modify, even when that noun is part of a prepositional phrase.'
  },
  {
    position: 23,
    title: 'Misplaced Adjective Phrase - Wrapped in Foil',
    problem_text: 'He brought sandwiches <u>for his coworkers wrapped in foil</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. This suggests the coworkers are wrapped in foil rather than the sandwiches, creating an illogical and humorous misreading.' },
      { letter: 'B', text: 'wrapped in foil for his coworkers', explanation: 'Correct. This placement clearly indicates that the sandwiches are wrapped in foil, not the coworkers.' },
      { letter: 'C', text: 'for his coworkers, wrapped in foil', explanation: 'Incorrect. The comma doesn\'t fix the proximity problem; "wrapped in foil" still appears to modify "coworkers."' },
      { letter: 'D', text: 'wrapped for his coworkers in foil', explanation: 'Incorrect. This creates ambiguity about whether "in foil" modifies "wrapped" or "coworkers," and the phrasing is awkward.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Participial phrases used as adjectives must be placed immediately after the noun they modify to prevent illogical or comical misinterpretations.'
  },
  {
    position: 24,
    title: 'Misplaced Adjective Clause - Which Was Broken',
    problem_text: 'She replaced the screen <u>on her laptop which was broken</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Which was broken" could modify either "screen" or "laptop," creating ambiguity about what was broken.' },
      { letter: 'B', text: 'which was broken on her laptop', explanation: 'Correct. This placement makes it clear that "which was broken" modifies "screen," and "on her laptop" indicates location.' },
      { letter: 'C', text: 'on her laptop, which was broken', explanation: 'Incorrect. The comma creates a nonrestrictive clause that clearly modifies "laptop," meaning the entire laptop was broken, not just the screen.' },
      { letter: 'D', text: 'which on her laptop was broken', explanation: 'Incorrect. This creates awkward phrasing that separates "which" from "was broken" in a confusing way.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When a relative clause could potentially modify multiple nouns, placement determines meaning. Position it to modify the intended noun clearly.'
  },
  {
    position: 25,
    title: 'Misplaced Adjective Phrase - Wearing Sunglasses',
    problem_text: 'I saw a man <u>walking his dog wearing sunglasses</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. This suggests the dog is wearing sunglasses due to the proximity of "dog" and "wearing sunglasses."' },
      { letter: 'B', text: 'wearing sunglasses walking his dog', explanation: 'Correct. This placement clearly indicates the man is wearing sunglasses while walking his dog.' },
      { letter: 'C', text: 'walking his dog who was wearing sunglasses', explanation: 'Incorrect. "Who" is used for people, not animals. Additionally, this explicitly states the dog wore sunglasses.' },
      { letter: 'D', text: 'walking his dog, wearing sunglasses', explanation: 'Incorrect. The comma doesn\'t solve the proximity problem; "wearing sunglasses" still appears to modify "dog."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Participial phrases should be positioned immediately after the noun they modify, especially when multiple nouns could potentially be modified.'
  },
  {
    position: 26,
    title: 'Misplaced Adjective Clause - Who Speaks French',
    problem_text: 'The tourist asked the waiter <u>for directions who speaks French</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Who speaks French" appears to modify "directions," which cannot speak. It should modify "tourist" or "waiter."' },
      { letter: 'B', text: 'who speaks French for directions', explanation: 'Correct. This placement makes it clear that "who speaks French" modifies "waiter," indicating the waiter\'s language ability.' },
      { letter: 'C', text: 'for directions, who speaks French', explanation: 'Incorrect. The comma doesn\'t fix the problem; the clause still seems to modify "directions" rather than a person.' },
      { letter: 'D', text: 'who for directions speaks French', explanation: 'Incorrect. This creates an awkward construction that interrupts the relative clause illogically.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Relative clauses with "who" must modify people and should be placed immediately after the person they describe to maintain clarity.'
  },

  // MISPLACED ADVERBS (8 questions)
  {
    position: 27,
    title: 'Misplaced Adverb - Only (Watching)',
    problem_text: 'Sarah <u>only watched</u> the first episode of the series.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Only" modifies "watched," suggesting watching was the only action she took, but the intended meaning is that she watched only the first episode.' },
      { letter: 'B', text: 'watched only', explanation: 'Correct. Placing "only" before "the first episode" clarifies that she watched one specific episode, not more.' },
      { letter: 'C', text: 'watched the only', explanation: 'Incorrect. This changes the meaning to suggest there is only one episode in existence, which is not the intended meaning.' },
      { letter: 'D', text: 'only had watched', explanation: 'Incorrect. This adds an unnecessary helping verb and still misplaces "only" so it modifies "had watched" rather than "first episode."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The adverb "only" should be placed immediately before the word or phrase it modifies to convey the precise intended meaning.'
  },
  {
    position: 28,
    title: 'Misplaced Adverb - Almost',
    problem_text: 'The teacher <u>almost failed</u> half the class.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Almost failed" suggests the teacher came close to failing students but didn\'t, rather than failing almost half the class.' },
      { letter: 'B', text: 'failed almost', explanation: 'Correct. Placing "almost" before "half" clarifies that approximately half the class failed, not that the teacher nearly failed them.' },
      { letter: 'C', text: 'failed nearly', explanation: 'Incorrect. While "nearly" works similarly to "almost," this option doesn\'t complete the intended phrase "nearly half" and remains ambiguous.' },
      { letter: 'D', text: 'almost had failed', explanation: 'Incorrect. This maintains the misplacement problem and adds unnecessary complexity with "had failed."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Adverbs like "almost" and "nearly" should be placed immediately before the quantity or number they modify to indicate approximation accurately.'
  },
  {
    position: 29,
    title: 'Misplaced Adverb - Just',
    problem_text: 'I <u>just told</u> three people about the party.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Just told" emphasizes the recent timing of telling, but the intended meaning is likely that only three people were told.' },
      { letter: 'B', text: 'told just', explanation: 'Correct. Placing "just" before "three people" clarifies that only three people were informed, not that the telling happened recently.' },
      { letter: 'C', text: 'had just told', explanation: 'Incorrect. This maintains the timing emphasis with "just" and adds "had," which doesn\'t address the placement issue.' },
      { letter: 'D', text: 'just had told', explanation: 'Incorrect. This creates awkward phrasing and still emphasizes timing rather than the number of people.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The adverb "just" changes meaning based on placement: before a verb indicates recent timing, before a number indicates "only."'
  },
  {
    position: 30,
    title: 'Misplaced Adverb - Nearly',
    problem_text: 'The storm <u>nearly destroyed</u> all the crops.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Nearly destroyed" suggests the destruction was almost complete but not quite, rather than meaning almost all crops were destroyed.' },
      { letter: 'B', text: 'destroyed nearly', explanation: 'Correct. Placing "nearly" before "all" clarifies that almost all the crops were destroyed, not that the destruction was nearly complete.' },
      { letter: 'C', text: 'destroyed almost', explanation: 'Incorrect. While "almost" is similar to "nearly," this option leaves the phrase incomplete without "all" following.' },
      { letter: 'D', text: 'nearly had destroyed', explanation: 'Incorrect. This adds unnecessary complexity with "had" and maintains the misplacement of "nearly."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Place "nearly" immediately before the word indicating quantity (like "all") to show approximation of amount rather than degree of action.'
  },
  {
    position: 31,
    title: 'Misplaced Adverb - Only (Gift)',
    problem_text: 'Mark <u>only gave</u> his sister a gift.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Only gave" suggests giving was the only action Mark took, not that his sister was the only recipient.' },
      { letter: 'B', text: 'gave only', explanation: 'Correct. Placing "only" before "his sister" clarifies that his sister was the sole recipient of a gift.' },
      { letter: 'C', text: 'gave his only', explanation: 'Incorrect. This suggests Mark has only one sister, which changes the meaning entirely from who received the gift.' },
      { letter: 'D', text: 'only had given', explanation: 'Incorrect. This adds "had" unnecessarily and maintains the misplacement of "only" before the verb.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Position "only" immediately before the element it restricts to clearly indicate what is being limited or singled out in the sentence.'
  },
  {
    position: 32,
    title: 'Misplaced Adverb - Almost (Time)',
    problem_text: 'We <u>almost waited</u> two hours for the bus.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Almost waited" illogically suggests we came close to waiting but didn\'t actually wait, rather than waiting for nearly two hours.' },
      { letter: 'B', text: 'waited almost', explanation: 'Correct. Placing "almost" before "two hours" clearly indicates the approximate duration of waiting.' },
      { letter: 'C', text: 'waited nearly', explanation: 'Incorrect. While "nearly" is similar to "almost," this option is incomplete without "two hours" following it.' },
      { letter: 'D', text: 'almost had waited', explanation: 'Incorrect. Adding "had" creates unnecessary past perfect tense and doesn\'t fix the misplacement of "almost."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Adverbs indicating approximation should be placed before time or quantity expressions, not before action verbs, to show duration or amount.'
  },
  {
    position: 33,
    title: 'Misplaced Adverb - Just (Amount)',
    problem_text: 'The recipe <u>just needs</u> two ingredients.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Just needs" emphasizes merely needing, but the intended meaning is that only two ingredients are needed.' },
      { letter: 'B', text: 'needs just', explanation: 'Correct. Placing "just" before "two ingredients" clarifies that only two ingredients are required, emphasizing the small number.' },
      { letter: 'C', text: 'needs only', explanation: 'Incorrect. While "only" conveys similar meaning to "just," the question asks about "just," making this an incorrect substitution.' },
      { letter: 'D', text: 'just requires', explanation: 'Incorrect. Changing "needs" to "requires" doesn\'t address the misplacement and "just" still modifies the verb incorrectly.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Position limiting adverbs like "just" before the quantity they restrict to emphasize the small or specific amount being discussed.'
  },
  {
    position: 34,
    title: 'Misplaced Adverb - Nearly (Winners)',
    problem_text: 'The judges <u>nearly selected</u> twenty winners.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Nearly selected" suggests the judges almost chose winners but didn\'t, rather than selecting approximately twenty winners.' },
      { letter: 'B', text: 'selected nearly', explanation: 'Correct. Placing "nearly" before "twenty" indicates that approximately twenty winners were selected.' },
      { letter: 'C', text: 'selected almost', explanation: 'Incorrect. While "almost" is similar to "nearly," this option is incomplete without "twenty" following.' },
      { letter: 'D', text: 'nearly had selected', explanation: 'Incorrect. Adding "had" unnecessarily complicates the tense and doesn\'t fix the misplacement of "nearly."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Adverbs of approximation should directly precede numbers to indicate "about that many," not verbs where they suggest incomplete action.'
  },

  // SQUINTING MODIFIERS (4 questions)
  {
    position: 35,
    title: 'Squinting Modifier - Quickly',
    problem_text: 'The student who was studying <u>quickly</u> became tired.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Quickly" could modify either "studying" (studying in a fast manner) or "became" (rapidly became tired), creating ambiguity.' },
      { letter: 'B', text: 'The student who was quickly studying became tired.', explanation: 'Correct. Moving "quickly" before "studying" clarifies that the student studied in a fast manner and then became tired.' },
      { letter: 'C', text: 'The student who was studying became quickly tired.', explanation: 'Incorrect. While this moves "quickly," the placement before "tired" is awkward. "Became tired quickly" would be more natural.' },
      { letter: 'D', text: 'Quickly, the student who was studying became tired.', explanation: 'Incorrect. This placement suggests the entire sentence happened quickly, adding a third possible interpretation and more ambiguity.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Squinting modifiers can modify either the word before or after them. Reposition them to clearly indicate which element they modify.'
  },
  {
    position: 36,
    title: 'Squinting Modifier - Often',
    problem_text: 'Students who practice regularly <u>often</u> improve their skills.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Often" could modify "practice regularly" (practice often) or "improve" (frequently improve), creating ambiguity about what happens often.' },
      { letter: 'B', text: 'Students who often practice regularly improve their skills.', explanation: 'Correct. Placing "often" before "practice" clarifies that frequent practice leads to skill improvement.' },
      { letter: 'C', text: 'Students who practice regularly improve often their skills.', explanation: 'Incorrect. This creates awkward word order by placing "often" between "improve" and "their skills."' },
      { letter: 'D', text: 'Students who practice regularly improve their skills often.', explanation: 'Incorrect. While grammatically acceptable, ending with "often" is less clear and emphatic than placing it earlier in the sentence.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Adverbs of frequency positioned between two verbs create squinting modifiers. Place them clearly with the verb they modify to eliminate ambiguity.'
  },
  {
    position: 37,
    title: 'Squinting Modifier - Occasionally',
    problem_text: 'Athletes who train intensely <u>occasionally</u> need rest days.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Occasionally" could modify "train" (occasionally train intensely) or "need" (occasionally need rest), creating unclear meaning.' },
      { letter: 'B', text: 'Athletes who occasionally train intensely need rest days.', explanation: 'Incorrect. This changes the meaning to suggest athletes only occasionally train intensely, which may not be the intended message.' },
      { letter: 'C', text: 'Athletes who train intensely need rest days occasionally.', explanation: 'Correct. Moving "occasionally" to the end clarifies that rest days are needed from time to time, not that training is occasional.' },
      { letter: 'D', text: 'Occasionally, athletes who train intensely need rest days.', explanation: 'Incorrect. Starting with "occasionally" makes it modify the entire statement, suggesting the whole situation is occasional, adding ambiguity.' }
    ],
    correct_answer: 'C',
    answer_explanation: 'Move squinting adverbs to a position where they can only logically modify one element, typically to the end of the clause or near the specific verb.'
  },
  {
    position: 38,
    title: 'Squinting Modifier - Frequently',
    problem_text: 'People who read extensively <u>frequently</u> expand their vocabulary.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Frequently" could modify "read" (read frequently) or "expand" (frequently expand), making the sentence ambiguous.' },
      { letter: 'B', text: 'People who frequently read extensively expand their vocabulary.', explanation: 'Correct. Placing "frequently" before "read" clarifies that frequent reading leads to vocabulary expansion.' },
      { letter: 'C', text: 'People who read extensively expand frequently their vocabulary.', explanation: 'Incorrect. This creates awkward phrasing by separating "expand" from "vocabulary" with "frequently."' },
      { letter: 'D', text: 'Frequently, people who read extensively expand their vocabulary.', explanation: 'Incorrect. Beginning with "frequently" could modify the entire sentence, creating additional ambiguity about what happens frequently.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Resolve squinting modifiers by repositioning the adverb adjacent to the specific verb or action it modifies, eliminating dual interpretation.'
  },

  // COMPARATIVE MODIFIERS (4 questions)
  {
    position: 39,
    title: 'Comparative Modifier - More Faster',
    problem_text: 'This computer runs <u>more faster</u> than my old one.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "More faster" is a double comparative, incorrectly using both "more" and the "-er" suffix. Use only one form of comparison.' },
      { letter: 'B', text: 'faster', explanation: 'Correct. "Faster" is the correct comparative form for "fast." One-syllable adjectives take "-er," not "more."' },
      { letter: 'C', text: 'more fast', explanation: 'Incorrect. One-syllable adjectives like "fast" form comparatives with "-er," not with "more." Use "faster" instead.' },
      { letter: 'D', text: 'most fast', explanation: 'Incorrect. "Most fast" is the wrong form (and would be superlative), and "fast" forms its comparative as "faster," not with "most."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Avoid double comparatives. One-syllable adjectives form comparatives with "-er," not "more." Never use both forms together.'
  },
  {
    position: 40,
    title: 'Comparative Modifier - More Better',
    problem_text: 'Her second attempt was <u>more better</u> than her first.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "More better" is a double comparative error. "Better" is already the comparative form of "good," so "more" is redundant and incorrect.' },
      { letter: 'B', text: 'better', explanation: 'Correct. "Better" is the correct irregular comparative form of "good." No additional "more" is needed or allowed.' },
      { letter: 'C', text: 'more good', explanation: 'Incorrect. "Good" has an irregular comparative form "better." Do not use "more good" for comparisons.' },
      { letter: 'D', text: 'gooder', explanation: 'Incorrect. "Gooder" is not a word. The correct irregular comparative form of "good" is "better."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Irregular comparatives like "better" (from "good") and "worse" (from "bad") should never be used with "more" or "most."'
  },
  {
    position: 41,
    title: 'Comparative Modifier - Most Tallest',
    problem_text: 'Mount Everest is the <u>most tallest</u> mountain in the world.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Most tallest" is a double superlative, incorrectly using both "most" and "-est." Use only one superlative form.' },
      { letter: 'B', text: 'tallest', explanation: 'Correct. "Tallest" is the proper superlative form for "tall." One-syllable adjectives form superlatives with "-est," not "most."' },
      { letter: 'C', text: 'most tall', explanation: 'Incorrect. One-syllable adjectives like "tall" form superlatives with "-est," not with "most." Use "tallest."' },
      { letter: 'D', text: 'taller', explanation: 'Incorrect. "Taller" is the comparative form (comparing two things), but the superlative "tallest" is needed to indicate the highest of all.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Avoid double superlatives. One-syllable adjectives form superlatives with "-est," not "most." Never combine both forms.'
  },
  {
    position: 42,
    title: 'Comparative Modifier - More Unique',
    problem_text: 'This painting is <u>more unique</u> than the others in the gallery.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Unique" is an absolute adjective meaning one-of-a-kind. Something cannot be "more unique" because unique does not have degrees.' },
      { letter: 'B', text: 'unique', explanation: 'Incorrect. While "unique" is correct, the sentence structure requires comparison. Since "unique" cannot be compared, rewording is necessary.' },
      { letter: 'C', text: 'more unusual', explanation: 'Correct. "Unusual" can be compared with "more," unlike "unique." This maintains the intended meaning while using proper grammar.' },
      { letter: 'D', text: 'most unique', explanation: 'Incorrect. Like "more unique," "most unique" is wrong because "unique" is absolute and cannot have degrees of comparison.' }
    ],
    correct_answer: 'C',
    answer_explanation: 'Absolute adjectives like "unique," "perfect," "infinite," and "dead" cannot be compared. Use alternative adjectives that allow comparison or rephrase the sentence.'
  },

  // MIXED REVIEW (4 questions)
  {
    position: 43,
    title: 'Mixed Review - Dangling and Misplaced',
    problem_text: '<u>While cooking dinner, the smoke alarm went off in the kitchen that needed new batteries.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Contains multiple errors: "the smoke alarm" cannot cook (dangling modifier), and "that needed new batteries" seems to modify "kitchen" instead of "smoke alarm."' },
      { letter: 'B', text: 'While I was cooking dinner, the smoke alarm that needed new batteries went off in the kitchen.', explanation: 'Correct. Fixes the dangling modifier by adding "I was" and places "that needed new batteries" immediately after "smoke alarm" for clarity.' },
      { letter: 'C', text: 'While cooking dinner in the kitchen, the smoke alarm that needed new batteries went off.', explanation: 'Incorrect. Still has the dangling modifier problem; "the smoke alarm" cannot cook dinner, even with "in the kitchen" added.' },
      { letter: 'D', text: 'The smoke alarm went off while cooking dinner in the kitchen that needed new batteries.', explanation: 'Incorrect. The dangling modifier remains, and "that needed new batteries" now ambiguously could modify "kitchen."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Complex sentences may have multiple modifier errors. Fix dangling modifiers by providing a logical subject, and place adjective clauses adjacent to their antecedents.'
  },
  {
    position: 44,
    title: 'Mixed Review - Adverb and Participial Phrase',
    problem_text: 'The manager <u>only hired three employees wearing uniforms</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Only" is misplaced (should limit "three"), and "wearing uniforms" ambiguously could modify "employees" or describe the manager\'s action.' },
      { letter: 'B', text: 'hired only three employees who were wearing uniforms', explanation: 'Correct. Places "only" before "three" to show the limited number, and "who were wearing" clarifies the employees wore uniforms.' },
      { letter: 'C', text: 'hired three employees only wearing uniforms', explanation: 'Incorrect. While "only" is moved, its position is still awkward, and "wearing uniforms" remains ambiguous about who wore them.' },
      { letter: 'D', text: 'only hired three employees who wore uniforms', explanation: 'Incorrect. "Only hired" suggests hiring was the sole action taken, not that three was the limited number hired.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentences can contain multiple modifier issues. Address each problem: position limiting adverbs precisely and clarify participial phrases with proper structure.'
  },
  {
    position: 45,
    title: 'Mixed Review - Comparative and Misplaced Phrase',
    problem_text: 'This solution is <u>more simpler than the other method for solving the problem</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Contains double comparative "more simpler" (should be just "simpler") and awkward phrasing with "for solving the problem."' },
      { letter: 'B', text: 'simpler than the other method for solving the problem', explanation: 'Correct. Fixes the double comparative by using only "simpler" and maintains clear meaning with proper phrase placement.' },
      { letter: 'C', text: 'more simple than the other problem-solving method', explanation: 'Incorrect. "More simple" is less preferred than "simpler" for the comparative form, though technically acceptable in some contexts.' },
      { letter: 'D', text: 'more simpler for solving the problem than the other method', explanation: 'Incorrect. Keeps the double comparative error "more simpler" and creates awkward phrasing by moving "for solving the problem."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Review for multiple errors: eliminate double comparatives and ensure modifying phrases are positioned for clarity and natural flow.'
  },
  {
    position: 46,
    title: 'Mixed Review - Squinting and Dangling',
    problem_text: '<u>Flying over the mountains, the view was spectacular that we saw clearly.</u>',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "The view" cannot fly (dangling modifier), and "that we saw clearly" creates ambiguity as a misplaced clause separated from "view."' },
      { letter: 'B', text: 'Flying over the mountains, we clearly saw the spectacular view.', explanation: 'Correct. Fixes the dangling modifier with "we" as the subject who flew, and places "clearly" to modify "saw" without ambiguity.' },
      { letter: 'C', text: 'The view that we saw clearly was spectacular, flying over the mountains.', explanation: 'Incorrect. Moving "flying over the mountains" to the end creates ambiguity about whether the view or we were flying.' },
      { letter: 'D', text: 'Flying over the mountains clearly, the view that we saw was spectacular.', explanation: 'Incorrect. Still has the dangling modifier ("the view" cannot fly), and "clearly" awkwardly modifies "flying."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Complex modifier errors require systematic correction: provide logical subjects for participial phrases, position adverbs clearly, and place clauses adjacent to their antecedents.'
  }
];

module.exports = modifierQuestions;
