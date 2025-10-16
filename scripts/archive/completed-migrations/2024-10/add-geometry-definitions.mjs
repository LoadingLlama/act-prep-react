/**
 * Add Term Definitions for Geometry Lesson (2.1)
 * Creates definitions in Supabase for blue underlined terms
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for admin operations

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Term definitions for the geometry lesson
const termDefinitions = [
  {
    term: 'angle',
    definition: 'Formed when two rays (or line segments) share a common endpoint called the vertex',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'vertex',
    definition: 'The common endpoint where two rays or line segments meet to form an angle',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Acute Angles',
    definition: 'Any angle less than 90°. Examples: 30°, 45°, 60°, 89°',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Right Angles',
    definition: 'Exactly 90°. Shown with a small square symbol at the vertex. Represents perpendicular lines.',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Obtuse Angles',
    definition: 'Between 90° and 180°. Examples: 100°, 120°, 150°, 179°',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Straight Angles',
    definition: 'Exactly 180°. Forms a straight line.',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Complementary Angles',
    definition: 'Two angles that add up to 90°. Formula: If angle A is x°, its complement is (90° - x)',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Supplementary Angles',
    definition: 'Two angles that add up to 180°. Formula: If angle A is x°, its supplement is (180° - x)',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Vertical Angles',
    definition: 'When two lines intersect, they create two pairs of opposite angles. Vertical angles are always equal.',
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Adjacent Angles',
    definition: 'Two angles that share a common side and vertex. On a straight line, adjacent angles are supplementary (add to 180°)',
    lesson_key: 'geometry-angles'
  }
];

async function addDefinitions() {
  console.log('📚 Adding term definitions for Geometry lesson...\\n');

  // First, check if definitions already exist
  const { data: existing, error: checkError } = await supabase
    .from('term_definitions')
    .select('term')
    .eq('lesson_key', 'geometry-angles');

  if (checkError) {
    console.error('❌ Error checking existing definitions:', checkError);
    process.exit(1);
  }

  console.log(`Found ${existing?.length || 0} existing definitions\\n`);

  // Delete existing definitions for this lesson to avoid duplicates
  if (existing && existing.length > 0) {
    console.log('🗑️  Deleting existing definitions...');
    const { error: deleteError } = await supabase
      .from('term_definitions')
      .delete()
      .eq('lesson_key', 'geometry-angles');

    if (deleteError) {
      console.error('❌ Error deleting existing definitions:', deleteError);
      process.exit(1);
    }
    console.log('✅ Deleted existing definitions\\n');
  }

  // Insert new definitions
  console.log('💾 Inserting new definitions...');
  const { data, error } = await supabase
    .from('term_definitions')
    .insert(termDefinitions)
    .select();

  if (error) {
    console.error('❌ Error inserting definitions:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully added ${data.length} term definitions\\n`);

  // Display what was added
  console.log('📋 DEFINITIONS ADDED:');
  console.log('─'.repeat(80));
  data.forEach(def => {
    console.log(`  ${def.term}`);
    console.log(`    → ${def.definition}`);
    console.log();
  });
}

addDefinitions();
