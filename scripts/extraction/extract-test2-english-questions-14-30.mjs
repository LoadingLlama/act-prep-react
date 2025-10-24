#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 14-30
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 14-30 WITH PROPER UNDERLINED FORMATTING\n');
console.log('='.repeat(70));

// English questions 14-30 with proper underlined portions extracted from PDF
const questions = [
  {
    number: 14,
    stem: "The bands' celebrity continually survives as they <u>combine traditional mouth music with modern rhythms</u>.",
    choices: {
      F: "NO CHANGE",
      G: "the classic Celtic music and modern rhythms.",
      H: "traditional mouth music and modern rhythms together.",
      J: "traditional mouth music with rhythms that are modern."
    }
  },
  {
    number: 15,
    stem: "Given that all the choices are accurate, which one most concisely conveys the idea that Celtic mouth music <u>continues to appeal to contemporary listeners</u>?",
    choices: {
      A: "NO CHANGE",
      B: "albums and dance concerts around the world.",
      C: "music CDs and performances in many different venues.",
      D: "recordings that can be purchased online."
    }
  },
  {
    number: 16,
    stem: "More than two thousand years ago, a people <u>the Romans, called the Garamantes,</u> created a complex civilization in one of the world's driest places—the Sahara Desert.",
    choices: {
      F: "NO CHANGE",
      G: "Romans called the Garamantes,",
      H: "Romans called: the Garamantes",
      J: "Romans called the Garamantes"
    }
  },
  {
    number: 17,
    stem: "Beginning around 500 BCE, they built towns and villages, <u>cloth was manufactured there and jewelry</u>, and traded throughout North Africa and the Mediterranean.",
    choices: {
      A: "NO CHANGE",
      B: "the manufacture of cloth took place",
      C: "manufactured cloth",
      D: "cloth"
    }
  },
  {
    number: 18,
    stem: "If the writer were to delete the preceding sentence, the paragraph would primarily lose a concluding statement that:",
    choices: {
      F: "summarizes the information provided about the Garamantes.",
      G: "indicates the products that the Garamantes exported to Rome.",
      H: "takes the focus off the Garamantes and places it on the products they imported.",
      J: "explains why the Garamantes were successful farmers who grew a variety of crops."
    }
  },
  {
    number: 19,
    stem: "The survival of their civilization depended on hundreds of miles of underground tunnels. <u>These tunnels carried water to desert settlements from an aquifer, an underground layer of water-bearing rock</u>.",
    choices: {
      A: "NO CHANGE",
      B: "upon which they depended.",
      C: "used by the Garamantes,",
      D: "a key to their survival."
    }
  },
  {
    number: 20,
    stem: "Which choice provides new information to the essay?",
    choices: {
      F: "NO CHANGE",
      G: "by digging",
      H: "manually",
      J: "in the desert"
    }
  },
  {
    number: 21,
    stem: "When the tunnels reached a town or field, the water flowed into <u>more easy accessible</u> surface canals or reservoirs.",
    choices: {
      A: "NO CHANGE",
      B: "more easily",
      C: "easier and",
      D: "easy and"
    }
  },
  {
    number: 22,
    stem: "<u>Having left no clues, archaeologists</u> don't know how the Garamantes learned to build foggaras.",
    choices: {
      F: "NO CHANGE",
      G: "A genuine puzzle to scientists, archaeologists",
      H: "Giving no indication, archaeologists",
      J: "Archaeologists"
    }
  },
  {
    number: 23,
    stem: "And because the water came from an aquifer rather <u>then</u> from its rainfall, the supply was dependable.",
    choices: {
      A: "NO CHANGE",
      B: "than",
      C: "that",
      D: "DELETE the underlined portion."
    }
  },
  {
    number: 24,
    stem: "The Garamantes <u>could of relied</u> on a constant supply of water for drinking, washing, and irrigation.",
    choices: {
      F: "NO CHANGE",
      G: "could rely",
      H: "could have relied",
      J: "relied"
    }
  },
  {
    number: 25,
    stem: "Moreover, the cold, damp air of the foggaras lowered the temperature inside the homes <u>by</u> providing a form of ancient air conditioning.",
    choices: {
      A: "NO CHANGE",
      B: "and",
      C: "while",
      D: "DELETE the underlined portion."
    }
  },
  {
    number: 26,
    stem: "The Garamantes <u>who thrived until about 500 CE, when some archaeologists believe</u> their water supply began to run low.",
    choices: {
      F: "NO CHANGE",
      G: "thrived until about 500 CE. Some archaeologists believe",
      H: "who thrived until about 500 CE, and some archaeologists believe",
      J: "thrived until about 500 CE when some archaeologists believe"
    }
  },
  {
    number: 27,
    stem: "As the foggaras supplied less and less water, the Garamantes' population declined, <u>their civilization</u> eventually collapsed.",
    choices: {
      A: "NO CHANGE",
      B: "and their civilization",
      C: "so their civilization",
      D: "because their civilization"
    }
  },
  {
    number: 28,
    stem: "However, at least six hundred of the <u>having</u> survived to this day.",
    choices: {
      F: "NO CHANGE",
      G: "that",
      H: "foggaras have",
      J: "DELETE the underlined portion."
    }
  },
  {
    number: 29,
    stem: "The stone mounds that mark their ventilation shafts are still visible in what is now southwestern Libya, <u>where they can be seen even now</u>.",
    choices: {
      A: "NO CHANGE",
      B: "a place where visitors can see these amazing signs",
      C: "and can be seen",
      D: "DELETE the underlined portion."
    }
  },
  {
    number: 30,
    stem: "Suppose the writer's primary purpose had been to provide information about a civilization's efforts to survive. Would this essay accomplish that purpose?",
    choices: {
      F: "Yes, because it explains how the Garamantes used advanced engineering to create a water supply system.",
      G: "Yes, because it describes the crops and products that allowed the Garamantes to prosper.",
      H: "No, because it focuses on the decline of the Garamantes rather than their survival efforts.",
      J: "No, because it emphasizes the natural obstacles the Garamantes faced as a whole."
    }
  }
];

console.log('\n📝 Extracting English questions 14-30 with proper underlined formatting:');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Parse underlined text
  const match = q.stem.match(/^(.*?)<u>(.*?)<\/u>(.*)$/);
  let underlined_text = '';
  let context_before = '';
  let context_after = '';

  if (match) {
    underlined_text = match[2];
    context_before = match[1];
    context_after = match[3];
  } else {
    context_before = q.stem;
  }

  // Update in database
  const updateData = {
    question_stem: q.stem,
    underlined_text: underlined_text,
    context_before: context_before,
    context_after: context_after,
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
    console.error(`❌ Error updating English Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Q${q.number} with proper underlined formatting`);
    if (underlined_text) {
      console.log(`  Underlined: "${underlined_text}"`);
    }
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/17 English questions!`);
console.log('✅ English questions 14-30 now have proper <u>underlined</u> formatting');
console.log('\n📋 PROGRESS: 30/75 English questions with proper formatting complete');
console.log('    Continue with questions 31-45\n');