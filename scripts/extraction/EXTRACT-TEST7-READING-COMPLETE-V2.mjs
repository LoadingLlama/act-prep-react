#!/usr/bin/env node

/**
 * EXTRACTION SCRIPT: Practice ACT 7 - Reading Test (Complete)
 * Source: /Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 7.txt
 * Lines: 2675-3801
 *
 * Extracts:
 * - 4 Reading passages (Literary Narrative, Social Science, Humanities, Natural Science)
 * - 40 Reading questions (10 per passage)
 *
 * Answer Key (Normalized A-D):
 * Q1-10: D,B,A,C,A,D,B,A,C,D
 * Q11-20: A,D,C,B,C,A,A,D,C,B
 * Q21-30: C,C,A,B,D,B,C,D,A,A
 * Q31-40: D,B,B,C,D,A,C,B,A,D
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

// ============================================================================
// PASSAGE DATA
// ============================================================================

const TEST_NUMBER = 7;

const passages = [
  {
    id: randomUUID(),
    test_number: TEST_NUMBER,
    passage_number: 1,
    title: "LITERARY NARRATIVE: City Kid by Nelson George",
    passage_type: "LITERARY_NARRATIVE",
    passage_text: `I am in the living room of apartment 6C in the Samuel J. Tilden housing projects in Brownsville, Brooklyn. It is 1960. I am four. I stand on my tiptoes in my stocking feet. My small brown fingers clutch the edge of a Motorola high-fidelity stereo, which is made of shiny lacquered wood and has a lemony smell, from the polish my mother applies every Saturday afternoon.

I feel the bass speakers in my stomach. I smell the polish. I feel the music. Looking over the edge, down into the bowels of the hi-fi, I watch the turntable needle roll across the grooves of a seven-inch record with a blue-and-white label at 45 revolutions per minute. The song is "Please Mr. Postman" by the Marvelettes.

As much as I enjoy "Please Mr. Postman," I'm anxious to hear the next record. Not just because it's Roy Orbison's "Oh, Pretty Woman" (which is the first record I ever asked my mother to buy for me), but because above "Mr. Postman" on the turntable are a slew of seven-inch singles suspended around a fat brown cylinder. Once "Please Mr. Postman" finishes, the needle arm moves away, a single vinyl 45 plops down on the turntable, and the needle returns, catching the groove and sending the rhythm of "Oh, Pretty Woman" vibrating through my body.

This Motorola stereo was the centerpiece of my family's living room, and our social life. Ma didn't allow my little sister, Andrea, or me in our living room too often, because she didn't want us sitting on her plastic-covered sofa or fingering the dice-shaped lighter on her glass-and-wood living-room table. But if we were playing records in the early evenings or on weekends, it was okay.

All through my childhood, from my first consciousness of music into the early seventies, that Motorola was my passport, not simply to records, but to the vast nation outside New York that the music came from. While the black-and-red labels of Atlantic 45s carried a Broadway address, most of the records in her collection came from Memphis (the Stax Records label was pale blue, with a finger-snapping logo) or Detroit (Motown's black-and-white label had a red star for the Motor City, while Tamla's colors were yellow and brown). As I read the labels of the records Ma brought home, I slowly became familiar with the cities of soul—Philadelphia, Los Angeles, Chicago, and Cincinnati. By the time I was an adolescent, I could identify certain names that recurred in the credits. Way before I understood what these credits meant, or who these people were, I was already collecting info for the books and articles I had no idea I would eventually write.

My interest in these records stemmed from a desire to better understand my mother's life. My mother was a soul girl: petite and cute, with a bright, girlish smile. Arizona Bacchus George, aka Doll, aka Ma, was full of life, and loved to laugh. Though burdened with raising two kids alone in a Brooklyn housing project, she didn't allow herself to become a stranger to fun. Not only was her ever-growing stack of 45s a testament to her love of music and dance, but she regularly held parties in that sacrosanct living room for her girlfriends and their male admirers.

I remember the time we took a pilgrimage to the Apollo Theater for a matinee show. It was a chilly, overcast day, and my mother and I joined a long line of black folk, as far as I could see, huddled on 125th Street, awaiting entry. Once inside, we sat in the orchestra near the back. I remember the elements of the James Brown Revue quite distinctly: Pigmeat Markham did his famous "Here Comes the Judge" routine; the Fabulous Flames danced like demons and harmonized like choir boys; the J.B.s, behind the antic introduction of MC Danny Ray, banged out a medley of the great man's hits.

Then Brown himself appeared, a short, dark man with shiny, processed hair who whirled and shuddered and shouted. On the way back to Brooklyn on the A train, I babbled to my mother about the sweaty man who kept tossing the cape off his back and running back to the mike to wail, "Please! Please! Please!"

It was special for me, not only because I'd seen James Brown, but because I was too young for so many of the shows my mother attended. Unlike today, when the separation between adult and kid entertainment has been blurred to the detriment of both, soul music was fundamentally music by, about, and for adults. When my ma put on her auburn wig to see Otis Redding, or her blue eyeliner to watch the Supremes, it was to experience things so raw and so smooth, they weren't right for a child to see.`
  },
  {
    id: randomUUID(),
    test_number: TEST_NUMBER,
    passage_number: 2,
    title: "SOCIAL SCIENCE: Dual Passage on Gestures",
    passage_type: "SOCIAL_SCIENCE",
    passage_text: `Passage A by Jen Doll

Leaving a group of friends the other night, I turned to wave. "Text me!" one of them said, waggling her thumbs in the air. I didn't need the words to understand.

Today, we may be more likely to move our fingers across a tablet than turn the pages of a book; to swipe a card, press a button, or enter numbers onto a keypad than turn a key. We type on keyboards more often than we put pens to paper, and we roll down the windows of our cars by pressing a button instead of cranking a handle. Yet when it comes to gesturing, certain outdated motions endure.

Gestures can generally be sorted into two categories, according to Spencer Kelly, an associate professor of psychology at Colgate University. "Co-speech gestures" are the idiosyncratic, often unconscious ways we move our hands as we talk. Researchers believe these gestures help us think and speak and even learn. "Emblematic gestures" are the culturally codified motions that we use to supplement or substitute speech—the peace sign, the thumbs-up. Some of these gestures are symbolic, and some, as in the case of thumb-texting, are imitative.

As with words, we tend to pick up our hand movements from the groups with whom we communicate most frequently—especially our peers. If your friends are thumb-texting at you, you will thumb-text back at them. Soon enough, Kelly says, "the movement of your thumbs can be done without speech, and people know what it is. That's the definition of an emblem."

Some emblems are recycled, their meanings changing as cultures evolve. Anthony Corbeill at the University of Kansas suspects that the current American connotation of the thumbs-up gesture developed during the 20th century, when GIs used the thumbs-up to signify that a plane was cleared for takeoff. Other emblems are coined afresh, the result of ubiquitous new technology or the quirks of a public figure. The fist bump, which went viral after Barack and Michelle Obama were photographed in action in 2008, can be traced to the germophobic mid-20th-century baseball player Stan Musial, who is said to have preferred it to the high five.

Passage B by Ipke Wachsmuth

The interpretations of sounds and movements are closely related. For years, the link could be demonstrated only indirectly by asking test subjects what information they gleaned from others who were speaking and gesticulating. Recent brain research has provided much better insight. For example, neuroscientist Spencer D. Kelly of Colgate University has studied gestures with the help of event-related potentials—characteristic brain waves consisting of a sequence of peaks and valleys—that occur in certain patterns when one person observes another communicating. The patterns reveal neuronal-processing steps in particular brain regions. One of the negative peaks (a valley), referred to as N400, is especially significant. It occurs when we stumble over an inappropriate and unexpected word, for example, when we hear a sentence like "He spread his toast with socks."

Kelly hooked test subjects to an electroencephalograph and charted their event-related potentials while they watched a video. In it, an actor spoke while using gestures to indicate characteristics of an object. A hand movement might fit a word semantically, such as when the word "tall" was illustrated by gesturing at a long-stem glass on a table. A gesture might also be used to convey additional information, such as when "tall" was accompanied by finger movements that indicated the thinness of the elongated stem of the glass. Viewers saw contradictory scenes, too, in which an actor combined the word "tall" with a gesture that referred to a short object on the table. And sometimes an actor made no gesture at all; in this control situation, the test subjects heard only the spoken word.

Subjects exhibited substantially different brain-wave patterns depending on the situation. The researchers found strong negative peaks—a so-called N400 effect—whenever speech and gesture contradicted one another. They interpreted this phenomenon to mean that gestures and words are in fact processed together: observers factor the meaning of a gesture into their interpretation of a word.

This conclusion was supported by the finding that the event-related potentials exhibited no comparable negativity in the control situation. Even during early processing, the curves differ depending on whether the hand movement fits the word, complements it or contradicts it. "The semantic content" of hand gestures, Kelly says, "contributes to the processing of word meaning in the brain."`
  },
  {
    id: randomUUID(),
    test_number: TEST_NUMBER,
    passage_number: 3,
    title: "HUMANITIES: The Lost Painting by Jonathan Harr",
    passage_type: "HUMANITIES",
    passage_text: `Close up, Francesca Cappelletti could see the damage caused to the Doria St. John by time. Over its entire surface the picture had lost many tiny particles of paint, mere pinpricks—puntinature, Paola Sannucci, the restorer, called them—not discernible from a normal viewing distance. These particles had fallen at nearly regular intervals, at the intersections where the threads of the canvas, the warp and the weft, crossed each other and formed small nodules. The canvas had been cheap, made of poor-quality hemp and carelessly woven. Still, Caravaggio might have used just such a canvas. He had once painted a picture on a bedsheet. Another time, after he'd left the Mattei palazzo and was living alone in a small house off the Via della Scrofa, he had spread a half-finished canvas on a kitchen table and dined off the back of it.

The earlier examination of the Capitoline St. John had revealed it to be in much better shape than the Doria, in large part because the Capitoline canvas was of higher quality, more tightly woven with linen threads of uniform diameter.

The technical examination lasted the entire day, and for long periods Francesca had nothing to do but observe. The portable X-ray machine could capture only a small portion of the painting, and the technicians had to keep repositioning the machine, sixteen times in all, to get a composite of the entire picture. Francesca wandered in and out of the room and tried to dream up an excuse for leaving early.

Giampaolo Correale had a particular interest—an obsession, one could call it—with finding incised lines in Caravaggio's paintings. Few other Baroque painters had made these types of lines, scored with the butt end of a brush into the wet undercoat, and no one had made them in quite the same way as Caravaggio. He painted from life, from models sitting before him, and most art historians believed that he didn't make preliminary drawings. In this, he had departed from a long-established tradition by which painters made detailed studies before applying brush to canvas. The scored lines, it was surmised, had served as a guide for positioning his models. In the finished paintings, the lines were sometimes visible to the naked eye, usually at a certain angle, in a raking light. Not every one of his paintings revealed signs of these marks. But to Caravaggio experts, their presence was almost as good as the artist's signature.

Two weeks earlier, during the examination of the Capitoline St. John, Correale had hoped to find incised lines, and thus add to the proof that it was Caravaggio's original. He and Paola Sannucci and the technicians had scrutinized every inch of the painting, but in the end they had not found a scoring mark. True, there were a few faint ridges on the borders of the boy's figure, and for a while Correale maintained that these could be scoring marks, but everyone else interpreted them merely as brushstrokes in wet paint, places where Caravaggio had defined the boy's flesh against the dark background.

But evidence of a different kind had emerged from beneath the surface of the Capitoline version, and it seemed to confirm the painting's authenticity. The X rays and the infrared images had revealed a ghostly image—a pentimento—at the precise point where the boy's arm and the curved horn of the ram intersected. The artist had painted the arm first, and then had painted the ram's horn over the finished arm. This constituted a clear sign that the painting was the authentic one. A copyist, following the outlines of an original painting, would not have bothered to paint the arm and then paint the horn over it. The infrared images also revealed other pentimenti, in the folds and drapery of the red and white cloths, and in the foliage in the dark background. These were false starts and adjustments that no copyist would have needed to make.

So Correale had come to accept the Capitoline as the original even before the technical examination of the Doria version. All the same, the paintings were so strikingly similar—the outline of one placed atop the other matched in almost every contour—that it seemed necessary to examine the Doria picture as fully as the Capitoline. But how, Correale wondered, could anyone make such a near perfect copy?

This question interested Francesca, too. She thought of all the copies art historian Roberto Longhi had found of Caravaggio's lost Taking of Christ. None of them had been good enough for Longhi to mistake for the original. Yet the Doria St. John had fooled him completely.`
  },
  {
    id: randomUUID(),
    test_number: TEST_NUMBER,
    passage_number: 4,
    title: "NATURAL SCIENCE: Archives of Life: Science and Collections by Richard Fortey",
    passage_type: "NATURAL_SCIENCE",
    passage_text: `Safely stored behind the scenes at the Natural History Museum in London is a slightly twisted vertebrate skeleton preserved on a slab of creamy white limestone. This particular specimen was discovered in quarries near Solnhofen in southern Germany in 1861. The fine limestones of Solnhofen are ideally suited to making lithographic stones, and in the nineteenth century lithographs provided one of the most important means of book illustration—indeed lithographic stones of this quality are still in demand by artists today. Vast quantities of this lithographic limestone of Jurassic age—about 150 million years old—have been taken out of opencast workings, where the rocks can be split into convenient slabs a centimetre or two thick. On many of these flat-surfaced pieces of rock, fossils are laid out like gifts on a salver.

Some Solnhofen fossils are rather common, such as those of delicate little sea lilies. Others are both rare and more spectacular. There are a great variety of fish species known nowhere else, for example. The fossil horseshoe crab Mesolimulus provides evidence that its living relatives breeding each year along the Atlantic coast of America have changed little over tens of millions of years. Delicate flying reptiles—half a dozen species or so of pterodactyl—testify by contrast to creatures that have vanished from the Earth forever. A few species of dinosaur are known, of the most delicate sort (Compsognathus), and quite unlike the monsters of popular imagination. Insects include dragonflies (Aeschnogomphus) whose every wing-vein is visible as delicate tracery. All these creatures are preserved in rocks which originated as tacky muds flooring a lagoon that lay offshore from a richly biodiverse habitat. Such special circumstances sampled and preserved a much wider variety of organisms than the usual fossil locality, and the wide range of fossils provides a rare window into an entire habitat from a very different world. Yet if the remains were not kept carefully in museums all this evidence of past life would perish, and new generations of children and scholars could not interrogate the past. Local museums at Eichstatt and Solnhofen fulfil that function for those who would come to Bavaria and marvel at its geological treasures. But some of the specimens from the Solnhofen limestone have a relevance that extends far beyond the reconstruction of the late Jurassic scene, and these specimens are treasures in the collections of museums around the world. None more so than that specimen—a mere 35 cm at its longest—safely curated in the Natural History Museum in London.

For this is the first example ever discovered of the early bird Archaeopteryx. It remains one of the most important specimens in the British national collections. The next complete fossil bird of the same species—the so-called Berlin specimen—was found sixteen years later. It would be difficult to overstate the importance of this London specimen of Archaeopteryx in the history of biology.

First, the date of its discovery is only two years after the publication of The Origin of Species. Charles Darwin famously described what he called 'difficulties on theory' in that work, where he anticipated a number of criticisms that he expected his great idea to encounter. Prime among these was 'the rarity or absence of intermediate forms' in the fossil record.

Second, the detailed scientific description of Archaeopteryx was an accomplishment of Richard Owen in 1863; he was later to become first director of the Natural History Museum. Owen was no Darwinian, but he was an able anatomist. It must have proved anathema to him when Archaeopteryx was recruited as probably the best example of an 'intermediate form' and one that had turned up with the impeccable timing usually associated with a good piece of theatre. Its amalgam of reptilian and bird features (feathers and wishbone among them) was a striking vindication of the notion of descent with modification, and a rebuttal to those who might wonder how it was possible for animals to make the transition from earth to the skies.

In this sense Archaeopteryx became a kind of talisman for evolution. Owen was enough of a 'Museum man' to ensure that this fossil was safely curated, and part of any museum's function is just that—to protect material regardless of the current explanations of its importance. The old bird has now been joined by half a dozen or so subsequent examples worldwide, but its importance has not diminished over the years.`
  }
];

// ============================================================================
// QUESTIONS DATA
// ============================================================================

const questions = [
  // Passage 1: Questions 1-10
  {
    question_number: 1,
    question_stem: "The tone of the passage could best be described as:",
    choice_a: "remorseful; the narrator imagines the life his mother could have had without the burden of raising a family in a Brooklyn housing project.",
    choice_b: "jubilant; the narrator expresses his delight that the musicians he revered in childhood eventually became such big stars.",
    choice_c: "inspirational; the narrator explains how he managed to overcome the obstacles he faced during childhood and pursue an education in music.",
    choice_d: "nostalgic; the narrator fondly describes his childhood experiences with music and his relationship with his mother.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 2,
    question_stem: "In the fourth paragraph (lines 25-32), the perspective of the narrator shifts from being that of a child describing an enjoyable experience to being that of:",
    choice_a: "an adult reflecting on the role music played during his childhood.",
    choice_b: "an adult reminiscing about his relationship with his sister.",
    choice_c: "a child daydreaming about what his life will be like when he grows up.",
    choice_d: "a child describing what his mother likes to do for fun.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 3,
    question_stem: "It can reasonably be inferred that the phrase \"the great man's hits\" (lines 72-73) refers to the music of:",
    choice_a: "James Brown.",
    choice_b: "Otis Redding.",
    choice_c: "MC Danny Ray.",
    choice_d: "Pigmeat Markham.",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 4,
    question_stem: "The passage states that as a child the narrator associated the colors and designs on the labels of his mother's records with:",
    choice_a: "favorite musicians.",
    choice_b: "various genres of music.",
    choice_c: "different American cities.",
    choice_d: "important events that occurred in his childhood.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 5,
    question_stem: "In the narrator's description of his mother's stereo, which detail most clearly points to the care she gave it?",
    choice_a: "\"Motorola high-fidelity\" (line 5)",
    choice_b: "\"Lacquered wood\" (line 6)",
    choice_c: "\"Lemony smell\" (line 6)",
    choice_d: "\"Fat brown cylinder\" (lines 19-20)",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 6,
    question_stem: "The passage indicates that the first record the narrator asked his mother to buy for him was by:",
    choice_a: "the Marvelettes.",
    choice_b: "Roy Orbison.",
    choice_c: "Otis Redding.",
    choice_d: "James Brown.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 7,
    question_stem: "The passage suggests that the narrator was initially drawn to his mother's records because he wanted to:",
    choice_a: "learn about places outside of New York City.",
    choice_b: "sing and dance in the style of the great soul musicians.",
    choice_c: "impress his friends with his knowledge of soul music.",
    choice_d: "gain insight into his mother's life.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 8,
    question_stem: "The narrator describes the performances of which of the following Apollo Theater performers in terms of the contrast between singing style and dancing style?",
    choice_a: "Pigmeat Markham",
    choice_b: "The Fabulous Flames",
    choice_c: "The J.B.s",
    choice_d: "James Brown",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 9,
    question_stem: "The narrator suggests that going to the concert at the Apollo Theater was special because:",
    choice_a: "Otis Redding and the Supremes joined James Brown onstage.",
    choice_b: "soul music wasn't considered appropriate for children.",
    choice_c: "James Brown was his favorite musician.",
    choice_d: "it was the first time he had ridden a train.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 10,
    question_stem: "Another writer made the following statement about soul music:\n\nMusically, I believe, soul remains the story of how a universal sound emerged from the black church.\n\nHow does this statement relate to the ideas expressed in the passage?",
    choice_a: "It echoes the narrator's view of soul as he recalls the living room, where he listened to music.",
    choice_b: "It's consistent with the narrator's opinion that soul was originally meant to be music for listeners of all races.",
    choice_c: "It contradicts the narrator's claim that soul was secular music, not religious music.",
    choice_d: "It addresses a topic, the origin of soul, which the narrator doesn't address in the passage.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 2: Questions 11-20
  {
    question_number: 11,
    question_stem: "Passage A primarily focuses on which of the following types of gestures?",
    choice_a: "Co-speech gestures",
    choice_b: "Repurposed gestures",
    choice_c: "Emblematic gestures",
    choice_d: "Illogical gestures",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 12,
    question_stem: "The main point of the second paragraph of Passage A (lines 4-11) is that:",
    choice_a: "although technology is changing how we interact with the world, many gestures remain the same.",
    choice_b: "we have more ways to communicate than ever, so gestures are increasingly important.",
    choice_c: "as a result of new technologies, new gestures are being created at a fast rate.",
    choice_d: "because technology has become so complicated, gestures are symbolic of simpler times.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 13,
    question_stem: "Which of the following quotations from Passage B best represents the passage's central claim?",
    choice_a: "\"Kelly hooked test subjects to an electroencephalograph and charted their event-related potentials\" (lines 60-61).",
    choice_b: "\"Subjects exhibited substantially different brain-wave patterns depending on the situation\" (lines 75-76).",
    choice_c: "\"Observers factor the meaning of a gesture into their interpretation of a word\" (lines 81-82).",
    choice_d: "\"The curves differ depending on whether the hand movement fits the word, complements it or contradicts it\" (lines 86-88).",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 14,
    question_stem: "Details in Passage B most strongly suggest that recent research into the relationship between speech and gestures is more fruitful than previous research because scientists can now:",
    choice_a: "simultaneously test reactions to both logical and illogical speech and gestures.",
    choice_b: "objectively measure the brain's responses to speech and gestures.",
    choice_c: "question test subjects about their reactions to gestures.",
    choice_d: "use video recording to document how gestures change over time.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 15,
    question_stem: "The main purpose of the second paragraph of Passage B (lines 60-74) is to:",
    choice_a: "describe the experiment that Kelly conducted.",
    choice_b: "explain that speech and gestures are processed separately.",
    choice_c: "illustrate how test subjects reconciled differences between speech and gestures.",
    choice_d: "clarify why speech and gestures relate to each other.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 16,
    question_stem: "Based on Passage B, which of the following sentences would be most likely to evoke an N400 negative peak in brain activity?",
    choice_a: "As the batteries die, the radio's volume fades.",
    choice_b: "The baker decorates the cake with frosting.",
    choice_c: "A car squeezes through the alleyway.",
    choice_d: "At the top of the tree sits a library.",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 17,
    question_stem: "According to Passage B, while their brain activity was being monitored, test subjects in Kelly's experiment watched:",
    choice_a: "two actors gesturing to each other.",
    choice_b: "past test subjects gesturing to each other.",
    choice_c: "a video of an actor speaking and gesturing.",
    choice_d: "Kelly speaking and gesturing.",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 18,
    question_stem: "How do the writing styles of the two passages compare?",
    choice_a: "Passage A is more argumentative and persistent than Passage B.",
    choice_b: "Passage A is more personal and conversational than Passage B.",
    choice_c: "Passage B is more humorous and anecdotal than Passage A.",
    choice_d: "Passage B is more opinion-based and loosely organized than Passage A.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 19,
    question_stem: "Which of the following statements best captures the main difference in the purposes of the two passages?",
    choice_a: "Passage A explains how hand gestures enhance speech, while Passage B explains how hand gestures overrule speech.",
    choice_b: "Passage A argues that technology is decreasing our use of hand gestures, while Passage B examines how speech and hand gestures evolved together.",
    choice_c: "Passage A considers the types and origins of hand gestures, while Passage B considers how hand gestures are processed by the brain.",
    choice_d: "Passage A speculates that gestures existed before speech, while Passage B contrasts logical hand gestures with illogical hand gestures.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 20,
    question_stem: "The gesture referred to in lines 2-3 of Passage A is similar to the gestures referred to in Kelly's experiment in Passage B in that these gestures all are:",
    choice_a: "used by the authors' friends.",
    choice_b: "associated with cell phones.",
    choice_c: "describing recent trends.",
    choice_d: "referring to physical objects.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 3: Questions 21-30
  {
    question_number: 21,
    question_stem: "Which of the following statements comparing the Doria St. John and the Capitoline St. John is best supported by the passage?",
    choice_a: "The Doria St. John was painted on cheaper canvas than was the Capitoline St. John.",
    choice_b: "The Doria St. John canvas had smaller nodules than that of the Capitoline St. John.",
    choice_c: "The Capitoline St. John showed evidence of more puntinature than did the Doria St. John.",
    choice_d: "The Capitoline St. John contained more incised lines than did the Doria St. John.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 22,
    question_stem: "It can most reasonably be inferred from the passage that Francesca wanted to leave the examination early mainly because she:",
    choice_a: "had already witnessed an examination of the Doria St. John.",
    choice_b: "disliked working alongside Correale.",
    choice_c: "was uninterested in Caravaggio's paintings.",
    choice_d: "disliked being a mere observer.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 23,
    question_stem: "According to the passage, who at first maintained that the Capitoline St. John might show evidence of incised lines?",
    choice_a: "Sannucci",
    choice_b: "Correale",
    choice_c: "Francesca",
    choice_d: "The technicians",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 24,
    question_stem: "The main purpose of the sixth paragraph (lines 60-75) is to:",
    choice_a: "describe the discovery that helped prove the authenticity of the Capitoline St. John.",
    choice_b: "provide a more specific description of the scene depicted in the St. John painting.",
    choice_c: "describe the steps a copyist must take when re-creating a painting.",
    choice_d: "provide a definition of the term \"pentimento.\"",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 25,
    question_stem: "In the last paragraph, the comparison between Longhi's appraisal of the Taking of Christ copies and Longhi's appraisal of the Doria St. John mainly serves to:",
    choice_a: "demonstrate that Taking of Christ was one of Caravaggio's more popular paintings.",
    choice_b: "suggest that Longhi studied the Taking of Christ copies more thoroughly than he did the Doria St. John.",
    choice_c: "emphasize that the Doria St. John was painted with unusual skill.",
    choice_d: "prove that the copyist who painted the Doria St. John was another well-known Baroque artist.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 26,
    question_stem: "Which of the following details from the passage best exemplifies the idea that Caravaggio sometimes used unconventional canvases for his paintings?",
    choice_a: "He once dined off the back of a half-finished painting.",
    choice_b: "He used colorful cloths as the backdrop for some of his paintings.",
    choice_c: "He painted the St. John on woven linen.",
    choice_d: "He once painted a picture on a bedsheet.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 27,
    question_stem: "As it is used in line 24, the word capture most nearly means:",
    choice_a: "seize.",
    choice_b: "divert.",
    choice_c: "document.",
    choice_d: "control.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 28,
    question_stem: "According to the passage, Caravaggio used incised lines in his paintings most likely to:",
    choice_a: "guide the positioning of his models.",
    choice_b: "reflect light off the surface of his paintings.",
    choice_c: "indicate the authenticity of the painting.",
    choice_d: "separate his style from that of other Baroque painters.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 29,
    question_stem: "The passage states that most experts who study Caravaggio agree that:",
    choice_a: "the practice of using incised lines in painting was pioneered by Caravaggio.",
    choice_b: "the presence of Caravaggio's style of incised lines is strong evidence that a painting is an authentic Caravaggio.",
    choice_c: "even an experienced copyist could not have painted the Doria St. John.",
    choice_d: "an authentic Caravaggio probably would not contain as many false starts and adjustments as the Capitoline St. John had.",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 30,
    question_stem: "In the context of the passage, which of the following is evidence of a pentimento in the Capitoline St. John?",
    choice_a: "The brushstrokes that define the boy's flesh against the dark background",
    choice_b: "The contrast of the red and white cloths against the dark background",
    choice_c: "The faint ridges on the border of the boy's figure",
    choice_d: "The ram's horn painted over the boy's finished arm",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 4: Questions 31-40
  {
    question_number: 31,
    question_stem: "In terms of its overall structure, the passage can best be described as:",
    choice_a: "a description of the types of specimens found at the Natural History Museum in London, followed by a discussion of the importance of the museum.",
    choice_b: "an overview of the geological discoveries made in Solnhofen, followed by a discussion of one particular discovery.",
    choice_c: "a list of the types of fossils Darwin used to research his theory, followed by a description of a particular fossil he discovered.",
    choice_d: "a general explanation of the process of making lithographic stones, followed by an example of how the stones are used.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 32,
    question_stem: "The passage most strongly suggests that in the history of biology, the discovery of the Archaeopteryx fossil was significant mainly because it:",
    choice_a: "made the Natural History Museum of London the most visited museum in the world.",
    choice_b: "was the first bird fossil ever discovered.",
    choice_c: "helped scientists accurately reconstruct the late Jurassic scene.",
    choice_d: "helped fill a critical gap in Darwin's evolutionary theory.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 33,
    question_stem: "The passage author's characterization of Owen as a \"Museum man\" (lines 81-82) can best be described as:",
    choice_a: "a compliment; the author respects Owen as both a Darwinian and an anatomist.",
    choice_b: "a compliment; the author appreciates Owen's understanding of the importance of safely curating a fossil.",
    choice_c: "an insult; the author resents Owen's lack of interest in the Archaeopteryx fossil.",
    choice_d: "an insult; the author believes the Archaeopteryx fossil should have been curated by a more capable anatomist than Owen.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 34,
    question_stem: "In the passage, the main point the author makes about museums is that they primarily:",
    choice_a: "exist to educate tourists about the areas they are visiting.",
    choice_b: "function to protect and preserve specimens for future study.",
    choice_c: "preserve only the specimens excavated from nearby sites.",
    choice_d: "display only the specimens that are currently considered to be important.",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 35,
    question_stem: "The detail about the Archaeopteryx fossil being \"a mere 35 cm at its longest\" (line 48) helps establish a contrast between the fossil's small size and the:",
    choice_a: "considerable time it took to curate the fossil.",
    choice_b: "substantial impact the fossil had on the scientific community.",
    choice_c: "overall complexity of Archaeopteryx's bone structure.",
    choice_d: "ferocity associated with the Archaeopteryx species.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 36,
    question_stem: "Which of the following events mentioned in the passage occurred first chronologically?",
    choice_a: "An Archaeopteryx fossil was discovered in Solnhofen.",
    choice_b: "The Archaeopteryx fossil known as the Berlin specimen was discovered.",
    choice_c: "Darwin's book The Origin of Species was published.",
    choice_d: "Owen became the first director of the Natural History Museum.",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 37,
    question_stem: "The passage author characterizes the timing of the Archaeopteryx fossil discovery as ideal. Which of the following people mentioned in the passage would be most likely to support this characterization?",
    choice_a: "Darwin",
    choice_b: "Owen",
    choice_c: "Critics of Darwin's theory",
    choice_d: "Visitors of the Eichstatt and Solnhofen museums",
    correct_answer: "C",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 38,
    question_stem: "It can reasonably be inferred that one reason the Archaeopteryx fossil qualifies as an example of an \"intermediate form\" is that:",
    choice_a: "its mixture of reptilian and bird features demonstrates the notion of descent with modification.",
    choice_b: "its significance was not fully realized until long after it had been curated.",
    choice_c: "it was discovered in the time between the excavations of the Mesolimulus and Compsognathus fossils.",
    choice_d: "it convinced critics that animals were not yet capable of transitioning from earth to the skies.",
    correct_answer: "B",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 39,
    question_stem: "Based on the passage, compared to the \"delicate little\" sea lily fossils found at Solnhofen, the fossils of certain species of fish found at Solnhofen are more:",
    choice_a: "well-preserved.",
    choice_b: "indistinct.",
    choice_c: "rare.",
    choice_d: "fragile.",
    correct_answer: "A",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 40,
    question_stem: "As it is used in line 40, the word interrogate most nearly means:",
    choice_a: "request.",
    choice_b: "demand.",
    choice_c: "signal.",
    choice_d: "examine.",
    correct_answer: "D",
    question_type: "reading-comprehension",
    question_category: "KEY",
    lesson_id: null
  }
];

// ============================================================================
// MAIN EXTRACTION FUNCTION
// ============================================================================

async function extractTest7Reading() {
  try {
    let passagesInserted = 0;
    let questionsInserted = 0;

    console.log('\n=== STARTING TEST 7 READING EXTRACTION ===\n');
    console.log('Source: Practice ACT 7.txt (lines 2675-3801)');
    console.log('Test Number: 7');
    console.log('Total Passages: 4');
    console.log('Total Questions: 40\n');

    // Insert passages first
    console.log('=== INSERTING PASSAGES ===\n');

    for (const passage of passages) {
      const { data, error } = await supabase
        .from('act_reading_passages')
        .insert({
          id: passage.id,
          test_number: passage.test_number,
          passage_number: passage.passage_number,
          title: passage.title,
          passage_text: passage.passage_text,
          passage_type: passage.passage_type
        })
        .select('id')
        .single();

      if (error) {
        console.error(`Error inserting passage ${passage.passage_number}:`, error);
        throw error;
      }

      passagesInserted++;
      console.log(`✓ Inserted Passage ${passage.passage_number}: ${passage.passage_type}`);
      console.log(`  UUID: ${data.id}`);
    }

    // Insert questions with passage_id references
    console.log('\n=== INSERTING QUESTIONS ===\n');

    for (const question of questions) {
      // Determine which passage this question belongs to (10 questions per passage)
      const passageNumber = Math.ceil(question.question_number / 10);
      const passageId = passages[passageNumber - 1].id;

      const { error } = await supabase
        .from('act_reading_questions')
        .insert({
          test_number: TEST_NUMBER,
          question_number: question.question_number,
          question_stem: question.question_stem,
          choice_a: question.choice_a,
          choice_b: question.choice_b,
          choice_c: question.choice_c,
          choice_d: question.choice_d,
          correct_answer: question.correct_answer,
          question_type: question.question_type,
          question_category: question.question_category,
          lesson_id: question.lesson_id,
          passage_id: passageId
        });

      if (error) {
        console.error(`Error inserting question ${question.question_number}:`, error);
        throw error;
      }

      questionsInserted++;
      if (questionsInserted % 10 === 0) {
        console.log(`✓ Inserted questions ${questionsInserted - 9}-${questionsInserted} (Passage ${passageNumber})`);
      }
    }

    console.log('\n=== EXTRACTION COMPLETE ===');
    console.log(`✓ ${passagesInserted}/4 passages inserted`);
    console.log(`✓ ${questionsInserted}/40 questions inserted`);
    console.log('\nAll Practice ACT 7 Reading content successfully extracted!\n');

    // Verify answer key
    console.log('=== ANSWER KEY VERIFICATION ===');
    const answers = questions.map(q => q.correct_answer).join(',');
    console.log('Expected: D,B,A,C,A,D,B,A,C,D,A,D,C,B,C,A,A,D,C,B,C,C,A,B,D,B,C,D,A,A,D,B,B,C,D,A,C,B,A,D');
    console.log('Extracted:', answers);
    console.log('Match:', answers === 'D,B,A,C,A,D,B,A,C,D,A,D,C,B,C,A,A,D,C,B,C,C,A,B,D,B,C,D,A,A,D,B,B,C,D,A,C,B,A,D' ? '✓' : '✗');

  } catch (error) {
    console.error('\n=== EXTRACTION FAILED ===');
    console.error('Error during extraction:', error);
    throw error;
  }
}

// Run the extraction
extractTest7Reading().catch(console.error);
