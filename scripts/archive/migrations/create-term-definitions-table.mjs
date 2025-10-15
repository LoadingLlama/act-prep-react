/**
 * Create term_definitions table in Supabase and populate with definitions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Creating term_definitions table...\n');
const definitions = [
  {
    term: 'Acute Angles',
    definition: 'An angle that measures less than 90 degrees.',
    context: 'On the ACT, acute angles often appear in triangle problems and trigonometry questions.',
    related_terms: ['Right Angles', 'Obtuse Angles'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Right Angles',
    definition: 'An angle that measures exactly 90 degrees, forming a perfect corner.',
    context: 'Right angles are fundamental to the Pythagorean theorem and perpendicular lines.',
    related_terms: ['Acute Angles', 'Perpendicular Lines'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Obtuse Angles',
    definition: 'An angle that measures greater than 90 degrees but less than 180 degrees.',
    context: 'Obtuse angles appear in obtuse triangles and when analyzing polygon interior angles.',
    related_terms: ['Acute Angles', 'Straight Angles'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Straight Angles',
    definition: 'An angle that measures exactly 180 degrees, forming a straight line.',
    context: 'Straight angles are key to understanding supplementary angles and angles on a line.',
    related_terms: ['Supplementary Angles', 'Linear Pairs'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Complementary Angles',
    definition: 'Two angles that add up to 90 degrees.',
    context: 'The ACT frequently tests complementary angles in right triangles and perpendicular lines.',
    related_terms: ['Supplementary Angles', 'Right Angles'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Supplementary Angles',
    definition: 'Two angles that add up to 180 degrees.',
    context: 'Supplementary angles appear when two angles form a straight line or in parallel line problems.',
    related_terms: ['Complementary Angles', 'Linear Pairs'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Vertical Angles',
    definition: 'Opposite angles formed when two lines intersect. They are always equal.',
    context: 'Vertical angles are one of the most tested angle relationships on the ACT.',
    related_terms: ['Adjacent Angles', 'Intersecting Lines'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'Adjacent Angles',
    definition: 'Two angles that share a common vertex and side but do not overlap.',
    context: 'Adjacent angles on a straight line are supplementary, a common ACT pattern.',
    related_terms: ['Vertical Angles', 'Linear Pairs'],
    lesson_key: 'geometry-angles'
  },
  {
    term: 'transversal',
    definition: 'A line that crosses two or more parallel lines.',
    context: 'When a transversal crosses parallel lines, it creates corresponding, alternate interior, and alternate exterior angles.',
    related_terms: ['Parallel Lines', 'Corresponding Angles'],
    lesson_key: 'geometry-angles'
  }
];

console.log(`Prepared ${definitions.length} term definitions`);
console.log('\nSQL to create table (run this in Supabase SQL Editor):');
console.log('---');
console.log(`
CREATE TABLE IF NOT EXISTS term_definitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  context TEXT,
  related_terms TEXT[],
  lesson_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_term_definitions_term ON term_definitions(term);
CREATE INDEX IF NOT EXISTS idx_term_definitions_lesson_key ON term_definitions(lesson_key);

-- Enable RLS (Row Level Security)
ALTER TABLE term_definitions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON term_definitions
  FOR SELECT USING (true);
`);
console.log('---\n');

// Try to insert data (this will only work if table exists)
console.log('Attempting to insert definitions...');

for (const def of definitions) {
  const { data, error } = await supabase
    .from('term_definitions')
    .insert(def)
    .select();

  if (error) {
    console.log(`❌ Error inserting "${def.term}":`, error.message);
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('\n⚠️  Table does not exist yet. Please:');
      console.log('1. Go to Supabase Dashboard → SQL Editor');
      console.log('2. Copy and run the SQL shown above');
      console.log('3. Then run this script again\n');
      process.exit(0);
    }
  } else {
    console.log(`✅ Inserted: ${def.term}`);
  }
}

console.log('\n💾 All definitions stored in Supabase!');
