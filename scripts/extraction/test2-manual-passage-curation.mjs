#!/usr/bin/env node

/**
 * TEST 2 - MANUALLY CURATED PASSAGES
 * Clean, artifact-free passages for Test 2
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

console.log('📝 MANUALLY CURATING TEST 2 PASSAGES\n');
console.log('='.repeat(70));

// =====================================================
// ENGLISH PASSAGES (5) - Manually Curated
// =====================================================

const englishPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    title: 'A Mouthful of Music',
    introduction: 'Celtic mouth music and its traditions',
    passage_text: `Mouth music is the name given in English to the many ways by imitating the sounds of musical instruments with the human voice. Forms of mouth music are performed around the world, but the genre being particularly popular in England, Ireland, and Scotland. In this Celtic region, lilting and jigging are two of the lively names used to refer to this musical form.

Celtic mouth music exists to accompany dancing, so the rhythms and sounds are first-class and the words take a back seat. Instead of using traditional lyrics, singers often produce nonsense syllables, called vocables to represent specific instrumental sounds, such as those of bagpipes or violins. The results are songs that rarely make literal sense but nevertheless flow in a way easier to dance to.

The bands' celebrity continually survives as they combine traditional mouth music with modern rhythms.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    title: 'Making the Desert Bloom',
    introduction: 'The Garamantes civilization in the Sahara Desert',
    passage_text: `More than two thousand years ago, a people the Romans called the Garamantes created a complex civilization in one of the world's driest places—the Sahara Desert. Beginning around 500 BCE, they built towns and villages, cloth was manufactured there and jewelry, and traded throughout North Africa and the Mediterranean. They also grew a variety of crops, including wheat.

The survival of their civilization depended on hundreds of miles of underground tunnels. These tunnels carried water to desert settlements from an aquifer.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    title: 'Neutrinos on Ice',
    introduction: 'The IceCube Neutrino Observatory in Antarctica',
    passage_text: `At the IceCube Neutrino Observatory in Antarctica, eighty-six cables descend 2,500 meters down into the glacial terrain. Each cable is equipped with sixty digital optical modules (DOMs), which are programmed to detect a faint blue flash known as Cherenkov radiation.

This radiation, a veritable shock wave of photonic energy, is emitted when subatomic particles called neutrinos collide with electrons in the molecules of ice. Although there are countless neutrinos in the universe (fifty trillion neutrinos pass through your body every second), actually detecting them is a formidable task. Neutrinos carry no electrical charge, are practically weightless, and travel at nearly the speed of light.

Neutrinos are rarely affected by matter or electromagnetic fields. For this purpose, many neutrinos have been traveling through space unimpeded for billions of years. Scientists are optimistic that the neutrinos detected at IceCube could lead to new ways of looking at our galaxy—and galaxies beyond.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    title: "Clinton Hill's Found Artist",
    introduction: 'Discovery of artist Rafael Leonardo Black',
    passage_text: `At the Urban Vintage, my favorite café here in Clinton Hill, Brooklyn, I found a table by the window and checked the day's news on my laptop. On the New York Times home page, I noticed an article about Rafael Leonardo Black, a 64-year-old Clinton Hill artist who had just been discovered.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    title: 'Cher Ami, Pigeon Hero',
    introduction: 'The historical significance of homing pigeons',
    passage_text: `Pigeons have a fairly poor reputation. In many urban areas, they are considered little more than "rats with wings," blamed for spreading disease and despoiling statues. For example, one species, the homing pigeon, which is among the best navigators of the natural world. There navigational abilities has earned the homely pigeon an undeniable place in history.`
  }
];

// =====================================================
// READING PASSAGES (4) - Placeholders for now
// =====================================================

const readingPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'LITERARY NARRATIVE',
    title: 'Reading Passage 1',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 1 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'SOCIAL SCIENCE',
    title: 'Reading Passage 2',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 2 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'HUMANITIES',
    title: 'Reading Passage 3',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 3 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'NATURAL SCIENCE',
    title: 'Reading Passage 4',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 4 - to be manually curated from PDF]'
  }
];

// =====================================================
// SCIENCE PASSAGES (7) - Placeholders for now
// =====================================================

const sciencePassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 1',
    introduction: '',
    passage_text: '[Science Passage 1 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'RESEARCH SUMMARIES',
    title: 'Science Passage 2',
    introduction: '',
    passage_text: '[Science Passage 2 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 3',
    introduction: '',
    passage_text: '[Science Passage 3 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Science Passage 4',
    introduction: '',
    passage_text: '[Science Passage 4 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 5',
    introduction: '',
    passage_text: '[Science Passage 5 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 6',
    introduction: '',
    passage_text: '[Science Passage 6 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 7,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 7',
    introduction: '',
    passage_text: '[Science Passage 7 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  }
];

// =====================================================
// UPDATE DATABASE
// =====================================================

console.log('💾 Updating English passages in database...\n');

for (const passage of englishPassages) {
  const { error } = await supabase
    .from('act_english_passages')
    .update({
      title: passage.title,
      introduction: passage.introduction,
      passage_text: passage.passage_text
    })
    .eq('test_number', TEST_NUMBER)
    .eq('passage_number', passage.passage_number);

  if (error) {
    console.error(`❌ Error updating English Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Updated English Passage ${passage.passage_number}: ${passage.title}`);
  }
}

console.log('\n✅ English passages updated!');
console.log('\n📝 Next: Reading and Science passages need manual curation\n');
