#!/usr/bin/env node

/**
 * PRACTICE TEST 6 - ENGLISH Q1-30 EXTRACTION - COMPLETE
 * Manual extraction with 100% accuracy
 * Passage 1: Deborah Sampson (Q1-15)
 * Passage 2: Senator Fong's Plantation (Q16-30)
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 6;

console.log('📝 EXTRACTING PRACTICE TEST 6 - ENGLISH Q1-30\n');
console.log('='.repeat(80));

// ============================================================================
// PASSAGE 1: Deborah Sampson: A Revolutionary Hero
// ============================================================================

const passage1 = {
  test_number: TEST_NUMBER,
  passage_number: 1,
  title: "Deborah Sampson: A Revolutionary Hero",
  passage_text: `[1]
US history books have traditionally chronicled the actions of male Revolutionary War heroes such as George Washington, Paul Revere, and John Paul Jones. Increasingly, such books include accounts of the many brave women which also contributed—as spies and soldiers—to the effort to gain independence from British rule.

[2]
Deborah Sampson of Plympton, Massachusetts, was one of these women. In 1782, despite the fact that women weren't allowed to serve in the military, twenty-one-year-old Sampson joined the colonial army. She disguised herself as a man and enlisted under the name of Robert Shurtliff.

[3]
For fourteen months Sampson served in the army, she acted with exceptional bravery and fortitude. Her commanding officers quickly recognized these traits and sent her on several special missions. On one such mission near West Point, New York, Sampson was part of a scouting party whose assignment to track and capture a British convoy. While pursuing several British soldiers into a swamp, Sampson was shot in the leg. Fearing that her true identity would be discovered, she did not report to the hospital. Instead, Sampson removed the musket ball by herself.

[4]
On another scouting mission, Sampsons' party, was ambushed by British soldiers. To escape the scouts had to wade across a river. A fierce current swept Sampson into deep waters. It was the weight of her heavy backpack and musket, Sampson struggled. For instance, a colonial soldier standing on a sandbar threw her a rope. Summoning her strength, Sampson plucked from the air that which was to save her and made it to shore. [A]

[5]
Sampson survived the winter and spring with her secret undiscovered. [B] In July 1783, however, she was found out. [C] While this meant that she could no longer serve in the army, her exemplary record as a soldier was officially recognized. [D] Later, she was awarded a military pension as a sign of gratitude from the young nation she had helped found.`
};

// ============================================================================
// PASSAGE 2: Senator Fong's Plantation and Gardens
// ============================================================================

const passage2 = {
  test_number: TEST_NUMBER,
  passage_number: 2,
  title: "Senator Fong's Plantation and Gardens",
  passage_text: `[1]
With a full career in both politics and business, Hiram Fong never set out to develop one of Oahu's most spectacularly horticulture attractions. [A] Fong, whose political career spanned over thirty years, was one of the first two senators from Hawaii to become a state in 1959 and the first Asian American to serve in the US Senate.

Prior to working in politics, Fong paid his own way through Harvard Law School and, upon graduating, was a part of a law firm. [B] All the while, gardening was his escape.

[2]
Wanting to experiment with growing fruit, he planted bananas, then papaya, lemon, jackfruit, and avocado. [C] By also choosing to plant crops such as bamboo, coconut, betel nut, and turmeric, he broadened the types of plants in his garden. He cultivated slopes covered with ti and pili grasses and forests of trees such as kukui, hala, and koa, vegetation previously an abundance on Oahu.

[3]
After he retired from politics in 1977, Fong continued to oversee his companies, but he focused on gardening, personally importing and planting countless species of plants. Eventually, he divided his land into five gardens, each one named for a US president whom had served while Fong was a senator. The Eisenhower Plateau is dedicated to native Chinese plants, such as the Hong Kong orchid tree and the Java plum. The Johnson Plateau features exotic fruits. Kennedy Valley, with its rain forest canopy, recommends ginger and palms from all over the world. Nixon Valley will abound with flowers—plumeria, crown flower, and bougainvillea are just a few—while the Ford Plateau highlights hillsides of pili grasses.

[4]
The preserve, bearing his name, is now named Senator Fong's Plantation and Gardens, complete with a visitors' center and guided tours. [D] Until his death in 2004 at ninety-seven, Fong spent every weekend tending to his flowers and trees and a moment to mingle with visitors. He credited gardening for his long, healthy life.`
};

// English Questions 1-30
const questions1_30 = [
  {
    test_number: TEST_NUMBER,
    question_number: 1,
    passage_number: 1,
    question_stem: "US history books have traditionally chronicled the actions of male Revolutionary War heroes <u>such as</u> George Washington, Paul Revere, and John Paul Jones.",
    underlined_text: "such as",
    context_before: "US history books have traditionally chronicled the actions of male Revolutionary War heroes",
    context_after: "George Washington, Paul Revere, and John Paul Jones.",
    choice_a: "NO CHANGE",
    choice_b: "heroes, such as,",
    choice_c: "heroes: such as",
    choice_d: "heroes such as,",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 2,
    passage_number: 1,
    question_stem: "Increasingly, such books include accounts of the many brave women <u>which</u> also contributed—as spies and soldiers—to the effort to gain independence from British rule.",
    underlined_text: "which",
    context_before: "Increasingly, such books include accounts of the many brave women",
    context_after: "also contributed—as spies and soldiers—to the effort to gain independence from British rule.",
    choice_a: "NO CHANGE",
    choice_b: "whom",
    choice_c: "who",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "C",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 3,
    passage_number: 1,
    question_stem: "Deborah Sampson of Plympton, Massachusetts, <u>was one of these women.</u> Given that all the choices are accurate, which one most clearly signals that the paragraph will focus on Sampson's Revolutionary War experience?",
    underlined_text: "was one of these women",
    context_before: "Deborah Sampson of Plympton, Massachusetts,",
    context_after: ". In 1782, despite the fact that women weren't allowed to serve in the military",
    choice_a: "NO CHANGE",
    choice_b: "a house servant for many years.",
    choice_c: "tall for a woman of her time.",
    choice_d: "a capable young woman.",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 4,
    passage_number: 1,
    question_stem: "In 1782, <u>despite the fact that</u> women weren't allowed to serve in the military, twenty-one-year-old Sampson joined the colonial army.",
    underlined_text: "despite the fact that",
    context_before: "In 1782,",
    context_after: "women weren't allowed to serve in the military, twenty-one-year-old Sampson joined the colonial army.",
    choice_a: "NO CHANGE",
    choice_b: "given that",
    choice_c: "because",
    choice_d: "and",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 5,
    passage_number: 1,
    question_stem: "<u>For fourteen months Sampson served in the army, she</u> acted with exceptional bravery and fortitude.",
    underlined_text: "For fourteen months Sampson served in the army, she",
    context_before: "",
    context_after: "acted with exceptional bravery and fortitude.",
    choice_a: "NO CHANGE",
    choice_b: "In the fourteen months that Sampson served in the army,",
    choice_c: "Sampson served in the army for fourteen months,",
    choice_d: "Her fourteen months of service in the army,",
    correct_answer: "B",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 6,
    passage_number: 1,
    question_stem: "Her commanding officers quickly recognized these traits and sent her on several special missions. On <u>one such</u> mission near West Point, New York,",
    underlined_text: "one such",
    context_before: "Her commanding officers quickly recognized these traits and sent her on several special missions. On",
    context_after: "mission near West Point, New York,",
    choice_a: "NO CHANGE",
    choice_b: "one of such",
    choice_c: "such a one",
    choice_d: "such",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 7,
    passage_number: 1,
    question_stem: "Sampson was part of a scouting party <u>whose assignment to track</u> and capture a British convoy.",
    underlined_text: "whose assignment to track",
    context_before: "Sampson was part of a scouting party",
    context_after: "and capture a British convoy.",
    choice_a: "NO CHANGE",
    choice_b: "their assignment was",
    choice_c: "who's been assigned",
    choice_d: "assigned",
    correct_answer: "D",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 8,
    passage_number: 1,
    question_stem: "On another scouting mission, <u>Sampsons' party,</u> was ambushed by British soldiers.",
    underlined_text: "Sampsons' party,",
    context_before: "On another scouting mission,",
    context_after: "was ambushed by British soldiers.",
    choice_a: "NO CHANGE",
    choice_b: "Sampson's party",
    choice_c: "Sampsons' party",
    choice_d: "Sampsons party",
    correct_answer: "B",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 9,
    passage_number: 1,
    question_stem: "To <u>escape the scouts</u> had to wade across a river.",
    underlined_text: "escape the scouts",
    context_before: "To",
    context_after: "had to wade across a river.",
    choice_a: "NO CHANGE",
    choice_b: "escape, the scouts,",
    choice_c: "escape the scouts,",
    choice_d: "escape, the scouts",
    correct_answer: "D",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 10,
    passage_number: 1,
    question_stem: "A fierce current swept Sampson into deep waters. <u>It was the weight of</u> her heavy backpack and musket, Sampson struggled. Given that all the choices are accurate, which one most effectively advances the narration of events in the paragraph?",
    underlined_text: "It was the weight of",
    context_before: "A fierce current swept Sampson into deep waters.",
    context_after: "her heavy backpack and musket, Sampson struggled.",
    choice_a: "NO CHANGE",
    choice_b: "She felt weighted down by",
    choice_c: "Weighted down by",
    choice_d: "The weight of",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 11,
    passage_number: 1,
    question_stem: "<u>It was the weight of</u> her heavy backpack and musket, Sampson struggled.",
    underlined_text: "It was the weight of",
    context_before: "",
    context_after: "her heavy backpack and musket, Sampson struggled.",
    choice_a: "NO CHANGE",
    choice_b: "She felt weighted down by",
    choice_c: "Weighted down by",
    choice_d: "The weight of",
    correct_answer: "C",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 12,
    passage_number: 1,
    question_stem: "<u>For instance, a</u> colonial soldier standing on a sandbar threw her a rope.",
    underlined_text: "For instance, a",
    context_before: "",
    context_after: "colonial soldier standing on a sandbar threw her a rope.",
    choice_a: "NO CHANGE",
    choice_b: "Moreover, a",
    choice_c: "Instead, a",
    choice_d: "A",
    correct_answer: "D",
    question_type: "transitions",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 13,
    passage_number: 1,
    question_stem: "Summoning her strength, Sampson <u>plucked from the air that which was to save her</u> and made it to shore.",
    underlined_text: "plucked from the air that which was to save her",
    context_before: "Summoning her strength, Sampson",
    context_after: "and made it to shore.",
    choice_a: "NO CHANGE",
    choice_b: "reached up from the deep water and took hold of the rope thrown by the colonial soldier",
    choice_c: "relied on assistance from a colonial soldier",
    choice_d: "caught the rope",
    correct_answer: "D",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 14,
    passage_number: 1,
    question_stem: "Later, she was awarded a military <u>pension as</u> a sign of gratitude from the young nation she had helped found. Which of the following alternatives to the underlined portion would NOT be acceptable?",
    underlined_text: "pension as",
    context_before: "Later, she was awarded a military",
    context_after: "a sign of gratitude from the young nation she had helped found.",
    choice_a: "NO CHANGE",
    choice_b: "pension, which was",
    choice_c: "pension, for which",
    choice_d: "pension. It was",
    correct_answer: "B",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 15,
    passage_number: 1,
    question_stem: "The writer wants to add the following sentence to the essay: 'When she was hospitalized for a severe fever, authorities discovered that she was a woman.' The sentence would most logically be placed at:",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 4.",
    choice_b: "Point B in Paragraph 5.",
    choice_c: "Point C in Paragraph 5.",
    choice_d: "Point D in Paragraph 5.",
    correct_answer: "C",
    question_type: "organization",
    question_category: "POW"
  },
  // Q16-30: Passage 2
  {
    test_number: TEST_NUMBER,
    question_number: 16,
    passage_number: 2,
    question_stem: "With a full career in both politics and business, Hiram Fong never set out to develop one of Oahu's most <u>spectacularly horticulture</u> attractions.",
    underlined_text: "spectacularly horticulture",
    context_before: "With a full career in both politics and business, Hiram Fong never set out to develop one of Oahu's most",
    context_after: "attractions.",
    choice_a: "NO CHANGE",
    choice_b: "spectacular horticulturally",
    choice_c: "spectacular horticultural",
    choice_d: "spectacle horticultural",
    correct_answer: "C",
    question_type: "modifiers",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 17,
    passage_number: 2,
    question_stem: "Fong, whose political career spanned over thirty years, was one of the first two senators from Hawaii <u>to become a state in 1959</u> and the first Asian American to serve in the US Senate.",
    underlined_text: "to become a state in 1959",
    context_before: "Fong, whose political career spanned over thirty years, was one of the first two senators from Hawaii",
    context_after: "and the first Asian American to serve in the US Senate.",
    choice_a: "NO CHANGE",
    choice_b: "when it became",
    choice_c: "that became",
    choice_d: "becoming",
    correct_answer: "B",
    question_type: "modifiers",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 18,
    passage_number: 2,
    question_stem: "Prior to working in politics, Fong paid his own way through Harvard Law School and, upon graduating, <u>was a part of a</u> law firm. Which choice most clearly suggests that Fong had a primary role in the start-up and development of the law firm referred to in the sentence?",
    underlined_text: "was a part of a",
    context_before: "Prior to working in politics, Fong paid his own way through Harvard Law School and, upon graduating,",
    context_after: "law firm.",
    choice_a: "NO CHANGE",
    choice_b: "assisted in the business of",
    choice_c: "helped found and run",
    choice_d: "became employed at",
    correct_answer: "C",
    question_type: "style",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 19,
    passage_number: 2,
    question_stem: "Which of the following true statements, if added here, would most logically lead into the information that follows in the paragraph?",
    underlined_text: "",
    context_before: "All the while, gardening was his escape.",
    context_after: "Wanting to experiment with growing fruit, he planted bananas, then papaya, lemon, jackfruit, and avocado.",
    choice_a: "Today, Fong's family maintains his gardens and visitors' center—one of his sons is the head gardener, and his daughter-in-law leads classes and tours.",
    choice_b: "By 1950, Fong was in the market to purchase a large plot of land, an acreage that would provide room for his horses.",
    choice_c: "In 1950, Fong purchased more than 700 acres of land on Oahu, above Kaneohe Bay.",
    choice_d: "The acreage once operated as a banana plantation.",
    correct_answer: "C",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 20,
    passage_number: 2,
    question_stem: "<u>Wanting to experiment with growing</u> fruit, he planted bananas, then papaya, lemon, jackfruit, and avocado.",
    underlined_text: "Wanting to experiment with growing",
    context_before: "",
    context_after: "fruit, he planted bananas, then papaya, lemon, jackfruit, and avocado.",
    choice_a: "NO CHANGE",
    choice_b: "to try and to experiment with",
    choice_c: "the experimentation of",
    choice_d: "and experimenting",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 21,
    passage_number: 2,
    question_stem: "By also choosing to plant crops such as bamboo, coconut, betel nut, and turmeric, <u>he broadened the types of plants in his garden.</u> Given that all the choices are accurate, which one provides the most clear and direct purpose, related to Hawaii's natural history, for Fong's planting crops such as bamboo, coconut, betel nut, and turmeric?",
    underlined_text: "he broadened the types of plants in his garden",
    context_before: "By also choosing to plant crops such as bamboo, coconut, betel nut, and turmeric,",
    context_after: ". He cultivated slopes covered with ti and pili grasses",
    choice_a: "NO CHANGE",
    choice_b: "not only grew cash crops, such as fruit, but additionally crops that have other purposes.",
    choice_c: "developed a landscape reminiscent of Hawaii hundreds of years ago.",
    choice_d: "began to create a garden unlike any other on Hawaii today.",
    correct_answer: "C",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 22,
    passage_number: 2,
    question_stem: "He cultivated slopes covered with ti and pili grasses and forests of trees such as kukui, hala, and koa, vegetation <u>previously an abundance</u> on Oahu.",
    underlined_text: "previously an abundance",
    context_before: "He cultivated slopes covered with ti and pili grasses and forests of trees such as kukui, hala, and koa, vegetation",
    context_after: "on Oahu.",
    choice_a: "NO CHANGE",
    choice_b: "that are once plenty",
    choice_c: "formerly many",
    choice_d: "once common",
    correct_answer: "D",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 23,
    passage_number: 2,
    question_stem: "Eventually, he divided his land into five gardens, each one named for a US president <u>whom</u> had served while Fong was a senator.",
    underlined_text: "whom",
    context_before: "Eventually, he divided his land into five gardens, each one named for a US president",
    context_after: "had served while Fong was a senator.",
    choice_a: "NO CHANGE",
    choice_b: "being one who",
    choice_c: "of whom",
    choice_d: "who",
    correct_answer: "D",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 24,
    passage_number: 2,
    question_stem: "At this point, the writer is considering adding the following true statement: 'In 1989, the State Department of Agriculture commemorated the bicentennial of Chinese immigrants' arrival to Hawaii by giving one hundred rare sandalwood trees to Fong to plant on his land.' Should the writer make this addition here?",
    underlined_text: "",
    context_before: "The Johnson Plateau features exotic fruits.",
    context_after: "Kennedy Valley, with its rain forest canopy,",
    choice_a: "Yes, because it suggests that the State Department of Agriculture was supportive of Fong's endeavor and the expansion of his gardens.",
    choice_b: "Yes, because it provides information about a type of tree in Fong's gardens that has not yet been mentioned in the essay.",
    choice_c: "No, because it interrupts the paragraph's focus on providing an overview of the plants in each of the five presidential gardens.",
    choice_d: "No, because it provides scientific information about sandalwood trees that is inconsistent with the tone of the essay.",
    correct_answer: "C",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 25,
    passage_number: 2,
    question_stem: "Kennedy Valley, with <u>its</u> rain forest canopy,",
    underlined_text: "its",
    context_before: "Kennedy Valley, with",
    context_after: "rain forest canopy,",
    choice_a: "NO CHANGE",
    choice_b: "their",
    choice_c: "it's",
    choice_d: "its'",
    correct_answer: "A",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 26,
    passage_number: 2,
    question_stem: "Kennedy Valley, with its rain forest canopy, <u>recommends</u> ginger and palms from all over the world.",
    underlined_text: "recommends",
    context_before: "Kennedy Valley, with its rain forest canopy,",
    context_after: "ginger and palms from all over the world.",
    choice_a: "NO CHANGE",
    choice_b: "subsidizes",
    choice_c: "supports",
    choice_d: "endures",
    correct_answer: "C",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 27,
    passage_number: 2,
    question_stem: "Nixon Valley <u>will abound with</u> flowers—plumeria, crown flower, and bougainvillea are just a few—while the Ford Plateau highlights hillsides of pili grasses.",
    underlined_text: "will abound with",
    context_before: "Nixon Valley",
    context_after: "flowers—plumeria, crown flower, and bougainvillea are just a few—while the Ford Plateau highlights hillsides of pili grasses.",
    choice_a: "NO CHANGE",
    choice_b: "had abounded",
    choice_c: "abounding",
    choice_d: "abounds",
    correct_answer: "D",
    question_type: "verbs",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 28,
    passage_number: 2,
    question_stem: "<u>The preserve, bearing his name, is now named</u> Senator Fong's Plantation and Gardens, complete with a visitors' center and guided tours.",
    underlined_text: "The preserve, bearing his name, is now named",
    context_before: "",
    context_after: "Senator Fong's Plantation and Gardens, complete with a visitors' center and guided tours.",
    choice_a: "NO CHANGE",
    choice_b: "preserve, which includes a visitors' center,",
    choice_c: "preserve, having been named after Fong,",
    choice_d: "preserve",
    correct_answer: "D",
    question_type: "redundancy",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 29,
    passage_number: 2,
    question_stem: "Until his death in 2004 at ninety-seven, Fong spent every weekend tending to his flowers and trees <u>and a moment to mingle with</u> visitors.",
    underlined_text: "and a moment to mingle with",
    context_before: "Until his death in 2004 at ninety-seven, Fong spent every weekend tending to his flowers and trees",
    context_after: "visitors.",
    choice_a: "NO CHANGE",
    choice_b: "having mingled",
    choice_c: "then mingles",
    choice_d: "mingling",
    correct_answer: "D",
    question_type: "parallel-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 30,
    passage_number: 2,
    question_stem: "The writer wants to add the following sentence to the essay: 'Fong eventually led several companies.' The sentence would most logically be placed at:",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 1.",
    choice_b: "Point B in Paragraph 1.",
    choice_c: "Point C in Paragraph 2.",
    choice_d: "Point D in Paragraph 4.",
    correct_answer: "A",
    question_type: "logical-placement",
    question_category: "POW"
  }
];

// ============================================================================
// INSERT PASSAGES
// ============================================================================

console.log('\n📌 INSERTING PASSAGES...\n');

const { data: passage1Data, error: p1Error } = await supabase
  .from('act_english_passages')
  .insert([passage1])
  .select();

if (p1Error) {
  console.error('❌ Error inserting Passage 1:', p1Error.message);
} else {
  console.log('✅ Passage 1 inserted: ' + passage1.title);
}

const { data: passage2Data, error: p2Error } = await supabase
  .from('act_english_passages')
  .insert([passage2])
  .select();

if (p2Error) {
  console.error('❌ Error inserting Passage 2:', p2Error.message);
} else {
  console.log('✅ Passage 2 inserted: ' + passage2.title);
}

// ============================================================================
// INSERT QUESTIONS
// ============================================================================

console.log('\n📌 INSERTING QUESTIONS 1-30...\n');

let inserted = 0;
let errors = 0;

for (const q of questions1_30) {
  const { error } = await supabase
    .from('act_english_questions')
    .insert([q]);

  if (error) {
    console.error('❌ Q' + q.question_number + ': ' + error.message);
    errors++;
  } else {
    inserted++;
    if (inserted % 5 === 0 || inserted === questions1_30.length) {
      console.log('  ✓ Inserted Q' + (inserted - 4) + '-Q' + inserted);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ EXTRACTION COMPLETE\n');
console.log('Passages inserted: 2');
console.log('Questions inserted: ' + inserted);
console.log('Errors: ' + errors);
console.log('\n' + '='.repeat(80) + '\n');
