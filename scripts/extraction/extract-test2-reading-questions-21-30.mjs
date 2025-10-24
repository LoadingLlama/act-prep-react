#!/usr/bin/env node

/**
 * EXTRACT TEST 2 READING QUESTIONS 21-30
 * Extract questions from Humanities passage about dubbing
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 EXTRACTING TEST 2 READING QUESTIONS 21-30 (HUMANITIES)\n');
console.log('='.repeat(70));

// Reading questions 21-30 from Humanities passage about dubbing
const questions = [
  {
    number: 21,
    stem: "The last sentence of the passage primarily serves to illustrate the passage author's central claim that:",
    choices: {
      A: "a dubber wants others in the film industry to respect the actor he or she usually dubs.",
      B: "the work of Ryan's dubber is as effective as that of Jackson's dubber.",
      C: "a dubber begins to seem almost like a hybrid of him- or herself and the actor he or she dubs.",
      D: "Ward is unlike most dubbers in that he prefers to dub many different actors."
    }
  },
  {
    number: 22,
    stem: "It can reasonably be inferred from the passage that regarding whether dubbing is useful or valuable, Vairano would most strongly sympathize with the views of:",
    choices: {
      F: "Antonioni.",
      G: "Fellini.",
      H: "Pasolini.",
      J: "Renoir."
    }
  },
  {
    number: 23,
    stem: "The main function of the second paragraph (lines 18-33) is for the passage author to present:",
    choices: {
      A: "her own ideas as an example of a contemporary perspective on the merits of dubbing.",
      B: "a perspective on dubbing that bluntly contradicts those outlined in the first paragraph.",
      C: "Fellini's personal, direct response to Renoir's criticism.",
      D: "a claim, centered on Fellini's work, that strengthens the argument she makes in the first paragraph."
    }
  },
  {
    number: 24,
    stem: "The anecdote about Fellini's footage of a woman recounting a tragic tale (lines 25-33) primarily serves to:",
    choices: {
      F: "explain why Fellini preferred to feature voices with northern accents in his films.",
      G: "provide a famous example of Fellini closely following scripted dialogue.",
      H: "illustrate the extent to which dubbing was a part of Fellini's craft.",
      J: "show why Fellini preferred his actors to follow a script rather than tell their own stories."
    }
  },
  {
    number: 25,
    stem: "As Cortesi is presented in the passage, does he agree with the passage author's assumptions about the reason for dubbers' \"over-the-top zest\" (line 34)?",
    choices: {
      A: "Yes, and he thinks that she should visit his dubbing studio to see how he works.",
      B: "Yes, and he suggests that the reason is the dubber's condition of being heard but not seen.",
      C: "No, and he gruffly makes clear his belief that she does not at all understand a dubber's work.",
      D: "No, and he corrects her misinterpretation with an explanation of his own."
    }
  },
  {
    number: 26,
    stem: "It can most reasonably be inferred from the passage that the Metropolitan cinema on Via del Corso was known for showing films that had been:",
    choices: {
      F: "dubbed only.",
      G: "subtitled only.",
      H: "both dubbed and subtitled.",
      J: "neither dubbed nor subtitled."
    }
  },
  {
    number: 27,
    stem: "The passage most strongly suggests that at movie houses in Italy today, compared to subtitled, original-language films, dubbed films can be found:",
    choices: {
      A: "much more easily.",
      B: "about as easily.",
      C: "slightly less easily.",
      D: "much less easily."
    }
  },
  {
    number: 28,
    stem: "The passage indicates that a foreign film with which of the following characteristics is particularly difficult to dub?",
    choices: {
      F: "Linguistic misunderstanding that creates comedy",
      G: "Action that advances plot",
      H: "Reverse chronology that provides context",
      J: "Extensive monologues that further characterization"
    }
  },
  {
    number: 29,
    stem: "According to the passage, the work of dubbing director Vairano differs from that of most other Italian directors in that Vairano:",
    choices: {
      A: "focuses on dubbing French films into Italian.",
      B: "does not necessarily match the same Italian dubber to the same foreign actor for all his films.",
      C: "works mostly with \"prima donna\" dubbers.",
      D: "does not believe that dialogue should be rewritten during a dubbing session."
    }
  },
  {
    number: 30,
    stem: "As it is used in lines 16-17, the phrase \"a challenge to\" most nearly means:",
    choices: {
      F: "an assault on.",
      G: "a declaration of.",
      H: "a question for.",
      J: "an offer to."
    }
  }
];

console.log('\n📝 Extracting Reading questions 21-30 (Humanities):');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Update in database
  const updateData = {
    question_stem: q.stem,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J
  };

  const { error } = await supabase
    .from('act_reading_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating Reading Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Reading Q${q.number} in database`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/10 Reading questions!`);
console.log('✅ Reading questions 21-30 (Humanities) now have real content!');
console.log('\n📋 PROGRESS: 30/40 Reading questions complete');
console.log('    Continue with Natural Science passage (questions 31-40)\n');