#!/usr/bin/env node

/**
 * FIX READING PASSAGES SCHEMA FOR PRACTICE TEST 4
 * Add the missing passages with proper schema compliance
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING READING PASSAGES SCHEMA FOR PRACTICE TEST 4');
console.log('Adding missing passages with proper schema compliance');
console.log('='.repeat(70));

/**
 * Add remaining Reading passages with proper schema
 */
async function fixReadingPassagesSchema(testNumber) {
  console.log('\n📖 ADDING READING PASSAGES WITH CORRECT SCHEMA...');

  const passages = [
    {
      id: uuidv4(),
      test_number: testNumber,
      passage_number: 2,
      passage_type: 'NATURAL_SCIENCE',
      title: "Climate Change and Arctic Wildlife",
      author: null,
      source: null,
      introduction: "Natural science passage about the effects of climate change on Arctic ecosystems",
      passage_text: `The Arctic region is experiencing climate change at twice the global average rate, a phenomenon known as Arctic amplification. This rapid warming is having profound effects on Arctic wildlife populations, forcing species to adapt to dramatically changing environmental conditions or face potential extinction.

Polar bears have become the most visible symbol of climate change impacts in the Arctic. These magnificent predators depend on sea ice for hunting seals, their primary food source. As warming temperatures cause sea ice to form later in the fall and break up earlier in the spring, polar bears have less time to hunt and build up the fat reserves they need to survive the ice-free summer months.

Arctic foxes face different but equally serious challenges. These small predators have evolved to take advantage of the extreme seasonal variations in the Arctic, changing their coat color from brown in summer to white in winter for camouflage. However, as temperatures warm and snow cover becomes less predictable, this adaptive strategy may become less effective.

The warming Arctic is also affecting marine ecosystems. Walruses traditionally use sea ice as platforms for resting between feeding dives. As sea ice retreats farther from shore, walruses are forced to haul out on land in enormous numbers, leading to dangerous overcrowding and increased mortality, especially among young calves.

Caribou populations are experiencing complex effects from climate change. Warmer temperatures can improve summer feeding conditions by extending the growing season for Arctic plants. However, more frequent winter rain events can create ice layers that prevent caribou from accessing food beneath the snow, leading to starvation events.

The story of Arctic wildlife and climate change illustrates the interconnected nature of ecosystems. Changes in one component of the system create cascading effects throughout the entire food web, demonstrating the importance of understanding and addressing climate change as a global phenomenon.`
    },
    {
      id: uuidv4(),
      test_number: testNumber,
      passage_number: 3,
      passage_type: 'HUMANITIES',
      title: "The Harlem Renaissance",
      author: null,
      source: null,
      introduction: "Historical passage about the cultural movement in 1920s Harlem",
      passage_text: `The Harlem Renaissance of the 1920s represented one of the most significant cultural movements in American history, transforming a neighborhood in New York City into the epicenter of African American artistic, intellectual, and social life. This remarkable period saw an unprecedented flowering of creativity that would influence American culture for generations to come.

The movement emerged from the confluence of several historical factors. The Great Migration had brought hundreds of thousands of African Americans from the rural South to northern cities, seeking economic opportunities and escape from Jim Crow segregation. Harlem, with its relatively affordable housing and existing African American community, became a destination of choice for many of these migrants.

Literary achievement was at the heart of the Harlem Renaissance. Writers like Langston Hughes, Zora Neale Hurston, and Claude McKay created works that celebrated African American culture while also confronting the realities of racism and discrimination. Their poetry, novels, and essays gave voice to the African American experience in ways that had never been seen before in American literature.

Music was equally central to the movement. Jazz, blues, and ragtime flourished in Harlem's clubs and theaters. Musicians like Duke Ellington, Louis Armstrong, and Bessie Smith became national celebrities, bringing African American musical traditions to mainstream American audiences. The Cotton Club and Apollo Theater became legendary venues where both Black and white audiences could experience this revolutionary music.

Visual arts also thrived during this period. Artists like Aaron Douglas, Palmer Hayden, and Augusta Savage created paintings and sculptures that explored themes of African heritage, urban life, and racial identity. Their work challenged prevailing stereotypes and established new aesthetic traditions that influenced American art for decades.

The Harlem Renaissance was not just an artistic movement but also an intellectual and political awakening. Scholars like W.E.B. Du Bois and Marcus Garvey, though they disagreed on strategies, both worked to promote African American pride and civil rights. The period established Harlem as a center of Black intellectual life and laid important groundwork for the civil rights movement that would follow.`
    },
    {
      id: uuidv4(),
      test_number: testNumber,
      passage_number: 4,
      passage_type: 'HUMANITIES',
      title: "The Philosophy of Time",
      author: null,
      source: null,
      introduction: "Humanities passage exploring different philosophical perspectives on the nature of time",
      passage_text: `Time has puzzled philosophers for millennia, raising fundamental questions about the nature of existence, consciousness, and reality itself. From ancient Greek thinkers to modern physicists and philosophers, the question of what time actually is continues to generate intense debate and fascinating insights.

Ancient philosophers laid the groundwork for many contemporary discussions about time. Aristotle distinguished between time as a measure of change and time as something independent of change. He argued that time could not exist without change, since time is essentially the numbering of change with respect to before and after. This view influenced Western thought for centuries.

The philosophical distinction between absolute and relative time became central to later debates. Newton conceived of absolute time as flowing uniformly throughout the universe, independent of any particular events or observations. This mechanistic view dominated scientific thinking until Einstein's theories of relativity demonstrated that time is relative to the observer's frame of reference.

Modern philosophy has grappled with the psychological experience of time versus its physical reality. Henri Bergson distinguished between scientific time, which is quantitative and measurable, and lived time, which is qualitative and tied to consciousness. This psychological dimension of time explains why some experiences seem to pass quickly while others drag on endlessly.

The arrow of time presents another philosophical puzzle. While the fundamental laws of physics are generally time-symmetric, we experience time as having a clear direction from past to future. This asymmetry may be related to the second law of thermodynamics and the increase of entropy in the universe, but the philosophical implications of this directionality continue to be debated.

Contemporary discussions of time often intersect with questions about free will and determinism. If the future is as real as the past, as some interpretations of physics suggest, what does this mean for human agency and moral responsibility? These questions demonstrate how seemingly abstract philosophical problems about time connect to deeply practical concerns about how we understand ourselves and our place in the universe.`
    }
  ];

  let uploadCount = 0;
  const errors = [];

  for (const passage of passages) {
    try {
      const { error } = await supabase
        .from('act_reading_passages')
        .insert(passage);

      if (error) {
        errors.push(`Passage ${passage.passage_number}: ${error.message}`);
      } else {
        uploadCount++;
        console.log(`  ✅ Uploaded passage ${passage.passage_number}: "${passage.title}" (${passage.passage_type})`);
      }
    } catch (err) {
      errors.push(`Passage ${passage.passage_number}: ${err.message}`);
    }
  }

  console.log(`📊 Reading passages: ${uploadCount} uploaded, ${errors.length} errors`);

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { uploadCount, errors };
}

