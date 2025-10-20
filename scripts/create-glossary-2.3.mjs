import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createGlossaryTerms() {
  console.log('Creating glossary terms for Math 2.3 (Lines)...\n');

  const terms = [
    {
      term: 'slope',
      definition: 'A measure of how steep a line is, calculated as rise/run or (y₁-y₂)/(x₁-x₂). Positive slope goes up-right, negative slope goes down-right.',
      lesson_key: '2.3'
    },
    {
      term: 'parallel lines',
      definition: 'Lines that have the same slope and never intersect. If one line has slope 3, a parallel line also has slope 3.',
      lesson_key: '2.3'
    },
    {
      term: 'perpendicular lines',
      definition: 'Lines that intersect at 90 degrees and have slopes that are negative reciprocals. If one line has slope 2/3, a perpendicular line has slope -3/2.',
      lesson_key: '2.3'
    },
    {
      term: 'point-slope form',
      definition: 'The equation y - y₁ = m(x - x₁), where m is the slope and (x₁, y₁) is a point on the line. Use when you know a point and the slope.',
      lesson_key: '2.3'
    },
    {
      term: 'standard form',
      definition: 'The equation Ax + By = C, where A, B, and C are constants. To find slope from standard form: slope = -A/B.',
      lesson_key: '2.3'
    },
    {
      term: 'midpoint formula',
      definition: 'Finds the point exactly halfway between two points: ((x₁+x₂)/2, (y₁+y₂)/2). Average the x-coordinates and y-coordinates.',
      lesson_key: '2.3'
    },
    {
      term: 'distance formula',
      definition: 'Finds the straight-line distance between two points: √[(x₁-x₂)² + (y₁-y₂)²]. This is the Pythagorean theorem applied to coordinates.',
      lesson_key: '2.3'
    }
  ];

  for (const term of terms) {
    console.log(`Creating term: "${term.term}"...`);

    const { data, error} = await supabase
      .from('lesson_term_definitions')
      .insert(term)
      .select();

    if (error) {
      if (error.code === '23505') {
        console.log(`⚠️  Term "${term.term}" already exists, skipping...`);
      } else {
        console.error(`❌ Failed to create term "${term.term}":`, error);
      }
    } else {
      console.log(`✅ Created term: "${term.term}"`);
    }
  }

  console.log('\n✅ Glossary term creation complete!');
}

createGlossaryTerms();
