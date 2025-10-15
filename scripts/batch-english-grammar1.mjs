import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'sentence-structure': {
    title: 'Building Complete Sentences',
    definitions: [
      { term: 'complete sentence', definition: 'Has subject and predicate, expresses complete thought' },
      { term: 'subject', definition: 'Who or what the sentence is about' },
      { term: 'predicate', definition: 'Tells what the subject does or is. Contains the verb.' },
      { term: 'fragment', definition: 'Incomplete sentence missing subject, verb, or complete thought' },
      { term: 'run-on sentence', definition: 'Two or more independent clauses incorrectly joined' },
      { term: 'independent clause', definition: 'Can stand alone as complete sentence. Has subject + verb.' },
      { term: 'dependent clause', definition: 'Cannot stand alone. Begins with subordinating word (because, when, if, etc.)' },
      { term: 'comma splice', definition: 'Error: two independent clauses joined only by comma' },
      { term: 'coordinating conjunction', definition: 'FANBOYS: for, and, nor, but, or, yet, so. Join independent clauses with comma.' },
      { term: 'subordinating conjunction', definition: 'Words like because, although, when, if that create dependent clauses' }
    ],
    questions: [
      { text: 'Which is a complete sentence?', options: ['Running to the store.', 'Because I was late.', 'The dog barked.', 'When she called.', 'After the game ended.'], correct: 2, exp: '"The dog barked" has subject (dog) and predicate (barked), expresses complete thought.' },
      { text: 'Identify the error: "I love reading, I visit the library often."', options: ['Fragment', 'Comma splice', 'No error', 'Missing subject', 'Wrong verb'], correct: 1, exp: 'Two independent clauses joined only by comma = comma splice. Need semicolon, period, or conjunction.' },
      { text: 'Which is a fragment?', options: ['She runs fast.', 'The car stopped.', 'Because it was raining.', 'They left early.', 'We won.'], correct: 2, exp: '"Because it was raining" is dependent clause, cannot stand alone.' },
      { text: 'Fix this run-on: "The sun set we went home." Which is correct?', options: ['The sun set, we went home.', 'The sun set we went, home.', 'The sun set, so we went home.', 'The sun set we, went home.', 'The sun, set we went home.'], correct: 2, exp: 'Add coordinating conjunction "so" with comma to properly join independent clauses.' },
      { text: 'What is the subject in: "The tall girl sang beautifully"?', options: ['tall', 'girl', 'The tall girl', 'sang', 'beautifully'], correct: 2, exp: 'Complete subject is "The tall girl" (who the sentence is about).' },
      { text: 'Which conjunction could fix: "I studied hard __ I passed the test"?', options: ['because', 'although', 'and', 'when', 'while'], correct: 2, exp: '"And" is coordinating conjunction (FANBOYS) that joins equal independent clauses.' },
      { text: 'Identify: "Although she was tired."', options: ['Complete sentence', 'Fragment', 'Run-on', 'Comma splice', 'No error'], correct: 1, exp: 'Dependent clause starting with "although" - needs independent clause to complete thought.' }
    ]
  },
  'commas': {
    title: 'Essential Comma Rules',
    definitions: [
      { term: 'introductory element', definition: 'Word/phrase at start of sentence. Use comma after: "However, ..." "In the morning, ..."' },
      { term: 'series comma', definition: 'Separate 3+ items: "apples, oranges, and bananas"' },
      { term: 'coordinate adjectives', definition: 'Two+ adjectives modifying same noun equally. Use comma between: "tall, dark stranger"' },
      { term: 'nonessential clause', definition: 'Extra info, not needed for meaning. Set off with commas: "My friend, who lives nearby, visited."' },
      { term: 'essential clause', definition: 'Necessary for meaning, NO commas: "Students who study hard succeed."' },
      { term: 'appositive', definition: 'Noun phrase renaming another noun. Usually needs commas: "My dog, a beagle, barks loudly."' },
      { term: 'compound sentence', definition: 'Two independent clauses joined by FANBOYS. Comma before conjunction: "I ran, and she walked."' },
      { term: 'interrupter', definition: 'Word/phrase interrupting sentence flow. Set off with commas: "The answer, in fact, is simple."' }
    ],
    questions: [
      { text: 'Which is correct?', options: ['However the test was easy.', 'However, the test was easy.', 'However the, test was easy.', 'However the test, was easy.', 'However the test was, easy.'], correct: 1, exp: 'Introductory word "However" needs comma after it.' },
      { text: 'Punctuate: "I bought apples oranges and bananas"', options: ['No commas needed', 'apples, oranges, and bananas', 'apples oranges, and bananas', 'apples, oranges and, bananas', 'apples oranges and, bananas'], correct: 1, exp: 'Series of 3+ items: use commas to separate each item.' },
      { text: 'Which needs commas?', options: ['The old house stood empty.', 'My sister Sarah called.', 'Students who cheat fail.', 'The tall strong athlete won.', 'She ran fast.'], correct: 3, exp: '"tall" and "strong" are coordinate adjectives (both modify athlete equally): "tall, strong athlete"' },
      { text: 'Punctuate: "My teacher Mr. Smith is strict."', options: ['No commas', 'My teacher, Mr. Smith, is strict.', 'My teacher Mr. Smith, is strict.', 'My, teacher Mr. Smith is strict.', 'My teacher Mr., Smith is strict.'], correct: 1, exp: '"Mr. Smith" is appositive renaming "teacher" - set off with commas.' },
      { text: 'Which is correct?', options: ['I ran, and I jumped.', 'I ran and, I jumped.', 'I, ran and I jumped.', 'I ran and I, jumped.', 'I ran and I jumped.'], correct: 0, exp: 'Compound sentence: comma before coordinating conjunction "and" joining two independent clauses.' },
      { text: 'Essential or nonessential? "The book that I borrowed was good."', options: ['Essential - no commas', 'Nonessential - needs commas', 'Both', 'Neither', 'Cannot determine'], correct: 0, exp: '"that I borrowed" identifies which specific book - essential for meaning, no commas.' },
      { text: 'Punctuate: "The answer in fact is correct."', options: ['No commas', 'answer, in fact is', 'answer in fact, is', 'answer, in fact, is', 'answer in, fact is'], correct: 3, exp: '"in fact" interrupts sentence - set off with commas on both sides.' }
    ]
  },
  'punctuation': {
    title: 'Advanced Punctuation',
    definitions: [
      { term: 'semicolon', definition: 'Joins related independent clauses: "I ran; she walked." Stronger than comma, weaker than period.' },
      { term: 'colon', definition: 'Introduces list, explanation, or quote. Must follow independent clause: "I need: milk, eggs, bread."' },
      { term: 'apostrophe possession', definition: 'Shows ownership. Singular: add \'s ("dog\'s"). Plural ending in s: add \' ("dogs\'")'  },
      { term: 'apostrophe contraction', definition: 'Shows missing letters: "don\'t" = "do not", "it\'s" = "it is"' },
      { term: 'dash', definition: 'Em dash (—) sets off interruptions or emphasis - stronger than comma' },
      { term: 'quotation marks', definition: 'Enclose direct quotes. Periods/commas go inside: "Hello," she said.' },
      { term: 'parentheses', definition: 'Enclose extra info less important than commas would suggest: "The test (on Friday) was hard."' },
      { term: 'its vs it\'s', definition: 'its = possessive ("its color"). it\'s = "it is" or "it has"' }
    ],
    questions: [
      { text: 'Which is correct?', options: ['I ran, she walked.', 'I ran; she walked.', 'I ran: she walked.', 'I ran she walked.', 'I ran – she walked.'], correct: 1, exp: 'Semicolon properly joins two related independent clauses.' },
      { text: 'When can you use a colon?', options: ['After any word', 'After dependent clause', 'After independent clause', 'Never with lists', 'Only in time'], correct: 2, exp: 'Colon must follow complete independent clause before introducing list/explanation.' },
      { text: 'Which is correct?', options: ["Its a nice day.", "Its' a nice day.", "It's a nice day.", "Its's a nice day.", "Itsits a nice day."], correct: 2, exp: '"It\'s" = "it is" (contraction). "Its" would be possessive (no apostrophe needed here).' },
      { text: 'Make possessive: "the books belonging to the students"', options: ["students' books", "student's books", "students's books", "students books'", "students books"], correct: 0, exp: 'Plural "students" ends in s, so add only apostrophe: students\'' },
      { text: 'Which is correct?', options: ['She said "hello".', 'She said "hello."', 'She said, "hello".', 'She said, "hello."', 'She said "hello,"'], correct: 3, exp: 'Comma before quote, period inside quotation marks: said, "hello."' },
      { text: 'Which uses dash correctly?', options: ['The test-was hard.', 'The test was-hard.', 'The test—which was long—was hard.', 'The—test was hard.', 'The test was hard—'], correct: 2, exp: 'Dashes (—) set off interrupting phrase on both sides.' },
      { text: 'Which is correct?', options: ["The dogs bone", "The dog's bone", "The dogs' bone", "The dogs's bone", "The dog's' bone"], correct: 1, exp: 'Singular "dog" owns bone: add \'s → dog\'s' }
    ]
  },
  'verbs': {
    title: 'Verbs',
    definitions: [
      { term: 'subject-verb agreement', definition: 'Singular subject takes singular verb, plural subject takes plural verb' },
      { term: 'verb tense', definition: 'Time of action: past, present, future. Keep consistent unless time changes.' },
      { term: 'present tense', definition: 'Action happening now. He runs, she writes, they play.' },
      { term: 'past tense', definition: 'Action already happened. He ran, she wrote, they played.' },
      { term: 'irregular verb', definition: 'Doesn\'t follow -ed pattern. Examples: go/went, run/ran, write/wrote' },
      { term: 'helping verb', definition: 'Helps main verb. Examples: is, are, was, were, has, have, will, would, can, could' },
      { term: 'tense consistency', definition: 'Don\'t shift tenses unnecessarily: "She runs and jumped" (wrong). "She ran and jumped" (correct).' },
      { term: 'compound subject', definition: 'Two+ subjects joined by "and" = plural verb. "Tom and Jerry run."' }
    ],
    questions: [
      { text: 'Which is correct?', options: ['The dogs runs.', 'The dog run.', 'The dogs run.', 'The dog are running.', 'The dogs is running.'], correct: 2, exp: 'Plural subject "dogs" takes plural verb "run"' },
      { text: 'Choose correct tense: "Yesterday, she __ to the store."', options: ['go', 'goes', 'went', 'going', 'will go'], correct: 2, exp: '"Yesterday" indicates past tense: went' },
      { text: 'Which has tense error?', options: ['She ran and jumped.', 'She runs and jumps.', 'She ran and jumps.', 'She will run and jump.', 'She is running and jumping.'], correct: 2, exp: 'Shifts from past (ran) to present (jumps) - inconsistent.' },
      { text: 'Which is correct?', options: ['Everyone are ready.', 'Everyone is ready.', 'Everyone were ready.', 'Everyone be ready.', 'Everyone am ready.'], correct: 1, exp: '"Everyone" is singular indefinite pronoun, takes singular verb "is"' },
      { text: 'Compound subject: "Tom and Jerry __ fast."', options: ['runs', 'run', 'is running', 'was running', 'has run'], correct: 1, exp: 'Compound subject (Tom and Jerry) = plural, takes plural verb "run"' },
      { text: 'Which is irregular verb?', options: ['walk/walked', 'talk/talked', 'go/went', 'play/played', 'climb/climbed'], correct: 2, exp: '"go/went" doesn\'t follow regular -ed pattern - it\'s irregular' },
      { text: 'Fix the error: "She don\'t like pizza."', options: ['She doesn\'t like pizza.', 'She don\'t likes pizza.', 'She not like pizza.', 'She didn\'t like pizza.', 'She doesn\'t likes pizza.'], correct: 0, exp: 'Singular "she" requires "doesn\'t" (not "don\'t")' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding 4 English Grammar lessons...\n');

  for (const [key, data] of Object.entries(lessons)) {
    try {
      const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', key).single();
      console.log(`✅ ${lesson.title}`);

      await supabase.from('term_definitions').delete().eq('lesson_key', key);
      const defs = data.definitions.map(d => ({ ...d, lesson_key: key }));
      await supabase.from('term_definitions').insert(defs);
      console.log(`  ✓ ${defs.length} definitions`);

      await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
      const { data: quiz } = await supabase.from('quizzes').insert([{
        lesson_id: lesson.id, title: `${data.title} Practice`, intro: 'Test your understanding.',
        quiz_type: 'practice', position: 999, is_required: false
      }]).select().single();

      const qData = await supabase.from('quiz_questions').insert(
        data.questions.map((q, i) => ({ quiz_id: quiz.id, question_text: q.text, question_order: i }))
      ).select();

      const opts = [];
      qData.data.forEach((dbQ, i) => {
        data.questions[i].options.forEach((opt, j) => {
          opts.push({
            question_id: dbQ.id, option_text: opt, option_order: j,
            is_correct: j === data.questions[i].correct,
            explanation: j === data.questions[i].correct ? data.questions[i].exp : null
          });
        });
      });
      await supabase.from('quiz_options').insert(opts);
      console.log(`  ✓ ${data.questions.length} questions\n`);
    } catch (e) {
      console.error(`❌ Error with ${key}:`, e.message);
    }
  }

  console.log('🎉 English Grammar batch 1 complete! Now at 39/82 lessons.');
}

addAll();