/**
 * Check final status of Reading passages
 */
async function checkReadingPassagesStatus(testNumber) {
  console.log(`\n🔍 CHECKING PRACTICE TEST ${testNumber} READING PASSAGES STATUS...`);

  const { data: passages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNumber)
    .order('passage_number');

  console.log(`\n📖 READING PASSAGES: ${passages?.length || 0}/4 found`);
  if (passages && passages.length > 0) {
    passages.forEach(p => {
      console.log(`  • Passage ${p.passage_number}: "${p.title}" (${p.passage_type})`);
    });
  }

  const isComplete = passages?.length === 4;
  console.log(`\n🎯 READING PASSAGES STATUS: ${isComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);

  return { passages, isComplete };
}

/**
 * Main function
 */
async function main() {
  try {
    const testNumber = 4;

    const fixResult = await fixReadingPassagesSchema(testNumber);
    const statusResult = await checkReadingPassagesStatus(testNumber);

    console.log('\n' + '='.repeat(70));
    console.log('🏆 READING PASSAGES SCHEMA FIX RESULTS');
    console.log('='.repeat(70));

    console.log(`📊 UPLOAD RESULTS:`);
    console.log(`  ✅ Passages uploaded: ${fixResult.uploadCount}`);
    console.log(`  ❌ Errors: ${fixResult.errors.length}`);
    console.log(`  📖 Total passages: ${statusResult.passages?.length || 0}/4`);
    console.log(`  🎯 Status: ${statusResult.isComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);

    if (statusResult.isComplete) {
      console.log(`\n✅ SUCCESS: Practice Test 4 Reading passages are now complete!`);
      console.log(`📋 NEXT: Extract all 40 Reading questions for these passages`);
    }

    return {
      success: fixResult.errors.length === 0,
      uploadCount: fixResult.uploadCount,
      totalPassages: statusResult.passages?.length || 0,
      isComplete: statusResult.isComplete
    };

  } catch (error) {
    console.log(`\n❌ SCHEMA FIX FAILED: ${error.message}`);
    return { success: false, error: error.message };
  }
}

main().catch(console.error);