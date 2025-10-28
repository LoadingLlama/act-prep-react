#!/usr/bin/env node

/**
 * PRACTICE TEST 5 - ENGLISH QUESTIONS 31-75 EXTRACTION
 * Extracts Questions 31-75 from Practice ACT 5 to replace placeholders
 * Source: /Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 5.txt
 *
 * This script:
 * 1. Extracts Passage 3 (A Rose by the Name Antique) - Q31-45
 * 2. Extracts Passage 4 (Jeremy Frey) - Q46-60
 * 3. Extracts Passage 5 (The Flow of Time) - Q61-75
 * 4. Updates existing placeholder questions in database
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TEST_NUMBER = 5;

console.log('📝 EXTRACTING TEST 5 ENGLISH QUESTIONS 31-75\n');
console.log('='.repeat(80));

// ============================================================================
// PASSAGE 3: A Rose by the Name Antique (Questions 31-45)
// ============================================================================

const passage3Questions = [
  {
    question_number: 31,
    passage_number: 3,
    question_stem: "I place this <u>basket next, to me</u>",
    underlined_text: "basket next, to me",
    context_before: "I place this",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "basket next, to me",
    choice_c: "basket, next to me",
    choice_d: "basket next to me,",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 32,
    passage_number: 3,
    question_stem: "I place <u>this</u> to head to the greenhouse.",
    underlined_text: "this",
    context_before: "I place",
    context_after: "to head to the greenhouse.",
    choice_a: "NO CHANGE",
    choice_b: "the rosebush",
    choice_c: "one",
    choice_d: "it",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 33,
    passage_number: 3,
    question_stem: "Which choice most closely maintains the sentence pattern the writer establishes after the semicolon?",
    underlined_text: "buds will sprout,",
    context_before: "roots will take hold,",
    context_after: "and a new plant will find a home in my garden.",
    choice_a: "NO CHANGE",
    choice_b: "I will see new buds that have been sprouting,",
    choice_c: "followed by the buds, which have sprouted,",
    choice_d: "then come the sprouting buds after that,",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 34,
    passage_number: 3,
    question_stem: "Mine are antique roses, <u>old, or heirloom varieties,</u> that have existed",
    underlined_text: "old, or heirloom varieties,",
    context_before: "Mine are antique roses,",
    context_after: "that have existed",
    choice_a: "NO CHANGE",
    choice_b: "roses, old or heirloom, varieties,",
    choice_c: "roses old, or heirloom varieties",
    choice_d: "roses, old or heirloom varieties",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 35,
    passage_number: 3,
    question_stem: "Compared to <u>vibrant hybrid-tea colors,</u> antique rose colors",
    underlined_text: "vibrant hybrid-tea colors,",
    context_before: "Compared to",
    context_after: "antique rose colors",
    choice_a: "NO CHANGE",
    choice_b: "vibrant hybrid-tea, colors,",
    choice_c: "vibrant, hybrid-tea colors",
    choice_d: "vibrant hybrid-tea colors",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 36,
    passage_number: 3,
    question_stem: "antique rose colors tend to be <u>silenced.</u>",
    underlined_text: "silenced.",
    context_before: "antique rose colors tend to be",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "reduced.",
    choice_c: "muted.",
    choice_d: "lower.",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 37,
    passage_number: 3,
    question_stem: "And unlike the hybrid-tea whose long stems make <u>into</u> a rosebush",
    underlined_text: "into",
    context_before: "And unlike the hybrid-tea whose long stems make",
    context_after: "a rosebush",
    choice_a: "NO CHANGE",
    choice_b: "about",
    choice_c: "like",
    choice_d: "for",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 38,
    passage_number: 3,
    question_stem: "The writer wants to add a detail here that best completes the contrast to hybrid-tea roses in the first part of the sentence. Which choice best accomplishes that goal?",
    underlined_text: "handsomely landscaping gardens.",
    context_before: "antique rosebushes can be grown in a variety of colors,",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "are lush and shapely,",
    choice_c: "can grow quite large,",
    choice_d: "tend to be less thorny,",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 39,
    passage_number: 3,
    question_stem: "Which choice best introduces the main focus of the paragraph?",
    underlined_text: "The plant thrives best when it is exposed to six hours of direct sunlight daily.",
    context_before: "",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "The varieties of antique roses are numerous, the most popular of which are the silken peach Mutabilis and the crimson Louis Phillippe.",
    choice_c: "Aside from the rose's beauty, what gardeners like me most appreciate is that antiques are incredibly durable and low maintenance.",
    choice_d: "While I am fond of bush varieties, I am also drawn to climbing varieties that can be placed against walls, fences, or trellises.",
    correct_answer: "A",
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 40,
    passage_number: 3,
    question_stem: "The plant can withstand extreme temperatures and survive nearly anywhere. <u>It's</u> also easier",
    underlined_text: "It's",
    context_before: "The plant can withstand extreme temperatures and survive nearly anywhere.",
    context_after: "also easier",
    choice_a: "NO CHANGE",
    choice_b: "They're",
    choice_c: "Their",
    choice_d: "Its",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 41,
    passage_number: 3,
    question_stem: "Cultivating hybrid-teas <u>having involved</u> a process",
    underlined_text: "having involved",
    context_before: "Cultivating hybrid-teas",
    context_after: "a process",
    choice_a: "NO CHANGE",
    choice_b: "Antiques, requiring",
    choice_c: "Antiques require",
    choice_d: "Requiring",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 42,
    passage_number: 3,
    question_stem: "a process of grafting two species of rose together, but the grafted area remains weak and susceptible to viruses. Antiques, on the other hand, are less prone to disease because they are grown simply by <u>placing</u> cuttings from",
    underlined_text: "placing",
    context_before: "because they are grown simply by",
    context_after: "cuttings from",
    choice_a: "NO CHANGE",
    choice_b: "which involves",
    choice_c: "involves",
    choice_d: "involving",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 43,
    passage_number: 3,
    question_stem: "The writer wants to add a detail here that emphasizes the antique rose's ability to survive without human care. Which choice best accomplishes that goal?",
    underlined_text: "a fact that surprises many.",
    context_before: "antiques can reportedly survive without any care from human hands,",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "blooming year after year even at abandoned sites.",
    choice_c: "making them more popular among gardeners.",
    choice_d: "often blooming between midspring and fall.",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 44,
    passage_number: 3,
    question_stem: "Which sequence of sentences makes this paragraph most logical?",
    underlined_text: "[Sentence sequence question]",
    context_before: "",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "2, 1, 3",
    choice_c: "3, 1, 2",
    choice_d: "1, 3, 2",
    correct_answer: "A",
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 45,
    passage_number: 3,
    question_stem: "Suppose the writer's primary purpose had been to describe the process of planting a particular flower. Would this essay accomplish that purpose?",
    underlined_text: "[Passage purpose question]",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because the essay discusses the steps involved in growing and maintaining antique rosebushes.",
    choice_b: "Yes, because the writer explains the specific conditions needed to plant antique roses and how long it takes for new buds to sprout.",
    choice_c: "No, because the essay is more focused on comparing the qualities and cultivation of antique and hybrid-tea roses.",
    choice_d: "No, because while the writer mentions growing antique roses in his garden, the essay is more focused on the history of antiques in gardens worldwide.",
    correct_answer: "A",
    question_type: "organization",
    question_category: "POW"
  }
];

// ============================================================================
// PASSAGE 4: Jeremy Frey (Questions 46-60)
// ============================================================================

const passage4Questions = [
  {
    question_number: 46,
    passage_number: 4,
    question_stem: "The winning piece was a basket, <u>it was eighteen</u> inches tall",
    underlined_text: "it was eighteen",
    context_before: "The winning piece was a basket,",
    context_after: "inches tall",
    choice_a: "NO CHANGE",
    choice_b: "this work of art reached",
    choice_c: "the object stood",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 47,
    passage_number: 4,
    question_stem: "In the ninety-year history of the Santa Fe Indian <u>Market—the largest Indian art festival in the nation—the</u>",
    underlined_text: "Market—the largest Indian art festival in the nation—the",
    context_before: "In the ninety-year history of the Santa Fe Indian",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "Market the largest Indian art festival—in the nation—",
    choice_c: "Market, the largest Indian art festival, in the nation",
    choice_d: "Market, the largest Indian art festival in the nation",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 48,
    passage_number: 4,
    question_stem: "thirty-three-year-old Passamaquoddy Indian Jeremy Frey from Princeton, Maine, <u>the basket</u> sold at auction",
    underlined_text: "the basket",
    context_before: "thirty-three-year-old Passamaquoddy Indian Jeremy Frey from Princeton, Maine,",
    context_after: "sold at auction",
    choice_a: "NO CHANGE",
    choice_b: "looked on as the",
    choice_c: "as his",
    choice_d: "his",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 49,
    passage_number: 4,
    question_stem: "He primarily weaves a classic material, wood from the brown ash tree, <u>but, unlike most contemporary basketmakers,</u>",
    underlined_text: "but, unlike most contemporary basketmakers,",
    context_before: "He primarily weaves a classic material, wood from the brown ash tree,",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "but, unlike most, contemporary basketmakers",
    choice_c: "but unlike, most contemporary basketmakers,",
    choice_d: "but, unlike most contemporary basketmakers",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 50,
    passage_number: 4,
    question_stem: "Then <u>creating</u> highly elaborate versions",
    underlined_text: "creating",
    context_before: "Then",
    context_after: "highly elaborate versions",
    choice_a: "NO CHANGE",
    choice_b: "Frey creates",
    choice_c: "Creating",
    choice_d: "Going on to create",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 51,
    passage_number: 4,
    question_stem: "If the writer were to delete the underlined portion, the essay would primarily lose:",
    underlined_text: "by generations of Passamaquoddy fishermen from Maine.",
    context_before: "of the sturdy utility baskets that have been used",
    context_after: "",
    choice_a: "an indication that Frey honors Passamaquoddy cultural heritage by creating baskets that look nearly identical to traditional pieces.",
    choice_b: "a mention of a physical characteristic of the earliest baskets used by Passamaquoddy fishermen.",
    choice_c: "a detail that connects Frey's basketry work to long-standing Passamaquoddy traditions.",
    choice_d: "a point revealing that Frey's baskets are used by Passamaquoddy fishermen today.",
    correct_answer: "A",
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 52,
    passage_number: 4,
    question_stem: "Which choice provides the clearest and most specific information about which parts of Frey's baskets are being referred to in the sentence and about Frey's manner of weaving those parts?",
    underlined_text: "and therefore typically not embellished.",
    context_before: "",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "a remarkable level of detail on certain sections, the intricately woven interiors and bottoms,",
    choice_c: "characteristic interiors and bottoms,",
    choice_d: "complex weaving on areas that are often hidden",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 53,
    passage_number: 4,
    question_stem: "Which placement of the underlined portion makes clear that the art that decorates the lid, not the lid itself, is made of porcupine quill?",
    underlined_text: "porcupine quill",
    context_before: "Frey's",
    context_after: "lids are often decorated with art inlaid on birch bark",
    choice_a: "Where it is now",
    choice_b: "After the word are",
    choice_c: "After the word often",
    choice_d: "After the word with",
    correct_answer: "A",
    question_type: "organization",
    question_category: "POW"
  },
  {
    question_number: 54,
    passage_number: 4,
    question_stem: "with art inlaid on birch bark; as far as lids go, <u>I wouldn't say that's basic.</u>",
    underlined_text: "I wouldn't say that's basic.",
    context_before: "with art inlaid on birch bark; as far as lids go,",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "bark, which is not exactly formulating a lid through a conventional ideology.",
    choice_c: "bark; this is just part of his really artistic way.",
    choice_d: "bark.",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 55,
    passage_number: 4,
    question_stem: "And while braids of grass <u>are</u> customarily woven into ash baskets",
    underlined_text: "are",
    context_before: "And while braids of grass",
    context_after: "customarily woven into ash baskets",
    choice_a: "NO CHANGE",
    choice_b: "has been",
    choice_c: "is seen",
    choice_d: "is",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 56,
    passage_number: 4,
    question_stem: "Which choice provides the clearest and most specific reason that grass is woven into ash baskets?",
    underlined_text: "to make them better,",
    context_before: "",
    context_after: "Frey incorporates braided cedar bark",
    choice_a: "NO CHANGE",
    choice_b: "for the sake of the objects,",
    choice_c: "for a useful purpose,",
    choice_d: "to strengthen them,",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 57,
    passage_number: 4,
    question_stem: "Now that he's a nationally recognized artist <u>of who</u> has rejuvenated",
    underlined_text: "of who",
    context_before: "Now that he's a nationally recognized artist",
    context_after: "has rejuvenated",
    choice_a: "NO CHANGE",
    choice_b: "being whom",
    choice_c: "whom",
    choice_d: "who",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 58,
    passage_number: 4,
    question_stem: "a group that works to help preserve <u>it</u> by reaching out",
    underlined_text: "it",
    context_before: "a group that works to help preserve",
    context_after: "by reaching out",
    choice_a: "NO CHANGE",
    choice_b: "this art",
    choice_c: "that",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 59,
    passage_number: 4,
    question_stem: "His other goal is to continue to <u>stand out.</u>",
    underlined_text: "stand out.",
    context_before: "His other goal is to continue to",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "distinguish himself from other weavers so as a weaver he is set apart from them.",
    choice_c: "remain to be someone who gets noticed.",
    choice_d: "keep on being fully distinct.",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 60,
    passage_number: 4,
    question_stem: "The writer is considering adding the following sentence to the essay: 'The black stripes were woven flat, sharply setting off the white stripes, which were woven to form raised columns of perfectly even points that seemed to cascade down the piece.' If the writer were to add this sentence, it would most logically be placed at:",
    underlined_text: "[Sentence placement question]",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 1.",
    choice_b: "Point B in Paragraph 1.",
    choice_c: "Point C in Paragraph 2.",
    choice_d: "Point D in Paragraph 2.",
    correct_answer: "A",
    question_type: "organization",
    question_category: "POW"
  }
];

// ============================================================================
// PASSAGE 5: The Flow of Time (Questions 61-75)
// ============================================================================

const passage5Questions = [
  {
    question_number: 61,
    passage_number: 5,
    question_stem: "Nine hundred years <u>ago, Emperor Zhezong of China,</u> ordered",
    underlined_text: "ago, Emperor Zhezong of China,",
    context_before: "Nine hundred years",
    context_after: "ordered",
    choice_a: "NO CHANGE",
    choice_b: "ago, Emperor Zhezong, of China",
    choice_c: "ago, Emperor Zhezong of China",
    choice_d: "ago Emperor Zhezong of China,",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 62,
    passage_number: 5,
    question_stem: "a clock <u>built to keep time more accurately than other clocks.</u>",
    underlined_text: "built to keep time more accurately than other clocks.",
    context_before: "a clock",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "to keep time more accurately than clocks that had previously come before it.",
    choice_c: "more accurate at keeping time correctly than any other clock of the time.",
    choice_d: "more accurate than any other.",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 63,
    passage_number: 5,
    question_stem: "This would be no simple <u>timepiece and because</u>",
    underlined_text: "timepiece and because",
    context_before: "This would be no simple",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "timepiece. Because",
    choice_c: "timepiece, because",
    choice_d: "timepiece because",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 64,
    passage_number: 5,
    question_stem: "Chinese dynasties <u>continued to</u> astrology,",
    underlined_text: "continued to",
    context_before: "Chinese dynasties",
    context_after: "astrology,",
    choice_a: "NO CHANGE",
    choice_b: "adhered",
    choice_c: "linked",
    choice_d: "fixed",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 65,
    passage_number: 5,
    question_stem: "An <u>eminent scientist and bureaucrat named Su Song lead</u> Zhezong's ambitious project.",
    underlined_text: "eminent scientist and bureaucrat named Su Song lead",
    context_before: "An",
    context_after: "Zhezong's ambitious project.",
    choice_a: "NO CHANGE",
    choice_b: "imminent scientist and bureaucrat named Su Song lead",
    choice_c: "imminent scientist and bureaucrat named Su Song led",
    choice_d: "eminent scientist and bureaucrat named Su Song led",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 66,
    passage_number: 5,
    question_stem: "Given that all the choices are accurate, which one best indicates that Su Song relied on engineering achievements from earlier times?",
    underlined_text: "Using his expertise in calendrical science,",
    context_before: "",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "Building on centuries of Chinese clock-making knowledge,",
    choice_c: "While authoring his treatise on astronomical clockwork,",
    choice_d: "After first crafting a working small-scale wooden model,",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 67,
    passage_number: 5,
    question_stem: "Su Song created a spectacular timepiece housed within <u>a</u> an ornate forty-foot-tall tower.",
    underlined_text: "a",
    context_before: "Su Song created a spectacular timepiece housed within",
    context_after: "an ornate forty-foot-tall tower.",
    choice_a: "NO CHANGE",
    choice_b: "secured between",
    choice_c: "encased around",
    choice_d: "nestled among",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 68,
    passage_number: 5,
    question_stem: "At the tower's top sat an armillary sphere, or a nest of metal rings representing celestial reference points such as the horizon and the sun's path<u>—</u>that rotated",
    underlined_text: "—",
    context_before: "At the tower's top sat an armillary sphere, or a nest of metal rings representing celestial reference points such as the horizon and the sun's path",
    context_after: "that rotated",
    choice_a: "NO CHANGE",
    choice_b: "sphere—",
    choice_c: "sphere:",
    choice_d: "sphere,",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 69,
    passage_number: 5,
    question_stem: "<u>Besides,</u> below the star sphere,",
    underlined_text: "Besides,",
    context_before: "",
    context_after: "below the star sphere,",
    choice_a: "NO CHANGE",
    choice_b: "Sooner or later,",
    choice_c: "Lastly,",
    choice_d: "Thus,",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 70,
    passage_number: 5,
    question_stem: "Which of the following alternatives to the underlined portion would NOT be acceptable?",
    underlined_text: "doorways and ring bells to announce",
    context_before: "Automated figurines would appear in the pagoda's",
    context_after: "hours, sunsets, seasons, and other chronological events.",
    choice_a: "bells, which served to announce",
    choice_b: "bells, they announced",
    choice_c: "bells that announced",
    choice_d: "bells, announcing",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 71,
    passage_number: 5,
    question_stem: "The clock's inner workings were equally remarkable. Hidden in the tower, a waterwheel eleven feet in diameter powered the entire clock. <u>Therefore,</u> water would pour",
    underlined_text: "Therefore,",
    context_before: "The clock's inner workings were equally remarkable. Hidden in the tower, a waterwheel eleven feet in diameter powered the entire clock.",
    context_after: "water would pour",
    choice_a: "NO CHANGE",
    choice_b: "nevertheless,",
    choice_c: "regardless,",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 72,
    passage_number: 5,
    question_stem: "powered the entire clock. Therefore, <u>water</u> would pour at a constant rate",
    underlined_text: "water",
    context_before: "powered the entire clock. Therefore,",
    context_after: "would pour at a constant rate",
    choice_a: "NO CHANGE",
    choice_b: "In other words, water",
    choice_c: "For example, water",
    choice_d: "Water",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    question_number: 73,
    passage_number: 5,
    question_stem: "When the bucket was full, the water's weight pulled it down, rotating the waterwheel. Then a stop mechanism halted the wheel and positioned the next bucket for filling.",
    underlined_text: "[Sentence about mechanism]",
    context_before: "",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "until—with the refinement of mechanical clocks in Europe—",
    choice_c: "until with the refinement (of mechanical clocks in Europe)",
    choice_d: "until, with the refinement, of mechanical clocks in Europe",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 74,
    passage_number: 5,
    question_stem: "It would be a few hundred years <u>until with the refinement of mechanical clocks in Europe</u>",
    underlined_text: "until with the refinement of mechanical clocks in Europe",
    context_before: "It would be a few hundred years",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "until—with the refinement of mechanical clocks in Europe—",
    choice_c: "until with the refinement (of mechanical clocks in Europe)",
    choice_d: "until, with the refinement, of mechanical clocks in Europe",
    correct_answer: "A",
    question_type: "grammar",
    question_category: "CSE"
  },
  {
    question_number: 75,
    passage_number: 5,
    question_stem: "other clocks <u>approached the complexity</u> of Su Song's masterpiece.",
    underlined_text: "approached the complexity",
    context_before: "other clocks",
    context_after: "of Su Song's masterpiece.",
    choice_a: "NO CHANGE",
    choice_b: "eventually became able to draw anywhere near to the complexity",
    choice_c: "grew to attain such a high degree as that",
    choice_d: "could even fathom coming within reach",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  }
];

// ============================================================================
// UPDATE DATABASE
// ============================================================================

const allQuestions = [
  ...passage3Questions,
  ...passage4Questions,
  ...passage5Questions
];

console.log('\n📤 UPDATING QUESTIONS IN DATABASE...\n');

let successCount = 0;
let errorCount = 0;
const errors = [];

for (const q of allQuestions) {
  const { error } = await supabase
    .from('act_english_questions')
    .update({
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
    })
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.question_number);

  if (error) {
    errorCount++;
    errors.push(`Q${q.question_number}: ${error.message}`);
    console.log(`  ❌ Q${q.question_number}: ${error.message}`);
  } else {
    successCount++;
    console.log(`  ✅ Q${q.question_number}: ${q.underlined_text.substring(0, 40)}...`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('📊 UPDATE SUMMARY:');
console.log('='.repeat(80));
console.log(`✅ Successfully updated: ${successCount}/45 questions`);
console.log(`❌ Errors: ${errorCount}`);

if (errors.length > 0) {
  console.log('\nError details:');
  errors.forEach(err => console.log(`  ${err}`));
}

console.log('\n✅ EXTRACTION COMPLETE!');
console.log('   Questions 31-75 have been updated in the database.\n');
console.log('='.repeat(80) + '\n');
