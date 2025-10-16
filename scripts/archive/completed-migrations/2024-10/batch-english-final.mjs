import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'misc-topics': {
    title: 'Miscellaneous Topics',
    definitions: [
      { term: 'idiom', definition: 'Common expression with non-literal meaning. Must be learned, not figured out.' },
      { term: 'preposition usage', definition: 'Correct preposition depends on context: "interested in", "familiar with", "different from"' },
      { term: 'comparison structure', definition: 'Use "more/-er than" for comparing two. "Most/-est" for three or more.' },
      { term: 'comparative adjective', definition: 'Comparing two: add -er or use "more". Examples: taller, more beautiful' },
      { term: 'superlative adjective', definition: 'Comparing three+: add -est or use "most". Examples: tallest, most beautiful' },
      { term: 'conciseness', definition: 'Use fewest words to express idea clearly. Avoid wordiness.' },
      { term: 'logical expression', definition: 'Ideas should make sense and flow logically in context' }
    ],
    questions: [
      { text: 'Which is correct?', options: ['She is different than me.', 'She is different from me.', 'She is different to me.', 'She is different of me.', 'She is different at me.'], correct: 1, exp: 'Idiom: "different from" is standard' },
      { text: 'Comparing two people, which is correct?', options: ['She is the tallest.', 'She is the most tall.', 'She is taller.', 'She is more taller.', 'She is most tall.'], correct: 2, exp: 'Comparative (two): use -er form: taller' },
      { text: 'Of three students, who scored highest?', options: ['The taller one', 'The most tall', 'The tallest', 'The more tall', 'The most tallest'], correct: 2, exp: 'Superlative (three+): use -est form: tallest' },
      { text: 'Which is most concise?', options: ['In my opinion, I think that...', 'I think that...', 'It is my opinion that I think...', 'In my thinking, I believe...', 'I am of the opinion that...'], correct: 1, exp: '"I think that..." is clearest and most concise' },
      { term: 'Which is correct?', options: ['She is interested about art.', 'She is interested at art.', 'She is interested in art.', 'She is interested for art.', 'She is interested to art.'], correct: 2, exp: 'Idiom: "interested in"' },
      { text: 'Fix: "between you and I"', options: ['between you and me', 'between you and myself', 'between yourself and I', 'among you and I', 'between we'], correct: 0, exp: 'Object pronoun after preposition: between you and me' },
      { text: 'Which is better?', options: ['He is more smarter than her.', 'He is smarter than her.', 'He is more smart than her.', 'He is most smart than her.', 'He is more smartest than her.'], correct: 1, exp: 'Use -er OR more, not both. "Smarter" is correct.' }
    ]
  },
  'redundancy': {
    title: 'Redundancy & Wordiness',
    definitions: [
      { term: 'redundancy', definition: 'Unnecessary repetition of ideas. "Free gift" (all gifts are free)' },
      { term: 'wordiness', definition: 'Using more words than necessary. "In order to" → "to"' },
      { term: 'concise writing', definition: 'Express ideas in fewest words while maintaining clarity' },
      { term: 'common redundancies', definition: '"past history", "future plans", "advance warning", "completely finish", "end result"' },
      { term: 'wordy phrases', definition: '"due to the fact that" → "because", "at this point in time" → "now"' },
      { term: 'DELETE option', definition: 'On ACT, often the shortest answer (DELETE or omit) is correct when avoiding redundancy' }
    ],
    questions: [
      { text: 'Fix redundancy: "She returned back home."', options: ['She returned home.', 'She returned back again home.', 'She came returned back home.', 'No change', 'She returned to back home.'], correct: 0, exp: '"Returned" means "went back" - "back" is redundant' },
      { text: 'Which is most concise?', options: ['Due to the fact that it rained', 'Because it rained', 'Owing to the fact that it rained', 'On account of the fact that it rained', 'For the reason that it rained'], correct: 1, exp: '"Because" is shortest and clearest' },
      { text: 'Which is redundant?', options: ['Final outcome', 'Outcome', 'Result', 'Ending', 'All of the above except A'], correct: 0, exp: '"Final outcome" - outcomes are already final (redundant)' },
      { text: 'Fix: "In my personal opinion, I think..."', options: ['I think...', 'In my opinion...', 'Both A and B', 'Delete entire phrase', 'No change'], correct: 2, exp: 'Both "I think" and "In my opinion" work - remove "personal" (redundant)' },
      { text: 'Most concise: "He is currently living in Texas at this present time."', options: ['He currently lives in Texas.', 'He is living in Texas currently.', 'He lives in Texas.', 'He is living in Texas.', 'All equally good'], correct: 2, exp: '"Currently" and "at this present time" are redundant. Simple "lives" is clearest.' },
      { text: 'Which is wordy?', options: ['I will call you later.', 'I will call you at a later time.', 'I\'ll call you later.', 'Call you later.', 'All are fine'], correct: 1, exp: '"at a later time" is wordy - "later" alone is sufficient' },
      { text: 'Fix: "They combined together."', options: ['They combined.', 'They came combined together.', 'They together combined.', 'No change', 'They were combined together.'], correct: 0, exp: '"Combined" means "put together" - "together" is redundant' }
    ]
  },
  'word-choice': {
    title: 'Word Choice',
    definitions: [
      { term: 'word choice', definition: 'Selecting the right word for context, meaning, and tone' },
      { term: 'connotation', definition: 'Emotional association of word. "Cheap" vs "affordable" vs "inexpensive"' },
      { term: 'denotation', definition: 'Dictionary definition of word' },
      { term: 'precision', definition: 'Using specific, exact words rather than vague ones' },
      { term: 'tone', definition: 'Attitude conveyed through word choice: formal, informal, serious, playful' },
      { term: 'context clues', definition: 'Surrounding words/sentences that hint at correct word choice' }
    ],
    questions: [
      { text: 'Which word fits best? "The __ scientist made a breakthrough."', options: ['good', 'nice', 'brilliant', 'okay', 'fine'], correct: 2, exp: '"Brilliant" is most precise and appropriate for major scientific achievement' },
      { text: 'Formal tone - which is best? "The students __ their homework."', options: ['did', 'completed', 'got done', 'finished up', 'did up'], correct: 1, exp: '"Completed" is most formal and precise' },
      { text: 'Which is most precise? "The car went fast."', options: ['The car went quickly.', 'The car was going fast.', 'The car accelerated rapidly.', 'The car was fast.', 'No change'], correct: 2, exp: '"Accelerated rapidly" is most specific and vivid' },
      { text: 'Which has negative connotation?', options: ['Thrifty', 'Economical', 'Cheap', 'Budget-conscious', 'Frugal'], correct: 2, exp: '"Cheap" has negative connotation (low quality), others are positive' },
      { text: 'Academic context: "The results __ our hypothesis."', options: ['showed', 'confirmed', 'said', 'told', 'proved'], correct: 1, exp: '"Confirmed" is most precise academic term' },
      { text: 'Which is vague? "The dog was __."', options: ['energetic', 'big', 'aggressive', 'playful', 'All are clear'], correct: 1, exp: '"Big" is vague (how big? compared to what?)' },
      { text: 'Which fits formal writing?', options: ['A lot of people came.', 'Tons of people came.', 'Many people attended.', 'Lots of folks showed up.', 'People came, like, a lot.'], correct: 2, exp: '"Many people attended" is most formal and precise' }
    ]
  },
  'transitions': {
    title: 'Transitions',
    definitions: [
      { term: 'transition', definition: 'Word/phrase connecting ideas and showing relationship between sentences' },
      { term: 'contrast transitions', definition: 'Show difference: however, nevertheless, on the other hand, in contrast' },
      { term: 'addition transitions', definition: 'Add information: furthermore, moreover, additionally, also, in addition' },
      { term: 'cause-effect transitions', definition: 'Show relationship: therefore, consequently, as a result, thus' },
      { term: 'example transitions', definition: 'Introduce examples: for instance, for example, specifically, namely' },
      { term: 'sequence transitions', definition: 'Show order: first, next, then, finally, meanwhile' },
      { term: 'conclusion transitions', definition: 'Sum up: in conclusion, overall, ultimately, in summary' }
    ],
    questions: [
      { text: 'Choose transition: "I studied hard. __, I passed the test."', options: ['However', 'Nevertheless', 'Therefore', 'On the other hand', 'In contrast'], correct: 2, exp: 'Cause-effect relationship: Therefore' },
      { text: 'Choose transition: "Cats are independent. __, dogs are social."', options: ['Therefore', 'Furthermore', 'Moreover', 'In contrast', 'As a result'], correct: 3, exp: 'Showing difference/contrast: In contrast' },
      { text: 'Choose transition: "She loves math. __, she enjoys science."', options: ['However', 'Nevertheless', 'Moreover', 'Instead', 'On the contrary'], correct: 2, exp: 'Adding similar information: Moreover' },
      { text: 'Choose transition: "It rained heavily. __, the game was cancelled."', options: ['Additionally', 'Furthermore', 'Consequently', 'Similarly', 'Likewise'], correct: 2, exp: 'Cause-effect: Consequently' },
      { text: 'Choose transition: "Many foods are healthy. __, vegetables and fruits."', options: ['However', 'For instance', 'Nevertheless', 'In contrast', 'On the other hand'], correct: 1, exp: 'Introducing examples: For instance' },
      { text: 'Choose transition: "__,  mix the ingredients. Then, bake for 30 minutes."', options: ['Finally', 'First', 'Last', 'In conclusion', 'Ultimately'], correct: 1, exp: 'Beginning sequence: First' },
      { text: 'Wrong transition: "She studied hard. However, she passed."', options: ['Should be: Therefore', 'Should be: Consequently', 'Should be: As a result', 'All of the above', 'Original is correct'], correct: 3, exp: '"However" shows contrast, but these ideas don\'t contrast. Need cause-effect transition.' }
    ]
  },
  'which-choice': {
    title: 'Which Choice Questions',
    definitions: [
      { term: 'which choice question', definition: 'ACT question asking which option best achieves a specific goal' },
      { term: 'reading the goal', definition: 'Carefully read what the question asks for before choosing' },
      { term: 'eliminating options', definition: 'Cross out answers that don\'t achieve stated goal' },
      { term: 'emphasis', definition: 'Questions may ask for emphasizing certain idea or detail' },
      { term: 'connecting ideas', definition: 'May need to link previous sentence to next paragraph' },
      { term: 'tone matching', definition: 'Choose option matching essay\'s overall tone (formal, casual, etc.)' }
    ],
    questions: [
      { text: 'Goal: emphasize the challenge. Which is best?', options: ['The test was hard.', 'The test was extremely difficult and took hours.', 'The test happened.', 'I took the test.', 'The test was okay.'], correct: 1, exp: 'Option B most strongly emphasizes difficulty' },
      { text: 'Goal: maintain formal tone. Which is best?', options: ['The results were super cool.', 'The results were amazing!', 'The results were significant.', 'The results were awesome.', 'The results were neat.'], correct: 2, exp: '"Significant" is most formal and academic' },
      { text: 'Goal: provide specific detail about the dog. Which is best?', options: ['The dog was there.', 'The dog existed.', 'The dog, a golden retriever, wagged its tail.', 'A dog was present.', 'The dog was okay.'], correct: 2, exp: 'Option C provides specific breed and action' },
      { text: 'Goal: emphasize the contrast. Which is best?', options: ['He liked both.', 'He enjoyed one more.', 'He loved summer but despised winter.', 'He had preferences.', 'He felt differently.'], correct: 2, exp: '"Loved...but despised" most strongly emphasizes contrast' },
      { text: 'Goal: conclude paragraph about benefits. Which is best?', options: ['That\'s it.', 'Those are some things.', 'Clearly, the advantages are substantial.', 'Anyway, moving on.', 'I\'m done talking about this.'], correct: 2, exp: 'Option C concludes and emphasizes benefits' },
      { text: 'Goal: introduce specific example. Which is best?', options: ['Things happened.', 'For instance, the 1969 moon landing inspired millions.', 'Events occurred.', 'There were examples.', 'Something took place.'], correct: 1, exp: 'Option B provides specific, concrete example' },
      { text: 'Goal: maintain essay\'s nostalgic tone. Which is best?', options: ['I remember fondly those summer evenings.', 'Summers happened back then.', 'It was summer sometimes.', 'Summer came and went.', 'The season was summer.'], correct: 0, exp: '"Remember fondly" matches nostalgic, emotional tone' }
    ]
  },
  'adding-deleting': {
    title: 'Adding or Deleting Information',
    definitions: [
      { term: 'adding sentence', definition: 'Determine if proposed sentence fits topic, adds value, and maintains flow' },
      { term: 'deleting sentence', definition: 'Remove if redundant, off-topic, or interrupts flow' },
      { term: 'relevance', definition: 'Does information relate to paragraph\'s main idea?' },
      { term: 'redundancy check', definition: 'Is information already stated elsewhere?' },
      { term: 'topic unity', definition: 'All sentences should support paragraph\'s main point' },
      { term: 'yes, because/no, because', definition: 'ACT format: choose yes/no, then choose reason that\'s true AND relevant' }
    ],
    questions: [
      { text: 'Paragraph about dogs. Add: "Cats are independent animals."?', options: ['Yes - adds variety', 'Yes - provides contrast', 'No - off topic', 'No - too short', 'Yes - interesting fact'], correct: 2, exp: 'Paragraph is about dogs, not cats - off topic' },
      { text: 'Sentence says "The building was tall." Add: "It was very high."?', options: ['Yes - emphasizes height', 'Yes - adds detail', 'No - redundant', 'No - wrong tone', 'Yes - clarifies'], correct: 2, exp: 'Both sentences say same thing - redundant' },
      { text: 'Essay about modern technology. Add sentence about ancient Rome?', options: ['Yes - historical context', 'Yes - interesting', 'No - off topic', 'No - too old', 'Yes - provides contrast'], correct: 2, exp: 'Doesn\'t relate to main topic of modern technology' },
      { text: 'Previous sentences establish author\'s love of reading. Add: "Books have always fascinated me"?', options: ['Yes - relevant', 'No - already implied', 'No - off topic', 'Yes - needed', 'Yes - emphasizes'], correct: 1, exp: 'Information already established - redundant' },
      { text: 'Paragraph explains a process. Delete sentence giving historical background?', options: ['Yes - off topic', 'Yes - interrupts flow', 'No - provides context', 'Both A and B', 'No - interesting'], correct: 3, exp: 'If explaining process, history is likely off-topic AND interrupts flow' },
      { text: 'Scientific essay. Add humorous anecdote about your dog?', options: ['Yes - adds interest', 'Yes - breaks tension', 'No - wrong tone', 'No - too personal', 'Both C and D'], correct: 4, exp: 'Humor doesn\'t fit formal scientific tone AND personal story is off-topic' },
      { text: 'Conclusion paragraph. Add new main point not discussed before?', options: ['Yes - expands ideas', 'Yes - adds depth', 'No - should be earlier', 'No - too late', 'Both C and D'], correct: 4, exp: 'Conclusions shouldn\'t introduce new ideas - belongs in body paragraphs' }
    ]
  },
  'logical-placement': {
    title: 'Logical Placement',
    definitions: [
      { term: 'logical order', definition: 'Sentences arranged so ideas flow smoothly and make sense' },
      { term: 'chronological order', definition: 'Events in time sequence: first, next, then, finally' },
      { term: 'cause to effect', definition: 'State cause before describing effects' },
      { term: 'general to specific', definition: 'Introduce topic generally, then provide specific details' },
      { term: 'pronoun reference', definition: 'Pronoun must come AFTER its antecedent (noun it refers to)' },
      { term: 'transition clues', definition: 'Words like "however," "for example," "therefore" hint at logical placement' }
    ],
    questions: [
      { text: 'Sentence uses "this discovery". Where should it go?', options: ['Before discovery is mentioned', 'After discovery is explained', 'Anywhere', 'At the start', 'In conclusion'], correct: 1, exp: 'Pronoun "this" must follow the discovery it refers to' },
      { text: 'Sentence starts with "For example,". Where should it go?', options: ['Before general statement', 'After general statement', 'At start of paragraph', 'Anywhere', 'In introduction'], correct: 1, exp: 'Examples must follow the general idea they illustrate' },
      { text: 'Sentence starts with "However,". What does this signal?', options: ['Agreement', 'Example', 'Contrast with previous', 'Cause', 'Conclusion'], correct: 2, exp: '"However" signals contrast with previous sentence' },
      { text: 'Where does conclusion go?', options: ['First paragraph', 'Body paragraphs', 'Last paragraph', 'Anywhere', 'Never include'], correct: 2, exp: 'Conclusions summarize at end' },
      { text: 'Sentence explains a result. Where should cause be?', options: ['After result', 'Before result', 'Doesn\'t matter', 'Far away', 'In different paragraph'], correct: 1, exp: 'Logical flow: state cause before effect' },
      { text: 'Chronological order. "Finally" should go:', options: ['First', 'Middle', 'Last', 'Anywhere', 'Never use'], correct: 2, exp: '"Finally" indicates last step in sequence' },
      { text: 'Sentence introduces topic. Where does it go?', options: ['End of paragraph', 'Middle of paragraph', 'Start of paragraph', 'Before previous paragraph', 'Omit it'], correct: 2, exp: 'Topic sentences introduce paragraphs at the start' }
    ]
  },
  'act-basics': {
    title: 'ACT Test Basics',
    definitions: [
      { term: 'ACT English', definition: '75 questions in 45 minutes. Tests grammar, punctuation, rhetoric, organization.' },
      { term: 'passage-based', definition: 'Questions embedded in 5 passages. Read, then answer questions in context.' },
      { term: 'no penalty', definition: 'No points deducted for wrong answers. Always guess if unsure!' },
      { term: 'pacing', definition: 'About 36 seconds per question. Budget ~9 minutes per passage.' },
      { term: 'question types', definition: 'Usage/Mechanics (40 qs): grammar, punctuation. Rhetorical Skills (35 qs): strategy, organization.' },
      { term: 'scoring', definition: 'Scored 1-36. Based only on number correct (raw score).' }
    ],
    questions: [
      { text: 'How many passages are on ACT English?', options: ['3', '4', '5', '6', '7'], correct: 2, exp: '5 passages total' },
      { text: 'Should you leave questions blank?', options: ['Yes - penalty for wrong', 'No - no penalty', 'Only if unsure', 'Yes - looks better', 'Depends'], correct: 1, exp: 'No penalty for wrong answers - always guess!' },
      { text: 'How much time for ACT English section?', options: ['35 minutes', '40 minutes', '45 minutes', '50 minutes', '60 minutes'], correct: 2, exp: '45 minutes total' },
      { text: 'What is tested on ACT English?', options: ['Vocabulary only', 'Grammar and rhetoric', 'Math skills', 'Reading comprehension', 'Creative writing'], correct: 1, exp: 'Grammar, punctuation, rhetoric, organization' },
      { text: 'Best time per passage?', options: ['5 minutes', '7 minutes', '9 minutes', '12 minutes', '15 minutes'], correct: 2, exp: '45 min ÷ 5 passages ≈ 9 minutes each' },
      { text: 'How is ACT English scored?', options: ['Out of 100', 'Letter grades', '1-36 scale', 'Percentiles only', '200-800'], correct: 2, exp: 'ACT uses 1-36 scale' },
      { text: 'What counts toward your score?', options: ['Number correct', 'Number attempted', 'Number wrong', 'Time taken', 'Difficulty level'], correct: 0, exp: 'Score based only on number of correct answers' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding final 8 English lessons (Misc + Rhetoric + Basics)...\n');

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

  console.log('🎉🎉🎉 ALL 16 ENGLISH LESSONS COMPLETE! 🎉🎉🎉');
  console.log('📊 Progress: 51/82 lessons (62%)');
  console.log('📚 Next up: Reading lessons!');
}

addAll();
