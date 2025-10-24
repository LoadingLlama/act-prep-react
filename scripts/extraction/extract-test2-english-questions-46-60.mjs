#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 46-60 (PASSAGE IV)
 * Extract questions from "Clinton Hill's Found Artist" passage about Rafael Leonardo Black
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 46-60 (PASSAGE IV)\n');
console.log('='.repeat(70));

// Questions 46-60 from Passage IV: Clinton Hill's Found Artist
const questions = [
  {
    number: 46,
    stem: "I noticed an article about Rafael Leonardo Black, a 64-year-old Clinton Hill artist who had just been discovered.",
    underlined: "who",
    choices: {
      F: "NO CHANGE",
      G: "of whom",
      H: "which",
      J: "whom"
    }
  },
  {
    number: 47,
    stem: "Black, a native of Aruba, has been creating art in his New York City studio apartment for over three decades.",
    underlined: "Black, a native of Aruba,",
    choices: {
      A: "NO CHANGE",
      B: "originally from Aruba,",
      C: "for more than half his life living in Clinton Hill but a native of Aruba,",
      D: "a newly found artist originally from Aruba,"
    }
  },
  {
    number: 48,
    stem: "Given that all the choices are accurate, which one provides the best transition to the information in the following sentence?",
    underlined: "However, in May of 2013, art dealer Francis Naumann, directed to Black's art by one of Black's longtime friends,",
    choices: {
      F: "NO CHANGE",
      G: "was taking down an artist's long-running exhibition at his Manhattan gallery.",
      H: "became aware that Black had never shown his drawings, formally or otherwise.",
      J: "recognized that no one in the New York City art world had heard of Black."
    }
  },
  {
    number: 49,
    stem: "Within days, ten of Black's pieces sold for, prices ranging from $16,000 to $28,000.",
    underlined: "sold for,",
    choices: {
      A: "NO CHANGE",
      B: "sold—for",
      C: "sold; for",
      D: "sold for:"
    }
  },
  {
    number: 50,
    stem: "Black draws collages in black No. 2 pencil on white board and they're packed with depictions, in the form of drawings, of ancient myths, historical events, and popular culture.",
    underlined: "board and they're",
    choices: {
      F: "NO CHANGE",
      G: "board. They're",
      H: "board, they're",
      J: "board they're"
    }
  },
  {
    number: 51,
    stem: "Black draws collages in black No. 2 pencil on white board and they're packed with depictions, in the form of drawings, of ancient myths, historical events, and popular culture.",
    underlined: "depictions, in the form of drawings,",
    choices: {
      A: "NO CHANGE",
      B: "black pencil drawings that depict",
      C: "drawings that create collages of",
      D: "depictions of"
    }
  },
  {
    number: 52,
    stem: "It features a representation of a British psychedelic poster, a portrayal of Danish surrealist painter, Wilhelm Freddie, at work, and a tiny figure of Los Angeles architect Simon Rodia.",
    underlined: "painter, Wilhelm Freddie,",
    choices: {
      F: "NO CHANGE",
      G: "painter Wilhelm Freddie,",
      H: "painter, Wilhelm Freddie",
      J: "painter Wilhelm Freddie"
    }
  },
  {
    number: 53,
    stem: "I wasn't sure how the drawings in Seven Lamps—so detailed that I could see the folds in Rodia's clothing—fit together logically, but I liked that there was so much for me to puzzle over.",
    underlined: "fit",
    choices: {
      A: "NO CHANGE",
      B: "has fit",
      C: "is fit",
      D: "fits"
    }
  },
  {
    number: 54,
    stem: "If the writer were to delete the underlined portion (adjusting the punctuation as needed), the essay would primarily lose:",
    underlined: "but I liked that there was so much for me to puzzle over",
    choices: {
      F: "a suggestion that the reason Naumann chose to exhibit Black's art is that the art offers so much for the viewer to reflect upon and analyze.",
      G: "a detail indicating that the narrator appreciates Black's collage even though he or she might not have understood its overall intent.",
      H: "a comment suggesting that though the narrator enjoys only some of Black's art, he or she is glad that Black has been discovered.",
      J: "a statement revealing the narrator's belief that the best modern art is understood only by the artist who created it."
    }
  },
  {
    number: 55,
    stem: "Maybe this complexity in May helps explain why Black's work created such a stir. The best placement for the underlined portion would be:",
    underlined: "in May",
    choices: {
      A: "where it is now.",
      B: "after the word Maybe.",
      C: "after the word explain.",
      D: "after the word stir (and before the period)."
    }
  },
  {
    number: 56,
    stem: "The writer wants to clearly establish that the newspaper article claims Black is unmoved by the sudden interest in his art. Which choice best accomplishes that goal?",
    underlined: "I read that Black observes the sudden interest in his drawings.",
    choices: {
      F: "NO CHANGE",
      G: "is nearly a celebrity in Clinton Hill due to",
      H: "has benefited financially from",
      J: "gives little thought to"
    }
  },
  {
    number: 57,
    stem: "Which choice provides the most effective transition from the preceding sentence to this sentence?",
    underlined: "Given that I know the city,",
    choices: {
      A: "NO CHANGE",
      B: "Since I'm knowledgeable about art and books,",
      C: "Now that I know about him,",
      D: "Knowing that I like news,"
    }
  },
  {
    number: 58,
    stem: "When I walk home from the Urban Vintage, its décor often being updated with restored antiques and vintage housewares, I wonder if I'll pass the brownstone building where Black creates his fascinating, newly found art.",
    underlined: "Vintage, its décor often being updated with restored antiques and vintage housewares,",
    choices: {
      F: "NO CHANGE",
      G: "Vintage, easily carrying my lightweight laptop in my old, navy blue messenger bag,",
      H: "Vintage this evening—I can't be late to meet a friend exactly at eight—",
      J: "Vintage tonight,"
    }
  },
  {
    number: 59,
    stem: "When I walk home from the Urban Vintage, its décor often being updated with restored antiques and vintage housewares, I wonder if I'll pass the brownstone building where, Black, creates his fascinating, newly found art.",
    underlined: "building where, Black,",
    choices: {
      A: "NO CHANGE",
      B: "building where Black",
      C: "building, where Black",
      D: "building: where Black"
    }
  },
  {
    number: 60,
    stem: "The writer is considering adding the following sentence to the essay: 'Fortunately, the web page included a key that identified the people, places, and events—most of which I had never even heard of—that Black portrays in this piece.' If the writer were to add this sentence, it would most logically be placed at:",
    underlined: "[Question 60 asks about the preceding passage as a whole.]",
    choices: {
      F: "Point A in Paragraph 1.",
      G: "Point B in Paragraph 2.",
      H: "Point C in Paragraph 3.",
      J: "Point D in Paragraph 4."
    }
  }
];

console.log('\n📝 Extracting English questions 46-60 (Passage IV):');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  if (q.underlined) console.log(`Underlined: "${q.underlined.substring(0, 50)}..."`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Update in database
  const updateData = {
    question_stem: q.stem,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J
  };

  const { error } = await supabase
    .from('act_english_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Q${q.number} in database`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/15 questions!`);
console.log('✅ Passage 4 (Questions 46-60) is now complete with real content!');
console.log('\n📋 NEXT STEPS:');
console.log('    1. Extract Passage 5 questions (61-75) - Cher Ami Pigeon Hero');
console.log('    2. Continue with Math, Reading, and Science questions\n');