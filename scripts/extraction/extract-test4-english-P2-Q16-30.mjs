#!/usr/bin/env node

/**
 * EXTRACT TEST 4 ENGLISH PASSAGE 2 - QUESTIONS 16-30
 * "Aquatic Explorer AQUA2" passage
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
const PASSAGE_NUMBER = 2;

const answerKeysPath = join(__dirname, '../../data/test4-answer-keys.json');
const answerKeys = JSON.parse(fs.readFileSync(answerKeysPath, 'utf8'));

console.log('📝 EXTRACTING TEST 4 ENGLISH PASSAGE 2 - QUESTIONS 16-30\n');
console.log('Passage: "Aquatic Explorer AQUA2"');
console.log('='.repeat(80));

const PASSAGE_TEXT = `Aquatic Explorer AQUA2

[1]
Marine dives offer scientists invaluable chances to study sea life firsthand. Yet the limited time divers may remain underwater—often no more than two hours—has led scientists to call for robots able to help conduct observations in an assistive capacity. Complex functions like detecting chemicals and mapping topography, and these have already been implemented in robots with wide success. The bigger challenge is teaching a robot to swim.

[2]
Powerful thrusters have helped some robots surge through the depths. Such equipment, however can alarm or even harm sea life. The engineers developing the robot AQUA2 imagined a robot able to use advanced imaging and electromechanical systems. To do so, it would need to swim as naturally as a fish, a squid, or—as it turned out—a turtle.

[3]
AQUA2 has also proved remarkably well adapted to land. Its flippers reverse direction in shallow water, pushing the robot up onto sturdy, arched legs. The legs propel the robot out of the surf. Rubber treads on each leg allow AQUA2 to scale sand dunes or snowbanks, making the robot as suitable for studies in the Caribbean as well as those in the Arctic.

[4]
Like its biological counterpart, AQUA2 has flippers that allow it to glide through the water, dive to the ocean floor, and ascend from the bottom. Unlike thruster-powered robots, AQUA2 can make subtle changes in course simply by altering the positions of its flippers. By holding two flippers still, as it gently paddles, with the other four, for example, the robot can "hover" in place underwater. This exquisite competency will allow it to avoid disturbing the sea life it is designed to observe.

[5]
Now, AQUA2 faces a new challenge; even more tricky than reacting to different terrains is interacting with human divers. During field tests amid busy coral reefs in Barbados and the silty beds of lakes in Canada, AQUA2 practices following divers' instructions. Soon, scientists may be able to conduct more frequent, more efficient dives with robotic partners at their sides.`;

const questions = [
  {
    question_number: 16,
    question_stem: "If the writer were to delete the words \"invaluable\" and \"firsthand\" from the preceding sentence, the sentence would primarily lose:",
    underlined_text: "invaluable chances to study sea life firsthand",
    context_before: "Marine dives offer scientists ",
    context_after: ".",
    choice_a: "a description of the kinds of sea life that are sought out by scientists on marine dives.",
    choice_b: "a tone of appreciation for the difficulties scientists often encounter during a marine dive.",
    choice_c: "an indication of one benefit of marine dives and how significant it is to scientists.",
    choice_d: "a suggestion that most marine dives are conducted by scientists.",
    correct_answer: answerKeys.english[16],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 17,
    question_stem: "has led scientists to call for robots able",
    underlined_text: "has led",
    context_before: "Yet the limited time divers may remain underwater—often no more than two hours—",
    context_after: " scientists to call for robots able",
    choice_a: "NO CHANGE",
    choice_b: "have lead",
    choice_c: "have led",
    choice_d: "has lead",
    correct_answer: answerKeys.english[17],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 18,
    question_stem: "to help conduct observations in an assistive capacity.",
    underlined_text: "in an assistive capacity",
    context_before: "to help conduct observations ",
    context_after: ".",
    choice_a: "NO CHANGE",
    choice_b: "as aides to scientists' underwater studies.",
    choice_c: "since divers' time underwater is limited.",
    choice_d: "DELETE the underlined portion and end the sentence with a period.",
    correct_answer: answerKeys.english[18],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 19,
    question_stem: "Complex functions like detecting chemicals and mapping topography, and these have already been implemented in robots with wide success.",
    underlined_text: "topography, and these",
    context_before: "Complex functions like detecting chemicals and mapping ",
    context_after: " have already been implemented in robots with wide success.",
    choice_a: "NO CHANGE",
    choice_b: "topography being functions that",
    choice_c: "topography, which",
    choice_d: "topography",
    correct_answer: answerKeys.english[19],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 20,
    question_stem: "Powerful thrusters have helped some robots surge through the depths.",
    underlined_text: "surge",
    context_before: "Powerful thrusters have helped some robots ",
    context_after: " through the depths.",
    choice_a: "NO CHANGE",
    choice_b: "cascade",
    choice_c: "flood",
    choice_d: "gush",
    correct_answer: answerKeys.english[20],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 21,
    question_stem: "Such equipment, however can alarm or even harm sea life.",
    underlined_text: "equipment, however",
    context_before: "Such ",
    context_after: " can alarm or even harm sea life.",
    choice_a: "NO CHANGE",
    choice_b: "equipment, however,",
    choice_c: "equipment however,",
    choice_d: "equipment however",
    correct_answer: answerKeys.english[21],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 22,
    question_stem: "Given that all the choices are accurate, which one provides the best transition between the preceding sentence and the next sentence?",
    underlined_text: "use advanced imaging and electromechanical systems",
    context_before: "The engineers developing the robot AQUA2 imagined a robot able to ",
    context_after: ". To do so, it would need to swim as naturally as a fish",
    choice_a: "NO CHANGE",
    choice_b: "operate equally smoothly in tethered or untethered modes.",
    choice_c: "perform in mere minutes tasks that take scientists hours.",
    choice_d: "move in harmony with the creatures it would study.",
    correct_answer: answerKeys.english[22],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 23,
    question_stem: "Its flippers reverse direction in shallow water, pushing the robot up onto sturdy, arched legs. The legs propel the robot out of the surf.",
    underlined_text: "legs propel the robot",
    context_before: "The ",
    context_after: " out of the surf.",
    choice_a: "NO CHANGE",
    choice_b: "by doing so, they push the robot",
    choice_c: "then, the robot is pushed",
    choice_d: "this pushes the robot",
    correct_answer: answerKeys.english[23],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 24,
    question_stem: "At this point, the writer is considering adding the following accurate information: rotate like windmill blades to\nShould the writer make this addition here?",
    underlined_text: "[Addition consideration]",
    context_before: "The legs ",
    context_after: "propel the robot out of the surf.",
    choice_a: "Yes, because it explains how the engineers came up with the design for the legs.",
    choice_b: "Yes, because it provides a description that helps clarify how the legs work.",
    choice_c: "No, because it introduces a comparison to windmills that is not developed in the rest of the essay.",
    choice_d: "No, because it blurs the paragraph's focus on the robot's ability to move from land to water.",
    correct_answer: answerKeys.english[24],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 25,
    question_stem: "making the robot as suitable for studies in the Caribbean as well as those in the Arctic.",
    underlined_text: "as well as",
    context_before: "making the robot as suitable for studies in the Caribbean ",
    context_after: " those in the Arctic.",
    choice_a: "NO CHANGE",
    choice_b: "as it is for",
    choice_c: "but also",
    choice_d: "or",
    correct_answer: answerKeys.english[25],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 26,
    question_stem: "Unlike thruster-powered robots, AQUA2 can make subtle changes in course simply by altering the positions of its flippers.",
    underlined_text: "subtle changes in course simply",
    context_before: "Unlike thruster-powered robots, AQUA2 can make ",
    context_after: " by altering the positions of its flippers.",
    choice_a: "NO CHANGE",
    choice_b: "a possibility exists for subtle changes in course to be made simply by AQUA2",
    choice_c: "subtle changes in course can be made by AQUA2 simply",
    choice_d: "subtle changes in course can be made simply by AQUA2",
    correct_answer: answerKeys.english[26],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 27,
    question_stem: "By holding two flippers still, as it gently paddles, with the other four, for example, the robot can \"hover\" in place underwater.",
    underlined_text: "still, as it gently paddles, with",
    context_before: "By holding two flippers ",
    context_after: " the other four, for example, the robot can \"hover\" in place underwater.",
    choice_a: "NO CHANGE",
    choice_b: "still, as it gently, paddles",
    choice_c: "still as it gently paddles,",
    choice_d: "still as it gently paddles",
    correct_answer: answerKeys.english[27],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 28,
    question_stem: "This exquisite competency will allow it to avoid disturbing the sea life it is designed to observe.",
    underlined_text: "exquisite competency",
    context_before: "This ",
    context_after: " will allow it to avoid disturbing the sea life it is designed to observe.",
    choice_a: "NO CHANGE",
    choice_b: "superhuman power",
    choice_c: "unique ability",
    choice_d: "weird trick",
    correct_answer: answerKeys.english[28],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 29,
    question_stem: "Which choice best maintains the word pattern of the previous example involving Barbados coral reefs?",
    underlined_text: "the silty beds of lakes in Canada",
    context_before: "During field tests amid busy coral reefs in Barbados and ",
    context_after: ", AQUA2 practices following divers' instructions.",
    choice_a: "NO CHANGE",
    choice_b: "silty lake beds in Canada,",
    choice_c: "silty Canadian lake beds,",
    choice_d: "Canada's silty lake beds,",
    correct_answer: answerKeys.english[29],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 30,
    question_stem: "For the sake of logic and cohesion, Paragraph 3 should be placed:",
    underlined_text: "[Paragraph placement question]",
    context_before: "",
    context_after: "",
    choice_a: "where it is now.",
    choice_b: "after Paragraph 1.",
    choice_c: "after Paragraph 4.",
    choice_d: "after Paragraph 5.",
    correct_answer: answerKeys.english[30],
    question_type: "organization",
    question_category: "POW"
  }
];

console.log('\n📝 Uploading English Passage 2...');

const passageData = {
  test_number: TEST_NUMBER,
  passage_number: PASSAGE_NUMBER,
  title: "Aquatic Explorer AQUA2",
  passage_text: PASSAGE_TEXT
};

const { error: passageError } = await supabase
  .from('act_english_passages')
  .upsert(passageData, { onConflict: 'test_number,passage_number' });

if (passageError) {
  console.error('❌ Error uploading passage:', passageError);
} else {
  console.log(`✅ Uploaded Passage ${PASSAGE_NUMBER}: "Aquatic Explorer AQUA2"`);
}

console.log('\n📝 Uploading questions 16-30...\n');

let successCount = 0;
const errors = [];

for (const q of questions) {
  const questionData = {
    test_number: TEST_NUMBER,
    question_number: q.question_number,
    passage_number: PASSAGE_NUMBER,
    question_stem: q.question_stem,
    underlined_text: q.underlined_text,
    context_before: q.context_before,
    context_after: q.context_after,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    question_category: q.question_category
  };

  const { error } = await supabase
    .from('act_english_questions')
    .upsert(questionData, { onConflict: 'test_number,question_number' });

  if (error) {
    errors.push(`Q${q.question_number}: ${error.message}`);
    console.error(`❌ Q${q.question_number}: ${error.message}`);
  } else {
    successCount++;
    console.log(`✅ Q${q.question_number}: ${q.underlined_text.substring(0, 40)}... → ${q.correct_answer}`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('📊 EXTRACTION SUMMARY:');
console.log(`✅ Successfully uploaded: ${successCount}/15 questions`);
console.log(`✅ Passage uploaded: "Aquatic Explorer AQUA2"`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(err => console.log(`   ${err}`));
}
console.log('='.repeat(80));
