#!/usr/bin/env node
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

const answerKey = ['D','B','A','C','A','D','B','A','C','D','A','D','C','B','C','A','A','D','C','B','C','C','A','B','D','B','C','D','A','A','D','B','B','C','D','A','C','B','A','D'];

// Create UUIDs for passages
const passage1Id = randomUUID();
const passage2Id = randomUUID();
const passage3Id = randomUUID();
const passage4Id = randomUUID();

const passages = [
  {
    id: passage1Id,
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'LITERARY_NARRATIVE',
    title: 'City Kid by Nelson George',
    passage_text: `LITERARY NARRATIVE: This passage is adapted from the memoir City Kid by Nelson George (©2009 by Nelson George).

I am in the living room of apartment 6C in the Samuel J. Tilden housing projects in Brownsville, Brooklyn. It is 1960. I am four. I stand on my tiptoes in my stocking feet. My small brown fingers clutch the edge of a Motorola high-fidelity stereo, which is made of shiny lacquered wood and has a lemony smell, from the polish my mother applies every Saturday afternoon.

I feel the bass speakers in my stomach. I smell the polish. I feel the music. Looking over the edge, down into the bowels of the hi-fi, I watch the turntable needle roll across the grooves of a seven-inch record with a blue-and-white label at 45 revolutions per minute. The song is "Please Mr. Postman" by the Marvelettes.

As much as I enjoy "Please Mr. Postman," I'm anxious to hear the next record. Not just because it's Roy Orbison's "Oh, Pretty Woman" (which is the first record I ever asked my mother to buy for me), but because above "Mr. Postman" on the turntable are a slew of seven-inch singles suspended around a fat brown cylinder. Once "Please Mr. Postman" finishes, the needle arm moves away, a single vinyl 45 plops down on the turntable, and the needle returns, catching the groove and sending the rhythm of "Oh, Pretty Woman" vibrating through my body.

This Motorola stereo was the centerpiece of my family's living room, and our social life. Ma didn't allow my little sister, Andrea, or me in our living room too often, because she didn't want us sitting on her plastic-covered sofa or fingering the dice-shaped lighter on her glass-and-wood living-room table. But if we were playing records in the early evenings or on weekends, it was okay.

All through my childhood, from my first consciousness of music into the early seventies, that Motorola was my passport, not simply to records, but to the vast nation outside New York that the music came from. While the black-and-red labels of Atlantic 45s carried a Broadway address, most of the records in her collection came from Memphis (the Stax Records label was pale blue, with a finger-snapping logo) or Detroit (Motown's black-and-white label had a red star for the Motor City, while Tamla's colors were yellow and brown). As I read the labels of the records Ma brought home, I slowly became familiar with the cities of soul—Philadelphia, Los Angeles, Chicago, and Cincinnati. By the time I was an adolescent, I could identify certain names that recurred in the credits. Way before I understood what these credits meant, or who these people were, I was already collecting info for the books and articles I had no idea I would eventually write.

My interest in these records stemmed from a desire to better understand my mother's life. My mother was a soul girl: petite and cute, with a bright, girlish smile. Arizona Bacchus George, aka Doll, aka Ma, was full of life, and loved to laugh. Though burdened with raising two kids alone in a Brooklyn housing project, she didn't allow herself to become a stranger to fun. Not only was her ever-growing stack of 45s a testament to her love of music and dance, but she regularly held parties in that sacrosanct living room for her girlfriends and their male admirers.

I remember the time we took a pilgrimage to the Apollo Theater for a matinee show. It was a chilly, overcast day, and my mother and I joined a long line of black folk, as far as I could see, huddled on 125th Street, awaiting entry. Once inside, we sat in the orchestra near the back. I remember the elements of the James Brown Revue quite distinctly: Pigmeat Markham did his famous "Here Comes the Judge" routine; the Fabulous Flames danced like demons and harmonized like choir boys; the J.B.s, behind the antic introduction of MC Danny Ray, banged out a medley of the great man's hits.

Then Brown himself appeared, a short, dark man with shiny, processed hair who whirled and shuddered and shouted. On the way back to Brooklyn on the A train, I babbled to my mother about the sweaty man who kept tossing the cape off his back and running back to the mike to wail, "Please! Please! Please!"

It was special for me, not only because I'd seen James Brown, but because I was too young for so many of the shows my mother attended. Unlike today, when the separation between adult and kid entertainment has been blurred to the detriment of both, soul music was fundamentally music by, about, and for adults. When my ma put on her auburn wig to see Otis Redding, or her blue eyeliner to watch the Supremes, it was to experience things so raw and so smooth, they weren't right for a child to see.`
  },
  // PLACEHOLDER - Need to extract Passages 2, 3, 4
];

const questions = [
  // Q1-10: Passage 1
  {
    number: 1,
    passage_id: passage1Id,
    stem: "The tone of the passage could best be described as:",
    choices: {
      A: "remorseful; the narrator imagines the life his mother could have had without the burden of raising a family in a Brooklyn housing project.",
      B: "jubilant; the narrator expresses his delight that the musicians he revered in childhood eventually became such big stars.",
      C: "inspirational; the narrator explains how he managed to overcome the obstacles he faced during childhood and pursue an education in music.",
      D: "nostalgic; the narrator fondly describes his childhood experiences with music and his relationship with his mother."
    }
  },
  {
    number: 2,
    passage_id: passage1Id,
    stem: "In the fourth paragraph (lines 25-32), the perspective of the narrator shifts from being that of a child describing an enjoyable experience to being that of:",
    choices: {
      A: "an adult reflecting on the role music played during his childhood.",
      B: "an adult reminiscing about his relationship with his sister.",
      C: "a child daydreaming about what his life will be like when he grows up.",
      D: "a child describing what his mother likes to do for fun."
    }
  },
  // PLACEHOLDER - Need to extract Q3-40
];

console.log('Inserting Test 7 Reading passages...');

for (const p of passages) {
  const { error } = await supabase.from('act_reading_passages').insert([p]);
  if (error) {
    console.error(`Error inserting Passage ${p.passage_number}:`, error);
  } else {
    console.log(`✓ Passage ${p.passage_number} inserted`);
  }
}

console.log('\nInserting Test 7 Reading questions...');

for (const q of questions) {
  const insertData = {
    test_number: TEST_NUMBER,
    question_number: q.number,
    passage_id: q.passage_id,
    question_stem: q.stem,
    choice_a: q.choices.A,
    choice_b: q.choices.B,
    choice_c: q.choices.C,
    choice_d: q.choices.D,
    correct_answer: answerKey[q.number - 1],
    question_type: 'reading-comprehension',
    question_category: 'KEY',
    lesson_id: null
  };

  const { error } = await supabase.from('act_reading_questions').insert([insertData]);
  if (error) {
    console.error(`Error inserting Q${q.number}:`, error);
  } else {
    console.log(`✓ Q${q.number} inserted`);
  }
}

console.log('Done!');
