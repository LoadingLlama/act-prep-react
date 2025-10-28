#!/usr/bin/env node
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
const answerKeys = JSON.parse(fs.readFileSync(join(__dirname, '../../data/test4-answer-keys.json'), 'utf8'));

const PASSAGE_TEXT = `The whitefly Bemisia argentifolii is an insect that has 3 distinct life stages: egg, nymph (juvenile), and adult. A study examined the effects of external temperature on the duration of each of the 3 life stages of B. argentifolii and on egg production by adult female B. argentifolii. Figure 1 shows, for each of 5 external temperatures, the average duration of each life stage. Figure 2 shows, for each of the 5 temperatures, the average number of eggs produced per female per day during the first 7 days of adult life.

[Figure 1: Shows duration in days vs temperature (°C) for egg, nymph, and adult stages at 20, 25, 27, 30, and 35°C]

[Figure 2: Shows average number of eggs produced per female per day vs temperature (°C) at 20, 25, 27, 30, and 35°C]

Figures adapted from Kaihong Wang and James H. Tsai, "Temperature Effect on Development and Reproduction of Silverleaf Whitefly (Homoptera: Aleyrodidae)." ©1996 by Entomological Society of America.`;

const questions = [
  {question_number: 1, question_stem: "According to Figure 1, for how many of the temperatures tested was the average duration of the egg stage longer than 1 week?", choice_a: "1", choice_b: "2", choice_c: "4", choice_d: "5", correct_answer: answerKeys.science[1], question_type: "data-interpretation", question_category: "IOD"},
  {question_number: 2, question_stem: "According to Figures 1 and 2, as the temperature increased from 20°C through 27°C, on average, did the duration of the adult stage increase or decrease, and did the number of eggs produced per female per day increase or decrease?", choice_a: "duration of adult stage: increase; number of eggs produced per female per day: increase", choice_b: "duration of adult stage: increase; number of eggs produced per female per day: decrease", choice_c: "duration of adult stage: decrease; number of eggs produced per female per day: increase", choice_d: "duration of adult stage: decrease; number of eggs produced per female per day: decrease", correct_answer: answerKeys.science[2], question_type: "data-interpretation", question_category: "IOD"},
  {question_number: 3, question_stem: "Consider the statement \"The temperature that resulted in the shortest average duration of the egg stage was also the temperature that resulted in the longest average duration of the adult stage.\" Is this statement consistent with the results shown in Figure 1?", choice_a: "Yes; that temperature was 20°C.", choice_b: "Yes; that temperature was 30°C.", choice_c: "No; on average, the duration of the egg stage was shortest at 20°C, whereas the duration of the adult stage was longest at 30°C.", choice_d: "No; on average, the duration of the egg stage was shortest at 30°C, whereas the duration of the adult stage was longest at 20°C.", correct_answer: answerKeys.science[3], question_type: "data-interpretation", question_category: "IOD"},
  {question_number: 4, question_stem: "Based on Figure 1, at 26°C, the nymph stage would most likely last:", choice_a: "fewer than 5 days.", choice_b: "between 5 days and 11 days.", choice_c: "between 11 days and 13 days.", choice_d: "more than 13 days.", correct_answer: answerKeys.science[4], question_type: "data-interpretation", question_category: "IOD"},
  {question_number: 5, question_stem: "Based on Figure 2, at a temperature of 25°C, an adult female B. argentifolii will produce, on average, a total of how many eggs over the first 7 days of her adult stage?", choice_a: "28", choice_b: "54", choice_c: "63", choice_d: "77", correct_answer: answerKeys.science[5], question_type: "data-interpretation", question_category: "IOD"},
  {question_number: 6, question_stem: "Based on Figure 2, the average number of eggs produced per female per day was how many times as great at 30°C as it was at 20°C?", choice_a: "1", choice_b: "1.5", choice_c: "2", choice_d: "2.5", correct_answer: answerKeys.science[6], question_type: "data-interpretation", question_category: "IOD"}
];

console.log('🔬 EXTRACTING SCIENCE P1 (Q1-6) Whitefly Temperature Study...');
const {data: passage, error: pErr} = await supabase.from('act_science_passages').upsert({test_number: TEST_NUMBER, passage_number: 1, passage_type: "Data Representation", title: "Whitefly Life Stages and Temperature", passage_text: PASSAGE_TEXT}, {onConflict: 'test_number,passage_number'}).select().single();
if (pErr) {console.error('Passage error:', pErr); process.exit(1);}
console.log('✅ Passage uploaded');

let count = 0;
for (const q of questions) {
  const {error} = await supabase.from('act_science_questions').upsert({test_number: TEST_NUMBER, question_number: q.question_number, passage_id: passage.id, question_stem: q.question_stem, choice_a: q.choice_a, choice_b: q.choice_b, choice_c: q.choice_c, choice_d: q.choice_d, correct_answer: q.correct_answer, question_type: q.question_type, question_category: q.question_category}, {onConflict: 'test_number,question_number'});
  if (!error) {count++; console.log(`✅ Q${q.question_number} → ${q.correct_answer}`);}
}
console.log(`\n📊 P1 Complete: ${count}/6`);
