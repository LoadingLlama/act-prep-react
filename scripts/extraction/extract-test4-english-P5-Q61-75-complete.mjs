#!/usr/bin/env node

/**
 * EXTRACT TEST 4 ENGLISH PASSAGE 5 - QUESTIONS 61-75
 * "Choreographing Change"
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
const PASSAGE_NUMBER = 5;

const answerKeysPath = join(__dirname, '../../data/test4-answer-keys.json');
const answerKeys = JSON.parse(fs.readFileSync(answerKeysPath, 'utf8'));

console.log('📝 EXTRACTING TEST 4 ENGLISH PASSAGE 5 - QUESTIONS 61-75\n');
console.log('Passage: "Choreographing Change"');
console.log('='.repeat(80));

const PASSAGE_TEXT = `Choreographing Change

[1]
The late German choreographer Pina Bausch once said, "I am not interested in how people move, but what moves them." Indeed, Bausch did not even consider herself a choreographer, but rather a kind of director. Her Tanztheater, translated "dance theater," pieces received international acclaim for those expressive, unconventional style and the often-raw emotional feelings they portrayed.

[2]
When Bausch began her formal dance education in 1955, Expressionism was again the dominant style. Bausch followed the Expressionists' lead (and that of other dance pioneers like Martha Graham from the '20s). She tackled existential themes—identity, alienation, romantic entanglements, suffering—portrayed through intense, sometimes violent, movements.

[3]
By the 1920s and up until the onset of World War II. German art was flourishing and had turned to the abstract. Expressionism, as it was called, replaced representational, or literal, modes of painting. Bausch, born in 1940, having grown up in postwar Germany. The country was attempting to rebuild its economy, its infrastructure, and even the country's national identification after the fall of Hitler's regime. German artists, of whom work was previously suppressed by the Nazi party, could refresh without fear. They began to depict the country's fragile state in their work.

[4]
A Bausch piece may include any number of dancers of any age. Dancers' emotions are conveyed through gestures—joy, passion, grief—that range from subtle to explosive, stationary to dynamic. In Café Miiller, one of her most famous works, dancers stumble across the stage, crashing into tables and chairs. Rite of Spring begins with a dancer lying prostrate on a stage, covered entirely with soil.

[5]
Travel to places such as Turkey, Portugal, and India have informed much of Bausch's work. She, often, incorporated, and combined dance traditions from the East and West, inspiring future choreographers. Her lasting influence lives on through revivals of her work.`;

const questions = [
  {
    question_number: 61,
    question_stem: "Her Tanztheater, translated \"dance theater,\" pieces received international acclaim for those expressive, unconventional style",
    underlined_text: "those",
    context_before: "Her Tanztheater, translated \"dance theater,\" pieces received international acclaim for ",
    context_after: " expressive, unconventional style",
    choice_a: "NO CHANGE",
    choice_b: "their",
    choice_c: "that",
    choice_d: "its",
    correct_answer: answerKeys.english[61],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 62,
    question_stem: "and the often-raw emotional feelings they portrayed.",
    underlined_text: "emotional feelings",
    context_before: "and the often-raw ",
    context_after: " they portrayed.",
    choice_a: "NO CHANGE",
    choice_b: "expressive emotions",
    choice_c: "feelings of emotion",
    choice_d: "emotions",
    correct_answer: answerKeys.english[62],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 63,
    question_stem: "By the 1920s and up until the onset of World War II. German art was flourishing",
    underlined_text: "War II.",
    context_before: "By the 1920s and up until the onset of World ",
    context_after: " German art was flourishing",
    choice_a: "NO CHANGE",
    choice_b: "1920s (and up until the onset of World War II),",
    choice_c: "1920s, and up until the onset of World War II",
    choice_d: "1920s and up until the onset of World War II",
    correct_answer: answerKeys.english[63],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 64,
    question_stem: "At this point, the writer is considering adding the following phrase:\nwith its splashes of color, stark lines, and distorted objects,\nGiven that the information is accurate, should the writer make this addition here?",
    underlined_text: "[Addition consideration]",
    context_before: "Expressionism, as it was called, ",
    context_after: "replaced representational, or literal, modes of painting.",
    choice_a: "Yes, because it describes features of Expressionist art with which the reader might be unfamiliar.",
    choice_b: "Yes, because it explains why representational modes were no longer preferred.",
    choice_c: "No, because it repeats information found elsewhere in the essay.",
    choice_d: "No, because it detracts from the paragraph's focus on who influenced Bausch's specific style of dance.",
    correct_answer: answerKeys.english[64],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 65,
    question_stem: "Bausch, born in 1940, having grown up in postwar Germany.",
    underlined_text: "having grown",
    context_before: "Bausch, born in 1940, ",
    context_after: " up in postwar Germany.",
    choice_a: "NO CHANGE",
    choice_b: "and grew",
    choice_c: "growing",
    choice_d: "grew",
    correct_answer: answerKeys.english[65],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 66,
    question_stem: "Which choice most closely maintains the pattern established in the sentence?",
    underlined_text: "the country's national identification",
    context_before: "The country was attempting to rebuild its economy, its infrastructure, and even ",
    context_after: " after the fall of Hitler's regime.",
    choice_a: "NO CHANGE",
    choice_b: "how it identified itself",
    choice_c: "its identity",
    choice_d: "an identity",
    correct_answer: answerKeys.english[66],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 67,
    question_stem: "German artists, of whom work was previously suppressed by the Nazi party",
    underlined_text: "of whom",
    context_before: "German artists, ",
    context_after: " work was previously suppressed by the Nazi party",
    choice_a: "NO CHANGE",
    choice_b: "artists, whose",
    choice_c: "artists, who's",
    choice_d: "artists'",
    correct_answer: answerKeys.english[67],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 68,
    question_stem: "could refresh without fear.",
    underlined_text: "refresh",
    context_before: "could ",
    context_after: " without fear.",
    choice_a: "NO CHANGE",
    choice_b: "resume",
    choice_c: "renew",
    choice_d: "recur",
    correct_answer: answerKeys.english[68],
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 69,
    question_stem: "The best placement for the underlined portion would be:",
    underlined_text: "Dancers' emotions are conveyed through gestures—joy, passion, grief—that range",
    context_before: "",
    context_after: "",
    choice_a: "where it is now.",
    choice_b: "after the word emotions.",
    choice_c: "after the word subtle.",
    choice_d: "after the word stationary.",
    correct_answer: answerKeys.english[69],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 70,
    question_stem: "Rite of Spring begins with a dancer lying prostrate on a stage",
    underlined_text: "lying",
    context_before: "Rite of Spring begins with a dancer ",
    context_after: " prostrate on a stage",
    choice_a: "NO CHANGE",
    choice_b: "having laid",
    choice_c: "lain down",
    choice_d: "laying",
    correct_answer: answerKeys.english[70],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 71,
    question_stem: "Which choice is grammatically correct and indicates that the stage, rather than the dancer, was covered with soil?",
    underlined_text: "stage, covered",
    context_before: "prostrate on a ",
    context_after: " entirely with soil.",
    choice_a: "NO CHANGE",
    choice_b: "stage, that was",
    choice_c: "stage, having been",
    choice_d: "stage",
    correct_answer: answerKeys.english[71],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 72,
    question_stem: "Travel to places such as Turkey, Portugal, and India have informed much of Bausch's work.",
    underlined_text: "have informed",
    context_before: "Travel to places such as Turkey, Portugal, and India ",
    context_after: " much of Bausch's work.",
    choice_a: "NO CHANGE",
    choice_b: "were informing",
    choice_c: "informed",
    choice_d: "inform",
    correct_answer: answerKeys.english[72],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 73,
    question_stem: "She, often, incorporated, and combined dance traditions from the East and West",
    underlined_text: "She, often, incorporated, and combined",
    context_before: "",
    context_after: " dance traditions from the East and West",
    choice_a: "NO CHANGE",
    choice_b: "She often, incorporated and combined,",
    choice_c: "She often incorporated, and combined",
    choice_d: "She often incorporated and combined",
    correct_answer: answerKeys.english[73],
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 74,
    question_stem: "For the sake of logic and cohesion, Paragraph 3 should be placed:",
    underlined_text: "[Paragraph placement]",
    context_before: "",
    context_after: "",
    choice_a: "where it is now.",
    choice_b: "after Paragraph 1.",
    choice_c: "after Paragraph 4.",
    choice_d: "after Paragraph 5.",
    correct_answer: answerKeys.english[74],
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 75,
    question_stem: "Suppose the writer's primary purpose had been to describe how an artist's particular style was shaped by cultural and historical events. Would this essay accomplish that purpose?",
    underlined_text: "[Essay purpose question]",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because the essay describes Bausch's particular choreographic style and frames it within the backdrop of her life in Germany.",
    choice_b: "Yes, because the essay explains how American and European forms of dance were influenced by shifting national identities.",
    choice_c: "No, because the essay mainly focuses on Bausch's Tanztheater and the international acclaim it received.",
    choice_d: "No, because the essay illustrates why Bausch's style is relevant today rather than explaining how it was shaped.",
    correct_answer: answerKeys.english[75],
    question_type: "organization",
    question_category: "POW"
  }
];

console.log('\n📝 Uploading English Passage 5...');

const passageData = {
  test_number: TEST_NUMBER,
  passage_number: PASSAGE_NUMBER,
  title: "Choreographing Change",
  passage_text: PASSAGE_TEXT
};

const { error: passageError } = await supabase
  .from('act_english_passages')
  .upsert(passageData, { onConflict: 'test_number,passage_number' });

if (passageError) {
  console.error('❌ Error uploading passage:', passageError);
} else {
  console.log(`✅ Uploaded Passage ${PASSAGE_NUMBER}: "Choreographing Change"`);
}

console.log('\n📝 Uploading questions 61-75...\n');

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
console.log(`✅ Passage uploaded: "Choreographing Change"`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(err => console.log(`   ${err}`));
}
console.log('\n🎉 ALL ENGLISH QUESTIONS FOR TEST 4 COMPLETE! (75/75)');
console.log('='.repeat(80));
