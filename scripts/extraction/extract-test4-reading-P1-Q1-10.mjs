#!/usr/bin/env node

/**
 * EXTRACT TEST 4 READING PASSAGE 1 - QUESTIONS 1-10
 * "Atop the Mound" - Literary Narrative by William Least Heat-Moon
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

const answerKeysPath = join(__dirname, '../../data/test4-answer-keys.json');
const answerKeys = JSON.parse(fs.readFileSync(answerKeysPath, 'utf8'));

console.log('📚 EXTRACTING TEST 4 READING PASSAGE 1 - QUESTIONS 1-10\n');
console.log('Passage: "Atop the Mound" by William Least Heat-Moon');
console.log('='.repeat(80));

const PASSAGE_TEXT = `What I cherish I've come to slowly, usually blindly, not seeing it for some time, and that's just how I discovered Jacobs' Mound. This old travelers' marker shows up clearly from two highways, yet I was here several days before I noticed it, this isolated frustum so distinct. I must have been looking too closely and narrowly, but once I saw its volcano-cone symmetry I was drawn to it as western travelers have always been to lone protuberances—Independence Rock, Pompey's Pillar, Chimney Rock—and within a day I headed down the Bloody Creek Road until the lane played out in a grassed vale.

I walked down a hawk-harried ridge and struck out toward the mound, seemingly near enough to reach before sunset. In places the October grasses reached to my belt and stunted my strides. From the tall heads of Indian grass and the brown stalks of gayfeather, gossamer strung out in the slow wind, and these web lines snagged my trousers and chest and head until, after a mile, I was bestrung and on my way to becoming cocooned. I stopped to watch small events but never for long because the mound was drawing me as if it were a stone vortex in a petrified sea.

There are several ways not to walk in the prairie, and one of them is with your eye on a far goal, because you then begin to believe you're not closing the distance any more than you would with a mirage. My woodland sense of scale and time didn't fit this country, and I started wondering whether I could reach the summit before dark. On the prairie, distance and the miles of air turn movement to stasis and openness to a wall, a thing as difficult to penetrate as dense forest. It seemed every time I raised a step the earth rotated under me so that my foot fell just where it had lifted from. Limits and markers make travel possible for people: circumscribe our lines of sight and we can really get somewhere. Before me lay the Kansas of popular conception from Coronado on—that place you have to get through, that purgatory of mileage.

But I kept walking, and, when I dropped into hollows and the mound disappeared, I focused on a rock or a tuft of grass to keep from convoluting my track. Hiking in the woods allows a traveler to imagine comforting enclosures, one leading to the next, and the walker can possess those little encompassed spaces, but the prairie and plains permit no such possession. Whatever else prairie is—grass, sky, wind—it is most of all a paradigm of infinity, a clearing full of many things except boundaries, and its power comes from its apparent limitlessness; there is no such thing as a small prairie any more than there is a little ocean.

I came up out of a hollow, Jacobs' Mound big now on the horizon, and I could feel its swell in my legs, and then I was in the steep climb up its slope, and: I was on top. From the highway I'd guessed the summit to be the size of a city block, but it was less than a baseball infield, its elliptical perimeter just a hundred strides. So, its power lay not in size but rather in shape and dominion and its thrust into the imagination.

I sat and looked. The thousands of acres that lay encircled around the knob I really didn't see, not at first. I saw air, and I recalled a woman saying, Seems the air here hasn't ever been used before. From a plane you look down, and from a mountain you look down, but from Jacobs' Mound you look out, out into. You're not up in the sky and you're not on the ground: you're nicely in-between, at the altitude of those who fly in their dreams and skim roofs and treetops. Jacobs' Mound is thrush-flight high.

And then I understood: I like this prairie county because of its illusion of being away, out of, and I like how its unpopulousness seems to isolate it. Seventy percent of Americans live on two percent of the land, but in front of me, no percentage of them lived. Yet, in the far southeast, I could see trucks inching out the turnpike miles, the turbulence of their passage silenced by distance. And I could see fence lines, transmission towers, and dug ponds, things the pioneers would have viewed as marks of a progressive civilization but which to me, a grousing neo-primitivist, were signs of the continuing onslaught. The view I had homesteaders would have loved, and the one they had of unbroken vegetation and its diversities I would cherish. In the nineteenth century, the Kansas clergyman and author William Quayle traded his autograph for an acre of prairie, and, yesterday, I thought him a thief, but now, seeing the paltriness of an acre, I figured he was the one swindled.`;

const questions = [
  {
    question_number: 1,
    question_stem: "The point of view from which the passage is told can best be described as that of a first person narrator who:",
    choice_a: "is uncomfortable when he must traverse a large section of unfamiliar prairie.",
    choice_b: "has an experience that leads to a deeper appreciation of the prairie.",
    choice_c: "visits the prairie in order to experience life as early settlers might have.",
    choice_d: "has traded arduous hikes in the woods for leisurely walks in the prairie.",
    correct_answer: answerKeys.reading[1],
    question_type: "structure",
    question_category: "KID"
  },
  {
    question_number: 2,
    question_stem: "When Jacobs' Mound disappears from the narrator's sight, he shifts his focus to:",
    choice_a: "clouds in the sky.",
    choice_b: "rocks and patches of grass.",
    choice_c: "fences and highways.",
    choice_d: "birds flying overhead.",
    correct_answer: answerKeys.reading[2],
    question_type: "detail",
    question_category: "KID"
  },
  {
    question_number: 3,
    question_stem: "According to the narrator, what is the main difference between walking in wooded areas and walking in the prairie?",
    choice_a: "Wooded areas provide walkers with comforting enclosures that the prairie lacks.",
    choice_b: "It takes longer to navigate wooded areas than it does to navigate the prairie.",
    choice_c: "The flora and fauna are more diverse on the prairie than in the woods.",
    choice_d: "The sun is much stronger on the prairie than in the woods.",
    correct_answer: answerKeys.reading[3],
    question_type: "detail",
    question_category: "KID"
  },
  {
    question_number: 4,
    question_stem: "According to the narrator, focusing on a distant goal while walking in the prairie is not recommended because:",
    choice_a: "distant objects often move in and out of sight.",
    choice_b: "there is the potential to miss small objects nearby.",
    choice_c: "walkers need to be aware of their immediate surroundings.",
    choice_d: "doing so makes progress difficult to measure.",
    correct_answer: answerKeys.reading[4],
    question_type: "detail",
    question_category: "KID"
  },
  {
    question_number: 5,
    question_stem: "As it is used in line 23, the phrase petrified sea refers to:",
    choice_a: "Jacobs' Mound.",
    choice_b: "the sky.",
    choice_c: "the prairie.",
    choice_d: "the highway.",
    correct_answer: answerKeys.reading[5],
    question_type: "vocab",
    question_category: "CS"
  },
  {
    question_number: 6,
    question_stem: "How does the narrator see the power of the wider prairie differing, if at all, from the power of Jacobs' Mound?",
    choice_a: "The prairie's power comes from its apparent limitlessness; the power of Jacobs' Mound comes from its hold on the imagination.",
    choice_b: "The prairie's power comes from its unpopulousness; the power of Jacobs' Mound comes from its size.",
    choice_c: "The prairie's power comes from its flat terrain; the power of Jacobs' Mound comes from its height.",
    choice_d: "Both places derive power from their size.",
    correct_answer: answerKeys.reading[6],
    question_type: "detail",
    question_category: "KID"
  },
  {
    question_number: 7,
    question_stem: "The main idea of the sixth paragraph (lines 60-69) is that:",
    choice_a: "few people other than the narrator have visited the summit of Jacobs' Mound.",
    choice_b: "the air at the top of Jacobs' Mound is noticeably different from the air at the bottom.",
    choice_c: "Jacobs' Mound gives the impression of being away from civilization.",
    choice_d: "the summit of Jacobs' Mound exists in a special place between the earth and the sky.",
    correct_answer: answerKeys.reading[7],
    question_type: "main_idea",
    question_category: "KID"
  },
  {
    question_number: 8,
    question_stem: "Based on the passage, which of the following can most reasonably be inferred about the narrator?",
    choice_a: "He traveled to the area specifically to climb Jacobs' Mound.",
    choice_b: "He has already climbed Independence Rock and Pompey's Pillar.",
    choice_c: "He prefers open, unpopulated areas to crowded urban areas.",
    choice_d: "He believes urban development is annoying but necessary.",
    correct_answer: answerKeys.reading[8],
    question_type: "inference",
    question_category: "IKI"
  },
  {
    question_number: 9,
    question_stem: "Which of the following statements best expresses how the narrator first feels when he reaches the summit of Jacobs' Mound?",
    choice_a: "He is triumphant that he has reached a place few other people have been.",
    choice_b: "He is somewhat surprised that the summit is not as large as he had believed it would be.",
    choice_c: "He is overwhelmed by the brightness of the sun and the smell of the grass.",
    choice_d: "He is pleased to see thrushes nesting on the mound.",
    correct_answer: answerKeys.reading[9],
    question_type: "inference",
    question_category: "KID"
  },
  {
    question_number: 10,
    question_stem: "The narrator most likely includes the William Quayle anecdote at the end of the passage to:",
    choice_a: "reveal the extent of his amazement that he has finally reached the summit of Jacobs' Mound.",
    choice_b: "help illustrate why he was drawn to Jacobs' Mound in the first place.",
    choice_c: "give an example of the type of person who once lived on the prairie.",
    choice_d: "further convey his sense of wonder at the sheer size of the prairie.",
    correct_answer: answerKeys.reading[10],
    question_type: "purpose",
    question_category: "CS"
  }
];

console.log('\n📝 Uploading Reading Passage 1...');

// First, upload the passage
const passageData = {
  test_number: TEST_NUMBER,
  passage_number: PASSAGE_NUMBER,
  passage_type: "Literary Narrative",
  title: "Atop the Mound",
  author: "William Least Heat-Moon",
  source: "©1991 by William Least Heat-Moon",
  passage_text: PASSAGE_TEXT
};

const { data: insertedPassage, error: passageError } = await supabase
  .from('act_reading_passages')
  .upsert(passageData, { onConflict: 'test_number,passage_number' })
  .select()
  .single();

if (passageError) {
  console.error('❌ Error uploading passage:', passageError);
  process.exit(1);
}

const passageId = insertedPassage.id;
console.log(`✅ Uploaded Passage ${PASSAGE_NUMBER}: "Atop the Mound" (ID: ${passageId})`);

console.log('\n📝 Uploading questions 1-10...\n');

let successCount = 0;
const errors = [];

for (const q of questions) {
  const questionData = {
    test_number: TEST_NUMBER,
    question_number: q.question_number,
    passage_id: passageId,
    question_stem: q.question_stem,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    question_category: q.question_category
  };

  const { error } = await supabase
    .from('act_reading_questions')
    .upsert(questionData, { onConflict: 'test_number,question_number' });

  if (error) {
    errors.push(`Q${q.question_number}: ${error.message}`);
    console.error(`❌ Q${q.question_number}: ${error.message}`);
  } else {
    successCount++;
    console.log(`✅ Q${q.question_number}: ${q.question_stem.substring(0, 60)}... → ${q.correct_answer}`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('📊 EXTRACTION SUMMARY:');
console.log(`✅ Successfully uploaded: ${successCount}/10 questions`);
console.log(`✅ Passage uploaded: "Atop the Mound"`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(err => console.log(`   ${err}`));
}
console.log('='.repeat(80));
