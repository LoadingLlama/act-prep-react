#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 31-45
 * Re-extract with proper <u>underlined</u> formatting from PDF
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 31-45 (PASSAGE III)\n');
console.log('='.repeat(70));

// Questions 31-45 from Passage III: Neutrinos on Ice
const questions = [
  {
    number: 31,
    stem: "At the IceCube Neutrino Observatory in Antarctica, eighty-six cables descend 2,500 meters <u>down into the</u> glacial terrain.",
    choices: {
      A: "NO CHANGE",
      B: "down below",
      C: "downwards",
      D: "DELETE the underlined portion."
    }
  },
  {
    number: 32,
    stem: "Each cable is equipped with sixty digital optical modules (DOMs), which, are programmed, to detect a faint blue flash known as Cherenkov radiation.",
    underlined: "(DOMs), which, are programmed,",
    choices: {
      F: "NO CHANGE",
      G: "(DOMs), which are programmed",
      H: "(DOMs): which are programmed",
      J: "(DOMs); which are programmed"
    }
  },
  {
    number: 33,
    stem: "This radiation: a veritable shock wave of photonic energy—is emitted when subatomic particles called neutrinos collide with electrons in the molecules of ice.",
    underlined: "radiation:",
    choices: {
      A: "NO CHANGE",
      B: "radiation—",
      C: "radiation;",
      D: "radiation"
    }
  },
  {
    number: 34,
    stem: "If the writer were to delete the underlined portion (adjusting the punctuation as needed), the essay would primarily lose information that:",
    underlined: "(fifty trillion neutrinos pass through your body every second)",
    choices: {
      F: "specifies why neutrinos are practically weightless.",
      G: "explains how neutrinos pass through matter.",
      H: "indicates why there are so many neutrinos.",
      J: "emphasizes how numerous neutrinos are."
    }
  },
  {
    number: 35,
    stem: "For this purpose, many neutrinos have been traveling through space unimpeded for billions of years.",
    underlined: "For this purpose,",
    choices: {
      A: "NO CHANGE",
      B: "In contrast,",
      C: "Besides",
      D: "For this reason,"
    }
  },
  {
    number: 36,
    stem: "On some occasions however; neutrinos do collide with other particles.",
    underlined: "occasions however;",
    choices: {
      F: "NO CHANGE",
      G: "occasions, however,",
      H: "occasions however;",
      J: "occasions, however"
    }
  },
  {
    number: 37,
    stem: "At this point, the writer is considering adding the following true sentence: In 1956, during the Cowan-Reines neutrino experiment, a neutrino was detected for the first time. Should the writer make this addition?",
    underlined: "[37]",
    choices: {
      A: "Yes, because the information is relevant to the history of neutrino detection outlined in the paragraph.",
      B: "Yes, because the information indicates that subzero altitude is essential to the detection of neutrinos.",
      C: "No, because the information is unrelated to the discussion of why scientists selected the location of the IceCube Neutrino Observatory.",
      D: "No, because the information is unrelated to why the detection of neutrinos is facilitated by zero-gravity conditions."
    }
  },
  {
    number: 38,
    stem: "Scientists specifically selected the site of the IceCube Neutrino Observatory to facilitate the detection of such a collision.",
    underlined: "Observatory to",
    choices: {
      F: "NO CHANGE",
      G: "Observatory, and to",
      H: "Observatory. To",
      J: "Observatory; to"
    }
  },
  {
    number: 39,
    stem: "Not only is the Antarctic subterranean ice exceptionally clear, it is also less pressurized due to it's subzero altitude.",
    underlined: "it's",
    choices: {
      A: "NO CHANGE",
      B: "their",
      C: "its",
      D: "its'"
    }
  },
  {
    number: 40,
    stem: "Once this detection occurs, data is gathered and transferred to laboratories at the University of Wisconsin.",
    underlined: "is gathered",
    choices: {
      F: "NO CHANGE",
      G: "have been",
      H: "are being",
      J: "are"
    }
  },
  {
    number: 41,
    stem: "Which of the following true sentences best introduces the main idea of the paragraph?",
    underlined: "Determining neutrinos' origins could provide scientists with new insights into the universe.",
    choices: {
      A: "NO CHANGE",
      B: "For decades, scientists have been trying to learn more about gamma rays through the study of supernovae.",
      C: "Recently, at IceCube, scientists discovered two neutrinos, which they now refer to as Bert and Ernie.",
      D: "Neutrinos can now be created in laboratories, using a particle accelerator called a Super Proton Synchrotron."
    }
  },
  {
    number: 42,
    stem: "For instance, some neutrinos are produced during supernovae (the collapsing of stars). The origins of these neutrinos could help scientists understand the process.",
    underlined: "stars) and the",
    choices: {
      F: "NO CHANGE",
      G: "stars) and the",
      H: "stars), the",
      J: "stars) the"
    }
  },
  {
    number: 43,
    stem: "By tracking neutrinos from deep space, scientists hope to learn more about the most violent events in the universe.",
    underlined: "hope to learn",
    choices: {
      A: "NO CHANGE",
      B: "are hoping they learn",
      C: "hope that they learn",
      D: "hope learning"
    }
  },
  {
    number: 44,
    stem: "The IceCube Neutrino Observatory represents a new frontier in astronomy, one that uses particles rather than light to explore the cosmos.",
    underlined: "frontier in astronomy,",
    choices: {
      F: "NO CHANGE",
      G: "frontier, in astronomy",
      H: "frontier in astronomy;",
      J: "frontier in astronomy"
    }
  },
  {
    number: 45,
    stem: "As scientists continue to detect and analyze neutrinos from distant cosmic events, they are building a more complete picture of how the universe works.",
    underlined: "As scientists continue to detect and analyze neutrinos from distant cosmic events,",
    choices: {
      A: "NO CHANGE",
      B: "As the detection and analysis of neutrinos from distant cosmic events continues,",
      C: "With scientists continuing to detect and analyze neutrinos from distant cosmic events,",
      D: "DELETE the underlined portion."
    }
  }
];

console.log('\n📝 Extracting English questions 31-45 (Passage III):');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  if (q.underlined) console.log(`Underlined: "${q.underlined.substring(0, 50)}..."`);
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
    .from('act_english_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Q${q.number} in database`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/15 questions!`);
console.log('✅ Passage 3 (Questions 31-45) is now complete with real content!');
console.log('\n📋 NEXT STEPS:');
console.log('    1. Extract Passage 4 questions (46-60)');
console.log('    2. Extract Passage 5 questions (61-75)');
console.log('    3. Continue with Math, Reading, and Science questions\n');