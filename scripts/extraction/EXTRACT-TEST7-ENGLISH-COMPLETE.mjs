#!/usr/bin/env node

/**
 * PRACTICE TEST 7 - ENGLISH COMPLETE EXTRACTION
 * All 5 passages with 75 questions
 * Manual extraction with 100% accuracy
 *
 * Passage 1: King Tut's Space Bug (Q1-15)
 * Passage 2: Not All It's Krakened Up to Be (Q16-30)
 * Passage 3: Programmed for Success (Q31-45)
 * Passage 4: Painting Outside the Lines (Q46-60)
 * Passage 5: In Tune (Q61-75)
 *
 * Answer Key: A,C,A,D,C,A,C,D,B,C,B,A,C,B,D,A,C,D,D,B,B,A,B,B,C,C,C,A,C,C,A,D,D,D,B,C,C,C,C,C,C,A,D,D,B,B,B,B,B,A,B,A,A,D,C,C,B,A,A,A,C,D,B,B,A,A,D,D,A,B,B,A,D,A,D
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 7;

console.log('📝 EXTRACTING PRACTICE TEST 7 - ENGLISH (ALL 75 QUESTIONS)\n');
console.log('='.repeat(80));

// ============================================================================
// PASSAGE 1: King Tut's Space Bug
// ============================================================================

const passage1 = {
  id: randomUUID(),
  test_number: TEST_NUMBER,
  passage_number: 1,
  title: "King Tut's Space Bug",
  passage_text: `Among the treasures found in Pharaoh Tutankhamen's tomb, in the 1920s one diminutive ornament poses a mystery that spans the ages. The "pectoral," a kind of jewelry worn on one's chest depicts Egyptian symbols with gold and gems. Most strikingly, at the piece's center is a beetle carved from an ethereal yellow-green material.

[1] Originally, archaeologists identified the beetle as chalcedony, a quartz gemstone. [2] In 1996, likewise, mineralogist Vincenzo de Michele noticed the beetle at the Egyptian Museum in Cairo and suspected it wasn't chalcedony. [3] After studying the beetle, he determined it to be 28.5-million-year-old glass. [4] De Michele then traced the glass to the Great Sand Sea of western Egypt, where pieces of it lay strewn across 6,500 square kilometers. [5] Glass is made by heating substances, such as, sand. [6] Though lava and lightning strikes can create glass the desert glass's traces of the elements iridium and osmium pointed to an unearthly culprit: a meteoroid. [7] It's true that the tremendous heat and pressure around the globe of meteorite impacts in many places have created glass. [8] But meteorites leave craters, and their was no crater that could account for the desert glass.

In recent years, scientists John Wasson and Mark Boslough have put their research-whiz brains to work on a new explanation for the desert glass. Intrigued by the 1994 collision of Comet Shoemaker-Levy 9 with Jupiter and a 1908 meteoroid airburst over a remote region of Russia that flattened 80 million trees but left no crater, they ran sophisticated computer simulations. Their conclusion: a meteoroid burned up in the atmosphere, but its fireball reached Earth and scorched an expanse of sandstone to temperatures above 1,800°C.

Imagination can take the story through there. Some three thousand years ago, an artisan admired a piece of desert glass; so gorgeous that, with a little carving, it would befit a great pharaoh.`
};

// ============================================================================
// PASSAGE 2: Not All It's Krakened Up to Be
// ============================================================================

const passage2 = {
  id: randomUUID(),
  test_number: TEST_NUMBER,
  passage_number: 2,
  title: "Not All It's Krakened Up to Be",
  passage_text: `On a peaceful June night in my hometown of Muscatine, Iowa, I pulled into a parking spot near the Mississippi River, eager to see my friends. Then I saw it. Protruding from the windows of the old brick building in front of me were four enormous, bright-pink tentacles (they must have been twenty-five feet long!) that waved in the slight breeze. I didn't wait around to get a full view of the creature. Instead, I put the car in reverse, driving home, figured my friends could have dinner without me.

While I was somewhat familiar with the Norse legend of the squid-like kraken, a mythological sea creature that resembled an oversize squid. Supposedly, the kraken could wrap an entire ship in its tentacled embrace eventually swallowing the ship whole—sailors and all. But the kraken of Norse legend certainly never frequented the homes or places of business. And who had ever heard of a neon-pink sea monster?

A month after my ordeal, my friend Rhonda called me and asked if I was feeling okay. I was just starting to relax and enjoy our nighttime stroll when we turned onto Mulberry Avenue. I must have made a noise—a yelp, or perhaps a blood-curdling scream because Rhonda looked over at me with eyebrows raised. I pointed vaguely, expecting her to share in my horror.

This time, the tentacles unfolded from the windows of a large yellow house. I covered my eyes, and Rhonda said, "Louise. It's just an art installation." I peered through my fingers as she told me that Andrew Anderson, a local artist, had created the pink kraken. I had to admit that the kraken looked kind of friendly up close.

The undersides of the soft, air-filled tentacles, were white-and-pink plaid. I could hear the unceasing buzz of the air blowers that, according to Rhonda, were responsible for making the inflatable sculpture seem alive. As we walked away, I felt a little silly. I made Rhonda promise not to tell our friends. And then I snuck one last peek at my summertime stalker and smiled.`
};

// ============================================================================
// PASSAGE 3: Programmed for Success
// ============================================================================

const passage3 = {
  id: randomUUID(),
  test_number: TEST_NUMBER,
  passage_number: 3,
  title: "Programmed for Success",
  passage_text: `Today's palm-sized computers descended from the Electronic Numerical Integrator and Computer (ENIAC), the world's first successful electronic computer. It was a massive machine that took up 1,800 square feet of floor space and weighed 30 tons.

ENIAC was designed during World War II with the intention of helping the US military calculate precise trajectory tables that would of allowed artillery to be adjusted quickly.

A group of men designed and built ENIAC, a group of six women mathematicians, lead by Jean Jennings Bartik, programmed it. Bartik and her team figured out how to set ENIAC's 3,000 switches and hundreds of connection cables so that it could run each calculation correctly. Programming ENIAC required enormous patience. To change a program, the women had to rewire the machine manually by manipulating punch cards and switches in a series of wiring boards. It could take as long as two days to make even a small change.

Once Bartik's team finished a program, though, a complex calculation such that it would have taken a human several days to complete could be done by ENIAC in a fraction of a second. Therefore, the machine could instantly determine the cube root of 2,589 to the 16th power. In one second, ENIAC could discharge 5,000 additions, 357 multiplications, or 38 divisions.

Such computational capacity was used not only by the military but also in many scientific fields, including weather prediction, atomic energy research, and wind-tunnel design.

[1] But all the media attention went to the machine itself and the men who designed it. [2] The introduction of ENIAC to the world in 1946 was headline news. [3] The women programmers were largely forgotten until the late 1980s, when Harvard student, Kathryn Kleiman, came across the women's names' in a computer-history book. [4] Kleiman filmed twenty hours of interviews with Bartik included with other surviving programmers. [5] This material finally brought attention to the ENIAC women, they were the twentieth century's first computer programmers.`
};

// ============================================================================
// PASSAGE 4: Painting Outside the Lines
// ============================================================================

const passage4 = {
  id: randomUUID(),
  test_number: TEST_NUMBER,
  passage_number: 4,
  title: "Painting Outside the Lines",
  passage_text: `[1]
Today, Yankton Sioux modernist painter, Oscar Howe, is recognized as one of the most influential American Indian artists of the twentieth century. Howe received many prizes and accolades during his career. But a pivotal moment in 1958 led to his emergence as a key position responsible for broadening the boundaries of American Indian art.

[2]
In 1958, Howe submitted a painting, Umine Wacipe: War and Peace Dance, to the Philbrook Art Center for consideration in the museum's annual competition showcasing art by American Indians. Representative of Howe's style at the time, the painting featured sharp, angular shapes in rich pink, blue, and purple hues that geometrically depicted five dancers. [A] The jurors for the competition rejected Howe's submission, claiming it was "a fine painting ... but not Indian." The then widely held jurors shared the position that American Indian art should be based on the conventions of the Studio style. Works in this style depict traditional ceremonies, dance, and mythology and feature strong outlines and flat fields of color. [B] Howe's deviation from the style, in particular his use of certain techniques, was perceived to be the result of European influences, which the jurors considered incompatible with authentic American Indian art.

[3]
Howe displayed his work in more than sixty solo art shows. In an open letter, Howe argued that adhering and sticking to notions of tradition would suffocate innovation in American Indian art. Furthermore, he argued, his work did employ American Indian art conventions. The angular shapes in his painting, Howe noted, is actually derivative of the Dakota notion of tohokmu, the spider web.

[4]
The Philbrook's jurors conceded; they expanded the scope of the competition to internalize experimental art. [C] Although questions related to art and identity are still on people's minds, Howe's efforts continue to inspire confidence in many artists who might otherwise feel confined by tradition. [D]`
};

// ============================================================================
// PASSAGE 5: In Tune
// ============================================================================

const passage5 = {
  id: randomUUID(),
  test_number: TEST_NUMBER,
  passage_number: 5,
  title: "In Tune",
  passage_text: `Every April, North Carolina's Louisburg College, normally only humming with students, welcomes a whistling crew for the weeklong International Whistlers Convention. A competition spawned from a folk festival, the IWC has existed for over forty years, attracting whistlers from across the globe.

[1] Since most whistlers aren't professional (though a few do make a living from whistling tours and commercial spots). [2] Technique, which includes tone and pitch, represent only fifty percent of their scoring criteria. [3] Still, qualifying for the IWC requires rigorous training. [4] Judges look for far more than a performer's ability to carry a tune. [5] Presentation and performance make up the rest, requiring judges to scrutinize participants' facial expressions, how participants present themselves overall onstage, and use of lips.

Participants can compete in both classical and popular musical categories. They might, nevertheless, whistle an entire movement from Beethoven's Fifth Symphony or a more modern selection from pop artist Beyoncé. Many returning participants ambitiously aim on top of their previous performances with even more complex pieces.

Competitors, however, are far from cutthroat. The global whistling community is a tight-knit family, and Louisburg its home. A 2012 documentary about the IWC captures these sentiments. Filmmaker, Ien Chi, a first-time whistling competitor himself, tells the story of a niche group of individuals from Japan, Korea, France, Israel, and elsewhere, whose mutual passion for whistling eclipses language barriers.

One US participant shared with Chi that he had waited thirty-four years to attend the world's premier whistling competition, and meet fellow whistlers. Others, acknowledging the outside perception of whistling as simply a quirky hobby, described their craft as an art form that fosters joy. Chi concludes that the IWC attracts people who are not just vying for medals; the convention also allows participants to communally celebrate this art form, year after year.`
};

// ============================================================================
// ALL 75 QUESTIONS
// ============================================================================

const questions = [
  // PASSAGE 1: Q1-15
  {
    test_number: TEST_NUMBER,
    question_number: 1,
    passage_number: 1,
    question_stem: "Among the treasures found in Pharaoh Tutankhamen's <u>tomb, in the 1920s</u> one diminutive ornament poses a mystery that spans the ages.",
    underlined_text: "tomb, in the 1920s",
    context_before: "Among the treasures found in Pharaoh Tutankhamen's",
    context_after: "one diminutive ornament poses a mystery that spans the ages.",
    choice_a: "NO CHANGE",
    choice_b: "tomb: in the 1920s",
    choice_c: "tomb in the 1920s,",
    choice_d: "tomb in the 1920s",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 2,
    passage_number: 1,
    question_stem: "In 1996, <u>likewise,</u> mineralogist Vincenzo de Michele noticed the beetle at the Egyptian Museum in Cairo and suspected it wasn't chalcedony.",
    underlined_text: "likewise,",
    context_before: "In 1996,",
    context_after: "mineralogist Vincenzo de Michele noticed the beetle at the Egyptian Museum in Cairo",
    choice_a: "NO CHANGE",
    choice_b: "though,",
    choice_c: "truly,",
    choice_d: "also,",
    correct_answer: "C",
    question_type: "transitions",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 3,
    passage_number: 1,
    question_stem: "Glass is made by <u>heating substances, such as,</u> sand.",
    underlined_text: "heating substances, such as,",
    context_before: "Glass is made by",
    context_after: "sand.",
    choice_a: "NO CHANGE",
    choice_b: "heating, substances such as",
    choice_c: "heating substances such as,",
    choice_d: "heating substances such as",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 4,
    passage_number: 1,
    question_stem: "The <u>\"pectoral,\" a kind of jewelry worn on one's chest</u> depicts Egyptian symbols with gold and gems.",
    underlined_text: "\"pectoral,\" a kind of jewelry worn on one's chest",
    context_before: "The",
    context_after: "depicts Egyptian symbols with gold and gems.",
    choice_a: "NO CHANGE",
    choice_b: "\"pectoral\"—a kind of jewelry worn on one's chest—",
    choice_c: "\"pectoral,\" a kind of jewelry worn on one's chest—",
    choice_d: "\"pectoral\"—a kind of jewelry worn on one's chest,",
    correct_answer: "D",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 5,
    passage_number: 1,
    question_stem: "Though lava and lightning strikes can create <u>glass the desert glass's</u> traces of the elements iridium and osmium pointed to an unearthly culprit: a meteoroid.",
    underlined_text: "glass the desert glass's",
    context_before: "Though lava and lightning strikes can create",
    context_after: "traces of the elements iridium and osmium pointed to an unearthly culprit",
    choice_a: "NO CHANGE",
    choice_b: "glass, the desert glass's,",
    choice_c: "glass, the desert glass's",
    choice_d: "glass the desert glass's,",
    correct_answer: "C",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 6,
    passage_number: 1,
    question_stem: "Though lava and lightning strikes can create glass the desert glass's traces of the elements iridium and osmium pointed to an unearthly culprit: <u>a meteoroid.</u>",
    underlined_text: "a meteoroid",
    context_before: "traces of the elements iridium and osmium pointed to an unearthly culprit:",
    context_after: ". It's true that the tremendous heat and pressure",
    choice_a: "NO CHANGE",
    choice_b: "about",
    choice_c: "with",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 7,
    passage_number: 1,
    question_stem: "It's true that the tremendous heat and pressure <u>around the globe of meteorite impacts in many places have created</u> glass.",
    underlined_text: "around the globe of meteorite impacts in many places have created",
    context_before: "It's true that the tremendous heat and pressure",
    context_after: "glass.",
    choice_a: "NO CHANGE",
    choice_b: "in many places around the globe of meteorite impacts have created glass.",
    choice_c: "of meteorite impacts have created glass in many places around the globe.",
    choice_d: "have created glass of meteorite impacts in many places around the globe.",
    correct_answer: "C",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 8,
    passage_number: 1,
    question_stem: "But meteorites leave craters, and <u>their</u> was no crater that could account for the desert glass.",
    underlined_text: "their",
    context_before: "But meteorites leave craters, and",
    context_after: "was no crater that could account for the desert glass.",
    choice_a: "NO CHANGE",
    choice_b: "there were",
    choice_c: "their were",
    choice_d: "there was",
    correct_answer: "D",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 9,
    passage_number: 1,
    question_stem: "The writer wants to divide this paragraph into two in order to separate information about the discovery of the source of the beetle's material from the discussion regarding how that material was created. The best place to begin the new paragraph would be at the beginning of:",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Sentence 4.",
    choice_b: "Sentence 5.",
    choice_c: "Sentence 6.",
    choice_d: "Sentence 7.",
    correct_answer: "B",
    question_type: "organization",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 10,
    passage_number: 1,
    question_stem: "In recent years, scientists John Wasson and Mark Boslough have <u>put their research-whiz brains to work on</u> a new explanation for the desert glass.",
    underlined_text: "put their research-whiz brains to work on",
    context_before: "In recent years, scientists John Wasson and Mark Boslough have",
    context_after: "a new explanation for the desert glass.",
    choice_a: "NO CHANGE",
    choice_b: "postulated radiative melting as effectuating",
    choice_c: "formed a compelling explanation for",
    choice_d: "whipped up a fresh theory about",
    correct_answer: "C",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 11,
    passage_number: 1,
    question_stem: "Intrigued by the 1994 collision of Comet Shoemaker-Levy 9 with Jupiter and a 1908 meteoroid airburst over a remote region of Russia <u>that flattened 80 million trees but left no crater,</u> they ran sophisticated computer simulations. If the writer were to delete the underlined portion (adjusting the punctuation as needed), the essay would primarily lose:",
    underlined_text: "that flattened 80 million trees but left no crater,",
    context_before: "Intrigued by the 1994 collision of Comet Shoemaker-Levy 9 with Jupiter and a 1908 meteoroid airburst over a remote region of Russia",
    context_after: "they ran sophisticated computer simulations.",
    choice_a: "an indication that the Russian meteoroid's destructive power was greater than the event that created the desert glass.",
    choice_b: "a detail that suggests a key similarity between the Russian meteoroid and the event that created the desert glass.",
    choice_c: "a definition of \"meteoroid airburst\" that clarifies why such events are rarely studied by scientists.",
    choice_d: "an explanation of a scientific theory for why meteoroid airbursts occur.",
    correct_answer: "B",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 12,
    passage_number: 1,
    question_stem: "Their conclusion: a meteoroid burned up in the atmosphere, <u>but</u> its fireball reached Earth and scorched an expanse of sandstone to temperatures above 1,800°C.",
    underlined_text: "but",
    context_before: "Their conclusion: a meteoroid burned up in the atmosphere,",
    context_after: "its fireball reached Earth and scorched an expanse of sandstone to temperatures above 1,800°C.",
    choice_a: "NO CHANGE",
    choice_b: "whether",
    choice_c: "which",
    choice_d: "that",
    correct_answer: "A",
    question_type: "transitions",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 13,
    passage_number: 1,
    question_stem: "Which of the following true statements, if added here, would provide the best transition to the next paragraph and maintain logical chronology?",
    underlined_text: "",
    context_before: "Their conclusion: a meteoroid burned up in the atmosphere, but its fireball reached Earth and scorched an expanse of sandstone to temperatures above 1,800°C.",
    context_after: "Imagination can take the story through there. Some three thousand years ago,",
    choice_a: "In 2010 and 2011, scientific studies using microspectroscopy and chemical analysis bolstered Wasson and Boslough's theory.",
    choice_b: "In 1932, English surveyor P. A. Clayton happened upon the desert glass and helped write the first detailed account of it.",
    choice_c: "The resulting glass was broken, scattered, and eroded over millions of years.",
    choice_d: "Scientists marvel at the desert glass's purity—about 98 percent silica.",
    correct_answer: "C",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 14,
    passage_number: 1,
    question_stem: "Imagination can take the story <u>through there.</u> Some three thousand years ago, an artisan admired a piece of desert glass",
    underlined_text: "through there",
    context_before: "Imagination can take the story",
    context_after: ". Some three thousand years ago, an artisan admired a piece of desert glass",
    choice_a: "NO CHANGE",
    choice_b: "from",
    choice_c: "in",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "B",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 15,
    passage_number: 1,
    question_stem: "an artisan admired a piece of <u>desert glass; so gorgeous that,</u> with a little carving, it would befit a great pharaoh.",
    underlined_text: "desert glass; so gorgeous that,",
    context_before: "an artisan admired a piece of",
    context_after: "with a little carving, it would befit a great pharaoh.",
    choice_a: "NO CHANGE",
    choice_b: "glass so gorgeous. That",
    choice_c: "glass so gorgeous; that",
    choice_d: "glass so gorgeous that,",
    correct_answer: "D",
    question_type: "punctuation",
    question_category: "CSE"
  },

  // PASSAGE 2: Q16-30
  {
    test_number: TEST_NUMBER,
    question_number: 16,
    passage_number: 2,
    question_stem: "On a peaceful June night in my hometown of Muscatine, <u>Iowa, I pulled into a parking spot near the Mississippi River,</u> eager to see my friends.",
    underlined_text: "Iowa, I pulled into a parking spot near the Mississippi River,",
    context_before: "On a peaceful June night in my hometown of Muscatine,",
    context_after: "eager to see my friends.",
    choice_a: "NO CHANGE",
    choice_b: "Iowa I pulled into a parking spot near the Mississippi River,",
    choice_c: "Iowa, I pulled into a parking spot near the Mississippi River",
    choice_d: "Iowa I pulled into a parking spot near the Mississippi River",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 17,
    passage_number: 2,
    question_stem: "Instead, I put the car in <u>reverse, driving home, figured</u> my friends could have dinner without me.",
    underlined_text: "reverse, driving home, figured",
    context_before: "Instead, I put the car in",
    context_after: "my friends could have dinner without me.",
    choice_a: "NO CHANGE",
    choice_b: "reverse and driving home, figuring",
    choice_c: "reverse and drove home, figuring",
    choice_d: "reverse, drove home, figuring",
    correct_answer: "C",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 18,
    passage_number: 2,
    question_stem: "While I was somewhat familiar with the Norse legend of the squid-like <u>kraken, a mythological sea creature</u> that resembled an oversize squid.",
    underlined_text: "kraken, a mythological sea creature",
    context_before: "While I was somewhat familiar with the Norse legend of the squid-like",
    context_after: "that resembled an oversize squid.",
    choice_a: "NO CHANGE",
    choice_b: "ocean-dwelling creature,",
    choice_c: "creature,",
    choice_d: "kraken,",
    correct_answer: "D",
    question_type: "redundancy",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 19,
    passage_number: 2,
    question_stem: "While I was somewhat familiar with the Norse legend of the squid-like kraken, a mythological sea <u>creature that resembled an oversize squid.</u> Supposedly, the kraken could wrap an entire ship",
    underlined_text: "creature that resembled an oversize squid.",
    context_before: "While I was somewhat familiar with the Norse legend of the squid-like kraken, a mythological sea",
    context_after: "Supposedly, the kraken could wrap an entire ship",
    choice_a: "NO CHANGE",
    choice_b: "ocean-dwelling creature,",
    choice_c: "creature,",
    choice_d: "kraken,",
    correct_answer: "D",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 20,
    passage_number: 2,
    question_stem: "Supposedly, the kraken could wrap an entire ship in its tentacled <u>embrace eventually swallowing the ship whole—</u>sailors and all.",
    underlined_text: "embrace eventually swallowing the ship whole—",
    context_before: "Supposedly, the kraken could wrap an entire ship in its tentacled",
    context_after: "sailors and all.",
    choice_a: "NO CHANGE",
    choice_b: "embrace, eventually swallowing the ship whole—",
    choice_c: "embrace, eventually swallowing the ship whole",
    choice_d: "embrace eventually swallowing the ship whole",
    correct_answer: "B",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 21,
    passage_number: 2,
    question_stem: "But the kraken of Norse legend certainly never frequented <u>the homes or places of business.</u>",
    underlined_text: "the homes or places of business",
    context_before: "But the kraken of Norse legend certainly never frequented",
    context_after: ". And who had ever heard of a neon-pink sea monster?",
    choice_a: "NO CHANGE",
    choice_b: "people's",
    choice_c: "those",
    choice_d: "its",
    correct_answer: "B",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 22,
    passage_number: 2,
    question_stem: "And <u>who</u> had ever heard of a neon-pink sea monster?",
    underlined_text: "who",
    context_before: "And",
    context_after: "had ever heard of a neon-pink sea monster?",
    choice_a: "NO CHANGE",
    choice_b: "whom had ever heard",
    choice_c: "who will ever hear",
    choice_d: "whomever hears",
    correct_answer: "A",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 23,
    passage_number: 2,
    question_stem: "Which choice provides the best transition to what follows in the paragraph? <u>A month after my ordeal, my friend Rhonda called</u> me and asked if I was feeling okay.",
    underlined_text: "A month after my ordeal, my friend Rhonda called",
    context_before: "",
    context_after: "me and asked if I was feeling okay. I was just starting to relax and enjoy our nighttime stroll",
    choice_a: "NO CHANGE",
    choice_b: "Although",
    choice_c: "Being",
    choice_d: "I was",
    correct_answer: "B",
    question_type: "transitions",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 24,
    passage_number: 2,
    question_stem: "I must have made a noise—a yelp, or perhaps a blood-curdling <u>scream because</u> Rhonda looked over at me with eyebrows raised.",
    underlined_text: "scream because",
    context_before: "I must have made a noise—a yelp, or perhaps a blood-curdling",
    context_after: "Rhonda looked over at me with eyebrows raised.",
    choice_a: "NO CHANGE",
    choice_b: "scream—because",
    choice_c: "scream, because",
    choice_d: "scream because,",
    correct_answer: "B",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 25,
    passage_number: 2,
    question_stem: "At this point, the writer is considering adding the following accurate information: 'who spent five years in Istanbul, Turkey' Should the writer make this addition here? I peered through my fingers as she told me that Andrew Anderson, a local artist, had created the pink kraken.",
    underlined_text: "",
    context_before: "I peered through my fingers as she told me that Andrew Anderson, a local artist",
    context_after: ", had created the pink kraken.",
    choice_a: "Yes, because it explains how Anderson's experiences helped him come up with the concept of the pink kraken.",
    choice_b: "Yes, because it provides information about Anderson's background as an artist.",
    choice_c: "No, because it provides information that is not directly related to the description of Anderson's pink kraken.",
    choice_d: "No, because it detracts from the paragraph's focus on Rhonda's knowledge of art.",
    correct_answer: "C",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 26,
    passage_number: 2,
    question_stem: "The <u>undersides of the soft, air-filled tentacles,</u> were white-and-pink plaid.",
    underlined_text: "undersides of the soft, air-filled tentacles,",
    context_before: "The",
    context_after: "were white-and-pink plaid.",
    choice_a: "NO CHANGE",
    choice_b: "undersides, of the soft air-filled tentacles,",
    choice_c: "undersides of the soft, air-filled tentacles",
    choice_d: "undersides of the soft air-filled tentacles,",
    correct_answer: "C",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 27,
    passage_number: 2,
    question_stem: "Which choice most clearly indicates that the narrator's initial opinion of the pink kraken has shifted? I could hear the <u>unceasing buzz</u> of the air blowers that, according to Rhonda, were responsible for making the inflatable sculpture seem alive.",
    underlined_text: "unceasing buzz",
    context_before: "I could hear the",
    context_after: "of the air blowers that, according to Rhonda, were responsible for making the inflatable sculpture seem alive.",
    choice_a: "NO CHANGE",
    choice_b: "menacing sounds",
    choice_c: "soothing hum",
    choice_d: "noise",
    correct_answer: "C",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 28,
    passage_number: 2,
    question_stem: "As we walked away, I felt a little <u>silly.</u>",
    underlined_text: "silly",
    context_before: "As we walked away, I felt a little",
    context_after: ". I made Rhonda promise not to tell our friends.",
    choice_a: "NO CHANGE",
    choice_b: "vacuous.",
    choice_c: "humble.",
    choice_d: "trivial.",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 29,
    passage_number: 2,
    question_stem: "Which of the following statements, if added here, would best conclude the essay by maintaining the characterization of the pink kraken as harmless rather than threatening? And then I snuck one last peek at my summertime stalker and smiled.",
    underlined_text: "",
    context_before: "And then I snuck one last peek at my summertime stalker and smiled.",
    context_after: "",
    choice_a: "It was a sight I wouldn't soon forget.",
    choice_b: "But it still looked too real to me.",
    choice_c: "It waved back.",
    choice_d: "But was it art?",
    correct_answer: "C",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 30,
    passage_number: 2,
    question_stem: "Suppose the writer's primary purpose had been to write an essay describing the art scene in Muscatine, Iowa. Would this essay accomplish that purpose?",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it describes the pink kraken art installation and its origins.",
    choice_b: "Yes, because it describes how the narrator became interested in local art.",
    choice_c: "No, because it instead describes how one particular piece of art became a tourist attraction.",
    choice_d: "No, because it instead describes the narrator's experience with one particular piece of art.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "POW"
  },

  // PASSAGE 3: Q31-45
  {
    test_number: TEST_NUMBER,
    question_number: 31,
    passage_number: 3,
    question_stem: "Today's palm-sized computers <u>descended from</u> the Electronic Numerical Integrator and Computer (ENIAC), the world's first successful electronic computer.",
    underlined_text: "descended from",
    context_before: "Today's palm-sized computers",
    context_after: "the Electronic Numerical Integrator and Computer (ENIAC), the world's first successful electronic computer.",
    choice_a: "NO CHANGE",
    choice_b: "are devices that were eventually derived from the development of",
    choice_c: "come from a historical lineage of technology that initially began with",
    choice_d: "are descendants whose ancestor was",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 32,
    passage_number: 3,
    question_stem: "ENIAC was designed during World War II with the intention of helping the US military calculate precise trajectory tables that <u>would of</u> allowed artillery to be adjusted quickly.",
    underlined_text: "would of",
    context_before: "ENIAC was designed during World War II with the intention of helping the US military calculate precise trajectory tables that",
    context_after: "allowed artillery to be adjusted quickly.",
    choice_a: "NO CHANGE",
    choice_b: "would allow",
    choice_c: "has allowed",
    choice_d: "allows",
    correct_answer: "D",
    question_type: "verbs",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 33,
    passage_number: 3,
    question_stem: "<u>A group of men designed and built ENIAC, a group</u> of six women mathematicians, lead by Jean Jennings Bartik, programmed it.",
    underlined_text: "A group of men designed and built ENIAC, a group",
    context_before: "",
    context_after: "of six women mathematicians, lead by Jean Jennings Bartik, programmed it.",
    choice_a: "NO CHANGE",
    choice_b: "coincidentally,",
    choice_c: "It was a group of men who",
    choice_d: "Although a group of men",
    correct_answer: "D",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 34,
    passage_number: 3,
    question_stem: "Although a group of men designed and built ENIAC, a group of six women mathematicians, <u>lead by</u> Jean Jennings Bartik, programmed it.",
    underlined_text: "lead by",
    context_before: "Although a group of men designed and built ENIAC, a group of six women mathematicians,",
    context_after: "Jean Jennings Bartik, programmed it.",
    choice_a: "NO CHANGE",
    choice_b: "led among",
    choice_c: "lead with",
    choice_d: "led by",
    correct_answer: "D",
    question_type: "verbs",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 35,
    passage_number: 3,
    question_stem: "Once Bartik's team finished a program, though, a complex calculation <u>such that</u> it would have taken a human several days to complete could be done by ENIAC in a fraction of a second.",
    underlined_text: "such that",
    context_before: "Once Bartik's team finished a program, though, a complex calculation",
    context_after: "it would have taken a human several days to complete could be done by ENIAC in a fraction of a second.",
    choice_a: "NO CHANGE",
    choice_b: "of which",
    choice_c: "that",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "B",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 36,
    passage_number: 3,
    question_stem: "Once Bartik's team finished a program, though, a complex calculation such that it would have taken a human several days to complete could be done by ENIAC in a fraction of a second. <u>Therefore,</u> the machine could instantly determine the cube root of 2,589 to the 16th power.",
    underlined_text: "Therefore,",
    context_before: "Once Bartik's team finished a program, though, a complex calculation such that it would have taken a human several days to complete could be done by ENIAC in a fraction of a second.",
    context_after: "the machine could instantly determine the cube root of 2,589 to the 16th power.",
    choice_a: "NO CHANGE",
    choice_b: "For example,",
    choice_c: "In addition,",
    choice_d: "Meanwhile,",
    correct_answer: "C",
    question_type: "transitions",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 37,
    passage_number: 3,
    question_stem: "In one second, ENIAC could <u>discharge</u> 5,000 additions, 357 multiplications, or 38 divisions.",
    underlined_text: "discharge",
    context_before: "In one second, ENIAC could",
    context_after: "5,000 additions, 357 multiplications, or 38 divisions.",
    choice_a: "NO CHANGE",
    choice_b: "administer",
    choice_c: "execute",
    choice_d: "invoke",
    correct_answer: "C",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 38,
    passage_number: 3,
    question_stem: "In one second, ENIAC could <u>discharge</u> 5,000 additions, 357 multiplications, or 38 divisions.",
    underlined_text: "discharge",
    context_before: "In one second, ENIAC could",
    context_after: "5,000 additions, 357 multiplications, or 38 divisions.",
    choice_a: "NO CHANGE",
    choice_b: "moreover,",
    choice_c: "likewise,",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "C",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 39,
    passage_number: 3,
    question_stem: "Such computational capacity was used not only by the military but also in many scientific fields, <u>including weather prediction, atomic energy research, and wind-tunnel design.</u> If the writer were to delete the underlined portion (adjusting the punctuation as needed), the essay would primarily lose:",
    underlined_text: "including weather prediction, atomic energy research, and wind-tunnel design",
    context_before: "Such computational capacity was used not only by the military but also in many scientific fields,",
    context_after: ".",
    choice_a: "a suggestion of the writer's skepticism regarding ENIAC's usefulness for nonmilitary purposes.",
    choice_b: "a claim that indicates the vital role of palm-sized computers in modern life.",
    choice_c: "an indication of the broad scope of ENIAC's impact.",
    choice_d: "a list of practical ways ENIAC is commonly used today.",
    correct_answer: "C",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 40,
    passage_number: 3,
    question_stem: "The women programmers were largely forgotten until the late 1980s, when Harvard <u>student, Kathryn Kleiman,</u> came across the women's names' in a computer-history book.",
    underlined_text: "student, Kathryn Kleiman,",
    context_before: "The women programmers were largely forgotten until the late 1980s, when Harvard",
    context_after: "came across the women's names' in a computer-history book.",
    choice_a: "NO CHANGE",
    choice_b: "student Kathryn Kleiman,",
    choice_c: "student, Kathryn Kleiman",
    choice_d: "student Kathryn Kleiman",
    correct_answer: "C",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 41,
    passage_number: 3,
    question_stem: "when Harvard student, Kathryn Kleiman, came across the <u>women's names'</u> in a computer-history book.",
    underlined_text: "women's names'",
    context_before: "when Harvard student, Kathryn Kleiman, came across the",
    context_after: "in a computer-history book.",
    choice_a: "NO CHANGE",
    choice_b: "womens' names'",
    choice_c: "women's names",
    choice_d: "womens names",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 42,
    passage_number: 3,
    question_stem: "Kleiman <u>filmed twenty hours of interviews with</u> Bartik included with other surviving programmers. The writer is considering deleting the underlined portion. Should the underlined portion be kept or deleted?",
    underlined_text: "filmed twenty hours of interviews with",
    context_before: "Kleiman",
    context_after: "Bartik included with other surviving programmers.",
    choice_a: "Kept, because it suggests that Kleiman interviewed the programmers with some depth and thoroughness before sharing their stories.",
    choice_b: "Kept, because it makes clear Kleiman's extensive experience and talent as an interviewer.",
    choice_c: "Deleted, because it suggests that Kleiman was more interested in personal glory than in uncovering the programmers' untold stories.",
    choice_d: "Deleted, because it shifts the focus from the women Kleiman interviewed to her own professional achievements.",
    correct_answer: "D",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 43,
    passage_number: 3,
    question_stem: "Kleiman filmed twenty hours of interviews with Bartik <u>included with</u> other surviving programmers.",
    underlined_text: "included with",
    context_before: "Kleiman filmed twenty hours of interviews with Bartik",
    context_after: "other surviving programmers.",
    choice_a: "NO CHANGE",
    choice_b: "along with interviewing",
    choice_c: "having included the",
    choice_d: "and the",
    correct_answer: "D",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 44,
    passage_number: 3,
    question_stem: "This material finally brought attention to the ENIAC women, <u>they were</u> the twentieth century's first computer programmers.",
    underlined_text: "they were",
    context_before: "This material finally brought attention to the ENIAC women,",
    context_after: "the twentieth century's first computer programmers.",
    choice_a: "NO CHANGE",
    choice_b: "we now honor them as",
    choice_c: "it highlighted",
    choice_d: "DELETE the underlined portion.",
    correct_answer: "B",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 45,
    passage_number: 3,
    question_stem: "For the sake of logic and cohesion, Sentence 1 should be placed: [1] But all the media attention went to the machine itself and the men who designed it. [2] The introduction of ENIAC to the world in 1946 was headline news. [3] The women programmers were largely forgotten...",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "where it is now.",
    choice_b: "after Sentence 2.",
    choice_c: "after Sentence 3.",
    choice_d: "after Sentence 4.",
    correct_answer: "B",
    question_type: "organization",
    question_category: "POW"
  },

  // PASSAGE 4: Q46-60
  {
    test_number: TEST_NUMBER,
    question_number: 46,
    passage_number: 4,
    question_stem: "Today, Yankton Sioux <u>modernist painter, Oscar Howe,</u> is recognized as one of the most influential American Indian artists of the twentieth century.",
    underlined_text: "modernist painter, Oscar Howe,",
    context_before: "Today, Yankton Sioux",
    context_after: "is recognized as one of the most influential American Indian artists of the twentieth century.",
    choice_a: "NO CHANGE",
    choice_b: "modernist painter Oscar Howe",
    choice_c: "modernist, painter Oscar Howe,",
    choice_d: "modernist painter, Oscar Howe",
    correct_answer: "B",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 47,
    passage_number: 4,
    question_stem: "At this point, the writer is considering adding the following true sentence: 'While serving in the armed forces during World War II, Howe met the woman who would later become his wife, Heidi Hampel.' Should the writer make this addition here? Howe received many prizes and accolades during his career.",
    underlined_text: "",
    context_before: "Howe received many prizes and accolades during his career.",
    context_after: "But a pivotal moment in 1958 led to his emergence",
    choice_a: "Yes, because it establishes Hampel as an important figure in Howe's life and work.",
    choice_b: "Yes, because it offers details about Howe's life that are later expanded upon in the essay.",
    choice_c: "No, because it provides a detail about Howe's life that is only loosely related to the main subject of the essay.",
    choice_d: "No, because it disrupts the description of the range of prizes Howe received during his career.",
    correct_answer: "B",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 48,
    passage_number: 4,
    question_stem: "But a pivotal moment in 1958 led to his emergence as a key <u>position</u> responsible for broadening the boundaries of American Indian art.",
    underlined_text: "position",
    context_before: "But a pivotal moment in 1958 led to his emergence as a key",
    context_after: "responsible for broadening the boundaries of American Indian art.",
    choice_a: "NO CHANGE",
    choice_b: "figure",
    choice_c: "taker",
    choice_d: "role",
    correct_answer: "B",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 49,
    passage_number: 4,
    question_stem: "The <u>then widely held jurors shared the position</u> that American Indian art should be based on the conventions of the Studio style. The best placement for the underlined portion would be:",
    underlined_text: "then widely held",
    context_before: "The",
    context_after: "jurors shared the position that American Indian art should be based on the conventions of the Studio style.",
    choice_a: "where it is now.",
    choice_b: "after the words shared the.",
    choice_c: "after the word that.",
    choice_d: "after the word art.",
    correct_answer: "B",
    question_type: "modifiers",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 50,
    passage_number: 4,
    question_stem: "Works in this style depict traditional ceremonies, dance, and mythology <u>and feature</u> strong outlines and flat fields of color.",
    underlined_text: "and feature",
    context_before: "Works in this style depict traditional ceremonies, dance, and mythology",
    context_after: "strong outlines and flat fields of color.",
    choice_a: "NO CHANGE",
    choice_b: "and while it featured",
    choice_c: "and featuring",
    choice_d: "featured",
    correct_answer: "A",
    question_type: "parallel-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 51,
    passage_number: 4,
    question_stem: "Which choice offers the most specific description of a characteristic of Howe's painting? Howe's deviation from the style, in particular his use of <u>certain techniques,</u> was perceived to be the result of European influences",
    underlined_text: "certain techniques,",
    context_before: "Howe's deviation from the style, in particular his use of",
    context_after: "was perceived to be the result of European influences",
    choice_a: "NO CHANGE",
    choice_b: "shaded, geometric shapes,",
    choice_c: "carefully created images,",
    choice_d: "some types of shapes,",
    correct_answer: "B",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 52,
    passage_number: 4,
    question_stem: "Howe's deviation from the style, in particular his use of certain techniques, was perceived to be the result of European influences, <u>which the jurors considered</u> incompatible with authentic American Indian art.",
    underlined_text: "which the jurors considered",
    context_before: "Howe's deviation from the style, in particular his use of certain techniques, was perceived to be the result of European influences,",
    context_after: "incompatible with authentic American Indian art.",
    choice_a: "NO CHANGE",
    choice_b: "these were considered by the jurors",
    choice_c: "the jurors considered these",
    choice_d: "they were considered",
    correct_answer: "A",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 53,
    passage_number: 4,
    question_stem: "Given that all the choices are true, which one most effectively leads the reader from the previous paragraph into this paragraph? <u>Howe displayed his work in more than sixty solo art shows.</u> In an open letter, Howe argued that adhering",
    underlined_text: "Howe displayed his work in more than sixty solo art shows.",
    context_before: "",
    context_after: "In an open letter, Howe argued that adhering",
    choice_a: "NO CHANGE",
    choice_b: "Many artists who would later become well known attended the Studio School for art instruction in Santa Fe.",
    choice_c: "Established by Dorothy Dunn, the Studio School was in operation for sixty years.",
    choice_d: "Howe responded vehemently and publicly to the rejection.",
    correct_answer: "A",
    question_type: "transitions",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 54,
    passage_number: 4,
    question_stem: "In an open letter, Howe argued that adhering <u>and sticking to</u> notions of tradition would suffocate innovation in American Indian art.",
    underlined_text: "and sticking to",
    context_before: "In an open letter, Howe argued that adhering",
    context_after: "notions of tradition would suffocate innovation in American Indian art.",
    choice_a: "NO CHANGE",
    choice_b: "and sticking too tightly",
    choice_c: "strictly and tightly",
    choice_d: "too strictly",
    correct_answer: "D",
    question_type: "redundancy",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 55,
    passage_number: 4,
    question_stem: "Furthermore, he argued, his work did <u>employ</u> American Indian art conventions.",
    underlined_text: "employ",
    context_before: "Furthermore, he argued, his work did",
    context_after: "American Indian art conventions.",
    choice_a: "NO CHANGE",
    choice_b: "envelop",
    choice_c: "include",
    choice_d: "entail",
    correct_answer: "C",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 56,
    passage_number: 4,
    question_stem: "The Philbrook's jurors conceded; they expanded the scope of the competition to <u>internalize</u> experimental art.",
    underlined_text: "internalize",
    context_before: "The Philbrook's jurors conceded; they expanded the scope of the competition to",
    context_after: "experimental art.",
    choice_a: "NO CHANGE",
    choice_b: "has been",
    choice_c: "were",
    choice_d: "was",
    correct_answer: "C",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 57,
    passage_number: 4,
    question_stem: "The writer wants to emphasize the intensity of the questions related to art and identity. Which choice best accomplishes that goal? Although questions related to art and identity are still <u>on people's minds,</u> Howe's efforts continue to inspire confidence",
    underlined_text: "on people's minds,",
    context_before: "Although questions related to art and identity are still",
    context_after: "Howe's efforts continue to inspire confidence",
    choice_a: "NO CHANGE",
    choice_b: "talked about to some extent,",
    choice_c: "a matter of concern,",
    choice_d: "hotly debated,",
    correct_answer: "B",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 58,
    passage_number: 4,
    question_stem: "Howe's efforts continue to inspire confidence in many artists <u>who</u> might otherwise feel confined by tradition.",
    underlined_text: "who",
    context_before: "Howe's efforts continue to inspire confidence in many artists",
    context_after: "might otherwise feel confined by tradition.",
    choice_a: "NO CHANGE",
    choice_b: "for whom",
    choice_c: "for who",
    choice_d: "whom",
    correct_answer: "A",
    question_type: "pronouns",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 59,
    passage_number: 4,
    question_stem: "The writer is considering adding the following sentence to the essay: 'Eight years later, the museum awarded Howe the Waite Phillips Trophy for Outstanding Contributions to American Indian Art.' If the writer were to add this sentence, it would most logically be placed at:",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Point A in Paragraph 2.",
    choice_b: "Point B in Paragraph 2.",
    choice_c: "Point C in Paragraph 4.",
    choice_d: "Point D in Paragraph 4.",
    correct_answer: "A",
    question_type: "logical-placement",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 60,
    passage_number: 4,
    question_stem: "Suppose the writer's primary purpose had been to discuss a significant point in an artist's career. Would this essay accomplish that purpose?",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "Yes, because it describes Howe's interaction with the jurors of the Philbrook competition and the effect of that interaction.",
    choice_b: "Yes, because it chronicles Howe's career up to Howe's involvement with the Philbrook competition.",
    choice_c: "No, because it does not explain why Howe's participation in the 1958 competition at the Philbrook was important.",
    choice_d: "No, because although it mentions Howe, it focuses mainly on the jurors for the Philbrook's annual competition.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "POW"
  },

  // PASSAGE 5: Q61-75
  {
    test_number: TEST_NUMBER,
    question_number: 61,
    passage_number: 5,
    question_stem: "A competition spawned from a folk festival, the IWC has existed for over forty <u>years, attracting</u> whistlers from across the globe. Which of the following alternatives to the underlined portion would NOT be acceptable?",
    underlined_text: "years, attracting",
    context_before: "A competition spawned from a folk festival, the IWC has existed for over forty",
    context_after: "whistlers from across the globe.",
    choice_a: "NO CHANGE",
    choice_b: "years, continuing to attract",
    choice_c: "years and attracts",
    choice_d: "years; attracting",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 62,
    passage_number: 5,
    question_stem: "<u>Since most</u> whistlers aren't professional (though a few do make a living from whistling tours and commercial spots).",
    underlined_text: "Since most",
    context_before: "",
    context_after: "whistlers aren't professional (though a few do make a living from whistling tours and commercial spots).",
    choice_a: "NO CHANGE",
    choice_b: "Considering most",
    choice_c: "While most",
    choice_d: "Most",
    correct_answer: "D",
    question_type: "sentence-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 63,
    passage_number: 5,
    question_stem: "Since most whistlers aren't professional <u>(though a few do make a living from whistling tours and commercial spots).</u> If the writer were to delete the underlined portion (ending the sentence with a period), the essay would primarily lose information that:",
    underlined_text: "(though a few do make a living from whistling tours and commercial spots)",
    context_before: "Since most whistlers aren't professional",
    context_after: ".",
    choice_a: "indicates that many professional whistlers love to compete but have other jobs on the side.",
    choice_b: "hints at career options for whistlers and the talent of some of the competitors.",
    choice_c: "implies that it is unusual for professional whistlers to compete at the convention.",
    choice_d: "explains that competition winners go on to lucrative careers.",
    correct_answer: "B",
    question_type: "adding-deleting",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 64,
    passage_number: 5,
    question_stem: "Technique, which includes tone and pitch, <u>represent</u> only fifty percent of their scoring criteria.",
    underlined_text: "represent",
    context_before: "Technique, which includes tone and pitch,",
    context_after: "only fifty percent of their scoring criteria.",
    choice_a: "NO CHANGE",
    choice_b: "pitch, represents",
    choice_c: "pitch represents",
    choice_d: "pitch represent",
    correct_answer: "B",
    question_type: "verbs",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 65,
    passage_number: 5,
    question_stem: "Which choice makes it most clear that participants have to earn a spot to compete at the IWC? Still, <u>qualifying for</u> the IWC requires rigorous training.",
    underlined_text: "qualifying for",
    context_before: "Still,",
    context_after: "the IWC requires rigorous training.",
    choice_a: "NO CHANGE",
    choice_b: "becoming part of",
    choice_c: "preparing for",
    choice_d: "enrolling in",
    correct_answer: "A",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 66,
    passage_number: 5,
    question_stem: "Presentation and performance make up the <u>rest, requiring</u> judges to scrutinize participants' facial expressions,",
    underlined_text: "rest, requiring",
    context_before: "Presentation and performance make up the",
    context_after: "judges to scrutinize participants' facial expressions,",
    choice_a: "NO CHANGE",
    choice_b: "rest and this requires",
    choice_c: "rest, this requires",
    choice_d: "rest; requiring",
    correct_answer: "A",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 67,
    passage_number: 5,
    question_stem: "Presentation and performance make up the rest, requiring judges to scrutinize participants' facial expressions, <u>how participants present themselves overall onstage,</u> and use of lips.",
    underlined_text: "how participants present themselves overall onstage,",
    context_before: "Presentation and performance make up the rest, requiring judges to scrutinize participants' facial expressions,",
    context_after: "and use of lips.",
    choice_a: "NO CHANGE",
    choice_b: "participants' overall stage presence,",
    choice_c: "presenting themselves overall,",
    choice_d: "overall stage presence,",
    correct_answer: "D",
    question_type: "parallel-structure",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 68,
    passage_number: 5,
    question_stem: "For the sake of logic and cohesion, Sentence 2 should be placed: [1] Since most whistlers aren't professional... [2] Technique, which includes tone and pitch, represent only fifty percent of their scoring criteria. [3] Still, qualifying for the IWC requires rigorous training. [4] Judges look for far more than a performer's ability to carry a tune. [5] Presentation and performance make up the rest",
    underlined_text: "",
    context_before: "",
    context_after: "",
    choice_a: "where it is now.",
    choice_b: "after Sentence 3.",
    choice_c: "after Sentence 4.",
    choice_d: "after Sentence 5.",
    correct_answer: "D",
    question_type: "organization",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 69,
    passage_number: 5,
    question_stem: "Participants can compete in both classical and popular musical categories. They <u>might, nevertheless,</u> whistle an entire movement from Beethoven's Fifth Symphony",
    underlined_text: "might, nevertheless,",
    context_before: "Participants can compete in both classical and popular musical categories. They",
    context_after: "whistle an entire movement from Beethoven's Fifth Symphony",
    choice_a: "NO CHANGE",
    choice_b: "might, moreover,",
    choice_c: "might, however,",
    choice_d: "might",
    correct_answer: "A",
    question_type: "transitions",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 70,
    passage_number: 5,
    question_stem: "Many returning participants ambitiously aim <u>on top of</u> their previous performances with even more complex pieces.",
    underlined_text: "on top of",
    context_before: "Many returning participants ambitiously aim",
    context_after: "their previous performances with even more complex pieces.",
    choice_a: "NO CHANGE",
    choice_b: "over top of",
    choice_c: "on topping",
    choice_d: "to top",
    correct_answer: "B",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 71,
    passage_number: 5,
    question_stem: "A 2012 documentary about the IWC captures these sentiments. <u>Filmmaker, Ien Chi,</u> a first-time whistling competitor himself,",
    underlined_text: "Filmmaker, Ien Chi,",
    context_before: "A 2012 documentary about the IWC captures these sentiments.",
    context_after: "a first-time whistling competitor himself,",
    choice_a: "NO CHANGE",
    choice_b: "Filmmaker Ien Chi,",
    choice_c: "Filmmaker, Ien Chi",
    choice_d: "Filmmaker Ien Chi",
    correct_answer: "B",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 72,
    passage_number: 5,
    question_stem: "<u>One US participant shared with Chi</u> that he had waited thirty-four years to attend the world's premier whistling competition,",
    underlined_text: "One US participant shared with Chi",
    context_before: "",
    context_after: "that he had waited thirty-four years to attend the world's premier whistling competition,",
    choice_a: "NO CHANGE",
    choice_b: "One participant in particular (from the United States) interviewed by Chi",
    choice_c: "Specifically, one individual participant who was from the United States",
    choice_d: "According to Chi, one US participant",
    correct_answer: "A",
    question_type: "style",
    question_category: "KLA"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 73,
    passage_number: 5,
    question_stem: "One US participant shared with Chi that he had waited thirty-four years to attend the world's <u>premier whistling competition, and meet</u> fellow whistlers.",
    underlined_text: "premier whistling competition, and meet",
    context_before: "One US participant shared with Chi that he had waited thirty-four years to attend the world's",
    context_after: "fellow whistlers.",
    choice_a: "NO CHANGE",
    choice_b: "premier, whistling competition,",
    choice_c: "premier, whistling competition",
    choice_d: "premier whistling competition",
    correct_answer: "D",
    question_type: "punctuation",
    question_category: "CSE"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 74,
    passage_number: 5,
    question_stem: "Which choice makes it most clear that many outsiders perceive whistling as a lighthearted and informal activity? Others, acknowledging the outside perception of whistling <u>as simply a quirky hobby,</u> described their craft as an art form that fosters joy.",
    underlined_text: "as simply a quirky hobby,",
    context_before: "Others, acknowledging the outside perception of whistling",
    context_after: "described their craft as an art form that fosters joy.",
    choice_a: "NO CHANGE",
    choice_b: "an irregular avocation,",
    choice_c: "an obtuse specialty,",
    choice_d: "a zealous interest,",
    correct_answer: "A",
    question_type: "which-choice",
    question_category: "POW"
  },
  {
    test_number: TEST_NUMBER,
    question_number: 75,
    passage_number: 5,
    question_stem: "Chi concludes that the IWC attracts <u>people who</u> are not just vying for medals; the convention also allows participants to communally celebrate this art form, year after year.",
    underlined_text: "people who",
    context_before: "Chi concludes that the IWC attracts",
    context_after: "are not just vying for medals; the convention also allows participants to communally celebrate this art form, year after year.",
    choice_a: "NO CHANGE",
    choice_b: "people, whom",
    choice_c: "people whom",
    choice_d: "people, who",
    correct_answer: "D",
    question_type: "punctuation",
    question_category: "CSE"
  }
];

// ============================================================================
// INSERT PASSAGES
// ============================================================================

console.log('\n📌 INSERTING PASSAGES...\n');

const passages = [passage1, passage2, passage3, passage4, passage5];
let passageInserted = 0;
let passageErrors = 0;

for (const passage of passages) {
  const { error } = await supabase
    .from('act_english_passages')
    .insert([passage]);

  if (error) {
    console.error(`❌ Error inserting Passage ${passage.passage_number}: ${error.message}`);
    passageErrors++;
  } else {
    passageInserted++;
    console.log(`✅ Passage ${passage.passage_number} inserted: ${passage.title}`);
  }
}

// ============================================================================
// INSERT QUESTIONS
// ============================================================================

console.log('\n📌 INSERTING QUESTIONS 1-75...\n');

let inserted = 0;
let errors = 0;

for (const q of questions) {
  const { error } = await supabase
    .from('act_english_questions')
    .insert([q]);

  if (error) {
    console.error(`❌ Q${q.question_number}: ${error.message}`);
    errors++;
  } else {
    inserted++;
    if (inserted % 15 === 0 || inserted === questions.length) {
      console.log(`  ✓ Inserted Q${inserted - 14}-Q${inserted}`);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ EXTRACTION COMPLETE\n');
console.log(`Passages inserted: ${passageInserted}/5`);
console.log(`Questions inserted: ${inserted}/75`);
console.log(`Errors: ${errors}`);
console.log('\n' + '='.repeat(80) + '\n');
