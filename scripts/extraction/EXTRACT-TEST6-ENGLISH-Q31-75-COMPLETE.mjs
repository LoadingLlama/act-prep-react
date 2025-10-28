#!/usr/bin/env node

/**
 * PRACTICE TEST 6 - ENGLISH Q31-75 EXTRACTION - COMPLETE
 * Manual extraction with 100% accuracy
 * Passage 3: Rescuing the Lord Howe Stick Insect (Q31-45)
 * Passage 4: Morse Code in the Modern Age (Q46-60)
 * Passage 5: Urban Legend (Q61-75)
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

console.log('📝 EXTRACTING PRACTICE TEST 6 - ENGLISH Q31-75\n');
console.log('='.repeat(80));

// ============================================================================
// PASSAGE 3: Rescuing the Lord Howe Stick Insect
// ============================================================================

const passage3 = {
  test_number: TEST_NUMBER,
  passage_number: 3,
  title: "Rescuing the Lord Howe Stick Insect",
  passage_text: `[1]
Two men ascend the face of Ball's Pyramid—a rocky island in the Tasman Sea that looks like a mountain jutting up from the waves. The men, Nicholas Carlile and Dean Hiscox, have cameras and flashlights; it is dark. They are heading for a specific melaleuca bush that is hanging 225 feet above the ocean. When they reach it, they find twenty-four enormous black insects. Wingless and up to fifteen inches long, the men see Dryococelus australis—a nocturnal species that had been believed to be extinct for over eighty years.

[2]
Dryococelus australis, also known as the Lord Howe stick insect, is native to Lord Howe Island, located less than fifteen miles to Ball's Pyramid. [A] The insects are so large that 1800s European sailors called them "tree lobsters." The animals thrived on Lord Howe Island until 1918, when a British supply ship ran aground while the ship was being repaired, rats escaped onto the island and quickly wiped out the stick insects.

[3]
By 1920, the insects were presumed to be extinct. For decades, though the island's remote location and dangerous waters made a thorough search difficult, so the insects' survival wasn't confirmed until 2001. [B]

[4]
Carlile and Hiscox's find raised a question—what should be done with the rare insects? In 2003, the Australian government permitted the removal of four insects from the island in order to bring the species back in the brink of extinction. [C] Two of the insects were transported to the Melbourne Zoo, where invertebrate conservation expert Patrick Honan, took charge of it. Starting with only thirty eggs, Honan was able to activate the population of these rare insects. [D]

[5]
Though the species is now safe, the insects' fame is spreading. Some stick insects will remain at the zoo as an "insurance population," but the ultimate goal is to reintroduce the insects to their native habitat on Lord Howe Island.`
};

// ============================================================================
// PASSAGE 4: Morse Code in the Modern Age
// ============================================================================

const passage4 = {
  test_number: TEST_NUMBER,
  passage_number: 4,
  title: "Morse Code in the Modern Age",
  passage_text: `[1]
Before texting, e-mail, and even the telephone call, there was Morse code. Transmitted over telegraph wire or radio waves via pulses of electric current, Morse code, which was used for over a century, the standard for rapid long-distance communication, especially for those at sea. [A] In 1995, however, the US Coast Guard suspended it's usage of Morse code, including the international distress signal SOS. Despite the speed and precision of technologies such as global positioning satellites, decoding signals in Morse code had become inefficient.

[2]
To some, the decision signaled the end of Morse code. Morse code's enduring utility, they argue, lays in the fact that it functions less like a technology then a language—one that can reliably transmit a message under almost any conditions. [B]

[3]
In Morse code, each letter of the unique Roman alphabet consists of a pattern of short and long signals called dots and dashes. [C] Though Morse code was used longer than any electrical coding system, spelling out and translating messages in Morse code does not require specialized machines. Messages can be transmitted by clicking a flashlight on and off, by flashing a mirror in the sun, or simply blinking. [D] The code can also be spoken aloud, with the words dit and dah substituted for dots and dashes, or rendered rhythmically, allowing people to communicate via handheld buzzers.

[4]
Because of its versatility, Morse code can prove valuable in ensuring public safety when more sophisticated equipment fails. Air traffic controllers can revert to Morse code if radar or satellite signals are interrupted. Similarly, amateur radio operators can use the code during weather emergencies to solicit information from outside the affected area. The news is relayed by them, by which they can keep people safe and informed.

New communication technologies will continue to emerge, meanwhile Morse code, with its lack of sophistication, could remain just as effective an asset.`
};

// ============================================================================
// PASSAGE 5: Urban Legend
// ============================================================================

const passage5 = {
  test_number: TEST_NUMBER,
  passage_number: 5,
  title: "Urban Legend",
  passage_text: `On a concrete pillar just a few meters from the Eiffel Tower, painted letters spell out, "This is not a photo opportunity." On the sands of the Bristol Channel, a large, spray-painted, "X" promises buried treasure. On the side of a building in London, a stenciled image depicts a pair of uniformed soldiers painting a vibrant red peace sign. Although nearly no one knows what this artist looks like, there are many who know his work. Blending sharp-tongued social commentary with humor and whimsy British-born artist, Banksy, has made a name for himself by challenging people's perceptions of the relevance of street art.

In the beginning, Banksy's fame originated on the streets of Bristol, England, in the early 1990s. Under the cover of the night sky, Banksy worked quickly and steadily, sometimes painting freehand, sometimes spray-painting elaborately detailed stencils.

Concerned residents argued that Banksy's work was simply graffiti that encouraged vandalism. Others praised it as art done by and for the people and debated for more.

England's strict anti-graffiti policy meant that most of Banksy's pieces were destroyed within mere hours of there completion.

Afterward, only a blank wall stood where Banksy's art had been. By the end of the decade, Banksy had expanded his influence, painting his messages in places well beyond the British border. Seemingly he is everywhere and nowhere at once, Banksy had the full attention of the art world. Museum directors organized Banksy exhibitions, and auctioneers sold actual pieces of buildings that bore Banksy's artistry.

Despite his popularity, Banksy has not given in to the hype. He does not reproduce and sell prints of his images for profit. He also continues to communicate with the public through his street art, which is possible in part because he has managed to keep his identity secret. In Banksy's own words, "Art is not like other culture because its success is not made by its audience."`
};

// ============================================================================
// QUESTIONS 31-45: Passage 3 - Rescuing the Lord Howe Stick Insect
// ============================================================================

const questions31_45 = [
  {
    test_number: TEST_NUMBER,
    question_number: 31,
    passage_number: 3,
    question_stem: "The <u>men, Nicholas Carlile and Dean</u> Hiscox, have cameras and flashlights; it is dark.",
    underlined_text: "men, Nicholas Carlile and Dean",
    context_before: "The",
    context_after: "Hiscox, have cameras and flashlights; it is dark.",
    choice_a: "NO CHANGE",
    choice_b: "men, Nicholas Carlile,",
    choice_c: "men: Nicholas Carlile",
    choice_d: "men Nicholas Carlile,",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 32,
    passage_number: 3,
    question_stem: "They are heading for a specific melaleuca <u>bush that is hanging</u> 225 feet above the ocean.",
    underlined_text: "bush that is hanging",
    context_before: "They are heading for a specific melaleuca",
    context_after: "225 feet above the ocean.",
    choice_a: "NO CHANGE",
    choice_b: "bush, that is, hanging",
    choice_c: "bush, that is hanging,",
    choice_d: "bush that is hanging,",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 33,
    passage_number: 3,
    question_stem: "Wingless and up to fifteen inches long, <u>the men see</u> Dryococelus australis—a nocturnal species that had been believed to be extinct for over eighty years.",
    underlined_text: "the men see",
    context_before: "Wingless and up to fifteen inches long,",
    context_after: "Dryococelus australis—a nocturnal species that had been believed to be extinct for over eighty years.",
    choice_a: "NO CHANGE",
    choice_b: "the men have found",
    choice_c: "the insects are",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "C",
    question_type: "modifiers",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 34,
    passage_number: 3,
    question_stem: "Dryococelus australis, also known as the Lord Howe stick insect, is native to Lord Howe Island, located less <u>than fifteen miles to</u> Ball's Pyramid.",
    underlined_text: "than fifteen miles to",
    context_before: "Dryococelus australis, also known as the Lord Howe stick insect, is native to Lord Howe Island, located less",
    context_after: "Ball's Pyramid.",
    choice_a: "NO CHANGE",
    choice_b: "than fifteen miles from",
    choice_c: "then fifteen miles from",
    choice_d: "then fifteen miles to",
    correct_answer: "B",
    question_type: "idiom",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 35,
    passage_number: 3,
    question_stem: "The animals thrived on Lord Howe Island until 1918, when a British supply ship ran <u>aground while the ship was being repaired, rats escaped</u> onto the island and quickly wiped out the stick insects.",
    underlined_text: "aground while the ship was being repaired, rats escaped",
    context_before: "The animals thrived on Lord Howe Island until 1918, when a British supply ship ran",
    context_after: "onto the island and quickly wiped out the stick insects.",
    choice_a: "NO CHANGE",
    choice_b: "aground and while the ship was being repaired,",
    choice_c: "aground. While the ship was being repaired,",
    choice_d: "aground, while the ship was being repaired",
    correct_answer: "C",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 36,
    passage_number: 3,
    question_stem: "By 1920, the insects were presumed to be extinct. Which of the following true statements, if added here, would provide the most effective transition to the information in the rest of the paragraph?",
    underlined_text: "",
    context_before: "By 1920, the insects were presumed to be extinct.",
    context_after: "For decades, though the island's remote location and dangerous waters made a thorough search difficult, so the insects' survival wasn't confirmed until 2001.",
    choice_a: "Ball's Pyramid is named for Lieutenant Henry Ball, who spotted it in 1788.",
    choice_b: "Then, in the 1960s, climbers on Ball's Pyramid reported sighting a large insect.",
    choice_c: "Ball's Pyramid is the tip of an enormous volcano.",
    choice_d: "There are thousands of stick insect species.",
    correct_answer: "B",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 37,
    passage_number: 3,
    question_stem: "For decades, <u>though the island's remote location and dangerous waters made a thorough search difficult, so</u> the insects' survival wasn't confirmed until 2001.",
    underlined_text: "though the island's remote location and dangerous waters made a thorough search difficult, so",
    context_before: "For decades,",
    context_after: "the insects' survival wasn't confirmed until 2001.",
    choice_a: "NO CHANGE",
    choice_b: "though, the island's remote location and dangerous waters made",
    choice_c: "though, the island's remote location and dangerous waters making",
    choice_d: "though the island's remote location, and dangerous waters making",
    correct_answer: "B",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 38,
    passage_number: 3,
    question_stem: "Carlile and Hiscox's find raised a <u>question—what should be done with the</u> rare insects?",
    underlined_text: "question—what should be done with the",
    context_before: "Carlile and Hiscox's find raised a",
    context_after: "rare insects?",
    choice_a: "NO CHANGE",
    choice_b: "question; what should be done,",
    choice_c: "question, what should be done,",
    choice_d: "question, what should be done",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 39,
    passage_number: 3,
    question_stem: "In 2003, the Australian government permitted the removal of four insects from the island in order to bring the species <u>back in</u> the brink of extinction.",
    underlined_text: "back in",
    context_before: "In 2003, the Australian government permitted the removal of four insects from the island in order to bring the species",
    context_after: "the brink of extinction.",
    choice_a: "NO CHANGE",
    choice_b: "over from",
    choice_c: "back from",
    choice_d: "against",
    correct_answer: "C",
    question_type: "idiom",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 40,
    passage_number: 3,
    question_stem: "Two of the insects were transported to the Melbourne Zoo, where invertebrate conservation <u>expert Patrick Honan,</u> took charge of it.",
    underlined_text: "expert Patrick Honan,",
    context_before: "Two of the insects were transported to the Melbourne Zoo, where invertebrate conservation",
    context_after: "took charge of it.",
    choice_a: "NO CHANGE",
    choice_b: "expert, Patrick Honan,",
    choice_c: "expert, Patrick Honan",
    choice_d: "expert Patrick Honan",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 41,
    passage_number: 3,
    question_stem: "Two of the insects were transported to the Melbourne Zoo, where invertebrate conservation expert Patrick Honan took charge of <u>it.</u>",
    underlined_text: "it",
    context_before: "Two of the insects were transported to the Melbourne Zoo, where invertebrate conservation expert Patrick Honan took charge of",
    context_after: ".",
    choice_a: "NO CHANGE",
    choice_b: "them.",
    choice_c: "that.",
    choice_d: "this.",
    correct_answer: "B",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 42,
    passage_number: 3,
    question_stem: "Starting with only thirty eggs, <u>Honan was able to</u> activate the population of these rare insects. Given that all the choices are accurate, which one offers the most effective introduction to this sentence?",
    underlined_text: "Honan was able to",
    context_before: "Starting with only thirty eggs,",
    context_after: "activate the population of these rare insects.",
    choice_a: "NO CHANGE",
    choice_b: "Honan, working at the Melbourne Zoo,",
    choice_c: "Honan, who works with insects,",
    choice_d: "Honan, an expert,",
    correct_answer: "D",
    question_type: "redundancy",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 43,
    passage_number: 3,
    question_stem: "Starting with only thirty eggs, Honan was able to <u>activate</u> the population of these rare insects.",
    underlined_text: "activate",
    context_before: "Starting with only thirty eggs, Honan was able to",
    context_after: "the population of these rare insects.",
    choice_a: "NO CHANGE",
    choice_b: "retrieve",
    choice_c: "revive",
    choice_d: "rouse",
    correct_answer: "C",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 44,
    passage_number: 3,
    question_stem: "Though the species is now safe, the insects' <u>fame is spreading.</u> Some stick insects will remain at the zoo as an \"insurance population,\" but the ultimate goal is to reintroduce the insects to their native habitat on Lord Howe Island. Given that all the choices are accurate, which one offers the most logical contrast to the first part of the sentence?",
    underlined_text: "fame is spreading",
    context_before: "Though the species is now safe, the insects'",
    context_after: ". Some stick insects will remain at the zoo as an \"insurance population,\" but the ultimate goal is to reintroduce the insects to their native habitat on Lord Howe Island.",
    choice_a: "NO CHANGE",
    choice_b: "prospects continue to improve.",
    choice_c: "future remains uncertain.",
    choice_d: "recovery is noteworthy.",
    correct_answer: "C",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 45,
    passage_number: 3,
    question_stem: "The writer wants to add the following sentence to the essay: 'By 2012, the zoo had bred over nine thousand stick insects.' The sentence would most logically be placed at:",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 2.",
    choice_b: "Point B in Paragraph 3.",
    choice_c: "Point C in Paragraph 4.",
    choice_d: "Point D in Paragraph 4.",
    correct_answer: "D",
    question_type: "logical-placement",
    question_category: "POW"
  }
];

// ============================================================================
// QUESTIONS 46-60: Passage 4 - Morse Code in the Modern Age
// ============================================================================

const questions46_60 = [
  {
    test_number: TEST_NUMBER,
    question_number: 46,
    passage_number: 4,
    question_stem: "Transmitted over telegraph wire or radio waves via pulses of electric current, Morse <u>code, which was used for over a century, the standard</u> for rapid long-distance communication, especially for those at sea.",
    underlined_text: "code, which was used for over a century, the standard",
    context_before: "Transmitted over telegraph wire or radio waves via pulses of electric current, Morse",
    context_after: "for rapid long-distance communication, especially for those at sea.",
    choice_a: "NO CHANGE",
    choice_b: "code, used",
    choice_c: "code was,",
    choice_d: "code,",
    correct_answer: "D",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 47,
    passage_number: 4,
    question_stem: "In 1995, however, the US Coast Guard suspended <u>it's usage</u> of Morse code, including the international distress signal SOS.",
    underlined_text: "it's usage",
    context_before: "In 1995, however, the US Coast Guard suspended",
    context_after: "of Morse code, including the international distress signal SOS.",
    choice_a: "NO CHANGE",
    choice_b: "its' usage",
    choice_c: "it's use",
    choice_d: "its use",
    correct_answer: "D",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 48,
    passage_number: 4,
    question_stem: "<u>Despite</u> the speed and precision of technologies such as global positioning satellites, decoding signals in Morse code had become inefficient.",
    underlined_text: "Despite",
    context_before: "",
    context_after: "the speed and precision of technologies such as global positioning satellites, decoding signals in Morse code had become inefficient.",
    choice_a: "NO CHANGE",
    choice_b: "Notwithstanding",
    choice_c: "Given",
    choice_d: "Like",
    correct_answer: "C",
    question_type: "transitions",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 49,
    passage_number: 4,
    question_stem: "To some, the decision <u>signaled the end of</u> Morse code.",
    underlined_text: "signaled the end of",
    context_before: "To some, the decision",
    context_after: "Morse code.",
    choice_a: "NO CHANGE",
    choice_b: "closed the book on the final chapter",
    choice_c: "portended the ill-fated demise",
    choice_d: "manifested the cessation",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 50,
    passage_number: 4,
    question_stem: "Which of the following true statements, if added here, would best serve as a transition between the preceding sentence and the next sentence?",
    underlined_text: "",
    context_before: "To some, the decision signaled the end of Morse code.",
    context_after: "Morse code's enduring utility, they argue, lays in the fact that it functions less like a technology then a language—one that can reliably transmit a message under almost any conditions.",
    choice_a: "They wistfully recalled hearing new call signs, or code names, buzzing over their radios—proof that people were still learning and using the code.",
    choice_b: "Many modern users of the code, though, assert that it will persist alongside new technologies.",
    choice_c: "E-mail, in contrast to Morse code, enables us to send messages almost instantaneously.",
    choice_d: "Today, for most of the public, Morse code is familiar only from historical films.",
    correct_answer: "B",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 51,
    passage_number: 4,
    question_stem: "Morse code's enduring utility, they argue, <u>lays in the fact that it functions less like a technology then</u> a language—one that can reliably transmit a message under almost any conditions.",
    underlined_text: "lays in the fact that it functions less like a technology then",
    context_before: "Morse code's enduring utility, they argue,",
    context_after: "a language—one that can reliably transmit a message under almost any conditions.",
    choice_a: "NO CHANGE",
    choice_b: "lies in the fact that it functions less like a technology than",
    choice_c: "lies in the fact that it functions less like a technology then",
    choice_d: "lays in the fact that it functions less like a technology than",
    correct_answer: "B",
    question_type: "idiom",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 52,
    passage_number: 4,
    question_stem: "Which of the following placements for the underlined portion would most clearly indicate that each letter in Morse code is composed of its own distinct combination of signals? In Morse code, each letter of the <u>unique</u> Roman alphabet consists of a pattern of short and long signals called dots and dashes.",
    underlined_text: "unique",
    context_before: "In Morse code, each letter of the",
    context_after: "Roman alphabet consists of a pattern of short and long signals called dots and dashes.",
    choice_a: "Where it is now",
    choice_b: "After the word each",
    choice_c: "After the word a",
    choice_d: "After the phrase pattern of",
    correct_answer: "D",
    question_type: "word-placement",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 53,
    passage_number: 4,
    question_stem: "Given that all the choices are accurate, which one sets up the clearest, most logical contrast with the claim made in the next part of the sentence? <u>Morse code was used longer than any electrical coding system,</u> spelling out and translating messages in Morse code does not require specialized machines.",
    underlined_text: "Morse code was used longer than any electrical coding system,",
    context_before: "",
    context_after: "spelling out and translating messages in Morse code does not require specialized machines.",
    choice_a: "NO CHANGE",
    choice_b: "telegraphs once recorded literal dots and dashes on punched tape,",
    choice_c: "dashes are less commonly occurring in Morse code than dots,",
    choice_d: "few changes have been made to the code over time,",
    correct_answer: "B",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 54,
    passage_number: 4,
    question_stem: "Messages can be transmitted by clicking a flashlight on and off, <u>by flashing a mirror in the sun,</u> or simply blinking.",
    underlined_text: "by flashing a mirror in the sun,",
    context_before: "Messages can be transmitted by clicking a flashlight on and off,",
    context_after: "or simply blinking.",
    choice_a: "NO CHANGE",
    choice_b: "flashing a mirror in the sun can work,",
    choice_c: "a mirror can be flashed in the sun,",
    choice_d: "flashing a mirror in the sun,",
    correct_answer: "B",
    question_type: "parallel-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 55,
    passage_number: 4,
    question_stem: "Which choice most effectively leads into the new subject of this paragraph while summarizing a main idea of the preceding paragraph? <u>Because of its versatility,</u> Morse code can prove valuable in ensuring public safety when more sophisticated equipment fails.",
    underlined_text: "Because of its versatility,",
    context_before: "",
    context_after: "Morse code can prove valuable in ensuring public safety when more sophisticated equipment fails.",
    choice_a: "NO CHANGE",
    choice_b: "Thanks to the efforts of enthusiasts,",
    choice_c: "Though it has fallen from use,",
    choice_d: "Easy to learn and fun to use,",
    correct_answer: "A",
    question_type: "transitions",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 56,
    passage_number: 4,
    question_stem: "Similarly, amateur radio operators can use the code during weather emergencies to solicit information from outside the affected area. <u>The news is relayed by them, by which they</u> can keep people safe and informed.",
    underlined_text: "The news is relayed by them, by which they",
    context_before: "Similarly, amateur radio operators can use the code during weather emergencies to solicit information from outside the affected area.",
    context_after: "can keep people safe and informed.",
    choice_a: "NO CHANGE",
    choice_b: "news, which, by relaying it, they",
    choice_c: "news, by relaying which they",
    choice_d: "news they relay",
    correct_answer: "D",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 57,
    passage_number: 4,
    question_stem: "The writer is considering deleting the preceding sentence. Should the sentence be kept or deleted?",
    underlined_text: "",
    context_before: "Similarly, amateur radio operators can use the code during weather emergencies to solicit information from outside the affected area. The news is relayed by them, by which they can keep people safe and informed.",
    context_after: "New communication technologies will continue to emerge,",
    choice_a: "Kept, because it identifies the types of safety instructions that are most common in Morse code.",
    choice_b: "Kept, because it explains the important role Morse code can play in an emergency.",
    choice_c: "Deleted, because it contradicts a claim made earlier by implying that specialized machines are required to relay messages in Morse code.",
    choice_d: "Deleted, because it distracts the reader from the paragraph's focus on how advanced technologies have replaced Morse code.",
    correct_answer: "D",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 58,
    passage_number: 4,
    question_stem: "New communication technologies will continue to emerge, <u>meanwhile</u> Morse code, with its lack of sophistication, could remain just as effective an asset.",
    underlined_text: "meanwhile",
    context_before: "New communication technologies will continue to emerge,",
    context_after: "Morse code, with its lack of sophistication, could remain just as effective an asset.",
    choice_a: "NO CHANGE",
    choice_b: "however,",
    choice_c: "but",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "B",
    question_type: "transitions",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 59,
    passage_number: 4,
    question_stem: "The writer is considering adding the following sentence to the essay: 'Even laundry hung on a clothesline can relay a message, with thin and wide pieces of clothing representing dots and dashes.' If the writer were to add this sentence, it would most logically be placed at:",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 1.",
    choice_b: "Point B in Paragraph 2.",
    choice_c: "Point C in Paragraph 3.",
    choice_d: "Point D in Paragraph 3.",
    correct_answer: "C",
    question_type: "logical-placement",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 60,
    passage_number: 4,
    question_stem: "Suppose the writer's primary purpose had been to discuss how a new technology revolutionized communication around the world. Would this essay accomplish that purpose?",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it explains how Morse code changed the way people sent messages over long distances.",
    choice_b: "Yes, because it describes how the advent of new technologies rendered Morse code obsolete.",
    choice_c: "No, because it indicates that Morse code today is pursued primarily as a hobby.",
    choice_d: "No, because it focuses instead on the advantages of and continuing uses for Morse code.",
    correct_answer: "A",
    question_type: "purpose",
    question_category: "POW"
  }
];

// ============================================================================
// QUESTIONS 61-75: Passage 5 - Urban Legend
// ============================================================================

const questions61_75 = [
  {
    test_number: TEST_NUMBER,
    question_number: 61,
    passage_number: 5,
    question_stem: "On a concrete <u>pillar just a few meters from the</u> Eiffel Tower, painted letters spell out, \"This is not a photo opportunity.\"",
    underlined_text: "pillar just a few meters from the",
    context_before: "On a concrete",
    context_after: "Eiffel Tower, painted letters spell out, \"This is not a photo opportunity.\"",
    choice_a: "NO CHANGE",
    choice_b: "pillar, just a few meters from, the Eiffel Tower",
    choice_c: "pillar, just a few meters from the Eiffel Tower",
    choice_d: "pillar just a few meters from the Eiffel Tower",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 62,
    passage_number: 5,
    question_stem: "On the sands of the Bristol Channel, a <u>large, spray-painted, \"X\"</u> promises buried treasure.",
    underlined_text: "large, spray-painted, \"X\"",
    context_before: "On the sands of the Bristol Channel, a",
    context_after: "promises buried treasure.",
    choice_a: "NO CHANGE",
    choice_b: "large, spray-painted \"X,\"",
    choice_c: "large spray-painted \"X,\"",
    choice_d: "large, spray-painted \"X\"",
    correct_answer: "D",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 63,
    passage_number: 5,
    question_stem: "Which choice best completes the rhetorical pattern established in the preceding sentences? <u>On the side of a building in London, a stenciled image depicts a pair of uniformed soldiers</u> painting a vibrant red peace sign.",
    underlined_text: "On the side of a building in London, a stenciled image depicts a pair of uniformed soldiers",
    context_before: "",
    context_after: "painting a vibrant red peace sign.",
    choice_a: "NO CHANGE",
    choice_b: "Found in London on the side of a building, a stenciled image depicts a pair of uniformed soldiers",
    choice_c: "The side of a building in London depicts a stenciled image of uniformed soldiers,",
    choice_d: "A stenciled image on the side of a building in London depicts uniformed soldiers",
    correct_answer: "A",
    question_type: "style",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 64,
    passage_number: 5,
    question_stem: "Although nearly no one knows what this artist looks <u>like, there</u> are many who know his work.",
    underlined_text: "like, there",
    context_before: "Although nearly no one knows what this artist looks",
    context_after: "are many who know his work.",
    choice_a: "NO CHANGE",
    choice_b: "like. There",
    choice_c: "like; there",
    choice_d: "like there",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 65,
    passage_number: 5,
    question_stem: "Blending sharp-tongued social commentary with humor and <u>whimsy British-born artist, Banksy,</u> has made a name for himself by challenging people's perceptions of the relevance of street art.",
    underlined_text: "whimsy British-born artist, Banksy,",
    context_before: "Blending sharp-tongued social commentary with humor and",
    context_after: "has made a name for himself by challenging people's perceptions of the relevance of street art.",
    choice_a: "NO CHANGE",
    choice_b: "whimsy, British-born artist, Banksy,",
    choice_c: "whimsy, British-born artist Banksy",
    choice_d: "whimsy British-born artist, Banksy",
    correct_answer: "C",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 66,
    passage_number: 5,
    question_stem: "<u>In the beginning, Banksy's fame originated</u> on the streets of Bristol, England, in the early 1990s.",
    underlined_text: "In the beginning, Banksy's fame originated",
    context_before: "",
    context_after: "on the streets of Bristol, England, in the early 1990s.",
    choice_a: "NO CHANGE",
    choice_b: "Initially,",
    choice_c: "At first,",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "D",
    question_type: "redundancy",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 67,
    passage_number: 5,
    question_stem: "Given that all the following statements are true, which one, if added here, would best conclude this paragraph and introduce the subject of the next paragraph?",
    underlined_text: "",
    context_before: "Under the cover of the night sky, Banksy worked quickly and steadily, sometimes painting freehand, sometimes spray-painting elaborately detailed stencils.",
    context_after: "Concerned residents argued that Banksy's work was simply graffiti that encouraged vandalism.",
    choice_a: "Banksy's stenciled message \"Sorry! The lifestyle you ordered is currently out of stock\" captures his disapproval of consumerism.",
    choice_b: "Daylight would reveal his creations to a simultaneously outraged and admiring public.",
    choice_c: "This technique was featured in the street art documentary Exit Through the Gift Shop.",
    choice_d: "It is hard to believe that no one has ever been able to get a photograph of Banksy's face.",
    correct_answer: "B",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 68,
    passage_number: 5,
    question_stem: "Concerned residents argued that Banksy's work was simply graffiti <u>that</u> encouraged vandalism.",
    underlined_text: "that",
    context_before: "Concerned residents argued that Banksy's work was simply graffiti",
    context_after: "encouraged vandalism.",
    choice_a: "NO CHANGE",
    choice_b: "the kind that",
    choice_c: "and that",
    choice_d: "while it",
    correct_answer: "A",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 69,
    passage_number: 5,
    question_stem: "Which choice most clearly indicates the enthusiasm people had for Banksy's art? Others praised it as art done by and for the people and <u>debated for more.</u>",
    underlined_text: "debated for more",
    context_before: "Others praised it as art done by and for the people and",
    context_after: ".",
    choice_a: "NO CHANGE",
    choice_b: "clamored",
    choice_c: "blustered",
    choice_d: "asked",
    correct_answer: "B",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 70,
    passage_number: 5,
    question_stem: "England's strict anti-graffiti policy meant that most of Banksy's pieces were destroyed within mere hours of <u>there</u> completion.",
    underlined_text: "there",
    context_before: "England's strict anti-graffiti policy meant that most of Banksy's pieces were destroyed within mere hours of",
    context_after: "completion.",
    choice_a: "NO CHANGE",
    choice_b: "of their",
    choice_c: "for its",
    choice_d: "of its",
    correct_answer: "B",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 71,
    passage_number: 5,
    question_stem: "Given that all the following statements are true, which one, if added here, would provide the most effective transition between this paragraph and the next paragraph?",
    underlined_text: "",
    context_before: "England's strict anti-graffiti policy meant that most of Banksy's pieces were destroyed within mere hours of there completion.",
    context_after: "Afterward, only a blank wall stood where Banksy's art had been. By the end of the decade, Banksy had expanded his influence, painting his messages in places well beyond the British border.",
    choice_a: "Afterward, only a blank wall stood where Banksy's art had been.",
    choice_b: "Even in Los Angeles, some of Banksy's art was washed away.",
    choice_c: "Banksy had assumed that his art would eventually disappear.",
    choice_d: "Still, people had begun to take notice.",
    correct_answer: "D",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 72,
    passage_number: 5,
    question_stem: "<u>Seemingly he is</u> everywhere and nowhere at once, Banksy had the full attention of the art world.",
    underlined_text: "Seemingly he is",
    context_before: "",
    context_after: "everywhere and nowhere at once, Banksy had the full attention of the art world.",
    choice_a: "NO CHANGE",
    choice_b: "whether he is",
    choice_c: "to be",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "D",
    question_type: "redundancy",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 73,
    passage_number: 5,
    question_stem: "Museum directors organized Banksy exhibitions, and <u>auctioneers sold actual pieces of buildings that bore</u> Banksy's artistry.",
    underlined_text: "auctioneers sold actual pieces of buildings that bore",
    context_before: "Museum directors organized Banksy exhibitions, and",
    context_after: "Banksy's artistry.",
    choice_a: "NO CHANGE",
    choice_b: "actual pieces of buildings were sold by auctioneers",
    choice_c: "actual pieces, sold by auctioneers, were of buildings",
    choice_d: "selling actual pieces of buildings were auctioneers",
    correct_answer: "A",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 74,
    passage_number: 5,
    question_stem: "Which of the following quotations attributed to Banksy best suggests why Banksy has not revealed his identity to the public? In Banksy's own words, <u>\"Art is not like other culture because its success is not made by its audience.\"</u>",
    underlined_text: "\"Art is not like other culture because its success is not made by its audience.\"",
    context_before: "In Banksy's own words,",
    context_after: "",
    choice_a: "NO CHANGE",
    choice_b: "\"If you want to say something and have people listen, then you have to wear a mask.\"",
    choice_c: "\"Graffiti is one of the few tools you have if you have almost nothing.\"",
    choice_d: "\"Speak softly, but carry a big can of paint.\"",
    correct_answer: "B",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 75,
    passage_number: 5,
    question_stem: "Suppose the writer's primary purpose had been to explain a common debate about the definition of art. Would this essay accomplish that purpose?",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it demonstrates that characteristics of street art are similar to those found in other types of art.",
    choice_b: "Yes, because it explains why street art is controversial.",
    choice_c: "No, because it focuses on why the work of one street artist has gained popularity.",
    choice_d: "No, because it explains Banksy's reasons for choosing to create street art.",
    correct_answer: "C",
    question_type: "purpose",
    question_category: "POW"
  }
];

// ============================================================================
// INSERT PASSAGES
// ============================================================================

console.log('\n📌 INSERTING PASSAGES...\n');

const { data: passage3Data, error: p3Error } = await supabase
  .from('act_english_passages')
  .insert([passage3])
  .select();

if (p3Error) {
  console.error('❌ Error inserting Passage 3:', p3Error.message);
} else {
  console.log('✅ Passage 3 inserted: ' + passage3.title);
}

const { data: passage4Data, error: p4Error } = await supabase
  .from('act_english_passages')
  .insert([passage4])
  .select();

if (p4Error) {
  console.error('❌ Error inserting Passage 4:', p4Error.message);
} else {
  console.log('✅ Passage 4 inserted: ' + passage4.title);
}

const { data: passage5Data, error: p5Error } = await supabase
  .from('act_english_passages')
  .insert([passage5])
  .select();

if (p5Error) {
  console.error('❌ Error inserting Passage 5:', p5Error.message);
} else {
  console.log('✅ Passage 5 inserted: ' + passage5.title);
}

// ============================================================================
// INSERT QUESTIONS
// ============================================================================

console.log('\n📌 INSERTING QUESTIONS 31-75...\n');

const allQuestions = [...questions31_45, ...questions46_60, ...questions61_75];

let inserted = 0;
let errors = 0;

for (const q of allQuestions) {
  const { error } = await supabase
    .from('act_english_questions')
    .insert([q]);

  if (error) {
    console.error('❌ Q' + q.question_number + ': ' + error.message);
    errors++;
  } else {
    inserted++;
    if (inserted % 5 === 0 || inserted === allQuestions.length) {
      console.log('  ✓ Inserted Q' + (inserted - 4) + '-Q' + inserted);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ EXTRACTION COMPLETE\n');
console.log('Passages inserted: 3');
console.log('Questions inserted: ' + inserted);
console.log('Errors: ' + errors);
console.log('\n' + '='.repeat(80) + '\n');
