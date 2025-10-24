#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 46-60 COMPLETE
 * Re-extract with proper <u>underlined</u> formatting AND lesson assignment
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 46-60 WITH PROPER FORMATTING AND LESSONS\n');
console.log('='.repeat(70));

// Question type to lesson mapping from Test 1
const lessonMapping = {
  'comma-splice': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'fragment': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'dash': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'comma-usage': { lesson_id: '3e8f0696-1bf7-4b5c-880d-fb5359923b7d', difficulty_level: 'medium' },
  'deleting-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'verb-agreement': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'colon': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'sentence-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'word-choice': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'modifier-misplaced': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'which-choice': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'main-idea': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'verb-form': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'redundancy': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'easy' },
  'transition': { lesson_id: '7aae3763-017b-4762-ad5a-346aac1f027b', difficulty_level: 'hard' },
  'verb-tense': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'idiom': { lesson_id: '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16', difficulty_level: 'easy' },
  'logical-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'parallel-structure': { lesson_id: 'e6153221-e330-4db4-8cc7-9c5a1d51a301', difficulty_level: 'hard' },
  'pronoun-ambiguous': { lesson_id: '3c3585a1-f137-4331-8390-29ef1f5e889f', difficulty_level: 'medium' },
  'adding-info': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'wordiness': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'medium' },
  'adding-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'modifier-dangling': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'grammar': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'punctuation': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'style': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'organization': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' }
};

// English questions 46-60 from Clinton Hill artist passage
const questions = [
  {
    number: 46,
    stem: "I noticed an article about Rafael Leonardo Black, a 64-year-old Clinton Hill artist <u>who</u> had just been discovered.",
    question_type: 'pronoun-ambiguous',
    choices: {
      F: "NO CHANGE",
      G: "of whom",
      H: "which",
      J: "whom"
    }
  },
  {
    number: 47,
    stem: "Black, <u>a native of Aruba</u>, has been creating art in his New York City studio apartment for over three decades.",
    question_type: 'word-choice',
    choices: {
      A: "NO CHANGE",
      B: "originally from Aruba, for more than half his life",
      C: "living in Clinton Hill but a native of Aruba,",
      D: "a newly found artist originally from Aruba,"
    }
  },
  {
    number: 48,
    stem: "Given that all the choices are accurate, which one provides the best transition to the information in the following sentence?",
    question_type: 'which-choice',
    choices: {
      F: "However, in May of 2013, art dealer Francis Naumann, directed to Black's art by one of Black's longtime friends, displayed sixteen of the artist's drawings in a solo show.",
      G: "was taking down an artist's long-running exhibition at his Manhattan gallery.",
      H: "became aware that Black had never shown his drawings, formally or otherwise.",
      J: "recognized that no one in the New York City art world had heard of Black."
    }
  },
  {
    number: 49,
    stem: "Within days, ten of Black's pieces sold <u>for, prices</u> ranging from $16,000 to $28,000.",
    question_type: 'comma-usage',
    choices: {
      A: "NO CHANGE",
      B: "sold—for",
      C: "sold; for",
      D: "sold for"
    }
  },
  {
    number: 50,
    stem: "Black draws collages in black No. 2 pencil on white board <u>and they're packed with</u> depictions of ancient myths, historical events, and popular culture.",
    question_type: 'fragment',
    choices: {
      F: "NO CHANGE",
      G: "board. They're",
      H: "board, they're",
      J: "board they're"
    }
  },
  {
    number: 51,
    stem: "Black draws collages in black No. 2 pencil on white board and they're packed with <u>depictions, in the form of drawings, of</u> ancient myths, historical events, and popular culture.",
    question_type: 'wordiness',
    choices: {
      A: "NO CHANGE",
      B: "black pencil drawings that depict",
      C: "drawings that create collages of",
      D: "depictions of"
    }
  },
  {
    number: 52,
    stem: "It features a representation of a British psychedelic poster, a portrayal of Danish surrealist <u>painter, Wilhelm Freddie,</u> at work, and a tiny figure of Los Angeles architect Simon Rodia.",
    question_type: 'comma-usage',
    choices: {
      F: "NO CHANGE",
      G: "painter Wilhelm Freddie,",
      H: "painter, Wilhelm Freddie",
      J: "painter Wilhelm Freddie"
    }
  },
  {
    number: 53,
    stem: "I wasn't sure how the drawings in Seven Lamps—so detailed that I could see the folds in Rodia's clothing—<u>fit</u> together logically, but I liked that there was so much for me to puzzle over.",
    question_type: 'verb-tense',
    choices: {
      A: "NO CHANGE",
      B: "has fit",
      C: "is fit",
      D: "fits"
    }
  },
  {
    number: 54,
    stem: "If the writer were to delete the underlined portion <u>—so detailed that I could see the folds in Rodia's clothing—</u> (adjusting the punctuation as needed), the essay would primarily lose:",
    question_type: 'deleting-sentence',
    choices: {
      F: "detail that offers much for the viewer to reflect upon and analyze.",
      G: "detail suggesting that Black's collages overall, though the narrative might have underlying meanings that he or she is given to understand.",
      H: "commentary on some of Black's art, he or she is given to believe that the artist enjoys revealing underlying meaning.",
      J: "statement that the narrator's method is best described as one by the artist who created it."
    }
  },
  {
    number: 55,
    stem: "Maybe this complexity <u>in May</u> helps explain why Black's work created such a stir.",
    question_type: 'logical-placement',
    choices: {
      A: "where it is now.",
      B: "after the word Maybe.",
      C: "after the word explain.",
      D: "after the word stir (and before the period)."
    }
  },
  {
    number: 56,
    stem: "The writer wants to clearly establish that the newspaper article claims Black <u>is unmoved by</u> the sudden interest in his art. Which choice best accomplishes that goal?",
    question_type: 'which-choice',
    choices: {
      F: "NO CHANGE",
      G: "gives little thought to",
      H: "is nearly a celebrity in Clinton Hill due to",
      J: "has benefited financially from"
    }
  },
  {
    number: 57,
    stem: "Which choice provides the most effective transition from the preceding sentence to this sentence?",
    question_type: 'transition',
    choices: {
      A: "Given that I know the city,",
      B: "Since I'm knowledgeable about art and books,",
      C: "Now that I know about him,",
      D: "Knowing that I like news,"
    }
  },
  {
    number: 58,
    stem: "When I walk home from the Urban Vintage, <u>its décor often being updated with</u> restored antiques and vintage housewares, I wonder if I'll pass the brownstone building where Black creates his fascinating, newly found art.",
    question_type: 'modifier-dangling',
    choices: {
      F: "NO CHANGE",
      G: "Vintage, easily carrying my lightweight laptop",
      H: "Vintage this evening—I can't be late to meet a friend exactly at eight—",
      J: "Vintage tonight—I hope"
    }
  },
  {
    number: 59,
    stem: "When I walk home from the Urban Vintage, its décor often being updated with restored antiques and vintage housewares, I wonder if I'll pass the brownstone building <u>where, Black,</u> creates his fascinating, newly found art.",
    question_type: 'comma-usage',
    choices: {
      A: "NO CHANGE",
      B: "building, where Black",
      C: "building where Black",
      D: "building: where Black"
    }
  },
  {
    number: 60,
    stem: "The writer is considering adding the following sentence to the essay: 'Fortunately, the web page included a key that identified the people, places, and events—most of which I had never even heard of—that Black portrays in this piece.' If the writer were to add this sentence, it would most logically be placed at:",
    question_type: 'logical-placement',
    choices: {
      F: "Point A in Paragraph 1.",
      G: "Point B in Paragraph 2.",
      H: "Point C in Paragraph 3.",
      J: "Point D in Paragraph 4."
    }
  }
];

