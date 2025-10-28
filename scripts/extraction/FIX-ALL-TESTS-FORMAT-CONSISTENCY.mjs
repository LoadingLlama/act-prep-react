#!/usr/bin/env node

/**
 * FIX FORMAT CONSISTENCY ACROSS ALL TESTS
 * Standardize all passage_type values to match Test 5 (the gold standard)
 *
 * Test 5 has perfect format:
 * - Reading: PROSE_FICTION, SOCIAL_SCIENCE, HUMANITIES, NATURAL_SCIENCE
 * - Science: DATA_REPRESENTATION, RESEARCH_SUMMARY, CONFLICTING_VIEWPOINTS
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING FORMAT CONSISTENCY ACROSS ALL TESTS\n');
console.log('Standardizing passage_type values to match Test 5\n');
console.log('='.repeat(80));

let totalFixed = 0;

// ============================================================================
// FIX READING PASSAGE TYPES
// ============================================================================

console.log('\n📖 FIXING READING PASSAGE TYPES\n');

const readingTypeMap = {
  'Prose Fiction': 'PROSE_FICTION',
  'prose fiction': 'PROSE_FICTION',
  'PROSE FICTION': 'PROSE_FICTION',
  'Social Science': 'SOCIAL_SCIENCE',
  'social science': 'SOCIAL_SCIENCE',
  'SOCIAL SCIENCE': 'SOCIAL_SCIENCE',
  'Humanities': 'HUMANITIES',
  'humanities': 'HUMANITIES',
  'HUMANITIES': 'HUMANITIES',
  'Natural Science': 'NATURAL_SCIENCE',
  'natural science': 'NATURAL_SCIENCE',
  'NATURAL SCIENCE': 'NATURAL_SCIENCE'
};

for (let testNum = 1; testNum <= 4; testNum++) {
  const { data: passages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNum);

  for (const p of passages || []) {
    const normalized = readingTypeMap[p.passage_type] || p.passage_type;

    if (normalized !== p.passage_type) {
      const { error } = await supabase
        .from('act_reading_passages')
        .update({ passage_type: normalized })
        .eq('id', p.id);

      if (error) {
        console.log(`  ❌ Test ${testNum} Passage ${p.passage_number}: ${error.message}`);
      } else {
        console.log(`  ✅ Test ${testNum} Passage ${p.passage_number}: "${p.passage_type}" → "${normalized}"`);
        totalFixed++;
      }
    }
  }
}

// ============================================================================
// FIX SCIENCE PASSAGE TYPES
// ============================================================================

console.log('\n🔬 FIXING SCIENCE PASSAGE TYPES\n');

const scienceTypeMap = {
  'DATA REPRESENTATION': 'DATA_REPRESENTATION',
  'Data Representation': 'DATA_REPRESENTATION',
  'data representation': 'DATA_REPRESENTATION',
  'RESEARCH SUMMARIES': 'RESEARCH_SUMMARY',
  'Research Summaries': 'RESEARCH_SUMMARY',
  'research summaries': 'RESEARCH_SUMMARY',
  'Research Summary': 'RESEARCH_SUMMARY',
  'research summary': 'RESEARCH_SUMMARY',
  'RESEARCH SUMMARY': 'RESEARCH_SUMMARY',
  'CONFLICTING VIEWPOINTS': 'CONFLICTING_VIEWPOINTS',
  'Conflicting Viewpoints': 'CONFLICTING_VIEWPOINTS',
  'conflicting viewpoints': 'CONFLICTING_VIEWPOINTS'
};

for (let testNum = 1; testNum <= 4; testNum++) {
  const { data: passages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', testNum);

  for (const p of passages || []) {
    const normalized = scienceTypeMap[p.passage_type] || p.passage_type;

    if (normalized !== p.passage_type) {
      const { error } = await supabase
        .from('act_science_passages')
        .update({ passage_type: normalized })
        .eq('id', p.id);

      if (error) {
        console.log(`  ❌ Test ${testNum} Passage ${p.passage_number}: ${error.message}`);
      } else {
        console.log(`  ✅ Test ${testNum} Passage ${p.passage_number}: "${p.passage_type}" → "${normalized}"`);
        totalFixed++;
      }
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ FIXED ${totalFixed} passage_type values\n`);
console.log('All tests now match Test 5 format standard\n');
console.log('='.repeat(80) + '\n');
