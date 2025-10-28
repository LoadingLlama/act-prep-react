#!/usr/bin/env node

/**
 * EXTRACT TEST 4 ENGLISH PASSAGE 1 - QUESTIONS 1-15
 * "Dragon and Snow" passage
 * Manual extraction from Practice ACT 4 TXT file
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 4;
const PASSAGE_NUMBER = 1;

// Load answer keys
const answerKeysPath = join(__dirname, '../../data/test4-answer-keys.json');
const answerKeys = JSON.parse(fs.readFileSync(answerKeysPath, 'utf8'));

console.log('📝 EXTRACTING TEST 4 ENGLISH PASSAGE 1 - QUESTIONS 1-15\n');
console.log('Passage: "Dragon and Snow"');
console.log('='.repeat(80));

// PASSAGE 1: "Dragon and Snow"
const PASSAGE_TEXT = `Dragon and Snow

Yueming zipped up her warmest coat for the walk home from school and pushed through the double doors. No new snow had fallen since the weekend, when back-to-back snowy blizzards had turned Philadelphia into a place she did not recognize, the view out her apartment window at the time more amazing with each passing hour.

The New Year's festivities, fifteen days of it, were half over and still her family had not arrived from China, delayed by the storms. The cold air snapped Yueming out of an afternoon daze. At the corner of Tenth and Winter, someone had cleared the snow in front of the mural, one of the several that were part of Yueming's daily commute. This one The History of Chinatown, looked especially bright today, the sun's reflection off the snow, working some magic with the colors.

There, in paint, Chinese immigrants worked their jobs, one bent over a clothes iron, others caught up in railroad construction, and a giant figure on the horizon, his gaze locked on the passerby. In the lower left-hand corner, a child no bigger than Wei tugged at a kite in a schoolyard. As many times as she had seen them, these figures still caught Yueming off guard, incongruous as they were—motionless—with the rush of Philadelphia's urban city traffic heading for the Vine Street Expressway.

Mother and Wei would come tomorrow after this visit, their next one would be for Yueming's graduation. [A] Having to tell them soon, tomorrow, over her decision to stay, that she would not be coming home to China. [B] She would remain instead in this world, familiar and new. [C] Suddenly, laughter turned the corner in her direction. It belonged to a small group of young men, each carrying a piece of a giant dragon. [D] She would see the toothy, quaking creature in all it's festive entirety the following evening with her family. But now, Yueming hesitated under the arch that opened into Chinatown. As the traffic light changed and changed again, she watched the distance grow between herself and the undone dragon, color bobbing on a cityscape of snow.`;

// QUESTIONS 1-15
const questions = [
  {
    question_number: 1,
    question_stem: "No new snow had fallen since the weekend, when back-to-back <u>snowy blizzards</u> had turned Philadelphia into a place she did not recognize.",
    underlined_text: "snowy blizzards",
    context_before: "No new snow had fallen since the weekend, when back-to-back ",
    context_after: " had turned Philadelphia into a place she did not recognize.",
    choice_a: "NO CHANGE",
    choice_b: "blizzards of snowfall",
    choice_c: "blizzards of snow",
    choice_d: "blizzards",
    correct_answer: answerKeys.english[1]
  },
  {
    question_number: 2,
    question_stem: "The New Year's festivities, fifteen days of it, were half over",
    underlined_portion: "it",
    choice_a: "NO CHANGE",
    choice_b: "such,",
    choice_c: "them,",
    choice_d: "this,",
    correct_answer: answerKeys.english[2]
  },
  {
    question_number: 3,
    question_stem: "Which choice best suggests that the effect of the cold air on Yueming was immediate?",
    underlined_portion: "snapped",
    choice_a: "NO CHANGE",
    choice_b: "pulled",
    choice_c: "lured",
    choice_d: "drew",
    correct_answer: answerKeys.english[3]
  },
  {
    question_number: 4,
    question_stem: "At the corner of Tenth and Winter, someone had cleared the snow in front of the mural, one of the several that were part of Yueming's daily commute. This one The History of Chinatown,",
    underlined_portion: "one The History of Chinatown,",
    choice_a: "NO CHANGE",
    choice_b: "one: The History of Chinatown,",
    choice_c: "one, The History of Chinatown,",
    choice_d: "one The History of Chinatown",
    correct_answer: answerKeys.english[4]
  },
  {
    question_number: 5,
    question_stem: "looked especially bright today, the sun's reflection off the snow, working some magic with the colors.",
    underlined_portion: "snow, working",
    choice_a: "NO CHANGE",
    choice_b: "snow was working,",
    choice_c: "snow working,",
    choice_d: "snow working",
    correct_answer: answerKeys.english[5]
  },
  {
    question_number: 6,
    question_stem: "Which choice indicates there is another, specific type of work depicted in the mural?",
    underlined_portion: "others caught up in railroad construction, and",
    choice_a: "NO CHANGE",
    choice_b: "gripping it with an enormous hand,",
    choice_c: "in the center of the image,",
    choice_d: "others hard at work,",
    correct_answer: answerKeys.english[6]
  },
  {
    question_number: 7,
    question_stem: "As many times as she had seen them, these figures still caught Yueming off guard, incongruous as they were—motionless—with the rush",
    underlined_portion: "off guard, incongruous as",
    choice_a: "NO CHANGE",
    choice_b: "off guard, incongruous,",
    choice_c: "off guard incongruous,",
    choice_d: "off guard incongruous",
    correct_answer: answerKeys.english[7]
  },
  {
    question_number: 8,
    question_stem: "of Philadelphia's urban city traffic heading for the Vine Street Expressway.",
    underlined_portion: "Philadelphia's urban city traffic",
    choice_a: "NO CHANGE",
    choice_b: "the city of Philadelphia's urban",
    choice_c: "in-town vehicular car",
    choice_d: "DELETE the underlined portion.",
    correct_answer: answerKeys.english[8]
  },
  {
    question_number: 9,
    question_stem: "Mother and Wei would come tomorrow after this visit, their next one would be for Yueming's graduation.",
    underlined_portion: "tomorrow after this visit, their",
    choice_a: "NO CHANGE",
    choice_b: "tomorrow. After this visit, their",
    choice_c: "tomorrow, after this visit, their",
    choice_d: "tomorrow. Their",
    correct_answer: answerKeys.english[9]
  },
  {
    question_number: 10,
    question_stem: "[A] Having to tell them soon, tomorrow, over her decision to stay,",
    underlined_portion: "Having to",
    choice_a: "NO CHANGE",
    choice_b: "Yueming had to",
    choice_c: "Her having to",
    choice_d: "To",
    correct_answer: answerKeys.english[10]
  },
  {
    question_number: 11,
    question_stem: "She would remain instead in this world, familiar and new.",
    underlined_portion: "in",
    choice_a: "NO CHANGE",
    choice_b: "with",
    choice_c: "of",
    choice_d: "DELETE the underlined portion.",
    correct_answer: answerKeys.english[11]
  },
  {
    question_number: 12,
    question_stem: "Which choice connects Yueming in a figurative way to the mural described in the essay?",
    underlined_portion: "(varies based on choice)",
    choice_a: "NO CHANGE",
    choice_b: "paint herself instead into",
    choice_c: "not leave",
    choice_d: "take",
    correct_answer: answerKeys.english[12]
  },
  {
    question_number: 13,
    question_stem: "Suddenly, laughter turned the corner in her direction. It belonged to a small group of young men,",
    underlined_portion: "direction. It belonged",
    choice_a: "NO CHANGE",
    choice_b: "direction, which belonged",
    choice_c: "direction that belonged",
    choice_d: "direction belonging",
    correct_answer: answerKeys.english[13]
  },
  {
    question_number: 14,
    question_stem: "She would see the toothy, quaking creature in all it's festive entirety",
    underlined_portion: "it's",
    choice_a: "NO CHANGE",
    choice_b: "its'",
    choice_c: "its",
    choice_d: "DELETE the underlined portion.",
    correct_answer: answerKeys.english[14]
  },
  {
    question_number: 15,
    question_stem: "The writer wants to divide this paragraph into two in order to separate the statement indicating Yueming's plans for herself from the details about her immediate surroundings. The best place to begin the new paragraph would be at:",
    underlined_portion: "(paragraph division question)",
    choice_a: "Point A.",
    choice_b: "Point B.",
    choice_c: "Point C.",
    choice_d: "Point D.",
    correct_answer: answerKeys.english[15]
  }
];

console.log('\n📝 Uploading English Passage 1...');

// Upload passage first
const passageData = {
  test_number: TEST_NUMBER,
  passage_number: PASSAGE_NUMBER,
  title: "Dragon and Snow",
  passage_text: PASSAGE_TEXT
};

const { error: passageError } = await supabase
  .from('act_english_passages')
  .upsert(passageData, { onConflict: 'test_number,passage_number' });

if (passageError) {
  console.error('❌ Error uploading passage:', passageError);
} else {
  console.log(`✅ Uploaded Passage ${PASSAGE_NUMBER}: "Dragon and Snow"`);
}

// Upload questions
console.log('\n📝 Uploading questions 1-15...\n');

let successCount = 0;
const errors = [];

for (const q of questions) {
  const questionData = {
    test_number: TEST_NUMBER,
    question_number: q.question_number,
    passage_number: PASSAGE_NUMBER,
    question_stem: q.question_stem,
    underlined_portion: q.underlined_portion,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    correct_answer: q.correct_answer
  };

  const { error } = await supabase
    .from('act_english_questions')
    .upsert(questionData, { onConflict: 'test_number,question_number' });

  if (error) {
    errors.push(`Q${q.question_number}: ${error.message}`);
    console.error(`❌ Q${q.question_number}: ${error.message}`);
  } else {
    successCount++;
    console.log(`✅ Q${q.question_number}: "${q.question_stem.substring(0, 60)}..." → ${q.correct_answer}`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('📊 EXTRACTION SUMMARY:');
console.log(`✅ Successfully uploaded: ${successCount}/15 questions`);
console.log(`✅ Passage uploaded: "Dragon and Snow"`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(err => console.log(`   ${err}`));
}
console.log('='.repeat(80));
