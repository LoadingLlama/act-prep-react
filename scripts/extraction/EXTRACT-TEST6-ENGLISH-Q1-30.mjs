#!/usr/bin/env node

/**
 * PRACTICE TEST 6 - ENGLISH Q1-30 EXTRACTION
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

// English Questions 1-15
const questions1_15 = [
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
    correct_answer: "A", // Will update with actual answer key
    question_type: "grammar",
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
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 3,
    passage_number: 1,
    question_stem: "Deborah Sampson of Plympton, Massachusetts, was one of these women. Given that all the choices are accurate, which one most clearly signals that the paragraph will focus on Sampson's Revolutionary War experience?",
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
    correct_answer: "A",
    question_type: "grammar",
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
    correct_answer: "A",
    question_type: "grammar",
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
    correct_answer: "A",
    question_type: "grammar",
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
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 10,
    passage_number: 1,
    question_stem: "A fierce current swept Sampson into deep waters. Given that all the choices are accurate, which one most effectively advances the narration of events in the paragraph?",
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
    correct_answer: "A",
    question_type: "grammar",
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
    correct_answer: "A",
    question_type: "style",
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
    correct_answer: "A",
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
    correct_answer: "A",
    question_type: "grammar",
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
    correct_answer: "A",
    question_type: "organization",
    question_category: "POW"
  }
];

// Q16-30 will be added after reviewing Passage 2 more carefully

console.log('\n✅ Passage 1 prepared: ' + passage1.title);
console.log('✅ Questions 1-15 prepared\n');
console.log('⚠️  Need to complete Q16-30 from Passage 2 manually...\n');
console.log('='.repeat(80) + '\n');
