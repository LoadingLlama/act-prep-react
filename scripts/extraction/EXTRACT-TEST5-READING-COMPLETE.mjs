#!/usr/bin/env node

/**
 * EXTRACTION SCRIPT: Practice ACT 5 - Reading Test (Complete)
 * Source: /Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 5.pdf
 *
 * Extracts:
 * - 4 Reading passages (Prose Fiction, Social Science, Humanities, Natural Science)
 * - 40 Reading questions (10 per passage)
 *
 * Questions use A/B/C/D format for Reading section
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

const TEST_NUMBER = 5;

const passages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    title: "LITERARY NARRATIVE: Passage A is adapted from The Piano Shop on the Left Bank / Passage B is adapted from Me and My Violin",
    passage_type: "PROSE_FICTION",
    passage_text: `Passage A by Thad Carhart

Even when Luc was busy and could not talk he always made me welcome and allowed me to wander around the inner sanctum of the back room on my own. When things were quieter, he seemed glad of the company and would tell me about the pianos that had just arrived. Our talks made real for me one of his fundamental beliefs, that each and every piano had completely individual characteristics, even if of the same manufacturer and age.

Sometimes he knew all the details, had even met the owners and talked about their instrument with them and knew intimately how they had treated it. Other times he knew nothing beyond what he could see, feel, or hear. Most often pianos came to him from auctions and charity sales, their history anonymous. But even then, like an expert in artifacts, he could deduce a great deal: whether a piano had been played much or little, whether it had been in an environment with the proper level of humidity (one of his cardinal rules), whether there had been children in the household, even whether it had recently been transported by ship. ("The worst thing you can possibly do to a piano," he told me more than once.) At these moments he was part detective, part archaeologist, part social critic.

His attitude about how people treated their pianos seemed to mirror his philosophy of life. While regretting the depredations worked by children on keyboards and strings, he regarded them as tolerable because the piano was at least used and, as he put it, "au sein de la famille" ("at the heart of the family"). It was more than just any piece of furniture, but it was that, too, and if drinks were spilled and stains bit into shiny finishes, it was the price one paid for initiating the young to a joy that should stem from familiarity rather than reverence.

Those who preserved their piano as an altar upon which the art of music was to be worshipped irritated Luc, but he was deeply respectful of serious musicians who used and depended upon their instrument for their livelihood.

Passage B by Arnold Steinhardt

Marc Lifschey, one of the greatest oboists of his era, told me that after retiring as a performer and teacher, he sold his oboe. On the face of it, giving up an instrument you no longer use seems perfectly reasonable, but nevertheless I was taken aback. Marc was not merely an excellent oboist; he was a great artist. Still, Marc didn't do it alone. He and his oboe did it together. Even in retirement, wouldn't Marc have some sort of lasting relationship with his oboe that transcended performing on it? Wouldn't he want to keep it if for no other reason than as a reminder of the magnificent music the two of them had made together?

Joseph Roisman, the distinguished first violinist of the Budapest String Quartet, seemed to be content to give up his beloved Lorenzo Storioni when he agreed to sell it to me after the Quartet retired. But when I finally met with him, he had second thoughts. "Steinhardt," he said to me plaintively, "I'll sell the violin to you some day, but for now I'm enjoying playing chamber music with my friends every Friday night." And that is exactly what he did until his death a year or two later.

Lifschey and Roisman dealt with retirement in different ways, but their stories made me wonder about not only what I'll do with my violin if and when I retire, but also about the very nature of a musician's day-to-day, year-to-year relationship with his instrument.

I began playing violin when I was six years old, and now I'm seventy-six. It has been an integral part of my life for the last seven decades. Does that make the violin my very close friend? Well, yes. Sometimes. The violin obviously can't speak with words, but when I ask something of it, the instrument can respond with an astonishing range of substance and emotion. This is friendship on a most exalted level.

There are other moments, however, when the violin stubbornly refuses to do my bidding—when it only reluctantly plays in tune, or makes the sound I want, or delivers the music's essence for which I strive. Then I have to cajole, bargain or adjust to its every whim. Some friend; more like an adversary, you might say.

Or is the violin my partner? A woman once went backstage to congratulate the great violinist Jascha Heifetz after a concert. "What a wonderful sound your violin has, Mr. Heifetz!" she exclaimed. Heifetz leaned over his violin that lay in its open case, listened intently for a moment, and said, "Funny, I don't hear a thing." My violin also lies mute in its case without me—but, on the other hand, I stand mute on the concert stage without it.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    title: "INFORMATIONAL: Notes from a Wedding by Lauren Wilcox Puchowski",
    passage_type: "SOCIAL_SCIENCE",
    passage_text: `It was never Kenney Holmes's intention to become a wedding singer. The grandson of West Indian immigrants, Holmes was raised in Gordon Heights, on Long Island, in what he calls "a small black community founded by like-minded thinkers," families of immigrants and Southern blacks who, as Holmes says, "didn't come here to fool around" and who handed down to their children their own keen sense of ambition.

"We grew up in that kind of atmosphere," he says, "of positive thinking, of getting educated, whether or not you had a degree."

Like any American boy in the 1950s and '60s, he was fascinated with popular music: He listened to the area's one radio station, which "mostly played Sinatra"; sometimes in the evenings, with a coat hanger stuck into the top of his portable radio, he could pick up a faint signal from WWRL, a rhythm and blues station in New York City. When he was a teenager, his brother brought home a guitar. "I was 16, it was a Sunday night," he says. "I sat down and played 'I Can't Get No Satisfaction.' I was addicted."

While he was not a virtuoso, he was, he discovered, good at making money at it. He learned three songs—"Satisfaction" by the Rolling Stones, "And I Love Her" by the Beatles, and "Shotgun" by Junior Walker and the All Stars—and formed a band. "We went out and sold it," he says. "We could play those three songs all night. We got pretty popular out on the island, playing battle of the bands, fire halls, high school proms, for $10 a night."

Still, a career as a musician was not what he, or his family, had had in mind. Over the next few years, he says: "I did everything I could not to be a guitar player. I went to college not to be a guitar player." Thinking he would be a psychiatrist, he took pre-med classes but didn't complete a degree. Along the way, he continued playing nightclubs and parties.

In his mid-20s, he visited his brother in Washington. Washington looked, to Holmes, like a good place to be an ambitious, career-minded black man, but it also had a thriving music scene in nightclubs and hotel lounges, and the next 15 years played out as a sort of tussle between his creative pursuits and his more business-driven impulses. Trying to work his way up in the music scene, he played five and six nights a week in nightclubs and wrote his own music. He started a recording studio called Sound Ideas, which trawled local talent for the makings of a hit song, but he found the pickings slim.

The club scene, after a long while, began to wear on him, as well. Unwilling to resign himself to the life of a starving artist, when an agent approached him in the early '90s about specializing in wedding and private parties, Holmes decided to try it.

It was a revelation. "I could make in one night what I used to make in five," he says. And "it changed the culture of what I was doing."

Holmes was well-suited for the role of event bandleader. His production skills helped him control his band's sound, and his familiarity with country, big-band and classical music made him popular with audiences who wanted, as he says, "a tango or a Viennese waltz," as well as Wilson Pickett.

Because business ebbs and flows with the seasons and the economy, Holmes has always kept a variety of sidelines, including a job driving a limousine for nine years to put his oldest daughter through a private high school and college. These days, at gigs, he hands out a stack of million-dollar "bills" printed with his image and his current enterprises: bandleader, commercial mortgage broker, hard money lender.

Holmes uses as many as eight musicians and two singers for weddings. He accepts turnover as a fact of running a band, but his current core lineup has, in the mercurial world of part-time performers, been fairly steady. Sam Brawner, the drummer, and Atiba Taylor, the sax player, have played with him for three and four years, respectively, and Bruce Robinson, the keyboardist, has played with him for 15.

This is perhaps partly because Holmes insists on making music. During performances, he lets his musicians take the lead and uses specialized, stripped-down tracks, called digital sequences, to set the tempo and fill in musical parts when necessary, ultimately preferring the messy alchemy of live music to something more canned. The musicians say that this is in contrast to other bandleaders they've worked for, who often rely heavily on recordings and use musicians more as visual props. Holmes's respect for the music endears him to his musicians. "These guys play from the heart," says Robinson. "They're not just trying to get through the gig."`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    title: "INFORMATIONAL: Photography Changes How Cultural Groups Are Represented and Perceived by Edwin Schupman",
    passage_type: "HUMANITIES",
    passage_text: `Using photographs as educational resources presents particular challenges and must be done with care. There is always more than face value in any photo, and historical photos of American Indians are no exception. Photography's rise in the late nineteenth century coincided with great change in American Indian communities—an era that capped over three hundred years of diseases, wars, cultural disruption, and land dispossession. As Indian people struggled to adapt to catastrophic changes to their old ways of living, photographers took thousands of studio portraits and made what they believed to be neutral ethnographic images of the "vanishing Indian." As Indian cultures bent under pressure to assimilate into mainstream America, photographers routinely captured images that compared the new "civilized" Indian to the tradition-bound "savages." Indian delegations that traveled to Washington, D.C., to defend tribal treaty rights were photographed in studios and in front of federal buildings. Photographers also accompanied government expeditions to the West where they documented traditional cultures, leading the way for tourists and commercial photographers who followed, carrying their cameras and preconceptions into Native American communities. These efforts generated a legacy of photographic images of American Indian people that can serve today as rich educational resources. But if used carelessly, they can also fuel romanticized and stereotypical perceptions of American Indians.

Consider some of the many photographs of Goyathlay, the Apache man who Mexicans named "Geronimo." He and other Chiricahua Apaches fought a protracted war from 1863 to 1886 against the United States for the right to live in their traditional homelands rather than on reservations.

The Chiricahua Apaches' fight for freedom captured the American imagination in the late nineteenth century. "Geronimo," especially, became a legendary figure and a media phenomenon whose legacy has lasted into the twenty-first century. He became synonymous with courage, daring, and savage ruthlessness. World War II paratroopers shouted his name as they jumped from airplanes into combat. Movies, television shows, comic books, popular songs, posters, T-shirts, and American cities have borne his image and name. One photo that shows Goyathlay and three other Chiricahuas in their camp just prior to surrendering to U.S. forces in 1886 documents a critical and difficult day for the people who had fought so diligently for their freedom.

In another well-known studio portrait, circa 1890, Goyathlay poses with a rifle. To late-nineteenth-century Americans, Geronimo was a dangerous enemy, yet at the same time a curiosity and romantic symbol of the "Wild West." This photo personifies the renegade image but, strangely, it was taken about two to four years after Goyathlay surrendered—while he was a prisoner of war. Why, then, was this photo taken? What meaning did it convey at the time? What must have been in Goyathlay's mind? What does the photo mean today? Is it loaded with historical truths or is it as empty as the prisoner's bullet chamber?

A few years later, Goyathlay was photographed again, this time in a more pastoral pose and place—holding a melon in a garden with his wife and three of their children. What was the meaning behind this photo? Did people of the time see it as a simple family photo, or did it personify the government's policy toward Indians at the time—subduing feared and hated warriors, "re-educating" them, and teaching them to farm in order to guide them toward a "better" way of life? Ironically, the Apaches had long farmed as part of the traditional life they fought so tenaciously to protect.

The educational potential of photographs is enormous. However, photographs are not objective; they can easily tell as many lies as truths. As much as any written document, they have to be read with care in order to be understood accurately in unbiased and nonstereotypical terms. Every photo of people contains history, culture, and context. To do justice to the subjects and their stories, it is crucial to fill in the information gaps. In addition to conducting background research, try putting yourself inside these photos—stand next to Goyathlay, his peers, his wife, and their children, and imagine their lives—you might begin to understand the world from their points of view. Framed with factual information and viewed empathetically, each photograph can reach its richest potential as a significant educational opportunity and resource.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    title: "INFORMATIONAL: Summer World: A Season of Bounty by Bernd Heinrich",
    passage_type: "NATURAL_SCIENCE",
    passage_text: `Adaptations of plants to deserts include dormancy and a variety of structural and behavioral adaptations. The majority of desert plants depend on a strategy that capitalizes on small size. They are annuals that spring up from dry, dormant, heat-resistant seeds. Some of these seeds may wait up to half a century before they are activated. The plants' challenge is to be quick enough to respond to rain so that they can produce their seeds before the earth dries up again, while not jumping the gun to start growth until there is sufficient water for them to grow to maturity for seed production. Some achieve this balance on a tightrope by "measuring" rainfall. They have chemicals in their seeds that inhibit germination, and a minimum amount of rain is required before these are leached out. Others have seed coats that must be mechanically scarred to permit sufficient wetting for germination, and the scarring happens only when they are subjected to flash floods in the riverbeds where they grow. A plant in the Negev Desert releases its seed from a tough capsule only under the influence of water through a mechanism that resembles a Roman ballistic machine. Its two outer sepals generate sideways tension that can fling two seeds out of the fruit, but the two seeds are held inside by a lock mechanism at the top. However, when the sepals are sufficiently wetted, then the tension increases to such an extent that the lock mechanism snaps, and the capsule "explodes" and releases the seeds.

In moist regions where it rains predictably (though not necessarily in abundance), we help agricultural plants to capture the precipitation by scarring the soil to facilitate the infiltration of the water into it, and hence into the roots. Least runoff and maximum water absorption are achieved by plowing the soil. However, such a strategy would not work in a true desert such as the Negev. A different program is required there because rain is infrequent and plowing would facilitate only the evaporation of scarce water from the soil. The solution applied by the peoples who inhabited the Negev in past centuries was a practice they called "runoff farming." Farmers had mastered harnessing the flash floods that rush down into the gullies by catching the runoffs—not only by making terraces but also by building large cisterns into which the water was directed to be held for later use. Remnants of these constructions still exist.

Water-storage mechanisms have been invented by other organisms living in deserts, but mainly through modifications of body plan. Many plants, especially cacti and euphorbia, have the ability to swell their roots or stems with water stores. Possibly the most familiar is the saguaro cactus, Carnegiea gigantea, of the Sonoran desert in the American southwest. It has a shallow root system that extends in all directions to distances of about its height, fifty feet. In one rainstorm the root system can soak up 200 gallons of water, which are transferred into its tall trunk. This trunk is pleated like an accordion and can swell to store tons of water that can last the plant for a year. The cactus has no leaves, but the stem is green and can photosynthesize and produce nutrients as well as store water. The saguaro's survival strategy requires it to grow extremely slowly. But it lives a century or more.

Some desert animals similarly store water. The frog Cyclorana platycephala, from the northern Australian desert, fills up and greatly expands its urinary bladder to use as a water bag before burying itself in the soil, where it spends most of the year waiting for the next rain. While in the ground it sloughs off skin and forms around itself a nearly waterproof cocoon that resembles a plastic bag and reduces evaporative water loss.

Desert ants of a variety of species (of at least seven different genera) in American as well as Australian deserts collectively called "honeypot ants" have evolved a solution that combines water storage with energy storage. Ants typically feed each other; and some of the larger worker ants may take up more liquid than the others, and others may bring more. Those that take the fluid may gorge themselves until they distend their abdomens up to the size of a grape, by which time they are unable to move from the spot. They then hang in groups of dozens to hundreds from the ceiling of a chamber in the ant nest, where they are then the specialized so-called repletes that later regurgitate fluid when the colony members are no longer bringing the fluid in but rather needing it.`
  }
];

// ============================================================================
// QUESTIONS DATA
// ============================================================================

const questions = [
  // Passage 1: Questions 1-10
  {
    question_number: 1,
    question_stem: "In Passage A, the parenthetical information in line 19 and lines 21-23 mainly serves to:",
    choice_a: "specify how Luc identified certain aspects of a piano's history.",
    choice_b: "portray Luc as overly judgmental about piano transportation.",
    choice_c: "describe the types of rules that visitors to Luc's shop were required to follow.",
    choice_d: "indicate some of Luc's firm beliefs about piano care.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 2,
    question_stem: "Based on the assertion in Passage A that Luc's 'attitude about how people treated their pianos seemed to mirror his philosophy of life' (lines 25-26), which of the following statements would most nearly describe Luc's philosophy of life?",
    choice_a: "It's better to live a full and imperfect life than not participate because something might go wrong.",
    choice_b: "Life is a fragile gift that must be cherished and kept safe at all times.",
    choice_c: "Living well is like playing the piano well; it requires dedication and practice.",
    choice_d: "It's important not to take life's opportunities for granted because they may not come a second time.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 3,
    question_stem: "As it is used in line 32, the phrase bit into most nearly means:",
    choice_a: "pinched.",
    choice_b: "ingested.",
    choice_c: "marred.",
    choice_d: "severed.",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 4,
    question_stem: "In the third paragraph of Passage B (lines 61-65), the author most clearly shifts from:",
    choice_a: "making an argument against musicians selling their instruments to using evidence from his life to support that argument.",
    choice_b: "introducing musicians he admires to explaining why he hopes people admire him as a musician.",
    choice_c: "examining his own emotions about his violin to explaining why musicians must develop a partnership with their instruments.",
    choice_d: "discussing the connection between other musicians and their instruments to pondering his own connection with his violin.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 5,
    question_stem: "In Passage B, the statement that Lifschey 'was not merely an excellent oboist; he was a great artist' (lines 44-45) can best be described as:",
    choice_a: "a fact supported by details about Lifschey's career.",
    choice_b: "a fact confirmed by experts quoted in the passage.",
    choice_c: "an opinion that the author attributes to Lifschey's colleagues and students.",
    choice_d: "an opinion that the author asserts but does not explain.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 6,
    question_stem: "In Passage B, it can most reasonably be inferred that Heifetz's response to the woman who congratulates him is intended to point out that:",
    choice_a: "the woman hears Heifetz's violin differently than Heifetz does.",
    choice_b: "the woman isn't qualified to judge the quality of Heifetz's violin.",
    choice_c: "Heifetz enjoyed the woman's humorous comment.",
    choice_d: "Heifetz's violin doesn't make sounds by itself.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 7,
    question_stem: "In Passage B, the author most directly indicates that the violin is sometimes an adversary by stating that it:",
    choice_a: "lies mute in its case.",
    choice_b: "makes him adjust to its whims.",
    choice_c: "responds with a range of emotion.",
    choice_d: "can't speak with words.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 8,
    question_stem: "Compared to Passage A, Passage B is more directly focused on the:",
    choice_a: "damage a musician can do to an instrument.",
    choice_b: "characteristics of an instrument that give clues to its history.",
    choice_c: "interdependence between musician and instrument.",
    choice_d: "benefits of making instruments available to young children.",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 9,
    question_stem: "In contrast to the way the pianos are described in Passage A, the passage author's violin in Passage B is described as:",
    choice_a: "exhibiting unique characteristics.",
    choice_b: "having an active personality of its own.",
    choice_c: "sustaining damage from careless children.",
    choice_d: "being important to daily life.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 10,
    question_stem: "Which of the following assertions about instruments is most strongly supported by details provided in both Passage A and Passage B?",
    choice_a: "Familiarity with your instrument is an important part of the joy of playing music.",
    choice_b: "Instruments should be revered and never treated like furniture.",
    choice_c: "Selling your instrument shows disrespect for the music you have made together.",
    choice_d: "Maintaining proper humidity levels is essential to preserving an instrument.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 2: Questions 11-20
  {
    question_number: 11,
    question_stem: "The main purpose of the passage is to:",
    choice_a: "explain why Holmes's musical tastes gradually changed over time.",
    choice_b: "describe how Holmes's hectic professional life affects his personal life.",
    choice_c: "highlight the different instruments Holmes mastered in becoming a famous musician.",
    choice_d: "document how Holmes eventually became an enterprising bandleader.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 12,
    question_stem: "One theme of the passage is that:",
    choice_a: "one's previous experiences and pursuits can be useful in achieving success.",
    choice_b: "talent is the most important factor in achieving success in both business and music.",
    choice_c: "recognizing one's limitations is necessary in overcoming one's failures.",
    choice_d: "pursuing one's dreams should take precedence over more practical matters.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 13,
    question_stem: "Which of the following events referred to in the passage occurred last chronologically?",
    choice_a: "Taylor joined Holmes's band.",
    choice_b: "Brawner joined Holmes's band.",
    choice_c: "Holmes started driving a limousine.",
    choice_d: "Holmes started Sound Ideas.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 14,
    question_stem: "Based on the passage, the residents of Gordon Heights in the 1950s and 1960s would best be described as:",
    choice_a: "artistic and sophisticated.",
    choice_b: "driven and optimistic.",
    choice_c: "friendly and easygoing.",
    choice_d: "generous and dependable.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 15,
    question_stem: "The main purpose of the third paragraph (lines 13-22) is to:",
    choice_a: "indicate why Holmes preferred rhythm and blues to Sinatra songs.",
    choice_b: "establish that Holmes's parents disapproved of his interest in music.",
    choice_c: "reveal that Holmes was considered a musical prodigy.",
    choice_d: "describe what inspired Holmes to start playing music.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 16,
    question_stem: "The main idea of the fourth paragraph (lines 23-31) is that:",
    choice_a: "Holmes was better at playing music than he was at promoting his band.",
    choice_b: "Holmes's band was able to earn money despite having a limited repertoire.",
    choice_c: "Holmes's band became a national phenomenon despite the band members' lack of musical talent.",
    choice_d: "Holmes would have had more success early on if he had taken the time to learn more songs.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 17,
    question_stem: "Based on the passage, the main reason Holmes eventually preferred playing music at weddings and private parties to playing music in clubs was that:",
    choice_a: "he could play a wider variety of music at weddings and private parties.",
    choice_b: "audiences at weddings and private parties were easier to please.",
    choice_c: "weddings and private parties were more profitable.",
    choice_d: "weddings and private parties required less travel.",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 18,
    question_stem: "The main idea of the eleventh paragraph (lines 73-80) is that:",
    choice_a: "Holmes often has to alter his musical style based on which band members are available to play a gig.",
    choice_b: "Holmes typically needs more band members to play at weddings than he needs to play at private parties.",
    choice_c: "Holmes's core lineup of band members has been relatively consistent for a business with a high turnover rate.",
    choice_d: "Holmes's core lineup of band members is constantly changing because Holmes expects his musicians to travel long distances.",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 19,
    question_stem: "It can most reasonably be inferred from the passage that Holmes's band members like playing music with Holmes in part because, in contrast to other band leaders, Holmes:",
    choice_a: "is familiar with big band, classical, and country music.",
    choice_b: "allows band members to showcase their talents during gigs.",
    choice_c: "played music in the Washington club scene for fifteen years.",
    choice_d: "uses sophisticated elements like digital sequences during gigs.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 20,
    question_stem: "In the passage, the phrase something more canned (lines 86-87) most nearly refers to:",
    choice_a: "sound effects.",
    choice_b: "music videos.",
    choice_c: "improvised music.",
    choice_d: "recorded music.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 3: Questions 21-30
  {
    question_number: 21,
    question_stem: "Which of the following rhetorical techniques does the author repeatedly use in the passage as a means to engage the reader?",
    choice_a: "Forthright attacks on what he labels as readers' misunderstanding of basic historical fact",
    choice_b: "Open-ended questions and appeals directed to readers",
    choice_c: "Direct quotations from past readers of his work that capture their responses to his ideas",
    choice_d: "Descriptions of his own experiences as a citizen of the Muscogee (Creek) Nation of Oklahoma",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 22,
    question_stem: "It can most reasonably be inferred that the author's statements about the educational use of photographs apply to photographs taken during what time period?",
    choice_a: "Any time period since photographs were first taken",
    choice_b: "In the nineteenth century exclusively",
    choice_c: "Any time period prior to the digital age, but not beyond",
    choice_d: "Only in the ten years after photographers first joined government expeditions to the West",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 23,
    question_stem: "Which of the following words is most nearly given a negative connotation in the passage?",
    choice_a: "Educational (line 1)",
    choice_b: "Old (line 10)",
    choice_c: "Romanticized (line 28)",
    choice_d: "Traditional (line 34)",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 24,
    question_stem: "Which of the following actions referred to in the passage most clearly characterizes a hypothetical event rather than an actual event?",
    choice_a: "\"Traveled to\" (line 17)",
    choice_b: "\"Defend\" (line 18)",
    choice_c: "\"Farmed\" (line 72)",
    choice_d: "\"Stand next to\" (line 83)",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 25,
    question_stem: "Particular photographs of Goyathlay are referred to and described by the author to support his claim that:",
    choice_a: "accurately understanding a photograph depends on knowing the circumstances in which a photograph was taken.",
    choice_b: "photographs can be used to date events in the life of a legendary figure like Goyathlay.",
    choice_c: "anyone can control his or her public image by becoming more involved in the field of photography.",
    choice_d: "the merits of a photograph from the nineteenth century depend on who took the photograph.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 26,
    question_stem: "The author most strongly suggests that one reason commercial photographers began to photograph Native American communities was that commercial photographers were:",
    choice_a: "instructed to do so by the US government.",
    choice_b: "devoted to creating educational resources about Native American communities.",
    choice_c: "committed to overcoming their preconceived ideas about the West.",
    choice_d: "influenced to do so by the photographers who had joined government expeditions to the West.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 27,
    question_stem: "In the passage, the author notes that a strange aspect of the photo of Goyathlay with a rifle is that the photo was taken:",
    choice_a: "by an unknown photographer.",
    choice_b: "when Goyathlay was a prisoner of war.",
    choice_c: "with Goyathlay's permission.",
    choice_d: "by a US government photographer.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 28,
    question_stem: "The author directly refers to which of the following aspects of the photograph of Goyathlay in a garden as being ironic?",
    choice_a: "Goyathlay was not a gardener but instead was in the midst of trying to stop the US government's attack on his people.",
    choice_b: "Goyathlay's people had long practiced farming, but the photo seemed to suggest that Goyathlay had learned farming from others.",
    choice_c: "People do not automatically think of Goyathlay as a man of peace.",
    choice_d: "For years it was assumed to be a photograph of someone other than Goyathlay.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 29,
    question_stem: "The author indicates that for the sake of an unbiased interpretation, compared to reading written documents with care, reading photographs with care is:",
    choice_a: "significantly more important.",
    choice_b: "slightly more important.",
    choice_c: "just as important.",
    choice_d: "slightly less important.",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 30,
    question_stem: "In line 86, the word framed is used figuratively to describe:",
    choice_a: "the way background research can support the proper viewing of a photograph.",
    choice_b: "a common means of preserving a photograph.",
    choice_c: "a technique in which a photograph is displayed with factual information surrounding it.",
    choice_d: "the manner in which many photographs of Goyathlay are displayed in museums.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },

  // Passage 4: Questions 31-40
  {
    question_number: 31,
    question_stem: "The fourth paragraph (lines 63-71) marks a shift in the focus of the passage from:",
    choice_a: "plants that store water above ground to plants that store water below ground.",
    choice_b: "animals that don't go dormant to animals that do go dormant.",
    choice_c: "desert-dwelling plants to desert-dwelling animals.",
    choice_d: "inhabitants of the Negev Desert to inhabitants of northern Australian deserts.",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 32,
    question_stem: "Based on the passage, the author's use of the word \"measuring\" (line 12) most nearly describes the way that some desert plants:",
    choice_a: "have roots that are extremely sensitive to moisture levels in the soil.",
    choice_b: "have methods of delaying seed germination until a certain amount of water is present.",
    choice_c: "are visibly more vigorous after a rainfall.",
    choice_d: "can calculate how many inches of rain have fallen in recent days.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 33,
    question_stem: "Which of the following statements best summarizes the process by which the frog Cyclorana platycephala survives in the desert?",
    choice_a: "The frog stores water in its body, buries itself, and conserves water until emerging at the next rain.",
    choice_b: "The frog buries itself, waits for rain, absorbs rainwater through its skin, and emerges.",
    choice_c: "The frog forms a nearly waterproof cocoon around itself, buries itself, and waits to emerge until it needs water.",
    choice_d: "The frog buries itself, absorbs water through its skin, and goes dormant until springtime.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 34,
    question_stem: "Based on the passage, which of the following plants and animals employ a communal strategy to survive in the desert?",
    choice_a: "The saguaro cactus only",
    choice_b: "The saguaro cactus and the frog Cyclorana platycephala only",
    choice_c: "The frog Cyclorana platycephala and honeypot ants only",
    choice_d: "Honeypot ants only",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 35,
    question_stem: "The passage most strongly suggests that compared to the frog Cyclorana platycephala, the honeypot ants are unique in that they:",
    choice_a: "can store water inside their bodies.",
    choice_b: "live in Australian deserts.",
    choice_c: "combine water storage with energy storage.",
    choice_d: "go dormant during dry times.",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 36,
    question_stem: "Which of the following provides the best paraphrase of lines 7-11?",
    choice_a: "Annual plants survive in deserts by making seeds swiftly when conditions are right.",
    choice_b: "Annual plants in deserts make seeds during dry conditions so the seeds will be ready when rain arrives.",
    choice_c: "Dry conditions require the seeds of desert plants to start germination prior to the arrival of rain.",
    choice_d: "The seeds of annual plants in deserts are designed to wait years for the right conditions for growth.",
    correct_answer: "A",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 37,
    question_stem: "Based on the passage, it can most reasonably be inferred that the scarring some seeds require before germination is accomplished through:",
    choice_a: "intense drying experienced between rainfalls.",
    choice_b: "internal tension from the seed capsule's sepals.",
    choice_c: "chemicals in the seeds.",
    choice_d: "abrasion sustained during flash floods.",
    correct_answer: "D",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 38,
    question_stem: "As it is used in line 26, the word extent most nearly means:",
    choice_a: "length.",
    choice_b: "degree.",
    choice_c: "reach.",
    choice_d: "boundary.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 39,
    question_stem: "According to the passage, which of the following actions did people in the Negev Desert take in order to farm there?",
    choice_a: "Plowing the soil",
    choice_b: "Widening gullies",
    choice_c: "Constructing terraces",
    choice_d: "Constructing aqueducts",
    correct_answer: "C",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  },
  {
    question_number: 40,
    question_stem: "Based on the passage, the pleats in the body of the saguaro cactus:",
    choice_a: "increase the efficiency of photosynthesis.",
    choice_b: "allow the cactus to expand for storing water.",
    choice_c: "reduce evaporative water loss.",
    choice_d: "regulate the cactus's growth.",
    correct_answer: "B",
    question_type: "main-idea",
    question_category: "KEY",
    lesson_id: null
  }
];

// ============================================================================
// MAIN EXTRACTION FUNCTION
// ============================================================================

async function extractTest5Reading() {
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
    console.log('\nAll Practice ACT 5 Reading content successfully extracted!\n');

  } catch (error) {
    console.error('Error during extraction:', error);
    throw error;
  }
}

// Run the extraction
extractTest5Reading().catch(console.error);
