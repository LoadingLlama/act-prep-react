/**
 * Add Term Definitions for Arcs and Sectors Lesson
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const termDefinitions = [
  {
    term: 'arc',
    definition: 'A part or segment of a circle\'s circumference (edge). Arc length = (θ/360) × 2πr',
    lesson_key: 'arcs-sectors'
  },
  {
    term: 'sector',
    definition: 'A "pizza slice" region of a circle bounded by two radii and an arc. Sector area = (θ/360) × πr²',
    lesson_key: 'arcs-sectors'
  },
  {
    term: 'central angle',
    definition: 'The angle formed at the center of a circle by two radii. Measured in degrees, determines the size of arc and sector.',
    lesson_key: 'arcs-sectors'
  },
  {
    term: 'arc length',
    definition: 'The distance along the curved edge of an arc. Formula: arc length = (θ/360) × 2πr = (θ/360) × C',
    lesson_key: 'arcs-sectors'
  },
  {
    term: 'sector area',
    definition: 'The area of a sector (pizza slice region). Formula: sector area = (θ/360) × πr² = (θ/360) × A',
    lesson_key: 'arcs-sectors'
  },
  {
    term: 'major arc',
    definition: 'An arc that measures more than 180° (more than half the circle).',
    lesson_key: 'arcs-sectors'
  },
  {
    term: 'minor arc',
    definition: 'An arc that measures less than 180° (less than half the circle).',
    lesson_key: 'arcs-sectors'
  },
  {
    term: 'semicircle',
    definition: 'An arc or sector that is exactly half of a circle (180°). Arc length = πr, sector area = (πr²)/2',
    lesson_key: 'arcs-sectors'
  }
];

async function addDefinitions() {
  console.log('📚 Adding term definitions for Arcs and Sectors...\\n');

  const { data: existing } = await supabase
    .from('term_definitions')
    .select('term')
    .eq('lesson_key', 'arcs-sectors');

  if (existing && existing.length > 0) {
    console.log(`🗑️  Deleting ${existing.length} existing definitions...`);
    await supabase.from('term_definitions').delete().eq('lesson_key', 'arcs-sectors');
    console.log('✅ Deleted\\n');
  }

  const { data, error } = await supabase
    .from('term_definitions')
    .insert(termDefinitions)
    .select();

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully added ${data.length} term definitions\\n`);

  console.log('TERMS ADDED:');
  console.log('─'.repeat(80));
  data.forEach(def => console.log(`  ${def.term}`));
  console.log();
}

addDefinitions();
