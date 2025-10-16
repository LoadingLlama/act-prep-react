import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'pronouns': {
    title: 'Pronouns',
    definitions: [
      { term: 'pronoun', definition: 'Word replacing noun: I, you, he, she, it, we, they, who, which, that' },
      { term: 'antecedent', definition: 'Noun that pronoun refers to. Pronoun must agree in number.' },
      { term: 'pronoun-antecedent agreement', definition: 'Singular antecedent → singular pronoun. Plural antecedent → plural pronoun.' },
      { term: 'subject pronoun', definition: 'Used as subject: I, you, he, she, it, we, they, who' },
      { term: 'object pronoun', definition: 'Used as object: me, you, him, her, it, us, them, whom' },
      { term: 'possessive pronoun', definition: 'Shows ownership: my, your, his, her, its, our, their (NO apostrophe!)' },
      { term: 'who vs whom', definition: 'who = subject ("Who called?"). whom = object ("To whom did you speak?")' },
      { term: 'ambiguous pronoun', definition: 'Unclear what noun it refers to: "John told Mike he was late." (Who was late?)' }
    ],
    questions: [
      { text: 'Which is correct?', options: ['Everyone should bring their book.', 'Everyone should bring his or her book.', 'Everyone should bring they book.', 'Everyone should bring our book.', 'Everyone should bring its book.'], correct: 1, exp: '"Everyone" is singular, needs singular pronoun "his or her"' },
      { text: 'Which pronoun? "Between you and __"', options: ['I', 'me', 'myself', 'we', 'us'], correct: 1, exp: 'Object pronoun after preposition "between": me' },
      { text: 'Which is correct?', options: ['The cat licked its paws.', 'The cat licked it\'s paws.', 'The cat licked its\' paws.', 'The cat licked it paws.', 'The cat licked their paws.'], correct: 0, exp: 'Possessive "its" has NO apostrophe. "It\'s" = "it is"' },
      { text: 'Choose: "__ is calling?"', options: ['Who', 'Whom', 'Whose', 'Which', 'That'], correct: 0, exp: 'Subject of sentence: who is calling' },
      { text: 'Choose: "To __ should I address this?"', options: ['who', 'whom', 'whose', 'whoever', 'whomever'], correct: 1, exp: 'Object of preposition "to": whom' },
      { text: 'Which has ambiguous pronoun? ', options: ['She runs fast.', 'Tom told Jim that he won.', 'The dog barked.', 'I like pizza.', 'We went home.'], correct: 1, exp: '"he" could refer to Tom or Jim - ambiguous' },
      { text: 'Which is correct?', options: ['Him and I went.', 'He and me went.', 'He and I went.', 'Him and me went.', 'He and myself went.'], correct: 2, exp: 'Subject pronouns: He and I. Test individually: "He went" ✓ "I went" ✓' }
    ]
  },
  'modifiers': {
    title: 'Misplaced Modifiers',
    definitions: [
      { term: 'modifier', definition: 'Word/phrase describing another word. Should be near word it modifies.' },
      { term: 'misplaced modifier', definition: 'Modifier too far from word it modifies, causing confusion' },
      { term: 'dangling modifier', definition: 'Modifier with no clear word to modify. "Running fast, the finish line appeared." (Who was running?)' },
      { term: 'introductory modifier', definition: 'Modifier at start of sentence. Must be followed by word it modifies.' },
      { term: 'adjective', definition: 'Modifies noun/pronoun. Answers which, what kind, how many.' },
      { term: 'adverb', definition: 'Modifies verb, adjective, or adverb. Often ends in -ly.' },
      { term: 'placement rule', definition: 'Place modifier immediately next to what it describes' }
    ],
    questions: [
      { text: 'Fix the dangling modifier: "Running quickly, the bus was missed."', options: ['Running quickly, I missed the bus.', 'The bus was missed running quickly.', 'Running quickly, the bus I missed.', 'No change needed.', 'Running quickly was the missed bus.'], correct: 0, exp: 'Person (I) was running, not bus. Correct subject must follow introductory phrase.' },
      { text: 'Which is correct?', options: ['I almost ate all the cookies.', 'I ate almost all the cookies.', 'Almost I ate all the cookies.', 'I ate all almost the cookies.', 'I ate all the almost cookies.'], correct: 1, exp: '"almost" modifies "all" - should be placed directly before it' },
      { text: 'Which has misplaced modifier?', options: ['She gave the book to her friend that was damaged.', 'She gave the damaged book to her friend.', 'The damaged book was given to her friend.', 'Her friend received the damaged book.', 'She gave her friend a damaged book.'], correct: 0, exp: 'Sounds like friend was damaged! Should be: "damaged book"' },
      { text: 'Fix: "Covered in mustard, I ate the hot dog."', options: ['I, covered in mustard, ate the hot dog.', 'Covered in mustard, the hot dog was eaten.', 'I ate the hot dog covered in mustard.', 'I ate the hot dog, covered in mustard.', 'Covered in mustard, ate I the hot dog.'], correct: 2, exp: 'Hot dog was covered in mustard, not the person. Modifier should be next to "hot dog"' },
      { text: 'Which is correct?', options: ['Only she said that.', 'She only said that.', 'She said only that.', 'She said that only.', 'Depends on meaning'], correct: 4, exp: '"Only" changes meaning based on position. Each option means something different.' },
      { text: 'Identify error: "Walking to school, my backpack felt heavy."', options: ['Misplaced modifier', 'Dangling modifier', 'Wrong tense', 'Fragment', 'No error'], correct: 1, exp: 'Backpack can\'t walk! Dangling modifier - person walking is missing as subject.' },
      { text: 'Which is clearest?', options: ['I saw a deer driving to work.', 'Driving to work, I saw a deer.', 'A deer I saw driving to work.', 'I, driving to work, saw a deer.', 'To work I saw a deer driving.'], correct: 1, exp: 'Places "driving" next to "I" (who was driving), clearest meaning' }
    ]
  },
  'parallel-structure': {
    title: 'Parallel Structure',
    definitions: [
      { term: 'parallel structure', definition: 'Using same grammatical form for items in a series or comparison' },
      { term: 'parallelism in lists', definition: 'All items same form: "running, jumping, swimming" or "to run, to jump, to swim"' },
      { term: 'parallelism with correlative conjunctions', definition: 'both...and, either...or, neither...nor, not only...but also - same form after each' },
      { term: 'parallelism in comparisons', definition: 'Same structure on both sides of than/as: "better to give than to receive"' },
      { term: 'breaking parallelism', definition: 'Mixing forms: "I like running, jumping, and to swim" (incorrect)' },
      { term: 'verb form consistency', definition: 'Keep same verb form throughout parallel structure' }
    ],
    questions: [
      { text: 'Which is parallel?', options: ['I like running, jumping, and to swim.', 'I like running, jumping, and swimming.', 'I like to run, jumping, and swimming.', 'I like run, jump, and swimming.', 'I like to run, jump, and swim.'], correct: 1, exp: 'All -ing forms: running, jumping, swimming - parallel' },
      { text: 'Fix: "She is smart, funny, and has talent."', options: ['She is smart, funny, and talent.', 'She is smart, funny, and talented.', 'She is smart, being funny, and has talent.', 'She is being smart, funny, and has talent.', 'No change.'], correct: 1, exp: 'All adjectives: smart, funny, talented - parallel structure' },
      { text: 'Which is correct?', options: ['I want not only to study but also relaxing.', 'I want not only to study but also to relax.', 'I want not only studying but also to relax.', 'I want not only study but also relax.', 'I want not only to study but relaxing also.'], correct: 1, exp: 'Same form after "not only" and "but also": to study... to relax' },
      { text: 'Which is parallel?', options: ['The job requires patience, dedication, and being skilled.', 'The job requires being patient, dedication, and skill.', 'The job requires patience, dedication, and skill.', 'The job requires to be patient, dedication, and skill.', 'The job requires patience, to dedicate, and skill.'], correct: 2, exp: 'All nouns: patience, dedication, skill - parallel' },
      { text: 'Fix: "He likes to read, writing, and drawing."', options: ['He likes reading, writing, and drawing.', 'He likes to read, to write, and to draw.', 'Both A and B are correct.', 'He likes read, write, and draw.', 'No change.'], correct: 2, exp: 'Either all -ing forms OR all "to ___" forms - both are parallel' },
      { text: 'Which is correct?', options: ['She is either late or she forgot.', 'She either is late or forgot.', 'Either she is late or forgot.', 'She is either late or forgetful.', 'She either late or forgot.'], correct: 3, exp: 'Same form after "either" and "or": late (adjective), forgetful (adjective)' },
      { text: 'Which breaks parallelism?', options: ['Swimming, running, biking', 'To swim, to run, to bike', 'Swim, run, bike', 'Swimming, running, to bike', 'All are parallel'], correct: 3, exp: 'Mixes -ing forms with "to" form - not parallel' }
    ]
  },
  'grammar-review': {
    title: 'Grammar Review',
    definitions: [
      { term: 'parts of speech', definition: 'Noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection' },
      { term: 'clause', definition: 'Group of words with subject and verb. Independent or dependent.' },
      { term: 'phrase', definition: 'Group of words without both subject and verb' },
      { term: 'active voice', definition: 'Subject performs action: "John ate the cake."' },
      { term: 'passive voice', definition: 'Subject receives action: "The cake was eaten by John."' },
      { term: 'commonly confused words', definition: 'affect/effect, then/than, their/there/they\'re, your/you\'re, to/too/two' },
      { term: 'double negative', definition: 'Avoid using two negatives: "don\'t have no" should be "don\'t have any"' }
    ],
    questions: [
      { text: 'Which is active voice?', options: ['The ball was thrown by Sarah.', 'Sarah threw the ball.', 'The ball is being thrown.', 'The ball has been thrown.', 'Thrown by Sarah was the ball.'], correct: 1, exp: 'Active: subject (Sarah) performs action (threw)' },
      { text: 'Which is correct?', options: ['Your going to love this.', 'You\'re going to love this.', 'Youre going to love this.', 'Your going too love this.', 'You\'re going too love this.'], correct: 1, exp: 'You\'re = you are. Your = possessive.' },
      { text: 'Which is correct?', options: ['The weather affects my mood.', 'The weather effects my mood.', 'The weather affect my mood.', 'The weather effect my mood.', 'The weather affectes my mood.'], correct: 0, exp: 'Affect (verb) = influence. Effect (noun) = result.' },
      { text: 'Fix double negative: "I don\'t have no money."', options: ['I don\'t have any money.', 'I have no money.', 'Both A and B', 'I don\'t not have money.', 'I doesn\'t have no money.'], correct: 2, exp: 'Remove one negative: "don\'t...any" or "no" alone - both correct' },
      { text: 'Which is correct?', options: ['I like pizza more then pasta.', 'I like pizza more than pasta.', 'I like pizza more, then pasta.', 'I like pizza more, than pasta.', 'I like pizza, more than pasta.'], correct: 1, exp: 'Than = comparison. Then = time sequence.' },
      { text: 'Which is a phrase (not a clause)?', options: ['Because I was late', 'She ran', 'When he called', 'In the morning', 'Although it rained'], correct: 3, exp: '"In the morning" has no subject or verb - it\'s a phrase' },
      { text: 'Which is correct?', options: ['Their going to there house.', 'They\'re going to their house.', 'There going to they\'re house.', 'Their going to they\'re house.', 'They\'re going too there house.'], correct: 1, exp: 'They\'re = they are. Their = possessive. There = location.' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding 4 more English Grammar lessons...\n');

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

  console.log('🎉 English Grammar batch 2 complete! Now at 43/82 lessons.');
}

addAll();
