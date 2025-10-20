import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createGlossaryTerms() {
  console.log('Creating glossary terms for Math 2.2 (Areas, Volumes & Triangles)...\n');

  const terms = [
    {
      term: 'parallelogram',
      definition: 'A quadrilateral with two pairs of parallel sides. Area formula: A = bh, where b is the base and h is the height (perpendicular distance between bases).',
      lesson_key: '2.2'
    },
    {
      term: 'trapezoid',
      definition: 'A quadrilateral with exactly one pair of parallel sides. Area formula: A = ½(b₁ + b₂)h, where b₁ and b₂ are the two parallel bases and h is the height.',
      lesson_key: '2.2'
    },
    {
      term: 'Pythagorean theorem',
      definition: 'A formula for right triangles: a² + b² = c², where a and b are the legs and c is the hypotenuse (longest side). Only works for right triangles.',
      lesson_key: '2.2'
    },
    {
      term: 'hypotenuse',
      definition: 'The longest side of a right triangle, located opposite the right angle. In the Pythagorean theorem (a² + b² = c²), the hypotenuse is c.',
      lesson_key: '2.2'
    },
    {
      term: 'Pythagorean triples',
      definition: 'Sets of three whole numbers that satisfy the Pythagorean theorem. Common examples: 3-4-5 and 5-12-13. These can be scaled up (e.g., 6-8-10, 9-12-15).',
      lesson_key: '2.2'
    }
  ];

  for (const term of terms) {
    console.log(`Creating term: "${term.term}"...`);

    const { data, error } = await supabase
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
