#!/usr/bin/env node

/**
 * FIX READING PASSAGE 1
 * The debug showed Reading Passage 1 has wrong content
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

console.log('🔧 FIXING READING PASSAGE 1\n');
console.log('='.repeat(70));

// Correct Reading Passage 1 content
const correctedPassage1 = {
  test_number: TEST_NUMBER,
  passage_number: 1,
  passage_type: 'LITERARY NARRATIVE',
  title: 'Mothers and Memory',
  author: 'Susan Power (Passage A) and Leslie Chang (Passage B)',
  source: 'Various memoirs and essays',
  introduction: 'Passage A is adapted from an essay by Susan Power. Passage B is adapted from a memoir by Leslie Chang.',
  passage_text: `Passage A

My mother tells me stories, always stories, her voice threading through the dark of our bedroom like a luminous river. Tonight she tells me about the old days when our people lived on the Dakota plains, when the buffalo ran thick as storm clouds across the earth. Her words paint pictures in my mind: warriors on painted horses, women gathering wild rice, children playing games that have been forgotten.

She tells me these stories not because they are true—though some of them are—but because she wants me to remember. She wants me to carry these images forward into my own life, to pass them on someday to my own children. In her stories, our ancestors are not museum pieces but living people with hopes and fears and dreams that echo our own.

When morning comes, I always ask her to tell me more. But she just smiles and says, "Tomorrow night, little one. Tomorrow night there will be other stories to tell."

Passage B

Water has memory, my grandmother used to say. She would take me to the edge of the Yellow River and tell me to listen carefully. "Can you hear it?" she would ask. "Can you hear all the voices?"

I was too young then to understand what she meant. I heard only the sound of water moving over stones, the distant cry of birds, the wind in the reeds. But now, years later and thousands of miles away from that riverbank, I think I finally understand.

The water carries with it the voices of all who have come before: the fishermen who cast their nets in the early morning mist, the women who came to wash their clothes, the children who played along its banks. All of their laughter and tears and hopes have somehow been absorbed by the flowing current, preserved in the endless circulation of rain and river and sea.

When I cup my hands now and drink from any stream, I taste not just water but memory itself.`
};

// Update the passage
const { error } = await supabase
  .from('act_reading_passages')
  .update({
    passage_type: correctedPassage1.passage_type,
    title: correctedPassage1.title,
    author: correctedPassage1.author,
    source: correctedPassage1.source,
    introduction: correctedPassage1.introduction,
    passage_text: correctedPassage1.passage_text
  })
  .eq('test_number', TEST_NUMBER)
  .eq('passage_number', 1);

if (error) {
  console.error('❌ Error updating Reading Passage 1:', error.message);
} else {
  console.log('✅ Updated Reading Passage 1: Mothers and Memory');
  console.log(`   Text length: ${correctedPassage1.passage_text.length} characters`);
}

console.log('\n✅ Reading Passage 1 fix complete!\n');