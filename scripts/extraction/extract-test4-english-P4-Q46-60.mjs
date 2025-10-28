#!/usr/bin/env node

/**
 * EXTRACT TEST 4 ENGLISH PASSAGE 4 - QUESTIONS 46-60
 * "Close Encounters of the Bird Kind" passage
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
const PASSAGE_NUMBER = 4;

const answerKeysPath = join(__dirname, '../../data/test4-answer-keys.json');
const answerKeys = JSON.parse(fs.readFileSync(answerKeysPath, 'utf8'));

console.log('📝 EXTRACTING TEST 4 ENGLISH PASSAGE 4 - QUESTIONS 46-60\n');
console.log('Passage: "Close Encounters of the Bird Kind"');
console.log('='.repeat(80));

const PASSAGE_TEXT = `Close Encounters of the Bird Kind

In June of 1995, due to NASA technicians inspecting the space shuttle Discovery for an upcoming launch found over two hundred punctures in a fuel tank. Video surveillance revealed the culprits; two northern flickers, a species of woodpecker, was attempting to excavate a nest in the fuel tank's foam insulation. Upon striking the solid metal beneath, the flickers would stubbornly choose a new spot and try again.

[1] In the northern United States, where most flickers return each summer to mate and raise broods, the birds' persistence is well known. [2] By lacking a distinct song, flickers drum their beaks against hard surfaces to announce themselves to mates. [3] The louder the noise an object makes, the more attractive it is to flickers. [4] Among their favorite noisemakers are drainpipes, TV antennas, and even farm equipment. [5] At the Kennedy Space Center in Florida, though the flickers' persistence seemed mysterious. [6] Worse, it posed a serious risk.

[7] For solid metal to stop the birds from trying to nest at the launch site, how could NASA prevent damage to its equipment and keep the species safe?

NASA put together a committee, dubbed the Bird Investigation Review and Deterrent (BIRD) team, to consult with wildlife experts. After learning that flickers seek out soft, rotted wood when excavating nests, the team recommended the removal of dead trees from the area. For instance, upon learning that flickers forage for food on the ground, BIRD determined that tidy lawns made crawling insects easily visible. The team advised NASA to let the grass grow long to give the birds the impression that food was hard to catch.

Other, less subtle strategies were implemented to ensure that the birds didn't settle in. Deterred by plastic owls and floating balloons, alternatively, the flickers soon left for new territory. Their visit to the launchpad, however, was not soon forgotten. Discovery's successful launch was delayed five weeks while workers flocked to repair the fuel tank the flickers had favored.`;

const questions = [
  {
    question_number: 46,
    question_stem: "In June of 1995, due to NASA technicians inspecting the space shuttle Discovery for an upcoming launch found over two hundred punctures",
    underlined_text: "due to NASA technicians",
    context_before: "In June of 1995, ",
    context_after: " inspecting the space shuttle Discovery for an upcoming launch found over two hundred punctures",
    choice_a: "NO CHANGE",
    choice_b: "because NASA technicians, who were",
    choice_c: "NASA technicians",
    choice_d: "DELETE the underlined portion.",
    correct_answer: answerKeys.english[46],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 47,
    question_stem: "two northern flickers, a species of woodpecker, was attempting to excavate a nest in the fuel tank's foam insulation.",
    underlined_text: "was attempting to excavate",
    context_before: "two northern flickers, a species of woodpecker, ",
    context_after: " a nest in the fuel tank's foam insulation.",
    choice_a: "NO CHANGE",
    choice_b: "was attempting to be excavating",
    choice_c: "were attempted to excavate",
    choice_d: "were attempting to excavate",
    correct_answer: answerKeys.english[47],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 48,
    question_stem: "If the writer were to delete the preceding sentence, the paragraph would primarily lose information that:",
    underlined_text: "Upon striking the solid metal beneath, the flickers would stubbornly choose a new spot and try again.",
    context_before: "",
    context_after: "",
    choice_a: "establishes that flickers are persistent and helps explain how the fuel tank came to have over two hundred punctures.",
    choice_b: "describes the physical features that allow flickers to strike metal and explains how they locate hollow spots.",
    choice_c: "indicates why the flickers were initially attracted to the fuel tank and what eventually drove them away.",
    choice_d: "identifies the components of a space shuttle's fuel tank and the particular parts the flickers damaged.",
    correct_answer: answerKeys.english[48],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 49,
    question_stem: "In the northern United States, where most flickers return each summer to mate and raise broods, the birds' persistence is well known.",
    underlined_text: "birds' persistence is",
    context_before: "where most flickers return each summer to mate and raise broods, the ",
    context_after: " well known.",
    choice_a: "NO CHANGE",
    choice_b: "bird's persistence are",
    choice_c: "birds' persistence are",
    choice_d: "birds' persistences is",
    correct_answer: answerKeys.english[49],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 50,
    question_stem: "By lacking a distinct song, flickers drum their beaks against hard surfaces",
    underlined_text: "By lacking",
    context_before: "",
    context_after: " a distinct song, flickers drum their beaks against hard surfaces",
    choice_a: "NO CHANGE",
    choice_b: "As opposed to lacking",
    choice_c: "Because they lack",
    choice_d: "Just as they lack",
    correct_answer: answerKeys.english[50],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 51,
    question_stem: "At the Kennedy Space Center in Florida, though the flickers' persistence seemed mysterious.",
    underlined_text: "Florida, though",
    context_before: "At the Kennedy Space Center in ",
    context_after: " the flickers' persistence seemed mysterious.",
    choice_a: "NO CHANGE",
    choice_b: "Florida, though;",
    choice_c: "Florida, though,",
    choice_d: "Florida though",
    correct_answer: answerKeys.english[51],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 52,
    question_stem: "For solid metal to stop the birds from trying to nest at the launch site, how could NASA prevent damage to its equipment",
    underlined_text: "For solid metal to stop",
    context_before: "",
    context_after: " the birds from trying to nest at the launch site, how could NASA prevent damage to its equipment",
    choice_a: "NO CHANGE",
    choice_b: "Although solid metal didn't",
    choice_c: "By using solid metal to",
    choice_d: "If solid metal didn't",
    correct_answer: answerKeys.english[52],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 53,
    question_stem: "how could NASA prevent damage to its equipment and keep the species safe?",
    underlined_text: "its",
    context_before: "how could NASA prevent damage to ",
    context_after: " equipment and keep the species safe?",
    choice_a: "NO CHANGE",
    choice_b: "there",
    choice_c: "it's",
    choice_d: "its'",
    correct_answer: answerKeys.english[53],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 54,
    question_stem: "The writer wants to divide this paragraph into two in order to separate the information about flickers' drumming behavior from the discussion about NASA's concerns regarding the flickers. The best place to begin the new paragraph would be at the beginning of Sentence:",
    underlined_text: "[Paragraph division question]",
    context_before: "",
    context_after: "",
    choice_a: "3.",
    choice_b: "4.",
    choice_c: "5.",
    choice_d: "6.",
    correct_answer: answerKeys.english[54],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 55,
    question_stem: "For instance, upon learning that flickers forage for food on the ground,",
    underlined_text: "For instance,",
    context_before: "",
    context_after: " upon learning that flickers forage for food on the ground,",
    choice_a: "NO CHANGE",
    choice_b: "Likewise,",
    choice_c: "That is,",
    choice_d: "Indeed,",
    correct_answer: answerKeys.english[55],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 56,
    question_stem: "Which choice most effectively emphasizes that BIRD considered the conclusion it reached to be hypothetical?",
    underlined_text: "determined",
    context_before: "BIRD ",
    context_after: " that tidy lawns made crawling insects easily visible.",
    choice_a: "NO CHANGE",
    choice_b: "speculated",
    choice_c: "contended",
    choice_d: "realized",
    correct_answer: answerKeys.english[56],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 57,
    question_stem: "Which of the following alternatives to the underlined portion would NOT be acceptable?",
    underlined_text: "long to give",
    context_before: "The team advised NASA to let the grass grow ",
    context_after: " the birds the impression that food was hard to catch.",
    choice_a: "long, which might give",
    choice_b: "long; this might give",
    choice_c: "long and giving",
    choice_d: "long, giving",
    correct_answer: answerKeys.english[57],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 58,
    question_stem: "At this point, the writer is considering adding the following true statement:\nFlickers are particularly fond of ants, which contain an acid that the birds use to preen their feathers.\nShould the writer make this addition here?",
    underlined_text: "[Addition consideration]",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it emphasizes how likely the flickers would be to leave the area if they thought ants were scarce.",
    choice_b: "Yes, because it demonstrates how carefully the BIRD team researched the flickers' habits.",
    choice_c: "No, because it suggests that the plan adopted by NASA would eliminate flickers' favorite source of food.",
    choice_d: "No, because it detracts from the paragraph's focus on BIRD's strategies for deterring flickers.",
    correct_answer: answerKeys.english[58],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 59,
    question_stem: "Deterred by plastic owls and floating balloons, alternatively, the flickers soon left for new territory.",
    underlined_text: "alternatively,",
    context_before: "Deterred by plastic owls and floating balloons, ",
    context_after: " the flickers soon left for new territory.",
    choice_a: "NO CHANGE",
    choice_b: "incidentally,",
    choice_c: "however,",
    choice_d: "DELETE the underlined portion.",
    correct_answer: answerKeys.english[59],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 60,
    question_stem: "Suppose the writer's primary purpose had been to describe a typical space shuttle launch. Would this essay accomplish that purpose?",
    underlined_text: "[Essay purpose question]",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it describes the process the BIRD team goes through before a launch to identify possible interferences from wildlife.",
    choice_b: "Yes, because it details how NASA inspected the Discovery prior to its successful launch.",
    choice_c: "No, because its primary subjects are the unique nesting habits and warm-weather habitat of the northern flicker.",
    choice_d: "No, because it focuses on a single incident in which wildlife affected the course of a launch.",
    correct_answer: answerKeys.english[60],
    question_type: "organization",
    question_category: "POW"
  }
];

console.log('\n📝 Uploading English Passage 4...');

const passageData = {
  test_number: TEST_NUMBER,
  passage_number: PASSAGE_NUMBER,
  title: "Close Encounters of the Bird Kind",
  passage_text: PASSAGE_TEXT
};

const { error: passageError } = await supabase
  .from('act_english_passages')
  .upsert(passageData, { onConflict: 'test_number,passage_number' });

if (passageError) {
  console.error('❌ Error uploading passage:', passageError);
} else {
  console.log(`✅ Uploaded Passage ${PASSAGE_NUMBER}: "Close Encounters of the Bird Kind"`);
}

console.log('\n📝 Uploading questions 46-60...\n');

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
    console.log(`✅ Q${q.question_number}: ${q.underlined_text.substring(0, 30)}... → ${q.correct_answer}`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('📊 EXTRACTION SUMMARY:');
console.log(`✅ Successfully uploaded: ${successCount}/15 questions`);
console.log(`✅ Passage uploaded: "Close Encounters of the Bird Kind"`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(err => console.log(`   ${err}`));
}
console.log('='.repeat(80));
