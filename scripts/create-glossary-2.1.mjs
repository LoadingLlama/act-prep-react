import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createGlossaryTerms() {
  console.log('Creating glossary terms for Math 2.1 (Understanding Angles & Lines)...\\n');

  const terms = [
    {
      term: 'vertical angles',
      definition: 'Angles that are opposite each other when two lines intersect. Vertical angles are always equal.',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'adjacent angles',
      definition: 'Angles that are next to each other and share a common side. Adjacent angles formed by intersecting lines are supplementary (add to 180°).',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'parallel lines',
      definition: 'Lines that never intersect and are always the same distance apart. When parallel lines are crossed by a transversal, they create special angle relationships.',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'transversal',
      definition: 'A line that crosses two or more other lines. When a transversal crosses parallel lines, it creates pairs of equal angles and supplementary angles.',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'alternate interior angles',
      definition: 'Angles on opposite sides of a transversal, between two parallel lines. Alternate interior angles are always equal.',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'corresponding angles',
      definition: 'Angles in the same position at each intersection when a transversal crosses two parallel lines. Corresponding angles are always equal.',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'polygon',
      definition: 'A closed figure with three or more straight sides. Examples include triangles, quadrilaterals, pentagons, and hexagons.',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'parallelogram',
      definition: 'A quadrilateral with two pairs of parallel sides. Opposite sides are equal in length, and opposite angles are equal.',
      lesson_key: 'geometry-angles'
    },
    {
      term: 'angle bisector',
      definition: 'A line or ray that divides an angle into two equal parts. If an angle measures 72°, its bisector creates two 36° angles.',
      lesson_key: 'geometry-angles'
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

  console.log('\\n✅ Glossary term creation complete!');
}

createGlossaryTerms();
