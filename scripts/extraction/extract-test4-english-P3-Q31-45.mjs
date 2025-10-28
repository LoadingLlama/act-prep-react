#!/usr/bin/env node

/**
 * EXTRACT TEST 4 ENGLISH PASSAGE 3 - QUESTIONS 31-45
 * "The Fisherman of Porgy Key" passage
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
const PASSAGE_NUMBER = 3;

const answerKeysPath = join(__dirname, '../../data/test4-answer-keys.json');
const answerKeys = JSON.parse(fs.readFileSync(answerKeysPath, 'utf8'));

console.log('📝 EXTRACTING TEST 4 ENGLISH PASSAGE 3 - QUESTIONS 31-45\n');
console.log('Passage: "The Fisherman of Porgy Key"');
console.log('='.repeat(80));

const PASSAGE_TEXT = `The Fisherman of Porgy Key

[1]
Covering 173,000 acres of clear water and dozens of islands off the tip of Florida, Biscayne National Park features many unusual species of plants. Today, the park is a refuge for sea turtles, manatees, and alligators. In the 1960s, though, land developers saw commercial potential for the area. Some wanted to build an oil refinery. [A] Others, because of Biscayne Bay's natural beauty, wanted beach resorts. However, Lancelot Jones, one of two year-round residents, of the islands wanted to preserve the bay.

[2]
Porgy Key had always been home for Jones, a small island in Biscayne Bay. His father had purchased the land for $300 in 1897, and Jones grew up there, cultivating pineapples and Key limes. Therefore, in 1935, Jones began guiding fishing trips; his knowledge of fishing earned him the reputation for being the area's best fishing guide. [B] Among his clientele were several US presidents, including: Hoover, Kennedy, and Nixon.

[3]
[1] In 1961, fourteen of the eighteen landowners came to Biscayne Bay and voted to found a city on the bay's islands to expedite commercial development of the land. [2] Jones abstained from voting. [3] He refused to sell his land because he wanted the area to be conserved.

[4]
Jones wasn't alone, some Florida residents, and frequent visitors sought to preserve Biscayne Bay by turning it into a national park. Their efforts were furthered by Miami Herald reporter Juanita Greene, whose articles helped sway public opinion. [C] Finally, in 1968, President Johnson signed a bill that put the bay under federal protection.

[5]
First to sell their land to the National Park Service was Lancelot Jones, who was permitted to remain on Porgy Key. Since he still led fishing trips, and he taught schoolchildren about the environment of Biscayne Bay. [D] In exchange for teaching each class, he asked only for a Key lime pie in return for the class. Jones lived alone, but he said, "When you have plenty of interests, like the water and the woods, the birds and the fish, you don't get lonely."`;

const questions = [
  {
    question_number: 31,
    question_stem: "Given that all the choices are true, which one provides the most specific description of plant life in Biscayne National Park?",
    underlined_text: "many unusual species of plants",
    context_before: "Biscayne National Park features ",
    context_after: ".",
    choice_a: "NO CHANGE",
    choice_b: "colorful orchids, rare cacti, and mangrove forests.",
    choice_c: "many species that are difficult to find in the wild.",
    choice_d: "four distinct ecosystems.",
    correct_answer: answerKeys.english[31],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 32,
    question_stem: "However, Lancelot Jones, one of two year-round residents, of the islands wanted to preserve the bay.",
    underlined_text: "residents, of the islands",
    context_before: "However, Lancelot Jones, one of two year-round ",
    context_after: " wanted to preserve the bay.",
    choice_a: "NO CHANGE",
    choice_b: "However Lancelot Jones, one of two year-round residents, of the islands,",
    choice_c: "However, Lancelot Jones, one of two year-round residents of the islands,",
    choice_d: "However Lancelot Jones, one of two year-round residents of the islands",
    correct_answer: answerKeys.english[32],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 33,
    question_stem: "Porgy Key had always been home for Jones, a small island in Biscayne Bay.",
    underlined_text: "Porgy Key had always been home for Jones,",
    context_before: "",
    context_after: " a small island in Biscayne Bay.",
    choice_a: "NO CHANGE",
    choice_b: "Jones had lived on Porgy Key his entire life,",
    choice_c: "Porgy Key always was a home for Jones,",
    choice_d: "Jones had always lived on Porgy Key,",
    correct_answer: answerKeys.english[33],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 34,
    question_stem: "His father had purchased the land for $300 in 1897, and Jones grew up there, cultivating pineapples and Key limes.",
    underlined_text: "1897, and Jones grew up there, cultivating",
    context_before: "His father had purchased the land for $300 in ",
    context_after: " pineapples and Key limes.",
    choice_a: "NO CHANGE",
    choice_b: "1897 and Jones, grew up there, cultivating",
    choice_c: "1897, and Jones grew up there cultivating,",
    choice_d: "1897 and Jones grew up there cultivating,",
    correct_answer: answerKeys.english[34],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 35,
    question_stem: "Therefore, in 1935, Jones began guiding fishing trips",
    underlined_text: "Therefore, in",
    context_before: "",
    context_after: " 1935, Jones began guiding fishing trips",
    choice_a: "NO CHANGE",
    choice_b: "Likewise, in",
    choice_c: "Thus, in",
    choice_d: "In",
    correct_answer: answerKeys.english[35],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 36,
    question_stem: "Among his clientele were several US presidents, including: Hoover, Kennedy, and Nixon.",
    underlined_text: "presidents, including:",
    context_before: "Among his clientele were several US ",
    context_after: " Hoover, Kennedy, and Nixon.",
    choice_a: "NO CHANGE",
    choice_b: "presidents, who were including",
    choice_c: "presidents, including",
    choice_d: "presidents; including",
    correct_answer: answerKeys.english[36],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 37,
    question_stem: "He refused to sell his land because he wanted the area to be conserved.",
    underlined_text: "land because",
    context_before: "He refused to sell his ",
    context_after: " he wanted the area to be conserved.",
    choice_a: "NO CHANGE",
    choice_b: "land; because",
    choice_c: "land,",
    choice_d: "land",
    correct_answer: answerKeys.english[37],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 38,
    question_stem: "Which of the following sequences of sentences makes this paragraph most logical?",
    underlined_text: "[Sentence order: 1,2,3]",
    context_before: "",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "1,3,2",
    choice_c: "3,1,2",
    choice_d: "2,1,3",
    correct_answer: answerKeys.english[38],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 39,
    question_stem: "Jones wasn't alone, some Florida residents, and frequent visitors sought to preserve Biscayne Bay",
    underlined_text: "alone, some Florida residents,",
    context_before: "Jones wasn't ",
    context_after: " and frequent visitors sought to preserve Biscayne Bay",
    choice_a: "NO CHANGE",
    choice_b: "alone. Some Florida residents",
    choice_c: "alone; some Florida residents,",
    choice_d: "alone, some Florida residents",
    correct_answer: answerKeys.english[39],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 40,
    question_stem: "At this point, the writer is considering adding the following true statement:\nBiscayne National Park is similar to Grand Canyon National Park in that both parks were initially designated national monuments.\nShould the writer make this addition here?",
    underlined_text: "[Addition consideration]",
    context_before: "Finally, in 1968, President Johnson signed a bill that put the bay under federal protection. ",
    context_after: "",
    choice_a: "Yes, because it explains why Biscayne National Park was a national monument at first.",
    choice_b: "Yes, because it compares Biscayne National Park to another national park.",
    choice_c: "No, because it presents information that is only loosely related to the rest of the essay.",
    choice_d: "No, because it repeats information that is discussed earlier in the essay.",
    correct_answer: answerKeys.english[40],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 41,
    question_stem: "First to sell their land to the National Park Service was Lancelot Jones",
    underlined_text: "their",
    context_before: "First to sell ",
    context_after: " land to the National Park Service was Lancelot Jones",
    choice_a: "NO CHANGE",
    choice_b: "one's",
    choice_c: "there",
    choice_d: "his",
    correct_answer: answerKeys.english[41],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 42,
    question_stem: "First to sell their land to the National Park Service was Lancelot Jones, who was permitted to remain on Porgy Key.",
    underlined_text: "Service was Lancelot Jones,",
    context_before: "First to sell their land to the National Park ",
    context_after: " who was permitted to remain on Porgy Key.",
    choice_a: "NO CHANGE",
    choice_b: "Service, was Lancelot Jones,",
    choice_c: "Service, was Lancelot Jones",
    choice_d: "Service was Lancelot Jones",
    correct_answer: answerKeys.english[42],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 43,
    question_stem: "Since he still led fishing trips, and he taught schoolchildren about the environment of Biscayne Bay.",
    underlined_text: "Since he",
    context_before: "",
    context_after: " still led fishing trips, and he taught schoolchildren about the environment of Biscayne Bay.",
    choice_a: "NO CHANGE",
    choice_b: "Even though he",
    choice_c: "Because he",
    choice_d: "He",
    correct_answer: answerKeys.english[43],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 44,
    question_stem: "In exchange for teaching each class, he asked only for a Key lime pie in return for the class.",
    underlined_text: "in return for the class",
    context_before: "In exchange for teaching each class, he asked only for a Key lime pie ",
    context_after: ".",
    choice_a: "NO CHANGE",
    choice_b: "that he requested in exchange.",
    choice_c: "for teaching the class.",
    choice_d: "DELETE the underlined portion and end the sentence with a period.",
    correct_answer: answerKeys.english[44],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 45,
    question_stem: "The writer wants to add the following sentence to the essay:\nThe park idea gained momentum.\nThe sentence would most logically be placed at:",
    underlined_text: "[Sentence placement question]",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 1.",
    choice_b: "Point B in Paragraph 2.",
    choice_c: "Point C in Paragraph 4.",
    choice_d: "Point D in Paragraph 5.",
    correct_answer: answerKeys.english[45],
    question_type: "organization",
    question_category: "POW"
  }
];

console.log('\n📝 Uploading English Passage 3...');

const passageData = {
  test_number: TEST_NUMBER,
  passage_number: PASSAGE_NUMBER,
  title: "The Fisherman of Porgy Key",
  passage_text: PASSAGE_TEXT
};

const { error: passageError } = await supabase
  .from('act_english_passages')
  .upsert(passageData, { onConflict: 'test_number,passage_number' });

if (passageError) {
  console.error('❌ Error uploading passage:', passageError);
} else {
  console.log(`✅ Uploaded Passage ${PASSAGE_NUMBER}: "The Fisherman of Porgy Key"`);
}

console.log('\n📝 Uploading questions 31-45...\n');

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
console.log(`✅ Passage uploaded: "The Fisherman of Porgy Key"`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(err => console.log(`   ${err}`));
}
console.log('='.repeat(80));
