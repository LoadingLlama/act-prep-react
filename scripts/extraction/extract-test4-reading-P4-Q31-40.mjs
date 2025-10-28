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

const PASSAGE_TEXT = `Scientists have long puzzled over the enormous size of the human brain. It is seven times larger than one would predict for an average mammal of our size. Many of our extra neurons are in a region of the brain called the frontal cortex, where much of the most sophisticated thought takes place.

To understand how we ended up with such a strange organ, many scientists have turned to our fellow primates. They also have large brains, although not as large as our own. It turns out that primates with a big frontal cortex tend to live in large groups.

Primates may be pushed into larger groups thanks to predators or to patchy sources of food like fruit trees. As their numbers grow, natural selection may favor social intelligence. The primates form long-term alliances with each other and compete with rivals. They begin to keep track of a larger and larger social network.

A boost in social intelligence can lead to an evolutionary edge for primates. Well-connected female baboons, for example, dominate their bands. They have more babies than lower-ranking females, and their babies enjoy better health and faster growth.

Brain imaging studies have revealed that when people think about other people, parts of the frontal cortex become active. Advocates of the social brain hypothesis say the frontal cortex expanded in our ancestors because natural selection favored social intelligence.

Most of the research on the social brain hypothesis has focused on primates. One reason for that bias, Dr. Kaye Holekamp, a professor at Michigan State University, said, is many scientists thought that no other animals were worth studying. "Primatologists have argued for years," she said, "that primates are unique in terms of the complexity of their social lives."

From her experience with hyenas, Dr. Holekamp had her doubts. So she began to run experiments on spotted hyenas similar to the ones run on primates. She would play recordings of hyenas, for example, to see if other hyenas recognized them individually. They did. She soon came to see the primates-only view of the social brain as deeply flawed.

To understand the social intelligence of hyenas, Dr. Holekamp and her colleagues track the animals from birth to death. Their work begins in the communal dens where the cubs live for their first few months. Older spotted hyenas pay regular visits to the dens, giving the cubs an opportunity to learn about the rigid hierarchy in which they live. Spotted hyena societies have one dominant female at the top, and a series of hyenas below her. Each cub learns exactly where it fits into the hierarchy, and where all the other spotted hyenas fit as well.

The hierarchy reveals itself most vividly when it is time to eat. When one or two hyenas make a kill, other members of the clan will join them to fight over the prey. But the dominant female always wins.

There are times, however, when the entire group of hyenas comes together. Spotted hyena clans patrol the borders of their territory together. "When the whole group territory is on the line," Dr. Holekamp said, "all these unrelated individuals join forces and engage in a clan war."

What makes the social complexity of spotted hyenas particularly enlightening, Dr. Holekamp said, are their relatives. They belong to a family of four species, and the other three live in strikingly different societies. Dr. Holekamp wonders if this range of social arrangements is reflected in the structure of hyena brains.

From a CT-scan of a hyena skull, it is possible to reconstruct the three-dimension structure of the brain it held. Dr. Holekamp and her colleagues have been working to survey dozens of skulls from all four species in the hyena family. Their preliminary results indicate hyenas follow the same rules as primates.

"It's just what the social complexity hypothesis would predict," Dr. Holekamp said. "The hyenas with the simplest social systems have the tiniest frontal cortices. The spotted hyena, which lives in the most complex societies, has far and away the largest frontal cortex."

Joan Silk, an expert on monkey societies at the University of California, Los Angeles, praises Dr. Holekamp's research, calling it "directly relevant to our understanding of the origins of social complexity and intelligence."

"I would argue that's not true at all: spotted hyenas live in a society just as large and just as complex as baboons'," Dr. Holekamp said, noting that spotted hyenas live in the largest social groups of any carnivore. "We're talking about 60 to 80 individuals who all know each other individually."`;