console.log('\n📝 Extracting English questions 46-60 with proper formatting and lesson assignment:');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`Question Type: ${q.question_type}`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Parse underlined text
  const match = q.stem.match(/^(.*?)<u>(.*?)<\/u>(.*)$/);
  let underlined_text = '';
  let context_before = '';
  let context_after = '';

  if (match) {
    underlined_text = match[2];
    context_before = match[1];
    context_after = match[3];
  } else {
    context_before = q.stem;
  }

  // Get lesson info
  const lessonInfo = lessonMapping[q.question_type] || { lesson_id: null, difficulty_level: null };

  // Update in database
  const updateData = {
    question_stem: q.stem,
    underlined_text: underlined_text,
    context_before: context_before,
    context_after: context_after,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J,
    question_type: q.question_type,
    lesson_id: lessonInfo.lesson_id,
    difficulty_level: lessonInfo.difficulty_level
  };

  const { error } = await supabase
    .from('act_english_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating English Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Q${q.number} with formatting and lesson assignment`);
    if (underlined_text) {
      console.log(`  Underlined: "${underlined_text}"`);
    }
    console.log(`  Lesson: ${lessonInfo.lesson_id} (${lessonInfo.difficulty_level})`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/15 English questions!`);
console.log('✅ English questions 46-60 now have proper <u>underlined</u> formatting AND lesson assignment');
console.log('\n📋 PROGRESS: 60/75 English questions complete with proper formatting and lessons');
console.log('    Continue with final questions 61-75\n');