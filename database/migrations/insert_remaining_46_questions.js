/**
 * Insert remaining 46 practice questions for sentence-structure lesson
 * Total will be 50 questions with difficulty labels: easy, medium, hard, ultrathink
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertQuestions() {
  console.log('🚀 Inserting 46 additional practice questions...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  const questions = [
    // EASY QUESTIONS (5-14) - positions 5-14
    {
      position: 5,
      title: 'Fragment: Missing Subject',
      difficulty: 'easy',
      problem_text: 'During the storm last night, <u>was raining</u> heavily for three hours.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'it was raining' },
        { letter: 'C', text: 'raining' },
        { letter: 'D', text: 'had rained' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The sentence needs a subject. "It was raining" provides the necessary subject "it" to complete the sentence.'
    },
    {
      position: 6,
      title: 'Simple Run-on Sentence',
      difficulty: 'easy',
      problem_text: 'The concert was amazing<u> the</u> band played for two hours.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', and the' },
        { letter: 'C', text: '; the' },
        { letter: 'D', text: ', the' }
      ],
      correct_answer: 'B',
      answer_explanation: 'Two independent clauses cannot be joined with just a space. "And" is a FANBOYS conjunction that, with a comma, properly connects the clauses.'
    },
    {
      position: 7,
      title: 'Basic Comma Splice',
      difficulty: 'easy',
      problem_text: 'She studied all night<u>, she</u> still felt unprepared for the exam.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: '; she' },
        { letter: 'C', text: ' she' },
        { letter: 'D', text: ', and she' }
      ],
      correct_answer: 'B',
      answer_explanation: 'A comma alone cannot join two independent clauses. A semicolon is appropriate here to connect closely related independent clauses.'
    },
    {
      position: 8,
      title: 'Fragment: Missing Verb',
      difficulty: 'easy',
      problem_text: 'The students in the library <u>studying</u> for their final exams.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'are studying' },
        { letter: 'C', text: 'studied' },
        { letter: 'D', text: 'to study' }
      ],
      correct_answer: 'B',
      answer_explanation: '"Studying" is a participle and cannot serve as the main verb. "Are studying" provides the complete verb phrase needed.'
    },
    {
      position: 9,
      title: 'FANBOYS: Basic Usage',
      difficulty: 'easy',
      problem_text: 'I wanted to go to the park<u> but</u> it started raining.',
      choices: [
        { letter: 'A', text: ', but' },
        { letter: 'B', text: ' but' },
        { letter: 'C', text: '; but' },
        { letter: 'D', text: 'NO CHANGE' }
      ],
      correct_answer: 'A',
      answer_explanation: 'When using a FANBOYS conjunction to connect two independent clauses, a comma must come before the conjunction.'
    },
    {
      position: 10,
      title: 'Dependent Clause: After',
      difficulty: 'easy',
      problem_text: '<u>After the game ended</u> the fans celebrated in the streets.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'After the game ended,' },
        { letter: 'C', text: 'After, the game ended' },
        { letter: 'D', text: 'The game ended after' }
      ],
      correct_answer: 'B',
      answer_explanation: 'When a dependent clause begins a sentence, it must be followed by a comma before the independent clause.'
    },
    {
      position: 11,
      title: 'Simple Fragment Fix',
      difficulty: 'easy',
      problem_text: 'The restaurant on the corner. <u>Which serves</u> the best pizza in town.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'It serves' },
        { letter: 'C', text: 'Serves' },
        { letter: 'D', text: 'That serves' }
      ],
      correct_answer: 'B',
      answer_explanation: '"Which serves" creates a dependent clause fragment. "It serves" creates an independent clause with a subject and verb.'
    },
    {
      position: 12,
      title: 'Comma Splice: However',
      difficulty: 'easy',
      problem_text: 'The weather forecast predicted sunshine<u>, however</u> it rained all day.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: '; however,' },
        { letter: 'C', text: ', and however' },
        { letter: 'D', text: ' however' }
      ],
      correct_answer: 'B',
      answer_explanation: '"However" is a conjunctive adverb, not a FANBOYS conjunction. It requires a semicolon before it and a comma after.'
    },
    {
      position: 13,
      title: 'Basic Subordinating Conjunction',
      difficulty: 'easy',
      problem_text: 'We will go hiking tomorrow <u>unless it</u> rains.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', unless it' },
        { letter: 'C', text: '; unless it' },
        { letter: 'D', text: 'unless, it' }
      ],
      correct_answer: 'A',
      answer_explanation: 'When a dependent clause follows an independent clause, no comma is needed before the subordinating conjunction "unless".'
    },
    {
      position: 14,
      title: 'Fragment: Because',
      difficulty: 'easy',
      problem_text: '<u>Because the library was closed.</u> We studied at the coffee shop instead.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Because the library was closed' },
        { letter: 'C', text: 'Because the library was closed,' },
        { letter: 'D', text: 'The library was closed,' }
      ],
      correct_answer: 'C',
      answer_explanation: 'A dependent clause starting with "because" needs to be attached to the independent clause with a comma, not separated with a period.'
    },

    // MEDIUM QUESTIONS (15-34) - positions 15-34
    {
      position: 15,
      title: 'Complex Comma Splice',
      difficulty: 'medium',
      problem_text: 'The scientist conducted numerous experiments over several years<u>, therefore</u> her findings were considered highly reliable.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: '; therefore,' },
        { letter: 'C', text: ', and therefore' },
        { letter: 'D', text: ' therefore' }
      ],
      correct_answer: 'B',
      answer_explanation: '"Therefore" is a conjunctive adverb requiring a semicolon before and comma after when joining independent clauses.'
    },
    {
      position: 16,
      title: 'Multiple Dependent Clauses',
      difficulty: 'medium',
      problem_text: '<u>While some students preferred online learning others</u> found traditional classrooms more effective.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'While some students preferred online learning, others' },
        { letter: 'C', text: 'While, some students preferred online learning, others' },
        { letter: 'D', text: 'Some students preferred online learning while others' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The dependent clause "While some students preferred online learning" must be separated from the independent clause with a comma.'
    },
    {
      position: 17,
      title: 'Semicolon vs. Comma',
      difficulty: 'medium',
      problem_text: 'The museum features paintings from the Renaissance<u>; sculptures</u> from ancient Greece, and artifacts from Egypt.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', sculptures' },
        { letter: 'C', text: ' sculptures' },
        { letter: 'D', text: ': sculptures' }
      ],
      correct_answer: 'B',
      answer_explanation: 'This is a simple list requiring commas, not semicolons. Semicolons are only needed in lists with internal commas.'
    },
    {
      position: 18,
      title: 'Run-on with Conjunctive Adverb',
      difficulty: 'medium',
      problem_text: 'The team practiced diligently all season <u>consequently they</u> won the championship.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', consequently, they' },
        { letter: 'C', text: '; consequently, they' },
        { letter: 'D', text: ', and consequently they' }
      ],
      correct_answer: 'C',
      answer_explanation: '"Consequently" is a conjunctive adverb that requires a semicolon before it when joining independent clauses.'
    },
    {
      position: 19,
      title: 'Fragment with Participial Phrase',
      difficulty: 'medium',
      problem_text: 'The documentary, <u>having won</u> several awards at film festivals, will air on television next month.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'which won' },
        { letter: 'C', text: 'winning' },
        { letter: 'D', text: 'won' }
      ],
      correct_answer: 'A',
      answer_explanation: '"Having won" is a participial phrase that correctly modifies "documentary." The sentence has a clear subject and verb (documentary...will air).'
    },
    {
      position: 20,
      title: 'Embedded Dependent Clause',
      difficulty: 'medium',
      problem_text: 'The research paper<u> that the professor assigned</u> is due next Friday.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', that the professor assigned,' },
        { letter: 'C', text: ' which the professor assigned' },
        { letter: 'D', text: ', which the professor assigned,' }
      ],
      correct_answer: 'A',
      answer_explanation: 'This is a restrictive relative clause (essential to meaning), so no commas are needed around it.'
    },
    {
      position: 21,
      title: 'Comma Splice with Transition',
      difficulty: 'medium',
      problem_text: 'Global temperatures continue to rise<u>, meanwhile</u> polar ice caps are melting at alarming rates.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: '; meanwhile,' },
        { letter: 'C', text: ', and meanwhile,' },
        { letter: 'D', text: ' and meanwhile' }
      ],
      correct_answer: 'B',
      answer_explanation: '"Meanwhile" is a conjunctive adverb requiring a semicolon before and comma after when connecting independent clauses.'
    },
    {
      position: 22,
      title: 'Complex Fragment',
      difficulty: 'medium',
      problem_text: '<u>Although the committee reviewed dozens of applications and interviewed many qualified candidates.</u> They selected the most experienced person for the position.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Although the committee reviewed dozens of applications and interviewed many qualified candidates,' },
        { letter: 'C', text: 'The committee reviewed dozens of applications and interviewed many qualified candidates,' },
        { letter: 'D', text: 'Reviewing dozens of applications and interviewing many qualified candidates,' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The dependent clause beginning with "Although" must be attached to the independent clause with a comma, not separated with a period.'
    },
    {
      position: 23,
      title: 'Misplaced Semicolon',
      difficulty: 'medium',
      problem_text: 'To succeed in this course<u>; you</u> must attend all lectures, complete the assignments, and participate in discussions.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' you' },
        { letter: 'C', text: ', you' },
        { letter: 'D', text: ': you' }
      ],
      correct_answer: 'C',
      answer_explanation: 'A semicolon can only connect two independent clauses. "To succeed in this course" is an introductory phrase requiring a comma.'
    },
    {
      position: 24,
      title: 'FANBOYS with Compound Predicate',
      difficulty: 'medium',
      problem_text: 'The chef prepared the meal carefully<u>, and</u> served it with pride.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' and' },
        { letter: 'C', text: '; and' },
        { letter: 'D', text: 'and' }
      ],
      correct_answer: 'B',
      answer_explanation: 'This is a compound predicate (same subject for both verbs), not two independent clauses, so no comma is needed before "and".'
    },
    {
      position: 25,
      title: 'Non-restrictive Clause',
      difficulty: 'medium',
      problem_text: 'My sister<u> who lives in Boston</u> is visiting this weekend.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', who lives in Boston,' },
        { letter: 'C', text: ' whom lives in Boston' },
        { letter: 'D', text: 'who lives in Boston,' }
      ],
      correct_answer: 'B',
      answer_explanation: 'If the information is non-essential (you have only one sister), the clause needs commas. If restrictive (specifying which sister), no commas. Context suggests non-restrictive.'
    },
    {
      position: 26,
      title: 'Run-on with Missing Conjunction',
      difficulty: 'medium',
      problem_text: 'The company launched a new product line <u>the marketing</u> campaign was very successful.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', the marketing' },
        { letter: 'C', text: 'and the marketing' },
        { letter: 'D', text: ', and the marketing' }
      ],
      correct_answer: 'D',
      answer_explanation: 'Two independent clauses require a comma plus a FANBOYS conjunction like "and".'
    },
    {
      position: 27,
      title: 'Fragment: Subordinate Clause Only',
      difficulty: 'medium',
      problem_text: '<u>When the bell rang and students rushed</u> out of the classroom.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'When the bell rang, students rushed' },
        { letter: 'C', text: 'The bell rang and students rushed' },
        { letter: 'D', text: 'When the bell rang, and students rushed' }
      ],
      correct_answer: 'B',
      answer_explanation: '"When the bell rang" is a dependent clause that needs to be properly connected to the independent clause with a comma.'
    },
    {
      position: 28,
      title: 'Colon vs. Semicolon',
      difficulty: 'medium',
      problem_text: 'The recipe requires three main ingredients<u>; flour</u>, sugar, and eggs.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ': flour' },
        { letter: 'C', text: ' flour' },
        { letter: 'D', text: ', flour' }
      ],
      correct_answer: 'B',
      answer_explanation: 'A colon is used to introduce a list after a complete independent clause, not a semicolon.'
    },
    {
      position: 29,
      title: 'Comma Splice: Moreover',
      difficulty: 'medium',
      problem_text: 'The experiment yielded surprising results<u>, moreover</u> it challenged existing theories.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: '; moreover,' },
        { letter: 'C', text: ', and moreover' },
        { letter: 'D', text: ' moreover' }
      ],
      correct_answer: 'B',
      answer_explanation: '"Moreover" is a conjunctive adverb that needs a semicolon before and comma after when joining independent clauses.'
    },
    {
      position: 30,
      title: 'Fragment: Appositive',
      difficulty: 'medium',
      problem_text: 'Dr. Martinez<u>, a renowned</u> expert in marine biology, will speak at the conference.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' a renowned' },
        { letter: 'C', text: ', who is a renowned' },
        { letter: 'D', text: ' who is a renowned' }
      ],
      correct_answer: 'A',
      answer_explanation: 'The appositive phrase "a renowned expert in marine biology" is correctly set off with commas to provide additional information.'
    },
    {
      position: 31,
      title: 'Dependent Clause: If',
      difficulty: 'medium',
      problem_text: 'You can borrow my car <u>if you promise</u> to drive carefully.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', if you promise' },
        { letter: 'C', text: '; if you promise' },
        { letter: 'D', text: 'if, you promise' }
      ],
      correct_answer: 'A',
      answer_explanation: 'When a dependent clause follows an independent clause, no comma is needed before the subordinating conjunction.'
    },
    {
      position: 32,
      title: 'Run-on: Missing Punctuation',
      difficulty: 'medium',
      problem_text: 'The novel explores themes of identity and belonging <u>it has</u> received critical acclaim worldwide.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', it has' },
        { letter: 'C', text: '; it has' },
        { letter: 'D', text: ', and it has' }
      ],
      correct_answer: 'C',
      answer_explanation: 'Two independent clauses can be joined with a semicolon when they are closely related in meaning.'
    },
    {
      position: 33,
      title: 'Fragment: Verbal Phrase',
      difficulty: 'medium',
      problem_text: '<u>To understand the complex</u> mathematical concepts. Students must review the fundamentals first.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'To understand the complex mathematical concepts,' },
        { letter: 'C', text: 'Understanding the complex mathematical concepts,' },
        { letter: 'D', text: 'For understanding complex mathematical concepts' }
      ],
      correct_answer: 'B',
      answer_explanation: 'An infinitive phrase at the beginning of a sentence should be followed by a comma, not a period.'
    },
    {
      position: 34,
      title: 'Comma with Contrasting Element',
      difficulty: 'medium',
      problem_text: 'The solution is simple<u> not</u> complicated.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', not' },
        { letter: 'C', text: '; not' },
        { letter: 'D', text: 'and not' }
      ],
      correct_answer: 'B',
      answer_explanation: 'A comma is needed to set off a contrasting element introduced by "not".'
    },

    // HARD QUESTIONS (35-44) - positions 35-44
    {
      position: 35,
      title: 'Complex Sentence Structure',
      difficulty: 'hard',
      problem_text: 'Although the architect\'s initial design was innovative<u>, the building committee</u> which consisted of experienced professionals, requested significant revisions.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' the building committee,' },
        { letter: 'C', text: ', the building committee,' },
        { letter: 'D', text: ' the building committee' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The dependent clause "Although...innovative" needs a comma, and the non-restrictive clause "which consisted..." also needs commas around it.'
    },
    {
      position: 36,
      title: 'Embedded Clauses',
      difficulty: 'hard',
      problem_text: 'The researchers discovered that the medication<u> that had been</u> approved only recently, was more effective than older treatments.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' that had been approved only recently' },
        { letter: 'C', text: ', that had been approved only recently' },
        { letter: 'D', text: ', which had been approved only recently,' }
      ],
      correct_answer: 'D',
      answer_explanation: '"Which" introduces a non-restrictive clause providing additional information, requiring commas. "That" would be restrictive (no commas).'
    },
    {
      position: 37,
      title: 'Semicolon with Complex Items',
      difficulty: 'hard',
      problem_text: 'The conference attendees included Dr. Sarah Chen, a physicist from MIT<u>; Professor</u> James Wilson, who specializes in quantum mechanics; and Dr. Maria Rodriguez, an expert in theoretical physics.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', Professor' },
        { letter: 'C', text: ': Professor' },
        { letter: 'D', text: ' and Professor' }
      ],
      correct_answer: 'A',
      answer_explanation: 'When list items contain internal commas, semicolons must separate the items for clarity.'
    },
    {
      position: 38,
      title: 'Parallel Structure in Clauses',
      difficulty: 'hard',
      problem_text: 'The study examined how students learn<u>, what motivates</u> them to succeed, and the factors that influence their academic performance.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' what motivates' },
        { letter: 'C', text: ', their motivation to' },
        { letter: 'D', text: ', what their motivation is for' }
      ],
      correct_answer: 'A',
      answer_explanation: 'The parallel structure requires noun clauses: "how students learn," "what motivates them," and "the factors that..." (implied "what factors").'
    },
    {
      position: 39,
      title: 'Multiple Sentence Errors',
      difficulty: 'hard',
      problem_text: 'Despite the fact that renewable energy sources are becoming more affordable<u> many countries still rely</u> heavily on fossil fuels, this dependence has significant environmental consequences.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', many countries still rely heavily on fossil fuels; this' },
        { letter: 'C', text: ' many countries still rely heavily on fossil fuels. This' },
        { letter: 'D', text: ', many countries still rely heavily on fossil fuels. This' }
      ],
      correct_answer: 'D',
      answer_explanation: 'The dependent clause needs a comma after it, and the comma splice must be fixed with a period to separate two independent clauses.'
    },
    {
      position: 40,
      title: 'Restrictive vs. Non-restrictive',
      difficulty: 'hard',
      problem_text: 'The students<u> who completed</u> the extra credit assignment received higher grades than those who did not.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', who completed,' },
        { letter: 'C', text: ' whom completed' },
        { letter: 'D', text: ', who completed' }
      ],
      correct_answer: 'A',
      answer_explanation: 'This is a restrictive clause (only those students who completed it), so no commas should be used.'
    },
    {
      position: 41,
      title: 'Conjunctive Adverb Placement',
      difficulty: 'hard',
      problem_text: 'The company invested heavily in research and development; <u>its profits however</u> declined over the past year.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'its profits, however,' },
        { letter: 'C', text: 'however, its profits' },
        { letter: 'D', text: 'its profits however,' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The conjunctive adverb "however" should be set off with commas when it interrupts the clause.'
    },
    {
      position: 42,
      title: 'Complex Fragment',
      difficulty: 'hard',
      problem_text: '<u>The theory, which was developed</u> over decades of research and refined through countless experiments conducted by scientists worldwide.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'The theory which was developed' },
        { letter: 'C', text: 'The theory, developed' },
        { letter: 'D', text: 'The theory, which was developed over decades of research and refined through countless experiments conducted by scientists worldwide, has been' }
      ],
      correct_answer: 'D',
      answer_explanation: 'The sentence is a fragment lacking a main verb. Option D completes the sentence with a predicate.'
    },
    {
      position: 43,
      title: 'Colon with Independent Clauses',
      difficulty: 'hard',
      problem_text: 'The experiment revealed an unexpected finding<u>: the</u> control group performed better than the experimental group.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', the' },
        { letter: 'C', text: '; the' },
        { letter: 'D', text: ' the' }
      ],
      correct_answer: 'A',
      answer_explanation: 'A colon can introduce an independent clause that explains or elaborates on the first independent clause.'
    },
    {
      position: 44,
      title: 'Multiple Dependent Clauses',
      difficulty: 'hard',
      problem_text: '<u>When the director announced that filming would begin and that the cast</u> should arrive early, everyone prepared accordingly.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'When the director announced that filming would begin, and that the cast' },
        { letter: 'C', text: 'When the director announced, that filming would begin and that the cast' },
        { letter: 'D', text: 'The director announced that filming would begin and that the cast' }
      ],
      correct_answer: 'A',
      answer_explanation: 'The parallel noun clauses "that filming would begin" and "that the cast should arrive" are correctly structured without additional punctuation.'
    },

    // ULTRATHINK QUESTIONS (45-50) - positions 45-50
    {
      position: 45,
      title: 'Sophisticated Parallel Structure',
      difficulty: 'ultrathink',
      problem_text: 'The novelist\'s work is celebrated not only for its intricate plot development<u> but also because of the</u> vivid characterization and masterful use of symbolism.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' but also for its' },
        { letter: 'C', text: ' but also for the' },
        { letter: 'D', text: ', but also because of its' }
      ],
      correct_answer: 'B',
      answer_explanation: 'Parallel structure requires "not only for its...but also for its" to maintain grammatical consistency.'
    },
    {
      position: 46,
      title: 'Complex Appositive Structure',
      difficulty: 'ultrathink',
      problem_text: 'The museum\'s most valuable painting<u>—a masterpiece by</u> Rembrandt that was discovered in an attic in Amsterdam and authenticated by leading experts—will be displayed next month.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', a masterpiece by' },
        { letter: 'C', text: ': a masterpiece by' },
        { letter: 'D', text: ' a masterpiece by' }
      ],
      correct_answer: 'A',
      answer_explanation: 'Em dashes are appropriate for setting off a lengthy appositive that contains internal commas, providing stronger separation than commas.'
    },
    {
      position: 47,
      title: 'Nested Dependent Clauses',
      difficulty: 'ultrathink',
      problem_text: 'Although critics argue that modern technology<u>, which has transformed</u> how we communicate, has diminished face-to-face interactions, researchers have found evidence to the contrary.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ' which has transformed' },
        { letter: 'C', text: ' that has transformed' },
        { letter: 'D', text: ', that has transformed' }
      ],
      correct_answer: 'A',
      answer_explanation: 'The non-restrictive clause "which has transformed how we communicate" correctly interrupts the main clause and requires commas.'
    },
    {
      position: 48,
      title: 'Subtle Comma Splice',
      difficulty: 'ultrathink',
      problem_text: 'The philosopher\'s argument rests on three premises: first, that human nature is fundamentally rational; second, that reason can guide ethical decisions<u>; third, morality</u> is universal rather than culturally determined.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: '; and third, that morality' },
        { letter: 'C', text: ', and third, that morality' },
        { letter: 'D', text: '; third, that morality' }
      ],
      correct_answer: 'D',
      answer_explanation: 'Parallel structure requires "that" in all three clauses: "that human nature," "that reason," and "that morality."'
    },
    {
      position: 49,
      title: 'Advanced Restrictive Clause',
      difficulty: 'ultrathink',
      problem_text: 'Economists<u> who study behavioral patterns in financial markets</u> have identified several cognitive biases that influence investment decisions.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', who study behavioral patterns in financial markets,' },
        { letter: 'C', text: ' that study behavioral patterns in financial markets' },
        { letter: 'D', text: ', studying behavioral patterns in financial markets,' }
      ],
      correct_answer: 'A',
      answer_explanation: 'This is a restrictive clause specifying which economists, not all economists, so no commas should be used.'
    },
    {
      position: 50,
      title: 'Sophisticated Sentence Combining',
      difficulty: 'ultrathink',
      problem_text: 'The archaeological discovery<u>—which included artifacts dating</u> back millennia, provided new insights into ancient civilizations, these findings challenged long-held assumptions about early human societies.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', which included artifacts dating back millennia, provided new insights into ancient civilizations; these' },
        { letter: 'C', text: '—which included artifacts dating back millennia—provided new insights into ancient civilizations. These' },
        { letter: 'D', text: ' which included artifacts dating back millennia and provided new insights into ancient civilizations, these' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The appositive needs closing em dash, and the comma splice must be corrected with a period to properly separate independent clauses.'
    }
  ];

  try {
    console.log(`📝 Inserting ${questions.length} questions...\n`);

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`  [${i + 1}/${questions.length}] Creating: ${q.title} (${q.difficulty})`);

      const { error } = await supabase.from('lesson_examples').insert({
        lesson_id: lessonId,
        position: q.position,
        title: q.title,
        problem_text: q.problem_text,
        choices: q.choices,
        correct_answer: q.correct_answer,
        solution_steps: [],
        answer_explanation: q.answer_explanation,
        is_worked_example: false
      });

      if (error) {
        console.error(`    ❌ Error on question ${i + 1}:`, error.message);
        throw error;
      }
    }

    // Verify total count
    const { data: allExamples, error: countError } = await supabase
      .from('lesson_examples')
      .select('id, position, title, correct_answer')
      .eq('lesson_id', lessonId)
      .order('position');

    if (countError) throw countError;

    console.log(`\n✅ Successfully inserted ${questions.length} questions!`);
    console.log(`📊 Total examples in database: ${allExamples.length}`);
    console.log('\n📋 All Examples:');
    console.table(allExamples);

    console.log('\n🎉 Complete! You now have 50 practice questions for sentence-structure.');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

insertQuestions();