const questions = [
  {question_number: 31, question_stem: "One main purpose of the passage is to:", choice_a: "contrast the structure of a hyena's brain with the structure of a human's brain.", choice_b: "argue that studies of hyenas have revealed more about brain function than have studies of primates.", choice_c: "discuss what the study of hyenas has revealed about the evolution of social intelligence.", choice_d: "compare the evolutionary histories of the four species in the hyena family.", correct_answer: answerKeys.reading[31], question_type: "purpose", question_category: "KID"},
  {question_number: 32, question_stem: "The author cites brain imaging studies in the fifth paragraph (lines 24-29) primarily to support the passage's point that:", choice_a: "the frontal cortex is the center of social intelligence.", choice_b: "most of a human's extra neurons are located in the frontal cortex.", choice_c: "the majority of research on the social brain hypothesis is focused on primates.", choice_d: "it's possible to reconstruct the three-dimension structure of the hyena brain from a CT scan of a skull.", correct_answer: answerKeys.reading[32], question_type: "purpose", question_category: "CS"},
  {question_number: 33, question_stem: "When the author states that hyenas \"follow the same rules as primates\" (line 83), he most likely means that:", choice_a: "the hyena's diet closely resembles that of primates.", choice_b: "primates and hyenas who live in large groups have large frontal cortices.", choice_c: "primates and hyenas tend to form long-term alliances with other species.", choice_d: "the structure of the hyena skull is identical to that of the primate skull.", correct_answer: answerKeys.reading[33], question_type: "inference", question_category: "IKI"},
  {question_number: 34, question_stem: "Based on the passage, Holekamp's research most directly challenges which of the following arguments made by some primatologists?", choice_a: "Primates are favored by natural selection because they are better equipped to locate patchy sources of food.", choice_b: "Primates are the only animals worth studying for social brain hypothesis research.", choice_c: "Primates have higher social intelligence than do other animals.", choice_d: "Primates tend to live in larger groups than do other animals.", correct_answer: answerKeys.reading[34], question_type: "inference", question_category: "IKI"},
  {question_number: 35, question_stem: "According to the passage, when Holekamp and her colleagues analyzed hyena skulls, they determined that:", choice_a: "subtle differences in hyena skulls enable hyenas to recognize fellow clan members.", choice_b: "hyenas with larger skulls tend to have a smaller frontal cortex.", choice_c: "the structure of the hyena brain varies among the different hyena species.", choice_d: "the structure of the hyena brain has changed little over the centuries.", correct_answer: answerKeys.reading[35], question_type: "detail", question_category: "KID"},
  {question_number: 36, question_stem: "The author speculates that primates may be pushed to live in large groups due in part to:", choice_a: "territory disputes with hyenas.", choice_b: "an innate desire to stay close to their relatives.", choice_c: "the presence of predators.", choice_d: "a lack of suitable shelter.", correct_answer: answerKeys.reading[36], question_type: "detail", question_category: "KID"},
  {question_number: 37, question_stem: "In the passage, the author discusses female baboons primarily to illustrate how:", choice_a: "female primates have higher social intelligence than do male primates.", choice_b: "limited sources of food cause animals to be aggressive toward one another.", choice_c: "primates learn the hierarchy of their social group from their mothers.", choice_d: "increased social intelligence can give animals an evolutionary advantage.", correct_answer: answerKeys.reading[37], question_type: "purpose", question_category: "CS"},
  {question_number: 38, question_stem: "Which of the following theories about the evolution of the human brain is presented in the passage?", choice_a: "During the early stages in the evolution of the human brain, growth in the frontal cortex was inhibited by the structure of the skull.", choice_b: "After developing the ability to produce sophisticated thought, the human brain began to produce extra neurons.", choice_c: "Because natural selection favors social intelligence, the human frontal cortex began to increase in size.", choice_d: "Humans first developed a frontal cortex when they began to form long-term alliances to better compete with rivals.", correct_answer: answerKeys.reading[38], question_type: "detail", question_category: "KID"},
  {question_number: 39, question_stem: "According to the passage, when does a spotted hyena first learn its place in the hierarchy of its clan?", choice_a: "While participating in its first fight over prey", choice_b: "While living in the communal den", choice_c: "When patrolling the clan's territory for the first time", choice_d: "Shortly after leaving the communal den", correct_answer: answerKeys.reading[39], question_type: "detail", question_category: "KID"},
  {question_number: 40, question_stem: "According to the passage, compared to other species of hyenas, spotted hyenas:", choice_a: "are more likely to be carnivores.", choice_b: "are less likely to be territorial.", choice_c: "have smaller frontal cortices.", choice_d: "live in more complex societies.", correct_answer: answerKeys.reading[40], question_type: "detail", question_category: "KID"}
];

console.log('📚 EXTRACTING READING P4 (Q31-40) Hyenas and Social Intelligence...');
const {data: passage, error: pErr} = await supabase.from('act_reading_passages').upsert({test_number: TEST_NUMBER, passage_number: 4, passage_type: "Natural Science", title: "Sociable, and Smart", author: "Carl Zimmer", source: "©2008 by The New York Times Company", passage_text: PASSAGE_TEXT}, {onConflict: 'test_number,passage_number'}).select().single();
if (pErr) {console.error('Passage error:', pErr); process.exit(1);}
console.log('✅ Passage uploaded');

let count = 0;
for (const q of questions) {
  const {error} = await supabase.from('act_reading_questions').upsert({test_number: TEST_NUMBER, question_number: q.question_number, passage_id: passage.id, question_stem: q.question_stem, choice_a: q.choice_a, choice_b: q.choice_b, choice_c: q.choice_c, choice_d: q.choice_d, correct_answer: q.correct_answer, question_type: q.question_type, question_category: q.question_category}, {onConflict: 'test_number,question_number'});
  if (!error) {count++; console.log(`✅ Q${q.question_number} → ${q.correct_answer}`);}
}
console.log(`\n📊 P4 Complete: ${count}/10`);
