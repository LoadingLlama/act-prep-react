#!/usr/bin/env node

/**
 * EXTRACTION SCRIPT: Practice ACT 6 - Reading Test (Complete)
 * Source: /Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 6.txt
 *
 * Extracts:
 * - 4 Reading passages (Literary Narrative, Social Science, Humanities, Natural Science)
 * - 40 Reading questions (10 per passage)
 *
 * Answer Key (Normalized A-D):
 * Q1-10: B,B,A,A,C,D,C,D,A,B
 * Q11-20: B,B,C,C,A,B,A,A,C,D
 * Q21-30: B,A,D,D,C,A,D,A,D,C
 * Q31-40: B,D,A,A,D,C,C,B,C,A
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ============================================================================
// PASSAGE DATA
// ============================================================================

const TEST_NUMBER = 6;

const passages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    title: "LITERARY NARRATIVE: Introduction by Charlotte Noruzi",
    passage_type: "LITERARY_NARRATIVE",
    passage_text: `When my family first moved to the United States, my father was still traveling back and forth to Iran before joining us permanently. After one trip, he brought with him a small collection of Iranian children's books. These books, along with numerous others, were created under the Kanoon Parvaresh Fekri Koodakan va Nojavanan (Institute for the Intellectual Development of Children and Adolescents). To me, its iconic stylized rooster logo conveyed a positive and bright outlook for the betterment of children. In 1961, the Kanoon was established to enhance the quality and educational standards of children's literature and activities. A large part of the program was devoted to the publishing of high-quality, richly written and illustrated books for children and adolescents.

I have six books from that era. They were loaded with cultural and historical references and set apart from each other and from my American children's books in their individual and unique styles of illustration.

In times where I felt the most disconnected, the most doubtful of my identity, I would turn to these books, get lost in them, in the fantasy of them. They were my one connection to the culture I left behind. In them I found some remnant of my past life. I would open a book and feel like I was "home" again. I see now how the seeds to express my thoughts and ideas through pictures were sown. Out of the endearing times I spent with my little collection sprung the desire to illustrate books, to use calligraphy and hand-written text. This was my introduction to art and words living together and there's a little from each book in some aspect of my work, my own children's book.

My favorite of the collection is called Marmoolak Koochak Otagheh Man (My Room's Little Lizard) by Farshid Mesqali. Its surrealistic watercolors draw you into the realm of dreams. The hand lettering of the book's title and the deep black, blues, greens and purples that bleed softly into one another, making up the body of the lizard, were so beguiling to me. They still are. I see the influence in my own work. Baba Barfi was another, done in gorgeous hues of blue and greys, in a mix of drawing and watercolor. There is a quiet simplicity in the illustrations and the story that reminds me of the silence right after snowfall.

About 12 years ago, my mother visited Iran and brought back with her another set of children's books. These happened to be illustrated by an important figure from my childhood: Gholamali Maktabi, someone I hadn't thought of in years. I never until now got the message of the giving of all these books, first by my father and again by my mother. I had tucked Maktabi's wonderful books away in my memory all of these years and not until the idea for this essay presented itself, did I bring them out into the light. And he came out along with them.

Gholamali Maktabi was my father's dear and lifelong friend from their school days. He was a part of our family and we endearingly called him "Dhayee Maktabi," which means Uncle Maktabi in Farsi. I remember a sense of warmth always surrounding that name. I knew him first as the person behind the poignant, sensitive photographs taken of us in Iran as we were growing up. The images he recorded have served time and again as windows into my childhood, my personality as a child, images that connect me with who I was. His innate ability to capture with such simplicity and affection the smile or frown of a child can also be seen in his lifework as an illustrator of children's books. Dhayee Maktabi would spend time drawing with my sister and me when we were children.

In October 2007, after more than 30 years, I called Dhayee Maktabi. No time, it felt, had gone by. "I was drawn from a young age to painting," Maktabi remembers. "This interest ultimately led to my desire to become an illustrator and slowly began to replace painting for me—though to this day I still have a special love for drawing and painting. I've spent about forty years illustrating children's and adolescents' books and I expect that I will continue to do this for the foreseeable future. The thing that has always attracted me to illustrating for children and adolescents is the world that they inhabit, one which is full of mysteries and secrets."

Indeed, I believe that those photographic portraits of my family done long ago also served this purpose. My mother told me recently that Maktabi loved to just sit and observe us, our games and antics, our "secret worlds" that, through the small window of his shutter, were lovingly revealed.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    title: "SOCIAL SCIENCE: Down on the Batture by Oliver A. Houck",
    passage_type: "SOCIAL_SCIENCE",
    passage_text: `The Mississippi River batture is unique. Here we have a place that is neither water nor land; it is both. It depends on the time of year. Spanish and French traditions going back to the time of Rome recognized public rights to public things. The civil code declared that rivers and their banks were public, which would have closed the matter. But in the late 1700s along came Edward Livingston, a New Yorker with an American notion of private property, a keen legal mind, a nose for money, and an ambition as big as the Ritz.

Livingston's accomplishments in the courthouse and the legislature remain monuments today, but the case that made him famous was about dirt on the banks of the Mississippi at a prime location in downtown New Orleans. Livingston and his client who claimed the dirt stood to make a fortune. Indeed, Livingston declined a fee in the case. Instead, if he won he would get a piece of the victory, the most valuable real estate in New Orleans.

The American notion of property was not popular in New Orleans, whose people were accustomed to using the banks of rivers to beach their boats, promenade, fish, swim, rake mussels, and even take fill for their front yards. By precedent rising from centuries, the Mississippi batture was common ground. In a city oppressed by heat, the batture was also treasured ground, the place where everyone in society from cotton brokers to boat hands could enjoy the breeze, air pleasant to inhale, and the very sight of the river. When Livingston's client undertook to develop the batture he was claiming, a public mob arrived to interrupt his work. Every day.

Livingston's client made a frontal assault. He went out at low water, diked off the batture, and then arrested people coming to take the river sand in the old and accustomed way. The ensuing lawsuits rivaled the twists and turns of a Dickens novel. On one side was Livingston, claiming that private property was sacred in America. On the other was a who's who of wellborn local names right on up to the president of the United States. Thomas Jefferson considered the public character of the Mississippi to be a civic right and essential to his ambitions for settling the West. After Livingston won his first case, Jefferson had U.S. marshals evict him from the batture anyway, at which point Livingston sued the officer who evicted him. It got that bad.

When the dust settled, years later, Livingston emerged with his property deed, but he had ceded important claims to the city, including part of his real estate and development controls on the rest. Compromise that it was, the New Orleans batture would go from small wharves and open space to an impressive accumulation of mega-wharves and warehouses. New Orleaneans not only could no longer access the river; they could no longer even see it.

Enter Robert Livingston, Edward's brother, with an even more impressive list of accomplishments and a yet bigger coup in mind. He and Robert Fulton, who had either invented the steamboat or made a quick copy of someone else's, depending on your source, tendered an offer to New Orleans that it could not refuse, a monopoly on the Mississippi River.

Fulton's steamboat had one huge advantage for the future of the city; it could go upriver. The early flatboats didn't even try. Fulton's new boat could get back up in a week, although he had not exactly done it yet. The Fulton-Livingston team proposed a deal. They would deliver steamboat commerce to New Orleans, if the city would grant them all rights to the river trade. They would own the river.

Enter another challenger. Henry Shreve came from the Red River in northwestern Louisiana and saw Livingston's monopoly as a threat to the future of his region. He built his own steamship, sailed it down to New Orleans, loaded it with goods, and sailed back home again to a hero's welcome. People did that sort of thing back then. Fulton had only talked about going back upriver. Now Shreve had actually done it, and with merchandise on board. More threatening, Shreve tried it again. Livingston had to make his move, and so, as the second Shreve boat was ready to leave New Orleans with its cargo, he had the captain and the boat arrested.

The public sided against the Livingstons, as it had on the batture cases earlier, causing a small riot. Shreve was released the next day. A few months later a local judge dismissed the lawsuit. Edward Livingston might own a piece of the batture, but Robert would not own the river.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    title: "HUMANITIES: Passage A - Searching for Silence: John Cage's Art of Noise by Alex Ross / Passage B - This Is Your Brain on Music by Daniel J. Levitin",
    passage_type: "HUMANITIES",
    passage_text: `Passage A by Alex Ross

On August 29, 1952, David Tudor walked onto the stage of the Maverick Concert Hall, near Woodstock, New York, sat down at the piano, and, for four and a half minutes, made no sound. He was performing "4'33"," a conceptual work by John Cage. It has been called the "silent piece," but its purpose is to make people listen. "There's no such thing as silence," Cage said, recalling the premiere. "You could hear the wind stirring outside during the first movement. During the second, raindrops began pattering the roof, and during the third people themselves made all kinds of interesting sounds as they talked or walked out."

Composer and scholar Kyle Gann defines "4'33"" as "an act of framing, of enclosing environmental and unintended sounds in a moment of attention in order to open the mind to the fact that all sounds are music." That last thought ruled Cage's life: he wanted to discard inherited structures, open doors to the exterior world, "let sounds be just sounds." Gann writes, "It begged for a new approach to listening, perhaps even a new understanding of music itself, a blurring of the conventional boundaries between art and life."

On a simpler level, Cage had an itch to try new things. What would happen if you sat at a piano and did nothing? If you chose among an array of musical possibilities by flipping a coin and consulting the I Ching? If you made music from junkyard percussion, squads of radios, the scratching of pens, an amplified cactus?

Many people, of course, won't hear of it. Nearly six decades after the work came into the world, "4'33"" is still dismissed as "absolutely ridiculous," "stupid," and "a gimmick." Such judgments are especially common within classical music where Cage, who died in 1992, remains an object of widespread scorn.

Morton Feldman, another avant-garde musician, once said, "John Cage was the first composer in the history of music who raised the question by implication that maybe music could be an art form rather than a musical form." Feldman meant that, since the Middle Ages, even the most adventurous composers had labored within a craftsmanlike tradition. Cage held that an artist can work as freely with sound as with paint: he changed what it meant to be a composer, and every kid manipulating music on a laptop is in his debt. Not everything he did was laudable, or even tolerable. Yet the work remains inescapable, mesmerizing, and often unexpectedly touching. It encompasses some of the most violent sounds of the twentieth century, as well as some of the most gently beguiling. It confronts us with the elemental question of what music is, and confounds all easy answers.

Passage B by Daniel J. Levitin

The music of many avant-garde composers stretches the bounds of what most of us think music is. Going beyond the use of melody and harmony, and even beyond the use of instruments, these composers use recordings of found objects in the world such as jackhammers, trains, and waterfalls. They edit the recordings, play with their pitch, and ultimately combine them into an organized collage of sound with the same type of emotional trajectory—the same tension and release—as traditional music. Composers in this tradition are like the painters who stepped outside the boundaries of representational and realistic art—the cubists, the Dadaists, many of the modern painters from Picasso to Kandinsky.

What do the music of Bach and John Cage fundamentally have in common? On the most basic level, what distinguishes Busta Rhymes's "What's It Gonna Be?!" or Beethoven's "Pathétique" Sonata from, say, the collection of sounds you'd hear standing in the middle of Times Square or those you'd hear deep in a rainforest? As the composer Edgard Varése famously defined it, "Music is organized sound."

It is helpful to examine what music is made of. What are the fundamental building blocks of music? And how, when organized, do they give rise to music? The basic elements of any sound are loudness, pitch, contour, duration (or rhythm), tempo, timbre, spatial location, and reverberation. Our brains organize these fundamental perceptual attributes into higher-level concepts—just as a painter arranges lines into forms. When we listen to music, we are actually perceiving multiple attributes.

Each attribute can be varied without altering the others. The difference between music and a random or disordered set of sounds has to do with the way these fundamental attributes combine, and the relations that form between them.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    title: "NATURAL SCIENCE: How We Are Evolving by Jonathan K. Pritchard",
    passage_type: "NATURAL_SCIENCE",
    passage_text: `A few years ago it was extremely difficult for scientists to trace our species' genetic responses to our environment; the needed tools just did not exist. All that changed with the completion of the human genome sequence and the subsequent cataloguing of genetic variation. To understand exactly what we did, it helps to know a bit about how DNA is structured and how small changes can affect its function. The human genome sequence consists of about three billion pairs of DNA nucleotides, or "letters," that serve as an instruction manual for how to assemble a human. The manual is now known to contain a parts list of about 20,000 genes—strings of DNA letters that spell out the information required to build proteins. (Proteins, which include enzymes, do much of the work in cells.) About 2 percent of the human genome encodes proteins, and a roughly similar amount seems to be involved in gene regulation. Most of the rest of the genome has no known role.

Overall the genomes of any two people are extremely similar, differing in only about one out of every 1,000 nucleotide pairs. Sites where one nucleotide pair substitutes for another are referred to as single-nucleotide polymorphisms, or SNPs (pronounced "snips"), and the alternative versions of the DNA at each SNP are called alleles. Because most of the genome does not encode proteins or regulate genes, most SNPs probably have no measurable effect on the individual. But if a SNP occurs in a region of the genome that does have a coding or regulating function, it may affect the structure or function of a protein or where and how much of the protein is made. In this way, SNPs can conceivably modify almost any trait, be it height, eye color, ability to digest milk, or susceptibility to diseases.

When natural selection strongly favors a particular allele, it becomes more common in the population with each generation, while the disfavored allele becomes less common. Eventually, if the environment remains stable, the beneficial allele will spread until everyone in the population carries it, at which point it has become fixed in that group. This process typically takes many generations. In theory, a helpful allele could become fixed in as little as a few hundred years if it conferred an extraordinarily large advantage. Conversely, a less advantageous allele could take many thousands of years to spread.

It would be great if in our efforts to understand recent human evolution, we could obtain DNA samples from ancient remains and actually track the changes of favored alleles over time. But DNA usually degrades quickly in ancient samples, thereby hindering this approach. Research groups around the world have developed methods of examining genetic variation in modern-day humans for signs of natural selection that has happened in the past.

One such tactic is to comb DNA data from many different people for stretches that show few differences in SNP alleles within a population. The spread of selected alleles by natural selection can leave distinctive patterns in the SNP data: if an existing allele suddenly proves particularly helpful when a population finds itself in new circumstances, that allele can reach high frequency (while remaining rare in other populations).

Over the past few years multiple studies have identified several hundred genome signals of apparent natural selection that occurred within the past 60,000 years or so. In a few of these cases, scientists have a pretty good grasp on the selective pressures and the adaptive benefit of the favored allele. For example, among dairy-farming populations in Europe, the Middle East and East Africa, the region of the genome that houses the gene for the lactase enzyme that digests lactose (the sugar in milk) shows clear signs of having been the target of strong selection. In most populations, babies are born with the ability to digest lactose, but the lactase gene turns off after weaning, leaving people unable to digest lactose as adults. Writing in the American Journal of Human Genetics in 2004, a team at the Massachusetts Institute of Technology estimated that variants of the lactase gene that remain active into adulthood achieved high frequency in European dairy-farming groups in just 5,000 to 10,000 years. In 2006 a group led by Sarah Tishkoff, who is now at the University of Pennsylvania, reported in Nature Genetics that they had found rapid evolution of the lactase gene in East African dairy-farming populations. These changes were surely an adaptive response to a new subsistence practice.`
  }
];

// ============================================================================
// QUESTIONS DATA
// ============================================================================

const questions = [
  // Passage 1: Questions 1-10
  {
    question_number: 1,
    question_stem: "As it is used in line 63, the word sensitive most nearly means:",
    choice_a: "pliant.",
    choice_b: "perceptive.",
    choice_c: "touchy.",
    choice_d: "evasive.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 2,
    question_stem: "The author of the passage can best be described as a children's book author and illustrator who is:",
    choice_a: "remembering the day she first read a children's book from Iran.",
    choice_b: "considering the influences on her artistic interests and work.",
    choice_c: "explaining the goals of the Kanoon Parvaresh Fekri Koodakan va Nojavanan.",
    choice_d: "analyzing the loss of her cultural identity.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 3,
    question_stem: "In the passage, Maktabi describes his professional work as primarily that of:",
    choice_a: "an illustrator.",
    choice_b: "a painter.",
    choice_c: "a photographer.",
    choice_d: "a writer.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 4,
    question_stem: "Which of the following events in the passage occurred first chronologically?",
    choice_a: "Noruzi moves to the United States.",
    choice_b: "Maktabi photographs Noruzi.",
    choice_c: "Maktabi and Noruzi speak on the phone.",
    choice_d: "Noruzi receives books by Maktabi.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 5,
    question_stem: "Noruzi indicates that each of the six books mentioned in the second paragraph (lines 16-20) features a:",
    choice_a: "similar style of illustration.",
    choice_b: "similar style of storytelling.",
    choice_c: "unique style of illustration.",
    choice_d: "unique style of storytelling.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 6,
    question_stem: "In the passage, the label \"the collection\" (line 34) most nearly refers to the:",
    choice_a: "six books that Noruzi owns that are from the early years of the Kanoon.",
    choice_b: "books by Maktabi that Noruzi owns.",
    choice_c: "books that Noruzi herself has illustrated.",
    choice_d: "entire group of books that have been created under the Kanoon.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 7,
    question_stem: "The passage most strongly suggests that Noruzi's own children's book includes:",
    choice_a: "pop-up images.",
    choice_b: "poems by other artists.",
    choice_c: "calligraphy.",
    choice_d: "objects glued to the pages to create texture.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 8,
    question_stem: "As presented in the passage, is Noruzi's statement in lines 10-13 best described as a fact or an opinion?",
    choice_a: "A fact; it directly states the purpose behind the establishment of the Kanoon.",
    choice_b: "A fact; it makes clear that Noruzi is an expert on the history of the Kanoon.",
    choice_c: "An opinion; it presents Noruzi's view on whether the Kanoon met its educational goals.",
    choice_d: "An opinion; it states that the books published by the Kanoon were richly written.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 9,
    question_stem: "The main purpose of the fourth paragraph (lines 34-45) is for Noruzi to:",
    choice_a: "describe what is moving and inspiring to her about two of her favorite children's books from Iran.",
    choice_b: "contrast the prose styles of the books Marmoolak Koochak Otagheh Man and Baba Barfi.",
    choice_c: "describe several specific ways the book Baba Barfi has influenced her work as an illustrator.",
    choice_d: "explain, using two examples, why most children's books from Iran are painted in dark hues.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 10,
    question_stem: "In a section of the essay not included here, Noruzi explains: \"Little did I know that those little sessions [drawing with Maktabi] would awaken a desire for art and expression. I made the important connection between my love of children's books and the time spent with Dhayee Maktabi as a child.\" How does this statement expand on information provided in the passage?",
    choice_a: "It further explains the elements of Maktabi's children's books that Noruzi found most inspiring.",
    choice_b: "It provides further details about how spending time with Maktabi inspired Noruzi to create art.",
    choice_c: "It suggests the feelings Maktabi had about his time spent drawing with Noruzi and her sister.",
    choice_d: "It outlines the idea Noruzi had for what came to be her first project as a children's book illustrator.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 2: Questions 11-20
  {
    question_number: 11,
    question_stem: "In the third and fourth paragraphs (lines 20-46), the author portrays the main conflict over the Mississippi River batture as primarily between:",
    choice_a: "the government of New Orleans and that of the United States.",
    choice_b: "a lawyer-client team and a large segment of the public, including the US president.",
    choice_c: "two social classes.",
    choice_d: "two ambitious brothers.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 12,
    question_stem: "Which of the following events referred to in the passage occurred first chronologically?",
    choice_a: "The Fulton-Livingston team proposed a deal to the city of New Orleans.",
    choice_b: "Edward Livingston sued the officer who evicted him from the batture.",
    choice_c: "Shreve sailed from New Orleans to northwestern Louisiana.",
    choice_d: "A local judge threw out Robert Livingston's case against Shreve.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 13,
    question_stem: "It can most reasonably be inferred that when the author mentions the \"American notion of property\" (line 20), he is referring to the idea that:",
    choice_a: "limits should be placed on how much property one person can own.",
    choice_b: "the owner of public lands is the public, not the government.",
    choice_c: "the owner of private property controls the use and purpose of that property.",
    choice_d: "certain responsibilities to the public go along with owning property.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 14,
    question_stem: "It is reasonable to infer that the author sets the phrase \"every day\" (line 32) apart from the preceding sentence to emphasize the:",
    choice_a: "monotony of an endeavor.",
    choice_b: "enormous opportunity on the river.",
    choice_c: "determination of the public.",
    choice_d: "enduring character of the river.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 15,
    question_stem: "Which of the following statements about Shreve is best supported by the passage?",
    choice_a: "He foiled Robert Livingston's plans to control commerce on the Mississippi River.",
    choice_b: "He designed and built a flatboat that could carry cargo up the Mississippi River.",
    choice_c: "He secured federal funding for the development of steamboat commerce on the Mississippi River.",
    choice_d: "He sued the Livingston brothers for stealing his steamboat design.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 16,
    question_stem: "The author presents the drama in the last paragraph primarily as:",
    choice_a: "a private citizen trying to respond to a public defeat.",
    choice_b: "a ferocious competition with an outcome the public favored.",
    choice_c: "an ongoing disagreement between a federal and a local judge.",
    choice_d: "a bitter rivalry that drove two brothers apart.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 17,
    question_stem: "According to the passage, Edward Livingston's client reacted to the public mob by:",
    choice_a: "diking off the area of the batture that he was claiming.",
    choice_b: "using his influence to gain the media's support for his position.",
    choice_c: "selling one part of the batture and purchasing another.",
    choice_d: "increasing the rents on his waterfront properties in New Orleans.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 18,
    question_stem: "According to the passage, as a result of the Edward Livingston case, what replaced the small wharves on the New Orleans batture?",
    choice_a: "Mega-wharves and warehouses",
    choice_b: "Fishing docks and residential neighborhoods",
    choice_c: "Protected open space and recreational facilities",
    choice_d: "Steamboat-building facilities",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 19,
    question_stem: "According to the passage, what deal did the Fulton-Livingston team propose to the city of New Orleans?",
    choice_a: "They would provide steamboat service if the city would outlaw flatboats on the Mississippi River.",
    choice_b: "They would build commercial wharves downtown in exchange for tax relief from the city.",
    choice_c: "They would bring steamboat commerce to the city in exchange for all rights to the river trade.",
    choice_d: "They would fund city development if the city would endorse their steamboat business.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 20,
    question_stem: "According to the passage, who achieved a heroic hometown status by establishing steamboat traffic to and from New Orleans?",
    choice_a: "Robert Livingston",
    choice_b: "Edward Livingston",
    choice_c: "Thomas Jefferson",
    choice_d: "Henry Shreve",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 3: Questions 21-30
  {
    question_number: 21,
    question_stem: "The author of Passage A most likely includes the anecdote in the first paragraph in order to:",
    choice_a: "introduce Tudor as a musician who was one of Cage's strongest supporters.",
    choice_b: "provide a sense of what a performance of \"4'33\"\" might be like.",
    choice_c: "assert Cage's importance to avant-garde music by describing a work he once performed.",
    choice_d: "illustrate how popular Cage was at the time \"4'33\"\" premiered.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 22,
    question_stem: "As it relates to \"4'33\",\" Gann's definition of framing (lines 14-16) can best be understood to mean that:",
    choice_a: "the piece treats as music any sounds that occur within the set period of time that is the work's length.",
    choice_b: "the piece is meant to be played only within small, enclosed spaces.",
    choice_c: "a piano playing at the beginning and end of the piece provides a frame for other sounds occurring in the middle of the piece.",
    choice_d: "the piano mimics any natural sounds that may typically occur in the four and a half minutes it takes to play the piece.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 23,
    question_stem: "As it is used in line 31, the word dismissed most nearly means:",
    choice_a: "released.",
    choice_b: "sent away.",
    choice_c: "let go.",
    choice_d: "rejected.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 24,
    question_stem: "Based on Passage A, which of the following statements best expresses how the author feels about Cage?",
    choice_a: "He believes Cage had some interesting ideas but did not try hard enough to reach a wide audience.",
    choice_b: "He tolerates Cage's experiments but is not particularly moved by them.",
    choice_c: "He enjoys \"4'33\"\" but feels most of Cage's other work was too gimmicky.",
    choice_d: "He admires Cage's work but acknowledges that it can be difficult to appreciate.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 25,
    question_stem: "Passage B is best described as:",
    choice_a: "an argument for popular composers to take more risks when writing music.",
    choice_b: "an outline of one theory about what determines musical preferences.",
    choice_c: "a brief overview of what distinguishes music from sound.",
    choice_d: "an in-depth analysis of the work of several famous avant-garde composers.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 26,
    question_stem: "The main idea of the first paragraph of Passage B (lines 52-65) is that:",
    choice_a: "many avant-garde composers step outside established musical traditions to make music.",
    choice_b: "most avant-garde musicians approach composition the same way modern painters do.",
    choice_c: "objects like jackhammers are often used instead of traditional instruments in avant-garde music.",
    choice_d: "avant-garde music follows an emotional trajectory unlike that of traditional music.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 27,
    question_stem: "Based on Passage B, the found objects used by avant-garde composers can most nearly be defined as:",
    choice_a: "secondhand orchestral instruments.",
    choice_b: "instruments that were once popular but have gone out of style.",
    choice_c: "discarded scrap materials that can be used to build instruments.",
    choice_d: "anything that can make sound but is not a standard musical instrument.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 28,
    question_stem: "Based on the passages, Cage's \"4'33\"\" primarily differs from the compositions described in lines 54-61 of Passage B in that \"4'33\"\":",
    choice_a: "is mainly concerned with the absence of organized sound, while the other compositions have been manipulated into organized sound.",
    choice_b: "features a piano as the only sound, while the other compositions feature varied and more unusual instruments.",
    choice_c: "is much shorter than the other compositions, which can go on for hours.",
    choice_d: "was only performed once, whereas the other compositions have been performed more often.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 29,
    question_stem: "In Passage A, Gann is quoted as claiming, in part, that \"all sounds are music\" (line 16). Is this assertion supported by the definition of music put forth in lines 85-88 of Passage B?",
    choice_a: "Yes, because Passage B develops the idea that avant-garde musicians use unconventional instruments to make music.",
    choice_b: "Yes, because Passage B illustrates how avant-garde music follows the same emotional trajectory as traditional music.",
    choice_c: "No, because Passage B mentions Cage only in passing and does not elaborate on his idea that any sound can be music.",
    choice_d: "No, because Passage B states that random sounds have to combine to form relationships before they can be considered music.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 30,
    question_stem: "Based on the passages, what is one similarity that the composers mentioned in the first paragraph of Passage B (lines 52-65) share with Cage as he is described in Passage A?",
    choice_a: "The composers often debut material at the Maverick Concert Hall where Cage debuted \"4'33\".\"",
    choice_b: "The composers build most of their music around loudness, pitch, and tempo, which is what Cage did.",
    choice_c: "The composers experiment with unconventional objects to make music, just as Cage sometimes did.",
    choice_d: "The composers often compose \"silent\" pieces like Cage's \"4'33\".\"",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 4: Questions 31-40
  {
    question_number: 31,
    question_stem: "The main purpose of the passage is to:",
    choice_a: "explain the numerous steps involved in mapping the human genome sequence.",
    choice_b: "discuss the evolutionary process of genetic traits spreading across populations.",
    choice_c: "summarize researchers' skeptical response to the conclusions drawn by the human genome project.",
    choice_d: "compare two prominent methods of combing human DNA data for evidence of genetic evolution.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 32,
    question_stem: "Based on the passage, if a SNP occurred in a part of the genome that does not encode protein or regulate genes, the SNP would most likely:",
    choice_a: "affect the structure or function of a nearby protein.",
    choice_b: "influence how much protein is made.",
    choice_c: "modify the ability of an individual to digest milk.",
    choice_d: "have no measurable effect on an individual.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 33,
    question_stem: "In the passage, height, eye color, and the ability to digest milk are offered as examples of:",
    choice_a: "the variety of traits that SNPs can modify.",
    choice_b: "a collection of traits caused by the same SNP in the human genome.",
    choice_c: "traits that SNPs could modify, but haven't.",
    choice_d: "traits caused by SNPs occurring in an unknown region of the human genome.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 34,
    question_stem: "It can most reasonably be inferred from the passage that when examining modern-day human DNA data for signs of relatively recent natural selection, genetic researchers:",
    choice_a: "look for distinctive patterns in SNP data.",
    choice_b: "study data from primarily ancient DNA samples.",
    choice_c: "expect to find that most SNPs have measurable effects on individuals.",
    choice_d: "comb the DNA of relatively few people within a population.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 35,
    question_stem: "The passage suggests that for European and East African dairy-farming populations, variants of the lactase gene:",
    choice_a: "occurred in numerous SNPs in an individual's genome.",
    choice_b: "spread by a means other than natural selection.",
    choice_c: "appeared prior to 60,000 years ago.",
    choice_d: "provided an adaptive benefit.",
    correct_answer: "D",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 36,
    question_stem: "The passage indicates that after the completion of the human genome sequence, scientists found it easier to:",
    choice_a: "prevent the DNA in ancient samples from degrading.",
    choice_b: "spread a beneficial allele through a population.",
    choice_c: "trace human genetic responses to the environment.",
    choice_d: "prime the environment for the spread of a beneficial allele.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 37,
    question_stem: "The passage indicates that approximately what percent of the human genome has no known role?",
    choice_a: "2 percent",
    choice_b: "4 percent",
    choice_c: "96 percent",
    choice_d: "100 percent",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 38,
    question_stem: "As it is used in line 42, the word fixed most nearly means:",
    choice_a: "repaired.",
    choice_b: "established.",
    choice_c: "connected.",
    choice_d: "directed.",
    correct_answer: "B",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 39,
    question_stem: "According to the passage, when natural selection strongly favors a beneficial allele, the allele will spread through a population until everyone carries it if:",
    choice_a: "it is rare in other populations.",
    choice_b: "it does not alter the structure of a protein.",
    choice_c: "the environment remains stable.",
    choice_d: "the population is relatively large.",
    correct_answer: "C",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 40,
    question_stem: "Lines 42-47 primarily serve to illustrate the point that the:",
    choice_a: "amount of time needed for a beneficial allele to spread depends on the degree of advantage the allele provides.",
    choice_b: "evolution of the modern human genome is relatively slow compared to that of the ancient human genome.",
    choice_c: "spread of beneficial alleles in ancient populations will take scientists thousands of years to track.",
    choice_d: "length of time needed for a trait to appear in a population is widely disputed among researchers.",
    correct_answer: "A",
    question_type: "reading",
    question_category: "KEY",
    lesson_id: null
  }
];

// ============================================================================
// MAIN EXTRACTION FUNCTION
// ============================================================================

async function extractTest6Reading() {
  try {
    let passagesInserted = 0;
    let questionsInserted = 0;
    const passageUUIDs = {};

    // Insert passages first
    console.log('\n=== INSERTING PASSAGES ===\n');

    for (const passage of passages) {
      const { data, error } = await supabase
        .from('act_reading_passages')
        .insert({
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

      passageUUIDs[passage.passage_number] = data.id;
      passagesInserted++;
      console.log(`✓ Inserted Passage ${passage.passage_number}: ${passage.passage_type}`);
    }

    // Insert questions with passage_id references
    console.log('\n=== INSERTING QUESTIONS ===\n');

    for (const question of questions) {
      // Determine which passage this question belongs to (10 questions per passage)
      const passageNumber = Math.ceil(question.question_number / 10);
      const passageId = passageUUIDs[passageNumber];

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
        console.log(`✓ Inserted questions 1-${questionsInserted}`);
      }
    }

    console.log('\n=== EXTRACTION COMPLETE ===');
    console.log(`✓ ${passagesInserted}/4 passages inserted`);
    console.log(`✓ ${questionsInserted}/40 questions inserted`);
    console.log('\nAll Practice ACT 6 Reading content successfully extracted!\n');

  } catch (error) {
    console.error('Error during extraction:', error);
    throw error;
  }
}

// Run the extraction
extractTest6Reading().catch(console.error);
