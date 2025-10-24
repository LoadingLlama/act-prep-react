#!/usr/bin/env node

/**
 * CLEANUP PRACTICE TEST 2 CORRUPTED PASSAGES
 * Remove corrupted passages that were incorrectly extracted
 * Keep only legitimate passage content for manual re-verification
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🧹 CLEANUP PRACTICE TEST 2 CORRUPTED PASSAGES');
console.log('Removing corrupted passages that contain question fragments and test instructions');
console.log('='.repeat(80));

/**
 * Clean up reading passages
 */
async function cleanupReadingPassages() {
  console.log('\n📚 CLEANING UP READING PASSAGES...');

  // Get all reading passages for test 2
  const { data: passages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', 2)
    .order('passage_number');

  console.log(`Found ${passages?.length || 0} reading passages`);

  if (!passages) {
    console.log('No passages found to clean up');
    return { removed: 0, kept: 0 };
  }

  let removed = 0;
  let kept = 0;
  const passagesToKeep = [];
  const passagesToRemove = [];

  // Analyze each passage to determine if it's legitimate
  passages.forEach(passage => {
    const isLegitimate = isLegitimateReadingPassage(passage);

    console.log(`\n  Passage ${passage.passage_number} (ID: ${passage.id}):`);
    console.log(`    Title: "${passage.title}"`);
    console.log(`    Length: ${passage.passage_text?.length || 0} chars`);
    console.log(`    Status: ${isLegitimate ? '✅ KEEP (legitimate)' : '❌ REMOVE (corrupted)'}`);

    if (isLegitimate) {
      passagesToKeep.push(passage);
      kept++;
    } else {
      passagesToRemove.push(passage);
      removed++;
    }
  });

  // Remove corrupted passages
  if (passagesToRemove.length > 0) {
    console.log(`\n🗑️  REMOVING ${passagesToRemove.length} CORRUPTED PASSAGES...`);

    for (const passage of passagesToRemove) {
      try {
        const { error } = await supabase
          .from('act_reading_passages')
          .delete()
          .eq('id', passage.id);

        if (error) {
          console.log(`    ❌ Failed to remove passage ${passage.passage_number}: ${error.message}`);
        } else {
          console.log(`    ✅ Removed corrupted passage ${passage.passage_number}`);
        }
      } catch (err) {
        console.log(`    ❌ Error removing passage ${passage.passage_number}: ${err.message}`);
      }
    }
  }

  console.log(`\n📊 READING CLEANUP SUMMARY:`);
  console.log(`  ✅ Kept: ${kept} legitimate passages`);
  console.log(`  ❌ Removed: ${removed} corrupted passages`);

  return { removed, kept, legitimatePassages: passagesToKeep };
}

/**
 * Clean up science passages
 */
async function cleanupSciencePassages() {
  console.log('\n🧪 CLEANING UP SCIENCE PASSAGES...');

  // Get all science passages for test 2
  const { data: passages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', 2)
    .order('passage_number');

  console.log(`Found ${passages?.length || 0} science passages`);

  if (!passages) {
    console.log('No passages found to clean up');
    return { removed: 0, kept: 0 };
  }

  let removed = 0;
  let kept = 0;
  const passagesToKeep = [];
  const passagesToRemove = [];

  // Analyze each passage to determine if it's legitimate
  passages.forEach(passage => {
    const isLegitimate = isLegitimateSciencePassage(passage);

    console.log(`\n  Passage ${passage.passage_number} (ID: ${passage.id}):`);
    console.log(`    Title: "${passage.title}"`);
    console.log(`    Length: ${passage.passage_text?.length || 0} chars`);
    console.log(`    Status: ${isLegitimate ? '✅ KEEP (legitimate)' : '❌ REMOVE (corrupted)'}`);

    if (isLegitimate) {
      passagesToKeep.push(passage);
      kept++;
    } else {
      passagesToRemove.push(passage);
      removed++;
    }
  });

  // Remove corrupted passages
  if (passagesToRemove.length > 0) {
    console.log(`\n🗑️  REMOVING ${passagesToRemove.length} CORRUPTED PASSAGES...`);

    for (const passage of passagesToRemove) {
      try {
        const { error } = await supabase
          .from('act_science_passages')
          .delete()
          .eq('id', passage.id);

        if (error) {
          console.log(`    ❌ Failed to remove passage ${passage.passage_number}: ${error.message}`);
        } else {
          console.log(`    ✅ Removed corrupted passage ${passage.passage_number}`);
        }
      } catch (err) {
        console.log(`    ❌ Error removing passage ${passage.passage_number}: ${err.message}`);
      }
    }
  }

  console.log(`\n📊 SCIENCE CLEANUP SUMMARY:`);
  console.log(`  ✅ Kept: ${kept} legitimate passages`);
  console.log(`  ❌ Removed: ${removed} corrupted passages`);

  return { removed, kept, legitimatePassages: passagesToKeep };
}

/**
 * Determine if a reading passage is legitimate
 */
function isLegitimateReadingPassage(passage) {
  // Check for corruption indicators
  const corruptionIndicators = [
    'Question', 'GO ON TO THE NEXT PAGE', 'DIRECTIONS:', 'READING TEST',
    'answer document', 'fill in the corresponding oval', 'passage is accompanied',
    'NO CHANGE', 'choice', 'Point A', 'Point B', 'Point C', 'Point D',
    'aeoeaeeeneer', 'ACT-cor', 'preceding passage'
  ];

  const title = passage.title || '';
  const text = passage.passage_text || '';

  // Check title for corruption
  if (corruptionIndicators.some(indicator => title.includes(indicator))) {
    return false;
  }

  // Check text for corruption
  if (corruptionIndicators.some(indicator => text.includes(indicator))) {
    return false;
  }

  // Check for suspiciously short or empty content
  if (text.length < 500) {
    return false;
  }

  // Check for question format patterns
  if (text.match(/\d+\.\s*[A-J]\./g) && text.match(/\d+\.\s*[A-J]\./g).length > 3) {
    return false; // Looks like question choices
  }

  // Check for legitimate passage characteristics
  const hasGoodTitle = title.length > 5 && title.length < 100;
  const hasSubstantialContent = text.length > 1000;
  const hasValidType = ['LITERARY NARRATIVE', 'SOCIAL SCIENCE', 'HUMANITIES', 'NATURAL SCIENCE'].includes(passage.passage_type);

  return hasGoodTitle && hasSubstantialContent && hasValidType;
}

/**
 * Determine if a science passage is legitimate
 */
function isLegitimateSciencePassage(passage) {
  // Similar checks for science passages
  const corruptionIndicators = [
    'Question', 'GO ON TO THE NEXT PAGE', 'DIRECTIONS:', 'SCIENCE TEST',
    'answer document', 'fill in the corresponding oval', 'passage is accompanied',
    'choice', 'NO CHANGE', 'ACT-cor'
  ];

  const title = passage.title || '';
  const text = passage.passage_text || '';

  // Check title for corruption
  if (corruptionIndicators.some(indicator => title.includes(indicator))) {
    return false;
  }

  // Check text for corruption
  if (corruptionIndicators.some(indicator => text.includes(indicator))) {
    return false;
  }

  // Check for suspiciously short content
  if (text.length < 300) {
    return false;
  }

  // Science passages should have experiment/study content
  const hasGoodTitle = title.length > 5 && title.length < 100;
  const hasSubstantialContent = text.length > 400;
  const hasValidType = ['DATA REPRESENTATION', 'RESEARCH SUMMARIES', 'CONFLICTING VIEWPOINTS'].includes(passage.passage_type);

  return hasGoodTitle && hasSubstantialContent && hasValidType;
}

/**
 * Main cleanup function
 */
async function cleanupTest2Passages() {
  const readingResults = await cleanupReadingPassages();
  const scienceResults = await cleanupSciencePassages();

  console.log('\n' + '='.repeat(80));
  console.log('🎯 TEST 2 PASSAGE CLEANUP RESULTS');
  console.log('='.repeat(80));

  const totalRemoved = readingResults.removed + scienceResults.removed;
  const totalKept = readingResults.kept + scienceResults.kept;

  console.log(`✅ CLEANUP COMPLETE:`);
  console.log(`  📚 Reading: Kept ${readingResults.kept}, Removed ${readingResults.removed}`);
  console.log(`  🧪 Science: Kept ${scienceResults.kept}, Removed ${scienceResults.removed}`);
  console.log(`  📊 Total: Kept ${totalKept}, Removed ${totalRemoved}`);
  console.log('');

  if (readingResults.kept === 4 && scienceResults.kept === 7) {
    console.log('🎉 ✅ PERFECT CLEANUP: Exactly the right number of passages remain!');
    console.log('  📚 Reading: 4/4 passages (COMPLETE)');
    console.log('  🧪 Science: 7/7 passages (COMPLETE)');
  } else {
    console.log('⚠️  MANUAL EXTRACTION NEEDED:');

    if (readingResults.kept !== 4) {
      console.log(`  📚 Reading: ${readingResults.kept}/4 passages - need ${4 - readingResults.kept} more`);
    }

    if (scienceResults.kept !== 7) {
      console.log(`  🧪 Science: ${scienceResults.kept}/7 passages - need ${7 - scienceResults.kept} more`);
    }

    console.log('');
    console.log('🎯 NEXT STEPS:');
    console.log('  1. Manually extract missing passages from source file');
    console.log('  2. Use Practice Test 3 manual extraction approach');
    console.log('  3. Verify all question-passage linkages');
  }

  return {
    success: totalRemoved > 0,
    readingResults,
    scienceResults,
    needsManualExtraction: readingResults.kept !== 4 || scienceResults.kept !== 7
  };
}

cleanupTest2Passages().catch(console.error);